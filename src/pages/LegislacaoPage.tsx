import React, { useState } from 'react';
import { Scale, Shield, AlertTriangle, CheckCircle2, MessageSquare, Search, BookOpen, ExternalLink, HeartHandshake } from 'lucide-react';

export const LegislacaoPage: React.FC = () => {
  const [searchWord, setSearchWord] = useState('');
  const [activeTab, setActiveTab] = useState<'todas' | 'regras' | 'moderacao'>('todas');

  const serverRules = [
    {
      id: '01',
      title: '01 ┃ Respeito',
      badge: 'Convivência',
      content: 'Mantenha uma postura respeitosa com todos os membros, independentemente de cargo ou função. Não serão tolerados preconceito, discriminação, ameaças, perseguição, humilhações, provocações excessivas ou comportamentos que tenham como objetivo causar conflitos.'
    },
    {
      id: '02',
      title: '02 ┃ Spam / Flood / Menções',
      badge: 'Organização',
      content: 'Não envie mensagens, GIFs, figurinhas, emojis ou links de forma excessiva. Evite também utilizar @everyone, @here ou realizar diversas menções sem necessidade.'
    },
    {
      id: '03',
      title: '03 ┃ Divulgação / Comércio',
      badge: 'Comunidade',
      content: 'Não é permitida a divulgação de outros servidores, comunidades, projetos ou serviços sem autorização. Também não são permitidas vendas, trocas ou negociações de contas, itens ou produtos dentro do servidor.'
    },
    {
      id: '04',
      title: '04 ┃ Conteúdo Inadequado',
      badge: 'Segurança',
      content: 'Não envie conteúdos sexuais, perturbadores, maliciosos ou inadequados para a comunidade. Isso se aplica a mensagens, imagens, vídeos, GIFs, figurinhas, áudios e links.'
    },
    {
      id: '05',
      title: '05 ┃ Informações Pessoais',
      badge: 'Privacidade',
      content: 'Não compartilhe, solicite ou divulgue informações pessoais suas ou de outros membros, como endereço, telefone, documentos, senhas, localização ou outros dados privados.'
    },
    {
      id: '06',
      title: '06 ┃ Conteúdo Ilegal / Malicioso',
      badge: 'Diretrizes',
      content: 'É proibido compartilhar, incentivar ou fazer apologia a atividades ilegais, golpes, invasões, roubo de contas ou qualquer prática que possa prejudicar outros membros.'
    },
    {
      id: '07',
      title: '07 ┃ Evasão de Punição',
      badge: 'Disciplina',
      content: 'Não utilize contas alternativas ou outros meios para burlar punições aplicadas pela equipe. Tentativas de evasão poderão resultar em novas punições.'
    },
    {
      id: '08',
      title: '08 ┃ Uso dos Canais',
      badge: 'Organização',
      content: 'Utilize cada canal de acordo com sua finalidade. Evite assuntos fora do tema ou comportamentos que prejudiquem a organização e a experiência dos demais membros.'
    },
    {
      id: '09',
      title: '09 ┃ Perfil',
      badge: 'Identidade',
      content: 'Mantenha seu nome, avatar, banner e demais elementos do perfil dentro do bom senso. Conteúdos ofensivos, discriminatórios, provocativos ou inadequados poderão ter sua alteração solicitada pela equipe.'
    },
    {
      id: '10',
      title: '10 ┃ Bots e Sistemas',
      badge: 'Sistemas',
      content: 'Não abuse dos bots ou sistemas disponíveis no servidor. A exploração proposital de bugs ou falhas para obter vantagens ou prejudicar a comunidade não será permitida.'
    }
  ];

  const moderationNotes = [
    {
      id: 'm-01',
      title: '01 ┃ Autoridade da Moderação',
      content: 'A equipe de moderação possui autoridade para tomar as medidas que considerar necessárias diante de situações que possam prejudicar o servidor, mesmo que determinada situação não esteja descrita de forma explícita nas regras. As decisões serão tomadas buscando manter a organização, segurança e imparcialidade entre os membros.'
    },
    {
      id: 'm-02',
      title: '02 ┃ Bom Senso',
      content: 'Nem todas as situações podem ser previstas em uma lista de regras. Esperamos que os membros utilizem o bom senso em chats, calls e demais espaços do servidor. O Void Zone é uma comunidade para diferentes idades.'
    },
    {
      id: 'm-03',
      title: '03 ┃ Discordâncias com a Staff',
      content: 'Caso haja algum desentendimento relacionado a uma punição ou decisão da equipe, procure resolver a situação de maneira respeitosa. Peça uma explicação e apresente seu ponto de vista de forma adequada, evitando discussões públicas.'
    },
    {
      id: 'm-04',
      title: '04 ┃ Alterações nas Regras',
      content: 'As regras poderão ser alteradas ou atualizadas sempre que a administração considerar necessário para a manutenção, organização e acolhimento da comunidade. Alterações relevantes serão comunicadas aos membros.'
    },
    {
      id: 'm-05',
      title: '05 ┃ Aplicação das Punições',
      content: 'As punições serão aplicadas de acordo com a gravidade da situação, reincidência e histórico do membro. A equipe poderá aplicar medidas diferentes conforme cada caso, buscando sempre uma aplicação justa das regras.'
    }
  ];

  const filteredRules = serverRules.filter(r => 
    searchWord === '' || 
    r.title.toLowerCase().includes(searchWord.toLowerCase()) || 
    r.content.toLowerCase().includes(searchWord.toLowerCase())
  );

  const filteredNotes = moderationNotes.filter(n => 
    searchWord === '' || 
    n.title.toLowerCase().includes(searchWord.toLowerCase()) || 
    n.content.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in text-slate-900">
      
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-700 uppercase font-bold tracking-wider">
              <span>📋</span>
              <span>DIRETRIZES DA COMUNIDADE</span>
              <span>•</span>
              <span className="text-amber-600">VOID ZONE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heraldic mt-1">
              Regras do Servidor
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Leia com atenção as regras de convivência e as observações da equipe de moderação para garantir uma comunidade saudável e organizada.
            </p>
          </div>

          <a
            href="https://discord.gg/8CcpNCcHb"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-center"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Discord Oficial</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>

      {/* Barra de Busca e Filtro de Abas */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar regra por palavra-chave (ex: Respeito, Spam, Perfil, Moderação)..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-purple-900"
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('todas')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'todas' ? 'bg-white text-purple-950 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setActiveTab('regras')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'regras' ? 'bg-white text-purple-950 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              10 Regras
            </button>
            <button
              onClick={() => setActiveTab('moderacao')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'moderacao' ? 'bg-white text-purple-950 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Moderação
            </button>
          </div>
        </div>
      </div>

      {/* SEÇÃO 1: REGRAS DO SERVIDOR */}
      {(activeTab === 'todas' || activeTab === 'regras') && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-purple-200 pb-2">
            <Shield className="w-5 h-5 text-purple-800" />
            <h2 className="text-lg font-bold font-heraldic text-slate-900 tracking-wide">
              Regras do Servidor
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredRules.map((rule) => (
              <div 
                key={rule.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-purple-300 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heraldic group-hover:text-purple-950 transition-colors">
                    {rule.title}
                  </h3>
                  <span className="text-[10px] uppercase font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded">
                    {rule.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {rule.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO 2: OBSERVAÇÕES DA MODERAÇÃO */}
      {(activeTab === 'todas' || activeTab === 'moderacao') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 border-b border-amber-200 pb-2">
            <span className="text-xl">🛡️</span>
            <h2 className="text-lg font-bold font-heraldic text-slate-900 tracking-wide">
              Observações da Moderação
            </h2>
          </div>

          <div className="bg-purple-950/5 border-2 border-purple-900/20 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 gap-3.5">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id}
                  className="bg-white rounded-xl border border-purple-100 p-4 shadow-xs space-y-1.5"
                >
                  <h4 className="font-bold text-purple-950 text-xs sm:text-sm font-heraldic">
                    {note.title}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DECLARAÇÃO DE CONCORDÂNCIA FINAL */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-md border border-purple-500/30">
        <HeartHandshake className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="font-heraldic font-bold text-base sm:text-lg text-white">
          Compromisso de Convivência na Void Zone
        </h3>
        <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto leading-relaxed font-light">
          "Ao permanecer no Void Zone, você declara estar ciente e de acordo com as regras e observações acima."
        </p>
        <div className="pt-2">
          <a
            href="https://discord.gg/8CcpNCcHb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Acessar o Servidor no Discord</span>
          </a>
        </div>
      </div>

    </div>
  );
};
