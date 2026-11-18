import type { Nota, Topico } from "./types";

// Revisão diária da Medicina Esportiva (um capítulo por dia — ver docs/revisao-diaria).
// NOTAS_DIARIA: id do tópico → notas de comparação (concorda / diverge / acrescenta).
// NOVOS_DIARIA: tópicos que o capítulo traz e o site ainda não tinha.
// Sempre com palavras próprias; nunca copiar texto dos livros.
// Erros de conteúdo são corrigidos direto no arquivo da área (lesoes.ts etc.)
// e registrados no resumo da fila.

export const NOTAS_DIARIA: Record<string, Nota[]> = {
  "f-triagem-msk": [
    { fonte: "SRIP", tipo: "diverge", texto: "O livro apresenta pontos de corte isolados (ângulo Q, queda do navicular, relação isquiotibiais/quadríceps < 0,75, déficit de isquiotibiais > 15%) como marcadores de risco. Estudos prospectivos mais recentes mostram que nenhum teste isolado prevê bem a lesão de um atleta específico; o ângulo Q, por exemplo, tem baixa reprodutibilidade e não prevê lesão. Usar os achados para direcionar o treino, nunca como 'sentença' de risco." },
    { fonte: "SRIP", tipo: "diverge", texto: "A relação isquiotibiais/quadríceps citada (< 0,75 = 1,6x mais lesão de joelho) mistura conceitos. Na prática usam-se duas relações: a convencional (concêntrico/concêntrico, em torno de 0,5–0,6 a 60°/s) e a funcional (excêntrico de isquiotibiais / concêntrico de quadríceps, ideal perto de 1,0). Informar qual relação e qual velocidade foram usadas ao interpretar." },
  ],
  "l-lca": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Fatores de risco do LCA: alinhamento do membro (pronação excessiva, recurvato, torção tibial), frouxidão ligamentar, chanfro intercondilar estreito, fatores hormonais, força e controle neuromuscular. Só os dois últimos são modificáveis pelo treino — por isso são o foco da triagem e da prevenção (ver 'Triagem musculoesquelética')." },
  ],
  "b-aterrissagem": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "No campo, filmagem 2D de frente durante corte lateral ou salto lateral é válida para triagem do valgo dinâmico: correlaciona de moderada a boa com a análise 3D (padrão-ouro), melhor quando o valgo é grande. Valgo pequeno pode passar despercebido no 2D." },
  ],
  "l-iliotibial": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "No ciclista, conferir o ajuste da bicicleta: selim alto demais se associa a dor no trato iliotibial; posição do pé no pedal e taquinho com rotação livre ('flutuante') reduzem estresse no joelho." },
  ],
  "l-pfp": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "No ciclista, selim baixo demais se associa a dor anterior do joelho/patelofemoral e a lombalgia — ajuste da bicicleta faz parte do tratamento." },
  ],
  "r-cervical": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Antes de manipular a coluna cervical: anamnese completa para afastar sintomas de dissecção da artéria vertebral (tontura, diplopia, disartria, disfagia, queda súbita, cefaleia/cervicalgia súbita e intensa). Começar por técnicas não provocativas; os testes funcionais pré-manipulação não são confiáveis para excluir o risco." },
  ],
  "r-lombar": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Valores de referência úteis para resistência do tronco em pessoas sem lombalgia: prancha ventral (apoio em antebraços) ≈ 72 ± 33 s e ponte em decúbito dorsal com uma perna estendida ≈ 170 ± 43 s. Interromper o teste se surgir dor lombar ou na coxa posterior." },
  ],
  "f-triagem": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "A avaliação pré-participação (estado físico e mental) deve ser feita antes de o atleta começar a competir — é também uma das principais áreas de responsabilidade legal da equipe. Não ter dados de base do atleta sem lesão está entre os erros mais comuns: sem eles, fica difícil provar e decidir quando ele voltou ao normal." },
  ],
  "r-principios": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Liberar para jogar com lesão ainda presente é um dilema ético frequente (pressão do clube, do técnico e do próprio atleta). A decisão de aptidão deve seguir a prática clínica atual, ser registrada e, na dúvida, o atleta deve ser afastado e encaminhado a um profissional mais experiente — continuar jogando e agravar a lesão gera responsabilidade para quem liberou." },
  ],
};

export const NOVOS_DIARIA: Topico[] = [
  {
    id: "f-triagem-msk", titulo: "Triagem musculoesquelética e prevenção de lesões", area: "fisioterapia", grupo: "Prevenção",
    tags: ["triagem", "screening", "prevenção de lesões", "questionário", "nmq-e", "örebro", "gals", "ângulo q", "navicular", "thomas", "dorsiflexão", "performance matrix", "pré-temporada"],
    resumo: "Pré-temporada: questionário aplicado por profissional → testes funcionais padronizados → análise dinâmica (vídeo) → mapa de 'elos fracos' → programa individual com o preparador físico.",
    secoes: [
      { t: "Quando e por quê", itens: ["Melhor momento: fora de temporada ou início da pré-temporada, sem a pressão de jogos.", "Objetivo: achar fatores de risco corrigíveis e planejar o treino — ser proativo, não só reativo.", "Equilíbrio: pouco 'pré-habilitação' gera lesões; excesso de trabalho corretivo de baixa intensidade tira tempo do treino de alta intensidade que o esporte exige."] },
      { t: "1. Questionário (primeiro filtro)", itens: ["Questionário Nórdico Estendido (NMQ-E): mapa do corpo por região — dor nos últimos 12 meses, no último mês, hoje, afastamentos e tratamentos.", "Perguntas simples de triagem separam quem precisa da avaliação completa de quem não precisa — economiza tempo em elencos grandes.", "Aplicado por profissional detecta mais problemas (cerca de 92% vs 80% quando aplicado por leigo).", "Örebro (OMPSQ): avalia função percebida, dor, medo-evitação e sofrimento; função e dor previram dias de afastamento em 3 anos.", "Escala visual analógica (EVA, 0–100 mm) é a forma mais usada e confiável de registrar a dor; padronizar âncoras e período (agora, última semana)."] },
      { t: "2. Exame geral rápido", itens: ["GALS (marcha, braços, pernas, coluna): inspeção e movimento de cada segmento; boa concordância entre examinadores e boa detecção em problemas crônicos, bem menor nos agudos.", "Coluna lombar: testes de provocação com baixa especificidade — positivos pedem avaliação dirigida."] },
      { t: "3. Bateria funcional padronizada (exemplos)", itens: ["Extensão ativa do joelho com quadril a 90° (comprimento de isquiotibiais).", "Teste de Thomas modificado (flexores do quadril e reto femoral).", "Rotação interna e externa do quadril em decúbito ventral (goniômetro).", "Lunge na parede (joelho na parede, pé apoiado): distância máxima = dorsiflexão do tornozelo.", "Elevação de calcanhar unipodal até a falha (resistência de panturrilha).", "Prancha ventral e ponte unipodal: tempo em posição neutra (interromper se houver dor).", "Alta reprodutibilidade quando cada teste tem protocolo e ponto de falha definidos; filmar e medir depois aumenta a objetividade."] },
      { t: "4. Joelho e LCA", itens: ["Medir: queda do navicular (sentado em neutro × em pé; ~13 mm em quem teve lesão do LCA vs ~8 mm em sadios), recurvato e hiperfrouxidão (polegar, dedos, cotovelos, joelho), torção tibial e postura.", "Ângulo Q normal ~10–15°, mas a medida é pouco reprodutível — nunca usar sozinha.", "Força: assimetria entre membros e entre isquiotibiais e quadríceps (isocinético em 60, 180 e 300°/s, ou testes de campo).", "Controle neuromuscular: dois ou mais tipos de salto (unipodal, vertical unipodal, cronometrado), oito, deslocamento lateral, escada.", "Vídeo 2D de frente no corte/salto lateral para triagem do valgo dinâmico."] },
      { t: "5. Compensações após lesão", itens: ["Depois de uma lesão, outros músculos assumem a função e o padrão pode persistir mesmo com o músculo já recuperado.", "Exemplo: com glúteo máximo pouco ativo, a extensão do quadril é feita por glúteo médio e isquiotibiais — e a carga articular sobe no joelho.", "Na triagem, não basta o movimento acontecer: conferir se é feito pelo músculo certo."] },
      { t: "6. Do resultado ao programa", itens: ["Montar um mapa de 'elos fracos' por região e direção de movimento (ex.: Performance Matrix).", "Corrigir controle motor primeiro com treino de baixo limiar (baixa carga, foco no controle) e depois progredir para alta carga/velocidade.", "Treinar o elo fraco de forma isolada; se treinar tudo junto, a área forte compensa e a fraca não melhora.", "O condicionamento deve reproduzir o esporte: gestos, ações musculares, mudanças de direção, velocidades e cargas.", "Olhar o esporte como um todo: equipamento e técnica (ex.: ajuste de selim e pedal no ciclismo).", "Educar técnico e atleta: volta à calma, hidratação e recuperação, não só aquecimento."] },
      { t: "Limites", itens: ["Nenhum teste isolado prevê quem vai se lesionar; o valor está no conjunto e em orientar o treino.", "Envolver o atleta: quem entende o processo adere mais ao programa."] },
    ],
    ver: ["f-triagem", "f-proprio", "b-aterrissagem", "l-lca", "r-isquios", "f-flexibilidade"],
    fontes: ["SRIP"],
  },
  {
    id: "r-equipe-campo", titulo: "Atendimento à beira do campo: equipe, emergência, sigilo e registro", area: "reabilitacao", grupo: "Geral",
    tags: ["beira do campo", "equipe multiprofissional", "plano de emergência", "rcp", "dea", "sigilo", "prontuário", "ética", "responsabilidade legal"],
    resumo: "Lesão no esporte é cuidada em equipe. Quem atende no campo precisa de preparo para emergência, plano escrito, sigilo sobre o atleta e registro completo.",
    secoes: [
      { t: "Equipe", itens: ["Médicos (clínico, ortopedista, radiologista, cardiologista, neurologista), fisioterapeuta/reabilitador, preparador físico, nutricionista, psicólogo do esporte, técnico e dirigentes.", "Nem todos estão presentes em todo nível; o essencial é saber quem decide o quê e para quem encaminhar.", "Atleta menor de idade: pais ou responsáveis fazem parte das decisões."] },
      { t: "Preparo mínimo de quem atende no campo", itens: ["Suporte básico de vida com DEA (RCP + desfibrilador) com certificação em dia e retreino periódico.", "Primeiros socorros, precauções com sangue e fluidos, bandagem e órteses.", "Avaliar a lesão logo no campo, de preferência antes do espasmo muscular e do edema mascararem o exame.", "Esportes com equipamento de proteção (capacete e ombreiras no futebol americano, hóquei no gelo, críquete): treinar o atendimento de emergência com o equipamento — inclusive quando e como retirá-lo."] },
      { t: "Plano de emergência", itens: ["Clube, escola ou evento deve ter plano escrito para cada local: quem atende, material, acesso da ambulância e hospital de referência.", "Situações que exigem resposta rápida e protocolo próprio: concussão, suspeita de lesão medular e hipertermia (insolação de esforço).", "Afastar da partida o atleta lesionado quando continuar pode agravar a lesão."] },
      { t: "Sigilo", itens: ["Examinar longe de colegas, adversários e imprensa sempre que possível; cuidado com comentários em voz alta.", "Informação de saúde do atleta só é passada ao técnico, clube ou imprensa com consentimento dele (ou quando a lei exigir).", "Combinar antes, com o atleta e o clube, como as informações serão compartilhadas."] },
      { t: "Registro (prontuário)", itens: ["Registrar a lesão, a avaliação, o tratamento, a evolução e as orientações dadas (inclusive explicação de cada recurso terapêutico).", "Nunca alterar ou 'corrigir' registros depois; manter os registros protegidos.", "Em lesão grave ou catastrófica, a documentação precisa ser bem mais detalhada do que se costuma imaginar."] },
      { t: "Onde mais surgem processos", itens: ["Avaliação pré-participação ausente ou mal feita.", "Liberação para jogar sem critério atual.", "Atendimento inadequado de lesão grave no campo.", "Quebra de sigilo.", "Também: piso/equipamento inseguro, falta de equipamento de proteção ou de ensino de técnica segura, demora em encaminhar."] },
    ],
    ver: ["f-triagem", "r-principios", "l-concussao", "r-agudo"],
    fontes: ["SRIP"],
  },
];
