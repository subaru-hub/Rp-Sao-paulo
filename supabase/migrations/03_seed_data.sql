-- ====================================================================
-- MIGRATION 03: DADOS INICIAIS (SEED DATA) — HIERARQUIA VOID ZONE
-- Povoa os cargos, setores e configurações iniciais da Void Zone
-- ====================================================================

-- 1. POVOAMENTO DOS CARGOS DA HIERARQUIA (RANKS VOID ZONE)
INSERT INTO public.ranks (name, abbreviation, category, order_level, description) VALUES
-- ADMINISTRAÇÃO
('Criador', '〘CR〙', 'Administração', 1, 'Criador e autoridade máxima da Void Zone.'),
('Sub・Criador', '〘SCR〙', 'Administração', 2, 'Sub-Criador e co-gestor da comunidade.'),
('Administrador', '〘ADM〙', 'Administração', 3, 'Administrador executivo geral da Void Zone.'),
('Supervisor', '〘SUP〙', 'Administração', 4, 'Supervisor geral de diretrizes e equipes.'),
('Desenvolvedor', '〘DEV〙', 'Administração', 5, 'Desenvolvedor de sistemas, bots e experiências.'),
('Moderador', '〘MOD〙', 'Administração', 6, 'Moderador ativo do servidor e das atividades.'),
('Equipe da Administração', '〘紫〙', 'Administração', 7, 'Membros componentes da equipe administrativa.'),

-- CORREGEDORIA
('Encarregado da Corregedoria', '〘ENC-CGV〙', 'Corregedoria', 8, 'Encarregado supremo de assuntos correcionais e imparcialidade.'),
('Diretor da Corregedoria', '〘DRC-CGV〙', 'Corregedoria', 9, 'Diretor das investigações e sindicâncias internas.'),
('Coordenador Geral', '〘CRG-CGV〙', 'Corregedoria', 10, 'Coordenador geral dos processos e apurações da CGV.'),
('Coordenador', '〘CRD-CGV〙', 'Corregedoria', 11, 'Coordenador de plantão e auditoria de denúncias.'),
('Analista da Corregedoria', '〘ANA-CGV〙', 'Corregedoria', 12, 'Analista técnico de provas e condutas.'),
('Aprendiz da Corregedoria', '〘APR-CGV〙', 'Corregedoria', 13, 'Membro em aprendizado dos procedimentos disciplinares.'),
('Estagiário da Corregedoria', '〘EST-CGV〙', 'Corregedoria', 14, 'Estágio inicial nas rotinas de correição.'),
('Corregedoria Geral do Void Zone', '〘紫〙', 'Corregedoria', 15, 'Corpo efetivo da Corregedoria Geral da Void Zone.'),

-- EQUIPE DE RECRUTAMENTO — ER
('Chefe・ER', '〘紫〙', 'Equipe de Recrutamento — ER', 16, 'Liderança principal da Equipe de Recrutamento.'),
('Sub・Chefe・ER', '〘紫〙', 'Equipe de Recrutamento — ER', 17, 'Sub-chefia de admissões e novos integrantes.'),
('Supervisor・ER', '〘紫〙', 'Equipe de Recrutamento — ER', 18, 'Supervisão de editais, formulários e entrevistas.'),
('Analista・ER', '〘紫〙', 'Equipe de Recrutamento — ER', 19, 'Análise detalhada de fichas cadastrais e histórico.'),
('Recrutador・ER', '〘紫〙', 'Equipe de Recrutamento — ER', 20, 'Recrutador oficial responsável por testes de voz e acolhimento.'),
('Aprendiz・ER', '〘紫〙', 'Equipe de Recrutamento — ER', 21, 'Aprendiz nas práticas de recrutamento comunitário.'),
('Equipe de Recrutamento', '〘紫〙', 'Equipe de Recrutamento — ER', 22, 'Integrantes do corpo de recrutamento e boas-vindas.'),

-- RESPONSÁVEIS POR EVENTOS
('Encarregado・Geral・de・Eventos', '〘🎪〙', 'Responsáveis por Eventos', 23, 'Encarregado geral pela concepção e execução de eventos.'),
('Organizador・de・Eventos', '〘🎪〙', 'Responsáveis por Eventos', 24, 'Organizador de torneios, festivais e operações de RP.'),
('Aprendiz・de・Eventos', '〘🎪〙', 'Responsáveis por Eventos', 25, 'Aprendiz de suporte a eventos e campeonatos.'),
('Equipe・de・Eventos', '〘🎪〙', 'Responsáveis por Eventos', 26, 'Staff ativa de apoio aos eventos comunitários.'),

-- ARBITRAGEM & INSTRUTORES
('Árbitro', '〘紫〙', 'Arbitragem & Instrutores', 27, 'Árbitro oficial de disputas, duelos e fiscalização de regras.'),
('SS Oficial', '〘紫〙', 'Arbitragem & Instrutores', 28, 'Screen Share / Verificação técnica de integridade em partidas.'),
('Instrutor Parkour', '〘🪽〙', 'Arbitragem & Instrutores', 29, 'Instrutor de mobilidade, parkour e agilidade nos mapas.'),
('Instrutor PvP', '〘⚔️〙', 'Arbitragem & Instrutores', 30, 'Instrutor tático de combate armado e mira no Roblox.'),

-- MEMBROS
('Membro', '〘🐉〙', 'Membros', 31, 'Membro registrado e ativo na comunidade Void Zone.')
ON CONFLICT (name) DO UPDATE SET
  abbreviation = EXCLUDED.abbreviation,
  category = EXCLUDED.category,
  order_level = EXCLUDED.order_level,
  description = EXCLUDED.description;

-- 2. POVOAMENTO DAS UNIDADES OPERACIONAIS (UNITS)
INSERT INTO public.units (name, acronym, description, icon_name, color_code, motto) VALUES
('Comando de Policiamento Territorial', 'CPAM', 'Policiamento ostensivo e preventivo diário em viaturas padrão.', 'Shield', 'blue', 'A força pública do patrulhamento cotidiano.'),
('1º Batalhão de Ações Especiais de Polícia', '1º BAEP', 'Atuações de alta complexidade, combate a quadrilhas armadas e intervenção urbana.', 'Crosshair', 'emerald', 'Ações Especiais com Honra e Destemor.'),
('Força Tática RP', 'FT', 'Apoio tático imediato a ocorrências graves, patrulhamento com armas de calibre superior.', 'Zap', 'amber', 'Tática e Resposta Rápida.'),
('Comando de Aviação da PM - Águia', 'CAvPM Águia', 'Vigilância aérea, perseguições em alta velocidade e resgate aeromédico.', 'Plane', 'cyan', 'Nas Asas da Lei para Servir de Cima.'),
('Comando de Policiamento Rodoviário', 'CPRv', 'Fiscalização e segurança viária nas rodovias estaduais no mapa do Roblox.', 'Navigation', 'slate', 'Segurança nas Estradas e Vias Estaduais.'),
('Diretoria de Ensino e Instrução', 'DEI / APMSP', 'Gestão da Academia Policial Militar, cursos de formação e capacitação doutrinária.', 'GraduationCap', 'indigo', 'Forjando os Melhores com Rigor e Doutrina.')
ON CONFLICT (acronym) DO NOTHING;

-- 3. CONFIGURAÇÕES DO PORTAL
INSERT INTO public.site_settings (id, community_name, discord_url, roblox_game_url, emergency_banner_text, emergency_banner_active, recruitment_global_active, server_patrol_status, contact_email_fictional)
VALUES (1, 'PM RP São Paulo — VOID ZONE', 'https://discord.gg/void-zone-rp', 'https://www.roblox.com/games/1234567890/PM-RP-Sao-Paulo-Oficial', 'HIERARQUIA VOID ZONE ATUALIZADA: Conheça os setores de Administração, Corregedoria, ER, Eventos e Arbitragem!', TRUE, TRUE, 'Patrulhas Ativas', 'contato@voidzone-rp.com')
ON CONFLICT (id) DO UPDATE SET
  community_name = EXCLUDED.community_name,
  emergency_banner_text = EXCLUDED.emergency_banner_text;

-- 4. EDITAL DE INGRESSO VOID ZONE
INSERT INTO public.edicts (code, title, type, description, vacancies, status, start_date, end_date, requirements, stages, notes)
VALUES (
  'EDITAL-2026/01-VOID',
  'Processo Seletivo Geral para Membros da Comunidade Void Zone',
  'Soldado 2ª Classe (CFSd)',
  'Alistamento aberto para novos membros integrarem as atividades, patrulhas e equipes da comunidade Void Zone no Roblox.',
  30,
  'Aberto',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '30 days',
  '["Conta no Roblox com mais de 30 dias de criação", "Conta ativa no Discord com microfone funcional para rádio", "Disponibilidade para patrulhas e treinos", "Conhecimento das regras de RP e proibição de RDM/VDM"]'::jsonb,
  '[{"name": "1ª Fase: Inscrição e Ficha Cadastral", "description": "Preenchimento do formulário online no portal.", "date": "Durante o período de inscrições"}, {"name": "2ª Fase: Análise de Histórico e RP", "description": "Avaliação de antecedentes e conduta comunitária.", "date": "Até 3 dias após encerramento"}, {"name": "3ª Fase: Prova Teórica e Entrevista no Discord", "description": "Perguntas com a Equipe de Recrutamento (ER).", "date": "A definir pela comissão"}]'::jsonb,
  'Inscrições conduzidas pela Equipe de Recrutamento (ER).'
)
ON CONFLICT (code) DO NOTHING;

-- 5. COMUNICADO OFICIAL
INSERT INTO public.announcements (title, category, summary, content, author_name, author_rank, is_urgent, is_published, published_at)
VALUES (
  'Atualização Geral da Hierarquia Oficial — VOID ZONE',
  'Geral',
  'Apresentação formal da cadeia de comando: Administração, Corregedoria, Equipe de Recrutamento (ER), Eventos e Arbitragem.',
  'A Direção Geral da VOID ZONE anuncia a consolidação formal da nossa Hierarquia Oficial com os setores de Administração, Corregedoria, Equipe de Recrutamento (ER), Responsáveis por Eventos e Arbitragem & Instrutores.\n\nTodos os membros devem zelar pelo respeito e disciplina entre os setores.',
  'Ghost Criador',
  'Criador 〘CR〙',
  TRUE,
  TRUE,
  CURRENT_DATE
);
