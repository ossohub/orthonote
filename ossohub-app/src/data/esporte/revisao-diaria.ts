import type { Nota, Topico } from "./types";

// Revisão diária da Medicina Esportiva (um capítulo por dia — ver docs/revisao-diaria).
// NOTAS_DIARIA: id do tópico → notas de comparação (concorda / diverge / acrescenta).
// NOVOS_DIARIA: tópicos que o capítulo traz e o site ainda não tinha.
// Sempre com palavras próprias; nunca copiar texto dos livros.
// Erros de conteúdo são corrigidos direto no arquivo da área (lesoes.ts etc.)
// e registrados no resumo da fila.

export const NOTAS_DIARIA: Record<string, Nota[]> = {
  "f-forca": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Teste de 1RM padronizado: aquecer 5–10 repetições a 40–60% do 1RM estimado (descanso 1–2 min) → 3–5 repetições a 60–80% (descanso 4–5 min) → subir 5–10% e tentar 1 repetição; se conseguir, descansar 4–5 min, subir ~5% e repetir. Iniciante pode precisar de 6–7 tentativas; experiente, 3–5. Técnica idêntica entre sessões e uma sessão de familiarização antes." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Para quem não está acostumado a cargas máximas (ou em fase final de reabilitação), testar 3RM ou 5RM: ainda mede força, correlaciona bem com o 1RM e é mais bem aceito." },
  ],
  "n-metabolismo": [
    { fonte: "SRIP", tipo: "diverge", texto: "O livro dá janelas mais curtas: fosfagênio (ATP + fosfocreatina) sustenta só ~6–8 s de esforço máximo, e a glicólise atinge o pico em ~5 s e se mantém ~30–40 s em intensidade máxima (ex.: 400 m). Aqui usamos ~10 s e até ~2 min — são faixas aproximadas; os sistemas se sobrepõem e o predomínio depende da intensidade." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Nos esportes coletivos, o sistema aeróbio é o que repõe a fosfocreatina nas pausas entre os sprints. Por isso o condicionamento aeróbio melhora a capacidade de repetir sprints — e a análise de necessidades deve definir se o fator limitante do atleta é o aeróbio ou a velocidade." },
  ],
  "f-pliometria": [
    { fonte: "SRIP", tipo: "concorda", texto: "Mesma progressão de direção: começar por saltos verticais, depois para a frente, depois laterais e por fim multidirecionais, cada vez mais parecidos com o esporte." },
  ],
  "r-lca": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Hop tests no retorno (comparar com o lado sadio): salto unipodal à distância, triplo à distância, triplo cruzado (cruzando uma fita de ≥ 8 m) e 6 m cronometrado. Mãos no quadril, aterrissagem estável e medir até o calcanhar. Os de distância são muito reprodutíveis (erro de medida ~5 cm no simples e ~11–18 cm nos triplos); o de 6 m com cronômetro manual é bem menos confiável — usar fotocélulas." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Além da distância, observar a qualidade da aterrissagem nos hop tests (valgo, falta de controle do tronco): o mau controle é fator de risco de nova lesão mesmo com índice de simetria bom." },
  ],
  "r-tornozelo": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Star Excursion/Y-balance padronizado: calcanhar no centro, hálux na linha anterior; a perna que alcança não pode servir de apoio. Fazer 4–6 tentativas de treino e 5 min de descanso antes de medir. Aplicar antes de qualquer atividade cansativa — a fadiga piora o resultado e falseia a comparação entre os lados." },
  ],
  "r-isquios": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Dois mecanismos sem contato: corrida em alta velocidade (fim do balanço e saída do pé, quando o músculo freia flexão do quadril e extensão do joelho) e alongamento em amplitude extrema (dança, chute). Na prevenção e na fase final, além do Nordic, progredir para excêntrico rápido (pliometria/desaceleração)." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Alongamento na fase inicial: evitar alongamento passivo forçado no fim da amplitude por pelo menos 72 h (idealmente 7–10 dias). Antes disso, só levar o músculo pela amplitude livre de dor, sem forçar. A cicatriz começa a retrair por volta do 10º dia — é aí que o alongamento progressivo passa a fazer sentido." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Isométricos a partir do 2º–5º dia, dentro da dor (ex.: 3 × 10 contrações de 5–10 s), primeiro em amplitude média, depois encurtada e por fim alongada. Isotônicos só quando os isométricos estiverem sem dor em toda a amplitude: começar com resistência (3 × 15 a 40–60% de 1RM), depois força e potência." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Nordic e outros excêntricos geram dor muscular tardia: começar com volume baixo (3–5 séries de 3 repetições) e frequência maior (3–4x/semana), e aumentar aos poucos." },
    { fonte: "SRIP", tipo: "acrescenta", texto: "Manter o condicionamento desde cedo sem estressar a lesão (bicicleta, natação, corrida na água, membros superiores) — músculo cansado absorve menos energia antes de romper, e a fadiga é fator de risco de nova lesão." },
  ],
  "l-isquios": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Recidiva de 12–31%; cerca de 1 em cada 13 atletas volta a se lesionar no 1º ano após o retorno. Fatores de risco citados: lesão prévia (o mais consistente), fadiga, aquecimento inadequado, pouca flexibilidade, desequilíbrio de força (incluindo relação isquiotibiais/quadríceps), má coordenação e postura lombar. Pico de torque em ângulo mais 'curto' do joelho também pode aumentar o risco — e o Nordic desloca esse pico para comprimentos maiores." },
    { fonte: "SRIP", tipo: "diverge", texto: "Flexibilidade e relação de força isquiotibiais/quadríceps aparecem no livro como fatores de risco, mas revisões prospectivas mais recentes mostram associação fraca ou inconsistente. Os fatores mais firmes hoje são lesão prévia de isquiotibiais, idade e baixa força excêntrica." },
  ],
  "r-agudo": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "No músculo, o repouso deve ser relativo e curto: imobilizar ou carregar mal (pouco ou demais) forma cicatriz retraída que impede a regeneração das fibras e deixa a área mais vulnerável. Carga leve e abaixo do limiar de dor, cedo, ajuda a orientar fibras e colágeno." },
    { fonte: "SRIP", tipo: "diverge", texto: "Para lesão muscular, a compressão tem pouca evidência: num estudo com 40 atletas com lesão de panturrilha, a compressão imediata não reduziu o hematoma nem acelerou a recuperação. O livro sugere que o maior ganho de compressão e elevação é garantir repouso relativo nas primeiras 72 h. Continuamos indicando compressão para conforto e edema." },
  ],
  "f-modalidades": [
    { fonte: "SRIP", tipo: "diverge", texto: "O livro indica ondas curtas pulsadas para reabsorver hematoma muscular e ultrassom para 'quebrar' cicatriz. A base é sobretudo laboratorial (células e animais); ensaios clínicos não mostram benefício consistente — não devem substituir a carga progressiva." },
    { fonte: "SRIP", tipo: "diverge", texto: "Afirma que a eletroestimulação neuromuscular reduz edema e inibição, mas não ajuda a recuperar força. Hoje há boa evidência de que a eletroestimulação somada ao exercício melhora a força do quadríceps após reconstrução do LCA — é útil quando há inibição muscular importante." },
  ],
  "b-contracao": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Base da contração: o impulso nervoso percorre o sarcolema e os túbulos T, o retículo sarcoplasmático libera cálcio, o cálcio se liga à troponina e libera o sítio de ligação na actina; as pontes de miosina puxam a actina (filamentos deslizantes), com gasto de ATP. Banda A não muda; banda I encurta." },
  ],
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
  {
    id: "f-testes-fisicos", titulo: "Análise de necessidades e testes físicos do atleta", area: "fisioterapia", grupo: "Fundamentos",
    tags: ["análise de necessidades", "testes físicos", "avaliação física", "sprint", "agilidade", "teste t", "illinois", "salto vertical", "hop test", "star excursion", "y-balance", "wingate", "1rm", "isocinético", "yo-yo", "vo2máx", "retorno ao esporte"],
    resumo: "Primeiro entender o que o esporte exige (energia, movimentos, lesões típicas); depois testar o atleta com testes válidos, reprodutíveis e na ordem certa, para treinar o ponto fraco e ter base para o retorno após lesão.",
    secoes: [
      { t: "1. Análise de necessidades do esporte", itens: ["Metabólico: qual sistema de energia predomina (fosfagênio, glicolítico, aeróbio) — quase sempre os três se misturam.", "Mecânico: movimentos, articulações e direções envolvidos; treinar movimentos, não músculos isolados (cadeia fechada transfere mais para a função).", "Tipo de ação: além de gerar força, o atleta precisa absorver força (excêntrico rápido, aterrissagem, desaceleração).", "Velocidade: contatos com o solo no sprint duram ~70–125 ms em velocidade máxima e > 200 ms na aceleração.", "Contexto: duração, relação esforço–pausa, contato físico, calendário, nutrição, lado psicológico e lesões mais comuns de cada posição."] },
      { t: "2. Qualidade do teste", itens: ["Validade: o teste mede o que interessa? (dobra cutânea mede dobra; % de gordura é estimativa).", "Reprodutibilidade: mesmo avaliador, equipamento, horário, aquecimento, roupa e local; cronômetro manual erra mais que a diferença que se quer detectar.", "Objetividade: protocolo fixo; lembrar que o atleta pode 'render menos' de propósito no primeiro teste da pré-temporada.", "Laboratório = preciso e controlado, porém caro e pouco funcional; campo = funcional, rápido para o elenco, mas sujeito ao ambiente."] },
      { t: "3. Montando a bateria", itens: ["No máximo ~7 testes, escolhidos pela pergunta: melhorar nesse teste melhora o desempenho no esporte?", "Ordem (NSCA): agilidade → velocidade → força → resistência muscular/anaeróbia → aeróbio (de preferência em outro dia).", "Testes de equilíbrio dinâmico (SEBT) antes de qualquer esforço cansativo.", "Descanso completo entre testes; testes diferentes por posição (ex.: goleiro × meio-campista).", "Metros ou jardas tanto faz — o que importa é repetir igual e comparar com normas da mesma unidade."] },
      { t: "4. Velocidade e agilidade", itens: ["Sprints de 5–40 m com fotocélulas (nunca cronômetro manual); 3 tentativas com recuperação completa, vale a melhor.", "Padronizar posição de saída e altura das fotocélulas (na altura do quadril as pernas cortam o feixe antes e o tempo cai um pouco).", "Fotocélula extra em 10–20 m mostra a aceleração inicial.", "Agilidade: teste T (frente, lateral e de costas; ótimo para esportes coletivos e de raquete) e Illinois. Teste de agilidade não deve passar de ~10 s, senão passa a medir resistência."] },
      { t: "5. Saltos, hop tests e equilíbrio", itens: ["Salto vertical (tapete de contato ou 'salta e alcança'): mede altura, não potência; potência pode ser estimada por altura + massa ou medida em plataforma de força.", "Versões unipodais revelam assimetria entre membros.", "Salto horizontal (distância parada, triplo): também avalia controle da aterrissagem e prediz melhor o sprint de 20 m que o vertical.", "Hop tests (simples, triplo, cruzado, 6 m cronometrado): referência no retorno após lesão de membro inferior — comparar com o lado sadio e observar a qualidade da aterrissagem.", "Star Excursion/Y-balance: alcance em várias direções; 4–6 tentativas de treino e 5 min de descanso antes de medir; diferença entre os lados sugere déficit e risco de lesão."] },
      { t: "6. Força e potência", itens: ["1RM (agachamento, terra, supino) com protocolo progressivo e familiarização; 3RM/5RM como alternativa mais segura.", "1RM de agachamento correlaciona com sprint de 10–30 m e salto vertical em jogadores de futebol.", "Isocinético: reprodutível e útil para comparar lados e relação isquiotibiais/quadríceps, mas mede uma articulação por vez e em velocidades bem abaixo das do esporte.", "Isométrico (dinamômetro de preensão, lombar): para esportes que pedem força estática (ex.: escalada).", "Wingate (30 s de bicicleta): bom para ciclistas; pouca relação com sprint e salto em outros esportes. Fazer uma sessão de familiarização dias antes — só o aprendizado já sobe a potência pico em ~14%."] },
      { t: "7. Capacidade aeróbia", itens: ["Campo: yo-yo (intermitente, parecido com esportes coletivos), teste de vai-e-vem de 20 m, corridas de 2,4 km/3 km/5 km/12 min; contrarrelógio em remo ou bicicleta.", "Laboratório (teste incremental com análise de gases): melhor opção para atleta de resistência (ex.: maratonista). Desenhar para durar 10–12 min até a exaustão; o tempo total no teste já é ótimo preditor.", "Critérios de VO₂máx: quociente respiratório > 1,15, FC final a ±10 bpm da máxima e/ou platô do VO₂ apesar de mais carga."] },
      { t: "Exemplos de demanda", itens: ["Futebol: ~10–13 km por jogo a > 70% do VO₂máx; sprints de 10–15 m (2–4 s) a cada ~90 s; VO₂máx típico > 60 mL/kg/min. Lesões mais frequentes: isquiotibiais (até ~21%) e LCA (~8%), em geral sem contato — logo, preveníveis com preparo. Mais lesões na pré-temporada.", "Rugby league: até ~10 km em 80 min, até ~40 tackles por jogo; lesões de membro inferior predominam, mas boa parte vem de colisão. Precisa também de força de membros superiores."] },
    ],
    ver: ["f-triagem", "f-triagem-msk", "n-metabolismo", "f-forca", "f-aerobio", "r-lca", "r-tornozelo", "r-isquios", "f-pliometria"],
    fontes: ["SRIP"],
  },
  {
    id: "l-lesao-muscular", titulo: "Lesão muscular: tipos, cicatrização e tratamento", area: "lesoes", grupo: "Geral",
    tags: ["lesão muscular", "estiramento", "distensão", "contusão", "laceração", "hematoma", "células satélites", "cicatriz", "regeneração", "junção miotendínea", "isométrico"],
    resumo: "Músculo regenera rápido (células satélites), mas cicatriz desorganizada atrapalha. Repouso curto, carga precoce abaixo da dor, alongamento só após ~7–10 dias e retorno por critérios.",
    secoes: [
      { t: "Tipos", itens: ["Laceração: corte por objeto externo (acidentes).", "Contusão: compressão direta (choque joelho–coxa nos esportes de contato).", "Estiramento (distensão): tração além da tolerância, quase sempre em ação excêntrica, em músculos que cruzam duas articulações (isquiotibiais, gastrocnêmio, reto femoral, adutores), em aceleração ou desaceleração rápida.", "O ponto mais frágil é a junção miotendínea; lesão no meio do ventre exige força bem maior. As fibras contráteis rompem antes do tecido conjuntivo ao redor."] },
      { t: "O que acontece no tecido", itens: ["Fase de lesão (minutos a dias): fibras rompem e necrosam; forma-se hematoma no espaço entre elas; inflamação (dor, calor, rubor, edema).", "Uma 'banda de contração' isola o trecho lesado e impede a necrose de se espalhar pela fibra inteira.", "Macrófagos limpam o tecido morto nos primeiros dias.", "Regeneração começa em 3–6 dias, com pico entre 7 e 14 dias: células satélites viram mioblastos, depois miotubos, que tentam atravessar a falha.", "Ao mesmo tempo, fibroblastos depositam uma rede de fibrina/colágeno (cicatriz). Se for grossa e desorganizada, bloqueia a passagem dos miotubos e a área fica mais vulnerável.", "Por volta do 10º dia a cicatriz começa a retrair (miofibroblastos)."] },
      { t: "Carga e repouso", itens: ["Imobilizar ou carregar mal (pouco ou demais) gera cicatriz retraída e maior risco de nova lesão.", "Mobilização e apoio precoces, com carga abaixo do limiar de dor, orientam fibras e colágeno e estimulam a regeneração.", "Com carga bem dosada, o músculo recupera boa parte da capacidade contrátil em ~10 dias nas lesões leves.", "Gelo nas primeiras 24–48 h reduz dor e hematoma (ver 'Manejo agudo' sobre o papel atual do gelo e dos anti-inflamatórios)."] },
      { t: "Progressão de exercícios", itens: ["Isométricos a partir do 2º–5º dia, dentro da dor: amplitude média → encurtada → alongada.", "Isotônicos quando os isométricos estiverem sem dor em toda a amplitude: começar em amplitude média (~90°) e terminar na amplitude funcional (alongada, concêntrico e excêntrico).", "Carga: resistência primeiro (~3 × 15 a 40–60% de 1RM) → força (cargas altas, poucas repetições) → potência/pliometria conforme o esporte.", "Músculos com papel estabilizador (glúteo médio, tibial posterior, manguito rotador) precisam também de progressão com desafio de equilíbrio/propriocepção.", "Manter o condicionamento geral sem estressar a lesão (bicicleta, natação, corrida na água, membros superiores)."] },
      { t: "Alongamento", itens: ["Evitar alongamento passivo forçado no fim da amplitude por pelo menos 72 h (idealmente 7–10 dias): o tecido novo é fraco e ainda não há retração a combater.", "Antes disso, só movimentar na amplitude livre de dor.", "Depois, alongamento estático no limite da dor; ~30 s por repetição bastam (mais tempo não traz ganho extra)."] },
      { t: "Retorno e prevenção", itens: ["Retorno com força completa, movimento sem dor, programa progressivo de corrida e testes funcionais concluídos.", "Reproduzir o gesto do esporte na fase final (ex.: sprints curtos com freada e troca de direção, primeiro mais lentos e depois em velocidade de jogo).", "Prevenção: aquecimento adequado, excêntrico (Nordic para isquiotibiais), pliometria, condicionamento e tratar bem a lesão anterior.", "Perguntar ao atleta como a lesão aconteceu (e pedir que mostre o gesto) ajuda a achar a causa a corrigir."] },
    ],
    notas: [
      { fonte: "SRIP", tipo: "diverge", texto: "O livro diz que o estiramento costuma romper a junção miotendínea distal — dado de modelos animais. Nos isquiotibiais humanos, o local mais comum é a junção miotendínea proximal da cabeça longa do bíceps femoral; o semimembranoso proximal é típico das lesões por alongamento (dança)." },
      { fonte: "SRIP", tipo: "diverge", texto: "O livro ainda usa RICE com gelo de 5–10 min a cada hora nas primeiras 24–48 h. O site segue o PEACE & LOVE (ver 'Manejo agudo'), em que o gelo é só para dor e o foco é a carga precoce." },
    ],
    ver: ["l-isquios", "r-isquios", "r-agudo", "r-cicatrizacao", "b-contracao", "f-flexibilidade", "f-forca"],
    fontes: ["SRIP"],
  },
];
