// Checagem de integridade do conteúdo clínico (Medicina Esportiva + Pronto-Socorro)
// e da fila da revisão diária. Rodar a partir de ossohub-app/:
//   npx --yes tsx scripts/checar-conteudo.ts
// Sai com código 1 se encontrar erro.

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { TODOS_TOPICOS, FONTES_ESP, type Nota } from "../src/data/esporte";
import { NOTAS } from "../src/data/esporte/revisao";
import { NOTAS_SRIP } from "../src/data/esporte/revisao-srip";
import { NOTAS_READ } from "../src/data/esporte/revisao-read";
import { NOTAS_DIARIA } from "../src/data/esporte/revisao-diaria";
import { ADULTO, PEDIATRIA, FONTES } from "../src/data/ps";
import { NOTAS_PS } from "../src/data/ps/revisao-diaria";
import { MEDIDAS, REGIOES_RX } from "../src/data/radiologia";
import { PROCEDIMENTOS, SECOES_CIR } from "../src/data/cirurgia";
import { INFILTRACOES, SECOES_INJ, FONTES_INJ, GUIA_INJ } from "../src/data/infiltracoes";

const erros: string[] = [];
const avisos: string[] = [];

// ---------- Medicina Esportiva ----------
const idsEsp = new Map<string, number>();
for (const t of TODOS_TOPICOS) idsEsp.set(t.id, (idsEsp.get(t.id) ?? 0) + 1);
idsEsp.forEach((n, id) => { if (n > 1) erros.push(`esporte: id duplicado "${id}" (${n}x)`); });

for (const t of TODOS_TOPICOS) {
  if (!t.titulo || !t.resumo) erros.push(`esporte: "${t.id}" sem título ou resumo`);
  if (!t.fontes.length) erros.push(`esporte: "${t.id}" sem fontes`);
  for (const v of t.ver ?? []) if (!idsEsp.has(v)) erros.push(`esporte: "${t.id}" → ver "${v}" não existe`);
  for (const f of t.fontes) if (!FONTES_ESP[f]) erros.push(`esporte: "${t.id}" fonte desconhecida "${f}"`);
  for (const n of t.notas ?? []) {
    if (!FONTES_ESP[n.fonte]) erros.push(`esporte: nota em "${t.id}" com fonte desconhecida "${n.fonte}"`);
    if (!n.texto || n.texto.length < 15) erros.push(`esporte: nota vazia/curta em "${t.id}"`);
  }
}

const revisoesEsp: [string, Record<string, Nota[]>][] = [
  ["revisao.ts", NOTAS], ["revisao-srip.ts", NOTAS_SRIP], ["revisao-read.ts", NOTAS_READ], ["revisao-diaria.ts", NOTAS_DIARIA],
];
for (const [arq, notas] of revisoesEsp) {
  for (const id of Object.keys(notas)) if (!idsEsp.has(id)) erros.push(`esporte/${arq}: notas para tópico inexistente "${id}"`);
}

// ---------- Pronto-Socorro ----------
const todasPS = [...ADULTO, ...PEDIATRIA];
const idsPS = new Map<string, number>();
for (const c of todasPS) idsPS.set(c.id, (idsPS.get(c.id) ?? 0) + 1);
idsPS.forEach((n, id) => { if (n > 1) erros.push(`ps: id duplicado "${id}" (${n}x)`); });

for (const c of todasPS) {
  if (!c.titulo || !c.resumo) erros.push(`ps: "${c.id}" sem título ou resumo`);
  if (!c.rx.length) erros.push(`ps: "${c.id}" sem prescrição`);
  for (const f of c.fontes) if (!FONTES[f]) erros.push(`ps: "${c.id}" fonte desconhecida "${f}"`);
  for (const b of c.rx) for (const it of b.itens) {
    if (!it.m || !it.p) erros.push(`ps: "${c.id}" item sem medicamento/posologia em "${b.t}"`);
    if (it.k) {
      const [a, z] = Array.isArray(it.k.d) ? it.k.d : [it.k.d, it.k.d];
      if (!(a > 0) || !(z >= a)) erros.push(`ps: "${c.id}" dose por peso inválida em "${it.m}"`);
      if (it.k.por === "dia" && !(it.k.n && it.k.n > 0)) erros.push(`ps: "${c.id}" dose/dia sem nº de tomadas em "${it.m}"`);
    }
  }
  for (const n of c.notas ?? []) {
    if (!FONTES[n.fonte]) erros.push(`ps: nota em "${c.id}" com fonte desconhecida "${n.fonte}"`);
    if (!n.texto || n.texto.length < 15) erros.push(`ps: nota vazia/curta em "${c.id}"`);
  }
}
for (const id of Object.keys(NOTAS_PS)) if (!idsPS.has(id)) erros.push(`ps/revisao-diaria.ts: notas para condição inexistente "${id}"`);

// ---------- Mensuração radiográfica ----------
const idsRx = new Map<string, number>();
for (const m of MEDIDAS) idsRx.set(m.id, (idsRx.get(m.id) ?? 0) + 1);
idsRx.forEach((n, id) => { if (n > 1) erros.push(`radiologia: id duplicado "${id}" (${n}x)`); });
const regioesRx = new Set(REGIOES_RX.map((r) => r.id));
for (const m of MEDIDAS) {
  if (!regioesRx.has(m.regiao)) erros.push(`radiologia: "${m.id}" com região inválida "${m.regiao}"`);
  if (!m.nome || !m.resumo) erros.push(`radiologia: "${m.id}" sem nome ou resumo`);
  if (!m.valores?.length && !m.como?.length && !m.tabela && !m.obs?.length) erros.push(`radiologia: "${m.id}" sem conteúdo`);
  for (const l of m.tabela?.linhas ?? []) {
    if (l.length !== m.tabela!.cab.length) erros.push(`radiologia: "${m.id}" linha de tabela com ${l.length} colunas (esperado ${m.tabela!.cab.length})`);
  }
}

// ---------- Procedimentos cirúrgicos ----------
const idsCir = new Map<string, number>();
for (const p of PROCEDIMENTOS) idsCir.set(p.id, (idsCir.get(p.id) ?? 0) + 1);
idsCir.forEach((n, id) => { if (n > 1) erros.push(`cirurgia: id duplicado "${id}" (${n}x)`); });
const secoesCir = new Set(SECOES_CIR.map((s) => s.id));
const capsCir = new Set(PROCEDIMENTOS.map((p) => p.cap));
for (let c = 1; c <= 51; c++) if (!capsCir.has(c)) erros.push(`cirurgia: falta o capítulo ${c}`);
for (const p of PROCEDIMENTOS) {
  if (!secoesCir.has(p.secao)) erros.push(`cirurgia: "${p.id}" com seção inválida "${p.secao}"`);
  if (!p.titulo || !p.resumo || !p.original || !p.autores) erros.push(`cirurgia: "${p.id}" sem título/resumo/original/autores`);
  if (!/^\d+–\d+$/.test(p.paginas)) erros.push(`cirurgia: "${p.id}" páginas fora do formato "N–M"`);
  if (!p.indicacoes.length || !p.etapas.length || !p.posop.length) erros.push(`cirurgia: "${p.id}" sem indicações, etapas ou pós-op`);
  for (const e of p.etapas) {
    if (!e.t || !e.passos.length) erros.push(`cirurgia: "${p.id}" etapa vazia`);
    for (const f of e.figs ?? []) {
      if (!/^\d+–\d+$/.test(f)) erros.push(`cirurgia: "${p.id}" figura fora do formato "N–M": ${f}`);
      else if (!capsCir.has(Number(f.split("–")[0]))) erros.push(`cirurgia: "${p.id}" figura ${f} de capítulo inexistente`); // pode citar figura de outro capítulo (ex.: cap. 2 usa as do cap. 1)
    }
  }
}

// ---------- Infiltrações ----------
const idsInj = new Map<string, number>();
for (const p of INFILTRACOES) idsInj.set(p.id, (idsInj.get(p.id) ?? 0) + 1);
idsInj.forEach((n, id) => { if (n > 1) erros.push(`infiltracao: id duplicado "${id}" (${n}x)`); });
const secoesInj = new Set(SECOES_INJ.map((s) => s.id));
for (const s of SECOES_INJ) if (!INFILTRACOES.some((p) => p.secao === s.id)) erros.push(`infiltracao: seção "${s.id}" vazia`);
for (const p of INFILTRACOES) {
  if (!secoesInj.has(p.secao)) erros.push(`infiltracao: "${p.id}" com seção inválida "${p.secao}"`);
  if (!GUIA_INJ[p.guia]) erros.push(`infiltracao: "${p.id}" com guia inválida "${p.guia}"`);
  if (!p.titulo || !p.resumo) erros.push(`infiltracao: "${p.id}" sem título/resumo`);
  if (!/^[a-z0-9-]+$/.test(p.id)) erros.push(`infiltracao: id "${p.id}" fora do formato`);
  if (!p.indicacoes.length || !p.etapas.length) erros.push(`infiltracao: "${p.id}" sem indicações ou etapas`);
  for (const e of p.etapas) if (!e.t || !e.passos.length) erros.push(`infiltracao: "${p.id}" etapa vazia`);
  if (!p.fontes.length) erros.push(`infiltracao: "${p.id}" sem fonte`);
  for (const f of p.fontes) if (!FONTES_INJ[f.split(" ")[0]]) erros.push(`infiltracao: "${p.id}" fonte desconhecida "${f}"`);
}

// ---------- Fila da revisão diária ----------
type ItemFila = { id: string; status: string; data?: string; resumo?: string; ids?: string[]; fonte: string; alvo: string };
try {
  const fila = JSON.parse(readFileSync("docs/revisao-diaria/fila.json", "utf8")) as { unidades: ItemFila[] };
  const vistos = new Set<string>();
  for (const u of fila.unidades) {
    if (vistos.has(u.id)) erros.push(`fila: unidade repetida "${u.id}"`);
    vistos.add(u.id);
    if (!["pendente", "feito"].includes(u.status)) erros.push(`fila: status inválido em "${u.id}"`);
    if (u.status === "feito" && (!u.data || !u.resumo)) erros.push(`fila: "${u.id}" feito sem data/resumo`);
    for (const id of u.ids ?? []) {
      const existe = u.alvo === "esporte" ? idsEsp.has(id) : idsPS.has(id);
      if (!existe) avisos.push(`fila: "${u.id}" cita id "${id}" que não existe mais`);
    }
    const fonteOk = u.alvo === "esporte" ? !!FONTES_ESP[u.fonte as keyof typeof FONTES_ESP] : !!FONTES[u.fonte as keyof typeof FONTES];
    if (!fonteOk) erros.push(`fila: "${u.id}" fonte "${u.fonte}" não existe para o alvo "${u.alvo}"`);
  }
  const pend = fila.unidades.filter((u) => u.status === "pendente").length;
  avisos.push(`fila: ${fila.unidades.length - pend} feitas, ${pend} pendentes`);
} catch (e) {
  erros.push(`fila: não consegui ler docs/revisao-diaria/fila.json (${(e as Error).message})`);
}

// ---------- Nada de texto de livro no repositório ----------
try {
  const arquivos = execSync("git ls-files --others --cached --exclude-standard", { encoding: "utf8" }).split("\n");
  for (const a of arquivos) {
    if (/(^|\/)(ESP|PS|PED)-\d{2}-\d{2}\.txt$/.test(a) || /\.pdf$/i.test(a)) erros.push(`repo: arquivo de livro não pode ir para o GitHub (público): ${a}`);
  }
} catch { avisos.push("repo: não consegui listar arquivos com git"); }

avisos.push(`esporte: ${TODOS_TOPICOS.length} tópicos · ps: ${ADULTO.length} adulto + ${PEDIATRIA.length} pediatria · radiologia: ${MEDIDAS.length} itens · cirurgia: ${PROCEDIMENTOS.length} procedimentos · infiltrações: ${INFILTRACOES.length}`);
for (const a of avisos) console.log("•", a);
if (erros.length) {
  console.error(`\n${erros.length} erro(s):`);
  for (const e of erros) console.error("✗", e);
  process.exit(1);
}
console.log("\n✓ Conteúdo íntegro.");
