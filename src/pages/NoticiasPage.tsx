import React from 'react';
import { Bell, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { Announcement } from '../types';

interface NoticiasPageProps {
  announcements?: Announcement[];
}

export const NoticiasPage: React.FC<NoticiasPageProps> = ({ announcements = [] }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fade-in text-slate-900">
      
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 pb-5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono text-purple-700 uppercase font-bold tracking-wider">
          <span>📢</span>
          <span>COMUNICAÇÃO OFICIAL</span>
          <span>•</span>
          <span className="text-amber-600">VOID ZONE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heraldic mt-1">
          Notícias & Comunicados
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Informativos, boletins e atualizações da comunidade Void Zone.
        </p>
      </div>

      {/* Caixa Sem Nenhuma Notícia */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-8 sm:p-14 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto shadow-xs">
          <Bell className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            BOLETIM GERAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heraldic text-slate-950">
            Sem nenhuma
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sem nenhuma notícia ou comunicado publicado no momento. Fique atento ao nosso servidor no Discord para anúncios e novidades em primeira mão.
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
            <span>Ver Anúncios no Discord</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

    </div>
  );
};
