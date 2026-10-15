import React from 'react';
import { Gamepad2, MessageSquare, ExternalLink, Clock, Key, Shield, AlertTriangle } from 'lucide-react';

interface JogoPageProps {
  robloxUrl?: string;
  discordUrl?: string;
}

export const JogoPage: React.FC<JogoPageProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fade-in text-slate-900">
      
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 pb-5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono text-purple-700 uppercase font-bold tracking-wider">
          <span>🎮</span>
          <span>EXPERIÊNCIA NO ROBLOX</span>
          <span>•</span>
          <span className="text-amber-600">VOID ZONE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heraldic mt-1">
          Servidor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Acesso ao servidor e experiência oficial da comunidade Void Zone no Roblox.
        </p>
      </div>

      {/* Caixa Em Breve */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-purple-300 p-8 sm:p-14 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto shadow-xs">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            EXPERIÊNCIA EM PREPARAÇÃO
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heraldic text-slate-950">
            Em breve
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            O servidor e os links de acesso da experiência no Roblox serão disponibilizados em breve. Entre no nosso Discord para acompanhar o lançamento e as sessões de teste.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <a
            href="https://discord.gg/8CcpNCcHb"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Acompanhar Lançamento no Discord</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

    </div>
  );
};
