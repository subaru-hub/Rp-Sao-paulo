import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  Radio, 
  Shield, 
  Download, 
  FileText, 
  GraduationCap, 
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Course } from '../types';
import { BrasaoPMSP } from '../components/BrasaoPMSP';

interface AcademiaPageProps {
  courses: Course[];
}

export const AcademiaPage: React.FC<AcademiaPageProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [activeTab, setActiveTab] = useState<'conteudo' | 'manuais' | 'prova'>('conteudo');

  // Estado do Quiz / Prova
  const [quizAnswers, setQuizAnswers] = useState<{ [qIndex: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateRoblox, setCandidateRoblox] = useState('');

  const currentQuiz = selectedCourse?.quiz || [];

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: currentQuiz.length,
      percentage: Math.round((correct / currentQuiz.length) * 100),
      passed: (correct / currentQuiz.length) >= 0.8
    };
  };

  const scoreResult = quizSubmitted ? calculateScore() : null;

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Institucional */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-700 uppercase font-semibold">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>Diretoria de Ensino e Instrução (DEI)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heraldic mt-1">
              Academia Policial Militar RP (APMSP)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              Centro de formação doutrinária, manuais de procedimento operacional padrão (POP) e avaliações teóricas para promoção e certificação de novos integrantes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-indigo-50 text-indigo-900 px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-200">
              {courses.length} Cursos Cadastrados
            </span>
          </div>
        </div>
      </div>

      {/* Navegação entre Cursos e Sub-abas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Coluna Lateral: Lista de Cursos */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 font-mono">
              Grade Curricular
            </h3>
            <div className="space-y-2">
              {courses.map(course => {
                const isSelected = selectedCourse.id === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => {
                      setSelectedCourse(course);
                      resetQuiz();
                    }}
                    className={`w-full text-left p-3 rounded-lg text-xs transition-all ${
                      isSelected 
                        ? 'bg-blue-950 text-white font-semibold shadow border-l-4 border-amber-400' 
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                        {course.code}
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                        {course.workload_hours}h
                      </span>
                    </div>
                    <div className="line-clamp-2 leading-snug">
                      {course.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destaque do Código Q Fictício */}
          <div className="bg-slate-900 text-white rounded-xl p-4 border border-amber-500/40 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px] font-mono">
              <Radio className="w-3.5 h-3.5" />
              <span>Código Q Essencial no RP</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-amber-300 font-bold">QAP:</span>
                <span>Na escuta / Pronto</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-amber-300 font-bold">QTH:</span>
                <span>Localização exata</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-amber-300 font-bold">QSL:</span>
                <span>Entendido / Confirmado</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-amber-300 font-bold">QRU:</span>
                <span>Ocorrência em andamento</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300 font-bold">QRR:</span>
                <span className="text-rose-400 font-bold">Apoio Policial Urgente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Central: Conteúdo do Curso Selecionado */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Card de Informações Gerais do Curso */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-amber-400 px-2 py-0.5 rounded">
                  {selectedCourse.code} • {selectedCourse.category}
                </span>
                <h2 className="text-xl font-bold font-heraldic text-slate-900 mt-2">
                  {selectedCourse.title}
                </h2>
              </div>
              
              {/* Botões de Sub-aba */}
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs self-start sm:self-center">
                <button
                  onClick={() => setActiveTab('conteudo')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    activeTab === 'conteudo' ? 'bg-white text-blue-950 shadow font-semibold' : 'text-slate-600'
                  }`}
                >
                  Módulos
                </button>
                <button
                  onClick={() => setActiveTab('manuais')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    activeTab === 'manuais' ? 'bg-white text-blue-950 shadow font-semibold' : 'text-slate-600'
                  }`}
                >
                  Manuais POP
                </button>
                {selectedCourse.quiz.length > 0 && (
                  <button
                    onClick={() => setActiveTab('prova')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                      activeTab === 'prova' ? 'bg-white text-blue-950 shadow font-semibold' : 'text-slate-600'
                    }`}
                  >
                    Avaliação Teórica ({selectedCourse.quiz.length})
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedCourse.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Instrutor Responsável</span>
                <span className="font-semibold text-slate-800">{selectedCourse.instructor}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Público-Alvo</span>
                <span className="font-semibold text-slate-800">{selectedCourse.target_audience}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Carga Horária Fictícia</span>
                <span className="font-semibold text-slate-800">{selectedCourse.workload_hours} horas de simulação</span>
              </div>
            </div>
          </div>

          {/* SUB-ABA 1: MÓDULOS DE AULA */}
          {activeTab === 'conteudo' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-heraldic text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-900" />
                <span>Módulos Doutrinários do Curso</span>
              </h3>

              <div className="space-y-3">
                {selectedCourse.modules.map((mod, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {mod.title}
                      </h4>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {mod.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-ABA 2: MANUAIS POP DE PROCEDIMENTO */}
          {activeTab === 'manuais' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold font-heraldic text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Procedimentos Operacionais Padrão (POP-RP)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Diretrizes mandatórias para todas as patrulhas motorizadas e a pé no mapa do Roblox.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h4 className="font-bold text-blue-950 text-sm mb-2">
                    POP 01 — Abordagem Veicular a Fundada Suspeita
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li><strong>Comunicação Rádio:</strong> Antes de ligar os sinais luminosos, o motorista ou auxiliar deve modular na frequência: <em>"Viatura 101 iniciando acompanhamento visual de veículo modelo [X], cor [Y], placa [Z], pelo QTH [Localização]"</em>.</li>
                    <li><strong>Posicionamento da Viatura:</strong> Parar a viatura a 5 metros da traseira do veículo suspeito, com as rodas dianteiras esterçadas para a esquerda e ângulo de 45 graus.</li>
                    <li><strong>Comandos Verbais:</strong> Desembarcar com a arma no coldre ou empunhada para baixo, emitindo ordem clara: <em>"Polícia Militar! Desligue o motor, puxe o freio de mão e mantenha as duas mãos visíveis no volante!"</em>.</li>
                    <li><strong>Revista e Checagem:</strong> O segundo operador realiza a cobertura enquanto o primeiro se aproxima pela coluna traseira esquerda.</li>
                  </ol>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h4 className="font-bold text-blue-950 text-sm mb-2">
                    POP 02 — Regras Estritas de Combate e Não-RDM (Random Deathmatch)
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>O uso de arma de fogo é estritamente excepcional, reservado para situações onde houver risco iminente à vida de policiais ou civis no roleplay.</li>
                    <li>É expressamente proibido disparar sem antes dar 3 advertências verbais claras, salvo se o suspeito efetuar disparos primeiro contra a guarnição.</li>
                    <li>Bater propositalmente a viatura em alta velocidade para capotar o veículo adversário (VDM) acarreta em advertência grave e rebaixamento automático.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SUB-ABA 3: AVALIAÇÃO TEÓRICA E CERTIFICADO SIMULADO */}
          {activeTab === 'prova' && (
            <div className="space-y-6">
              {!quizSubmitted ? (
                /* Formulário do Quiz */
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <span className="text-[10px] font-mono font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      AVALIAÇÃO DE APTIDÃO DOUTRINÁRIA
                    </span>
                    <h3 className="text-base font-bold font-heraldic text-slate-900 mt-1">
                      Prova Teórica do Módulo ({currentQuiz.length} Questões)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Para aprovação e emissão do certificado, é necessário atingir rendimento mínimo de 80%.
                    </p>
                  </div>

                  {/* Identificação do Aluno */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Seu Nome Completo / Nome RP *
                      </label>
                      <input 
                        type="text"
                        placeholder="Ex: Al Sd Lucas Oliveira"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Usuário no Roblox *
                      </label>
                      <input 
                        type="text"
                        placeholder="Ex: Lucas_OliveiraRP"
                        value={candidateRoblox}
                        onChange={(e) => setCandidateRoblox(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-900 outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Questões */}
                  <div className="space-y-6">
                    {currentQuiz.map((q, qIndex) => (
                      <div key={qIndex} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div className="flex items-start gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {qIndex + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                            {q.question}
                          </h4>
                        </div>

                        <div className="space-y-2 pl-8">
                          {q.options.map((opt, optIndex) => {
                            const isSelected = quizAnswers[qIndex] === optIndex;
                            return (
                              <button
                                key={optIndex}
                                type="button"
                                onClick={() => handleSelectOption(qIndex, optIndex)}
                                className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between border ${
                                  isSelected 
                                    ? 'bg-blue-950 text-white font-medium border-blue-950 shadow-sm' 
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                                }`}
                              >
                                <span>{opt}</span>
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold' : 'border-slate-300'
                                }`}>
                                  {isSelected ? '✓' : ''}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={Object.keys(quizAnswers).length < currentQuiz.length || !candidateName.trim()}
                      onClick={() => setQuizSubmitted(true)}
                      className="w-full py-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 shadow flex items-center justify-center gap-2"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Concluir e Corrigir Prova</span>
                    </button>
                    {(!candidateName.trim() || Object.keys(quizAnswers).length < currentQuiz.length) && (
                      <p className="text-[11px] text-slate-400 text-center mt-2">
                        Preencha seu nome e responda a todas as {currentQuiz.length} questões para liberar a correção.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Resultado da Prova & Certificado Fictício */
                <div className="space-y-6">
                  {scoreResult && (
                    <div className="space-y-6">
                      
                      {/* Banner do Resultado */}
                      <div className={`p-6 rounded-2xl border text-center space-y-2 ${
                        scoreResult.passed 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                          : 'bg-rose-50 border-rose-300 text-rose-950'
                      }`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                          scoreResult.passed ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                        }`}>
                          {scoreResult.passed ? <CheckCircle2 className="w-7 h-7" /> : <HelpCircle className="w-7 h-7" />}
                        </div>
                        <h3 className="text-xl font-bold font-heraldic">
                          {scoreResult.passed ? 'APROVADO NA AVALIAÇÃO TEÓRICA!' : 'RENDIMENTO INSUFICIENTE'}
                        </h3>
                        <p className="text-xs max-w-md mx-auto">
                          Você acertou <strong>{scoreResult.correct} de {scoreResult.total}</strong> questões ({scoreResult.percentage}% de acerto).
                          {scoreResult.passed ? ' Parabéns! Seu certificado de conclusão fictício foi emitido abaixo.' : ' O aproveitamento mínimo exigido é de 80%. Você pode revisar os manuais e tentar novamente.'}
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={resetQuiz}
                            className="px-4 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Tentar Novamente</span>
                          </button>
                        </div>
                      </div>

                      {/* CERTIFICADO FICTÍCIO DE CONCLUSÃO EMITIDO (SE APROVADO) */}
                      {scoreResult.passed && (
                        <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 border-4 border-amber-600/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center text-slate-900">
                          {/* Moldura Clássica */}
                          <div className="border border-amber-400/50 p-6 rounded-xl space-y-4">
                            <div className="flex justify-center">
                              <BrasaoPMSP size="md" />
                            </div>

                            <div className="text-[11px] font-mono tracking-widest uppercase text-amber-800 font-bold">
                              DIRETORIA DE ENSINO E INSTRUÇÃO • APMSP
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heraldic text-blue-950 tracking-wider">
                              CERTIFICADO DE CAPACITAÇÃO FICTÍCIO
                            </h2>

                            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                              Certificamos para os devidos fins da comunidade de Roleplay que o integrante
                            </p>

                            <div className="text-xl sm:text-2xl font-bold font-heraldic text-slate-900 border-b-2 border-amber-500/50 inline-block px-8 pb-1">
                              {candidateName || 'Aluno(a) da Academia'}
                            </div>

                            <div className="text-xs font-mono text-slate-500">
                              Usuário Roblox: @{candidateRoblox || 'roblox_user'}
                            </div>

                            <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                              Concluiu com aproveitamento de <strong>{scoreResult.percentage}%</strong> os estudos do módulo teórico de <strong>{selectedCourse.title}</strong>, demonstrando pleno domínio do Código Q e do Procedimento Operacional Padrão de Abordagem.
                            </p>

                            <div className="pt-6 grid grid-cols-2 gap-8 text-[11px] text-slate-500 max-w-md mx-auto">
                              <div className="border-t border-slate-300 pt-2 text-center">
                                <div className="font-bold text-slate-800">{selectedCourse.instructor}</div>
                                <div className="text-[10px]">Instrutor Chefe RP</div>
                              </div>
                              <div className="border-t border-slate-300 pt-2 text-center">
                                <div className="font-bold text-slate-800">Cel PM Silveira</div>
                                <div className="text-[10px]">Comando Geral RP</div>
                              </div>
                            </div>

                            <div className="pt-4 text-[9px] font-mono text-slate-400">
                              Autenticidade Fictícia: PMSP-CERT-{Math.random().toString(36).substring(2, 8).toUpperCase()} • Emitido em {new Date().toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Gabarito Comentado */}
                      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                          Gabarito e Justificativas Doutrinárias
                        </h4>
                        <div className="space-y-3">
                          {currentQuiz.map((q, i) => {
                            const isCorrect = quizAnswers[i] === q.correctIndex;
                            return (
                              <div key={i} className={`p-3.5 rounded-lg border text-xs ${
                                isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                              }`}>
                                <div className="flex items-center justify-between font-semibold mb-1">
                                  <span>Questão {i + 1}: {q.question}</span>
                                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                    isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                                  }`}>
                                    {isCorrect ? 'Correta' : 'Incorreta'}
                                  </span>
                                </div>
                                <div className="text-slate-600 mt-1">
                                  <strong>Resposta correta:</strong> {q.options[q.correctIndex]}
                                </div>
                                <div className="text-slate-500 italic mt-0.5 text-[11px]">
                                  <strong>Fundamento:</strong> {q.explanation}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
