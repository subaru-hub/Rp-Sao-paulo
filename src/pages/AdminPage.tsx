import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  LogOut, 
  User, 
  Shield, 
  FileText, 
  Award, 
  Users, 
  Settings, 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  Clock, 
  Check, 
  X,
  ExternalLink,
  MessageSquare,
  Gamepad2,
  Bell,
  Scale,
  RotateCcw,
  Eye,
  EyeOff,
  Key,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Copy
} from 'lucide-react';
import { 
  UserProfile, 
  Announcement, 
  Edict, 
  Application, 
  Member, 
  Rank, 
  HierarchySector,
  Unit, 
  DisciplinaryRecord, 
  AuditLog, 
  SiteSettings, 
  UserRole 
} from '../types';
import { portalStore } from '../services/store';

export const AdminPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(portalStore.getCurrentUser());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inscricoes' | 'editais' | 'noticias' | 'membros' | 'cargos' | 'disciplina' | 'logs' | 'config'>('dashboard');

  // Dados do Store
  const [announcements, setAnnouncements] = useState<Announcement[]>(portalStore.getAnnouncements());
  const [edicts, setEdicts] = useState<Edict[]>(portalStore.getEdicts());
  const [applications, setApplications] = useState<Application[]>(portalStore.getApplications());
  const [members, setMembers] = useState<Member[]>(portalStore.getMembers());
  const [sectors, setSectors] = useState<HierarchySector[]>(portalStore.getSectors());
  const [ranks, setRanks] = useState<Rank[]>(portalStore.getRanks());
  const [units, setUnits] = useState<Unit[]>(portalStore.getUnits());
  const [disciplinary, setDisciplinary] = useState<DisciplinaryRecord[]>(portalStore.getDisciplinaryRecords());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(portalStore.getAuditLogs());
  const [settings, setSettings] = useState<SiteSettings>(portalStore.getSettings());

  // Mensagens de feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados de modais de confirmação destrutiva
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'edital' | 'noticia' | 'membro';
    id: string;
    name: string;
  } | null>(null);

  // Estados de criação/edição
  const [showNewEdictModal, setShowNewEdictModal] = useState(false);
  const [showNewNewsModal, setShowNewNewsModal] = useState(false);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const [showNewDiscModal, setShowNewDiscModal] = useState(false);

  // Aplicação sendo avaliada
  const [reviewingApp, setReviewingApp] = useState<Application | null>(null);
  const [recruiterNoteInput, setRecruiterNoteInput] = useState('');

  // Autenticação com Senha Secreta de Administrador
  const [secretPasswordInput, setSecretPasswordInput] = useState('');
  const [showSecretPassword, setShowSecretPassword] = useState(false);
  const [operatorNameInput, setOperatorNameInput] = useState('');
  const [secretPasswordError, setSecretPasswordError] = useState<string | null>(null);
  const [showQuickDemoOptions, setShowQuickDemoOptions] = useState(false);

  // Formulário de Configuração de Senha e Forms
  const [newAdminSecretKey, setNewAdminSecretKey] = useState('');
  const [showConfigSecretPassword, setShowConfigSecretPassword] = useState(false);
  const [edictGoogleFormsUrl, setEdictGoogleFormsUrl] = useState('');

  // Formulário de Nova Notícia
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<Announcement['category']>('Geral');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');

  // Formulário de Novo Edital
  const [edictCode, setEdictCode] = useState('');
  const [edictTitle, setEdictTitle] = useState('');
  const [edictType, setEdictType] = useState<Edict['type']>('Soldado 2ª Classe (CFSd)');
  const [edictVacancies, setEdictVacancies] = useState(20);
  const [edictDescription, setEdictDescription] = useState('');
  const [edictEndDate, setEdictEndDate] = useState('2026-11-30');

  // Formulário de Novo Membro
  const [memName, setMemName] = useState('');
  const [memRoblox, setMemRoblox] = useState('');
  const [memDiscord, setMemDiscord] = useState('');
  const [memBadge, setMemBadge] = useState('');
  const [memRankId, setMemRankId] = useState(ranks[ranks.length - 1]?.id || 'rank-17');
  const [memUnitId, setMemUnitId] = useState(units[0]?.id || 'unit-1');

  // Formulário de Registro Disciplinar
  const [discMemberId, setDiscMemberId] = useState(members[0]?.id || '');
  const [discType, setDiscType] = useState<DisciplinaryRecord['type']>('Elogio de Conduta');
  const [discTitle, setDiscTitle] = useState('');
  const [discDesc, setDiscDesc] = useState('');

  // Filtros em abas
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('todos');

  useEffect(() => {
    return portalStore.subscribe(() => {
      setCurrentUser(portalStore.getCurrentUser());
      setAnnouncements(portalStore.getAnnouncements());
      setEdicts(portalStore.getEdicts());
      setApplications(portalStore.getApplications());
      setMembers(portalStore.getMembers());
      setSectors(portalStore.getSectors());
      setRanks(portalStore.getRanks());
      setUnits(portalStore.getUnits());
      setDisciplinary(portalStore.getDisciplinaryRecords());
      setAuditLogs(portalStore.getAuditLogs());
      setSettings(portalStore.getSettings());
    });
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Funções de Ação
  const handleLoginWithSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretPasswordInput.trim()) {
      setSecretPasswordError('Informe a senha secreta de acesso.');
      return;
    }

    const res = portalStore.loginWithSecretKey(secretPasswordInput, operatorNameInput.trim() || undefined);
    if (res.success) {
      setSecretPasswordError(null);
      setSecretPasswordInput('');
      triggerToast(res.message);
    } else {
      setSecretPasswordError(res.message);
    }
  };

  const handleUpdateSecretKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminSecretKey.trim()) return;
    const res = portalStore.updateAdminSecretKey(newAdminSecretKey.trim());
    if (res.success) {
      setNewAdminSecretKey('');
      triggerToast('Nova senha secreta configurada com sucesso!');
    } else {
      triggerToast(res.message);
    }
  };

  const handleLoginDemo = (role: UserRole, name: string, roblox: string) => {
    portalStore.loginAs(role, name, roblox);
    triggerToast(`Sessão iniciada como ${name} (${role})`);
  };

  const handleLogout = () => {
    portalStore.logout();
    triggerToast('Sessão encerrada com segurança.');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    portalStore.updateSettings(settings);
    triggerToast('Configurações do portal salvas com sucesso!');
  };

  const handleUpdateAppStatus = (appId: string, newStatus: Application['status']) => {
    portalStore.updateApplicationStatus(appId, newStatus, recruiterNoteInput || undefined);
    setReviewingApp(null);
    setRecruiterNoteInput('');
    triggerToast(`Inscrição atualizada para: ${newStatus}`);
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;
    portalStore.addAnnouncement({
      title: newsTitle.trim(),
      category: newsCategory,
      summary: newsSummary.trim(),
      content: newsContent.trim(),
      author_name: currentUser?.display_name || 'Comando Geral',
      author_rank: currentUser?.role === 'admin' ? 'Comando Geral RP' : 'Relações Públicas RP'
    });
    setShowNewNewsModal(false);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    triggerToast('Comunicado oficial publicado no portal!');
  };

  const handleCreateEdict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!edictCode.trim() || !edictTitle.trim()) return;
    portalStore.addEdict({
      code: edictCode.trim(),
      title: edictTitle.trim(),
      type: edictType,
      vacancies: Number(edictVacancies),
      description: edictDescription.trim(),
      status: 'Aberto',
      start_date: new Date().toISOString().substring(0, 10),
      end_date: edictEndDate,
      requirements: [
        'Conta no Roblox ativa e com boa reputação comunitária',
        'Conta no Discord para frequência de rádio',
        'Disponibilidade para treinamentos',
        'Conhecimento das normas de conduta da corporação'
      ],
      stages: [
        { name: '1ª Fase: Ficha e Análise Cadastral', description: 'Preenchimento neste portal.', date: 'Imediato' },
        { name: '2ª Fase: Teste Teórico e Entrevista', description: 'Via Discord oficial.', date: 'A agendar' }
      ],
      notes: 'Edital criado pela Diretoria de Ensino.',
      google_forms_url: edictGoogleFormsUrl.trim() || undefined
    });
    setShowNewEdictModal(false);
    setEdictCode('');
    setEdictTitle('');
    setEdictDescription('');
    setEdictGoogleFormsUrl('');
    triggerToast('Novo edital criado e aberto para inscrições!');
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memName.trim() || !memRoblox.trim() || !memBadge.trim()) return;
    const rank = ranks.find(r => r.id === memRankId);
    const unit = units.find(u => u.id === memUnitId);
    if (!rank || !unit) return;

    portalStore.addMember({
      display_name: memName.trim(),
      roblox_username: memRoblox.trim().replace(/^@/, ''),
      discord_tag: memDiscord.trim(),
      badge_number: memBadge.trim(),
      rank_id: rank.id,
      rank_name: rank.name,
      unit_id: unit.id,
      unit_acronym: unit.acronym,
      status: 'Ativo'
    });
    setShowNewMemberModal(false);
    setMemName('');
    setMemRoblox('');
    setMemDiscord('');
    setMemBadge('');
    triggerToast(`Membro ${memName} cadastrado com sucesso!`);
  };

  const handleCreateDisciplinary = (e: React.FormEvent) => {
    e.preventDefault();
    const mem = members.find(m => m.id === discMemberId);
    if (!mem || !discTitle.trim()) return;

    portalStore.addDisciplinaryRecord({
      member_id: mem.id,
      member_name: mem.display_name,
      badge_number: mem.badge_number,
      type: discType,
      title: discTitle.trim(),
      description: discDesc.trim(),
      official_name: currentUser?.display_name || 'Corregedoria RP',
      resolution_status: 'Vigente'
    });
    setShowNewDiscModal(false);
    setDiscTitle('');
    setDiscDesc('');
    triggerToast('Registro disciplinar anexado à ficha do integrante!');
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'edital') {
      portalStore.deleteEdict(deleteConfirm.id);
      triggerToast('Edital excluído permanentemente.');
    } else if (deleteConfirm.type === 'noticia') {
      portalStore.deleteAnnouncement(deleteConfirm.id);
      triggerToast('Notícia removida do portal.');
    } else if (deleteConfirm.type === 'membro') {
      portalStore.deleteMember(deleteConfirm.id);
      triggerToast('Membro desligado do efetivo.');
    }
    setDeleteConfirm(null);
  };

  // Se não estiver logado, exibe tela de login com Senha Secreta
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 animate-fade-in text-slate-900">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          <div className="bg-slate-900 text-white p-6 border-b border-amber-500/40 text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-amber-400">
              <Key className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-heraldic tracking-wide">
              Acesso Administrativo Restrito
            </h2>
            <p className="text-xs text-slate-400">
              Painel de Controle • VOID ZONE / PM RP SÃO PAULO
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Mensagem de Erro de Senha */}
            {secretPasswordError && (
              <div className="bg-rose-50 border border-rose-300 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-rose-800 animate-shake">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Acesso Negado:</strong> {secretPasswordError}
                </div>
              </div>
            )}

            {/* FORMULÁRIO DE LOGIN COM SENHA SECRETA */}
            <form onSubmit={handleLoginWithSecret} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Senha Secreta de Administrador *
                </label>
                <div className="relative">
                  <input
                    type={showSecretPassword ? "text" : "password"}
                    value={secretPasswordInput}
                    onChange={(e) => {
                      setSecretPasswordInput(e.target.value);
                      if (secretPasswordError) setSecretPasswordError(null);
                    }}
                    placeholder="Digite a senha secreta do admin..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-none transition-all pr-12 font-mono"
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretPassword(!showSecretPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    title={showSecretPassword ? "Ocultar senha" : "Ver senha"}
                  >
                    {showSecretPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex justify-between">
                  <span>Nome / Cargo de Exibição</span>
                  <span className="text-[10px] text-slate-400 font-normal lowercase">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={operatorNameInput}
                  onChange={(e) => setOperatorNameInput(e.target.value)}
                  placeholder="Ex: Ghost Criador ou Cel PM"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-900 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-blue-950/20 transition-all flex items-center justify-center gap-2 border border-amber-500/30 group active:scale-[0.99]"
              >
                <Lock className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Entrar com Senha Secreta</span>
              </button>
            </form>

            {/* Banner Informativo sobre a Senha Padrão */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>Senha Secreta Padrão Inicial:</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Utilize <code className="bg-amber-200/60 px-1.5 py-0.5 rounded font-mono font-bold text-amber-950">{settings.admin_secret_key || 'VOID@ADMIN2026'}</code> para primeiro acesso. Você poderá alterá-la para qualquer senha que desejar na aba <strong>Configurações</strong> do painel.
              </p>
            </div>

            {/* SEÇÃO EXPANSÍVEL: TESTE RÁPIDO DE CARGOS */}
            <div className="border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowQuickDemoOptions(!showQuickDemoOptions)}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1"
              >
                <span>Ou testar com perfis demonstrativos rápidos</span>
                {showQuickDemoOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showQuickDemoOptions && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  <button
                    onClick={() => handleLoginDemo('admin', 'Ghost Criador', 'Ghost_VoidCreator')}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
                  >
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-500" />
                        <span>Acesso Criador / Admin Geral</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Acesso total a todas as abas e configurações</div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-amber-600">Entrar &rarr;</span>
                  </button>

                  <button
                    onClick={() => handleLoginDemo('recruiter', 'Zeref Chefe ER', 'Zeref_Recrutamento')}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
                  >
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Equipe de Recrutamento (ER)</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Triagem de inscrições e editais</div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-600">Entrar &rarr;</span>
                  </button>

                  <button
                    onClick={() => handleLoginDemo('moderator', 'Moderador Void Zone', 'Mod_Void')}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
                  >
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Moderador / Relações Públicas</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Publicação de comunicados e notícias</div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-600">Entrar &rarr;</span>
                  </button>
                </div>
              )}
            </div>

            <div className="text-center text-[11px] text-slate-400">
              Segurança interna do portal com registro auditado de tentativas de acesso.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se logado, renderiza o Painel Administrativo Completo
  const pendingAppsCount = applications.filter(a => a.status === 'Pendente' || a.status === 'Em Análise').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in text-slate-900">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl border border-amber-500/50 shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header do Painel */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white border-2 border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-mono">
            {currentUser.badge_number || 'OP'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-heraldic text-white">
                Painel Administrativo da Corporação
              </h1>
              <span className="text-[10px] uppercase font-mono font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Conectado como <strong>{currentUser.display_name}</strong> • Matrícula {currentUser.badge_number || 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <button
            onClick={() => portalStore.resetToFactoryDemo()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="Restaura os dados de fábrica do mock para testes limpos"
          >
            Restaurar Demo
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-900 text-rose-200 text-xs font-semibold flex items-center gap-1.5 border border-rose-700/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Desconectar</span>
          </button>
        </div>
      </div>

      {/* Barra de Navegação em Abas do Painel */}
      <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-medium">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'dashboard' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Visão Geral</span>
        </button>

        <button
          onClick={() => setActiveTab('inscricoes')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'inscricoes' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Inscrições</span>
          {pendingAppsCount > 0 && (
            <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {pendingAppsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('editais')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'editais' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Editais ({edicts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('noticias')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'noticias' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notícias ({announcements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('membros')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'membros' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Efetivo ({members.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cargos')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'cargos' ? 'bg-white text-purple-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-purple-600" />
          <span>Hierarquia Void Zone ({ranks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('disciplina')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'disciplina' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Disciplinar & Elogios</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
            activeTab === 'logs' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Auditoria</span>
        </button>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'config' ? 'bg-white text-blue-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Configurações</span>
          </button>
        )}
      </div>

      {/* ABA: DASHBOARD / VISÃO GERAL */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Inscrições Pendentes</span>
              <div className="text-2xl font-bold font-mono text-amber-600 mt-1">{pendingAppsCount}</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Aguardando parecer da banca</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Efetivo Ativo</span>
              <div className="text-2xl font-bold font-mono text-blue-950 mt-1">{members.filter(m => m.status === 'Ativo').length}</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Integrantes em patrulha</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Editais Abertos</span>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">{edicts.filter(e => e.status === 'Aberto').length}</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Processos seletivos ativos</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Registros de Auditoria</span>
              <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{auditLogs.length}</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Operações registradas</span>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm font-heraldic text-slate-900">
              Ações Rápidas do Comando
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowNewNewsModal(true)}
                className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Publicar Comunicado</span>
              </button>

              <button
                onClick={() => setShowNewEdictModal(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Criar Novo Edital</span>
              </button>

              <button
                onClick={() => setShowNewMemberModal(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Cadastrar Membro</span>
              </button>

              <button
                onClick={() => setShowNewDiscModal(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300"
              >
                <Plus className="w-3.5 h-3.5 text-amber-600" />
                <span>Registrar Elogio/Advertência</span>
              </button>
            </div>
          </div>

          {/* Últimos Logs Rápidos */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm font-heraldic text-slate-900">
              Últimas Atividades Registradas no Sistema
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {auditLogs.slice(0, 5).map(log => (
                <div key={log.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">{log.action}: </span>
                    <span className="text-slate-600">{log.target_entity}</span>
                    <div className="text-[10px] text-slate-400">{log.details}</div>
                  </div>
                  <div className="text-right text-[10px] text-slate-400 font-mono">
                    <div>{log.user_name}</div>
                    <div>{log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABA: GESTÃO DE INSCRIÇÕES PRIVADAS */}
      {activeTab === 'inscricoes' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por protocolo, nome do candidato, Discord ou Roblox..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
              >
                <option value="todos">Todos os Status</option>
                <option value="Pendente">Pendentes</option>
                <option value="Em Análise">Em Análise</option>
                <option value="Aprovado na 1ª Fase">Aprovados na 1ª Fase</option>
                <option value="Convocado para Entrevista">Convocados para Entrevista</option>
                <option value="Aprovado">Aprovados</option>
                <option value="Indeferido">Indeferidos</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-200">
              {applications
                .filter(app => {
                  const matchSearch = 
                    app.candidate_name.toLowerCase().includes(appSearch.toLowerCase()) ||
                    app.protocol.toLowerCase().includes(appSearch.toLowerCase()) ||
                    app.roblox_username.toLowerCase().includes(appSearch.toLowerCase()) ||
                    app.discord_tag.toLowerCase().includes(appSearch.toLowerCase());
                  const matchStatus = appStatusFilter === 'todos' || app.status === appStatusFilter;
                  return matchSearch && matchStatus;
                })
                .map(app => (
                  <div key={app.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-2.5 py-1 rounded bg-slate-900 text-amber-400 font-mono font-bold text-xs">
                          {app.protocol}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{app.candidate_name}</h4>
                          <div className="text-[11px] text-slate-500">
                            Roblox: <strong>@{app.roblox_username}</strong> | Discord: <strong>{app.discord_tag}</strong> | Idade: {app.age}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900">
                          {app.status}
                        </span>
                        <button
                          onClick={() => {
                            setReviewingApp(app);
                            setRecruiterNoteInput(app.recruiter_notes || '');
                          }}
                          className="px-3 py-1 rounded bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold"
                        >
                          Avaliar Candidatura
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
                      <div>
                        <strong>Disponibilidade:</strong> {app.availability}
                      </div>
                      <div>
                        <strong>Experiência em RP:</strong> {app.rp_experience}
                      </div>
                      <div>
                        <strong>Resposta à Simulação de Abordagem:</strong> "{app.scenario_response}"
                      </div>
                      {app.recruiter_notes && (
                        <div className="text-blue-900 pt-1 border-t border-slate-200">
                          <strong>Parecer da Banca:</strong> "{app.recruiter_notes}" (por {app.reviewer_name || 'Comissão'})
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE AVALIAÇÃO DE CANDIDATURA */}
      {reviewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-900">
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  Julgamento de Ficha • {reviewingApp.protocol}
                </span>
                <h3 className="text-base font-bold font-heraldic">{reviewingApp.candidate_name}</h3>
              </div>
              <button onClick={() => setReviewingApp(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Parecer / Notas Internas do Recrutador
                </label>
                <textarea
                  rows={3}
                  value={recruiterNoteInput}
                  onChange={(e) => setRecruiterNoteInput(e.target.value)}
                  placeholder="Insira as observações sobre a conduta, histórico ou instruções para o candidato..."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Definir Novo Status da Candidatura
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleUpdateAppStatus(reviewingApp.id, 'Em Análise')}
                    className="p-2.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold"
                  >
                    Colocar Em Análise
                  </button>
                  <button
                    onClick={() => handleUpdateAppStatus(reviewingApp.id, 'Aprovado na 1ª Fase')}
                    className="p-2.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-semibold"
                  >
                    Aprovar 1ª Fase
                  </button>
                  <button
                    onClick={() => handleUpdateAppStatus(reviewingApp.id, 'Convocado para Entrevista')}
                    className="p-2.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-semibold"
                  >
                    Convocar p/ Entrevista
                  </button>
                  <button
                    onClick={() => handleUpdateAppStatus(reviewingApp.id, 'Aprovado')}
                    className="p-2.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold"
                  >
                    Aprovar Candidato
                  </button>
                  <button
                    onClick={() => handleUpdateAppStatus(reviewingApp.id, 'Indeferido')}
                    className="p-2.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 font-semibold col-span-2"
                  >
                    Indeferir / Reprovar Ficha
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setReviewingApp(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABA: GESTÃO DE EDITAIS */}
      {activeTab === 'editais' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm font-heraldic text-slate-900">
              Editais Cadastrados na Corporação
            </h3>
            <button
              onClick={() => setShowNewEdictModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Edital</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {edicts.map(ed => (
              <div key={ed.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold bg-slate-900 text-amber-400 px-2 py-0.5 rounded">
                    {ed.code}
                  </span>
                  <div className="flex items-center gap-1">
                    <select
                      value={ed.status}
                      onChange={(e) => portalStore.updateEdict(ed.id, { status: e.target.value as Edict['status'] })}
                      className="text-xs px-2 py-1 rounded border border-slate-300 font-semibold"
                    >
                      <option value="Aberto">Aberto</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Encerrado">Encerrado</option>
                      <option value="Previsto">Previsto</option>
                    </select>

                    <button
                      onClick={() => setDeleteConfirm({ type: 'edital', id: ed.id, name: ed.code })}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      title="Excluir edital"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-sm font-heraldic">{ed.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{ed.description}</p>

                {/* Google Forms Vinculado */}
                <div className="pt-1">
                  {ed.google_forms_url ? (
                    <div className="flex items-center justify-between bg-purple-50 p-2 rounded border border-purple-200 text-[11px] text-purple-900">
                      <span className="flex items-center gap-1 font-semibold">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-purple-700" />
                        <span>Google Forms Ativo</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={ed.google_forms_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1"
                        >
                          <span>Abrir</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => {
                            const url = prompt('Editar link do Google Forms para este edital:', ed.google_forms_url || '');
                            if (url !== null) {
                              portalStore.updateEdict(ed.id, { google_forms_url: url.trim() || undefined });
                              triggerToast('Link do Google Forms do edital atualizado!');
                            }
                          }}
                          className="text-[10px] text-slate-500 hover:text-slate-800"
                          title="Alterar link"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-400 italic flex items-center justify-between">
                      <span>Sem Google Forms específico</span>
                      <button
                        onClick={() => {
                          const url = prompt('Cole o link do Google Forms para este edital:', '');
                          if (url !== null && url.trim()) {
                            portalStore.updateEdict(ed.id, { google_forms_url: url.trim() });
                            triggerToast('Link do Google Forms vinculado com sucesso!');
                          }
                        }}
                        className="text-purple-700 hover:underline font-semibold not-italic"
                      >
                        + Vincular Google Forms
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
                  <span>Vagas: <strong>{ed.vacancies}</strong></span>
                  <span>Término: <strong>{ed.end_date}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: GESTÃO DE NOTÍCIAS */}
      {activeTab === 'noticias' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm font-heraldic text-slate-900">
              Comunicados e Portarias do Portal
            </h3>
            <button
              onClick={() => setShowNewNewsModal(true)}
              className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Novo Comunicado</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(news => (
              <div key={news.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-900 px-2 py-0.5 rounded">
                      {news.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{news.published_at}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{news.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{news.summary}</p>
                </div>

                <button
                  onClick={() => setDeleteConfirm({ type: 'noticia', id: news.id, name: news.title })}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                  title="Excluir comunicado"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: GESTÃO DE MEMBROS E HIERARQUIA */}
      {activeTab === 'membros' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm font-heraldic text-slate-900">
              Quadro de Integrantes da Corporação
            </h3>
            <button
              onClick={() => setShowNewMemberModal(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Novo Integrante</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-200">
              {members.map(mem => (
                <div key={mem.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded bg-slate-900 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                      {mem.badge_number}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{mem.display_name}</div>
                      <div className="text-slate-500 text-[11px]">
                        Roblox: @{mem.roblox_username} | Discord: {mem.discord_tag}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Altera Patente */}
                    <select
                      value={mem.rank_id}
                      onChange={(e) => portalStore.updateMemberRankAndUnit(mem.id, e.target.value, mem.unit_id)}
                      className="px-2 py-1 rounded border border-slate-300 font-medium bg-white"
                    >
                      {ranks.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>

                    {/* Altera Unidade */}
                    <select
                      value={mem.unit_id}
                      onChange={(e) => portalStore.updateMemberRankAndUnit(mem.id, mem.rank_id, e.target.value)}
                      className="px-2 py-1 rounded border border-slate-300 font-medium bg-white"
                    >
                      {units.map(u => (
                        <option key={u.id} value={u.id}>{u.acronym}</option>
                      ))}
                    </select>

                    {/* Altera Status */}
                    <select
                      value={mem.status}
                      onChange={(e) => portalStore.updateMemberRankAndUnit(mem.id, mem.rank_id, mem.unit_id, e.target.value as Member['status'])}
                      className="px-2 py-1 rounded border border-slate-300 font-medium bg-white"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Reserva">Reserva</option>
                      <option value="Afastado">Afastado</option>
                    </select>

                    <button
                      onClick={() => setDeleteConfirm({ type: 'membro', id: mem.id, name: mem.display_name })}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                      title="Desligar membro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABA: GESTÃO DE CARGOS & HIERARQUIA VOID ZONE */}
      {activeTab === 'cargos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-950 text-white p-5 rounded-2xl border border-purple-500/40">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                <span>𒀭</span>
                <span>ESTRUTURA HIERÁRQUICA VOID ZONE</span>
              </div>
              <h3 className="font-bold text-lg font-heraldic mt-0.5">
                Gestão Oficial de Setores & Cargos
              </h3>
              <p className="text-xs text-purple-200 mt-1 max-w-2xl leading-relaxed">
                Aqui você pode editar as responsabilidades dos setores (Administração, Corregedoria, ER, Eventos, Arbitragem, Membros), criar novos cargos, renomear tags (ex: 〘CR〙, 〘ENC-CGV〙) ou reordenar níveis.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  window.location.hash = 'hierarquia';
                  triggerToast('Redirecionando para a visão pública da hierarquia com editor.');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Abrir Editor Visual</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Restaurar toda a hierarquia para o padrão inicial da Void Zone?')) {
                    portalStore.resetVoidZoneHierarchy();
                    triggerToast('Hierarquia Void Zone restaurada com sucesso!');
                  }
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700"
                title="Restaurar padrão Void Zone"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Listagem dos Setores e Responsabilidades */}
          <div className="space-y-6">
            {sectors.map((sec) => {
              const secRanks = ranks.filter(r => r.category === sec.name).sort((a, b) => a.order_level - b.order_level);
              return (
                <div key={sec.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{sec.badge_prefix || '👑'}</span>
                      <h4 className="font-bold text-sm font-heraldic tracking-wide">
                        {sec.name.toUpperCase()}
                      </h4>
                      <span className="text-[11px] text-purple-300 font-mono">
                        ({secRanks.length} cargos)
                      </span>
                    </div>

                    <div className="text-xs text-slate-400">
                      Responsabilidade Ativa
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs text-slate-700">
                    <strong className="text-slate-900">Responsabilidade:</strong> {sec.responsibility}
                  </div>

                  <div className="p-4 divide-y divide-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {secRanks.map(r => (
                        <div key={r.id} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-2 text-xs">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 bg-slate-900 text-amber-400 font-mono font-bold text-[10px] rounded">
                                {r.abbreviation}
                              </span>
                              <span className="font-bold text-slate-900">@{r.name}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{r.description}</div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                            Nv {r.order_level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ABA: REGISTROS DISCIPLINARES & ELOGIOS */}
      {activeTab === 'disciplina' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm font-heraldic text-slate-900">
              Registros da Corregedoria Fictícia & Elogios de Conduta
            </h3>
            <button
              onClick={() => setShowNewDiscModal(true)}
              className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Novo Registro</span>
            </button>
          </div>

          <div className="space-y-3">
            {disciplinary.map(rec => (
              <div key={rec.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                      rec.type === 'Elogio de Conduta' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {rec.type}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{rec.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{rec.date}</span>
                </div>

                <div className="text-slate-600">
                  <strong>Integrante:</strong> {rec.member_name} (Matrícula {rec.badge_number}) • <strong>Responsável:</strong> {rec.official_name}
                </div>

                <p className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100">
                  {rec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: AUDITORIA */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm font-heraldic text-slate-900">
            Registro Histórico de Auditoria & Alterações (Audit Logs)
          </h3>
          <p className="text-xs text-slate-500">
            Todas as modificações administrativas em editais, notas de recrutamento e efetivo são registradas com identificação de operador.
          </p>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-bold text-blue-950 font-mono">{log.action}</span>
                  <span className="text-slate-600"> &mdash; {log.target_entity}</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">{log.details}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono shrink-0">
                  <div>Operador: <strong>{log.user_name}</strong></div>
                  <div>{log.timestamp} • IP: {log.ip_masked}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: CONFIGURAÇÕES DO PORTAL */}
      {activeTab === 'config' && currentUser.role === 'admin' && (
        <div className="space-y-6">
          {/* SEÇÃO 1: LINKS GERAIS E BANNER */}
          <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm font-heraldic text-slate-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-950" />
                <span>Configurações Gerais do Portal Institucional</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Gerencie links públicos do Discord, Roblox e o banner de avisos urgentes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Link de Convite do Discord *
                </label>
                <input
                  type="text"
                  value={settings.discord_url}
                  onChange={(e) => setSettings({ ...settings, discord_url: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none focus:border-blue-950"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Link da Experiência no Roblox *
                </label>
                <input
                  type="text"
                  value={settings.roblox_game_url}
                  onChange={(e) => setSettings({ ...settings, roblox_game_url: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none focus:border-blue-950"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Texto do Banner de Comunicado Urgente
                </label>
                <input
                  type="text"
                  value={settings.emergency_banner_text}
                  onChange={(e) => setSettings({ ...settings, emergency_banner_text: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none focus:border-blue-950"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Status das Patrulhas no Servidor
                </label>
                <select
                  value={settings.server_patrol_status}
                  onChange={(e) => setSettings({ ...settings, server_patrol_status: e.target.value as SiteSettings['server_patrol_status'] })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="Patrulhas Ativas">Patrulhas Ativas</option>
                  <option value="Instrução em Curso">Instrução em Curso</option>
                  <option value="Manutenção do Servidor">Manutenção do Servidor</option>
                  <option value="Fora de Horário">Fora de Horário</option>
                  <option value="Em Breve">Em Breve</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-5">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={settings.emergency_banner_active}
                    onChange={(e) => setSettings({ ...settings, emergency_banner_active: e.target.checked })}
                    className="rounded text-blue-950"
                  />
                  <span>Exibir banner no topo do portal</span>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition-colors shadow"
              >
                Salvar Links & Banner
              </button>
            </div>
          </form>

          {/* SEÇÃO 2: LINK DO GOOGLE FORMS */}
          <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-bold text-sm font-heraldic text-slate-900">
                  <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  </div>
                  <span>Integração com Google Forms (Inscrições & Recrutamento)</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Insira o link do seu formulário do Google Forms para que os membros e candidatos possam se inscrever diretamente por ele.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold font-mono">
                GOOGLE FORMS
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Link Oficial do Google Forms</span>
                  {settings.google_forms_recruitment_url && (
                    <a
                      href={settings.google_forms_recruitment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Testar link no navegador</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://docs.google.com/forms/d/e/.../viewform ou https://forms.gle/..."
                    value={settings.google_forms_recruitment_url}
                    onChange={(e) => setSettings({ ...settings, google_forms_recruitment_url: e.target.value })}
                    className="flex-1 p-2.5 rounded-lg border border-slate-300 outline-none focus:border-purple-600 font-mono text-xs"
                  />
                  {settings.google_forms_recruitment_url && (
                    <a
                      href={settings.google_forms_recruitment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg font-bold flex items-center gap-1.5 hover:bg-purple-100 transition-colors shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir</span>
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Cole o link público gerado no Google Forms (clique em <em>Enviar &rarr; Ícone de Link &rarr; Copiar</em>).
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={settings.google_forms_priority}
                    onChange={(e) => setSettings({ ...settings, google_forms_priority: e.target.checked })}
                    className="mt-0.5 rounded text-purple-600"
                  />
                  <div>
                    <span>Exibir Google Forms como método prioritário e recomendado</span>
                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                      Quando ativado, os candidatos verão um botão em destaque na página de Inscrições e Editais para preencher diretamente no Google Forms.
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3.5 text-[11px] text-purple-900 space-y-1">
                <strong>📌 Dica para os Administradores & Recrutadores:</strong>
                <p className="leading-relaxed">
                  Além deste link geral de recrutamento, você também pode cadastrar um link específico de Google Forms para <em>cada edital individual</em> na aba <strong>Editais</strong>!
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs rounded-lg transition-colors shadow"
              >
                Salvar Link do Google Forms
              </button>
            </div>
          </form>

          {/* SEÇÃO 3: SENHA SECRETA DE ADMINISTRADOR */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-bold text-sm font-heraldic text-slate-900">
                  <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Key className="w-3.5 h-3.5" />
                  </div>
                  <span>Senha Secreta dos Administradores</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Defina a senha secreta que dá acesso completo ao Painel Administrativo.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold font-mono">
                SEGURANÇA
              </span>
            </div>

            {/* Senha Secreta Atual */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Senha Secreta Atual</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm font-bold text-slate-900 bg-white px-3 py-1 rounded border border-slate-300">
                      {showConfigSecretPassword ? (settings.admin_secret_key || 'VOID@ADMIN2026') : '••••••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowConfigSecretPassword(!showConfigSecretPassword)}
                      className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
                      title={showConfigSecretPassword ? "Ocultar senha" : "Ver senha"}
                    >
                      {showConfigSecretPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 max-w-xs">
                  Compartilhe esta chave somente com Criadores e Administradores de confiança.
                </div>
              </div>

              {/* Formulário para Alterar a Senha Secreta */}
              <form onSubmit={handleUpdateSecretKey} className="space-y-3 pt-2">
                <label className="block font-bold text-slate-800">
                  Definir Nova Senha Secreta de Admin
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newAdminSecretKey}
                    onChange={(e) => setNewAdminSecretKey(e.target.value)}
                    placeholder="Digite a nova senha secreta (mínimo 4 caracteres)..."
                    className="flex-1 p-2.5 rounded-lg border border-slate-300 font-mono text-xs outline-none focus:border-amber-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Atualizar Senha Secreta</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  A nova senha entrará em vigor imediatamente para todos os logins no painel.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE OPERAÇÃO DESTRUTIVA */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-rose-300 max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base">Confirmar Exclusão</h3>
              <p className="text-xs text-slate-600 mt-1">
                Tem certeza de que deseja excluir permanentemente o registro <strong>{deleteConfirm.name}</strong>? Esta ação é irreversível.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded"
              >
                Cancelar
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded shadow"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NOVO EDITAL */}
      {showNewEdictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleCreateEdict} className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-900">
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex justify-between items-center">
              <h3 className="font-bold font-heraldic text-base">Abertura de Novo Edital</h3>
              <button type="button" onClick={() => setShowNewEdictModal(false)}>✕</button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Código do Edital *</label>
                <input type="text" placeholder="Ex: EDITAL-2026/03-ROCAM" value={edictCode} onChange={(e) => setEdictCode(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block font-bold mb-1">Título do Concurso *</label>
                <input type="text" placeholder="Ex: Curso de Patrulhamento Motorizado" value={edictTitle} onChange={(e) => setEdictTitle(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Modalidade</label>
                  <select value={edictType} onChange={(e) => setEdictType(e.target.value as Edict['type'])} className="w-full p-2 border rounded bg-white">
                    <option value="Soldado 2ª Classe (CFSd)">Soldado 2ª Classe (CFSd)</option>
                    <option value="Oficial de Choque">Oficial de Choque</option>
                    <option value="Piloto Águia">Piloto Águia</option>
                    <option value="Policiamento Rodoviário">Policiamento Rodoviário</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Número de Vagas</label>
                  <input type="number" value={edictVacancies} onChange={(e) => setEdictVacancies(Number(e.target.value))} className="w-full p-2 border rounded" required />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Descrição</label>
                <textarea rows={2} value={edictDescription} onChange={(e) => setEdictDescription(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div className="bg-purple-50/70 p-3 rounded-lg border border-purple-200">
                <label className="block font-bold mb-1 text-purple-900 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-purple-700" />
                  <span>Link do Google Forms deste Edital (Opcional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/forms/d/e/.../viewform ou https://forms.gle/..."
                  value={edictGoogleFormsUrl}
                  onChange={(e) => setEdictGoogleFormsUrl(e.target.value)}
                  className="w-full p-2 border border-purple-300 rounded bg-white font-mono text-xs focus:border-purple-600 outline-none"
                />
                <p className="text-[10px] text-purple-800 mt-1">
                  Se preenchido, os candidatos verão um botão direto para o Google Forms deste concurso.
                </p>
              </div>
            </div>
            <div className="p-4 bg-slate-100 flex justify-end gap-2 text-xs">
              <button type="button" onClick={() => setShowNewEdictModal(false)} className="px-3 py-1.5 bg-slate-200 rounded">Cancelar</button>
              <button type="submit" className="px-4 py-1.5 bg-amber-500 font-bold rounded">Publicar Edital</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL NOVA NOTÍCIA */}
      {showNewNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleCreateNews} className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-900">
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex justify-between items-center">
              <h3 className="font-bold font-heraldic text-base">Publicar Novo Comunicado</h3>
              <button type="button" onClick={() => setShowNewNewsModal(false)}>✕</button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Título *</label>
                <input type="text" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block font-bold mb-1">Categoria</label>
                <select value={newsCategory} onChange={(e) => setNewsCategory(e.target.value as Announcement['category'])} className="w-full p-2 border rounded bg-white">
                  <option value="Geral">Geral</option>
                  <option value="Convocação">Convocação</option>
                  <option value="Operações">Operações</option>
                  <option value="Promoções">Promoções</option>
                  <option value="Instrução">Instrução</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Resumo Rápido</label>
                <input type="text" value={newsSummary} onChange={(e) => setNewsSummary(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block font-bold mb-1">Conteúdo Completo</label>
                <textarea rows={4} value={newsContent} onChange={(e) => setNewsContent(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
            </div>
            <div className="p-4 bg-slate-100 flex justify-end gap-2 text-xs">
              <button type="button" onClick={() => setShowNewNewsModal(false)} className="px-3 py-1.5 bg-slate-200 rounded">Cancelar</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-950 text-white font-bold rounded">Publicar Notícia</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL NOVO MEMBRO */}
      {showNewMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleCreateMember} className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-slate-900">
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex justify-between items-center">
              <h3 className="font-bold font-heraldic text-base">Cadastrar Novo Integrante</h3>
              <button type="button" onClick={() => setShowNewMemberModal(false)}>✕</button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Nome de Exibição / Nome RP *</label>
                <input type="text" placeholder="Ex: Felipe Silveira" value={memName} onChange={(e) => setMemName(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Roblox Username *</label>
                  <input type="text" placeholder="sem @" value={memRoblox} onChange={(e) => setMemRoblox(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div>
                  <label className="block font-bold mb-1">Discord Tag *</label>
                  <input type="text" placeholder="usuario#0000" value={memDiscord} onChange={(e) => setMemDiscord(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Número de Matrícula (Badge) *</label>
                <input type="text" placeholder="Ex: 345" value={memBadge} onChange={(e) => setMemBadge(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Patente Inicial</label>
                  <select value={memRankId} onChange={(e) => setMemRankId(e.target.value)} className="w-full p-2 border rounded bg-white">
                    {ranks.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Batalhão / Unidade</label>
                  <select value={memUnitId} onChange={(e) => setMemUnitId(e.target.value)} className="w-full p-2 border rounded bg-white">
                    {units.map(u => (
                      <option key={u.id} value={u.id}>{u.acronym}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-100 flex justify-end gap-2 text-xs">
              <button type="button" onClick={() => setShowNewMemberModal(false)} className="px-3 py-1.5 bg-slate-200 rounded">Cancelar</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-950 text-white font-bold rounded">Efetivar Membro</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL NOVO REGISTRO DISCIPLINAR */}
      {showNewDiscModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleCreateDisciplinary} className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-slate-900">
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex justify-between items-center">
              <h3 className="font-bold font-heraldic text-base">Registrar na Ficha Funcional</h3>
              <button type="button" onClick={() => setShowNewDiscModal(false)}>✕</button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Selecione o Integrante *</label>
                <select value={discMemberId} onChange={(e) => setDiscMemberId(e.target.value)} className="w-full p-2 border rounded bg-white">
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.display_name} (Mat. {m.badge_number} - {m.rank_name})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Tipo de Registro</label>
                <select value={discType} onChange={(e) => setDiscType(e.target.value as DisciplinaryRecord['type'])} className="w-full p-2 border rounded bg-white">
                  <option value="Elogio de Conduta">Elogio de Conduta (+1 Mérito)</option>
                  <option value="Advertência Verbal">Advertência Verbal</option>
                  <option value="Repreensão Fictícia">Repreensão Fictícia</option>
                  <option value="Suspensão de Patrulha">Suspensão de Patrulha</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Motivo / Título Resumido *</label>
                <input type="text" placeholder="Ex: Conduta exemplar durante cerco" value={discTitle} onChange={(e) => setDiscTitle(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block font-bold mb-1">Descrição / Fundamentação</label>
                <textarea rows={3} value={discDesc} onChange={(e) => setDiscDesc(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
            </div>
            <div className="p-4 bg-slate-100 flex justify-end gap-2 text-xs">
              <button type="button" onClick={() => setShowNewDiscModal(false)} className="px-3 py-1.5 bg-slate-200 rounded">Cancelar</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-950 text-white font-bold rounded">Anexar Registro</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
