import type { Medida } from "./types";

export const OMBRO: Medida[] = [
  {
    id: "om-glenoide", nome: "Versão e inclinação da glenoide", regiao: "ombro", grupo: "Glenoide e escápula",
    inc: "TC axial (versão) e AP (inclinação)",
    resumo: "Orientação normal da glenoide, do úmero e da escápula.",
    valores: [
      { r: "Inclinação superior da glenoide", v: "média 5°", t: "n" },
      { r: "Versão da glenoide", v: "de 7° de retroversão a 10° de anteversão (em geral ~3–5° de retroversão)", t: "n" },
      { r: "Retroversão do úmero", v: "20–30°", t: "n" },
      { r: "Escápula no tórax", v: "antevertida ~30°", t: "i" },
    ],
    como: ["Versão: linha pelo eixo da escápula × linha da borda anterior à posterior da glenoide (TC)."],
    obs: ["Na artrose há desgaste posterior e retroversão aumentada — importante no planejamento da artroplastia."],
    tags: ["glenoide", "versão", "artroplastia do ombro"],
  },
  {
    id: "om-gpa", nome: "Ângulo glenopolar (GPA)", regiao: "ombro", grupo: "Glenoide e escápula",
    inc: "AP verdadeiro da escápula",
    resumo: "Rotação da glenoide no plano da escápula — usado nas fraturas do colo e do corpo.",
    valores: [{ r: "Normal", v: "30–45°", t: "n" }],
    como: ["Ângulo entre a linha do polo superior ao polo inferior da glenoide e a linha do polo superior ao ângulo inferior da escápula."],
    tags: ["glenopolar", "fratura da escápula"],
  },
  {
    id: "om-inclinacao-escapular", nome: "Inclinação escapular", regiao: "ombro", grupo: "Glenoide e escápula",
    inc: "AP",
    resumo: "Ângulo crítico de inclinação da escápula para a estabilidade inferior.",
    valores: [
      { r: "Faixa em > 90% dos ombros", v: "0–30°", t: "n" },
      { r: "Abaixo da faixa", v: "glenoumeral instável, propensa a luxação inferior", t: "a" },
    ],
    tags: ["instabilidade", "escápula"],
  },
  {
    id: "om-acromioumeral", nome: "Distância acromioumeral", regiao: "ombro", grupo: "Glenoide e escápula",
    inc: "AP",
    resumo: "Espaço subacromial — sinal indireto de lesão maciça do manguito.",
    valores: [
      { r: "Normal (média)", v: "≈ 1,05 cm", t: "n" },
      { r: "Anormal", v: "≤ 7 mm", t: "a" },
    ],
    tags: ["manguito rotador", "subacromial", "ascensão da cabeça"],
  },
  {
    id: "om-ac-cc", nome: "Acromioclavicular e coracoclavicular", regiao: "ombro", grupo: "Glenoide e escápula",
    inc: "AP / Zanca",
    resumo: "Distâncias normais e posição dos ligamentos coracoclaviculares.",
    valores: [
      { r: "Espaço AC", v: "0,3–0,8 cm", t: "n" },
      { r: "Distância coracoclavicular", v: "1,0–1,3 cm", t: "n" },
    ],
    obs: ["Os ligamentos coracoclaviculares impedem a subida da clavícula: trapezoide a ~25–30 mm e conoide a ~45 mm da extremidade da clavícula — referência para túneis na reconstrução."],
    tags: ["AC", "Rockwood", "coracoclavicular", "luxação acromioclavicular"],
  },
  {
    id: "om-aas", nome: "Ângulo axial do ombro (AAS)", regiao: "ombro", grupo: "Úmero proximal",
    inc: "AP",
    resumo: "Ângulo cabeça-diáfise do úmero proximal.",
    valores: [
      { r: "Normal", v: "≈ 60°", t: "n" },
      { r: "Úmero varo", v: "< 40°", t: "a" },
    ],
    tags: ["úmero proximal", "varo"],
  },
  {
    id: "om-cortical-umero", nome: "Espessura cortical da diáfise do úmero", regiao: "ombro", grupo: "Úmero proximal",
    inc: "AP do úmero",
    resumo: "Estimativa simples da qualidade óssea.",
    como: [
      "Nível 1: ponto mais proximal da diáfise em que as bordas endosteais medial e lateral ficam paralelas.",
      "Nível 2: 20 mm abaixo do nível 1.",
      "Somar as corticais medial e lateral (ou relacionar com o diâmetro) nos dois níveis.",
    ],
    obs: ["Corticais finas indicam baixa densidade mineral — pesa na escolha do implante."],
    tags: ["osteoporose", "úmero"],
  },
  // ——— Fraturas ———
  {
    id: "om-fx-adulto", nome: "Cintura escapular e úmero — desvio aceitável (adulto)", regiao: "ombro", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Limites clássicos para tratamento conservador.",
    valores: [
      { r: "Clavícula (diáfise)", v: "cirurgia é discutível se desvio > 100%, cominuição em Z ou encurtamento > 1–2 cm", t: "l" },
      { r: "Glenoide intra-articular", v: "< 25% da superfície e degrau < 5 mm", t: "n" },
      { r: "Colo da escápula", v: "< 40° de angulação ou < 1 cm de translação medial", t: "n" },
      { r: "Tubérculo maior", v: "< 5–10 mm (5 mm se o desvio é superior)", t: "n" },
      { r: "Úmero proximal (Neer)", v: "parte desviada = > 1 cm ou > 45°", t: "a" },
      { r: "Diáfise do úmero", v: "até 20° anterior, 30° de varo e 3 cm de baioneta", t: "n" },
    ],
    obs: ["Nervo radial: ~14–15 cm proximal ao epicôndilo lateral ou ~20–21 cm proximal ao medial."],
    tags: ["clavícula", "úmero proximal", "Neer", "diáfise do úmero", "glenoide"],
  },
  {
    id: "om-fx-ped", nome: "Úmero na criança — desvio aceitável", regiao: "ombro", grupo: "Fraturas: desvio aceitável", tipo: "fratura", ped: true,
    resumo: "O úmero proximal remodela muito; a diáfise também.",
    tabela: {
      cab: ["Local", "Idade", "Angulação", "Translação / rotação"],
      linhas: [
        ["Úmero proximal", "1 a 4 anos", "70°", "qualquer"],
        ["Úmero proximal", "5 a 12 anos", "40–45°", "50%"],
        ["Úmero proximal", "> 12 anos", "15–20°", "< 30%"],
        ["Diáfise do úmero", "< 5 anos", "até 70°", "rotação < 15°; 1–2 cm de encurtamento"],
        ["Diáfise do úmero", "5 a 12 anos", "40–70°", "idem"],
        ["Diáfise do úmero", "> 12 anos", "< 40°", "idem"],
      ],
    },
    tags: ["úmero proximal", "pediatria", "remodelação"],
  },
  // ——— Implantes ———
  {
    id: "om-haste-umero", nome: "Haste e placa no úmero — pontos de referência", regiao: "ombro", grupo: "Implantes, fixador e artrodese", tipo: "cirurgia",
    resumo: "Entradas anterógrada e retrógrada e altura da placa proximal.",
    como: [
      "Anterógrada: no sulco medial ao tubérculo maior (haste reta mais medial, na cartilagem; haste curva mais lateral).",
      "Retrógrada: triângulo dorsal do úmero distal, ~2,5 cm acima da fossa olecraniana, sem abrir a cápsula; três furos (3,2 → 4,5 → 8,5 mm) formando janela de ~10 × 20 mm, oblíqua para seguir o canal.",
      "Placa do úmero proximal: topo da placa 5–8 mm abaixo do topo do tubérculo maior.",
    ],
    tags: ["haste de úmero", "placa", "PHILOS"],
  },
  {
    id: "om-fixador", nome: "Fixador externo no úmero — zonas seguras", regiao: "ombro", grupo: "Implantes, fixador e artrodese", tipo: "cirurgia",
    resumo: "Corredores para pinos no úmero.",
    tabela: {
      cab: ["Segmento", "Zona segura", "Perigo"],
      linhas: [
        ["Terço proximal", "Lateral (anterolateral ou posterolateral), pelo deltoide", "Cabeça longa do bíceps, feixe medial, nervo axilar (~5 cm abaixo do tubérculo maior)"],
        ["Terço distal", "Posterior (posterolateral ou posteromedial), pelo tríceps, sem entrar na fossa olecraniana", "Profundo demais: nervo mediano e artéria braquial"],
      ],
    },
    obs: ["Terço médio: evitar pinos pelo trajeto do nervo radial (abrir e ver)."],
    tags: ["fixador externo", "úmero"],
  },
  {
    id: "om-artrodese", nome: "Posição de artrodese do ombro", regiao: "ombro", grupo: "Implantes, fixador e artrodese", tipo: "cirurgia",
    resumo: "Posição funcional recomendada.",
    valores: [
      { r: "Flexão anterior", v: "20–25°", t: "i" },
      { r: "Abdução", v: "15–20°", t: "i" },
      { r: "Rotação interna", v: "40–50°", t: "i" },
    ],
    tags: ["artrodese"],
  },
];

export const COTOVELO: Medida[] = [
  {
    id: "co-carregamento", nome: "Ângulo de carregamento (cubital)", regiao: "cotovelo", grupo: "Alinhamento",
    inc: "AP do cotovelo em extensão",
    resumo: "Valgo fisiológico do cotovelo.",
    valores: [
      { r: "Normal", v: "5–15° (em geral 10–15°)", t: "n" },
      { r: "Oppenheim (úmero-cotovelo-punho) — normal", v: "≈ 10°", t: "n" },
      { r: "Cúbito varo", v: "< 5°", t: "a" },
      { r: "Cúbito valgo", v: "> 15°", t: "a" },
      { r: "Ângulo úmero-ulnar (média)", v: "13° mulheres · 11° homens", t: "i" },
    ],
    tags: ["carrying angle", "cúbito varo", "supracondiliana"],
  },
  {
    id: "co-baumann", nome: "Ângulo de Baumann", regiao: "cotovelo", grupo: "Alinhamento", ped: true,
    inc: "AP do úmero distal",
    resumo: "Ângulo entre a fise do capítulo e o eixo do úmero — controle da redução da supracondiliana.",
    valores: [
      { r: "Normal", v: "≈ 75–80° (comparar com o lado sadio)", t: "n" },
    ],
    obs: [
      "90° − Baumann ≈ ângulo de carregamento.",
      "Diferença para o lado sadio indica varo ou valgo residual.",
    ],
    tags: ["Baumann", "supracondiliana", "pediatria"],
  },
  {
    id: "co-metafise-diafise", nome: "Ângulo metáfise-diáfise do úmero distal", regiao: "cotovelo", grupo: "Alinhamento", ped: true,
    inc: "AP",
    resumo: "Bissetriz da diáfise × linha pelos pontos mais largos da metáfise distal.",
    valores: [{ r: "Normal", v: "34–42°", t: "n" }],
    obs: ["Alternativa ao Baumann quando a fise do capítulo é difícil de ver."],
    tags: ["supracondiliana", "metáfise"],
  },
  {
    id: "co-eixo-troclear", nome: "Eixo troclear e colunas do úmero distal", regiao: "cotovelo", grupo: "Alinhamento",
    inc: "AP e perfil",
    resumo: "Anatomia de referência para fraturas e implantes.",
    valores: [
      { r: "Eixo troclear × eixo do úmero", v: "4–8° de valgo", t: "n" },
      { r: "Rotação do eixo troclear", v: "3–8° de rotação interna", t: "n" },
      { r: "Fim do canal medular", v: "2–3 cm acima da fossa olecraniana", t: "i" },
    ],
    obs: ["O úmero distal tem colunas medial e lateral unidas pelo \"arco\" da tróclea; a superfície articular projeta-se à frente da diáfise (~40° no perfil)."],
    tags: ["tróclea", "coluna medial", "coluna lateral"],
  },
  {
    id: "co-linhas-perfil", nome: "Linhas do cotovelo no perfil", regiao: "cotovelo", grupo: "Linhas",
    inc: "Perfil verdadeiro",
    resumo: "Linha umeral anterior, radiocapitelar, lágrima e coronoide.",
    como: [
      "Perfil verdadeiro: a \"lágrima\" (ampulheta) das fossas coronoide/olecraniana bem definida.",
      "Linha umeral anterior: deve cruzar o terço médio do capítulo.",
      "Linha radiocapitelar: eixo do rádio proximal passa pelo capítulo em todas as incidências.",
      "Linha do coronoide (ao longo da borda anterior do coronoide): toca levemente a parte anterior do côndilo lateral.",
    ],
    obs: ["Capítulo angulado ~30° para frente (úmero distal em \"taco de hóquei\"); a fise do capítulo é mais larga atrás."],
    tags: ["linha umeral anterior", "radiocapitelar", "Monteggia", "supracondiliana"],
  },
  {
    id: "co-cabeca-radio", nome: "Angulação normal da cabeça do rádio", regiao: "cotovelo", grupo: "Linhas",
    inc: "AP e perfil",
    resumo: "Inclinação fisiológica da cabeça em relação ao colo.",
    valores: [
      { r: "Lateral", v: "0–15°", t: "n" },
      { r: "Sagital", v: "10° anterior a 5° posterior", t: "n" },
    ],
    tags: ["cabeça do rádio", "colo do rádio"],
  },
  {
    id: "co-critol", nome: "Ossificação do cotovelo (CRITOL)", regiao: "cotovelo", grupo: "Pediatria", ped: true,
    inc: "AP e perfil",
    resumo: "Ordem de aparecimento dos núcleos secundários.",
    tabela: {
      cab: ["Núcleo", "Idade aproximada"],
      linhas: [["C — capítulo", "1–2 anos"], ["R — cabeça do rádio", "3–4 anos"], ["I — epicôndilo medial (interno)", "5–6 anos"], ["T — tróclea", "7–8 anos"], ["O — olécrano", "9–10 anos"], ["L — epicôndilo lateral", "11–12 anos"]],
      nota: "Regra prática: 2, 4, 6, 8, 10, 12 anos. Tróclea visível sem epicôndilo medial = epicôndilo deslocado para dentro da articulação.",
    },
    tags: ["CRITOL", "ossificação", "epicôndilo medial"],
  },
  // ——— Fraturas ———
  {
    id: "co-fx", nome: "Cotovelo e cabeça do rádio — desvio aceitável", regiao: "cotovelo", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Critérios no adulto e na criança.",
    valores: [
      { r: "Adulto: instável em > 30° de flexão", v: "considerar cirurgia", t: "a" },
      { r: "Criança: côndilo lateral", v: "< 2 mm", t: "n" },
      { r: "Criança: cabeça/colo do rádio tipo I", v: "< 30° → conservador", t: "n" },
      { r: "Criança: tipo II", v: "30–60° → tentar conservador", t: "l" },
      { r: "Criança: tipo III", v: "> 60° → cirurgia", t: "a" },
      { r: "Criança: translação da cabeça", v: "< 4 mm", t: "n" },
    ],
    obs: ["Bom prognóstico na criança: angulação inicial < 30°, desvio < 3 mm, < 10 anos, lesão isolada, pouca lesão de partes moles, tratamento precoce e fechado, boa redução."],
    tags: ["côndilo lateral", "colo do rádio", "pediatria", "instabilidade"],
  },
  // ——— Cirurgia ———
  {
    id: "co-olecrano", nome: "Osteotomia do olécrano e banda de tensão", regiao: "cotovelo", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    resumo: "Onde cortar e onde furar.",
    como: [
      "Osteotomia em chevron (V com ápice distal), entrando na \"área nua\": ponto entre a ponta do olécrano e o coronoide sem cartilagem.",
      "Banda de tensão: furo transverso ~5 mm da cortical dorsal, ~40 mm distal à fratura/osteotomia.",
    ],
    tags: ["olécrano", "chevron", "banda de tensão"],
  },
  {
    id: "co-protese-cabeca", nome: "Comprimento da prótese de cabeça do rádio", regiao: "cotovelo", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    inc: "AP do cotovelo",
    resumo: "Evitar \"overstuffing\" da radiocapitelar.",
    como: [
      "Referência: borda proximal da incisura radial da ulna — a superfície da prótese não deve ultrapassá-la.",
      "Ulnoumeral medial paralela e congruente = comprimento correto.",
      "Ulnoumeral lateral alargada (divergente) = prótese longa demais.",
    ],
    tags: ["artroplastia da cabeça do rádio", "overstuffing"],
  },
  {
    id: "co-tracao-olecrano", nome: "Tração esquelética no olécrano", regiao: "cotovelo", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    resumo: "Ponto e direção do fio.",
    como: [
      "~3 cm distal à ponta do olécrano, logo abaixo da borda subcutânea da ulna (evita a articulação e a epífise).",
      "Fio de Kirschner de medial para lateral (proteger o nervo ulnar), perpendicular ao eixo da ulna.",
    ],
    tags: ["tração", "olécrano"],
  },
  {
    id: "co-fixador-antebraco", nome: "Fixador externo no antebraço proximal", regiao: "cotovelo", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    resumo: "Corredores seguros.",
    tabela: {
      cab: ["Osso", "Zona segura", "Perigo"],
      linhas: [
        ["Ulna", "Cortical subcutânea da borda posterior, entre as massas extensora e flexora", "—"],
        ["Rádio", "Distal ao colo, entre o extensor ulnar do carpo e o grupo móvel (wad)", "Nervo interósseo posterior no supinador"],
      ],
    },
    tags: ["fixador externo", "antebraço"],
  },
  {
    id: "co-artrodese", nome: "Posição de artrodese do cotovelo", regiao: "cotovelo", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    resumo: "Posição funcional recomendada.",
    valores: [
      { r: "Unilateral", v: "90° de flexão", t: "i" },
      { r: "Bilateral", v: "um em ~110° (levar à boca) e outro em ~65° (higiene perineal)", t: "i" },
    ],
    tags: ["artrodese"],
  },
];

export const PUNHO_MAO: Medida[] = [
  // ——— Rádio distal ———
  {
    id: "pm-regra-11", nome: "Rádio distal — regra dos 11", regiao: "punho-mao", grupo: "Rádio distal",
    inc: "PA e perfil do punho",
    resumo: "Três parâmetros que definem a redução.",
    valores: [
      { r: "Altura radial (PA)", v: "11 mm (8–18)", t: "n" },
      { r: "Inclinação radial (PA)", v: "22° (15–25)", t: "n" },
      { r: "Inclinação volar (perfil)", v: "11° (0–20; neutro aceitável)", t: "n" },
    ],
    como: [
      "Altura: distância entre a ponta da estiloide radial e a superfície articular da ulna, sobre o eixo do rádio.",
      "Inclinação radial: linha da ponta da estiloide à borda ulnar do rádio × perpendicular ao eixo.",
      "Inclinação volar: linha entre os rebordos dorsal e volar × perpendicular ao eixo, no perfil.",
    ],
    tags: ["rádio distal", "Colles", "redução", "regra dos 11"],
  },
  {
    id: "pm-variancia", nome: "Variância ulnar", regiao: "punho-mao", grupo: "Rádio distal",
    inc: "PA neutro (ombro 90° abduzido, cotovelo 90°)",
    resumo: "Comprimento da ulna em relação ao rádio no nível do semilunar.",
    valores: [
      { r: "Neutra", v: "diferença ≤ 2 mm", t: "n" },
      { r: "Positiva", v: "ulna > 2 mm mais longa", t: "a" },
      { r: "Negativa", v: "ulna > 2 mm mais curta", t: "a" },
    ],
    como: ["Gelberman: perpendicular ao eixo do rádio pelo ponto médio entre as margens da fossa do semilunar; medir até a superfície articular da ulna."],
    obs: ["Negativa associa-se a Kienböck; positiva a impacto ulnocárpico e lesão da TFCC. Ajuda também a avaliar instabilidade radioulnar distal após fratura do rádio."],
    tags: ["variância ulnar", "Kienböck", "TFCC", "impacto ulnocárpico"],
  },
  {
    id: "pm-radial-shift", nome: "Desvio radial (radial shift)", regiao: "punho-mao", grupo: "Rádio distal",
    inc: "PA comparativo",
    resumo: "Translação lateral do fragmento distal comparada ao punho sadio.",
    valores: [{ r: "Aceitável", v: "diferença ≤ 1 mm", t: "n" }],
    tags: ["rádio distal", "translação"],
  },
  {
    id: "pm-placa-volar", nome: "Posição da placa volar (Soong)", regiao: "punho-mao", grupo: "Rádio distal", tipo: "cirurgia",
    inc: "Perfil verdadeiro (inclinação do facet)",
    resumo: "Placa saliente além da linha crítica volar aumenta o risco de ruptura do flexor longo do polegar.",
    como: [
      "Linha crítica volar: tangente à cortical volar da diáfise, prolongada até o rebordo.",
      "Placa–linha crítica (PCL): negativo se a placa está dorsal à linha, positivo se volar.",
      "Placa–rebordo volar (PVR): positivo se a placa está proximal ao rebordo, negativo se distal.",
    ],
    obs: ["Placa volar à linha crítica ou distal ao rebordo = proeminente: considerar retirada após a consolidação."],
    tags: ["placa volar", "FLP", "Soong", "ruptura tendínea"],
  },
  {
    id: "pm-gesso", nome: "Índice de Hillingdon (gesso)", regiao: "punho-mao", grupo: "Rádio distal", tipo: "fratura",
    inc: "PA e perfil com gesso",
    resumo: "Qualidade da moldagem do gesso: largura interna sagital ÷ coronal no nível da fratura.",
    valores: [
      { r: "Bem moldado", v: "≤ 0,8", t: "n" },
      { r: "Risco de redesvio", v: "> 0,81", t: "a" },
    ],
    tags: ["gesso", "cast index", "pediatria"],
  },
  {
    id: "pm-fx-radio-adulto", nome: "Rádio distal consolidado — parâmetros aceitáveis (adulto ativo)", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Metas da redução em paciente ativo.",
    valores: [
      { r: "Altura radial", v: "até 2–3 mm do lado sadio", t: "n" },
      { r: "Inclinação volar", v: "neutra (0°)", t: "n" },
      { r: "Degrau articular", v: "< 2 mm", t: "n" },
      { r: "Inclinação radial", v: "perda < 5°", t: "n" },
    ],
    tags: ["rádio distal", "consolidação viciosa"],
  },
  {
    id: "pm-fx-radio-ped", nome: "Rádio distal na criança — desvio aceitável", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura", ped: true,
    resumo: "Fise e metáfise remodelam muito; Salter-Harris III e IV exigem redução anatômica.",
    tabela: {
      cab: ["Fratura", "Idade", "Sagital (meninos / meninas)", "Coronal"],
      linhas: [
        ["Metáfise", "4 a 9 anos", "20° / 15°", "15°"],
        ["Metáfise", "9 a 11 anos", "15° / 10°", "5°"],
        ["Metáfise", "11 a 13 anos", "10° / 10°", "0°"],
        ["Metáfise", "> 13 anos", "5° / 0°", "0°"],
        ["Fise (Salter-Harris I e II)", "< 10 anos", "30°", "50% de translação"],
        ["Fise (Salter-Harris I e II)", "> 10 anos", "15°", "—"],
        ["Fise (Salter-Harris III e IV)", "qualquer", "redução anatômica", "—"],
      ],
      nota: "Metáfise: aposição ≥ 50% e < 1 cm de encurtamento. Na compilação, as colunas de angulação aparecem com rótulos trocados (varo/valgo × anteroposterior); aqui seguimos a tabela original de Noonan e Price, em que os valores por sexo são do plano sagital.",
    },
    obs: ["Remodelação: ~0,9° por mês no plano sagital (ápice volar) e ~0,8° por mês no coronal — 30–35° residuais levam cerca de 5 anos."],
    tags: ["rádio distal", "pediatria", "fise", "Salter-Harris"],
  },
  // ——— Antebraço ———
  {
    id: "pm-fx-antebraco-adulto", nome: "Diáfise da ulna isolada (nightstick) — adulto", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Quando operar a fratura isolada da ulna.",
    valores: [{ r: "Desviada (RAFI)", v: "> 10° em qualquer plano ou > 50% de desvio", t: "a" }],
    tags: ["ulna", "cassetete", "antebraço"],
  },
  {
    id: "pm-fx-antebraco-ped", nome: "Antebraço na criança — deformidade aceitável", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura", ped: true,
    resumo: "Angulação por terço, idade e remodelação.",
    tabela: {
      cab: ["Idade", "Angulação", "Rotação", "Baioneta / translação"],
      linhas: [
        ["< 6 anos (ou ≥ 2 anos de crescimento)", "terço distal 20° · médio 15° · proximal 10°", "< 10°", "baioneta e 100% de translação; até 1 cm de encurtamento"],
        ["6 a 10 anos", "< 15° (sobretudo perto da epífise distal)", "< 10°", "50–100%"],
        ["> 10 anos", "não aceitar deformidade residual", "—", "—"],
        ["Deformidade plástica (< 4 anos)", "< 20°", "—", "—"],
      ],
    },
    como: [
      "Arco radial normal: no AP, ponto mais alto a ~60% da linha da tuberosidade bicipital ao rádio distal medial, com altura de ~10% dessa linha.",
      "Perfil rotacional: estiloide ulnar a 180° do coronoide; estiloide radial a 180° da tuberosidade bicipital.",
    ],
    obs: [
      "Correção espontânea ~1° por mês (≈ 10° por ano); abaixo de 10 anos até ~15° no punho. Rotação não remodela.",
      "Cada 1° de rotação viciosa custa 1–2° de prono-supinação; até 10° é bem tolerado. 10° de angulação no terço médio limitam 20–30° de rotação; a baioneta em si não limita a rotação.",
      "Deformidade plástica: corrigir se impede a redução de outra fratura, bloqueia a rotação em > 4 anos ou passa de 20°; a correção final deve ficar < 10–20°.",
      "Remanipular deformidade angular > 10° em crianças > 8 anos.",
      "Resultado (Price): excelente perda de rotação ≤ 10°; bom 11–30°; regular 31–90°; ruim > 90°.",
    ],
    tags: ["antebraço", "pediatria", "remodelação", "deformidade plástica"],
  },
  // ——— Carpo ———
  {
    id: "pm-alinhamento-carpo", nome: "Alinhamento do carpo no perfil (DISI / VISI)", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "Perfil do punho neutro",
    resumo: "O semilunar é a chave: sua inclinação define o padrão de instabilidade.",
    como: [
      "Traçar uma linha pelo meio da diáfise do rádio e outra pelo capitato.",
      "Se as linhas se cruzam dentro do carpo, o carpo está alinhado; fora dele, desalinhado.",
    ],
    tabela: {
      cab: ["Padrão", "Semilunar", "Causa"],
      linhas: [
        ["DISI", "inclinado dorsalmente", "lesão escafolunar ou fratura do escafoide (\"DISIS\": escafoide)"],
        ["VISI", "inclinado volarmente", "lesão lunopiramidal ou fratura do piramidal (\"VISIT\": piramidal/triquetrum)"],
      ],
    },
    tags: ["DISI", "VISI", "semilunar", "instabilidade do carpo"],
  },
  {
    id: "pm-angulos-carpo", nome: "Ângulos intercarpais", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "Perfil do punho neutro",
    resumo: "Valores normais dos principais ângulos do carpo.",
    tabela: {
      cab: ["Ângulo", "Normal", "Faixa"],
      linhas: [["Radiolunar", "0°", "−15° a +15°"], ["Radioescafoide", "45°", "30–60°"], ["Escafolunar", "47°", "30–60°"], ["Capitolunar", "0°", "−15° a +15°"]],
    },
    tags: ["escafolunar", "radiolunar", "capitolunar"],
  },
  {
    id: "pm-dissociacao-sl", nome: "Dissociação escafolunar", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "PA, perfil e incidências de estresse",
    resumo: "Sinais radiográficos de lesão do ligamento escafolunar.",
    valores: [
      { r: "Ângulo escafolunar", v: "> 60° (normal 30–60°)", t: "a" },
      { r: "Sinal de Terry Thomas (espaço SL)", v: "> 3 mm (normal < 2 mm; 2–3 mm limítrofe)", t: "a" },
      { r: "Ângulo radioescafoide", v: "> 60°", t: "a" },
      { r: "DISI (radiolunar)", v: "> 15° (normal −15° a +15°)", t: "a" },
    ],
    obs: ["Terry Thomas é inconstante: pedir estresse (punho cerrado) ou incidência de Moneim para ver o alargamento."],
    tags: ["escafolunar", "Terry Thomas", "DISI", "SLAC"],
  },
  {
    id: "pm-gilula", nome: "Arcos de Gilula", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "PA do punho",
    resumo: "Três arcos lisos e paralelos no carpo normal.",
    como: [
      "Arco I: contornos proximais da fileira proximal.",
      "Arco II: contornos distais da fileira proximal.",
      "Arco III: contornos proximais do capitato e do hamato.",
    ],
    obs: ["Degrau ou quebra de um arco sugere luxação ou instabilidade (perilunar, dissociações)."],
    tags: ["Gilula", "luxação perilunar"],
  },
  {
    id: "pm-perilunar", nome: "Arcos vulneráveis do carpo (perilunar)", regiao: "punho-mao", grupo: "Carpo e instabilidade", tipo: "fratura",
    inc: "PA e perfil",
    resumo: "Trajetos das lesões perilunares.",
    como: [
      "Arco maior: passa pela estiloide radial, escafoide, capitato e piramidal — lesões transósseas (fratura-luxação).",
      "Arco menor: contorna o semilunar pelos ligamentos — luxação perilunar pura.",
      "Lesões do arco menor progridem em estágios de instabilidade perilunar (Mayfield).",
    ],
    tags: ["perilunar", "transescafoperilunar", "Mayfield"],
  },
  {
    id: "pm-altura-carpo", nome: "Altura do carpo (Youm e Natrass)", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "PA do punho",
    resumo: "Colapso carpal (Kienböck, SLAC, artrite).",
    valores: [
      { r: "Youm (altura do carpo ÷ 3º MC)", v: "0,54 ± 0,03", t: "n" },
      { r: "Natrass (altura do carpo ÷ comprimento do capitato)", v: "1,57 ± 0,05", t: "n" },
    ],
    tags: ["altura do carpo", "Kienböck", "colapso"],
  },
  {
    id: "pm-stahl", nome: "Índice de Stahl (semilunar)", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "Perfil",
    resumo: "Razão entre os diâmetros longitudinal e sagital do semilunar — colapso no Kienböck.",
    valores: [
      { r: "Normal", v: "0,53", t: "n" },
      { r: "Anormal", v: "< 0,5", t: "a" },
    ],
    tags: ["Kienböck", "semilunar"],
  },
  {
    id: "pm-chamay", nome: "Translação ulnar do carpo (Chamay)", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "PA do punho",
    resumo: "Deslizamento do carpo para ulnar (artrite reumatoide, pós-traumático).",
    valores: [
      { r: "Normal (a/b)", v: "0,28 ± 0,03", t: "n" },
      { r: "Translação ulnar", v: "> 0,31", t: "a" },
    ],
    como: [
      "Linha 1: paralela ao eixo do rádio pela estiloide radial.",
      "a = distância do centro da cabeça do capitato à linha 1 (perpendicular).",
      "b = comprimento do 3º metacarpo. Índice = a/b.",
    ],
    tags: ["translação ulnar", "artrite reumatoide", "Chamay"],
  },
  {
    id: "pm-angulo-carpo", nome: "Ângulo do carpo", regiao: "punho-mao", grupo: "Carpo e instabilidade",
    inc: "PA do punho",
    resumo: "Ângulo entre a tangente proximal ao escafoide e semilunar e a tangente ao piramidal e semilunar.",
    valores: [{ r: "Normal", v: "≈ 130°", t: "n" }],
    obs: ["Diminui na deformidade de Madelung e em displasias."],
    tags: ["Madelung", "ângulo do carpo"],
  },
  {
    id: "pm-sinal-metacarpo", nome: "Sinal do metacarpo", regiao: "punho-mao", grupo: "Mão",
    inc: "PA da mão",
    resumo: "Tangente às cabeças do 4º e 5º metacarpos.",
    valores: [
      { r: "Negativo (normal)", v: "a linha não cruza o 3º MC", t: "n" },
      { r: "Positivo", v: "a linha cruza a cabeça do 3º MC (4º MC curto)", t: "a" },
    ],
    obs: ["Positivo sugere encurtamento do 4º MC (ex.: síndrome de Turner, pseudo-hipoparatireoidismo)."],
    tags: ["metacarpo", "Turner"],
  },
  {
    id: "pm-ossificacao", nome: "Ossificação do carpo", regiao: "punho-mao", grupo: "Mão", ped: true,
    inc: "PA do punho e mão",
    resumo: "Ordem constante de aparecimento dos núcleos.",
    tabela: {
      cab: ["Ordem", "Osso", "Idade aproximada"],
      linhas: [
        ["1", "Capitato", "~6 meses (1º)"], ["2", "Hamato", "~1 ano"], ["3", "Piramidal", "2–3 anos"], ["4", "Semilunar", "4 anos"],
        ["5", "Escafoide", "5 anos"], ["6", "Trapézio", "5–6 anos"], ["7", "Trapezoide", "6 anos"], ["8", "Pisiforme", "6–8 anos (último)"],
      ],
      nota: "Rádio distal ~1 ano; ulna distal 5–7 anos.",
    },
    tags: ["idade óssea", "ossificação", "carpo"],
  },
  {
    id: "pm-eixos-dedos", nome: "Alinhamento metacarpo-falange", regiao: "punho-mao", grupo: "Mão",
    inc: "PA da mão",
    resumo: "Os eixos do metacarpo e da falange proximal ficam alinhados na mão normal.",
    obs: ["Na fratura da falange proximal os eixos perdem o alinhamento — comparar com a outra mão. A rotação é avaliada clinicamente (dedos convergindo para o escafoide em flexão)."],
    tags: ["falange", "rotação", "mão"],
  },
  {
    id: "pm-excursao", nome: "Amplitude de excursão tendínea (30-50-70)", regiao: "punho-mao", grupo: "Mão",
    resumo: "Excursão de cada grupo de tendões — útil em transferências.",
    valores: [
      { r: "Flexores e extensores do punho", v: "30 mm", t: "i" },
      { r: "Extensores dos dedos, ELP e FLP", v: "50 mm", t: "i" },
      { r: "Flexores dos dedos", v: "70 mm", t: "i" },
    ],
    tags: ["transferência tendínea", "excursão"],
  },
  // ——— Fraturas da mão ———
  {
    id: "pm-fx-escafoide", nome: "Escafoide — critérios de cirurgia", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Quando a fratura do escafoide deve ser operada.",
    valores: [
      { r: "Desvio", v: "> 1 mm", t: "a" },
      { r: "Angulação", v: "> 10°", t: "a" },
      { r: "Ângulo intraescafoide", v: "> 35°", t: "a" },
      { r: "Radiolunar", v: "> 15°", t: "a" },
      { r: "Escafolunar", v: "> 60°", t: "a" },
      { r: "Também", v: "cominuição e pseudoartrose", t: "a" },
      { r: "Criança — aceitável", v: "angulação < 10° e desvio < 1 mm", t: "n" },
    ],
    tags: ["escafoide", "humpback", "pseudoartrose"],
  },
  {
    id: "pm-fx-metacarpo", nome: "Metacarpos — desvio aceitável", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Limites no colo e na diáfise, no adulto e na criança.",
    tabela: {
      cab: ["Local", "Adulto", "Criança"],
      linhas: [
        ["Colo — 2º e 3º", "< 10°", "< 15°"],
        ["Colo — 4º e 5º", "< 30–40°", "< 40–45°"],
        ["Diáfise — 2º e 3º", "cirurgia se dorsal > 10°", "< 10°"],
        ["Diáfise — 4º e 5º", "cirurgia se dorsal > 20°", "< 20°"],
      ],
      nota: "Rotação não é aceita: 10° (≈ 2 cm de sobreposição na ponta do dedo) é o limite máximo tolerável.",
    },
    tags: ["boxer", "metacarpo", "colo do 5º", "rotação"],
  },
  {
    id: "pm-fx-falanges-ped", nome: "Polegar e falanges na criança — desvio aceitável", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura", ped: true,
    resumo: "Limites na mão infantil.",
    valores: [
      { r: "Diáfise do polegar distal à fise", v: "< 30° (crianças menores)", t: "n" },
      { r: "Fise das falanges proximal e média", v: "< 1,5 mm e < 25% de envolvimento articular", t: "n" },
      { r: "Diáfise das falanges — < 10 anos", v: "< 30°", t: "n" },
      { r: "Diáfise das falanges — > 10 anos", v: "< 20°", t: "n" },
    ],
    obs: ["Imobilizar na posição protegida: MCF em > 70° de flexão e interfalângicas em extensão (pedir para a criança segurar um copo)."],
    tags: ["falange", "polegar", "pediatria", "posição protegida"],
  },
  {
    id: "pm-polegar-colateral", nome: "Colateral da MCF do polegar — estresse", regiao: "punho-mao", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    inc: "Estresse em 30° de flexão",
    resumo: "Lesão completa do ligamento colateral (polegar do esquiador).",
    valores: [{ r: "Lesão completa", v: "abertura > 30° ou > 15° a mais que o lado sadio", t: "a" }],
    obs: ["Colateral ulnar completo: cirurgia. Colateral radial: indicação controversa."],
    tags: ["polegar do esquiador", "Stener", "colateral ulnar"],
  },
  // ——— Cirurgia ———
  {
    id: "pm-tracao-metacarpo", nome: "Tração esquelética no metacarpo", regiao: "punho-mao", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    resumo: "Para reduções difíceis de antebraço e rádio distal.",
    como: [
      "2–2,5 cm proximal à extremidade distal do 2º metacarpo.",
      "Empurrar o 1º interósseo dorsal e palpar a parte subcutânea do osso; passar o fio de radial para ulnar, perpendicular ao eixo do rádio, atravessando 2º e 3º MC.",
    ],
    obs: ["Após a redução, os fios podem ser incorporados ao gesso. Rigidez dos intrínsecos é comum."],
    tags: ["tração", "metacarpo"],
  },
  {
    id: "pm-fixador", nome: "Fixador externo no antebraço distal e punho", regiao: "punho-mao", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    resumo: "Corredores para pinos.",
    tabela: {
      cab: ["Osso", "Zona segura", "Perigo"],
      linhas: [
        ["Ulna", "Cortical subcutânea posteromedial (antebraço em supinação)", "—"],
        ["Rádio", "Entre o extensor longo do polegar e os extensores radiais do carpo", "Ramo superficial do nervo radial"],
        ["2º metacarpo", "Dorsal; pino proximal ~3 mm distal à transição da base para a diáfise; distal ~3 mm proximal à transição da cabeça", "Capuz extensor (afastar)"],
      ],
    },
    tags: ["fixador externo", "punho", "rádio distal"],
  },
  {
    id: "pm-artrodese", nome: "Posição de artrodese do punho e dos dedos", regiao: "punho-mao", grupo: "Implantes, tração e artrodese", tipo: "cirurgia",
    resumo: "Posições funcionais recomendadas.",
    tabela: {
      cab: ["Articulação", "Indicador", "Médio", "Anelar", "Mínimo"],
      linhas: [
        ["MCF (flexão)", "25°", "30°", "35°", "40°"],
        ["IFP (flexão)", "40°", "45°", "50°", "55°"],
        ["IFD (flexão)", "10°", "10°", "10°", "10°"],
      ],
      nota: "Punho: 10–20° de extensão.",
    },
    tags: ["artrodese", "punho", "dedos"],
  },
];
