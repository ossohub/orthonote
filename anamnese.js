/**
 * anamnese.js — Módulo de Anamnese Ortopédica
 * Exporta dados clínicos (chips, classificações) e funções utilitárias.
 * Compatível com Node.js (require/import) e navegador (ES Module).
 *
 * Fontes: CLASSIFICAÇÕES de TUDO 2, Manual de Trauma Ortopédico (SBOT 2011),
 *         Manual Ilustrado do Exame Ortopédico (UNIVILLE 2021), DOT-UNIFESP
 */

'use strict';

const CS = {
  qp: ['Dor localizada em ___', 'Dor difusa no membro ___', 'Trauma (queda / colisão / torção)', 'Dor após esforço / atividade', 'Dor em repouso e à noite', 'Inchaço / edema articular', 'Limitação de movimento', 'Deformidade progressiva', 'Instabilidade / "falseio"', 'Crepitação ao movimento', 'Dormência / formigamento', 'Fraqueza muscular em ___', 'Dificuldade de deambular', 'Bloqueio articular', 'Perda de força na preensão'],
  hma: ['Início súbito (trauma)', 'Início insidioso / gradual', 'EVA: ___/10 em repouso', 'EVA: ___/10 em movimento', 'Localização: ___', 'Irradiação para ___', 'Piora com carga / deambulação', 'Piora com rotação / torção', 'Melhora com repouso', 'Melhora com analgésico / gelo', 'Mecanismo: torção em valgo', 'Mecanismo: queda sobre o membro', 'Mecanismo: impacto direto', 'Imobilizado com tala/gesso (data: ___)', 'Tratamento fisioterápico em curso', 'Infiltração prévia (data: ___)'],
  hpp: ['Fratura prévia em ___', 'Cirurgia ortopédica: ___ (data: ___)', 'Prótese de quadril / joelho (data: ___)', 'Implante: placa / parafuso / haste', 'Osteoporose (densitometria: T-___)', 'Artrite reumatoide', 'Artrose grau ___', 'Diabetes mellitus', 'HAS em tratamento', 'Uso de corticoide crônico', 'Anticoagulante (nome: ___)', 'Alergia a metal / látex', 'Nega alergias', 'Tabagismo ativo (risco de consolidação)'],
  hfam: ['Osteoporose familiar', 'Artrite reumatoide (pai/mãe)', 'Espondiloartrite / espondilite', 'Distrofia muscular hereditária', 'Escoliose idiopática familiar', 'Nega doenças hereditárias osteoarticulares'],
  hsoc: ['Trabalhador braçal / esforço repetitivo', 'Atleta amador / profissional (modalidade: ___)', 'Sedentário', 'Tabagista: ___ maços/dia há ___ anos', 'Nega tabagismo', 'Etilismo: ___', 'Mora em andar sem elevador', 'Usa escadas regularmente', 'Necessita de auxílio para deambulação', 'Usa bengala / andador / cadeira'],
  interr: ['Dor em repouso', 'Dor ao deambular (claudicação ___m)', 'Dor noturna que acorda', 'Rigidez matinal: ___ minutos', 'Edema localizado em ___', 'Equimose / hematoma em ___', 'Deformidade em varo / valgo', 'Atrofia muscular em ___', 'Parestesia: ___', 'Déficit motor: MRC ___/5 em ___', 'Bloqueio articular (fragmento?)', 'Nega febre (red flag negativo)', 'Nega perda de peso (red flag negativo)', 'Hipersensibilidade dolorosa difusa'],
  obs: ['Rx disponível (data: ___)', 'TC disponível (data: ___)', 'RM disponível (data: ___)', 'ADM ativa: Flexão ___° / Ext ___°', 'ADM passiva preservada', 'Força MRC 5/5 proximal / distal', 'Força MRC ___/5 em ___', 'Lachman: positivo / negativo', 'Gaveta anterior/posterior: ___', 'McMurray: positivo em ___', 'Varo / valgo stress: ___', 'Neer e Hawkins: positivo', 'Jobe (arco doloroso): positivo', 'KL grau ___ (Kellgren-Lawrence)', 'Espaço articular: preservado / reduzido', 'Alinhamento: varo / valgo / neutro', 'Kellgren-Lawrence aplicar →', 'Gustilo tipo ___ (se fratura exposta)', 'Garden ___ (se fratura colo fêmur)', 'AO/OTA: ___']
};

/* ── FUNÇÕES ANAMNESE ── */
function popularChips(painelId, textos, targetId){
  const p = document.getElementById(painelId);
  if(!p) return;
  p.innerHTML = '';
  (textos||[]).forEach(txt => {
    const btn = document.createElement('button');
    btn.className = 'chip'; btn.textContent = txt; btn.type = 'button';
    btn.onclick = () => adicionarChip(targetId, txt);
    p.appendChild(btn);
  });
}
function adicionarChip(targetId, texto){
  const ta = document.getElementById(targetId);
  if(!ta) return;
  const v = ta.value;
  ta.value = (v && !v.endsWith('\n') && v.trim()!=='') ? v+'\n'+texto : v+texto;
  ta.classList.add('flash');
  setTimeout(()=>ta.classList.remove('flash'),600);
  ta.scrollTop = ta.scrollHeight; ta.focus();
}
function showTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  document.getElementById('tb-'+tab).classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
}
function toggleCard(hdr){ hdr.parentElement.classList.toggle('open'); }

/* ── FUNÇÕES CLASSIFICAÇÕES ── */
let currentRegion = 'geral';
let searchActive = false;

function selectRegion(region){
  currentRegion = region;
  searchActive = false;
  document.getElementById('cl-filter').value = '';
  document.querySelectorAll('.region-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.region === region);
  });
  document.querySelectorAll('.region-section').forEach(s => {
    s.style.display = s.id === 'region-'+region ? 'block' : 'none';
  });
  // Show all cards in selected region
  document.querySelectorAll('#region-'+region+' .cl-card').forEach(c => c.style.display='');
}

function filtrarClassif(){
  const q = document.getElementById('cl-filter').value.toLowerCase().trim();
  if(!q){
    selectRegion(currentRegion);
    return;
  }
  searchActive = true;
  // Show all regions
  document.querySelectorAll('.region-section').forEach(s => s.style.display = 'block');
  document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
  // Filter cards
  let total = 0;
  document.querySelectorAll('.cl-card').forEach(c => {
    const match = c.textContent.toLowerCase().includes(q);
    c.style.display = match ? '' : 'none';
    if(match) total++;
  });
  // Hide empty regions
  document.querySelectorAll('.region-section').forEach(s => {
    const visible = [...s.querySelectorAll('.cl-card')].some(c=>c.style.display!=='none');
    s.style.display = visible ? 'block' : 'none';
  });
}

/* ── IMAGENS ── */
function triggerUpload(id){
  document.getElementById('file-'+id).click();
}
function loadImg(id, input){
  const file = input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('imgel-'+id).src = e.target.result;
    document.getElementById('preview-'+id).style.display = 'block';
    document.getElementById('img-'+id).querySelector('.img-placeholder').style.display = 'none';
    // Persist in localStorage
    try { localStorage.setItem('img-'+id, e.target.result); } catch(err){}
  };
  reader.readAsDataURL(file);
}
function removeImg(id){
  document.getElementById('imgel-'+id).src = '';
  document.getElementById('preview-'+id).style.display = 'none';
  document.getElementById('img-'+id).querySelector('.img-placeholder').style.display = 'flex';
  document.getElementById('file-'+id).value = '';
  try { localStorage.removeItem('img-'+id); } catch(err){}
}
function restoreImages(){
  try {
    for(let i=0; i<localStorage.length; i++){
      const key = localStorage.key(i);
      if(key && key.startsWith('img-')){
        const id = key.substring(4);
        const src = localStorage.getItem(key);
        const imgEl = document.getElementById('imgel-'+id);
        const preview = document.getElementById('preview-'+id);
        const placeholder = document.getElementById('img-'+id)?.querySelector('.img-placeholder');
        if(imgEl && src){ imgEl.src=src; preview.style.display='block'; if(placeholder) placeholder.style.display='none'; }
      }
    }
  } catch(err){}
}

/* ── EXPORTAR / LIMPAR ── */
function limpar(){
  if(!confirm('Limpar todos os campos?')) return;
  ['nome','idade','prof','proc','qp','hma','hpp','hfam','hsoc','interr','obs'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value='';
  });
  const sexo=document.getElementById('sexo'); if(sexo) sexo.value='';
  mostrarToast('Campos limpos.');
}
function exportar(){
  const now=new Date(), data=now.toLocaleDateString('pt-BR'), hora=now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  const pac=[document.getElementById('nome').value, document.getElementById('idade').value?(document.getElementById('idade').value+' anos'):'', document.getElementById('sexo').value, document.getElementById('prof').value, document.getElementById('proc').value].filter(Boolean).join(' | ');
  const campos=[['IDENTIFICAÇÃO DO PACIENTE',pac],['QUEIXA PRINCIPAL',document.getElementById('qp').value],['HISTÓRIA DA MOLÉSTIA ATUAL (HMA)',document.getElementById('hma').value],['HISTÓRIA PATOLÓGICA PREGRESSA (HPP)',document.getElementById('hpp').value],['HISTÓRIA FAMILIAR',document.getElementById('hfam').value],['HISTÓRIA SOCIAL E HÁBITOS',document.getElementById('hsoc').value],['INTERROGATÓRIO SINTOMATOLÓGICO',document.getElementById('interr').value],['ACHADOS ORTOPÉDICOS ESPECÍFICOS',document.getElementById('obs').value]];
  let txt = `ANAMNESE ORTOPÉDICA — Ortopedia e Traumatologia\nData: ${data}  |  Hora: ${hora}\n\n`;
  campos.forEach(([t,v]) => {
    const valor = (v || '(não preenchido)').trim();
    txt += `${t}:\n${valor}\n\n`;
  });
  txt = txt.trimEnd() + '\n';
  const blob=new Blob([txt],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=`Anamnese_Ortopedia_${data.replace(/\//g,'-')}.txt`; a.click();
  URL.revokeObjectURL(url); mostrarToast('Anamnese salva com sucesso!');
}
function mostrarToast(msg,ms=2800){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),ms);
}

function init(){
  popularChips('cp-qp',CS.qp,'qp');
  popularChips('cp-hma',CS.hma,'hma');
  popularChips('cp-hpp',CS.hpp,'hpp');
  popularChips('cp-hfam',CS.hfam,'hfam');
  popularChips('cp-hsoc',CS.hsoc,'hsoc');
  popularChips('cp-interr',CS.interr,'interr');
  popularChips('cp-obs',CS.obs,'obs');
  document.getElementById('tb-anam').addEventListener('click',()=>showTab('anam'));
  document.getElementById('tb-class').addEventListener('click',()=>showTab('class'));
  selectRegion('geral');
  restoreImages();
  showTab('anam');
}

/* ──────────────────────────────────────────────
   EXPORTS — Node.js / ES Module
   ──────────────────────────────────────────── */

// Dados puros (sem DOM) — exportáveis para qualquer ambiente
const DADOS = {
  chips: CS,
  classificacoes: CL_ORTO,
  regioes: [
    'geral','ombro','cotovelo','punho','mao',
    'coluna','quadril','femur','joelho','tornozelo'
  ]
};

// Gerador de texto de anamnese (sem DOM)
function gerarTextoAnamnese(campos) {
  const agora = new Date();
  const data  = agora.toLocaleDateString('pt-BR');
  const hora  = agora.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
  let txt = `ANAMNESE ORTOPÉDICA — Ortopedia e Traumatologia\nData: ${data}  |  Hora: ${hora}\n\n`;
  campos.forEach(([titulo, valor]) => {
    const v = (valor || '(não preenchido)').trim();
    txt += `${titulo}:\n${v}\n\n`;
  });
  return txt.trimEnd() + '\n';
}

// Retorna classificações de uma região específica
function getClassificacoesPorRegiao(regiao) {
  return CL_ORTO.filter(cl => cl.regiao === regiao);
}

// Retorna classificação pelo ID
function getClassificacaoPorId(id) {
  return CL_ORTO.find(cl => cl.id === id) || null;
}

// Busca classificações por texto
function buscarClassificacoes(query) {
  const q = query.toLowerCase();
  return CL_ORTO.filter(cl =>
    cl.nome.toLowerCase().includes(q) ||
    cl.sigla.toLowerCase().includes(q) ||
    cl.itens.some(([lbl, desc]) =>
      lbl.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
    )
  );
}

/* Node.js CommonJS */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DADOS,
    CS,
    CL_ORTO,
    gerarTextoAnamnese,
    getClassificacoesPorRegiao,
    getClassificacaoPorId,
    buscarClassificacoes,
  };
}

/* ES Module (browser / Deno / bundler) */
// export { DADOS, CS, CL_ORTO, gerarTextoAnamnese, getClassificacoesPorRegiao, getClassificacaoPorId, buscarClassificacoes };

/* Inicialização no navegador */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
