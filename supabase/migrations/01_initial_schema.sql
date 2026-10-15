-- ====================================================================
-- MIGRATION 01: ESQUEMA DE TABELAS - PORTAL PM RP SÃO PAULO
-- Compatível com Supabase / PostgreSQL 14+
-- ====================================================================

-- Extensão para geração de UUIDs (padrão no Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função utilitária para atualização automática de timestamps
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. TABELA: PROFILES (Perfis de Usuário vinculados ao Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  discord_tag TEXT NOT NULL,
  roblox_username TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'recruiter', 'member')),
  badge_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2. TABELA: RANKS (Patentes e Postos Hierárquicos)
CREATE TABLE IF NOT EXISTS public.ranks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  abbreviation TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Comando', 'Oficiais Superiores', 'Oficiais', 'Praças Especiais', 'Praças')),
  order_level INTEGER NOT NULL UNIQUE,
  salary_rp TEXT,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ranks_order_level ON public.ranks(order_level ASC);

-- 3. TABELA: UNITS (Batalhões e Unidades Especializadas)
CREATE TABLE IF NOT EXISTS public.units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  acronym TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Shield',
  color_code TEXT NOT NULL DEFAULT 'blue',
  motto TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABELA: MEMBERS (Quadro Efetivo Oficial no Roleplay)
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  display_name TEXT NOT NULL,
  roblox_username TEXT NOT NULL,
  discord_tag TEXT NOT NULL,
  badge_number TEXT NOT NULL UNIQUE,
  rank_id UUID NOT NULL REFERENCES public.ranks(id) ON DELETE RESTRICT,
  unit_id UUID NOT NULL REFERENCES public.units(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Reserva', 'Afastado', 'Em Formação')),
  joined_date DATE NOT NULL DEFAULT CURRENT_DATE,
  promoted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  commendations_count INTEGER NOT NULL DEFAULT 0 CHECK (commendations_count >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_members_rank ON public.members(rank_id);
CREATE INDEX idx_members_unit ON public.members(unit_id);
CREATE INDEX idx_members_badge ON public.members(badge_number);

CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 5. TABELA: ANNOUNCEMENTS (Notícias e Portarias Oficiais)
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Geral', 'Convocação', 'Operações', 'Promoções', 'Instrução')),
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_rank TEXT NOT NULL,
  is_urgent BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_announcements_published ON public.announcements(published_at DESC);

CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 6. TABELA: EDICTS (Editais de Recrutamento e Cursos)
CREATE TABLE IF NOT EXISTS public.edicts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  vacancies INTEGER NOT NULL CHECK (vacancies >= 0),
  status TEXT NOT NULL DEFAULT 'Aberto' CHECK (status IN ('Aberto', 'Em Andamento', 'Encerrado', 'Previsto')),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE NOT NULL,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  stages JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  google_forms_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_edicts_status ON public.edicts(status);

CREATE TRIGGER update_edicts_updated_at
BEFORE UPDATE ON public.edicts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 7. TABELA: APPLICATIONS (Inscrições dos Candidatos)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol TEXT NOT NULL UNIQUE,
  edict_id UUID NOT NULL REFERENCES public.edicts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  candidate_name TEXT NOT NULL,
  discord_tag TEXT NOT NULL,
  roblox_username TEXT NOT NULL,
  age TEXT NOT NULL,
  availability TEXT NOT NULL,
  rp_experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  scenario_response TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Em Análise', 'Aprovado na 1ª Fase', 'Convocado para Entrevista', 'Aprovado', 'Indeferido')),
  recruiter_notes TEXT,
  reviewer_name TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_protocol ON public.applications(protocol);
CREATE INDEX idx_applications_status ON public.applications(status);

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. TABELA: COURSES (Cursos da Academia e Manuais)
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  workload_hours INTEGER NOT NULL CHECK (workload_hours > 0),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  instructor TEXT NOT NULL,
  modules JSONB NOT NULL DEFAULT '[]'::jsonb,
  quiz JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. TABELA: COURSE_ENROLLMENTS (Matrículas e Certificados de Cursos)
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
  candidate_roblox TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Em Andamento' CHECK (status IN ('Em Andamento', 'Concluído', 'Reprovado')),
  score_percentage INTEGER CHECK (score_percentage BETWEEN 0 AND 100),
  completed_at TIMESTAMPTZ,
  certificate_code TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. TABELA: DISCIPLINARY_RECORDS (Elogios e Advertências)
CREATE TABLE IF NOT EXISTS public.disciplinary_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('Elogio de Conduta', 'Advertência Verbal', 'Repreensão Fictícia', 'Suspensão de Patrulha')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  official_name TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  resolution_status TEXT NOT NULL DEFAULT 'Vigente' CHECK (resolution_status IN ('Vigente', 'Cumprida', 'Arquivada')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_disciplinary_member ON public.disciplinary_records(member_id);

-- 11. TABELA: AUDIT_LOGS (Trilha de Auditoria Administrativa)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  details TEXT NOT NULL,
  ip_masked TEXT NOT NULL DEFAULT 'xxx.xxx.xxx.xxx',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_created ON public.audit_logs(created_at DESC);

-- 12. TABELA: SITE_SETTINGS (Configurações Gerais do Portal)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  community_name TEXT NOT NULL DEFAULT 'PM RP São Paulo',
  discord_url TEXT NOT NULL DEFAULT 'https://discord.gg/pmrp-sp',
  roblox_game_url TEXT NOT NULL DEFAULT 'https://www.roblox.com/games/example',
  emergency_banner_text TEXT NOT NULL DEFAULT 'Processo seletivo aberto no portal.',
  emergency_banner_active BOOLEAN NOT NULL DEFAULT TRUE,
  recruitment_global_active BOOLEAN NOT NULL DEFAULT TRUE,
  server_patrol_status TEXT NOT NULL DEFAULT 'Patrulhas Ativas',
  contact_email_fictional TEXT NOT NULL DEFAULT 'contato@pmrp.sp.rp',
  admin_secret_key TEXT NOT NULL DEFAULT 'VOID@ADMIN2026',
  google_forms_recruitment_url TEXT NOT NULL DEFAULT '',
  google_forms_priority BOOLEAN NOT NULL DEFAULT TRUE,
  last_updated DATE NOT NULL DEFAULT CURRENT_DATE
);
