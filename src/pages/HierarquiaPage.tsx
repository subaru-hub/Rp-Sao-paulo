import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Shield, 
  Award, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  ChevronRight, 
  Sparkles, 
  Scale, 
  UserPlus, 
  Info,
  Crown,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Member, Rank, HierarchySector, Unit } from '../types';
import { portalStore } from '../services/store';

interface HierarquiaPageProps {
  members: Member[];
  ranks: Rank[];
  sectors?: HierarchySector[];
  units: Unit[];
}

export const HierarquiaPage: React.FC<HierarquiaPageProps> = ({ 
  members, 
  ranks, 
  units 
}) => {
  const [sectors, setSectors] = useState<HierarchySector[]>(portalStore.getSectors());
  const [currentRanks, setCurrentRanks] = useState<Rank[]>(portalStore.getRanks());
  const [currentMembers, setCurrentMembers] = useState<Member[]>(portalStore.getMembers());
  
  // Controle do Modo de Edição
  const [editMode, setEditMode] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('todos');

  // Modais de Edição
  const [editingRank, setEditingRank] = useState<Rank | null>(null);
  const [isCreatingRank, setIsCreatingRank] = useState(false);
  const [targetSectorForNewRank, setTargetSectorForNewRank] = useState<string>('Administração');

  const [editingSector, setEditingSector] = useState<HierarchySector | null>(null);
  const [isCreatingSector, setIsCreatingSector] = useState(false);

  const [assigningMemberRank, setAssigningMemberRank] = useState<Rank | null>(null);
  const [selectedMemberToAssign, setSelectedMemberToAssign] = useState<string>('');

  // Formulário de Cargo (Rank)
  const [rankFormName, setRankFormName] = useState('');
  const [rankFormTag, setRankFormTag] = useState('');
  const [rankFormCategory, setRankFormCategory] = useState('');
  const [rankFormDesc, setRankFormDesc] = useState('');
  const [rankFormOrder, setRankFormOrder] = useState<number>(1);

  // Formulário de Setor
  const [sectorFormName, setSectorFormName] = useState('');
  const [sectorFormBadge, setSectorFormBadge] = useState('👑');
  const [sectorFormResp, setSectorFormResp] = useState('');

  // Notificação Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Atualiza dados locais quando a store mudar
  React.useEffect(() => {
    return portalStore.subscribe(() => {
      setSectors(portalStore.getSectors());
      setCurrentRanks(portalStore.getRanks());
      setCurrentMembers(portalStore.getMembers());
    });
  }, []);

  // Abre modal para novo cargo
  const handleOpenNewRank = (sectorName?: string) => {
    setRankFormName('');
    setRankFormTag('〘TAG〙');
    setRankFormCategory(sectorName || sectors[0]?.name || 'Administração');
    setRankFormDesc('');
    setRankFormOrder(currentRanks.length + 1);
    setIsCreatingRank(true);
    setEditingRank(null);
  };

  // Abre modal para editar cargo existente
  const handleOpenEditRank = (rank: Rank) => {
    setEditingRank(rank);
    setRankFormName(rank.name);
    setRankFormTag(rank.abbreviation);
    setRankFormCategory(rank.category);
    setRankFormDesc(rank.description);
    setRankFormOrder(rank.order_level);
    setIsCreatingRank(false);
  };

  // Salva criação ou edição de cargo
  const handleSaveRank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rankFormName.trim()) return;

    if (isCreatingRank) {
      portalStore.addRank({
        name: rankFormName.trim(),
        abbreviation: rankFormTag.trim() || '〘紫〙',
        category: rankFormCategory,
        order_level: Number(rankFormOrder) || currentRanks.length + 1,
        description: rankFormDesc.trim() || 'Função e atribuição dentro da hierarquia.'
      });
      showToast(`Cargo "${rankFormName}" criado com sucesso!`);
    } else if (editingRank) {
      portalStore.updateRank(editingRank.id, {
        name: rankFormName.trim(),
        abbreviation: rankFormTag.trim(),
        category: rankFormCategory,
        order_level: Number(rankFormOrder),
        description: rankFormDesc.trim()
      });
      showToast(`Cargo "${rankFormName}" atualizado com sucesso!`);
    }

    setIsCreatingRank(false);
    setEditingRank(null);
  };

  // Exclui cargo com confirmação
  const handleDeleteRank = (rank: Rank) => {
    if (confirm(`Tem certeza que deseja excluir o cargo "${rank.name} ${rank.abbreviation}"?`)) {
      portalStore.deleteRank(rank.id);
      showToast(`Cargo "${rank.name}" excluído.`);
    }
  };

  // Abre modal para editar responsabilidade do setor
  const handleOpenEditSector = (sector: HierarchySector) => {
    setEditingSector(sector);
    setSectorFormName(sector.name);
    setSectorFormBadge(sector.badge_prefix || '👑');
    setSectorFormResp(sector.responsibility);
    setIsCreatingSector(false);
  };

  // Salva setor
  const handleSaveSector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectorFormName.trim()) return;

    if (isCreatingSector) {
      portalStore.addSector({
        name: sectorFormName.trim(),
        badge_prefix: sectorFormBadge.trim() || '👑',
        responsibility: sectorFormResp.trim(),
        color_code: 'purple'
      });
      showToast(`Novo setor "${sectorFormName}" criado!`);
    } else if (editingSector) {
      portalStore.updateSector(editingSector.id, {
        name: sectorFormName.trim(),
        badge_prefix: sectorFormBadge.trim(),
        responsibility: sectorFormResp.trim()
      });
      showToast(`Responsabilidade do setor "${sectorFormName}" atualizada!`);
    }

    setEditingSector(null);
    setIsCreatingSector(false);
  };

  // Atribuição de membro
  const handleAssignMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningMemberRank || !selectedMemberToAssign) return;

    const member = currentMembers.find(m => m.id === selectedMemberToAssign);
    if (member) {
      portalStore.updateMemberRankAndUnit(member.id, assigningMemberRank.id, member.unit_id);
      showToast(`${member.display_name} promovido(a) a ${assigningMemberRank.name}!`);
    }
    setAssigningMemberRank(null);
    setSelectedMemberToAssign('');
  };

  // Restaura padrão Void Zone
  const handleResetHierarchy = () => {
    if (confirm('Deseja restaurar a Hierarquia original da VOID ZONE com todos os cargos padrão?')) {
      portalStore.resetVoidZoneHierarchy();
      showToast('Hierarquia VOID ZONE restaurada para o padrão oficial!');
    }
  };

  // Agrupa os cargos por setor
  const visibleSectors = sectors.filter(sec => 
    selectedSectorFilter === 'todos' || sec.name === selectedSectorFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in text-slate-900">
      
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-xl border border-amber-500/60 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* CABEÇALHO HERALDICO & VOID ZONE */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-700 uppercase font-bold tracking-wider">
              <span>𒀭</span>
              <span>CADEIA DE COMANDO OFICIAL</span>
              <span>•</span>
              <span className="text-amber-600">VOID ZONE</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-heraldic mt-1 tracking-wide">
              𒀭・𝐇𝐈𝐄𝐑𝐀𝐑𝐐𝐔𝐈𝐀 — 𝐕𝐎𝐈𝐃 𝐙𝐎𝐍𝐄
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Estrutura hierárquica, setores operacionais, responsabilidades regimentais e quadro de cargos oficiais da comunidade no Discord e Roblox.
            </p>
          </div>

          {/* BOTÕES DE CONTROLE E EDIÇÃO DIRETA */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all border ${
                editMode 
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-400/50' 
                  : 'bg-slate-900 text-amber-400 hover:bg-slate-800 border-amber-500/40'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>{editMode ? 'Salvar & Sair da Edição' : '✏️ Editar Hierarquia'}</span>
            </button>

            {editMode && (
              <>
                <button
                  onClick={() => handleOpenNewRank()}
                  className="px-3.5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Novo Cargo</span>
                </button>

                <button
                  onClick={() => {
                    setSectorFormName('');
                    setSectorFormBadge('👑');
                    setSectorFormResp('');
                    setIsCreatingSector(true);
                    setEditingSector(null);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4 text-purple-300" />
                  <span>Novo Setor</span>
                </button>

                <button
                  onClick={handleResetHierarchy}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
                  title="Restaurar padrão original da Void Zone"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Banner Informativo quando o Modo Edição está Ativo */}
        {editMode && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <strong>Modo de Edição Ativado:</strong> Você pode alterar os textos de responsabilidade de cada setor, adicionar novos cargos, editar nomes, tags (ex: 〘CR〙, 〘ENC-CGV〙), e excluir cargos diretamente nesta tela.
            </div>
            <button 
              onClick={() => setEditMode(false)}
              className="text-amber-800 font-bold hover:underline ml-2"
            >
              Concluir Edição
            </button>
          </div>
        )}
      </div>

      {/* BARRA DE FILTRO POR SETOR E BUSCA */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Busca por cargo ou membro */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por cargo, tag (ex: 〘CR〙, 〘CGV〙) ou integrante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-purple-900"
            />
          </div>

          {/* Filtro rápido por Setor */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedSectorFilter}
              onChange={(e) => setSelectedSectorFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium text-slate-700 outline-none"
            >
              <option value="todos">Todos os Setores ({sectors.length})</option>
              {sectors.map(sec => (
                <option key={sec.id} value={sec.name}>
                  {sec.badge_prefix} {sec.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Badges de atalhos rápidos dos setores */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-500 text-[11px] uppercase font-mono">Setores:</span>
          {sectors.map(sec => (
            <button
              key={sec.id}
              onClick={() => setSelectedSectorFilter(sec.name === selectedSectorFilter ? 'todos' : sec.name)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedSectorFilter === sec.name
                  ? 'bg-purple-950 text-white border-purple-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span>{sec.badge_prefix} {sec.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* EXIBIÇÃO DOS SETORES DA HIERARQUIA VOID ZONE */}
      <div className="space-y-10">
        {visibleSectors.map((sector) => {
          // Filtra cargos deste setor
          const sectorRanks = currentRanks
            .filter(r => r.category === sector.name)
            .filter(r => {
              if (!searchTerm) return true;
              const term = searchTerm.toLowerCase();
              return (
                r.name.toLowerCase().includes(term) ||
                r.abbreviation.toLowerCase().includes(term) ||
                r.description.toLowerCase().includes(term)
              );
            })
            .sort((a, b) => a.order_level - b.order_level);

          return (
            <section 
              key={sector.id} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* HEADER DO SETOR */}
              <div className="bg-slate-950 text-white p-5 border-b-2 border-purple-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{sector.badge_prefix || '👑'}</span>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-heraldic text-white tracking-wider flex items-center gap-2">
                      <span>{sector.name.toUpperCase()}</span>
                    </h2>
                    <span className="text-[11px] text-purple-300 font-mono">
                      {sectorRanks.length} {sectorRanks.length === 1 ? 'cargo registrado' : 'cargos registrados'}
                    </span>
                  </div>
                </div>

                {/* Ações do Setor no Modo Edição */}
                {editMode && (
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenNewRank(sector.name)}
                      className="px-3 py-1.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-1 border border-purple-400/40"
                      title="Adicionar cargo a este setor"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Adicionar Cargo</span>
                    </button>

                    <button
                      onClick={() => handleOpenEditSector(sector)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold flex items-center gap-1 border border-amber-500/30"
                      title="Editar responsabilidade e nome deste setor"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar Responsabilidade</span>
                    </button>
                  </div>
                )}
              </div>

              {/* CARD DE RESPONSABILIDADE DO SETOR */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50/80 via-slate-50 to-purple-50/50 border-b border-slate-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-mono font-bold text-purple-900 tracking-wider block">
                      Atribuição & Responsabilidade Oficial
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {sector.responsibility}
                    </p>
                  </div>

                  {editMode && (
                    <button
                      onClick={() => handleOpenEditSector(sector)}
                      className="p-1.5 text-purple-800 hover:bg-purple-100 rounded-lg shrink-0 transition-colors"
                      title="Alterar texto de responsabilidade"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* LISTA / GRID DOS CARGOS DO SETOR */}
              <div className="p-5">
                {sectorRanks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sectorRanks.map((rank) => {
                      // Integrantes que possuem este cargo
                      const assignedMembers = currentMembers.filter(m => m.rank_id === rank.id);

                      return (
                        <div 
                          key={rank.id}
                          className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 hover:border-purple-300 hover:bg-white transition-all flex flex-col justify-between space-y-3 group shadow-xs"
                        >
                          <div>
                            {/* Linha da Tag e do Nome do Cargo */}
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-slate-900 text-amber-400 border border-amber-500/30 shadow-xs mb-1.5">
                                  {rank.abbreviation}
                                </span>
                                <h3 className="font-bold text-slate-900 text-sm font-heraldic leading-snug">
                                  @{rank.name}
                                </h3>
                              </div>

                              <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                                Nível {rank.order_level}
                              </span>
                            </div>

                            {/* Descrição do Cargo */}
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                              {rank.description}
                            </p>
                          </div>

                          {/* Integrantes com esse cargo */}
                          <div className="pt-3 border-t border-slate-200/80">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                              <span className="font-semibold text-[11px] text-slate-700">
                                Integrantes ({assignedMembers.length}):
                              </span>
                              
                              {editMode && (
                                <button
                                  onClick={() => {
                                    setAssigningMemberRank(rank);
                                    setSelectedMemberToAssign(currentMembers[0]?.id || '');
                                  }}
                                  className="text-[11px] text-purple-800 hover:text-purple-950 font-bold flex items-center gap-0.5"
                                  title="Adicionar ou promover membro para este cargo"
                                >
                                  <UserPlus className="w-3 h-3" />
                                  <span>Atribuir Membro</span>
                                </button>
                              )}
                            </div>

                            {assignedMembers.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {assignedMembers.map(mem => (
                                  <span 
                                    key={mem.id}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-800 font-medium"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span>{mem.display_name}</span>
                                    <span className="text-[9px] text-slate-400 font-mono">@{mem.roblox_username}</span>
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">
                                Nenhum integrante atribuído no momento
                              </span>
                            )}

                            {/* Botões de Ação no Modo Edição */}
                            {editMode && (
                              <div className="flex items-center justify-end gap-1.5 pt-3 mt-2 border-t border-slate-100">
                                <button
                                  onClick={() => handleOpenEditRank(rank)}
                                  className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Editar</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteRank(rank)}
                                  className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                                  title="Excluir cargo"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Excluir</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-xs">Nenhum cargo localizado neste setor com os filtros atuais.</p>
                    {editMode && (
                      <button
                        onClick={() => handleOpenNewRank(sector.name)}
                        className="mt-2 text-xs font-bold text-purple-800 hover:underline inline-flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Criar primeiro cargo de {sector.name}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* MODAL: CRIAR OU EDITAR CARGO */}
      {(isCreatingRank || editingRank) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-slate-900">
          <form 
            onSubmit={handleSaveRank} 
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden"
          >
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">𒀭</span>
                <h3 className="font-heraldic font-bold text-base">
                  {isCreatingRank ? 'Novo Cargo da Hierarquia' : `Editar Cargo: ${editingRank?.name}`}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => { setIsCreatingRank(false); setEditingRank(null); }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nome do Cargo *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Criador, Diretor, Instrutor PvP"
                    value={rankFormName}
                    onChange={(e) => setRankFormName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-purple-900 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tag / Abreviatura *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 〘CR〙, 〘ENC-CGV〙, 〘紫〙"
                    value={rankFormTag}
                    onChange={(e) => setRankFormTag(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-purple-900 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Setor Pertencente *
                  </label>
                  <select
                    value={rankFormCategory}
                    onChange={(e) => setRankFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 outline-none bg-white font-medium"
                  >
                    {sectors.map(sec => (
                      <option key={sec.id} value={sec.name}>{sec.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nível de Ordem Hierárquica *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={rankFormOrder}
                    onChange={(e) => setRankFormOrder(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 outline-none font-mono"
                    required
                  />
                  <span className="text-[10px] text-slate-400">1 é a autoridade máxima</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Descrição da Função / Atribuição
                </label>
                <textarea
                  rows={3}
                  placeholder="Descreva as responsabilidades específicas deste cargo dentro da Void Zone..."
                  value={rankFormDesc}
                  onChange={(e) => setRankFormDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => { setIsCreatingRank(false); setEditingRank(null); }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-950 hover:bg-purple-900 text-white font-bold rounded-lg shadow-sm"
              >
                {isCreatingRank ? 'Criar Cargo' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: EDITAR OU CRIAR SETOR */}
      {(editingSector || isCreatingSector) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-slate-900">
          <form 
            onSubmit={handleSaveSector} 
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden"
          >
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex items-center justify-between">
              <h3 className="font-heraldic font-bold text-base">
                {isCreatingSector ? 'Criar Novo Setor' : `Editar Setor: ${editingSector?.name}`}
              </h3>
              <button 
                type="button" 
                onClick={() => { setEditingSector(null); setIsCreatingSector(false); }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Nome do Setor *
                  </label>
                  <input
                    type="text"
                    value={sectorFormName}
                    onChange={(e) => setSectorFormName(e.target.value)}
                    placeholder="Ex: Administração, Corregedoria, Eventos"
                    className="w-full p-2.5 rounded-lg border border-slate-300 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Emoji / Ícone
                  </label>
                  <input
                    type="text"
                    value={sectorFormBadge}
                    onChange={(e) => setSectorFormBadge(e.target.value)}
                    placeholder="Ex: 👑, ⚖️, 🎪, ⚔️, 🐉"
                    className="w-full p-2.5 rounded-lg border border-slate-300 outline-none text-center text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Texto Oficial de Responsabilidade *
                </label>
                <textarea
                  rows={4}
                  value={sectorFormResp}
                  onChange={(e) => setSectorFormResp(e.target.value)}
                  placeholder="Responsável pela administração geral do servidor, organização da equipe..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none leading-relaxed"
                  required
                />
                <span className="text-[10px] text-slate-400">
                  Este texto é exibido em destaque abaixo do cabeçalho do setor.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => { setEditingSector(null); setIsCreatingSector(false); }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-950 hover:bg-purple-900 text-white font-bold rounded-lg shadow-sm"
              >
                Salvar Setor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: ATRIBUIR MEMBRO AO CARGO */}
      {assigningMemberRank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-slate-900">
          <form 
            onSubmit={handleAssignMember} 
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden"
          >
            <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400">ATRIBUIÇÃO DE CARGO</span>
                <h3 className="font-heraldic font-bold text-base mt-0.5">
                  {assigningMemberRank.name} {assigningMemberRank.abbreviation}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setAssigningMemberRank(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Selecione o Integrante para Promoção/Atribuição *
                </label>
                <select
                  value={selectedMemberToAssign}
                  onChange={(e) => setSelectedMemberToAssign(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 outline-none bg-white font-medium"
                  required
                >
                  <option value="">Selecione um membro do efetivo...</option>
                  {currentMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.display_name} (@{m.roblox_username}) — Atual: {m.rank_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-purple-950">
                O integrante selecionado passará a ostentar o cargo <strong>{assigningMemberRank.name} {assigningMemberRank.abbreviation}</strong> no setor de <strong>{assigningMemberRank.category}</strong>.
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAssigningMemberRank(null)}
                className="px-4 py-2 bg-slate-200 rounded-lg font-semibold text-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!selectedMemberToAssign}
                className="px-5 py-2 bg-purple-950 hover:bg-purple-900 text-white font-bold rounded-lg shadow-sm disabled:opacity-50"
              >
                Confirmar Atribuição
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
