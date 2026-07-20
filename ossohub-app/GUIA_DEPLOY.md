# Guia Completo: Como Colocar o OssoHub Online

Este guia explica passo a passo como deixar o novo OssoHub (rede social) funcionando.
Você vai precisar de **~30 minutos** e de duas contas gratuitas: **Supabase** e **Vercel**.

---

## PARTE 1 — Criar o Banco de Dados (Supabase)

O Supabase é onde ficam armazenados todos os dados: usuários, posts, comentários, etc.

### Passo 1.1 — Criar conta no Supabase

1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Entre com sua conta Google ou crie um email/senha
4. Clique em **"New project"**
5. Preencha:
   - **Name**: `ossohub`
   - **Database Password**: crie uma senha forte (ex: `OssoHub2024!`) — **GUARDE ESSA SENHA**
   - **Region**: escolha `South America (São Paulo)` para menor latência
6. Clique em **"Create new project"**
7. Aguarde ~2 minutos para o projeto ser criado

### Passo 1.2 — Rodar o Schema (criar as tabelas)

1. No painel do Supabase, clique em **"SQL Editor"** no menu lateral esquerdo
2. Clique em **"New query"** (botão verde)
3. Abra o arquivo `supabase/schema.sql` que está na pasta `ossohub-app`
   - No Windows Explorer, navegue até: `C:\Users\rober\Claude\Projects\orthonote\ossohub-app\supabase\`
   - Abra o arquivo `schema.sql` com o Bloco de Notas
   - Selecione todo o conteúdo (Ctrl+A) e copie (Ctrl+C)
4. Cole no SQL Editor do Supabase (Ctrl+V)
5. Clique em **"Run"** (botão verde no canto direito)
6. Aguarde a mensagem **"Success. No rows returned"** — isso é correto!

### Passo 1.3 — Criar os Buckets de Armazenamento (para fotos)

1. No menu lateral do Supabase, clique em **"Storage"**
2. Clique em **"New bucket"**
3. Preencha: **Name** = `avatars`, marque **"Public bucket"** ✓
4. Clique em **"Save"**
5. Repita: clique em **"New bucket"** novamente
6. Preencha: **Name** = `post-images`, marque **"Public bucket"** ✓
7. Clique em **"Save"**

### Passo 1.4 — Pegar as Credenciais do Supabase

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem no fundo)
2. Clique em **"API"**
3. Você vai ver três informações importantes — **copie cada uma**:
   - **Project URL**: algo como `https://abcdefgh.supabase.co`
   - **anon public**: uma chave longa começando com `eyJh...`
   - **service_role** (role mais abaixo): outra chave longa — **NUNCA compartilhe essa**

---

## PARTE 2 — Configurar o Projeto Localmente

### Passo 2.1 — Abrir o Terminal na pasta certa

1. Abra o **Explorador de Arquivos** do Windows
2. Navegue até: `C:\Users\rober\Claude\Projects\orthonote\ossohub-app`
3. Clique na barra de endereço do Explorer (onde fica o caminho da pasta)
4. Digite `cmd` e pressione Enter — abre o terminal **já na pasta certa**

### Passo 2.2 — Criar o arquivo de configuração (.env.local)

1. No terminal que abriu, digite:
   ```
   copy .env.example .env.local
   ```
   e pressione Enter

2. Abra o arquivo `C:\Users\rober\Claude\Projects\orthonote\ossohub-app\.env.local` com o Bloco de Notas
   
3. Substitua os valores com o que você copiou do Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Salve o arquivo (Ctrl+S)

### Passo 2.3 — Instalar as dependências

No terminal, digite:
```
npm install
```
e pressione Enter. Aguarde — vai baixar vários pacotes (pode levar 2-3 minutos).

### Passo 2.4 — Testar localmente

No terminal, digite:
```
npm run dev
```
e pressione Enter.

Aguarde aparecer a mensagem: `▲ Next.js ... ready - started server on 0.0.0.0:3000`

Abra o navegador e acesse: **http://localhost:3000**

Se a landing page do OssoHub aparecer, está tudo funcionando! ✅

Para parar o servidor local, pressione **Ctrl+C** no terminal.

---

## PARTE 3 — Colocar Online (Deploy no Vercel)

O Vercel é o serviço que vai hospedar o site na internet, de graça.

### Passo 3.1 — Fazer o deploy

No terminal (dentro da pasta `ossohub-app`), rode:

```
npx vercel deploy --prod --yes --token SEU_TOKEN_VERCEL_AQUI
```

Aguarde. No final ele vai mostrar uma URL como:
`https://ossohub-app-xxxx.vercel.app`

**Esse é o endereço do seu site!** Mas ainda sem as variáveis de ambiente — veja o próximo passo.

### Passo 3.2 — Configurar as variáveis de ambiente no Vercel

Esse é o passo mais importante — sem isso, o site não consegue acessar o banco de dados.

1. Acesse: https://vercel.com e faça login
2. No painel, clique no projeto **ossohub-app** (ou similar)
3. Clique em **"Settings"** (menu superior)
4. Clique em **"Environment Variables"** (menu lateral)
5. Adicione cada variável:

   **Variável 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://SEU_PROJETO.supabase.co`
   - Environments: marque Production, Preview e Development ✓
   - Clique em **"Save"**

   **Variável 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: sua chave anon (a longa começando com eyJh...)
   - Environments: marque todos ✓
   - Clique em **"Save"**

   **Variável 3:**
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: sua chave service_role
   - Environments: marque apenas Production ✓
   - Clique em **"Save"**

6. Depois de salvar todas as 3 variáveis, clique em **"Deployments"** no menu superior
7. Clique nos 3 pontinhos (**...**) do deploy mais recente
8. Clique em **"Redeploy"**
9. Aguarde o novo deploy terminar (~2 minutos)

### Passo 3.3 — Testar o site online

Acesse a URL que o Vercel forneceu (ex: `https://ossohub-app-xxxx.vercel.app`).

Crie uma conta de teste, publique um post e veja o feed funcionando!

---

## PARTE 4 — Configurar um Domínio Personalizado (opcional)

Se quiser usar um domínio como `app.ossohub.com` ou um domínio novo:

1. No Vercel, vá em **Settings → Domains**
2. Digite o domínio desejado e siga as instruções de DNS
3. Se já tiver um domínio registrado, você só precisa apontar o DNS para o Vercel

---

## PARTE 5 — Atualizar o Site no Futuro

Quando modificar qualquer arquivo do projeto e quiser publicar a atualização:

1. Abra o terminal na pasta `ossohub-app`
2. Rode:
   ```
   npx vercel deploy --prod --yes --token SEU_TOKEN_VERCEL_AQUI
   ```
3. Pronto — site atualizado em ~2 minutos!

---

## Resumo dos Links Importantes

| O que é | Link |
|---|---|
| Supabase (banco de dados) | https://supabase.com |
| Vercel (hospedagem) | https://vercel.com |
| Seu site local (para testar) | http://localhost:3000 |
| Seu site online | (URL fornecida pelo Vercel no deploy) |

---

## Se der erro...

**"Module not found"** → rode `npm install` novamente

**Página em branco / erro 500** → verifique se as variáveis de ambiente estão corretas no Vercel e refaça o redeploy

**"Invalid API key"** → a chave do Supabase foi copiada errada — copie novamente em Project Settings → API

**Login não funciona** → no Supabase, vá em Authentication → URL Configuration → adicione a URL do seu Vercel em "Site URL" e "Redirect URLs"
