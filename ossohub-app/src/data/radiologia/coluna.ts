import type { Medida } from "./types";

const C = "coluna-cervical" as const;
const T = "coluna-toracolombar" as const;

export const COLUNA_CERVICAL: Medida[] = [
  {
    id: "cc-perfil", nome: "Perfil cervical — qualidade e linhas", regiao: C, grupo: "Perfil e canal",
    inc: "Perfil cervical",
    resumo: "O exame mais importante no trauma cervical.",
    como: [
      "Deve mostrar até a transição C7–T1; se não aparecer, incidência do nadador ou TC.",
      "Cinco linhas contínuas: partes moles pré-vertebrais, vertebral anterior, vertebral posterior, espinolaminar e pontas dos espinhosos.",
      "Altura do disco igual na frente e atrás (assimetria sugere lesão em hiperextensão ou hiperflexão).",
      "Avaliar as três colunas de Denis: lesão de duas = instabilidade.",
    ],
    obs: ["O perfil define o mecanismo em ~90% dos casos e mostra ~95% das lesões significativas."],
    tags: ["trauma cervical", "C7-T1", "nadador"],
  },
  {
    id: "cc-partes-moles", nome: "Partes moles pré-vertebrais", regiao: C, grupo: "Perfil e canal",
    inc: "Perfil cervical",
    resumo: "Aumento sugere hematoma por fratura ou lesão ligamentar.",
    valores: [
      { r: "Em C2 (retrofaríngea)", v: "≤ 6–7 mm", t: "n" },
      { r: "Em C6 — adulto (retrotraqueal)", v: "≤ 20–22 mm", t: "n" },
      { r: "Em C6 — criança", v: "≤ 14 mm", t: "n" },
    ],
    tags: ["pré-vertebral", "partes moles", "hematoma"],
  },
  {
    id: "cc-canal", nome: "Diâmetro do canal cervical", regiao: C, grupo: "Perfil e canal",
    inc: "Perfil cervical",
    resumo: "Da face posterior do corpo vertebral à linha espinolaminar.",
    valores: [
      { r: "Normal", v: "≥ 14 mm", t: "n" },
      { r: "Estenose relativa", v: "10–13 mm", t: "l" },
      { r: "Estenose absoluta", v: "< 10 mm", t: "a" },
    ],
    tags: ["estenose", "canal", "mielopatia"],
  },
  {
    id: "cc-lordose", nome: "Lordose cervical", regiao: C, grupo: "Perfil e canal",
    inc: "Perfil cervical",
    resumo: "Ângulo entre a linha pelo centro do atlas e o platô inferior de C7.",
    valores: [{ r: "Normal", v: "35–45° (média 40°)", t: "n" }],
    tags: ["lordose", "cifose cervical"],
  },
  {
    id: "cc-swischuk", nome: "Linha de Swischuk (pseudo-subluxação)", regiao: C, grupo: "Perfil e canal", ped: true,
    inc: "Perfil cervical na criança",
    resumo: "Separa a pseudo-subluxação fisiológica C2–C3 de lesão verdadeira.",
    valores: [
      { r: "Normal", v: "arco posterior de C2 a ≤ 2 mm da linha espinolaminar C1–C3", t: "n" },
      { r: "Sugere lesão", v: "> 2 mm", t: "a" },
    ],
    obs: ["O espinhoso de C2 pode não ficar exatamente sobre a linha espinolaminar; isso é normal se a distância for < 2 mm."],
    tags: ["pseudo-subluxação", "criança", "C2-C3"],
  },
  // ——— Craniocervical e C1–C2 ———
  {
    id: "cc-adi", nome: "Intervalo atlantodental (ADI)", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "Perfil cervical",
    resumo: "Da borda posterior do arco anterior de C1 à borda anterior do dente.",
    valores: [
      { r: "Adulto", v: "< 3 mm", t: "n" },
      { r: "Criança", v: "< 5 mm", t: "n" },
    ],
    tabela: {
      cab: ["ADI no adulto", "Significado"],
      linhas: [["3–6 mm", "Ruptura parcial do ligamento transverso"], ["6–10 mm", "Transverso roto; alares e acessórios íntegros"], ["> 10 mm", "Instabilidade ligamentar completa"]],
    },
    tags: ["ADI", "ligamento transverso", "atlantoaxial", "artrite reumatoide"],
  },
  {
    id: "cc-sac", nome: "Intervalo atlantodental posterior (PADI / SAC)", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "Perfil cervical",
    resumo: "Espaço disponível para a medula atrás do dente.",
    valores: [
      { r: "Normal", v: "> 13 mm", t: "n" },
      { r: "Risco de compressão", v: "≤ 13 mm", t: "a" },
    ],
    obs: ["Na artrite reumatoide, o PADI prediz melhor o risco neurológico que o ADI."],
    tags: ["SAC", "PADI", "artrite reumatoide", "medula"],
  },
  {
    id: "cc-ladi", nome: "Transoral: dente e massas laterais de C1", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "AP transoral (boca aberta)",
    resumo: "Simetria do dente e deslocamento das massas laterais.",
    valores: [
      { r: "Intervalo atlantodental lateral", v: "≤ 2 mm e simétrico", t: "n" },
      { r: "Massas laterais de C1 além de C2 (soma dos dois lados)", v: "> 7 mm = ruptura do transverso (Jefferson)", t: "a" },
    ],
    obs: ["Assimetria isolada pode ser só rotação da cabeça — na dúvida, TC."],
    tags: ["Jefferson", "Spence", "massa lateral", "transoral"],
  },
  {
    id: "cc-harris", nome: "Intervalos básio-dente e básio-áxis (Harris)", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "Perfil cervical",
    resumo: "Regra dos 12 para luxação atlanto-occipital.",
    valores: [
      { r: "Básio-dente (BDI)", v: "< 12 mm", t: "n" },
      { r: "Básio-áxis (BAI): básio à linha da cortical posterior do áxis", v: "< 12 mm e não mais que 4 mm anterior (−4 a +12 mm)", t: "n" },
    ],
    tags: ["luxação atlanto-occipital", "Harris", "regra dos 12"],
  },
  {
    id: "cc-powers", nome: "Razão de Powers", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "Perfil cervical",
    resumo: "BC/AD: básio ao arco posterior de C1 ÷ opístio ao arco anterior de C1.",
    valores: [
      { r: "Normal", v: "≤ 1", t: "n" },
      { r: "Luxação atlanto-occipital anterior", v: "> 1", t: "a" },
    ],
    tags: ["Powers", "luxação atlanto-occipital"],
  },
  {
    id: "cc-wackenheim", nome: "Linha de Wackenheim (clivo)", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "Perfil cervical",
    resumo: "Linha ao longo do clivo, que normalmente tangencia a metade posterior do dente.",
    obs: ["Linha que não toca ou cruza o dente sugere luxação occipitocervical."],
    tags: ["Wackenheim", "clivo"],
  },
  {
    id: "cc-impressao-basilar", nome: "Impressão basilar — McRae, Chamberlain e McGregor", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "Perfil do crânio e cervical",
    resumo: "Migração do dente para dentro do forame magno.",
    tabela: {
      cab: ["Linha", "Como traçar", "Normal"],
      linhas: [
        ["McRae", "Básio → opístio (abertura do forame magno)", "Ponta do dente abaixo da linha; perpendicular do dente cai no terço anterior"],
        ["Chamberlain", "Borda posterior do palato duro → opístio", "Dente no máximo 3 mm acima"],
        ["McGregor", "Borda posterossuperior do palato duro → ponto mais baixo do occipital", "Dente no máximo 4,5 mm acima; > 5 mm = impressão basilar"],
      ],
    },
    tags: ["impressão basilar", "McRae", "Chamberlain", "McGregor", "artrite reumatoide"],
  },
  {
    id: "cc-ranawat", nome: "Índice de Ranawat", regiao: C, grupo: "Craniocervical e C1–C2",
    inc: "Perfil cervical",
    resumo: "Distância do centro do pedículo de C2 à linha dos arcos de C1, no eixo do dente.",
    valores: [
      { r: "Homens", v: "17 ± 2 mm", t: "n" },
      { r: "Mulheres", v: "15 ± 2 mm", t: "n" },
      { r: "Migração cranial", v: "valor diminuído", t: "a" },
    ],
    tags: ["Ranawat", "migração cranial", "artrite reumatoide"],
  },
  // ——— Instabilidade ———
  {
    id: "cc-instabilidade", nome: "Instabilidade da coluna cervical subaxial (C3–C7)", regiao: C, grupo: "Instabilidade e trauma", tipo: "fratura",
    inc: "Perfil (e dinâmicas)",
    resumo: "Critérios radiográficos de White e Panjabi.",
    valores: [
      { r: "Translação sagital entre vértebras", v: "> 3,5 mm", t: "a" },
      { r: "Angulação entre vértebras adjacentes", v: "> 11° a mais que o nível vizinho", t: "a" },
      { r: "Sobreposição das facetas", v: "< 50%", t: "a" },
      { r: "Separação do disco", v: "> 1,7 mm", t: "a" },
      { r: "Fratura por compressão", v: "> 25% de perda de altura", t: "a" },
    ],
    obs: ["Ângulo de cifose > 30° ou perda > 50% da altura anterior do corpo também indicam maior risco de instabilidade."],
    tags: ["White-Panjabi", "instabilidade", "subaxial"],
  },
  {
    id: "cc-trauma", nome: "Roteiro de imagem no trauma cervical", regiao: C, grupo: "Instabilidade e trauma", tipo: "fratura",
    resumo: "O que olhar em cada incidência.",
    como: [
      "AP: massas laterais lisas; espinhosos na linha média e equidistantes (podem ser bífidos). Distância interespinhosa aumentada = lesão ligamentar posterior; espinhoso rodado = lesão em flexão-rotação; espinhoso duplo = fratura do espinhoso.",
      "Transoral: dente centrado entre as massas de C1, espaços simétricos; na dúvida, TC.",
      "Flexão-extensão: só após exame neurológico, voluntária e de preferência após 48 h (espasmo dá falso-negativo); útil para lesão ligamentar sem fratura.",
      "TC multicanal: cortes finos com reconstruções; rastreio em idosos, alteração de consciência e regiões difíceis (craniocervical, C7–T1).",
      "RM: déficit neurológico, suspeita de lesão ligamentar ou paciente inconsciente > 48 h.",
    ],
    tags: ["trauma", "TC", "RM", "flexão-extensão"],
  },
  {
    id: "cc-parafusos", nome: "Parafusos cervicais posteriores", regiao: C, grupo: "Implantes", tipo: "cirurgia",
    resumo: "Referências de entrada e angulação.",
    como: [
      "Massa lateral (C3–C6): entrada no centro da massa (ou ~1 mm medial), direção ~25–35° lateral e paralela à faceta, evitando a artéria vertebral e a raiz.",
      "Transarticular C1–C2 (Magerl): entrada ~2–3 mm lateral à borda medial da faceta C2–C3 e ~3 mm acima dela, pelo istmo de C2 em direção ao arco anterior de C1; conferir no perfil.",
    ],
    tags: ["massa lateral", "Magerl", "transarticular"],
  },
];

export const COLUNA_TORACOLOMBAR: Medida[] = [
  // ——— Sagital ———
  {
    id: "ct-cifose", nome: "Cifose torácica", regiao: T, grupo: "Curvas e equilíbrio sagital",
    inc: "Perfil em ortostase",
    resumo: "Ângulo entre o platô superior de T4 e o inferior de T12.",
    valores: [{ r: "Normal", v: "30–50° (média 37°; muito variável)", t: "n" }],
    tags: ["cifose", "Scheuermann"],
  },
  {
    id: "ct-lordose", nome: "Lordose lombar", regiao: T, grupo: "Curvas e equilíbrio sagital",
    inc: "Perfil em ortostase",
    resumo: "Ângulo entre o platô superior de L1 e o de S1.",
    valores: [{ r: "Normal", v: "14–69° (média 43°)", t: "n" }],
    obs: ["Regra prática: a lordose lombar deve ter ~30° a mais que a cifose torácica (ex.: 60° de lordose para 30° de cifose)."],
    tags: ["lordose", "flat back"],
  },
  {
    id: "ct-parametros-pelvicos", nome: "Parâmetros pélvicos (PI, PT, SS)", regiao: T, grupo: "Curvas e equilíbrio sagital",
    inc: "Perfil de coluna total com cabeças femorais",
    resumo: "A incidência pélvica é fixa; inclinação pélvica e slope sacral se compensam.",
    valores: [
      { r: "Incidência pélvica (PI)", v: "≈ 50° (PI = PT + SS)", t: "n" },
      { r: "Inclinação pélvica (PT)", v: "≈ 10–12°", t: "n" },
      { r: "Slope sacral (SS)", v: "≈ 42° em pé e ≈ 29° sentado (faixa usual 30–40°)", t: "n" },
    ],
    como: [
      "Centro das cabeças femorais (ponto médio entre os dois centros, se não sobrepostas).",
      "PI: perpendicular ao meio do platô sacral × linha do meio do platô ao centro das cabeças.",
      "PT: linha do meio do platô sacral ao centro das cabeças × vertical.",
      "SS: platô sacral × horizontal.",
    ],
    obs: [
      "Mudanças no SS acompanham mudanças no PT, porque PI não muda.",
      "Compensação da perda de lordose: retroversão da pelve (PT aumenta), flexão dos joelhos, hiperextensão de segmentos vizinhos.",
      "Ângulo α-L5 (incidência de L5): linha do meio do platô superior de L5 ao centro das cabeças × perpendicular ao platô.",
    ],
    tags: ["incidência pélvica", "PI", "PT", "SS", "equilíbrio sagital"],
  },
  {
    id: "ct-c7pl", nome: "Linha de prumo de C7 (C7PL), CSVL e SVA", regiao: T, grupo: "Curvas e equilíbrio sagital",
    inc: "Panorâmica da coluna AP e perfil em ortostase",
    resumo: "Equilíbrio coronal e sagital do tronco.",
    valores: [
      { r: "Coronal (C7PL × CSVL)", v: "≈ 0; > 1 cm é anormal", t: "n" },
      { r: "Sagital — neutro", v: "C7PL a poucos mm do canto posterossuperior de S1", t: "n" },
      { r: "Sagital positivo", v: "C7PL à frente de S1 (contratura em flexão do quadril, flat back)", t: "a" },
      { r: "Sagital negativo", v: "C7PL atrás de S1 (hiperlordose lombar)", t: "a" },
    ],
    como: [
      "C7PL: vertical a partir do centro do corpo de C7, paralela à borda do filme.",
      "CSVL: vertical a partir do centro de S1 (no AP).",
      "SVA: distância horizontal entre a C7PL e o canto posterossuperior de S1, em mm.",
    ],
    obs: ["Eixo sagital normal: centro de C2 → borda anterior de T7 → meio do disco T12–L1 → atrás do corpo de L3 → canto posterossuperior do sacro. O centro de gravidade fica logo à frente de S2."],
    tags: ["SVA", "C7PL", "CSVL", "equilíbrio"],
  },
  // ——— Escoliose ———
  {
    id: "ct-cobb", nome: "Ângulo de Cobb", regiao: T, grupo: "Escoliose",
    inc: "Panorâmica AP em ortostase",
    resumo: "Medida-padrão da curva escoliótica.",
    como: [
      "Escolher as vértebras terminais: as mais inclinadas em direção à concavidade, acima e abaixo do ápice.",
      "Linha pelo platô superior da vértebra terminal superior e pelo platô inferior da terminal inferior.",
      "O ângulo entre as linhas (ou entre suas perpendiculares) é o Cobb.",
    ],
    obs: [
      "Vértebra apical: a mais rodada e deformada, no ápice da curva. Vértebra neutra: a menos rodada, entre duas curvas (pode coincidir com a terminal).",
      "Método de Ferguson (alternativo): linhas dos centros das vértebras terminais ao centro da apical.",
      "Índice escoliótico: soma dos desvios laterais de cada vértebra em relação à linha entre as terminais ÷ comprimento da curva (corrigido pela magnificação).",
    ],
    tags: ["Cobb", "escoliose", "vértebra terminal", "apical"],
  },
  {
    id: "ct-nash-moe", nome: "Rotação vertebral (Nash-Moe)", regiao: T, grupo: "Escoliose",
    inc: "AP",
    resumo: "Grau de rotação pela posição do pedículo do lado convexo.",
    tabela: {
      cab: ["Grau", "Pedículo convexo", "Rotação aprox."],
      linhas: [
        ["0", "simétricos", "0%"],
        ["I", "levemente desviado para a concavidade; o côncavo começa a sumir", "~25%"],
        ["II", "no terço médio da metade convexa; côncavo quase invisível", "~50%"],
        ["III", "no centro do corpo; côncavo invisível", "~75%"],
        ["IV", "além da linha média", "~100%"],
      ],
    },
    tags: ["Nash-Moe", "rotação", "escoliose"],
  },
  {
    id: "ct-rvad", nome: "Diferença do ângulo costovertebral (RVAD, Mehta)", regiao: T, grupo: "Escoliose", ped: true,
    inc: "AP torácica",
    resumo: "Prediz progressão da escoliose infantil.",
    valores: [
      { r: "Baixo risco", v: "≤ 20°", t: "n" },
      { r: "Alto risco de progressão", v: "> 20° (tratamento mais agressivo)", t: "a" },
    ],
    como: ["No ápice, medir o ângulo de cada costela com a perpendicular ao platô vertebral; RVAD = côncavo − convexo."],
    tags: ["Mehta", "escoliose infantil", "RVAD"],
  },
  {
    id: "ct-risser", nome: "Sinal de Risser", regiao: T, grupo: "Escoliose", ped: true,
    inc: "AP de pelve / panorâmica",
    resumo: "Maturidade esquelética pela ossificação da apófise da crista ilíaca.",
    tabela: {
      cab: ["Estágio", "Apófise"],
      linhas: [["0", "não visível"], ["1", "< 25% ossificada"], ["2", "25–50%"], ["3", "50–75%"], ["4", "> 75%"], ["5", "fundida à crista"]],
    },
    obs: [
      "A apófise aparece ~4 meses após o pico de crescimento (12–15 anos), perto da menarca.",
      "Risser 5 marca o fim do estirão: resta pouco crescimento da coluna (1–2 cm). A fusão completa leva ~2 anos e termina por volta de 21–25 anos.",
    ],
    tags: ["Risser", "maturidade", "escoliose idiopática"],
  },
  // ——— Espondilolistese ———
  {
    id: "ct-espondilolistese", nome: "Espondilolistese — grau e ângulos", regiao: T, grupo: "Espondilolistese",
    inc: "Perfil lombossacro em ortostase",
    resumo: "Quanto a vértebra escorregou e quão cifótica está a junção.",
    tabela: {
      cab: ["Meyerding", "Escorregamento"],
      linhas: [["I", "0–25%"], ["II", "25–50%"], ["III", "50–75%"], ["IV", "> 75%"], ["V", "> 100% (espondiloptose)"]],
    },
    valores: [
      { r: "Ângulo de escorregamento (slip angle)", v: "normal < 0° (lordose em L5–S1)", t: "n" },
      { r: "Índice lombar (altura posterior ÷ anterior de L5 × 100)", v: "normal ≈ 90%", t: "n" },
      { r: "Inclinação sacral", v: "normal > 30°", t: "n" },
      { r: "Ângulo de cifose lombossacra", v: "< 85° = desvio anterior importante do centro de gravidade", t: "a" },
    ],
    como: ["Porcentagem: desvio da borda posterior de L5 ÷ comprimento do platô de S1 (A/B), dividindo o sacro em quatro partes."],
    obs: ["Espondiloptose: no AP, sinal do \"chapéu de Napoleão invertido\"."],
    tags: ["espondilolistese", "Meyerding", "slip angle", "espondilólise"],
  },
  {
    id: "ct-ferguson", nome: "Ângulo lombossacro de Ferguson", regiao: T, grupo: "Espondilolistese",
    inc: "Perfil lombossacro",
    resumo: "Platô superior de S1 × horizontal.",
    valores: [{ r: "Normal", v: "≈ 34°", t: "n" }],
    obs: ["Aumentado no sacro agudo (horizontalizado); diminuído no sacro arqueado (verticalizado)."],
    tags: ["Ferguson", "lombossacro"],
  },
  // ——— Fraturas ———
  {
    id: "ct-denis", nome: "Estabilidade toracolombar (Denis)", regiao: T, grupo: "Fraturas", tipo: "fratura",
    inc: "Perfil, AP e TC",
    resumo: "Três colunas, graus de instabilidade e quando estabilizar cedo.",
    tabela: {
      cab: ["Coluna", "Estruturas"],
      linhas: [
        ["Anterior", "Ligamento longitudinal anterior, metade anterior do corpo e do ânulo"],
        ["Média", "Metade posterior do corpo e do ânulo, ligamento longitudinal posterior"],
        ["Posterior", "Arco neural (pedículos, facetas, lâminas) e complexo ligamentar posterior"],
      ],
      nota: "Lesão de duas colunas = instável. A estabilidade segue a coluna média: se ela está íntegra, em geral a lesão é estável.",
    },
    valores: [
      { r: "1º grau — mecânica", v: "compressão grave, lesão do cinto de segurança (risco de cifose tardia)", t: "l" },
      { r: "2º grau — neurológica", v: "explosão sem déficit (risco de lesão neurológica tardia)", t: "a" },
      { r: "3º grau — mecânica e neurológica", v: "fratura-luxação, explosão grave com déficit", t: "a" },
    ],
    obs: ["Estabilização precoce indicada se: déficit neurológico, perda de altura > 40–50%, angulação > 20–30°, comprometimento do canal > 50%, escoliose > 10°."],
    tags: ["Denis", "três colunas", "explosão", "instabilidade", "Chance"],
  },
  {
    id: "ct-explosao", nome: "Sinais radiográficos de fratura em explosão", regiao: T, grupo: "Fraturas", tipo: "fratura",
    inc: "AP e perfil",
    resumo: "Achados que distinguem explosão de compressão simples.",
    como: [
      "AP: alargamento da distância interpedicular em relação aos níveis vizinhos.",
      "Perfil: muro posterior abaulado para trás e retropulsão de fragmento. Normal: torácica levemente côncava na frente e reta atrás; lombar quase reta na frente e côncava atrás.",
      "Facetas afastadas e espaço interespinhoso aumentado = lesão posterior.",
    ],
    tags: ["explosão", "interpedicular", "retropulsão"],
  },
  {
    id: "ct-sacro-denis", nome: "Zonas do sacro (Denis)", regiao: T, grupo: "Fraturas", tipo: "fratura",
    inc: "AP, inlet/outlet e TC",
    resumo: "Localização do traço sacral e risco neurológico.",
    tabela: {
      cab: ["Zona", "Local", "Risco neurológico"],
      linhas: [["I", "Asa, lateral aos forames", "Baixo (L5)"], ["II", "Forames sacrais", "Intermediário (raízes)"], ["III", "Canal central", "Alto (esfíncteres)"]],
    },
    tags: ["sacro", "Denis", "forame"],
  },
  {
    id: "ct-trauma", nome: "Roteiro de imagem no trauma toracolombar", regiao: T, grupo: "Fraturas", tipo: "fratura",
    resumo: "O que olhar em cada exame.",
    como: [
      "AP: altura uniforme dos corpos, alinhamento, espinhosos na linha média, pedículos e distância interpedicular, processos transversos.",
      "Perfil: três colunas, contorno vertebral, simetria das facetas; torácica alta pode exigir incidência do nadador.",
      "TC: alinhamento, altura, disco e grau de compressão do canal por fragmento retropulsado.",
      "RM: suspeita de lesão medular ou radicular e de lesão ligamentar.",
    ],
    tags: ["trauma", "TC", "RM"],
  },
  // ——— Pedículos ———
  {
    id: "ct-pediculos", nome: "Dimensões e ângulos dos pedículos", regiao: T, grupo: "Pedículos e implantes", tipo: "cirurgia",
    inc: "TC axial",
    resumo: "Diâmetro e convergência variam muito ao longo da coluna.",
    valores: [
      { r: "Maior diâmetro na coluna alta", v: "T1", t: "i" },
      { r: "Menor diâmetro torácico (e de toda a coluna C3–S1)", v: "T4 (~4–5 mm)", t: "i" },
      { r: "Menor diâmetro lombar", v: "L1", t: "i" },
      { r: "Aumenta até", v: "L5 e S1 (~18–20 mm)", t: "i" },
      { r: "Ângulo transverso (convergência)", v: "~30–36° em T1–T2, cai até ~0° (ou negativo) em T12 e sobe até ~30° em L5", t: "i" },
      { r: "Ângulo sagital", v: "~15° na torácica, ~0–5° na lombar", t: "i" },
    ],
    obs: ["Diâmetro vertical cresce de ~0,7 para 1,5 cm e horizontal de ~0,7 para 1,6 cm de T3 a L4; o sagital fica ≥ 0,5 cm a partir de T5."],
    tags: ["pedículo", "parafuso pedicular", "convergência"],
  },
  {
    id: "ct-entrada-pedicular", nome: "Entrada do parafuso pedicular", regiao: T, grupo: "Pedículos e implantes", tipo: "cirurgia",
    inc: "Fluoroscopia AP e perfil",
    resumo: "Três técnicas lombares e a referência torácica.",
    como: [
      "Interseção: linha vertical pela borda lateral da faceta × linha horizontal que bissecta o processo transverso.",
      "Pars interarticularis: a pars, onde o pedículo encontra a lâmina, dá a base do ponto de entrada.",
      "Processo mamilar: pequena saliência na base do transverso; é mais lateral que as outras — exige mais convergência.",
      "Torácica: interseção da linha pela metade da faceta superior com a borda superior do transverso (~1 mm abaixo da faceta).",
      "Lombar: convergência ~5–10° em L1 até ~20–25° em L5; no AP, entrada às \"10 e 2 horas\" do pedículo; o parafuso não deve ultrapassar a cortical anterior.",
    ],
    obs: ["O pedículo é um tubo: medial fica a dura e, abaixo, a raiz que sai pelo forame — violar medial ou inferior é o mais perigoso."],
    tags: ["parafuso pedicular", "ponto de entrada", "Magerl", "Weinstein"],
  },
  {
    id: "ct-facetas", nome: "Orientação das facetas", regiao: T, grupo: "Pedículos e implantes",
    inc: "TC",
    resumo: "Ângulo das facetas em relação ao plano axial/coronal.",
    tabela: { cab: ["Região", "Orientação"], linhas: [["Cervical", "~45° (oblíquas)"], ["Torácica", "~60° (coronais)"], ["Lombar", "~90° (sagitais)"]] },
    tags: ["faceta", "biomecânica"],
  },
  {
    id: "ct-zonas-xlif", nome: "Zonas do corpo lombar no acesso lateral (XLIF)", regiao: T, grupo: "Pedículos e implantes", tipo: "cirurgia",
    inc: "Perfil",
    resumo: "Posição do plexo lombar e dos vasos em relação ao corpo vertebral.",
    como: [
      "Dividir o corpo em zonas de anterior para posterior: A (anterior ao corpo), I, II, III, IV e P (posterior).",
      "Vasos: veia cava à direita e aorta à esquerda, anteriores ao corpo.",
      "O plexo lombar migra para a frente nos níveis mais baixos (L4–L5); a zona segura costuma ser a II–III.",
    ],
    tags: ["XLIF", "acesso lateral", "plexo lombar"],
  },
];
