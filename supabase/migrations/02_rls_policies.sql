-- ====================================================================
-- MIGRATION 02: POLÍTICAS DE ROW LEVEL SECURITY (RLS) & CONTROLE DE ACESSO
-- Garante isolamento estrito e proteção contra escalada de privilégios
-- ====================================================================

-- 1. HABILITA RLS EM TODAS AS 12 TABELAS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinary_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 2. FUNÇÕES AUXILIARES DE VERIFICAÇÃO DE PAPEL NO BANCO
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_recruiter_or_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter')
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter', 'moderator')
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 3. POLÍTICAS: PROFILES
-- Usuário pode ver seu próprio perfil; Admins podem ver todos
CREATE POLICY "Profiles são visíveis pelo dono ou admin"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_admin());

-- Usuário pode atualizar campos básicos do seu perfil, MAS NUNCA SEU PRÓPRIO ROLE
CREATE POLICY "Usuários atualizam seus dados exceto role"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  -- Impede auto-promoção: o novo role deve ser idêntico ao antigo se não for admin
  (role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
);

-- Somente admins podem alterar o role de outros perfis
CREATE POLICY "Admins atualizam qualquer perfil"
ON public.profiles FOR ALL
USING (public.is_admin());

-- 4. POLÍTICAS: DADOS PÚBLICOS DE LEITURA (ranks, units, courses, settings)
CREATE POLICY "Ranks leitura pública" ON public.ranks FOR SELECT USING (true);
CREATE POLICY "Ranks escrita apenas admin" ON public.ranks FOR ALL USING (public.is_admin());

CREATE POLICY "Units leitura pública" ON public.units FOR SELECT USING (true);
CREATE POLICY "Units escrita apenas admin" ON public.units FOR ALL USING (public.is_admin());

CREATE POLICY "Courses leitura pública" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Courses escrita staff" ON public.courses FOR ALL USING (public.is_staff());

CREATE POLICY "Settings leitura pública" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Settings escrita apenas admin" ON public.site_settings FOR ALL USING (public.is_admin());

-- 5. POLÍTICAS: ANNOUNCEMENTS (Notícias)
-- Qualquer visitante vê notícias publicadas; Staff vê todas
CREATE POLICY "Notícias públicas visíveis para todos"
ON public.announcements FOR SELECT
USING (is_published = true OR public.is_staff());

CREATE POLICY "Notícias criadas e editadas por staff"
ON public.announcements FOR ALL
USING (public.is_staff());

-- 6. POLÍTICAS: EDICTS (Editais)
CREATE POLICY "Editais visíveis para todos"
ON public.edicts FOR SELECT
USING (true);

CREATE POLICY "Editais criados e editados por recrutadores ou admin"
ON public.edicts FOR ALL
USING (public.is_recruiter_or_admin());

-- 7. POLÍTICAS: MEMBERS (Hierarquia pública)
CREATE POLICY "Efetivo visível publicamente"
ON public.members FOR SELECT
USING (true);

CREATE POLICY "Efetivo gerenciado apenas por admin"
ON public.members FOR ALL
USING (public.is_admin());

-- 8. POLÍTICAS: APPLICATIONS (Inscrições de Recrutamento - DADOS PRIVADOS)
-- Qualquer visitante anônimo ou usuário pode enviar uma candidatura
CREATE POLICY "Candidatos podem submeter inscrições"
ON public.applications FOR INSERT
WITH CHECK (true);

-- Um candidato só pode ver sua própria inscrição autenticada
CREATE POLICY "Candidato vê sua própria inscrição"
ON public.applications FOR SELECT
USING (
  auth.uid() = user_id OR 
  public.is_recruiter_or_admin()
);

-- Apenas recrutadores e admins podem alterar status e notas de inscrições
CREATE POLICY "Recrutadores gerenciam inscrições"
ON public.applications FOR UPDATE
USING (public.is_recruiter_or_admin());

CREATE POLICY "Admins excluem inscrições"
ON public.applications FOR DELETE
USING (public.is_admin());

-- 9. POLÍTICAS: DISCIPLINARY_RECORDS (Totalmente privado)
-- Visitantes comuns NÃO têm acesso de leitura aos registros disciplinares
CREATE POLICY "Apenas staff vê registros disciplinares"
ON public.disciplinary_records FOR SELECT
USING (public.is_staff());

CREATE POLICY "Apenas admins e corregedoria criam registros disciplinares"
ON public.disciplinary_records FOR ALL
USING (public.is_admin());

-- 10. POLÍTICAS: AUDIT_LOGS (Totalmente restrito aos admins)
CREATE POLICY "Apenas admins visualizam logs de auditoria"
ON public.audit_logs FOR SELECT
USING (public.is_admin());

CREATE POLICY "Sistema insere logs de auditoria"
ON public.audit_logs FOR INSERT
WITH CHECK (true);

-- 11. PROCEDIMENTO SEGURO PARA O PROPRIETÁRIO PROMOVER O 1º ADMINISTRADOR
-- Esta função só pode ser executada por quem tem acesso direto ao SQL Editor do Supabase Dashboard!
CREATE OR REPLACE PROCEDURE public.promote_initial_admin(admin_email TEXT)
LANGUAGE plpgsql
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Busca o ID do usuário cadastrado na auth do Supabase pelo e-mail
  SELECT id INTO target_user_id FROM auth.users WHERE email = admin_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário com o email % não foi encontrado em auth.users. Crie a conta primeiro no portal.', admin_email;
  END IF;

  -- Atualiza o perfil existente para o papel 'admin'
  UPDATE public.profiles
  SET role = 'admin', badge_number = '001'
  WHERE id = target_user_id;

  -- Se o perfil ainda não existir, cria-o com o papel 'admin'
  IF NOT FOUND THEN
    INSERT INTO public.profiles (id, display_name, discord_tag, roblox_username, role, badge_number)
    VALUES (target_user_id, 'Comandante Geral', 'admin#0001', 'Admin_Roblox', 'admin', '001');
  END IF;

  RAISE NOTICE 'Usuário % promovido com sucesso a ADMINISTRADOR GERAL!', admin_email;
END;
$$;
