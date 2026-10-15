import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Shield, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  HelpCircle,
  ArrowRight,
  UserCheck,
  Gamepad2
} from 'lucide-react';
import { Edict, SiteSettings } from '../types';
import { portalStore } from '../services/store';

interface InscricoesPageProps {
  edicts?: Edict[];
  settings?: SiteSettings;
  preselectedEdictId?: string;
  onOpenConsultModalWithProtocol?: (protocol: string) => void;
}

export const InscricoesPage: React.FC<InscricoesPageProps> = ({ 
  edicts: propEdicts, 
  settings: propSettings 
}) => {
  const [settings, setSettings] = useState<SiteSettings>(propSettings || portalStore.getSettings());
  const [edicts, setEdicts] = useState<Edict[]>(propEdicts || portalStore.getEdicts());
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    return portalStore.subscribe(() => {
      setSettings(portalStore.getSettings());
      setEdicts(portalStore.getEdicts());
    });
  }, []);

  const openEdicts = edicts.filter(e => e.status === 'Aberto');
  // Verifica se há formulário específico no edital aberto ou link global nas configurações
  const activeFormsUrl = openEdicts.find(e => e.google_forms_url)?.google_forms_url || settings.google_forms_recruitment_url;

  const handleCopyLink = () => {
    if (activeFormsUrl) {
      navigator.clipboard.writeText(activeFormsUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fade-in text-slate-900">
      
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 pb-5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono text-purple-700 uppercase font-bold tracking-wider">
          <FileSpreadsheet className="w-4 h-4 text-purple-600" />
          <span>RECRUTAMENTO & ADMISSÕES</span>
          <span>•</span>
          <span className="text-amber-600">VOID ZONE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heraldic mt-1">
          Formulário de Inscrição Oficial
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Alistamento e seleção de novos membros conduzidos pela Equipe de Recrutamento (ER).
        </p>
      </div>

      {/* SE HOUVER LINK DO GOOGLE FORMS ATIVO */}
      {activeFormsUrl ? (
        <div className="space-y-6">
          
          {/* Card Principal de Inscrição Google Forms */}
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-purple-400" />
                  <span>Google Forms Oficial Ativo</span>
                </span>
                <span className="text-xs text-amber-300 font-mono">
                  EQUIPE DE RECRUTAMENTO (ER)
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heraldic text-white">
                  Preencher Formulário de Recrutamento
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
                  Nosso processo seletivo oficial é realizado diretamente via Google Forms para garantir segurança, agilidade e análise minuciosa pelo corpo de recrutadores da Void Zone.
                </p>
              </div>

              {/* Botão de Ação Principal */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={activeFormsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 transform active:scale-95"
                >
                  <FileSpreadsheet className="w-5 h-5 text-slate-950" />
                  <span>Abrir Formulário no Google Forms</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                <button
                  onClick={handleCopyLink}
                  className="px-4 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-2"
                  title="Copiar link do Google Forms"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Link Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-300" />
                      <span>Copiar Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Etapas do Recrutamento */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-bold text-base font-heraldic text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-700" />
              <span>Etapas do Processo Seletivo (ER)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-mono font-bold flex items-center justify-center text-xs">
                  01
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Preenchimento da Ficha</h4>
                <p className="text-slate-600 leading-relaxed">
                  Responda com seriedade todas as perguntas no Google Forms, informando seu usuário do Roblox e tag do Discord.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-mono font-bold flex items-center justify-center text-xs">
                  02
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Triagem pela ER</h4>
                <p className="text-slate-600 leading-relaxed">
                  A Chefia e os Analistas da Equipe de Recrutamento revisam suas respostas e histórico na comunidade.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-mono font-bold flex items-center justify-center text-xs">
                  03
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Convocação & Acolhimento</h4>
                <p className="text-slate-600 leading-relaxed">
                  Os aprovados são chamados diretamente no Discord oficial para recebimento do cargo e início das instruções.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Dúvidas durante o preenchimento? Fale com um Recrutador no Discord.</span>
              </span>
              <a
                href={settings.discord_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
              >
                <span>Acessar Discord Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      ) : (
        /* Se o admin ainda não cadastrou o link do Google Forms */
        <div className="bg-white rounded-3xl border-2 border-dashed border-purple-300 p-8 sm:p-14 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              EQUIPE DE RECRUTAMENTO (ER)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heraldic text-slate-950">
              Inscrições em Breve
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              O link oficial do Google Forms de recrutamento será liberado em breve pela administração. Os membros da equipe administrativa podem cadastrar o link diretamente na aba <strong>Configurações</strong> do painel administrativo.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={settings.discord_url}
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
              <span>Painel do Administrador</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
