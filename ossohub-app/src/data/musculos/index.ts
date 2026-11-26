// Músculos do corpo humano — esquema didático (origem, inserção, ação, inervação, vascularização).
// Piloto: membro superior. Coordenadas do desenho em um quadro 300 x 360 (aproximadas, para estudo).

export type Vista =
  | "tronco-posterior"
  | "tronco-anterior"
  | "braco-anterior"
  | "braco-posterior"
  | "antebraco-anterior"
  | "antebraco-posterior";

export type Forma = { cx: number; cy: number; rx: number; ry: number; rot?: number };
export type Ponto = [number, number];

export type Musculo = {
  id: string;
  nome: string;
  latim: string;
  grupo: string;
  vista: Vista;
  forma: Forma;
  origem: string[];
  origemPonto: Ponto;
  insercao: string[];
  insercaoPonto: Ponto;
  acao: string;
  inervacao: string;
  vascularizacao: string[];
  dica?: string;
};

export const GRUPOS_MUSCULOS = [
  "Escápula e ombro",
  "Braço",
  "Antebraço anterior",
  "Antebraço posterior",
] as const;

export const MUSCULOS: Musculo[] = [
  // ---------- Escápula e ombro ----------
  {
    id: "trapezio", nome: "Trapézio", latim: "M. trapezius", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 150, cy: 75, rx: 50, ry: 36 },
    origem: ["Linha nucal superior, ligamento nucal e processos espinhosos de C7 a T12"], origemPonto: [150, 40],
    insercao: ["Terço lateral da clavícula, acrômio e espinha da escápula"], insercaoPonto: [205, 82],
    acao: "Eleva, retrai e roda a escápula para cima. Estabiliza a escápula quando o braço sobe acima de 90°.",
    inervacao: "Nervo acessório (XI par). Propriocepção por C3–C4.",
    vascularizacao: ["Artéria cervical transversa", "Artéria supraescapular"],
    dica: "Paralisia do nervo acessório: ombro caído e escápula deslocada para baixo e para fora.",
  },
  {
    id: "levantador-escapula", nome: "Levantador da escápula", latim: "M. levator scapulae", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 120, cy: 55, rx: 20, ry: 24 },
    origem: ["Tubérculos posteriores dos processos transversos de C1 a C4"], origemPonto: [118, 32],
    insercao: ["Ângulo superior e borda medial da escápula"], insercaoPonto: [110, 80],
    acao: "Eleva a escápula e roda a cavidade glenoide para baixo, junto com o romboide.",
    inervacao: "Nervo dorsal da escápula (C5) e ramos cervicais (C3–C4).",
    vascularizacao: ["Artéria cervical transversa", "Artéria dorsal da escápula"],
    dica: "Tensão nele é uma causa frequente de dor entre o pescoço e a escápula.",
  },
  {
    id: "romboide-maior", nome: "Romboide maior", latim: "M. rhomboideus major", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 132, cy: 108, rx: 20, ry: 30, rot: 25 },
    origem: ["Processos espinhosos de T2 a T5"], origemPonto: [150, 100],
    insercao: ["Borda medial da escápula, entre a espinha e o ângulo inferior"], insercaoPonto: [118, 120],
    acao: "Retrai a escápula (aproxima da coluna) e a roda para baixo.",
    inervacao: "Nervo dorsal da escápula (C4–C5).",
    vascularizacao: ["Artéria dorsal da escápula"],
    dica: "Fraqueza leva à escápula alada medial, quando a borda interna se afasta da coluna.",
  },
  {
    id: "romboide-menor", nome: "Romboide menor", latim: "M. rhomboideus minor", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 122, cy: 82, rx: 14, ry: 10, rot: 15 },
    origem: ["Processos espinhosos de C7 e T1"], origemPonto: [150, 82],
    insercao: ["Borda medial da escápula, na base da espinha"], insercaoPonto: [115, 85],
    acao: "Retrai e eleva a escápula. Fixa a escápula à coluna.",
    inervacao: "Nervo dorsal da escápula (C4–C5).",
    vascularizacao: ["Artéria dorsal da escápula"],
    dica: "Costuma trabalhar junto com o romboide maior; na prática são difíceis de separar.",
  },
  {
    id: "serratil-anterior", nome: "Serrátil anterior", latim: "M. serratus anterior", grupo: "Escápula e ombro", vista: "tronco-anterior",
    forma: { cx: 205, cy: 160, rx: 13, ry: 50, rot: 10 },
    origem: ["Face externa das primeiras 8 a 9 costelas"], origemPonto: [192, 120],
    insercao: ["Borda medial e face costal da escápula"], insercaoPonto: [215, 150],
    acao: "Protrai a escápula (empurrar) e faz a rotação superior dela. É essencial para elevar o braço acima da cabeça.",
    inervacao: "Nervo torácico longo (C5–C7).",
    vascularizacao: ["Artéria torácica lateral", "Ramos da artéria subescapular"],
    dica: "Lesão do torácico longo: escápula alada lateral, mais visível ao empurrar a parede.",
  },
  {
    id: "peitoral-maior", nome: "Peitoral maior", latim: "M. pectoralis major", grupo: "Escápula e ombro", vista: "tronco-anterior",
    forma: { cx: 150, cy: 110, rx: 60, ry: 40 },
    origem: ["Clavícula (metade medial), esterno e cartilagens das costelas 1 a 6"], origemPonto: [120, 80],
    insercao: ["Lábio lateral do sulco intertubercular do úmero"], insercaoPonto: [222, 125],
    acao: "Adução e rotação interna do úmero. As fibras clavicular e esternal também auxiliam na flexão e na extensão.",
    inervacao: "Nervos peitorais medial e lateral (C5–T1).",
    vascularizacao: ["Artéria toracoacromial", "Artéria torácica lateral"],
    dica: "Ruptura do tendão, comum em levantamento de peso: alteração do contorno do peito e da dobra axilar.",
  },
  {
    id: "peitoral-menor", nome: "Peitoral menor", latim: "M. pectoralis minor", grupo: "Escápula e ombro", vista: "tronco-anterior",
    forma: { cx: 168, cy: 118, rx: 22, ry: 12 },
    origem: ["Face externa da 3ª a 5ª costela"], origemPonto: [172, 118],
    insercao: ["Processo coracoide da escápula"], insercaoPonto: [200, 95],
    acao: "Abaixa e protrai a escápula. Participa da respiração forçada elevando as costelas.",
    inervacao: "Nervo peitoral medial (C8–T1).",
    vascularizacao: ["Artéria toracoacromial"],
    dica: "Encurtado em ombro protraído. Pode comprimir o feixe neurovascular na síndrome do desfiladeiro torácico.",
  },
  {
    id: "latissimo-dorso", nome: "Latíssimo do dorso", latim: "M. latissimus dorsi", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 155, cy: 175, rx: 50, ry: 58, rot: 20 },
    origem: ["Processos espinhosos de T7 a L5, fáscia toracolombar, crista ilíaca e últimas costelas"], origemPonto: [150, 135],
    insercao: ["Assoalho do sulco intertubercular do úmero (face medial)"], insercaoPonto: [225, 140],
    acao: "Extensão, adução e rotação interna do úmero. Essencial para puxar, subir e nadar.",
    inervacao: "Nervo toracodorsal (C6–C8).",
    vascularizacao: ["Artéria toracodorsal (ramo da subescapular)", "Artérias lombares e intercostais posteriores"],
    dica: "Muito usado como transferência tendínea, por exemplo na reconstrução de manguito irreparável.",
  },
  {
    id: "redondo-maior", nome: "Redondo maior", latim: "M. teres major", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 200, cy: 135, rx: 14, ry: 9, rot: 20 },
    origem: ["Face posterior do ângulo inferior da escápula"], origemPonto: [182, 135],
    insercao: ["Lábio medial do sulco intertubercular do úmero"], insercaoPonto: [222, 136],
    acao: "Adução, extensão e rotação interna do úmero, junto com o latíssimo do dorso.",
    inervacao: "Nervo subescapular inferior (C5–C6).",
    vascularizacao: ["Artéria subescapular", "Artéria circunflexa da escápula"],
    dica: "Com o redondo menor e a cabeça longa do tríceps, delimita os espaços triangular e quadrangular. O nervo axilar passa pelo quadrangular.",
  },
  {
    id: "redondo-menor", nome: "Redondo menor", latim: "M. teres minor", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 210, cy: 112, rx: 12, ry: 8, rot: 25 },
    origem: ["Terço médio da face posterior da escápula (borda lateral)"], origemPonto: [188, 108],
    insercao: ["Faceta inferior do tubérculo maior do úmero"], insercaoPonto: [230, 118],
    acao: "Rotação externa do úmero e estabilização posterior da cabeça umeral.",
    inervacao: "Nervo axilar (C5–C6).",
    vascularizacao: ["Artéria circunflexa da escápula"],
    dica: "Faz parte do manguito rotador. Lesão do nervo axilar leva à perda da rotação externa e atrofia do deltoide.",
  },
  {
    id: "supraespinal", nome: "Supraespinal", latim: "M. supraspinatus", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 168, cy: 84, rx: 26, ry: 8, rot: -8 },
    origem: ["Fossa supraespinal da escápula"], origemPonto: [150, 82],
    insercao: ["Faceta superior do tubérculo maior do úmero"], insercaoPonto: [225, 95],
    acao: "Inicia a abdução do braço (primeiros 15° a 30°) e centraliza a cabeça do úmero na glenoide.",
    inervacao: "Nervo supraescapular (C5–C6).",
    vascularizacao: ["Artéria supraescapular"],
    dica: "Tendão mais lesado do manguito. Testes: lata vazia (empty can) e Jobe.",
  },
  {
    id: "infraespinal", nome: "Infraespinal", latim: "M. infraspinatus", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 178, cy: 108, rx: 24, ry: 14, rot: 15 },
    origem: ["Fossa infraespinal da escápula"], origemPonto: [170, 105],
    insercao: ["Faceta média do tubérculo maior do úmero"], insercaoPonto: [222, 102],
    acao: "Rotação externa do úmero e estabilização da cabeça umeral na glenoide.",
    inervacao: "Nervo supraescapular (C5–C6).",
    vascularizacao: ["Artéria supraescapular", "Artéria circunflexa da escápula"],
    dica: "Teste de Patte: rotação externa resistida com o cotovelo a 90°.",
  },
  {
    id: "subescapular", nome: "Subescapular", latim: "M. subscapularis", grupo: "Escápula e ombro", vista: "tronco-anterior",
    forma: { cx: 198, cy: 130, rx: 20, ry: 24, rot: 20 },
    origem: ["Fossa subescapular (face anterior da escápula)"], origemPonto: [182, 132],
    insercao: ["Pequeno tubérculo do úmero"], insercaoPonto: [222, 120],
    acao: "Rotação interna do úmero e estabilização anterior da cabeça umeral.",
    inervacao: "Nervos subescapulares superior e inferior (C5–C6).",
    vascularizacao: ["Artéria subescapular", "Artérias circunflexas do úmero"],
    dica: "Testes de lift-off e belly press avaliam sua função. Lesão favorece instabilidade anterior.",
  },
  {
    id: "deltoide", nome: "Deltoide", latim: "M. deltoideus", grupo: "Escápula e ombro", vista: "tronco-posterior",
    forma: { cx: 240, cy: 105, rx: 26, ry: 36 },
    origem: ["Terço lateral da clavícula, acrômio e espinha da escápula"], origemPonto: [215, 68],
    insercao: ["Tuberosidade deltóidea do úmero"], insercaoPonto: [245, 140],
    acao: "Abdução do úmero (principal, fibras médias). As fibras anteriores fletem e as posteriores estendem.",
    inervacao: "Nervo axilar (C5–C6).",
    vascularizacao: ["Artérias circunflexas umerais anterior e posterior (ramos da axilar)"],
    dica: "Lesão do nervo axilar: perda da abdução e dormência em 'placa' sobre o deltoide.",
  },

  // ---------- Braço ----------
  {
    id: "biceps", nome: "Bíceps braquial", latim: "M. biceps brachii", grupo: "Braço", vista: "braco-anterior",
    forma: { cx: 150, cy: 105, rx: 24, ry: 85 },
    origem: ["Cabeça longa: tubérculo supraglenoidal da escápula. Cabeça curta: processo coracoide"], origemPonto: [150, 20],
    insercao: ["Tuberosidade do rádio, via aponeurose bicipital para a fáscia do antebraço"], insercaoPonto: [140, 195],
    acao: "Flexão do cotovelo (mais forte com o antebraço supinado) e supinação do antebraço. Também auxilia na flexão do ombro.",
    inervacao: "Nervo musculocutâneo (C5–C6).",
    vascularizacao: ["Artéria braquial e seus ramos musculares"],
    dica: "Ruptura da cabeça longa: 'sinal de Popeye' (bolha muscular), com perda de força moderada.",
  },
  {
    id: "coracobraquial", nome: "Coracobraquial", latim: "M. coracobrachialis", grupo: "Braço", vista: "braco-anterior",
    forma: { cx: 132, cy: 70, rx: 9, ry: 30, rot: 12 },
    origem: ["Processo coracoide da escápula"], origemPonto: [130, 40],
    insercao: ["Face medial do úmero, no meio do corpo"], insercaoPonto: [138, 120],
    acao: "Flexão e adução do úmero.",
    inervacao: "Nervo musculocutâneo (C5–C7).",
    vascularizacao: ["Artéria braquial"],
    dica: "O nervo musculocutâneo costuma atravessar este músculo (variação anatômica comum).",
  },
  {
    id: "braquial", nome: "Braquial", latim: "M. brachialis", grupo: "Braço", vista: "braco-anterior",
    forma: { cx: 150, cy: 160, rx: 26, ry: 38 },
    origem: ["Metade distal da face anterior do úmero"], origemPonto: [150, 120],
    insercao: ["Tuberosidade e processo coronoide da ulna"], insercaoPonto: [150, 205],
    acao: "Flexão do cotovelo, independentemente da posição do antebraço. É o principal flexor do cotovelo.",
    inervacao: "Nervo musculocutâneo. A porção lateral recebe ramo do nervo radial.",
    vascularizacao: ["Artéria braquial", "Artéria colateral ulnar"],
    dica: "Lesão reduz a flexão do cotovelo mesmo com a supinação preservada.",
  },
  {
    id: "triceps", nome: "Tríceps braquial", latim: "M. triceps brachii", grupo: "Braço", vista: "braco-posterior",
    forma: { cx: 150, cy: 110, rx: 30, ry: 92 },
    origem: ["Cabeça longa: tubérculo infraglenoidal da escápula. Cabeças lateral e medial: face posterior do úmero"], origemPonto: [150, 20],
    insercao: ["Olécrano da ulna"], insercaoPonto: [150, 205],
    acao: "Extensão do cotovelo (principal). A cabeça longa também estende e aduz o úmero.",
    inervacao: "Nervo radial (C6–C8).",
    vascularizacao: ["Artéria braquial profunda", "Artéria colateral ulnar"],
    dica: "Lesão: não consegue estender o cotovelo contra a gravidade.",
  },

  // ---------- Antebraço anterior ----------
  {
    id: "pronador-redondo", nome: "Pronador redondo", latim: "M. pronator teres", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 128, cy: 45, rx: 14, ry: 22, rot: 25 },
    origem: ["Epicôndilo medial do úmero e processo coronoide da ulna"], origemPonto: [132, 20],
    insercao: ["Face lateral do rádio, no meio do corpo"], insercaoPonto: [148, 88],
    acao: "Pronação do antebraço. Auxilia na flexão do cotovelo.",
    inervacao: "Nervo mediano (C6–C7).",
    vascularizacao: ["Artéria ulnar", "Artéria interóssea anterior"],
    dica: "Pode comprimir o nervo mediano (síndrome do pronador).",
  },
  {
    id: "flexor-radial-carpo", nome: "Flexor radial do carpo", latim: "M. flexor carpi radialis", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 125, cy: 115, rx: 9, ry: 55, rot: 10 },
    origem: ["Epicôndilo medial do úmero"], origemPonto: [130, 25],
    insercao: ["Base do 2º e do 3º metacarpos"], insercaoPonto: [132, 245],
    acao: "Flexão e desvio radial do punho.",
    inervacao: "Nervo mediano (C6–C7).",
    vascularizacao: ["Ramos da artéria ulnar e da artéria radial"],
    dica: "O pulso radial é palpado logo ao lado (lateral) do tendão deste músculo.",
  },
  {
    id: "palmar-longo", nome: "Palmar longo", latim: "M. palmaris longus", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 150, cy: 120, rx: 6, ry: 58 },
    origem: ["Epicôndilo medial do úmero"], origemPonto: [150, 25],
    insercao: ["Retináculo flexor e aponeurose palmar"], insercaoPonto: [150, 255],
    acao: "Flexão do punho e tensão da aponeurose palmar.",
    inervacao: "Nervo mediano (C7–C8).",
    vascularizacao: ["Artéria ulnar"],
    dica: "Ausente em uma parcela das pessoas (cerca de 10% a 15%). Costuma ser usado como enxerto tendíneo.",
  },
  {
    id: "flexor-ulnar-carpo", nome: "Flexor ulnar do carpo", latim: "M. flexor carpi ulnaris", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 175, cy: 120, rx: 9, ry: 55, rot: -8 },
    origem: ["Epicôndilo medial do úmero e borda posterior da ulna"], origemPonto: [170, 25],
    insercao: ["Pisiforme, hamato e 5º metacarpo"], insercaoPonto: [168, 250],
    acao: "Flexão e desvio ulnar do punho.",
    inervacao: "Nervo ulnar (C7–T1).",
    vascularizacao: ["Artéria ulnar"],
    dica: "Lesão do nervo ulnar no cotovelo afeta este músculo e os intrínsecos da mão, causando a 'mão em garra'.",
  },
  {
    id: "flexor-superficial-dedos", nome: "Flexor superficial dos dedos", latim: "M. flexor digitorum superficialis", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 150, cy: 165, rx: 26, ry: 55 },
    origem: ["Epicôndilo medial, processo coronoide e face anterior do rádio"], origemPonto: [140, 35],
    insercao: ["Falanges médias dos dedos 2 a 5"], insercaoPonto: [150, 240],
    acao: "Flexão das articulações interfalângicas proximais e do punho.",
    inervacao: "Nervo mediano (C7–T1).",
    vascularizacao: ["Ramos das artérias ulnar e radial"],
    dica: "Teste: com os outros dedos estendidos, o dedo flete só a falange média pelo flexor superficial.",
  },
  {
    id: "flexor-profundo-dedos", nome: "Flexor profundo dos dedos", latim: "M. flexor digitorum profundus", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 162, cy: 215, rx: 22, ry: 50 },
    origem: ["Face anterior e medial proximal da ulna e membrana interóssea"], origemPonto: [170, 140],
    insercao: ["Base das falanges distais dos dedos 2 a 5"], insercaoPonto: [148, 300],
    acao: "Flexão das interfalângicas distais e do punho.",
    inervacao: "Nervo mediano (dedos 2 e 3) e nervo ulnar (dedos 4 e 5) — C7–T1.",
    vascularizacao: ["Artéria interóssea anterior", "Artéria ulnar"],
    dica: "Lesão do tendão na zona II (dedo) faz perder a flexão da falange distal: 'dedo sem ponta'.",
  },
  {
    id: "flexor-longo-polegar", nome: "Flexor longo do polegar", latim: "M. flexor pollicis longus", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 118, cy: 205, rx: 9, ry: 48, rot: 15 },
    origem: ["Face anterior do rádio e membrana interóssea"], origemPonto: [128, 150],
    insercao: ["Base da falange distal do polegar"], insercaoPonto: [118, 300],
    acao: "Flexão da interfalângica e da metacarpofalângica do polegar.",
    inervacao: "Nervo interósseo anterior (ramo do mediano, C7–T1).",
    vascularizacao: ["Artéria interóssea anterior"],
    dica: "Perda da flexão da ponta do polegar sugere lesão deste músculo ou do nervo interósseo anterior.",
  },
  {
    id: "pronador-quadrado", nome: "Pronador quadrado", latim: "M. pronator quadratus", grupo: "Antebraço anterior", vista: "antebraco-anterior",
    forma: { cx: 150, cy: 300, rx: 24, ry: 9 },
    origem: ["Face anterior da ulna distal"], origemPonto: [125, 300],
    insercao: ["Face anterior do rádio distal"], insercaoPonto: [175, 300],
    acao: "Pronação do antebraço, sobretudo no fim do movimento.",
    inervacao: "Nervo interósseo anterior (ramo do mediano, C7–T1).",
    vascularizacao: ["Artéria interóssea anterior"],
    dica: "Pronador profundo. Avaliado com o cotovelo fletido a 90°.",
  },

  // ---------- Antebraço posterior ----------
  {
    id: "braquiorradial", nome: "Braquiorradial", latim: "M. brachioradialis", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 118, cy: 100, rx: 12, ry: 60, rot: 8 },
    origem: ["Crista supracondilar lateral do úmero (dois terços proximais)"], origemPonto: [125, 25],
    insercao: ["Processo estiloide do rádio"], insercaoPonto: [113, 215],
    acao: "Flexão do cotovelo, principalmente com o antebraço em posição neutra. Estabiliza o antebraço.",
    inervacao: "Nervo radial (C5–C6).",
    vascularizacao: ["Artéria radial recorrente"],
    dica: "Referência da região lateral do antebraço. O nervo radial passa profundamente a ele.",
  },
  {
    id: "extensor-radial-longo-carpo", nome: "Extensor radial longo do carpo", latim: "M. extensor carpi radialis longus", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 126, cy: 120, rx: 9, ry: 55, rot: 10 },
    origem: ["Crista supracondilar lateral do úmero"], origemPonto: [130, 30],
    insercao: ["Base do 2º metacarpo"], insercaoPonto: [128, 245],
    acao: "Extensão e desvio radial do punho.",
    inervacao: "Nervo radial, ramo antes do cotovelo (C6–C7).",
    vascularizacao: ["Artéria radial recorrente", "Artéria radial"],
    dica: "Um dos músculos envolvidos na epicondilite lateral ('cotovelo de tenista').",
  },
  {
    id: "extensor-radial-curto-carpo", nome: "Extensor radial curto do carpo", latim: "M. extensor carpi radialis brevis", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 138, cy: 130, rx: 9, ry: 48 },
    origem: ["Epicôndilo lateral do úmero (tendão comum dos extensores)"], origemPonto: [140, 35],
    insercao: ["Base do 3º metacarpo"], insercaoPonto: [142, 245],
    acao: "Extensão e desvio radial do punho e estabilização do punho.",
    inervacao: "Ramo profundo do nervo radial (interósseo posterior, C6–C7).",
    vascularizacao: ["Artéria radial recorrente"],
    dica: "Ponto mais frequente de dor na epicondilite lateral, pela inserção no epicôndilo.",
  },
  {
    id: "extensor-dedos", nome: "Extensor dos dedos", latim: "M. extensor digitorum", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 158, cy: 150, rx: 12, ry: 58 },
    origem: ["Epicôndilo lateral do úmero (tendão comum)"], origemPonto: [150, 35],
    insercao: ["Falanges médias e distais dos dedos 2 a 5, pelo capuz extensor"], insercaoPonto: [160, 255],
    acao: "Extensão das articulações metacarpofalângicas e interfalângicas dos dedos 2 a 5, e do punho.",
    inervacao: "Ramo profundo do nervo radial (interósseo posterior, C7–C8).",
    vascularizacao: ["Artéria interóssea posterior"],
    dica: "Lesão do tendão terminal no dorso do dedo causa o 'dedo em martelo' (não estende a falange distal).",
  },
  {
    id: "extensor-dedo-minimo", nome: "Extensor do dedo mínimo", latim: "M. extensor digiti minimi", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 172, cy: 145, rx: 7, ry: 45, rot: -8 },
    origem: ["Epicôndilo lateral do úmero (tendão comum)"], origemPonto: [166, 40],
    insercao: ["Dorso da falange proximal do dedo mínimo"], insercaoPonto: [178, 215],
    acao: "Extensão do dedo mínimo.",
    inervacao: "Ramo profundo do nervo radial (C7–C8).",
    vascularizacao: ["Artéria interóssea posterior"],
    dica: "Trabalha junto com o extensor dos dedos. Lesão isolada é rara.",
  },
  {
    id: "extensor-ulnar-carpo", nome: "Extensor ulnar do carpo", latim: "M. extensor carpi ulnaris", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 185, cy: 150, rx: 8, ry: 50, rot: -10 },
    origem: ["Epicôndilo lateral e borda posterior da ulna (proximal)"], origemPonto: [172, 40],
    insercao: ["Base do 5º metacarpo"], insercaoPonto: [185, 240],
    acao: "Extensão e desvio ulnar do punho.",
    inervacao: "Ramo profundo do nervo radial (C7–C8).",
    vascularizacao: ["Artéria interóssea posterior"],
    dica: "Instabilidade do tendão deste músculo pode causar dor no lado ulnar do punho.",
  },
  {
    id: "supinador", nome: "Supinador", latim: "M. supinator", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 128, cy: 72, rx: 16, ry: 20 },
    origem: ["Epicôndilo lateral do úmero, ligamento colateral radial e crista da ulna"], origemPonto: [140, 50],
    insercao: ["Face lateral proximal do rádio"], insercaoPonto: [115, 85],
    acao: "Supinação do antebraço, com o cotovelo estendido ou fletido.",
    inervacao: "Ramo profundo do nervo radial (interósseo posterior, C6).",
    vascularizacao: ["Artéria interóssea posterior", "Ramos da artéria radial recorrente"],
    dica: "O nervo interósseo posterior passa pelo supinador. Compressão causa fraqueza para estender os dedos, sem perda sensitiva.",
  },
  {
    id: "abdutor-longo-polegar", nome: "Abdutor longo do polegar", latim: "M. abductor pollicis longus", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 108, cy: 210, rx: 9, ry: 46, rot: 25 },
    origem: ["Faces posteriores da ulna e do rádio e membrana interóssea (terço médio)"], origemPonto: [118, 160],
    insercao: ["Base do 1º metacarpo"], insercaoPonto: [100, 255],
    acao: "Abdução do polegar (afastá-lo do indicador) e desvio radial do punho.",
    inervacao: "Ramo profundo do nervo radial (interósseo posterior, C7–C8).",
    vascularizacao: ["Artéria interóssea posterior"],
    dica: "Forma, com o extensor curto do polegar, o 1º compartimento dorsal: local da tenossinovite de De Quervain.",
  },
  {
    id: "extensor-curto-polegar", nome: "Extensor curto do polegar", latim: "M. extensor pollicis brevis", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 116, cy: 228, rx: 7, ry: 34, rot: 18 },
    origem: ["Face posterior do rádio e membrana interóssea (distal ao abdutor longo)"], origemPonto: [122, 190],
    insercao: ["Base da falange proximal do polegar"], insercaoPonto: [110, 240],
    acao: "Extensão da metacarpofalângica do polegar.",
    inervacao: "Ramo profundo do nervo radial (interósseo posterior, C7–C8).",
    vascularizacao: ["Artéria interóssea posterior"],
    dica: "Integra o 1º compartimento dorsal junto com o abdutor longo (De Quervain).",
  },
  {
    id: "extensor-longo-polegar", nome: "Extensor longo do polegar", latim: "M. extensor pollicis longus", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 134, cy: 222, rx: 7, ry: 50, rot: -5 },
    origem: ["Face posterior da ulna (terço médio) e membrana interóssea"], origemPonto: [138, 175],
    insercao: ["Base da falange distal do polegar"], insercaoPonto: [128, 278],
    acao: "Extensão das interfalângica e metacarpofalângica do polegar, e abdução do polegar.",
    inervacao: "Ramo profundo do nervo radial (C7–C8).",
    vascularizacao: ["Artéria interóssea posterior"],
    dica: "Ao cruzar o extensor radial do carpo, delimita a tabaqueira anatômica.",
  },
  {
    id: "extensor-indicador", nome: "Extensor do indicador", latim: "M. extensor indicis", grupo: "Antebraço posterior", vista: "antebraco-posterior",
    forma: { cx: 160, cy: 238, rx: 6, ry: 48 },
    origem: ["Face posterior da ulna (distal)"], origemPonto: [158, 195],
    insercao: ["Dorso da falange proximal do indicador, pelo capuz extensor"], insercaoPonto: [165, 280],
    acao: "Extensão isolada do dedo indicador, junto com o extensor dos dedos.",
    inervacao: "Ramo profundo do nervo radial (interósseo posterior, C7–C8).",
    vascularizacao: ["Artéria interóssea posterior"],
    dica: "Permite estender o indicador sozinho, como no gesto de apontar.",
  },
];

export function acharMusculo(id: string) {
  return MUSCULOS.find((m) => m.id === id);
}
