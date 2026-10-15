import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Shield, 
  FileSpreadsheet,
  Award,
  Users,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Edict, SiteSettings } from '../types';
import { portalStore } from '../services/store';

interface EditaisPageProps {
  edicts?: Edict[];
  settings?: SiteSettings;
  onSelectEdictToApply?: (edictId: string) => void;
}

export const EditaisPage: React.FC<EditaisPageProps> = ({ 
  edicts: propEdicts,
  settings: propSettings
}) => {
  const [edicts, setEdicts] = useState<Edict[]>(propEdicts || portalStore.getEdicts());
  const [settings, setSettings] = useState<SiteSettings>(propSettings || portalStore.getSettings());
  const [filter, setFilter] = useState<'Todos' | 'Abertos' | 'Em Andamento' | 'Encerrados'>('Todos');

  useEffect(() => {
    return portalStore.subscribe(() => {
      setEdicts(portalStore.getEdicts());
      setSettings(portalStore.getSettings());
    });
  }, []);

  const filteredEdicts = edicts.filter(e => {
    if (filter === 'Todos') return true;
    if (filter === 'Abertos') return e.status === 'Aberto';
    if (filter === 'Em Andamento') return e.status === 'Em Andamento';
    if (filter === 'Encerrados') return e.status === 'Encerrado';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fade-in text-slate-900">
      
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 pb-5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono text-purple-700 uppercase font-bold tracking-wider">
          <span>📋</span>
          <span>PROCESSOS SELETIVOS</span>
          <span>•</span>
          <span className="text-amber-600">VOID ZONE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heraldic mt-1">
          Editais Oficiais
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Editais de convocação, processos seletivos e admissões para a comunidade.
        </p>
      </div>

      {/* Destaque do Google Forms Geral se configurado */}
      {settings.google_forms_recruitment_url && (
        <div className="bg-purple-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-purple-800/80 border border-purple-400/40 text-purple-300 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-heraldic">
                Formulário Geral de Recrutamento Disponível
              </h3>
              <p className="text-xs text-purple-200 mt-0.5">
                Você pode preencher diretamente a sua ficha cadastral no Google Forms oficial da Void Zone.
              </p>
            </div>
          </div>

          <a
            href={settings.google_forms_recruitment_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow flex items-center gap-2 shrink-0 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Acessar Google Forms</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Filtros e Lista de Editais */}
      {edicts.length > 0 ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex gap-1.5 text-xs">
              {(['Todos', 'Abertos', 'Em Andamento', 'Encerrados'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    filter === tab 
                      ? 'bg-blue-950 text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {filteredEdicts.length} edital(is) encontrado(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredEdicts.map(edict => {
              const formsUrl = edict.google_forms_url || settings.google_forms_recruitment_url;

              return (
                <div 
                  key={edict.id} 
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-slate-900 text-amber-400 font-mono text-xs font-bold">
                        {edict.code}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        edict.status === 'Aberto' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : edict.status === 'Em Andamento' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                            : 'bg-slate-100 text-slate-600'
                      }`}>
                        {edict.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-heraldic text-slate-900">
                      {edict.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {edict.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-900" />
                        <span>Vagas: <strong>{edict.vacancies}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>Até: <strong>{edict.end_date}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                    {formsUrl && (
                      <a
                        href={formsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Google Forms</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href="#inscricoes"
                      className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1 border border-slate-200 transition-colors"
                    >
                      <span>Ver Inscrição</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Caixa Sem Editais / Em Breve */
        <div className="bg-white rounded-3xl border-2 border-dashed border-purple-300 p-8 sm:p-14 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto shadow-xs">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              AGUARDE A ABERTURA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heraldic text-slate-950">
              Editais em Breve
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Os editais para vagas e novos cursos serão disponibilizados em breve pela administração e pela Equipe de Recrutamento (ER). Os administradores podem criar editais a qualquer momento pelo Painel Administrativo.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <a
              href="https://discord.gg/8CcpNCcHb"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Acompanhar no Discord</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href="#admin"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors border border-slate-300"
            >
              <Shield className="w-4 h-4 text-amber-600" />
              <span>Acessar Painel Admin</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
