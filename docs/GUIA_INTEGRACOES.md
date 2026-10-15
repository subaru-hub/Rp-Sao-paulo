# Guia de Integração: Discord & Roblox

Este documento orienta a equipe de comando da comunidade sobre como conectar o portal **PM RP São Paulo** ao servidor do **Discord** e à experiência do **Roblox** com máxima segurança.

---

## 1. Integração com o Discord

### A. Botão de Convite Público
O link de convite do Discord pode ser alterado a qualquer momento diretamente pelo painel administrativo em `/admin` na aba **"Configurações"**.

- Utilize um link permanente gerado pelo Discord (Configurações do Canal -> Convidar Pessoas -> Marcar "Nunca expirar").
- Exemplo de formato: `https://discord.gg/pmrp-sp`

### B. Notificações Automáticas de Novos Editais e Notícias (Webhooks)
Para que o Discord receba um aviso com imagem, título e link sempre que um novo edital ou notícia for publicado:

1. No seu servidor do Discord, vá até o canal onde deseja postar os comunicados (ex: `#boletins-oficiais`).
2. Clique na engrenagem de **Editar Canal** -> **Integrações** -> **Webhooks** -> **Novo Webhook**.
3. Dê o nome de **"PM RP SP — Comunicador Oficial"**, defina o avatar com o brasão fictício e clique em **"Copiar URL do Webhook"**.
4. ⚠️ **REGRA DE SEGURANÇA CRÍTICA:** Nunca insira a URL do webhook do Discord diretamente no código público do frontend no GitHub, pois qualquer visitante poderia utilizá-lo para enviar mensagens indevidas no seu servidor.
5. Utilize uma **Edge Function** gratuita do Supabase ou uma rota de servidor backend Express para despachar as mensagens via POST para o Discord.

Exemplo de payload formatado (Embed):
```json
{
  "username": "PM RP São Paulo • Boletim Oficial",
  "avatar_url": "https://seu-portal.com/brasao.png",
  "embeds": [
    {
      "title": "📋 NOVO EDITAL DE INGRESSO PUBLICADO: CFSd 2026/01",
      "description": "Estão abertas as inscrições para o Curso de Formação de Soldados. Acesse o portal oficial para submeter sua ficha.",
      "color": 14002999,
      "fields": [
        { "name": "Vagas", "value": "25 vagas", "inline": true },
        { "name": "Encerramento", "value": "30/10/2026", "inline": true }
      ],
      "url": "https://seu-portal.com/#editais"
    }
  ]
}
```

---

## 2. Integração com o Roblox

### A. Link Direto para Entrar no Jogo
O link do jogo no Roblox é configurável pelo painel administrativo em `/admin`.

- Formato padrão de link da experiência:
  `https://www.roblox.com/games/SEU_PLACE_ID/PM-RP-Sao-Paulo-Oficial`
- Quando clicado em computadores ou celulares com o aplicativo do Roblox instalado, o link abre a experiência automaticamente.

### B. Verificação Segura de Contas do Roblox
Para evitar que candidatos informem nomes de usuários de outras pessoas no formulário:
1. **Regra de Ouro:** Nunca confie em informações enviadas pelo navegador sem confirmação.
2. Na etapa 3 do recrutamento (Entrevista no Discord), solicite que o candidato envie uma mensagem temporária na sua biografia do Roblox com o código do seu protocolo (ex: `PMSP-2026-X849B`) ou conecte o bot oficial via **Bloxlink** ou **Rover** no Discord.
3. Isso comprova de forma 100% gratuita e definitiva que o usuário do Discord é o real proprietário da conta no Roblox, sem risco de falsidade ideológica.
