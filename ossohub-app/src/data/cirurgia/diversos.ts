import type { Procedimento } from "./types";

// Seção IX — Diversos (cap. 51). Resumo com palavras próprias.

export const DIVERSOS: Procedimento[] = [
  {
    id: "pino-tracao-femur-tibia", cap: 51, titulo: "Pino de tração femoral distal e tibial proximal", original: "Femoral and Tibial Traction Pin Placement", secao: "diversos",
    autores: "Bradley R. Merk", paginas: "321–325",
    resumo: "Pino de Steinmann rosqueado sob anestesia local, perpendicular ao membro nos três planos: no fêmur de medial para lateral no tubérculo adutor; na tíbia de lateral para medial 1–2 cm anterior à cabeça da fíbula, na altura da tuberosidade.",
    indicacoes: [
      "Fratura ipsilateral da pelve, acetábulo ou fêmur — tratamento temporário ou definitivo.",
      "Relaxamento de partes moles antes de reconstrução com alongamento do membro.",
      "Auxílio à redução no tratamento cirúrgico de trauma femoral ou acetabular.",
    ],
    contraindicacoes: [
      "Infecção local ativa.",
      "Contaminação importante da ferida local.",
      "Envelope de partes moles inadequado.",
      "Lesão multiligamentar do joelho ou fratura da tíbia (evitar tração tibial).",
    ],
    preparo: [
      "Estabilização inicial pelo ATLS se necessário.",
      "RX em dois planos para identificar e classificar a lesão; avaliar todo o esqueleto (não se distrair com a lesão óbvia).",
      "Documentar exame neurovascular e de partes moles; testar os ligamentos do joelho antes do pino tibial, se a lesão permitir.",
    ],
    material: ["Caixa de pequena cirurgia", "Pinos de Steinmann rosqueados (3/16\" adulto; 3/32\" criança)", "Perfurador manual com mandril de Jacobs e protetor de partes moles", "Estribo de Steinmann ou arco de Kirschner", "Alicate corta-pino e protetores de ponta", "Fluoroscopia portátil (se disponível)"],
    posicao: ["Dorsal na maca ou mesa, coxim sob o joelho com a flexão prevista para a tração (20–30° para tração balanceada; 90° para tração 90-90 no fêmur)."],
    anestesia: ["Local no subcutâneo e subperiósteo dos dois lados (medial e lateral)."],
    etapas: [
      { t: "Pino femoral distal", figs: ["51–1", "51–2", "51–3", "51–4", "51–5"], passos: [
        "Fluoroscopia, se houver, para marcar uma linha paralela ao joelho (orientação e proteção da fise).",
        "Antissepsia ampla, campos e anestesia local medial e lateral.",
        "Incisão vertical medial 1–2 dedos acima do polo superior da patela, no tubérculo adutor; dissecção romba até a cortical medial.",
        "Pino rosqueado com perfurador manual pelo protetor, de medial para lateral (evita a artéria femoral superficial no canal dos adutores).",
        "Palpar a saída na cortical lateral e fazer uma pequena incisão para o pino passar sem tensão na pele.",
        "Gaze vaselinada e algodão nos orifícios; cortar e proteger as pontas; montar o estribo e instalar a tração.",
      ] },
      { t: "Pino tibial proximal", figs: ["51–6", "51–7", "51–8", "51–9"], passos: [
        "Coxim sob o joelho (em geral 20–30° de flexão); linha paralela ao joelho na fluoroscopia, se houver.",
        "Antissepsia, campos e anestesia local medial e lateral.",
        "Incisão vertical na altura da tuberosidade, 1–2 cm anterior à borda anterior da cabeça da fíbula; dissecção romba até a cortical lateral.",
        "Pino de lateral para medial (evita o nervo fibular comum) pelo protetor com perfurador manual.",
        "Palpar a saída medial, pequena incisão, curativo vaselinado, cortar e proteger as pontas, estribo e tração.",
      ] },
      { t: "Controle", passos: ["RX após o procedimento para conferir a orientação do pino e o alinhamento da fratura."] },
    ],
    perolas: [
      "Pino ortogonal ao eixo do membro nos três planos — essencial se a tração for prolongada ou definitiva.",
      "Perfurador elétrico em osso bom pode aquecer e necrosar o osso: preferir o manual.",
      "Osso osteopênico do idoso: posição mais diafisária fixa melhor.",
      "Haste femoral prevista: pino femoral bem anterior (deixa passar a haste) ou usar tração tibial.",
    ],
    evitar: [
      "Lesar partes moles e estruturas neurovasculares — dissecção romba até o osso.",
      "Pino oblíquo em qualquer plano.",
      "Pino femoral de lateral para medial (artéria femoral superficial).",
      "Pino tibial de medial para lateral (nervo fibular comum).",
      "Tensão na interface pino-pele.",
      "Lesão da fise na criança.",
    ],
    posop: [
      "Gaze vaselinada e algodão nos orifícios.",
      "Montar a tração esquelética adequada à lesão.",
      "RX de controle da orientação do pino e do alinhamento.",
    ],
    tags: ["tração esquelética", "pino de Steinmann", "tração femoral", "tração tibial", "trauma", "pronto-socorro"],
  },
];
