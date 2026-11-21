import type { Topico } from "./types";

export const LESOES: Topico[] = [
  {
    id: "l-entorse-tornozelo", titulo: "Entorse lateral do tornozelo", area: "lesoes", grupo: "Tornozelo e pé",
    tags: ["entorse", "ligamento talofibular anterior", "ottawa", "instabilidade crônica"],
    resumo: "Lesão mais comum do esporte; inversão com flexão plantar lesa o LTFA, depois o calcaneofibular.",
    secoes: [
      { t: "Mecanismo e quadro", itens: ["Inversão + flexão plantar (aterrissagem, mudança de direção).", "Dor e edema anterolateral, equimose, dificuldade de carga.", "Graus: I estiramento; II ruptura parcial com frouxidão leve; III ruptura completa com instabilidade."] },
      { t: "Exame", itens: ["Regras de Ottawa (RX do tornozelo): dor na região maleolar + (dor à palpação na borda posterior ou ponta dos 6 cm distais da fíbula ou da tíbia OU incapacidade de dar 4 passos logo após o trauma e na avaliação). RX do pé: dor no mediopé + (dor na base do 5º metatarso ou no navicular OU incapacidade de dar 4 passos). Mancar conta como passo.", "Gaveta anterior (LTFA) e inclinação talar (calcaneofibular) — mais confiáveis após 4–5 dias.", "Squeeze test e rotação externa: lesão da sindesmose (entorse 'alta', retorno mais lento).", "Palpar base do 5º metatarso e navicular (fraturas associadas) e a fíbula inteira até o colo (fratura de Maisonneuve, que acompanha lesão da sindesmose)."] },
      { t: "Conduta", itens: ["Proteção curta e carga precoce conforme dor; órtese semirrígida é superior ao gesso nos graus I–II.", "Gelo, elevação e analgesia nos primeiros dias.", "Exercício de amplitude, fortalecimento de fibulares e propriocepção desde a 1ª semana.", "Cirurgia: falha do tratamento com instabilidade crônica, lesões osteocondrais ou sindesmose instável."] },
      { t: "Retorno ao esporte", itens: ["Sem dor ao saltitar unipodal, equilíbrio unipodal simétrico, testes de salto e agilidade ≥ 90% do lado sadio.", "Órtese/bandagem por 6–12 meses reduz recidiva."] },
    ],
    ver: ["r-tornozelo"],
    fontes: ["REHAB", "HODLER", "SPBIO"],
  },
  {
    id: "l-lca", titulo: "Lesão do ligamento cruzado anterior (LCA)", area: "lesoes", grupo: "Joelho",
    tags: ["lca", "lachman", "pivot shift", "valgo dinâmico", "reconstrução"],
    resumo: "Mecanismo sem contato (desaceleração, pivô, aterrissagem em valgo); estalo, derrame rápido e falseio.",
    secoes: [
      { t: "Mecanismo e quadro", itens: ["70% sem contato: valgo dinâmico + rotação com joelho próximo da extensão.", "Estalo audível, hemartrose em horas, incapacidade de continuar.", "Mulheres têm 2–8x mais risco (fatores neuromusculares e anatômicos)."] },
      { t: "Exame", itens: ["Lachman (mais sensível), gaveta anterior, pivot shift (mais específico, difícil no agudo).", "Avaliar lesões associadas: menisco, LCM, canto posterolateral, contusão óssea."] },
      { t: "Imagem", itens: ["RX para excluir fratura de Segond (avulsão lateral da tíbia, patognomônica).", "RM confirma e mostra edema ósseo em côndilo femoral lateral e platô tibial posterolateral."] },
      { t: "Conduta", itens: ["Pré-habilitação: tirar derrame, recuperar extensão completa e ativação do quadríceps antes da cirurgia.", "Reconstrução indicada em atletas de pivô, instabilidade recorrente ou lesões associadas reparáveis.", "Tratamento conservador possível em pouco ativos sem falseio."] },
      { t: "Retorno ao esporte", itens: ["Não antes de 9 meses após reconstrução (cada mês antes disso aumenta o risco de nova lesão).", "Bateria: força de quadríceps ≥ 90% (LSI), testes de salto ≥ 90%, prontidão psicológica (ACL-RSI)."] },
    ],
    ver: ["r-lca"],
    fontes: ["REHAB", "SPBIO", "HODLER"],
  },
  {
    id: "l-menisco", titulo: "Lesão meniscal", area: "lesoes", grupo: "Joelho",
    tags: ["menisco", "mcmurray", "bloqueio", "dor interlinha"],
    resumo: "Traumática no jovem (torção com carga) ou degenerativa no adulto; dor em interlinha e sintomas mecânicos.",
    secoes: [
      { t: "Quadro e exame", itens: ["Dor em interlinha, derrame tardio (24 h), estalidos, bloqueio verdadeiro (alça de balde).", "Testes: dor à palpação da interlinha, McMurray, Thessaly, Apley."] },
      { t: "Imagem", itens: ["RM é o exame de escolha; RX com carga no adulto para avaliar artrose."] },
      { t: "Conduta", itens: ["Bloqueio verdadeiro/alça de balde: artroscopia precoce (reparo sempre que possível).", "Lesão degenerativa: fisioterapia primeiro (resultados semelhantes à cirurgia).", "Reparo meniscal tem reabilitação mais lenta (carga e flexão protegidas por 4–6 semanas)."] },
    ],
    fontes: ["HODLER", "REHAB"],
  },
  {
    id: "l-lcm", titulo: "Lesão do ligamento colateral medial", area: "lesoes", grupo: "Joelho",
    tags: ["lcm", "valgo", "estresse em valgo"],
    resumo: "Trauma em valgo; quase sempre tratamento conservador com órtese articulada.",
    secoes: [
      { t: "Exame", itens: ["Dor medial; estresse em valgo a 30° (isolado) e a 0° (se frouxo em extensão, pensar em LCA/canto posteromedial associado).", "Graus I–III pela abertura medial."] },
      { t: "Conduta e retorno", itens: ["Órtese articulada, carga conforme tolerância, fortalecimento precoce.", "Retorno: grau I 1–2 semanas; II 3–4 semanas; III 6–8 semanas."] },
    ],
    fontes: ["REHAB", "HODLER"],
  },
  {
    id: "l-tend-patelar", titulo: "Tendinopatia patelar (joelho do saltador)", area: "lesoes", grupo: "Joelho",
    tags: ["tendinopatia", "jumper's knee", "isométrico", "hsr"],
    resumo: "Dor no polo inferior da patela relacionada à carga em saltos; tratar com carga progressiva, não com repouso.",
    secoes: [
      { t: "Quadro", itens: ["Dor localizada que piora com saltos e agachamento profundo; melhora com aquecimento no início.", "Teste do agachamento declinado unipodal reproduz a dor.", "Escala VISA-P para acompanhar."] },
      { t: "Imagem", itens: ["USG/RM: espessamento e hipoecogenicidade proximal; não guia o tratamento isoladamente."] },
      { t: "Conduta", itens: ["Gerenciar carga (reduzir saltos, não parar tudo).", "Isométricos para analgesia → resistência lenta e pesada (HSR) → pliometria → retorno ao esporte.", "Evitar infiltração com corticoide (risco de ruptura)."] },
    ],
    ver: ["r-tend-patelar"],
    fontes: ["REHAB", "PTR"],
  },
  {
    id: "l-pfp", titulo: "Dor patelofemoral", area: "lesoes", grupo: "Joelho",
    tags: ["condromalácia", "dor anterior do joelho", "valgo dinâmico", "glúteo médio"],
    resumo: "Dor difusa anterior ao subir/descer escadas, agachar ou ficar sentado; fortalecer quadril e joelho.",
    secoes: [
      { t: "Quadro", itens: ["Sinal do cinema (dor ao ficar sentado longo tempo), dor em escadas e agachamento.", "Fatores: aumento brusco de carga, fraqueza de abdutores/rotadores externos do quadril, valgo dinâmico."] },
      { t: "Conduta", itens: ["Educação e ajuste de carga.", "Fortalecimento combinado de quadril (abdutores/extensores) e quadríceps — melhor evidência.", "Bandagem patelar e órteses de pé como adjuntos de curto prazo."] },
    ],
    ver: ["r-pfp"],
    fontes: ["REHAB", "SPBIO"],
  },
  {
    id: "l-iliotibial", titulo: "Síndrome do trato iliotibial", area: "lesoes", grupo: "Joelho",
    tags: ["banda iliotibial", "corredor", "dor lateral do joelho"],
    resumo: "Dor lateral do joelho em corredores/ciclistas, em torno de 30° de flexão (Noble).",
    secoes: [
      { t: "Conduta", itens: ["Reduzir volume e descidas; aumentar cadência em 5–10%.", "Fortalecer abdutores do quadril; alongamento tem papel secundário.", "Infiltração em casos refratários; cirurgia rara."] },
    ],
    fontes: ["SPBIO", "REHAB"],
  },
  {
    id: "l-isquios", titulo: "Lesão muscular de isquiotibiais", area: "lesoes", grupo: "Quadril e coxa",
    tags: ["estiramento", "posterior de coxa", "nordic", "sprint"],
    resumo: "Lesão típica do sprint (fase final de balanço); a recidiva é o grande problema — reabilitação com excêntricos.",
    secoes: [
      { t: "Mecanismo e quadro", itens: ["Sprint (bíceps femoral cabeça longa) ou alongamento extremo (semimembranoso — recuperação mais longa).", "Dor súbita posterior de coxa, equimose em dias.", "Avulsão proximal (equimose extensa, gap palpável, fraqueza importante) → RM e avaliação cirúrgica precoce."] },
      { t: "Classificação", itens: ["Britânica (BAMIC): grau 0–4 e localização (a miofascial, b musculotendínea, c intratendínea — pior prognóstico)."] },
      { t: "Retorno ao esporte", itens: ["Sem dor em sprint máximo, força excêntrica e flexibilidade simétricas, confiança do atleta.", "Programa Nordic Hamstring reduz novas lesões em cerca de 50%."] },
    ],
    ver: ["r-isquios", "l-lesao-muscular"],
    fontes: ["REHAB", "SPBIO", "HODLER"],
  },
  {
    id: "l-pubalgia", titulo: "Dor na virilha / pubalgia do atleta", area: "lesoes", grupo: "Quadril e coxa",
    tags: ["adutor", "groin", "pubalgia", "copenhagen"],
    resumo: "Classificação de Doha: adutor, iliopsoas, inguinal e púbica; adutor é a mais comum.",
    secoes: [
      { t: "Avaliação", itens: ["Dor à palpação do adutor longo e à adução resistida (squeeze test).", "Excluir causas de quadril (impacto femoroacetabular — FADIR), hérnia e causas viscerais."] },
      { t: "Conduta", itens: ["Fortalecimento progressivo de adutores (exercício de Copenhagen tem bom efeito preventivo).", "Controle de carga, core e quadril; retorno gradual a chutes e mudanças de direção."] },
    ],
    ver: ["r-virilha"],
    fontes: ["REHAB"],
  },
  {
    id: "l-aquiles", titulo: "Tendinopatia e ruptura do Aquiles", area: "lesoes", grupo: "Tornozelo e pé",
    tags: ["aquiles", "thompson", "tendinopatia insercional", "ruptura"],
    resumo: "Tendinopatia: carga progressiva. Ruptura: teste de Thompson; tratamento funcional ou cirúrgico com resultados semelhantes.",
    secoes: [
      { t: "Tendinopatia", itens: ["Porção média (2–6 cm da inserção) ou insercional (evitar dorsiflexão máxima no início).", "Programa de carga: isométricos → elevação de calcanhar pesada/lenta → pliometria. Escala VISA-A."] },
      { t: "Ruptura aguda", itens: ["Sensação de 'pedrada' na panturrilha; gap palpável; Thompson positivo (sem flexão plantar ao comprimir a panturrilha).", "Tratamento funcional (bota com saltos em equino, carga precoce) ≈ cirurgia em re-ruptura quando bem conduzido; cirurgia em atletas de alto rendimento é frequente."] },
    ],
    ver: ["r-aquiles"],
    fontes: ["REHAB", "HODLER"],
  },
  {
    id: "l-fascite", titulo: "Fasciopatia plantar", area: "lesoes", grupo: "Tornozelo e pé",
    tags: ["fascite plantar", "dor no calcanhar", "primeiro passo"],
    resumo: "Dor no calcanhar ao primeiro passo da manhã; alongamento específico, fortalecimento e ajuste de carga.",
    secoes: [
      { t: "Conduta", itens: ["Alongamento da fáscia e do tríceps sural; fortalecimento de intrínsecos e elevação de calcanhar com hálux em extensão.", "Palmilha/calcanheira e calçado com amortecimento; perda de peso quando indicado.", "Ondas de choque nos casos crônicos (> 3–6 meses). Corticoide: alívio curto e risco de ruptura da fáscia."] },
    ],
    ver: ["r-fascia"],
    fontes: ["REHAB"],
  },
  {
    id: "l-canelite", titulo: "Canelite (MTSS) e fratura por estresse", area: "lesoes", grupo: "Tornozelo e pé",
    tags: ["canelite", "periostite", "fratura de estresse", "corredor", "red-s"],
    resumo: "Dor difusa na borda medial da tíbia (MTSS) vs dor focal com hiperestesia óssea (fratura por estresse).",
    secoes: [
      { t: "Diferenciar", itens: ["MTSS: dor difusa > 5 cm na borda posteromedial, melhora com aquecimento.", "Fratura por estresse: dor focal, piora progressiva, dor noturna/em repouso; RM é o exame de escolha (RX normal no início).", "Alto risco (colo femoral lado tensão, cortical anterior da tíbia, navicular, 5º metatarso proximal): sem carga e avaliação ortopédica."] },
      { t: "Conduta", itens: ["Reduzir volume/impacto; retorno gradual à corrida (programa de caminhada-corrida).", "Investigar RED-S (disponibilidade energética, menstruação, vitamina D, cálcio)."] },
    ],
    ver: ["n-reds"],
    fontes: ["REHAB", "HODLER", "NUTRI"],
  },
  {
    id: "l-ombro-instab", titulo: "Luxação / instabilidade do ombro", area: "lesoes", grupo: "Ombro",
    tags: ["luxação", "bankart", "hill-sachs", "apreensão"],
    resumo: "Luxação anterior em abdução e rotação externa; jovens atletas têm alto risco de recidiva.",
    secoes: [
      { t: "Avaliação", itens: ["Testar nervo axilar (sensibilidade da face lateral do ombro) antes e depois da redução.", "RX em 2 incidências antes e após redução; RM/artro-RM para Bankart e Hill-Sachs.", "Testes de apreensão e recolocação."] },
      { t: "Conduta", itens: ["Redução (ex.: Cunningham, Milch, tração-contratração) e tipoia por curto período.", "< 25 anos em esporte de contato/arremesso: discutir estabilização cirúrgica após 1º episódio (recidiva > 50%).", "Reabilitação: estabilizadores escapulares e manguito, propriocepção, progressão para posições de risco."] },
    ],
    ver: ["r-ombro-instab"],
    fontes: ["REHAB", "HODLER"],
  },
  {
    id: "l-manguito", titulo: "Dor no ombro relacionada ao manguito rotador", area: "lesoes", grupo: "Ombro",
    tags: ["impacto", "tendinopatia do manguito", "supraespinal", "bursite subacromial"],
    resumo: "Dor lateral do ombro com elevação; tratar com exercício progressivo; rupturas traumáticas no jovem → cirurgia.",
    secoes: [
      { t: "Exame", itens: ["Arco doloroso 60–120°, Jobe (supraespinal), rotação externa resistida (infraespinal), lift-off/belly press (subescapular).", "Fraqueza importante após trauma = ruptura até prova em contrário (USG/RM)."] },
      { t: "Conduta", itens: ["Exercício: rotadores externos, estabilizadores escapulares, carga progressiva acima da cabeça.", "Infiltração subacromial pode aliviar a curto prazo para permitir o exercício.", "Cirurgia: ruptura aguda traumática no ativo, falha de 3–6 meses de reabilitação."] },
    ],
    ver: ["r-ombro-dor"],
    fontes: ["REHAB", "HODLER", "LIPPERT"],
  },
  {
    id: "l-epicondilite", titulo: "Epicondilalgia lateral (cotovelo de tenista)", area: "lesoes", grupo: "Cotovelo e punho",
    tags: ["epicondilite", "tennis elbow", "extensor radial curto do carpo"],
    resumo: "Dor no epicôndilo lateral à preensão e extensão do punho; autolimitada em 1–2 anos, exercício acelera.",
    secoes: [
      { t: "Exame", itens: ["Dor à extensão resistida do punho e do 3º dedo (Maudsley), Cozen e Mill.", "Diferenciar de compressão do nervo interósseo posterior (dor mais distal)."] },
      { t: "Conduta", itens: ["Educação, modificação de atividades e órtese de contraforça.", "Exercício isométrico → excêntrico/concêntrico de extensores (ex.: Tyler twist).", "Corticoide: alívio rápido, mas mais recidiva em 1 ano — evitar."] },
    ],
    ver: ["r-epicondilo"],
    fontes: ["REHAB"],
  },
  {
    id: "l-concussao", titulo: "Concussão no esporte", area: "lesoes", grupo: "Cabeça e pescoço",
    tags: ["concussão", "tce leve", "scat6", "retorno gradual"],
    resumo: "Na dúvida, fora do jogo. Repouso relativo 24–48 h, depois retorno gradual em etapas sem sintomas.",
    secoes: [
      { t: "Reconhecer", itens: ["Sintomas: cefaleia, tontura, confusão, amnésia, náusea, sensação de 'nevoeiro', alteração de humor.", "Avaliação estruturada (SCAT6 / Child SCAT6).", "Sinais de alerta (TC/emergência): piora da cefaleia, vômitos repetidos, convulsão, déficit focal, rebaixamento, dor cervical intensa."] },
      { t: "Conduta", itens: ["Afastar do jogo no mesmo dia, sempre.", "Repouso relativo por 24–48 h; atividade leve que não piore os sintomas é benéfica.", "Retorno escolar/trabalho antes do retorno ao esporte."] },
    ],
    ver: ["r-concussao"],
    fontes: ["REHAB"],
  },
  {
    id: "l-lombar-atleta", titulo: "Lombalgia no atleta e espondilólise", area: "lesoes", grupo: "Coluna",
    tags: ["espondilólise", "lombalgia", "extensão", "ginástica"],
    resumo: "Adolescente com dor lombar à extensão (ginástica, saltos, arremesso): pensar em espondilólise.",
    secoes: [
      { t: "Avaliação", itens: ["Dor à extensão unipodal (teste da cegonha).", "RM (sem radiação) é a escolha inicial no jovem; TC se dúvida sobre consolidação."] },
      { t: "Conduta", itens: ["Afastamento das atividades em extensão por 6–12 semanas, estabilização do core e retorno progressivo.", "Lombalgia inespecífica: manter atividade, exercício e educação em dor."] },
    ],
    ver: ["r-lombar"],
    fontes: ["SPINE", "REHAB", "HODLER"],
  },
];
