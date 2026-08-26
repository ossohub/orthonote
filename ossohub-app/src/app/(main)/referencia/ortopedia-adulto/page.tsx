"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Tipos
───────────────────────────────────────────────────────────── */
interface Topico {
  id: string;
  titulo: string;
  subtitulo?: string;
  epidemiologia?: string;
  classificacao?: { sistema: string; itens: string[] }[];
  mecanismo?: string;
  tx_cirurgico?: string[];
  tx_nao_cirurgico?: string[];
  cirurgias?: string[];
  complicacoes?: string[];
  fontes?: string[];
}

interface Regiao {
  id: string;
  label: string;
  topicos: Topico[];
}

/* ─────────────────────────────────────────────────────────────
   Dados
───────────────────────────────────────────────────────────── */
const REGIOES: Regiao[] = [
  {
    id: "membro-superior",
    label: "Membro Superior",
    topicos: [
      {
        id: "fratura-clavicular",
        titulo: "Fratura da Clavícula",
        subtitulo: "Rockwood cap. 28 · Campbell cap. 56",
        epidemiologia:
          "Representa ~5–10% de todas as fraturas. Pico bifásico: jovens esportistas e idosos. Terço médio corresponde a ~80% dos casos; terço lateral ~15%; terço medial ~5%.",
        classificacao: [
          {
            sistema: "Craig (AO/OTA)",
            itens: [
              "Tipo I – Terço médio",
              "Tipo II – Terço lateral (IIA: ligamentos CC intactos; IIB: ligamentos CC rompidos)",
              "Tipo III – Terço medial",
            ],
          },
          {
            sistema: "Robinson",
            itens: [
              "1A: Medial sem deslocamento",
              "1B: Medial com deslocamento",
              "2A: Diafisária sem deslocamento (<100%)",
              "2B: Diafisária com deslocamento completo",
              "3A: Lateral sem deslocamento",
              "3B: Lateral com deslocamento",
            ],
          },
        ],
        mecanismo:
          "Queda sobre o ombro (85%) ou sobre mão estendida. Compressão axial da clavícula transmite energia pela cadeia cinética do membro superior.",
        tx_nao_cirurgico: [
          "Tipoia ou fixador externo por 4–6 semanas",
          "Indicado para fraturas não deslocadas ou deslocamento <2 cm",
          "Terço médio sem encurtamento significativo (<2 cm) — maioria consolida bem conservadoramente",
        ],
        tx_cirurgico: [
          "Encurtamento >2 cm",
          "Fratura aberta ou iminente perfuração da pele",
          "Cominutividade marcada com ângulo em baioneta",
          "Tipo IIB lateral (ligamentos CC rompidos)",
          "Paciente politraumatizado necessitando apoio precoce",
          "Atleta de alto rendimento",
        ],
        cirurgias: [
          "Placa anatômica superior ou anteroinferior (DCP 3,5 mm)",
          "Hastes intramedulares elásticas (TLNS, Rockwood pin) — menor cicatriz, risco de migração",
          "Reconstrução cirúrgica dos ligamentos CC (Tipo IIB)",
        ],
        complicacoes: [
          "Não união: ~1–5% conservador; <2% cirúrgico",
          "Pneumotórax (lesão neurovascular subclávio)",
          "Migração de implante (hastes)",
          "Irritação cutânea por placa superior",
          "Lesão do plexo braquial (raras fraturas mediais deslocadas)",
        ],
        fontes: ["Rockwood — Fraturas em Adultos, 8ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
      {
        id: "umero-proximal",
        titulo: "Fratura do Úmero Proximal",
        subtitulo: "Rockwood cap. 30 · Campbell cap. 57",
        epidemiologia:
          "~5% de todas as fraturas; 3ª fratura osteoporótica mais comum. Pico >65 anos, predomínio feminino (2:1). Incidência cresce com envelhecimento populacional.",
        classificacao: [
          {
            sistema: "Neer (partes)",
            itens: [
              "1 parte: qualquer padrão, deslocamento <1 cm / angulação <45°",
              "2 partes: 1 segmento deslocado (cabeça, grande tuberosidade, pequena tuberosidade, diáfise)",
              "3 partes: 2 segmentos deslocados",
              "4 partes: 3 segmentos deslocados (alto risco de necrose avascular)",
            ],
          },
          {
            sistema: "AO/OTA (11-)",
            itens: ["A: extra-articular unifocal", "B: extra-articular bifocal", "C: articular (luxo-fratura, impactação)"],
          },
        ],
        mecanismo:
          "Queda sobre mão estendida em idosos (baixa energia). Trauma direto de alta energia em jovens. Contração muscular violenta (rara — convulsões, eletrocussão).",
        tx_nao_cirurgico: [
          "1-parte Neer: tipoia + mobilização precoce (pendulares a partir de 2–3 sem)",
          "Idosos com baixa demanda funcional e 2 partes não deslocadas",
          "Grande tuberosidade isolada <5 mm de deslocamento",
        ],
        tx_cirurgico: [
          "Grande tuberosidade >5 mm de deslocamento (paciente ativo)",
          "Fraturas 3-4 partes em jovens com boa qualidade óssea",
          "Luxo-fraturas",
          "Fraturas com desvio cefálico em valgo >45°",
        ],
        cirurgias: [
          "Placa LCP proximal de úmero (PHILOS) — padrão-ouro para 3-4 partes",
          "Haste intramedular bloqueada (menor exposição, util em osteoporose)",
          "Fixação percutânea (2-3 partes, boa qualidade óssea)",
          "Artroplastia parcial (hemiprótese) — 4 partes em idoso c/ má qualidade óssea",
          "Artroplastia reversa do ombro — melhor para 4 partes + manguito déficit / cabeça articular fraturada em >70 anos",
        ],
        complicacoes: [
          "Necrose avascular da cabeça umeral (risco ↑ em 4 partes ~13–34%)",
          "Rigidez pós-operatória (reabilitação precoce essencial)",
          "Varo da cabeça / falha do implante (perda de fixação na osteoporose)",
          "Lesão do nervo axilar (deltóide, capuz sensitivo lateral do braço)",
          "Não união (rara com placa, mais comum em intramedular)",
        ],
        fontes: ["Rockwood — Fraturas em Adultos, 8ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
      {
        id: "radio-distal",
        titulo: "Fratura do Rádio Distal",
        subtitulo: "Rockwood cap. 39 · Campbell cap. 65",
        epidemiologia:
          "Fratura mais comum em adultos (~17% de todas as fraturas). Distribuição bimodal: jovens (trauma alta energia) e mulheres pós-menopáusicas (queda de baixa energia). Incidência crescente.",
        classificacao: [
          {
            sistema: "Frykman",
            itens: [
              "I–II: sem fratura ulnar distal",
              "III–IV: com fratura processo estilóide ulnar",
              "V–VI: com envolvimento articulação rádio-ulnar distal",
              "VII–VIII: com envolvimento articulação rádio-cárpica",
            ],
          },
          {
            sistema: "AO/OTA (23-)",
            itens: [
              "A: extra-articular",
              "B: articular parcial",
              "C: articular completa (C1 simples, C2 cominuto metafisário, C3 cominuto articular)",
            ],
          },
          { sistema: "Epônimos clássicos", itens: ["Colles: dorsal, extra-articular", "Smith: volar", "Barton: cizalhamento articular volar ou dorsal", "Chauffeur: estiloide radial isolado"] },
        ],
        mecanismo:
          "Queda com punho em extensão (Colles, Barton dorsal). Queda com punho em flexão (Smith). Impacto axial de alta energia (fraturas C3 AO).",
        tx_nao_cirurgico: [
          "Fraturas A estáveis sem deslocamento significativo — tala gessada 4–6 sem",
          "Idosos sem demanda funcional elevada",
          "Critérios de estabilidade: inclinação dorsal <5°, encurtamento radial <3 mm, articular sem degrau",
        ],
        tx_cirurgico: [
          "Perda da redução após molde gessado",
          "Degrau articular >2 mm",
          "Inclinação dorsal >10° após redução",
          "Encurtamento radial >3 mm",
          "Comminuição dorsal marcada (instabilidade previsível)",
        ],
        cirurgias: [
          "Placa volar de ângulo fixo (DVR, Aptus — padrão atual para a maioria)",
          "Fixação externa (cominuição grave, contaminação, politrauma)",
          "Fixação percutânea com fios K (fraturas simples A, criança)",
          "Placa dorsal (fraturas dorsais tipo die-punch, extensão para carpo)",
        ],
        complicacoes: [
          "Síndrome do túnel do carpo (aguda ou tardia)",
          "Ruptura de tendão extensor (EPL) — fio K ou parafuso protruindo",
          "Lesão da cartilagem triangular (TFCC)",
          "Malunião (perda de redução no gesso)",
          "Distrofia simpático-reflexa (CRPS tipo I)",
          "Rigidez do punho",
        ],
        fontes: ["Rockwood — Fraturas em Adultos, 8ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
    ],
  },
  {
    id: "membro-inferior",
    label: "Membro Inferior",
    topicos: [
      {
        id: "colo-femur",
        titulo: "Fratura do Colo do Fêmur",
        subtitulo: "Rockwood cap. 50 · Campbell cap. 53",
        epidemiologia:
          "~300.000 casos/ano nos EUA. Mortalidade em 1 ano: 20–30%. Maioria em mulheres >65 anos. Incidência dobra a cada 5–6 anos a partir dos 50 anos. Relacionada à osteoporose e quedas.",
        classificacao: [
          {
            sistema: "Garden",
            itens: [
              "I: valgo impactado (trabeculado em valgo)",
              "II: não deslocada (trabeculado paralelo)",
              "III: deslocada parcial",
              "IV: deslocada completa (máximo risco NÃO)",
            ],
          },
          {
            sistema: "Pauwels (ângulo de cisalhamento)",
            itens: ["I: <30° (compressão, favorável)", "II: 30–50° (misto)", "III: >50° (cisalhamento — desfavorável, alto risco falha)"],
          },
          {
            sistema: "AO/OTA (31B)",
            itens: ["B1: subcapital com pouco deslocamento", "B2: transervical", "B3: subcapital com deslocamento"],
          },
        ],
        mecanismo:
          "Baixa energia: queda da própria altura em idosos osteoporóticos. Alta energia: trauma direto em adultos jovens (2% das fraturas de colo). A fratura pode PRECEDER a queda em idosos (fadiga óssea).",
        tx_nao_cirurgico: [
          "Paciente acamado sem possibilidade cirúrgica (risco anestésico proibitivo)",
          "Fratura Garden I impactada em valgum em idoso sem deambulação — discussão multidisciplinar",
        ],
        tx_cirurgico: [
          "Praticamente todas as fraturas em pacientes ambulatórios",
          "Objetivo: mobilização precoce para evitar complicações clínicas (TEP, pneumonia, úlceras)",
          "Urgência relativa: <24–48h → menor risco de necrose avascular",
        ],
        cirurgias: [
          "Parafusos canulados (3 em triângulo invertido) — Garden I/II, jovens, Pauwels I/II",
          "DHS (Dynamic Hip Screw) — fraturas basocervicais / Pauwels I",
          "Hemiprótese (Austin-Moore ou Moore cimentada) — Garden III/IV em idosos >65 anos",
          "Artroplastia total do quadril (ATQ) — paciente ativo >65 anos, artrose pré-existente, Garden III/IV",
          "ATQ é preferida em >80 anos ativos ou qualquer Garden IV em deambulador",
        ],
        complicacoes: [
          "Necrose avascular (NÃO) da cabeça femoral: Garden I ~10%, IV ~30%",
          "Não união: ~20–30% sem cirurgia; ~5–10% com fixação",
          "Falha do implante / cut-out (osteoporose, fixação inadequada)",
          "TEP / TVP",
          "Afundamento protésico (hemiprótese não cimentada em osteoporose)",
          "Luxação da prótese",
          "Infecção periprotética",
        ],
        fontes: ["Rockwood — Fraturas em Adultos, 8ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
      {
        id: "intertrocanterica",
        titulo: "Fratura Intertrocantérica",
        subtitulo: "Rockwood cap. 51 · Campbell cap. 53",
        epidemiologia:
          "Corresponde a ~50% das fraturas do quadril proximal. Maior frequência que as de colo em idosos muito frágeis. Risco de mortalidade em 1 ano: semelhante ao colo (~20–30%).",
        classificacao: [
          {
            sistema: "Evans (modificada por Jensen)",
            itens: [
              "I: 2 fragmentos, não deslocada (estável)",
              "II: 2 fragmentos, deslocada (estável após redução)",
              "III: 3 fragmentos (parede posterior, instável)",
              "IV: 4 fragmentos (paredes anterior + posterior, instável)",
              "V: inversamente oblíqua (padrão subtrocantérico, instável)",
            ],
          },
          {
            sistema: "AO/OTA (31A)",
            itens: [
              "A1: simples (2 fragmentos)",
              "A2: complicada (fragmento do trocantericum medial)",
              "A3: inversamente oblíqua / transtrocantérica",
            ],
          },
        ],
        mecanismo:
          "Queda de baixa energia em idosos. Região metafisária vascularizada — necrose avascular é rara (diferente do colo). Falha ocorre por carga em varo.",
        tx_nao_cirurgico: [
          "Raramente indicado (paciente em fase terminal, sem deambulação prévia)",
          "Tração esquelética como manejo temporário pré-operatório",
        ],
        tx_cirurgico: [
          "Quase todas as fraturas em pacientes que deambulavam",
          "Mobilização precoce essencial para sobrevivência",
          "Idealmente <48h da admissão",
        ],
        cirurgias: [
          "DHS (Dynamic Hip Screw) + placa lateral — padrão para fraturas A1-A2 estáveis",
          "Haste cefalomedular (Gamma nail, PFNA, InterTan) — A2-A3 instáveis, subtrocantéricas, inversamente oblíquas",
          "Haste é preferida: menor força em varo, melhor para instáveis e fratura abaixo do pequeno trocânter",
        ],
        complicacoes: [
          "Cut-out do parafuso cefálico (TAD >25 mm → fator de risco principal)",
          "Colapso em varo",
          "Perda de fixação (osteoporose grave)",
          "Fratura periimplante (ao nível da ponta da haste)",
          "TVP / TEP",
          "Infecção",
        ],
        fontes: ["Rockwood — Fraturas em Adultos, 8ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
      {
        id: "planalto-tibial",
        titulo: "Fratura do Planalto Tibial",
        subtitulo: "Rockwood cap. 56 · Campbell cap. 54",
        epidemiologia:
          "~1% de todas as fraturas. Bimodal: jovens (alta energia — acidente) e mulheres idosas (baixa energia — osteoporose). Mais comum lateral (55–70%).",
        classificacao: [
          {
            sistema: "Schatzker",
            itens: [
              "I: cizalhamento lateral puro",
              "II: cizalhamento + afundamento lateral",
              "III: afundamento lateral puro (idosos, osteoporótico)",
              "IV: platô medial (alta energia, lesão ligamentar grave)",
              "V: bicondilar (ambos os platôs)",
              "VI: bicondilar + dissociação metadiafisária",
            ],
          },
        ],
        mecanismo:
          "Valgo forçado (trauma veicular atinge a perna lateralmente) → Schatzker I-III. Alta energia com compressão axial → IV-VI. Quedas em idosos → Schatzker III.",
        tx_nao_cirurgico: [
          "Schatzker I-III sem afundamento articular significativo (<2–3 mm) e joelho estável",
          "Imobilização + descarga por 8–12 semanas",
          "Joelho deve ser estável em extensão (sem lesão ligamentar associada)",
        ],
        tx_cirurgico: [
          "Afundamento articular >2–3 mm em paciente ativo",
          "Instabilidade articular em extensão completa",
          "Fraturas Schatzker IV, V, VI (quase sempre cirúrgico)",
          "Lesão vascular ou síndrome compartimental associada",
        ],
        cirurgias: [
          "Parafuso isolado percutâneo (Schatzker I, fissura simples sem afundamento)",
          "Placa lateral de ângulo fixo / LCP (Schatzker I–III)",
          "Dupla placa (lateral + posteromedial) — Schatzker V–VI (padrão atual)",
          "Fixador externo temporário (damage control) → conversão a placa em 5–10 dias",
          "Enxerto ósseo / substituto para preenchimento do afundamento",
        ],
        complicacoes: [
          "Artrose pós-traumática (proporcional ao afundamento residual)",
          "Lesão do LCA/LCP/ligamentos colaterais associada",
          "Lesão da artéria poplítea (Schatzker IV — urgência cirúrgica)",
          "Lesão do nervo fibular (Schatzker IV lateral)",
          "Síndrome compartimental",
          "Infecção de partes moles (cobertura de pele inadequada lateralmente)",
        ],
        fontes: ["Rockwood — Fraturas em Adultos, 8ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
    ],
  },
  {
    id: "coluna-pelve",
    label: "Coluna e Pelve",
    topicos: [
      {
        id: "fratura-pelve",
        titulo: "Fratura da Pelve",
        subtitulo: "Rockwood cap. 48 · Campbell cap. 52",
        epidemiologia:
          "Alta mortalidade em fraturas instáveis (até 40% nas Tipo C). Associação com lesão de grandes vasos (hemorragia retroperitoneal), lesão uretral (10–20%), lesão neurológica (L4-S3).",
        classificacao: [
          {
            sistema: "Young & Burgess",
            itens: [
              "LC (Lateral Compression): força lateral — LC I/II/III",
              "APC (Anteroposterior Compression): abertura em livro — APC I/II/III",
              "VS (Vertical Shear): cizalhamento vertical",
              "CM (Combined Mechanism)",
            ],
          },
          {
            sistema: "Tile / AO",
            itens: ["A: estável (anel intacto)", "B: rotatoriamente instável (anel parcialmente rompido)", "C: rotatória + verticalmente instável (anel completamente rompido)"],
          },
        ],
        mecanismo:
          "Alta energia: atropelamento, queda de altura, esmagamento. O padrão depende da direção da força aplicada ao anel pélvico.",
        tx_nao_cirurgico: [
          "Tipo A: repouso, analgesia, mobilização progressiva",
          "LC I: fraturas de ramos sem instabilidade — tratamento conservador",
        ],
        tx_cirurgico: [
          "APC II/III (abertura em livro instável)",
          "VS e fraturas Tipo C",
          "Hemorragia retroperitoneal maciça → angioembolização emergência",
        ],
        cirurgias: [
          "Lençol pélvico / cinta pélvica (emergência — compressão temporária)",
          "Fixador externo anterior (estabilização rápida damage control)",
          "Placa de sínfise púbica (abertura em livro)",
          "Parafusos iliosakrais percutâneos (lesão posterior — VS, APC III)",
          "Placa posterior / fixação interna (Tile C — tardio, após estabilização do paciente)",
        ],
        complicacoes: [
          "Hemorragia maciça (principal causa de morte aguda)",
          "Lesão uretral (uretra membranosa — ramo inferior)",
          "Lesão vesical (ruptura extraperitoneal ou intraperitoneal)",
          "Lesão neural (L4-S3, disfunção sexual, incontinência)",
          "Discrepância de membros, marcha claudicante (instabilidade residual)",
          "Tromboembolismo",
        ],
        fontes: ["Rockwood — Fraturas em Adultos, 8ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Componentes
───────────────────────────────────────────────────────────── */
function SecaoConteudo({ titulo, conteudo }: { titulo: string; conteudo?: string | string[] }) {
  if (!conteudo || (Array.isArray(conteudo) && conteudo.length === 0)) return null;
  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/80 mb-1.5">{titulo}</h4>
      {typeof conteudo === "string" ? (
        <p className="text-sm text-slate-300 leading-relaxed">{conteudo}</p>
      ) : (
        <ul className="space-y-1">
          {conteudo.map((item, i) => (
            <li key={i} className="text-sm text-slate-300 flex gap-2">
              <span className="text-amber-400/60 mt-0.5 shrink-0">›</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CardTopico({ topico, aberto, onToggle }: { topico: Topico; aberto: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{ background: "#0A1628", border: "1px solid rgba(245,158,11,0.15)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-amber-900/10 transition-colors"
      >
        <div>
          <p className="text-sm font-semibold text-white">{topico.titulo}</p>
          {topico.subtitulo && <p className="text-[11px] text-amber-400/60 mt-0.5">{topico.subtitulo}</p>}
        </div>
        {aberto ? (
          <ChevronDown className="h-4 w-4 text-amber-400 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-500 shrink-0" />
        )}
      </button>

      {aberto && (
        <div className="px-4 pb-4 pt-1" style={{ borderTop: "1px solid rgba(245,158,11,0.1)" }}>
          <SecaoConteudo titulo="Epidemiologia" conteudo={topico.epidemiologia} />

          {topico.classificacao && topico.classificacao.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/80 mb-2">Classificação</h4>
              <div className="space-y-3">
                {topico.classificacao.map((cl, i) => (
                  <div key={i}>
                    <p className="text-xs font-medium text-amber-300/70 mb-1">{cl.sistema}</p>
                    <ul className="space-y-0.5">
                      {cl.itens.map((item, j) => (
                        <li key={j} className="text-sm text-slate-300 flex gap-2">
                          <span className="text-amber-400/40 shrink-0">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <SecaoConteudo titulo="Mecanismo do Trauma" conteudo={topico.mecanismo} />
          <SecaoConteudo titulo="Indicação de Tratamento Não Cirúrgico" conteudo={topico.tx_nao_cirurgico} />
          <SecaoConteudo titulo="Indicação de Tratamento Cirúrgico" conteudo={topico.tx_cirurgico} />
          <SecaoConteudo titulo="Cirurgias" conteudo={topico.cirurgias} />
          <SecaoConteudo titulo="Complicações" conteudo={topico.complicacoes} />

          {topico.fontes && (
            <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-[11px] text-slate-600 font-medium uppercase tracking-wider mb-1">Fontes</p>
              {topico.fontes.map((f, i) => (
                <p key={i} className="text-[11px] text-slate-500">· {f}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Página principal
───────────────────────────────────────────────────────────── */
export default function OrtopediaAdultoPage() {
  const [regiaoAtiva, setRegiaoAtiva] = useState<string>(REGIOES[0].id);
  const [topicoAberto, setTopicoAberto] = useState<string | null>(null);

  const regiao = REGIOES.find((r) => r.id === regiaoAtiva)!;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}
        >
          <BookOpen className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Ortopedia Adulto</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Resumo didático baseado em Rockwood – Fraturas em Adultos e Campbell's Operative Orthopaedics
          </p>
        </div>
      </div>

      {/* Aviso de fonte */}
      <div
        className="flex gap-2.5 rounded-xl px-3.5 py-2.5 mb-6"
        style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
      >
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200/70 leading-relaxed">
          Conteúdo resumido para fins de estudo e revisão. Não substitui avaliação clínica individualizada nem as obras originais.
        </p>
      </div>

      {/* Tabs de região */}
      <div className="flex gap-1 mb-5 rounded-xl p-1" style={{ background: "#060F1E" }}>
        {REGIOES.map((r) => (
          <button
            key={r.id}
            onClick={() => { setRegiaoAtiva(r.id); setTopicoAberto(null); }}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all",
              regiaoAtiva === r.id
                ? "bg-amber-900/40 text-amber-300"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
            )}
            style={regiaoAtiva === r.id ? { border: "1px solid rgba(245,158,11,0.3)" } : { border: "1px solid transparent" }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Tópicos da região */}
      <div className="space-y-2">
        {regiao.topicos.map((topico) => (
          <CardTopico
            key={topico.id}
            topico={topico}
            aberto={topicoAberto === topico.id}
            onToggle={() => setTopicoAberto(topicoAberto === topico.id ? null : topico.id)}
          />
        ))}
        {regiao.topicos.length === 0 && (
          <div
            className="rounded-xl px-4 py-8 text-center"
            style={{ background: "#0A1628", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-slate-500 text-sm">Conteúdo em desenvolvimento</p>
          </div>
        )}
      </div>
    </div>
  );
}
