import type { Medida } from "./types";

export const TORNOZELO: Medida[] = [
  {
    id: "to-perfil", nome: "Perfil do tornozelo — qualidade e achados", regiao: "tornozelo", grupo: "Incidências",
    inc: "Perfil verdadeiro",
    resumo: "Como reconhecer o perfil verdadeiro e o que procurar.",
    como: [
      "Perfil verdadeiro: as cúpulas do tálus ficam sobrepostas (oblíquo = contorno duplo).",
      "Tálus centrado sob a tíbia e congruente com o plafond.",
      "Procurar fratura do maléolo posterior, direção do traço da fíbula e avulsões capsulares do tálus.",
      "Translação anterior ou posterior da fíbula em relação à tíbia, comparada com o outro lado, sugere lesão da sindesmose.",
    ],
    tags: ["perfil", "maléolo posterior", "sindesmose"],
  },
  {
    id: "to-sindesmose", nome: "Sindesmose — espaço claro e sobreposição", regiao: "tornozelo", grupo: "Sindesmose e mortise",
    inc: "AP e mortise (pé em 15–20° de rotação interna)",
    resumo: "Parâmetros radiográficos de lesão da sindesmose tibiofibular.",
    tabela: {
      cab: ["Parâmetro", "Como medir", "Normal", "Sugere lesão"],
      linhas: [
        ["Espaço claro tibiofibular (TCS)", "Borda medial da incisura fibular (cortical posterior da tíbia) à borda medial da fíbula, 1 cm acima do plafond", "< 5 mm", "≥ 5 mm"],
        ["Sobreposição tibiofibular (TFO)", "Borda lateral da tíbia distal à borda medial da fíbula, 1 cm acima do plafond", "> 10 mm (AP) · > 1 mm (mortise)", "≤ 10 mm (AP) · < 1 mm (mortise)"],
        ["Espaço claro medial (MCS)", "Borda lateral do maléolo medial à borda medial do tálus, 0,5 cm abaixo do plafond", "≤ 4 mm", "> 4 mm (desvio lateral do tálus)"],
        ["Ângulo talocrural", "Perpendicular ao plafond × linha entre as pontas dos maléolos", "83° ± 4° (até 2–3° do lado sadio)", "> 87° ou assimetria"],
      ],
    },
    obs: ["Linha de Shenton do tornozelo: curva contínua entre a fíbula distal e o tálus — quebrada no encurtamento ou rotação da fíbula."],
    tags: ["sindesmose", "espaço claro", "mortise", "Weber"],
  },
  {
    id: "to-tilt", nome: "Inclinação e desvio do tálus", regiao: "tornozelo", grupo: "Sindesmose e mortise",
    inc: "Mortise",
    resumo: "Congruência do tálus no encaixe.",
    valores: [
      { r: "Talar tilt", v: "diferença > 2 mm entre espaço medial e lateral = anormal", t: "a" },
      { r: "Talar shift", v: "> 1 mm = anormal", t: "a" },
    ],
    obs: ["Cada 1 mm de desvio lateral do tálus reduz muito a área de contato tibiotalar — reduzir anatomicamente."],
    tags: ["tilt", "shift", "instabilidade"],
  },
  {
    id: "to-adta", nome: "Ângulo tibial distal anterior (ADTA)", regiao: "tornozelo", grupo: "Sindesmose e mortise",
    inc: "Perfil em carga",
    resumo: "Inclinação sagital do plafond.",
    valores: [{ r: "Normal", v: "80° (78–82°)", t: "n" }],
    tags: ["ADTA", "plafond", "deformidade"],
  },
  {
    id: "to-sindesmotico", nome: "Parafuso sindesmótico", regiao: "tornozelo", grupo: "Implantes", tipo: "cirurgia",
    resumo: "Posição e técnica do parafuso de posição.",
    como: [
      "De posterior para anterior, ~25–30°, paralelo ao plafond.",
      "2–3 cm acima da articulação, próximo à sindesmose.",
      "Cortical 3,5 ou 4,5 mm como parafuso de posição (rosca na fíbula e na tíbia, sem compressão), com a fíbula reduzida na incisura.",
    ],
    obs: ["Retirada, quando indicada, com 12–16 semanas."],
    tags: ["sindesmose", "parafuso"],
  },
  {
    id: "to-fx-ped", nome: "Tornozelo e Lisfranc na criança — desvio aceitável", regiao: "tornozelo", grupo: "Fraturas: desvio aceitável", tipo: "fratura", ped: true,
    resumo: "Limites de desvio articular.",
    valores: [
      { r: "Tornozelo (articular)", v: "< 2 mm", t: "n" },
      { r: "Lisfranc", v: "< 2–3 mm", t: "n" },
    ],
    tags: ["Tillaux", "triplanar", "Lisfranc", "pediatria"],
  },
  {
    id: "to-tracao-tibia-distal", nome: "Tração esquelética na tíbia distal", regiao: "tornozelo", grupo: "Tração, fixador e artrodese", tipo: "cirurgia",
    resumo: "Ponto do pino supramaleolar.",
    como: [
      "~5 cm acima da linha articular do tornozelo, no meio entre as bordas anterior e posterior da tíbia.",
      "De medial para lateral (proteger a veia safena), atravessando também a fíbula para evitar o nervo fibular.",
      "Manter quadril e joelho em leve flexão.",
    ],
    tags: ["tração", "tíbia distal"],
  },
  {
    id: "to-tracao-calcaneo", nome: "Tração esquelética no calcâneo", regiao: "tornozelo", grupo: "Tração, fixador e artrodese", tipo: "cirurgia",
    resumo: "Ponto do pino calcâneo.",
    como: [
      "~4 cm abaixo e atrás do maléolo medial.",
      "De medial para lateral, sem atravessar a subtalar nem o feixe neurovascular tibial posterior.",
    ],
    tags: ["tração", "calcâneo"],
  },
  {
    id: "to-fixador", nome: "Fixador externo no tornozelo e pé — zonas seguras", regiao: "tornozelo", grupo: "Tração, fixador e artrodese", tipo: "cirurgia",
    resumo: "Corredores para pinos na tíbia distal, metatarso e calcâneo.",
    tabela: {
      cab: ["Local", "Zona segura", "Perigo"],
      linhas: [
        ["Tíbia distal", "Anteromedial ou medial", "Artéria tibial anterior e nervo fibular profundo"],
        ["2º metatarso", "Base do 2º MT", "Artéria dorsal do pé e fibular profundo, mediais à base do 2º MT"],
        ["Calcâneo", "De medial para lateral na tuberosidade", "Feixe tibial posterior atrás do maléolo medial, nervos plantares e ramo calcâneo medial"],
      ],
    },
    tags: ["fixador externo", "pinos", "calcâneo"],
  },
  {
    id: "to-artrodese", nome: "Posição de artrodese do tornozelo e do hálux", regiao: "tornozelo", grupo: "Tração, fixador e artrodese", tipo: "cirurgia",
    resumo: "Posições funcionais recomendadas.",
    valores: [
      { r: "Tornozelo — dorsiflexão", v: "neutra", t: "i" },
      { r: "Tornozelo — retropé", v: "~5° de valgo", t: "i" },
      { r: "Tornozelo — rotação", v: "5–10° de rotação externa", t: "i" },
      { r: "1ª MTF — dorsiflexão", v: "10–15°", t: "i" },
      { r: "1ª MTF — plano coronal", v: "leve valgo, rotação neutra", t: "i" },
    ],
    tags: ["artrodese", "tornozelo", "hálux rígido"],
  },
];

export const PE: Medida[] = [
  // ——— Pé adulto ———
  {
    id: "pe-lisfranc", nome: "Alinhamento tarsometatarsal (Lisfranc)", regiao: "pe", grupo: "Antepé e Lisfranc",
    inc: "AP e oblíqua do pé (de preferência com carga)",
    resumo: "Duas linhas que denunciam lesão de Lisfranc.",
    valores: [
      { r: "AP", v: "borda medial do 2º MT alinhada com a borda medial do cuneiforme médio", t: "n" },
      { r: "Oblíqua", v: "borda medial do 4º MT alinhada com a borda medial do cuboide", t: "n" },
    ],
    obs: ["Na dúvida, radiografia com carga comparativa ou TC."],
    tags: ["Lisfranc", "tarsometatarsal"],
  },
  {
    id: "pe-formas", nome: "Formas do antepé", regiao: "pe", grupo: "Antepé e Lisfranc",
    inc: "AP do pé ou inspeção",
    resumo: "Comprimento relativo do hálux e do 2º dedo.",
    tabela: { cab: ["Tipo", "Característica"], linhas: [["Egípcio", "Hálux maior que o 2º dedo"], ["Grego", "Hálux menor que o 2º dedo"], ["Romano (quadrado)", "Hálux e 2º dedo iguais"]] },
    tags: ["pé egípcio", "pé grego"],
  },
  {
    id: "pe-indice-metatarsal", nome: "Índice metatarsal (plus/minus)", regiao: "pe", grupo: "Antepé e Lisfranc",
    inc: "AP do pé com carga",
    resumo: "Comprimento do 1º MT em relação ao 2º.",
    obs: [
      "Índice minus (1º MT mais curto) predispõe a hálux valgo e metatarsalgia por sobrecarga do 2º e 3º.",
      "Com índice minus, evitar osteotomia que encurte ainda mais o 1º MT.",
    ],
    tags: ["metatarsalgia", "fórmula metatarsal"],
  },
  {
    id: "pe-profundidade-mt", nome: "Ângulo de profundidade metatarsal", regiao: "pe", grupo: "Antepé e Lisfranc",
    inc: "AP do pé",
    resumo: "Tangente às cabeças do 1º e 2º MT × tangente às do 2º e 5º.",
    valores: [
      { r: "Normal", v: "≈ 142,5°", t: "n" },
      { r: "Índice minus (1º MT curto)", v: "< 135°", t: "a" },
    ],
    tags: ["metatarsal", "índice minus"],
  },
  {
    id: "pe-intermetatarsais", nome: "Ângulos intermetatarsais", regiao: "pe", grupo: "Hálux valgo",
    inc: "AP do pé com carga",
    resumo: "Abertura do antepé (pé espraiado) e do 1º raio.",
    valores: [
      { r: "1º–5º — normal", v: "14–35°", t: "n" },
      { r: "1º–5º — pé espraiado", v: "> 35°", t: "a" },
      { r: "1º–2º (IMA) — normal", v: "< 10°", t: "n" },
      { r: "1º–2º — metatarso primo varo", v: "≥ 10°", t: "a" },
      { r: "4º–5º — normal", v: "< 10°", t: "n" },
    ],
    obs: ["O hálux valgo e as deformidades dos dedos menores costumam seguir o pé espraiado: os estabilizadores não acompanham o desvio medial do 1º MT."],
    tags: ["IMA", "pé espraiado", "joanete de alfaiate"],
  },
  {
    id: "pe-halux-valgo", nome: "Ângulos do hálux valgo", regiao: "pe", grupo: "Hálux valgo",
    inc: "AP do pé com carga",
    resumo: "HVA, IMA, DMAA e congruência — base da escolha da osteotomia.",
    valores: [
      { r: "HVA (1º MT × falange proximal)", v: "normal ≤ 15°", t: "n" },
      { r: "IMA (1º × 2º MT)", v: "normal < 10°", t: "n" },
      { r: "DMAA (superfície articular distal do 1º MT)", v: "normal < 10° (até 15° em algumas tabelas)", t: "n" },
      { r: "Interfalângico (IPA)", v: "normal < 8°", t: "n" },
      { r: "1º tarsometatarsal", v: "normal < 25°", t: "n" },
    ],
    como: [
      "HVA: eixo do 1º MT × eixo da falange proximal.",
      "DMAA: perpendicular ao eixo do 1º MT × linha entre as bordas medial e lateral da superfície articular distal (alguns livros usam o ângulo complementar, 85°).",
      "Congruência da MTF: linhas paralelas = congruente; < 20° = desviada; > 20° = subluxada.",
    ],
    obs: ["O IMA é o principal determinante do tipo de osteotomia."],
    tags: ["hálux valgo", "joanete", "HVA", "IMA", "DMAA"],
  },
  {
    id: "pe-mann", nome: "Gravidade do hálux valgo (Mann)", regiao: "pe", grupo: "Hálux valgo",
    inc: "AP do pé com carga",
    resumo: "Leve, moderado ou grave pelos ângulos e pelos sesamoides.",
    tabela: {
      cab: ["Grau", "HVA", "IMA", "Sesamoide lateral"],
      linhas: [
        ["Leve", "≤ 20°", "≤ 11°", "posição anatômica ou < 50% subluxado"],
        ["Moderado", "20–40°", "11–18°", "50–75% subluxado"],
        ["Grave", "> 40°", "> 18°", "luxado"],
      ],
    },
    tags: ["hálux valgo", "Mann", "sesamoides"],
  },
  // ——— Arco e retropé ———
  {
    id: "pe-meary", nome: "Ângulo talo-1º metatarso (Meary)", regiao: "pe", grupo: "Arco e retropé",
    inc: "Perfil com carga (e AP)",
    resumo: "Quebra do arco longitudinal medial.",
    valores: [
      { r: "Perfil — normal", v: "0° (−4° a +4°; média ~5° em algumas séries)", t: "n" },
      { r: "Pé plano", v: "< −4° (convexo para baixo)", t: "a" },
      { r: "Pé cavo", v: "> +4° (convexo para cima)", t: "a" },
      { r: "AP — normal", v: "0–20°", t: "n" },
      { r: "AP — antepé abduzido", v: "< 0°", t: "a" },
    ],
    obs: [
      "No pé normal, o eixo do tálus aponta para a cabeça do 1º MT e o do calcâneo para a cabeça do 4º MT.",
      "Diferença > 8° entre radiografia com e sem carga sugere pé hiperflexível.",
    ],
    tags: ["Meary", "pé plano", "pé cavo", "arco"],
  },
  {
    id: "pe-pitch", nome: "Inclinação do calcâneo (pitch)", regiao: "pe", grupo: "Arco e retropé",
    inc: "Perfil com carga",
    resumo: "Tangente à borda inferior do calcâneo × plano de apoio — achatamento do arco.",
    valores: [
      { r: "Normal", v: "20–30° (outras séries 17°, 11–23°)", t: "n" },
      { r: "Pé plano", v: "< 20°", t: "a" },
      { r: "Pé cavo", v: "> 30°", t: "a" },
    ],
    tags: ["pitch", "inclinação do calcâneo", "pé cavo"],
  },
  {
    id: "pe-declinacao-talar", nome: "Declinação do tálus", regiao: "pe", grupo: "Arco e retropé",
    inc: "Perfil com carga",
    resumo: "Eixo do tálus × plano de apoio.",
    valores: [
      { r: "Normal", v: "14–36° (média 21°)", t: "n" },
      { r: "Pé plano", v: "> 35°", t: "a" },
      { r: "Pé cavo", v: "< 14°", t: "a" },
    ],
    tags: ["tálus", "pé plano"],
  },
  {
    id: "pe-talocalcaneo", nome: "Ângulo talocalcaneano (Kite)", regiao: "pe", grupo: "Arco e retropé",
    inc: "AP (dorsoplantar) e perfil",
    resumo: "Varo ou valgo do retropé — chave no pé torto.",
    tabela: {
      cab: ["Incidência", "Recém-nascido", "Adulto", "Valgo", "Varo"],
      linhas: [
        ["AP (dorsoplantar)", "25–55°", "20–45° (média 35°)", "> 45°", "< 20°"],
        ["Perfil", "25–55°", "30–50° (média 35°)", "> 55°", "< 30°"],
      ],
    },
    obs: [
      "Diminui um pouco com o crescimento.",
      "Pé torto e pé cavo: ângulo pequeno, às vezes eixos paralelos. Tálus vertical: ângulo aumentado e 1º MT angulado medialmente no AP.",
    ],
    tags: ["Kite", "pé torto", "retropé", "tálus vertical"],
  },
  {
    id: "pe-bohler-gissane", nome: "Ângulos de Böhler e Gissane", regiao: "pe", grupo: "Arco e retropé",
    inc: "Perfil do calcâneo",
    resumo: "Altura e congruência da faceta posterior — avaliação da fratura do calcâneo.",
    valores: [
      { r: "Böhler — normal", v: "25–40°", t: "n" },
      { r: "Böhler diminuído", v: "< 25° (afundamento da faceta posterior)", t: "a" },
      { r: "Gissane (crítico) — normal", v: "120–145°", t: "n" },
    ],
    como: [
      "Böhler: linha do ponto mais alto da tuberosidade ao ponto mais alto da faceta posterior × linha deste ao ponto mais alto do processo anterior.",
      "Gissane: entre as corticais que descem da faceta posterior e sobem para o processo anterior.",
    ],
    tags: ["Böhler", "Gissane", "calcâneo", "fratura"],
  },
  {
    id: "pe-tibiocalcaneo", nome: "Ângulos tibiocalcaneano e de Hibbs", regiao: "pe", grupo: "Arco e retropé",
    inc: "Perfil com carga",
    resumo: "Medidas de retropé úteis quando há equino.",
    valores: [
      { r: "Tibiocalcaneano (eixo da tíbia × eixo do calcâneo)", v: "≈ 60–80° (~70°)", t: "n" },
      { r: "Hibbs (eixo do calcâneo × eixo do 1º MT)", v: "≈ 150°", t: "n" },
      { r: "Calcâneo × 5º MT (pé infantil)", v: "150–175°, ápice para cima", t: "n" },
    ],
    obs: ["O tibiocalcaneano é mais útil que o pitch quando há equino. Algumas referências usam ângulos complementares — confira a convenção."],
    tags: ["equino", "Hibbs", "tibiocalcaneano"],
  },
  {
    id: "pe-tarsais", nome: "Ângulos das superfícies articulares do tarso", regiao: "pe", grupo: "Arco e retropé",
    inc: "Perfil",
    resumo: "Inclinação de cada articulação em relação ao plano de apoio.",
    tabela: {
      cab: ["Articulação", "Normal"],
      linhas: [["Talonavicular", "54–74°"], ["Naviculocuneiforme", "51–68°"], ["1ª tarsometatarsal", "55–72°"], ["Média geral", "≈ 60°"]],
    },
    tags: ["mediopé", "talonavicular"],
  },
  {
    id: "pe-tabela-plano-cavo", nome: "Resumo: pé plano × pé cavo", regiao: "pe", grupo: "Arco e retropé",
    inc: "Perfil e AP com carga",
    resumo: "Os ângulos lado a lado.",
    tabela: {
      cab: ["Ângulo", "Normal", "Pé plano", "Pé cavo"],
      linhas: [
        ["Inclinação do calcâneo", "20–30°", "< 20°", "> 30°"],
        ["Declinação do tálus", "14–36° (21°)", "> 35°", "< 14°"],
        ["Talo-1º MT (perfil)", "−4° a +4°", "< −4°", "> +4°"],
        ["Talo-1º MT (AP)", "0–20°", "< 0° (antepé abduzido)", "—"],
        ["Talocalcaneano (perfil)", "30–50° (35°)", "> 50° (retropé valgo)", "—"],
        ["Talocalcaneano (AP)", "20–45° (35°)", "> 45° (retropé valgo)", "—"],
      ],
      nota: "Inclinação do calcâneo avalia o arco; declinação e talo-1º MT descrevem a queda inferomedial do tálus; talocalcaneanos, o valgo do retropé; talo-1º MT no AP, a abdução do antepé.",
    },
    tags: ["pé plano", "pé cavo", "resumo"],
  },
  // ——— Pé infantil ———
  {
    id: "pe-metatarso-aduto", nome: "Ângulo do metatarso aduto", regiao: "pe", grupo: "Pé infantil", ped: true,
    inc: "AP do pé",
    resumo: "Adução do antepé em relação ao tarso.",
    valores: [
      { r: "Ângulo do metatarso aduto — normal", v: "10–20°", t: "n" },
      { r: "Metatarso aduto", v: "> 20°", t: "a" },
      { r: "Engel (eixo do cuneiforme médio × 2º MT) — normal", v: "13–23°", t: "n" },
      { r: "Engel — metatarso aduto", v: "> 23°", t: "a" },
      { r: "Recém-nascido: calcâneo × 2º MT — normal", v: "≤ 22° (média 10°)", t: "n" },
      { r: "Recém-nascido: calcâneo × 2º MT — aduto", v: "> 23°", t: "a" },
    ],
    obs: [
      "No recém-nascido os ossos do tarso ainda pouco ossificados: usar o ângulo calcâneo–2º MT.",
      "Bissetriz do calcanhar (Bleck), clínica: normal passa entre o 2º e o 3º dedo; leve no 3º; moderado entre 3º e 4º; grave entre 4º e 5º.",
    ],
    tags: ["metatarso aduto", "Bleck", "Engel"],
  },
  {
    id: "pe-infantil-perfil", nome: "Deformidades do pé infantil — perfil", regiao: "pe", grupo: "Pé infantil", ped: true,
    inc: "Perfil (de preferência com carga ou dorsiflexão forçada)",
    resumo: "Padrão dos ângulos no pé torto, plano valgo e cavo.",
    tabela: {
      cab: ["Pé", "Talocalcaneano", "Tibiocalcaneano", "Talo-1º MT", "Calcâneo-5º MT"],
      linhas: [
        ["Normal", "25–55°", "60–80°", "linhas coincidem após os 5 anos", "obtuso 150–175°, ápice para cima"],
        ["Pé torto (equinovaro)", "diminuído (< 25°), pode ser ~0°", "obtuso", "obtuso, ápice para baixo", "obtuso, ápice para baixo"],
        ["Pé torto hipercorrigido (mata-borrão)", "diminuído (< 25°)", "obtuso", "obtuso, ápice para baixo", "obtuso, ápice para baixo"],
        ["Plano valgo", "aumentado (> 55°)", "levemente aumentado", "obtuso, ápice para baixo", "obtuso, ápice para cima"],
        ["Metatarso aduto", "normal ou pouco aumentado", "—", "obtuso, ápice para baixo", "—"],
        ["Cavo", "variável, pode estar pouco aumentado", "diminuído", "obtuso, ápice para cima", "diminuído (< 150°), ápice para cima"],
      ],
    },
    tags: ["pé torto", "rocker-bottom", "pé plano", "cavo"],
  },
  {
    id: "pe-infantil-ap", nome: "Deformidades do pé infantil — AP", regiao: "pe", grupo: "Pé infantil", ped: true,
    inc: "AP (dorsoplantar)",
    resumo: "Eixos do tálus e do calcâneo em cada deformidade.",
    tabela: {
      cab: ["Pé", "Talocalcaneano", "Eixo do tálus", "Eixo do calcâneo", "Metatarsos"],
      linhas: [
        ["Normal", "25–55° (agudo)", "coincide com o 1º MT", "coincide com o 4º MT", "quase paralelos"],
        ["Pé torto", "diminuído (< 25°), pode inverter", "lateral ao 1º MT (ângulo positivo)", "lateral ao 4º MT", "convergem atrás, bases sobrepostas"],
        ["Torto hipercorrigido", "diminuído (< 25°)", "—", "—", "—"],
        ["Plano valgo", "aumentado (> 55°)", "medial ao 1º MT (ângulo negativo)", "variável", "antepé abduzido"],
        ["Metatarso aduto", "—", "cruza o 1º MT (ângulo talo-1º MT positivo, ápice lateral)", "4º MT mais lateral que o eixo", "convergem atrás, bases sobrepostas"],
        ["Cavo", "normal, salvo outros componentes associados", "—", "—", "—"],
      ],
    },
    tags: ["pé torto", "plano valgo", "metatarso aduto"],
  },
  // ——— Fraturas ———
  {
    id: "pe-fx", nome: "Fraturas do pé — critérios de cirurgia", regiao: "pe", grupo: "Fraturas: desvio aceitável", tipo: "fratura",
    resumo: "Limites a partir dos quais se fixa.",
    valores: [
      { r: "Processo anterior do calcâneo", v: "> 25% da calcaneocuboide → cirurgia", t: "a" },
      { r: "Processo lateral do tálus, navicular, cuboide", v: "> 2 mm de desvio → fixar", t: "a" },
      { r: "2º ao 5º metatarso", v: "> 10° no plano dorsoplantar ou 3–4 mm de translação → cirurgia", t: "a" },
    ],
    tags: ["calcâneo", "tálus", "metatarso", "navicular"],
  },
];
