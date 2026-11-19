import type { Nota, Topico } from "./types";

// Revisão com as fontes adicionadas em nov/2026.
// NOTAS: comparação com o que já existia (concorda / diverge / acrescenta).
// NOVOS: temas que não existiam no site.
// Tudo resumido com palavras próprias — números e condutas citados como fatos, com a fonte.

export const NOTAS: Record<string, Nota[]> = {
  // ── Reabilitação / lesões ──
  "r-lca": [
    { fonte: "ACL5", tipo: "concorda", texto: "Também organiza a reabilitação em 5 estágios progredidos por critério (não por data), com extensão completa como 1ª prioridade e retorno ao esporte só com índice de simetria do membro > 90%." },
    { fonte: "ACL5", tipo: "diverge", texto: "Não fixa um prazo mínimo de 9 meses: o retorno é liberado pelos critérios, e recomenda simetria preferencialmente de 100% (não só ≥ 90%)." },
    { fonte: "ACL5", tipo: "acrescenta", texto: "Critérios práticos de passagem: estágio 2 → sem queda da perna estendida, extensão completa e 90° de flexão; estágio 3 → marcha sem claudicação, 120° de flexão e equilíbrio unipodal; estágio 4 → amplitude simétrica e agachamento unipodal até meia profundidade com bom alinhamento; estágio 5 → retorno gradual à corrida, retreino do esporte e simetria em força de quadríceps, isquiotibiais e nos testes de salto simples, triplo e cruzado." },
    { fonte: "SPINJ", tipo: "diverge", texto: "Os tempos de retorno descritos na literatura variam de 6 a 12 meses conforme a série e o esporte — reforça usar critérios objetivos além do tempo." },
  ],
  "l-lca": [
    { fonte: "SPINJ", tipo: "acrescenta", texto: "Programas de aquecimento neuromuscular (ex.: FIFA 11+) reduzem lesões de joelho em cerca de metade no futebol amador." },
    { fonte: "WOMEN", tipo: "concorda", texto: "Reforça o maior risco feminino e a importância de programas preventivos desde a adolescência." },
  ],
  "l-isquios": [
    { fonte: "SPINJ", tipo: "acrescenta", texto: "Com o FIFA 11+, a redução de lesões de isquiotibiais chega a cerca de 60% em atletas de futebol." },
  ],
  "f-proprio": [
    { fonte: "SPINJ", tipo: "acrescenta", texto: "Efeito do FIFA 11+ por região em metanálise: isquiotibiais ~60%, quadril/virilha ~41%, joelho ~48% e tornozelo ~32% menos lesões." },
  ],
  "l-concussao": [
    { fonte: "PSM", tipo: "acrescenta", texto: "Síndrome pós-concussional (sintomas que persistem por semanas a meses) e encefalopatia traumática crônica associada a impactos repetidos — razão para limitar a exposição ao contato." },
    { fonte: "WHITING", tipo: "acrescenta", texto: "Biomecanicamente, a aceleração rotacional da cabeça é determinante para a concussão, mais do que a aceleração linear isolada." },
    { fonte: "FANWANG", tipo: "concorda", texto: "Modelos computacionais de cabeça e pescoço reforçam o papel do pescoço e dos equipamentos de proteção na dissipação da energia do impacto." },
  ],
  "l-epicondilite": [
    { fonte: "PSM", tipo: "concorda", texto: "Mesma abordagem conservadora como 1ª linha; cirurgia reservada a casos refratários." },
  ],
  "l-manguito": [
    { fonte: "PSM", tipo: "concorda", texto: "Lesões do ombro no esporte tratadas inicialmente com reabilitação; reparo cirúrgico para rupturas sintomáticas no atleta ativo." },
  ],

  // ── Fisioterapia e treino ──
  "f-forca": [
    { fonte: "RUSIN", tipo: "acrescenta", texto: "Abordagem de 'hipertrofia funcional': priorizar exercícios sem dor, tempo de execução controlado e faixas moderadas (≈ 8–15 repetições) com estabilidade articular antes de cargas máximas." },
    { fonte: "RUSIN", tipo: "diverge", texto: "Dá menos ênfase a cargas ≥ 85% de 1RM do que a NSCA para quem treina por saúde/estética — a escolha depende do objetivo (força máxima vs hipertrofia com menor risco articular)." },
    { fonte: "PTRAIN", tipo: "concorda", texto: "Mesmas variáveis de prescrição (carga, repetições, séries, intervalo) e progressão gradual." },
  ],
  "f-periodizacao": [
    { fonte: "SWIM", tipo: "acrescenta", texto: "Polimento (taper) antes da competição-alvo: cerca de 2 semanas reduzindo o volume e a carga do treino de força (abaixo de ~60% 1RM no seco) e mantendo a qualidade/velocidade." },
  ],
  "f-aerobio": [
    { fonte: "EXSCI", tipo: "acrescenta", texto: "Para saúde geral: 150–300 min/semana de atividade moderada (ou 75–150 min vigorosa) + força 2x/semana — 'exercício é remédio'." },
    { fonte: "PSM", tipo: "concorda", texto: "HIIT e treino de resistência descritos com os mesmos princípios de intensidade e recuperação." },
  ],
  "f-flexibilidade": [
    { fonte: "PSM", tipo: "concorda", texto: "Alongamento estático com efeito sobre amplitude; cautela antes de esforços máximos." },
  ],
  "f-modalidades": [
    { fonte: "PSM", tipo: "acrescenta", texto: "Restrição de fluxo sanguíneo (BFR) tem respaldo crescente; ventosaterapia, magnetoterapia, cinesiologia aplicada e homeopatia têm evidência fraca ou ausente para lesões esportivas." },
    { fonte: "KAPOOR", tipo: "concorda", texto: "Recursos físicos como adjuntos ao exercício e à mobilização, não como tratamento isolado." },
  ],
  "f-peso-corporal": [
    { fonte: "CORE50", tipo: "acrescenta", texto: "Para quem tem 50+: começar por ativação do transverso do abdome e controle da pelve antes de pranchas e exercícios de alta alavanca." },
    { fonte: "BANDS", tipo: "acrescenta", texto: "Faixas elásticas são alternativa segura e barata para idosos, com progressão pela cor/tensão da faixa." },
  ],
  "f-principios": [
    { fonte: "PTRAIN", tipo: "acrescenta", texto: "Antes de prescrever, fazer triagem de saúde (PAR-Q+) e definir metas mensuráveis com o paciente/aluno." },
  ],

  // ── Biomecânica ──
  "b-fundamentos": [
    { fonte: "MCGINNIS", tipo: "concorda", texto: "Mesmos fundamentos: leis de Newton, torque, alavancas, impulso e quantidade de movimento aplicados ao esporte." },
    { fonte: "EXSCI", tipo: "concorda", texto: "Apresenta as mesmas bases de forma introdutória (alavancas, planos e eixos)." },
  ],
  "b-agachamento": [
    { fonte: "BIOBAS", tipo: "concorda", texto: "O momento articular depende da distância horizontal entre a carga e a articulação — inclinação do tronco e posição do joelho redistribuem a demanda entre quadril e joelho." },
  ],
  "b-tecidos": [
    { fonte: "WHITING", tipo: "acrescenta", texto: "Lei de Wolff: o osso remodela conforme a carga que recebe — alinha trabéculas às linhas de tensão e otimiza resistência em relação ao peso." },
    { fonte: "WHITING", tipo: "concorda", texto: "Lesão ocorre quando a carga (magnitude × repetição) supera a tolerância do tecido; cargas repetidas abaixo do limite podem lesar por fadiga." },
  ],
  "b-coluna": [
    { fonte: "SPINESTAB", tipo: "acrescenta", texto: "Estabilidade da coluna = capacidade de manter alinhamento sob carga sem dano neurológico, dor incapacitante ou deformidade — base para indicar estabilização cirúrgica (ver tema novo)." },
  ],

  // ── Anatomia ──
  "a-ombro": [{ fonte: "MOVBODY", tipo: "concorda", texto: "Mesma descrição funcional da cintura escapular e do manguito." }],
  "a-quadril": [{ fonte: "MOVBODY", tipo: "concorda", texto: "Mesma organização dos músculos do quadril e da pelve por função." }],
  "a-lombar": [{ fonte: "MOVBODY", tipo: "acrescenta", texto: "Descreve a musculatura 'espiral' do tronco (oblíquos e serrátil em cadeia) que transmite rotação entre pelve e ombros." }],

  // ── Nutrição ──
  "n-suplementos": [
    { fonte: "SUPPAZ", tipo: "concorda", texto: "Creatina: saturação com ~20 g/dia por ~5 dias (ou dose menor diária por mais tempo). Nitrato: ~6 mmol/dia é eficaz e doses bem maiores não trazem ganho adicional." },
    { fonte: "SUPPAZ", tipo: "diverge", texto: "Cafeína: efeito ergogênico já com doses baixas (1–3 mg/kg); a faixa clássica de ~6 mg/kg não é necessária para a maioria. Beta-alanina: cita 4–6 g/dia por 4–10 semanas." },
  ],
  "n-proteina": [
    { fonte: "NUTSCI", tipo: "diverge", texto: "A recomendação para a população geral (RDA) é 0,8 g/kg/dia; os valores maiores desta página são específicos para atletas e treino de força." },
  ],
  "n-lesao": [
    { fonte: "SPINJ", tipo: "concorda", texto: "Na imobilização por lesão ou cirurgia, ingestão de ~2,0 g/kg/dia de proteína para limitar a perda muscular." },
  ],
  "n-gordura": [
    { fonte: "SUPPAZ", tipo: "acrescenta", texto: "Vitamina D: regra prática — cada 1.000 UI/dia a mais de suplemento eleva a 25(OH)D de forma previsível; níveis muito baixos devem ser corrigidos." },
    { fonte: "NUTSCI", tipo: "concorda", texto: "Faixas de macronutrientes e importância de ferro, cálcio e vitamina D coerentes com as recomendações gerais." },
  ],
  "n-reds": [
    { fonte: "WOMEN", tipo: "acrescenta", texto: "Ausência de menstruação por mais de 3 ciclos seguidos é sinal de alerta que exige avaliação na atleta." },
  ],
  "n-composicao": [
    { fonte: "RUSIN", tipo: "acrescenta", texto: "Registrar a ingestão por algumas semanas (contar calorias/porções) costuma revelar diferenças grandes entre o que se acha que come e o real." },
  ],
};

export const NOVOS: Topico[] = [
  {
    id: "r-fratura", titulo: "Reabilitação após fraturas e imobilização", area: "reabilitacao", grupo: "Geral",
    tags: ["fratura", "gesso", "imobilização", "rigidez", "isométrico", "ortopedia"],
    resumo: "Mover tudo o que não está imobilizado, isométricos dentro do gesso e progressão de carga conforme a consolidação.",
    secoes: [
      { t: "Durante a imobilização", itens: ["Elevação e exercícios ativos dos dedos/articulações livres para reduzir edema e rigidez.", "Contrações isométricas dos músculos dentro do gesso/tala para limitar atrofia.", "Manter condicionamento geral e do membro contralateral (efeito de educação cruzada)."] },
      { t: "Após retirar a imobilização", itens: ["Amplitude ativa → ativa-assistida → passiva; mobilização articular se rigidez.", "Carga progressiva conforme orientação ortopédica e sinais radiográficos de consolidação.", "Fortalecimento, propriocepção e treino de marcha/função.", "Vigiar sinais de síndrome dolorosa regional complexa (dor desproporcional, edema, alteração de cor/temperatura)."] },
    ],
    notas: [{ fonte: "KAPOOR", tipo: "acrescenta", texto: "Pacientes em gesso pelvipodálico ou imobilizações extensas precisam de contrações estáticas obrigatórias de membros inferiores e tronco." }],
    fontes: ["KAPOOR", "GARD"],
  },
  {
    id: "r-nervo", titulo: "Lesão de nervo periférico", area: "reabilitacao", grupo: "Geral",
    tags: ["neuropraxia", "axonotmese", "neurotmese", "seddon", "nervo"],
    resumo: "Classificação de Seddon orienta prognóstico; proteger a articulação, manter amplitude e reeducar a função durante a regeneração.",
    secoes: [
      { t: "Classificação (Seddon)", itens: ["Neuropraxia: bloqueio de condução sem lesão axonal — é a mais comum e recupera em semanas (~1 mês).", "Axonotmese: ruptura de axônios com bainha preservada — recuperação em meses (regeneração ~1 mm/dia).", "Neurotmese: secção completa do nervo — sem recuperação espontânea; precisa de reparo cirúrgico."] },
      { t: "Reabilitação", itens: ["Órteses para evitar deformidade (ex.: punho caído na lesão do radial; pé caído no fibular).", "Amplitude passiva diária para prevenir contraturas; proteção da pele insensível.", "Estimulação elétrica e exercícios ativos assim que houver reinervação.", "Reeducação sensorial e motora; ENMG para acompanhar quando não houver sinais de recuperação no tempo esperado."] },
    ],
    fontes: ["KAPOOR"],
  },
  {
    id: "r-amputacao", titulo: "Reabilitação do amputado", area: "reabilitacao", grupo: "Geral",
    tags: ["amputação", "prótese", "coto", "membro fantasma"],
    resumo: "Preparar o coto, evitar contraturas, fortalecer e treinar marcha com prótese; esporte adaptado como meta.",
    secoes: [
      { t: "Pré-protetização", itens: ["Enfaixamento do coto em 8 para modelar e reduzir edema.", "Evitar contraturas: transfemoral → flexão/abdução de quadril; transtibial → flexão de joelho (não deixar travesseiro sob o coto).", "Fortalecer extensores e abdutores do quadril, membros superiores e tronco.", "Dessensibilização do coto e manejo da dor fantasma."] },
      { t: "Com prótese", itens: ["Treino progressivo de transferência de peso, equilíbrio e marcha; inspeção diária da pele.", "Atividade física e esporte adaptado melhoram condicionamento e qualidade de vida."] },
    ],
    ver: ["f-adaptada"],
    fontes: ["KAPOOR", "WINNICK"],
  },
  {
    id: "l-punho-mao", titulo: "Lesões de punho e mão no esporte", area: "lesoes", grupo: "Cotovelo e punho",
    tags: ["escafoide", "polegar do esquiador", "dedo em martelo", "jersey finger", "mão"],
    resumo: "Lesões frequentemente subestimadas — escafoide, ligamento colateral ulnar do polegar e tendões dos dedos exigem conduta precoce.",
    secoes: [
      { t: "Principais", itens: ["Fratura do escafoide: dor na tabaqueira após queda com a mão estendida; imobilizar mesmo com RX normal e repetir imagem/RM.", "Polegar do esquiador/goleiro (ligamento colateral ulnar da MCF): instabilidade ao estresse em valgo — lesão completa pode precisar de cirurgia (lesão de Stener).", "Dedo em martelo: perda da extensão da falange distal — tala em extensão contínua por 6–8 semanas.", "Jersey finger (avulsão do flexor profundo, geralmente 4º dedo): incapaz de fletir a falange distal — reparo cirúrgico precoce."] },
    ],
    fontes: ["PSM", "HODLER"],
  },
  {
    id: "l-overtraining", titulo: "Síndrome do excesso de treinamento (overtraining)", area: "lesoes", grupo: "Geral",
    tags: ["overtraining", "sobretreinamento", "fadiga", "desempenho", "overreaching"],
    resumo: "Queda de desempenho que não melhora com dias de descanso, associada a fadiga, distúrbio do sono e humor.",
    secoes: [
      { t: "Reconhecer", itens: ["Contínuo: overreaching funcional (normal, recupera em dias) → não funcional (semanas) → síndrome de overtraining (meses).", "Sinais: queda de desempenho, fadiga persistente, alterações de sono e humor, infecções frequentes, FC de repouso alterada.", "Excluir causas médicas: anemia/ferropenia, tireoide, RED-S, infecção, depressão."] },
      { t: "Conduta", itens: ["Redução importante de carga e retorno gradual; monitorar carga e bem-estar.", "Revisar ingestão energética, sono e estresse fora do esporte."] },
    ],
    ver: ["f-rpe", "n-reds"],
    fontes: ["PSM", "SPINJ"],
  },
  {
    id: "f-idosos", titulo: "Exercício para 50+ e idosos", area: "fisioterapia", grupo: "Populações especiais",
    tags: ["idoso", "sarcopenia", "quedas", "core", "faixa elástica", "50+"],
    resumo: "Força 2–3x/semana, equilíbrio e potência reduzem sarcopenia e quedas; começar leve e progredir.",
    secoes: [
      { t: "Prescrição", itens: ["Força 2–3x/semana em dias não consecutivos, grandes grupos musculares, 1–3 séries de 8–15 repetições.", "Equilíbrio e marcha (prevenção de quedas) e componentes de potência (subir rápido, descer devagar).", "Core: começar pela ativação do transverso e controle pélvico; evitar flexões repetidas de tronco em quem tem osteoporose.", "Faixas elásticas e peso corporal permitem treinar em casa com segurança."] },
      { t: "Cuidados", itens: ["Triagem de saúde antes de iniciar (PAR-Q+).", "Ajustar em artrose, osteoporose, hipertensão e uso de betabloqueador (usar escala de esforço em vez de FC)."] },
    ],
    fontes: ["CORE50", "BANDS", "EXSCI"],
  },
  {
    id: "f-mulher", titulo: "A mulher e a menina no esporte", area: "fisioterapia", grupo: "Populações especiais",
    tags: ["mulher", "atleta feminina", "gestação", "ciclo menstrual", "assoalho pélvico", "lca"],
    resumo: "Pontos específicos: risco de LCA, RED-S e saúde menstrual, gestação, assoalho pélvico e proteção da atleta.",
    secoes: [
      { t: "Saúde e desempenho", itens: ["Amenorreia (> 3 ciclos seguidos sem menstruar) não é 'normal do treino': investigar RED-S.", "Risco de lesão do LCA 2–8x maior: programas neuromusculares desde a adolescência.", "Gestação sem complicações: manter atividade moderada regular (cerca de 150 min/semana), evitando contato/queda e decúbito dorsal prolongado após o 1º trimestre.", "Assoalho pélvico: incontinência ao saltar é comum em atletas de impacto — fisioterapia pélvica."] },
      { t: "Participação", itens: ["Barreiras específicas (maternidade, envelhecimento, deficiência) reduzem a participação — adaptar horários e programas.", "Proteção da atleta (safeguarding): ambiente seguro, prevenção de assédio e abuso, dever de cuidado das equipes."] },
    ],
    ver: ["n-reds", "l-lca"],
    fontes: ["WOMEN", "SPINJ"],
  },
  {
    id: "f-triagem", titulo: "Triagem pré-participação e avaliação inicial", area: "fisioterapia", grupo: "Fundamentos",
    tags: ["par-q", "triagem", "avaliação pré-participação", "anamnese esportiva"],
    resumo: "PAR-Q+ para quem vai começar a se exercitar; avaliação médica para quem tem sintomas ou doença.",
    secoes: [
      { t: "Como fazer", itens: ["PAR-Q+: questionário gratuito de prontidão para atividade física — respostas positivas levam a avaliação médica.", "Sinais de alerta para avaliação cardiológica: dor torácica ou síncope ao esforço, palpitações, história familiar de morte súbita < 50 anos.", "Avaliação inicial do aluno/atleta: objetivos, histórico de lesões, medicações, testes de força, mobilidade e condicionamento.", "Reavaliar periodicamente para ajustar a prescrição.", "Registrar dados de base do atleta sem lesão (amplitude, força, testes funcionais e, nos esportes de contato, teste cognitivo/concussão): servem de comparação para decidir o retorno após uma lesão."] },
    ],
    ver: ["f-triagem-msk", "f-testes-fisicos"],
    fontes: ["PTRAIN", "EXSCI"],
  },
  {
    id: "f-natacao", titulo: "Força e prevenção na natação", area: "fisioterapia", grupo: "Força e potência",
    tags: ["natação", "nadador", "ombro do nadador", "polimento", "hipermobilidade"],
    resumo: "Core e posição hidrodinâmica, força de ombro/escápula, pliometria para saídas e viradas, polimento antes da competição.",
    secoes: [
      { t: "Pontos práticos", itens: ["Core forte sustenta a posição hidrodinâmica (streamline) e as ondulações submersas.", "Pliometria e potência de membros inferiores melhoram saídas e viradas.", "Nadadores hipermóveis precisam de mais estabilidade/controle; nadadores rígidos, de mais mobilidade.", "Ombro do nadador: equilibrar rotadores externos e estabilizadores escapulares; controlar volume.", "Polimento de ~2 semanas antes da competição principal."] },
    ],
    ver: ["f-periodizacao"],
    fontes: ["SWIM"],
  },
  {
    id: "b-estabilidade-coluna", titulo: "Estabilidade e instabilidade da coluna", area: "biomecanica", grupo: "Coluna",
    tags: ["instabilidade", "três colunas", "denis", "white e panjabi", "fixação"],
    resumo: "Conceitos que orientam se uma lesão ou doença da coluna precisa de estabilização cirúrgica.",
    secoes: [
      { t: "Conceitos", itens: ["Instabilidade clínica: perda da capacidade da coluna de manter, sob cargas fisiológicas, a relação entre vértebras sem lesar a medula/raízes, sem deformidade ou dor incapacitante.", "Modelo das três colunas (Denis) no trauma toracolombar: lesão de duas ou mais colunas tende a ser instável.", "Classificações atuais (ex.: AO Spine, TLICS) combinam morfologia, estado neurológico e complexo ligamentar posterior.", "Implantes (parafusos pediculares, cages) devolvem estabilidade imediata; a fusão óssea dá a estabilidade definitiva.", "Fusão aumenta a carga nos segmentos vizinhos (doença do segmento adjacente)."] },
    ],
    ver: ["b-coluna"],
    fontes: ["SPINESTAB", "SPINE"],
  },
  {
    id: "b-trauma-cabeca", titulo: "Biomecânica do trauma de cabeça e pescoço", area: "biomecanica", grupo: "Coluna",
    tags: ["concussão", "capacete", "aceleração rotacional", "chicote", "whiplash"],
    resumo: "Aceleração rotacional e duração do impulso determinam a lesão cerebral; o pescoço e o capacete modulam a energia.",
    secoes: [
      { t: "Conceitos", itens: ["Concussão relaciona-se mais à aceleração rotacional do que à linear.", "Capacetes reduzem fraturas e lesões focais; reduzem menos a concussão (rotação).", "Força/rigidez cervical ajuda a limitar o movimento da cabeça no impacto antecipado.", "Mecanismo em chicote (whiplash): hiperextensão-flexão rápida lesando tecidos moles cervicais."] },
    ],
    ver: ["l-concussao"],
    fontes: ["WHITING", "FANWANG"],
  },
];
