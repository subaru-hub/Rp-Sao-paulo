import React from 'react';
import { Bell, ArrowRight, X } from 'lucide-react';

interface AlertBannerProps {
  message: string;
  onAction: () => void;
  actionText?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ 
  message, 
  onAction,
  actionText = 'Acessar Edital' 
}) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible || !message) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-medium py-2 px-4 shadow-sm border-b border-amber-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center space-x-2.5 truncate">
          <span className="bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono shrink-0">
            COMUNICADO
          </span>
          <span className="truncate font-semibold text-slate-900">
            {message}
          </span>
        </div>

        <div className="flex items-center space-x-3 shrink-0 ml-3">
          <button
            onClick={onAction}
            className="flex items-center space-x-1 font-bold text-slate-950 hover:text-white transition-colors underline decoration-2 text-xs"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setVisible(false)}
            className="p-1 hover:bg-amber-700/20 rounded transition-colors"
            title="Fechar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
