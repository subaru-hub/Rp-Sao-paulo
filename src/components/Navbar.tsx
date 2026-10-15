import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  Gamepad2, 
  MessageSquare, 
  Lock, 
  Search, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  FileText,
  Users,
  Award,
  Bell,
  Scale
} from 'lucide-react';
import { BrasaoPMSP } from './BrasaoPMSP';
import { portalStore } from '../services/store';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenConsultModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onNavigate,
  onOpenConsultModal 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(portalStore.getSettings());
  const [currentUser, setCurrentUser] = useState(portalStore.getCurrentUser());

  useEffect(() => {
    return portalStore.subscribe(() => {
      setSettings(portalStore.getSettings());
      setCurrentUser(portalStore.getCurrentUser());
    });
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Início', icon: Shield },
    { id: 'hierarquia', label: 'Hierarquia', icon: Users },
    { id: 'legislacao', label: 'Regras do Servidor', icon: Scale },
    { id: 'editais', label: 'Editais (Em breve)', icon: FileText },
    { id: 'inscricoes', label: 'Inscrições (Em breve)', icon: Award },
    { id: 'noticias', label: 'Notícias', icon: Bell },
    { id: 'jogo', label: 'Servidor (Em breve)', icon: Gamepad2 },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-amber-500/30 shadow-xl text-slate-100">
      {/* Barra de Topo Governamental Institucional (Fictícia) */}
      <div className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-amber-400 tracking-wider">COMUNIDADE FICTÍCIA</span>
            <span className="text-slate-600">|</span>
            <span className="truncate">Portal Institucional de Roleplay no Roblox • São Paulo</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenConsultModal}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors underline decoration-dotted"
            >
              <Search className="w-3 h-3" />
              <span>Consultar Inscrição por Protocolo</span>
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-400 font-mono text-[10px] uppercase">
                {settings.server_patrol_status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header / Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group"
          >
            <BrasaoPMSP size="sm" className="transform group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heraldic text-lg sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  VOID ZONE
                </span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase">
                  Oficial
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light tracking-wide hidden sm:block">
                Comunidade Oficial Void Zone • Regras, Hierarquia & Convivência
              </p>
            </div>
          </div>

          {/* Ações Rápidas Externas e Botão Admin */}
          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href="https://discord.gg/8CcpNCcHb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm border border-indigo-400/40"
              title="Acessar servidor oficial no Discord"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discord Oficial</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              onClick={() => handleNavClick('jogo')}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
              title="Status do Servidor"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Servidor: Em breve</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all border ${
                currentTab === 'admin' 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-amber-500/40'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{currentUser ? `${currentUser.display_name} (${currentUser.role})` : 'Painel /admin'}</span>
            </button>
          </div>

          {/* Botão Menu Mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="p-1.5 rounded bg-slate-800 text-amber-400 border border-amber-500/40"
              title="Painel Administrativo"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navegação Principal em Abas (Estilo Portal Institucional) */}
      <nav className="hidden lg:block bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex items-center space-x-1 py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-t text-xs font-medium tracking-wide transition-all border-b-2 ${
                      isActive 
                        ? 'border-amber-400 text-amber-400 bg-slate-900/90 shadow-sm font-semibold'
                        : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-900/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Menu Mobile Retrátil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <a 
              href={settings.discord_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 p-2 text-xs font-medium rounded bg-indigo-600 text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discord</span>
            </a>
            <a 
              href={settings.roblox_game_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 p-2 text-xs font-medium rounded bg-red-600 text-white"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Roblox</span>
            </a>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-950 text-amber-400 font-semibold border-l-4 border-amber-400' 
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded bg-amber-500 text-slate-950 font-semibold text-xs shadow"
            >
              <Lock className="w-4 h-4" />
              <span>Acessar Painel Administrativo (/admin)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
