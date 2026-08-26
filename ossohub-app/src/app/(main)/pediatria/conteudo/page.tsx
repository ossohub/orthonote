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
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 20",
        epidemiologia:
          "Uma das fraturas mais comuns em crianças e adolescentes (8–15% de todas as fraturas pediátricas). Também a fratura mais frequente no parto por trauma obstétrico. Terço médio: 80–85% dos casos. Grande maioria tem excelente resultado com tratamento conservador.",
        classificacao: [
          {
            sistema: "Topografia (Allman)",
            itens: [
              "Grupo I: terço médio (diáfise) — mais comum; conservador quase sempre",
              "Grupo II: terço lateral — instável se ligamentos CC rompidos (análogo à luxação AC)",
              "Grupo III: terço medial — raro; TC para avaliar envolvimento esternoclavicular",
            ],
          },
          {
            sistema: "Terço Lateral (Craig) — guia cirúrgico",
            itens: [
              "Tipo I: lateral aos ligamentos CC (estável) → conservador",
              "Tipo II: medial aos CC (instável — ligamentos rompidos) → ORIF",
              "Tipo V: periosteal em crianças (fise cartilaginosa) — avaliação individualizada",
            ],
          },
        ],
        mecanismo:
          "Queda sobre o ombro (impacto direto) ou sobre mão estendida. RN: compressão durante parto (distócia de ombro). Pseudoparalisia do membro superior em RN por dor pode simular paralisia do plexo braquial.",
        tx_nao_cirurgico: [
          "RN: sem imobilização — roupas com cuidado por 2–3 semanas; consolidação espontânea garantida",
          "Crianças e adolescentes: tipoia simples 3–6 semanas; aceitável angulação ≤20–25° e shortening ≤1,5 cm (remodelarão)",
          "Terço lateral Tipo I: tipoia 3–4 semanas",
        ],
        tx_cirurgico: [
          "Terço lateral Tipo II (instável — ligamentos CC rompidos)",
          "Fratura aberta ou iminência de perfuração cutânea",
          "Encurtamento >2 cm em adolescente em crescimento avançado",
          "Lesão vascular ou do plexo braquial associada",
        ],
        cirurgias: [
          "Placa pré-moldada superior para clavícula (terço médio, adolescente)",
          "Ganchos ou parafusos coracoclaviculares (terço lateral Tipo II)",
          "Fio intramedular (menos usado — risco de migração)",
        ],
        complicacoes: [
          "Calo hipertrófico (muito frequente em crianças — remodela em 6–12 meses, preocupação estética)",
          "Lesão do plexo braquial (rara, geralmente transitória)",
          "Lesão da artéria ou veia subclávia (terço médio com desvio inferior grave)",
          "Síndrome do desfiladeiro torácico (calo exuberante — raro)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 20"],
      },
      {
        id: "femur-diafise-ped",
        titulo: "Fratura Diafisária do Fêmur Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 25",
        epidemiologia:
          "Fratura de osso longo mais comum em crianças. Distribuição bimodal: pico em 2–3 anos (baixa energia) e adolescentes (alta energia). <2 anos: sempre investigar maus-tratos (NAI) — prevalência de 40–50% em <1 ano e 10–30% em 1–3 anos.",
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
        ],
        mecanismo:
          "Baixa energia em criança pequena: espiral por torção. Alta energia em adolescente: transversa ou cominutiva. Rotação forçada em lactente → investigar NAI.",
        tx_nao_cirurgico: [
          "<6 meses: gesso espica imediata — 98% de bom resultado",
          "6 meses–5 anos: gesso espica após redução; tração cutânea de Bryant prévia (<2 anos, <12 kg) se muito inchado",
        ],
        tx_cirurgico: [
          "5–11 anos: ESIN (padrão)",
          ">11 anos / >50 kg: haste intramedular bloqueada (trocantérica)",
          "Politrauma / TCE: fixação precoce independente da idade",
          "Fratura aberta, floating knee (fêmur + tíbia ipsilateral)",
        ],
        cirurgias: [
          "ESIN (Elastic Stable Intramedullary Nailing): 2 hastes de titânio 3,5–4 mm via fossa supracondilar bilateral — padrão 5–11 anos",
          "Haste intramedular bloqueada (entrada trocantérica) — adolescente",
          "Gesso espica com redução — lactentes e crianças pequenas",
          "Fixação externa — fratura aberta grave ou politrauma",
        ],
        complicacoes: [
          "Overgrowth (sobrecrescimento 1–2 cm): frequente em 5–8 anos com ESIN ou gesso — aceitar discrepância 1 cm pré-op",
          "Malalinhamento rotacional ou angular",
          "Falha/migração dos fios ESIN em fraturas cominutivas instáveis",
          "Necrose da cabeça femoral (haste retrógrada em fêmur imaturo — evitar)",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 25"],
      },
      {
        id: "fise-distal-femur",
        titulo: "Fratura da Fise Distal do Fêmur",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 26",
        epidemiologia:
          "Grave porque a fise distal contribui com ~70% do crescimento longitudinal do fêmur (9 mm/ano) e ~38% do comprimento total do membro. Salter-Harris II é o padrão mais frequente (65%). Taxa de distúrbio de crescimento: 20–40%, mesmo com tratamento adequado.",
        classificacao: [
          {
            sistema: "Salter-Harris",
            itens: [
              "Tipo I: separação fisária pura (lactente — frequentemente por trauma obstétrico)",
              "Tipo II: mais comum; fragmento metafisário medial (Thurston-Holland) — redução fechada se <2 mm de passo articular",
              "Tipo III: condilar lateral ou medial — intra-articular, redução anatômica obrigatória",
              "Tipo IV: linha vertical atravessa metáfise + fise + epífise — pior prognóstico de crescimento",
            ],
          },
        ],
        mecanismo:
          "Alta energia: hiperextensão (deslocamento anterior da epífise), valgus/varus. Risco vascular: artéria poplítea situa-se anterior à cápsula posterior — risco em deslocamento anterior da epífise.",
        tx_nao_cirurgico: [
          "SH I–II não deslocadas ou mínimas: gesso joelho em extensão 4–6 semanas",
          "SH II deslocada: redução fechada (AG) + gesso se estável; se instável → fixação percutânea",
        ],
        tx_cirurgico: [
          "SH III–IV: redução anatômica obrigatória (passo articular ≤2 mm) + fixação",
          "SH II deslocada irredutível ou instável",
          "Lesão vascular da artéria poplítea (urgência cirúrgica)",
        ],
        cirurgias: [
          "Fios K percutâneos (preferencialmente epifisários — não atravessar fise)",
          "Parafusos canulados epifisários horizontais paralelos à fise (SH III–IV)",
          "Exploração e reparo vascular se lesão da poplítea",
        ],
        complicacoes: [
          "Barra fisária (pontes ósseas) → deformidade angular progressiva ou discrepância de comprimento",
          "Lesão da artéria poplítea (3–5%) — pulso obrigatório antes e após redução",
          "Lesão do nervo fibular comum ou tibial",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 26"],
      },
      {
        id: "tibia-fibula-diafise-ped",
        titulo: "Fratura Diafisária de Tíbia e Fíbula Pediátrica",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 29",
        epidemiologia:
          "Segunda fratura de membro inferior mais comum em crianças. Toddler's fracture (fratura espiral isolada da tíbia): criança ambulante 1–3 anos, baixa energia, RX negativo em até 40% (pedir incidência oblíqua ou cintilografia). Fratura de ambos os ossos: geralmente alta energia.",
        classificacao: [
          {
            sistema: "Topografia e padrão",
            itens: [
              "Toddler's fracture: espiral isolada tíbia, diagnóstico clínico em criança com coxeamento/recusa a caminhar",
              "Fratura metáfise proximal: risco de valgus tardio (Síndrome de Cozen)",
              "Fratura diáfise tíbia + fíbula: mais grave, risco de síndrome compartimental",
              "Fratura metáfise distal: acima do tornozelo — distinto das fraturas fisárias",
            ],
          },
        ],
        mecanismo:
          "Toddler's fracture: rotação com pé fixo no solo (queda, pisar em falso). Alta energia: acidente de veículo, impacto direto (bumper fracture). Compartimento anterior da perna é limitado → risco de síndrome compartimental.",
        tx_nao_cirurgico: [
          "Toddler's fracture: gesso joelho-tornozelo longo 6 semanas — retorno rápido à deambulação",
          "Fratura isolada da tíbia <10° de angulação: gesso longo com controle RX seriado",
          "Angulação aceitável: ≤10° varo/valgo, ≤10° AP, ≤1 cm de encurtamento",
          "Fratura estável de ambos os ossos: gesso longo 8–10 semanas",
        ],
        tx_cirurgico: [
          "Fratura instável/irredutível de ambos os ossos (angulação ≥10° residual)",
          "Fratura aberta",
          "Síndrome compartimental (fasciotomia de urgência antes da fixação)",
          "Floating knee (fêmur + tíbia ipsilateral)",
        ],
        cirurgias: [
          "ESIN (hastes elásticas) — fratura diafisária instável, 5–14 anos",
          "Fixação externa — fratura aberta grave ou com fasciotomia",
          "Haste intramedular bloqueada — adolescente >14 anos com fise fechada",
          "Fasciotomia de 4 compartimentos (anterior, posterior superficial, posterior profundo, lateral fibular)",
        ],
        complicacoes: [
          "Síndrome compartimental — diagnóstico clínico (5 Ps); medição de pressão compartimental se dúvida",
          "Síndrome de Cozen — valgus progressivo após fratura metáfise proximal; hiperemia periosteal estimula crescimento medial; melhora espontânea em 80% em 1–2 anos",
          "Lesão do nervo fibular (fratura proximal da fíbula)",
          "Retardo de consolidação da fíbula isolada",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 29"],
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
      {
        id: "tornozelo-ped",
        titulo: "Fraturas do Tornozelo Pediátrico",
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 30",
        epidemiologia:
          "Fraturas fisárias do tornozelo: 25–38% de todas as fraturas fisárias. SH II da tíbia distal é a mais frequente. Tillaux e Triplane são exclusivas de adolescentes em fechamento fisário (12–15 anos) — representam 3–7% das fraturas do tornozelo pediátrico. A fise tibial distal fecha centrifugamente: central primeiro → ântero-lateral por último (daí o Tillaux).",
        classificacao: [
          {
            sistema: "Salter-Harris (tíbia distal — geral)",
            itens: [
              "Tipo I: avulsão fisária pura (criança jovem, mecanismo inversão)",
              "Tipo II: mais comum; fragmento de Thurston-Holland posteromedial ou posterolateral",
              "Tipo III (Tillaux juvenil): avulsão SH III da ântero-lateral da epífise pelo ligamento talofibular anterior (LTFA) — intra-articular",
              "Tipo IV: raro; traço atravessa metáfise + fise + epífise",
            ],
          },
          {
            sistema: "Fratura Triplane (SH IV em 3 planos)",
            itens: [
              "Fratura em 3 planos simultâneos: sagital (epifisária), horizontal (fisária), coronal (metafisária)",
              "Triplane 2 fragmentos: epífise anterior + metáfise-epífise-fise posterior",
              "Triplane 3 fragmentos: geralmente mais deslocado — TC obrigatória",
              "Mecanismo: rotação externa do pé com fise em fechamento parcial assimétrico",
            ],
          },
        ],
        mecanismo:
          "Tillaux: rotação externa → LTFA avulsiona ântero-lateral da epífise (último fragmento a fechar). Triplane: rotação externa com fechamento fisário assimétrico → forças de cisalhamento nos 3 planos. SH I/II: inversão ou eversão em criança com fise aberta (ligamento mais forte que a fise).",
        tx_nao_cirurgico: [
          "SH I e SH II com deslocamento < 2 mm: gesso bota curta ou longa 4–6 semanas",
          "SH II deslocado: redução fechada (rotação interna + dorsiflexão) + gesso 6 semanas",
          "Tillaux e Triplane com passo articular < 2 mm: gesso longo + sem carga 6 semanas",
        ],
        tx_cirurgico: [
          "Tillaux ou Triplane com passo articular ≥ 2 mm: redução + fixação (passo articular > 2 mm prediz artrose)",
          "SH III–IV irredutível fechado",
          "Fratura aberta",
        ],
        cirurgias: [
          "Redução fechada (intensificador) + parafusos canulados epifisários paralelos à fise (NUNCA cruzar a fise em crescimento)",
          "Redução artroscópica + fixação: visualização direta do passo articular (Tillaux, Triplane de 3 fragmentos)",
          "Redução aberta (incisão anterolateral): quando fechada é insuficiente",
        ],
        complicacoes: [
          "Distúrbio de crescimento (mínimo — fise em fechamento nos Tillaux/Triplane; pouco impacto clínico real)",
          "Artrose da articulação tibiotársica (passo articular ≥ 2 mm não reduzido anatomicamente)",
          "Consolidação viciosa em rotação (SH II com redução inadequada mantida)",
          "Dor crônica do tornozelo e limitação funcional",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 30"],
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
        subtitulo: "Rockwood — Fraturas em Crianças, cap. 28",
        epidemiologia:
          "Lesões ligamentares puras são raras antes do fechamento das fises (o osso falha antes do ligamento). Em crianças, fraturas fisárias e avulsões substituem as lesões ligamentares do adulto. Com a maturidade esquelética, o padrão se aproxima do adulto. OCD juvenil (fise aberta) tem melhor prognóstico que a forma adulta.",
        classificacao: [
          {
            sistema: "Avulsão da Espinha Tibial (LCA) — Meyers-McKeever",
            itens: [
              "Tipo I: não deslocado (<2 mm) → gesso joelho em extensão 6 semanas",
              "Tipo II: levantado anteriormente (dobradiça posterior intacta) → redução em extensão; se reduzido → gesso; se irredutível → cirurgia",
              "Tipo III: completamente deslocado → redução artroscópica + fixação",
              "Tipo IV (Zaricznyj): fragmento cominutivo → artroscopia",
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
          "Avulsão espinha tibial: hiperextensão + rotação (queda de bicicleta, esporte). OCD: microtrauma repetitivo + isquemia subondral. Menisco discoide: variante congênita → pode romper com trauma mínimo ou ser assintomático.",
        tx_nao_cirurgico: [
          "Avulsão espinha Tipo I: gesso joelho em extensão 6 semanas",
          "OCD estável (fise aberta): restrição de carga com muletas 3–6 meses + RMN controle — taxa de cura espontânea ~50%",
          "Menisco discoide assintomático: observação",
          "Ruptura meniscal sintomática: repouso + fisioterapia antes de indicar artroscopia",
        ],
        tx_cirurgico: [
          "Avulsão espinha Tipo III–IV: artroscopia + fixação",
          "OCD instável ou fragmento livre: artroscopia",
          "Menisco discoide sintomático: meniscoplastia artroscópica (preservar o menisco — saucerization)",
          "Ruptura meniscal em joelho com fise aberta: reparo meniscal (preferível à menisectomia — risco artrose futura)",
        ],
        cirurgias: [
          "Artroscopia: avulsão espinha → redução + fixação com parafuso ou fio absorvível; OCD → perfuração, fixação, enxerto osteocondilar (se fragmento livre grande)",
          "Meniscoplastia artroscópica (saucerization do discoide + reparo posterior se possível)",
          "Reconstrução do LCA: em adolescentes Tanner IV–V com fise quase fechada → técnica fisária (all-epiphyseal ou over-the-top)",
        ],
        complicacoes: [
          "Instabilidade residual do joelho (avulsão espinha mal reduzida → LCA frouxo funcional)",
          "Artrose precoce (menisectomia em joelho imaturo — evitar a todo custo)",
          "Não-consolidação da OCD com fragmento livre → dor e travamento crônicos",
          "Lesão fisária inadvertida durante artroscopia ou reconstrução LCA",
        ],
        fontes: ["Rockwood — Fraturas em Crianças, 9ª ed., cap. 28"],
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
