import type { Topico } from "./types";

export const ANATOMIA: Topico[] = [
  {
    id: "a-planos", titulo: "Planos, eixos e terminologia do movimento", area: "anatomia", grupo: "Fundamentos",
    tags: ["plano sagital", "frontal", "transverso", "flexão", "abdução"],
    resumo: "Sagital (flexão/extensão), frontal (abdução/adução) e transverso (rotações).",
    secoes: [{ t: "Resumo", itens: ["Plano sagital — eixo laterolateral: flexão, extensão, dorsiflexão, flexão plantar.", "Plano frontal — eixo anteroposterior: abdução, adução, inclinação lateral, inversão/eversão.", "Plano transverso — eixo longitudinal: rotação interna/externa, pronação/supinação do antebraço.", "Agonista, antagonista, sinergista e estabilizador descrevem a função de cada músculo no gesto."] }],
    fontes: ["LIPPERT"],
  },
  {
    id: "a-ombro", titulo: "Ombro", area: "anatomia", grupo: "Membro superior",
    tags: ["manguito rotador", "ritmo escapuloumeral", "escápula", "deltoide"],
    resumo: "Complexo de 4 articulações; estabilidade dinâmica depende do manguito e da escápula. Ritmo escapuloumeral 2:1.",
    secoes: [
      { t: "Pontos funcionais", itens: ["Glenoumeral, acromioclavicular, esternoclavicular e escapulotorácica.", "Ritmo escapuloumeral: ~2° de glenoumeral para 1° escapular na elevação.", "Serrátil anterior e trapézio (superior + inferior) fazem a rotação superior da escápula — fraqueza gera discinesia."] },
      { t: "Testes", itens: ["Jobe, Patte, Gerber/lift-off, belly press, Neer, Hawkins, apreensão/recolocação, O'Brien (SLAP)."] },
    ],
    tabela: {
      cab: ["Músculo", "Ação principal", "Inervação"],
      linhas: [
        ["Supraespinal", "Abdução inicial, estabiliza a cabeça umeral", "Supraescapular (C5–C6)"],
        ["Infraespinal", "Rotação externa", "Supraescapular (C5–C6)"],
        ["Redondo menor", "Rotação externa", "Axilar (C5–C6)"],
        ["Subescapular", "Rotação interna", "Subescapulares (C5–C6)"],
        ["Deltoide", "Abdução, flexão e extensão", "Axilar (C5–C6)"],
        ["Serrátil anterior", "Protração e rotação superior da escápula", "Torácico longo (C5–C7)"],
        ["Trapézio", "Elevação, retração, rotação superior", "Acessório (NC XI)"],
        ["Grande dorsal", "Extensão, adução, rotação interna", "Toracodorsal (C6–C8)"],
      ],
    },
    fontes: ["LIPPERT"],
  },
  {
    id: "a-cotovelo", titulo: "Cotovelo e antebraço", area: "anatomia", grupo: "Membro superior",
    tags: ["epicôndilo", "colateral ulnar", "bíceps", "pronação"],
    resumo: "Dobradiça úmero-ulnar + articulação radioulnar para prono-supinação; ligamento colateral ulnar resiste ao valgo.",
    secoes: [{ t: "Pontos funcionais", itens: ["Epicôndilo lateral: origem dos extensores do punho (extensor radial curto do carpo — epicondilalgia).", "Epicôndilo medial: flexores-pronadores (cotovelo de golfista) e proximidade do nervo ulnar.", "Bíceps é o principal supinador com o cotovelo fletido."] }],
    tabela: {
      cab: ["Músculo", "Ação", "Inervação"],
      linhas: [
        ["Bíceps braquial", "Flexão do cotovelo e supinação", "Musculocutâneo (C5–C6)"],
        ["Braquial", "Flexão do cotovelo", "Musculocutâneo"],
        ["Braquiorradial", "Flexão em posição neutra", "Radial (C5–C6)"],
        ["Tríceps braquial", "Extensão do cotovelo", "Radial (C6–C8)"],
        ["Pronador redondo", "Pronação", "Mediano (C6–C7)"],
      ],
    },
    fontes: ["LIPPERT"],
  },
  {
    id: "a-punho", titulo: "Punho e mão", area: "anatomia", grupo: "Membro superior",
    tags: ["túnel do carpo", "escafoide", "tabaqueira", "preensão"],
    resumo: "Preensão depende do equilíbrio entre flexores extrínsecos e intrínsecos; escafoide é a fratura do carpo mais comum.",
    secoes: [{ t: "Pontos funcionais", itens: ["Dor na tabaqueira anatômica após queda = fratura de escafoide até prova em contrário (imobilizar e repetir imagem/RM).", "Túnel do carpo: 9 tendões flexores + nervo mediano.", "Posição funcional do punho: leve extensão (20–30°) — a preensão é mais forte."] }],
    fontes: ["LIPPERT", "HODLER"],
  },
  {
    id: "a-cervical", titulo: "Coluna cervical", area: "anatomia", grupo: "Coluna",
    tags: ["dermátomos", "radiculopatia", "flexores profundos"],
    resumo: "C1–C2 responde por metade da rotação; raízes saem acima da vértebra correspondente (C6 entre C5–C6).",
    tabela: {
      cab: ["Raiz", "Força", "Reflexo", "Sensibilidade"],
      linhas: [
        ["C5", "Abdução do ombro, flexão do cotovelo", "Bicipital", "Face lateral do braço"],
        ["C6", "Extensão do punho", "Braquiorradial", "Polegar"],
        ["C7", "Extensão do cotovelo, flexão do punho", "Tricipital", "Dedo médio"],
        ["C8", "Flexão dos dedos", "—", "Dedo mínimo"],
        ["T1", "Abdução dos dedos", "—", "Face medial do antebraço"],
      ],
    },
    secoes: [{ t: "Testes", itens: ["Spurling (radiculopatia), distração cervical (alívio), teste de tensão do membro superior."] }],
    fontes: ["LIPPERT", "SPINE"],
  },
  {
    id: "a-lombar", titulo: "Coluna lombar, pelve e core", area: "anatomia", grupo: "Coluna",
    tags: ["core", "multífido", "transverso do abdome", "raízes lombares", "lasègue"],
    resumo: "Core = cilindro de estabilidade (diafragma, assoalho pélvico, transverso, multífidos, oblíquos).",
    tabela: {
      cab: ["Raiz", "Força", "Reflexo", "Sensibilidade"],
      linhas: [
        ["L2–L3", "Flexão do quadril", "—", "Face anterior da coxa"],
        ["L4", "Extensão do joelho, dorsiflexão (tibial anterior)", "Patelar", "Face medial da perna"],
        ["L5", "Extensão do hálux", "—", "Dorso do pé"],
        ["S1", "Flexão plantar, eversão", "Aquileu", "Face lateral do pé/planta"],
      ],
    },
    secoes: [{ t: "Testes", itens: ["Elevação da perna estendida (Lasègue) 30–70° reproduzindo dor abaixo do joelho: radiculopatia L5/S1.", "Slump test; teste do estiramento femoral (L2–L4)."] }],
    fontes: ["LIPPERT", "SPINE"],
  },
  {
    id: "a-quadril", titulo: "Quadril", area: "anatomia", grupo: "Membro inferior",
    tags: ["glúteo médio", "iliopsoas", "adutores", "fai", "fadir"],
    resumo: "Articulação estável (esfera e cavidade); glúteo médio controla a pelve no apoio unipodal.",
    tabela: {
      cab: ["Músculo", "Ação", "Inervação"],
      linhas: [
        ["Iliopsoas", "Flexão do quadril", "Femoral / plexo lombar (L1–L3)"],
        ["Glúteo máximo", "Extensão e rotação externa", "Glúteo inferior (L5–S2)"],
        ["Glúteo médio", "Abdução e estabilização pélvica", "Glúteo superior (L4–S1)"],
        ["Adutores (longo, curto, magno)", "Adução", "Obturatório (L2–L4)"],
        ["Isquiotibiais", "Extensão do quadril e flexão do joelho", "Ciático (L5–S2)"],
        ["Reto femoral", "Flexão do quadril e extensão do joelho", "Femoral (L2–L4)"],
      ],
    },
    secoes: [{ t: "Testes", itens: ["FADIR (impacto femoroacetabular/labral), FABER/Patrick (sacroilíaca e quadril), Thomas (encurtamento de flexores), Trendelenburg."] }],
    fontes: ["LIPPERT"],
  },
  {
    id: "a-joelho", titulo: "Joelho", area: "anatomia", grupo: "Membro inferior",
    tags: ["lca", "lcp", "menisco", "patela", "screw-home"],
    resumo: "Estabilidade depende dos ligamentos e da musculatura; meniscos distribuem carga (perda aumenta artrose).",
    secoes: [
      { t: "Pontos funcionais", itens: ["LCA: impede translação anterior e rotação interna da tíbia.", "LCP: impede translação posterior (lesão em painel/queda sobre joelho fletido).", "Colaterais: medial (valgo) e lateral (varo).", "Mecanismo de screw-home: rotação externa da tíbia no final da extensão (trava o joelho).", "Patela aumenta o braço de alavanca do quadríceps."] },
      { t: "Testes", itens: ["Lachman, gaveta anterior/posterior, pivot shift, estresse em varo/valgo, McMurray, Thessaly, apreensão patelar."] },
    ],
    fontes: ["LIPPERT"],
  },
  {
    id: "a-tornozelo", titulo: "Tornozelo e pé", area: "anatomia", grupo: "Membro inferior",
    tags: ["talocrural", "subtalar", "ltfa", "sindesmose", "arco plantar"],
    resumo: "Talocrural (dorsi/flexão plantar), subtalar (inversão/eversão); ligamentos laterais lesam mais que o deltoide.",
    tabela: {
      cab: ["Músculo", "Ação", "Inervação"],
      linhas: [
        ["Tibial anterior", "Dorsiflexão e inversão", "Fibular profundo (L4–L5)"],
        ["Gastrocnêmio/sóleo", "Flexão plantar", "Tibial (S1–S2)"],
        ["Fibulares longo e curto", "Eversão (estabilizadores laterais)", "Fibular superficial (L5–S1)"],
        ["Tibial posterior", "Inversão e sustentação do arco medial", "Tibial (L4–L5)"],
      ],
    },
    secoes: [{ t: "Testes", itens: ["Gaveta anterior, inclinação talar, squeeze test e rotação externa (sindesmose), Thompson (Aquiles), joelho-parede (dorsiflexão)."] }],
    fontes: ["LIPPERT"],
  },
];
