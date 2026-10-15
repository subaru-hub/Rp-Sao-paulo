# Guia de Publicação Gratuita: GitHub & GitHub Pages

Este guia foi elaborado para **iniciantes** que desejam publicar o portal **PM RP São Paulo** na internet de forma 100% gratuita.

---

## 1. O que são Git, GitHub e GitHub Pages?

- **Git:** É um programa que grava o histórico de alterações dos arquivos do seu projeto.
- **GitHub:** Um site onde você guarda seu código na nuvem com segurança.
- **GitHub Pages:** Um serviço gratuito do GitHub que coloca seu site no ar na internet com endereço próprio (ex: `https://seu-usuario.github.io/pmrp-sp-portal`).

---

## 2. Passo a Passo: Criando o Repositório no GitHub

1. Acesse [https://github.com](https://github.com) e crie uma conta gratuita (se ainda não tiver).
2. Clique no botão verde **"New"** (ou no símbolo `+` no topo direito -> **"New repository"**).
3. Preencha as opções:
   - **Repository name:** `portal-pmrp-sp`
   - **Description:** `Portal Oficial de Roleplay PM RP São Paulo no Roblox`
   - **Visibility:** Escolha **Public** (Público) para poder usar o GitHub Pages gratuito.
   - Deixe desmarcada a opção de adicionar README (já temos um completo neste projeto).
4. Clique em **"Create repository"**.

---

## 3. Passo a Passo: Enviando o Código para o GitHub

No terminal do seu computador (na pasta onde está o projeto):

```bash
# 1. Inicialize o repositório Git local
git init

# 2. Adicione todos os arquivos (o arquivo .gitignore protegerá seus segredos)
git add .

# 3. Crie o primeiro registro de versão
git commit -m "Versão Inicial Completa do Portal PM RP São Paulo"

# 4. Conecte ao seu repositório do GitHub (substitua pelo link que o GitHub te deu)
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portal-pmrp-sp.git

# 5. Envie os arquivos para o GitHub
git push -u origin main
```

---

## 4. Passo a Passo: Publicando no GitHub Pages via GitHub Actions

Criamos um fluxo automático para compilar o React e publicar no GitHub Pages sem você precisar rodar comandos manuais a cada atualização.

1. No seu repositório no GitHub, clique na aba **"Settings"** (Configurações).
2. No menu lateral esquerdo, clique em **"Pages"**.
3. Na seção **"Build and deployment"**:
   - Em **Source**, selecione **"GitHub Actions"**.
4. Crie o arquivo `.github/workflows/deploy.yml` no projeto com o conteúdo abaixo:

```yaml
name: Deploy Portal PM RP no GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Instalar Dependências
        run: npm ci

      - name: Compilar Projeto (Build)
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> **Dica para Vite no GitHub Pages:** Se o seu repositório se chama `portal-pmrp-sp`, certifique-se de configurar a propriedade `base: './'` no seu arquivo `vite.config.ts` para que os estilos e scripts carreguem corretamente em subpastas.

---

## 5. Alternativa Recomendada: Vercel ou Netlify (Ainda mais simples)

Se você preferir não configurar o GitHub Actions, a **Vercel** ([https://vercel.com](https://vercel.com)) ou o **Netlify** ([https://netlify.com](https://netlify.com)) oferecem hospedagem gratuita de 1 clique:
1. Conecte sua conta do GitHub na Vercel;
2. Selecione o repositório `portal-pmrp-sp`;
3. Adicione as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`;
4. Clique em **"Deploy"**. Seu site estará no ar em 30 segundos com HTTPS gratuito e atualizações automáticas a cada commit!
