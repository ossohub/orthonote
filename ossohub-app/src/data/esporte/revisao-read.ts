import type { Nota, Topico } from "./types";

// Revisão com Read & Wade — Sports Injuries: A Unique Guide to Self-Diagnosis
// and Rehabilitation (3ª ed., 2009). Mesmo conceito: concorda / diverge / acrescenta.
// Texto resumido com palavras próprias.

export const NOTAS_READ: Record<string, Nota[]> = {
  "r-principios": [
    { fonte: "READ", tipo: "diverge", texto: "É mais conservador com a dor durante o exercício: parar quando a dor aparece e só continuar se ela some em 20–30 segundos. O site aceita dor até 3–4/10 que volte ao basal em 24 h — os dois modelos usam a resposta no dia seguinte como guia." },
    { fonte: "READ", tipo: "acrescenta", texto: "Regras práticas pela manhã seguinte: dor que sumiu → carga adequada; pior ao acordar mas melhora até o meio-dia → no limite, reduzir ~10%; pior por 24–48 h → passou muito do limite, descansar e recomeçar com ~50% menos. Nunca aumentar volume e intensidade ao mesmo tempo (primeiro distância, depois velocidade). Ver 'Escadas de retorno graduado'." },
  ],
  "r-agudo": [
    { fonte: "READ", tipo: "diverge", texto: "Usa RICE (repouso, gelo, compressão e elevação) com gelo úmido por 5–10 min e sugere anti-inflamatório se a dor aparecer horas depois. O site segue o PEACE & LOVE, que evita anti-inflamatórios nos primeiros dias e prioriza carga precoce." },
    { fonte: "READ", tipo: "concorda", texto: "Compressão e elevação para o edema e procurar avaliação médica quando houver dúvida diagnóstica ou dor que não melhora em poucos dias." },
  ],
  "f-modalidades": [
    { fonte: "READ", tipo: "diverge", texto: "Recomenda gelo úmido por apenas 5–10 min e nunca mais de 10 min direto na pele — tempo menor que os 10–20 min citados aqui. Também afirma que laser e ultrassom terapêutico não aceleram a cicatrização (concorda com a evidência fraca citada)." },
  ],
  "f-flexibilidade": [
    { fonte: "READ", tipo: "concorda", texto: "Não há evidência de que alongar previna lesões; o alongamento serve como parte do aquecimento e para amplitude." },
    { fonte: "READ", tipo: "diverge", texto: "Orienta alongamento estático de 10–20 s antes do exercício. O site prefere aquecimento dinâmico antes e estático de 15–30 s depois do treino ou em sessão separada." },
  ],
  "l-concussao": [
    { fonte: "READ", tipo: "acrescenta", texto: "Perguntas de Maddocks na beira do campo: contra quem estamos jogando, em que tempo/período estamos, quem marcou por último, contra quem jogamos na rodada anterior e se vencemos. Não responder corretamente indica concussão — hoje essas perguntas fazem parte do SCAT6." },
  ],
  "l-punho-mao": [
    { fonte: "READ", tipo: "acrescenta", texto: "Punho do tenista: dor no dorso do punho (abaixo do 2º–3º metacarpo) ao estender, ligada à empunhadura 'western' no forehand — trocar para semi-western. Punho do ginasta (handstand wrist): dor dorsal ao apoiar com o punho em extensão — fazer apoios com mãos fechadas ou sobre um calço e progredir aos poucos. Punho do remador/canoísta: tenossinovite de De Quervain." },
    { fonte: "READ", tipo: "concorda", texto: "Polegar do esquiador: dor na base do polegar ao forçar para fora; incapacidade de segurar um copo exige avaliação médica." },
  ],
  "l-epicondilite": [
    { fonte: "READ", tipo: "acrescenta", texto: "Correções técnicas no tênis/badminton: empunhadura muito apertada (polegar e indicador) trava o punho e sobrecarrega o cotovelo — usar cabo mais grosso, segurar com 3º–5º dedos e evitar ficar de frente no smash. Revisar técnica com o treinador." },
  ],
  "l-cotovelo-medial": [
    { fonte: "READ", tipo: "acrescenta", texto: "No arremessador, a extensão brusca do cotovelo mantendo o punho armado sobrecarrega o olécrano e o tríceps; certos tipos de arremesso pioram o compartimento lateral (radioumeral) — reduzir o uso do gesto que provoca dor." },
  ],
  "l-manguito": [
    { fonte: "READ", tipo: "acrescenta", texto: "Em esportes de raquete, o arco doloroso costuma vir de golpes com o ombro 'solto' ou do smash batido muito atrás da cabeça: reduzir a potência, usar mais o punho e corrigir a posição dos pés." },
  ],
  "l-isquios": [
    { fonte: "READ", tipo: "acrescenta", texto: "Esportes com explosões após longos períodos parados (ex.: beisebol, críquete) concentram lesões de isquiotibiais e adutores — aquecimento completo antes de cada entrada em jogo." },
  ],
  "l-aquiles": [
    { fonte: "READ", tipo: "acrescenta", texto: "A aba alta do calcanhar de alguns tênis (o 'protetor de Aquiles') pode comprimir o tendão e causar dor e espessamento — inclusive em quem usa tênis esportivo no dia a dia. Elevação do calcanhar e retorno só após completar as etapas de reabilitação." },
  ],
  "r-fratura": [
    { fonte: "READ", tipo: "acrescenta", texto: "Clavícula: consolidação estimada em 6–8 semanas; manter mobilidade da mão e do ombro e condicionamento (bicicleta, corrida) enquanto consolida. Marcos funcionais simples (ex.: número de flexões de braço sem dor) ajudam a liberar atividades com risco de queda." },
  ],
  "f-proprio": [
    { fonte: "READ", tipo: "concorda", texto: "Prancha de equilíbrio (wobble board) como recurso para reabilitar tornozelo e prevenir recidiva." },
  ],
  "l-entorse-tornozelo": [
    { fonte: "READ", tipo: "concorda", texto: "Retorno progressivo com exercícios de equilíbrio e etapas de corrida, sem pular fases." },
  ],
  "r-lca": [
    { fonte: "READ", tipo: "concorda", texto: "Retorno em etapas graduais; perda de ritmo/coordenação na execução indica que o atleta ainda não está pronto para avançar." },
  ],
};

export const NOVOS_READ: Topico[] = [
  {
    id: "r-escada", titulo: "Escadas de retorno graduado e regras da dor", area: "reabilitacao", grupo: "Geral",
    tags: ["escada", "training ladder", "retorno à corrida", "dor no dia seguinte", "progressão", "ritmo"],
    resumo: "Subir degrau por degrau: manter o condicionamento sem estressar a lesão e depois recuperar força, ritmo e gesto esportivo.",
    secoes: [
      { t: "Regras de progressão", itens: ["Fazer cada degrau corretamente; se perder o ritmo ou compensar, ficar no mesmo degrau ou voltar um.", "Dor que some em até 20–30 s permite continuar; se persistir, parar, esperar 24 h e recomeçar do início.", "Avaliar na manhã seguinte: sem dor → manter/avançar; dor que melhora até o meio-dia → reduzir ~10%; dor por 24–48 h → descansar e recomeçar com ~50% menos.", "Nunca aumentar duas variáveis juntas: primeiro distância/repetições, depois velocidade/carga.", "Na sessão seguinte, os degraus já vencidos viram aquecimento (menos repetições)."] },
    ],
    fases: [
      { nome: "Escada inferior — manter o condicionamento", objetivos: ["Preservar capacidade aeróbia e força geral sem sobrecarregar a lesão"], exercicios: ["Bicicleta, natação ou corrida em piscina", "Fortalecimento de tronco e dos membros não lesionados", "Mobilidade e isométricos sem dor da região lesionada"], criterios: ["Atividades diárias sem dor", "Sem piora na manhã seguinte"] },
      { nome: "Degraus iniciais — carga leve", objetivos: ["Reintroduzir o gesto com baixa intensidade"], exercicios: ["Caminhada rápida → trote leve em superfície regular", "Exercícios de força progressivos da região lesionada"], criterios: ["Ritmo simétrico, sem mancar", "Dor que some em segundos"] },
      { nome: "Degraus intermediários — volume", objetivos: ["Aumentar distância/repetições antes da velocidade"], exercicios: ["Corrida contínua aumentando a distância", "Saltos e deslocamentos laterais leves"], criterios: ["Volume-alvo sem piora no dia seguinte"] },
      { nome: "Degraus superiores — intensidade e gesto", objetivos: ["Velocidade, mudança de direção e técnica do esporte"], exercicios: ["Acelerações progressivas e sprints", "Mudanças de direção e drills do esporte", "Treino com a equipe"], criterios: ["Velocidade e agilidade sem dor e sem perda de ritmo"] },
      { nome: "Topo — retorno à competição", objetivos: ["Jogo completo"], exercicios: ["Treino integral e jogo; manter a escada inferior como complemento"], criterios: ["Liberação pela equipe de saúde"] },
    ],
    notas: [
      { fonte: "READ", tipo: "diverge", texto: "O modelo do livro manda parar diante de dor que dura mais que alguns segundos; outras referências deste site toleram dor leve (até 3–4/10) se não piorar no dia seguinte. Use o critério mais conservador em lesões ósseas e no início da reabilitação." },
    ],
    ver: ["r-principios", "r-agudo"],
    fontes: ["READ", "REHAB"],
  },
  {
    id: "b-modalidades", titulo: "Lesões técnicas por modalidade esportiva", area: "biomecanica", grupo: "Gestos esportivos",
    tags: ["tênis", "badminton", "beisebol", "golfe", "corrida", "natação", "remo", "canoagem", "ginástica", "musculação", "técnica"],
    resumo: "Muitas lesões vêm de erros de técnica, de equipamento ou de excesso de volume — corrigir a causa é parte do tratamento.",
    secoes: [
      { t: "Raquete (tênis, badminton, squash)", itens: ["Epicondilalgia lateral: empunhadura apertada, cabo fino, golpe de frente no smash.", "Punho dorsal doloroso: empunhadura 'western' no forehand.", "Arco doloroso no ombro: smash muito atrás da cabeça ou ombro 'solto'.", "Afundos mal executados: lombar, isquiotibiais e Aquiles; deslocamento lateral exagerado: adutores."] },
      { t: "Arremesso (beisebol, críquete, handebol)", itens: ["Cotovelo do arremessador: extensão brusca com punho armado (olécrano, tríceps) e estresse em valgo (ligamento colateral ulnar).", "Sprints após longos períodos parados: isquiotibiais e virilha."] },
      { t: "Corrida e atletismo", itens: ["Aumento brusco de volume, calçado inadequado e superfície dura: canelite, fraturas por estresse, tendinopatias.", "Aba alta do calcanhar do tênis comprimindo o Aquiles."] },
      { t: "Remo e canoagem", itens: ["Punho do remador: tenossinovite de De Quervain pelo desvio repetido do punho.", "Lombar e costelas: volume alto com técnica de tronco inadequada."] },
      { t: "Natação", itens: ["Ombro do nadador por volume e desequilíbrio muscular; joelho no nado peito (estresse medial da pernada)."] },
      { t: "Ginástica e musculação", itens: ["Punho do ginasta: apoio repetido com o punho em extensão máxima.", "Lombar e ombro na musculação: carga excessiva com técnica ruim e progressão rápida."] },
      { t: "Golfe", itens: ["Epicondilalgia medial (cotovelo de golfista) e dor lombar por rotação repetida do tronco."] },
    ],
    ver: ["b-arremesso", "b-corrida", "l-epicondilite", "l-punho-mao"],
    fontes: ["READ", "SPBIO"],
  },
];
