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
        id: "principios-fraturas-ped",
        titulo: "Princípios das Fraturas Pediátricas",
        subtitulo: "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 31 · Rockwood — Fraturas em Crianças · Tachdjian's",
        epidemiologia:
          "42% dos meninos e 27% das meninas sofrem pelo menos uma fratura antes dos 16 anos. Incidência de ~2% de fraturas/ano. Membros superiores representam 2/3 das fraturas; rádio distal é o mais fraturado. Fraturas fisárias correspondem a ~20% de todas; expostas ~2%; múltiplas ~4%. Crianças mais jovens tendem a fraturas metadiafisárias; adolescentes se aproximam do padrão adulto.",
        classificacao: [
          {
            sistema: "Fraturas Incompletas (exclusivas da infância)",
            itens: [
              "Deformidade plástica: falha microscópica sem linha de fratura visível; osso encurva sem fraturar — remodelamento lento, pode exigir redução se angulação grave",
              "Fratura em galho verde (greenstick): cortical fratura em um lado, oposta se dobra — periósteo íntegro do lado da tensão; pode necessitar de fratura deliberada para estabilizar a redução",
              "Fratura em tórus (buckle): compressão axial→ cortical 'amassa' sem fratura completa; metacarpos/rádio distal; autolimitada — imobilização 3–4 sem",
            ],
          },
          {
            sistema: "Classificação de Salter-Harris (lesões fisárias)",
            itens: [
              "Tipo I: transepifisária pura, sem fragmento metafisário; neonatos/lactentes; zona hipertrófica — risco baixo de distúrbio de crescimento se diagnóstico correto",
              "Tipo II: MAIS COMUM (75%); fragmento de Thurston-Holland na metáfise do lado da compressão; risco baixo de arresto de crescimento com redução adequada",
              "Tipo III: intra-articular; atravessa fise → epífise; necessita redução anatômica (<2 mm de degrau); fixação com parafuso paralelo à fise",
              "Tipo IV: corte vertical que cruza metáfise, fise e epífise; alto risco de barra fisária por contato osso-a-osso; redução anatômica obrigatória; parafuso deve cruzar a fise",
              "Tipo V: compressão axial da fise — invisível inicialmente; diagnóstico retrospectivo (≥6 meses); crescimento comprometido; sem tratamento específico inicial",
              "Tipo VI (Mercer Rang): lesão periférica do anel pericondrail de Ranvier; angular deformity localizada; muito rara",
              "Peterson Tipo I: fratura metafisária adjacente sem extensão epifisária; mais frequente de todas as lesões fisárias; apenas 5% cursam com distúrbio de crescimento",
            ],
          },
          {
            sistema: "Biomecânica da fise",
            itens: [
              "Zona mais fraca: células hipertróficas (pré-ossificação) — plano de clivagem da maioria das lesões SH I/II",
              "Processos mamilares e lappets: irregularidades que aumentam a resistência ao cisalhamento — fise distal do fêmur tem a maioria → explica risco maior de arresto mesmo em SH I/II distal femoral",
              "Reforço periférico: sulco pericondrail de Ranvier + anel de Lacroix fornecem suporte circunferencial",
            ],
          },
        ],
        mecanismo:
          "Periósteo espesso e altamente osteogênico age como 'dobradiça' nas fraturas incompletas e como contentor nas completas. Ligamentos em crianças são mais resistentes que a fise → lesão ligamentar verdadeira é rara antes do fechamento fisário (descartar SH antes de diagnosticar entorse).",
        tx_nao_cirurgico: [
          "Imobilização em tala (splint) inicialmente se edema significativo, lesão de pele ou ferimentos adjacentes — gesso definitivo após redução do edema (24–72h)",
          "Fraturas em tórus e galho verde estável: gesso braquiopalmar ou bota 3–4 semanas; seguimento com RX a cada 1–2 semanas",
          "Analgesia/sedação: bloqueio do hematoma (lidocaína 1–2%, máx 3–5 mg/kg, máx 10 mL no punho) — contraindicado em galho verde, fisárias e fraturas com >48h; IVRA (Bier block): punho/antebraço, torniquete ≥20 min; cetamina IV 1–2 mg/kg ou IM 4 mg/kg + atropina — adicionar midazolam 0,05 mg/kg se >10 anos (reações de emergência)",
          "PoliTrauma / Damage Control Ortopédico (DCO): estabilização temporária com fixador externo ou tração se GCS <8 com PIC >30 mmHg, coagulopatia, acidose ou hipotermia; estabilização definitiva em 1–2 dias (raramente até 6 dias)",
        ],
        tx_cirurgico: [
          "Fraturas instáveis após redução, angulação residual inaceitável ou redução fechada impossível",
          "Fraturas articulares (SH III/IV) com degrau >2 mm",
          "Fraturas expostas com contaminação: desbridamento <24h (se ATB administrado no PS, <6h vs >7h não altera taxa de infecção); VAC para controle de partes moles",
          "Síndrome compartimental: diagnóstico pelos '3 As' — agitação, ansiedade, analgesia crescente (sinais clássicos tardios — '5 Ps' menos confiáveis em crianças); pressão ≥30 mmHg ou dentro de 30 mmHg da pressão diastólica → fasciotomia de emergência sem demora",
        ],
        cirurgias: [
          "Hastes elásticas intramedulares (ESIN/TEN): implante preferencial em crianças — atua como 'tala interna' sem comprometer a fise; fêmur, tíbia, rádio, ulna",
          "Fios de Kirschner lisos (não rosqueados): evitar fios que cruzem a fise de forma permanente — remover após consolidação",
          "Fixação com parafuso epifisário paralelo à fise (SH III): não cruzar a fise com parafuso; parafusos cannulados 4,0 ou 4,5 mm",
          "Fasciotomia de antebraço: via de Henry (anterior) ou ulnar volar (McConnell) — 4 compartimentos do antebraço",
          "Fasciotomia da perna: dois acessos (anterolateral + posteromedial) para abertura dos 4 compartimentos — NÃO elevar o membro acima do coração (reduz PAM → piora isquemia)",
          "Ressecção de barra fisária (physeal bar): indicada se <50% da fise comprometida, angulação <20° e ≥2 anos de crescimento restante; interpor gordura, crylac ou PMMA; distração fisária se <40%; associar osteotomia se deformidade angular presente",
          "Epifisiodese contralateral: discrepância 2–5 cm com ≥2 anos de crescimento; ulna para forearm shortening; fíbula distal para tíbia",
          "Alongamento ósseo: discrepância >5 cm",
        ],
        complicacoes: [
          "⚠️ Lovell & Winter (cap. 31) diverge de Rockwood quanto à taxa de distúrbio de crescimento: L&W cita 15–30% de todas as fraturas fisárias, mas apenas 1–10% resultam em arresto clinicamente significativo; Rockwood tende a subestimar o risco — aumentar vigilância nos tipos III/IV e na fise distal do fêmur (arresto em até 50%)",
          "Síndrome compartimental: isquemia irreversível em 4–6 horas; erro clássico = elevação do membro (prejudica perfusão); bivalvar/fender o gesso como 1ª medida",
          "Overgrowth simétrico (superestimulação): fêmur diafisário em crianças 2–10 anos → média 0,9 cm (amplitude 0,4–2,4 cm); não tratar profilaticamente com sobreposição intencional >1 cm",
          "Overgrowth assimétrico (valgo): fratura metafisária proximal da tíbia (fratura de Cozen) → valgo progressivo em 1–2 anos; geralmente autocorrétivo — observar até 2–3 anos antes de intervir",
          "Remodelamento: 3 pré-requisitos — (1) fratura próxima à fise ativa, (2) angulação no plano de movimento da articulação, (3) ≥2 anos de crescimento restante; malunião rotacional NÃO remodela — corrigir na aguda",
          "Barra fisária (physeal bar): padrões de Peterson — periférica → angular; central → tenting/distorção articular; linear (linha antiga SH IV) → angular + articular; diagnóstico: RNM 3D fat-sat (spoiled gradient echo); linha de Harris oblíqua = arresto parcial; seguimento mínimo 18 meses",
          "Maus-tratos (NAI): fraturas patognomônicas — corner/bucket-handle metafisário, costelas posteriores múltiplas (<3 anos: VPP 100%), crânio complex/bilateral; survey radiológico completo obrigatório (não 'babygram'); equipe multidisciplinar — ortopedia, radiologia, oftalmologia (hemorragia retiniana), neurocirurgia, genética, serviço social",
          "Pseudartrose: extremamente rara após fratura fechada em crianças — investigar sempre causa subjacente (NAI, OI, tumoral)",
        ],
        fontes: [
          "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 31",
          "Rockwood — Fraturas em Crianças, 9ª ed., cap. 1, 2 e 7",
          "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
        ],
      },
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
        subtitulo: "Rockwood — Fraturas em Crianças · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 32 · Tachdjian's",
        epidemiologia:
          "Segunda fratura mais comum do cotovelo pediátrico (~10–20%). Pico: 6 anos. Causa principal de cubitus valgus tardio se não tratada adequadamente. Alta taxa de não-união conservadora quando deslocada.",
        classificacao: [
          {
            sistema: "Weiss (preferida por Lovell & Winter, cap. 32)",
            itens: [
              "⚠️ Lovell & Winter (cap. 32) recomenda Weiss como classificação clínica principal — Milch considerada de confiabilidade limitada e uso clínico restrito.",
              "Tipo I: deslocamento <2 mm — conservador se superfície articular íntegra",
              "Tipo II: deslocamento ≥2 mm + superfície articular íntegra (confirmada por artrografia ou RMN) — risco de progressão até 30% nas primeiras 2 semanas → controle radiológico semanal por 2 semanas obrigatório",
              "Tipo III: deslocamento ≥2 mm + ruptura da superfície articular — cirurgia sempre",
            ],
          },
          {
            sistema: "Jakob / Milch (referência histórica)",
            itens: [
              "Tipo I (Milch I): fratura lateral ao sulco trocoide — articulação cotovelo estável",
              "Tipo II (Milch II): fratura pelo sulco / tróclea — instável, luxação potencial",
              "⚠️ Lovell & Winter afirma que a classificação de Milch é pouco reprodutível inter-observadores e tem utilidade clínica limitada; a classificação de Weiss é mais adequada para guia terapêutico",
            ],
          },
          {
            sistema: "Deslocamento (guia terapêutico)",
            itens: [
              "<2 mm (Weiss I): gesso braço-palmar + controle radiológico semanal por 2 semanas",
              "≥2 mm + articular íntegra (Weiss II): artrografia via fossa olecraneana (abordagem posterior — NÃO lateral, para não obscurecer o fragmento) confirma superfície; se íntegra → gesso + controle seriado rigoroso",
              "≥2 mm + ruptura articular (Weiss III): cirurgia",
            ],
          },
        ],
        mecanismo:
          "Estresse em valgo + avulsão pelo extensor comum dos dedos. A fise distal lateral do úmero (lateral condilar) ainda é cartilaginosa → o deslocamento real é subestimado no RX simples. Contribuição de crescimento do úmero distal é apenas 2–3 mm/ano após os 7 anos — distúrbio de crescimento por fratura condral é mais frequente do que historicamente reconhecido.",
        tx_nao_cirurgico: [
          "Fratura não deslocada (<2 mm, Weiss Tipo I) confirmada por RMN ou artrografia: gesso braquio-palmar 4–6 semanas",
          "Controle radiológico semanal por 2 semanas obrigatório: até 30% das fraturas Weiss Tipo I progridem para deslocamento dentro de 15 dias (Lovell & Winter cap. 32)",
          "Artrografia: abordagem posterior via fossa olecraneana (NÃO lateral — evita obscurecer a anatomia do fragmento condilar)",
        ],
        tx_cirurgico: [
          "Deslocamento ≥2 mm com ruptura articular (Weiss Tipo III)",
          "Progressão do deslocamento no controle seriado (Weiss I → II/III)",
          "Instabilidade articular (Milch II / Weiss III)",
          "Não-união (apresentação tardia)",
        ],
        cirurgias: [
          "Redução aberta + fios K (2 fios paralelos pela cartilagem condral)",
          "Parafuso canulado 4 mm (criança >8 anos, fragmento grande)",
          "Não-união crônica: enxerto ósseo + placa — aceitar deformidade em valgo leve se >2 anos de evolução",
        ],
        complicacoes: [
          "Não-união (fragmento avascular, instabilidade persistente)",
          "Cubitus valgus → compressão tardia do nervo ulnar (paralisia tardia do ulnar)",
          "Rigidez do cotovelo",
          "Necrose avascular do capítulo (vascularização retrógrada — cautela com redução aberta)",
          "Fechamento fisário prematuro — mais frequente do que classicamente estimado, especialmente em fraturas condrais (Lovell & Winter cap. 32); contribuição de crescimento do úmero distal é pequena (2–3 mm/ano após 7 anos), mas distúrbio é relevante",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed.", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 32", "Tachdjian's Pediatric Orthopaedics, 5ª ed."],
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
          "Varo do colo (coxa vara) — encurtamento e claudicação",
          "Retardo de crescimento / coxa breva",
          "Consolidação viciosa",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed.", "Tachdjian's Pediatric Orthopaedics, 5ª ed."],
      },
      {
        id: "antebraco-ped",
        titulo: "Fratura do Antebraço Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 32 · Tachdjian's",
        epidemiologia:
          "Fraturas do rádio e/ou ulna são as fraturas mais comuns em crianças (~40% de todas as fraturas pediátricas). Pico: 10–14 anos. Mais frequentes no terço distal (metáfise). A fratura fisária distal do rádio corresponde a ~15% de todas as fraturas do antebraço, com 70% ocorrendo após os 10 anos; >95% são Salter-Harris I ou II.",
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
            sistema: "Metáfise Distal do Rádio — distinção clínica essencial (Lovell & Winter cap. 32)",
            itens: [
              "Fratura em toro (buckle): impacção de apenas uma cortical — padrão estável; tala por 3 semanas; sem necessidade de RX de controle subsequente",
              "Fratura em galho verde (greenstick) bicortical: risco de reangulação secundária — controle radiológico obrigatório com RX aos 7 e 14 dias",
              "Fratura completa (bicortical): instável, propensa à perda de redução — reavaliação seriada",
            ],
          },
          {
            sistema: "Galho Verde vs. Completa",
            itens: [
              "Greenstick: cortical de um lado rompe, outro dobra — angulação sem perda de contato",
              "Completa: ambas as corticais rompidas — mais deslocamento, mais instável",
              "Plástica / Torus (bojo): impacção da cortical sem fratura linear — mais estável",
            ],
          },
        ],
        mecanismo:
          "Queda sobre mão estendida (FOOSH — fall on outstretched hand). Força de compressão axial + momento de dobramento. Força em pronação → fratura de Monteggia. Força de torção → fratura em espiral.",
        tx_nao_cirurgico: [
          "Fratura distal em toro (buckle): tala removível por 3 semanas — estável, sem necessidade de RX de controle adicional (Lovell & Winter cap. 32)",
          "Fratura distal bicortical (greenstick/completa): diferente do toro — controle com RX aos 7 e 14 dias para detectar reangulação precoce",
          "Greenstick distal com angulação ≤20°: gesso braço-palmar por 4–6 semanas",
          "Fratura completa do terço distal reduzível e estável: gesso 6 semanas",
          "Limiares de angulação aceitável (dorsal) por faixa etária — Lovell & Winter cap. 32: <5 anos até 35°; 5–12 anos 20–25°; >12 anos 10–15°",
          "Desvio no plano coronal remodela menos: aceitar <15° em <12 anos; <10° em maiores",
          "Cast index (CI): CI >0,7 indica gesso mal moldado com risco elevado de perda de redução — requerir modelagem adequada",
          "Gesso curto (braquio-palmar) tão eficaz quanto gesso longo (braquio-umeral) quando bem moldado (Lovell & Winter cap. 32)",
          "Posicionar o antebraço em supinação ao aplicar o gesso — contrabalança o braquiorradial e reduz a reangulação dorsal",
        ],
        tx_cirurgico: [
          "Fratura diafisária deslocada irredutível ou instável",
          "Angulação >15° no terço médio ou proximal",
          "Monteggia: qualquer tipo (redução urgente da cabeça do rádio)",
          "Fratura aberta",
          "Politrauma / cotovelo flutuante (fratura ipsilateral do antebraço + supracondilar)",
          "Fratura fisária SH III/IV: redução anatômica necessária (degrau articular >2 mm); não tentar manipulação após 7–10 dias — risco de lesão fisária adicional",
        ],
        cirurgias: [
          "Fios K intramedulares flexíveis (ESIN/TEN): padrão para diáfise",
          "Redução fechada + gesso: terço distal, maioria dos casos estáveis",
          "Redução aberta + placa: raramente necessária em criança, exceto falha do ESIN",
          "Monteggia: redução da ulna reposiciona a cabeça do rádio — se cabeça irredutível → redução aberta",
          "Múltiplas tentativas de redução fisária: contraindicadas (>2 tentativas associadas a parada de crescimento em >25% dos casos — Lovell & Winter cap. 32)",
        ],
        complicacoes: [
          "Síndrome compartimental (diafisária completa, muito inchada — fasciotomia de urgência)",
          "Lesão do nervo interósseo posterior (NIP) — Monteggia Tipo I e III",
          "Nova angulação / perda de redução (mais comum no terço distal — principalmente bicortical; toro é estável)",
          "Deformidade rotacional (limitação de prono-supinação)",
          "Consolidação viciosa e sinostose radioulnar (lesão da membrana interóssea)",
          "Parada de crescimento fisária distal do rádio: risco geral 4,4%; mais frequente em SH III/IV e após múltiplas manipulações; malunião fisária com grande remodelamento — observar 6–12 meses antes de osteotomia",
          "Fratura de Galeazzi: suspeitar quando fratura isolada do rádio associada à fratura do estiloide ulnar",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed.", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 32", "Tachdjian's Pediatric Orthopaedics, 5ª ed."],
      },
      {
        id: "epicondilo-medial-ped",
        titulo: "Fratura do Epicôndilo Medial e Luxação do Cotovelo",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 16",
        epidemiologia:
          "Representa 11–20% das fraturas do cotovelo pediátrico. Pico: 9–14 anos. Associada à luxação do cotovelo em ~50% dos casos — o fragmento pode ser arrastado para dentro da articulação na redução (incarceração). Nervo ulnar lesado em 10–15% dos casos.",
        classificacao: [
          {
            sistema: "Deslocamento (guia cirúrgico)",
            itens: [
              "<5 mm sem luxação: conservador (maioria dos centros)",
              "≥5 mm: cirurgia recomendada",
              "Fragmento incarcerado intra-articular: cirurgia sempre",
              "Com luxação associada: indicação mais liberal independente do desvio",
              "Atleta de arremesso/ginasta: cirurgia mesmo com <5 mm",
            ],
          },
          {
            sistema: "Luxação do Cotovelo Pediátrico",
            itens: [
              "Posteromedial: mais comum",
              "Sempre verificar RX pós-redução para excluir incarceração do epicôndilo",
              "Instabilidade residual após redução: indicação de reparo ligamentar",
            ],
          },
        ],
        mecanismo:
          "Valgo + tração muscular do flexor comum → avulsão do epicôndilo. Na luxação: hiperextensão + valgo → LCM avulsiona o epicôndilo → cotovelo luxa. Risco de incarceração: fragmento arrastado para dentro da articulação durante a redução.",
        tx_nao_cirurgico: [
          "Desvio <5 mm sem luxação: tala a 90° por 2–3 semanas + fisioterapia precoce",
          "Cotovelo pediátrico recupera amplitude de movimento mais rápido que o adulto — não imobilizar >3 semanas",
        ],
        tx_cirurgico: [
          "Fragmento incarcerado intra-articular (sempre)",
          "Desvio ≥5 mm",
          "Instabilidade do cotovelo após redução da luxação",
          "Déficit neurológico do ulnar progressivo",
          "Atleta de alta demanda",
        ],
        cirurgias: [
          "Redução fechada da luxação primeiro (tração + supinação + flexão)",
          "SEMPRE verificar RX pós-redução — epicôndilo pode estar incarcerado",
          "RAFI: fio K ou parafuso canulado 4 mm (paralelo ao eixo do epicôndilo)",
          "Reparo do LCM se instabilidade lateral residual",
        ],
        complicacoes: [
          "Lesão do nervo ulnar (10–15%) — parestesia 4°–5° dedos; maioria transitória",
          "Incarceração intra-articular do fragmento (diagnóstico em RX pós-redução)",
          "Rigidez do cotovelo — fisioterapia precoce é fundamental",
          "Instabilidade residual lateral (rara com tratamento adequado)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 16"],
      },
      {
        id: "clavicula-ped",
        titulo: "Fratura da Clavícula Pediátrica",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 20 · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 32",
        epidemiologia:
          "Uma das fraturas mais comuns em crianças e adolescentes (8–15% de todas as fraturas pediátricas). Também a fratura mais frequente no parto por trauma obstétrico. Terço médio: 80–85% dos casos. Grande maioria tem excelente resultado com tratamento conservador. Atenção diferencial: pseudartrose congênita da clavícula — indolor, habitualmente à direita, sem formação de calo de consolidação e sem história de trauma — não confundir com fratura de parto.",
        classificacao: [
          {
            sistema: "Topografia (Allman)",
            itens: [
              "Grupo I: terço médio (diáfise) — mais comum; conservador quase sempre",
              "Grupo II: terço lateral — instável se ligamentos CC rompidos (análogo à luxação AC)",
              "Grupo III: terço medial — raro; TC para avaliar separação fisária esternoclavicular (fise fecha aos 20–25 anos)",
            ],
          },
          {
            sistema: "Terço Lateral (Craig) — guia cirúrgico",
            itens: [
              "Tipo I: lateral aos ligamentos CC (estável) → conservador",
              "Tipo II: medial aos CC (instável — ligamentos rompidos) → RAFI",
              "Tipo V: periosteal em crianças (fise cartilaginosa) — avaliação individualizada",
            ],
          },
          {
            sistema: "Separação Fisária Medial (Salter-Harris I — terço medial)",
            itens: [
              "Fise esternoclavicular fecha entre 20–25 anos → em adolescentes, 'luxação' esternoclavicular é quase sempre separação fisária SH I",
              "Deslocamento posterior: emergência — risco de compressão de estruturas mediastinais (traqueia, vasos); TC obrigatória",
              "Redução fechada eficaz até 48h do trauma — realizar em centro cirúrgico com cirurgião torácico/vascular disponível",
              "Deslocamento anterior: geralmente benigno; tratamento conservador na maioria dos casos",
            ],
          },
        ],
        mecanismo:
          "Queda sobre o ombro (impacto direto) ou sobre mão estendida. RN: compressão durante parto (distócia de ombro). Pseudoparalisia do membro superior em RN por dor pode simular paralisia do plexo braquial.",
        tx_nao_cirurgico: [
          "RN: sem imobilização — roupas com cuidado por 2–3 semanas; consolidação espontânea garantida",
          "Crianças e adolescentes: tipoia simples 3–6 semanas; aceitável angulação ≤20–25° e encurtamento ≤1,5 cm (remodelarão)",
          "Terço lateral Tipo I: tipoia 3–4 semanas",
          "Separação fisária medial anterior: tipoia 4–6 semanas; excelente prognóstico",
        ],
        tx_cirurgico: [
          "Terço lateral Tipo II (instável — ligamentos CC rompidos)",
          "Fratura aberta ou iminência de perfuração cutânea",
          "⚠️ Lovell & Winter (cap. 32) indica RAFI para adolescentes próximos à maturidade esquelética com deslocamento >100% (sobreposição completa) ou encurtamento >2 cm de diáfise — diverge de Rockwood, que mantém conduta mais conservadora nessa faixa etária",
          "Lesão vascular ou do plexo braquial associada",
          "Separação fisária medial posterior com compressão de estruturas torácicas (emergência)",
        ],
        cirurgias: [
          "Placa pré-moldada superior para clavícula (terço médio, adolescente)",
          "Ganchos ou parafusos coracoclaviculares (terço lateral Tipo II)",
          "Fio intramedular (menos usado — risco de migração)",
          "Separação medial posterior: redução fechada em centro cirúrgico com backup vascular; se irredutível → redução aberta",
        ],
        complicacoes: [
          "Calo hipertrófico (muito frequente em crianças — remodela em 6–12 meses, preocupação estética)",
          "Lesão do plexo braquial (rara, geralmente transitória)",
          "Lesão da artéria ou veia subclávia (terço médio com desvio inferior grave; separação medial posterior)",
          "Síndrome do desfiladeiro torácico (calo exuberante — raro)",
          "Pseudartrose pós-traumática (rara em crianças — distinguir de pseudartrose congênita: esta é indolor, à direita, sem calo)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 20", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 32"],
      },
      {
        id: "femur-diafise-ped",
        titulo: "Fratura Diafisária do Fêmur Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 25 · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33",
        epidemiologia:
          "Fratura de osso longo mais comum em crianças. Distribuição bimodal: pico em 2–3 anos (baixa energia) e adolescentes (alta energia). <2 anos: sempre investigar maus-tratos (NAI) — prevalência de 40–50% em <1 ano e 10–30% em 1–3 anos. Sobrecrescimento médio ~1 cm (L&W cap. 33): esperado em crianças de 2–9 anos; raramente observado em meninas >8 anos ou meninos >10 anos.",
        classificacao: [
          {
            sistema: "Tratamento por faixa etária (padrão atual)",
            itens: [
              "<6 meses: gesso espica imediata (posição de rã)",
              "6 meses–5 anos: gesso espica de quadril (imediata ou após tração 24–48h); aceitável angulação ≤20°, encurtamento ≤2 cm",
              "5–11 anos: ESIN (hastes elásticas de titânio) — padrão ouro",
              ">11 anos ou >50 kg: haste intramedular bloqueada (entrada trocantérica — evitar retrógrada por risco de NAO)",
            ],
          },
          {
            sistema: "Winquist-Hansen (cominuição)",
            itens: [
              "Tipo 0–I: sem/mínima cominuição — estável",
              "Tipo II: cominuição <50% da cortical",
              "Tipo III–IV: cominuição >50–100% — instável; cuidado ao indicar ESIN isolado",
            ],
          },
          {
            sistema: "Situações Especiais (L&W cap. 33)",
            itens: [
              "Fratura subtrocantérica: fragmento proximal em flexão + abdução + rotação externa (puxado por iliopsoas, abdutores, rotadores externos); gesso espica em posição sentada (sitting spica) em <5 anos; cirurgia em >5 anos ou com deformidade",
              "Floating knee (fêmur + tíbia ipsilateral): fixação cirúrgica de ambas as fraturas indicada na maioria dos casos; risco de lesão ligamentar do joelho em ~10% dos casos",
              "⚠️ Haste via fossa piriforme CONTRAINDICADA em <11 anos — risco de necrose avascular da cabeça femoral (NAO) e deformidade do fêmur proximal (L&W cap. 33 vs Rockwood); haste com entrada trocantérica lateral é a alternativa segura para crianças >8 anos com canal IM adequado",
            ],
          },
        ],
        mecanismo:
          "Baixa energia em criança pequena: espiral por torção. Alta energia em adolescente: transversa ou cominutiva. Rotação forçada em lactente → investigar NAI. Fratura subtrocantérica: alta energia (>5 anos) ou trauma de torção (<5 anos).",
        tx_nao_cirurgico: [
          "<6 meses: gesso espica imediata — 98% de bom resultado",
          "6 meses–5 anos: gesso espica após redução; tração cutânea de Bryant prévia (<2 anos, <12 kg) se muito inchado",
          "Fratura subtrocantérica em <5 anos: gesso espica em posição sentada ('sitting spica') — controla rotação e abdução do fragmento proximal",
        ],
        tx_cirurgico: [
          "5–11 anos: ESIN (padrão)",
          ">11 anos / >50 kg: haste intramedular bloqueada (trocantérica)",
          "Politrauma / TCE: fixação precoce independente da idade",
          "Fratura aberta, floating knee (fêmur + tíbia ipsilateral) — fixação de ambas",
          "Fratura subtrocantérica com malalinhamento em >5 anos: haste trocantérica ou placa proximal de fêmur pediátrico",
        ],
        cirurgias: [
          "ESIN (Elastic Stable Intramedullary Nailing): 2 hastes de titânio 3,5–4 mm via fossa supracondilar bilateral — padrão 5–11 anos",
          "Haste intramedular bloqueada (entrada trocantérica lateral) — adolescente ou >50 kg",
          "Gesso espica com redução — lactentes e crianças pequenas",
          "Gesso espica em posição sentada — fratura subtrocantérica em <5 anos",
          "Fixação externa — fratura exposta grave ou politrauma",
        ],
        complicacoes: [
          "Overgrowth (sobrecrescimento ~1 cm): em 2–9 anos com ESIN ou gesso — aceitar discrepância 1 cm pré-op; não ocorre rotineiramente em meninas >8 anos ou meninos >10 anos (L&W cap. 33)",
          "Malalinhamento rotacional ou angular",
          "Falha/migração dos fios ESIN em fraturas cominutivas instáveis",
          "Necrose da cabeça femoral (NAO): associada à haste via fossa piriforme em fêmur imaturo — EVITAR; haste trocantérica tem menor risco",
          "Floating knee: 10% de lesão ligamentar do joelho associada; controle clínico e radiológico obrigatório do joelho após consolidação",
          "Fratura subtrocantérica: desvio em flexão + abdução + rotação externa do fragmento proximal dificulta redução; mau alinhamento residual em gesso inadequado",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 25", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33"],
      },
      {
        id: "fise-distal-femur",
        titulo: "Fratura da Fise Distal do Fêmur",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 26 · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33",
        epidemiologia:
          "Grave porque a fise distal contribui com ~70% do crescimento longitudinal do fêmur (9 mm/ano) e ~38% do comprimento total do membro. Salter-Harris II é o padrão mais frequente (65%). Taxa clássica de distúrbio de crescimento: 20–40%. ⚠️ Lovell & Winter (cap. 33) cita estudos com taxas de até 50% mesmo em SH I e SH II, particularmente em crianças de 2–11 anos — grupo etário de maior risco; lactentes e adolescentes em fechamento fisário apresentam melhor prognóstico. Cominuição metafisária associada ao fragmento de Thurston-Holland é fator prognóstico desfavorável.",
        classificacao: [
          {
            sistema: "Salter-Harris",
            itens: [
              "Tipo I: separação fisária pura (lactente — frequentemente por trauma obstétrico); lactentes têm capacidade de remodelação excepcional, distúrbio de crescimento raro nessa faixa",
              "Tipo II: mais comum; fragmento metafisário medial (Thurston-Holland) — redução fechada se <2 mm de passo articular; vigilância rigorosa na 1ª semana (deslocamento secundário possível)",
              "Tipo III: condilar lateral ou medial — intra-articular, redução anatômica obrigatória",
              "Tipo IV: linha vertical atravessa metáfise + fise + epífise — pior prognóstico de crescimento",
            ],
          },
        ],
        mecanismo:
          "Alta energia: hiperextensão (deslocamento anterior da epífise), valgus/varus. Risco vascular: artéria poplítea situa-se anterior à cápsula posterior — risco em deslocamento anterior da epífise. Trauma obstétrico em neonato: separação SH I com epífise não ossificada — diagnóstico por US ou RNM.",
        tx_nao_cirurgico: [
          "SH I–II não deslocadas ou mínimas: gesso joelho em extensão 4–6 semanas",
          "SH II deslocada: redução fechada (AG) + gesso se estável; se instável → fixação percutânea",
          "Após redução: nova radiografia em 5–7 dias obrigatória (deslocamento secundário frequente antes de consolidação do calo)",
        ],
        tx_cirurgico: [
          "SH III–IV: redução anatômica obrigatória (passo articular ≤2 mm) + fixação",
          "SH II deslocada irredutível ou instável após redução fechada",
          "Lesão vascular da artéria poplítea (urgência cirúrgica)",
        ],
        cirurgias: [
          "Fios K percutâneos (preferencialmente epifisários — não atravessar fise em criança com crescimento residual)",
          "Parafusos canulados epifisários horizontais paralelos à fise (SH III–IV)",
          "Exploração e reparo vascular se lesão da poplítea",
        ],
        complicacoes: [
          "Barra fisária (pontes ósseas): deformidade angular progressiva ou discrepância de comprimento; ⚠️ L&W cap. 33 — taxas de até 50% em SH I e II em 2–11 anos (maior que o classicamente ensinado); RNM da fise com sequências de cartilagem (3D DESS ou STIR) em 4–6 meses pós-fratura para detecção precoce de barra fisária",
          "Lesão da artéria poplítea (3–5%) — pulso obrigatório antes e após redução; arteriografia ou US Doppler se pulso ausente",
          "Lesão do nervo fibular comum ou tibial",
          "Deslocamento secundário pós-redução em SH II: nova RX em 5–7 dias da redução",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 26", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33"],
      },
      {
        id: "tibia-fibula-diafise-ped",
        titulo: "Fratura Diafisária de Tíbia e Fíbula Pediátrica",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 29 · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33",
        epidemiologia:
          "Segunda fratura de membro inferior mais comum em crianças. Toddler's fracture (fratura espiral isolada da tíbia): criança ambulante 1–3 anos, baixa energia; ~20% das crianças com claudicação aguda têm fratura oculta, metade na tíbia (L&W cap. 33); RX negativo em até 40% (pedir incidência oblíqua ou cintilografia). Fratura de ambos os ossos: geralmente alta energia. Sobrecrescimento médio apenas 4,35 mm (significativamente menor que no fêmur) — não ocorre rotineiramente em meninas >8 anos ou meninos >10 anos.",
        classificacao: [
          {
            sistema: "Topografia e padrão",
            itens: [
              "Toddler's fracture: espiral isolada da tíbia, diagnóstico clínico em criança com claudicação/recusa a caminhar",
              "Fratura metáfise proximal (Cozen): risco de valgus tardio progressivo — começa semanas após a fratura; resolução espontânea em maioria <5 anos",
              "Fratura diáfise tíbia + fíbula: mais grave, risco de síndrome compartimental",
              "Fratura metáfise distal: acima do tornozelo — distinto das fraturas fisárias",
            ],
          },
          {
            sistema: "Limites de Remodelação (L&W cap. 33)",
            itens: [
              "Plano sagital: angulação anterior até 12°, posterior até 6°",
              "Plano coronal: varo até 10°, valgo até 8°",
              "Crianças <6 anos: até ~15° em qualquer plano podem ser aceitos",
              "Deformidade rotacional: NÃO remodelar de forma confiável — redução cuidadosa é obrigatória",
              "Encurtamento: ≤1 cm aceitável (sobrecrescimento médio apenas 4,35 mm — L&W cap. 33)",
            ],
          },
        ],
        mecanismo:
          "Toddler's fracture: rotação com pé fixo no solo (queda, pisar em falso). Alta energia: acidente de veículo, impacto direto (bumper fracture). Compartimento anterior da perna é limitado → risco de síndrome compartimental. Fratura da metáfise proximal isolada da tíbia (sem fíbula): valgus tardio por hipervascularização periosteal medial.",
        tx_nao_cirurgico: [
          "Toddler's fracture: gesso joelho-tornozelo longo 6 semanas — retorno rápido à deambulação",
          "Fratura isolada da tíbia dentro dos limites de remodelação: gesso longo com controle RX seriado",
          "Angulação aceitável: ≤12° sagital anterior, ≤6° posterior, ≤10° varo, ≤8° valgo; crianças <6 anos — até 15° em qualquer plano",
          "Fratura estável de ambos os ossos: gesso longo 8–10 semanas",
        ],
        tx_cirurgico: [
          "Fratura instável/irredutível de ambos os ossos (angulação fora dos limites ou rotacional)",
          "Fratura aberta",
          "Síndrome compartimental (fasciotomia de urgência antes da fixação)",
          "Floating knee (fêmur + tíbia ipsilateral)",
        ],
        cirurgias: [
          "ESIN (hastes elásticas) — fratura diafisária instável, 5–14 anos; resultados ligeiramente superiores ao fixador externo em fraturas de alta energia (L&W cap. 33)",
          "Fixação externa — fratura exposta grave ou com fasciotomia",
          "Haste intramedular bloqueada — adolescente >14 anos com fise fechada",
          "Fasciotomia de 4 compartimentos (anterior, posterior superficial, posterior profundo, lateral fibular)",
          "Hemiepifisiodese temporária (grampos ou placa em tensão) — fratura de Cozen com valgus >15° sem melhora espontânea em 12 meses (evitar osteotomia — alta taxa de recorrência do valgus)",
        ],
        complicacoes: [
          "Síndrome compartimental — diagnóstico clínico (5 Ps); medição de pressão compartimental se dúvida; fasciotomia de urgência",
          "Fratura de Cozen (metáfise proximal da tíbia): valgus progressivo em >70% dos casos; inicia semanas após a fratura; resolução espontânea na maioria em 12–18 meses; hemiepifisiodese temporária se >15° persistir (L&W cap. 33); osteotomia tem alta taxa de recorrência — evitar",
          "Fratura fisária da tíbia proximal: distúrbio de crescimento em 25–33% independente do tipo Salter-Harris (L&W cap. 33) — lesão da artéria poplítea associada em hiperextensão",
          "Lesão do nervo fibular comum (fratura proximal da fíbula)",
          "Desvio rotacional residual: não remodelar — controlar na redução inicial",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 29", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33"],
      },
      {
        id: "nai-fraturas-patologicas",
        titulo: "Fraturas Patológicas e Maus-Tratos (NAI)",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 7",
        epidemiologia:
          "Fraturas em osso patologicamente fragilizado ou por violência contra criança (NAI — Non-Accidental Injury). NAI: responsável por 12–25% das fraturas em < 2 anos; em < 12 meses, até 50–80% das fraturas são por maus-tratos. Fratura em osso patológico benigno: cisto ósseo simples (COS — 65% no úmero proximal), fibroma não ossificante, displasia fibrosa; maligno: Ewing, osteossarcoma.",
        classificacao: [
          {
            sistema: "Indicadores de Maus-Tratos (alto índice de suspeição)",
            itens: [
              "Criança não ambulante (< 12 meses) com fratura espiral de osso longo",
              "Fratura de costela posterior (ângulo) — altamente específica de NAI",
              "Fratura de metáfise de canto ('corner fracture' / 'bucket-handle') — patognomônica de sacudida",
              "Múltiplas fraturas em diferentes estágios de cicatrização (idades de evolução distintas)",
              "Fratura de crânio occipital, bilateral ou cruzando suturas",
              "Hematoma subdural + hemorragia retiniana = síndrome do bebê sacudido",
            ],
          },
          {
            sistema: "Fraturas Patológicas Benignas",
            itens: [
              "COS: úmero proximal 65%, fêmur proximal; 'fallen leaf sign' (fragmento no cisto)",
              "Fibroma Não Ossificante: geralmente incidental; risco se > 50% da cortical acometida",
              "Displasia Fibrosa: fêmur em 'shepherd's crook' (coxa vara por colapso progressivo)",
              "Osteogênese Imperfeita (OI): múltiplas fraturas de baixa energia, escleróticas azuladas, perda auditiva — diagnóstico diferencial obrigatório com NAI",
            ],
          },
        ],
        mecanismo:
          "NAI: sacudida violenta, impacto direto, torção forçada de membros. Fratura patológica: fragilidade óssea local (lesão) ou sistêmica (OI, Gaucher, hemofilia) → fratura com energia mínima ou espontânea.",
        tx_nao_cirurgico: [
          "Fratura em osso patológico estável: imobilização + vigilância da lesão subjacente",
          "COS: injeção percutânea de corticoide, osso desmineralizado ou substituto (controverso — alto índice de recidiva)",
          "Suspeita de NAI: estabilização da fratura + acionamento do conselho tutelar + avaliação de lesões associadas (TC crânio, fundo de olho, bone survey — RX esquelético completo)",
        ],
        tx_cirurgico: [
          "COS com fratura recorrente: ESIN para estabilização + curetagem/enxerto (úmero/fêmur)",
          "Displasia fibrosa femoral com deformidade: osteotomia corretiva + haste IM",
          "Fratura patológica maligna: biópsia + oncologia → cirurgia conforme estadiamento",
        ],
        cirurgias: [
          "ESIN (hastes elásticas) para COS com fratura recorrente do úmero proximal ou fêmur",
          "Curetagem + enxerto ósseo (ilíaco ou substituto) para lesões benignas sintomáticas recidivantes",
          "Bone survey completo (esqueleto todo) obrigatório em toda suspeita de NAI",
        ],
        complicacoes: [
          "Deformidade residual em osso doente (coxa vara na displasia fibrosa — 'shepherd's crook')",
          "Recorrência da fratura patológica (COS pode recrudescer durante crescimento)",
          "Diagnóstico tardio de NAI → novas agressões, sequelas neurológicas e óbito",
          "Neoplasia: prognóstico depende do tipo histológico e resposta à quimioterapia",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 7"],
      },
      {
        id: "mao-carpo-ped",
        titulo: "Fraturas da Mão e Carpo Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 8",
        epidemiologia:
          "Representam 25–30% de todas as fraturas pediátricas. Falanges e metacarpos são os mais frequentes. A epífise falângica é cartilaginosa — RX pode subestimar o deslocamento real. Fratura de Seymour (SH I da falange distal + laceração do eponíquio) é emergência ortopédica pelo risco de osteomielite. Fraturas do escafoide são raras em < 10 anos.",
        classificacao: [
          {
            sistema: "Topografia",
            itens: [
              "Falanges distais: Seymour (SH I + laceração periungueal — emergência); esmagamento da ponta",
              "Falanges médias e proximais: SH II mais comum; fratura condiliana (intra-articular); colo falangiano (risco de deformidade rotacional)",
              "Metacarpos: colo do 5° (Boxer's fracture — aceitável até 40° de angulação); base do 1° MTC (equivalente de Bennett pediátrico = SH II)",
              "Carpo: escafoide (raro < 10a; tratamento idêntico ao adulto em adolescente); demais ossos raramente fraturados",
            ],
          },
          {
            sistema: "Fratura de Seymour",
            itens: [
              "SH I ou II da falange distal com exposição da fise pelo eponíquio rompido",
              "Aparência de 'mallet finger' — mas a articulação IP distal está aberta",
              "Tratamento: exploração cirúrgica + redução + curativo + antibiótico (S. aureus)",
              "Se não tratada: osteomielite da falange distal, deformidade ungueal permanente",
            ],
          },
        ],
        mecanismo:
          "Esmagamento (portas, rodas), queda com torção digital, trauma direto. Mallet ósseo (avulsão do extensor terminal): golpe em dedo flexionado. Fratura condiliana da falange proximal: risco de subluxação articular se deslocada. Rotação digital deve ser avaliada sempre — dedos em flexão devem apontar todos para o escafoide.",
        tx_nao_cirurgico: [
          "Fratura não deslocada de falange: tala dinâmica (buddy-taping) 3–4 semanas",
          "Fratura do colo do 5° metacarpo (Boxer): aceitável 40° de angulação sagital — imobilização funcional",
          "Mallet ósseo: tala extensão da IFD por 6–8 semanas contínuas (sem interrupção)",
          "Escafoide não deslocado: gesso antebraço com polegar (thumb spica) 8–12 semanas",
        ],
        tx_cirurgico: [
          "Seymour: sempre exploração + desbridamento + redução + antibiótico",
          "Fratura condiliana deslocada (intra-articular): redução + fio K",
          "Deformidade rotacional (dedos sobrepostos) não redutível fechado",
          "Base do 1° metacarpo irredutível (equivalente Bennett)",
        ],
        cirurgias: [
          "Fio K percutâneo: falange condiliana, metacarpo base deslocado, equivalente Bennett",
          "Exploração + lavagem + redução + fio K ou parafuso: Seymour fracture",
          "Fio de Herbert ou parafuso canulado: escafoide deslocado em adolescente",
        ],
        complicacoes: [
          "Osteomielite da falange distal (Seymour não tratado — S. aureus)",
          "Deformidade rotacional ('dedo em saca-rolha' — fratura do colo da falange proximal)",
          "Rigidez digital (imobilização > 3–4 semanas prejudica resultados — mobilização precoce)",
          "Pseudo-boutonnière por lesão da placa volar da falange média não identificada",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 8"],
      },
      {
        id: "colo-radio-olecrano",
        titulo: "Fraturas do Colo do Rádio e Olécrano Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 11",
        epidemiologia:
          "Fraturas do colo do rádio: 5–10% das fraturas do cotovelo pediátrico; pico 9–10 anos. Frequentemente associadas a fratura do olécrano ou luxação do cotovelo (25–50%). Fratura do olécrano: rara; pode ser avulsão apofisária (tríceps) em pré-adolescente ou fratura completa em adolescente.",
        classificacao: [
          {
            sistema: "Judet / O'Brien (colo do rádio — angulação)",
            itens: [
              "Grau I: < 30° de angulação → conservador",
              "Grau II: 30–60° → redução percutânea (técnica de Judet)",
              "Grau III: 60–80° → redução percutânea obrigatória",
              "Grau IV: > 80° ou deslocamento completo → ESIN ou redução aberta se percutânea falha",
            ],
          },
          {
            sistema: "Fratura do Olécrano",
            itens: [
              "Avulsão apofisária (tríceps): pré-adolescente, não deslocada → conservador",
              "Fratura completa deslocada: fio K + banda de tensão ou parafuso",
              "Equivalente de Monteggia: fratura do olécrano + luxação da cabeça do rádio (cap. 12)",
            ],
          },
        ],
        mecanismo:
          "Queda sobre mão estendida em valgus → força de compressão entre capítulo e colo do rádio. Fratura do olécrano: queda direta sobre cotovelo flexionado (transversa) ou avulsão por contração brusca do tríceps.",
        tx_nao_cirurgico: [
          "Colo do rádio Grau I: gesso longo com cotovelo a 90° por 3 semanas",
          "Olécrano avulsão apofisária não deslocada: cotovelo a 90° por 4 semanas",
          "Após redução percutânea Grau II–III bem reduzida: gesso 3–4 semanas",
        ],
        tx_cirurgico: [
          "Colo do rádio Grau II–III: redução percutânea (técnica de Judet — fio K como alavanca no colo)",
          "Grau IV irredutível percutâneo: redução aberta (risco de NAV — mínima dissecção)",
          "Olécrano completo deslocado: fixação cirúrgica",
        ],
        cirurgias: [
          "Técnica de Judet (fio K percutâneo como alavanca no colo do rádio): gold standard Grau II–III",
          "ESIN intramedular do rádio (Metaizeau): alternativa para Grau III–IV — introduzido retrogradamente na diáfise",
          "Redução aberta: apenas quando percutânea falha (maior risco de NAV da cabeça do rádio)",
          "Parafuso ou banda de tensão: olécrano com fratura completa deslocada em adolescente",
        ],
        complicacoes: [
          "Limitação de prono-supinação (complicação mais frequente — proporcional à angulação residual do colo)",
          "Necrose avascular da cabeça do rádio (principalmente após redução aberta com dissecção extensa)",
          "Sinostose rádio-ulnar (rara mas devastadora — evitar lesão da membrana interóssea)",
          "Lesão do nervo interósseo posterior (ramo profundo do radial) — geralmente transitória",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 11"],
      },
      {
        id: "monteggia-ped",
        titulo: "Fratura-Luxação de Monteggia Pediátrica",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 12",
        epidemiologia:
          "Corresponde a 0,4–2% das fraturas do antebraço pediátrico. Pico: 4–10 anos. Diagnóstico tardio ocorre em > 30% dos casos — a luxação da cabeça do rádio passa despercebida. Monteggia crônica (> 3 semanas) é de tratamento complexo e resultados menos previsíveis. Regra básica: traçar a linha radiocapitelar em todo RX de cotovelo pediátrico.",
        classificacao: [
          {
            sistema: "Bado (direção da luxação da cabeça do rádio)",
            itens: [
              "Tipo I (75% em crianças): fratura anterior da ulna + luxação anterior da cabeça do rádio",
              "Tipo II: angulação posterior da ulna + luxação posterior (mais raro em crianças)",
              "Tipo III (clássico < 5 anos): fratura proximal da ulna + luxação lateral da cabeça",
              "Tipo IV: fratura da ulna + fratura do rádio + luxação anterior — raro",
              "Equivalente de Monteggia: fratura fisária proximal do rádio (SH I/II) sem fratura da ulna",
            ],
          },
          {
            sistema: "Monteggia Crônica (diagnóstico tardio — manejo diferente)",
            itens: [
              "< 3 semanas: ainda possível redução fechada ou percutânea",
              "3 semanas – 3 meses: redução aberta + plastia do ligamento anular + osteotomia da ulna",
              "> 1 ano ou cabeça do rádio deformada: osteotomia de ulna + trocleoplastia do capítulo",
            ],
          },
        ],
        mecanismo:
          "Tipo I: queda em pronação forçada → tensão no ligamento anular → luxação anterior da cabeça do rádio + fratura anterior da ulna. Tipo III: trauma em varo. Linha radiocapitelar: deve passar pelo centro do capítulo em TODAS as incidências (AP e perfil) — se não passa, há luxação.",
        tx_nao_cirurgico: [
          "Aguda Tipo I em criança: redução fechada sob AG (supinação + extensão + pressão sobre cabeça do rádio) — redução da ulna restaura a cabeça automaticamente",
          "Após redução estável: gesso longo com cotovelo a 90–110° em supinação por 6 semanas",
          "Controle RX em 1 semana para verificar manutenção da redução",
        ],
        tx_cirurgico: [
          "Fratura da ulna instável irredutível ou malreduzida: ESIN para estabilização",
          "Cabeça do rádio irredutível fechado (encarceramento do ligamento anular ou cápsula): redução aberta",
          "Monteggia crônica > 3 semanas: osteotomia da ulna + reconstrução do ligamento anular",
        ],
        cirurgias: [
          "Redução fechada (AG) + gesso: padrão para Monteggia aguda com ulna estável",
          "ESIN da ulna: fratura instável após redução fechada",
          "Redução aberta da cabeça do rádio: encarceramento tecidual impede redução (via lateral — Kaplan)",
          "Monteggia crônica: osteotomia de abertura da ulna + plastia do ligamento anular (Bell-Tawse) + ESIN",
        ],
        complicacoes: [
          "Lesão do nervo interósseo posterior (NIP): 10–20% — geralmente transitória em Tipo I; persistente → exploração",
          "Não diagnóstico da luxação (erro mais comum): resulta em Monteggia crônica com limitação funcional permanente",
          "Monteggia crônica: limitação de extensão, pronação e supinação, subluxação progressiva",
          "Sinostose rádio-ulnar (rara — após redução aberta com lesão da membrana interóssea)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 12"],
      },
      {
        id: "ombro-umero-proximal-ped",
        titulo: "Fraturas do Úmero Proximal e Luxação do Ombro",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 19",
        epidemiologia:
          "Fraturas do úmero proximal: 1–5% das fraturas pediátricas. SH I em RN (trauma obstétrico — diagnóstico diferencial com paralisia obstétrica do plexo braquial e osteomielite neonatal); SH II em pré-adolescentes; SH III/IV raros. Potencial de remodelamento extraordinário: até 70° de angulação podem corrigir em crianças < 8 anos. Luxação do ombro: rara antes dos 12 anos; adolescentes com frouxidão têm recidiva em 70–90%.",
        classificacao: [
          {
            sistema: "Neer-Horwitz (úmero proximal — grau de deslocamento)",
            itens: [
              "Grau I: < 5 mm de deslocamento → imobilização simples",
              "Grau II: até 1/3 do diâmetro diafisário → conservador ou redução em > 8 anos",
              "Grau III: até 2/3 → redução em adolescente; conservador em < 6 anos",
              "Grau IV: deslocamento completo → redução + fixação em adolescente se instável",
            ],
          },
          {
            sistema: "Luxação do Ombro Pediátrico",
            itens: [
              "Anterior (subcoracoide): mais comum; lesão de Bankart em adolescentes",
              "Taxa de recidiva: < 20 anos → 70–90% após 1° episódio (principal argumento para cirurgia precoce)",
              "Hill-Sachs e Bankart ósseo podem ocorrer mesmo na 1ª luxação em adolescente ativo",
              "Instabilidade multidirecional (MDI): frouxidão generalizada — responde melhor à fisioterapia antes da cirurgia",
            ],
          },
        ],
        mecanismo:
          "Fratura: trauma obstétrico (rotação forçada), FOOSH, queda direta sobre ombro. Pseudoparalisia em RN = diagnóstico diferencial entre fratura SH I e paralisia obstétrica do plexo. Luxação: rotação externa + abdução forçada em queda sobre mão estendida.",
        tx_nao_cirurgico: [
          "RN com SH I: tipoia + cuidado no manuseio 3–4 semanas; remodelamento garantido",
          "Crianças < 8 anos: até 70° de angulação e deslocamento completo aceitáveis (remodelamento excelente)",
          "8–12 anos: < 30–40° de angulação com gesso pendente ou tipoia; redução para > 30–40°",
          "Luxação 1° episódio: redução fechada (Cunningham, Milch, Stimson, tração-contratração) + tipoia 2–3 semanas",
        ],
        tx_cirurgico: [
          "Adolescente (> 12 anos) Neer IV irredutível ou instável pós-redução",
          "Luxação recorrente em adolescente (≥ 2 episódios ou atleta com 1° episódio e Bankart confirmado)",
          "Instabilidade multidirecional refratária ao conservador > 6 meses",
          "Fratura-luxação com fragmento cefálico grande",
        ],
        cirurgias: [
          "Redução fechada + fios K percutâneos: adolescente com Neer IV instável",
          "Reparo de Bankart artroscópico: reinserção do lábio anterior + LGHU (gold standard para instabilidade anterior recorrente)",
          "Cirurgia de Latarjet: déficit ósseo da glenóide > 20% ou falha do Bankart artroscópico",
          "Capsulorrafia/plica posterior: instabilidade multidirecional refratária",
        ],
        complicacoes: [
          "Retardo de crescimento (raro — úmero proximal tem enorme potencial de remodelamento)",
          "Lesão do nervo axilar (luxação anterior — parestesia na face lateral do deltoide)",
          "Instabilidade recorrente (adolescentes: 70–90% de recidiva — considerar cirurgia após 2° episódio)",
          "Osteomielite epifisária em RN (simula SH I — RMN distingue: edema/pus vs. fratura)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 19"],
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
        subtitulo: "Tachdjian's · Campbell's cap. 33 · Lovell & Winter's 8ª ed. cap. 23",
        epidemiologia:
          "Osteonecrose idiopática da cabeça femoral em crianças. Pico: 4–8 anos. Predomínio masculino (4:1). Incidência: 1:1.200 crianças. Bilateral em 10–20%. Risco aumentado: hiperatividade, baixo peso ao nascer, doença de Gaucher, coagulopatia. Retardo no desenvolvimento esquelético é habitual — maturação óssea na puberdade tende a compensar, contribuindo para prognóstico favorável nos pacientes jovens.",
        classificacao: [
          {
            sistema: "Herring (Pilar Lateral) — mais utilizada, aplicável na fase de fragmentação",
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
              "I: <25% — somente anterolateral",
              "II: 25–50%",
              "III: ~75%",
              "IV: total — 90% resultados ruins",
            ],
          },
          {
            sistema: "Stulberg (resultado em fase de remodelação — prediz artrose)",
            itens: [
              "Classe I: esfericidade normal — sem artrose",
              "Classe II: esférica mas maior (coxa magna) — congruência mantida",
              "Classes III–IV: ovóide / aspherical — incongruência progressiva, sintomas na 5ª–6ª décadas",
              "Classe V: cabeça plana (coxa plana) — artrose significativa na 4ª década",
            ],
          },
          {
            sistema: "Waldenström (estadiamento evolutivo — guia a intervenção)",
            itens: [
              "Estágio Ia–Ib: inicial (esclerose, subfratura subcondral)",
              "Estágio IIa–IIb: fragmentação",
              "Estágio IIIa–IIIb: reossificação",
              "Estágio IV: remodelação",
            ],
          },
        ],
        mecanismo:
          "Interrupção da vascularização da cabeça femoral (ramos posteriores da artéria circunflexa femoral medial). Revascularização segue padrão em ferradura: periférica (posterior → lateral → medial) convergindo para região anterocentral. Revascularização assimétrica gera deformidade assimétrica. A extrusão epifisária e a fragilidade do osso avascular são os principais determinantes da deformidade da cabeça femoral.",
        tx_nao_cirurgico: [
          "Doença leve (<metade da epífise, sem extrusão) em criança jovem: observação + preservação da amplitude de movimento — prognóstico favorável sem intervenção",
          "⚠️ Contenção: princípio central do tratamento — manter a porção anterolateral da epífise sob a cobertura acetabular para evitar forças deformantes (Parker, Eyre-Brook, Salter — L&W cap. 23). Duas estratégias: (1) quadril em abdução + rotação interna por gesso/órtese; (2) reorientação/aumento do acetábulo por cirurgia",
          "Órteses de contenção (Newington, Scottish Rite, Atlanta, Toronto): uso contínuo até o estágio IIIb (~18 meses); compliance imperativa. ⚠️ L&W: eficácia das órteses sem abdução máxima é questionada — sem bloqueio de adução não há contenção efetiva",
          "Fisioterapia aquática para preservação de mobilidade; tração e repouso para controle da dor no estágio agudo",
        ],
        tx_cirurgico: [
          "⚠️ Indicações de contenção cirúrgica (L&W cap. 23): (a) criança <8 anos: ao detectar qualquer extrusão nas radiografias de seguimento; (b) criança ≥8 anos: ao diagnóstico, mesmo sem extrusão demonstrada — pois extrusão inevitavelmente ocorrerá e o prognóstico é muito pior se a contenção for adiada (razão de chances de mau resultado: 16,5× quando contenção realizada após estágio IIa)",
          "⚠️ Não indicar contenção em: (a) doença leve em criança jovem sem extrusão e bom prognóstico; (b) doença avançada além do estágio IIa; (c) início da doença na adolescência",
          "⚠️ Classificações de Catterall e Herring NÃO devem guiar a indicação de tratamento nas fases iniciais (Ia, Ib, IIa) — são confiáveis somente na fase tardia da fragmentação (IIb). A decisão precoce deve basear-se no estágio de Waldenström e na presença de extrusão",
        ],
        cirurgias: [
          "Osteotomia femoral proximal varizante (20° de varo + 20–30° de desrotação externa): facilita a contenção do setor anterolateral vulnerável; pode pular o estágio de fragmentação em 1/3 dos casos tratados precocemente (estágios Ia/Ib) — resultado esférico em todos esses casos (L&W). Complicações: discrepância de membros (rara >0,5 cm ao final do crescimento), genu valgo compensatório; o ângulo de varo remodela quase completamente",
          "Osteotomia pélvica (Salter, tripla): redireciona o acetábulo para cobrir o setor anterolateral da cabeça",
          "Shelf acetabuloplastia: aumenta cobertura acetabular lateral — indicado em casos com subluxação crônica ou hinge abduction",
          "⚠️ Hinge abduction (abdutor em dobradiça): deformidade em coxa magna onde o setor extruído impacta no rebordo acetabular durante a abdução → não tenta nova contenção; shelf ou osteotomia em valgo são preferidos",
        ],
        complicacoes: [
          "Coxa magna (alargamento da cabeça) e incongruência articular",
          "Artrose prematura — Stulberg IV–V: sintomas na 4ª–6ª décadas dependendo da classe",
          "Claudicação e dor crônica residual",
          "Coxa breva (encurtamento de membro)",
          "Rigidez pós-cirúrgica",
        ],
        fontes: [
          "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
          "Campbell's Operative Orthopaedics, 14ª ed.",
          "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 23",
        ],
      },
      {
        id: "dfce",
        titulo: "Deslizamento Fisário da Cabeça do Fêmur (DFCE)",
        subtitulo: "Tachdjian's · Rockwood — Fraturas em Crianças · Lovell & Winter's 8ª ed. cap. 24",
        epidemiologia:
          "Deslocamento da epífise femoral proximal através da fise. Incidência: 2:100.000. Pico: meninos 12–14 anos, meninas 10–12 anos. Predomínio masculino (2–3:1). Obesidade é o principal fator de risco. Bilateral em 20–40% (sequencial em ~40% dos casos unilaterais até a maturidade esquelética — L&W cap. 24). Endocrinopatias (hipotireoidismo, hipogonadismo, deficiência de GH, doença renal, Down, radioterapia prévia): bilateral em 61–100% a curto prazo. ⚠️ Armadilha diagnóstica: dor isolada em joelho e/ou terço distal da coxa em 23–46% dos casos — examinar sempre o quadril em crianças peripuberais com dor no joelho.",
        classificacao: [
          {
            sistema: "Loder (estabilidade — principal para prognóstico de NÃO)",
            itens: [
              "Estável: criança deambula com ou sem muletas — NÃO <10%",
              "Instável: incapaz de deambular mesmo com muletas — NÃO 47–58%",
              "⚠️ L&W cap. 24 (Ziebarth et al.): instabilidade clínica ≠ instabilidade intraoperatória — 17/58 quadris 'estáveis' clinicamente apresentaram fise mecanicamente instável no intraoperatório; todo DFCE com fise aberta deve ser considerado em risco de progressão",
            ],
          },
          {
            sistema: "Temporal",
            itens: [
              "Agudo: <3 semanas de sintomas",
              "Crônico: >3 semanas",
              "Agudo sobre crônico: fase crônica + episódio agudo (mais frequente que o agudo puro)",
            ],
          },
          {
            sistema: "Grau de deslocamento (Wilson / ângulo de deslizamento)",
            itens: [
              "Leve: <33% do diâmetro da cabeça / <30°",
              "Moderado: 33–50% / 30–50°",
              "Grave: >50% / >50° — resultados muito piores (in situ: apenas 24% bons/excelentes — L&W)",
            ],
          },
        ],
        mecanismo:
          "Fraqueza da zona hipertrófica da fise (é até 80% da largura fisária no DFCE vs. 15–30% normal) com aumento de substância amorfa e desorientação celular. Forças de cisalhamento verticais sobre fise fragilizada (pico puberal + obesidade). O colo femoral e a diáfise migram anterior e rodam externamente em relação à epífise relativamente fixa no acetábulo. A rotação externa obrigatória do quadril durante a flexão é praticamente patognomônica de DFCE.",
        tx_nao_cirurgico: [
          "Não existe tratamento conservador definitivo — todos os DFCE confirmados requerem fixação cirúrgica",
          "Suspensão imediata de carga ao diagnóstico — especialmente no DFCE instável (progressão de deslizamento pode ocorrer com deambulação)",
          "Gesso espica: técnica histórica, atualmente abandonada — progressão em 18% após remoção; ausência de benefício sobre fixação percutânea",
        ],
        tx_cirurgico: [
          "Todos os casos confirmados — urgência em DFCE instável (fixação dentro de 24h)",
          "DFCE estável: fixação nas próximas 24–48h (eletiva urgente)",
          "⚠️ Princípio fundamental (L&W cap. 24 / Carney et al.): fixação in situ é o procedimento de escolha para a grande maioria dos DFCE, independentemente do grau de deslizamento — melhores resultados funcionais e radiográficos a longo prazo; realinhamento cirúrgico eleva complicações sem benefício demonstrado nos estudos históricos",
          "Indicação de realinhamento primário (osteotomia subcapital / Dunn modificado): reservar para deslizamento grave com limitação funcional severa que impeça sentar e deambular confortavelmente — somente em centros com alta experiência",
        ],
        cirurgias: [
          "Fixação in situ percutânea — padrão ouro: 1 parafuso canulado totalmente rosqueado 6,5 ou 7,3 mm, ponto de entrada no colo femoral anterior, posição centro-centro na epífise, perpendicular à fise em AP e perfil, mínimo 5–6 mm do osso subcondral; não tocar lateral à linha intertrocantérica para evitar impacto da cabeça do parafuso",
          "⚠️ DFCE instável — manejo do reposicionamento (L&W cap. 24): manipulação forçada NUNCA indicada (NÃO em 42% com manipulação forçada + gesso — Casey); redução 'serendipitosa' pelo posicionamento na mesa cirúrgica é aceitável; redução aberta gentil dentro de 24h → NÃO 4,7% (Parsch et al. — uma das taxas mais baixas da literatura para instável)",
          "Capsulotomia no DFCE instável: cada vez mais realizada para descompressão intra-articular; evidências ainda inconclusivas, mas pressão intracapsular elevada no instável é confirmada — considerada quando há hemartrose sob tensão",
          "Profilaxia contralateral: indicada em endocrinopatia (bilateral em 61–100% a curto prazo); considerar em crianças <10 anos (fechamento fisário unilateral precoce → discrepância ≥1 cm em até 60%); opcional em deslizamento grave bilateral precoce",
          "Osteotomia intertrocantérica (Southwick, Imhauser): osteotomia mais realizada para DFCE — menor risco de NÃO (Frymoyer: 0% vs. 30% com osteotomia do colo); indicada para deformidade residual grave após fechamento fisário, com limitação funcional significativa ou dor persistente; Southwick: remoção de cunha anterior (flexão) + lateral (valgo)",
          "Osteotomia do colo femoral (Kramer): risco de NÃO em 30% — tendência atual de abandono em favor da intertrocantérica",
          "Osteotomia subcapital (Dunn, Dunn modificado / deslocamento cirúrgico): maior poder de correção (ao nível da deformidade); maior risco de NÃO — técnica de alta complexidade, reservada para centros especializados; Ziebarth et al.: 82 quadris via deslocamento cirúrgico com Dunn modificado",
        ],
        complicacoes: [
          "Necrose avascular (NÃO) — principal complicação devastadora; DFCE instável: 47–58%; in situ bem executado no estável: <1%; causas: deslizamento em si (principal), posição do parafuso (superior/posterossuperior → compromete artéria retinacular superior), manipulação forçada (contra-indicada)",
          "Condrólise (destruição articular aguda) — 1–7%; mais comum com penetração articular do parafuso (Walters & Simon: 'ponto cego' radiográfico — penetração não percebida em AP e perfil possível); evitar com posição centro-centro ≥5 mm do subcondral",
          "⚠️ Fraturas subtrocantéricas — complicação pós-fixação: ponto de entrada lateral (ao nível ou distal ao trocânter menor) cria concentrador de tensão no lado de tração; L&W cap. 24: ponto anterior no colo femoral = abordagem biomecânica superior, menor risco de fratura; miniminizar furos de perfuração não utilizados",
          "Pinçamento femoroacetabular (FAI tipo cam) — protuberância anterior do colo residual impacta no acetábulo durante flexão; risco proporcional à gravidade do deslizamento; TC 3D essencial para planejamento",
          "Discrepância de comprimento de membros — fechamento fisário unilateral precoce pós-fixação (6–12 meses); LLD ≥1 cm em 14%, ≥2 cm em 5% (Stambough et al.); risco maior em crianças jovens com deslizamento unilateral",
          "Artrose precoce — universal a longo prazo; deslizamentos leves: artrose em 64% aos 40 anos (Carney & Weinstein); deslizamentos moderados/graves: 100% (mesma série, 41 anos de seguimento); Harris Hip Score ≥90 em 93% dos leves e 78% dos moderados aos 30 anos (Hansson et al.)",
        ],
        fontes: [
          "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
          "Rockwood — Fraturas em Crianças, 9ª ed.",
          "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 24",
        ],
      },
      {
        id: "ddq",
        titulo: "Displasia do Desenvolvimento do Quadril (DDQ)",
        subtitulo: "Tachdjian's · Campbell's cap. 30 · Lovell & Winter's 8ª ed. cap. 22",
        epidemiologia:
          "Espectro de anormalidades do desenvolvimento da articulação coxofemoral: de displasia leve até luxação completa. Incidência: 1–3/1.000 nascidos vivos (luxação completa: 0,5–1/1.000). Predomínio feminino (4–7:1). Fatores de risco: apresentação pélvica (17–23% dos casos de DDQ — Lovell & Winter), primeiro filho, oligodrâmnio, história familiar. Meninas representam ~80% dos casos. ⚠️ Incidência de luxação verdadeira: 0,5–1/1.000 (Lovell & Winter) vs. até 3/1.000 quando inclui displasias leves (Tachdjian). Doença do Arnês de Pavlik: lesão iatrogênica por tratamento prolongado inadequado — lesão da cabeça femoral, cartilagem acetabular e crescimento ósseo.",
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
          "Desenvolvimento anormal da articulação coxofemoral por combinação de fatores genéticos, hormonais (relaxina) e mecânicos (posição intrauterina). O acetábulo não se desenvolve sem a cabeça femoral dentro — displasia gera displasia. Obstáculos intra-articulares à redução: pulvinar hipertrofiado, ligamento transverso do acetábulo tenso, ligamento redondo encurtado, cápsula constricionada e inversão do labro. O psoas iliaco deslocado superiormente contribui como obstáculo extra-articular.",
        tx_nao_cirurgico: [
          "RN até 6 meses — Arnês de Pavlik (primeira linha para Graf IIb/III/IV): taxa de sucesso global 95% para quadris Ortolani-positivos; 85% para luxação completa <6 meses (Lovell & Winter)",
          "Técnica do Arnês de Pavlik (Lovell & Winter): alça do tronco no nível das mamilas; flexão do quadril 100–110°; alça posterior (checkrein) ajustada para manter o quadril dentro da 'zona de segurança' (arco entre redislocação e abdução confortável não forçada) — evitar hiperflexão e hiperflexão lateral",
          "Revisões a cada 7–10 dias com exame clínico ± ultrassom; radiografias não são necessárias durante o tratamento",
          "Duração: manter período de 6 semanas após estabilidade clínica; hips instáveis estabilizam em dias a semanas",
          "⚠️ Complicações do Arnês (iatrógenas — evitáveis): luxação inferior por hiperflexão excessiva prolongada; neuropraxia do nervo femoral por hiperflexão (verificar função do quadríceps em cada visita); paralisia do plexo braquial pelas alças do ombro; subluxação do joelho",
          "6–18 meses: redução fechada sob anestesia geral + artrograma (fluoroscopia dinâmica) + gesso espica em posição humana (flexão 90–100°, abdução 45°, rotação neutra)",
          "⚠️ Tração pré-redução (L&W): uso altamente controverso — Fish et al. (1991): maioria dos ortopedistas pediátricos usava tração; tendência atual é de abandono (poucos centros utilizam atualmente). Estudos não demonstram redução consistente da NAO com tração prévia (Kutlu et al., Cooperman et al.)",
        ],
        tx_cirurgico: [
          "Falha do Arnês de Pavlik após 3–4 semanas sem progressão de redução",
          "Diagnóstico tardio (>18 meses): redução aberta geralmente necessária",
          "Displasia residual após redução: osteotomias pélvica e/ou femoral",
          "⚠️ Abordagem anteromedial (Weinstein–Ponseti / Ludloff): ideal para <18 meses quando redução fechada falha; acesso direto aos obstáculos; sem necessidade de capsuloplastia; NAO ~14% (Lovell & Winter — compatível com outras séries). Desvantagem: sem visualização das estruturas superiores (labro), não permite procedimentos combinados",
          "⚠️ Encurtamento femoral nos >3 anos: Schoenecker & Strecker — tração prévia seguida de redução aberta: 54% NAO + 32% redislocação; encurtamento femoral concomitante reduz dramaticamente essas taxas → preferência atual no paciente >3 anos",
        ],
        cirurgias: [
          "Redução aberta via Smith-Petersen (anterior): remoção de obstáculos (pulvinar, ligamento transverso do acetábulo, psoas encurtado) + capsuloplastia; imobiliza em posição funcional; abordagem padrão para >18 meses",
          "Osteotomia pélvica — critérios por faixa etária (Lovell & Winter): <18 meses: raramente indicada — potencial de desenvolvimento acetabular excelente (melhora mais rápida nos primeiros 18 meses pós-redução); 18 meses–3 anos ('zona cinzenta'): avaliar estabilidade no ato cirúrgico — displasia residual indica osteotomia concomitante ou 6–8 semanas após; >3 anos: osteotomia acetabular recomendada na maioria",
          "Salter (inominada): redireciona o acetábulo para cobertura anterior — às expensas de redução da cobertura posterior; indicado em displasia predominantemente anterior",
          "Pemberton (periacetabular incompleta): cobertura anterior + lateral variável conforme direção dos cortes; não depende da sínfise como fulcro",
          "⚠️ Dega: útil em displasias com deficiência posterior predominante (paralisia cerebral, sequelas de mielomeningocele)",
          "PAO de Ganz: adolescentes e adultos jovens com esqueleto maduro; triplice osteotomia periacetabular — maior mobilidade de correção",
          "Osteotomia femoral varizante + desrotação: reduz tensão na cabeça e corrige anteversão excessiva",
        ],
        complicacoes: [
          "Necrose avascular (NAO) da cabeça femoral — principal complicação do tratamento; causada por pressão excessiva durante redução ou hiperflexão no Arnês de Pavlik",
          "Redução insuficiente / reluxação",
          "Displasia residual → artrose precoce no adulto jovem",
          "Doença do Arnês de Pavlik: lesão iatrógena por tratamento prolongado sem sucesso — lesão articular, da cartilagem acetabular e inibição do crescimento ósseo",
          "Rigidez pós-cirúrgica",
          "Diferença de comprimento de membros",
        ],
        fontes: [
          "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
          "Campbell's Operative Orthopaedics, 14ª ed.",
          "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 22",
        ],
      },
      {
        id: "luxacao-quadril-ped",
        titulo: "Luxação Traumática do Quadril Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 24",
        epidemiologia:
          "Rara em crianças; distribuição bimodal: < 5 anos (baixa energia, frouxidão ligamentar) e adolescentes (alta energia). Posterior: 80–90% dos casos. Pode associar-se a fratura da parede acetabular, da cabeça femoral ou do colo femoral. Urgência absoluta: redução em < 6 horas para prevenir necrose avascular (NAO) — o risco de NAO aumenta exponencialmente após 6 horas sem redução.",
        classificacao: [
          {
            sistema: "Thompson-Epstein (luxação posterior)",
            itens: [
              "Tipo I: sem fratura associada → redução fechada sob AG",
              "Tipo II: fragmento pequeno da parede posterior → redução fechada; RAFI se irredutível",
              "Tipo III: fragmento grande da parede posterior → cirurgia",
              "Tipo IV: fratura do acetábulo → cirurgia",
              "Tipo V: fratura da cabeça femoral (Pipkin) → cirurgia",
            ],
          },
          {
            sistema: "Direção da luxação",
            itens: [
              "Posterior (80–90%): hiperflexão + adução + RI; membro em flexão, aduzido, em RI",
              "Anterior (< 10%): hiperextensão + abdução; membro em extensão, abduzido, em RE",
            ],
          },
        ],
        mecanismo:
          "< 5 anos: frouxidão capsular → luxação com energia mínima (queda simples, brincadeira). Adolescente: alta energia (colisão frontal — dashboard injury, queda de moto, esporte de impacto). A cabeça femoral posterioriza e comprime as artérias circunflexas → isquemia da cabeça → NAO se não reduzida em tempo.",
        tx_nao_cirurgico: [
          "Thompson-Epstein I: redução fechada sob AG em < 6h (manobra de Allis ou Stimson) + tração cutânea ou gesso espica 4–6 semanas (criança)",
          "Adolescente: repouso em leito com carga parcial 6 semanas após redução",
          "TC obrigatória após redução para verificar centralização e fragmentos intra-articulares",
          "Seguimento clínico-radiológico 18–24 meses para detecção precoce de NAO (RMN se dúvida clínica)",
        ],
        tx_cirurgico: [
          "Thompson-Epstein III–V: redução aberta + RAFI do fragmento",
          "Fragmento intra-articular identificado na TC pós-redução",
          "Redução fechada falha (encarceramento do lábio acetabular ou cápsula)",
          "NAO estabelecida: osteotomia em criança; artroplastia em adolescente tardio",
        ],
        cirurgias: [
          "Redução aberta via Kocher-Langenbeck (posterior): fratura da parede posterior + RAFI com parafusos",
          "Via anterior (Smith-Petersen): fratura da cabeça femoral Pipkin III–IV",
          "Artroscopia do quadril: remoção de fragmentos intra-articulares em adolescente",
        ],
        complicacoes: [
          "Necrose avascular (NAO): 10–20% global; < 1% se reduzido em < 6h; aumenta drasticamente com demora",
          "Lesão do nervo ciático (10–15% nas posteriores — neurapraxia geralmente; resolução em 3–6 meses)",
          "Artrose precoce do quadril",
          "Ossificação heterotópica (pós redução aberta)",
          "Coxa magna e incongruência articular residual",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 24"],
      },
      {
        id: "quadril-adolescente",
        titulo: "Quadril do Adolescente — FAI e Displasia Acetabular",
        subtitulo: "Impacto Femoroacetabular (FAI) · Displasia Acetabular · Apofisiólise Pélvica — Lovell & Winter's, cap. 25",
        epidemiologia: "FAI: prevalência morfológica radiográfica muito maior que a sintomática; morfologia cam predomina em homens jovens atletas; pincer predomina em mulheres. Displasia acetabular: ângulo CE lateral <25° define displasia; mais comum em mulheres. Apofisiólise pélvica: adolescentes em crescimento esquelético ativo, especialmente atletas de salto (apofisiólise isquiática — sprinters) e corrida/dança (apofisiólise da EIAS — saltadores)",
        classificacao: [
          {
            sistema: "Tipos de FAI",
            itens: [
              "Cam: deformidade da junção cabeça-colo femoral (asphericity) → impacto anterior com a borda acetabular durante flexão; predomina em homens jovens atletas",
              "Pincer: sobrecobertura acetabular (retroversão ou profunda global) → impacto circunferencial; predomina em mulheres",
              "Misto: combinação de ambos os padrões (mais comum na prática clínica)",
              "FAI pós-DFCE: deformidade residual do colo femoral (protuberância anterior) → impacto cam; avaliação por TC 3D essencial para planejar tratamento",
              "FAI pós-Perthes cicatrizado: cabeça femoral aumentada e asférica + colo curto e largo + trocânter proximal migrado → impacto intra e extra-articular complexo",
            ],
          },
          {
            sistema: "Displasia Acetabular — Critérios Radiográficos",
            itens: [
              "Ângulo CE lateral (Wiberg) <25°: define displasia",
              "Ângulo de Tönnis >10°: define displasia",
              "Índice A/B (cobertura femoral) <0,80: define displasia",
              "⚠️ PRINCÍPIO L&W (Cap. 25): laceração labral isolada NÃO é diagnóstico — buscar sempre causa estrutural subjacente (displasia, FAI ou ambos)",
            ],
          },
        ],
        mecanismo: "FAI cam: deformidade da junção cabeça-colo impacta a borda acetabular durante flexão e rotação interna, causando lesão labral e cartilagem acetabular anterossuperior. FAI pincer: sobrecobertura provoca impacto repetitivo, com lesão labral circunferencial e dano contra-golpe da cartilagem da cabeça femoral. Displasia: cobertura insuficiente → estresse excessivo no lábio acetabular → degeneração e instabilidade progressiva com risco de artrose precoce.",
        tx_nao_cirurgico: [
          "⚠️ ALERTA LOVELL & WINTER (Cap. 25): não há evidência de que o tratamento cirúrgico do FAI melhore a história natural do quadril ou previna/retarde o desenvolvimento de artrose — tratamento conservador é a abordagem preferencial inicial",
          "Modificação de atividades: redução de movimentos em extremo de amplitude (agachamento profundo, pivô, flexão forçada); especialmente em atletas",
          "Fisioterapia: fortalecimento de core, glúteos e musculatura periarticular; melhora da biomecânica e redução do impacto dinâmico",
          "Anti-inflamatórios não esteroidais e infiltração intra-articular de corticoide: controle sintomático",
          "Avaliação e correção da displasia mínima associada antes de qualquer decisão cirúrgica sobre o lábio",
          "⚠️ CUIDADO L&W: alongamento tendíneo e hipermobilidade são contraindicados em displasia leve, anteversão femoral aumentada e síndrome de Ehlers-Danlos — podem agravar instabilidade do quadril",
        ],
        tx_cirurgico: [
          "Artroscopia do quadril: indicada para FAI cam anterior pequeno após falha do conservador; desbridamento/reinserção do lábio + osteoplastia cam; ⚠️ resultados em adolescentes são piores do que em adultos jovens, especialmente se a fise ainda estiver aberta",
          "Dislocação cirúrgica do quadril (procedimento de Ganz): via posterior com osteotomia do trocânter; permite visualização completa de toda a superfície articular; indicada para cam grande ou posterior, retroversão femoral grave, Perthes cicatrizado no adolescente com impacto complexo",
          "Osteotomia periacetabular de Bernese (PAO): procedimento de escolha para displasia acetabular sintomática com cartilagem articular preservada; redireciona o acetábulo em 3 planos; ⚠️ artroscopia isolada para plicatura capsular em displasia leve — durabilidade e eficácia a longo prazo NÃO documentadas; PAO parece superior para displasia verdadeira",
          "FAI pós-DFCE leve: artroscopia para deslizamentos leves com deformidade do colo mínima; cirurgia aberta com osteotomia femoroacetabular para deslizamentos maiores",
          "Perthes cicatrizado no adolescente: dislocação cirúrgica do quadril é a via preferencial — objetivo: liberação do impacto, normalização da mecânica do abdutor e estabilização articular",
        ],
        complicacoes: [
          "Progressão para artrose do quadril: principal preocupação a longo prazo em displasia não tratada e FAI com dano cartilaginoso significativo",
          "Necrose avascular (NAO) da cabeça femoral: complicação potencial da dislocação cirúrgica e da PAO; risco baixo com técnica adequada (preservação do ramo ascendente da artéria circunflexa medial)",
          "Falha de fixação do trocânter maior após osteotomia na dislocação cirúrgica",
          "Recorrência do impacto após artroscopia: maior risco quando a causa estrutural subjacente não é corrigida adequadamente (cam residual, displasia não tratada)",
          "Apofisiólise pélvica volumosa (fragmento >2 cm): pode exigir fixação cirúrgica; avulsão isquiática é a mais comum em adolescentes atletas",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 25"],
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
              "0: pré-puberal, alto risco de progressão; fechamento da cartilagem trirradiada do acetábulo precede Risser 0 e marca fim da fase de crescimento espinhal máximo",
              "1–2: ainda crescendo, bracing indicado",
              "4–5: crescimento concluído",
            ],
          },
        ],
        mecanismo:
          "Etiologia desconhecida (idiopática). Hipóteses: assimetria de crescimento, disfunção melatoninírgica, anormalidade neurológica sutil. A curva se auto-perpetua pelo mecanismo de Hueter-Volkmann (carga assimétrica sobre vértebras em crescimento).",
        tx_nao_cirurgico: [
          "Observação: curvas <25° em paciente em crescimento (controle a cada 4–6 meses)",
          "Bracing: curvas 25–40° em paciente com Risser ≤2 (mínimo 18h/dia, até Risser 4–5); órteses subaxilares limitam-se a curvas com ápice abaixo de T7",
          "Boston (uso diurno + noturno, torácica baixa/lombar); Charleston e Providence (noturnas, unidirecionais — para curva dominante única)",
          "Fisioterapia (SEAS, Schroth) como adjuvante ao bracing",
        ],
        tx_cirurgico: [
          "Curvas >45–50° em paciente ainda em crescimento",
          "Curvas >50° em paciente com crescimento completo",
          "⚠️ Ângulo de Cobb não é o único critério — equilíbrio do tronco deve ser considerado: curva lombar de 35° com desvio lateral grave do tronco pode justificar cirurgia; duas curvas de 50° bem equilibradas (padrão dupla maior) em paciente esqueleticamente maduro podem ser acompanhadas",
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
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed.", "Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 16"],
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
          "Estresse repetitivo em extensão lombar → fratura de pars interarticularis. Pico sintomático: espurto de crescimento adolescente (10–15 anos). Fase aguda (espondilólise): dor lombar em extensão. Deslizamento progressivo pode ocorrer com crescimento. O grau de deslizamento nem sempre correlaciona com a intensidade da dor.",
        tx_nao_cirurgico: [
          "Espondilólise sintomática: restrição de atividades até assintomático; retorno gradual ao esporte + fisioterapia de fortalecimento de core (evitar extensão lombar extrema e amplitude de movimento excessiva — pode exacerbar a dor)",
          "Fisioterapia pode piorar a dor — suspender ou modificar se isso ocorrer",
          "Colete lombar nas fases sintomáticas",
          "Espondilolistese Grau I–II assintomática: observação",
          "Sintomática Grau I–II: AINES, evitar extensão lombar, fortalecimento de core",
        ],
        tx_cirurgico: [
          "Grau I–II com dor resistente ao conservador >6 meses",
          "Grau III–IV (quase sempre sintomático)",
          "Déficit neurológico",
          "Espondiloptose",
          "Descompressão isolada raramente indicada em crianças e adolescentes — sempre associar à fusão",
        ],
        cirurgias: [
          "Artrodese L5–S1 (fusão intersomática + instrumentação posterior) — Grau I–II; artrodese L4–S1 para Grau III–IV com ângulo de deslizamento elevado",
          "Redução parcial + artrodese — Grau III–IV (redução total aumenta risco neurológico)",
          "Reparação direta da pars (técnica de Buck: parafuso de pars + gancho infralaminar) — espondilólise em atleta jovem SEM doença discal degenerativa (83% de resultados satisfatórios em série de 18 pacientes)",
        ],
        complicacoes: [
          "Lesão neurológica (síndrome da cauda equina — urgência em espondiloptose)",
          "Pseudartrose (fusão incompleta)",
          "Síndrome L5 (déficit de dorsiflexão do hálux)",
          "Perda de redução",
          "Discrepância de comprimento de membros (espondiloptose grave)",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed.", "Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 19"],
      },
      {
        id: "trauma-cervical-ped",
        titulo: "Trauma da Coluna Cervical Pediátrica",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 21",
        epidemiologia:
          "Lesões cervicais diferem do adulto pela elasticidade ligamentar aumentada e proporção maior de cartilagem. <8 anos: lesões predominam em C1–C3 (cabeça grande + musculatura cervical fraca). >8 anos: padrão adulto com C5–C6 mais frequente. SCIWORA representa 20–30% das lesões medulares pediátricas.",
        classificacao: [
          {
            sistema: "SCIWORA (Spinal Cord Injury Without Radiographic Abnormality)",
            itens: [
              "RX e TC normais + déficit neurológico → RMN obrigatória",
              "Mecanismo: hiperdistensão transitória da coluna elástica pediátrica → contusão medular",
              "Tratamento: imobilização 12 semanas + RMN seriada; recuperação neurológica variável",
            ],
          },
          {
            sistema: "Instabilidade Atlanto-Axial e Variantes Pediátricas",
            itens: [
              "Intervalo atlanto-dental (IAD) normal em crianças: <5 mm (vs <3 mm em adulto)",
              "Síndrome de Down: 15% tem instabilidade AA → rastreio com RX em flexo-extensão antes de esportes",
              "Síndrome de Grisel: subluxação AA inflamatória (pós-amigdalite, otite) → colar + AINEs → raramente cirurgia",
              "Fratura odontóide em <7 anos: pelo sincondrólise basal (não no colo do dente como no adulto)",
              "Pseudo-subluxação C2–C3: fisiológica em crianças <8 anos — não confundir com fratura",
            ],
          },
        ],
        mecanismo:
          "Flexão-compressão (mergulho raso), hiperextensão (colisão frontal), trauma axial. Em lactentes: sacudida violenta (shaken baby) → lesão ligamentar sem fratura visível.",
        tx_nao_cirurgico: [
          "Fratura estável sem déficit neurológico: colar cervical rígido 6–12 semanas",
          "Fratura odontóide pelo sincondrólise (<7 anos): halo-gesso ou Minerva 12 semanas → fusão quase garantida",
          "Síndrome de Grisel: colar macio + AINEs; tração e fusão apenas se não responder",
        ],
        tx_cirurgico: [
          "Instabilidade craniocervical (lesão occipito-atlanto-axial)",
          "Pseudosubuluxação persistente após 6 semanas de imobilização",
          "Déficit neurológico progressivo",
          "Fratura odontóide irredutível ou em não-consolidação",
        ],
        cirurgias: [
          "Fusão occípito-cervical (C0–C2) — instabilidade craniocervical",
          "Fusão C1–C2 (Halifax, Harms) — instabilidade atlanto-axial persistente",
          "Laminectomia + fusão — compressão medular multissegmentar",
        ],
        complicacoes: [
          "Lesão medular completa (quadriplegia, paraplegia) — devastadora; SCIWORA tem prognóstico variável",
          "Síndrome de Horner (lesão da cadeia simpática cervical)",
          "Rigidez cervical pós-fusão em criança em crescimento",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 21"],
      },
      {
        id: "trauma-toracolombar-ped",
        titulo: "Trauma Toracolombar Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 22",
        epidemiologia:
          "Fraturas toracolombares são menos comuns em crianças que em adultos. Alta energia necessária. T4–T12: protegida pelas costelas. L1–L4: zona de transição, foco das fraturas burst e Chance. Fratura de Chance: clássica do trauma por cinto de segurança subabdominal (lap belt) — associação com lesão de órgão abdominal em 40–50% dos casos.",
        classificacao: [
          {
            sistema: "Fratura de Chance (flexão-distração — lap belt)",
            itens: [
              "Fratura horizontal por corpo vertebral, pedículos e apófises espinhosas",
              "Criança em banco traseiro com cinto pélvico (sem apoio de cabeça) = fator de risco clássico",
              "Chance óssea: melhor prognóstico (consolida com imobilização)",
              "Chance ligamentar: instável, geralmente necessita cirurgia",
              "TC de abdome OBRIGATÓRIA — lesão de órgão abdominal em 40–50%",
            ],
          },
          {
            sistema: "AO / TLICS",
            itens: [
              "Tipo A (compressão): wedge, burst — conforme subtipo",
              "Tipo B (distração): Chance, ligamentar posterior",
              "Tipo C (translação/rotação): instável — cirurgia quase sempre",
              "TLICS ≤3: conservador; 4: borderline; ≥5: cirurgia",
            ],
          },
        ],
        mecanismo:
          "Alta energia: queda de altura (compressão axial → burst), colisão (Chance com cinto pélvico), trauma direto. Chance: hiperflexão em torno do cinto → distração da coluna posterior e compressão anterior.",
        tx_nao_cirurgico: [
          "Fratura por compressão (wedge) ≤30% de altura perdida, sem déficit: colete de hiperextensão 8–12 semanas",
          "Chance óssea pura estável: gesso ou colete hiperextensão 12 semanas — excelente consolidação",
          "TLICS ≤3: não cirúrgico",
        ],
        tx_cirurgico: [
          "Burst com déficit neurológico: descompressão + instrumentação",
          "Chance ligamentar (instável): fusão posterior",
          "Tipo C (translação): cirurgia quase sempre obrigatória",
          "Cifose local progressiva >20° durante seguimento",
          "Laparotomia ANTES da coluna se lesão abdominal associada (Chance)",
        ],
        cirurgias: [
          "Artrodese posterior com parafusos pediculares (1–2 níveis acima e abaixo)",
          "Descompressão anterior + instrumentação (burst com compressão medular anterior)",
          "Técnicas MIS (minimamente invasivas) em adolescentes quando possível",
        ],
        complicacoes: [
          "Lesão medular (conus em L1–L2 → síndrome de conus; abaixo → cauda equina)",
          "Cifose residual progressiva (colapso do corpo vertebral)",
          "Lesão abdominal não detectada (Chance — busca ativa obrigatória)",
          "Pseudartrose",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 22"],
      },
      {
        id: "eos-escoliose-precoce",
        titulo: "Escoliose de Início Precoce (EOS)",
        subtitulo: "Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 17",
        epidemiologia:
          "Deformidade espinhal (escoliose ou cifose) que se desenvolve antes dos 10 anos de idade (definição consenso SRS 2015). Etiologia: idiopática, congênita, neuromuscular, sindrômica ou secundária a infecção/tumor/cirurgia torácica prévia. Diferencial crítico do adulto: EOS pode ser letal — deformidades graves comprometem o desenvolvimento pulmonar. Crianças submetidas a artrodese precoce desenvolvem tórax curto e insuficiência respiratória restritiva (capacidade vital <50% = Síndrome de Insuficiência Torácica / TIS). A meta é controlar a curva preservando o crescimento torácico até ~10 anos de idade.",
        classificacao: [
          {
            sistema: "C-EOS (Consensus Classification of Early-Onset Scoliosis)",
            itens: [
              "Etiologia: idiopática / neuromuscular / congênita / sindrômica",
              "Progressão radiográfica: 0–10° ao ano / 10–20° ao ano / >20° ao ano",
              "Magnitude da curva: <20° / 20–50° / >50°",
              "Cifose: <20° / 20–50° / >50° (tórax plano ou cifótico, respectivamente)",
            ],
          },
          {
            sistema: "Abordagem Terapêutica por Fase de Crescimento",
            itens: [
              "<2 anos: gessos seriados (Mehta/EDF) como primeira linha — alta taxa de resolução em EOS idiopática",
              "2–6 anos: gessos seriados + colete após resolução parcial; ortese TLSO se curva estabilizada",
              ">6 anos com curva progressiva: instrumentação de crescimento guiado (growing rods / MCGR / VEPTR)",
            ],
          },
        ],
        mecanismo:
          "Crescimento espinhal máximo ocorre <5 anos. Fixação rígida precoce interrompe o crescimento vertical e o desenvolvimento do parênquima pulmonar. Curvas >60° comprometem a função pulmonar; >80° → risco de insuficiência respiratória restritiva grave.",
        tx_nao_cirurgico: [
          "Gessos seriados tipo Mehta/EDF (Elongation, Derotation, Flexion): primeira linha para EOS idiopática <4 anos — trocas a cada 2–3 meses sob anestesia geral; resolução em ~50% dos casos de EOS idiopática infantil",
          "Colete TLSO/Boston: manutenção após gessos seriados ou para curvas moderadas progressivas <45° em crianças >6 anos",
          "Fisioterapia respiratória: fundamental para manutenção da função pulmonar em EOS grave",
          "Seguimento com provas de função pulmonar (espirometria a partir dos 5 anos) — capacidade vital é o melhor indicador de comprometimento respiratório",
        ],
        tx_cirurgico: [
          "Curvas progressivas >45–50° que falham ao tratamento conservador em crianças esqueleticamente imaturas (<10 anos)",
          "Insuficiência torácica documentada (TIS) com comprometimento respiratório",
          "Deformidade congênita com progressão documentada",
          "⚠️ Artrodese definitiva precoce é CONTRAINDICADA antes dos 10 anos — causa TIS e reduz drasticamente a capacidade vital",
        ],
        cirurgias: [
          "Growing Rods (GR) tradicionais: hastes ancoradas proximal e distalmente com distração programada a cada 6 meses (cirurgia de allongement) — mantém crescimento espinhal; complicações: falha de implante, infecção, fenômeno de autofusão espontânea ('auto-fusion')",
          "MCGR (Magnetically Controlled Growing Rod / HALO® EOS): distração não invasiva com dispositivo magnético externo — evita anestesia repetida; aprovado FDA 2014; taxa de complicações semelhante ao GR tradicional",
          "VEPTR (Vertical Expandable Prosthetic Titanium Rib): indicado especialmente para TIS com fusão de costelas ou defeitos torácicos; ancora nas costelas — descomprime o pulmão e expande o tórax",
          "Artrodese definitiva: somente após ~10 anos (crescimento torácico suficiente) ou quando a curva é irredutível e o risco pulmonar supera o benefício do crescimento",
        ],
        complicacoes: [
          "Falha de implante (quebra de haste, migração de âncora) — complicação mais comum dos GR",
          "Infecção de implante — risco aumentado com cirurgias repetidas",
          "Autofusão espontânea entre as extremidades do implante (elimina distração efetiva)",
          "Insuficiência torácica progressiva (se tratamento inadequado)",
          "Deformidade cervicotorácica proximal (cifose juncional proximal) — especialmente com ancoragem alta",
          "Lesão neurológica intraoperatória (rara com monitorização neuroeletrofisiológica)",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 17"],
      },
      {
        id: "cifose-scheuermann",
        titulo: "Cifose de Scheuermann / Cifose Adolescente",
        subtitulo: "Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 18",
        epidemiologia:
          "Cifose torácica rígida em adolescentes. Prevalência: 0,4–10% da população geral. Discreto predomínio masculino ou igual. Ápice da cifose: T7–T9 (forma torácica — típica). Forma atípica: ápice T10–T12/L1 (cifose toracolombar) — menos cifose visível, mais dor lombar. Progressão rápida durante o estirão puberal. Curvas entre 65–85° são as mais sintomáticas; curvas >85° paradoxalmente causam menos sintomas que o esperado na forma torácica.",
        classificacao: [
          {
            sistema: "Tipo (por Localização)",
            itens: [
              "Tipo I — Torácica típica: ápice T7–T9, cifosse >45°, ≥3 vértebras com cunhamento ≥5°, irregularidades de platô + nódulos de Schmorl",
              "Tipo II — Toracolombar/Lombar atípica: ápice T10–L1, sem cunhamento vertebral proeminente, nódulos de Schmorl e estreitamento discal, dor lombar predominante ('Lumbar Scheuermann') — típico em atletas de levantamento de peso",
            ],
          },
          {
            sistema: "Critérios Diagnósticos (Scheuermann)",
            itens: [
              "Cifose torácica >45° (ou >50° segundo alguns autores)",
              "≥3 vértebras consecutivas com cunhamento ≥5°",
              "Irregularidades de platô vertebral (end plates) e/ou nódulos de Schmorl",
              "Rigidez à hiperextensão (diferencia de cifose postural — este corrige voluntariamente)",
            ],
          },
        ],
        mecanismo:
          "Pressão anterior aumentada sobre a fise vertebral durante crescimento → necrose avascular focal do platô → cunhamento anterior do corpo vertebral. Fatores contribuintes: estirão puberal rápido, níveis elevados de GH, possível osteoporose relativa do platô vertebral. Deformidade rígida — não corrige voluntariamente (diferencial importante de cifose postural).",
        tx_nao_cirurgico: [
          "Observação: deformidades <50° em paciente com crescimento, assintomáticas — controle a cada 4–6 meses com radiografia lateral",
          "Bracing: indicado para cifose >50° em paciente esqueleticamente imaturo (Risser ≤2, ≥1 ano de crescimento restante) com alguma flexibilidade da curva",
          "Órtese de Milwaukee (com apoio occipitomentoniano): padrão histórico para cifose torácica alta — corrige por hiperestensão e aumento da lordose lombar; uso 16–23h/dia por 12–18 meses, depois parcial até maturidade",
          "Órtese de Boston lombar (anti-lordose lombar): alternativa para cifose toracolombar — usada 16h/dia com eficácia semelhante ao uso integral (Gutowski e Renshaw)",
          "Fisioterapia: fortalecimento de extensores torácicos + alongamento de flexores de quadril; adjuvante ao bracing",
          "Gessos seriados de correção (prática europeia — De Mauroy/Stagnara): três fases (FT preparatória → gessos corretivos → colete de contenção) — boa evidência para curvas maiores e pacientes jovens",
        ],
        tx_cirurgico: [
          "Cifose >70–80° em paciente esqueleticamente imaturo com progressão documentada",
          "Cifose >75–80° em paciente adulto (crescimento completo) com dor persistente",
          "Comprometimento neurológico (raro — hérnia discal torácica, cisto extradural, compressão medular no ápice)",
          "Comprometimento cardiopulmonar (cifose severa com CVF reduzida)",
          "Inaceitável estética refratária ao tratamento conservador",
          "Falha do bracing com progressão documentada",
        ],
        cirurgias: [
          "Artrodese posterior com instrumentação por parafusos pediculares (padrão atual): inclusão de todos os vértebras cunhadas + 2 níveis além; osteotomias de Ponte (liberação posterior) permitem correção sem coluna anterior",
          "Abordagem combinada anterior + posterior (histórica): indicada para curvas rígidas >80° que não corrigem no bolster para <50°; atualmente substituída em muitos casos pelas osteotomias de Ponte isoladas",
          "RM pré-operatória OBRIGATÓRIA: hérnia discal torácica posterior em ~30% dos pacientes de Scheuermann cirúrgico (cinco níveis por paciente em média, abaixo do ápice — pode alterar o plano cirúrgico)",
          "Balanceamento sagital: objetivo é deixar o fio de prumo de C7 dentro de ±2 cm do promontório sacral",
        ],
        complicacoes: [
          "Cifose juncional proximal (PJK): complicação mais frequente — colapso na junção entre a instrumentação e a coluna livre; prevenção: extender para T2–T3 proximalmente",
          "Pseudartrose",
          "Lesão neurológica (rara; risco aumentado em correção >50% da cifose inicial)",
          "Síndrome da artéria espinhal anterior (hipercorreção)",
          "Infecção de sítio cirúrgico",
          "Complicações pulmonares pós-operatórias (derrames, atelectasia)",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 18"],
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
          "Infecção óssea bacteriana por disseminação hematogênica. Pico: 2–10 anos, predomínio masculino (2:1). Localização preferencial: metáfises de ossos longos (fêmur distal, tíbia proximal, úmero proximal) — onde o fluxo vascular é mais lento e o sistema fagocitário é menos eficiente. S. aureus é o agente causal em 40–90% dos casos. MRSA representa atualmente ~30% dos casos (contra 0% na década de 1980). Trauma precede OHA em 30–50% dos casos.",
        classificacao: [
          {
            sistema: "Agente etiológico (por faixa etária)",
            itens: [
              "RN (<1 mês): S. aureus, Streptococcus grupo B, gram-negativos (ampicilina + gentamicina)",
              "1 mês–5 anos: S. aureus (principal), H. influenzae (vacinação reduziu drasticamente), Kingella kingae (resistente a vancomicina e clindamicina; sensível a β-lactâmicos; deve ser cultivada em meio de hemocultivo enriquecido; poucas sequelas com tratamento adequado)",
              "5–12 anos: S. aureus (MRSA emergindo), Streptococcus pyogenes",
              "Adolescentes: S. aureus; considerar Neisseria gonorrhoeae em sexualmente ativos",
              "Anemia falciforme: Salmonella spp. + S. aureus",
            ],
          },
        ],
        mecanismo:
          "Bacteremia transitória → implantação na metáfise (rede capilar lenta + ausência de células fagocitárias locais). Pressão do pus sub-periosteal → elevação periostal (sinal radiográfico tardio). Extensão ao espaço subperiosteal → abscesso → celulite e sepse. No RN e lactente jovem: vasos atravessam a fise → artrite séptica associada frequente. Exames laboratoriais: PCR aumenta 100× em 4–6h (meia-vida 17h) — melhor marcador em tempo real para monitorar tratamento; normalização indica conversão para VO. VHS eleva em 90–95% mas demora 3–5 dias para cair mesmo com tratamento eficaz. Procalcitonina: pico mais rápido que PCR (8h vs. 20h), maior especificidade bacteriana, mas menos estabelecida em pediatria.",
        tx_nao_cirurgico: [
          "Aspiração óssea para cultura ANTES de iniciar antibiótico (aumenta rendimento diagnóstico)",
          "Antibioticoterapia IV imediata empírica: oxacilina/cefazolina (MSSA) ou vancomicina (suspeita de MRSA; clindamicina também eficaz para MRSA — demonstrado em série de 46 crianças)",
          "Conversão para VO após: normalização da PCR + melhora clínica (sem febre, sem dor noturna, retorno do apetite) — não apenas tempo fixo de IV",
          "⚠️ Divergência de fontes: Tachdjian/Campbell indicam 4–6 semanas total; Lovell & Winter indica ~3 semanas para OHA não complicada — duração deve ser individualizada pela resposta laboratorial",
          "Monitorização semanal: hemograma, VHS, PCR, ALT, AST",
          "Imobilização da extremidade afetada para conforto",
        ],
        tx_cirurgico: [
          "Falha clínica após 48–72h de antibiótico IV",
          "Abscesso subperiosteal ou intracortical documentado por RMN ou US (sinal da 'penumbra' na RM em T1 — sensibilidade 73%, especificidade 99%)",
          "Osteomielite crônica (sequestro ósseo — involucro + sequestro = indicação clássica); para defeitos >7 cm: osteogênese por distração (Ilizarov)",
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
          "Osteomielite crônica (tratamento inadequado ou tardio) — desbridamento + esferas de PMMA com antibiótico; enxerto ósseo na 2ª cirurgia",
          "Alteração de crescimento (pontes fisárias, alongamento ou encurtamento do membro)",
          "Fraturas patológicas",
          "Tromboembolismo venoso + êmbolos pulmonares sépticos (especialmente MRSA/USA300 com toxina PVL — citotoxina formadora de poros com afinidade por leucócitos)",
          "Coagulopatia / CIVD em casos graves",
          "Osteomielite subaguda: início insidioso, sem sinais sistêmicos, lesão óssea radiográfica desde a apresentação — diagnóstico diferencial com tumor; diagnóstico frequentemente tardio",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Campbell's Operative Orthopaedics, 14ª ed.", "Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 12"],
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
              "Probabilidade: 0 critérios <0,2%; 4 critérios = 93%; 5 critérios = 98%",
            ],
          },
        ],
        mecanismo:
          "Disseminação hematogênica → pus intra-articular → pressão aumentada → oclusão vascular da cabeça femoral → necrose avascular em 8–12 horas. Enzimas bacterianas (colagenase, hialuronidase) destroem a cartilagem articular — dano cartilaginoso inicia em apenas 8h do início. URGÊNCIA: drenagem deve ocorrer em <6h do diagnóstico para prevenir NAO.",
        tx_nao_cirurgico: [
          "NÃO existe tratamento conservador definitivo para artrite séptica confirmada do quadril",
          "Antibiótico IV imediato (empírico) enquanto se prepara cirurgia",
          "Punção aspirativa: diagnóstico + descompressão de alívio (não substitui drenagem cirúrgica)",
          "Análise do líquido articular: >50.000 leucócitos/mm³ + glicose baixa + Gram positivo → alta probabilidade",
        ],
        tx_cirurgico: [
          "INDICAÇÃO ABSOLUTA: artrite séptica confirmada ou altamente provável (≥3–4 critérios de Kocher)",
          "Meta: drenagem em <6 horas do diagnóstico",
          "Artroscopia ou artrotomia aberta — não há diferença em desfecho se realizada precocemente; desbridamento artroscópico aceito para joelho, quadril e ombro",
        ],
        cirurgias: [
          "Artroscopia de quadril: lavagem + drenagem + culturas (menos invasivo, recuperação mais rápida)",
          "Artrotomia aberta via anterior (evitar via posterior no quadril — risco de instabilidade capsular): acesso amplo para limpeza — preferida em lactentes <6 meses",
          "Drenagem da osteomielite concomitante se presente",
          "Antibiótico IV por ~3 semanas total (Lovell & Winter); outros autores indicam 4–6 semanas (Tachdjian/Campbell) — conversão para VO após normalização de PCR + melhora clínica",
        ],
        complicacoes: [
          "Necrose avascular da cabeça femoral (NAO) — principal complicação do diagnóstico tardio",
          "Artrose do quadril (destruição cartilaginosa por enzimas bacterianas)",
          "Coxa magna (alargamento da cabeça por hiperemia)",
          "Luxação patológica (cápsula distendida + fraqueza muscular)",
          "Retardo do crescimento (lesão fisária)",
          "Sepse (MRSA virulento)",
        ],
        fontes: ["Tachdjian's Pediatric Orthopaedics, 5ª ed.", "Rockwood — Fraturas em Crianças, 9ª ed.", "Campbell's Operative Orthopaedics, 14ª ed.", "Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 12"],
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
        subtitulo: "Tachdjian's · Campbell's cap. 29 · Lovell & Winter's 8ª ed. cap. 28",
        epidemiologia:
          "Incidência: 0,93–1,5/1.000 nascidos vivos (Lovell & Winter) / 1–2/1.000 (referências clássicas). Predomínio masculino (2:1). Bilateral em ~50%. Base genética multifatorial: via PITX1–TBX4–HOX; risco elevado em familiares de primeiro grau. Associado a mielomeningocele e artrogripose. Diagnóstico clínico ao nascimento; diagnóstico pré-natal por ultrassonografia a partir de 12 semanas gestacionais.",
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
          "Etiologia multifatorial: fatores genéticos, posicionamento intrauterino, fatores vasculares e musculares. Caracterizado por quatro componentes (CAVE): cavo, aduto, varo e equino. Deformidade estrutural com alterações musculoesqueléticas primárias, não meramente posicional.",
        tx_nao_cirurgico: [
          "Método Ponseti (padrão-ouro): início nas primeiras semanas de vida; 5–8 gessos inguino-podálicos trocados a cada 5–7 dias",
          "Sequência de correção: 1º corrigir o cavo (supinar levemente o antepé para alinhar com o retropé), depois abduzir progressivamente o antepé — NUNCA pronação isolada do antepé (piora o cavo); contrapressão exclusivamente no aspecto dorsolateral da cabeça do tálus — NUNCA sobre o calcâneo",
          "Tenotomia percutânea do tendão de Aquiles: indicada em >90% dos casos ao final das séries de gessos (1,5–3 meses de vida); seguida de gesso adicional por 3 semanas para cicatrização em posição corrigida",
          "Órtese de abdução do pé (foot abduction brace — FAB / Denis-Browne): 23 h/dia por 3 meses após remoção do último gesso → uso noturno/sono até 3–5 anos de idade; não aderir à órtese é a principal causa de recorrência",
          "Taxa de sucesso: 95% quando protocolo e órtese seguidos corretamente",
          "Resultados de longo prazo (Cooper & Dietz, 1995 — follow-up médio de 34 anos): 78% excelente ou bom",
        ],
        tx_cirurgico: [
          "Falha do método Ponseti (recorrência persistente, pé rígido irredutível)",
          "Apresentação tardia (>2 anos) em pé rígido não responsivo à gessagem",
          "Artrogripose associada (maior resistência à correção conservadora)",
          "Cirurgia 'à la carte': abordagem por liberação seletiva de estruturas tensas (Carroll ou McKay); preservar ligamento talocalcânea interósseo; idade ideal 3–12 meses",
        ],
        cirurgias: [
          "Transferência do tendão tibial anterior (TTAP) para o 3º cuneiforme — recorrência supinada em criança >2 anos com fise aberta",
          "Liberação posteromedial seletiva ('à la carte') — técnicas de Carroll ou McKay; preservar ligamento interósseo talocalcânea; raramente necessária na era Ponseti",
          "Liberação posteromedial ampla (Turco) — indicação excepcional; risco de necrose avascular do tálus",
          "Osteotomias (calcâneo, cubóide, metatarsos) — correção de sequela em criança maior",
          "Artrodese tripla — sequela em adolescente/adulto com deformidade grave e artrose",
        ],
        complicacoes: [
          "Recorrência (20–30% dos casos Ponseti — principalmente por não adesão à órtese)",
          "Pé cavo residual",
          "Deformidade em cavo-varo supinado (correção insuficiente)",
          "Necrose avascular do tálus (cirurgia aberta extensiva)",
          "Rigidez residual e artrose pós-cirúrgica precoce",
        ],
        fontes: [
          "Tachdjian's Pediatric Orthopaedics, 5ª ed.",
          "Campbell's Operative Orthopaedics, 14ª ed.",
          "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28",
        ],
      },
      {
        id: "talus-vertical-congenito",
        titulo: "Tálus Vertical Congênito",
        subtitulo: "Lovell & Winter's 8ª ed. cap. 28",
        epidemiologia:
          "Incidência: ~1/10.000 nascidos vivos. Bilateral em ~50% dos casos. Isolado (sem causa identificável) em ~50%; associado a mielomeningocele, artrogripose e síndromes cromossômicas na outra metade. Bases genéticas identificadas: genes HOXD10 e CDMP-1.",
        classificacao: [
          {
            sistema: "Diagnóstico Radiográfico (radiografias em posições forçadas — obrigatórias)",
            itens: [
              "Lateral em máxima plantiflexão: tálus permanece verticalizado mesmo sob plantiflexão forçada do pé (diferencia de pé plano flexível grave)",
              "Lateral em máxima dorsiflexão: navicular permanece dorsal ao colo do tálus — luxação talonavicular irredutível confirmada",
              "NENHUMA das deformidades é corrigível pela manipulação: dado patognomônico — 'pé em meissel' / 'pé persa' / rocker-bottom",
              "TC/RMN pré-operatória: avaliação das relações articulares e planejamento cirúrgico",
            ],
          },
        ],
        mecanismo:
          "Luxação talonavicular dorsal irreversível com verticalização do tálus e inversão da arquitetura do pé: calcâneo em equino, mediopé em dorsiflexão e abdução, navicular dorsalizado ao colo do tálus. Resulta na deformidade característica em 'barco virado' (rocker-bottom / pé persa).",
        tx_nao_cirurgico: [
          "Técnica de Dobbs (2006) — 'Ponseti reverso': gessagem seriada com plantiflexão progressiva do antepé para reduzir gradualmente a articulação talonavicular; ~8 gessos trocados a cada 5–7 dias",
          "Após última gessagem: tenotomia percutânea do tendão de Aquiles + pinagem percutânea da articulação talonavicular sob fluoroscopia",
          "Seguimento de Yang & Dobbs (2015) com follow-up médio de 7 anos: ROM superior e alinhamento radiográfico significativamente melhores em comparação com liberação aberta extensa (técnica clássica)",
          "Órtese de manutenção após remoção dos pinos para preservar a correção",
        ],
        tx_cirurgico: [
          "Técnica de Dobbs minimamente invasiva é a abordagem de primeira escolha",
          "Liberação aberta dorsal (acesso anterior ao tornozelo): indicada quando a técnica percutânea é insuficiente para redução completa",
          "Liberação da cápsula talonavicular dorsal + tendões extensores contraturados + tenotomia do tibial posterior se necessário",
          "Artrodeses (subtalar, mediotársica, tripla): procedimento de salvage em adolescente/adulto com artrose estabelecida — evitar como procedimento primário em criança",
        ],
        cirurgias: [
          "Tenotomia percutânea de Aquiles + pinagem articulação talonavicular (técnica de Dobbs) — procedimento de 1ª escolha",
          "Liberação extensora dorsal aberta com redução e fixação da articulação talonavicular por acesso anterior ao tornozelo",
          "Artrodese subtalar ou tripla — salvage em deformidade recorrente grave ou artrose no adolescente/adulto",
        ],
        complicacoes: [
          "Recorrência da deformidade se órtese não for usada adequadamente",
          "Necrose avascular do tálus (complicação maior da liberação aberta extensa)",
          "Perda de mobilidade do tornozelo e mediopé",
          "Artrose pós-cirúrgica precoce em procedimentos extensos",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28"],
      },
      {
        id: "pe-plano-flexivel-ped",
        titulo: "Pé Plano Flexível Pediátrico",
        subtitulo: "Lovell & Winter's 8ª ed. cap. 28",
        epidemiologia:
          "Prevalência decresce com a idade: 54% aos 3 anos → 24% aos 6 anos (Pfeiffer). O arco plantar se desenvolve espontaneamente na maioria das crianças até os 6 anos. Diagnóstico clínico: arco ausente em ortostatismo, restaurado ao sentar ou na ponta dos pés. Teste de Jack (dorsiflexão passiva do hálux restaura o arco) confirma padrão flexível.",
        classificacao: [
          {
            sistema: "Diferenciação Clínica Essencial",
            itens: [
              "Flexível assintomático: arco presente na ponta dos pés / teste de Jack positivo → observação; NÃO tratar profilaticamente",
              "Flexível sintomático: dor no mediopé, fadiga, limitação de atividade → intervenção conservadora",
              "Rígido: arco ausente em qualquer posição → investigar coalizão tarsal, tálus vertical congênito, artrogripose",
              "Pé plano valgo com calcâneo em valgo acentuado: avaliar necessidade de intervenção quando sintomático e refratário",
            ],
          },
        ],
        mecanismo:
          "Frouxidão ligamentar fisiológica e imaturidade musculotendínea na infância → colapso do arco medial em ortostatismo. Resolução espontânea na maioria com desenvolvimento musculoligamentar progressivo. Pé plano rígido sempre indica causa estrutural subjacente a ser identificada.",
        tx_nao_cirurgico: [
          "⚠️ Lovell & Winter (posição baseada em evidências de nível I): estudos clínicos randomizados NÃO demonstram benefício de modificações de calçados ou palmilhas sobre o desenvolvimento espontâneo do arco plantar (Garcia-Rodriguez; Driano — impacto psicológico negativo do tratamento desnecessário documentado em estudos controlados)",
          "Pé plano flexível assintomático: observação clínica exclusivamente; nenhuma indicação para palmilhas, calçados especiais ou restrição de atividade",
          "Pé plano flexível sintomático: palmilhas/órteses melhoram os sintomas, mas NÃO modificam a arquitetura do pé a longo prazo; uso restrito ao período sintomático",
          "Fisioterapia com alongamento do tríceps sural: indicada quando há equino associado ou calcâneo em valgo acentuado sintomático",
        ],
        tx_cirurgico: [
          "Pé plano flexível sintomático refratário a órteses e fisioterapia, com deformidade estrutural progressiva",
          "⚠️ Artroereíse subtalar (implante no seio do tarso): evidências insuficientes para uso rotineiro; taxa de até 83% de necessidade de remoção do implante em seguimentos de longo prazo — indicar com critério restrito",
          "Osteotomia de alongamento do calcâneo (Mosca): abordagem biológica preferida; corrige o valgo do retropé e restaura parcialmente a arquitetura do arco; indicada na deformidade estrutural significativa e sintomática",
          "⚠️ Artrodese tripla: risco significativo de artrose das articulações adjacentes a longo prazo — EVITAR como procedimento primário; reservar exclusivamente para salvage em deformidade grave do adolescente/adulto jovem",
        ],
        complicacoes: [
          "Artroereíse: dor residual no seio do tarso, sinovite, necessidade de remoção do implante (até 83%)",
          "Osteotomia de calcâneo: não-união, correção insuficiente, rigidez subtalar",
          "Artrodese tripla: artrose acelerada nas articulações adjacentes (talonavicular, calcaneocubóide) — complicação clinicamente relevante a longo prazo",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28"],
      },
      {
        id: "coalização-tarsal",
        titulo: "Coalizão Tarsal",
        subtitulo: "Lovell & Winter's 8ª ed. cap. 28",
        epidemiologia:
          "Prevalência: ~2% da população. Falha na diferenciação mesenquimal → união fibrosa, cartilaginosa ou óssea entre ossos do tarso. Calcâneonavicular e talocalcânea (faceta mediana) correspondem a ~90% de todos os casos. Bilateral em 50–60%. Herança autossômica dominante com penetrância completa. Apenas ~25% tornam-se sintomáticos ao longo da vida.",
        classificacao: [
          {
            sistema: "Por tipo de tecido de união",
            itens: [
              "Sinfibrosa (fibrosa): mais móvel, frequentemente assintomática por mais tempo",
              "Sincondrose (cartilaginosa): parcialmente móvel; pode ossificar-se com a maturidade esquelética",
              "Sinostose (óssea): rígida; sintomatologia mais precoce e intensa após ossificação completa",
            ],
          },
          {
            sistema: "Por localização — início dos sintomas",
            itens: [
              "Calcâneonavicular: sintomas aos 8–12 anos; melhor visualizada em radiografia oblíqua do pé (ângulo de 45°)",
              "Talocalcânea (faceta mediana): sintomas aos 12–16 anos; diagnóstico por TC coronal — ausência da faceta mediana é o sinal mais preciso (sinal do 'C' no RX não é patognomônico)",
              "TC obrigatória antes de qualquer ressecção: avaliar extensão real (~25 mm de profundidade na calcâneonavicular) e excluir coalizão talocalcânea concomitante",
            ],
          },
        ],
        mecanismo:
          "Rigidez progressiva do complexo subtalar/mediotársico → distribuição anormal de forças na marcha → dor, espasmo reflexo do fibular curto e longo (pseudoparalisia peroneal), limitação da eversão e inversão. Pé plano rígido adquirido é a apresentação clínica característica.",
        tx_nao_cirurgico: [
          "Coalizão assintomática: NÃO tratar — observação exclusiva independentemente da extensão radiográfica",
          "Coalizão sintomática: imobilização com bota gessada ou bota de andada por 4–6 semanas para controle do espasmo muscular peroneal",
          "Palmilhas de suporte medial e modificação das atividades de impacto: alívio sintomático temporário",
          "Infiltração com corticosteroide no seio do tarso: adjunto para controle de dor refratária à imobilização",
        ],
        tx_cirurgico: [
          "Indicado APENAS para coalizões sintomáticas refratárias ao tratamento conservador",
          "Calcâneonavicular: ressecção + interposição de gordura subcutânea (técnica de Mubarak/Masquijo); TC pré-operatória para dimensionar a extensão; taxa de sucesso 80–90%",
          "⚠️ 'Bico de tálus' (talar beaking ao RX): representa esporão de tração ligamentar, NÃO artrose degenerativa — NÃO é contraindicação à ressecção; erro clássico de interpretação radiográfica",
          "Talocalcânea: indicações de ressecção menos bem estabelecidas; envolvimento <50% da faceta posterior como critério favorável; pode necessitar osteotomia calcânea associada para valgo residual do retropé",
          "Artrodese (subtalar ou tripla): procedimento de salvage para falha da ressecção ou artrose estabelecida",
        ],
        cirurgias: [
          "Ressecção da coalizão calcâneonavicular + interposição de gordura subcutânea (Mubarak): acesso lateral oblíquo; preencher espaço com gordura fixada por fio absorvível; TC pré-op para planejar extensão",
          "Ressecção da coalizão talocalcânea por acesso medial (posterior ao maléolo medial); reconstrução do aspecto medial do seio do tarso",
          "Osteotomia de translação medial do calcâneo associada: corrigir valgo estrutural do retropé pós-ressecção",
          "Artrodese subtalar ou tripla: salvage para falha de ressecção ou artrose avançada",
        ],
        complicacoes: [
          "Recorrência da coalizão após ressecção (principalmente se interposição de gordura insuficiente ou ressecção incompleta)",
          "Falha cirúrgica por coalizão adicional não diagnosticada (TC pré-operatória mandatória)",
          "Artrose pós-ressecção se articulações adjacentes já comprometidas antes da cirurgia",
          "Distúrbio de crescimento (ressecção em idade muito precoce com envolvimento da fise)",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28"],
      },
      {
        id: "navicular-acessorio",
        titulo: "Navicular Acessório",
        subtitulo: "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28",
        epidemiologia:
          "Prevalência de 4–20% da população geral; mais comum em mulheres; bilateral em até 50–60% dos casos. Herança autossômica dominante com penetrância incompleta. Frequentemente associado ao pé plano flexível. Torna-se sintomático na adolescência, com pico entre 10–14 anos, coincidindo com o crescimento rápido e aumento da atividade física.",
        classificacao: [
          {
            sistema: "Classificação de Geist (mais utilizada)",
            itens: [
              "Tipo I: sesamoide arredondado de 2–6 mm dentro do tendão do tibial posterior, sem articulação com o navicular; raramente sintomático",
              "Tipo II: ossículo em forma de bala ou coração (5–12 mm), unido ao navicular por sincondrose fibrocartilagínea (2–2,5 mm); é o tipo mais frequentemente sintomático — histologia: microfraturas repetidas na sincondrose, resposta inflamatória local; 42% evoluem para fusão espontânea ao navicular (Knapik)",
              "Tipo III: navicular em forma de chifre ou cornual — provavelmente resultado da fusão consolidada de um Tipo II; geralmente assintomático",
            ],
          },
          {
            sistema: "Apresentação clínica",
            itens: [
              "Proeminência óssea dolorosa na borda medial do mediopé, proximal ao arco longitudinal",
              "Dor à palpação sobre o tubérculo navicular e ao longo do tendão do tibial posterior",
              "Eritema e edema localizados, exacerbados pelo calçado",
              "Associação frequente com pé plano valgo (subtalar valgo + pronação do antepé)",
              "Diagnóstico por radiografia em AP e oblíqua do pé; RM para avaliar sincondrose e edema de partes moles",
            ],
          },
        ],
        mecanismo:
          "O navicular acessório tipo II fica inserido na parte medial do tendão do tibial posterior. Durante a marcha, a tensão cíclica sobre a sincondrose provoca microfraturas de estresse de repetição, edema local e dor. O pé plano associado aumenta a tensão no tibial posterior, agravando os sintomas. A proeminência óssea também sofre atrito mecânico direto pelo calçado.",
        tx_nao_cirurgico: [
          "Primeira linha: restrição de atividades de impacto e calçados macios de largo bico",
          "Órtese de arco longitudinal medial: redistribui a carga e reduz a tensão sobre o tibial posterior",
          "Imobilização gessada ou bota walker por 4–6 semanas: indicada nos casos agudos com edema significativo ou que não respondem à órtese",
          "Anti-inflamatórios não esteroidais (AINEs) por ciclo curto",
          "Fisioterapia: fortalecimento do tibial posterior e dos flexores plantares após resolução da fase aguda",
          "A maioria dos pacientes melhora com tratamento conservador; recaídas são comuns com retorno precoce às atividades",
        ],
        tx_cirurgico: [
          "Indicações: falha do tratamento conservador por ≥6 meses com dor persistente e limitação funcional",
          "Procedimento preferido: excisão simples do ossículo (modificação do Kidner) — bons resultados em >82% dos casos na literatura pediátrica",
          "⚠️ Técnica modificada (sem avanço do tibial posterior): a excisão isolada do ossículo, sem rerouting ou avanço tendíneo, apresenta resultados equivalentes aos da técnica clássica de Kidner (com avanço), com menor morbidade",
          "Alternativa: fusão interna do ossículo ao navicular com parafuso canulado — taxa de não-união de até 18%; indicada quando há boa massa óssea e desejo de preservar a anatomia",
          "Artrorressonância pré-operatória útil para avaliar integridade do tendão tibial posterior associada",
        ],
        cirurgias: [
          "Excisão do navicular acessório (Kidner modificado): incisão medial sobre a proeminência, desinserção da porção do tibial posterior inserida no ossículo, excisão do osso acessório, sutura do tibial posterior ao navicular remanescente, remoção de qualquer proeminência óssea residual — imobilização gessada 4–6 semanas pós-op",
          "Fixação interna (fusão): curetagem da sincondrose + parafuso canulado axial — imobilização por 8–10 semanas",
        ],
        complicacoes: [
          "Recorrência da dor (mais comum após ressecção incompleta ou retorno precoce às atividades)",
          "Não-união do parafuso de fixação (até 18% na técnica de fusão)",
          "Fraqueza residual do tibial posterior após manipulação tendínea extensa",
          "Neuralgia do ramo medial do nervo safeno (lesão inadvertida na incisão)",
          "Cicatriz dolorosa na borda medial do pé",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28"],
      },
      {
        id: "pe-cavo",
        titulo: "Pé Cavo (Cavovarus e Calcaneocavus)",
        subtitulo: "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28",
        epidemiologia:
          "O pé cavo é uma deformidade complexa do arco longitudinal medial elevado. Dois padrões principais: (1) Cavovarus (cavo anterior) — o mais comum, com pronação do antepé e inversão do retropé; e (2) Calcaneocavus (cavo posterior) — quase exclusivo de mielomeningocele e sequela de poliomielite, com dorsiflexão do calcâneo e elevação global do arco. Em crianças e adolescentes, ≥2/3 dos casos de pé cavo têm etiologia neurológica subjacente. Dentre esses, >50% são decorrentes da doença de Charcot-Marie-Tooth (CMT), neuropatia motora e sensitiva hereditária de herança autossômica dominante com expressão variável.",
        classificacao: [
          {
            sistema: "Etiologia — auxilia no diagnóstico diferencial",
            itens: [
              "Bilateral e simétrico: sugere causa neurológica sistêmica — CMT (mais comum), ataxia de Friedreich, paraplegia espástica hereditária, Roussy-Lévy",
              "Unilateral: sugere lesão focal — disrafismo espinhal (médula presa, lipoma, diastematomielia), lesão do plexo braquial ipsilateral, tumor medular, sequela de poliomielite",
              "⚠️ Todo pé cavo de etiologia incerta deve ter coluna avaliada por RNM e investigação neurológica completa antes do tratamento definitivo do pé",
              "Causa tratável identificada (ex.: liberação de medula presa): tratar a causa ANTES de corrigir o pé — caso contrário, recorrência é esperada",
            ],
          },
          {
            sistema: "Teste de Coleman (bloco de madeira) — avalia flexibilidade do varo do retropé",
            itens: [
              "Princípio: o 1° metatarso plantar-flexionado cria o efeito tripé — o retropé assume posição vara para que o 5° metatarso toque o solo (supinação forçada do antepé → inversão obrigatória do subtalar)",
              "Técnica: paciente em ortostatismo, 1° e 2° metatarsos suspensos sobre a borda de um bloco de 2,5 cm, 3°–5° metatarsos e calcâneo apoiados no bloco",
              "Resultado positivo (retropé flexível): varo do calcâneo corrige para valgo ao suspender o 1° metatarso — transferência tendínea suficiente para equilibrar o antepé",
              "Resultado negativo (retropé rígido): varo persiste — necessita procedimentos ósseos no retropé (osteotomia calcaneal de deslocamento lateral ou artrodese)",
              "⚠️ Mosca recomenda versão radiográfica com bloco de Plexiglas de 2,5 cm sob os 3 metatarsos laterais para documentação objetiva do ângulo tálus–1° metatarso",
            ],
          },
          {
            sistema: "Patoanatomia do CMT (padrão cavovarus típico)",
            itens: [
              "Sequência: fraqueza dos intrínsecos → garras de dedos → 1° metatarso plantar-flexionado → efeito 'windlass' da fáscia plantar eleva o arco durante a marcha",
              "Tibial anterior fraco × peroneus longus relativamente preservado → desequilíbrio plantar-flexão do 1° raio",
              "Tibial posterior preservado × peroneus brevis fraco → desequilíbrio inversor/eversor do subtalar",
              "Evolução: antepé pronado rigidamente → efeito tripé → retropé varo (inicialmente flexível, depois rígido por contratura das partes moles plantares-mediais)",
              "Torção tibial externa: invariavelmente presente no CMT — só diagnosticada após correção do componente subtalar interno",
            ],
          },
          {
            sistema: "Radiologia",
            itens: [
              "Raio X lateral em ortostatismo: ângulo de Meary (eixo tálus × eixo 1° metatarso) > 0° indica cavus; foot-CORA situa-se no corpo do cuneiforme medial na maioria dos cavovarus",
              "Pitch do calcâneo > 30° + equino do antepé: confirma cavus",
              "Raio X AP do pé: paralelismo tálus–calcâneo e adução talonavicular indicam varo do retropé",
              "Raio X AP pelvis: CMT associado a displasia progressiva do quadril",
              "RNM de coluna: obrigatória se assimetria, dor lombar, alterações cutâneas, ou exame neurológico anormal",
            ],
          },
        ],
        mecanismo:
          "No cavovarus por CMT, a denervação começa pelos intrínsecos do pé, desestabilizando o equilíbrio entre extensores longos e flexores longos dos dedos (garras). O peroneus longus (plantar-flexor do 1° metatarso) permanece relativamente forte enquanto o tibial anterior (dorsiflexor do 1° raio) enfraquece, gerando plantar-flexão progressiva do 1° metatarso. Pela fáscia plantar (efeito windlass), isso eleva o arco. O efeito tripé força o retropé a assumir posição vara durante o apoio. Com o tempo, a contratura das partes moles plantar-mediais torna o varo do subtalar rígido e irredutível. No calcaneocavus, a ausência de força no tríceps sural (mielomeningocele, poliomielite) permite que os flexores do antepé plantar-flexionem o médio e antepé sobre o retropé, gerando o calcâneo hiperdorsifletido.",
        tx_nao_cirurgico: [
          "Papel muito limitado no manejo definitivo — deformidades neuromusculares progressivas não são controladas efetivamente com órteses ou fisioterapia",
          "Palmilha acomodativa de arco longitudinal + modificação de calçado: uso temporário enquanto se investiga e trata a etiologia, ou para aliviar sintomas em deformidades leves e não progressivas",
          "Fisioterapia de alongamento (fáscia plantar, tibial posterior): adjuvante, sem evidência de modificação da história natural",
          "⚠️ Não há evidências de que órteses ou fisioterapia previnam progressão em doenças neuromusculares como CMT — o tratamento definitivo é cirúrgico quando há progressão, calosidades dolorosas ou instabilidade do tornozelo",
        ],
        tx_cirurgico: [
          "Indicações: deformidade progressiva, calosidades dolorosas sob as cabeças metatarsais ou base do 5° metatarso, instabilidade do tornozelo",
          "Princípios fundamentais: (a) corrigir TODAS as deformidades segmentares; (b) equilibrar as forças musculares com transferências tendíneas — fazer apenas um dos dois gera recorrência (deformidade com balanço muscular) ou equilíbrio de uma deformidade fixa",
          "Princípio adicional: preservar opções terapêuticas futuras — recorrência é esperada nas doenças progressivas; educar família que novas cirurgias poderão ser necessárias",
          "Algoritmo baseado na flexibilidade do retropé (teste de Coleman):",
          "— Retropé FLEXÍVEL (Coleman positivo): (1) release plantar-medial superficial [fascia plantar + origens do abdutor do hálux + flexores curtos] ± alongamento do tibial posterior; (2) osteotomia cuneiforme medial de abertura em base plantar (foot-CORA no cuneiforme medial — osteotomia NO sítio da deformidade, não no 1° metatarso); (3) transferência do peroneus longus para o peroneus brevis [transferência mais importante — elimina força deformante, fortalece a eversão]",
          "— Retropé RÍGIDO (Coleman negativo): acrescentar (4) release plantar-medial profundo [cápsula talonavicular] e (5) osteotomia calcaneal de deslocamento lateral posterior (zona segura: entre linha póstero-superior do tubérculo calcaneal e linha 11,2 mm anterior e paralela a ela)",
          "— Deformidade GRAVE, RÍGIDA, RECORRENTE ou NEGLIGENCIADA: osteotomias de ressecção/artrodese do médio-tarso (Cole, Japas, Jahss) como segunda linha; artrodese tripla como último recurso",
          "⚠️ Artrodese tripla causa artrose das articulações adjacentes não fundidas no longo prazo e não corrige isoladamente todas as deformidades associadas — reservada para deformidades graves, rígidas e recorrentes; evitar como procedimento primário em crianças",
          "Osteotomia do 1° metatarso: menos indicada que a do cuneiforme medial — coloca a fise em risco, requer fixação interna, não está no sítio da deformidade (foot-CORA) e transfere carga para a cabeça do 2° metatarso",
          "Torção tibial externa associada ao CMT: abordada apenas após correção do componente subtalar; osteotomia tibial desrotacional se sintomática",
        ],
        cirurgias: [
          "Release plantar-medial superficial: incisão medial, liberação da fáscia plantar + origens do abdutor do hálux (3 origens no calcâneo) + flexores curtos — proteger os feixes neurovasculares plantares medial e lateral",
          "Release plantar-medial profundo: inclui capsulotomia da articulação talonavicular além do release superficial — para retropé rígido",
          "Osteotomia cuneiforme medial de abertura (base plantar): cunha plantar aberta no cuneiforme medial, estável sem fixação interna; produz também abdução do mediopé como efeito desejável",
          "Osteotomia calcaneal de deslocamento lateral posterior: fragmento posterior transladado (e eventualmente angulado) lateralmente; abordagem idêntica à do calcâneo valgus, porém com deslocamento oposto",
          "Transferência do peroneus longus para o peroneus brevis: ancoragem na base do 5° metatarso — elimina força plantar-flexora do 1° raio e reforça eversão pura",
          "Artrodese tripla (Hoke): ressecção das articulações talocalcaneal, talonavicular e calcaneocubóidea com cunhas dorsolaterais + fixação interna — imobilização 12 semanas",
        ],
        complicacoes: [
          "Recorrência da deformidade (esperada nas doenças neurológicas progressivas — família deve ser orientada)",
          "Artrose das articulações adjacentes não fundidas após artrodese tripla (progressiva a longo prazo)",
          "Lesão dos nervos plantares medial e lateral durante release (fasciotomia profunda)",
          "Lesão dos nervos calcaneais medial e lateral durante osteotomia calcaneal (risco independente do sítio da osteotomia)",
          "Não-união ou consolidação viciosa das osteotomias",
          "Transferência tendínea de fase inadequada: perda de função motora residual",
          "Desequilíbrio muscular residual exigindo nova intervenção",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 28"],
      },
      {
        id: "tornozelo-ped",
        titulo: "Fraturas do Tornozelo Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 30 · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33",
        epidemiologia:
          "Fraturas fisárias do tornozelo: ~5% de todas as fraturas pediátricas e 1 em cada 6 fraturas fisárias (17%). SH II da tíbia distal é a mais frequente. Tillaux e Triplane são chamadas 'fraturas de transição' (transitional fractures) — ocorrem em adolescentes durante o fechamento assimétrico da fise tibial distal: central primeiro, medial depois, ântero-lateral por último. A fise da fíbula fecha 1–2 anos após a tíbia (ao nível do domo talar).",
        classificacao: [
          {
            sistema: "Baixo Risco (Spiegel/Vahvanen) — SH I e II",
            itens: [
              "SH I fibular distal: imobilização com carga 4 semanas",
              "SH I/II tibial distal não deslocada: gesso sem carga 2–3 semanas, depois com carga até 4–6 semanas",
              "SH I/II deslocada: redução fechada + gesso; se gap fisário residual > 3 mm → suspeitar tecido interposto",
              "Tecido interposto (periósteo, tendão, estrutura neurovascular): abordagem do lado de tensão para remoção + fixação com fios lisos ou parafusos metafisários se instável",
            ],
          },
          {
            sistema: "Alto Risco — SH III e IV",
            itens: [
              "Fraturas intra-articulares — redução obrigatoriamente anatômica",
              "Hairline (1–2 mm em todas as projeções): gesso longo + seguimento rigoroso",
              "Deslocamento > 2 mm: TC para definir padrão + RAFI",
              "Em crianças com > 2 anos de crescimento: evitar fixação cruzando a fise — porém restauração articular tem prioridade sobre crescimento",
              "⚠️ Lovell & Winter (cap. 33): fíbula e tíbia distais contribuem apenas 5–7 mm/ano de crescimento longitudinal — discrepância de comprimento raramente é problema clínico major; complicação mais frequente é deformidade angular por barra fisária assimétrica",
            ],
          },
          {
            sistema: "Fratura de Tillaux",
            itens: [
              "Avulsão SH III da porção ântero-lateral da epífise tibial pelo ligamento tibiofibular anterior",
              "Biplane: plano coronal (epifisário) + plano horizontal (fisário)",
              "Alguns casos difíceis de detectar no RX simples → TC confirma padrão e deslocamento",
              "Redução fechada: rotação interna do pé + imobilização; documentar qualidade da redução",
              "RAFI indicada se passo articular pós-redução > 2 mm (acesso anterolateral, parafusos canulados através da fise — fise em fechamento, não há risco de distúrbio de crescimento)",
            ],
          },
          {
            sistema: "Fratura Triplane",
            itens: [
              "Rotação externa com fechamento fisário parcial assimétrico → forças de cisalhamento em 3 planos",
              "No AP: parece SH III (linha vertical na epífise); no perfil: parece SH II (fragmento metafisário) — combinação é diagnóstica de triplane",
              "2 fragmentos: linha única horizontal na TC axial pelo nível epifisário",
              "3 fragmentos: 3 linhas radiando na TC axial ('Mercedes-Benz sign') — geralmente mais deslocado",
              "Triplane extra-articular: traço sai pelo maléolo medial além da superfície articular — prognóstico melhor",
              "TC recomendada após tentativa de redução fechada e imobilização para confirmar alinhamento articular",
              "RAFI se incongruência articular > 2 mm; acesso anterolateral para 2 fragmentos; anterolateral ± posteromedial para 3–4 fragmentos; artroscopia assistida em casos selecionados",
            ],
          },
        ],
        mecanismo:
          "Tillaux: rotação externa → ligamento tibiofibular anterior avulsiona ântero-lateral da epífise (último setor a fechar). Triplane: rotação externa com fechamento fisário assimétrico → forças simultâneas em 3 planos. SH I/II: inversão ou eversão em criança com fise aberta (fise mais vulnerável que ligamentos). Fraturas de transição não geram distúrbio de crescimento clinicamente relevante (fise em fechamento).",
        tx_nao_cirurgico: [
          "SH I fibular não deslocada: gesso curto com carga 4 semanas",
          "SH I/II tibial não deslocada: gesso sem carga 2–3 semanas → carga até 4–6 semanas total",
          "SH II deslocada: redução fechada + gesso acima do joelho sem carga 3 semanas → bota com carga até consolidação (6 semanas total)",
          "Tillaux/Triplane com passo articular < 2 mm: gesso longo sem carga 6 semanas",
        ],
        tx_cirurgico: [
          "SH III–IV com passo articular > 2 mm após tentativa de redução fechada",
          "SH II com tecido interposto impedindo redução adequada",
          "Tillaux ou Triplane com incongruência articular > 2 mm (limiar de artrose por incongruência)",
          "Fraturas abertas",
          "Instabilidade articular com luxação associada",
        ],
        cirurgias: [
          "SH III/IV: parafusos canulados intraepifisários paralelos à fise (evitar cruzar fise se > 2 anos de crescimento — mas articulação tem prioridade)",
          "Tillaux: parafuso canulado 4,5 mm anterolateral cruzando a fise (justificado — fise em fechamento)",
          "Triplane 2 fragmentos: parafuso canulado anterolateral percutâneo",
          "Triplane 3 fragmentos: RAFI anterolateral ± posteromedial; artroscopia assistida se incerteza sobre congruência articular",
          "Quando instável mas sem indicação de RAFI: fios lisos ou parafusos metafisários após redução aberta para remoção de tecido interposto",
        ],
        complicacoes: [
          "Barra fisária com deformidade angular assimétrica: mais comum que discrepância de comprimento (fíbula/tíbia contribuem apenas 5–7 mm/ano — Lovell & Winter cap. 33); epifisiodese total ou contralateral assim que crescimento anormal for detectado",
          "Artrose da articulação tibiotársica: relacionada à incongruência articular residual ≥ 2 mm — meta cirúrgica é redução a ≤ 2 mm",
          "Consolidação viciosa em rotação (SH II com redução inadequada)",
          "Dor crônica e limitação funcional por artrose pós-traumática",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 30", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33"],
      },
      {
        id: "pe-ped",
        titulo: "Fraturas do Pé Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 31",
        epidemiologia:
          "Comuns em crianças; geralmente de baixa gravidade. Metatarsos e falanges são os mais afetados. Diagnóstico diferencial crítico: Fratura de Jones (zona hipovascular — risco de não-união) vs. Pseudo-Jones (avulsão apofisária — bom prognóstico). Fraturas do tálus e calcâneo são raras mas potencialmente graves (NAO, artrose).",
        classificacao: [
          {
            sistema: "5° Metatarso Base — diagnóstico diferencial obrigatório",
            itens: [
              "Pseudo-Jones (avulsão apofisária da tuberosidade — Zona I): linha de fratura perpendicular ao eixo do 5° metatarso; bota de andada 4 semanas; consolidação garantida",
              "Fratura de Jones (zona metadiafisária — Zona II): linha paralela ao eixo; zona hipovascular; gesso sem carga 6–8 semanas; risco de não-união",
              "Fratura de stress diafisária (Zona III): atletas; parafuso intramedular se atleta de alta demanda",
            ],
          },
          {
            sistema: "Tálus — Hawkins (colo do tálus)",
            itens: [
              "Tipo I: sem deslocamento → sem carga 8–12 semanas; NAO < 15%",
              "Tipo II: deslocamento + luxação subtalar → redução + cirurgia; NAO 20–40%",
              "Tipo III: deslocamento + luxação subtalar + tibiotalar → urgência cirúrgica; NAO 40–80%",
              "Tipo IV (Canale-Kelly): + luxação talonavicular → NAO > 80%",
              "Sinal de Hawkins: osteopenia subcondral em 6–8 semanas = perfusão preservada (bom prognóstico)",
            ],
          },
          {
            sistema: "Calcâneo",
            itens: [
              "Crianças: geralmente extra-articular (bom prognóstico) — ângulo de Böhler preservado",
              "Adolescentes: intra-articular (avaliar com TC, ângulo de Böhler reduzido)",
              "Síndrome de compartimento do pé: urgência na fratura de alta energia",
            ],
          },
        ],
        mecanismo:
          "Metatarsos/falanges: esmagamento, torção, objeto pesado. Tálus: força axial em dorsiflexão forçada (queda de altura, prancha de surf). Calcâneo: queda de altura em bipodalismo — associar com fratura de coluna lombar (> 10% dos casos, solicitar RX de coluna).",
        tx_nao_cirurgico: [
          "Falanges: curativo compressivo + bota de andada 3–4 semanas (buddy-taping)",
          "Metatarsos 2°–4° deslocados: gesso bota curta 4–6 semanas; aceitar < 10° angulação e < 3 mm deslocamento",
          "Pseudo-Jones: bota de andada 4 semanas; carga conforme tolerância",
          "Fratura de Jones: gesso sem carga 6–8 semanas; se sem consolidação em 8 semanas → parafuso",
          "Hawkins I: sem carga 8–12 semanas + seguimento com RMN para NAO",
        ],
        tx_cirurgico: [
          "Hawkins II–IV: redução anatômica urgente + fixação (parafusos canulados)",
          "Calcâneo intra-articular com Böhler < 0° ou deformidade grave em adolescente: RAFI",
          "Lisfranc deslocado: RAFI (crianças) ou artrodese (adolescente)",
          "Jones com não-união > 8 semanas ou atleta de alta demanda: parafuso intramedular",
        ],
        cirurgias: [
          "RAFI do tálus: parafusos canulados anteroposterior (acesso anterior e anteromedial)",
          "RAFI do calcâneo: placa em L lateral (adolescente com fratura intra-articular grave)",
          "Parafuso intramedular 4,5 mm no 5° metatarso (Jones refratário — acesso mínimo)",
          "RAFI de Lisfranc: parafusos transarticulares + fios K; artrodese em lesões graves",
        ],
        complicacoes: [
          "NAO do tálus (Hawkins III–IV: 40–80% — verificar sinal de Hawkins em 6–8 semanas)",
          "Artrose pós-traumática (Lisfranc, calcâneo intra-articular, Hawkins com redução inadequada)",
          "Não-união da fratura de Jones (zona hipovascular — TC se sem calo em 8 semanas)",
          "Síndrome compartimental do pé (calcâneo de alta energia — fasciotomia de urgência)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 31"],
      },
    ],
  },
  {
    id: "joelho-ped",
    label: "Joelho",
    topicos: [
      {
        id: "lesoes-joelho-ped",
        titulo: "Lesões Intra-Articulares do Joelho Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 28 · Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33",
        epidemiologia:
          "Lesões ligamentares puras são raras antes do fechamento das fises (o osso falha antes do ligamento). Em crianças, fraturas fisárias e avulsões substituem as lesões ligamentares do adulto. Com a maturidade esquelética, o padrão se aproxima do adulto. OCD juvenil (fise aberta) tem melhor prognóstico que a forma adulta. Avulsão do tubérculo tibial: meninos 13–16 anos em crescimento acelerado, frequentemente relacionada a Osgood-Schlatter prévio.",
        classificacao: [
          {
            sistema: "Avulsão da Espinha Tibial (LCA) — Meyers-McKeever",
            itens: [
              "Tipo I: não deslocado (<2 mm) → gesso joelho em extensão 6 semanas — EXTENSÃO preferível à flexão (perda de extensão é mais incapacitante que instabilidade residual — L&W cap. 33)",
              "Tipo II: levantado anteriormente (dobradiça posterior intacta) → aspiração do hemartrose + anestésico local + redução em extensão; se reduzido → gesso; se irredutível → artroscopia (ligamento intermeniscal ou corno anterior do menisco pode interpor-se bloqueando a redução)",
              "Tipo III: completamente deslocado → redução artroscópica + fixação (parafuso ou âncora de sutura epifisária — evitar cruzar fise)",
              "Tipo IV (Zaricznyj): fragmento cominutivo → artroscopia; ⚠️ L&W cap. 33: 60% dos pacientes perdem >10° de extensão (Wiley e Baxter) — imobilização em extensão máxima é a melhor estratégia preventiva",
            ],
          },
          {
            sistema: "Avulsão do Tubérculo Tibial — Watson-Jones/Ogden",
            itens: [
              "Tipo I: avulsão do fragmento distal do tubérculo (sem envolver fise proximal)",
              "Tipo II: fragmento maior, articulação com metáfise tibial proximal",
              "Tipo III: linha de fratura atravessa a fise proximal da tíbia (intra-articular — SH III)",
              "Tipo IV: associação com separação da fise tibial proximal",
              "⚠️ L&W cap. 33 — síndrome compartimental anterior associada à avulsão do tubérculo tibial (Pape et al.): redução fechada/percutânea sem descompressão pode ser insuficiente → considerar fasciotomia profilática do compartimento anterior",
              "Genu recurvatum: fechamento prematuro da porção anterior da fise tibial proximal em pacientes com <2 anos de crescimento residual → vigilância radiológica até o final do crescimento",
            ],
          },
          {
            sistema: "Osteocondrite Dissecante (OCD) — Estabilidade Artroscópica",
            itens: [
              "Estável: cartilagem íntegra → conservador (restrição de carga 3–6 meses)",
              "Instável com cartilagem adelgaçada mas intacta: perfuração subondral ou fixação",
              "Fragmento livre: remoção (se <1 cm) ou refixação (se >1 cm com boa qualidade condral)",
              "Côndilo femoral medial posterolateral: localização em 75% dos casos",
            ],
          },
          {
            sistema: "Menisco Discoide Lateral (Watanabe)",
            itens: [
              "Tipo I: completo (cobre todo o planalto tibial lateral)",
              "Tipo II: incompleto",
              "Tipo III: Wrisberg variant (sem ligamento coronário posterior — hipermóvel, risco de prolapso)",
            ],
          },
        ],
        mecanismo:
          "Avulsão espinha tibial: hiperextensão + rotação (queda de bicicleta, esporte). Avulsão do tubérculo tibial: contração súbita violenta do quadríceps em adolescente com apófise ainda cartilaginosa (salto, sprint). OCD: microtrauma repetitivo + isquemia subondral. Menisco discoide: variante congênita → pode romper com trauma mínimo ou ser assintomático.",
        tx_nao_cirurgico: [
          "Avulsão espinha Tipo I: gesso joelho em EXTENSÃO 6 semanas (perda de extensão é mais incapacitante que instabilidade por LCA — L&W cap. 33)",
          "Avulsão espinha Tipo II: aspiração do hemartrose + lidocaína intra-articular → redução em extensão + gesso se estável",
          "Avulsão tubérculo tibial Tipo I estável: imobilização em extensão + vigilância da fise tibial proximal",
          "OCD estável (fise aberta): restrição de carga com muletas 3–6 meses + RMN controle — taxa de cura espontânea ~50%",
          "Menisco discoide assintomático: observação",
          "Ruptura meniscal sintomática: repouso + fisioterapia antes de indicar artroscopia",
        ],
        tx_cirurgico: [
          "Avulsão espinha Tipo III–IV: artroscopia + fixação (verificar e remover tecido interposto meniscal ou ligamentar)",
          "Avulsão tubérculo tibial Tipo II–IV: RAFI com parafuso cortical; avaliar necessidade de fasciotomia do compartimento anterior profilática",
          "OCD instável ou fragmento livre: artroscopia",
          "Menisco discoide sintomático: meniscoplastia artroscópica (preservar o menisco — saucerization)",
          "Ruptura meniscal em joelho com fise aberta: reparo meniscal (preferível à menisectomia — risco artrose futura)",
        ],
        cirurgias: [
          "Artroscopia: avulsão espinha → redução + âncora de sutura epifisária ou parafuso absorvível (evitar cruzar fise); OCD → perfuração, fixação, enxerto osteocondilar (se fragmento livre grande)",
          "RAFI do tubérculo tibial: parafuso cortical 4,5 mm paralelo e superior à fise; fasciotomia anterior profilática se edema tenso ou síndrome compartimental nascente",
          "Meniscoplastia artroscópica (saucerization do discoide + reparo posterior se possível)",
          "Reconstrução do LCA: em adolescentes Tanner IV–V com fise quase fechada → técnica fisária (all-epiphyseal ou over-the-top)",
        ],
        complicacoes: [
          "Perda de extensão do joelho após avulsão de espinha tibial: ocorre em ~60% dos casos (Wiley e Baxter — L&W cap. 33); imobilização em extensão máxima é a medida preventiva mais eficaz",
          "Instabilidade residual do joelho (avulsão espinha mal reduzida → LCA frouxo funcional — menos incapacitante que a perda de extensão)",
          "Síndrome compartimental anterior após avulsão do tubérculo tibial: vigilância rigorosa nas primeiras 12–24h; fasciotomia profilática a considerar (L&W cap. 33)",
          "Genu recurvatum: fechamento prematuro da fise tibial proximal anterior após avulsão do tubérculo → controle radiológico semestral até o final do crescimento",
          "Artrose precoce (menisectomia em joelho imaturo — evitar a todo custo)",
          "Não-consolidação da OCD com fragmento livre → dor e travamento crônicos",
          "Lesão fisária inadvertida durante artroscopia ou reconstrução LCA",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 28", "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 33"],
      },
      {
        id: "doenca-blount",
        titulo: "Doença de Blount (Tibia Vara)",
        subtitulo: "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 26",
        epidemiologia:
          "Inibição de crescimento na porção posteromedial da fise tibial proximal com deformidade progressiva em varo. Dois tipos clínicos distintos: precoce/infantil (2–7 anos) e tardio (≥10 anos). Forma precoce: predomínio feminino, frequentemente bilateral, deformidade multiplanar (varo + apex anterior + torção tibial interna + inibição de comprimento). Forma tardia: predomínio em meninos obesos, unilateral, combinação de varo femoral distal e tibial proximal. Fatores de risco: obesidade + início precoce da marcha. Mecanismo predominante: Hueter-Volkmann (carga compressiva excessiva na fise medial → inibição do crescimento) ou Delpech (sobrecrescimento lateral relativo). ⚠️ Obesidade necessária mas não suficiente — outros fatores contribuintes ainda não elucidados.",
        classificacao: [
          {
            sistema: "Langenskiöld (1952) — mais utilizada",
            itens: [
              "6 estágios de gravidade progressiva",
              "Baixo grau (I–IV): alterações fisárias reversíveis — melhor prognóstico para guia de crescimento",
              "Alto grau (V–VI): bridge ósseo medial irreversível — geralmente requer osteotomia",
              "⚠️ Concordância interobservador ruim nos estágios intermediários; divisão em baixo/alto grau melhora reprodutibilidade",
            ],
          },
          {
            sistema: "Laville — leva em conta idade e progressão",
            itens: [
              "Estágio 0: <2,5 anos, beaking metafisário + fise ativa → observação bianual (resolução espontânea possível)",
              "Estágio 1: >2,5 anos, Blount certo, fise ativa sem bridge → 1/3 resolve espontaneamente",
              "Estágio 2: Blount certo, fise inativa com bridge ósseo medial (2A: platô normal; 2B: platô inclinado) → osteotomia",
            ],
          },
          {
            sistema: "LaMont — prognóstico cirúrgico para Langenskiöld II-III",
            itens: [
              "Tipo A: defeito metafisário medial com lucência parcial",
              "Tipo B: defeito completamente lúcido com borda inferior em rampa ascendente (saucer que segura água) — melhor prognóstico pós-osteotomia",
              "Tipo C: borda inferior sem rampa (saucer invertido) — pior prognóstico para correção definitiva",
            ],
          },
          {
            sistema: "Índices radiográficos para diferenciação fisiológico × patológico",
            itens: [
              "MDA (Levine-Drennan): ângulo metafisário-diafisário proximal da tíbia; >11° indica risco; <9° ou >16° erro <5%; zona cinzenta 9–16° (30–40% dos casos)",
              "EMA (Davids): ângulo epifisário-metafisário; MDA≥10° + EMA>20° = alto risco de progressão",
              "FTR (McCarthy): razão MDA femoral distal ÷ MDA tibial proximal; <1 = Blount precoce com boa especificidade e sem interferência por rotação",
              "%DT (Bowen): percentual de deformidade na tíbia; >50% prediz progressão; <50% prediz resolução; combinado com MDA≥16° = 100% especificidade",
              "⚠️ Nenhuma medida isolada diferencia definitivamente bowing fisiológico de Blount — serial clínico + foto em ortostatismo é o método mais seguro para evitar diagnóstico equivocado",
            ],
          },
        ],
        mecanismo:
          "Carga compressiva excessiva na fise tibial proximal medial (criança obesa com varo fisiológico persistente + início precoce da marcha) → inibição dos condrócitos e retardo de ossificação (Hueter-Volkmann) e/ou sobrecrescimento relativo da fise lateral (Delpech). Com a progressão: deformidade em 4 planos (varo coronal + apex anterior sagital + torção interna axial + inibição de comprimento). Na forma tardia: fise lateral também pode estar comprometida; femoral distal contribui com o varo.",
        tx_nao_cirurgico: [
          "Ortese KAFO com 5 pontos de apoio: candidato ideal = criança magra, doença leve, unilateral, <3 anos, Langenskiöld I–II; 65% de sucesso no estágio II (Richards); KAFO de apoio único com uso integral por 6 meses: 91% de correção completa em doença precoce",
          "Fatores preditivos de falha do órtese: peso >percentil 90, thrust em varo durante a marcha, início >3 anos, doença bilateral, Langenskiöld III ou mais",
          "⚠️ Ortese NÃO tem papel na forma tardia (≥10 anos)",
          "Observação seriada com fotografias ortostáticas: método seguro de monitoramento sem exposição à radiação para crianças <2 anos com suspeita; Rx indicado se piora progressiva ou não resolução após 2 anos",
        ],
        tx_cirurgico: [
          "Guia de crescimento (hemiepifisiodese lateral): primeira opção cirúrgica para fise tibial medial ainda funcionante; eight-plate (placa em tensão) é o implante atual padrão; ⚠️ taxa de falha global de 44% na literatura — quanto mais doente a fise, menor a resposta; sucesso >80% com eight-plates em séries selecionadas (Heflin, Scott); falha de 100% em pacientes com média de 13 anos (Oto); indicar o mais precocemente possível",
          "Técnica sleeper plate: após correção, remover apenas o parafuso metafisário (manter placa + parafuso epifisário); reativar o guia se recorrência — evita reoperação completa",
          "Avaliação prévia de idade óssea: fundamental antes do guia de crescimento, especialmente no tardio — idade óssea avançada 26 meses no precoce (Sabharwal), 10 meses no tardio",
          "Osteotomia tibial valgizante proximal: indicada quando guia de crescimento falhou, fise doente/fechada ou deformidade grave; estado da fise é mais importante que a idade cronológica para decisão; osteotomia antes dos 4 anos pode reduzir recorrência mas somente quando a fise ainda está saudável",
          "⚠️ Correção aguda de deformidade >20° na tíbia proximal: risco de lesão neurológica de 20–40% — correção gradual com fixador externo é significativamente mais segura",
        ],
        cirurgias: [
          "Guia de crescimento com eight-plate (placa em tensão): paciente supino em mesa radiolúcida; incisão de 3 cm centrada na fise; exposição extraperiosteal; placa centrada sobre a fise com confirmação por fluoroscopia em AP e perfil; para varo tibial proximal: placa anterior à fíbula",
          "Grampos de Blount: técnica similar à eight-plate; grampos de 3/8 in. em paralelo à fise; risco de backout 15% na forma tardia",
          "Osteotomia tibial proximal valgizante: em cunha de abertura medial ou fechamento lateral + fixação; supramalleolar também descrita para correção combinada com torção tibial",
          "Elevação do platô medial: necessária em formas avançadas com depressão epifisária (precoce); enxerto ósseo + fixação interna",
          "Ressecção de bridge + enxerto de gordura: tentativa de restabelecer crescimento em bridge medial; resultado imprevisível — indicação restrita a crianças jovens com bridge <50% da área fisária",
        ],
        complicacoes: [
          "Recorrência do varo: principal complicação do precoce, especialmente após guia de crescimento com fise comprometida",
          "Hipercorreção em valgo: monitoramento a cada poucos meses é obrigatório — 12% de incidência de seguimento inadequado (Kemppainen); placa overcorrects se não removida no tempo certo",
          "Falha de material: parafusos backout 15% (grampos); quebra de parafuso 15% (eight-plates), especialmente em obesos; preferir aço inoxidável sólido em obesos",
          "Lesão neurológica com correção aguda (20–40% para correção >20° na tíbia proximal) — sempre preferir correção gradual nessa localização",
          "Discrepância de comprimento: guia de crescimento unilateral — DCM depende do grau de correção angular (encurta se <10°, alonga se >16°)",
          "Bridge ósseo medial irreversível (Langenskiöld V–VI): apenas osteotomia corretiva com eventual elevação de platô",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 26"],
      },
      {
        id: "lesoes-esportivas-ped",
        titulo: "Lesões Esportivas no Esqueleto Imaturo",
        subtitulo:
          "Apofisites de tração · Reconstrução do LCA · Fraturas de estresse · OCD · Instabilidade — Lovell & Winter's, 8ª ed., cap. 30",
        epidemiologia:
          "Mais de 3,2 milhões de atendimentos de emergência por lesões esportivas/ano em crianças <14 anos nos EUA; basquete, futebol americano e futebol são responsáveis pela maioria dos casos. O esqueleto em crescimento apresenta características biomecânicas únicas: placas fisárias e apófises representam zonas de menor resistência mecânica do que os ligamentos e tendões adjacentes — resultado: avulsões e apofisites são as lesões características desta faixa etária, enquanto lesões ligamentares puras são raras antes do fechamento das fises. Risco de lesão do LCA: 0,8–1,1%/temporada em adolescentes. Cinquenta por cento dos arremessadores jovens de 9–14 anos relatam dor no cotovelo ou no ombro durante a temporada; limites de arremessos preconizados pelo Little League Baseball (2010): ≤75/dia (≤10 anos), ≤85 (11–12 anos), ≤95 (13–16 anos), ≤105 (17–18 anos). A Tríade da Atleta Feminina (distúrbio alimentar + amenorreia + osteopenia) eleva a incidência de fraturas de estresse de 4% para 15% no grupo afetado.",
        classificacao: [
          {
            sistema:
              "Meyers-McKeever — avulsão da espinha tibial (inserção do LCA)",
            itens: [
              "Tipo I: não deslocada (<2 mm) — imobilização em extensão completa 6 semanas",
              "Tipo II: levantada com dobradiça posterior íntegra — tentativa de redução fechada; se irredutível → fixação cirúrgica",
              "Tipo III: completamente deslocada — artroscopia + fixação",
              "Tipo IV (Zaricznyj): cominutiva — artroscopia + fixação; prognóstico mais reservado",
              "⚠️ Lassidão residual presente em 64–80% após tratamento conservador nos tipos II–IV; mobilização precoce (<4 semanas) reduz artrofibrose de 36% para 0%; fixação com sutura superior ao parafuso para lassidão residual (18,8% vs. 82,4%)",
            ],
          },
          {
            sistema:
              "Estadiamento de Tanner — guia para técnica de reconstrução do LCA",
            itens: [
              "Tanner 1–2 (pré-puberal): reconstrução com poupança de fise obrigatória — técnica de MacIntosh modificada com trato iliotibial (intra + extra-articular sobre o topo do côndilo lateral); zero distúrbio de crescimento em série de 44 pacientes",
              "Tanner 3–4 (puberal): reconstrução transfisária com tendões isquiotibiais autólogos; túneis de pequeno diâmetro (<12 mm) paralelos à fise reduzem o risco de distúrbio de crescimento",
              "Alternativa para qualquer estadiamento: técnica all-epiphyseal (túneis inteiramente na epífise, sem cruzar a fise); fluoroscopia intraoperatória essencial",
              "⚠️ Tratamento não-operatório do LCA no esqueleto imaturo associa-se a alta taxa de lesão meniscal secundária e dano condral progressivo — não é recomendado como conduta de rotina",
            ],
          },
          {
            sistema: "Classificação de risco — fraturas de estresse",
            itens: [
              "BAIXO RISCO (compressão): tíbia posteromedial, fíbula, metatarsos 2–4 → bota pneumática ou imobilização 4–6 semanas; retorno progressivo",
              "ALTO RISCO (tensão): tíbia anterior (risco de pseudoartrose — 'black line' à Rx), colo femoral lado tensão (risco de deslocamento), navicular, maléolo medial, 5º metatarso (zona II — Jones) → repouso prolongado ± fixação cirúrgica; retorno somente após consolidação radiográfica",
              "Fatores de risco modificáveis: aumento abrupto de volume de treinamento, Tríade da Atleta Feminina, hipovitaminose D, superfícies duras",
            ],
          },
          {
            sistema:
              "OCD do joelho (JOCD) — estabilidade como guia terapêutico principal",
            itens: [
              "Localização clássica: côndilo femoral medial (75%); côndilo lateral e tróclea também possíveis",
              "Lesão estável com fise aberta: 78% de cura com tratamento conservador em 4–5 meses; critério de estabilidade por RNM: ausência de linha de alta intensidade de fluido contornando a lesão",
              "Lesão instável ou corpo livre: artroscopia indicada",
              "Opções de ressuperficiamento: perfuração subcondilar retrógrada, microfraturas, mosaicoplastia (OATS), aloenxerto osteocondilar, implante autólogo de condrócitos (ACI)",
            ],
          },
          {
            sistema:
              "Doença de Panner vs. OCD do capitelo — diagnóstico diferencial obrigatório no cotovelo pediátrico",
            itens: [
              "Doença de Panner: <10 anos; comprometimento difuso e uniforme do capitelo; provável variante do processo normal de ossificação (análoga à doença de Perthes no quadril); autolimitada → tratamento conservador exclusivo",
              "OCD do capitelo: ≥10 anos; envolvimento focal e incompleto com risco de corpos livres; repouso 3–6 meses para lesão estável; artroscopia ± enxerto osteocondilar (OATS costal) para lesão instável",
            ],
          },
        ],
        mecanismo:
          "No esqueleto em crescimento, a placa fisária e as apófises representam o elo mais fraco da cadeia musculoesquelética: o tecido cartilaginoso fisário tem resistência ao cisalhamento inferior à dos ligamentos e tendões adjacentes. Dois mecanismos principais: (1) Trauma agudo — avulsão da espinha tibial por hiperextensão ou rotação do joelho: o LCA, mais resistente que o osso em crescimento, traciona e avulsa sua inserção tibial; instabilidade glenoumeral por trauma em abdução e rotação externa. (2) Microtrauma repetitivo e sobrecarga — apofisites de tração: a contração muscular repetitiva durante a fase de crescimento rápido gera tração excessiva na apófise parcialmente calcificada; fraturas de estresse: ciclos repetitivos de carga superam a capacidade de remodelação óssea; OCD: microtraumatismo subcondilar repetitivo (hipótese mais aceita) gera isquemia local e separação progressiva do fragmento osteocondilar.",
        tx_nao_cirurgico: [
          "Avulsão espinha tibial Tipo I: imobilização em extensão completa 6 semanas; gesso cilíndrico ou órtese articulada travada em 0°; Rx de controle em 1–2 semanas para confirmar posição",
          "Avulsão espinha tibial Tipo II redutível: extensão completa do joelho reduz a espinha; imobilização 6 semanas com Rx seriados para confirmar manutenção da redução",
          "Osgood-Schlatter: apofisita de tração do tubérculo tibial, 10–15 anos; SEMPRE tratamento conservador com fise aberta — repouso relativo das atividades de impacto, AINEs, crioterapia local, fisioterapia; 76% assintomáticos na vida adulta; ossículo sintomático persistente após maturidade esquelética → exérese cirúrgica eletiva",
          "Sinding-Larsen-Johansson (SLJ): apofisita do polo inferior da patela, 10–12 anos; repouso das atividades de impacto + AINEs + joelheira patelar; evolução autolimitada em 3–6 meses",
          "Doença de Sever: apofisita da apófise do calcâneo, 9–14 anos, bilateral na maioria; SEMPRE se resolve com tratamento conservador — calçado absorvente, palmilha de silicone de 6–10 mm, alongamento do tríceps sural; ⚠️ excluir outras causas de dor no calcâneo (tumor, infecção) antes de estabelecer o diagnóstico",
          "Apofisita do epicôndilo medial (Cotovelo do Arremessador Jovem): arremessadores de 10–13 anos; repouso completo de arremessos por 6–12 semanas; fisioterapia para fortalecimento de flexores e pronadores do antebraço; retorno com programa graduado de arremessos",
          "Ombro do Arremessador Jovem (Little Leaguer's Shoulder): reação fisária da fise proximal do úmero por estresse rotacional repetitivo; RX: alargamento e irregularidade da fise proximal; repouso absoluto de arremessos por 2–3 meses; retorno gradual apenas após normalização radiográfica e clínica",
          "OCD do joelho lesão estável com fise aberta: restrição de atividade de impacto; descarga parcial se sintomático; RNM de controle a cada 4–5 meses; 78% de resolução espontânea",
          "OCD capitelo lesão estável: repouso de arremessos e atividades de sobrecarga axial por 3–6 meses; 50–60% de resolução clínico-radiográfica; retorno ao esporte apenas após resolução confirmada por RNM",
          "Fratura de estresse de baixo risco: bota pneumática ou imobilização gessada 4–6 semanas; retorno progressivo após ausência de dor à palpação e início de consolidação ao Rx",
          "Instabilidade patelar — primeira dislocação em esporte de não-colisão: reabilitação com fortalecimento do vasto medial oblíquo (VMO), órtese patelar e propriocepção; ⚠️ taxa de redislocação >50% em adolescentes com fise aberta após tratamento conservador — cirurgia recomendada após primeira dislocação em esportes de colisão",
        ],
        tx_cirurgico: [
          "Avulsão espinha tibial Tipo II irredutível, Tipos III e IV: artroscopia + fixação; sutura absorbível passada submeniscalmente é superior ao parafuso para lassidão residual (18,8% vs. 82,4%); mobilização precoce pós-operatória para reduzir artrofibrose",
          "Reconstrução do LCA em Tanner 1–2 (pré-puberal): técnica com poupança total de fise — MacIntosh modificada com trato iliotibial: passagem intra-articular sobre o topo do côndilo lateral sem perfuração da fise femoral + reforço extra-articular lateral (Lemaire); aguardar ≥3 semanas após a lesão aguda para reduzir risco de artrofibrose; zero distúrbio de crescimento em 44 pacientes de série publicada",
          "Reconstrução do LCA em Tanner 3–4 (puberal): reconstrução transfisária com tendões isquiotibiais autólogos; túneis tibial e femoral de pequeno diâmetro (<12 mm), verticais e paralelos à fise; fixação com parafuso bioabsorvível ou botão cortical; alternativa all-epiphyseal com túneis inteiramente na epífise (fluoroscopia obrigatória); retorno ao esporte após simetria de força do quadríceps ≥90% e mínimo 9 meses",
          "Avulsão do epicôndilo medial >5 mm em arremessador ou ginasta de alto rendimento: ORIF com parafuso canulado 4,0 mm em compressão + aruela; imobilização 2–4 semanas; reabilitação funcional precoce; programa de retorno ao arremesso",
          "OCD do joelho — lesão instável ou corpo livre: artroscopia; perfuração subcondilar retrógrada para lesão estável refratária ao conservador; fixação com pino bioabsorvível para fragmento instável viável; ressecção + microfraturas, mosaicoplastia (OATS), aloenxerto osteocondilar ou ACI para lesão irreparável",
          "OCD do capitelo — lesão instável com corpos livres: artroscopia + retirada de corpos livres; fixação do fragmento viável com pinos bioabsorvíveis; enxerto osteocondilar autólogo costal (OATS costal) para defeitos >1 cm²; série de 19 adolescentes: retorno ao esporte competitivo em quase todos",
          "Fratura de estresse tíbia anterior (alto risco): haste intramedular ou tension band plating em atleta de alto rendimento ou após falha do tratamento conservador por 3–6 meses",
          "Fratura de estresse do colo femoral lado tensão (alto risco): fixação percutânea com parafusos canulados em compressão; conduta de urgência se houver deslocamento — risco de necrose avascular",
          "Fratura de estresse navicular ou 5º metatarso zona II (Jones): parafuso intramedular ± enxerto ósseo autólogo em pseudoartrose ou para retorno acelerado em atleta de alto rendimento",
          "Instabilidade patelar com fise aberta: Roux-Goldthwait (transferência da metade lateral do tendão patelar medialmente) ou Galeazzi modificado (semitendinoso como neo-MPFL); ⚠️ Elmslie-Trillat e Fulkerson (osteotomia da tuberosidade anterior da tíbia) são CONTRAINDICADOS com fise aberta pelo risco de genu recurvatum",
          "Instabilidade patelar após fechamento de fise: reconstrução do MPFL com tendão autólogo (grácil); associar Fulkerson ou Elmslie-Trillat se TT-TG >20 mm",
          "Primeira dislocação glenoumeral em esporte de colisão com fise aberta: reparo artroscópico de Bankart; ⚠️ tratamento conservador associa-se a redislocação >50% neste grupo — indicação cirúrgica após primeira dislocação em atletas de contato é amplamente aceita",
        ],
        cirurgias: [
          "Fixação artroscópica da espinha tibial com sutura: portais anterolateral e anteromedial; visualização e desbridamento do hematoma; passagem de fios de sutura por baixo dos cornos do menisco medial e lateral; redução da espinha com tração das suturas e extensão do joelho; fixação transóssea no côndilo tibial; início de mobilização <4 semanas",
          "Reconstrução do LCA com poupança de fise — MacIntosh modificada com trato iliotibial: incisão lateral de 8–10 cm; dissecção e extração de faixa de 1,5 cm × 15 cm do trato iliotibial preservando inserção de Gerdy; passagem intra-articular sobre o topo do côndilo lateral (sem túnel femoral transfisário); tunelamento extrarticular posterior ao ligamento colateral fibular; reforço extra-articular lateral (tipo Lemaire); fixação com grampo ou ponto transósseo",
          "Reconstrução transfisária do LCA com tendões isquiotibiais: coleta de semitendinoso e grácil ipsilaterais; preparação do enxerto triplicado ou quadruplicado (diâmetro <12 mm); posicionamento do túnel tibial com guia de LCA em visão artroscópica; túnel femoral pelo portal anteromedial (posição horária 10h direito / 2h esquerdo); fixação com parafuso bioabsorvível tibial e botão cortical femoral",
          "ORIF do epicôndilo medial com parafuso canulado: posição supina com suporte sob o cotovelo; incisão medial de 4 cm centrada no epicôndilo; identificação e retração do nervo ulnar; redução anatômica do fragmento com pinça de redução; fixação com fio-guia e parafuso canulado 4,0 mm + aruela antirrotacional",
          "Roux-Goldthwait para instabilidade patelar com fise aberta: incisão anterior de 8 cm; divisão longitudinal do tendão patelar no plano mediano; transferência da metade lateral passando sob a metade medial; fixação no periósteo do côndilo medial; sem osteotomia da tuberosidade anterior da tíbia",
          "Galeazzi modificado (neo-MPFL com semitendinoso): coleta do semitendinoso preservando inserção tibial; roteamento subcutâneo medial da patela; fixação no bordo medial da patela com duas âncoras de sutura; verificação intraoperatória da tensão com mobilização passiva do joelho",
          "Artroscopia de cotovelo para OCD do capitelo: portal anterolateral (principal) e posterolateral; remoção de corpos livres; curetagem e perfuração do leito subcondralar; fixação com pinos bioabsorvíveis 1,5–2,0 mm se fragmento viável e >50% estável; OATS costal para defeito >1 cm² — doador: 7ª costela, receptor: capitelo",
        ],
        complicacoes: [
          "Artrofibrose pós-avulsão da espinha tibial: principal complicação; relacionada à imobilização prolongada em extensão >4 semanas; prevenção: mobilização precoce e fisioterapia intensiva",
          "Lassidão residual do LCA após tratamento da espinha tibial: 64–80% nos tipos II–IV; sutura reduz mas não elimina (18,8%); pode justificar reconstrução do LCA na maturidade",
          "Distúrbio de crescimento após reconstrução do LCA: encurtamento, varo ou valgo por lesão fisária; minimizado com técnicas poupadoras de fise, enxertos tendinosos e túneis <12 mm; monitoramento radiográfico até a maturidade esquelética",
          "Pseudoartrose em fratura de estresse de alto risco: tíbia anterior ('black line') e navicular têm risco elevado; vigilância por Rx e TC seriados; fixação cirúrgica profilática recomendada em atletas de alto rendimento",
          "Necrose avascular após fratura de estresse do colo femoral deslocada: emergência cirúrgica; prognóstico reservado para a cabeça femoral",
          "Recorrência de dislocação patelar: >50% em adolescentes sem tratamento cirúrgico após primeira dislocação em esportes de colisão; monitorar cartilagem patelar e trocleopatia progressiva",
          "Genu recurvatum após osteotomia da tuberosidade anterior da tíbia com fise aberta: contraindicação absoluta de Elmslie-Trillat e Fulkerson em esqueleto imaturo",
          "Restrição de retorno ao esporte após OCD do capitelo operada: até 40% dos casos não retornam ao beisebol em alto nível; RNM e Rx semestrais para monitoramento",
        ],
        fontes: [
          "Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 30",
        ],
      },
      {
        id: "deformidades-alinhamento-mi",
        titulo: "Deformidades do Alinhamento do Membro Inferior",
        subtitulo: "Genu varum/valgum fisiológico · Deformidades torsionais · Síndrome de mau alinhamento — Lovell & Winter's 8ª ed., cap. 26",
        epidemiologia:
          "Desvios torsionais e angulares são os motivos mais comuns de avaliação ortopédica ambulatorial pediátrica. A grande maioria das crianças trazidas por preocupação com o padrão de marcha ou formato dos membros inferiores é normal. Genu varum fisiológico: presente até 18–24 meses (curva suave, simétrica, envolve fêmur e tíbia). Genu valgum fisiológico: valgismo máximo aos 3–4 anos → correção gradual até 6–7 anos. Desvios angulares <5° são bem tolerados na maioria dos casos; >5–10° aumentam progressão de artrose em articulações já comprometidas. Desvios torsionais são extremamente comuns e tipicamente bem tolerados se simétricos.",
        classificacao: [
          {
            sistema: "Genu Varum — Fisiológico × Patológico",
            itens: [
              "Fisiológico: simétrico, curva suave longa envolvendo fêmur e tíbia, melhora espontânea após 18–24 meses",
              "Patológico: assimétrico, deformidade aguda focal na tíbia proximal, persiste ou piora após 3 anos, thrust em varo durante a marcha",
              "Cover-up test: cobrir pés e porção distal da tíbia com a patela apontando para frente — isola o varo verdadeiro da contribuição aparente da torção tibial interna",
              "Distância intercondiliana: medida com tornozelos tocando-se; usar tabela de Heath-Staheli para normalidade por idade",
              "Thrust lateral durante a marcha: sinal de alarme para varo patológico (indica frouxidão do ligamento colateral lateral)",
            ],
          },
          {
            sistema: "Genu Valgum — Referências de Normalidade",
            itens: [
              "Distância intermaléolar: medida com joelhos tocando-se; tabela de Heath-Staheli",
              "Valgismo fisiológico máximo aos ~3–4 anos: distância intermaléolar até 8 cm é considerada normal",
              "Persistência após 7–8 anos ou distância intermaléolar >8–10 cm: investigar causas patológicas",
              "Causas patológicas: displacias ósseas, raquitismo, hipotireoidismo, trauma fisário (desaceleração do fechamento lateral após lesão medial)",
            ],
          },
          {
            sistema: "Perfil Rotacional (deformidades torsionais)",
            itens: [
              "TFA (thigh-foot angle): paciente pronado, joelhos fletidos; TFA médio = 5° interno no lactente → 10° externo aos 8 anos; mínima variação após 12 anos",
              "Torção tibial interna: mais comum em lactentes; regride com o crescimento; pode persistir na pré-adolescência",
              "Torção tibial externa: menos comum; tende a persistir na adolescência; pode contribuir para síndrome de mau alinhamento",
              "Anteversão femoral: reduz com o crescimento; avaliada pelo teste de Craig/Ryder (quadril pronado, rotação até trocânter na posição mais lateral = ângulo de anteversão real)",
              "⚠️ Rotação externa assimétrica do quadril em adolescente: suspeitar DFCE imediatamente — examinar o quadril antes de atribuir a variante torsional",
              "Variações simétricas e assintomáticas: variante normal — sem evidências de que órteses ou fisioterapia acelerem a normalização",
            ],
          },
          {
            sistema: "Síndrome de Mau Alinhamento (Miserable Malalignment)",
            itens: [
              "Combinação de anteversão femoral excessiva + torção tibial externa",
              "Clinicamente: progressão do pé relativamente normal, mas joelhos rodam para dentro durante a marcha",
              "Dor anterior de joelho como apresentação principal (não confundir com condromalácia isolada)",
              "TC axial nos 3 níveis (quadril, joelho, tornozelo) para quantificação da deformidade torsional total",
              "Análise tridimensional da marcha: ferramenta diagnóstica objetiva em casos complexos",
            ],
          },
        ],
        mecanismo:
          "Desvios angulares e torsionais fazem parte da evolução normal do desenvolvimento musculoesquelético. O varo fisiológico converte-se em valgismo fisiológico pela mudança das forças de carga sobre as fises após o início da marcha. A anteversão femoral reduz progressivamente com o crescimento por remodelamento ósseo guiado pelas forças de carga. A torção tibial externa pode ser compensatória à anteversão femoral persistente, resultando em progressão do pé relativamente normal mas com mau alinhamento funcional do joelho (síndrome de mau alinhamento).",
        tx_nao_cirurgico: [
          "Observação e tranquilização familiar: indicada para desvios angulares <5° e variantes torsionais simétricas — resolução espontânea esperada na maioria",
          "Não há evidências de que órteses, cunhas ou fisioterapia isolada acelerem a normalização do perfil rotacional em crianças normais",
          "Genu valgum com dor: fortalecimento do quadríceps e estabilizadores do quadril; avaliação de obesidade associada",
          "Síndrome de mau alinhamento: fisioterapia e fortalecimento como primeira linha; maioria melhora sem cirurgia",
          "Genu varum patológico (Blount, raquitismo): tratar a causa de base",
        ],
        tx_cirurgico: [
          "Indicações angulares: deformidade >5–10° sintomática em paciente com crescimento remanescente adequado → guia de crescimento (hemiepifisiodese com eight-plate)",
          "Deformidade angular em paciente próximo à maturidade ou sem crescimento remanescente → osteotomia corretiva",
          "⚠️ Correção aguda de deformidade >20° na tíbia proximal: risco neurológico de 20–40% — preferir fixador externo com correção gradual",
          "Síndrome de mau alinhamento grave e sintomática refratária a conservador: osteotomia femoral desrotatória externa + osteotomia tibial interna bilateral — alta taxa de sucesso na literatura mas com indicação altamente seletiva",
          "Torção tibial externa isolada com rotação externa de quadril ≥20°: possível compensação proximal após desrotação tibial apenas — avaliar marchando com joelhos à frente",
        ],
        cirurgias: [
          "Hemiepifisiodese com eight-plate (placa em tensão): padrão para desvios angulares com crescimento remanescente; proximal tibial medial para varo; distal femoral lateral para valgum; monitoramento a cada poucos meses obrigatório para evitar hipercorreção",
          "Grampos de Blount: técnica alternativa ao eight-plate; similar taxa de correção e complicações; menor custo mas maior risco de backout",
          "Osteotomia femoral desrotatória: via intramedular (IM) em pacientes esqueleticamente maduros ou via placa em todos os grupos etários; osteotomia na diáfise femoral com rotação externa para corrigir anteversão excessiva",
          "Osteotomia tibial desrotatória: combinada com osteotomia femoral na síndrome de mau alinhamento; rotação interna da tíbia para corrigir torção externa; supramalleolar é nível mais seguro que proximal (menor risco neurológico)",
        ],
        complicacoes: [
          "Hipercorreção por guia de crescimento: monitoramento clínico e radiográfico a cada 3–4 meses; não agendar remoção em data fixa — avaliar alinhamento real",
          "Lesão fisária iatrogênica por guia de crescimento em criança muito jovem: devastadora — reservar para casos com indicação clara",
          "Lesão neurológica (fibular/ciático): correção aguda da tíbia proximal >20° (20–40%); sempre preferir correção gradual nessa topografia",
          "Artrose precoce: deformidades angulares >5–10° não corrigidas em articulações com patologia de base aceleram degeneração",
          "Síndrome de mau alinhamento não corrigida: dor patelofemoral progressiva, risco de instabilidade patelar",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 26"],
      },
    ],
  },
  {
    id: "artrite-ped",
    label: "Artrite Reumatoide Juvenil / AIJ",
    topicos: [
      {
        id: "artrite-idiopatica-juvenil",
        titulo: "Artrite Idiopática Juvenil (AIJ)",
        subtitulo: "Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 11",
        epidemiologia:
          "Artrite crônica mais comum na infância (início antes dos 16 anos, duração >6 semanas). Incidência: 2–20 por 100.000 crianças/ano. Pico de início: 1–3 anos (forma oligoarticular) e adolescência (forma poliarticular RF+). Doença de Still (forma sistêmica): 5–10% dos casos, pico em menores de 5 anos, sem predileção por sexo. Diagnóstico de exclusão — afasta infecção, doença maligna e outras artrites inflamatórias.",
        classificacao: [
          {
            sistema: "ILAR — International League of Associations for Rheumatology",
            itens: [
              "Oligoarticular (≤4 articulações nos primeiros 6 meses): persistente (<4 articulações ao longo do tempo) ou extendida (>4 articulações após 6 meses); ANA positivo em 70–80%; MAIOR risco de uveíte crônica anterior assintomática — triagem oftalmológica obrigatória",
              "Poliarticular RF positivo (≥5 articulações + fator reumatoide positivo em 2 amostras): adolescente feminina; erosiva, semelhante à AR do adulto; pior prognóstico",
              "Poliarticular RF negativo (≥5 articulações, RF negativo): qualquer idade; fenótipo variado; prognóstico intermediário",
              "Sistêmica (Doença de Still): febre quotidiana em espícula ≥2 semanas + artrite + ≥1 de: exantema evanescente salmão, linfadenopatia, hepatoesplenomegalia, serosite; IL-1/IL-18 elevados; risco de macrofage activation syndrome (MAS) — emergência reumatológica",
              "Artrite relacionada à entesite (ERA): HLA-B27 positivo em 80%; entesite + artrite periférica (predomínio membros inferiores); risco de espondilite anquilosante futura; acometimento sacroilíaco pode ser insidioso",
              "Artrite psoriática: artrite + psoríase (ou história familiar primeiro grau) + dactilite ou alterações ungueais",
            ],
          },
          {
            sistema: "Comprometimento Ortopédico por Articulação",
            itens: [
              "Quadril: destruição articular severa → indicação de ATQ (melhor ganho funcional com doença controlada)",
              "Joelho: sinovite crônica → overgrowth femoral distal → discrepância de comprimento de membros (DCMI); deformidade em valgo ou flexo-joelho",
              "Mandíbula (ATM): micrognatia por crescimento prejudicado — AIJ sistêmica e poliarticular",
              "Coluna cervical: subluxação C1-C2 (especialmente poliarticular RF+) — rastrear com radiografia em flexão-extensão antes de cirurgias com intubação",
            ],
          },
        ],
        mecanismo:
          "Sinovite crônica → hipertrofia sinovial (pannus) → erosão cartilaginosa e óssea. Inflamação persistente altera o ambiente de crescimento local: overgrowth (hiperemia crônica estimula a fise → DCMI por overgrowth do membro afetado) e undergrowth (articulação destruída + corticoterapia sistêmica prolongada → retardo de crescimento). Uveíte anterior crônica pode ser assintomática — dano ocular silencioso até perda visual se não rastreada.",
        tx_nao_cirurgico: [
          "AINEs: naproxeno 15 mg/kg/dia (máx. 1000 mg/dia) ou ibuprofeno — controle sintomático; proteção gástrica se uso prolongado",
          "Corticoide intra-articular: triancinolona hexacetonida 1 mg/kg (grandes articulações: quadril, joelho) ou 0,5 mg/kg (médias articulações: tornozelo, punho); excelente resposta em oligoarticular; reduz DCMI se aplicado precocemente; pode ser guiado por US em articulações de difícil acesso",
          "Metotrexato (MTX): DMARD primeira linha para formas poliarticulares e oligoarticular extendida; 10–15 mg/m² semanal SC ou VO; início de ação 6–8 semanas; suplementar ácido fólico",
          "Biologicos anti-TNF (etanercepte, adalimumabe): para falha ao MTX; etanercepte aprovado FDA para AIJ poliarticular; adalimumabe aprovado para uveíte",
          "Bloqueadores de IL-1 (anakinra, canacinumabe): forma sistêmica refratária; canacinumabe aprovado FDA para AIJ sistêmica",
          "Abatacepte (CTLA4-Ig): opção para formas poliarticulares RF+ sem resposta a anti-TNF",
          "Fisioterapia: preservação de amplitude de movimento e força muscular periarticular — componente essencial de todo tratamento",
          "Terapia ocupacional: adaptações funcionais; órteses de repouso noturnas para mãos/punhos",
          "Suplementação de Ca²⁺ e vitamina D (25-OH D3): monitorar em todos os pacientes em corticoterapia ou com doença crônica (risco de osteoporose secundária e fraturas)",
        ],
        tx_cirurgico: [
          "Sinovectomia artroscópica: para sinovite refratária (>6 meses) com dano articular mínimo; 65–67% de recidiva em 24 meses segundo Lovell & Winter; melhores resultados com marcadores inflamatórios normais e curta duração da doença",
          "Liberação de partes moles: contraturas severas em flexão resistentes a gesso seriado (joelho, quadril) — antes de considerar artroplastia",
          "ATQ (Artroplastia Total do Quadril): indicada em doença terminal com função preservada (controle da AIJ sistêmica pré-operatório); sobrevida do implante 85% (Lovell & Winter); atenção especial ao planejamento acetabular em crianças com moldagem anormal da pelve",
          "ATJ (Artroplastia Total do Joelho): sobrevida 10 anos 95%, 20 anos 82% (Lovell & Winter); resultado funcional excelente quando doença bem controlada; preferir componentes não constrangidos quando possível",
          "Artrodese de subtalar/tornozelo: para destruição articular grave com dor refratária em caso de não elegibilidade para artroplastia",
        ],
        cirurgias: [
          "Sinovectomia artroscópica (mais comum — joelho, punho, tornozelo, quadril): debridamento do pannus, redução do volume sinovial; duração do benefício variável (recidiva em 24 meses em até 67% dos casos)",
          "ATQ: acetábulo pequeno → cotila cimentada ou press-fit de pequeno diâmetro; cabeça femoral pequena e valgizada → stem customizado ou de pequeno porte; risco de luxação aumentado por frouxidão cápsulo-ligamentar residual",
          "ATJ: alinhamento em valgo (comum na AIJ) → liberação lateral + balanceamento; patelofemoral frequentemente comprometido",
        ],
        complicacoes: [
          "Uveíte crônica anterior assintomática: complicação mais grave — causa catarata, glaucoma e cegueira; risco máximo em ANA+ oligoarticular; triagem oftalmológica a cada 3–6 meses",
          "DCMI (Discrepância de comprimento de membros): overgrowth por hiperemia crônica da fise; corrigir com epifisiodese contralateral se DCMI >2 cm e fise aberta",
          "Retardo de crescimento: corticoterapia sistêmica prolongada + inflamação crônica; priorizar biológicos para minimizar corticoide",
          "Osteoporose secundária: fraturas por fragilidade; densidade mineral óssea reduzida pelo processo inflamatório e corticoterapia — DXA periódico",
          "Síndrome de Ativação Macrofágica (MAS): complicação potencialmente letal da AIJ sistêmica — febre alta, pancitopenia, hiperferritinemia >10.000 ng/mL, hepatoesplenomegalia, coagulopatia; tratamento: altas doses de corticoide + ciclosporina ou anacinra",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 11"],
      },
    ],
  },
  {
    id: "neuromuscular",
    label: "Neuromuscular",
    topicos: [
      {
        id: "paralisia-cerebral",
        titulo: "Paralisia Cerebral",
        subtitulo: "Distúrbio permanente do desenvolvimento do movimento e postura, causado por lesão não progressiva do encéfalo imaturo",
        epidemiologia: "Prevalência: 2–3/1.000 nascidos vivos; prematuridade e baixo peso são os principais fatores de risco; espasticidade é a forma mais comum (~80%)",
        classificacao: [
          {
            sistema: "GMFCS — Sistema de Classificação da Função Motora Grossa (Palisano)",
            itens: [
              "Nível I: deambula sem restrições; limitações em habilidades motoras grossas avançadas",
              "Nível II: deambula sem dispositivo auxiliar; limitações fora de casa e em terrenos irregulares",
              "Nível III: deambula com dispositivo auxiliar; limitações em ambientes externos",
              "Nível IV: auto-mobilidade com limitação; frequentemente necessita de cadeira de rodas em comunidade",
              "Nível V: transportado em cadeira de rodas; sem controle motor antigravitacional independente",
            ],
          },
          {
            sistema: "Padrões de Marcha Patológica",
            itens: [
              "Marcha em tesoura (adução e rotação interna dos quadris)",
              "Marcha em agachamento (crouch gait): joelho e quadril fletidos durante toda a fase de apoio — padrão mais incapacitante",
              "Marcha em equino (pé equino espástico): contato inicial com antepé",
              "Marcha com joelho rígido (stiff knee gait): ausência de flexão do joelho na fase de balanço",
            ],
          },
        ],
        mecanismo: "Lesão hipóxico-isquêmica, hemorrágica ou infecciosa do SNC em desenvolvimento (pré-natal, perinatal ou pós-natal até os 2 anos); leucomalácia periventricular é a lesão mais comum nos prematuros",
        tx_nao_cirurgico: [
          "Fisioterapia neurológica e terapia ocupacional: manutenção da amplitude articular, fortalecimento seletivo, treino de marcha",
          "Órteses (AFO — órtese tornozelo-pé): indicadas para controle do pé equino, crouch gait e estabilização durante a marcha",
          "Toxina botulínica tipo A (BoNT-A): bloqueio neuromuscular reversível, duração de 3–6 meses; indicada para espasticidade focal (gastrocnêmio, isquiotibiais, adutores) em crianças GMFCS I–III; aplicação guiada por ultrassom ou eletroestimulação",
          "Baclofen oral: espasticidade generalizada; efeito colateral: sedação",
          "Bomba intratecal de baclofeno (ITB): infusão contínua de baclofeno no espaço intratecal via cateter; indicada para espasticidade grave generalizada (GMFCS IV–V) ou disfunção espástico-distônica; reduz espasticidade, melhora cuidados e conforto",
          "Rizotomia dorsal seletiva (SDR): secção das raízes dorsais espinhais L1–S2 (25–50%); indicada para diplegias espásticas puras, GMFCS II–III, sem distonia, sem contraturas fixas; reduz espasticidade permanentemente; deve ser seguida de reabilitação intensiva",
          "Vigilância do quadril: radiografias anuais com medida da porcentagem de migração (PM — índice de Reimers); PM >30%: aumentar frequência de acompanhamento e considerar intervenção; PM >50%: cirurgia preventiva",
        ],
        tx_cirurgico: [
          "SEMLS (Single Event Multilevel Surgery — cirurgia multilevel em evento único): abordagem de todas as deformidades em um único tempo cirúrgico guiado por análise instrumentada da marcha; componentes individualizados por paciente",
          "Componentes frequentes da SEMLS: (1) alongamento do tendão de Aquiles (TAL) ou gastrocnêmio; (2) transferência ou alongamento do tibial posterior; (3) alongamento dos isquiotibiais mediais; (4) osteotomia derotacional femoral; (5) osteotomia tibial; (6) artrodese subtalar; (7) alongamento dos adutores; (8) osteotomia pélvica (Dega ou Pemberton); (9) liberação do iliopsoas",
          "⚠️ ATENÇÃO — Risco do TAL excessivo (Lovell & Winter vs. prática clínica geral): alongamento excessivo do tendão de Aquiles pode converter equino em marcha em agachamento (crouch gait), deformidade mais incapacitante que o equino original; preferir alongamento isolado do gastrocnêmio (procedimento de Strayer) em casos leves-moderados para preservar força plantiflexora",
          "Luxação/subluxação do quadril (PM >40–50%): osteotomia varizante e derotacional (VDRO) + osteotomia pélvica (Dega ou Pemberton); reconstrução preventiva antes de luxação completa tem melhores resultados",
          "Escoliose neuromuscular (GMFCS IV–V): fusão vertebral com instrumentação (T2–pelve) quando curva >50° com progressão; ⚠️ janela terapêutica: operar antes de comprometimento cardiorrespiratório grave",
          "Osteotomia derotacional femoral isolada: rotação interna excessiva dos quadris sem encurtamento associado",
        ],
        complicacoes: [
          "Crouch gait progressivo: complicação tardia frequente após TAL excessivo; difícil correção cirúrgica secundária",
          "Luxação do quadril: risco proporcional ao nível GMFCS; PM >50% sem tratamento evolui para luxação em ~90% dos casos",
          "Escoliose neuromuscular: presente em até 60–70% dos GMFCS IV–V; progressão mesmo após maturidade esquelética",
          "Dor crônica e deterioração funcional no adulto com PC",
          "Complicações da ITB: deslocamento do cateter, infecção, depressão respiratória por superdosagem",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 14"],
      },
      {
        id: "mielomeningocele",
        titulo: "Mielomeningocele (MMC)",
        subtitulo: "Defeito do fechamento do tubo neural com exposição das meninges e medula espinhal; causa mais comum de paralisia flácida congênita",
        epidemiologia: "Incidência: 1–2/1.000 nascidos vivos; ácido fólico pré-natal reduz em 70%; cirurgia fetal intraútero (estudo MOMS) melhora desfechos neurológicos",
        classificacao: [
          {
            sistema: "Nível Neurológico e Função Esperada",
            itens: [
              "Torácico: paraplegia completa; deambulação comunitária geralmente não alcançada",
              "L1–L2: flexão do quadril preservada; marcha com órteses longas (KAFO) e andador — alta demanda energética",
              "L3: extensão do joelho presente; marcha com KAFO possível; muitos tornam-se cadeirantes na adolescência",
              "L4: dorsiflexão do tornozelo presente; marcha com AFO; deambulação comunitária funcional",
              "L5–S1: musculatura plantiflexora fraca; marcha com AFO leve; independência funcional",
            ],
          },
        ],
        mecanismo: "Falha no fechamento do tubo neural entre o 22º–28º dia gestacional; déficits neurológicos por lesão direta e malformação de Chiari II (presente em >90%)",
        tx_nao_cirurgico: [
          "Pé torto congênito (PTC) associado à MMC: método de Ponseti modificado — gessamento seriado eficaz para obtenção da correção; mesmo protocolo de aplicação que no PTC idiopático",
          "Tálus vertical congênito: série de gessos em plantiflexão progressiva (método de Dobbs reverso) antes da cirurgia mínima",
          "Órteses: AFO para controle do tornozelo em L4–S1; KAFO para níveis mais altos; essenciais para prevenção de úlceras de pressão",
          "Cateterismo intermitente limpo (CIL): bexiga neurogênica presente na maioria dos pacientes",
          "Fisioterapia e terapia ocupacional desde o nascimento",
        ],
        tx_cirurgico: [
          "Pé torto congênito em MMC — tenotomia do tendão de Aquiles: ⚠️ DIVERGÊNCIA IMPORTANTE (Lovell & Winter vs. outras fontes): excisão cirúrgica ABERTA do tendão de Aquiles com ressecção de ~1 cm é preferida à tenotomia percutânea; recorrência pós-tenotomia percutânea: ~100% em MMC vs. ~18% pós-excisão aberta; justificativa: pé insensível com risco de cicatrização exuberante e retorno do equino",
          "Tálus vertical congênito: redução cirúrgica após preparo com gessamento (método de Dobbs); geralmente 1–2 portais mínimos + tenotomia do tendão de Aquiles",
          "Deformidade em calcâneo (pé calcaneovaro ou calcaneovalgo): ressecção do tendão de Aquiles ou transferência tendinosa para restaurar equilíbrio plantiflexor; pode requerer osteotomia calcânea",
          "Valgo do tornozelo progressivo: osteotomia supramaleolar tibial ou artrodese subtalar; comum em níveis L4–S1",
          "Quadril em MMC — ⚠️ ATENÇÃO (Lovell & Winter vs. Campbell's): redução cirúrgica da luxação do quadril em MMC NÃO é recomendada na maioria dos casos; estudos demonstram que quadris luxados em pacientes com nível L3 ou acima têm resultados equivalentes ou piores após tentativa de redução; redução está indicada apenas em luxações unilaterais em pacientes com função motora distal preservada (L4 ou abaixo)",
          "Escoliose em MMC: fusão vertebral com instrumentação; níveis torácicos superiores têm curvas graves de progressão rápida",
        ],
        complicacoes: [
          "Hidrocefalia: presente em 80–90%; requer derivação ventriculoperitoneal (DVP)",
          "Malformação de Chiari II: herniação das amígdalas cerebelares; pode causar disfagia, estridor, apneia",
          "Pele insensível: úlceras de pressão são complicação grave em áreas de apoio",
          "Recorrência das deformidades do pé: frequente devido à falta de controle muscular ativo",
          "Deterioração neurológica tardia: medula ancorada (tethered cord) — dor, piora motora, escoliose progressiva",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 15"],
      },
      {
        id: "atrofia-muscular-espinhal",
        titulo: "Atrofia Muscular Espinhal (AME/SMA)",
        subtitulo: "Doença do neurônio motor inferior causada por deleção do gene SMN1 (cromossomo 5q); segunda causa genética mais comum de morte infantil",
        epidemiologia: "Incidência: 1/6.000–10.000 nascidos vivos; herança autossômica recessiva; o número de cópias do gene SMN2 modula a gravidade clínica",
        classificacao: [
          {
            sistema: "Tipos Clínicos de AME",
            itens: [
              "Tipo 0 (pré-natal/neonatal): movimentos fetais reduzidos; hipotonia grave ao nascer; sobrevida <6 meses sem suporte",
              "Tipo 1 (Werdnig-Hoffmann): hipotonia grave ('bebê flácido'); nunca senta; diagnóstico <6 meses; sem tratamento, sobrevida <2 anos",
              "Tipo 2 (Dubowitz): senta independentemente, nunca anda; diagnóstico 6–18 meses; maior grupo; escoliose progressiva grave",
              "Tipo 3 (Kugelberg-Welander): anda independentemente; início após 18 meses; perda ambulatória variável na adolescência/adulto",
              "Tipo 4 (adulto): início >21 anos; progressão lenta",
            ],
          },
        ],
        mecanismo: "Deleção homozigótica do éxon 7 do gene SMN1 (95% dos casos); déficit de proteína SMN causa degeneração dos neurônios motores do corno anterior; SMN2 produz proteína funcional em menor quantidade (10–20%)",
        tx_nao_cirurgico: [
          "Nusinersena (Spinraza®): antisense oligonucleotídeo intratecal aprovado pelo FDA (2016); modifica o splicing do SMN2 aumentando produção de proteína SMN; administração intratecal (3 doses de ataque + dose de manutenção a cada 4 meses); ensaio ENDEAR: 51% dos tratados atingiram marco motor vs. 0% do grupo controle; aprovado para todos os tipos de AME",
          "Onasemnogene abeparvovec (Zolgensma®): terapia gênica — vetor AAV9 com cópia funcional do SMN1; dose única IV; aprovado para AME tipos 1 e 2 com ≤2 cópias do SMN2 e ≤2 anos de idade",
          "Risdiplam (Evrysdi®): modulador oral do splicing do SMN2; aprovado para AME tipos 1–3",
          "Suporte respiratório: ventilação não invasiva (VNI), traqueostomia nos casos mais graves",
          "Fisioterapia respiratória e motora: manutenção da amplitude articular, prevenção de contraturas",
          "Nutrição: suporte enteral frequentemente necessário nos tipos 1–2",
        ],
        tx_cirurgico: [
          "Escoliose em AME: prevalência de 60–95% nos tipos 1–2; progressão rápida e grave (curvas >90° comuns sem tratamento); instrumentação vertebral com fusão T2–pelve quando curva >50° com função respiratória que permita o procedimento; órteses (colete TLSO) são apenas paliativas e não impedem progressão",
          "Subluxação/luxação do quadril em AME: ⚠️ ATENÇÃO (Lovell & Winter vs. outras fontes): resultados cirúrgicos são geralmente ruins; recorrência após cirurgia de 44–100%; cirurgia do quadril em AME tipos 1–2 NÃO é recomendada rotineiramente; indicação deve ser individualizada e restrita a casos com dor refratária e cuidadores informados sobre alta taxa de recorrência",
          "Contraturas articulares: liberação cirúrgica pode ser considerada para facilitar posicionamento e cuidados em casos graves",
          "Fraturas osteoporóticas: frequentes devido à imobilidade; tratamento conservador preferencial; fixação cirúrgica apenas em fraturas instáveis ou dolorosas",
        ],
        complicacoes: [
          "Insuficiência respiratória: principal causa de morte nos tipos 1–2; curva força-volume restritivxa progressiva",
          "Escoliose grave: compromete capacidade vital e função respiratória; acelera insuficiência respiratória",
          "Osteoporose e fraturas: imobilidade e desuso; fraturas de fêmur são as mais comuns",
          "Contraturas articulares múltiplas: limitam cuidados e posicionamento",
          "Disfagia e aspiração: risco aumentado nos tipos mais graves",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 15"],
      },
      {
        id: "distrofia-muscular-duchenne",
        titulo: "Distrofia Muscular de Duchenne (DMD)",
        subtitulo: "Miopatia progressiva ligada ao X causada por mutações no gene da distrofina; forma mais comum e grave de distrofia muscular",
        epidemiologia: "Incidência: 1/3.500–5.000 meninos nascidos vivos; herança recessiva ligada ao X (Xp21.2); 1/3 dos casos são mutações de novo",
        classificacao: [
          {
            sistema: "Evolução Clínica por Fase",
            itens: [
              "Fase pré-sintomática (0–3 anos): fraqueza subclínica; CK sérica 100–200× acima do normal desde o nascimento",
              "Fase ambulatória precoce (3–7 anos): quedas frequentes, dificuldade para subir escadas, marcha em ponta de pé, sinal de Gowers",
              "Fase ambulatória tardia (7–12 anos): lordose lombar acentuada, pseudo-hipertrofia de panturrilhas, perda progressiva da força",
              "Fase não ambulatória (>12 anos): perda da deambulação; escoliose rapidamente progressiva; comprometimento cardiorrespiratório",
              "Fase adulta tardia: cardiomiopatia dilatada, insuficiência respiratória crônica; sobrevida média 25–35 anos com cuidados modernos",
            ],
          },
        ],
        mecanismo: "Mutações (deleções em 65–70%, duplicações em 5–10%, mutações de ponto em ~25%) causam ausência completa de distrofina; sem distrofina, membrana muscular é instável e sofre lesão mecânica repetida durante contração → inflamação, necrose e substituição por tecido fibrogorduroso",
        tx_nao_cirurgico: [
          "Corticoterapia: deflazacorte (0,9 mg/kg/dia) ou prednisona (0,75 mg/kg/dia); prolonga a deambulação em 2–3 anos; deflazacorte reduz risco de escoliose e melhora função pulmonar comparado à prednisona; iniciar entre 4–6 anos quando força começa a platear",
          "Fisioterapia: alongamentos diários (tornozelo, joelho, quadril) para retardar contraturas; treinamento funcional",
          "AFO noturnas: reduzem contraturas do tornozelo; iniciar precocemente",
          "Ventilação não invasiva (VNI/BiPAP): iniciar quando CVF <50% ou SpO₂ noturna cai",
          "Cardioterapia preventiva: inibidores da ECA + betabloqueadores quando fração de ejeção <55%",
          "Eteplirsen (Exondys 51®): terapia de skipping do éxon 51; aprovado pelo FDA (2016) para ~13% dos pacientes com deleções elegíveis; benefício funcional ainda em avaliação",
          "Ataluren (Translarna®): indicado para mutações sem sentido (nonsense); aprovado na Europa; não aprovado nos EUA",
        ],
        tx_cirurgico: [
          "Escoliose em DMD: ⚠️ JANELA TERAPÊUTICA CRÍTICA (Lovell & Winter): fusão vertebral com instrumentação (T2–pelve ou L5–pelve) quando curva >20–25° com CVF ainda preservada (>30–40%); progressão é rápida e inexorável após perda da deambulação; aguardar curvas maiores ou CVF muito baixa aumenta dramaticamente o risco cirúrgico; a corticoterapia (especialmente deflazacorte) retarda a progressão da escoliose e pode aumentar a janela cirúrgica",
          "Liberação de contraturas do tornozelo (TAL ou fasciotomia plantar): prolonga deambulação nas fases tardias; idealmente combinado com órtese AFO noturna",
          "Liberação de contraturas do quadril e joelho: raramente indicada; pode ser considerada para facilitar o posicionamento em cadeira de rodas",
        ],
        complicacoes: [
          "Cardiomiopatia dilatada: presente em 90% após os 18 anos; principal causa de morte em adultos",
          "Insuficiência respiratória restritiva progressiva: segunda causa de morte",
          "Escoliose: incidência de 90%+ após perda da deambulação sem corticoterapia",
          "Contraturas articulares múltiplas: tornozelo, joelho, quadril, cotovelo",
          "Osteoporose por desuso e corticoterapia: fraturas vertebrais e de extremidades são comuns",
          "Comprometimento cognitivo leve-moderado: presente em 30–35% (distrofina Dp71 no SNC)",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 15"],
      },
      {
        id: "charcot-marie-tooth",
        titulo: "Doença de Charcot-Marie-Tooth (CMT / HMSN)",
        subtitulo: "Neuropatia hereditária motora e sensitiva — grupo heterogêneo de neuropatias periféricas hereditárias; causa mais comum de neuropatia hereditária",
        epidemiologia: "Prevalência: 1/2.500; herança mais comum: autossômica dominante (CMT1A — duplicação do PMP22 em 17p11.2); múltiplos genes identificados (PMP22, MPZ, GJB1, MFN2, etc.)",
        classificacao: [
          {
            sistema: "Tipos Clínicos Principais",
            itens: [
              "CMT1 (desmielinizante): redução da velocidade de condução nervosa (<38 m/s); CMT1A (duplicação PMP22) é o mais comum",
              "CMT2 (axonal): velocidade de condução preservada; amplitude dos potenciais reduzida",
              "CMTX (ligado ao X): mutações no GJB1 (conexina 32); comprometimento variável",
              "CMT4 (autossômico recessivo): formas graves, início precoce",
            ],
          },
          {
            sistema: "Achados Ortopédicos Típicos",
            itens: [
              "Pes cavovaro: deformidade característica — arco plantar elevado + supinação do retropé",
              "Calcâneo em dorsiflexão: ⚠️ NÃO é equino (diferença crítica para planejamento cirúrgico)",
              "Dedos em garra (intrínseco-minus)",
              "Fraqueza peroneal com inversão ativa do tornozelo",
              "Atrofia distal das pernas ('pernas de cegonha')",
            ],
          },
        ],
        mecanismo: "Desmielinização (CMT1) ou degeneração axonal (CMT2) dos nervos periféricos motores e sensitivos; desequilíbrio muscular — tibial posterior forte vs. peroneais fracos — é responsável pelo pes cavovaro",
        tx_nao_cirurgico: [
          "Órteses (AFO): controle da instabilidade e proteção durante a marcha",
          "Fisioterapia: fortalecimento muscular e propriocepção",
          "Palmilhas e calçados adaptados: para redistribuição de pressão plantar",
          "Teste do bloco de Coleman: avaliação da flexibilidade do retropé — se o calcâneo corrige para valgo ao colocar o 1º raio em suspensão, o retropé é flexível e a osteotomia do retropé pode ser suficiente; se rígido, cirurgia mais extensa é necessária",
        ],
        tx_cirurgico: [
          "Osteotomia calcânea de lateralização (Dwyer ou Koutsogiannopoulos): corrige o varismo do retropé em pés flexíveis; associada à transferência do tendão tibial anterior (SPLATT) para reequilíbrio muscular",
          "Plantiflexão do 1º raio: osteotomia da cunha plantar do 1º metatarso para correção do arco elevado",
          "⚠️ TAL (alongamento do tendão de Aquiles) É CONTRAINDICADO em CMT (Lovell & Winter): o calcâneo já está em dorsiflexão; o TAL agrava a deformidade em calcâneo (calcaneus foot), levando a fraqueza plantiflexora grave e marcha com calcâneo — deformidade mais incapacitante que o pes cavus original",
          "Artrodese tripla (subtalar + talonavicular + calcaneocubóide): indicada para pés rígidos e deformidades recorrentes; ⚠️ ATENÇÃO (Lovell & Winter): resultados publicados são ruins — 77% dos pacientes com artrodese tripla por CMT relatam resultados ruins ou razoáveis em seguimento de longo prazo; deve ser reservada para casos graves sem alternativas e com expectativas realistas",
          "Transferência do tibial posterior através da membrana interóssea: para tratamento do equinovaro dinâmico em casos selecionados",
          "Displasia do quadril em CMT: presente em aproximadamente 15% dos pacientes; tratamento conforme protocolo da displasia do desenvolvimento",
        ],
        complicacoes: [
          "Calcaneus foot após TAL indevido: complicação grave e de difícil correção",
          "Recorrência das deformidades do pé: especialmente em crianças com crescimento residual",
          "Resultados ruins da artrodese tripla: dor, artrose adjacente, pseudoartrose",
          "Perda sensitiva distal: úlceras e lesões por falta de percepção de dor",
          "Progressão lenta e inexorável da neuropatia: sem tratamento que altere a história natural",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 15"],
      },
      {
        id: "ataxia-friedreich",
        titulo: "Ataxia de Friedreich",
        subtitulo: "Ataxia hereditária mais comum; doença neurodegenerativa autossômica recessiva causada por expansão do trinucleotídeo GAA no gene FXN (frataxina)",
        epidemiologia: "Prevalência: 1/50.000; herança autossômica recessiva; mutação: expansão de repetições GAA no íntron 1 do gene FXN (cromossomo 9q13); início habitual dos sintomas: 8–15 anos",
        classificacao: [
          {
            sistema: "Manifestações Clínicas",
            itens: [
              "Neurológicas: ataxia cerebelar progressiva, arreflexia, déficit proprioceptivo, disartria, nistagmo",
              "Ortopédicas: pes cavus (55%), escoliose (80–85%), equino na marcha, hiperextensão do joelho",
              "Cardíacas: cardiomiopatia hipertrófica (presente em >90%); principal causa de morte",
              "Endócrinas: diabetes mellitus em 10–20%",
            ],
          },
        ],
        mecanismo: "Expansão das repetições GAA no gene FXN causa silenciamento epigenético → déficit de frataxina → disfunção mitocondrial por acúmulo de ferro → estresse oxidativo → degeneração dos neurônios dos gânglios da raiz dorsal, tratos espinocerebelares e corticoespinais",
        tx_nao_cirurgico: [
          "⚠️ PRINCÍPIO GERAL (Lovell & Winter): tratamento conservador deve ser preferido antes de qualquer indicação cirúrgica; a progressão neurológica é inexorável e compromete os resultados cirúrgicos",
          "Fisioterapia: treino de equilíbrio e propriocepção, fortalecimento, prevenção de quedas",
          "Órteses (AFO): controle do equino e instabilidade do tornozelo; melhora a marcha e reduz quedas",
          "TLSO (colete): para escoliose em progressão antes da maturidade esquelética; eficácia limitada pela hipotonia muscular, mas pode retardar progressão",
          "Cardiologia: acompanhamento regular; tratamento da cardiomiopatia",
          "Omaveloxolone (Skyclarys®): aprovado pelo FDA (2023) para Ataxia de Friedreich em pacientes ≥16 anos; ativador da via Nrf2; único tratamento aprovado que modifica a progressão neurológica",
        ],
        tx_cirurgico: [
          "Escoliose em Ataxia de Friedreich: fusão vertebral com instrumentação em curvas >50° com progressão documentada; risco cirúrgico elevado pela cardiomiopatia — avaliação cardiológica pré-operatória obrigatória; ecocardiograma e ECG essenciais; considerar adiar se fração de ejeção <40%",
          "Pes cavus: osteotomia calcânea ou do mediopé associada a transferência tendinosa para reequilíbrio muscular; ⚠️ resultados menos previsíveis que em CMT pela progressão neurológica",
          "Deformidade em equino do tornozelo: AFO é preferencial; cirurgia apenas se deformidade rígida impedindo a marcha; TAL com cautela pela progressão da fraqueza",
        ],
        complicacoes: [
          "Cardiomiopatia hipertrófica: presente em >90%; arritmias, morte súbita cardíaca",
          "Perda da deambulação: média de 15–20 anos após o início dos sintomas",
          "Escoliose grave: curvas >90° em casos não tratados",
          "Diabetes mellitus",
          "Risco cirúrgico elevado pela cardiomiopatia",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 15"],
      },
    ],
  },
  {
    id: "oncologia-pediatrica",
    label: "Oncologia Pediátrica",
    topicos: [
      {
        id: "osteossarcoma",
        titulo: "Osteossarcoma",
        subtitulo: "Tumor maligno ósseo primário mais comum em crianças e adolescentes; produz osteoide ou osso imaturo",
        epidemiologia: "Incidência: 2–3/1.000.000/ano; pico etário: 10–20 anos (adolescência — coincide com crescimento rápido); localização mais comum: metáfise distal do fêmur (40%), proximal da tíbia (20%), proximal do úmero (10%); segundo pico: adultos >65 anos (osteossarcoma secundário a doença de Paget)",
        classificacao: [
          {
            sistema: "Classificação de Enneking (Sistema de Estadiamento Cirúrgico)",
            itens: [
              "Estádio IA: baixo grau, intracompartimental (T1)",
              "Estádio IB: baixo grau, extracompartimental (T2)",
              "Estádio IIA: alto grau, intracompartimental (T1)",
              "Estádio IIB: alto grau, extracompartimental (T2) — a maioria dos osteossarcomas convencionais",
              "Estádio III: qualquer grau, com metástases (M1) — metástases pulmonares em 15–20% ao diagnóstico",
            ],
          },
          {
            sistema: "Subtipos Histológicos Principais",
            itens: [
              "Osteossarcoma convencional (osteoblástico/condroblástico/fibroblástico): 80% dos casos; alto grau",
              "Osteossarcoma telangiectásico: lacunas preenchidas por sangue; pode simular cisto ósseo aneurismático",
              "Osteossarcoma parostal (de superfície): baixo grau; face posterior do fêmur distal; melhor prognóstico",
              "Osteossarcoma periosteal: grau intermediário; produção de cartilagem predominante",
              "Osteossarcoma de pequenas células: simula sarcoma de Ewing; diagnóstico diferencial histológico importante",
            ],
          },
          {
            sistema: "Critérios de Huvos — Resposta Histológica à Quimioterapia",
            itens: [
              "Grau I: <50% de necrose tumoral — resposta ruim",
              "Grau II: 50–89% de necrose — resposta parcial",
              "Grau III: 90–99% de necrose — boa resposta",
              "Grau IV: 100% de necrose — resposta completa; prognóstico significativamente melhor",
              "⚠️ >90% de necrose (Huvos III–IV) = boa resposta = sobrevida livre de doença ~70–80%; <90% = resposta ruim = sobrevida ~20–30% sem mudança de protocolo",
            ],
          },
        ],
        mecanismo: "Tumor de origem mesenquimal com produção de osteoide por células malignas; associado a RB1 e TP53 (inativação dos supressores tumorais); radiação prévia é fator de risco para osteossarcoma secundário",
        tx_nao_cirurgico: [
          "Protocolo MAP (quimioterapia neoadjuvante e adjuvante): Metotrexato em altas doses (MAP-HD-MTX) + Doxorrubicina (adriamicina) + Cisplatina; duração total: 30–36 semanas (10–12 semanas pré-operatórias + ressecção + continuação adjuvante)",
          "Quimioterapia pré-operatória (neoadjuvante): permite avaliação da resposta histológica, redução do tumor e planejamento cirúrgico adequado; cirurgia realizada 8–12 semanas após início do protocolo",
          "Radioterapia: osteossarcoma é RADIORESISTENTE — não está no protocolo padrão; indicada apenas para doença irressecável ou controle paliativo",
          "Ifosfamida e etoposídeo: adicionados em casos de resposta ruim à quimioterapia de primeira linha",
          "Cuidados de suporte: G-CSF, antieméticos, hidratação vigorosa com MTX de altas doses",
        ],
        tx_cirurgico: [
          "Limb salvage surgery (ressecção com preservação do membro): objetivo principal; indicada em ~85–90% dos casos atualmente; requer margens cirúrgicas amplas (margem oncológica ≥2–3 cm de tecido normal ao redor do tumor)",
          "Endoprótese modular (megaprótese): substituição do segmento ósseo ressecado por prótese metálica customizada; aplicável em fêmur distal, tíbia proximal e úmero proximal; complicação frequente: falência asséptica e infecção",
          "Endoprótese expansível (growing prosthesis): indicada em crianças skeletalmente imaturas para acompanhar o crescimento; expansão mecânica ou magnética não invasiva; múltiplas cirurgias de revisão esperadas",
          "Enxerto osteoarticular (aloenxerto): alternativa biológica à endoprótese; preserva o osso nativo; maior taxa de fratura e infecção",
          "Técnica de rotacionoplastia (van Ness): ressecção do joelho + rotação de 180° da perna distal; tornozelo funciona como 'joelho'; indicada em crianças muito jovens com tumores da tíbia proximal ou fêmur distal; resultados funcionais excelentes",
          "Amputação: indicada quando margens adequadas não são alcançáveis, infecção grave, ou recusa do paciente ao limb salvage; amputação transfemoral ou desarticulação do joelho",
          "Ressecção e reconstrução da tíbia proximal: inclui transferência do gastrocnêmio para cobertura da endoprótese (reduz risco de exposição e infecção)",
          "Metastasectomia pulmonar: ressecção de metástases pulmonares tem impacto curativo; cirurgia agressiva (toracotomia bilateral sequencial) está indicada quando tecnicamente viável; sobrevida de 20–30% após metastasectomia completa",
        ],
        complicacoes: [
          "Metástases pulmonares: principal sítio de metástase; presente em 15–20% ao diagnóstico",
          "Falência da endoprótese: assolamento, infecção, fratura periprostética; taxas de revisão de 30–50% em 10 anos",
          "Infecção profunda da endoprótese: pode levar à amputação",
          "Cardiotoxicidade por doxorrubicina: cardiomiopatia dose-dependente; monitoramento com ecocardiograma",
          "Nefrotoxicidade por cisplatina e MTX: controle hídrico rigoroso e monitoramento da função renal",
          "Neuropatia periférica por cisplatina",
          "Prognóstico geral: sobrevida em 5 anos de ~70% para doença localizada com boa resposta; ~20–30% para doença metastática ao diagnóstico",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 13"],
      },
      {
        id: "sarcoma-ewing",
        titulo: "Sarcoma de Ewing",
        subtitulo: "Tumor neuroectodérmico primitivo do osso e partes moles; segundo tumor ósseo maligno primário mais comum em crianças",
        epidemiologia: "Incidência: 1–3/1.000.000/ano; pico etário: 10–20 anos; predominância em brancos (raro em negros e asiáticos); localização: diáfise de ossos longos (fêmur, tíbia, fíbula), ossos planos (pelve, costelas, escápula) e coluna; pelve é sítio de pior prognóstico",
        classificacao: [
          {
            sistema: "Família dos Tumores de Ewing (ESFT — Ewing Sarcoma Family of Tumors)",
            itens: [
              "Sarcoma de Ewing ósseo: forma mais comum; afeta primariamente o osso",
              "Sarcoma de Ewing extraósseo: partes moles; comportamento similar ao ósseo",
              "Tumor neuroectodérmico periférico primitivo (pPNET): diferenciação neural mais marcada",
              "Tumor de Askin: localização na parede torácica",
            ],
          },
          {
            sistema: "Marcadores Moleculares e Imunoistoquímica",
            itens: [
              "Translocação t(11;22)(q24;q12): presente em 85% dos casos; fusão EWSR1-FLI1",
              "Outras translocações: t(21;22) EWSR1-ERG em 10%; outras fusões EWSR1 raras",
              "CD99 (MIC2): positividade difusa e intensa — marcador imunoistoquímico cardinal",
              "FLI1 nuclear: positivo",
              "Diagnóstico diferencial principal: linfoma, rabdomiossarcoma, neuroblastoma metastático, osteossarcoma de pequenas células",
            ],
          },
        ],
        mecanismo: "Origem em células mesenquimais primitivas (possivelmente células de Cajal ou célula-tronco mesenquimal); fusão EWSR1-FLI1 atua como fator de transcrição aberrante ativando programas oncogênicos; tumor altamente agressivo com resposta ao tratamento multimodal",
        tx_nao_cirurgico: [
          "Protocolo VIDE (Europa — EURO-EWING 99): vincristina + ifosfamida + doxorrubicina + etoposídeo; 6 ciclos pré-operatórios",
          "Protocolo VAIA: vincristina + actinomicina D + ifosfamida + doxorrubicina",
          "Protocolo VDC/IE (EUA — COG): vincristina + doxorrubicina + ciclofosfamida alternando com ifosfamida + etoposídeo; ciclos a cada 2 semanas (compactado)",
          "Radioterapia — ⚠️ DIFERENÇA CRÍTICA vs. osteossarcoma (Lovell & Winter): sarcoma de Ewing é RADIOSSENSÍVEL; radioterapia (45–55 Gy) é modalidade local eficaz e pode ser usada como alternativa à cirurgia ou como complemento; indicada para: (1) tumores irressecáveis (pelve, coluna, sacro), (2) margens cirúrgicas comprometidas, (3) sítios onde cirurgia causaria morbidade inaceitável; osteossarcoma é radioresistente e NÃO responde à radioterapia",
          "Consolidação com quimioterapia de altas doses + resgate de célula-tronco: para doença metastática ou recidivada em centros especializados",
        ],
        tx_cirurgico: [
          "Ressecção com margem ampla: padrão cirúrgico para tumores ressecáveis; margem oncológica ≥2 cm de tecido normal; associada à quimioterapia pré e pós-operatória",
          "Limb salvage surgery com reconstrução: endoprótese, aloenxerto ou combinação — princípios similares ao osteossarcoma",
          "Ressecção de tumores da pelve: hemiepifisiodese ou hemipelve total; alta morbidade; maior risco de margens comprometidas",
          "Cirurgia da coluna: ressecção en bloc para tumores vertebrais selecionados; frequentemente combinada com radioterapia",
          "Amputação: casos irressecáveis ou complicações do tratamento",
          "Metastasectomia pulmonar: papel menos estabelecido que no osteossarcoma; considerada em doença oligometastática pulmonar",
        ],
        complicacoes: [
          "Metástases pulmonares e ósseas ao diagnóstico: 25% dos casos; principal fator de pior prognóstico",
          "Recidiva local e sistêmica: ocorre em ~30% dos casos localizados",
          "Segundos tumores malignos: risco aumentado pela quimioterapia (leucemia mieloide aguda por ifosfamida e etoposídeo) e radioterapia",
          "Complicações da radioterapia: inibição do crescimento ósseo, fibrose, osteorradionecrose, e risco de segundo tumor primário no campo irradiado (10–20 anos)",
          "Toxicidade da quimioterapia: nefrotoxicidade (ifosfamida), cardiotoxicidade (doxorrubicina), cistite hemorrágica (ifosfamida + ciclofosfamida)",
          "Prognóstico: sobrevida em 5 anos de ~70–75% para doença localizada; ~20–30% para doença metastática",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 13"],
      },
    ],
  },
  {
    id: "discrepancia-membro",
    label: "Discrepância de Membros",
    topicos: [
      {
        id: "discrepancia-comprimento",
        titulo: "Discrepância de Comprimento dos Membros (DCM)",
        subtitulo: "Avaliação e tratamento da desigualdade de comprimento dos membros inferiores — Lovell & Winter's, cap. 27",
        epidemiologia: "77% dos recrutas militares apresentam algum grau de DCM; 36% têm >0,5 cm. Causas mais comuns: pós-traumática (crescimento excessivo após fratura de fêmur em crianças de 4–7 anos, ganho médio de 7–10 mm; ou retardo por lesão fisária); congênita (fêmur curto congênito, hemimelia fibular ou tibial — frequentemente associadas a ACL deficiente e articulação tibiotársica em bola de boliche); pós-infecciosa (artrite séptica neonatal com destruição fisária); neurológica (PC hemiplégica, poliomielite); vascular (MAV, Klippel-Trenaunay); síndromes (Proteus; Beckwith-Wiedemann — rastrear com US abdominal a cada 6 meses até 8 anos de idade)",
        classificacao: [
          {
            sistema: "Tipos de Discrepância",
            itens: [
              "Verdadeira (anatômica): diferença real no comprimento dos segmentos ósseos (fêmur e/ou tíbia); medida por scanograma ou telerradiografia",
              "Aparente/Postural: diferença funcional por contractura em flexo, luxação do quadril ou inclinação pélvica — sem diferença óssea real",
              "Funcional: soma da discrepância verdadeira + componente aparente; mais importante clinicamente para o planejamento do tratamento",
            ],
          },
          {
            sistema: "Referências de Crescimento dos Membros Inferiores",
            itens: [
              "Ao nascimento: membro inferior = 20% do comprimento final adulto",
              "Fêmur: contribui com 54% do comprimento total do membro; tíbia: 46%",
              "71% do crescimento femoral ocorre na fise distal (fise mais produtiva do corpo humano)",
              "57% do crescimento tibial ocorre na fise proximal",
              "Velocidade após os 5 anos: ~3,5 cm/ano (2 cm fêmur distal + 1,5 cm tíbia proximal)",
            ],
          },
          {
            sistema: "Métodos de Predição da Discrepância Final",
            itens: [
              "Green-Anderson: gráficos de crescimento remanescente por sexo e idade esquelética; amplamente utilizado em centros americanos",
              "Moseley (linha reta): combina comprimento dos membros, idade esquelética e tendência de crescimento em gráfico de linha reta; permite visualização intuitiva do planejamento",
              "Menelaus/White (aritmético): meninos param de crescer aos 16 anos, meninas aos 14 anos; simples e prático para uso clínico rápido",
              "Método do Multiplicador (Paley): multiplica o comprimento atual pelo fator correspondente à idade esquelética; simples, confiável e amplamente validado",
              "Diméglio: método com múltiplos parâmetros; alta precisão",
            ],
          },
          {
            sistema: "Métodos de Avaliação da Discrepância",
            itens: [
              "Blocos sob o calcanhar: método clínico simples de nivelamento pélvico; acurácia ~1,5 cm",
              "Telerradiografia (35×90 cm): avaliação radiológica clássica em posição ortostática; menor custo",
              "Scanograma (ortorradiografia por TC — ortoradiografia digital): padrão-ouro; alta acurácia; maior exposição à radiação",
              "EOS (slot-scanning biplanar): menor dose de radiação; alta acurácia; avaliação simultânea AP e perfil; ideal para seguimento seriado",
              "Idade esquelética: Greulich-Pyle (mais utilizado — limitações em populações não caucasianas); Tanner-Whitehouse; Sauvegrain (cotovelo — ideal para 9–15 anos)",
            ],
          },
          {
            sistema: "Tratamento por Magnitude da Discrepância",
            itens: [
              "0–2 cm: sem tratamento ou palmilha elevadora cosmética",
              "2–6 cm: órtese/palmilha elevadora; epifisiodese; encurtamento ósseo agudo; ou alongamento intramedular",
              "6–20 cm: reconstrução do membro com distração osteogênica (fixador externo ou prego intramedular magnético)",
              ">20 cm: adaptação protética com ou sem otimização cirúrgica do membro residual (rotação-plastia, amputação de Syme, alongamentos seriados)",
            ],
          },
        ],
        mecanismo: "Desequilíbrio entre as taxas de crescimento dos membros por qualquer combinação de hipercrescimento (fratura de fêmur em criança de 4–7 anos → estímulo vascular fisário → supercrescimento) ou retardo de crescimento (lesão fisária por infecção, fratura de Salter-Harris III–IV, irradiação ou déficit congênito de formação do segmento).",
        tx_nao_cirurgico: [
          "Palmilha elevadora: eficaz para DCM de até 2–3 cm; melhora a marcha e reduz compensações posturais",
          "Órtese elevadora (calçado ortopédico com elevação): DCM de 3–6 cm; aceita por alguns pacientes por evitar cirurgia, mas impacta qualidade de vida",
          "Observação seriada com scanograma ou EOS a cada 6–12 meses: essencial para monitorar a curva de crescimento e replanejar o tratamento conforme maturação esquelética",
        ],
        tx_cirurgico: [
          "Epifisiodese (inibição de crescimento do membro longo): indicada para DCM 2–6 cm; preferida percutânea por fluoroscopia (2 incisões, medial e lateral); ⚠️ timing é o fator crítico — erro de timing é a principal causa de falha; inibição esperada: 27% da tíbia proximal, 38% do fêmur distal, 65% combinada; grampos em 8 (eight-plates) permitem inibição temporária e reversível",
          "Encurtamento ósseo agudo (membro longo): máximo ~6 cm no fêmur, ~5 cm na tíbia (limitado a ~10% do comprimento do osso); via intramedular fechada (fêmur) ou placa (tíbia proximal); ideal para DCM 2–6 cm próximas à maturidade esquelética",
          "Alongamento com fixador externo: distração osteogênica clássica; 3 fases — latência (3–14 dias pós-osteotomia), distração (1 mm/dia em 4 frações de 0,25 mm/6h), consolidação; critérios de remoção: ≥3 de 4 córtices visíveis no Rx; estimulação eletromagnética pulsada pode encurtar o período de fixador",
          "Prego PRECICE (NuVasive, aprovado FDA 2013): prego intramedular com distração magnética por controle remoto externo; elimina a morbidade do fixador externo; diâmetros: 8,5 / 10,7 / 12,5 mm; capacidade: 3–8 cm por prego; contraindicações relativas — obesidade, fise proximal do fêmur aberta (risco de NAO), deformidade angular associada",
          "⚠️ PRINCÍPIO L&W (Cap. 27): espera-se ao menos 1 complicação e 1 procedimento adicional por segmento submetido a alongamento — paciente e família devem ser amplamente orientados antes do procedimento",
        ],
        complicacoes: [
          "Falha de timing na epifisiodese: supercorreção (membro longo fica curto) ou subcorreção (DCM residual); principal causa de resultado insatisfatório",
          "Contracturas articulares: complicação frequente do alongamento — quadril, joelho e tornozelo; prevenção com fisioterapia intensiva durante a distração",
          "Fratura do regenerado ósseo: durante ou após a distração; mais comum quando a consolidação é incompleta ao retirar o dispositivo",
          "Infecção dos pinos transfixantes: complicação mais frequente do fixador externo; na maioria das vezes superficial e controlada com antibióticos",
          "Lesão do nervo fibular (peroneal): especialmente nos alongamentos de tíbia; monitorizar função clínica e considerar redução do ritmo de distração",
          "Lesão do nervo femoral: nos alongamentos de fêmur proximal",
          "NAO da cabeça femoral: grave complicação do prego PRECICE se a fise proximal do fêmur ainda estiver aberta",
          "Síndrome compartimental aguda: durante distração excessivamente rápida",
          "Pseudoartrose do local de osteotomia: mais frequente em ossos com comprometimento vascular ou em pacientes com doenças ósseas subjacentes",
        ],
        fontes: ["Lovell and Winter's Pediatric Orthopaedics, 8ª ed., cap. 27"],
      },
      {
        id: "deficiencias-longitudinais-mi",
        titulo: "Deficiências Longitudinais do Membro Inferior",
        subtitulo: "Hemimelia fibular, tibial e deficiência femoral focal proximal (DFFP) — Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 29",
        epidemiologia: "Deficiências longitudinais são ausências parciais ou totais de segmentos ósseos no eixo longitudinal do membro. A deficiência fibular longitudinal é a mais comum (1:10.000 nascidos vivos), seguida pela deficiência femoral focal proximal (DFFP/PFFD: ~1:50.000, bilateral em 15%) e pela deficiência tibial longitudinal (a mais rara: 1:1.000.000). A deficiência fibular associa-se a DFFP em 70–80% dos casos. A deficiência tibial apresenta anomalias associadas em 75% dos pacientes (ectrodactilia contralateral, bifurcação distal do fêmur, anomalias de mão ipsilateral). ⚠️ O planejamento terapêutico deve ser iniciado na infância precoce e prever DCM projetada ao esqueleto maduro para orientar amputação versus reconstrução.",
        classificacao: [
          {
            sistema: "Deficiência Longitudinal da Fíbula — Achterman-Kalamchi (classificação mais utilizada clinicamente)",
            itens: [
              "Tipo 1a: Fíbula hipoplásica parcialmente presente, ambas as epífises presentes; deformidade mínima do tornozelo; encurtamento femoral concomitante frequente",
              "Tipo 1b: Fíbula mais hipoplásica, epífise proximal ou distal ausente; instabilidade moderada do tornozelo em valgo com pé equinovalgus",
              "Tipo 2: Ausência completa da fíbula; pé equinovalgus grave, raios laterais ausentes (1–3 raios ausentes em 70%); instabilidade grave do tornozelo; encurtamento femoral em 70–80% dos casos",
              "Decisão amputation vs. allongamento: pé funcional (≥4 raios, plantígrado) + DCM projetada <30%: reconstrução; pé não funcional OU DCM >30%: amputação de Syme (regra geral clínica — limiar exato ainda controverso na literatura)",
            ],
          },
          {
            sistema: "Deficiência Longitudinal da Tíbia — Jones (baseia-se na presença do mecanismo extensor do joelho)",
            itens: [
              "Tipo 1a: Aplasia tibial completa; SEM anlagem cartilaginosa tibial; SEM mecanismo extensor do quadríceps funcionante → desarticulação do joelho (não há estrutura a preservar)",
              "Tipo 1b: Anlagem cartilaginosa proximal da tíbia presente; mecanismo extensor FUNCIONANTE → centralização da fíbula ao anlage proximal (procedimento de Brown); possibilidade de preservação do joelho",
              "Tipo 2: Tíbia proximal presente; segmento distal ausente → sinostose tibiofibular distal + amputação de Syme para obter apoio terminal",
              "Tipo 3: Apenas segmento distal da tíbia presente (raro) → tentativa de reconstrução do tornozelo",
              "Tipo 4: Diástase tibiofibular (tíbia presente, mas separada) → fusão tibiofibular + correção angular",
              "⚠️ Chave diagnóstica: a presença do mecanismo extensor (palpação clínica + ressonância magnética) é o parâmetro decisivo para reconstrução versus amputação — mais importante que a classificação radiográfica isolada",
            ],
          },
          {
            sistema: "Deficiência Femoral Focal Proximal (DFFP) — Classificação de Aitken (radiográfica)",
            itens: [
              "Classe A: Cabeça femoral presente, acetábulo normal ou levemente displásico; pseudoartrose ou coxa vara subtrocantérica → fêmur mais longo das classes; pé ao nível do joelho contralateral",
              "Classe B: Cabeça femoral presente (ossificação tardia, conexão cartilaginosa ao colo); acetábulo moderadamente displásico → pé ao nível da diáfise tibial contralateral",
              "Classe C: Cabeça femoral ausente (não ossificará); acetábulo gravemente displásico, parede lateral plana → segmento femoral muito curto",
              "Classe D: Diáfise femoral essencialmente ausente; côndilos distais ao nível do acetábulo; ausência de desenvolvimento acetabular → forma mais grave",
            ],
          },
          {
            sistema: "DFFP — Classificação de Gillespie (baseada na indicação terapêutica)",
            itens: [
              "Grupo A (≈ Aitken A): Fêmur curto congênito; quadril estável ao apoio; fêmur >60% do contralateral; pé abaixo do ponto médio da tíbia oposta → candidatos a alongamento femoral seriado",
              "Grupo B (≈ Aitken B/C): Quadril instável ao apoio; fêmur <50% do contralateral → tratamento protético (rotacionoplastia de Van Nes ou prótese convencional pós-amputação de Syme)",
              "Grupo C (≈ Aitken D): Apenas rudimento distal femoral, sem desenvolvimento acetabular → tratamento protético exclusivo",
            ],
          },
          {
            sistema: "DFFP — Classificação de Sabharwal-Paley (foco na viabilidade do alongamento)",
            itens: [
              "Tipo 1 (≈ Gillespie A): subdividido por problemas do quadril e joelho que devem ser resolvidos antes ou concomitantemente ao alongamento",
              "Tipo 2: Pseudoartrose móvel com ou sem cabeça femoral móvel → estabilização da pseudoartrose é pré-requisito obrigatório ao alongamento",
              "Tipo 3 (≈ Gillespie C): Mobilidade do joelho <45° → ganhos funcionais com alongamento são improváveis; indicação protética preferencial",
            ],
          },
        ],
        mecanismo: "As deficiências longitudinais resultam de falhas na diferenciação mesodérmica durante as semanas 4–8 do desenvolvimento embrionário (formação dos brotos dos membros). A deficiência fibular é de causa desconhecida (esporádica); a DFFP pode ser consequência da embriopatia por talidomida (histórica) ou síndrome de hipoplasia femoral-fácies incomum (autossômica dominante). A deficiência tibial pode ser esporádica ou parte de síndromes autossômicas dominantes (tibial deficiency-ectrodactyly syndrome). A deformidade em equinovalgus na hemimelia fibular resulta da ausência do suporte lateral da tíbia associado à ausência da musculatura peroneal.",
        tx_nao_cirurgico: [
          "Prótese provisória de equanimização (equalização): indicada desde os 9–12 meses de idade para permitir ortostatismo e marcha independente enquanto o planejamento definitivo é estabelecido",
          "Elevação de calçado/palmilha: papel limitado a DCM leves (<3 cm) no contexto de deficiências longitudinais — raramente suficiente como manejo definitivo",
          "Fisioterapia de fortalecimento e preparação pré-operatória: essencial antes de rotacionoplastia (fortalecimento do tornozelo e pé, que passarão a atuar como joelho); treino de equilíbrio e marcha com muletas",
          "⚠️ Não há tratamento conservador que modifique a história natural das deficiências longitudinais esqueléticas; o papel do tratamento não cirúrgico é preparatório e de suporte à adaptação funcional",
        ],
        tx_cirurgico: [
          "DEFICIÊNCIA FIBULAR — Amputação de Syme: amputação a nível do tornozelo com preservação do coxim plantar; excelente ajuste protético com prótese infrapatelar; coto de apoio terminal; procedimento preferencial para pé não funcional ou DCM >30%; realizada ao redor de 1 ano de idade",
          "DEFICIÊNCIA FIBULAR — Reconstrução do tornozelo + alongamento: ankle reconstruction se borderline; correção do equinovalgus antes do início do alongamento; alongamentos seriados por fases com fixador externo ou prego PRECICE (NuVasive) para DCM projetada de 6–20 cm",
          "DEFICIÊNCIA FIBULAR — Epifisiodese contralateral isolada: indicada para DCM projetada 2–6 cm com pé funcional; realizada na época ideal pelo método do multiplicador (Paley)",
          "DEFICIÊNCIA TIBIAL — Desarticulação do joelho: indicada no Tipo 1a (sem mecanismo extensor); preserva o fêmur para ajuste protético acima do joelho; realizada no 1° ano de vida",
          "DEFICIÊNCIA TIBIAL — Procedimento de Brown (centralização da fíbula ao anlagem tibial proximal): indicado no Tipo 1b; preserva o joelho; alta taxa de instabilidade do joelho a longo prazo; controverso em relação à vantagem funcional final",
          "DFFP — Rotacionoplastia de Van Nes: o tornozelo do membro afetado rotaciona 180° para atuar como articulação do 'joelho' da prótese; requer tornozelo funcional com ROM >45° (sem valgus nem equino graves); contraindicado em tornozelo comprometido por deficiência fibular grave; funcionalmente superior à artrodese do joelho + ablação do pé; complicação principal: derotação progressiva com o crescimento (pode necessitar procedimentos adicionais de rerotação)",
          "DFFP — Artrodese do joelho + amputação de Syme: para Gillespie B/C sem tornozelo funcional; produz coto rígido acima do joelho com boa adaptação protética",
          "DFFP — Amputação de Boyd: variante da Syme com artrodese calcaneoribial — preserva o calcâneo, oferece coto mais longo com apoio terminal; preferida por alguns em lactentes pelo menor encurtamento do coto",
          "DFFP — Alongamento femoral seriado (Gillespie A / Paley tipo 1): pré-requisito — estabilização do quadril e joelho (procedimento SUPERhip de Paley: release de partes moles anterolaterais + osteotomia proximal do fêmur + cobertura acetabular se necessário); múltiplas fases de distração; ⚠️ esperar ≥1 complicação por segmento alongado",
          "⚠️ Artrodese do joelho isolada sem rotacionoplastia: funcionalmente inferior à rotacionoplastia — reservada apenas quando o tornozelo for inadequado para Van Nes e o paciente/família recusar outras opções",
        ],
        cirurgias: [
          "Amputação de Syme: desarticulação ao nível do tornozelo com preservação do coxim plantar posterior (incisão em 'boca de peixe'); coto com apoio terminal de qualidade; excelente ajuste protético com prótese infrapatelar; indicada para hemimelia fibular com pé não funcional (<4 raios) ou DCM projetada >30%; realizada ao redor de 1 ano de vida; complicação: migração posterior do coxim plantar",
          "Amputação de Boyd: variante da Syme com artrodese calcaneoribial — preserva o calcâneo, coto mais longo com apoio terminal; preferida por alguns em lactentes para evitar encurtamento excessivo do coto",
          "Desarticulação do joelho (deficiência tibial Tipo 1a): preserva o fêmur para ajuste protético acima do joelho; realizada no 1° ano de vida; indicada quando não há mecanismo extensor",
          "Procedimento de Brown (Tipo 1b tibial): centralização da fíbula ao anlagem cartilaginoso tibial proximal para preservar o joelho; alta taxa de instabilidade do joelho a longo prazo — indicação controversa",
          "Rotacionoplastia de Van Nes (DFFP): osteotomia femoral com rotação de 180° do segmento distal; tornozelo passa a atuar como novo joelho na prótese; requer tornozelo funcional (ROM >45°, sem equinovalgus grave); osteossíntese com placa ou haste; mobilização do feixe neurovascular com cautela; complicação principal: derotação progressiva com o crescimento (osteotomias de rerotação necessárias em ~30–50%); funcionalmente superior à artrodese do joelho + ablação",
          "Artrodese do joelho + amputação de Syme (DFFP sem tornozelo funcional): coto rígido acima do joelho; boa adaptação protética transfemoral",
          "SUPERhip de Paley (pré-alongamento femoral em DFFP): release anterolateral de partes moles (retificação femoris, iliopsoas) + osteotomia valgizante proximal do fêmur + cobertura acetabular; necessário para estabilização do quadril antes do alongamento em DFFP Gillespie A/Paley tipo 2",
        ],
        complicacoes: [
          "Subluxação progressiva do joelho durante o alongamento: complicação frequente na hemimelia fibular com ACL deficiente — controlar com tração ou haste intramedular flexível cruzando o joelho",
          "Equinovalgus recidivante após reconstrução do tornozelo na hemimelia fibular: requer nova abordagem cirúrgica se funcionalmente limitante",
          "Instabilidade do joelho após Brown procedure (Tipo 1b tibial): complicação de longo prazo frequente; pior resultado do que a desarticulação em séries com seguimento prolongado",
          "Derotação pós-rotacionoplastia: necessidade de procedimentos de rerotação no crescimento em ~30–50% dos casos",
          "Adaptação psicossocial: a rotacionoplastia é funcionalmente superior mas esteticamente impactante — suporte psicológico desde o pré-operatório é essencial para o paciente e a família",
        ],
        fontes: ["Lovell & Winter's Pediatric Orthopaedics, 8ª ed., cap. 29"],
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
            Resumo didático baseado em Rockwood – Fraturas em Crianças, Tachdjian's, Campbell's e Lovell &amp; Winter's
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
