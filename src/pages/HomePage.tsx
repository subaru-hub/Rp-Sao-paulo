import React from 'react';
import { BrasaoPMSP } from '../components/BrasaoPMSP';
import { 
  Users, 
  FileText, 
  BookOpen, 
  Scale, 
  MessageSquare, 
  Gamepad2, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Shield, 
  Award, 
  Radio, 
  ExternalLink,
  Flame,
  Calendar,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import { Announcement, Edict } from '../types';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  announcements: Announcement[];
  edicts: Edict[];
  discordUrl: string;
  robloxUrl: string;
  googleFormsUrl?: string;
  onOpenConsultModal: () => void;
  totalMembers: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  announcements,
  edicts,
  discordUrl,
  robloxUrl,
  googleFormsUrl,
  onOpenConsultModal,
  totalMembers
}) => {
  const openEdicts = edicts.filter(e => e.status === 'Aberto');
  const recentNews = announcements.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION INSTITUCIONAL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white border-b-4 border-amber-500 shadow-2xl">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* Heraldic Shield Display */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="p-4 sm:p-6 bg-slate-950/60 rounded-3xl border border-amber-500/30 shadow-2xl backdrop-blur">
                <BrasaoPMSP size="xl" />
              </div>
              <span className="mt-4 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wider font-semibold">
                SÃO PAULO • ROBLOX RP
              </span>
            </div>

            {/* Title & Presentation */}
            <div className="text-center lg:text-left space-y-5 flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-200 text-xs font-medium">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Portal de Serviços & Transparência Institucional</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heraldic leading-tight">
                POLÍCIA MILITAR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  ROLEPLAY SÃO PAULO
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
                Bem-vindo ao portal oficial da corporação de Roleplay no Roblox. Consulte editais de ingresso, acompanhe sua inscrição, estude manuais operacionais e conheça a hierarquia de comando da nossa comunidade.
              </p>

              {/* Botões de Ação Imediata */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('editais')}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 transform active:scale-95"
                >
                  <Award className="w-4 h-4" />
                  <span>Acessar Editais Abertos ({openEdicts.length})</span>
                </button>

                <a
                  href={robloxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 border border-red-500/30"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Entrar no Jogo Roblox</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 border border-indigo-500/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Servidor Discord</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                {googleFormsUrl && (
                  <a
                    href={googleFormsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-purple-700/90 hover:bg-purple-600 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 border border-purple-500/30"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-purple-300" />
                    <span>Inscrição no Google Forms</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}
              </div>

              {/* Consulta rápida de protocolo */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <span>Já se inscreveu?</span>
                <button
                  onClick={onOpenConsultModal}
                  className="text-amber-400 hover:text-amber-300 font-semibold underline decoration-amber-400/50 underline-offset-4"
                >
                  Clique aqui para consultar o status com seu protocolo
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Estatísticas Reais da Comunidade */}
        <div className="border-t border-slate-800 bg-slate-950/70 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-800/80">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                  {totalMembers}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Efetivo Registrado
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  {openEdicts.length}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Concursos Abertos
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-blue-400">
                  6 Unidades
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Especializadas RP
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">
                  100% Gratuito
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Roleplay Comunitário
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATALHOS INSTITUCIONAIS RÁPIDOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heraldic tracking-wide">
            Principais Serviços da Corporação
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Navegue pelos módulos oficiais do portal institucional
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Hierarquia */}
          <div 
            onClick={() => onNavigate('hierarquia')}
            className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-900 group-hover:text-amber-400 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-heraldic group-hover:text-blue-950">
                Hierarquia & Efetivo
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Conheça a cadeia de comando, oficiais superiores, praças e unidades especializadas.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-900 group-hover:text-amber-600">
              <span>Ver Estrutura</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Editais */}
          <div 
            onClick={() => onNavigate('editais')}
            className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-heraldic group-hover:text-blue-950">
                Editais & Concursos
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Processos seletivos para ingresso no CFSd, cursos táticos do BAEP e formação de pilotos.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-700 group-hover:text-amber-800">
              <span>Consultar Editais</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Academia */}
          <div 
            onClick={() => onNavigate('academia')}
            className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-heraldic group-hover:text-blue-950">
                Academia & Manuais
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Doutrina operacional, Código Q fictício, Procedimentos Padrão (POP) e teste simulado.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
              <span>Acessar Cursos</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Legislação */}
          <div 
            onClick={() => onNavigate('legislacao')}
            className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center mb-3 group-hover:bg-indigo-700 group-hover:text-white transition-colors">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm font-heraldic group-hover:text-blue-950">
                Legislação & Regras
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Regulamento Geral Interno, Código de Conduta, normas antimarginalização e promoções.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-700 group-hover:text-indigo-800">
              <span>Ler Regulamento</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* EDITAIS EM DESTAQUE */}
      {openEdicts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border-2 border-amber-500/50 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-blue-800/60">
              <div>
                <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider font-mono">
                  OPORTUNIDADE DE INGRESSO
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heraldic mt-0.5">
                  Concursos & Editais Abertos
                </h3>
              </div>
              <button
                onClick={() => onNavigate('editais')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <span>Ver todos os editais</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {openEdicts.map(edict => (
                <div key={edict.id} className="bg-slate-900/90 rounded-xl p-5 border border-slate-700/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                        {edict.code}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Inscrições Abertas
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">
                      {edict.title}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {edict.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-4 bg-slate-950/60 p-2.5 rounded">
                      <div>
                        <span className="block text-slate-500">Vagas Disponíveis:</span>
                        <span className="font-semibold text-white">{edict.vacancies} vagas</span>
                      </div>
                      <div>
                        <span className="block text-slate-500">Prazo Final:</span>
                        <span className="font-semibold text-amber-300">{edict.end_date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onNavigate('inscricoes')}
                      className="flex-1 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow text-center"
                    >
                      Inscrever-se Agora
                    </button>
                    <button
                      onClick={() => onNavigate('editais')}
                      className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-600 transition-colors"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NOTÍCIAS RECENTES & COMUNICADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heraldic tracking-wide">
              Boletins & Comunicados Oficiais
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Informes emitidos pelo Comando Geral e diretorias da corporação
            </p>
          </div>

          <button
            onClick={() => onNavigate('noticias')}
            className="text-xs font-bold text-blue-950 hover:text-amber-600 flex items-center gap-1"
          >
            <span>Ver todas as notícias</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentNews.map(news => (
            <article 
              key={news.id}
              onClick={() => onNavigate('noticias')}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    news.category === 'Convocação' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    news.category === 'Operações' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {news.category}
                  </span>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{news.published_at}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-blue-900 transition-colors">
                  {news.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {news.summary}
                </p>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">{news.author_rank}</span>
                <span className="text-blue-900 font-semibold flex items-center gap-1">
                  Ler comunicado <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GUIA DO JOGO NO ROBLOX & ENGAJAMENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-300">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[11px] uppercase font-bold text-amber-700 tracking-wider font-mono">
                AMBIENTE DE JOGO NO ROBLOX
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heraldic">
                Preparado para Patrulhar Conosco?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Descubra quais comandos de viatura usar, teclas de sirene, como reportar pelo rádio e os modelos de viaturas disponíveis na experiência.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('jogo')}
                className="px-5 py-2.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <span>Ver Guia do Servidor RP</span>
              </button>
              
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Entrar no Discord</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
