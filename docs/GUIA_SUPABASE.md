# Guia Passo a Passo: Configuração do Supabase (100% Gratuito)

Este guia foi elaborado para **iniciantes absolutos em programação**. Você aprenderá o que é o Supabase, como criar seu banco de dados na nuvem gratuitamente (sem necessidade de cartão de crédito) e como vincular ao portal **PM RP São Paulo**.

---

## 1. O que é o Supabase?

O **Supabase** é uma plataforma que fornece:
- **Banco de Dados Relacional (PostgreSQL):** Um local seguro na internet onde ficam guardadas as tabelas de membros, notícias, editais e inscrições.
- **Autenticação de Usuários:** Sistema seguro para login com e-mail e senha, sem que você precise programar criptografia de senhas do zero.
- **Row Level Security (RLS):** Uma camada de segurança interna no banco de dados que garante que visitantes comuns nunca consigam ver ou alterar inscrições privadas de outros membros.

O plano gratuito do Supabase é permanente e suficiente para comunidades de Roleplay.

---

## 2. Passo a Passo: Criando sua Conta e Projeto

1. Acesse o site oficial: [https://supabase.com](https://supabase.com).
2. Clique no botão verde **"Start your project"** ou **"Sign in"**.
3. Crie sua conta utilizando sua conta do **GitHub** (recomendado) ou seu e-mail.
4. Na tela inicial do painel, clique em **"New project"** (Novo Projeto).
5. Preencha as informações do projeto:
   - **Name (Nome):** `pmrp-sp-portal`
   - **Database Password (Senha do Banco):** Crie uma senha forte e guarde-a em local seguro.
   - **Region (Região):** Selecione **São Paulo (sa-east-1)** para menor tempo de resposta no Brasil.
   - **Pricing Plan:** Escolha **Free Tier** ($0 / mês).
6. Clique em **"Create new project"** e aguarde cerca de 1 a 2 minutos enquanto o Supabase configura seu servidor.

---

## 3. Passo a Passo: Executando as Migrations SQL

Para criar as 12 tabelas e as regras de segurança automaticamente:

1. No menu lateral esquerdo do Supabase, clique no ícone **"SQL Editor"** (ícone de terminal `>_`).
2. Clique em **"New query"** (Nova consulta).
3. Abra o arquivo `supabase/migrations/01_initial_schema.sql` deste projeto, copie todo o seu conteúdo e cole na caixa de texto do Supabase.
4. Clique no botão verde **"Run"** (no canto inferior direito). Uma mensagem de sucesso verde aparecerá.
5. Repita o procedimento para o arquivo `supabase/migrations/02_rls_policies.sql` (Políticas de Segurança RLS).
6. Repita o procedimento para o arquivo `supabase/migrations/03_seed_data.sql` (Carga inicial de dados).

Pronto! Todas as tabelas, índices e restrições estarão criadas.

---

## 4. Obtendo as Chaves para o Portal

Para que seu site converse com o Supabase com segurança:

1. No menu lateral esquerdo, clique na engrenagem **"Project Settings"** (Configurações do Projeto).
2. Clique na aba **"API"**.
3. Copie os seguintes dados:
   - **Project URL:** algo como `https://abcdefghijklm.supabase.co`
   - **Project API Keys -> `anon` / `public`:** chave pública que começa com `eyJ...`

> ⚠️ **ATENÇÃO DE SEGURANÇA MÁXIMA:** Nunca compartilhe nem copie a chave chamada `service_role` (secret) no código do site. Utilize **apenas** a chave pública `anon`! A proteção dos dados é garantida pelas políticas RLS que instalamos no Passo 3.

---

## 5. Como Ativar as Chaves no Seu Site

No seu computador ou serviço de hospedagem, crie ou edite o arquivo `.env`:

```env
VITE_SUPABASE_URL=https://sua-url-do-supabase.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui
```

Quando o site for iniciado, ele detectará automaticamente essas variáveis e sincronizará diretamente com o banco de dados na nuvem! Caso não estejam configuradas, o site continuará funcionando perfeitamente em modo demonstração local no navegador.

---

## 6. Procedimento Seguro para Promover o 1º Administrador

Por motivos de segurança, o portal **não possui nenhuma rota pública** que permita que um visitante qualquer se registre e vire administrador.

Para definir o proprietário como Administrador Geral:

1. Crie uma conta no portal através do formulário de autenticação ou da aba de login com seu e-mail (por exemplo: `seu_email@gmail.com`).
2. Abra o **SQL Editor** no painel do Supabase.
3. Execute o comando seguro de inicialização substituindo pelo seu e-mail:

```sql
CALL public.promote_initial_admin('seu_email@gmail.com');
```

4. O sistema atribuirá automaticamente o cargo `admin`, a matrícula `001` e todos os acessos de controle aos editais, membros e auditoria.
