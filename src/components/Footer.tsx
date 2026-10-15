import React from 'react';
import { BrasaoPMSP } from './BrasaoPMSP';
import { Shield, MessageSquare, Gamepad2, FileText, Lock, AlertTriangle, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  discordUrl: string;
  robloxUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, discordUrl, robloxUrl }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t-4 border-amber-600/70 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Aviso Legal de Roleplay Obrigatório */}
        <div className="bg-amber-950/40 border border-amber-700/50 rounded-lg p-4 mb-10 flex items-start space-x-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <span className="font-bold text-amber-300 uppercase tracking-wider block mb-1">
              Aviso Legal e Institucional • Experiência Fictícia de Simulação
            </span>
            Este portal pertence exclusivamente à comunidade de simulação e roleplay <strong>PM RP São Paulo</strong>, desenvolvida para a plataforma <strong>Roblox</strong> e coordenada via <strong>Discord</strong>. 
            Não possuímos qualquer ligação, representação jurídica, vínculo institucional ou afiliação oficial com o Governo do Estado de São Paulo, a Polícia Militar do Estado de São Paulo (PMESP) ou qualquer entidade pública real. Todos os cursos, patentes, editais e procedimentos aqui exibidos são fictícios e destinados unicamente ao entretenimento lúdico.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Coluna 1: Identidade */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <BrasaoPMSP size="sm" />
              <div>
                <span className="font-heraldic font-bold text-white text-base block tracking-wide">
                  PM RP SÃO PAULO
                </span>
                <span className="text-[11px] text-amber-400/90 font-medium">
                  Roleplay Comunitário Roblox
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Doutrina, hierarquia e simulação policial militar de alto nível no Roblox, promovendo a disciplina e o bom convívio comunitário.
            </p>
            <div className="flex space-x-2 pt-1">
              <a 
                href={discordUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/40 text-indigo-300 text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discord</span>
              </a>
              <a 
                href={robloxUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded bg-red-950/80 hover:bg-red-900 border border-red-700/40 text-red-300 text-xs flex items-center gap-1.5 transition-colors"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Roblox</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-3 text-amber-400">
              Serviços Públicos RP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-amber-400 transition-colors">
                  Página Inicial do Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hierarquia')} className="hover:text-amber-400 transition-colors">
                  Quadro de Oficiais e Praças
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('editais')} className="hover:text-amber-400 transition-colors">
                  Editais de Concurso Aberto
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inscricoes')} className="hover:text-amber-400 transition-colors">
                  Inscrições e Ficha de Alistamento
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academia')} className="hover:text-amber-400 transition-colors">
                  Academia e Manuais de Ensino
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Doutrina e Regulamentos */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-3 text-amber-400">
              Doutrina e Normas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('legislacao')} className="hover:text-amber-400 transition-colors">
                  Regulamento Geral Interno (RGI-RP)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legislacao')} className="hover:text-amber-400 transition-colors">
                  Código de Conduta e Disciplina
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legislacao')} className="hover:text-amber-400 transition-colors">
                  Regras Antimarginalização (No-RDM)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('noticias')} className="hover:text-amber-400 transition-colors">
                  Boletins e Portarias Oficiais
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jogo')} className="hover:text-amber-400 transition-colors">
                  Guia de Patrulhamento no Jogo
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Área Administrativa & Segurança */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-3 text-amber-400">
              Administração & Segurança
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Acesso restrito ao Estado-Maior, recrutadores e moderadores da comunidade.
            </p>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 rounded text-xs font-medium transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Acessar Painel /admin</span>
            </button>
            <div className="mt-3 text-[11px] text-slate-500">
              Row Level Security (RLS) habilitada • Banco Supabase compatível.
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Comunidade PM RP São Paulo. Projeto de fãs sem fins lucrativos.
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center gap-1">
              Desenvolvido para Roleplay no Roblox
            </span>
            <span>•</span>
            <span className="font-mono text-amber-500/80">v2.4.0-RP</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
