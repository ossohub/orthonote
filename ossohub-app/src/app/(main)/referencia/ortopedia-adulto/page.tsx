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
      {
        id: "diafise-radio-ulna",
        titulo: "Fraturas Diafisárias de Rádio e Ulna",
        subtitulo: "Rockwood & Green cap. 42 · Campbell cap. 57",
        epidemiologia: "1–2% de todas as fraturas; adultos jovens em alta energia; bimodal — esporte/trauma de baixa energia (nightstick) e acidente veicular (ambos os ossos). Predominância masculina. Fratura de Galeazzi = fratura do rádio + luxação do DRUJ (6× mais comum que Monteggia). Fratura de Monteggia = fratura da ulna + luxação da cabeça do rádio (rara em adultos).",
        classificacao: [
          {
            sistema: "Padrão/Epônimos",
            itens: [
              "Nightstick (ulna isolada): golpe direto sobre ulna; diáfise média ou distal",
              "Both-bone (ambos os ossos): AO/OTA 22-A/B/C; alta energia, frequentemente cominutiva",
              "Galeazzi (AO 22-B2): rádio + luxação DRUJ; 'fratura de necessidade' — obrigatoriamente cirúrgica no adulto",
              "Monteggia (AO 21-B): ulna + luxação cabeça do rádio; Bado I (anterior, extensão — 60%), II (posterior), III (lateral), IV (ambos os ossos + luxação)",
            ],
          },
        ],
        mecanismo: "Direto (nightstick — golpe no antebraço com proteção); FOOSH com rotação forçada (both-bone); força de pronação → Galeazzi; força de hiperextensão/pronação → Monteggia.",
        tx_nao_cirurgico: ["Adulto: praticamente nunca indicado para both-bone ou Galeazzi. Exceção: ulna isolada (nightstick) sem deslocamento ou com angulação <10° e desvio <50% da diáfise → gesso braquipalmar 6 semanas, peso precoce. Resultado funcional aceitável apenas nestes casos."],
        tx_cirurgico: ["Toda fratura de both-bone em adulto. Galeazzi (sempre). Monteggia (sempre). Nightstick deslocada/angulada além dos critérios conservadores."],
        cirurgias: [
          "Placa DCP 3.5 mm (dinâmica) ou LCP 3.5 mm: padrão para ambos os ossos — sequência ulna primeiro (restaurar comprimento) depois rádio",
          "Abordagem Henry (anterior) para rádio distal/médio; Thompson (posterior) para rádio proximal",
          "Abordagem ulnar direta (subcutânea) para ulna em toda a extensão",
          "Galeazzi: após fixar o rádio, reduzir DRUJ e verificar estabilidade — se instável → pronação forçada em gesso ou reparo ligamentar (TFCC)",
          "Monteggia: após fixar ulna, luxação da cabeça do rádio geralmente reduz; se não → redução aberta da cabeça",
        ],
        complicacoes: [
          "Sinostose rádio-ulnar (principal — 2–9%): evitar contaminar ambos os compartimentos operatórios, abordar em sessões separadas se necessário",
          "Não-união: risco maior no terço médio da ulna (hipovascular); usar enxerto ósseo se gap",
          "Perda de prono-supinação: meta funcional mínima = 50° em cada direção",
          "Síndrome compartimental: monitorar pós-operatório, especialmente fraturas abertas",
          "Instabilidade do DRUJ residual: indica reparo do TFCC ou reconstrução tardia",
          "Lesão do nervo interósseo posterior (ramo motor do radial): risco na abordagem posterior — monitorar extensão dos dedos",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "fraturas-carpo",
        titulo: "Fraturas e Luxações do Carpo (além do Escafoide)",
        subtitulo: "Rockwood & Green cap. 44 · Campbell cap. 58",
        epidemiologia: "Fraturas do carpo além do escafoide respondem por ~20% de todas as fraturas carpais. Lunato — avascular em 100% → doença de Kienböck; piramidal — 2ª fratura carpal mais comum (avulsão dorsal); capitato — raro, alto risco NAO; hamato — corpo ou gancho (esportes com raquete/bastão). Luxação perilunada: lesão traumática grave, frequentemente subdiagnosticada em 25% das primeiras avaliações.",
        classificacao: [
          {
            sistema: "Kienböck (necrose do lunato)",
            itens: [
              "Estágio I: RNM alterada, RX normal",
              "Estágio II: esclerose no RX sem colapso",
              "Estágio IIIA: colapso sem migração do escafoide",
              "Estágio IIIB: colapso + escafoide em flexão rotacional",
              "Estágio IV: artrose pancarpal",
            ],
          },
          {
            sistema: "Luxação Perilunada (Mayfield)",
            itens: [
              "Estágio I: ruptura do ligamento escafo-capitato (escafoide instável)",
              "Estágio II: luxação perilunada (capitato dorsalmente ao lunato)",
              "Estágio III: ruptura do ligamento triquetro-lunato",
              "Estágio IV: luxação do lunato (lunato volarmente deslocado — risco de síndrome do túnel do carpo aguda)",
            ],
          },
        ],
        mecanismo: "Kienböck: microtraumas repetitivos + variância ulnar negativa (controversa). Fratura do gancho do hamato: empunhadura de taco/raquete (ciclismo, golfe, beisebol). Luxação perilunada: FOOSH com extensão forçada do punho → progressão em arco de Mayfield.",
        tx_nao_cirurgico: ["Avulsão do piramidal: imobilização 4–6 semanas. Kienböck estágio I–II: descarga (controverso). Luxação perilunada: SEMPRE cirúrgico — não há papel para o tratamento conservador definitivo."],
        tx_cirurgico: ["Kienböck III–IV, Kienböck II com variância ulnar negativa. Fratura do gancho do hamato com não-união sintomática. Toda luxação perilunada."],
        cirurgias: [
          "Kienböck estágio II–IIIA: nivelamento ulnar (osteotomia de encurtamento) ou descompressão radial (osteotomia de encurtamento do rádio) — reduz forças sobre o lunato",
          "Kienböck IIIB: fusão escafo-capitato (4 cantos) + excisão do lunato ou prótese de lunato",
          "Kienböck IV: fusão total do carpo ou artrodese 4 cantos paliativa",
          "Gancho do hamato: excisão do gancho (primeira linha para atletas — resultados superiores à RAFI na maioria)",
          "Luxação perilunada: redução + RAFI via abordagem dorsal e volar (fios K + parafusos para ligamentos escafolunato e lunotriquetral); urgência cirúrgica se lunato deslocado (compressão mediana)",
        ],
        complicacoes: [
          "Doença de Kienböck: progressão para colapso carpal e artrose mesmo com tratamento",
          "Síndrome do túnel do carpo aguda: luxação do lunato → urgência cirúrgica",
          "Instabilidade dissociativa escafolunato (DISI) residual após luxação perilunada: causa artrose SLAC",
          "Não-união do gancho do hamato: tendinite/ruptura dos tendões flexores dos 4° e 5° dedos",
          "Artrose pancarpal: sequela tardia das luxações perilunonas tratadas tardiamente",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "mao-adulto",
        titulo: "Fraturas e Luxações da Mão",
        subtitulo: "Rockwood & Green cap. 45 · Campbell cap. 59",
        epidemiologia: "10–40% de todas as fraturas; lesão ortopédica mais frequente em pronto-socorro após o rádio distal. Fratura do colo do 5° metacarpo (Boxer's fracture): mais comum isolada. Bennett e Rolando: 1° metacarpo (polegar) — alta demanda funcional. Lesão de Stener (UCL polegar): frequente em esquiadores. Fraturas de falange: 50% das fraturas da mão.",
        classificacao: [
          {
            sistema: "Metacarpos",
            itens: [
              "Boxer's fracture: colo do 5° (ou 4°) metacarpo — queda do punho fechado; cominuição volar",
              "Bennett (AO 2-B1): fratura-luxação da base do 1° metacarpo — fragmento volar fixo pelo ligamento anterior oblíquo, restante do metacarpo subluxado radialmente pelo APL",
              "Rolando (AO 2-C): fratura cominutiva da base do 1° metacarpo — pior prognóstico",
              "Fratura diafisária: transversa (estável) vs oblíqua/espiral (tendência ao encurtamento e rotação)",
            ],
          },
          {
            sistema: "Falanges",
            itens: [
              "Falange proximal: espiral/oblíqua (rotação oculta), colo/cabeça (intra-articular)",
              "Falange média: fratura-luxação da interfalangiana proximal (IFP) — avulsão volar (placa volar) ou lateral (colateral)",
              "Lesão de Stener: ruptura + interposição do UCL do polegar pelo adutor do polegar — palpação do 'nódulo' dorsal",
              "Fratura da falange distal: crush injury, lesão subungueal (drenar hematoma)",
            ],
          },
        ],
        mecanismo: "Impacto direto sobre o dorso da mão (Boxer's); queda com polegar em abdução (esquiador — Stener/UCL); torção (espiral de falange — rotação clinicamente identificada); esmagamento (falange distal).",
        tx_nao_cirurgico: ["Boxer's: aceitável até 40° de angulação volar no 5° metacarpo, 30° no 4° (sem deformidade rotacional clínica); buddy taping + mobilização precoce. Bennett sem deslocamento: gesso espica do polegar. Falanges não deslocadas e sem rotação: tala e buddy taping. Lesão de UCL sem Stener: tala 4–6 semanas."],
        tx_cirurgico: ["Qualquer rotação de metacarpo/falange (exame clínico — polpas dos dedos devem apontar ao escafoide quando fletidos). Bennett deslocada (>3 mm). Rolando cominutiva. Fratura intra-articular de IFP com degrau >1 mm. Lesão de Stener (UCL polegar com interposição). Fratura aberta."],
        cirurgias: [
          "Fios de Kirschner percutâneos: Boxer's deslocada, Bennett (1 fio transfixando a base ao trapézio + 1 fio fixando o 1° ao 2° metacarpo), falanges simples",
          "Parafuso de Herbert mini (1.5–2.0 mm): fratura espiral/oblíqua de falange (técnica lag para compressão)",
          "Placa mini-condiliana ou placa em L (1.5–2.0 mm): fratura de falange cominutiva, instável",
          "Rolando: RAFI com múltiplos fios K se fragmentos grandes; gesso se cominuição extrema",
          "Reparo do UCL do polegar: sutura direta (aguda <6 semanas) ou reconstrução com enxerto (crônico)",
          "Mini-âncora óssea: avulsão volar da IFP (placa volar óssea)",
        ],
        complicacoes: [
          "Rigidez (principal): imobilização prolongada causa aderências dos tendões extensores — meta é mobilização ativa em <3 semanas",
          "Deformidade rotacional: funcional mais importante — sobreposto de dedos ao flexionar",
          "Não união: rara nas falanges com boa fixação; mais comum na base do 5° metacarpo",
          "Ruptura de tendão extensor/flexor: complicação de prótese de IFP ou placa mal posicionada",
          "Artrose da IFP/IFD: sequela de fraturas intra-articulares — limitação da flexão",
          "Síndrome do nódulo de Stener crônica: instabilidade residual do polegar se não operado",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "instabilidade-glenoumeral",
        titulo: "Instabilidade Glenoumeral",
        subtitulo: "Cap 35 — Glenohumeral Instability",
        epidemiologia: "Incidência de 0,08/1.000 pessoas-ano; pico bimodal em jovens ativos (15–30 anos) e >60 anos. 95% dos casos são anteriores (traumáticos); instabilidade posterior representa 2–5%; MDI (multidirecional) associada a frouxidão ligamentar generalizada. Atletas de contato têm risco 5× maior de recorrência com tratamento conservador.",
        classificacao: [
          {
            sistema: "Por Direção",
            itens: [
              "Anterior (95%): mais comum; mecanismo ABER + força posterior",
              "Posterior (2–5%): convulsão, choque elétrico, trauma de ombro em flexão/adução/RI",
              "Multidirecional (MDI): instabilidade em ≥2 direções sem episódio traumático definido",
            ],
          },
          {
            sistema: "Por Etiologia (TUBS vs AMBRI)",
            itens: [
              "TUBS: Traumatic, Unidirectional, Bankart lesion, Surgery → tratamento cirúrgico",
              "AMBRI: Atraumatic, Multidirectional, Bilateral, Rehabilitation, Inferior capsule shift",
            ],
          },
          {
            sistema: "Por Lesões Associadas",
            itens: [
              "Bankart ósseo: avulsão da âncora anterior do labrum com fragmento ósseo",
              "Hill-Sachs: impactação posterolateral da cabeça umeral na borda glenoidal anterior",
              "Lesão bipolar (engaging Hill-Sachs + bone loss glenóide >20–25%): indicação de Latarjet",
            ],
          },
        ],
        mecanismo: "Anterior: queda com mão em extensão ou contato com ABER (adução-extensão-rotação externa) → ruptura ou avulsão do labrum anteroinferior (Bankart). Posterior: carga axial sobre ombro em flexão/adução/RI (convulsão, choque, queda sobre mão). MDI: frouxidão ligamentar generalizada sem evento traumático único.",
        tx_cirurgico: [
          "≥2 episódios de luxação em atleta jovem ou ativo",
          "Atleta de contato ou arremessador após 1° episódio (risco de recorrência >80%)",
          "Bone loss glenoidal >20–25% (critério de Latarjet): instabilidade engajante",
          "Falha de reabilitação conservadora por 3–6 meses",
          "Bankart ósseo com fragmento >25% da glenoide",
        ],
        tx_nao_cirurgico: [
          "1° episódio sem bone loss significativo em adulto não-atleta: imobilização 3–6 semanas",
          "MDI: reabilitação intensiva de 6 meses (periscapular + manguito) — resolução em 80%",
          "Posterior assintomática ou pós-convulsiva: fisioterapia antes de indicação cirúrgica",
          "Idosos com 1° episódio: conservador (alta incidência de ruptura do manguito associada — avaliar US/RNM)",
        ],
        cirurgias: [
          "Bankart artroscópico (âncoras): padrão-ouro sem bone loss; taxa de recorrência 15–25% em atletas",
          "Latarjet (transferência do processo coracoide): bone loss >20% ou falha do Bankart; recorrência <2–5%",
          "Capsuloplastia posterior artroscópica: instabilidade posterior; reconstrução do labrum posterior",
          "Shift capsular inferior (cirurgia aberta de Neer): MDI refratária a fisioterapia",
          "Eden-Hybinette (enxerto ósseo glenoidal): alternativa ao Latarjet sem disponibilidade do coracoide",
        ],
        complicacoes: [
          "Recorrência: Bankart artroscópico 15–25% em atletas de contato vs Latarjet <5%",
          "Lesão nervo axilar: instabilidade aguda (5–35%) — avaliar sempre força e sensibilidade do deltoide",
          "Artrose glenoumeral: sequela tardia de instabilidade recorrente ou Latarjet mal posicionado",
          "Falha do Latarjet: não-união do coracoide, reabsorção, lesão do nervo musculocutâneo (2%)",
          "Rigidez (Bankart aberto): abertura excessiva da subsescapular → limitação de rotação externa",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "diafise-umeral",
        titulo: "Fratura da Diáfise Umeral",
        subtitulo: "Cap 37 — Humeral Shaft Fractures",
        epidemiologia: "1–2% de todas as fraturas; 13–14% das fraturas umerais. Distribuição bimodal: jovens adultos (trauma de alta energia — AVCs, esportes, quedas de altura) e idosos >60 anos (queda de baixa energia, osso osteoporótico). Lesão do nervo radial em 11–18% (mais comum nas fraturas do 1/3 médio-distal — Holstein-Lewis).",
        classificacao: [
          {
            sistema: "AO/OTA",
            itens: [
              "12-A (Simples): A1 espiral, A2 oblíqua, A3 transversa",
              "12-B (Cunha/Wedge): B1 cunha espiral, B2 cunha dobrada, B3 cunha fragmentada",
              "12-C (Cominutiva/Complexa): C1 espiral, C2 segmentada, C3 irregular",
            ],
          },
          {
            sistema: "Localização",
            itens: [
              "1/3 proximal: associação com fratura-luxação do ombro",
              "1/3 médio: Holstein-Lewis (espiral distal) — lesão nervo radial em sulco espiral",
              "1/3 distal: risco de extensão articular para o cotovelo",
            ],
          },
        ],
        mecanismo: "Direto: trauma direto sobre o braço (taco, projétil) — fratura transversa ou cominutiva. Indireto: torção (arremesso, queda sobre mão) — fratura espiral. Queda de baixa energia em idosos osteoporóticos — avaliar fratura patológica (metástases, mieloma).",
        tx_cirurgico: [
          "Lesão neurovascular associada (radial, braquial)",
          "Fratura aberta (Gustilo II, III)",
          "Fratura bilateral de úmero ou politrauma com necessidade de carga precoce",
          "Cotovelo flutuante (floating elbow) — fratura ipsilateral úmero + antebraço",
          "Falha conservadora: angulação >30° sagital ou >20° coronal, shortening >3 cm após 6–8 semanas",
          "Não-união sintomática aos 3 meses",
        ],
        tx_nao_cirurgico: [
          "90–95% das fraturas fechadas diafisárias → resultado excelente com brace de Sarmiento",
          "Protocolo: tala coaptação aguda → brace funcional (Sarmiento) em 7–14 dias → mobilização ativa do ombro e cotovelo",
          "Aceitar: angulação até 20° frontal, 30° sagital, rotação até 15°, shortening até 3 cm",
          "Paresia radial não é indicação cirúrgica de urgência: observar 3 meses (recuperação espontânea em 70–80%)",
        ],
        cirurgias: [
          "Haste intramedular anterógrada: início no supra-espinhal; indicada em múltiplos traumatismos",
          "Haste intramedular retrógrada: fratura distal, cotovelo flutuante; evita lesão de manguito",
          "Placa de compressão (ORIF): padrão-ouro para exploração do nervo radial, fratura articular, não-união",
          "Fixação externa: contaminação grave, lesão vascular associada — provisório",
        ],
        complicacoes: [
          "Lesão nervo radial (11–18%): Holstein-Lewis → recuperação espontânea em 70–80% em 3 meses",
          "Não-união (5–10%): mais comum nas fraturas transversas do 1/3 médio e após rádio transverso",
          "Rigidez do ombro: complicação do haste anterógrado (lesão do manguito); fisioterapia imediata",
          "Falha do implante/re-fratura: após retirada prematura do haste",
          "Fratura patológica não reconhecida: metástase ou mieloma — biópsia antes de fixação definitiva",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "periprotetica-ms",
        titulo: "Fratura Periprotética do Membro Superior",
        subtitulo: "Cap 38 — Periprosthetic Fractures of the Upper Extremity",
        epidemiologia: "Incidência crescente com o aumento de artroplastias de ombro (TSA e RSA); ~1–3% por implante. Maioria em idosas osteoporóticas após queda de baixa energia. Fraturas periprotéticas escapulares ocorrem em ~1% das RSA (reações de entalhe e fadiga da acrômio/espinha).",
        classificacao: [
          {
            sistema: "Wright-Cofield (Periprotética Umeral)",
            itens: [
              "Tipo A: ao redor do colar do implante (região metafisária proximal)",
              "Tipo B: ao redor da ponta (diáfise; extensão mais comum) — B1 implante estável, B2 implante solto",
              "Tipo C: distal à ponta do implante (tratado como fratura diafisária convencional)",
            ],
          },
          {
            sistema: "Periprotética Escapular (RSA)",
            itens: [
              "Tipo I: fratura do acrômio (espinha ou acrômio anterior)",
              "Tipo II: fratura da glenoide ou coluna escapular",
              "Tipo III: fratura do processo coracoide",
            ],
          },
        ],
        mecanismo: "Queda de baixa energia sobre mão ou cotovelo → transmissão de carga ao úmero enfraquecido ao redor do implante. Enfraquecimento cortical pelo stress-shielding ao redor do cabo. Fraturas escapulares em RSA: microfratura por fadiga da espinha.",
        tx_cirurgico: [
          "Wright-Cofield B2 (deslocada + implante solto): revisão do implante obrigatória",
          "Wright-Cofield B1 deslocada com instabilidade: ORIF com placa de contorno",
          "Tipo C deslocada: ORIF como fratura diafisária convencional",
          "Fratura de acrômio (RSA) com fragmento grande e deslocado: ORIF",
        ],
        tx_nao_cirurgico: [
          "Wright-Cofield A não deslocada: sling + mobilização precoce; risco mínimo de deslocamento",
          "Wright-Cofield B1 não deslocada (implante estável): brace funcional — acompanhamento semanal com Rx",
          "Wright-Cofield C não deslocada: brace de Sarmiento → mobilização ativa em 6–8 semanas",
          "Fratura de acrômio leve (RSA): sling 6 semanas; evitar carga do ombro",
          "Taxa de não-união no tipo B conservador: ~50% — acompanhamento rigoroso",
        ],
        cirurgias: [
          "ORIF com placa de contorno (DCP ou bloqueada): Wright-Cofield B1 deslocada com implante estável",
          "Revisão para RSA (ombro reverso): implante solto + osso ruim; melhor biologia e estabilidade",
          "Revisão para hemiarthroplasty: casos selecionados com stock ósseo preservado",
          "Fixação percutânea (fios K): avulsões de tubérculo menor não deslocadas",
          "Culturas intraoperatórias: incubar 2 semanas (Cutibacterium acnes — organismo lento de crescimento)",
        ],
        complicacoes: [
          "Não-união (50% tipo B conservador): fixação cirúrgica ou revisão em candidatos operatórios",
          "Infecção por Cutibacterium acnes: apresentação indolente; ESR/PCR pouco sensíveis no ombro",
          "Lesão do nervo axilar: neuropraxia aguda comum — avaliar EMG pré-revisão para RSA (deltóide funcional?)",
          "Rigidez pós-cirúrgica: principal limitação funcional; fisioterapia precoce obrigatória",
          "Falha do implante: revisão para implante de haste longa com aloenxerto cortical",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "luxacao-cotovelo",
        titulo: "Luxação do Cotovelo e Terrible Triad",
        subtitulo: "Cap 40 — Elbow Dislocations and Terrible Triad Injuries",
        epidemiologia: "Segunda luxação mais frequente em adultos (após ombro); incidência ~6/100.000/ano. Pico em jovens adultos (15–35 anos). Luxação simples (sem fratura) em 50% dos casos. Terrible Triad (luxação + fratura cabeça rádio + fratura coronoide) representa a forma mais instável.",
        classificacao: [
          {
            sistema: "Por Complexidade",
            itens: [
              "Simples: sem fratura associada — bom prognóstico com tratamento conservador",
              "Complexa: com fratura associada (cabeça rádio, coronoide, epicôndilo)",
              "Terrible Triad: luxação + fratura cabeça rádio + fratura coronoide → instabilidade grave",
            ],
          },
          {
            sistema: "Por Direção",
            itens: [
              "Posterior/posterolateral (90%): queda sobre mão com cotovelo em extensão",
              "Anterior (<2%): trauma direto posterior; associada a fraturas do olécrano",
              "Medial/lateral: raras; associadas a lesões ligamentares graves",
            ],
          },
          {
            sistema: "Coronoide (Regan-Morrey)",
            itens: [
              "Tipo I: avulsão da ponta do coronoide",
              "Tipo II: fragmento ≤50% da altura do coronoide",
              "Tipo III: fragmento >50% do coronoide (instabilidade grave — fixação obrigatória)",
            ],
          },
        ],
        mecanismo: "Queda sobre mão em extensão → valgização + supinação do antebraço → avulsão progressiva do LCL lateral → instabilidade posterolateral rotacional (PLRI). Terrible Triad: mecanismo de alta energia com progressão lateral→posterior da lesão ligamentar.",
        tx_cirurgico: [
          "Terrible Triad: reparo obrigatório de todos os componentes (cabeça rádio + coronoide + LCL)",
          "Luxação complexa com instabilidade pós-redução (>30° de arco instável)",
          "Coronoide tipo III (Regan-Morrey): fixação com parafuso anterior ou sutura",
          "Luxação irredutível (interposição muscular ou óssea)",
          "Luxação aberta",
        ],
        tx_nao_cirurgico: [
          "Luxação simples: redução fechada sob sedação ou bloqueio + imobilização 7–14 dias",
          "Mobilização ativa precoce (<3 semanas de imobilização): fundamental para evitar rigidez",
          "Evitar imobilização >3 semanas: associada a rigidez e piores resultados funcionais",
          "Protocolo ativo: cotovelo ao lado do corpo, antebraço pronado (estabiliza PLRI dinamicamente)",
        ],
        cirurgias: [
          "ORIF da cabeça do rádio (Mason II/III): parafusos de compressão 2.0 mm ou placa",
          "Substituição da cabeça do rádio (prótese metálica): cominução irreconstruível — preserva valgo",
          "ORIF do coronoide: parafuso anterior ou sutura trans-óssea (tipo I/II) ou placa (tipo III)",
          "Reparo/reconstrução do LCL lateral: âncoras ou fio trans-ósseo sobre epicôndilo lateral",
          "Articulador articulado externo: instabilidade grave irreconstruível — permite mobilização protegida",
        ],
        complicacoes: [
          "Rigidez (55–60%): principal sequela — flexão <130° e/ou falta de extensão >30° em >50% dos casos simples",
          "Artrose pós-traumática: sequela tardia de cartilagem danificada + incongruência articular",
          "Instabilidade posterolateral recorrente (PLRI): falha do LCL não reparado",
          "Lesão do nervo ulnar: 10–15% nas luxações medianas ou com valgização",
          "Ossificação heterotópica: alta energia + retardo de mobilização → limitação grave de arco",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "olecranon",
        titulo: "Fraturas do Olécrano e Cabeça do Rádio",
        subtitulo: "Cap 41 — Fractures of the Proximal Forearm (Olecranon, Proximal Radius)",
        epidemiologia: "Fraturas do olécrano: adultos de todas as idades; bimodal (jovens — trauma direto; idosos — queda de baixa energia). Cabeça do rádio: adultas jovens (queda sobre mão); 20% associadas a lesão do complexo ulnar medial. Fratura de Monteggia: fratura do olécrano/cúbito proximal + luxação da cabeça radial (4–7% das fraturas do cúbito).",
        classificacao: [
          {
            sistema: "Mayo (Olécrano)",
            itens: [
              "Tipo I (Não deslocada): imobilização conservadora",
              "Tipo IIA (Deslocada estável — fragmento único): ORIF com banda de tensão ou placa",
              "Tipo IIB (Deslocada instável — cominutiva): placa de contorno posterior",
              "Tipo IIIA (Instável + sem cominução): ressecção + avanço do tríceps (idosos sem demanda)",
              "Tipo IIIB (Instável + cominução): placa longa com enxerto ósseo",
            ],
          },
          {
            sistema: "Mason (Cabeça do Rádio)",
            itens: [
              "Tipo I: não deslocada (<2 mm) — conservador",
              "Tipo II: deslocada (>2 mm) ou inclinada — ORIF possível",
              "Tipo III: cominuída irreconstruível — substituição ou ressecção",
              "Tipo IV: Mason III + luxação do cotovelo (Terrible Triad)",
            ],
          },
        ],
        mecanismo: "Olécrano direto (queda sobre cotovelo): fratura cominutiva ou transversa. Olécrano indireto (tração do tríceps): fratura simples oblíqua. Cabeça do rádio: queda sobre mão espalmada em valgo → compressão capitélio-radial. Monteggia: força direta cúbito + hiperpronação → luxação anterolateral da cabeça radial.",
        tx_cirurgico: [
          "Olécrano deslocado ≥2–3 mm ou perda de extensão ativa (Mayo II e III)",
          "Cabeça do rádio Mason II com >2 mm de deslocamento ou bloqueio de mobilidade",
          "Cabeça do rádio Mason III: substituição protética ou ressecção",
          "Monteggia: sempre cirúrgico — ORIF do cúbito + redução obrigatória da cabeça radial",
        ],
        tx_nao_cirurgico: [
          "Olécrano não deslocado (Mayo I): imobilização em 90° por 3–4 semanas, seguida de mobilização ativa",
          "Cabeça do rádio Mason I (<2 mm, sem bloqueio): sling 5–7 dias + mobilização precoce",
          "Idosos com baixa demanda (Mayo IIIA): ressecção do fragmento + avanço do tríceps — evita fixação complexa",
        ],
        cirurgias: [
          "Banda de tensão (fio K + cerclagem): Mayo IIA — simples transversas/oblíquas; alta taxa de hardware proeminente",
          "Placa posterior de baixo perfil (contorno): Mayo IIB e IIIB — maior estabilidade, menos proeminência",
          "Parafuso intramedular (single screw): fraturas simples selecionadas em idosos",
          "ORIF da cabeça do rádio: parafusos sem cabeça (2.0 mm) ou mini-placa; acesso Kocher ou Kaplan",
          "Substituição da cabeça do rádio (prótese metálica): Mason III irreconstruível; preserva estabilidade em valgo",
          "Ressecção da cabeça do rádio: isolada apenas se LCM intacto; contraindicado no Terrible Triad",
        ],
        complicacoes: [
          "Proeminência do hardware (70–80%): principal queixa após banda de tensão — fios proximais migram",
          "Falha do implante / perda de redução: bandas de tensão em fraturas cominutivas",
          "Não-união do olécrano: infrequente com fixação adequada; mais comum em fraturas cominutivas",
          "Rigidez do cotovelo: imobilização prolongada — mobilização <3 semanas reduz risco",
          "Lesão do nervo interósseo posterior (PIN): ORIF da cabeça do rádio — pronação do antebraço durante acesso",
          "Artrose radiocapitelar tardia: após Mason III mal tratado ou ressecção em paciente jovem",
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
      {
        id: "femur-distal",
        titulo: "Fraturas do Fêmur Distal",
        subtitulo: "Rockwood & Green cap. 58 · Campbell cap. 53",
        epidemiologia: "3–6% das fraturas do fêmur; distribuição bimodal: adultos jovens (alta energia) e mulheres idosas osteoporóticas (>60 anos, queda simples); mortalidade em idosas ~10–15% no primeiro ano. Fratura de Hoffa: côndilo femoral no plano coronal — muitas vezes oculta no RX, TC obrigatória em toda fratura distal.",
        classificacao: [
          {
            sistema: "AO/OTA",
            itens: [
              "33-A: extra-articular (A1 simples, A2 cunha, A3 cominutiva)",
              "33-B: articular parcial — unicondilar (B1 lateral, B2 medial, B3 Hoffa/coronal)",
              "33-C: articular completa — intercondiliana em Y/T (C1 simples, C2 cominuição metafisária, C3 cominuição articular)",
              "Fratura de Hoffa (AO 33-B3): coronal, oculta no AP — diagnóstico em perfil/TC; parafusos anteriores posteriores perpendiculares ao traço",
            ],
          },
        ],
        mecanismo: "Jovem: alta energia (acidente, queda de altura) — força axial + rotação → fratura intercondiliana em Y/T. Idosa osteoporótica: queda simples com joelho fletido (impacto sobre a patela).",
        tx_nao_cirurgico: ["Raramente indicado — apenas fratura extra-articular estável impactada em paciente sem deambulação (acamado). Tração esquelética: temporização pré-operatória."],
        tx_cirurgico: ["Praticamente todas as fraturas em adultos funcionais."],
        cirurgias: [
          "Haste retrógrada intramedular (Retrograde IMN): AO 33-A e extensão articular simples 33-C1; inserção pelo espaço intercondilar; bloqueio supracondilar com parafusos",
          "Placa lateral de ângulo fixo (LISS/LCP-DF 3.5/4.5 mm): AO 33-B e C complexos; técnica MIPO (incisão lateral, fixadores percutâneos)",
          "Dupla placa (medial + lateral): cominuição grave com osteoporose — estabilidade adicional",
          "Artroplastia total do joelho primária (ATJ): idosas com artrose pré-existente + fratura articular grave (33-C2/C3) que impossibilita reconstrução anatômica",
          "Hoffa: parafusos canulados 3.5 mm do sentido anterior-posterior (paralelos ao platô — se posteriores → risco de artrose da troclear)",
        ],
        complicacoes: [
          "Malunião em varo (perda da redução — causa mais comum): avaliação clínica e radiológica do alinhamento em todo seguimento",
          "Rigidez do joelho (perda de flexão): mobilização precoce — meta ≥90° de flexão em 3 meses",
          "Artrose pós-traumática: proporcional à lesão articular e qualidade da redução",
          "Lesão da artéria poplítea: especialmente em luxação concomitante — Doppler/angio-TC obrigatório",
          "Não união: <5% com boa fixação inicial; risk factors: osteoporose, tabagismo, DAOP",
          "Infecção periimplante: risco maior com placas extensas; protocolo antibiótico perioperatório rigoroso",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "periprotetica-mi",
        titulo: "Fraturas Periprotéticas do Membro Inferior",
        subtitulo: "Rockwood & Green cap. 59 · Campbell cap. 7",
        epidemiologia: "Incidência crescente com aumento do volume de artroplastias; maioria >70 anos; mortalidade em 1 ano similar à fratura de colo do fêmur (~20–30% em idosos frágeis). Fêmur periprotético (ATQ): 1% das próteses primárias, 4% das revisões. Tíbia periprotética (ATJ): 0.3–0.5% das ATJs.",
        classificacao: [
          {
            sistema: "Vancouver (fêmur periprotético — ATQ)",
            itens: [
              "AG: trocânter maior — avulsão do abdutor",
              "AL: trocânter menor — avulsão do iliopsoas",
              "B1: ao redor ou logo abaixo da haste, implante FIXO — osso de qualidade adequada",
              "B2: ao redor da haste, implante SOLTO — osso de qualidade adequada",
              "B3: ao redor da haste, implante solto — estoque ósseo DEFICIENTE (cominuição grave, osteoporose extrema)",
              "C: distal à ponta da haste — trata como fratura isolada do fêmur",
            ],
          },
          {
            sistema: "Lewis-Rorabeck (tíbia periprotética — ATJ)",
            itens: [
              "Tipo I: não deslocada, implante estável — conservador",
              "Tipo II: deslocada, implante estável — RAFI",
              "Tipo III: qualquer deslocamento, implante SOLTO — revisão cirúrgica",
            ],
          },
        ],
        mecanismo: "Baixa energia em osso fragilizado (osteoporose + stress riser na ponta da haste); queda simples. Pico de stress na ponta do componente → fratura em espiral ou transversa nessa região.",
        tx_nao_cirurgico: ["Vancouver AG e B1 sem deslocamento significativo (<5 mm no trocânter); Lewis-Rorabeck I: gesso/cinta ortopédica com descarga parcial supervisionada."],
        tx_cirurgico: ["Vancouver B2, B3 (sempre). Vancouver C (quase sempre). Lewis-Rorabeck II e III (sempre)."],
        cirurgias: [
          "Vancouver B1: placa lateral percutânea LISS 4.5 mm + cerclagens a cabo (Dall-Miles ou similares) — preservar haste fixada",
          "Vancouver B2: revisão com haste longa cimentada ou não-cimentada que ultrapasse a fratura ≥2 comprimentos de diâmetro; haste modular ou monoblock",
          "Vancouver B3: megaprótese femoral proximal (reconstrução biológica com aloenxerto estrutural é alternativa em jovens)",
          "Vancouver C: placa lateral distal do fêmur (LISS/LCP) independentemente da haste proximal",
          "Lewis-Rorabeck II: placa periarticular medial ou lateral com ângulo fixo",
          "Lewis-Rorabeck III: revisão completa da ATJ com haste de revisão tibial",
        ],
        complicacoes: [
          "Não-união: estoque ósseo deficiente prejudica consolidação; taxa ~10–15% no Vancouver B3",
          "Infecção periprotética: deve-se descartar com punção articular antes de qualquer revisão eletiva",
          "Instabilidade/luxação do componente revisado: especialmente em megapróteses",
          "Mortalidade pós-operatória elevada: paciente idoso frágil — otimização pré-operatória multidisciplinar essencial",
          "Lesão do nervo ciático/femoral: risco em revisão com cimento ou impacção de haste longa",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "patela",
        titulo: "Fraturas da Patela e Lesões do Mecanismo Extensor",
        subtitulo: "Rockwood & Green cap. 60 · Campbell cap. 56",
        epidemiologia: "1% de todas as fraturas; homens 20–50 anos (trauma direto de alta energia) e idosas (queda sobre joelho semifletido). Bipartite da patela presente em 2–3% da população — não confundir com fratura (bordas cortical arredondadas, localização superolateral). Ruptura do tendão do quadríceps: >40 anos (degeneração tendínea prévia). Ruptura do tendão patelar: <40 anos (atividade esportiva).",
        classificacao: [
          {
            sistema: "AO/OTA",
            itens: [
              "34-A: extra-articular (avulsão do polo)",
              "34-B: articular parcial (fratura vertical sagital — rara)",
              "34-C: articular completa — 34-C1 transversa simples, C2 transversa + fragmento, C3 estrelada/cominutiva",
              "Padrões clínicos: transversa (mais comum — trauma indireto), estrelada/comintiva (trauma direto — 'painel do carro'), polo superior/inferior (avulsão)",
            ],
          },
        ],
        mecanismo: "Direto: queda sobre joelho fletido, trauma de painel — fratura estrelada/cominutiva. Indireto: contração violenta do quadríceps com joelho semifletido (esporte) — fratura transversa com separação.",
        tx_nao_cirurgico: ["Fratura sem deslocamento (<3 mm articular, <3 mm de abertura da fratura) com mecanismo extensor intacto (capacidade de extensão ativa contra gravidade). Imobilização em extensão 4–6 semanas + elevação/carga precoce com joelho em extensão."],
        tx_cirurgico: ["Deslocamento >3 mm ou degrau articular >2 mm. Mecanismo extensor insuficiente (incapaz de extensão ativa). Fratura aberta. Polo superior/inferior irrecuperável."],
        cirurgias: [
          "Cerclagem em banda de tensão (tension band wiring — técnica de Weber/AO): padrão para fratura transversa simples — 2 fios de K longitudinais + cerclagem em arame em figura de 8; converte forças de tensão em compressão na articulação",
          "Parafusos canulados 4.0 mm + cerclagem em 8: alternativa para fratura transversa — perfil menor, menor irritação cutânea",
          "Placa de patela (anterior ou circunferencial): cominuição grave, fratura polar",
          "Patelectomia parcial: polo superior ou inferior irrecuperável (<30–40% da patela) — reinserção do tendão no fragmento remanescente",
          "Patelectomia total: cominuição extrema irrecuperável (último recurso — fraqueza do quadríceps persistente e resultado funcional inferior)",
          "Reparo primário do tendão quadríceps/patelar: urgência cirúrgica (perda do mecanismo extensor) — sutura transóssea + aumentação com cerclagem",
        ],
        complicacoes: [
          "Migração/proeminência dos fios K (principal): remoção eletiva frequentemente necessária em 30–50% dos casos",
          "Rigidez do joelho (perda de flexão): imobilização prolongada — meta ≥90° em 3 meses",
          "Artrose patelofemoral: proporcional à qualidade da redução articular",
          "Não-união: fios K soltos ou pós-patelectomia parcial com pouco fragmento remanescente",
          "Fraqueza permanente do quadríceps: inevitável após patelectomia total; evitar sempre que possível",
          "Infecção: maior risco em fraturas abertas; protocolo antibiótico e cobertura adequada",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "luxacao-joelho",
        titulo: "Luxações do Joelho",
        subtitulo: "Rockwood & Green cap. 61 · Campbell cap. 45",
        epidemiologia: "Rara (0.02–0.2% de todas as lesões ortopédicas); lesão vascular (artéria poplítea) em 20–40%; lesão do nervo fibular comum em 10–40%; síndrome compartimental em 5–10%. Luxação de 'ultra-low-velocity' em obesos mórbidos: mecanismo de baixa energia com múltiplos ligamentos lesados — subdiagnosticada. Mortalidade de membro >6 h de isquemia = ~80%.",
        classificacao: [
          {
            sistema: "Schenck (anatômico — ligamentos lesados)",
            itens: [
              "KD-I: 1 cruzado + 1 colateral — mais estável, menos lesão vascular",
              "KD-II: ambos os cruzados, colaterais intactos",
              "KD-III M: ambos os cruzados + LCM",
              "KD-III L: ambos os cruzados + LCL/poplíteo",
              "KD-IV: quatro ligamentos — cruzados + ambos os colaterais ('four-corner' — ultra-low-velocity em obesos)",
              "KD-V: fratura-luxação periarticular",
            ],
          },
          {
            sistema: "Kennedy (direção)",
            itens: [
              "Anterior (40%): hiperextensão — artéria poplítea esticada anteriormente",
              "Posterior (33%): força direta — artéria poplítea comprimida",
              "Medial, lateral, rotatória: menos frequentes",
            ],
          },
        ],
        mecanismo: "Alta energia: acidente de moto (hiperextensão ou valgização violenta), queda de altura. Baixa energia (ultra-low-velocity): obesidade mórbida — torção simples com corpo pesado sobre joelho.",
        tx_nao_cirurgico: ["Nunca definitivo. Redução fechada emergencial + tala em 20–30° de flexão. Avaliação vascular SEMPRE antes e depois da redução (Índice Tornozelo-Braquial <0.9 → angio-TC obrigatória)."],
        tx_cirurgico: ["Lesão vascular: emergência imediata. Síndrome compartimental: fasciotomia imediata. Reconstrução ligamentar: 2–3 semanas após estabilização (edema/pele)."],
        cirurgias: [
          "Bypass vascular emergencial (safena reversa ou prótese): artéria poplítea lesada — janela de 6–8 h de isquemia para salvar o membro; fixador externo concomitante para estabilizar",
          "Fasciotomia de 4 compartimentos da perna: síndrome compartimental — fasciotomia medial (compartimento superficial e profundo posterior) + lateral (anterior e lateral)",
          "Fixador externo temporário spanning: instabilidade extrema, lesão vascular concomitante, edema grave",
          "Reconstrução multiligamentar (LCA + LCP + colaterais): artroscópica (cruzados) + aberta (colaterais e posterolateral); auto ou aloenxerto; prioridade: LCP > colateral lateral > LCA",
          "Artrodese de joelho: salvamento após falha de reconstrução ou infecção grave",
        ],
        complicacoes: [
          "Amputação: se isquemia >6–8 h ou reconstrução vascular tardia; taxa ~12% global",
          "Pé caído permanente: lesão do nervo fibular comum — 50% são irreversíveis; órtese AFO e reabilitação intensiva",
          "Síndrome compartimental: monitorar pressões intracompartimentais no pós-operatório",
          "Instabilidade crônica residual: reconstrução multiligamentar com resultados inferiores à reconstrução ligamentar isolada",
          "Artrose precoce: lesão condral associada + instabilidade crônica",
          "Rigidez: imobilização prolongada e lesão grave de partes moles",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "tibia-diafise",
        titulo: "Fraturas Diafisárias de Tíbia e Fíbula",
        subtitulo: "Rockwood & Green cap. 63 · Campbell cap. 54",
        epidemiologia: "Osso longo com maior incidência de fratura (~26/100.000/ano); predominância masculina jovem. 40% são abertas (maior taxa entre os ossos longos — subcutânea, pouca cobertura muscular). Localização mais comum: terço distal (hipovascular — maior risco de não-união). Bimodal: esporte/torção (baixa energia, fratura espiral distal) e trauma veicular (alta energia, cominuição).",
        classificacao: [
          {
            sistema: "AO/OTA",
            itens: [
              "42-A: simples (espiral, oblíqua >30°, transversa)",
              "42-B: cunha (bending wedge ou torsional wedge)",
              "42-C: cominutiva (irregular ou segmentar)",
            ],
          },
          {
            sistema: "Gustilo-Anderson (fraturas abertas)",
            itens: [
              "I: ferida <1 cm, limpa, sem contaminação significativa",
              "II: ferida >1 cm sem perda tecidual extensa, lesão moderada de partes moles",
              "IIIA: extenso comprometimento de partes moles mas cobertura óssea adequada pelo retalho local",
              "IIIB: exposição óssea com perda de partes moles — necessita retalho miocutâneo para cobertura",
              "IIIC: lesão arterial associada que necessita reparo vascular",
            ],
          },
        ],
        mecanismo: "Torção de baixa energia (esporte — fratura espiral no terço distal); impacto direto de alta energia (cominuição metafisária); fratura por estresse (corredores — terço médio/distal, gradual).",
        tx_nao_cirurgico: ["Critérios de aceitabilidade para tratamento conservador: <5° varo/valgo, <10° AP angulation, <1 cm encurtamento, <10° rotação, sem fratura aberta. Gesso longo (com joelho fletido 10°) → bota funcional Sarmiento (removível) com carga parcial em 2–4 semanas."],
        tx_cirurgico: ["Deslocamento além dos critérios. Toda fratura aberta. Politraumatizado. Síndrome compartimental. Impossibilidade de manter redução."],
        cirurgias: [
          "Haste intramedular bloqueada (IMN tibial): padrão gold para fraturas diafisárias fechadas e abertas Gustilo I–IIIA; inserção infrapatelar (clássica) ou suprapatelar (menor taxa de malangulamento em valgo — menor dor anterior de joelho)",
          "Técnica suprapatelar semi-extendida: paciente em posição supina, joelho em extensão — melhor controle rotacional e redução, menor lesão do tendão patelar",
          "Fixador externo: temporização em Gustilo IIIB/C (damage control) antes da cobertura cirúrgica; manter ≤2 semanas para evitar colonização dos pinos",
          "Placa minimamente invasiva (MIPO): metáfise proximal e distal onde o canal é largo demais para haste; abordagem percutânea + placa submuscular",
        ],
        complicacoes: [
          "Síndrome compartimental: urgência — pressão >30 mmHg ou dentro de 30 mmHg da pressão diastólica → fasciotomia 4 compartimentos (padrão: 2 incisões — lateral + medial)",
          "Não-união: mais comum que fêmur ou úmero (terço distal hipovascular); taxa ~5% com IMN; tratamento: fresagem + nova haste ou placa + enxerto",
          "Infecção (osteomielite): fratura aberta Gustilo IIIB/C — antibióticos IV prolongados, desbridamento seriado, cobertura com retalho muscular",
          "Mal-alinhamento: valgo (IMN infrapatelar) ou varo (fraturas proximais) — considerar bloqueios adicionais ou técnica suprapatelar",
          "Rigidez do tornozelo: fraturas distais ou imobilização prolongada; fisioterapia intensiva",
          "Pé caído: lesão do nervo fibular na fíbula proximal — monitorar extensão dos artelhos",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "pilon-tibial",
        titulo: "Fraturas do Pilão Tibial",
        subtitulo: "Rockwood & Green cap. 64 · Campbell cap. 87",
        epidemiologia: "7–10% das fraturas da tíbia; grave — lesão da superfície articular por carga axial de alta energia; predominância masculina jovem. Lesão grave das partes moles = principal determinante do prognóstico — não a fratura em si. Complicações de pele em 10–37% (deiscência, necrose) se RAFI imediata sem respeitar protocolo de duas etapas.",
        classificacao: [
          {
            sistema: "AO/OTA",
            itens: [
              "43-B: articular parcial (B1 puro epifisário, B2 com compressão, B3 cominuição articular parcial)",
              "43-C: articular completa — C1 articular simples + metáfise simples, C2 articular simples + cominuição metafisária, C3 cominuição articular completa",
            ],
          },
          {
            sistema: "Ruedi-Allgower (clássica, histórica)",
            itens: [
              "Tipo I: fratura articular sem deslocamento",
              "Tipo II: deslocamento articular sem cominuição significativa",
              "Tipo III: cominuição articular grave + impactação",
            ],
          },
        ],
        mecanismo: "Carga axial de alta energia: queda de altura (tálus projetado para cima na tíbia distal — 'fracture of necessity'), acidente de moto, esqui (com 'binding fracture' em rotação). O mecanismo combina compressão axial + rotação/valgização.",
        tx_nao_cirurgico: ["Apenas fraturas não deslocadas AO 43-C1 mínimas ou paciente com contraindicação cirúrgica absoluta. Raramente indicado."],
        tx_cirurgico: ["Quase sempre indicado. Abordagem em 2 etapas é o PADRÃO atual."],
        cirurgias: [
          "ETAPA 1 — Cirurgia emergencial (0–6 h): fixador externo spanning (calcâneo-tíbia proximal, mantendo comprimento) + RAFI da fíbula com placa 1/3 de cano (restaura coluna lateral e comprimento) + fios de K percutâneos para fragmentos grossos → reduz dor e permite recuperação das partes moles (7–21 dias)",
          "ETAPA 2 — RAFI definitiva após 'wrinkle sign' (sinal da ruga cutânea = partes moles recuperadas): placa anteromedial (abordagem anteromedial) ou anterolateral; reconstrução articular anatômica; enxerto ósseo se gap metafisário",
          "Artrodese tibiotalar primária: cominuição articular AO C3 irrecuperável ou paciente de alto risco (diabético, vasculopata, imunossuprimido) — elimina a variável articular e reduz complicações de partes moles",
          "Fixador externo definitivo (Ilizarov/Taylor): alternativa em Gustilo IIIB/C concomitante ou contra-indicação à placa",
        ],
        complicacoes: [
          "Deiscência/necrose de pele (10–37%): principal complicação — respeitar protocolo de 2 etapas com wrinkle sign",
          "Infecção profunda/osteomielite: especialmente após complicação cutânea — pode exigir artrodese de salvamento",
          "Artrose tibiotalar pós-traumática: universal em AO C3 a longo prazo; ~50% necessitarão artrodese em 10 anos",
          "Não-união metafisária: enxerto ósseo profilático durante a RAFI definitiva quando gap presente",
          "Rigidez do tornozelo: reabilitação precoce após consolidação articular",
          "Síndrome compartimental da perna: monitorar pressões no pós-operatório imediato",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "medio-antepé",
        titulo: "Fraturas e Luxações do Médio e Antepé",
        subtitulo: "Rockwood & Green cap. 68 · Campbell cap. 88",
        epidemiologia: "Fraturas do médio/antepé = 5–6% de todas as fraturas. Lisfranc (articulação tarsometatarsal): frequentemente subdiagnosticada em 20% das avaliações de pronto-socorro — suspeitar em qualquer entorse de médio-pé com dor em 'carga' ou diastase >2 mm. Fratura de Jones (zona II do 5° metatarso): alta taxa de não-união (9–15%) por hipovascularidade; a distinção com Pseudo-Jones é crítica. Metatarsos centrais: fratura por estresse é frequente em militares/corredores.",
        classificacao: [
          {
            sistema: "Lisfranc (Quenu-Kuss modificada)",
            itens: [
              "Tipo A (Homolateral): todos os 5 raios deslocados na mesma direção (dorsal — mais comum)",
              "Tipo B (Parcial): 1 ou mais raios deslocados, outros estáveis (B1: medial isolado, B2: lateral)",
              "Tipo C (Divergente): raios medial e lateral deslocados em direções opostas — mais instável",
              "Lisfranc ligamentoso puro: sem fratura, apenas luxação/diástase — pior prognóstico que com fratura",
            ],
          },
          {
            sistema: "5° Metatarso (Jones vs Pseudo-Jones)",
            itens: [
              "Zona I (Pseudo-Jones / avulsão do tubérculo): apófise no tubérculo — avulsão do fibular curto ou plantar lateral; raramente necessita cirurgia",
              "Zona II (Jones verdadeira): diáfise proximal na junção metadiafisária; área hipovascular — alto risco de não-união",
              "Zona III (fratura diafisária proximal): distal à zona II; fratura por estresse em atletas",
            ],
          },
        ],
        mecanismo: "Lisfranc: carga axial em antepé plantifletido (acidente de moto, atleta em pivô — 'cleat entrapment'), queda de altura. Jones: adução forçada do antepé + carga axial (conversão súbita de direção). Metatarsos: impacto direto (esmagamento) ou torção (fratura espiral); fratura por estresse (corrida, marcha).",
        tx_nao_cirurgico: ["Lisfranc sem deslocamento (<2 mm): gesso sem carga 6–8 semanas (controverso — muitos cirurgiões preferem RAFI mesmo sem deslocamento em ativos). Jones (zona II) sem deslocamento em paciente sedentário: gesso sem carga 6–8 semanas (alta taxa de retardo de união). Metatarsos (2°–4°) não deslocados: bota rígida 4–6 semanas. Pseudo-Jones: bota rígida ou tala 3–4 semanas."],
        tx_cirurgico: ["Lisfranc deslocado >2 mm. Jones em atleta de alta demanda (cirurgia primária = retorno mais rápido). Jones com retardo de união ou não-união (>10–12 semanas sem consolidação). Metatarso deslocado >10° angulação ou rotação. Toda fratura aberta."],
        cirurgias: [
          "Lisfranc RAFI: parafusos transarticulares 3.5 mm (Lisfranc screw = 1° cuneiforme → base 2° MTT) + parafusos ou fios K para raios laterais; comparar estabilidade pós-fixação aos 4°/5° raios",
          "Artrodese tarsometatarsal primária (1°–2°–3° TMT): metanálise mostra resultados equivalentes ou superiores à RAFI para Lisfranc ligamentoso puro e cominutivo — reduz artrose secundária",
          "Jones (zona II): parafuso intramedular (IMN) 4.5–6.5 mm — inserção no canal da diáfise do 5° MTT (profilaxia em atletas de alto nível); enxerto ósseo se não-união estabelecida",
          "Artrodese de Lisfranc tardia: artrose tarsometatarsal pós-traumática — fusão dos raios acometidos (1°–2°–3° TMT + cubóide para 4°–5° se necessário)",
          "Metatarso deslocado: fios K percutâneos (fratura simples) ou placa mini-condiliana 2.0 mm",
        ],
        complicacoes: [
          "Artrose tarsometatarsal (Lisfranc): principal sequela tardia — diagnóstico tardio piora significativamente o prognóstico funcional",
          "Pé plano pós-traumático (abducção do antepé): redução incompleta do Lisfranc → colapso medial do arco longitudinal",
          "Não-união do Jones (zona II): hipovascular — enxerto ósseo + parafuso IMN; taxa de retorno ao esporte 85–95% com cirurgia primária em atletas",
          "Síndrome compartimental do pé: alta energia + vários metatarsos → fasciotomia dorsal (2 incisões) + medial",
          "Metatarsalgia de transferência: após correção de hálux valgo ou fratura de 1° MTT não reduzida",
          "CRPS tipo I: dor desproporcional + alterações autonômicas após fratura de médio/antepé",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "luxacao-quadril",
        titulo: "Luxação do Quadril e Fratura da Cabeça Femoral",
        subtitulo: "Cap 52 — Hip Dislocations and Femoral Head Fractures",
        epidemiologia: "Trauma de alta energia — acidentes automobilísticos (principal). 90% são posteriores. Associação com outras lesões em 95% dos casos (lesão intra-abdominal, acetábulo, joelho ipsilateral). Bimodal: jovens adultos (alta energia) e idosos com artrose/artroplastia (baixa energia). Lesão nervo ciático em 10–20% das posteriores.",
        classificacao: [
          {
            sistema: "Thompson-Epstein (Posterior)",
            itens: [
              "Tipo I: luxação simples sem fratura significativa",
              "Tipo II: fragmento único grande da parede posterior",
              "Tipo III: cominução do acetábulo posterior",
              "Tipo IV: fratura do assoalho do acetábulo",
              "Tipo V: fratura associada da cabeça femoral (subdividida por Pipkin)",
            ],
          },
          {
            sistema: "Pipkin (Cabeça Femoral)",
            itens: [
              "Tipo I: fratura caudal à fóvea (região não-carga) — prognóstico favorável",
              "Tipo II: fratura cefálica à fóvea (região de carga) — pior prognóstico",
              "Tipo III: Pipkin I ou II + fratura do colo femoral — urgência cirúrgica",
              "Tipo IV: Pipkin I, II ou III + fratura do acetábulo",
            ],
          },
        ],
        mecanismo: "Posterior (dashboard injury): quadril em flexão + adução + RI → força axial sobre o joelho → cabeça femoral empurrada para trás da cavidade acetabular. Anterior (raro): ABER forçado (acidente em moto, impacto lateral). Posição do quadril no momento do impacto determina o padrão.",
        tx_cirurgico: [
          "Pipkin II (fragmento suprafoveal >1/3 da cabeça): redução aberta e fixação",
          "Pipkin III (fratura do colo femoral associada): urgência — artroplastia ou ORIF urgente",
          "Pipkin IV: ORIF do acetábulo + tratamento do fragmento cefálico",
          "Irredutível fechado (interposição muscular, fragmento ósseo intra-articular)",
          "Instabilidade pós-redução do quadril",
          "Fragmento intra-articular (>1 mm na TC pós-redução)",
        ],
        tx_nao_cirurgico: [
          "Pipkin I (fragmento caudal pequeno) + luxação simples reduzida: tração esquelética 4–6 semanas",
          "Carga progressiva protegida por 6–8 semanas após redução estável",
          "Urgência da redução: <6 horas é crítica (NAV aumenta progressivamente com tempo de luxação)",
          "TC pós-redução obrigatória: avaliar fragmentos, congruência e posição da cabeça",
        ],
        cirurgias: [
          "Redução fechada urgente sob sedação ou anestesia geral (meta <6 horas)",
          "ORIF via Kocher-Langenbeck (posterior): acesso para fragmento posterior e cabeça femoral tipo Pipkin II",
          "ORIF via Smith-Petersen (anterior): para fragmento anterior suprafoveal (Pipkin II anterior)",
          "Artroplastia total: Pipkin III em idosos, artrose prévia, necrose avascular avançada",
          "ORIF do acetábulo: Pipkin IV — planejar abordagem combinada",
        ],
        complicacoes: [
          "Necrose avascular da cabeça femoral (10–40%): principal — risco aumenta com tempo de luxação >6 h e energia do trauma",
          "Artrose pós-traumática: sequela tardia de dano cartilaginoso e necrose",
          "Lesão nervo ciático (10–20%): mais comum nas posteriores; maioria neuropraxia — observar 3 meses",
          "Heterotopic ossification (HO): comum após ORIF — profilaxia com indometacina ou radioterapia",
          "Lesão arterial (rara): lesão da artéria femoral nas luxações anteriores — avaliar pulso",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "subtrocanterica",
        titulo: "Fratura Subtrocantérica do Fêmur",
        subtitulo: "Cap 55 — Subtrochanteric Femur Fractures",
        epidemiologia: "Dentro de 5 cm distal ao trocânter menor. Três populações: (1) jovens em trauma de alta energia; (2) idosos osteoporóticos em queda de baixa energia; (3) uso crônico de bisfosfonatos (sobreposição com grupos 2/3). Representam 10–30% das fraturas do extremo proximal do fêmur. Alta instabilidade mecânica pela concentração de forças no segmento subtrocantérico.",
        classificacao: [
          {
            sistema: "Seinsheimer",
            itens: [
              "Tipo I: não deslocada (<2 mm)",
              "Tipo II: traço simples (IIA transversa, IIB espiral 2 fragmentos, IIC espiral 3 fragmentos)",
              "Tipo III: asa de borboleta medial (IIIA) ou lateral (IIIB)",
              "Tipo IV: cominutiva (4+ fragmentos)",
              "Tipo V: subtrocantérica + intertrocantérica",
            ],
          },
          {
            sistema: "AO/OTA",
            itens: [
              "32-A (simples), 32-B (cunha), 32-C (cominutiva) — classificação diafisária aplicada à região",
            ],
          },
        ],
        mecanismo: "Alta energia (jovens): força axial + torção sobre o fêmur; fraturas cominutivas. Baixa energia (idosos/BPs): queda simples — região de concentração máxima de estresse (força compressiva medial e tensiva lateral). Deformidade característica: segmento proximal em flexão + abdução + RE (ação do iliopsoas, glúteo médio e rotadores curtos). Segmento distal: aduzido e encurtado (adutor).",
        tx_cirurgico: [
          "Virtualmente todos os casos — indicações de conservador são extremamente limitadas",
          "Jovens em alta energia: haste intramedular cefalomedular de urgência relativa",
          "Idosos: estabilização precoce (<48 h) reduz morbimortalidade",
          "Bisfosfonato: cirurgia + suspensão do BP + teriparatida adjuvante",
        ],
        tx_nao_cirurgico: [
          "Apenas em: recusa de consentimento cirúrgico, impossibilidade médica absoluta",
          "Não-ambulador com comorbidades proibitivas: tração + cuidados paliativos",
          "Historicamente: tração em 90/90° (90° quadril + 90° joelho) — abandonada pela superioridade cirúrgica",
        ],
        cirurgias: [
          "Haste intramedular cefalomedular (gold standard): entrada no trocânter maior lateral; controla deformidade em flexão-abdução-RE do proximal",
          "Redução adequada antes da haste: cuidado com varo e flexão do proximal — mesas de tração ou pinças de redução",
          "Placa DHS com extensão diafisária ou placa angulada 95° (DCS): alternativa quando haste não viável",
          "Fixação percutânea: haste mínima invasiva em pacientes de alto risco anestésico",
        ],
        complicacoes: [
          "Mal-união em varo (principal): falha de redução + entrada lateral incorreta da haste",
          "Não-união (5–10%): região de alta demanda mecânica; mais comum nas cominutivas",
          "Falha do implante: corte do parafuso cefálico em varo; nail-cutout",
          "Infecção: rara mas grave; bisfosfonato-associadas têm maior risco de retardo de consolidação",
          "TVP/TEP: profilaxia anticoagulante obrigatória",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "fratura-atipica-femur",
        titulo: "Fratura Atípica do Fêmur",
        subtitulo: "Cap 56 — Atypical Femur Fractures",
        epidemiologia: "Entidade reconhecida a partir de 2005 (Odvina). Associada ao uso prolongado de bisfosfonatos (>3–5 anos). Incidência crescente — maior em asiáticos. 28–54% são bilaterais (risco 46× maior que fraturas típicas). Dor prodromal na coxa em 30–86% dos casos antes da fratura completa.",
        classificacao: [
          {
            sistema: "ASBMR Task Force — Critérios Maiores (todos obrigatórios)",
            itens: [
              "Localização subtrocantérica ou diafisária",
              "Linha de fratura transversa ou oblíqua curta (<30°)",
              "Trauma mínimo ou espontânea",
              "Espessamento cortical lateral focal ('dreaded black line' no Rx)",
              "Sem cominução (ou mínima)",
            ],
          },
          {
            sistema: "ASBMR Task Force — Critérios Menores (suplementares)",
            itens: [
              "Periostite cortical lateral (endurecimento periosteal)",
              "Espessamento cortical endosteal",
              "Sintomas prodromais (dor na coxa ou virilha)",
              "Bilateral",
              "Atraso de consolidação",
              "Comorbidades (uso de glicocorticoide, inibidor de aromatase, deficiência de vitamina D)",
            ],
          },
        ],
        mecanismo: "Supressão do turnover ósseo pelos bisfosfonatos → acúmulo de microfissuras no córtex lateral (principal zona de tensão da diáfise femoral) → 'dreaded black line' → fratura transversa completa com mínimo trauma. Análogo à fratura de fadiga por supressão da remodelação.",
        tx_cirurgico: [
          "Fratura completa: haste intramedular cefalomedular (urgência relativa)",
          "Fratura incompleta sintomática com 'dreaded black line' progredindo: haste intramedular profilática",
          "Fratura incompleta assintomática com >50% do córtex envolvido: haste preventiva eletiva",
        ],
        tx_nao_cirurgico: [
          "Fratura incompleta assintomática <50% da espessura cortical: suspensão do BP + carga protegida com muleta",
          "Teriparatida (PTH 1–34): estimula formação óssea — adjuvante para melhorar consolidação em incompletas e pós-cirurgia",
          "Suplementação de cálcio + vitamina D: obrigatória",
          "Avaliação contralateral imediata: Rx bilateral + RM se Rx normal",
          "Monitorização: Rx a cada 3 meses — progressão da linha negra indica cirurgia",
        ],
        cirurgias: [
          "Haste intramedular cefalomedular: padrão-ouro para AFF completa e incompleta sintomática com progressão",
          "Preferir haste com abertura lateral: menor stress na região crítica lateral",
          "Profilática contralateral: considerar se achados radiográficos significativos no lado oposto",
        ],
        complicacoes: [
          "Não-união ou retardo de consolidação: alta taxa comparada a fraturas típicas — osso 'morto' pela supressão do turnover",
          "Bilateral sequencial: 28–54% desenvolverão fratura contralateral — monitorização obrigatória até 6 anos",
          "Falha do implante: redução inadequada + biologia precária",
          "Diagnóstico tardio: AFFs frequentemente não relatadas como 'atípicas' na leitura radiológica primária",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "diafise-femoral",
        titulo: "Fratura da Diáfise Femoral",
        subtitulo: "Cap 57 — Femoral Shaft Fractures",
        epidemiologia: "1–9% de todas as fraturas; alta morbimortalidade — hemorragia (2–3 L perdidos no hematoma femoral), embolia gordurosa, falência orgânica. Bimodal: jovens adultos (acidentes automobilísticos, alta energia) e idosos osteoporóticos (queda de baixa energia). Lesões associadas em >50%: tórax, abdome, pelve, joelho ipsilateral.",
        classificacao: [
          {
            sistema: "AO/OTA",
            itens: [
              "32-A (Simples): A1 espiral, A2 oblíqua, A3 transversa",
              "32-B (Cunha): B1 espiral, B2 dobrada, B3 fragmentada",
              "32-C (Complexa/Cominutiva): C1 espiral, C2 segmentada, C3 irregular",
            ],
          },
          {
            sistema: "Por Localização",
            itens: [
              "1/3 proximal: associação com fratura do colo femoral ipsilateral (2–9%) — TC obrigatória",
              "1/3 médio: mais comum; haste anterógrada padrão",
              "1/3 distal: haste retrógrada ou placa condiliana",
            ],
          },
        ],
        mecanismo: "Alta energia (jovens): impacto direto (automóvel, projétil) ou força axial + torção (queda de altura). Baixa energia (idosos): queda simples em osso osteoporótico ou fragilizado (metástase, bisfosfonatos). Deformidade: segmento proximal em flexão/ABD (iliopsoas + glúteo), distal em extensão (gastrocnêmio).",
        tx_cirurgico: [
          "Virtualmente todos os casos em adultos ambulatórios",
          "Politraumatizado: damage control ortopédico → fixador externo temporário, conversão em 48–72 h",
          "Fratura ipsilateral colo + diáfise: reconstrução total com haste cefalomedular ou placa + haste",
        ],
        tx_nao_cirurgico: [
          "Tração esquelética: uso histórico; atual apenas em países sem recursos ou como temporário",
          "Neonato/lactente: fratura em galho verde — Pavlik ou bandagem de Gallows (≤6 meses)",
          "Não-ambulador com comorbidade cirúrgica proibitiva: tração + colchão antiescaras",
        ],
        cirurgias: [
          "Haste intramedular anterógrada (gold standard): início trocantérico ou piriforme; fresagem prévia → melhor encaixe e estabilidade",
          "Haste intramedular retrógrada: gestante, obesidade mórbida, fratura distal, fratura ipsilateral do colo femoral",
          "Placa (ORIF): fratura periprostética, falha de haste, fratura segmentar selecionada",
          "Fixador externo: damage control, fratura aberta contaminada — temporário até conversão para definitivo",
        ],
        complicacoes: [
          "Deformidade rotacional: mais comum — erro de redução; avaliar arco de rotação comparativo no pós-op imediato",
          "Rigidez do joelho (25–30%): perda de ≥10° de extensão; fisioterapia precoce fundamental",
          "Embolia gordurosa: estabilização precoce reduz risco — monitorar SatO2",
          "Síndrome compartimental da coxa: rara mas catastrófica — suspeitar em alta energia + câmaras tensas",
          "Não-união (2–5%): mais comum nas fraturas transversas e distrativas",
          "Fratura ipsilateral do colo femoral não reconhecida: 2–9% — TC de todo o fêmur pré-op",
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
      {
        id: "parede-toracica",
        titulo: "Traumatismos da Parede Torácica",
        subtitulo: "Rockwood & Green cap. 46 · Campbell cap. 34",
        epidemiologia: "Fraturas de costelas presentes em 10% de todos os traumas; mortalidade aumenta 19% a cada costela fraturada adicional em idosos (>65 anos). Tórax instável (flail chest): ≥3 costelas fraturadas em 2 ou mais pontos → paradoxo respiratório — área flácida se move ao contrário do restante do tórax. Pneumotórax em ~30%, hemotórax em ~50% das fraturas múltiplas. Fratura de esterno: associada a trauma esternal direto (cinto de segurança, impacto direto).",
        classificacao: [
          {
            sistema: "Padrões de gravidade",
            itens: [
              "Costela simples isolada: baixa morbi-mortalidade, tratamento analgésico",
              "Fraturas múltiplas unilaterais (≥3): risco de pneumonia e insuficiência respiratória, especialmente em idosos",
              "Tórax instável (flail chest): ≥3 costelas fraturadas em 2+ pontos no mesmo hemitórax → paradoxo respiratório, hipóxia grave",
              "Fratura de esterno: transversa (cinto de segurança), associada a lesão miocárdica (troponina + ECG)",
              "Pneumotórax hipertensivo: desvio mediastinal → emergência — drenagem imediata por agulha (2° EIC linha hemiclavicular) antes do dreno",
            ],
          },
        ],
        mecanismo: "Impacto direto (acidente veicular — volante ou cinto de segurança, queda); compressão torácica lateral ou AP; trauma penetrante.",
        tx_nao_cirurgico: ["Maioria: analgesia multimodal adequada (bloqueio intercostal guiado por USG, cateter epidural torácico = padrão gold para múltiplas costelas) + fisioterapia respiratória + incentivador de fluxo. Evitar imobilização torácica (restringe expansão — causa atelectasia e pneumonia). Drenagem de pneumotórax (28–32 Fr) e/ou hemotórax (32–36 Fr)."],
        tx_cirurgico: ["Tórax instável com insuficiência respiratória (ventilação mecânica >48 h sem resolução). Hemotórax coagulado (VATS em 72 h). Fratura de esterno com deslocamento grave."],
        cirurgias: [
          "Fixação cirúrgica de costelas (ORIF rib — placas MatrixRIB, STRATOS ou similares): tórax instável com ventilação mecânica prolongada; reduz duração de VM, pneumonia e dor crônica vs ventilação isolada",
          "Videotoracoscopia (VATS): hemotórax coagulado não drenado pelo dreno (48–72 h após o trauma); evita toracotomia aberta",
          "Toracotomia de emergência ('clam shell'): tamponamento cardíaco ou lesão de grandes vasos — ressuscitativa",
          "Reparo de esterno: placa de ângulo fixo ou fio de aço em fraturas com instabilidade do esterno",
        ],
        complicacoes: [
          "Pneumonia (principal — 30–50% nos tórax instáveis): hipoventilação por dor + atelectasia → protocolo ERAS com analgesia epidural e fisioterapia",
          "Insuficiência respiratória aguda: indicação de ventilação mecânica se PaO2 <60 mmHg em ar ambiente",
          "Hemotórax coagulado retido: fibrotórax e restrição ventilatória tardia — VATS precoce",
          "Pneumotórax hipertensivo: desvio de mediastino → colapso cardiovascular — descompressão emergencial com agulha",
          "Lesão miocárdica contusa (fratura esternal): arritmias, disfunção ventricular — monitoração ECG + troponina",
          "Dor crônica pós-fratura: neuralgia intercostal — pode necessitar bloqueio intercostal ou radiofrequência tardia",
          "Lesão de órgãos abdominais (costelas inferiores 9–12): baço esquerdo, fígado direito — FAST ultrassonografia obrigatória",
        ],
        fontes: ["Rockwood & Green — Fraturas em Adultos, 10ª ed. (2025)", "Campbell's Operative Orthopaedics, 15ª ed. (2026)"],
      },
      {
        id: "fratura-acetabulo",
        titulo: "Fratura do Acetábulo",
        subtitulo: "Cap 51 — Acetabulum Fractures",
        epidemiologia: "~3/100.000/ano; incidência estável após legislação de cinto de segurança. Bimodal: jovens em trauma de alta energia (AVCs, motocicletas, quedas de altura) e idosos em baixa energia. Parede posterior + transversa com parede posterior + ambas as colunas = padrões mais comuns para cirurgia. Lesão nervosa (principalmente ciático) em 10–40%. Presença de desvio da cúpola articular, fragmento intra-articular e instabilidade pós-redução são os determinantes cirúrgicos principais.",
        classificacao: [
          {
            sistema: "Letournel-Judet — 5 Elementares",
            itens: [
              "Parede posterior: mais comum — trauma de dashboard",
              "Coluna posterior: traço da grande incisura ciática até o acetábulo",
              "Parede anterior: trauma em RE + extensão ou trauma direto anterior",
              "Coluna anterior: atravessa a superfície articular anterior",
              "Transversa: divide o hemipélvis em segmento ilio (superior) e isquiopúbico (inferior)",
            ],
          },
          {
            sistema: "Letournel-Judet — 5 Associadas",
            itens: [
              "Transversa + parede posterior (a mais comum das associadas)",
              "T-shape (transversa com ramo descendente)",
              "Coluna posterior + parede posterior",
              "Ambas as colunas (floating acetabulum — sem suporte ilíaco): congruência secundária possível",
              "Hemicoluna anterior + hemitransversa posterior",
            ],
          },
          {
            sistema: "Roof Arc de Matta (para conservador)",
            itens: [
              "Medida nas 3 incidências: AP, oblíqua alar e oblíqua obturadora",
              "≥45° em todas as projeções = zona de carga protegida — candidato ao tratamento conservador",
              "<45° em qualquer projeção = área de carga comprometida → cirurgia",
            ],
          },
        ],
        mecanismo: "Transmissão de carga pelo eixo femoral até o acetábulo. Posição do quadril no momento do impacto determina o padrão: flexão + adução + RI → parede posterior (dashboard injury); neutro → transversa; ABD → parede anterior. Energia do trauma e direção vetorial definem o traço específico.",
        tx_cirurgico: [
          ">2 mm de deslocamento da cúpola articular (zona de carga) — critério principal",
          "Fragmento ósseo ou labral intra-articular após redução fechada",
          "Instabilidade pós-redução do quadril (teste de tração positivo)",
          "Roof arc <45° em qualquer projeção (zona de carga exposta)",
          "Fratura com margem posterior marginal + instabilidade do quadril",
          "Urgência relativa: fratura-luxação irredutível ou lesão vascular",
        ],
        tx_nao_cirurgico: [
          "<2 mm de deslocamento na zona de carga: tração esquelética 6–8 semanas, depois carga gradual",
          "Roof arc de Matta ≥45° em todas as 3 projeções: conservador mesmo com desvio moderado periférico",
          "Ambas as colunas com congruência secundária (cúpola alinhada com cabeça femoral apesar do desvio ilíaco): conservador",
          "Idosos de alto risco cirúrgico com padrão favorável: conservador ou artroplastia primária",
          "TC pós-redução obrigatória: confirmar ausência de fragmento intra-articular",
        ],
        cirurgias: [
          "Kocher-Langenbeck (posterior): padrões com coluna/parede posterior; acesso prono ou decúbito lateral",
          "Ilioinguinal (anterior): padrões com coluna anterior, parede anterior, ambas as colunas",
          "Stoppa modificada (anterior interno / quadrilátero): alternativa ao ilioinguinal para quadrilátero e coluna posterior via anterior",
          "Via combinada (simultânea ou sequencial): padrões complexos (T-shape, ambas as colunas, transversa + parede posterior)",
          "ORIF percutânea (coluna anterior percutânea): idosos de alto risco com padrão simples deslocado",
          "Artroplastia total primária: idosos com artrose prévia ou fratura de baixa energia",
          "Profilaxia de HO: indometacina 25 mg 3×/dia × 6 semanas OU radioterapia 700 cGy dose única",
        ],
        complicacoes: [
          "Artrose pós-traumática (25–50%): principal sequela tardia — mais comum nas fraturas com dano cartilaginoso e desvio residual",
          "Necrose avascular da cabeça femoral (10–20%): piora com luxação associada e redução tardia",
          "Lesão nervosa (ciático / glúteo superior / femoral): ciático em 10–40% das fraturas com parede posterior",
          "Ossificação heterotópica (9–90% conforme série): comum nas vias posteriores — profilaxia obrigatória",
          "TEP/TVP: anticoagulação profilática obrigatória — risco elevado por imobilização + trauma pélvico",
          "Infecção profunda (2–5%): grave — lavagem + remoção do material se necessário",
          "Falha do implante: mal-redução + cominutiva → conversão para ATQ",
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
