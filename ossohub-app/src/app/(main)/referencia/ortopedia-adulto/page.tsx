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
        subtitulo: "Rockwood & Green cap. 28 · Campbell cap. 56",
        epidemiologia:
          "Representa 5–10% de todas as fraturas. Pico bifásico: jovens esportistas (colisão) e idosos (queda). Terço médio ~80%, lateral ~15%, medial ~5%. Relação homem:mulher = 2–3:1. Incidência estimada: 64 por 100.000/ano.",
        classificacao: [
          {
            sistema: "Craig (por terço)",
            itens: [
              "Tipo I – Terço médio (diafisário)",
              "Tipo II – Terço lateral: IIA (ligamentos CC intactos), IIB (coracoclavicular rompidos → instável)",
              "Tipo III – Terço medial",
            ],
          },
          {
            sistema: "Robinson (2004) — mais prognóstico",
            itens: [
              "1A: Medial, não deslocada",
              "1B: Medial, deslocada ou cominutiva",
              "2A1: Diafisária não deslocada (alinhamento cortical)",
              "2A2: Diafisária angulada (sem contato cortical)",
              "2B1: Diafisária deslocada simples / em cunha",
              "2B2: Diafisária cominutiva / segmentar",
              "3A: Lateral, articular, não deslocada",
              "3B: Lateral, deslocada (inclui Craig IIB)",
            ],
          },
        ],
        mecanismo:
          "Queda sobre o ombro (85%) ou sobre mão estendida em extensão (15%). Compressão axial transmitida pela cadeia cinética. Trauma direto (menos comum). A força age no terço médio onde a clavícula muda de seção transversal.",
        tx_nao_cirurgico: [
          "Tipoia simples ou bandagem em 8 por 4–6 semanas",
          "Indicado para terço médio não deslocado / encurtamento <2 cm",
          "Robinson 2A1–2A2 e maioria das 3A",
          "Idosos com baixa demanda funcional e fraturas deslocadas",
          "Taxa de consolidação conservadora: ~95% terço médio não deslocado",
        ],
        tx_cirurgico: [
          "Encurtamento ≥2 cm no raio X (correlaciona com pior função)",
          "Fratura aberta ou iminente perfuração cutânea",
          "Cominutividade marcada / ângulo em baioneta (Robinson 2B2)",
          "Tipo IIB lateral (CC rompidos + instabilidade do ombro)",
          "Politraumatizado necessitando apoio precoce (carga no braço)",
          "Atleta de alta performance ou trabalhador com demanda manual",
          "Pseudartrose sintomática",
        ],
        cirurgias: [
          "Placa anatômica superior (DCP 3,5 mm) — padrão-ouro para terço médio",
          "Placa anteroinferior — menor irritação cutânea; biomecânica similar",
          "Haste intramedular (TEN, TLNS, Rockwood Pin) — menor cicatriz, risco de migração",
          "Reconstrução dos ligamentos CC (âncoras, botão cortical, enxerto) — Tipo IIB",
          "Ressecção de pseudartrose + enxerto ilíaco + placa",
        ],
        complicacoes: [
          "Pseudartrose: ~1% tratamento conservador não deslocado; ~15% deslocado; <2% com placa",
          "Malunião com encurtamento: dor em AC, fraqueza abducção",
          "Pneumotórax / lesão da veia subclávia (fraturas mediais deslocadas)",
          "Migração de haste (complicação específica do método)",
          "Irritação cutânea por placa superior (remoção eletiva em 12–18 meses)",
          "Lesão do plexo braquial (muito rara — fraturas mediais com desvio posterior)",
          "Lesão do nervo supraclavicular (formigamento ombro anterior — neuropraxia por tração)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "umero-proximal",
        titulo: "Fratura do Úmero Proximal",
        subtitulo: "Rockwood & Green cap. 30 · Campbell cap. 57",
        epidemiologia:
          "5% de todas as fraturas; 3ª fratura osteoporótica mais comum (após vértebra e rádio distal). Incidência: ~87 por 100.000/ano; 70% em >60 anos. Mulheres:homens = 3:1. Espera-se duplicação até 2030 com o envelhecimento populacional.",
        classificacao: [
          {
            sistema: "Neer (partes — 4 segmentos: cabeça, GT, PT, diáfise)",
            itens: [
              "1 parte: qualquer padrão com deslocamento <1 cm ou angulação <45° — maioria (~80%)",
              "2 partes: somente 1 segmento deslocado (> critérios acima)",
              "3 partes: 2 segmentos deslocados",
              "4 partes: 3 segmentos deslocados → alto risco de necrose avascular (NAV 13–34%)",
              "Luxo-fratura em valgum: variante de 4 partes com melhor prognóstico vascular",
            ],
          },
          {
            sistema: "AO/OTA (11-A/B/C)",
            itens: [
              "A1: extra-articular unifocal da grande tuberosidade",
              "A2: extra-articular unifocal impactada em valgo",
              "A3: extra-articular unifocal sem impactação",
              "B1: extra-articular bifocal com impactação",
              "B2: extra-articular bifocal sem impactação",
              "B3: extra-articular bifocal + luxação glenoumeral",
              "C1: articular com pouco deslocamento (impactada)",
              "C2: articular impactada com deslocamento marcado",
              "C3: articular com luxação glenoumeral (mais grave)",
            ],
          },
          {
            sistema: "Hertel — Critérios de NAV (preditores independentes)",
            itens: [
              "Extensão metafisária <8 mm abaixo da cabeça",
              "Ruptura da dobradiça medial (cápsula articular)",
              "Padrão de fratura AO/OTA Tipo C",
              "→ Combinação dos 3 fatores: probabilidade de NAV >97%",
            ],
          },
        ],
        mecanismo:
          "Idosos: queda da própria altura com impacto no ombro ou mão estendida (baixa energia, osso osteoporótico). Jovens: trauma de alta energia (acidente moto, queda de altura). Raro: contração muscular violenta (convulsão, eletrocussão) → avulsão GT ou PT.",
        tx_nao_cirurgico: [
          "Neer 1 parte: tipoia + pendulares precoces (2–3 semanas) → ROM progressivo",
          "Grande tuberosidade isolada com <5 mm de deslocamento superior",
          "Idosos com baixa demanda + fraturas 2–3 partes sem deslocamento crítico",
          "Fraturas em valgum impactadas (AO B1/C1): consolidam bem sem cirurgia em 85%",
          "Taxa de consolidação com conservador: 85–95% das Neer 1-parte",
        ],
        tx_cirurgico: [
          "Grande tuberosidade ≥5 mm de deslocamento (paciente ativo) — evita impacto subcromial",
          "Fraturas 3–4 partes em paciente jovem (<65 anos) com boa qualidade óssea",
          "Luxo-fraturas (qualquer classificação — instabilidade glenoumeral)",
          "Fratura em varo/angulação >45° (AO A3/B2)",
          "Fratura aberta",
          "Lesão neurovascular associada",
        ],
        cirurgias: [
          "Placa LCP proximal de úmero (PHILOS/Proximal Humerus LCP) — padrão 3–4 partes em jovens; parafusos calcarmos reduzem cut-out",
          "Haste intramedular bloqueada — menor exposição deltóide, útil em osteoporose grave, fraturas 2-partes cirúrgicas",
          "Fixação percutânea com fios K — selecionada: 2–3 partes, boa qualidade óssea, cirurgião experiente",
          "Hemiprótese de úmero (Austin-Moore, GLOBAL) — 4 partes em idosos >70 anos c/ má qualidade óssea (alternativa à RSA quando manguito intacto)",
          "Artroplastia reversa do ombro (RSA) — padrão atual: 4 partes >70 anos, C3 AO, NAV crônica, manguito insuficiente",
          "Fixação com sutura/cerclagem — pequenas tuberosidades avulsionadas isoladas",
        ],
        complicacoes: [
          "Necrose avascular da cabeça umeral: Neer 4 partes até 34%; luxo-fratura 3 partes ~12%",
          "Rigidez pós-operatória (cápsula + tecido cicatricial) — reabilitação precoce essencial",
          "Varo da cabeça / cut-out do parafuso (perda de fixação em osteoporose — TAD >25 mm, sem parafuso calcar)",
          "Migração superior de haste intramedular — impinge nervo axilar / manguito",
          "Lesão do nervo axilar: paralisia deltóide + déficit sensitivo lateral do braço (~6–8% fraturas)",
          "Lesão do nervo musculocutâneo (flexão do cotovelo)",
          "Não união: rara com placa (<5%); mais frequente com intramedular",
          "Proeminência de placa/parafusos — irritação subcromial exige remoção",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "umero-distal",
        titulo: "Fratura do Úmero Distal",
        subtitulo: "Rockwood & Green cap. 32 · Campbell cap. 58",
        epidemiologia:
          "~2% de todas as fraturas; 30% das fraturas do cotovelo. Distribuição bimodal: adultos jovens (alta energia) e idosas acima de 65 anos (baixa energia, osteoporose). Padrão mais comum: intercondiliana em Y ou T.",
        classificacao: [
          {
            sistema: "AO/OTA (13-A/B/C) — mais usada",
            itens: [
              "A: extra-articular (supracondilar/transcondiliana) — A1/A2/A3",
              "B: articular parcial (capitelo, tróclea, epicôndilo) — B1/B2/B3",
              "C: articular completa (intercondiliana) — C1 simples, C2 cominuto metafisário, C3 cominuto articular",
            ],
          },
          {
            sistema: "Bryan & Morrey (fratura do capitelo)",
            itens: [
              "Tipo I (Hahn-Steinthal): capitelo inteiro",
              "Tipo II (Kocher-Lorenz): condroso-ósseo fino (apenas cartilagem)",
              "Tipo III: cominutiva",
              "Tipo IV: capitelo + tróclea (fratura coronoide lateral)",
            ],
          },
          {
            sistema: "Dubberley (variante capitelo)",
            itens: [
              "1A/1B: capitelo isolado (sem /com cominuição)",
              "2A/2B: capitelo + tróclea lateral",
              "3A/3B: capitelo + tróclea completa",
            ],
          },
        ],
        mecanismo:
          "Alta energia em jovens (queda de altura, acidente). Baixa energia em idosas (queda simples com cotovelo em extensão). Fratura em Y/T: carga axial no cotovelo em flexão divide os côndilos. Capitelo: força de cisalhamento anteromedial (queda com punho em extensão).",
        tx_nao_cirurgico: [
          "Extra-articular não deslocada (AO A1): tala posterior 4–6 semanas + reabilitação",
          "Pacientes com comorbidades proibitivas para cirurgia",
          "Fratura do capitelo Tipo II/III em idosos sem demanda → mobilização precoce",
        ],
        tx_cirurgico: [
          "Praticamente todas as fraturas articulares completas (AO C) — cirurgia definitiva",
          "Fratura do capitelo deslocada (Tipo I, II Bryan & Morrey) — excisão ou RAFI",
          "Fratura supracondilar deslocada (AO A2/A3)",
          "Fraturas abertas ou com lesão neurovascular",
        ],
        cirurgias: [
          "RAFI via olécrano osteotomia (campânula) — melhor visualização articular para AO C",
          "RAFI via abordagem paratricipital (Bryan-Morrey) — evita osteotomia, AO A",
          "Dupla placa em ângulo perpendicular 90/90° ou paralela (medial + lateral) — padrão AO C",
          "Excisão do capitelo fraturado — fragmentos pequenos irrecuperáveis (+ prótese de cabeça de rádio se necessário)",
          "RAFI com parafusos sem cabeça (Herbert, HCS) — capitelo Tipo I/IV",
          "Artroplastia total de cotovelo (TEA) — idosos >65 anos, cominuição grave, baixa demanda (alternativa à RAFI)",
        ],
        complicacoes: [
          "Rigidez (mais comum — perda de extensão) — reabilitação precoce com mobilização ativa",
          "Lesão do nervo ulnar (sulco epicondilar medial) — transposição anterior preventiva recomendada",
          "Lesão do nervo radial / interósseo posterior (abordagem lateral)",
          "Não união do cotovelo — exige enxerto + revisão de fixação",
          "Artrose pós-traumática (proporcional à lesão articular)",
          "Ossificação heterotópica — incidência ~3% com RAFI; maior em politrauma + TCE",
          "Falha de fixação da osteotomia de olécrano (5–10%)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "cabeca-radio",
        titulo: "Fratura da Cabeça do Rádio",
        subtitulo: "Rockwood & Green cap. 33 · Campbell cap. 59",
        epidemiologia:
          "Fratura mais comum do cotovelo em adultos (33%). Incidência: ~2,5 por 10.000/ano. Pico: 30–40 anos, leve predomínio feminino. Associação com lesão ligamentar colateral medial e cartilagem triangular (TFCC) em até 30%.",
        classificacao: [
          {
            sistema: "Mason (1954) — mais utilizada",
            itens: [
              "Tipo I: não deslocada ou deslocamento <2 mm (marginal)",
              "Tipo II: fratura parcial deslocada >2 mm (impede prono-supinação)",
              "Tipo III: cominutiva — cabeça irrecuperável",
              "Tipo IV (adicionado por Johnston): Tipo I–III + luxação do cotovelo",
            ],
          },
          {
            sistema: "Hotchkiss (modificação clínica)",
            itens: [
              "Tipo I: não deslocada / <2 mm → conservador",
              "Tipo II: deslocamento ≥2 mm, sem cominuição → RAFI possível",
              "Tipo III: cominuição — excisão ou prótese",
            ],
          },
        ],
        mecanismo:
          "Queda com mão estendida → carga axial transmitida: rádio impacta capitelo. Frequentemente associado a ruptura do ligamento colateral medial ou fratura da coronoide (tríade terrível do cotovelo).",
        tx_nao_cirurgico: [
          "Mason I (Hotchkiss I): tipoia 1–3 dias + mobilização precoce ativa imediata",
          "Não há contraindicação ao movimento — mobilização precoce diminui rigidez",
        ],
        tx_cirurgico: [
          "Hotchkiss II: deslocamento ≥2 mm ou bloqueio mecânico à prono-supinação",
          "Hotchkiss III: cominuição irrecuperável — excisão ou prótese",
          "Qualquer Mason + luxação do cotovelo (Mason IV) — estabilidade crucial",
          "Tríade terrível do cotovelo: coronoide + LCM + cabeça rádio — protocolo estabilização sequencial",
        ],
        cirurgias: [
          "RAFI com parafusos de Herbert ou mini-parafusos (Hotchkiss II, fragmento >25% articular)",
          "Excisão da cabeça do rádio isolada — apenas se cotovelo estável (ausência de eixo valgus ou Galeazzi)",
          "Prótese de cabeça do rádio (silicone ou metal modular) — Hotchkiss III, tríade terrível, lesão interóssea Essex-Lopresti",
          "Abordagem de Kocher (lateral — entre ancôneo e ECU) ou abordagem de Kaplan (ECRL e EDC)",
        ],
        complicacoes: [
          "Rigidez do cotovelo (perda de extensão) — mais comum após imobilização prolongada",
          "Síndrome de Essex-Lopresti: lesão da membrana interóssea + ruptura do TFCC → prótese obrigatória (excisão causa migração proximal do rádio)",
          "Artrose pós-traumática (capitelo)",
          "Falha de fixação (fragmento pequeno)",
          "Sinovite por prótese de silicone (substituída por metal modular)",
          "Instabilidade valgus crônica (lesão LCM associada não tratada)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "radio-distal",
        titulo: "Fratura do Rádio Distal",
        subtitulo: "Rockwood & Green cap. 39 · Campbell cap. 65",
        epidemiologia:
          "Fratura mais comum em adultos (~17% de todas as fraturas). Distribuição bimodal: jovens de 18–25 anos (alta energia) e mulheres pós-menopáusicas ≥65 anos (queda de baixa energia). Incidência aumenta 3x em mulheres após menopausa. EUA: ~650.000 casos/ano.",
        classificacao: [
          {
            sistema: "Frykman (histórica — baseada em envolvimento articular)",
            itens: [
              "I–II: extra-articular (sem / com fratura ulnar distal)",
              "III–IV: articulação rádio-ulnar distal comprometida",
              "V–VI: articulação rádio-cárpica comprometida",
              "VII–VIII: ambas as articulações comprometidas",
            ],
          },
          {
            sistema: "AO/OTA (23-A/B/C) — guia cirúrgico",
            itens: [
              "A1: extra-articular, isolada (processo estiloide ulnar)",
              "A2: extra-articular rádio não cominutiva",
              "A3: extra-articular rádio cominutiva",
              "B1: articular parcial — sagital (estiloide radial / Chauffeur)",
              "B2: articular parcial — dorsal (Barton dorsal)",
              "B3: articular parcial — volar (Barton volar / Letenneur)",
              "C1: articular completa simples metáfise e articulação",
              "C2: articular completa + cominuição metafisária",
              "C3: articular completa + cominuição articular (die-punch)",
            ],
          },
          {
            sistema: "Epônimos clínicos clássicos",
            itens: [
              "Colles: dorsal, extra-articular (queda dorsiflexão) — mais comum",
              "Smith: volar, extra-articular (queda palmiflexão / reverso Colles)",
              "Barton dorsal: cizalhamento articular dorsal",
              "Barton volar: cizalhamento articular volar",
              "Chauffeur (Hutchinson): estiloide radial isolado",
              "Die-punch: afundamento articular dorsomedial (lunate fossa)",
            ],
          },
        ],
        mecanismo:
          "Queda com punho em extensão/dorsiflexão → Colles / Barton dorsal. Queda com punho em flexão → Smith. Impacto axial de alta energia → AO C3 (cominuição articular). Trauma direto dorsal → fratura de Barton.",
        tx_nao_cirurgico: [
          "Fraturas A estáveis não deslocadas: imobilização em tala gessada neutra ou leve desvio ulnar por 4–6 semanas",
          "Idosos com baixa demanda funcional e fraturas deslocadas redutíveis",
          "Critérios de estabilidade pós-redução (Lafontaine): <3 destes fatores de risco → conservador aceitável",
          "Critérios radiológicos aceitáveis: inclinação dorsal ≤10°, encurtamento radial ≤3 mm, degrau articular ≤2 mm",
          "Imobilização: punho neutro ou leve flexão + desvio ulnar; cotovelo livre",
        ],
        tx_cirurgico: [
          "Falha de manutenção da redução no gesso (perda de redução comum em 1ª semana)",
          "Degrau articular >2 mm (proporcional a artrose)",
          "Inclinação dorsal >10° após redução fechada",
          "Encurtamento radial >3 mm (impacto ulnocarpal)",
          "Comminuição dorsal significativa (prever instabilidade)",
          "Fratura de Barton (qualquer) — instabilidade carpo-radial",
          "Jovens ativos com qualquer deslocamento significativo",
          "Fratura aberta ou lesão neurovascular",
        ],
        cirurgias: [
          "Placa volar de ângulo fixo (Synthes DVR, Aptus, Acu-Loc) — padrão atual, maioria das AO A/B/C1–C2",
          "Fixador externo spanning (cominuição grave AO C3, contaminação, polifratura) ± fios K articulares",
          "Fixação percutânea com fios K (fraturas simples A1/A2, pacientes jovens com boa qualidade óssea)",
          "Placa dorsal (die-punch AO C3, fragmento dorsal livre, falha da placa volar)",
          "Placa volar específica (rim volar) — Barton volar",
          "Combinação placa volar + fios K dorsais (AO C3 com fragmentos dorsais)",
        ],
        complicacoes: [
          "Síndrome do túnel do carpo aguda ou subaguda (compressão nervo mediano por edema/hematoma)",
          "Ruptura do tendão extensor pollicis longus (EPL) — irritação pelo raio X divergente no 3º compartimento",
          "Lesão da cartilagem triangular (TFCC) — dor ulnar crônica, instabilidade DRUJ",
          "Malunião (perda de redução no gesso — causa mais comum)",
          "CRPS tipo I / Distrofia Simpático-Reflexa (Sudek) — 2–5%",
          "Rigidez do punho e dedos (imobilização prolongada, edema)",
          "Síndrome compartimental (raro — alta energia)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "escafoide",
        titulo: "Fratura do Escafoide",
        subtitulo: "Rockwood & Green cap. 40 · Campbell cap. 66",
        epidemiologia:
          "Fratura mais comum dos ossos do carpo (60–70%). Incidência: ~4 por 10.000/ano. Predominância masculina marcada (80%) entre 15–40 anos. Alta taxa de diagnóstico tardio (até 25% dos RX iniciais negativos). Pseudartrose em 5–10% mesmo tratado.",
        classificacao: [
          {
            sistema: "Herbert & Fisher (1984) — prognóstico vascular",
            itens: [
              "A1: Tubérculo distal (estável, baixo risco NAO)",
              "A2: Cista cortical incompleta (estável)",
              "B1: Oblíqua distal (instável)",
              "B2: Colo (instável — mais comum, 70%)",
              "B3: Pólo proximal (instável, alto risco NAO)",
              "B4: Com luxação perisescafóide / trans-escafoide-perilunado",
              "C: Cominuição (grave instabilidade)",
              "D1: Pseudartrose fibrosa",
              "D2: Pseudartrose com reabsorção",
            ],
          },
          {
            sistema: "AO/OTA (87-B) e localização",
            itens: [
              "Polo distal: 10% → boa vascularização → excelente consolidação",
              "Cintura (colo): 70–80% → suprimento sanguíneo limítrofe",
              "Polo proximal: 10–20% → vascularização anterógrada terminal → NAO 30–40%",
            ],
          },
        ],
        mecanismo:
          "Queda com mão estendida e punho em dorsiflexão + desvio radial (hiperextensão ≥97°). Força transmitida pelo capitato comprime a cintura do escafoide contra o rádio. Trauma direto menos frequente.",
        tx_nao_cirurgico: [
          "Herbert A (estáveis): imobilização com órtese ou gesso incluindo polegar por 6–12 semanas",
          "Herbert B2 não deslocada: alguns centros tratam conservadoramente com ↑ taxa de consolidação em 8–12 semanas; outros indicam fixação percutânea",
          "Gesso de antebraço incluindo polegar ('spica thumb cast') — melhor controle que palmeira",
          "Monitorar com TC ou RNM em 6 semanas para avaliar consolidação",
        ],
        tx_cirurgico: [
          "Qualquer fratura deslocada (translação >1 mm, angulação >15°, DISI)",
          "Polo proximal (Herbert B3) — alto risco NAO; fixação percutânea precoce",
          "Herbert B4 (luxação trans-escafoide-perilunada) — emergência cirúrgica",
          "Atleta com necessidade de retorno rápido ao esporte (Herbert B2)",
          "Pseudartrose sintomática (Herbert D1/D2)",
        ],
        cirurgias: [
          "Parafuso de Herbert percutâneo anterógrado (dorsal → distal para proximal) ou retrógrado (volar)",
          "RAFI aberta com parafuso + enxerto ósseo esponjoso — pseudartrose / cominuição",
          "Enxerto vascularizado (1,2-ICSRA, enxerto do rádio distal) — pseudartrose com NAO polo proximal",
          "Redução aberta + parafuso + enxerto estrutural — deformidade DISI (flexão do colo)",
        ],
        complicacoes: [
          "Necrose avascular do polo proximal (NAO): ~30–40% no polo proximal; diagnosticada por RNM (ausência de realce)",
          "Pseudartrose: 5% tratados; até 50% se não diagnosticada",
          "DISI (Dorsal Intercalated Segment Instability) — colapso carpal por pseudartrose crônica",
          "Artrose escafo-rádio-capitato (SNAC — Scaphoid Non-union Advanced Collapse): progressiva se pseudartrose crônica",
          "CRPS tipo I",
          "Fratura do estiloide radial associada (não diagnosticada)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
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
        subtitulo: "Rockwood & Green cap. 50 · Campbell cap. 53",
        epidemiologia:
          "~300.000 casos/ano nos EUA; ~1 milhão/ano mundial. Mortalidade em 1 ano: 20–30% (pneumonia, TEP, sepse). Mulheres:homens = 3:1. Média de idade: 72 anos mulheres, 68 anos homens. Custo socioeconômico enorme — 95% necessitam de cirurgia.",
        classificacao: [
          {
            sistema: "Garden (deslocamento — mais usada clinicamente)",
            itens: [
              "I: valgo impactado (trabeculado cefálico em valgo) — estável",
              "II: não deslocada (trabeculado normal, paralelo) — estável",
              "III: deslocada parcialmente (trabeculado parcialmente alinhado)",
              "IV: deslocada completamente (trabeculado perpendicular) — maior risco NAO",
              "* Clinicamente: Garden I–II (não deslocada), III–IV (deslocada) — suficiente para decisão",
            ],
          },
          {
            sistema: "Pauwels (ângulo de cisalhamento — prediz falha de fixação)",
            itens: [
              "Tipo I: <30° — compressão axial favorável → melhor prognóstico",
              "Tipo II: 30–50° — misto (compressão + cisalhamento)",
              "Tipo III: >50° — cisalhamento predominante → alto risco falha de fixação",
            ],
          },
          {
            sistema: "AO/OTA (31-B)",
            itens: [
              "B1: subcapital, pouco deslocamento",
              "B2: transcervical",
              "B3: subcapital, deslocada (equivale a Garden III–IV)",
            ],
          },
        ],
        mecanismo:
          "Idosos (>65 anos): queda da própria altura em osteoporótico — fratura de fragilidade. A fratura pode PRECEDER a queda (fadiga óssea, cortical fina). Adultos jovens (<50 anos): trauma de alta energia (acidente, quedas de altura) — raro (~2%) mas prognóstico vascular pior (impacto maior).",
        tx_nao_cirurgico: [
          "Paciente acamado sem possibilidade de cirurgia (ASA V, comorbidades proibitivas)",
          "Garden I impactada em valgo em idoso sem deambulação prévia (decisão multidisciplinar)",
          "Tração esquelética como controle temporário da dor (não como tratamento definitivo)",
          "Mortalidade conservadora é MUITO maior → mobilização é o objetivo",
        ],
        tx_cirurgico: [
          "Praticamente todas as fraturas em pacientes deambuladores",
          "Mobilização precoce previne: pneumonia, TEP, úlceras de pressão, declínio cognitivo",
          "Urgência relativa <24–48h → reduz mortalidade e risco de NAO (estudos controversos mas consenso clínico)",
          "Garden III–IV: artroplastia é preferível à fixação em >60 anos",
        ],
        cirurgias: [
          "3 parafusos canulados em triângulo invertido — Garden I/II, jovens <60 anos, Pauwels I/II; menor invasão",
          "DHS (Dynamic Hip Screw) com placa lateral — basocervicais e Pauwels I; também Garden I/II",
          "Hemiprótese cimentada (Thompson/Moore) — Garden III/IV em idosos >70 anos, baixa demanda",
          "ATQ cimentada ou não cimentada — Garden III/IV em paciente ativo >65 anos, artrose pré-existente",
          "Nota: Evidências recentes (HEALTH trial) favorecem ATQ em >50 anos ambulatórios, qualquer Garden",
        ],
        complicacoes: [
          "Necrose avascular (NAO) cabeça femoral: Garden I ~0–10%, II ~5%, III ~15%, IV ~25–40%",
          "Não união: 20–30% sem cirurgia; 5–10% com fixação; raramente com prótese",
          "Cut-out do parafuso deslizante (colapso em varo, migração do DHS)",
          "Discrepância de comprimento / retroversão após prótese",
          "Luxação protésica (incidência 1–4% ATQ, maior em abordagem posterior sem reparo capsular)",
          "Infecção periprotética: 1–2% ATQ; <0,5% fixação",
          "TEP/TVP: reduzido com profilaxia (HBPM, TED, mobilização precoce)",
          "Afundamento do componente femoral (hemiprótese não cimentada em osteoporose)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "intertrocanterica",
        titulo: "Fratura Intertrocantérica",
        subtitulo: "Rockwood & Green cap. 51 · Campbell cap. 53",
        epidemiologia:
          "50% das fraturas do quadril proximal. Incidência crescente. Mortalidade em 1 ano: 20–30% (semelhante ao colo). Região metafisária altamente vascularizada → NAO rara (diferença fundamental do colo). Maioria em >75 anos, osteoporóticos.",
        classificacao: [
          {
            sistema: "Evans / Jensen (estabilidade — guia implante)",
            itens: [
              "Tipo I: 2 fragmentos não deslocada (estável)",
              "Tipo II: 2 fragmentos deslocada (estável após redução)",
              "Tipo III: 3 fragmentos com parede posteromedial (instável)",
              "Tipo IV: 4 fragmentos + parede anterior (instável)",
              "Tipo V: inversamente oblíqua (padrão subtrocantérico, alto risco — instável em DHS)",
            ],
          },
          {
            sistema: "AO/OTA (31-A)",
            itens: [
              "A1: simples, 2 fragmentos (trocantérica)",
              "A2: complicada — fragmento posteromedial ≥2 (instável, mais comum)",
              "A3: inversamente oblíqua ou transtrocantérica (DHS contraindicado)",
            ],
          },
          {
            sistema: "Tip-Apex Distance (TAD) — prediz cut-out",
            itens: [
              "TAD: soma da distância ponta parafuso-ápice cabeça em AP e lateral (mm)",
              "TAD >25 mm: risco de cut-out drasticamente aumentado",
              "TAD <25 mm: risco <2% de cut-out",
            ],
          },
        ],
        mecanismo:
          "Queda da própria altura em idoso osteoporótico (mecanismo de baixa energia dominante). Alta energia em jovens (raros). Região metafisária com boa vascularização — consolidação esperada em 12–16 semanas.",
        tx_nao_cirurgico: [
          "Raramente indicado (paciente em fase terminal, sem deambulação prévia, risco cirúrgico proibitivo)",
          "Tração esquelética no côndilo femoral: analgesia e alinhamento temporário pré-op",
          "Mortalidade conservadora supera complicações cirúrgicas na maioria dos estudos",
        ],
        tx_cirurgico: [
          "Quase todos os pacientes que deambulavam previamente",
          "Mobilização precoce é o objetivo central",
          "Idealmente operado em <48h da admissão (menor mortalidade — múltiplos estudos)",
          "Otimização clínica rápida (anticoagulação, reversão de anticoagulantes, hidratação)",
        ],
        cirurgias: [
          "DHS (Dynamic Hip Screw) + placa lateral — padrão AO A1, Evans I/II (estáveis); TAD deve ser <25 mm",
          "Haste cefalomedular (Gamma Nail, PFNA, TFN-Advanced, InterTan) — AO A2/A3, Evans III–V, fraturas abaixo do pequeno trocânter",
          "Haste é obrigatória em AO A3 (inversamente oblíqua) — DHS falharia em varo",
          "Prótese de quadril — reconstrução difícil em muito idoso, osteoporose grave, fratura periimplante prévia",
        ],
        complicacoes: [
          "Cut-out do parafuso cefálico (TAD >25 mm, posição não central na cabeça, osteoporose grave — principal complicação mecânica)",
          "Colapso em varo (redução inadequada ou perda de fixação na cortical medial)",
          "Fratura periimplante ao nível da ponta da haste (stress riser)",
          "Lag screw cut-in (penetração para fossa acetabular — mau posicionamento)",
          "TVP/TEP (profilaxia obrigatória: HBPM + meias de compressão)",
          "Infecção: <2% com cirurgia fechada",
          "Necrose avascular: rara (<1%) — região metafisária bem irrigada",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "planalto-tibial",
        titulo: "Fratura do Planalto Tibial",
        subtitulo: "Rockwood & Green cap. 56 · Campbell cap. 54",
        epidemiologia:
          "~1% de todas as fraturas; 8% das fraturas em idosos. Bimodal: jovens (alta energia — acidente veicular 'bumper fracture') e mulheres >50 anos (baixa energia, osteoporose). Planalto lateral: 55–70%; bicondilar: 10–30%; medial isolado: 10–20%.",
        classificacao: [
          {
            sistema: "Schatzker — padrão internacional",
            itens: [
              "I: cizalhamento lateral puro (lateral wedge) — jovens, osso rígido",
              "II: cizalhamento + afundamento lateral — mais comum em idosos",
              "III: afundamento lateral puro (depression) — osteoporótico, sem fratura periférica",
              "IV: planalto medial — alta energia, LCL + ligamentos cruzados lesados",
              "V: bicondilar (ambos os côndilos fraturados)",
              "VI: bicondilar + dissociação metadiafisária (fragmento epifisário ↔ diáfise) — maior gravidade",
            ],
          },
          {
            sistema: "AO/OTA (41-B/C)",
            itens: [
              "B1: articular parcial, cizalhamento puro",
              "B2: articular parcial, afundamento puro",
              "B3: articular parcial, cizalhamento + afundamento",
              "C1: articular completa, articulação simples, metáfise simples",
              "C2: articular completa, articulação simples, metáfise cominutiva",
              "C3: articular completa, cominuição articular",
            ],
          },
          {
            sistema: "Coluna do planalto (3-column Luo concept)",
            itens: [
              "Coluna lateral (peroné + tibial lateral): maioria dos Schatzker I–II",
              "Coluna medial (cortical medial): Schatzker IV",
              "Coluna posterior (terço posterior — corte coronal): frequentemente não visto em RX — TC obrigatória",
            ],
          },
        ],
        mecanismo:
          "Valgo forçado + compressão axial (trauma veicular lateral — bumper fracture) → Schatzker I–III. Alta energia com compressão axial (queda de altura, acidente grave) → Schatzker IV–VI. Idosos: queda simples com joelho varo/valgo → Schatzker II–III.",
        tx_nao_cirurgico: [
          "Schatzker I–III com afundamento <2 mm, joelho estável, paciente sem demanda",
          "Órtese articulada + descarga por 8–12 semanas + mobilização precoce passiva (CPM)",
          "Joelho estável em extensão completa em valgo e varo (LCA/LCP intactos)",
        ],
        tx_cirurgico: [
          "Afundamento articular >2–3 mm em paciente ativo com expectativa de longo prazo",
          "Instabilidade articular em extensão (colateral medial, LCA/LCP lesados)",
          "Schatzker IV, V, VI — quase sempre cirúrgico",
          "Lesão vascular (artéria poplítea — Schatzker IV, urgência)",
          "Síndrome compartimental (descompressão emergência + fixador temporário)",
        ],
        cirurgias: [
          "Parafuso percutâneo canulado (Schatzker I simples, sem afundamento)",
          "Placa lateral de ângulo fixo / LCP — Schatzker I–III (mini-artroscopia para controle do afundamento)",
          "Dupla placa 90/90° (lateral + posteromedial / posterior) — Schatzker V–VI, C2/C3 AO — padrão atual",
          "Fixador externo temporário (damage control em partes moles graves) → conversão a placa em 5–10 dias",
          "Enxerto ósseo / substituto (fosfato tricálcio, aloenxerto) para preenchimento do afundamento",
          "Artroscopia-assistida — controle da redução articular, avaliação de meniscos e ligamentos",
        ],
        complicacoes: [
          "Artrose pós-traumática (proporcional ao afundamento residual — >5 mm → artrose em 75%)",
          "Lesão meniscal associada: 47–69% das fraturas laterais; tratada na mesma cirurgia quando possível",
          "Lesão do LCA/LCP (Schatzker IV especialmente)",
          "Lesão da artéria poplítea (Schatzker IV medial — emergência cirúrgica vascular antes de osteo)",
          "Lesão do nervo fibular comum (Schatzker IV lateral — pé caído)",
          "Síndrome compartimental (principalmente alta energia, Schatzker V–VI)",
          "Infecção profunda (partes moles comprometidas — esperar 5–10 dias pós-trauma para cirurgia definitiva)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "tornozelo",
        titulo: "Fratura do Tornozelo",
        subtitulo: "Rockwood & Green cap. 57 · Campbell cap. 88",
        epidemiologia:
          "Uma das fraturas mais comuns na prática ortopédica (~187 por 100.000/ano). Pico: adultos jovens (esporte, entorse com fratura) e idosos (queda). Relação mulher:homem = 3:2 em >50 anos. Fratura de maléolo lateral (fíbula) isolada: 60% dos casos.",
        classificacao: [
          {
            sistema: "Weber / Danis-Weber (nível da fratura fibular — guia cirúrgico)",
            itens: [
              "Weber A: abaixo da sindesmose (avulsão do maléolo lateral) — ligamento sindesmal intacto, estável",
              "Weber B: no nível da sindesmose (fratura oblíqua fíbula) — sindesmose pode ou não estar lesada",
              "Weber C: acima da sindesmose (fratura alta da fíbula) — sindesmose rota, instável",
            ],
          },
          {
            sistema: "Lauge-Hansen (mecanismo + sequência de lesão)",
            itens: [
              "SA (Supinação-Adução): Estágio 1 — fratura transversa maléolo lateral; Estágio 2 — fratura vertical maléolo medial",
              "SE (Supinação-Eversão): mais comum (40–75%); E1 → ligamento anterior (ATFL); E2 → fratura espiral fíbula (Weber B); E3 → ligamento posterior; E4 → maléolo medial ou deltóide",
              "PI (Pronação-Abdução): P1 → maléolo medial; P2 → ligamentos (ou plafond posterior); P3 → fíbula cominuta acima sindesmose",
              "PE (Pronação-Eversão/Maisonneuve): P1 → maléolo medial; P2 → memb. interóssea; P3 → fratura alta da fíbula (Maisonneuve — RX fíbula completa!); E1–E4 análogo",
            ],
          },
          {
            sistema: "AO/OTA (44-A/B/C)",
            itens: [
              "A: fratura infrassindesmal (= Weber A)",
              "B: transsindesmal (= Weber B)",
              "C: suprassindesmal (= Weber C)",
            ],
          },
        ],
        mecanismo:
          "Entorse com componente de fratura (torção + rotação). Supinação-eversão: pé fixo, corpo roda internamente (mais comum). Pronação-eversão: pé fixo, corpo roda externamente. Carga axial: fratura do pilão tibial (distinto das fraturas maleolares).",
        tx_nao_cirurgico: [
          "Weber A isolada, não deslocada — bota de marcha 4–6 semanas",
          "Weber B com maléolo lateral não deslocado E tornozelo estável ao stress (articulação centrada) — bota de gesso ou marcha 6 semanas",
          "Teste de stress: squeeze test (compressão fíbula-tíbia), cotton test, stress em eversão sob fluoroscopia",
          "Maléolo medial avulsão pequena (<25% articular) — sem instabilidade → conservador",
        ],
        tx_cirurgico: [
          "Weber B com instabilidade da sindesmose (teste stress positivo) ou maléolo medial deslocado",
          "Weber C: sempre cirúrgico (sindesmose rota + instabilidade)",
          "Deslocamento do maléolo medial >2 mm",
          "Bimaleolar e trimaleolar deslocadas",
          "Maléolo posterior (plafond posterior) >25% da articulação ou deslocado >2 mm",
          "Fratura de Maisonneuve com maléolo medial ou instabilidade sindesmal",
        ],
        cirurgias: [
          "Placa lateral (1/3 tubular ou DCP 3,5 mm) + parafusos — fratura de fíbula Weber B/C",
          "Fios K + cerclagem (fíbula osteoporótica, Weber A avulsão)",
          "Parafuso de cortical ou âncoras — fixação do maléolo medial",
          "Parafuso sindesmal (ou TightRope/sutura-button) — fixação da sindesmose em Weber C",
          "Placa de maléolo posterior ou parafusos AP/PA — maléolo posterior >25% ou deslocado",
          "Placa posterior antideslizamento (de-Graaf) — fratura espiral fíbula Weber B",
        ],
        complicacoes: [
          "Artrose tibiotalar: proporcional ao deslocamento residual e lesão cartilagem",
          "Mau posicionamento da fíbula (encurtamento, rotação) — causa artrose tardia",
          "Instabilidade sindesmal crônica (parafuso sindesmal não removido ou removido precocemente)",
          "Síndrome compartimental (pé e tornozelo — alta energia)",
          "Lesão do nervo safeno (maléolo medial — parestesia medial do pé)",
          "Lesão do nervo sural (abordagem lateral)",
          "Problemas de implante (proeminência — 1/3 tubular tem alta taxa de remoção)",
          "Rigidez da articulação subtalar (imobilização prolongada)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "calcaneo",
        titulo: "Fratura do Calcâneo",
        subtitulo: "Rockwood & Green cap. 59 · Campbell cap. 90",
        epidemiologia:
          "Fratura tarsal mais frequente (60% dos ossos do tarso). Incidência: ~11,5 por 100.000/ano. Predominância masculina marcante (75–80%). Pico: 30–40 anos. 10% bilaterais. Associação com fraturas da coluna lombar (10%), fraturas do rádio distal e do tornozelo (alta queda).",
        classificacao: [
          {
            sistema: "Essex-Lopresti (padrão de fratura primária)",
            itens: [
              "Língua (tongue-type): trajetória da fratura sai da tuberosidade posteriormente (RX lateral)",
              "Afundamento do tálamo (joint depression type): fragmento articular posterior afunda",
            ],
          },
          {
            sistema: "Sanders (TC — cortes coronais — guia cirúrgico)",
            itens: [
              "Tipo I: não deslocada (qualquer padrão) — conservador",
              "Tipo II: 2 fragmentos na faceta posterior (IIA, IIB, IIC por localização)",
              "Tipo III: 3 fragmentos na faceta posterior (IIIAB, IIIAC, IIIBC)",
              "Tipo IV: 4+ fragmentos (cominutiva) — prognóstico ruim; artrodese primária considerada",
            ],
          },
        ],
        mecanismo:
          "Queda de altura (principal — impacto axial sobre o calcanhar). Acidente veicular. A linha primária de fratura divide o calcâneo através da faceta articular posterior do subtalar — transmitida pelo tálus. A partir daí, pode surgir linha secundária em 'língua' ou 'afundamento tálamo'.",
        tx_nao_cirurgico: [
          "Sanders I (não deslocada): imobilização sem carga 4–6 semanas + gelo + elevação",
          "Sanders IV: alguns centros optam por conservador em idosos com baixa demanda (artrodese precoce se dor persistente)",
          "Pacientes com diabetes, doença vascular periférica ou tabagistas intensos (alto risco necrose de pele)",
          "Fratura extra-articular (tuberosidade posterior, sustentáculo tali) — geralmente conservador",
        ],
        tx_cirurgico: [
          "Sanders II–III em pacientes ativos com boa condição vascular e sem diabetes",
          "Esperar 10–21 dias até resolução do edema (aparecer 'wrinkle sign' — rugas na pele lateral)",
          "Língua tipo com deslocamento da tuberosidade posterior (ameaça à pele)",
        ],
        cirurgias: [
          "RAFI extensile lateral approach (abordagem extensile lateral em L) + placa de calcâneo — Sanders II–III",
          "RAFI percutânea com parafusos — língua tipo, acesso minimamente invasivo (menor complicação de pele)",
          "Artrodese subtalar primária — Sanders IV, pé plano valgo grave, cominuição irrecuperável",
          "Artrodese subtalar tardia — artrose pós-traumática sintomática (20–40% das RAFI)",
        ],
        complicacoes: [
          "Deiscência de ferida / necrose de pele (principal complicação — até 25% na abordagem extensile não selecionada)",
          "Infecção profunda / osteomielite — devastadora, exige retirada do implante",
          "Artrose subtalar pós-traumática (30–40%) — artrodese subtalar tardia",
          "Síndrome do nervo sural (parestesia lateral do pé — compressão ou lesão na abordagem)",
          "Tendinite / ruptura do FHL (sustentáculo tali fraturado)",
          "Síndrome compartimental do pé (alta pressão de compartimento — fasciotomia urgente)",
          "Discrepância de altura do calcanhar (perda de Böhler) → dificuldade de calçado",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "talus",
        titulo: "Fratura do Tálus",
        subtitulo: "Rockwood & Green cap. 60 · Campbell cap. 91",
        epidemiologia:
          "Rara — 3–6% das fraturas do pé. Colo do tálus: 50% das fraturas talianas. Incidência: ~1,7 por 100.000/ano. Predominância masculina (3:1). Mecanismo clássico: acidente automobilístico e quedas. Alta taxa de complicações (NAO, artrose).",
        classificacao: [
          {
            sistema: "Hawkins (colo do tálus) — preditor de NAO",
            itens: [
              "Tipo I: não deslocada (colo) — NAO 0–15%",
              "Tipo II: deslocada com subluxação / luxação subtalar — NAO 20–50%",
              "Tipo III: deslocada com luxação subtalar + tibiotalar — NAO 20–100%",
              "Tipo IV (adicionado por Canale & Kelly): + luxação da articulação talonavicular — NAO ~70–100%",
            ],
          },
          {
            sistema: "Sinal de Hawkins (RX AP 6–8 semanas pós-trauma)",
            itens: [
              "Positivo: halo radiolucente no subcondral cúpula do tálus → vascularização presente → baixo risco NAO",
              "Negativo: ausência do halo → alta suspeita de NAO → confirmar com RNM",
            ],
          },
        ],
        mecanismo:
          "Hiperdorsiflexão violenta do tornozelo (pé em dorsiflexão + impacto axial) — clássico: pedal de freio no acidente (aviation fracture). Queda de altura. A artéria do colo do tálus (ramo da artéria tibial posterior) é comprometida pelo deslocamento — principal causa de NAO.",
        tx_nao_cirurgico: [
          "Hawkins I sem deslocamento (<2 mm): imobilização gessada sem carga 6–8 semanas",
          "Monitorar sinal de Hawkins em 6–8 semanas",
        ],
        tx_cirurgico: [
          "Hawkins II–IV: cirurgia emergente ou urgente (redução do deslocamento para recuperar vascularização)",
          "Tempo de isquemia é crítico — reduzir o mais rapidamente possível",
          "Fraturas do corpo do tálus deslocadas",
          "Fraturas do processo lateral (snowboarder's fracture) deslocadas",
        ],
        cirurgias: [
          "RAFI com 2 parafusos de 3,5–4,5 mm anterógrados (medial → lateral) ou retrógrados — Hawkins II–III",
          "Abordagem dupla (anteromedial + anterolateral) para visualização completa do colo",
          "Artrodese tibiotalar e/ou subtalar primária — Hawkins III/IV com NAO estabelecida, corpo irrecuperável",
          "Prótese de tálus (personalizada, 3D) — opção emergente para falha de reconstrução",
        ],
        complicacoes: [
          "Necrose avascular: Hawkins I ~0–15%, II ~25–50%, III ~50–100% — complicação mais devastadora",
          "Artrose tibiotalar e subtalar (proporcional à lesão articular e NAO)",
          "Malunião em varo (colo malunido → artrite subtalar lateral)",
          "Síndrome compartimental do pé (alta energia)",
          "Lesão do nervo tibial posterior",
          "Infecção (osteonecrose + infecção = amputação inevitável em muitos casos)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
    ],
  },
  {
    id: "coluna-pelve",
    label: "Coluna e Pelve",
    topicos: [
      {
        id: "coluna-cervical",
        titulo: "Fraturas da Coluna Cervical",
        subtitulo: "Rockwood & Green cap. 42 · Campbell cap. 38",
        epidemiologia:
          "A coluna cervical responde por ~55% das lesões raquimedulares. Pico em jovens (15–29 anos, alta energia) e idosos (>65 anos, baixa energia — quedas com estenose subjacente). C5-C6 mais acometida. Lesão neurológica em ~40% das fraturas cervicais instáveis.",
        classificacao: [
          {
            sistema: "Fraturas específicas por nível",
            itens: [
              "C1 (Jefferson): burst da atlas — 4 fragmentos do anel. Regra de Spence: >7 mm de deslocamento lateral conjunto → ligamento transverso rompido → instável",
              "C2 Odontóide (Anderson & D'Alonzo): Tipo I avulsão ponta (estável); Tipo II colo (instável, NAO ~20–60%); Tipo III base (conservador geralmente)",
              "C2 Hangman (espondilólise traumática): Effendi I (estável), II (angulação >11°), IIa, III (luxação)",
              "C3–C7 burst: AO Magerl A3/A4; frequentemente com lesão ligamentar posterior",
              "Fratura-luxação (teardrop, facet dislocation): AO Magerl C — alto risco lesão medular",
            ],
          },
          {
            sistema: "AOSpine Cervical (C1–C7)",
            itens: [
              "A: compressão / burst sem lesão ligamentar posterior",
              "B: tensão / distração (lesão ligamentar posterior ou anterior)",
              "C: translação / rotação — mais instável",
              "N0–N4: escores neurológicos (N0 intacto → N4 completo)",
              "M: modificadores (disco, estenose, osteoporose)",
            ],
          },
          {
            sistema: "NEXUS / Canadian C-Spine Rule — triagem clínica",
            itens: [
              "NEXUS: 5 critérios — sem dor na linha média, sem déficit neurológico focal, alerta, sem intoxicação, sem lesão distraidora → sem RX",
              "Canadian C-Spine Rule: alto risco (mecanismo perigoso, parestesias, >65 anos) → TC obrigatória",
            ],
          },
        ],
        mecanismo:
          "Flexão (teardrop C4–C7, luxação de facetas). Extensão (hangman, fratura do arco posterior C1). Compressão axial (Jefferson, burst). Flexão-rotação (luxação unilateral de faceta). Baixa energia em idosos: hiperextensão com estenose → síndrome do cone ou contusão central.",
        tx_nao_cirurgico: [
          "C1 Jefferson estável (Spence <7 mm): colar rígido 8–12 semanas",
          "Odontóide Tipo I e III: colar Philadelphia ou halo-vest 8–12 semanas",
          "Hangman Tipo I (Effendi I): colar rígido 8–12 semanas",
          "AO Magerl A1/A2: colar rígido ou colete de extensão",
          "Halo-vest: imobilização definitiva em casos selecionados (Tipo II odontóide em jovens)",
        ],
        tx_cirurgico: [
          "Odontóide Tipo II: instável / deslocamento >5 mm / idoso (pseudartrose alta)",
          "Hangman Tipo II / IIa / III",
          "AO Magerl B e C (lesão ligamentar posterior ou translação)",
          "Luxação de facetas com lesão medular (emergência — redução imediata)",
          "Déficit neurológico progressivo ou incompleto com compressão cirúrgica",
        ],
        cirurgias: [
          "Fusão C1-C2 (técnica de Harms: parafusos de masas laterais + parafusos pediculares C2) — Jefferson instável, Odontóide",
          "Parafuso odontóideo anterior (fratura Tipo II com boa geometria) — preserva rotação C1-C2",
          "Fusão posterior com parafusos de masas laterais ou pediculares C3–C7",
          "Discectomia + fusão anterior (ACDF) + placa — fraturas com herniação discal traumática anterior",
          "Corpectomia + fusão (burst anterior com compressão medular)",
        ],
        complicacoes: [
          "Lesão medular (tetraplegia completa ou incompleta — incurável se axonotmese)",
          "Pseudartrose (Odontóide Tipo II em idosos: até 60% com conservador)",
          "Instabilidade crônica C1-C2 (ligamento transverso rompido não reconstruído)",
          "Disfagia e voz rouca (abordagem anterior — lesão do nervo laríngeo recorrente)",
          "Lesão da artéria vertebral (parafusos transarticulares C1-C2 de Magerl — 4%)",
          "Lesão do nervo C2 (raiz dorsal grande — dor / parestesia occipital)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "coluna-toracolombar",
        titulo: "Fraturas Toracolombares",
        subtitulo: "Rockwood & Green cap. 43–44 · Campbell cap. 39",
        epidemiologia:
          "Região toracolombar (T10–L2) mais vulnerável: transição entre cifose rígida e lordose móvel. ~50% das lesões raquimedulares. Pico: homens 15–29 anos (alta energia) e >65 anos (osteoporose). Fraturas osteoporóticas torácicas: epidemia crescente.",
        classificacao: [
          {
            sistema: "AO Magerl (histórica — base para sistemas modernos)",
            itens: [
              "A: compressão (A1 impactação, A2 clivagem, A3 burst)",
              "B: distração (B1 ligamentar posterior, B2 óssea posterior, B3 discal anterior)",
              "C: translação/rotação (mais grave — C1, C2, C3)",
            ],
          },
          {
            sistema: "TLICS (Thoracolumbar Injury Classification and Severity Score)",
            itens: [
              "Morfologia: compressão=1, burst=2, translação/rotação=3, distração=4",
              "Integridade ligamentar posterior (PLC): intacta=0, suspeita/indeterminada=2, rota=3",
              "Status neurológico: intacto=0, raiz nervosa=2, medula/cone incompleto=3, completo=2, cauda equina=3",
              "→ Escore ≤3: conservador | =4: borderline | ≥5: cirurgia",
            ],
          },
          {
            sistema: "AOSpine Toracolombar (2013 — mais moderna)",
            itens: [
              "A0: fraturas sem significância (proc. espinhoso, transverso)",
              "A1: impactação/compressão (wedge) — 1 platô",
              "A2: clivagem sagital / coronal — 2 platôs",
              "A3: burst incompleto (1 platô)",
              "A4: burst completo (2 platôs)",
              "B1: avulsão óssea posterior (Chance óssea)",
              "B2: lesão ligamentar posterior (distração)",
              "B3: hiperextensão com lesão anterior",
              "C: translação/deslocamento (qualquer plano)",
            ],
          },
          {
            sistema: "Fratura de Chance",
            itens: [
              "Fratura horizontal passando por toda a vértebra (cinto de segurança)",
              "Lesão em distração: pós. → anterior",
              "Associação com lesão abdominal em 40–65% (cólon, mesentério)",
            ],
          },
        ],
        mecanismo:
          "Flexão-compressão (acidente veicular, queda) → fraturas A. Distração (cinto de segurança) → Chance. Flexão-rotação (alta energia) → tipo C. Compressão axial (queda em pé) → burst. Hiperextensão (idosos, DISH/espondilite) → tipo B3.",
        tx_nao_cirurgico: [
          "TLICS ≤3 pontos: tratamento conservador (AO A1/A2 sem déficit neurológico, PLC intacta)",
          "Órtese toracolombar (TLSO/Boston) por 8–12 semanas",
          "Fraturas por fragilidade A1/A2 sem déficit: órtese + deambulação precoce + bifosfonato",
          "Vertebroplastia / cifoplastia — fraturas osteoporóticas dolorosas A1 sem déficit neurológico",
        ],
        tx_cirurgico: [
          "TLICS ≥5: cirurgia (burst A3/A4 com déficit neurológico, B com PLC rota, qualquer tipo C)",
          "Déficit neurológico progressivo ou incompleto com compressão",
          "Fratura de Chance óssea pode ser conservador; ligamentar = cirurgia",
          "Cifose >30° progressiva, deformidade irredutível",
        ],
        cirurgias: [
          "Fusão posterior curta (2 acima + 2 abaixo) com parafusos pediculares + barras — burst estável com déficit leve",
          "Fusão posterior longa + descompressão (laminectomia / laminotomia lateral) — déficit significativo",
          "Corpectomia anterior (abordagem retroperitoneal / toracoscópica) + cage + placa — compressão anterior grave",
          "360° (posterior + anterior) — Tipo C, instabilidade grave, burst com PLC rota",
          "Cifoplastia com balão — fraturas A1 osteoporóticas dolorosas (restaura altura corporal)",
          "Vertebroplastia — A1 osteoporótica sem restauração de altura (controverso)",
        ],
        complicacoes: [
          "Lesão medular / conus / cauda equina (proporcional à lesão inicial — descompressão precoce melhora parcial)",
          "Cifose progressiva (falha de fixação, pseudartrose)",
          "Falha de implante (parafusos pediculares — osteoporose grave)",
          "Síndrome pós-laminectomia (instabilidade iatrogênica)",
          "Lesão vascular retroperitoneal (abordagem anterior)",
          "Embolia gordurosa (múltiplas fraturas vertebrais osteoporóticas)",
          "Dor axial crônica (lesão dos músculos paravertebrais)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "fratura-pelve",
        titulo: "Fratura da Pelve",
        subtitulo: "Rockwood & Green cap. 48 · Campbell cap. 52",
        epidemiologia:
          "Fraturas do anel pélvico instáveis: mortalidade ~8% (APC III/VS). Hemorragia retroperitoneal em 60–80% das instáveis. Lesão uretral em 10–20% (uretra membranosa — homens), vesical em 5–10%. Lesão neural (L4-S3) em 20–40% das Type C.",
        classificacao: [
          {
            sistema: "Young & Burgess (mecanismo)",
            itens: [
              "LC I: fratura ramos ipsilateral (oblíqua) + sacro lateral comprimido — estável",
              "LC II: +crescent fracture (ilíaco) ou impactação posterior — parcialmente instável",
              "LC III: LC + abertura contralateral (wind-swept pelvis) — muito instável",
              "APC I: abertura sínfise <2,5 cm (ligamentos sacroilíacos anteriores intactos) — estável",
              "APC II: abertura >2,5 cm (ligamentos posteriores stretching mas intactos) — rotatoriamente instável",
              "APC III: ruptura de todos os ligamentos (abertura em livro completa) — instável rotacional e vertical",
              "VS (Vertical Shear): fratura vertical anterior + posterior (ruptura completa) — vertical e rotatoriamente instável",
              "CM (Combined Mechanism): combinação de padrões",
            ],
          },
          {
            sistema: "Tile / AO (estabilidade)",
            itens: [
              "A1: fratura sem interrupção do anel (avulsão tuberosidade isquiática, crista ilíaca)",
              "A2: anel levemente deslocado mas estável (ramos púbicos)",
              "A3: fratura sacral transversa (abaixo de S2) — não interrompe anel posterior",
              "B1: abertura em livro / rotatoriamente instável — ligamentos posteriores intactos (= APC II)",
              "B2: compressão lateral — LC II/III",
              "B3: bilateral (B1+B2)",
              "C1: unilateral, rotatória + verticalmente instável (sacro/sacroilíaca/ilíaco)",
              "C2: bilateral (1 B + 1 C)",
              "C3: bilateral tipo C — mais grave",
            ],
          },
          {
            sistema: "Denis (zonas do sacro — prognóstico neurológico)",
            itens: [
              "Zona I: alar (lateral dos forames) — lesão neurológica 6%",
              "Zona II: foraminal — déficit radicular L4-S3 em 28%",
              "Zona III: central (canal sacral) — lesão neurológica em 57%; bexiga, intestino, disfunção sexual",
            ],
          },
        ],
        mecanismo:
          "Alta energia: atropelamento (APC), queda de altura (VS), esmagamento (LC). O padrão depende da direção da força: lateral → compressão (LC), anteroposterior → abertura (APC), vertical → cizalhamento (VS).",
        tx_nao_cirurgico: [
          "Tile A (anel intacto): repouso, analgesia, mobilização progressiva com descarga parcial 6–8 semanas",
          "LC I / APC I: fraturas estáveis — mobilização precoce com supervisão",
        ],
        tx_cirurgico: [
          "APC II/III (abertura em livro instável)",
          "VS e Tile C — vertical e rotatoriamente instáveis",
          "LC II/III com instabilidade posterior sintomática",
          "Hemorragia retroperitoneal maciça → protocolo damage control: lençol pélvico → fixador externo → angioembolização ou packing pré-peritoneal",
        ],
        cirurgias: [
          "Lençol pélvico / cinta pélvica (emergência — compressão circunferencial temporária)",
          "Fixador externo anterior (barras + pinos crista ilíaca ou ramos púbicos) — damage control rápido",
          "Packing pré-peritoneal — hemostasia cirúrgica emergente (alternativa à angioembolização)",
          "Placa de sínfise púbica (reconstrução anterior APC II/III)",
          "Parafusos sacroilíacos percutâneos + parafusos iliosacros — lesão posterior VS/APC III",
          "Placa posterior (sacro/sacroilíaca) — reconstrução definitiva Tile C",
          "Fixação triangular (parafuso sacroilíaco + haste sacral ou placa ilíaco) — lesão Tile C mais complexa",
        ],
        complicacoes: [
          "Hemorragia maciça (principal causa de morte aguda — arterial ou venosa do plexo pélvico)",
          "Lesão uretral membranosa (uretra lesada nos ramos anteriores — cistoscopia/uretrocistografia obrigatórias)",
          "Lesão vesical intraperitoneal (reparo cirúrgico emergente) ou extraperitoneal (cateter foley conservador)",
          "Lesão neural L4-S3 (radiculopatia, incontinência vesico-intestinal, disfunção erétil/ejaculatória)",
          "Discrepância de comprimento de membros, marcha claudicante (instabilidade residual)",
          "Tromboembolismo (colocação de filtro VCI em TVP proximal + anticoagulação quando possível)",
          "Disfunção sexual masculina (lesão nervos pudendos, artérias pudendas internas)",
          "Impotência / infertilidade em jovens (nerve-sparing nem sempre possível)",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
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
            Resumo baseado em Rockwood & Green — Fraturas em Adultos (10ª ed.) e Campbell's Operative Orthopaedics (15ª ed.)
          </p>
        </div>
      </div>

      {/* Aviso */}
      <div
        className="flex gap-2.5 rounded-xl px-3.5 py-2.5 mb-6"
        style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
      >
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200/70 leading-relaxed">
          Conteúdo para fins de estudo e revisão. Não substitui avaliação clínica individualizada nem as obras originais.
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

      {/* Contador */}
      <p className="text-xs text-slate-600 mb-3">{regiao.topicos.length} tópicos</p>

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
      </div>
    </div>
  );
}
