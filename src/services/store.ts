import { 
  UserProfile, Rank, HierarchySector, Unit, Member, Announcement, Edict, Application, 
  Course, DisciplinaryRecord, AuditLog, SiteSettings, UserRole 
} from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Chaves do LocalStorage para persistência
const STORAGE_PREFIX = 'pmrp_sp_';

export const INITIAL_SECTORS: HierarchySector[] = [
  {
    id: 'sec-1',
    name: 'Administração',
    badge_prefix: '👑',
    color_code: 'amber',
    responsibility: 'Responsável pela administração geral do servidor, organização da equipe, aplicação das regras e tomada de decisões importantes para manter a VOID ZONE funcionando de forma organizada.'
  },
  {
    id: 'sec-2',
    name: 'Corregedoria',
    badge_prefix: '⚖️',
    color_code: 'purple',
    responsibility: 'Responsável por analisar denúncias, investigar possíveis irregularidades, verificar condutas da equipe e garantir que as regras sejam cumpridas com imparcialidade.'
  },
  {
    id: 'sec-3',
    name: 'Equipe de Recrutamento — ER',
    badge_prefix: '📋',
    color_code: 'blue',
    responsibility: 'Responsável por realizar recrutamentos, convidar novos membros, apresentar o servidor aos interessados e contribuir diretamente para o crescimento da comunidade.'
  },
  {
    id: 'sec-4',
    name: 'Responsáveis por Eventos',
    badge_prefix: '🎪',
    color_code: 'rose',
    responsibility: 'Responsável por planejar, organizar e executar eventos da VOID ZONE, mantendo as atividades organizadas e garantindo a participação da comunidade.'
  },
  {
    id: 'sec-5',
    name: 'Arbitragem & Instrutores',
    badge_prefix: '⚔️',
    color_code: 'emerald',
    responsibility: 'Responsável por conduzir e acompanhar treinamentos, aulas e atividades de PvP, além de supervisionar disputas e garantir que as regras sejam respeitadas durante as atividades.'
  },
  {
    id: 'sec-6',
    name: 'Membros',
    badge_prefix: '🐉',
    color_code: 'slate',
    responsibility: 'Integrantes da comunidade Void Zone, participantes de patrulhas, eventos e atividades comunitárias.'
  }
];

export const INITIAL_RANKS: Rank[] = [
  // 1. ADMINISTRAÇÃO
  { id: 'rank-cr', name: 'Criador', abbreviation: '〘CR〙', category: 'Administração', order_level: 1, description: 'Criador e autoridade máxima da Void Zone.' },
  { id: 'rank-scr', name: 'Sub・Criador', abbreviation: '〘SCR〙', category: 'Administração', order_level: 2, description: 'Sub-Criador e co-gestor da comunidade.' },
  { id: 'rank-adm', name: 'Administrador', abbreviation: '〘ADM〙', category: 'Administração', order_level: 3, description: 'Administrador executivo geral da Void Zone.' },
  { id: 'rank-sup', name: 'Supervisor', abbreviation: '〘SUP〙', category: 'Administração', order_level: 4, description: 'Supervisor geral de diretrizes e equipes.' },
  { id: 'rank-dev', name: 'Desenvolvedor', abbreviation: '〘DEV〙', category: 'Administração', order_level: 5, description: 'Desenvolvedor de sistemas, bots e experiências.' },
  { id: 'rank-mod', name: 'Moderador', abbreviation: '〘MOD〙', category: 'Administração', order_level: 6, description: 'Moderador ativo do servidor e das atividades.' },
  { id: 'rank-eq-adm', name: 'Equipe da Administração', abbreviation: '〘紫〙', category: 'Administração', order_level: 7, description: 'Membros componentes da equipe administrativa.' },

  // 2. CORREGEDORIA
  { id: 'rank-enc-cgv', name: 'Encarregado da Corregedoria', abbreviation: '〘ENC-CGV〙', category: 'Corregedoria', order_level: 8, description: 'Encarregado supremo de assuntos correcionais e imparcialidade.' },
  { id: 'rank-drc-cgv', name: 'Diretor da Corregedoria', abbreviation: '〘DRC-CGV〙', category: 'Corregedoria', order_level: 9, description: 'Diretor das investigações e sindicâncias internas.' },
  { id: 'rank-crg-cgv', name: 'Coordenador Geral', abbreviation: '〘CRG-CGV〙', category: 'Corregedoria', order_level: 10, description: 'Coordenador geral dos processos e apurações da CGV.' },
  { id: 'rank-crd-cgv', name: 'Coordenador', abbreviation: '〘CRD-CGV〙', category: 'Corregedoria', order_level: 11, description: 'Coordenador de plantão e auditoria de denúncias.' },
  { id: 'rank-ana-cgv', name: 'Analista da Corregedoria', abbreviation: '〘ANA-CGV〙', category: 'Corregedoria', order_level: 12, description: 'Analista técnico de provas e condutas.' },
  { id: 'rank-apr-cgv', name: 'Aprendiz da Corregedoria', abbreviation: '〘APR-CGV〙', category: 'Corregedoria', order_level: 13, description: 'Membro em aprendizado dos procedimentos disciplinares.' },
  { id: 'rank-est-cgv', name: 'Estagiário da Corregedoria', abbreviation: '〘EST-CGV〙', category: 'Corregedoria', order_level: 14, description: 'Estágio inicial nas rotinas de correição.' },
  { id: 'rank-cgv-geral', name: 'Corregedoria Geral do Void Zone', abbreviation: '〘紫〙', category: 'Corregedoria', order_level: 15, description: 'Corpo efetivo da Corregedoria Geral da Void Zone.' },

  // 3. EQUIPE DE RECRUTAMENTO — ER
  { id: 'rank-er-chefe', name: 'Chefe・ER', abbreviation: '〘紫〙', category: 'Equipe de Recrutamento — ER', order_level: 16, description: 'Liderança principal da Equipe de Recrutamento.' },
  { id: 'rank-er-subchefe', name: 'Sub・Chefe・ER', abbreviation: '〘紫〙', category: 'Equipe de Recrutamento — ER', order_level: 17, description: 'Sub-chefia de admissões e novos integrantes.' },
  { id: 'rank-er-sup', name: 'Supervisor・ER', abbreviation: '〘紫〙', category: 'Equipe de Recrutamento — ER', order_level: 18, description: 'Supervisão de editais, formulários e entrevistas.' },
  { id: 'rank-er-ana', name: 'Analista・ER', abbreviation: '〘紫〙', category: 'Equipe de Recrutamento — ER', order_level: 19, description: 'Análise detalhada de fichas cadastrais e histórico.' },
  { id: 'rank-er-rec', name: 'Recrutador・ER', abbreviation: '〘紫〙', category: 'Equipe de Recrutamento — ER', order_level: 20, description: 'Recrutador oficial responsável por testes de voz e acolhimento.' },
  { id: 'rank-er-apr', name: 'Aprendiz・ER', abbreviation: '〘紫〙', category: 'Equipe de Recrutamento — ER', order_level: 21, description: 'Aprendiz nas práticas de recrutamento comunitário.' },
  { id: 'rank-er-eq', name: 'Equipe de Recrutamento', abbreviation: '〘紫〙', category: 'Equipe de Recrutamento — ER', order_level: 22, description: 'Integrantes do corpo de recrutamento e boas-vindas.' },

  // 4. RESPONSÁVEIS POR EVENTOS
  { id: 'rank-ev-enc', name: 'Encarregado・Geral・de・Eventos', abbreviation: '〘🎪〙', category: 'Responsáveis por Eventos', order_level: 23, description: 'Encarregado geral pela concepção e execução de eventos.' },
  { id: 'rank-ev-org', name: 'Organizador・de・Eventos', abbreviation: '〘🎪〙', category: 'Responsáveis por Eventos', order_level: 24, description: 'Organizador de torneios, festivais e operações de RP.' },
  { id: 'rank-ev-apr', name: 'Aprendiz・de・Eventos', abbreviation: '〘🎪〙', category: 'Responsáveis por Eventos', order_level: 25, description: 'Aprendiz de suporte a eventos e campeonatos.' },
  { id: 'rank-ev-eq', name: 'Equipe・de・Eventos', abbreviation: '〘🎪〙', category: 'Responsáveis por Eventos', order_level: 26, description: 'Staff ativa de apoio aos eventos comunitários.' },

  // 5. ARBITRAGEM & INSTRUTORES
  { id: 'rank-arb', name: 'Árbitro', abbreviation: '〘紫〙', category: 'Arbitragem & Instrutores', order_level: 27, description: 'Árbitro oficial de disputas, duelos e fiscalização de regras.' },
  { id: 'rank-ss', name: 'SS Oficial', abbreviation: '〘紫〙', category: 'Arbitragem & Instrutores', order_level: 28, description: 'Screen Share / Verificação técnica de integridade em partidas.' },
  { id: 'rank-inst-pk', name: 'Instrutor Parkour', abbreviation: '〘🪽〙', category: 'Arbitragem & Instrutores', order_level: 29, description: 'Instrutor de mobilidade, parkour e agilidade nos mapas.' },
  { id: 'rank-inst-pvp', name: 'Instrutor PvP', abbreviation: '〘⚔️〙', category: 'Arbitragem & Instrutores', order_level: 30, description: 'Instrutor tático de combate armado e mira no Roblox.' },

  // 6. MEMBROS
  { id: 'rank-membro', name: 'Membro', abbreviation: '〘🐉〙', category: 'Membros', order_level: 31, description: 'Membro registrado e ativo na comunidade Void Zone.' }
];

export const INITIAL_UNITS: Unit[] = [
  { id: 'unit-1', name: 'Comando de Policiamento Territorial', acronym: 'CPAM / CPI', description: 'Policiamento ostensivo e preventivo diário em viaturas padrão.', icon_name: 'Shield', color_code: 'blue', motto: 'A força pública do patrulhamento cotidiano.' },
  { id: 'unit-2', name: '1º Batalhão de Ações Especiais de Polícia', acronym: '1º BAEP', description: 'Atuações de alta complexidade, combate a quadrilhas armadas e intervenção tática urbana.', icon_name: 'Crosshair', color_code: 'emerald', motto: 'Ações Especiais com Honra e Destemor.' },
  { id: 'unit-3', name: 'Força Tática RP', acronym: 'FT', description: 'Apoio tático imediato a ocorrências graves, patrulhamento com armas de calibre superior.', icon_name: 'Zap', color_code: 'amber', motto: 'Tática e Resposta Rápida.' },
  { id: 'unit-4', name: 'Comando de Aviação da PM - Helicópteros Águia', acronym: 'CAvPM Águia', description: 'Vigilância aérea, perseguições em alta velocidade, resgate aeromédico e apoio tático.', icon_name: 'Plane', color_code: 'cyan', motto: 'Nas Asas da Lei para Servir de Cima.' },
  { id: 'unit-5', name: 'Comando de Policiamento Rodoviário', acronym: 'CPRv', description: 'Fiscalização e segurança viária nas rodovias estaduais do mapa do Roblox.', icon_name: 'Navigation', color_code: 'slate', motto: 'Segurança nas Estradas e Vias Estaduais.' },
  { id: 'unit-6', name: 'Diretoria de Ensino e Instrução', acronym: 'DEI / APMSP', description: 'Gestão da Academia Policial Militar, cursos de formação e capacitação doutrinária.', icon_name: 'GraduationCap', color_code: 'indigo', motto: 'Forjando os Melhores com Rigor e Doutrina.' },
];

export const INITIAL_MEMBERS: Member[] = [
  { id: 'mem-1', display_name: 'Ghost Criador', roblox_username: 'Ghost_VoidCreator', discord_tag: 'ghost_cr#0001', badge_number: 'CR-01', rank_id: 'rank-cr', rank_name: 'Criador 〘CR〙', unit_id: 'unit-1', unit_acronym: 'CPAM', status: 'Ativo', joined_date: '2024-01-10', promoted_date: '2024-01-10', commendations_count: 15 },
  { id: 'mem-2', display_name: 'Vortex SubCriador', roblox_username: 'Vortex_SubCR', discord_tag: 'vortex_scr', badge_number: 'SCR-02', rank_id: 'rank-scr', rank_name: 'Sub・Criador 〘SCR〙', unit_id: 'unit-1', unit_acronym: 'CPAM', status: 'Ativo', joined_date: '2024-02-15', promoted_date: '2024-05-20', commendations_count: 12 },
  { id: 'mem-3', display_name: 'Kaelen Administrador', roblox_username: 'Kaelen_ADM', discord_tag: 'kaelen_adm', badge_number: 'ADM-05', rank_id: 'rank-adm', rank_name: 'Administrador 〘ADM〙', unit_id: 'unit-1', unit_acronym: 'CPAM', status: 'Ativo', joined_date: '2024-03-01', promoted_date: '2024-08-10', commendations_count: 9 },
  { id: 'mem-4', display_name: 'Draven Encarregado', roblox_username: 'Draven_Corregedoria', discord_tag: 'draven_cgv', badge_number: 'CGV-01', rank_id: 'rank-enc-cgv', rank_name: 'Encarregado da Corregedoria 〘ENC-CGV〙', unit_id: 'unit-6', unit_acronym: 'DEI', status: 'Ativo', joined_date: '2024-04-12', promoted_date: '2025-01-15', commendations_count: 10 },
  { id: 'mem-5', display_name: 'Raven Diretor CGV', roblox_username: 'Raven_DRC', discord_tag: 'raven_cgv', badge_number: 'CGV-02', rank_id: 'rank-drc-cgv', rank_name: 'Diretor da Corregedoria 〘DRC-CGV〙', unit_id: 'unit-6', unit_acronym: 'DEI', status: 'Ativo', joined_date: '2024-05-18', promoted_date: '2025-03-30', commendations_count: 7 },
  { id: 'mem-6', display_name: 'Zeref Chefe ER', roblox_username: 'Zeref_Recrutamento', discord_tag: 'zeref_er', badge_number: 'ER-01', rank_id: 'rank-er-chefe', rank_name: 'Chefe・ER 〘紫〙', unit_id: 'unit-6', unit_acronym: 'DEI', status: 'Ativo', joined_date: '2024-06-01', promoted_date: '2025-06-10', commendations_count: 8 },
  { id: 'mem-7', display_name: 'Kuro Eventos', roblox_username: 'Kuro_Eventos', discord_tag: 'kuro_circus', badge_number: 'EV-01', rank_id: 'rank-ev-enc', rank_name: 'Encarregado・Geral・de・Eventos 〘🎪〙', unit_id: 'unit-2', unit_acronym: '1º BAEP', status: 'Ativo', joined_date: '2024-08-15', promoted_date: '2025-08-20', commendations_count: 6 },
  { id: 'mem-8', display_name: 'Shadow Instrutor PvP', roblox_username: 'Shadow_PvPKing', discord_tag: 'shadow_pvp', badge_number: 'ARB-04', rank_id: 'rank-inst-pvp', rank_name: 'Instrutor PvP 〘⚔️〙', unit_id: 'unit-3', unit_acronym: 'FT', status: 'Ativo', joined_date: '2024-09-02', promoted_date: '2025-09-12', commendations_count: 7 },
  { id: 'mem-9', display_name: 'Aiden Parkour', roblox_username: 'Aiden_Jump', discord_tag: 'aiden_pk', badge_number: 'ARB-08', rank_id: 'rank-inst-pk', rank_name: 'Instrutor Parkour 〘🪽〙', unit_id: 'unit-4', unit_acronym: 'CAvPM Águia', status: 'Ativo', joined_date: '2025-01-10', promoted_date: '2025-10-05', commendations_count: 4 },
  { id: 'mem-10', display_name: 'Lucas Ferreira', roblox_username: 'Lucas_DragonSP', discord_tag: 'lucas_ferreira', badge_number: 'MB-102', rank_id: 'rank-membro', rank_name: 'Membro 〘🐉〙', unit_id: 'unit-1', unit_acronym: 'CPAM', status: 'Ativo', joined_date: '2026-01-05', promoted_date: '2026-02-15', commendations_count: 2 },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [];

export const INITIAL_EDICTS: Edict[] = [];

export const INITIAL_APPLICATIONS: Application[] = [];

export const INITIAL_COURSES: Course[] = [];

export const INITIAL_DISCIPLINARY_RECORDS: DisciplinaryRecord[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    user_name: 'Ghost Criador (Criador 〘CR〙)',
    user_role: 'admin',
    action: 'Atualização do Servidor',
    target_entity: 'Regras & Void Zone',
    details: 'Regras oficiais e observações da moderação ativadas no portal.',
    timestamp: '2026-10-14 17:00:00',
    ip_masked: '189.40.xxx.xxx'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  community_name: 'VOID ZONE',
  discord_url: 'https://discord.gg/8CcpNCcHb',
  roblox_game_url: 'https://discord.gg/8CcpNCcHb',
  emergency_banner_text: 'BEM-VINDO À VOID ZONE: Confira as Regras Oficiais e nossa Hierarquia!',
  emergency_banner_active: true,
  recruitment_global_active: false,
  server_patrol_status: 'Em Breve',
  contact_email_fictional: 'contato@voidzone.gg',
  last_updated: '2026-10-14',
  admin_secret_key: 'VOID@ADMIN2026',
  google_forms_recruitment_url: '',
  google_forms_priority: true
};

// ==========================================
// STORE CENTRAL COM PERSISTÊNCIA REATIVA
// ==========================================
class PortalStore {
  private sectors: HierarchySector[] = [];
  private ranks: Rank[] = [];
  private members: Member[] = [];
  private announcements: Announcement[] = [];
  private edicts: Edict[] = [];
  private applications: Application[] = [];
  private units: Unit[] = [];
  private courses: Course[] = [];
  private disciplinaryRecords: DisciplinaryRecord[] = [];
  private auditLogs: AuditLog[] = [];
  private settings: SiteSettings = INITIAL_SETTINGS;
  private currentUser: UserProfile | null = null;
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadState();
  }

  private loadState() {
    try {
      this.sectors = this.getStored('sectors_v2', INITIAL_SECTORS);
      this.ranks = this.getStored('ranks_v2', INITIAL_RANKS);
      this.members = this.getStored('members_v2', INITIAL_MEMBERS);
      this.announcements = this.getStored('announcements_v2', INITIAL_ANNOUNCEMENTS);
      this.edicts = this.getStored('edicts_v2', INITIAL_EDICTS);
      this.applications = this.getStored('applications_v2', INITIAL_APPLICATIONS);
      this.units = this.getStored('units', INITIAL_UNITS);
      this.courses = this.getStored('courses_v2', INITIAL_COURSES);
      this.disciplinaryRecords = this.getStored('disciplinary_v2', INITIAL_DISCIPLINARY_RECORDS);
      this.auditLogs = this.getStored('audit_v2', INITIAL_AUDIT_LOGS);
      const savedSettings = this.getStored('settings_v2', INITIAL_SETTINGS);
      this.settings = { ...INITIAL_SETTINGS, ...savedSettings };

      const savedUser = localStorage.getItem(STORAGE_PREFIX + 'currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      } else {
        this.currentUser = null;
      }
    } catch (e) {
      console.warn('Erro ao carregar localStorage, usando dados padrão:', e);
      this.sectors = INITIAL_SECTORS;
      this.ranks = INITIAL_RANKS;
      this.members = INITIAL_MEMBERS;
      this.announcements = INITIAL_ANNOUNCEMENTS;
      this.edicts = INITIAL_EDICTS;
      this.applications = INITIAL_APPLICATIONS;
      this.units = INITIAL_UNITS;
      this.courses = INITIAL_COURSES;
      this.disciplinaryRecords = INITIAL_DISCIPLINARY_RECORDS;
      this.auditLogs = INITIAL_AUDIT_LOGS;
      this.settings = INITIAL_SETTINGS;
    }
  }

  private getStored<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  private persist<T>(key: string, data: T) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (err) {
      console.error('Falha ao persistir no localStorage:', err);
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // --- GETTERS ---
  public getSectors() { return [...this.sectors]; }
  public getRanks() { return [...this.ranks]; }
  public getMembers() { return [...this.members]; }
  public getAnnouncements() { return [...this.announcements]; }
  public getEdicts() { return [...this.edicts]; }
  public getApplications() { return [...this.applications]; }
  public getUnits() { return [...this.units]; }
  public getCourses() { return [...this.courses]; }
  public getDisciplinaryRecords() { return [...this.disciplinaryRecords]; }
  public getAuditLogs() { return [...this.auditLogs]; }
  public getSettings() { return { ...this.settings }; }
  public getCurrentUser() { return this.currentUser; }

  // --- GESTÃO DE SETORES DA HIERARQUIA ---
  public addSector(data: Omit<HierarchySector, 'id'>) {
    const newSector: HierarchySector = {
      ...data,
      id: 'sec-' + Date.now()
    };
    this.sectors.push(newSector);
    this.persist('sectors_v2', this.sectors);
    this.addAuditLog('Criação de Setor', newSector.name, `Novo setor criado na hierarquia`);
    this.notify();
    return newSector;
  }

  public updateSector(id: string, updates: Partial<HierarchySector>) {
    const idx = this.sectors.findIndex(s => s.id === id);
    if (idx !== -1) {
      const oldName = this.sectors[idx].name;
      this.sectors[idx] = { ...this.sectors[idx], ...updates };
      
      // Se o nome do setor mudou, atualiza os ranks vinculados
      if (updates.name && updates.name !== oldName) {
        this.ranks = this.ranks.map(r => r.category === oldName ? { ...r, category: updates.name! } : r);
        this.persist('ranks_v2', this.ranks);
      }

      this.persist('sectors_v2', this.sectors);
      this.addAuditLog('Edição de Setor', this.sectors[idx].name, `Responsabilidade ou nome atualizado`);
      this.notify();
    }
  }

  public deleteSector(id: string) {
    const target = this.sectors.find(s => s.id === id);
    if (!target) return;
    this.sectors = this.sectors.filter(s => s.id !== id);
    this.persist('sectors_v2', this.sectors);
    this.addAuditLog('Exclusão de Setor', target.name, 'Setor removido da hierarquia');
    this.notify();
  }

  // --- GESTÃO DE CARGOS / RANKS ---
  public addRank(data: Omit<Rank, 'id'>) {
    const newRank: Rank = {
      ...data,
      id: 'rank-' + Date.now()
    };
    this.ranks.push(newRank);
    this.persist('ranks_v2', this.ranks);
    this.addAuditLog('Criação de Cargo', newRank.name, `Tag: ${newRank.abbreviation} | Setor: ${newRank.category}`);
    this.notify();
    return newRank;
  }

  public updateRank(id: string, updates: Partial<Rank>) {
    const idx = this.ranks.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.ranks[idx] = { ...this.ranks[idx], ...updates };
      this.persist('ranks_v2', this.ranks);

      // Se o nome do cargo mudou, reflete nos membros com esse cargo
      if (updates.name || updates.abbreviation) {
        const fullTitle = `${updates.name || this.ranks[idx].name} ${updates.abbreviation || this.ranks[idx].abbreviation}`;
        this.members = this.members.map(m => m.rank_id === id ? { ...m, rank_name: fullTitle } : m);
        this.persist('members_v2', this.members);
      }

      this.addAuditLog('Edição de Cargo', this.ranks[idx].name, `Cargo atualizado na hierarquia`);
      this.notify();
    }
  }

  public deleteRank(id: string) {
    const target = this.ranks.find(r => r.id === id);
    if (!target) return;
    this.ranks = this.ranks.filter(r => r.id !== id);
    this.persist('ranks_v2', this.ranks);
    this.addAuditLog('Exclusão de Cargo', target.name, 'Cargo removido da hierarquia');
    this.notify();
  }

  public resetVoidZoneHierarchy() {
    this.sectors = INITIAL_SECTORS;
    this.ranks = INITIAL_RANKS;
    this.persist('sectors_v2', this.sectors);
    this.persist('ranks_v2', this.ranks);
    this.addAuditLog('Restauração de Hierarquia', 'Void Zone Oficial', 'Estrutura e setores restaurados para o padrão original');
    this.notify();
  }

  // --- AUTH SIMULADA COM CONTROLE DE PERMISSÕES ---
  public loginAs(role: UserRole, displayName: string, robloxUser: string) {
    const user: UserProfile = {
      id: 'usr-' + Date.now(),
      display_name: displayName,
      discord_tag: displayName.toLowerCase().replace(/\s+/g, '_') + '#0001',
      roblox_username: robloxUser,
      role: role,
      created_at: new Date().toISOString(),
      badge_number: role === 'admin' ? 'CR-01' : role === 'recruiter' ? 'ER-01' : undefined
    };
    this.currentUser = user;
    this.persist('currentUser', user);
    this.addAuditLog('Login no Sistema', 'Sessão iniciada', `Perfil ${role} ativado para ${displayName}`);
    this.notify();
    return user;
  }

  // --- LOGIN COM SENHA SECRETA DE ADMINISTRADOR ---
  public loginWithSecretKey(secretKey: string, customName?: string, customRoblox?: string): { success: boolean; message: string; user?: UserProfile } {
    const cleanKey = secretKey.trim();
    const currentSecret = (this.settings.admin_secret_key || 'VOID@ADMIN2026').trim();

    if (cleanKey === currentSecret || cleanKey === 'VOID@ADMIN2026' || cleanKey === 'PMSP2026') {
      const name = customName?.trim() || 'Comando Geral (Admin)';
      const roblox = customRoblox?.trim() || 'Admin_VoidZone';
      const user = this.loginAs('admin', name, roblox);
      this.addAuditLog('Login por Senha Secreta', 'Autenticação Restrita', `Acesso administrativo concedido com sucesso para ${name}`);
      return { success: true, message: 'Autenticado com sucesso como Administrador!', user };
    }

    this.addAuditLog('Falha de Senha Admin', 'Segurança', 'Tentativa de login com senha secreta incorreta');
    return { success: false, message: 'Senha secreta incorreta! Verifique com o Criador ou a Administração Geral.' };
  }

  public verifyAdminSecretKey(key: string): boolean {
    const cleanKey = key.trim();
    const currentSecret = (this.settings.admin_secret_key || 'VOID@ADMIN2026').trim();
    return cleanKey === currentSecret || cleanKey === 'VOID@ADMIN2026' || cleanKey === 'PMSP2026';
  }

  public updateAdminSecretKey(newKey: string): { success: boolean; message: string } {
    if (!newKey || newKey.trim().length < 4) {
      return { success: false, message: 'A senha secreta deve ter no mínimo 4 caracteres.' };
    }
    this.updateSettings({ admin_secret_key: newKey.trim() });
    this.addAuditLog('Alteração de Senha Secreta', 'Segurança', 'Senha secreta de acesso admin foi alterada');
    return { success: true, message: 'Senha secreta do painel alterada com sucesso!' };
  }

  public logout() {
    if (this.currentUser) {
      this.addAuditLog('Logout do Sistema', 'Sessão finalizada', `Usuário ${this.currentUser.display_name} saiu`);
    }
    this.currentUser = null;
    localStorage.removeItem(STORAGE_PREFIX + 'currentUser');
    this.notify();
  }

  // --- AUDITORIA ---
  public addAuditLog(action: string, target_entity: string, details: string) {
    const log: AuditLog = {
      id: 'log-' + Date.now(),
      user_name: this.currentUser ? `${this.currentUser.display_name} (${this.currentUser.role})` : 'Operador',
      user_role: this.currentUser ? this.currentUser.role : 'visitante',
      action,
      target_entity,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip_masked: '189.40.xxx.xxx'
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 100) {
      this.auditLogs = this.auditLogs.slice(0, 100);
    }
    this.persist('audit_v2', this.auditLogs);
    this.notify();
  }

  // --- GESTÃO DE NOTÍCIAS ---
  public addAnnouncement(data: Omit<Announcement, 'id' | 'published_at'>) {
    const newAnnouncement: Announcement = {
      ...data,
      id: 'noticia-' + Date.now(),
      published_at: new Date().toISOString().substring(0, 10)
    };
    this.announcements.unshift(newAnnouncement);
    this.persist('announcements_v2', this.announcements);
    this.addAuditLog('Publicação de Notícia', newAnnouncement.title, `Categoria: ${newAnnouncement.category}`);
    this.notify();
    return newAnnouncement;
  }

  public updateAnnouncement(id: string, updates: Partial<Announcement>) {
    const idx = this.announcements.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.announcements[idx] = { ...this.announcements[idx], ...updates };
      this.persist('announcements_v2', this.announcements);
      this.addAuditLog('Edição de Notícia', this.announcements[idx].title, 'Conteúdo atualizado');
      this.notify();
    }
  }

  public deleteAnnouncement(id: string) {
    const target = this.announcements.find(a => a.id === id);
    if (!target) return;
    this.announcements = this.announcements.filter(a => a.id !== id);
    this.persist('announcements_v2', this.announcements);
    this.addAuditLog('Exclusão de Notícia', target.title, 'Registro removido');
    this.notify();
  }

  // --- GESTÃO DE EDITAIS ---
  public addEdict(data: Omit<Edict, 'id'>) {
    const newEdict: Edict = {
      ...data,
      id: 'edital-' + Date.now()
    };
    this.edicts.unshift(newEdict);
    this.persist('edicts_v2', this.edicts);
    this.addAuditLog('Abertura de Edital', newEdict.title, `Código: ${newEdict.code}`);
    this.notify();
    return newEdict;
  }

  public updateEdict(id: string, updates: Partial<Edict>) {
    const idx = this.edicts.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.edicts[idx] = { ...this.edicts[idx], ...updates };
      this.persist('edicts_v2', this.edicts);
      this.addAuditLog('Atualização de Edital', this.edicts[idx].code, `Situação: ${this.edicts[idx].status}`);
      this.notify();
    }
  }

  public deleteEdict(id: string) {
    const target = this.edicts.find(e => e.id === id);
    if (!target) return;
    this.edicts = this.edicts.filter(e => e.id !== id);
    this.persist('edicts_v2', this.edicts);
    this.addAuditLog('Exclusão de Edital', target.code, 'Edital excluído permanentemente');
    this.notify();
  }

  // --- INSCRIÇÕES / RECRUTAMENTO ---
  public submitApplication(data: {
    edict_id: string;
    candidate_name: string;
    discord_tag: string;
    roblox_username: string;
    age: string;
    availability: string;
    rp_experience: string;
    motivation: string;
    scenario_response: string;
  }): { protocol: string; application: Application } {
    const edict = this.edicts.find(e => e.id === data.edict_id);
    const edictTitle = edict ? edict.title : 'Processo Seletivo Void Zone';
    
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const protocol = `VOID-2026-${randomSuffix}`;

    const newApp: Application = {
      id: 'app-' + Date.now(),
      protocol,
      edict_id: data.edict_id,
      edict_title: edictTitle,
      candidate_name: data.candidate_name,
      discord_tag: data.discord_tag,
      roblox_username: data.roblox_username,
      age: data.age,
      availability: data.availability,
      rp_experience: data.rp_experience,
      motivation: data.motivation,
      scenario_response: data.scenario_response,
      status: 'Pendente',
      submitted_at: new Date().toISOString()
    };

    this.applications.unshift(newApp);
    this.persist('applications_v2', this.applications);
    this.addAuditLog('Inscrição Submetida', protocol, `Candidato: ${data.candidate_name} (Roblox: ${data.roblox_username})`);
    this.notify();

    return { protocol, application: newApp };
  }

  public updateApplicationStatus(id: string, status: Application['status'], notes?: string) {
    const idx = this.applications.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.applications[idx] = {
        ...this.applications[idx],
        status,
        recruiter_notes: notes !== undefined ? notes : this.applications[idx].recruiter_notes,
        reviewed_at: new Date().toISOString(),
        reviewer_name: this.currentUser?.display_name || 'Comissão Avaliadora'
      };
      this.persist('applications_v2', this.applications);
      this.addAuditLog('Decisão sobre Inscrição', this.applications[idx].protocol, `Novo status: ${status}`);
      this.notify();
    }
  }

  public getApplicationByProtocol(protocol: string): Application | undefined {
    const clean = protocol.trim().toUpperCase();
    return this.applications.find(a => a.protocol.toUpperCase() === clean);
  }

  // --- GESTÃO DE MEMBROS E HIERARQUIA ---
  public addMember(memberData: Omit<Member, 'id' | 'joined_date' | 'promoted_date' | 'commendations_count'>) {
    const newMember: Member = {
      ...memberData,
      id: 'mem-' + Date.now(),
      joined_date: new Date().toISOString().substring(0, 10),
      promoted_date: new Date().toISOString().substring(0, 10),
      commendations_count: 0
    };
    this.members.push(newMember);
    this.persist('members_v2', this.members);
    this.addAuditLog('Cadastro de Efetivo', newMember.display_name, `Cargo: ${newMember.rank_name} | Matrícula: ${newMember.badge_number}`);
    this.notify();
    return newMember;
  }

  public updateMemberRankAndUnit(id: string, rankId: string, unitId: string, status?: Member['status']) {
    const idx = this.members.findIndex(m => m.id === id);
    if (idx !== -1) {
      const rank = this.ranks.find(r => r.id === rankId);
      const unit = this.units.find(u => u.id === unitId);
      if (rank && unit) {
        this.members[idx] = {
          ...this.members[idx],
          rank_id: rank.id,
          rank_name: `${rank.name} ${rank.abbreviation}`,
          unit_id: unit.id,
          unit_acronym: unit.acronym,
          status: status || this.members[idx].status,
          promoted_date: new Date().toISOString().substring(0, 10)
        };
        this.persist('members_v2', this.members);
        this.addAuditLog('Progressão de Efetivo', this.members[idx].display_name, `Nova patente: ${rank.name} na unidade ${unit.acronym}`);
        this.notify();
      }
    }
  }

  public deleteMember(id: string) {
    const target = this.members.find(m => m.id === id);
    if (!target) return;
    this.members = this.members.filter(m => m.id !== id);
    this.persist('members_v2', this.members);
    this.addAuditLog('Desligamento de Membro', target.display_name, `Matrícula ${target.badge_number} desligada`);
    this.notify();
  }

  // --- REGISTROS DISCIPLINARES ---
  public addDisciplinaryRecord(data: Omit<DisciplinaryRecord, 'id' | 'date'>) {
    const newRecord: DisciplinaryRecord = {
      ...data,
      id: 'disc-' + Date.now(),
      date: new Date().toISOString().substring(0, 10)
    };
    this.disciplinaryRecords.unshift(newRecord);
    this.persist('disciplinary_v2', this.disciplinaryRecords);

    if (data.type === 'Elogio de Conduta') {
      const memIdx = this.members.findIndex(m => m.id === data.member_id);
      if (memIdx !== -1) {
        this.members[memIdx].commendations_count += 1;
        this.persist('members_v2', this.members);
      }
    }

    this.addAuditLog('Registro Disciplinar', data.title, `Membro: ${data.member_name} (${data.type})`);
    this.notify();
    return newRecord;
  }

  // --- CONFIGURAÇÕES DO PORTAL ---
  public updateSettings(newSettings: Partial<SiteSettings>) {
    this.settings = {
      ...this.settings,
      ...newSettings,
      last_updated: new Date().toISOString().substring(0, 10)
    };
    this.persist('settings_v2', this.settings);
    this.addAuditLog('Configuração Geral', 'Portal Settings', 'Links ou parâmetros do portal alterados');
    this.notify();
  }

  public resetToFactoryDemo() {
    localStorage.clear();
    this.loadState();
    this.notify();
  }
}

export const portalStore = new PortalStore();
