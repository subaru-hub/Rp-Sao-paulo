export type UserRole = 'admin' | 'moderator' | 'recruiter' | 'member';

export interface UserProfile {
  id: string;
  display_name: string;
  discord_tag: string;
  roblox_username: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  badge_number?: string;
}

export interface HierarchySector {
  id: string;
  name: string;
  responsibility: string;
  badge_prefix?: string;
  color_code?: string;
}

export interface Rank {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  order_level: number;
  salary_rp?: string;
  description: string;
  color_code?: string;
}

export interface Unit {
  id: string;
  name: string;
  acronym: string;
  description: string;
  icon_name: string;
  color_code: string;
  motto: string;
}

export interface Member {
  id: string;
  display_name: string;
  roblox_username: string;
  discord_tag: string;
  badge_number: string;
  rank_id: string;
  rank_name: string;
  unit_id: string;
  unit_acronym: string;
  status: 'Ativo' | 'Reserva' | 'Afastado' | 'Em Formação';
  joined_date: string;
  promoted_date: string;
  commendations_count: number;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Geral' | 'Convocação' | 'Operações' | 'Promoções' | 'Instrução';
  summary: string;
  content: string;
  author_name: string;
  author_rank: string;
  published_at: string;
  is_urgent?: boolean;
  cover_image?: string;
}

export interface Edict {
  id: string;
  code: string; // ex: EDITAL-2026/01-CFSd
  title: string;
  type: 'Soldado 2ª Classe (CFSd)' | 'Oficial de Choque' | 'Piloto Águia' | 'Policiamento Rodoviário';
  description: string;
  vacancies: number;
  status: 'Aberto' | 'Em Andamento' | 'Encerrado' | 'Previsto';
  start_date: string;
  end_date: string;
  requirements: string[];
  stages: {
    name: string;
    description: string;
    date: string;
  }[];
  notes: string;
  google_forms_url?: string; // Link direto do Google Forms para este edital específico
}

export interface Application {
  id: string;
  protocol: string; // ex: PMSP-2026-X492
  edict_id: string;
  edict_title: string;
  candidate_name: string;
  discord_tag: string;
  roblox_username: string;
  age: string;
  availability: string;
  rp_experience: string;
  motivation: string;
  scenario_response: string; // resposta ao caso fictício de abordagem
  status: 'Pendente' | 'Em Análise' | 'Aprovado na 1ª Fase' | 'Convocado para Entrevista' | 'Aprovado' | 'Indeferido';
  recruiter_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewer_name?: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  workload_hours: number;
  category: 'Formação Básica' | 'Especialização Tática' | 'Comunicação e Rádio' | 'Pilotagem Operacional';
  description: string;
  target_audience: string;
  instructor: string;
  materials_count: number;
  modules: {
    title: string;
    description: string;
    duration: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface DisciplinaryRecord {
  id: string;
  member_id: string;
  member_name: string;
  badge_number: string;
  type: 'Elogio de Conduta' | 'Advertência Verbal' | 'Repreensão Fictícia' | 'Suspensão de Patrulha';
  title: string;
  description: string;
  official_name: string;
  date: string;
  resolution_status: 'Vigente' | 'Cumprida' | 'Arquivada';
}

export interface AuditLog {
  id: string;
  user_name: string;
  user_role: string;
  action: string;
  target_entity: string;
  details: string;
  timestamp: string;
  ip_masked: string;
}

export interface SiteSettings {
  discord_url: string;
  roblox_game_url: string;
  community_name: string;
  emergency_banner_text: string;
  emergency_banner_active: boolean;
  recruitment_global_active: boolean;
  server_patrol_status: 'Patrulhas Ativas' | 'Instrução em Curso' | 'Manutenção do Servidor' | 'Fora de Horário' | 'Em Breve';
  contact_email_fictional: string;
  last_updated: string;
  admin_secret_key: string; // Senha secreta para acesso administrativo restrito
  google_forms_recruitment_url: string; // Link oficial do Google Forms de recrutamento/inscrição
  google_forms_priority: boolean; // Se verdadeiro, dá prioridade visual ao Google Forms
}
