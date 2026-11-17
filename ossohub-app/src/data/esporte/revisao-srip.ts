import type { Nota, Topico } from "./types";

// Revisão com Comfort & Abrahamson — Sports Rehabilitation and Injury Prevention (nov/2026).
// Mesmo conceito: comparação (concorda / diverge / acrescenta) + temas novos.
// Texto resumido com palavras próprias; números citados como fatos, com a fonte.

export const NOTAS_SRIP: Record<string, Nota[]> = {
  "r-principios": [
    { fonte: "SRIP", tipo: "concorda", texto: "Reabilitação funcional progressiva e sistemática, avançando por critérios e integrando força, condicionamento e retorno gradual ao gesto esportivo." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Raciocínio clínico explícito em cada etapa: formular hipóteses, testar, reavaliar e ajustar — e considerar desde o início os fatores psicológicos (ver 'Aspectos psicológicos da lesão')." },
  ],
  "r-lca": [
    { fonte: "SRIP", tipo: "concorda", texto: "Progressão de cadeia cinética fechada para aberta e controle neuromuscular antes do impacto e da mudança de direção." },
  ],
  "l-lca": [
    { fonte: "SRIP", tipo: "concorda", texto: "Mesmos mecanismos (sem contato, valgo e rotação) e testes clínicos; ênfase em prevenção com controle neuromuscular." },
  ],
  "l-pfp": [
    { fonte: "SRIP", tipo: "concorda", texto: "Dor patelofemoral abordada com fortalecimento de quadril e quadríceps e correção do controle dinâmico do membro." },
  ],
  "l-entorse-tornozelo": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "No estresse em inversão: com o tornozelo em posição neutra testa-se o ligamento calcaneofibular; em flexão plantar, o talofibular anterior. Palpar sempre base e diáfise do 5º metatarso." },
    { fonte: "SRIP", tipo: "concorda", texto: "Carga precoce, propriocepção e prevenção de recidiva como pilares." },
  ],
  "l-pubalgia": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Diferenciais a considerar: 'hérnia do esportista' (virilha de Gilmore — deficiência da parede posterior do canal inguinal) e osteíte púbica (dor na sínfise, comum em esportes de chute e corrida)." },
  ],
  "l-manguito": [
    { fonte: "SRIP", tipo: "concorda", texto: "Avaliação da escápula e do controle motor junto com o manguito; reabilitação como 1ª linha." },
  ],
  "l-ombro-instab": [
    { fonte: "SRIP", tipo: "concorda", texto: "Instabilidade tratada com estabilizadores dinâmicos e progressão para posições de risco antes do retorno." },
  ],
  "l-punho-mao": [
    { fonte: "SRIP", tipo: "concorda", texto: "Escafoide, ligamento colateral ulnar do polegar e lesões tendíneas dos dedos como lesões que não podem ser subestimadas no esporte." },
  ],
  "l-fascite": [
    { fonte: "SRIP", tipo: "concorda", texto: "Alongamento específico, fortalecimento do pé e ajuste de calçado/carga." },
  ],
  "l-epicondilite": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Inclui o diagnóstico diferencial com o lado medial (epicondilalgia medial, frouxidão do ligamento medial e neurite ulnar) — ver tema novo 'Dor medial do cotovelo'." },
  ],
  "f-tendao": [
    { fonte: "SRIP", tipo: "diverge", texto: "Apresenta o treino excêntrico como principal estratégia para tendinopatias. Hoje programas de carga pesada e lenta (HSR) e isométricos têm resultados semelhantes ou melhores e costumam ser mais bem tolerados — por isso o site não coloca o excêntrico isolado como 1ª escolha." },
  ],
  "f-flexibilidade": [
    { fonte: "SRIP", tipo: "concorda", texto: "Alongamento estático imediatamente antes do esforço pode prejudicar desempenho; preferir aquecimento dinâmico." },
  ],
  "f-forca": [
    { fonte: "SRIP", tipo: "concorda", texto: "Mesmas variáveis de prescrição de força e condicionamento aplicadas à fase final da reabilitação." },
  ],
  "f-periodizacao": [
    { fonte: "SRIP", tipo: "concorda", texto: "Periodização também na reabilitação: organizar fases com objetivos e cargas planejadas, não apenas no treino do atleta saudável." },
  ],
  "f-triagem": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Análise de necessidades do esporte (demandas físicas, padrões de lesão, posição do atleta) + triagem individual antes de definir o programa." },
    { fonte: "SRIP", tipo: "diverge", texto: "Testes de triagem de movimento (ex.: Functional Movement Screen) são citados para identificar déficits, mas a capacidade de prever lesões individualmente é limitada — usar para orientar o treino, não para 'prever' quem vai se lesionar." },
  ],
  "f-modalidades": [
    { fonte: "SRIP", tipo: "diverge", texto: "Cita aplicação de gelo por 20–30 min (ou ciclos curtos de 5–10 min), tempos diferentes dos 10–20 min indicados aqui; ambos visam analgesia — evitar contato direto do gelo com a pele." },
  ],
  "r-nervo": [
    { fonte: "SRIP", tipo: "concorda", texto: "Mesma classificação (neuropraxia, axonotmese, neurotmese) orientando prognóstico e reabilitação." },
  ],
  "r-fratura": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Linha do tempo da consolidação: hematoma/inflamação na 1ª semana, calo mole nas semanas 2–3, calo duro entre as semanas 4 e 16 e remodelação ao longo de meses a anos. Anti-inflamatórios podem prejudicar a consolidação." },
  ],
  "n-proteina": [
    { fonte: "SRIP", tipo: "diverge", texto: "Indica 1,2–2,0 g/kg/dia para atletas (1,7–2,0 g/kg no início de treino de força) — limite inferior um pouco abaixo do 1,4 g/kg usado aqui." },
  ],
  "n-cho": [
    { fonte: "SRIP", tipo: "concorda", texto: "Carboidrato logo após o exercício para repor glicogênio e ingestão diária de 5–7 g/kg em cargas moderadas." },
  ],
  "n-lesao": [
    { fonte: "SRIP", tipo: "concorda", texto: "Nutrição adequada em energia e proteína é parte da reabilitação, não um complemento." },
  ],
  "l-concussao": [
    { fonte: "SRIP", tipo: "concorda", texto: "Retorno somente sem sintomas e de forma gradual." },
  ],
};

export const NOVOS_SRIP: Topico[] = [
  {
    id: "r-agudo", titulo: "Manejo agudo da lesão (PRICE → PEACE & LOVE)", area: "reabilitacao", grupo: "Geral",
    tags: ["price", "police", "peace and love", "gelo", "compressão", "lesão aguda", "primeiros socorros"],
    resumo: "Primeiras 72 h: proteger, elevar e comprimir; depois carga progressiva. O papel do gelo e dos anti-inflamatórios foi revisto.",
    secoes: [
      { t: "Primeiros dias (PEACE)", itens: ["Proteção: evitar movimentos que aumentem a dor por 1–3 dias.", "Elevação do membro acima do coração.", "Evitar anti-inflamatórios nas primeiras horas/dias — a inflamação faz parte do reparo.", "Compressão com faixa para controlar edema.", "Educação: explicar o tempo de recuperação e evitar tratamentos passivos desnecessários."] },
      { t: "Depois (LOVE)", itens: ["Carga: retomar movimento e apoio conforme a dor permitir.", "Otimismo: expectativa positiva melhora o desfecho.", "Vascularização: exercício aeróbio sem dor.", "Exercício: força, mobilidade e propriocepção progressivos."] },
      { t: "Sinais de alerta", itens: ["Deformidade, incapacidade total de apoiar, dor óssea localizada, dormência, perda de pulso ou edema tenso e progressivo → avaliação imediata (fratura, luxação, síndrome compartimental)."] },
    ],
    notas: [
      { fonte: "SRIP", tipo: "diverge", texto: "Usa o protocolo clássico PRICE (proteção, repouso, gelo, compressão e elevação), com gelo como componente central. Diretrizes mais recentes (PEACE & LOVE, 2019) retiram o gelo do centro e enfatizam carga precoce — por isso o site segue o modelo mais novo." },
      { fonte: "SRIP", tipo: "concorda", texto: "Anti-inflamatórios devem ser evitados no início porque o processo inflamatório é necessário para a cicatrização; compressão ajuda a controlar o edema." },
    ],
    ver: ["r-cicatrizacao"],
    fontes: ["SRIP", "PTR"],
  },
  {
    id: "r-cicatrizacao", titulo: "Cicatrização dos tecidos: fases e tempos", area: "reabilitacao", grupo: "Geral",
    tags: ["cicatrização", "inflamação", "proliferação", "remodelação", "músculo", "tendão", "ligamento", "osso"],
    resumo: "Inflamação (dias) → proliferação/reparo (semanas) → remodelação (meses). A carga deve respeitar a fase de cada tecido.",
    secoes: [
      { t: "Fases gerais", itens: ["Inflamação: 0–5 dias — dor, calor, edema; proteger sem imobilizar demais.", "Proliferação/reparo: ~5 dias a 6 semanas — colágeno novo e frágil; carga leve e progressiva orienta as fibras.", "Remodelação: 6 semanas a 12+ meses — o tecido ganha força conforme a carga aplicada."] },
      { t: "Por tecido", itens: ["Músculo: boa vascularização; remodelação começa cedo e a maioria das lesões leves recupera em 1–3 semanas.", "Tendão: metabolismo lento; adaptação à carga leva meses — explica a reabilitação longa das tendinopatias.", "Ligamento: após 1 ano ainda pode não recuperar toda a resistência original; colágeno cicatricial é menos organizado.", "Osso: hematoma (semana 1), calo mole (semanas 2–3), calo duro (semanas 4–16) e remodelação por meses a anos.", "Nervo periférico: regenera ~1 mm/dia quando a bainha está preservada."] },
      { t: "Implicações práticas", itens: ["Avançar a carga conforme a fase e os sinais clínicos (dor, edema, função), não só pelo calendário.", "Imobilização prolongada atrasa a recuperação e causa atrofia e rigidez."] },
    ],
    ver: ["r-agudo", "b-tecidos"],
    fontes: ["SRIP", "WHITING"],
  },
  {
    id: "r-psicologia", titulo: "Aspectos psicológicos da lesão e da reabilitação", area: "reabilitacao", grupo: "Geral",
    tags: ["psicologia", "medo de nova lesão", "cinesiofobia", "metas", "imagética", "retorno ao esporte"],
    resumo: "A lesão gera estresse e medo; metas, autoconversa positiva, imagética e apoio social melhoram adesão e retorno.",
    secoes: [
      { t: "Reações comuns", itens: ["Negação, raiva, frustração, tristeza e, por fim, aceitação — o atleta pode oscilar entre elas.", "Medo de nova lesão (cinesiofobia) é causa frequente de não voltar ao nível anterior, mesmo com o corpo pronto."] },
      { t: "Estratégias", itens: ["Metas: de curto, médio e longo prazo, específicas e mensuráveis, combinadas com o atleta.", "Autoconversa (self-talk) positiva e estratégias de enfrentamento.", "Imagética: ensaiar mentalmente o gesto esportivo durante a fase sem treino.", "Manter o atleta ligado à equipe (apoio social).", "Avaliar prontidão psicológica antes do retorno (ex.: ACL-RSI, TSK) e encaminhar à psicologia do esporte quando necessário."] },
    ],
    ver: ["r-principios"],
    fontes: ["SRIP"],
  },
  {
    id: "l-cotovelo-medial", titulo: "Dor medial do cotovelo (epicondilalgia medial, ligamento colateral ulnar, neurite ulnar)", area: "lesoes", grupo: "Cotovelo e punho",
    tags: ["golfista", "epicondilite medial", "ligamento colateral ulnar", "arremessador", "nervo ulnar", "tinel"],
    resumo: "Três causas que se confundem no lado medial — tendões flexores-pronadores, ligamento colateral ulnar e nervo ulnar.",
    secoes: [
      { t: "Diferenciar", itens: ["Epicondilalgia medial (cotovelo de golfista): dor à flexão do punho e pronação resistidas.", "Lesão/frouxidão do ligamento colateral ulnar (arremessadores): dor no estresse em valgo a 20–30° de flexão; teste de 'milking' e estresse em valgo em movimento.", "Neurite ulnar: Tinel no túnel cubital, parestesia no 4º e 5º dedos, piora com flexão prolongada do cotovelo."] },
      { t: "Conduta", itens: ["Repouso relativo do gesto, correção técnica e da cadeia cinética (pernas e tronco no arremesso).", "Fortalecimento progressivo de flexores-pronadores, escápula e manguito.", "Ruptura do ligamento colateral ulnar em arremessador de alto nível: considerar reconstrução (cirurgia de Tommy John)."] },
    ],
    ver: ["b-arremesso", "l-epicondilite"],
    fontes: ["SRIP", "PSM", "HODLER"],
  },
  {
    id: "l-antepe", titulo: "Dor no antepé do atleta (sesamoides, metatarsalgia, neuroma de Morton, 5º metatarso)", area: "lesoes", grupo: "Tornozelo e pé",
    tags: ["sesamoidite", "metatarsalgia", "neuroma de morton", "jones", "5º metatarso", "pé"],
    resumo: "Dor sob o 1º metatarso, entre os metatarsos ou na base do 5º — cada uma com conduta própria.",
    secoes: [
      { t: "Principais causas", itens: ["Sesamoidite/fratura de sesamoide: dor sob a cabeça do 1º metatarso, piora na impulsão; RX/RM para diferenciar fratura de osso bipartido.", "Neuroma de Morton (metatarsalgia de Morton): dor/queimação entre o 3º e 4º dedos, piora com sapato apertado; teste de compressão lateral do antepé.", "Fratura da base do 5º metatarso: avulsão (zona 1, consolida bem) vs fratura de Jones (zona 2, risco de não consolidação — avaliação ortopédica)."] },
      { t: "Conduta", itens: ["Descarga com palmilha (barra retrocapital, apoio para sesamoide), calçado com antepé largo e solado rígido.", "Ajuste de volume de corrida/salto; fortalecimento de musculatura intrínseca do pé.", "Infiltração ou cirurgia nos casos refratários (neuroma)."] },
    ],
    fontes: ["SRIP", "HODLER"],
  },
];
