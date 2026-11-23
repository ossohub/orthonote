# Revisão diária do conteúdo (6 capítulos por dia)

Objetivo: **revisar o site**, não produzir leitura. A tarefa agendada roda
6 vezes por dia (a cada 4 horas). Cada execução é
uma sessão separada e revisa **um único capítulo** (unidade), para ler o
capítulo inteiro com atenção total. O capítulo é comparado com os assuntos
do site para:

1. **corrigir** o que estiver errado no site;
2. **criar disclaimer** (nota) do que a referência trata de forma diferente,
   do que foi pulado ou não dito na primeira passada rápida.

Abrange a **Medicina Esportiva** (`src/data/esporte`) e o **Pronto-Socorro**
adulto e pediátrico (`src/data/ps`).

## Arquivos

| Arquivo | Para quê |
|---|---|
| `docs/revisao-diaria/fila.json` | Ordem das unidades, status (`pendente`/`feito`), data e resumo do que mudou |
| `src/data/esporte/revisao-diaria.ts` | `NOTAS_DIARIA` (notas por id de tópico) e `NOVOS_DIARIA` (tópicos novos) |
| `src/data/ps/revisao-diaria.ts` | `NOTAS_PS` (notas por id de condição) e `NOVOS_PS` (condições novas) |
| `scripts/checar-conteudo.ts` | Checagem de integridade (ids, links, fontes, fila, nada de livro no repo) |

O texto dos livros **não fica no GitHub** (repositório público). Cada unidade
está como `<ID>.txt` numa pasta privada do Google Drive do dono (o id da pasta
vai no prompt da tarefa agendada). Cabeçalho de cada arquivo:
`LIVRO / UNIDADE / PÁGINAS DO PDF`.

## Procedimento de cada execução (uma unidade só)

1. **Pegar a unidade**: a primeira de `fila.json` com `"status": "pendente"`.
2. **Baixar do Drive**: se a unidade tiver o campo `arquivo` (ex.: `ESP-03.txt`,
   um arquivo por livro), buscar `title = '<arquivo>'`; senão, `title = '<ID>.txt'`.
   Baixar com `download_file_content` (o conector salva um arquivo local). No
   arquivo por livro, usar só o trecho entre `### UNIDADE <ID>` e `### FIM <ID>`. Guardar
   **fora do repositório** (pasta temporária). Ler a unidade inteira.
   Se o Drive não responder ou o arquivo não existir: parar, não avançar a fila
   e avisar.
3. **Achar os assuntos do site** ligados ao capítulo (buscar por palavras-chave
   do capítulo):
   - `alvo: "esporte"` → `src/data/esporte/*.ts` (lesoes, reabilitacao,
     fisioterapia, biomecanica, anatomia, nutricao + revisões).
   - `alvo: "ps"` → `src/data/ps/adulto-1..4.ts` e `src/data/ps/pediatria.ts`.
4. **Comparar e decidir**, ponto a ponto:
   - **Erro claro no site** (dose, via, intervalo, dose máxima, critério,
     anatomia, classificação) → corrigir direto no arquivo-base. Em dose,
     conferir duas vezes na unidade. Se a referência estiver desatualizada em
     relação a diretrizes atuais, não trocar: criar nota `diverge` explicando.
   - **Referência diz diferente** → nota `diverge` com as duas posições.
   - **Pulado / não dito** e útil na prática → nota `acrescenta`; se for
     essencial ao tema, acrescentar também no corpo (seção, item, fase,
     prescrição). Tema inteiro ausente → tópico novo (`NOVOS_DIARIA`) ou
     condição nova (`NOVOS_PS`).
   - **Confirma** algo importante → nota `concorda` (usar com moderação).
   - As revisões rápidas anteriores (`revisao-srip.ts`, `revisao-read.ts`)
     já têm notas dessas fontes: **não repetir**. Corrigir ou aprofundar essas
     notas direto no arquivo delas quando for o caso.
5. **Regras de escrita**
   - Sempre com **palavras próprias**, em português, frases curtas e
     práticas. Nunca copiar frases, parágrafos ou tabelas dos livros.
   - Doses, números e critérios são fatos: podem entrar, sempre com a fonte.
   - Sem dados de pacientes. Sem número de página no texto do site.
   - Fonte de cada nota = campo `fonte` da unidade em `fila.json`
     (`SRIP`, `READ`, `PSZ`, `PRV`, `GPP`, `MPP`, `HGWA`, `MDR`).
   - Tópico novo da esporte: id com prefixo da área (`l-`, `r-`, `f-`, `b-`,
     `a-`, `n-`), `ver` apontando para tópicos existentes.
   - Condição nova do PS: id único, `area` `adulto`/`pediatria`, `sistema`
     igual a um já usado na lista.
6. **Checar** (dentro de `ossohub-app/`), tudo precisa passar:
   ```bash
   npx tsc --noEmit
   npx --yes tsx scripts/checar-conteudo.ts
   npx next build
   ```
   Se não der para consertar: desfazer as mudanças, não avançar a fila e avisar.
7. **Registrar na fila**: na unidade, `"status": "feito"`, `"data": "AAAA-MM-DD"`,
   `"resumo"` (1–3 frases: o que foi corrigido/acrescentado) e `"ids"` (lista
   dos tópicos/condições alterados). Se nada precisou mudar, marcar feito com
   resumo "Sem alterações necessárias".
8. **Publicar**: commit `revisão diária <ID>: <título curto>` e push para
   `main` (produção na Vercel) e para `feat/prescricao-pediatrica`. Nunca usar
   force-push. Esperar ~4 min e conferir que uma página alterada responde 200
   em `https://ossohub.com` (esporte: `/esporte/<area>?t=<id>`; PS:
   `/pronto-socorro/adulto?c=<id>` ou `/pronto-socorro/pediatria?c=<id>`).
9. **Avisar o dono** com um resumo curto em português: unidade revisada, o que
   mudou e os links das páginas.

## Acrescentar livros novos à fila

1. Extrair o texto do PDF em unidades de um capítulo (capítulos longos em
   partes de ~16 páginas), com o cabeçalho `LIVRO / UNIDADE / PÁGINAS DO PDF`.
   O conector do Drive só baixa PDFs de até 10 MB: livros maiores precisam ser
   divididos em partes menores antes.
2. Subir para a pasta do Drive: uma unidade por arquivo (`<ID>.txt`) ou um
   arquivo por livro (`<LIVRO>.txt`, com cada unidade entre `### UNIDADE <ID>` e
   `### FIM <ID>`, e o campo `arquivo` na fila).
3. Acrescentar as unidades em `fila.json` (`status: "pendente"`), intercalando
   os livros.
4. Se a fonte for nova, criar o código em `FONTES_ESP` (esporte) ou `FONTES` (PS).
