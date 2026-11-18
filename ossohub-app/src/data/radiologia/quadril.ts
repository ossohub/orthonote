import type { Medida } from "./types";

const R = "pelve-quadril" as const;

export const PELVE_QUADRIL: Medida[] = [
  // ——— Linhas e incidências ———
  {
    id: "pq-qualidade-ap", nome: "AP de pelve de boa qualidade", regiao: R, grupo: "Linhas e incidências",
    inc: "AP de pelve",
    resumo: "Rotação e inclinação da pelve mudam o crossover, a parede posterior e o colo.",
    como: [
      "Rotação: cóccix alinhado sobre a sínfise púbica e forames obturatórios simétricos.",
      "Inclinação: sacro (ponta do cóccix) ~1–3 cm acima da sínfise. Mais perto = imagem em outlet; mais longe = inlet.",
      "Forames obturatórios estreitos (\"olhos de gato\") sugerem pelve inclinada para baixo (inlet); arredondados, inclinada para cima (outlet).",
      "Rotação do fêmur: trocânter menor todo visível = rotação externa; escondido = rotação interna.",
    ],
    obs: ["O colo é antevertido ~15°: rodar o membro 15° para dentro deixa o colo paralelo ao filme. Em rotação externa o colo parece mais valgo."],
    tags: ["incidência", "rotação", "inlet", "outlet"],
  },
  {
    id: "pq-linhas-acetabulo", nome: "Linhas do acetábulo", regiao: R, grupo: "Linhas e incidências",
    inc: "AP de pelve e Judet",
    resumo: "Seis referências para ler fraturas e deformidades do acetábulo.",
    tabela: {
      cab: ["Linha", "O que representa"],
      linhas: [
        ["1. Iliopectínea (arqueada)", "Coluna anterior"],
        ["2. Ilioisquiática", "Coluna posterior (parte posterior da lâmina quadrilátera e ísquio)"],
        ["3. Teto do acetábulo", "Domo de carga"],
        ["4. Gota de lágrima (U)", "Parede medial do acetábulo + lâmina quadrilátera anteroinferior"],
        ["5. Rebordo anterior", "Parede anterior"],
        ["6. Rebordo posterior", "Parede posterior"],
      ],
    },
    obs: [
      "Judet obturatriz oblíqua: coluna anterior e parede posterior. Judet ilíaca oblíqua: coluna posterior e parede anterior.",
      "Lâmina quadrilátera: placa óssea plana que forma a parede lateral da pelve verdadeira, junto à parede medial do acetábulo.",
    ],
    tags: ["Judet", "coluna anterior", "coluna posterior", "fratura do acetábulo"],
  },
  {
    id: "pq-si-sinfise", nome: "Largura da sacroilíaca e da sínfise", regiao: R, grupo: "Linhas e incidências",
    inc: "AP de pelve",
    resumo: "Valores de referência para suspeitar de lesão do anel pélvico.",
    valores: [
      { r: "Sacroilíaca", v: "2–4 mm (< 5 mm)", t: "n" },
      { r: "Sínfise — adulto", v: "< 5 mm", t: "n" },
      { r: "Sínfise — criança/adolescente", v: "< 10 mm", t: "n" },
    ],
    tags: ["sínfise", "sacroilíaca", "anel pélvico"],
  },
  {
    id: "pq-rebordos", nome: "Rebordos anterior e posterior do acetábulo", regiao: R, grupo: "Versão acetabular e impacto",
    inc: "AP de pelve sem rotação",
    resumo: "Relação normal dos rebordos e distância entre eles como estimativa da versão.",
    valores: [
      { r: "Distância entre rebordos — normal", v: "≈ 1,5 cm", t: "n" },
      { r: "Anteversão diminuída", v: "< 1,5 cm", t: "l" },
      { r: "Sem anteversão", v: "≈ 0", t: "a" },
      { r: "Anteversão aumentada", v: "bem > 1,5 cm", t: "a" },
    ],
    como: [
      "Normal: o rebordo anterior fica acima e medial ao posterior, e os dois convergem no teto.",
      "O rebordo posterior passa aproximadamente pelo centro da cabeça femoral.",
    ],
    tags: ["versão", "retroversão", "rebordo"],
  },
  {
    id: "pq-crossover", nome: "Sinal do cruzamento (crossover / figura em 8)", regiao: R, grupo: "Versão acetabular e impacto",
    inc: "AP de pelve sem rotação",
    resumo: "Sinal de retroversão acetabular — impacto tipo pincer.",
    valores: [
      { r: "Normal", v: "rebordos só se encontram no teto", t: "n" },
      { r: "Retroversão", v: "rebordos se cruzam antes do teto", t: "a" },
    ],
    obs: [
      "Também aparece com parede posterior deficiente (centro da cabeça lateral ao rebordo posterior).",
      "Pelve rodada ou inclinada cria falso cruzamento: conferir a qualidade da AP antes.",
    ],
    tags: ["FAI", "pincer", "retroversão", "impacto femoroacetabular"],
  },
  {
    id: "pq-parede-posterior", nome: "Sinal da parede posterior", regiao: R, grupo: "Versão acetabular e impacto",
    inc: "AP de pelve",
    resumo: "Posição do rebordo posterior em relação ao centro da cabeça.",
    valores: [
      { r: "Normal", v: "centro da cabeça alinhado ou medial ao rebordo posterior", t: "n" },
      { r: "Parede proeminente", v: "rebordo lateral ao centro da cabeça", t: "a" },
      { r: "Parede deficiente", v: "rebordo medial ao centro da cabeça (retroversão, displasia)", t: "a" },
    ],
    obs: ["Parede posterior proeminente pode causar impacto posterior em extensão e rotação externa."],
    tags: ["FAI", "parede posterior", "displasia"],
  },
  {
    id: "pq-anteversao-acetabular", nome: "Anteversão acetabular (TC)", regiao: R, grupo: "Versão acetabular e impacto",
    inc: "TC axial",
    resumo: "Ângulo entre a linha dos rebordos e a perpendicular à linha que une as cabeças.",
    valores: [{ r: "Normal", v: "≈ 15–20°", t: "n" }],
    tags: ["versão", "tomografia"],
  },
  {
    id: "pq-alfa", nome: "Ângulo alfa", regiao: R, grupo: "Versão acetabular e impacto",
    inc: "Perfil cross-table, Dunn ou RM radial",
    resumo: "Quantifica a perda de esfericidade da junção cabeça-colo — impacto tipo cam.",
    valores: [
      { r: "Normal", v: "< 55° (tipicamente ≈ 40° ou menos)", t: "n" },
      { r: "Cam", v: "≥ 55° (alguns usam 50°)", t: "a" },
    ],
    como: [
      "Desenhar um círculo ajustado à cabeça femoral e marcar o centro.",
      "Linha 1: do centro da cabeça pelo eixo do colo (centro do colo na parte mais estreita).",
      "Linha 2: do centro até o ponto onde o contorno da cabeça sai do círculo.",
      "O ângulo entre as duas linhas é o alfa.",
    ],
    obs: ["Deformidade em \"cabo de pistola\" no AP corresponde a alfa aumentado."],
    tags: ["cam", "FAI", "impacto femoroacetabular", "pistol grip"],
  },
  {
    id: "pq-offset", nome: "Offset cabeça-colo", regiao: R, grupo: "Versão acetabular e impacto",
    inc: "Perfil cross-table",
    resumo: "Distância entre o contorno anterior da cabeça e o do colo.",
    valores: [
      { r: "Offset normal", v: "11,6 ± 0,7 mm", t: "n" },
      { r: "Sugere impacto", v: "< 10 mm", t: "a" },
      { r: "Razão offset/diâmetro da cabeça — normal", v: "0,21 ± 0,03", t: "n" },
      { r: "Razão — impacto", v: "< 0,18 (média no FAI 0,13)", t: "a" },
    ],
    como: ["Linhas paralelas ao eixo do colo tangentes à borda anterior do colo e à borda anterior da cabeça; medir a distância entre elas."],
    tags: ["cam", "FAI", "offset"],
  },
  // ——— Displasia e cobertura ———
  {
    id: "pq-wiberg", nome: "Ângulo centro-borda lateral (Wiberg)", regiao: R, grupo: "Displasia e cobertura",
    inc: "AP de pelve",
    resumo: "Cobertura lateral da cabeça — principal ângulo na displasia residual.",
    valores: [
      { r: "Normal (adulto, ≥ 9 anos)", v: "≥ 25°", t: "n" },
      { r: "5 a 8 anos", v: "> 20°", t: "n" },
      { r: "Sugere displasia", v: "< 25° (muitos consideram 20–25° limítrofe)", t: "a" },
      { r: "Coxa profunda / protrusão", v: "> 39°", t: "a" },
    ],
    como: [
      "Marcar o centro da cabeça femoral.",
      "Linha vertical pelo centro (perpendicular à linha que une os centros das duas cabeças).",
      "Linha do centro até a borda lateral do teto esclerótico; o ângulo entre elas é o CE.",
    ],
    obs: ["Quanto mais raso e inclinado o acetábulo, menor o CE."],
    tags: ["displasia", "DDH", "cobertura", "CE"],
  },
  {
    id: "pq-lequesne", nome: "Ângulo centro-borda anterior (Lequesne)", regiao: R, grupo: "Displasia e cobertura",
    inc: "Falso perfil",
    resumo: "Cobertura anterior da cabeça femoral.",
    valores: [
      { r: "Normal", v: "≥ 20°", t: "n" },
      { r: "Sugere displasia", v: "< 20°", t: "a" },
    ],
    como: [
      "Falso perfil: paciente em pé, quadril afetado encostado no chassi, pelve rodada 65° e pé paralelo ao chassi.",
      "Linha vertical pelo centro da cabeça e linha do centro até a borda anterior do acetábulo.",
    ],
    tags: ["falso perfil", "displasia", "cobertura anterior"],
  },
  {
    id: "pq-sharp", nome: "Ângulo acetabular de Sharp", regiao: R, grupo: "Displasia e cobertura",
    inc: "AP de pelve",
    resumo: "Inclinação do teto em relação à horizontal (útil após o fechamento da trirradiada).",
    valores: [
      { r: "Normal — 1 a 10 anos", v: "≤ 45°", t: "n" },
      { r: "Normal — > 10 anos e adulto", v: "≤ 40°", t: "n" },
      { r: "Displasia", v: "> 45° (1–10 anos) · > 40° (> 10 anos)", t: "a" },
    ],
    como: ["Linha entre as gotas de lágrima (ou pontos inferiores das gotas) e linha da gota até a borda lateral do teto; medir o ângulo."],
    tags: ["displasia", "teto acetabular"],
  },
  {
    id: "pq-tonnis", nome: "Ângulo do teto de Tönnis (HTE / sourcil)", regiao: R, grupo: "Displasia e cobertura",
    inc: "AP de pelve",
    resumo: "Inclinação da zona de carga esclerótica (sourcil) — substitui o índice acetabular quando a trirradiada fecha.",
    valores: [
      { r: "Normal (adolescente e adulto)", v: "−10° a +10°", t: "n" },
    ],
    tabela: {
      cab: ["Grau (Tschauner)", "Ângulo"],
      linhas: [["1 — normal", "< 9°"], ["2 — levemente anormal", "10–15°"], ["3 — gravemente anormal", "16–25°"], ["4 — extremamente anormal", "> 25°"]],
    },
    obs: ["Teto quase horizontal distribui a pressão de forma uniforme; teto inclinado sobrecarrega a borda lateral."],
    tags: ["Tönnis", "sourcil", "displasia", "HTE"],
  },
  {
    id: "pq-cobertura", nome: "Índice de cobertura / extrusão (Weinstein)", regiao: R, grupo: "Displasia e cobertura",
    inc: "AP de pelve",
    resumo: "Porcentagem da largura da cabeça coberta pelo teto.",
    valores: [
      { r: "Cabeça coberta ÷ largura total", v: "≥ 75%", t: "n" },
      { r: "Anormal", v: "< 75%", t: "a" },
    ],
    tags: ["extrusão", "cobertura", "displasia", "Perthes"],
  },
  {
    id: "pq-coxa-profunda", nome: "Coxa profunda e protrusão acetabular", regiao: R, grupo: "Displasia e cobertura",
    inc: "AP de pelve",
    resumo: "Acetábulo profundo demais — sobrecobertura (pincer).",
    valores: [
      { r: "Coxa profunda — homem", v: "fundo do acetábulo > 3 mm medial à ilioisquiática (< −3 mm)", t: "a" },
      { r: "Coxa profunda — mulher", v: "> 6 mm medial à ilioisquiática (< −6 mm)", t: "a" },
      { r: "Protrusão", v: "cabeça femoral medial à linha ilioisquiática", t: "a" },
      { r: "CE de Wiberg", v: "> 39° nas duas", t: "a" },
    ],
    como: ["Medir a distância entre a linha do fundo do acetábulo (linha acetabular) e a ilioisquiática: positivo quando o fundo é lateral, negativo quando é medial."],
    obs: ["Coxa profunda = fossa funda; protrusão = cabeça medializada. Muitos usam como sinônimos; a coxa profunda pode preceder a protrusão."],
    tags: ["protrusão", "pincer", "sobrecobertura"],
  },
  {
    id: "pq-cobertura-tc", nome: "Setores de cobertura acetabular na TC (Anda)", regiao: R, grupo: "Displasia e cobertura",
    inc: "TC axial pelo centro das cabeças",
    resumo: "Cobertura anterior, posterior e total da cabeça femoral.",
    tabela: {
      cab: ["Setor", "Homens", "Mulheres"],
      linhas: [
        ["AASA — anterior", "64° ± 6°", "63° ± 6°"],
        ["PASA — posterior", "102° ± 8°", "105° ± 8°"],
        ["HASA — horizontal (total)", "167° ± 11°", "169° ± 10°"],
      ],
    },
    como: ["Linha entre os centros das cabeças; do centro de cada cabeça, linhas até o rebordo anterior e o posterior; medir cada setor a partir da linha entre os centros."],
    tags: ["tomografia", "cobertura", "displasia"],
  },
  // ——— Colo e cabeça ———
  {
    id: "pq-nsa", nome: "Ângulo colodiafisário (cervicodiafisário)", regiao: R, grupo: "Colo e cabeça femoral",
    inc: "AP com o membro em 15° de rotação interna",
    resumo: "Ângulo entre o eixo do colo e o da diáfise.",
    valores: [
      { r: "Adulto", v: "120–130°", t: "n" },
      { r: "Coxa valga", v: "> 130°", t: "a" },
      { r: "Coxa vara", v: "< 120°", t: "a" },
    ],
    obs: [
      "A anteversão faz o ângulo parecer maior na radiografia: rodar 15° para dentro antes de medir.",
      "Atalho no planejamento: a linha da ponta do trocânter maior passa no centro da cabeça quando o ângulo é ~130°; acima do centro = varo.",
      "Valores por idade: ver \"Ângulo colodiafisário na criança\".",
    ],
    tags: ["NSA", "coxa vara", "coxa valga"],
  },
  {
    id: "pq-trabeculas", nome: "Trabéculas do fêmur proximal", regiao: R, grupo: "Colo e cabeça femoral",
    inc: "AP do quadril",
    resumo: "Arquitetura que segue a lei de Wolff (forma segue função).",
    como: [
      "Compressivo principal: da cortical medial do colo para a cabeça.",
      "Tensil principal: arco da cortical lateral, abaixo do trocânter, para a cabeça.",
      "Compressivo e tensil secundários e grupo do trocânter maior.",
      "Triângulo de Ward: área de menor densidade entre os grupos principais.",
    ],
    obs: ["Útil para estimar osteoporose e para o índice de alinhamento de Garden."],
    tags: ["Wolff", "Ward", "osteoporose", "Singh"],
  },
  {
    id: "pq-garden-index", nome: "Índice de alinhamento de Garden", regiao: R, grupo: "Fraturas", tipo: "fratura",
    inc: "AP e perfil do quadril",
    resumo: "Confere a redução da fratura do colo pelas trabéculas compressivas.",
    valores: [
      { r: "AP — normal", v: "160–180°", t: "n" },
      { r: "AP < 160°", v: "varo", t: "a" },
      { r: "AP > 180°", v: "valgo excessivo", t: "a" },
      { r: "Perfil — normal", v: "≈ 180°", t: "n" },
      { r: "Perfil — desvio > 20°", v: "anteversão ou retroversão excessiva", t: "a" },
    ],
    como: ["No AP, ângulo entre a cortical medial da diáfise e o eixo das trabéculas compressivas mediais."],
    obs: ["Sinais em S: o contorno côncavo do colo encontra o convexo da cabeça formando um S (ou S invertido) em cima, embaixo, na frente e atrás; restaurar os quatro S = redução anatômica."],
    tags: ["colo do fêmur", "redução", "Garden"],
  },
  {
    id: "pq-pauwels", nome: "Ângulo de Pauwels", regiao: R, grupo: "Fraturas", tipo: "fratura",
    inc: "AP do quadril",
    resumo: "Inclinação do traço da fratura do colo em relação à horizontal — quanto mais vertical, mais cisalhamento.",
    tabela: { cab: ["Tipo", "Ângulo"], linhas: [["I", "< 30°"], ["II", "30–50°"], ["III", "> 50°"]] },
    tags: ["colo do fêmur", "Pauwels", "cisalhamento"],
  },
  {
    id: "pq-fx-cabeca", nome: "Fratura da cabeça femoral — tratamento fechado", regiao: R, grupo: "Fraturas", tipo: "fratura",
    resumo: "Quando é possível tratar sem cirurgia.",
    valores: [
      { r: "Fragmento", v: "abaixo da fóvea (fora da zona de carga)", t: "n" },
      { r: "Degrau", v: "< 1 mm", t: "n" },
      { r: "Quadril", v: "estável", t: "n" },
    ],
    tags: ["Pipkin", "cabeça femoral"],
  },
  {
    id: "pq-roof-arc", nome: "Ângulos do arco do teto (roof arc, Matta)", regiao: R, grupo: "Fraturas", tipo: "fratura",
    inc: "AP, obturatriz oblíqua e ilíaca oblíqua (e TC)",
    resumo: "Mostra se o traço da fratura do acetábulo atinge o domo de carga.",
    valores: [
      { r: "Domo de carga íntegro", v: "> 45° nas três incidências", t: "n" },
      { r: "Traço no domo", v: "< 45°", t: "a" },
      { r: "Critério mais recente", v: "medial > 45° · anterior > 25° · posterior > 70°", t: "i" },
      { r: "TC", v: "traço nos 10 mm superiores do acetábulo (ou em corte a ≤ 2 cm do ápice do domo) = dentro do arco de 45°", t: "a" },
    ],
    como: [
      "Linha vertical pelo centro geométrico do acetábulo.",
      "Linha do centro até onde o traço encontra o teto; medir o ângulo.",
      "Medial no AP, anterior na obturatriz e posterior na ilíaca oblíqua.",
    ],
    obs: ["Não se aplica a fraturas das duas colunas nem de parede posterior (não há teto íntegro de referência). A TC é mais confiável para ver o comprometimento articular."],
    tags: ["acetábulo", "domo", "conservador"],
  },
  {
    id: "pq-fx-acetabulo", nome: "Fratura do acetábulo — tratamento não operatório", regiao: R, grupo: "Fraturas", tipo: "fratura",
    resumo: "Critérios para manter conservador.",
    como: [
      "Sem desvio e quadril estável.",
      "Coluna anterior distal (raiz do ramo púbico) ou transversa infratectal com congruência mantida pelo restante do teto.",
      "Arcos do teto medial, anterior e posterior > 45°; desvio no domo < 2 mm.",
      "Parede posterior: fragmento < 20% em geral é conservador; > 50% quase sempre cirúrgico; entre os dois, teste de estresse sob fluoroscopia decide.",
    ],
    tags: ["acetábulo", "parede posterior", "estresse"],
  },
  {
    id: "pq-fx-pelve", nome: "Estabilidade do anel pélvico", regiao: R, grupo: "Fraturas", tipo: "fratura",
    resumo: "Relação entre ligamentos lesados, diástase e instabilidade.",
    tabela: {
      cab: ["Estruturas lesadas", "Resultado"],
      linhas: [
        ["Só a sínfise", "diástase < 2,5 cm"],
        ["Sínfise + sacroespinhoso", "diástase > 2,5 cm (instabilidade rotacional)"],
        ["+ sacrotuberoso + sacroilíaco posterior", "instável vertical, posterior e rotacional"],
      ],
    },
    valores: [
      { r: "Sinais de instabilidade", v: "desvio sacroilíaco ≥ 5 mm em qualquer plano; gap posterior (em vez de impacção); avulsão do processo transverso de L5, da borda lateral do sacro ou da espinha isquiática", t: "a" },
      { r: "Estresse push-pull sob anestesia", v: "≥ 0,5 cm de movimento ou ≥ 1 cm de desvio vertical = instável", t: "a" },
    ],
    obs: ["Indicações relativas de cirurgia: diástase > 2,5 cm, discrepância > 1,5 cm, deformidade rotacional, desvio sacral > 1 cm, dor intratável."],
    tags: ["pelve", "sínfise", "open book", "instabilidade vertical"],
  },
  // ——— Artroplastia ———
  {
    id: "pq-discrepancia", nome: "Discrepância de comprimento no RX de pelve", regiao: R, grupo: "Artroplastia — planejamento",
    inc: "AP de pelve",
    resumo: "Compara a altura dos trocânteres menores em relação à pelve.",
    como: [
      "Traçar uma horizontal pelas tuberosidades isquiáticas (ou pelas gotas de lágrima).",
      "Medir de cada trocânter menor até essa linha e comparar os lados.",
    ],
    obs: ["Depende da rotação do fêmur e da inclinação da pelve; não substitui a escanometria quando a diferença importa."],
    tags: ["discrepância", "comprimento", "ATQ"],
  },
  {
    id: "pq-dorr", nome: "Classificação de Dorr (canal femoral)", regiao: R, grupo: "Artroplastia — planejamento",
    inc: "AP e perfil do fêmur proximal",
    resumo: "Forma do canal femoral — orienta haste cimentada ou não cimentada.",
    tabela: {
      cab: ["Tipo", "Aspecto", "Implicação"],
      linhas: [
        ["A", "Córtex grossa, canal estreito (funil)", "Encaixe justo; pode exigir fresar mais"],
        ["B", "Intermediário", "Sem surpresas"],
        ["C", "Córtex fina, canal largo (\"chaminé\")", "Press-fit difícil e risco de fratura — considerar cimentar"],
      ],
    },
    como: ["Índice cortical: (largura externa − largura do canal) ÷ largura externa, medido 10 cm abaixo do trocânter menor."],
    tags: ["Dorr", "haste", "cimentada", "osteoporose"],
  },
  {
    id: "pq-atq-template", nome: "Planejamento (template) da artroplastia do quadril", regiao: R, grupo: "Artroplastia — planejamento",
    inc: "AP de pelve com marcador de magnificação",
    resumo: "Passos para escolher tamanhos, centro de rotação, offset e altura do corte.",
    como: [
      "Referências: canal femoral, trocânteres maior e menor, ponto de sela; teto e gota de lágrima; tuberosidades isquiáticas.",
      "Acetábulo: template com ~40° de abdução; borda medial perto da ilioisquiática e da gota; borda inferior no nível da gota. Marcar o centro do componente (= centro do quadril).",
      "Fêmur: haste que preencha o canal; o centro da nova cabeça acima do centro do acetábulo alonga, abaixo encurta.",
      "Centro da haste alinhado com a ponta do trocânter maior para o comprimento correto; ponta da haste medial demais = valgo.",
      "Corte do colo: medir a distância do ponto do corte até o trocânter menor (~10 mm) para reproduzir na cirurgia; em vias anteriores, usar o ponto de sela.",
      "Offset: restaurar com haste de offset maior/menor, outro ângulo colo-haste ou colo mais longo.",
      "Com o lado doente muito deformado, planejar sobre o lado sadio.",
    ],
    obs: ["Osteófitos mediais grandes (distância parede medial–cabeça aumentada) dificultam achar o centro verdadeiro. Alongar o colo aumenta offset e altura juntos."],
    tags: ["ATQ", "template", "offset", "planejamento"],
  },
  {
    id: "pq-lewinnek", nome: "Zona segura do componente acetabular (Lewinnek)", regiao: R, grupo: "Artroplastia — pós-operatório",
    inc: "AP de pelve e perfil",
    resumo: "Faixa de posição do cup associada a menos luxação.",
    valores: [
      { r: "Inclinação (abdução)", v: "40° ± 10° (30–50°)", t: "n" },
      { r: "Anteversão", v: "15° ± 10° (5–25°)", t: "n" },
    ],
    obs: ["Inclinação alta: instabilidade e desgaste; baixa: impacto e limitação da abdução. A anteversão é vista no perfil (ou TC)."],
    tags: ["Lewinnek", "cup", "inclinação", "luxação"],
  },
  {
    id: "pq-atq-posop", nome: "Radiografia pós-operatória da artroplastia do quadril", regiao: R, grupo: "Artroplastia — pós-operatório",
    inc: "AP de pelve e perfil",
    resumo: "Checklist do cup, da haste, do comprimento e do offset.",
    como: [
      "Qualidade: cóccix sobre a sínfise, forames simétricos, sacro ~2 cm acima da sínfise.",
      "Inclinação do cup: ângulo entre a linha bi-isquiática e a linha da borda do cup (30–50°).",
      "Profundidade: cup encostado na linha ilioisquiática (Köhler). Altura: borda inferior no nível da gota (comparar com o outro lado).",
      "Centro de rotação horizontal: distância centro da cabeça–gota, igual ao outro lado; cup lateralizado aumenta a carga e a luxação.",
      "Comprimento: perpendicular do trocânter menor à linha da pelve, comparando os lados. Prótese baixa = membro curto e abdutores fracos; alta = alongamento e luxação.",
      "Offset: centro da cabeça ao eixo da haste; comparar distância trocânter menor–ísquio dos dois lados. Altura vertical: centro da cabeça no nível da ponta do trocânter maior.",
      "Haste: alinhada à diáfise, ponta central (medial = valgo; lateral = varo, mais soltura e fratura), preenchendo o canal; sem sinais de fratura periprotética.",
      "Cimento: manto contínuo, sem falhas — ~2 mm no acetábulo; no fêmur a compilação cita ~4 mm (muitos aceitam 2–4 mm). Haste não cimentada: pequeno degrau na transição do revestimento poroso.",
    ],
    tags: ["ATQ", "pós-operatório", "offset", "comprimento", "cimento"],
  },
  {
    id: "pq-gruen", nome: "Zonas de Gruen e DeLee-Charnley", regiao: R, grupo: "Artroplastia — pós-operatório",
    inc: "AP e perfil",
    resumo: "Localizam linhas de radiolucência e osteólise ao redor da prótese.",
    como: [
      "Fêmur (Gruen): 14 zonas — 1 a 7 no AP (1 trocânter maior → 4 ponta da haste → 7 calcar) e 8 a 14 no perfil.",
      "Acetábulo (DeLee-Charnley): zonas I (superolateral), II (central) e III (inferomedial).",
    ],
    tags: ["Gruen", "osteólise", "soltura", "DeLee"],
  },
  {
    id: "pq-wasielewski", nome: "Quadrantes acetabulares para parafusos (Wasielewski)", regiao: R, grupo: "Artroplastia — pós-operatório", tipo: "cirurgia",
    resumo: "Onde é seguro passar parafusos no cup.",
    como: [
      "Linha A: da espinha ilíaca anterossuperior ao centro do acetábulo. Linha B: perpendicular à A, pelo centro.",
    ],
    tabela: {
      cab: ["Quadrante", "Risco", "Conduta"],
      linhas: [
        ["Posterossuperior", "Ciático, glúteo superior", "Zona segura"],
        ["Posteroinferior", "Ciático, glúteo inferior, pudendo", "Seguro se parafuso < 20 mm"],
        ["Anterossuperior", "Artéria e veia ilíacas externas", "Evitar"],
        ["Anteroinferior", "Feixe obturatório", "Evitar"],
      ],
    },
    tags: ["parafuso", "cup", "zona segura"],
  },
  // ——— Implantes e entradas ———
  {
    id: "pq-haste-anterograda", nome: "Ponto de entrada da haste femoral anterógrada", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    inc: "Fluoroscopia AP e perfil",
    resumo: "Entrada piriforme × trocantérica.",
    como: [
      "Haste reta (piriforme): fossa piriforme, alinhada ao centro do canal no AP e um pouco atrás do ponto mais alto do colo; o fio-guia sobrepõe a borda superior do colo em alguns milímetros.",
      "Haste trocantérica: ponta do trocânter maior, na vertente medial.",
      "Perfil: entrada alinhada ao canal.",
    ],
    obs: [
      "Entrada trocantérica lateral demais → varo e parafuso cefálico mal posicionado.",
      "Entrada anterior demais → risco de explosão (\"blowout\") do fêmur proximal.",
    ],
    tags: ["haste", "piriforme", "trocânter", "PFN"],
  },
  {
    id: "pq-tad", nome: "Distância ponta-ápice (TAD)", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    inc: "AP e perfil do quadril",
    resumo: "Posição do parafuso cefálico — principal preditor de cut-out.",
    valores: [
      { r: "Desejado", v: "< 25 mm (soma AP + perfil)", t: "n" },
      { r: "Risco de cut-out", v: "≥ 25 mm", t: "a" },
    ],
    como: [
      "Medir, no AP e no perfil, a distância da ponta do parafuso ao ápice da cabeça.",
      "Corrigir pela magnificação (diâmetro conhecido do parafuso) e somar as duas medidas.",
    ],
    obs: ["Posição ideal: centro-centro, ou levemente inferior no AP."],
    tags: ["TAD", "DHS", "cut-out", "intertrocantérica"],
  },
  {
    id: "pq-dhs", nome: "Pontos de entrada DHS e DCS", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    resumo: "Referências na face lateral do fêmur proximal.",
    como: [
      "Identificar a crista do vasto (origem do vasto lateral no trocânter maior).",
      "DHS: em frente ao trocânter menor, ~2 cm distal à crista do vasto, no meio da diáfise.",
      "DCS (proximal): ~2 cm distal à ponta do trocânter (ou 2 cm proximal à crista do vasto), na junção do terço anterior com os dois terços posteriores do trocânter.",
      "Fio de versão: extramedular, rente à cortical anterior do colo; distalmente, rente às cristas anteriores dos côndilos.",
    ],
    tags: ["DHS", "DCS", "parafuso deslizante"],
  },
  {
    id: "pq-canulados", nome: "Parafusos canulados no colo do fêmur", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    resumo: "Configuração em triângulo invertido.",
    como: [
      "Três parafusos paralelos em triângulo invertido: um inferior (apoiado no calcar), um posterior e um anterossuperior.",
      "Entrada acima do nível do trocânter menor para reduzir o risco de fratura subtrocantérica.",
    ],
    tags: ["canulado", "colo do fêmur"],
  },
  {
    id: "pq-iliossacral", nome: "Parafuso iliossacral e C-clamp", regiao: R, grupo: "Implantes e pontos de entrada", tipo: "cirurgia",
    inc: "Inlet, outlet e perfil do sacro",
    resumo: "Referências para fixar a sacroilíaca e o anel posterior.",
    como: [
      "Parafuso esponjoso de 6,5 mm no corpo de S1; S2 só se o corredor for adequado (alto risco neurovascular).",
      "Conferir no inlet (anteroposterior), outlet (craniocaudal) e perfil verdadeiro do sacro.",
      "C-clamp: pinos no cruzamento do eixo do fêmur com a vertical que desce da espinha ilíaca anterossuperior.",
    ],
    tags: ["iliossacral", "sacro", "C-clamp", "anel pélvico"],
  },
  {
    id: "pq-tracao-trocanter", nome: "Tração esquelética no trocânter (fêmur proximal)", regiao: R, grupo: "Tração e artrodese", tipo: "cirurgia",
    resumo: "Ponto de inserção do parafuso de tração lateral.",
    como: [
      "Face lateral do fêmur, ~2,5 cm abaixo da parte mais proeminente do trocânter maior, no meio entre as faces anterior e posterior.",
      "Parafuso esponjoso de rosca grossa, de lateral para medial.",
      "Evitar estruturas neurovasculares e a fise na criança.",
    ],
    tags: ["tração", "trocânter"],
  },
  {
    id: "pq-artrodese", nome: "Posição de artrodese do quadril", regiao: R, grupo: "Tração e artrodese", tipo: "cirurgia",
    resumo: "Posição funcional recomendada.",
    valores: [
      { r: "Flexão", v: "25–30°", t: "i" },
      { r: "Abdução", v: "0°", t: "i" },
      { r: "Rotação", v: "0°", t: "i" },
    ],
    tags: ["artrodese"],
  },
];

export const QUADRIL_INFANTIL: Medida[] = [
  {
    id: "qi-linhas", nome: "Linhas do quadril infantil", regiao: "quadril-infantil", grupo: "DDH — radiografia", ped: true,
    inc: "AP de pelve",
    resumo: "Referências básicas para displasia do desenvolvimento do quadril.",
    tabela: {
      cab: ["Linha", "Como traçar", "Normal"],
      linhas: [
        ["Hilgenreiner (Y)", "Horizontal pelas cartilagens trirradiadas (borda inferolateral do ílio)", "Base do índice acetabular"],
        ["Perkins-Ombrédanne", "Perpendicular à Hilgenreiner pela borda lateral do teto", "Núcleo/metáfise no quadrante inferomedial"],
        ["Shenton-Ménard", "Borda medial do colo + borda superior do forame obturatório", "Arco contínuo"],
        ["Calvé", "Borda lateral do ílio + borda lateral do colo", "Arco contínuo"],
      ],
    },
    tags: ["DDH", "Hilgenreiner", "Perkins", "Shenton"],
  },
  {
    id: "qi-indice-acetabular", nome: "Índice acetabular", regiao: "quadril-infantil", grupo: "DDH — radiografia", ped: true,
    inc: "AP de pelve",
    resumo: "Ângulo entre a Hilgenreiner e a linha até a borda lateral do teto.",
    tabela: {
      cab: ["Idade", "Média normal"],
      linhas: [["3–4 meses", "25°"], ["5–24 meses", "20°"], ["2–3 anos", "18°"], ["3–7 anos", "15°"], ["7–14 anos", "10°"]],
    },
    obs: ["Depois do fechamento da trirradiada, usar o ângulo do teto de Tönnis."],
    tags: ["DDH", "índice acetabular"],
  },
  {
    id: "qi-graf", nome: "Ultrassom de Graf", regiao: "quadril-infantil", grupo: "DDH — ultrassom", ped: true,
    inc: "Ultrassom coronal do quadril",
    resumo: "Ângulos do teto ósseo (alfa) e cartilaginoso (beta) no lactente.",
    valores: [
      { r: "Alfa — normal", v: "> 60°", t: "n" },
      { r: "Beta — normal", v: "< 55°", t: "n" },
      { r: "Displasia", v: "alfa cai e beta sobe", t: "a" },
    ],
    como: ["Linha de base pelo ílio; linha do teto ósseo (alfa) e linha do lábio (beta) em relação à base."],
    tags: ["Graf", "ultrassom", "DDH", "lactente"],
  },
  {
    id: "qi-von-rosen", nome: "Linha de Andrén-von Rosen", regiao: "quadril-infantil", grupo: "DDH — radiografia", ped: true,
    inc: "AP com quadris em ≥ 45° de abdução e rotação interna",
    resumo: "Teste radiográfico de subluxação no recém-nascido.",
    valores: [
      { r: "Normal", v: "eixo do fêmur cruza a pelve na borda superior do acetábulo", t: "n" },
      { r: "Subluxação/luxação", v: "eixo passa na espinha ilíaca anterossuperior ou acima", t: "a" },
    ],
    tags: ["von Rosen", "DDH", "recém-nascido"],
  },
  {
    id: "qi-wiberg", nome: "Ângulo centro-borda na criança", regiao: "quadril-infantil", grupo: "DDH — radiografia", ped: true,
    inc: "AP de pelve",
    resumo: "Cobertura lateral; de chave na displasia residual.",
    valores: [
      { r: "5 a 8 anos", v: "> 20°", t: "n" },
      { r: "≥ 9 anos", v: "> 25°", t: "n" },
    ],
    obs: ["Pouco confiável antes dos 5 anos (núcleo de ossificação pequeno)."],
    tags: ["CE", "Wiberg", "displasia residual"],
  },
  {
    id: "qi-smith", nome: "Índice de migração de Smith", regiao: "quadril-infantil", grupo: "Migração da cabeça", ped: true,
    inc: "AP de pelve",
    resumo: "Deslocamento lateral e superior da cabeça femoral.",
    valores: [
      { r: "Lateral c/b — normal", v: "0,6–0,9", t: "n" },
      { r: "Lateral c/b — luxação", v: "> 0,9", t: "a" },
      { r: "Superior h/b — normal", v: "0,1–0,2", t: "n" },
      { r: "Superior h/b — luxação", v: "0 a −0,7", t: "a" },
    ],
    como: [
      "Referências: Hilgenreiner, Perkins e linha média vertical pelo sacro e sínfise.",
      "b = largura da metáfise femoral; c = distância da linha média à borda medial da metáfise; h = altura da metáfise em relação à Hilgenreiner.",
    ],
    tags: ["Smith", "migração", "luxação"],
  },
  {
    id: "qi-reimers", nome: "Índice de migração de Reimers", regiao: "quadril-infantil", grupo: "Migração da cabeça", ped: true,
    inc: "AP de pelve",
    resumo: "Porcentagem da cabeça descoberta lateral à linha de Perkins — padrão na paralisia cerebral.",
    valores: [
      { r: "0 a 14 anos", v: "0%", t: "n" },
      { r: "4 a 16 anos", v: "< 10%", t: "n" },
      { r: "Subluxação", v: "33–99%", t: "a" },
      { r: "Luxação", v: "100%", t: "a" },
    ],
    como: [
      "a = parte da cabeça lateral à Perkins; b = largura total da cabeça (paralela à Hilgenreiner). Índice = a/b × 100.",
      "Atalho: apoiar uma régua oblíqua com 0 cm numa borda da cabeça e 10 cm na outra; o número onde cruza a Perkins é a porcentagem descoberta.",
    ],
    obs: ["Vantagem: pouco sensível à rotação da pelve e do membro."],
    tags: ["Reimers", "paralisia cerebral", "migração"],
  },
  {
    id: "qi-gage-winter", nome: "Estações de Gage e Winter", regiao: "quadril-infantil", grupo: "Migração da cabeça", ped: true,
    inc: "AP de pelve",
    resumo: "Acompanha a descida da cabeça na tração antes da redução da DDH.",
    tabela: {
      cab: ["Estação", "Posição da metáfise proximal"],
      linhas: [
        ["−1", "Borda medial acima da Hilgenreiner"],
        ["0", "Entre a Hilgenreiner e a posição normal do lado oposto"],
        ["+1", "Na altura da metáfise normal contralateral"],
        ["+2", "Abaixo da posição normal"],
      ],
    },
    tags: ["tração", "DDH", "Gage"],
  },
  {
    id: "qi-klein", nome: "Linha de Klein", regiao: "quadril-infantil", grupo: "Epifisiólise (SCFE)", ped: true,
    inc: "AP e perfil (rã)",
    resumo: "Triagem de epifisiólise.",
    valores: [
      { r: "Normal", v: "linha da borda superior do colo corta a epífise (AP e perfil)", t: "n" },
      { r: "Epifisiólise", v: "linha não toca a epífise", t: "a" },
    ],
    tags: ["SCFE", "epifisiólise", "Klein"],
  },
  {
    id: "qi-southwick", nome: "Ângulo de Southwick", regiao: "quadril-infantil", grupo: "Epifisiólise (SCFE)", ped: true,
    inc: "Perfil em rã",
    resumo: "Gravidade do escorregamento: ângulo epífise-diáfise comparado ao lado normal.",
    tabela: { cab: ["Grau", "Diferença para o lado normal"], linhas: [["Leve", "< 30°"], ["Moderado", "31–50°"], ["Grave", "> 50°"]] },
    como: ["Linha perpendicular à base da epífise × eixo da diáfise; subtrair o valor do lado normal."],
    obs: ["Em escorregamento bilateral, usar 12° como valor normal de referência."],
    tags: ["SCFE", "Southwick", "slip angle"],
  },
  {
    id: "qi-hea", nome: "Ângulo epifisário de Hilgenreiner (coxa vara)", regiao: "quadril-infantil", grupo: "Coxa vara", ped: true,
    inc: "AP de pelve",
    resumo: "Ângulo entre a fise femoral proximal e a Hilgenreiner.",
    valores: [
      { r: "Normal (compilação)", v: "≈ 20–30°", t: "n" },
      { r: "Coxa vara do desenvolvimento", v: "≈ 60° ou mais", t: "a" },
    ],
    obs: ["Conduta clássica (Weinstein): < 45° tende a resolver; 45–60° observar; > 60° tende a progredir e indica osteotomia valgizante."],
    tags: ["coxa vara", "HEA", "fise"],
  },
  {
    id: "qi-nsa", nome: "Ângulo colodiafisário na criança", regiao: "quadril-infantil", grupo: "Coxa vara", ped: true,
    inc: "AP com rotação interna",
    resumo: "Valores normais mudam com a idade.",
    tabela: {
      cab: ["Idade", "Normal (limítrofe)", "Média"],
      linhas: [
        ["1 a 3 anos", "125–150°", "140°"], ["3 a 5 anos", "125–145°", "135°"], ["5 a 10 anos", "120–145°", "132°"],
        ["10 a 14 anos", "120–140°", "130°"], ["≥ 14 anos", "120–135°", "128°"],
      ],
    },
    tags: ["NSA", "colodiafisário", "coxa valga"],
  },
];
