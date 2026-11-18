import type { Medida } from "./types";

export const GERAL: Medida[] = [
  {
    id: "g-perda-ossea", nome: "Perda óssea visível no RX", regiao: "geral", grupo: "Princípios",
    inc: "Radiografia simples × TC",
    resumo: "Quanto osso precisa ser destruído para a lesão aparecer na radiografia.",
    valores: [{ r: "Limiar no RX", v: "> 30% de perda óssea", t: "i" }],
    obs: ["Lesões líticas pequenas podem não aparecer no RX: a TC é mais sensível e ainda mostra extensão para partes moles."],
    tags: ["tumor", "lítica", "osteólise", "tomografia"],
  },
  {
    id: "g-ped-regra", nome: "Desvio aceitável na criança — regra geral", regiao: "geral", grupo: "Fraturas na criança", tipo: "fratura", ped: true,
    resumo: "O que faz uma fratura infantil remodelar e quando tratar como adulto.",
    valores: [
      { r: "Pouco crescimento restante (2–4 anos, segundo a compilação)", v: "tratar como adulto", t: "a" },
      { r: "Após ~10 anos de idade", v: "preferir não aceitar deformidade", t: "l" },
      { r: "Deformidade rotacional", v: "não remodela", t: "a" },
    ],
    obs: [
      "Remodela mais: criança mais nova, fratura perto da fise de crescimento rápido, angulação no plano de movimento da articulação vizinha.",
      "Correção espontânea típica: cerca de 1° por mês (≈ 10° por ano), maior quanto maior a deformidade.",
      "Fraturas sem tabela própria seguem o raciocínio desviada × sem desvio.",
    ],
    tags: ["remodelação", "pediatria", "aceitação"],
  },
];

export const MEMBRO_INFERIOR: Medida[] = [
  // ——— Alinhamento coronal ———
  {
    id: "mi-panoramica", nome: "Panorâmica de membros inferiores (técnica)", regiao: "membro-inferior", grupo: "Alinhamento coronal",
    inc: "AP em ortostase, quadril ao tornozelo",
    resumo: "Base para todos os eixos: a posição errada da perna muda os ângulos.",
    como: [
      "Paciente em pé, com as patelas voltadas para frente e centradas entre os côndilos femorais.",
      "Em geral isso exige 8–10° de rotação externa dos pés.",
      "Se houver torção tibial, rodar a perna até a patela apontar para frente, independente de para onde o pé aponta.",
    ],
    obs: ["Checagem clínica: espinha ilíaca anterossuperior, centro da patela e 2º dedo devem ficar na mesma linha."],
    tags: ["escanometria", "telerradiografia", "eixo mecânico"],
  },
  {
    id: "mi-eixo-anatomico", nome: "Ângulo tibiofemoral anatômico", regiao: "membro-inferior", grupo: "Alinhamento coronal",
    inc: "AP em ortostase",
    resumo: "Ângulo entre os eixos diafisários do fêmur e da tíbia (valgo fisiológico).",
    valores: [
      { r: "Normal", v: "6,85° ± 1,4° de valgo", t: "n" },
      { r: "Geno valgo", v: "> 8,3°", t: "a" },
      { r: "Geno varo", v: "< 0°", t: "a" },
    ],
    como: ["Traçar o eixo anatômico do fêmur e da tíbia pelas linhas médias das diáfises e medir o ângulo no joelho."],
    tags: ["valgo", "varo", "tibiofemoral"],
  },
  {
    id: "mi-mad", nome: "Desvio do eixo mecânico (MAD)", regiao: "membro-inferior", grupo: "Alinhamento coronal",
    inc: "Panorâmica AP em ortostase",
    resumo: "Distância entre o eixo mecânico do membro e o centro do joelho.",
    valores: [
      { r: "Normal (Bhave)", v: "4 ± 4 mm medial", t: "n" },
      { r: "Normal (Paley)", v: "10 ± 7 mm medial", t: "n" },
      { r: "Geno valgo", v: "desvio lateral maior que o normal", t: "a" },
      { r: "Geno varo", v: "desvio medial maior que o normal", t: "a" },
    ],
    como: [
      "Ligar o centro da cabeça femoral ao centro do tornozelo (eixo mecânico).",
      "Medir, na linha articular do joelho, a distância dessa linha até o centro do joelho.",
    ],
    obs: ["O eixo mecânico neutro passa pelo centro do joelho; o eixo anatômico do fêmur fica ~6° (5–7°) do mecânico."],
    tags: ["MAD", "deformidade", "osteotomia"],
  },
  {
    id: "mi-paley", nome: "Ângulos de orientação articular (Paley)", regiao: "membro-inferior", grupo: "Alinhamento coronal",
    inc: "Panorâmica AP e perfil",
    resumo: "Localizam onde está a deformidade (fêmur, tíbia ou articulação) — base do planejamento de osteotomia.",
    tabela: {
      cab: ["Ângulo", "Eixo", "Normal (faixa)"],
      linhas: [
        ["mLPFA — lateral proximal do fêmur", "mecânico", "90° (85–95)"],
        ["mLDFA — lateral distal do fêmur", "mecânico", "88° (85–90)"],
        ["aLDFA — lateral distal do fêmur", "anatômico", "81° (79–83)"],
        ["aMPFA — medial proximal do fêmur", "anatômico", "84° (80–89)"],
        ["MPTA — medial proximal da tíbia", "mecânico = anatômico", "87° (85–90)"],
        ["LDTA — lateral distal da tíbia", "mecânico = anatômico", "89° (86–92)"],
        ["PDFA — posterior distal do fêmur", "anatômico (perfil)", "83°"],
        ["PPTA — posterior proximal da tíbia", "anatômico (perfil)", "81°"],
        ["ADTA — anterior distal da tíbia", "anatômico (perfil)", "80°"],
      ],
    },
    como: [
      "Traçar as linhas de orientação: quadril (ponta do trocânter → centro da cabeça), femoral distal (tangente aos côndilos), tibial proximal (tangente aos platôs) e tornozelo (plafond).",
      "Medir cada ângulo entre a linha articular e o eixo (mecânico ou anatômico) do osso.",
      "No perfil só se usa o eixo anatômico (linhas mediodiafisárias).",
    ],
    tags: ["mLDFA", "MPTA", "LDTA", "osteotomia", "deformidade"],
  },
  {
    id: "mi-jlca", nome: "Ângulo de convergência das linhas articulares (JLCA)", regiao: "membro-inferior", grupo: "Alinhamento coronal",
    inc: "Panorâmica AP em ortostase",
    resumo: "Ângulo entre a linha femoral distal e a tibial proximal: mede a contribuição da frouxidão do joelho.",
    valores: [
      { r: "Normal", v: "0–2°", t: "n" },
      { r: "Frouxidão anormal", v: "> 2°", t: "a" },
    ],
    obs: ["JLCA aumentado soma ao desvio do eixo mecânico sem deformidade óssea — corrigir osso não corrige essa parte."],
    tags: ["frouxidão", "ligamento", "MAD"],
  },
  // ——— Rotação e torção ———
  {
    id: "mi-anteversao-femoral", nome: "Anteversão femoral (TC)", regiao: "membro-inferior", grupo: "Rotação e torção",
    inc: "TC axial do colo e dos côndilos",
    resumo: "Ângulo entre o eixo do colo e a tangente aos côndilos posteriores.",
    valores: [{ r: "Adulto", v: "10–15°", t: "n" }],
    tabela: {
      cab: ["Idade", "Faixa normal", "Média"],
      linhas: [
        ["1 a 3 anos", "35–55°", "45°"], ["3 a 7 anos", "30–50°", "40°"], ["7 a 9 anos", "25–45°", "35°"],
        ["9 a 11 anos", "20–40°", "30°"], ["11 a 13 anos", "15–35°", "25°"], ["13 a 15 anos", "10–30°", "20°"],
        ["≥ 15 anos", "10–25°", "15°"],
      ],
    },
    como: [
      "Eixo do colo: linha pelo centro da cabeça e pelo centro do colo (cortes sobrepostos).",
      "Linha de referência distal: tangente à borda posterior dos côndilos femorais.",
      "Somar os ângulos de cada linha com a horizontal (quando estão em lados opostos).",
    ],
    obs: ["Grandes diferenças em adolescentes costumam normalizar com o crescimento; não há critério seguro para prever a evolução."],
    ped: true,
    tags: ["anteversão", "torção femoral", "marcha em rotação interna", "in-toeing"],
  },
  {
    id: "mi-torcao-tibial", nome: "Torção tibial (TC)", regiao: "membro-inferior", grupo: "Rotação e torção",
    inc: "TC axial do platô e do pilão",
    resumo: "Rotação lateral da tíbia distal em relação à proximal.",
    valores: [
      { r: "Média", v: "≈ 20–30°", t: "n" },
      { r: "Faixa fisiológica", v: "0–40°", t: "n" },
      { r: "Torção aumentada", v: "> 40°", t: "a" },
      { r: "Torção medial", v: "valor negativo", t: "a" },
    ],
    como: [
      "Proximal: tangente à borda posterior do platô tibial (acima da cabeça da fíbula).",
      "Distal: linha pelo centro do pilão e pelo centro da fíbula na incisura.",
      "Medir o ângulo entre as duas referências.",
    ],
    tags: ["torção", "rotação", "tíbia"],
  },
  {
    id: "mi-perfil-rotacional", nome: "Perfil rotacional (clínico)", regiao: "membro-inferior", grupo: "Rotação e torção",
    inc: "Exame físico (Staheli)", ped: true,
    resumo: "Separa marcha em rotação por anteversão femoral, torção tibial ou metatarso aduto.",
    tabela: {
      cab: ["Medida", "Normal", "Significado"],
      linhas: [
        ["Ângulo de progressão do pé", "−5° a +20°", "< −5° in-toeing (−5 a −10 leve; −10 a −15 moderado; > −15 grave); > 20° out-toeing"],
        ["Rotação interna do quadril", "20–60°", "> 70°: anteversão femoral persistente"],
        ["Rotação externa do quadril", "30–60°", "< 20°: anteversão femoral persistente"],
        ["Anteversão femoral", "40° ao nascer · 20° aos 5 anos · 16° aos 16 anos", "—"],
        ["Ângulo coxa-pé", "0–20°", "< −10°: torção tibial interna"],
        ["Ângulo transmaleolar-coxa", "0–40°", "< 0°: torção tibial interna"],
        ["Borda lateral do pé", "reta", "curva para dentro: metatarso aduto"],
      ],
    },
    tags: ["Staheli", "in-toeing", "out-toeing", "marcha"],
  },
  {
    id: "mi-rotacao-intraop", nome: "Rotação na redução de fratura do fêmur (intraoperatório)", regiao: "membro-inferior", grupo: "Rotação e torção", tipo: "cirurgia",
    inc: "Fluoroscopia",
    resumo: "Sinais radiográficos para não deixar má rotação na haste ou placa.",
    como: [
      "Sinal do trocânter menor: antes de posicionar, registrar a forma do trocânter menor do lado sadio com a patela para frente; após o bloqueio distal, rodar o fragmento proximal até a forma ficar igual.",
      "Trocânter menor menor ou escondido atrás do fêmur = fragmento proximal em rotação interna; trocânter maior/mais visível = rotação externa.",
      "Sinal do degrau cortical: espessuras corticais diferentes de cada lado do traço indicam rotação.",
      "Sinal da diferença de diâmetro: em regiões ovais, diâmetros diferentes entre os fragmentos indicam má rotação.",
    ],
    tags: ["má rotação", "haste femoral", "trocânter menor"],
  },
  {
    id: "mi-cabo", nome: "Técnica do cabo (eixo frontal no intraoperatório)", regiao: "membro-inferior", grupo: "Alinhamento coronal", tipo: "cirurgia",
    inc: "Fluoroscopia",
    resumo: "Confere o eixo mecânico na mesa com o cabo do bisturi elétrico.",
    como: [
      "Joelho em extensão e patela para frente.",
      "Com o feixe vertical, centralizar a cabeça femoral e marcar o centro na pele; fazer o mesmo no centro do tornozelo.",
      "Esticar o cabo entre as duas marcas e observar o joelho: o cabo deve passar no centro da articulação.",
    ],
    obs: ["Técnica do cabo, sinal do trocânter menor, degrau cortical e espessura cortical ajudam a conferir a redução."],
    tags: ["eixo mecânico", "osteotomia", "fratura"],
  },
  // ——— Diáfises: fraturas ———
  {
    id: "mi-fx-tibia-adulto", nome: "Fratura da diáfise da tíbia — redução aceitável (adulto)", regiao: "membro-inferior", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    inc: "AP e perfil da perna",
    resumo: "Limites para tratamento conservador ou para aceitar a redução.",
    valores: [
      { r: "Varo/valgo", v: "< 5°", t: "n" },
      { r: "Antero/posterior", v: "< 10° (ideal < 5°)", t: "n" },
      { r: "Rotação", v: "< 10° (rotação externa é melhor tolerada)", t: "n" },
      { r: "Encurtamento", v: "< 1 cm", t: "n" },
      { r: "Contato cortical", v: "> 50%", t: "n" },
    ],
    obs: [
      "Distração de 5 mm pode atrasar a consolidação em 8–12 meses.",
      "Checagem clínica: espinha ilíaca anterossuperior, centro da patela e base da falange proximal do 2º dedo colineares.",
    ],
    tags: ["tíbia", "diáfise", "conservador", "gesso"],
  },
  {
    id: "mi-fx-tibia-ped", nome: "Fratura da diáfise da tíbia — desvio aceitável (criança)", regiao: "membro-inferior", grupo: "Fraturas: desvio aceitável", tipo: "fratura", ped: true,
    resumo: "Limites na criança com crescimento restante.",
    valores: [
      { r: "Angulação", v: "5–10°", t: "n" },
      { r: "Rotação", v: "< 5°", t: "n" },
      { r: "Aposição", v: "≥ 50%", t: "n" },
      { r: "Encurtamento", v: "< 1 cm", t: "n" },
    ],
    tags: ["tíbia", "pediatria"],
  },
  {
    id: "mi-fx-femur-ped", nome: "Fratura da diáfise do fêmur — desvio aceitável (criança)", regiao: "membro-inferior", grupo: "Fraturas: desvio aceitável", tipo: "fratura", ped: true,
    resumo: "Quanto de angulação e encurtamento a criança remodela, por idade.",
    tabela: {
      cab: ["Idade", "Varo/valgo", "Antero/posterior", "Encurtamento"],
      linhas: [
        ["0 a 2 anos", "30°", "30°", "20 mm"],
        ["2 a 5 anos", "15°", "20°", "20 mm"],
        ["6 a 10 anos", "10°", "15°", "15 mm"],
        ["≥ 11 anos", "5°", "10°", "10 mm"],
      ],
      nota: "Rotação: até 10°, sendo a rotação externa melhor tolerada.",
    },
    tags: ["fêmur", "pediatria", "gesso pelvipodálico"],
  },
  // ——— Fixador externo ———
  {
    id: "mi-fixador-femur", nome: "Fixador externo no fêmur — zonas seguras", regiao: "membro-inferior", grupo: "Fixador externo", tipo: "cirurgia",
    resumo: "Por onde passar os pinos sem lesar estruturas nobres.",
    tabela: {
      cab: ["Segmento", "Zona segura", "Perigo"],
      linhas: [
        ["Proximal", "Abaixo do trocânter maior, pelo vasto lateral, mirando o trocânter menor/colo", "Feixe femoral medial"],
        ["Terço médio", "Lateral ou anterolateral, pelo vasto lateral", "Feixe femoral medial"],
        ["Terço distal", "Lateral/posterolateral pelo vasto lateral (anterior atravessa o quadríceps)", "Nervo ciático distal, vasos poplíteos"],
      ],
    },
    tags: ["fixador externo", "pinos", "Schanz"],
  },
  {
    id: "mi-fixador-tibia", nome: "Fixador externo na tíbia — zonas seguras", regiao: "membro-inferior", grupo: "Fixador externo", tipo: "cirurgia",
    resumo: "A face anteromedial subcutânea é o corredor seguro.",
    tabela: {
      cab: ["Segmento", "Zona segura", "Perigo"],
      linhas: [
        ["Proximal", "Anterior ou anteromedial (subcutâneo)", "Artéria tibial anterior e nervo fibular profundo; fibular comum"],
        ["Terço médio", "Anterior ou medial", "Feixe tibial anterior"],
        ["Terço distal", "Anteromedial ou medial", "Artéria fibular (atrás da fíbula)"],
      ],
    },
    obs: ["Na criança, a fise tem ~4 mm de espessura: pinos de Schanz a ~2 cm da fise na metáfise; na epífise, fios finos ou Schanz inseridos à mão para não aquecer a fise."],
    tags: ["fixador externo", "tíbia", "pinos"],
  },
];
