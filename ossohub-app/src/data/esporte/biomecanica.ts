import type { Topico } from "./types";

export const BIOMECANICA: Topico[] = [
  {
    id: "b-fundamentos", titulo: "Fundamentos: forças, torque e alavancas", area: "biomecanica", grupo: "Fundamentos",
    tags: ["newton", "torque", "momento", "alavanca", "braço de momento"],
    resumo: "Movimento humano = forças musculares gerando torques em torno das articulações contra cargas externas.",
    secoes: [
      { t: "Conceitos", itens: ["Torque = força × braço de momento (distância perpendicular ao eixo).", "Leis de Newton: inércia, F = m·a e ação-reação (força de reação do solo).", "Alavancas: 1ª classe (cabeça sobre atlas), 2ª (elevação do calcanhar), 3ª (bíceps — a mais comum: favorece velocidade e amplitude, exige mais força).", "Impulso = força × tempo: aterrissar flexionando articulações aumenta o tempo e reduz o pico de força."] },
      { t: "Aplicação clínica", itens: ["Afastar a carga do corpo aumenta o torque na coluna/ombro.", "Pequenas mudanças de técnica alteram muito o braço de momento articular (ex.: inclinação do tronco no agachamento transfere carga do joelho para o quadril)."] },
    ],
    fontes: ["SPBIO", "LIPPERT"],
  },
  {
    id: "b-contracao", titulo: "Tipos de contração e relações mecânicas do músculo", area: "biomecanica", grupo: "Fundamentos",
    tags: ["concêntrica", "excêntrica", "isométrica", "força-velocidade", "comprimento-tensão"],
    resumo: "Excêntrica gera mais força com menos custo metabólico; potência máxima a ~30% da velocidade máxima.",
    secoes: [
      { t: "Relações", itens: ["Força–velocidade: quanto mais rápido o encurtamento, menor a força; em ações excêntricas a força supera a isométrica máxima.", "Comprimento–tensão: força máxima em comprimento intermediário de sarcômero.", "Excêntrico: mais dano muscular tardio (DOMS) e forte estímulo de adaptação — útil em tendinopatia e prevenção de lesão de isquiotibiais.", "Cadeia cinética aberta (segmento distal livre) vs fechada (segmento distal fixo, mais co-contração)."] },
    ],
    fontes: ["SPBIO", "HAFF", "LIPPERT"],
  },
  {
    id: "b-corrida", titulo: "Biomecânica da corrida", area: "biomecanica", grupo: "Gestos esportivos",
    tags: ["corrida", "cadência", "pisada", "overstriding", "retropé", "antepé"],
    resumo: "Ciclo com apoio e voo; cadência e comprimento de passada modulam a carga articular.",
    secoes: [
      { t: "Pontos-chave", itens: ["Fases: apoio (contato, médio apoio, propulsão) e balanço/voo.", "Overstriding (pé muito à frente do centro de massa) aumenta frenagem e carga no joelho.", "Aumentar cadência em 5–10% reduz carga patelofemoral e no quadril.", "Retropé vs antepé: transfere carga entre joelho (retropé) e tornozelo/Aquiles (antepé) — não há padrão 'certo' para todos.", "Queda pélvica contralateral e adução do quadril associam-se a dor patelofemoral e do trato iliotibial."] },
      { t: "Lesões relacionadas", itens: ["Erros de treino (aumento brusco de volume) causam a maioria das lesões por sobrecarga em corredores."] },
    ],
    fontes: ["SPBIO"],
  },
  {
    id: "b-aterrissagem", titulo: "Aterrissagem, corte e o valgo dinâmico", area: "biomecanica", grupo: "Gestos esportivos",
    tags: ["valgo dinâmico", "lca", "aterrissagem", "mudança de direção", "landing error scoring"],
    resumo: "Joelho em valgo + rotação com pouca flexão na aterrissagem/corte é o padrão de risco para LCA.",
    secoes: [
      { t: "Padrões de risco", itens: ["Aterrissagem rígida (pouca flexão de joelho e quadril).", "Valgo dinâmico (adução e rotação interna do quadril).", "Tronco inclinado lateralmente sobre a perna de apoio no corte.", "Pé muito afastado do tronco na mudança de direção."] },
      { t: "Treino corretivo", itens: ["Feedback de 'aterrissagem silenciosa' e joelhos sobre os pés.", "Força de glúteos e isquiotibiais; controle de tronco.", "Ferramentas de triagem: LESS (Landing Error Scoring System), drop vertical jump, tuck jump."] },
    ],
    ver: ["l-lca", "f-proprio"],
    fontes: ["SPBIO"],
  },
  {
    id: "b-arremesso", titulo: "Arremesso e gestos acima da cabeça", area: "biomecanica", grupo: "Gestos esportivos",
    tags: ["arremesso", "overhead", "gird", "cadeia cinética", "ombro do arremessador"],
    resumo: "A energia vem das pernas e tronco; falhas proximais sobrecarregam ombro e cotovelo.",
    secoes: [
      { t: "Fases", itens: ["Wind-up → early cocking → late cocking (máxima rotação externa) → aceleração → desaceleração → follow-through."] },
      { t: "Pontos-chave", itens: ["~50% da energia do arremesso vem de membros inferiores e tronco (cadeia cinética).", "Late cocking: estresse em valgo no cotovelo (ligamento colateral ulnar) e na cápsula anterior do ombro.", "Desaceleração: alta carga excêntrica no manguito posterior.", "GIRD (déficit de rotação interna > 20° vs lado contralateral, com perda de arco total) associa-se a lesões — alongamento posterior (sleeper stretch)."] },
    ],
    fontes: ["SPBIO", "LIPPERT"],
  },
  {
    id: "b-agachamento", titulo: "Agachamento e levantamentos", area: "biomecanica", grupo: "Gestos esportivos",
    tags: ["agachamento", "levantamento terra", "joelho à frente", "coluna neutra"],
    resumo: "Joelho passar da ponta do pé não é proibido; inclinação do tronco e profundidade redistribuem a carga.",
    secoes: [
      { t: "Pontos-chave", itens: ["Restringir o joelho atrás da ponta do pé reduz carga no joelho, mas aumenta muito a carga na coluna/quadril.", "Agachamento profundo é seguro em joelhos saudáveis; ajustar em dor patelofemoral.", "Levantamento terra: barra próxima ao corpo, coluna em posição neutra (pequenas variações são toleradas), tensão antes de puxar.", "Agachamento frontal: tronco mais vertical, mais quadríceps e menos cisalhamento lombar."] },
    ],
    fontes: ["HAFF", "SPBIO", "MORAN"],
  },
  {
    id: "b-coluna", titulo: "Biomecânica da coluna", area: "biomecanica", grupo: "Coluna",
    tags: ["disco", "pressão intradiscal", "cisalhamento", "flexão", "core"],
    resumo: "Compressão, cisalhamento e flexão repetida sob carga são os principais mecanismos de lesão discal.",
    secoes: [
      { t: "Conceitos", itens: ["Pressão intradiscal aumenta sentado inclinado para frente e carregando peso afastado do corpo.", "Flexão repetida com compressão favorece protrusão/hérnia posterolateral.", "Facetas absorvem mais carga em extensão — espondilólise em esportes de hiperextensão.", "Rigidez do tronco (co-contração) protege a coluna em cargas altas; 'core' é resistência, não só força máxima.", "Discos têm variação diurna: mais hidratados pela manhã (maior risco em flexão logo ao acordar)."] },
    ],
    ver: ["r-lombar", "l-lombar-atleta"],
    fontes: ["SPINE"],
  },
  {
    id: "b-salto", titulo: "Salto e ciclo alongamento-encurtamento", area: "biomecanica", grupo: "Gestos esportivos",
    tags: ["salto", "cmj", "squat jump", "rsi", "elasticidade"],
    resumo: "Uma ação excêntrica rápida antes da concêntrica aumenta a potência (energia elástica + reflexo de estiramento).",
    secoes: [
      { t: "Medidas", itens: ["CMJ (com contramovimento) vs squat jump: a diferença estima o uso do ciclo alongamento-encurtamento.", "RSI (índice de força reativa) = altura do salto / tempo de contato — usado no drop jump.", "Transição excêntrico→concêntrico curta é essencial (amortização)."] },
    ],
    fontes: ["SPBIO", "HAFF"],
  },
  {
    id: "b-tecidos", titulo: "Mecânica dos tecidos e adaptação à carga", area: "biomecanica", grupo: "Fundamentos",
    tags: ["viscoelasticidade", "creep", "estresse-deformação", "mecanotransdução", "remodelação"],
    resumo: "Tecidos se adaptam à carga dentro de uma janela ótima; lesão ocorre quando a carga supera a capacidade.",
    secoes: [
      { t: "Conceitos", itens: ["Curva estresse–deformação: região de dedo (toe), linear (elástica), deformação plástica e ruptura.", "Viscoelasticidade: creep (deformação sob carga constante) e relaxamento de estresse — base do alongamento sustentado.", "Mecanotransdução: carga mecânica estimula síntese de colágeno em tendão, osso e cartilagem.", "Taxa de adaptação: músculo (semanas) > tendão e osso (meses) — descompasso explica tendinopatias e fraturas por estresse no aumento rápido de treino."] },
    ],
    fontes: ["SPBIO", "SPINE", "PTR"],
  },
  {
    id: "b-marcha", titulo: "Marcha normal", area: "biomecanica", grupo: "Gestos esportivos",
    tags: ["marcha", "fase de apoio", "balanço", "trendelenburg"],
    resumo: "Apoio ~60% e balanço ~40% do ciclo; glúteo médio estabiliza a pelve no apoio unipodal.",
    secoes: [
      { t: "Fases", itens: ["Apoio: contato inicial, resposta à carga, médio apoio, apoio terminal, pré-balanço.", "Balanço: inicial, médio e terminal.", "Trendelenburg: queda da pelve contralateral → fraqueza de glúteo médio.", "Marcha antálgica: encurta o apoio do lado doloroso."] },
    ],
    fontes: ["LIPPERT"],
  },
];
