import type { Medida } from "./types";

const R = "joelho" as const;

export const JOELHO: Medida[] = [
  {
    id: "jo-incidencias", nome: "Incidências do joelho", regiao: R, grupo: "Incidências",
    resumo: "Posição e feixe de cada incidência de rotina.",
    tabela: {
      cab: ["Incidência", "Técnica", "Mostra"],
      linhas: [
        ["AP", "Supino, feixe a 90°", "Espaços, platôs, espinhas tibiais"],
        ["Perfil", "Supino, 30° de flexão", "Altura patelar, slope, tróclea"],
        ["Axial (sunrise)", "Prono, 115° de flexão, feixe 15° cefálico", "Patelofemoral"],
        ["Túnel (notch)", "Prono, 45° de flexão, feixe caudal", "Incisura, osteocondrite"],
        ["Merchant", "Supino, joelho a 45° na borda da mesa, feixe pela patelofemoral", "Congruência patelar"],
        ["Rosenberg", "PA com carga, 45° de flexão", "Pinçamento precoce (posterior)"],
      ],
    },
    tags: ["Rosenberg", "Merchant", "sunrise", "túnel"],
  },
  {
    id: "jo-perfil-verdadeiro", nome: "Perfil verdadeiro e linha de Blumensaat", regiao: R, grupo: "Incidências",
    inc: "Perfil com 30° de flexão",
    resumo: "Critério de qualidade do perfil e referência para a patela.",
    como: [
      "Côndilos femorais posteriores sobrepostos e alinhados com os da tíbia; fíbula levemente sobreposta à tíbia.",
      "Linha de Blumensaat: teto da incisura intercondilar. Com 30° de flexão, o polo inferior da patela fica sobre a projeção anterior dessa linha.",
    ],
    obs: ["Compartimento medial: côndilo maior e platô côncavo (côncavo-convexo, pivô estável). Lateral: côndilo menor e platô convexo (convexo-convexo, mais mobilidade)."],
    tags: ["Blumensaat", "perfil", "côndilos"],
  },
  // ——— Altura patelar ———
  {
    id: "jo-insall", nome: "Índice de Insall-Salvati", regiao: R, grupo: "Altura patelar",
    inc: "Perfil com ≥ 30° de flexão (tendão tenso)",
    resumo: "Comprimento do tendão patelar ÷ maior comprimento da patela.",
    valores: [
      { r: "Normal (LT/LP)", v: "0,8–1,2", t: "n" },
      { r: "Patela alta", v: "> 1,2", t: "a" },
      { r: "Patela baixa", v: "< 0,8", t: "a" },
    ],
    como: ["LT: do polo inferior da patela à inserção na tuberosidade tibial. LP: maior diâmetro sagital da patela."],
    obs: [
      "Algumas tabelas usam a razão invertida (LP/LT); aí alta < 0,8 e baixa > 1,2 — conferir qual razão foi usada.",
      "Menos reprodutível (inserção do tendão pouco nítida) e não muda após avanço da tuberosidade: Caton-Deschamps e Blackburne-Peel são melhores no pré-operatório.",
    ],
    tags: ["patela alta", "patela baixa", "Insall"],
  },
  {
    id: "jo-caton", nome: "Índice de Caton-Deschamps", regiao: R, grupo: "Altura patelar",
    inc: "Perfil com ≥ 30° de flexão",
    resumo: "Distância da borda inferior da superfície articular da patela ao ângulo anterossuperior da tíbia ÷ comprimento da superfície articular.",
    valores: [
      { r: "Normal (AT/AP)", v: "0,6–1,2 (ou 0,8–1,2)", t: "n" },
      { r: "Patela alta", v: "≥ 1,2", t: "a" },
      { r: "Patela baixa", v: "≤ 0,6", t: "a" },
    ],
    tags: ["patela alta", "Caton-Deschamps", "instabilidade patelar"],
  },
  {
    id: "jo-blackburne", nome: "Índice de Blackburne-Peel", regiao: R, grupo: "Altura patelar",
    inc: "Perfil com ≥ 30° de flexão",
    resumo: "Altura da borda inferior da superfície articular da patela acima da tangente ao platô ÷ comprimento da superfície articular.",
    valores: [
      { r: "Normal (A/B)", v: "0,8 (0,6–1,0)", t: "n" },
      { r: "Patela alta", v: "> 1,0", t: "a" },
    ],
    tags: ["patela alta", "Blackburne-Peel"],
  },
  {
    id: "jo-plato-patela", nome: "Ângulo platô-patela", regiao: R, grupo: "Altura patelar",
    inc: "Perfil",
    resumo: "Ângulo entre a linha do platô tibial e a linha que vai da borda posterior do platô ao polo inferior da superfície articular da patela.",
    valores: [{ r: "Normal", v: "20–30°", t: "n" }],
    tags: ["patela", "altura"],
  },
  // ——— Patelofemoral ———
  {
    id: "jo-sulco", nome: "Ângulo do sulco troclear", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "Axial (Merchant)",
    resumo: "Profundidade da tróclea.",
    valores: [
      { r: "Normal", v: "≤ 145°", t: "n" },
      { r: "Displasia troclear", v: "> 145°", t: "a" },
    ],
    como: ["Linhas do ponto mais profundo da tróclea até o ponto mais alto de cada côndilo."],
    tags: ["tróclea", "displasia troclear", "sulco"],
  },
  {
    id: "jo-congruencia", nome: "Ângulo de congruência patelofemoral (Merchant)", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "Axial (Merchant)",
    resumo: "Posição da crista patelar em relação à bissetriz do sulco.",
    valores: [
      { r: "Média", v: "−6° (desvio-padrão 11°)", t: "n" },
      { r: "Anormal", v: "> +16° (lateral)", t: "a" },
    ],
    como: [
      "Bissetriz do ângulo do sulco.",
      "Linha do fundo do sulco até o ponto mais baixo da crista patelar.",
      "Crista medial à bissetriz = negativo; lateral = positivo.",
    ],
    obs: ["Mais reprodutível que medidas lineares, que dependem da magnificação."],
    tags: ["congruência", "subluxação patelar", "Merchant"],
  },
  {
    id: "jo-desvio-axial", nome: "Deslocamento patelar axial linear", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "Axial",
    resumo: "Distância entre o fundo do sulco e o ponto mais baixo da crista patelar, sobre a linha dos côndilos.",
    valores: [
      { r: "Normal", v: "≤ 2 mm", t: "n" },
      { r: "Lateralização", v: "> 2 mm", t: "a" },
    ],
    obs: ["O valor absoluto depende da magnificação — difícil comparar entre serviços."],
    tags: ["lateralização", "patela"],
  },
  {
    id: "jo-tilt", nome: "Inclinação patelar (Grelsamer)", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "Axial ou TC",
    resumo: "Inclinação lateral da patela.",
    valores: [
      { r: "Normal", v: "2° ± 2°", t: "n" },
      { r: "Inclinação anormal", v: "> 5°", t: "a" },
    ],
    tags: ["tilt", "inclinação patelar"],
  },
  {
    id: "jo-laurin", nome: "Ângulo patelofemoral lateral (Laurin)", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "Axial com 20° de flexão",
    resumo: "Ângulo entre a tangente aos côndilos e a linha da faceta lateral da patela.",
    valores: [
      { r: "Normal", v: "ângulo agudo aberto para lateral", t: "n" },
      { r: "Instabilidade", v: "linhas paralelas ou ângulo aberto para medial", t: "a" },
    ],
    tags: ["Laurin", "instabilidade patelar"],
  },
  {
    id: "jo-bump", nome: "Bump troclear e sinal do cruzamento", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "Perfil verdadeiro",
    resumo: "Sinais de displasia troclear no perfil.",
    valores: [
      { r: "Bump — normal", v: "−0,8 ± 2,9 mm", t: "n" },
      { r: "Bump — anormal", v: "≥ 3 mm", t: "a" },
      { r: "Sinal do cruzamento", v: "assoalho da tróclea cruza a borda anterior dos côndilos", t: "a" },
    ],
    como: ["Normal: o assoalho da tróclea fica atrás da borda anterior dos côndilos e não ultrapassa a linha da cortical anterior do fêmur distal. Bump = distância do assoalho até essa linha."],
    tags: ["displasia troclear", "crossing sign", "Dejour"],
  },
  {
    id: "jo-tagt", nome: "Distância TA-GT", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "TC ou RM axial sobreposta",
    resumo: "Distância entre a tuberosidade tibial e o fundo do sulco troclear.",
    valores: [
      { r: "Normal", v: "< 20 mm", t: "n" },
      { r: "Anormal", v: "≥ 20 mm", t: "a" },
    ],
    como: ["Sobrepor o corte do sulco e o da tuberosidade; projetar os dois pontos numa linha tangente aos côndilos posteriores e medir a distância."],
    tags: ["TAGT", "TT-TG", "instabilidade patelar", "osteotomia da tuberosidade"],
  },
  {
    id: "jo-q", nome: "Ângulo Q", regiao: R, grupo: "Patelofemoral e tróclea",
    inc: "Exame físico",
    resumo: "Ângulo entre a linha espinha ilíaca anterossuperior–centro da patela e centro da patela–tuberosidade tibial.",
    valores: [
      { r: "Homens", v: "10–14°", t: "n" },
      { r: "Mulheres", v: "15–17°", t: "n" },
    ],
    obs: ["Maior nas mulheres pela pelve mais larga; quanto maior, maior a força lateral sobre a patela."],
    tags: ["ângulo Q", "patela"],
  },
  // ——— Alinhamento, slope ———
  {
    id: "jo-slope", nome: "Slope tibial posterior", regiao: R, grupo: "Slope e ligamentos",
    inc: "Perfil verdadeiro",
    resumo: "Inclinação posterior do platô — importa no LCA, osteotomias e artroplastia.",
    valores: [
      { r: "Normal", v: "0–18° (média 7°)", t: "n" },
    ],
    como: ["Perpendicular ao eixo da diáfise tibial × tangente ao platô medial; o ângulo entre elas é o slope."],
    tags: ["slope", "LCA", "osteotomia"],
  },
  {
    id: "jo-estresse-lcp", nome: "Radiografia de estresse posterior", regiao: R, grupo: "Slope e ligamentos",
    inc: "Perfil com estresse posterior",
    resumo: "Diferencia LCP isolado de lesão combinada.",
    valores: [
      { r: "LCP isolado", v: "10–12 mm de translação posterior", t: "l" },
      { r: "LCP + canto posterolateral", v: "> 12 mm", t: "a" },
    ],
    tags: ["LCP", "canto posterolateral", "estresse"],
  },
  {
    id: "jo-lcl-lcm", nome: "Pontos radiográficos do LCL e do LCM", regiao: R, grupo: "Slope e ligamentos", tipo: "cirurgia",
    inc: "AP e perfil",
    resumo: "Referências para reconstruções ligamentares.",
    como: [
      "LCL (colateral fibular) femoral: 1,4 mm proximal e 3,1 mm posterior ao epicôndilo lateral (≈ 18,5 mm proximal e posterior à inserção do poplíteo).",
      "LCL tibial (fibular): anterior ao meio da face lateral da cabeça da fíbula — a estrutura mais anterior que se insere na fíbula proximal.",
      "LCM superficial femoral: um pouco anterior à junção da linha da cortical posterior com a linha de Blumensaat.",
      "LCM superficial tibial: ~6 cm distal à linha articular.",
    ],
    tags: ["LCL", "LCM", "canto posterolateral", "reconstrução"],
  },
  {
    id: "jo-schottle", nome: "Ponto de Schöttle (LPFM femoral)", regiao: R, grupo: "Slope e ligamentos", tipo: "cirurgia",
    inc: "Perfil verdadeiro (côndilos posteriores sobrepostos)",
    resumo: "Localização radiográfica da fixação femoral do ligamento patelofemoral medial.",
    como: [
      "Linha 1: prolongamento da cortical posterior do fêmur.",
      "Linha 2: perpendicular à 1 pela origem posterior do côndilo medial; linha 3: perpendicular à 1 pelo ponto mais posterior da Blumensaat.",
      "Ponto: ~1 mm anterior à linha 1, ~2,5 mm distal à linha 2 e proximal à linha 3.",
    ],
    tags: ["LPFM", "MPFL", "Schöttle", "instabilidade patelar"],
  },
  {
    id: "jo-quadrantes", nome: "Quadrantes do fêmur distal no perfil", regiao: R, grupo: "Slope e ligamentos", tipo: "cirurgia",
    inc: "Perfil",
    resumo: "Sistema de referência para túneis e fixações femorais.",
    como: [
      "Linha 1: prolongamento da cortical posterior do fêmur. Linha 2: perpendicular à 1 pela parte posterior da Blumensaat.",
      "Quadrantes: 1 anteroproximal, 2 posteroproximal, 3 anterodistal, 4 posterodistal.",
      "No AP, a referência é a tangente aos côndilos distais; nela se localizam tubérculo adutor, LPFM, tubérculo do gastrocnêmio, POL, LCM superficial e epicôndilo medial.",
    ],
    obs: ["Túnel tibial do LCA: no perfil em hiperextensão deve ficar posterior à linha intercondilar; anterior a ela causa impacto do enxerto."],
    tags: ["túnel", "LCA", "LCP", "reconstrução"],
  },
  // ——— Pediatria ———
  {
    id: "jo-drennan", nome: "Ângulo metáfise-diáfise de Drennan", regiao: R, grupo: "Pediatria", ped: true,
    inc: "AP em ortostase",
    resumo: "Diferencia doença de Blount do arqueamento fisiológico.",
    valores: [
      { r: "Provável resolução", v: "< 10° (95% resolvem)", t: "n" },
      { r: "Zona cinzenta", v: "10–16°", t: "l" },
      { r: "Anormal", v: "> 16° (95% progridem)", t: "a" },
    ],
    como: ["Ângulo entre a linha que liga os bicos metafisários da tíbia proximal e a perpendicular ao eixo da diáfise tibial."],
    obs: ["Bico metafisário assimétrico ≠ arqueamento fisiológico (alargamento simétrico de fêmur e tíbia)."],
    tags: ["Blount", "geno varo", "Drennan"],
  },
  {
    id: "jo-fise-femoral", nome: "Espessura da fise femoral distal", regiao: R, grupo: "Pediatria", ped: true,
    inc: "AP do joelho",
    resumo: "Referência para suspeitar de lesão fisária.",
    valores: [{ r: "Normal até a adolescência", v: "3–5 mm", t: "n" }],
    tags: ["fise", "Salter-Harris"],
  },
  // ——— Fraturas ———
  {
    id: "jo-fx-patela", nome: "Fratura da patela — tratamento conservador", regiao: R, grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Quando não operar.",
    valores: [
      { r: "Desvio", v: "≤ 2–3 mm", t: "n" },
      { r: "Degrau articular", v: "≤ 1–2 mm", t: "n" },
      { r: "Mecanismo extensor", v: "íntegro (obrigatório)", t: "n" },
      { r: "Criança", v: "diástase < 3 mm e degrau < 3 mm", t: "n" },
    ],
    tags: ["patela", "extensor"],
  },
  {
    id: "jo-platô-colunas", nome: "Platô tibial — três colunas", regiao: R, grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    inc: "TC axial",
    resumo: "Divide o platô para planejar acessos e placas.",
    como: [
      "Ponto O no centro do joelho; A na tuberosidade anterior; D na crista posteromedial; C na borda anterior da cabeça da fíbula; B no sulco posterior do platô.",
      "Colunas: medial, lateral e posterior (esta dividida em posteromedial e posterolateral pela linha OB).",
    ],
    tags: ["platô tibial", "Luo", "três colunas"],
  },
  // ——— Artroplastia ———
  {
    id: "jo-atj-preop", nome: "Artroplastia do joelho — análise pré-operatória", regiao: R, grupo: "Artroplastia",
    resumo: "Oito passos da radiografia antes da prótese.",
    como: [
      "Eixo mecânico na panorâmica (o neutro bissecta o joelho).",
      "Magnitude da deformidade coronal (ângulo tibiofemoral).",
      "Ângulo de ressecção femoral = diferença entre eixo mecânico e anatômico do fêmur (5–7°).",
      "Corte tibial perpendicular ao eixo mecânico.",
      "Defeitos ósseos e osteófitos (AP com carga).",
      "Slope tibial (perfil).",
      "Altura patelar (perfil) — patela baixa dificulta a exposição.",
      "Desvio e inclinação patelar (axial).",
    ],
    obs: ["Avaliar também: rotação no AP (cerca de 1/4 da cabeça da fíbula coberta pela tíbia), carga, partes moles. Ausência de pinçamento só medial no perfil e côndilos posteriores alinhados sugerem LCA íntegro."],
    tags: ["ATJ", "prótese de joelho", "planejamento"],
  },
  {
    id: "jo-atj-template", nome: "Template da artroplastia do joelho", regiao: R, grupo: "Artroplastia",
    resumo: "Escolha de tamanho no perfil e no AP.",
    como: [
      "Fêmur no perfil: restaurar o offset condilar posterior e evitar notching anterior. Aumentar o offset posterior aperta o espaço em flexão.",
      "Fêmur e tíbia no AP: sem overhang medial ou lateral; com overhang, considerar diminuir o tamanho.",
      "Tíbia no perfil: tamanho sem overhang e slope próximo ao nativo (ou ao planejado).",
    ],
    obs: ["Componentes grandes demais causam dor pós-operatória, principalmente o overhang no plano medial-lateral."],
    tags: ["ATJ", "template", "overhang"],
  },
  {
    id: "jo-atj-posop", nome: "Artroplastia do joelho — avaliação pós-operatória", regiao: R, grupo: "Artroplastia",
    inc: "Panorâmica, AP, perfil e axial",
    resumo: "Alinhamento, tamanho, cimento, linha articular e patela.",
    valores: [
      { r: "Ângulo femoral (medial, eixo anatômico × côndilos)", v: "≈ 95° (5–7° de valgo; perpendicular ao eixo mecânico)", t: "n" },
      { r: "Ângulo tibial (medial)", v: "≈ 90° (perpendicular ao eixo)", t: "n" },
      { r: "Tibiofemoral", v: "soma ≈ 185° (≈ 5° de valgo)", t: "n" },
      { r: "Slope do componente", v: "3–7° (mais na retenção do LCP)", t: "n" },
      { r: "Manto de cimento", v: "≥ 2 mm, contínuo", t: "n" },
    ],
    como: [
      "Linha articular igual medial e lateral, ~1 cm acima da cabeça da fíbula (≈ 23 mm do epicôndilo lateral e 28 mm do medial).",
      "Tíbia rente às corticais: subdimensionada → afundamento; overhang anterior → dor; lateral → irritação do poplíteo.",
      "Fêmur: flange anterior rente à cortical (notching aumenta o risco de fratura supracondiliana); côndilo posterior recriando o offset.",
      "Altura patelar no perfil e patela centrada no axial.",
      "Zonas da Knee Society para radiolucências (fêmur e tíbia, AP e perfil).",
    ],
    obs: ["Slope excessivo deixa o joelho instável em flexão."],
    tags: ["ATJ", "pós-operatório", "alinhamento", "cimento"],
  },
  // ——— Implantes ———
  {
    id: "jo-haste-retrograda", nome: "Entrada da haste femoral retrógrada", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    inc: "Fluoroscopia AP e perfil",
    resumo: "Ponto alinhado ao canal medular nos dois planos.",
    como: [
      "AP: no centro da incisura intercondilar, levemente medial.",
      "Perfil: logo anterior à linha de Blumensaat (anterior à inserção femoral do LCP).",
    ],
    obs: ["Cuidado com a área do LCA, que não aparece no RX."],
    tags: ["haste retrógrada", "fêmur distal"],
  },
  {
    id: "jo-femur-distal-implantes", nome: "Fêmur distal — implantes e altura", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    resumo: "Geometria do fêmur distal e altura de cada implante em relação à articulação.",
    como: [
      "No axial o fêmur distal é trapezoidal: face anterior inclinada 10° de lateral para medial, parede lateral 10° e medial 25°. Parafusos mais longos que a largura vista no AP ficam salientes medialmente.",
      "Fio-guia da DCS ou da lâmina paralelo à linha articular, na metade anterior do côndilo, terço médio, em ângulo reto com a parede lateral.",
      "Parafusos de tração (fratura intercondiliana) sem invadir a janela do implante: 1,5 cm da articulação para a lâmina 95° e 2 cm para a DCS.",
    ],
    tabela: {
      cab: ["Implante", "Altura dos parafusos distais"],
      linhas: [["LISS / placa condilar", "Subcondral"], ["Lâmina 95°", "1,5–2 cm"], ["DCS 95°", "2 cm"], ["Haste retrógrada", "~6 cm (2 parafusos ou lâmina espiral)"]],
    },
    tags: ["fêmur distal", "DCS", "LISS", "lâmina 95"],
  },
  {
    id: "jo-haste-tibial", nome: "Entrada da haste intramedular da tíbia", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    inc: "Fluoroscopia AP e perfil",
    resumo: "Ponto alinhado ao canal, logo medial à eminência lateral.",
    como: [
      "AP: na borda medial do tendão patelar, ~no meio da metáfise proximal, na vertente medial da eminência tibial lateral (alinhado ao canal).",
      "Perfil: no ângulo entre o platô e a cortical anterior.",
    ],
    obs: ["Fraturas proximais tendem a valgo e procurvato: parafusos bloqueadores, entrada mais lateral, haste em semiextensão ou placa auxiliar."],
    tags: ["haste tibial", "suprapatelar", "bloqueador"],
  },
  {
    id: "jo-tracao-femur-distal", nome: "Tração esquelética no fêmur distal", regiao: R, grupo: "Tração e artrodese", tipo: "cirurgia",
    resumo: "Ponto do pino de Steinmann.",
    como: [
      "Método 1: cruzamento de uma linha posterior no nível do polo superior da patela com uma linha anterior à cabeça da fíbula.",
      "Método 2: ~3 cm proximal à articulação, no nível do côndilo lateral (limite superior do côndilo).",
      "Direção: de lateral para medial (métodos 1 e 2). Método 3: de medial para lateral no tubérculo adutor, levemente proximal ao epicôndilo.",
    ],
    obs: ["Não entrar na cápsula articular."],
    tags: ["tração", "Steinmann", "fêmur distal"],
  },
  {
    id: "jo-tracao-tibia", nome: "Tração esquelética na tíbia proximal", regiao: R, grupo: "Tração e artrodese", tipo: "cirurgia",
    resumo: "Permite controle rotacional e evita a articulação e a fise.",
    como: [
      "2 cm distal e 2 cm posterior à tuberosidade tibial.",
      "De lateral para medial, para proteger o nervo fibular comum.",
    ],
    tags: ["tração", "tíbia proximal"],
  },
  {
    id: "jo-artrodese", nome: "Posição de artrodese do joelho", regiao: R, grupo: "Tração e artrodese", tipo: "cirurgia",
    resumo: "Posição funcional recomendada.",
    valores: [
      { r: "Flexão", v: "10–15°", t: "i" },
      { r: "Valgo", v: "0–7°", t: "i" },
    ],
    tags: ["artrodese"],
  },
];
