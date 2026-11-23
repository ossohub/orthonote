import type { Topico } from "./types";

export const NUTRICAO: Topico[] = [
  {
    id: "n-energia", titulo: "Necessidade e disponibilidade energética", area: "nutricao", grupo: "Energia",
    tags: ["gasto energético", "tmb", "get", "disponibilidade energética", "mifflin"],
    resumo: "Gasto total = metabolismo de repouso + efeito térmico + atividade. Disponibilidade energética < 30 kcal/kg MLG/dia é baixa.",
    secoes: [
      { t: "Como estimar", itens: ["Metabolismo de repouso: Mifflin-St Jeor (população geral) ou Cunningham (atletas, usa massa livre de gordura).", "Gasto total = repouso × fator de atividade (1,2 sedentário → 1,9+ atleta em treino intenso).", "Disponibilidade energética (DE) = (ingestão − gasto do exercício) ÷ massa livre de gordura.", "DE ≥ 45 kcal/kg MLG: ótima; 30–45: reduzida; < 30: baixa (risco de RED-S).", "Use a calculadora de gasto energético nesta seção."] },
    ],
    ver: ["n-reds"],
    fontes: ["NUTRI", "ANTRO", "INTEG"],
  },
  {
    id: "n-cho", titulo: "Carboidratos", area: "nutricao", grupo: "Macronutrientes",
    tags: ["carboidrato", "glicogênio", "carb loading", "gel"],
    resumo: "Ajustar à carga de treino: 3–5 g/kg (leve) até 8–12 g/kg (muito alto). Durante provas longas: 30–90 g/h.",
    tabela: {
      cab: ["Carga de treino", "Carboidrato"],
      linhas: [
        ["Leve (baixa intensidade/técnico)", "3–5 g/kg/dia"],
        ["Moderada (~1 h/dia)", "5–7 g/kg/dia"],
        ["Alta (1–3 h/dia moderada a intensa)", "6–10 g/kg/dia"],
        ["Muito alta (> 4–5 h/dia)", "8–12 g/kg/dia"],
        ["Supercompensação (provas > 90 min)", "10–12 g/kg/dia por 36–48 h"],
        ["Durante exercício 1–2,5 h", "30–60 g/h"],
        ["Durante exercício > 2,5 h", "até 90 g/h (glicose + frutose)"],
        ["Recuperação rápida (< 8 h entre sessões)", "1–1,2 g/kg/h nas primeiras 4 h"],
      ],
    },
    secoes: [{ t: "Dicas", itens: ["Refeição pré-treino 1–4 h antes: 1–4 g/kg, pouca gordura e fibra.", "Treinar o intestino: testar géis e bebidas nos treinos, nunca pela 1ª vez na prova."] }],
    fontes: ["NUTRI", "METAB", "INTEG"],
  },
  {
    id: "n-proteina", titulo: "Proteínas", area: "nutricao", grupo: "Macronutrientes",
    tags: ["proteína", "leucina", "whey", "caseína", "hipertrofia"],
    resumo: "1,4–2,0 g/kg/dia (até 2,3–3,1 g/kg em déficit calórico), em doses de 0,3–0,4 g/kg a cada 3–4 h.",
    secoes: [
      { t: "Prática", itens: ["Dose por refeição ≈ 20–40 g de proteína de alta qualidade (~2–3 g de leucina).", "Pós-treino: dentro de algumas horas — a janela é larga; o total diário importa mais.", "Proteína antes de dormir (30–40 g de caseína) favorece síntese noturna.", "Fontes vegetais: combinar (arroz + feijão, soja) ou aumentar a dose em ~10–20%.", "Em restrição calórica, proteína alta preserva massa magra."] },
    ],
    fontes: ["NUTRI", "INTEG", "CUT"],
  },
  {
    id: "n-gordura", titulo: "Gorduras e micronutrientes-chave", area: "nutricao", grupo: "Macronutrientes",
    tags: ["gordura", "ferro", "vitamina d", "cálcio", "ômega 3"],
    resumo: "Gordura 20–35% das calorias (não < 20%). Atenção a ferro, vitamina D e cálcio em atletas.",
    secoes: [
      { t: "Micronutrientes", itens: ["Ferro: risco em mulheres, corredores, vegetarianos e altitude — dosar ferritina; suplementar em dias alternados melhora absorção.", "Vitamina D: dosar em atletas indoor/latitudes altas; manter 25(OH)D > 30 ng/mL.", "Cálcio: 1.000–1.500 mg/dia, especialmente com baixa disponibilidade energética.", "Ômega-3: pode ajudar em recuperação e saúde cardiovascular; evidência modesta para desempenho."] },
    ],
    fontes: ["NUTRI", "INTEG"],
  },
  {
    id: "n-hidratacao", titulo: "Hidratação e eletrólitos", area: "nutricao", grupo: "Hidratação",
    tags: ["hidratação", "taxa de sudorese", "sódio", "hiponatremia", "desidratação"],
    resumo: "Chegar hidratado, evitar perder > 2% do peso no treino e não beber além do que se perde (risco de hiponatremia).",
    secoes: [
      { t: "Antes, durante e depois", itens: ["Antes: 5–7 mL/kg 4 h antes; se urina escura, mais 3–5 mL/kg 2 h antes.", "Durante: baseado na taxa de sudorese (tipicamente 0,4–0,8 L/h); sódio 300–600 mg/h em provas longas ou suor salgado.", "Depois: 1,25–1,5 L para cada kg perdido, com sódio.", "Taxa de sudorese = (peso antes − peso depois + líquido ingerido − urina) ÷ horas — ver calculadora.", "Hiponatremia associada ao exercício: ganho de peso durante a prova é sinal de excesso de líquido."] },
    ],
    fontes: ["NUTRI", "INTEG"],
  },
  {
    id: "n-suplementos", titulo: "Suplementos com evidência", area: "nutricao", grupo: "Suplementos",
    tags: ["creatina", "cafeína", "beta-alanina", "bicarbonato", "nitrato", "beterraba", "doping"],
    resumo: "Poucos suplementos têm boa evidência: creatina, cafeína, beta-alanina, bicarbonato e nitrato.",
    tabela: {
      cab: ["Suplemento", "Dose usual", "Para quê"],
      linhas: [
        ["Creatina monohidratada", "3–5 g/dia (ou 20 g/dia por 5–7 dias de saturação)", "Força, potência, esforços repetidos; possível benefício na reabilitação"],
        ["Cafeína", "3–6 mg/kg 30–60 min antes", "Resistência, potência, foco; doses ≥ 9 mg/kg só aumentam efeitos adversos"],
        ["Beta-alanina", "3,2–6,4 g/dia fracionado por ≥ 4 semanas", "Esforços de 1–4 min; parestesia transitória"],
        ["Bicarbonato de sódio", "0,2–0,3 g/kg 60–180 min antes", "Esforços intensos de 1–7 min; desconforto GI"],
        ["Nitrato (suco de beterraba)", "6–8 mmol (~350–500 mg) 2–3 h antes", "Economia de O₂ em resistência"],
        ["Proteína em pó (whey)", "20–40 g/dose", "Praticidade para atingir a meta diária"],
      ],
    },
    secoes: [{ t: "Atenção", itens: ["Contaminação com substâncias proibidas: preferir produtos com certificação de terceira parte.", "Atletas de competição: consultar a lista da WADA/ABCD."] }],
    fontes: ["NUTRI", "INTEG", "METAB"],
  },
  {
    id: "n-reds", titulo: "RED-S (deficiência energética relativa no esporte)", area: "nutricao", grupo: "Energia",
    tags: ["red-s", "tríade da mulher atleta", "amenorreia", "baixa densidade óssea", "fratura de estresse"],
    resumo: "Baixa disponibilidade energética afeta hormônios, osso, imunidade e desempenho em mulheres e homens.",
    secoes: [
      { t: "Suspeitar", itens: ["Amenorreia/irregularidade menstrual, fraturas por estresse, lesões recorrentes, queda de desempenho, fadiga, perda de peso, baixa libido (homens).", "Rastreio: histórico alimentar, ciclo menstrual, densitometria (Z-score < −1 é preocupante em atletas de impacto), ferritina, vitamina D, TSH."] },
      { t: "Conduta", itens: ["Aumentar ingestão energética (300–600 kcal/dia) e/ou reduzir carga de treino.", "Equipe: médico, nutricionista e psicólogo (rastrear transtornos alimentares).", "Contracepção hormonal não trata a causa nem protege o osso."] },
    ],
    ver: ["l-canelite"],
    fontes: ["NUTRI", "INTEG"],
  },
  {
    id: "n-composicao", titulo: "Composição corporal e corte de peso", area: "nutricao", grupo: "Energia",
    tags: ["percentual de gordura", "dobras cutâneas", "déficit calórico", "cutting", "bioimpedância"],
    resumo: "Perder 0,5–1% do peso por semana com proteína alta e treino de força preserva massa magra.",
    secoes: [
      { t: "Avaliação", itens: ["Dobras cutâneas (Jackson-Pollock) e circunferências: baratas, boas para acompanhar a mesma pessoa.", "Bioimpedância: sensível à hidratação; padronizar horário e jejum.", "DEXA: referência prática para massa óssea, gorda e magra."] },
      { t: "Déficit", itens: ["Déficit de 300–500 kcal/dia; proteína 2,0–2,4 g/kg; manter treino de força.", "Evitar cortes de peso agressivos por desidratação antes de competição (risco de lesão renal e queda de desempenho)."] },
    ],
    fontes: ["ANTRO", "CUT", "NUTRI"],
  },
  {
    id: "n-lesao", titulo: "Nutrição na lesão e reabilitação", area: "nutricao", grupo: "Recuperação",
    tags: ["lesão", "imobilização", "colágeno", "vitamina c", "atrofia"],
    resumo: "Não cortar calorias de forma drástica na lesão; proteína alta e, para tendão/ligamento, colágeno + vitamina C antes do exercício.",
    secoes: [
      { t: "Prática", itens: ["Gasto energético cai pouco na lesão — déficit grande acelera perda muscular.", "Proteína 1,6–2,5 g/kg/dia dividida ao longo do dia para limitar atrofia por desuso.", "Colágeno/gelatina 15 g + 50 mg vitamina C 30–60 min antes do exercício de carga para tendão/ligamento (evidência preliminar).", "Creatina pode atenuar perda de massa durante imobilização.", "Ômega-3 e polifenóis: evidência ainda limitada."] },
    ],
    fontes: ["INTEG", "NUTRI"],
  },
  {
    id: "n-recuperacao", titulo: "Recuperação, sono e timing", area: "nutricao", grupo: "Recuperação",
    tags: ["sono", "recuperação", "pós-treino", "timing"],
    resumo: "Sono de 7–9 h, proteína + carboidrato após o treino e reposição de líquidos aceleram a recuperação.",
    secoes: [{ t: "Prática", itens: ["Pós-treino: 0,3 g/kg de proteína + carboidrato conforme a próxima sessão.", "Sono < 7 h associa-se a mais lesões e pior desempenho; cochilo de 20–30 min ajuda.", "Álcool prejudica síntese proteica e reidratação."] }],
    fontes: ["NUTRI", "METAB"],
  },
  {
    id: "n-metabolismo", titulo: "Metabolismo energético no exercício", area: "nutricao", grupo: "Energia",
    tags: ["fosfocreatina", "glicólise", "oxidativo", "limiar de lactato", "vo2max"],
    resumo: "Sistemas ATP-CP (segundos), glicolítico (até ~2 min) e oxidativo (prolongado) atuam juntos em proporções diferentes.",
    secoes: [{ t: "Conceitos", itens: ["ATP-CP: esforços máximos de até ~10 s; recupera ~50% em 30 s e quase tudo em 3–5 min.", "Glicolítico: 10 s–2 min; produz lactato (que é combustível, não 'vilão').", "Oxidativo: carboidrato e gordura; a proporção de gordura cai com a intensidade (crossover).", "Fadiga no exercício longo: falta de glicogênio muscular somada à queda da glicose no sangue — carboidrato durante a prova ajuda.", "Limiar de lactato e VO₂máx definem desempenho de resistência; treino aeróbio aumenta mitocôndrias e capilarização."] }],
    fontes: ["METAB", "HAFF"],
  },
];
