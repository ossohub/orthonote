"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, LayoutGrid, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Tipos
───────────────────────────────────────────────────────────── */
interface Classificacao {
  id: string;
  nome: string;
  condicao: string;
  itens: { codigo: string; descricao: string }[];
  observacoes?: string;
  fonte?: string;
}

interface Categoria {
  id: string;
  label: string;
  classificacoes: Classificacao[];
}

/* ─────────────────────────────────────────────────────────────
   Dados
───────────────────────────────────────────────────────────── */
const CATEGORIAS: Categoria[] = [
  {
    id: "quadril",
    label: "Quadril",
    classificacoes: [
      {
        id: "delbet",
        nome: "Delbet",
        condicao: "Fraturas do colo do fêmur pediátrico",
        itens: [
          { codigo: "Tipo I", descricao: "Transcervical com luxação da epífise (transfisária) — pior prognóstico, maior risco de necrose avascular (>50%)" },
          { codigo: "Tipo II", descricao: "Transcervical / mediocervical — mais comum, NÃO em ~28%" },
          { codigo: "Tipo III", descricao: "Cervicobasicervical (basocervical) — NÃO em ~18%" },
          { codigo: "Tipo IV", descricao: "Intertrocantérica — melhor prognóstico, NÃO em ~5%" },
        ],
        observacoes: "O risco de necrose avascular (NÃO) e de não-união é inversamente proporcional ao número do tipo. Tipo I → risco máximo; Tipo IV → risco mínimo.",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed.",
      },
      {
        id: "modified-harris",
        nome: "Classificação de Salter (DDQ / DFCE)",
        condicao: "Deslizamento fisário da cabeça do fêmur (DFCE)",
        itens: [
          { codigo: "Agudo", descricao: "Sintomas < 3 semanas, sem remodelação periosteal" },
          { codigo: "Crônico", descricao: "Sintomas > 3 semanas, com remodelação (bico de flauta ao RX)" },
          { codigo: "Agudo sobre Crônico", descricao: "Fase crônica + episódio agudo desencadeante" },
        ],
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
      {
        id: "loder-dfce",
        nome: "Loder (DFCE — estabilidade)",
        condicao: "Deslizamento fisário da cabeça do fêmur",
        itens: [
          { codigo: "Estável", descricao: "Criança consegue deambular com ou sem auxílio — NÃO raro (<10%)" },
          { codigo: "Instável", descricao: "Incapaz de deambular mesmo com auxílio — NÃO em 47–58%" },
        ],
        observacoes: "Estabilidade de Loder é o principal preditor de necrose avascular. DFCE instável é emergência cirúrgica — fixação em <24h reduz risco de NAO.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
      {
        id: "southwick-dfce",
        nome: "Southwick (DFCE — grau de deslizamento)",
        condicao: "Deslizamento fisário da cabeça do fêmur — medida no RX em incidência de rã (frog-lateral)",
        itens: [
          { codigo: "Leve", descricao: "Ângulo epifisário-diafisário <30° (comparado ao lado oposto)" },
          { codigo: "Moderado", descricao: "Ângulo 30–60°" },
          { codigo: "Grave", descricao: "Ângulo >60° — maior risco de NAO pós-redução se tentada" },
        ],
        observacoes: "Deslizamento grave (>60°): redução in situ (fixação sem redução) é PREFERÍVEL à redução, pois a redução forçada aumenta o risco de NAO. Ângulo medido como diferença entre o ângulo epifisário do lado afetado e do lado normal.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed. · Rockwood — Fraturas em Crianças, 9ª ed.",
      },
    ],
  },
  {
    id: "joelho-tornozelo",
    label: "Joelho e Tornozelo",
    classificacoes: [
      {
        id: "ogden-salter",
        nome: "Salter-Harris",
        condicao: "Fraturas fisárias (todas as articulações)",
        itens: [
          { codigo: "Tipo I", descricao: "Fratura puramente fisária (transfisária) — RX normal ou leve alargamento, diagnóstico clínico" },
          { codigo: "Tipo II", descricao: "Fisária + metáfise (fragmento Thurston-Holland) — mais comum, bom prognóstico" },
          { codigo: "Tipo III", descricao: "Fisária + epífise (intra-articular) — requer redução anatômica" },
          { codigo: "Tipo IV", descricao: "Atravessa fise + epífise + metáfise — risco de ponte fisária, fixação interna geralmente necessária" },
          { codigo: "Tipo V", descricao: "Compressão axial da fise — diagnóstico retrospectivo (retardo de crescimento), RX inicial normal" },
        ],
        observacoes: "Regra mnemônica: SALTR — Slip (I), Above (II), Lower (III), Through (IV), Rammed (V). Tipos III/IV são articulares e requerem redução cirúrgica; tipos V requerem vigilância do crescimento.",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed.",
      },
      {
        id: "osteocondral-joelho",
        nome: "Meyers e McKeever (Espinha tibial)",
        condicao: "Avulsão da espinha tibial anterior",
        itens: [
          { codigo: "Tipo I", descricao: "Sem deslocamento ou mínimo deslocamento" },
          { codigo: "Tipo II", descricao: "Fragmento anteriormente elevado (dobradiça posterior intacta)" },
          { codigo: "Tipo III", descricao: "Fragmento completamente deslocado e girado" },
          { codigo: "Tipo IV (Zaricznyj)", descricao: "Fragmento cominuto" },
        ],
        observacoes: "Tipo I e II sem deslocamento: tratamento conservador em extensão. Tipo II deslocado / III / IV: fixação cirúrgica (artroscopia).",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed.",
      },
      {
        id: "tillaux-triplane",
        nome: "Fratura de Tillaux / Triplanar",
        condicao: "Fraturas fisárias distais da tíbia em adolescentes",
        itens: [
          { codigo: "Tillaux", descricao: "Salter-Harris III do segmento ântero-lateral da epífise — ocorre quando a fise central já fechou, mas o segmento lateral ainda é aberto" },
          { codigo: "Triplanar 2-partes", descricao: "Planos sagital (fise), coronal (metáfise) e axial (epífise) — 2 fragmentos" },
          { codigo: "Triplanar 3-partes", descricao: "Idêntico mas com 3 fragmentos (epífise + fragmento metafisário posterior + diáfise)" },
        ],
        observacoes: "Ambas ocorrem nos 18 meses finais do crescimento ósseo. Degrau articular >2 mm = indicação cirúrgica. TC fundamental para planejamento. Tillaux: parafuso ou fio transepifisário por artroscopia.",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed.",
      },
      {
        id: "dias-tachdjian",
        nome: "Dias-Tachdjian (Tornozelo — mecanismo)",
        condicao: "Fraturas fisárias do tornozelo pediátrico",
        itens: [
          { codigo: "Supinação-Inversão", descricao: "Fase 1: fratura fisária da fíbula distal (Salter-Harris I ou II); Fase 2: adição de fratura talar ou fisária tibial medial" },
          { codigo: "Supinação-Eversão", descricao: "Salter-Harris II da tíbia distal com fragmento posterior (equivale à Pott em adultos)" },
          { codigo: "Pronação-Eversão", descricao: "Salter-Harris II tibial com fragmento lateral (metáfise anterior/lateral) + possível fíbula" },
          { codigo: "Pronação-Dorsiflexão", descricao: "Fratura rara, Salter-Harris III ou IV anterior da tíbia" },
        ],
        observacoes: "A classificação de Dias-Tachdjian é análoga ao Lauge-Hansen do adulto, adaptada à fise aberta. Salter-Harris I e II: maioria conservadora (gesso). Salter-Harris III e IV com deslocamento >2 mm: redução aberta ou fechada + fixação.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed. · Rockwood — Fraturas em Crianças, 9ª ed.",
      },
    ],
  },
  {
    id: "coluna-pediatrica",
    label: "Coluna",
    classificacoes: [
      {
        id: "odontoid-anderson",
        nome: "Anderson & D'Alonzo (Fratura odontóide adulto — referência)",
        condicao: "Fraturas do processo odontóide",
        itens: [
          { codigo: "Tipo I", descricao: "Avulsão da ponta — raro, estável" },
          { codigo: "Tipo II", descricao: "Base do processo odontóide — mais comum, instável, risco de não-união" },
          { codigo: "Tipo III", descricao: "Corpo do áxis — boa consolidação" },
        ],
        observacoes: "Em crianças < 8 anos: separação fisária C2 (sincondrosis) é mais comum que fratura verdadeira do odontóide — aspecto similar, terapêutica idêntica (colar/halo).",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
      {
        id: "aoa",
        nome: "AOSpine Pediátrica (Coluna toraco-lombar)",
        condicao: "Fraturas toraco-lombares em crianças e adolescentes",
        itens: [
          { codigo: "Tipo A", descricao: "Fratura em cunha / compressão do corpo vertebral (sem envolvimento do muro posterior)" },
          { codigo: "Tipo B", descricao: "Lesão de banda de tensão (ligamentar posterior ou ossóssea — inclui Chance)" },
          { codigo: "Tipo C", descricao: "Translação / rotação — instável, geralmente requer cirurgia" },
          { codigo: "N0–N4", descricao: "Modificadores neurológicos: N0 = intacto; N4 = lesão completa (ASIA A)" },
        ],
        observacoes: "Fratura de Chance pediátrica: mecanismo de cinto de segurança (lap belt), Tipo B, pode ser puramente ligamentar. Alta associação com lesões abdominais (20–30%). Fusão posterior curta em 2 níveis é o tratamento padrão.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
      {
        id: "lenke-escoliose",
        nome: "Lenke (Escoliose Idiopática do Adolescente)",
        condicao: "Classificação para planejamento cirúrgico da escoliose idiopática",
        itens: [
          { codigo: "Tipo 1", descricao: "Torácica principal (TM) — curva estrutural torácica, lombar não-estrutural" },
          { codigo: "Tipo 2", descricao: "Dupla torácica — TM + torácica proximal estruturais" },
          { codigo: "Tipo 3", descricao: "Dupla maior — TM + toracolombar/lombar estruturais" },
          { codigo: "Tipo 4", descricao: "Tripla maior — 3 curvas estruturais" },
          { codigo: "Tipo 5", descricao: "Toracolombar / Lombar principal — torácica não-estrutural" },
          { codigo: "Tipo 6", descricao: "Toracolombar/Lombar principal > Torácica — ambas estruturais" },
          { codigo: "Modificador lombar A/B/C", descricao: "A: vértebra ápice da lombar toca ou cruza linha CSVL; B: toca; C: não toca (curva estrutural lombar)" },
          { codigo: "Modificador sagital -/N/+", descricao: "Cifose T5-T12: hipocifose (<10°) / normal (10–40°) / hipercifose (>40°)" },
        ],
        observacoes: "A classificação de Lenke define quais curvas incluir na fusão. Curvas estruturais = incluir; não-estruturais = excluir. Tipo 1AN é o mais comum. Curvas tipo 5 (toracolombar/lombar) podem ser abordadas anteriormente (fusão curta).",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed. · Campbell's Operative Orthopaedics, 14ª ed.",
      },
    ],
  },
  {
    id: "membro-superior-ped",
    label: "Membro Superior",
    classificacoes: [
      {
        id: "gartland",
        nome: "Gartland",
        condicao: "Fratura supracondilar do úmero",
        itens: [
          { codigo: "Tipo I", descricao: "Sem deslocamento — visível apenas em incidência lateral (linha anterior umeral não passa pelo 1/3 médio do capítulo)" },
          { codigo: "Tipo II", descricao: "Angulada posterioramente, cortical posterior intacta (dobradiça)" },
          { codigo: "Tipo III", descricao: "Completamente deslocada, sem contato cortical" },
          { codigo: "Tipo IV (Leitch)", descricao: "Instável em todos os planos — comportamento intraoperatório" },
        ],
        observacoes: "Tipo I: imobilização. Tipo II: redução fechada + avaliação; cirurgia se instável ou angulação persistente. Tipo III/IV: redução fechada + fios K em cruzeta ou lateral — emergência por risco neurovascular (nervo interósseo anterior, artéria braquial).",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed. · Tachdjian's 5ª ed.",
      },
      {
        id: "jakob",
        nome: "Jakob / Milch",
        condicao: "Fratura do côndilo lateral do úmero",
        itens: [
          { codigo: "Tipo I (Jakob/Milch I)", descricao: "Linha de fratura passa lateral ao sulco trocleoide — articulação úmero-ulnar estável" },
          { codigo: "Tipo II (Jakob/Milch II)", descricao: "Linha de fratura atravessa tróclea — instável, risco de valgus tardio (cubitus valgus)" },
        ],
        observacoes: "Deslocamento >2 mm = cirurgia (fios K ou parafuso). A fratura pode parecer mínima no RX inicial mas ser instável. Artrografia ou RMN ajudam a definir o deslocamento real em pequenos.",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed.",
      },
      {
        id: "spain-spain-ped",
        nome: "Neer / Craig (Clavícula pediátrica)",
        condicao: "Fratura da clavícula em crianças",
        itens: [
          { codigo: "Tipo I", descricao: "Terço médio — mais comum, excelente remodelamento" },
          { codigo: "Tipo II", descricao: "Terço lateral — em crianças representa acompanhamento periosteal sem ruptura verdadeira do ligamento CC" },
          { codigo: "Tipo III", descricao: "Terço medial — fisária (sincondrosis esternal) — raramente identificada até a adolescência" },
        ],
        observacoes: "Em crianças, fraturas do terço medial e lateral envolvem a fise — o periósteo geralmente permanece intacto. Tratamento quase sempre conservador; capacidade de remodelamento é excelente até ~12 anos.",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed.",
      },
      {
        id: "bado-monteggia",
        nome: "Bado (Monteggia pediátrica)",
        condicao: "Fratura-luxação de Monteggia — fratura da ulna + luxação da cabeça do rádio",
        itens: [
          { codigo: "Tipo I", descricao: "Angulação anterior da ulna + luxação anterior da cabeça do rádio — mais comum (75%) em crianças" },
          { codigo: "Tipo II", descricao: "Angulação posterior da ulna + luxação posterior da cabeça do rádio — mais comum em adultos" },
          { codigo: "Tipo III", descricao: "Fratura da ulna proximal + luxação lateral da cabeça do rádio — típico de crianças pequenas" },
          { codigo: "Tipo IV", descricao: "Fratura de ambos os ossos do antebraço + luxação anterior — raro" },
        ],
        observacoes: "A luxação da cabeça do rádio pode ser perdida no RX se a linha radiocapitelar não for verificada. REGRA: em toda fratura de ulna, sempre traçar a linha que passa pelo eixo do colo do rádio — deve passar pelo capítulo em TODAS as incidências. Em crianças, Tipo I: redução fechada sob anestesia geralmente suficiente se tratada precocemente. Lesão do nervo interósseo posterior (NIP) é a complicação neurológica mais frequente.",
        fonte: "Rockwood — Fraturas em Crianças, 9ª ed. · Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
    ],
  },
  {
    id: "necrose-osteocondrose",
    label: "Doenças do Desenvolvimento",
    classificacoes: [
      {
        id: "waldenström-perthes",
        nome: "Herring (Pilar Lateral — Perthes)",
        condicao: "Doença de Legg-Calvé-Perthes",
        itens: [
          { codigo: "Grupo A", descricao: "Pilar lateral preservado (sem colapso do pilar lateral na fase fragmentation)" },
          { codigo: "Grupo B", descricao: "Pilar lateral com >50% da altura original" },
          { codigo: "Grupo B/C (Border)", descricao: "Pilar lateral com exatamente 50% ou fino pico ossificado" },
          { codigo: "Grupo C", descricao: "Pilar lateral com <50% da altura original — pior prognóstico" },
        ],
        observacoes: "Classificação de Herring é feita na fase de fragmentação ativa. Grupo C com criança >8 anos: cirurgia (osteotomia de contenção). Grupos A e B em criança jovem (<8): conservador.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
      {
        id: "catterall-perthes",
        nome: "Catterall (Perthes — % de cabeça envolvida)",
        condicao: "Doença de Legg-Calvé-Perthes",
        itens: [
          { codigo: "Grupo I", descricao: "Envolvimento <25% da cabeça — excelente prognóstico, sem sinal de 'cabeça em risco'" },
          { codigo: "Grupo II", descricao: "Envolvimento 25–50% — fise preservada lateral, sequestro definido" },
          { codigo: "Grupo III", descricao: "Envolvimento ~75% — sequestro grande, prognóstico reservado" },
          { codigo: "Grupo IV", descricao: "Envolvimento total — pior prognóstico" },
        ],
        observacoes: "Sinais de 'cabeça em risco' de Catterall (indicam mau prognóstico): calcificação lateral à epífise, lateralização da epífise, reação periosteal lateral da metáfise (v sign), fise horizontal. Presença de 2+ sinais = alto risco.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
      {
        id: "stulberg-perthes",
        nome: "Stulberg (Perthes — resultado a longo prazo)",
        condicao: "Doença de Legg-Calvé-Perthes — avaliação no esqueleto maduro",
        itens: [
          { codigo: "Classe I", descricao: "Cabeça esférica, acetábulo e colo normais — excelente, sem artrose" },
          { codigo: "Classe II", descricao: "Cabeça esférica mas com alterações (alargamento, coxa magna) — boa contenção, artrose tardia leve" },
          { codigo: "Classe III", descricao: "Cabeça ovóide (não esférica) + acetábulo e colo anômalos — incongruência esferóide" },
          { codigo: "Classe IV", descricao: "Cabeça plana com acetábulo plano congruente — incongruente mas remodelado" },
          { codigo: "Classe V", descricao: "Cabeça plana, acetábulo não adaptado — coxa plana, artrose precoce certa" },
        ],
        observacoes: "Stulberg I–II: articulação congruente esférica → prognóstico de longo prazo excelente. Stulberg III–IV: congruência aspherical → artrose moderada após 5ª década. Stulberg V: indicação de artroplastia total no adulto jovem. Herring A prediz Stulberg I–II; Herring C prediz Stulberg IV–V.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed. · Campbell's Operative Orthopaedics, 14ª ed.",
      },
      {
        id: "risser-maturidade",
        nome: "Risser",
        condicao: "Maturidade esquelética (escoliose, crescimento)",
        itens: [
          { codigo: "0", descricao: "Sem ossificação da apófise ilíaca" },
          { codigo: "1", descricao: "Ossificação dos 25% laterais" },
          { codigo: "2", descricao: "Ossificação de 26–50%" },
          { codigo: "3", descricao: "Ossificação de 51–75%" },
          { codigo: "4", descricao: "Ossificação completa sem fusão" },
          { codigo: "5", descricao: "Fusão completa — crescimento encerrado" },
        ],
        observacoes: "Na escoliose idiopática: progressão é maior em Risser 0–1. Bracing indicado em curvas 25–45° + Risser ≤2. Risser 4–5 = fusão completa, indicação cirúrgica muda para curva > progressão ou deformidade estética.",
        fonte: "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Componentes
───────────────────────────────────────────────────────────── */
function CardClassificacao({
  classificacao,
  aberto,
  onToggle,
}: {
  classificacao: Classificacao;
  aberto: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{ background: "#0A1628", border: "1px solid rgba(99,102,241,0.15)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-indigo-900/10 transition-colors"
      >
        <div>
          <p className="text-sm font-semibold text-white">{classificacao.nome}</p>
          <p className="text-[11px] text-indigo-400/60 mt-0.5">{classificacao.condicao}</p>
        </div>
        {aberto ? (
          <ChevronDown className="h-4 w-4 text-indigo-400 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-500 shrink-0" />
        )}
      </button>

      {aberto && (
        <div className="px-4 pb-4 pt-1" style={{ borderTop: "1px solid rgba(99,102,241,0.1)" }}>
          <div className="space-y-2 mb-4">
            {classificacao.itens.map((item, i) => (
              <div
                key={i}
                className="rounded-lg px-3 py-2"
                style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.12)" }}
              >
                <span className="text-xs font-bold text-indigo-300">{item.codigo}</span>
                <span className="text-xs text-slate-300 ml-2">{item.descricao}</span>
              </div>
            ))}
          </div>

          {classificacao.observacoes && (
            <div
              className="rounded-lg px-3 py-2.5 mb-3"
              style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-400/70 mb-1">Nota clínica</p>
              <p className="text-xs text-amber-200/70 leading-relaxed">{classificacao.observacoes}</p>
            </div>
          )}

          {classificacao.fonte && (
            <p className="text-[11px] text-slate-600">· {classificacao.fonte}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Página
───────────────────────────────────────────────────────────── */
export default function ClassificacoesPediatricasPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>(CATEGORIAS[0].id);
  const [aberto, setAberto] = useState<string | null>(null);

  const categoria = CATEGORIAS.find((c) => c.id === categoriaAtiva)!;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <LayoutGrid className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Classificações Pediátricas</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Sistemas de classificação em ortopedia pediátrica — Rockwood, Tachdjian's e Campbell's
          </p>
        </div>
      </div>

      {/* Aviso */}
      <div
        className="flex gap-2.5 rounded-xl px-3.5 py-2.5 mb-6"
        style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
      >
        <AlertCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-200/70 leading-relaxed">
          Resumo para estudo. Confirme classificações específicas nas referências originais antes de aplicar clinicamente.
        </p>
      </div>

      {/* Tabs de categoria */}
      <div className="flex flex-wrap gap-1 mb-5 rounded-xl p-1" style={{ background: "#060F1E" }}>
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            onClick={() => { setCategoriaAtiva(c.id); setAberto(null); }}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap",
              categoriaAtiva === c.id
                ? "bg-indigo-900/40 text-indigo-300"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
            )}
            style={
              categoriaAtiva === c.id
                ? { border: "1px solid rgba(99,102,241,0.3)" }
                : { border: "1px solid transparent" }
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Classificações */}
      <div className="space-y-2">
        {categoria.classificacoes.map((cl) => (
          <CardClassificacao
            key={cl.id}
            classificacao={cl}
            aberto={aberto === cl.id}
            onToggle={() => setAberto(aberto === cl.id ? null : cl.id)}
          />
        ))}
      </div>
    </div>
  );
}
