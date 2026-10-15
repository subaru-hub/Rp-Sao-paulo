# Portal Oficial PM RP São Paulo • Roblox Roleplay

> **Aviso Legal:** Este portal é uma criação lúdica destinada exclusivamente à comunidade de simulação e Roleplay no **Roblox** e **Discord**. Não possui vínculo, afiliação ou representação com o Governo do Estado de São Paulo ou com a Polícia Militar real (PMESP).

---

## 🏛️ 1. Sobre o Projeto

O **Portal PM RP São Paulo** foi concebido como uma plataforma institucional completa, moderna, responsiva e segura no estilo de portal governamental brasileiro (com cores azul-marinho `#0B1A30`, detalhes em dourado discreto e branco).

O sistema atende membros da corporação fictícia, candidatos a recrutamento, oficiais e administradores, oferecendo serviços públicos de simulação, acompanhamento de inscrições, academia com prova teórica interativa e painel de controle administrativo completo.

---

## 💡 2. Tecnologias Explicadas para Iniciantes

Se você está começando a programar agora, aqui está a explicação simples de cada tecnologia utilizada:

1. **React 19 + TypeScript:** A estrutura que constrói as telas do site de maneira rápida, modular e organizada, prevenindo erros de digitação de código com a tipagem estrita do TypeScript.
2. **Tailwind CSS v4:** A ferramenta de estilos que garante que o site seja bonito, profissional e se adapte perfeitamente a computadores, tablets e celulares (design responsivo).
3. **Vite:** O compilador moderno que roda o site no seu computador em milissegundos e gera os arquivos finais para publicação na web.
4. **Supabase (Plano Gratuito):** Um banco de dados relacional (PostgreSQL) seguro na nuvem, com controle de autenticação e proteção de dados sigilosos via **Row Level Security (RLS)**.
5. **Lucide Icons:** Conjunto de ícones vetoriais discretos e institucionais.
6. **Dual-Mode (LocalStorage + Supabase):** O portal funciona imediatamente fora da caixa com dados fictícios de demonstração salvos no seu navegador, e está 100% pronto para conectar ao seu banco de dados Supabase na nuvem assim que você configurar as variáveis de ambiente.

---

## 📂 3. Estrutura de Pastas do Projeto

```
portal-pmrp-sp/
├── .env.example                     # Exemplo de variáveis de ambiente
├── index.html                       # Ponto de entrada HTML com meta tags e fontes
├── package.json                     # Lista de dependências e comandos do projeto
├── README.md                        # Este documento principal de orientação
├── vite.config.ts                   # Configurações do Vite
│
├── docs/                            # Guias detalhados para iniciantes
│   ├── GUIA_SUPABASE.md             # Passo a passo de configuração do Supabase
│   ├── GUIA_GITHUB_PAGES.md         # Como hospedar gratuitamente no GitHub
│   ├── GUIA_INTEGRACOES.md          # Como conectar com Discord e Roblox
│   └── CHECKLIST_SEGURANCA.md       # Verificações de segurança e privacidade
│
├── supabase/
│   └── migrations/                  # Scripts SQL completos prontos para o Supabase
│       ├── 01_initial_schema.sql    # Criação das 12 tabelas e constraints
│       ├── 02_rls_policies.sql      # Políticas de segurança RLS e primeiro admin
│       └── 03_seed_data.sql         # Carga inicial de patentes, unidades e editais
│
└── src/
    ├── main.tsx                     # Inicializador do React
    ├── App.tsx                      # Orquestrador central e roteamento em abas
    ├── index.css                    # Estilos globais e fontes institucionais
    ├── types/
    │   └── index.ts                 # Definições completas de tipos TypeScript
    ├── lib/
    │   └── supabase.ts              # Cliente oficial do Supabase com fallback seguro
    ├── services/
    │   └── store.ts                 # Store central reativa, persistência e auditoria
    ├── components/
    │   ├── BrasaoPMSP.tsx           # Brasão de armas fictício em SVG original
    │   ├── Navbar.tsx               # Barra superior governamental e menu responsivo
    │   ├── Footer.tsx               # Rodapé com aviso legal obrigatório e links
    │   ├── AlertBanner.tsx          # Banner de comunicados urgentes no topo
    │   └── StatusConsultaModal.tsx  # Consulta de inscrição por número de protocolo
    └── pages/
        ├── HomePage.tsx             # Página inicial com destaques e estatísticas
        ├── HierarquiaPage.tsx       # Quadro de oficiais, praças e unidades
        ├── EditaisPage.tsx          # Lista e detalhes de concursos de recrutamento
        ├── InscricoesPage.tsx       # Formulário de alistamento e consulta
        ├── AcademiaPage.tsx         # Cursos, manuais POP e prova com certificado
        ├── LegislacaoPage.tsx       # RGI, Código de Conduta e histórico de portarias
        ├── NoticiasPage.tsx         # Boletins oficiais e leitor de comunicados
        ├── JogoPage.tsx             # Guia do servidor Roblox, teclas e viaturas
        └── AdminPage.tsx            # Painel administrativo completo (/admin)
```

---

## 🚀 4. Como Executar o Projeto Localmente

1. Tenha o **Node.js** instalado (versão 18 ou superior).
2. Abra a pasta do projeto no terminal e execute:
   ```bash
   # Instale todas as dependências
   npm install

   # Inicie o servidor de desenvolvimento
   npm run dev
   ```
3. O portal abrirá em seu navegador no endereço: `http://localhost:3000`.

---

## 🛡️ 5. Principais Módulos do Sistema

### Páginas Públicas
- **Página Inicial (`/`):** Apresentação, estatísticas reais da comunidade, atalhos rápidos, comunicados e editais em destaque.
- **Hierarquia (`/hierarquia`):** Quadro com todas as patentes (Comando, Oficiais Superiores, Praças Especiais e Praças), busca por nome de usuário e filtro por unidades como 1º BAEP, Força Tática e Águia.
- **Editais (`/editais`):** Editais abertos, em andamento e encerrados, com requisitos eliminatórios, cronograma de etapas e botão direto de inscrição.
- **Inscrições (`/inscricoes`):** Ficha de alistamento com perguntas situacionais de roleplay, geração de protocolo único (ex: `PMSP-2026-X849B`) e aba de consulta individual de andamento.
- **Academia Policial Militar (`/academia`):** Manuais de Procedimento Operacional Padrão (POP), tabela de Código Q e **Simulador de Avaliação Teórica** com 5 questões comentadas e emissão de Certificado Fictício ao atingir 80% de acerto.
- **Legislação (`/legislacao`):** Regulamento Geral Interno (RGI), Código de Conduta antimarginalização (sem RDM/VDM/Combat Logging) e histórico de versões.
- **Notícias (`/noticias`):** Informes oficiais categorizados com leitor completo.
- **Servidor Roblox (`/jogo`):** Guia com as teclas de sirene, comandos de rádio, catálogo de viaturas operacionais e link direto para entrar no jogo.

### Painel Administrativo (`/admin`)
Protegido por controle de acesso por papéis (`admin`, `recruiter`, `moderator`):
- Criação e encerramento de editais;
- Avaliação de candidaturas privadas com atribuição de parecer e status;
- Promoção, transferência de unidade e cadastramento de integrantes;
- Aplicação de advertências ou elogios de conduta com impacto na ficha funcional;
- Configuração dos links públicos do Discord e Roblox;
- Trilha de auditoria (Audit Logs) com registro de cada ação executada;
- Janelas de confirmação dupla antes de qualquer exclusão destrutiva.

---

## 🔐 6. Conexão com o Supabase & Segurança

Consulte os manuais na pasta `/docs`:
- [Guia de Configuração do Supabase](docs/GUIA_SUPABASE.md)
- [Guia de Publicação no GitHub Pages](docs/GUIA_GITHUB_PAGES.md)
- [Guia de Integrações com Discord e Roblox](docs/GUIA_INTEGRACOES.md)
- [Checklist de Segurança e Testes](docs/CHECKLIST_SEGURANCA.md)

---

## 📄 Licença e Isenção de Responsabilidade

Projeto comunitário sem fins lucrativos desenvolvido com propósito de entretenimento em simulação de Roleplay.
