import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, AlertCircle, FileText, User, ShieldCheck, HelpCircle } from 'lucide-react';
import { Application } from '../types';
import { portalStore } from '../services/store';

interface StatusConsultaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProtocol?: string;
}

export const StatusConsultaModal: React.FC<StatusConsultaModalProps> = ({ 
  isOpen, 
  onClose,
  initialProtocol = '' 
}) => {
  const [protocolInput, setProtocolInput] = useState(initialProtocol);
  const [searched, setSearched] = useState(Boolean(initialProtocol));
  const [result, setResult] = useState<Application | undefined>(
    initialProtocol ? portalStore.getApplicationByProtocol(initialProtocol) : undefined
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocolInput.trim()) return;
    const found = portalStore.getApplicationByProtocol(protocolInput.trim());
    setResult(found);
    setSearched(true);
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'Aprovado':
      case 'Aprovado na 1ª Fase':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {status}
          </span>
        );
      case 'Convocado para Entrevista':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            {status}
          </span>
        );
      case 'Em Análise':
      case 'Pendente':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            {status}
          </span>
        );
      case 'Indeferido':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            {status}
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-900">
        
        {/* Header do Modal Institucional */}
        <div className="bg-slate-900 text-white p-5 border-b border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heraldic font-bold text-base sm:text-lg">
                Consulta de Inscrição Oficial
              </h3>
              <p className="text-xs text-slate-300">
                Acompanhamento individual de processo seletivo
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário de Busca */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Número do Protocolo
              </label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Ex: PMSP-2026-X849B"
                  value={protocolInput}
                  onChange={(e) => setProtocolInput(e.target.value.toUpperCase())}
                  className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 font-mono text-sm tracking-wider focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none uppercase"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-lg font-medium text-sm transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Consultar</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>O protocolo foi gerado no momento do envio da sua candidatura.</span>
              </p>
            </div>
          </form>

          {/* Protocolos de demonstração sugeridos */}
          <div className="mt-3 p-2.5 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Protocolos para testar no demo: </span>
            <button 
              type="button" 
              onClick={() => { setProtocolInput('PMSP-2026-X849B'); setResult(portalStore.getApplicationByProtocol('PMSP-2026-X849B')); setSearched(true); }}
              className="text-blue-900 font-mono font-semibold underline hover:text-blue-700 mr-2"
            >
              PMSP-2026-X849B
            </button>
            <button 
              type="button" 
              onClick={() => { setProtocolInput('PMSP-2026-R704P'); setResult(portalStore.getApplicationByProtocol('PMSP-2026-R704P')); setSearched(true); }}
              className="text-blue-900 font-mono font-semibold underline hover:text-blue-700"
            >
              PMSP-2026-R704P
            </button>
          </div>

          {/* Resultado da Pesquisa */}
          {searched && (
            <div className="mt-6 pt-5 border-t border-slate-200 animate-fade-in">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <div>
                      <div className="text-[11px] uppercase font-bold text-slate-500 font-mono">
                        Protocolo {result.protocol}
                      </div>
                      <div className="font-bold text-slate-900 text-sm mt-0.5">
                        {result.candidate_name}
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(result.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Edital</span>
                      <span className="font-medium text-slate-800 truncate block mt-0.5">{result.edict_title}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Conta Roblox</span>
                      <span className="font-medium text-slate-800 truncate block mt-0.5 font-mono">@{result.roblox_username}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Usuário Discord</span>
                      <span className="font-medium text-slate-800 truncate block mt-0.5 font-mono">{result.discord_tag}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Data de Envio</span>
                      <span className="font-medium text-slate-800 truncate block mt-0.5">{result.submitted_at.substring(0, 10)}</span>
                    </div>
                  </div>

                  {/* Parecer do Recrutador */}
                  {result.recruiter_notes && (
                    <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg">
                      <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-4 h-4 text-blue-900" />
                        <span>Parecer da Comissão de Recrutamento</span>
                      </div>
                      <p className="text-xs text-blue-900 italic">
                        "{result.recruiter_notes}"
                      </p>
                      {result.reviewer_name && (
                        <div className="text-[10px] text-blue-700 text-right mt-1 font-medium">
                          Avaliador: {result.reviewer_name}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Instruções para o candidato */}
                  <div className="text-[11px] text-slate-600 bg-amber-50/80 border border-amber-200 p-3 rounded leading-relaxed">
                    <strong>Próximo passo:</strong> Caso tenha sido aprovado ou convocado, acesse a sala de espera de recrutamento no servidor oficial do Discord informando seu protocolo.
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
                  <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                  <div className="font-bold text-sm">Protocolo não localizado</div>
                  <p className="text-xs text-rose-700 mt-1">
                    Verifique se o código informado ({protocolInput}) está correto e contém o formato padrão <code>PMSP-2026-XXXX</code>.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Rodapé do Modal */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded transition-colors"
          >
            Fechar Janela
          </button>
        </div>

      </div>
    </div>
  );
};
