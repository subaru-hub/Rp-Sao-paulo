# Checklist de Segurança & Boas Práticas

Este checklist deve ser revisado antes de colocar o portal **PM RP São Paulo** em produção com a comunidade.

---

## 1. Segurança do Banco de Dados & Supabase

- [x] **Row Level Security (RLS) Ativada:** Todas as 12 tabelas possuem RLS habilitado explicitamente.
- [x] **Apenas Chave Pública `anon` no Frontend:** A chave secreta `service_role` **NUNCA** deve estar no código React, no GitHub ou nas variáveis do navegador.
- [x] **Bloqueio de Escalada de Privilégios:** A política RLS em `profiles` impede que qualquer usuário altere seu próprio campo `role` para virar administrador.
- [x] **Promoção Segura do 1º Administrador:** Feita exclusivamente pelo proprietário no SQL Editor com `CALL public.promote_initial_admin('email')`.
- [x] **Privacidade de Inscrições:** Candidaturas só podem ser consultadas com o protocolo individual ou por recrutadores/administradores autenticados.
- [x] **Privacidade de Registros Disciplinares:** Advertências e punições internas não são visíveis a visitantes comuns.
- [x] **Auditoria Completa (Audit Logs):** Todas as ações críticas (criar edital, alterar membros, mudar status de candidatos) são salvas com timestamp e identificador.

---

## 2. Segurança do Repositório & GitHub

- [x] **Arquivo `.gitignore` Configurado:** Arquivos `.env`, `.env.local` e pastas `node_modules` e `dist` estão ignorados pelo Git.
- [x] **Sem Segredos Expostos:** Nenhum token de bot do Discord ou senha de banco de dados está gravada nos arquivos de código.
- [x] **Branch Protection:** Recomenda-se ativar a proteção da branch `main` no GitHub para evitar alterações acidentais.

---

## 3. Conformidade Legal & Termos de Uso (Roblox & Brasil)

- [x] **Aviso de Isenção de Responsabilidade (Disclaimer):** Presente com destaque visual no cabeçalho e no rodapé, informando com clareza que se trata de uma experiência lúdica e fictícia no Roblox, sem qualquer ligação com o Governo do Estado de São Paulo ou a Polícia Militar real.
- [x] **Brasão Original Fictício:** Brasão de armas desenhado do zero em formato SVG, sem cópia de símbolos oficiais protegidos por legislação de heráldica estadual.
- [x] **Ausência de Cobrança Financeira:** Inscrições e cursos são 100% gratuitos, em conformidade com as diretrizes comunitárias.

---

## 4. Senha Secreta de Administrador & Google Forms

- [x] **Senha Secreta Padrão:** A chave mestra inicial é `VOID@ADMIN2026`. Recomenda-se que o Criador a altere na aba **Configurações** do Painel Administrativo assim que assumir a gestão.
- [x] **Auditoria de Tentativas de Acesso:** Tentativas de login com senha incorreta geram registros automáticos de alerta na trilha de auditoria (`Audit Logs`).
- [x] **Google Forms Oficial:** Os links de resposta do Google Forms devem ser públicos (habilitados para qualquer pessoa responder) e configurados na aba **Configurações** ou no edital individual. Não solicite senhas ou dados bancários no formulário.

