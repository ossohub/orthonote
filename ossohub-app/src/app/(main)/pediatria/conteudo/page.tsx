"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, BookText, AlertCircle } from "lucide-react";
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

interface Categoria {
  id: string;
  label: string;
  topicos: Topico[];
}

/* ─────────────────────────────────────────────────────────────
   Dados
───────────────────────────────────────────────────────────── */
const CATEGORIAS: Categoria[] = [
  {
    id: "trauma-pediatrico",
    label: "Trauma",
    topicos: [
      {
        id: "supracondilar",
        titulo: "Fratura Supracondilar do Úmero",
        subtitulo: "Rockwood — Fraturas em Crianças · Tachdjian's",
        epidemiologia:
          "Fratura mais comum do cotovelo pediátrico (~50–65% das fraturas do cotovelo em crianças). Pico entre 5–8 anos. Predomínio masculino. Alta associação com lesão neurovascular (AIN: 11–16%; artéria braquial: 2–5%).",
        classificacao: [
          {
            sistema: "Gartland",
            itens: [
              "Tipo I: sem deslocamento (line anterior umeral normal)",
              "Tipo II: angulação posterior com cortical posterior intacta",
              "Tipo III: completamente deslocada (sem contato cortical)",
              "Tipo IV (Leitch): instável em todos os planos (intraoperatório)",
            ],
          },
        ],
        mecanismo:
          "Queda sobre mão estendida com cotovelo em extensão (extensão — 95%) → força de hiperextensão, compressão anterior, tração posterior. Raramente: queda direta sobre cotovelo flexionado (fratura em flexão — 2–5%).",
        tx_nao_cirurgico: [
          "Gartland I: imobilização em tipoia ou longa, cotovelo 90° por 3 semanas",
          "Gartland II sem angulação posterior residual após redução: discutível — maioria dos centros prefere fixação percutânea",
        ],
        tx_cirurgico: [
          "Gartland II com angulação residual ou vascular",
          "Gartland III/IV",
          "Qualquer suspeita de comprometimento vascular (pulso ausente após redução fechada)",
        ],
        cirurgias: [
          "Redução fechada + 2 fios K em cruzeta ou 2–3 fios K laterais (lateral-only é mais seguro → evita lesão do nervo ulnar)",
          "Redução aberta (anterior): se redução fechada falha ou status vascular não resolve",
          "Exploração vascular se pulso ausente após fixação (artéria braquial presa entre fragmentos)",
        ],
        complicacoes: [
          "Lesão do nervo interósseo anterior (NIA) — padrão mais comum na Tipo III",
          "Lesão da artéria braquial → síndrome do braço quente pálido (tratamento: fixação; pulso retorna em minutos)",
          "Lesão do nervo ulnar (iatrógena — fio em cruzeta)",
          "Cubitus varus (deformidade em coronha) — complicação cosmética da malunião em varo",
          "Miossite ossificante (manipulação excessiva)",
          "Rigidez (rara em crianças)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed.", "Tachdjian's Pediatric Orthopaedics, 5ª ed."],
      },
      {
        id: "condilo-lateral",
        titulo: "Fratura do Côndilo Lateral",
        subtitulo: "Rockwood — Fraturas em Crianças",
        epidemiologia:
          "Segunda fratura mais comum do cotovelo pediátrico (~10–20%). Pico: 6 anos. Causa principal de cubitus valgus tardio se não tratada adequadamente. Alta taxa de não-união conservadora quando deslocada.",
        classificacao: [
          {
            sistema: "Jakob / Milch",
            itens: [
              "Tipo I (Milch I): fratura lateral ao sulco trocoide — articulação cotovelo estável",
              "Tipo II (Milch II): fratura pelo sulco / tróclea — instável, luxação potencial",
            ],
          },
          {
            sistema: "Deslocamento (prático)",
            itens: [
              "<2 mm: conservador (controverso — alguns operam)",
              "2–4 mm: limite — RMN ou artrografia para definir",
              ">4 mm ou rótula articular: cirurgia",
            ],
          },
        ],
        mecanismo:
          "Estresse em valgo + avulsão pelo extensor comum dos dedos. A fise distal lateral do úmero (lateral condilar) ainda é cartilaginosa → o deslocamento real é subestimado no RX simples.",
        tx_nao_cirurgico: [
          "Fratura não deslocada (<2 mm) confirmada por RMN ou artrografia — gesso braço-palmar 4–6 semanas",
          "Controle seriado com RX a cada 5–7 dias nas primeiras 2–3 semanas (pode deslocar)",
        ],
        tx_cirurgico: [
          "Deslocamento ≥2 mm",
          "Instabilidade articular (Milch II)",
          "Não-união (apresentação tardia)",
        ],
        cirurgias: [
          "Redução aberta + fios K (2 fios paralelos pela cartilagem condral)",
          "Parafuso de canulado 4 mm (criança >8 anos, fragmento grande)",
          "Não-união crônica: enxerto ósseo + placa — aceitar deformidade em valgo leve se >2 anos de evolução",
        ],
        complicacoes: [
          "Não-união (fragmento avascular, instabilidade persistente)",
          "Cubitus valgus → compressão tardia do nervo ulnar (paralisia tardia do ulnar)",
          "Rigidez do cotovelo",
          "Necrose avascular do capítulo (vascularização retrógrada — cautela com redução aberta)",
          "Fechamento fisário prematuro",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed.", "Tachdjian's Pediatric Orthopaedics, 5ª ed."],
      },
      {
        id: "colo-femur-ped",
        titulo: "Fratura do Colo do Fêmur Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças · Tachdjian's",
        epidemiologia:
          "Rara (~1% das fraturas pediátricas). Alta energia na maioria. Complicações graves: necrose avascular (NÃO), não-união, retardo de crescimento. Mortalidade relacionada a politrauma associado.",
        classificacao: [
          {
            sistema: "Delbet",
            itens: [
              "Tipo I: transfisária (transcervical + luxação epífise) — NÃO >50%",
              "Tipo II: transcervical — NÃO ~28%",
              "Tipo III: basocervical — NÃO ~18%",
              "Tipo IV: intertrocantérica — NÃO ~5%, bom prognóstico",
            ],
          },
        ],
        mecanismo:
          "Alta energia (Tipos I–III): atropelamento, queda de altura, acidente de bicicleta. Baixa energia (Tipo IV): queda simples, fratura patológica (cistos ósseos).",
        tx_nao_cirurgico: [
          "Raramente aplicável — praticamente todas as fraturas deslocadas requerem fixação",
          "Tipo IV não deslocada em criança muito jovem (<2 anos): tração + espica de quadril",
        ],
        tx_cirurgico: [
          "Praticamente todas as fraturas deslocadas (urgência para reduzir pressão intracapsular e preservar vascularização)",
          "Hematoma intracapsular pode causar NÃO por tamponamento vascular — aspiração/descompressão cirúrgica precoce",
        ],
        cirurgias: [
          "Parafusos canulados cruzados (Tipo II–IV) — fise respeitada se <10 anos, atravessada se necessário para fixação",
          "Haste cefalomedular pediátrica (Tipo IV, criança maior)",
          "Espica gessada pós-op (crianças <8 anos) para proteção adicional",
        ],
        complicacoes: [
          "Necrose avascular (NÃO) — complicação mais devastadora; Tipo I tem maior risco",
          "Não-união — mais frequente em fraturas deslocadas não operadas",
          "Varo do colo (coxa vara) — shortening e claudicação",
          "Retardo de crescimento / coxa breva",
          "Consolidação viciosa",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed.", "Tachdjian's Pediatric Orthopaedics, 5ª ed."],
      },
      {
        id: "antebraco-ped",
        titulo: "Fratura do Antebraço Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças · Tachdjian's",
        epidemiologia:
          "Fraturas do rádio e/ou ulna são as fraturas mais comuns em crianças (~40% de todas as fraturas pediátricas). Pico: 10–14 anos. Mais frequentes no terço distal (metáfise). Fraturas completas vs. em galho verde (greenstick). Alta capacidade de remodelamento ósseo.",
        classificacao: [
          {
            sistema: "Topografia",
            itens: [
              "Distal (metáfise — mais comum): Colles pediátrico; Salter-Harris II é o mais frequente",
              "Diafisária: ambos os ossos ou isolada (raramente)",
              "Proximal: Monteggia, cabeça do rádio, olécrano",
            ],
          },
          {
            sistema: "Fratura de Monteggia (Bado)",
            itens: [
              "Tipo I: angulação anterior ulna + luxação anterior da cabeça do rádio (75% em crianças)",
              "Tipo II: angulação posterior + luxação posterior (mais adulto)",
              "Tipo III: fratura proximal ulna + luxação lateral (típico <5 anos)",
              "REGRA: toda fratura de ulna → verificar a linha radiocapitelar (deve passar pelo capítulo)",
            ],
          },
          {
            sistema: "Galho Verde vs. Completa",
            itens: [
              "Greenstick: cortical de um lado rompe, outro dobra — angulação sem perda de contato",
              "Completa: ambas as corticais rompidas — mais deslocamento, mais instável",
              "Plástica / Torus (bojo): impacção da cortical sem fratura linear",
            ],
          },
        ],
        mecanismo:
          "Queda sobre mão estendida (FOOSH — fall on outstretched hand). Força de compressão axial + momento de dobramento. Força em pronação → fratura de Monteggia. Força de torção → fratura em espiral.",
        tx_nao_cirurgico: [
          "Fratura distal (torus/bojo): tala removível por 3–4 semanas — não requer gesso longo",
          "Greenstick distal com angulação ≤20°: gesso longo (braquio-palmar) por 4–6 semanas",
          "Fratura completa do terço distal reduzível e estável: gesso longo 6 semanas",
          "Remodelamento espontâneo: aceitável angulação de até 15° no terço distal em criança <10 anos",
        ],
        tx_cirurgico: [
          "Fratura diafisária deslocada irredutível ou instável",
          "Angulação >15° no terço médio ou proximal",
          "Monteggia: qualquer tipo (redução urgente da cabeça do rádio)",
          "Fratura aberta",
          "Politrauma",
        ],
        cirurgias: [
          "Fios K intramedular flexíveis (Métaizeau/ESIN — elastic stable intramedullary nailing): padrão para diáfise",
          "Redução fechada + gesso (terço distal, maioria dos casos estáveis)",
          "Redução aberta + placa (raramente necessária em criança, exceto falha do ESIN)",
          "Monteggia: redução da ulna reposiciona a cabeça do rádio — se cabeça irredutível → redução aberta",
        ],
        complicacoes: [
          "Síndrome compartimental (diafisária completa, muito inchada — fasciotomia de urgência)",
          "Lesão do nervo interósseo posterior (NIP) — Monteggia Tipo I e III",
          "Nova angulação / perda de redução (mais comum no terço distal)",
          "Deformidade rotacional (limitação de prono-supinação)",
          "Consolidação viciosa e radioulnar synostosis (lesão do membrane interóssea)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed.", "Tachdjian's Pediatric Orthopaedics, 5ª ed."],
      },
    ],
  },
  {
    id: "quadril-ped",
    label: "Quadril",
    topicos: [
      {
        id: "perthes",
        titulo: "Doença de Legg-Calvé-Perthes",
        subtitulo: "Tachdjian's · Campbell's cap. 33",
        epidemiologia:
          "Necrose avascular idiopática da cabeça femoral em crianças. Pico: 4–8 anos. Predomínio masculino (4:1). Incidência: 1:1.200 crianças. Bilateral em 10–20%. Risco aumentado: hiperatividade, baixo peso ao nascer, doença de Gaucher, coagulopatia.",
        classificacao: [
          {
            sistema: "Herring (Pilar Lateral) — mais utilizada",
            itens: [
              "Grupo A: pilar lateral preservado — excelente prognóstico",
              "Grupo B: pilar lateral >50% da altura original",
              "Grupo B/C: borderline (exatamente 50%)",
              "Grupo C: pilar lateral <50% — pior prognóstico",
            ],
          },
          {
            sistema: "Catterall (% de cabeça envolvida)",
            itens: [
              "I: <25%",
              "II: 25–50%",
              "III: ~75%",
              "IV: total",
            ],
          },
          {
            sistema: "Stulberg (resultado em fase de remodelação)",
            itens: [
              "I: esfericidade normal",
              "II: esférica mas ligeiramente maior",
              "III–IV: ovóide / aspherical",
              "V: flat head (coxa plana) — artrose futura certa",
            ],
          },
        ],
        mecanismo:
          "Interrupção da vascularização da cabeça femoral (ramos posteriores da artéria circunflexa femoral medial). Causa não elucidada completamente — hiperviscosidade sanguínea, trombofilia leve, trauma repetitivo.",
        tx_nao_cirurgico: [
          "Grupo A (qualquer idade): observação + amplitude de movimento",
          "Grupo B em criança <8 anos: conservador (tração, fisioterapia, órtese de abdução controversa)",
          "Manutenção de amplitude de movimento — piscina, fisioterapia",
          "Órteses de contenção (Scottish rite, Atlanta) — eficácia controversa na literatura atual",
        ],
        tx_cirurgico: [
          "Grupo B/C e C em criança >8 anos",
          "Grupo B com perda progressiva de contenção durante seguimento",
          "Cabeça extruída (subluxação) resistente ao tratamento conservador",
        ],
        cirurgias: [
          "Osteotomia femoral proximal varizante (contenção da cabeça no acetábulo)",
          "Osteotomia pélvica (Salter, tripla, Ganz) — reorienta acetábulo para cobrir cabeça",
          "Shelf procedure (aumenta cobertura acetabular — para casos com subluxação crônica)",
        ],
        complicacoes: [
          "Coxa magna (alargamento da cabeça) e incongurência articular",
          "Artrose prematura do quadril (Stulberg IV–V → indicação de artroplastia jovem adulto)",
          "Claudicação e dor crônica residual",
          "Coxa breva (encurtamento de membro)",
          "Rigidez pós-cirúrgica",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
      {
        id: "dfce",
        titulo: "Deslizamento Fisário da Cabeça do Fêmur (DFCE)",
        subtitulo: "Tachdjian's · Rockwood — Fraturas em Crianças",
        epidemiologia:
          "Deslocamento da epífise femoral proximal através da fise. Incidência: 2:100.000. Pico: meninos 12–14 anos, meninas 10–12 anos. Predomínio masculino (2–3:1). Obesidade é o principal fator de risco. Bilateral em 20–40% (pode ser simultâneo ou sequencial).",
        classificacao: [
          {
            sistema: "Loder (estabilidade — principal para prognóstico)",
            itens: [
              "Estável: criança deambula (com ou sem auxílio) — NÃO <10%",
              "Instável: incapaz de deambular — NÃO 47–58%",
            ],
          },
          {
            sistema: "Temporal (Salter)",
            itens: [
              "Agudo: <3 semanas",
              "Crônico: >3 semanas",
              "Agudo sobre crônico: fase crônica + episódio agudo",
            ],
          },
          {
            sistema: "Grau de deslocamento (Wilson)",
            itens: [
              "Leve: <33% do diâmetro da cabeça",
              "Moderado: 33–50%",
              "Grave: >50%",
            ],
          },
        ],
        mecanismo:
          "Fraqueza fisária (obesidade + pico do crescimento puberal) com forças de cisalhamento. Hipogonadismo, hipotireoidismo e outras endocrinopatias → fise fraca. A epífise desliza posteromedialmente em relação ao colo.",
        tx_nao_cirurgico: [
          "Não existe tratamento conservador definitivo — todos os DFCE requerem fixação",
          "Suspensão de carga imediata ao diagnóstico até cirurgia",
        ],
        tx_cirurgico: [
          "Todos os casos confirmados — urgência em DFCE instável",
          "DFCE instável: fixação cirúrgica dentro de 24h do diagnóstico",
          "DFCE estável: fixação nas próximas 24–48h",
        ],
        cirurgias: [
          "Parafuso percutâneo único in situ (padrão para DFCE estável de qualquer grau) — fio guia central + 1 parafuso canulado 7,3 mm",
          "Fixação in situ (DFCE instável): não reduzir! Tentativa de redução → NÃO",
          "Osteotomia de cuneiforme (rotação) — para deformidade residual grave em quadril estável, eletivo",
          "Profilaxia contralateral: parafuso profilático quando risco alto (endocrinopatia, <10 anos, DFCE grave)",
        ],
        complicacoes: [
          "Necrose avascular (NÃO) — principal complicação; DFCE instável: até 58%",
          "Condrólise (destruição articular aguda) — 1–7%, mais comum após gesso espica",
          "Síndrome do pinçamento femoroacetabular (FAI) — rotação anormal pós-DFCE",
          "Discrepância de comprimento de membros",
          "Artrose precoce",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Rockwood — Fraturas em Crianças, 9ª ed."],
      },
      {
        id: "ddq",
        titulo: "Displasia do Desenvolvimento do Quadril (DDQ)",
        subtitulo: "Tachdjian's · Campbell's cap. 30",
        epidemiologia:
          "Espectro de anormalidades do desenvolvimento da articulação coxofemoral: de displasia leve até luxação completa. Incidência: 1–3/1.000 nascidos vivos (luxação completa: 0,5–1/1.000). Predomínio feminino (4–7:1). Fatores de risco: apresentação pélvica, primeiro filho, oligodrâmnio, história familiar, CAVE.",
        classificacao: [
          {
            sistema: "Graf (ultrassonográfica — padrão antes dos 6 meses)",
            itens: [
              "Tipo I: quadril maduro, normal (α ≥60°, β <55°)",
              "Tipo IIa: imaturo fisiológico (<3 meses) — observação",
              "Tipo IIb: imaturo patológico (>3 meses, α 50–59°) — tratamento",
              "Tipo IIc / D: desfavorável, limítrofe com luxação parcial",
              "Tipo III: subluxado (α <43°)",
              "Tipo IV: luxado completo",
            ],
          },
          {
            sistema: "Tönnis (radiográfico — após ossificação da epífise)",
            itens: [
              "Grau 0: normal",
              "Grau 1: discreto aumento de esclerose acetabular",
              "Grau 2: displasia moderada",
              "Grau 3: displasia grave com subluxação",
            ],
          },
        ],
        mecanismo:
          "Desenvolvimento anormal da articulação coxofemoral por combinação de fatores genéticos, hormonais (relaxina) e mecânicos (posição intrauterina). O acetábulo não se desenvolve sem a cabeça femoral dentro — displasia gera displasia.",
        tx_nao_cirurgico: [
          "RN até 6 meses: Arnês de Pavlik (primeira linha para Graf IIb/III/IV) — correção em 95% dos diagnósticos precoces",
          "6–18 meses: redução fechada sob anestesia + artrograma + gesso espica em posição humana",
          "Usam-se radiografias seriadas + ultrassom (nos primeiros meses) para monitorar",
          "Arnês de Pavlik: deve ser mantido >23h/dia; não forçar a posição (risco de NAO por flexão excessiva)",
        ],
        tx_cirurgico: [
          "Falha do Arnês de Pavlik após 3–4 semanas",
          "Diagnóstico tardio (>18 meses): redução aberta é frequentemente necessária",
          "Displasia residual após redução: osteotomias (pélvica e/ou femoral)",
        ],
        cirurgias: [
          "Redução aberta (via anterior de Smith-Petersen): remoção de obstáculos (pulvinar, transverso do acetábulo, psoas encurtado)",
          "Osteotomia pélvica (Salter: redireciona; Pemberton: reduz volume; Dega; PAO de Ganz: adolescentes/adultos jovens)",
          "Osteotomia femoral varizante + desrotação (para reduzir tensão e anteversão excessiva)",
        ],
        complicacoes: [
          "Necrose avascular da cabeça femoral — principal complicação do tratamento; causada por pressão excessiva ou hiperflexão no Pavlik",
          "Redução insuficiente / reluxação",
          "Displasia residual → artrose precoce no adulto jovem",
          "Rígidez pós-cirúrgica",
          "Diferença de comprimento de membros",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
    ],
  },
  {
    id: "coluna-scoliose",
    label: "Coluna",
    topicos: [
      {
        id: "escoliose-idiopatica",
        titulo: "Escoliose Idiopática do Adolescente (EIA)",
        subtitulo: "Tachdjian's · Campbell's cap. 44",
        epidemiologia:
          "Mais comum das escolioses (80–85%). Prevalência: 2–4% em adolescentes; curvas >10° Cobb. Progressão clinicamente significativa (>25°): 0,5%. Predomínio feminino para curvas progressivas (7:1 para curvas >30°). Componente genético multifatorial.",
        classificacao: [
          {
            sistema: "Lenke (padrão atual para cirurgia)",
            itens: [
              "Tipo 1: Torácica principal (Lumbar A/B/C, modif. sagital -/N/+)",
              "Tipo 2: Dupla torácica",
              "Tipo 3: Dupla maior",
              "Tipo 4: Tripla maior",
              "Tipo 5: Toracolombar / Lombar",
              "Tipo 6: Toracolombar / Lombar – torácica",
            ],
          },
          {
            sistema: "Maturidade — Risser",
            itens: [
              "0: pré-puberal, alto risco de progressão",
              "1–2: ainda crescendo, bracing indicado",
              "4–5: crescimento concluído",
            ],
          },
        ],
        mecanismo:
          "Etiologia desconhecida (idiopática). Hipóteses: assimetria de crescimento, disfunção melatoninírgica, anormalidade neurológica sutil. A curva se auto-perpetua pelo mecanismo de Hueter-Volkmann (carga assimétrica sobre vértebras em crescimento).",
        tx_nao_cirurgico: [
          "Observação: curvas <25° em paciente em crescimento (controle a cada 4–6 meses)",
          "Bracing: curvas 25–40° em paciente com Risser ≤2 (mínimo 18h/dia, até Risser 4–5)",
          "Tipos de órtese: Boston (torácica baixa/lombar), Charleston (noturna), Providence (noturna)",
          "Fisioterapia (SEAS, Schroth) como adjuvante ao bracing",
        ],
        tx_cirurgico: [
          "Curvas >45–50° em paciente ainda em crescimento",
          "Curvas >50° em paciente com crescimento completo",
          "Progressão documentada durante bracing",
          "Comprometimento pulmonar (curvas >70° → capacidade vital reduzida)",
        ],
        cirurgias: [
          "Artrodese posterior com instrumentação (parafusos pediculares + hastes) — padrão atual",
          "Fusão anterior (lombotomia) + instrumentação — curvas lombares selecionadas",
          "Instrumentação sem fusão (VEPTR, hastes deslizantes) — crianças <10 anos para ganho de altura antes da fusão definitiva",
        ],
        complicacoes: [
          "Perda de correção / curva de adição (curva adjacente progride após fusão)",
          "Lesão neurológica (monitorização neurofisiológica intraoperatória é mandatória)",
          "Infecção de ferida operatória (1–3%)",
          "Falha do implante",
          "Síndrome do flat back (hipercorreção lombar)",
          "Dor lombar crônica em adulto jovem",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
      {
        id: "espondilolistese-ped",
        titulo: "Espondilolistese Istmica Pediátrica",
        subtitulo: "Tachdjian's · Campbell's",
        epidemiologia:
          "Prevalência: ~6% na população geral. Pico sintomático: adolescentes atletas (ginastas, atletas de arremesso, nadadores). Mais comum em L5-S1. Tipo ístmica (pars interarticularis) é o tipo mais comum em jovens.",
        classificacao: [
          {
            sistema: "Wiltse (tipo)",
            itens: [
              "Tipo I: Displásica (articulações facetárias anômalas)",
              "Tipo II: Ístmica (fratura ou elongação de pars) — mais comum",
              "Tipo III: Degenerativa",
              "Tipo IV: Traumática",
              "Tipo V: Patológica",
            ],
          },
          {
            sistema: "Meyerding (grau de deslizamento)",
            itens: [
              "Grau I: 1–25%",
              "Grau II: 26–50%",
              "Grau III: 51–75%",
              "Grau IV: 76–100%",
              "Espondiloptose: >100%",
            ],
          },
        ],
        mecanismo:
          "Estresse repetitivo em extensão lombar → fratura de pars interarticularis (espódilo = pars). Fase aguda (espondilólise): dor lombar em extensão. Deslizamento progressivo pode ocorrer com crescimento.",
        tx_nao_cirurgico: [
          "Espondilólise (sem deslizamento): repouso esportivo 3–6 meses, colete, fisioterapia extensora",
          "Espondilolistese Grau I–II assintomática: observação",
          "Sintomática Grau I–II: fisioterapia, AINES, evitar extensão lombar",
        ],
        tx_cirurgico: [
          "Grau I–II com dor resistente ao conservador >6 meses",
          "Grau III–IV (quase sempre sintomático)",
          "Déficit neurológico",
          "Espondiloptose",
        ],
        cirurgias: [
          "Artrodese L5–S1 (fusão intersomática + instrumentação posterior) — Grau I–II",
          "Redução parcial + artrodese — Grau III–IV (redução total aumenta risco neurológico)",
          "Reparação direta da pars (parafuso + gancho) — espondilólise em atleta jovem sem deslizamento",
        ],
        complicacoes: [
          "Lesão neurológica (síndrome da cauda equina — urgência em espondiloptose)",
          "Pseudartrose (fusão incompleta)",
          "Síndrome L5 (déficit de dorsiflexão do hálux)",
          "Perda de redução",
          "Discrepância de comprimento de membros (espondiloptose grave)",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
    ],
  },
  {
    id: "infeccao-ossea",
    label: "Infecção Óssea",
    topicos: [
      {
        id: "osteomielite-hematogenica",
        titulo: "Osteomielite Hematogênica Aguda",
        subtitulo: "Tachdjian's · Campbell's cap. 35",
        epidemiologia:
          "Infecção óssea bacteriana por disseminação hematogênica. Pico: 2–10 anos, predomínio masculino (2:1). Localização preferencial: metáfises de ossos longos (fêmur distal, tíbia proximal, úmero proximal) — onde o fluxo vascular é mais lento e o sistema fagocitário é menos eficiente. S. aureus é o agente causal em >80% dos casos.",
        classificacao: [
          {
            sistema: "Agente etiológico (por faixa etária)",
            itens: [
              "RN (<1 mês): S. aureus, Streptococcus grupo B, gram-negativos (ampicilina + gentamicina)",
              "1 mês–5 anos: S. aureus (principal), H. influenzae (vacinação reduziu drasticamente), Kingella kingae",
              "5–12 anos: S. aureus (MRSA emergindo), Streptococcus pyogenes",
              "Adolescentes: S. aureus; considerar Neisseria gonorrhoeae em sexualmente ativos",
              "Anemia falciforme: Salmonella spp. + S. aureus",
            ],
          },
        ],
        mecanismo:
          "Bacteremia transitória → implantação na metáfise (rede capilar lenta + ausência de células fagocitárias locais). Pressão do pus sub-periosteal → elevação periostal (sinal radiográfico tardio). Extensão ao espaço subperiosteal → abscesso → celulite e sepse. No RN e lactente jovem: vasos atravessam a fise → artrite séptica associada frequente.",
        tx_nao_cirurgico: [
          "Antibioticoterapia IV imediata empírica: oxacilina/cefazolina (MSSA) ou vancomicina (suspeita de MRSA)",
          "Transição para VO após 3–5 dias de melhora clínica e laboratorial (PCR em queda)",
          "Duração total: 4–6 semanas (2–3 semanas IV + 2–3 semanas VO)",
          "Imobilização da extremidade afetada para conforto",
        ],
        tx_cirurgico: [
          "Falha clínica após 48–72h de antibiótico IV",
          "Abscesso subperiosteal ou intracortical documentado por RMN ou US",
          "Osteomielite crônica (sequestro ósseo — involucro + sequestro = indicação clássica)",
          "Neonato: abscesso ósseo pode coexistir com artrite séptica → drenar ambos",
        ],
        cirurgias: [
          "Drenagem cirúrgica aberta + curetagem do osso infectado (trepanação/janelamento cortical)",
          "Remoção de sequestro ósseo (sequestrectomia) na osteomielite crônica",
          "Irrigação com antibiótico local (opcional)",
          "Cobertura de partes moles (retalhos) se exposição óssea",
        ],
        complicacoes: [
          "Artrite séptica concomitante (especialmente quadril + ombro em lactentes)",
          "Osteomielite crônica (tratamento inadequado ou tardio)",
          "Alteração de crescimento (pontes fisárias, legstening ou shortening)",
          "Fraturas patológicas",
          "Sepse / choque séptico (MRSA virulento — PVL toxin)",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
      {
        id: "artrite-septica-quadril",
        titulo: "Artrite Séptica do Quadril Pediátrico",
        subtitulo: "Emergência cirúrgica — Tachdjian's · Rockwood",
        epidemiologia:
          "Infecção bacteriana do espaço articular do quadril. Emergência cirúrgica absoluta. Incidência: ~5/100.000. Pico: <3 anos. S. aureus em todas as idades; Kingella kingae em <3 anos. A cápsula do quadril cobre parte da metáfise femoral proximal — explica a alta associação com osteomielite (25–30% dos casos).",
        classificacao: [
          {
            sistema: "Critérios de Kocher (diagnóstico diferencial — artrite séptica vs. sinovite transitória)",
            itens: [
              "Febre (T >38,5°C)",
              "Incapacidade de suportar peso",
              "VHS >40 mm/h",
              "Leucócitos >12.000/mm³",
              "PCR >2 mg/dL (modificação de Caird)",
              "Probabilidade: 0 critérios <0,2%; 4+ critérios >99%",
            ],
          },
        ],
        mecanismo:
          "Disseminação hematogênica → pus intra-articular → pressão aumentada → oclusão vascular da cabeça femoral → necrose avascular em 8–12 horas. Enzimas bacterianas (colagenase, hialuronidase) destroem a cartilagem articular. URGÊNCIA: drenagem deve ocorrer em <6h do diagnóstico para prevenir NAO.",
        tx_nao_cirurgico: [
          "NÃO existe tratamento conservador definitivo para artrite séptica confirmada do quadril",
          "Antibiótico IV imediato (empírico) enquanto se prepara cirurgia",
          "Punção aspirativa: diagnóstico + descompressão de alívio (não substitui drenagem cirúrgica)",
          "Análise do líquido articular: >50.000 leucócitos/mm³ + glicose baixa + Gram positivo → alta probabilidade",
        ],
        tx_cirurgico: [
          "INDICAÇÃO ABSOLUTA: artrite séptica confirmada ou altamente provável (≥3–4 critérios de Kocher)",
          "Meta: drenagem em <6 horas do diagnóstico",
          "Artroscopia ou artrotomia aberta — não há diferença em desfecho se feita precocemente",
        ],
        cirurgias: [
          "Artroscopia de quadril: lavagem + drenagem + culturas (menos invasivo, recuperação mais rápida)",
          "Artrotomia aberta (via anterior de Watson-Jones ou lateral): acesso amplo para limpeza — preferida em lactentes <6 meses",
          "Drenagem da osteomielite concomitante se presente",
          "Antibiótico IV por 4–6 semanas total (2–3 IV + transição VO após melhora clínica/laboratorial)",
        ],
        complicacoes: [
          "Necrose avascular da cabeça femoral (NAO) — principal complicação do diagnóstico tardio",
          "Artrose do quadril (destruição cartilaginosa por enzimas bacterianas)",
          "Coxa magna (alargamento da cabeça por hiperemia)",
          "Luxação patológica (cápsula distendida + fraqueza muscular)",
          "Retardo do crescimento (lesão fisária)",
          "Sepse (MRSA virulento)",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Rockwood — Fraturas em Crianças, 9ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
      },
    ],
  },
  {
    id: "pe-pediatrico",
    label: "Pé e Tornozelo",
    topicos: [
      {
        id: "pe-torto-congenito",
        titulo: "Pé Torto Congênito (Equinovaro)",
        subtitulo: "Tachdjian's · Campbell's cap. 29",
        epidemiologia:
          "Incidência: 1–2/1.000 nascidos vivos. Predomínio masculino (2:1). Bilateral em ~50%. Componente genético multifatorial (risco aumentado em irmãos). Associado a mielomeningocele, artrogripose.",
        classificacao: [
          {
            sistema: "Pirani (gravidade — 0 a 6)",
            itens: [
              "Componentes do médio-pé: prega medial, colo do tálus palpável, cobertura da cabeça do tálus",
              "Componentes do retropé: prega posterior, calcâneo vazio, rigidez equino",
              "Score ≤3: leve–moderado; >3: grave",
            ],
          },
          {
            sistema: "Dimeglio (gravidade)",
            itens: [
              "Grau I: suave (redutível) — bom prognóstico",
              "Grau II: moderado",
              "Grau III: grave",
              "Grau IV: muito grave (teratológico / artrogripótico)",
            ],
          },
        ],
        mecanismo:
          "Etiologia multifatorial: fatores genéticos, posicionamento intrauterino, fatores vasculares e musculares. Caracterizado por: equino, varo, aduto e cavo (CAVE).",
        tx_nao_cirurgico: [
          "Método Ponseti: manipulação seriada + gesso inguino-podálico (início nas primeiras semanas de vida)",
          "Tenotomia percutânea do tendão de Aquiles ao final das séries de gessos (85–90% dos casos)",
          "Órtese abdutor de pé (Denis-Browne) após gessagem até 4–5 anos de idade",
          "Taxa de sucesso: 95% com Ponseti quando seguido corretamente",
        ],
        tx_cirurgico: [
          "Falha do método Ponseti (recorrência persistente, pé rígido)",
          "Apresentação tardia (>2 anos) em pé rígido",
          "Artrogripose associada",
        ],
        cirurgias: [
          "Liberação posteromedial (Turco) — raramente indicada na era Ponseti",
          "Transferência do tendão tibial anterior (TTAP) — para recorrência com desvio supinado em criança >2 anos",
          "Osteotomias (calcâneo, cúbóide, metatarso) — sequela em criança maior",
          "Artrodese tripla — sequela em adolescente/adulto",
        ],
        complicacoes: [
          "Recorrência (20–30% dos casos Ponseti — principalmente por não uso de órtese)",
          "Pé cavo residual",
          "Deformidade em cavo-varo supinado (correção insuficiente)",
          "Necrose avasular do tálus (cirurgia aberta extensiva)",
          "Rigidez residual",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed."],
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
      <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400/80 mb-1.5">{titulo}</h4>
      {typeof conteudo === "string" ? (
        <p className="text-sm text-slate-300 leading-relaxed">{conteudo}</p>
      ) : (
        <ul className="space-y-1">
          {conteudo.map((item, i) => (
            <li key={i} className="text-sm text-slate-300 flex gap-2">
              <span className="text-sky-400/60 mt-0.5 shrink-0">›</span>
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
      style={{ background: "#0A1628", border: "1px solid rgba(14,165,233,0.15)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-sky-900/10 transition-colors"
      >
        <div>
          <p className="text-sm font-semibold text-white">{topico.titulo}</p>
          {topico.subtitulo && <p className="text-[11px] text-sky-400/60 mt-0.5">{topico.subtitulo}</p>}
        </div>
        {aberto ? (
          <ChevronDown className="h-4 w-4 text-sky-400 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-500 shrink-0" />
        )}
      </button>

      {aberto && (
        <div className="px-4 pb-4 pt-1" style={{ borderTop: "1px solid rgba(14,165,233,0.1)" }}>
          <SecaoConteudo titulo="Epidemiologia" conteudo={topico.epidemiologia} />

          {topico.classificacao && topico.classificacao.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400/80 mb-2">Classificação</h4>
              <div className="space-y-3">
                {topico.classificacao.map((cl, i) => (
                  <div key={i}>
                    <p className="text-xs font-medium text-sky-300/70 mb-1">{cl.sistema}</p>
                    <ul className="space-y-0.5">
                      {cl.itens.map((item, j) => (
                        <li key={j} className="text-sm text-slate-300 flex gap-2">
                          <span className="text-sky-400/40 shrink-0">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <SecaoConteudo titulo="Mecanismo / Etiologia" conteudo={topico.mecanismo} />
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
export default function ConteudoPediatriaPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>(CATEGORIAS[0].id);
  const [topicoAberto, setTopicoAberto] = useState<string | null>(null);

  const categoria = CATEGORIAS.find((c) => c.id === categoriaAtiva)!;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}
        >
          <BookText className="h-5 w-5 text-sky-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Conteúdo Pediatria</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Resumo didático baseado em Rockwood – Fraturas em Crianças, Tachdjian's e Campbell's
          </p>
        </div>
      </div>

      {/* Aviso */}
      <div
        className="flex gap-2.5 rounded-xl px-3.5 py-2.5 mb-6"
        style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}
      >
        <AlertCircle className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
        <p className="text-xs text-sky-200/70 leading-relaxed">
          Conteúdo resumido para fins de estudo. Não substitui avaliação clínica individualizada nem as obras originais.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-5 rounded-xl p-1" style={{ background: "#060F1E" }}>
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            onClick={() => { setCategoriaAtiva(c.id); setTopicoAberto(null); }}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap",
              categoriaAtiva === c.id
                ? "bg-sky-900/40 text-sky-300"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
            )}
            style={
              categoriaAtiva === c.id
                ? { border: "1px solid rgba(14,165,233,0.3)" }
                : { border: "1px solid transparent" }
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Tópicos */}
      <div className="space-y-2">
        {categoria.topicos.map((t) => (
          <CardTopico
            key={t.id}
            topico={t}
            aberto={topicoAberto === t.id}
            onToggle={() => setTopicoAberto(topicoAberto === t.id ? null : t.id)}
          />
        ))}
        {categoria.topicos.length === 0 && (
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
