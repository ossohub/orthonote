import type { Infiltracao } from "./types";

// Quadril e pelve. Doses em triamcinolona acetonida (40 mg/mL).

export const QUADRIL: Infiltracao[] = [
  {
    id: "quadril-articular", titulo: "Quadril intra-articular", secao: "quadril", guia: "palpacao",
    guiaNota: "Muitos serviços fazem sob fluoroscopia ou US (via anterior); a via lateral por palpação acerta ~80%.",
    resumo: "Artrose/artrite do quadril com dor noturna, sobretudo em fila de artroplastia. Via lateral: um polegar acima do ápice do trocânter maior, agulha espinhal perpendicular até tocar o colo femoral (a cápsula se insere na base do colo); 40 mg em 5 mL.",
    indicacoes: [
      "Artrose, AR ou capsulite traumática com dor noturna e irradiada, sem resposta à fisioterapia.",
      "Diagnóstica: distinguir dor do quadril de dor lombar, sacroilíaca ou extra-articular.",
      "Padrão capsular: perde mais rotação medial, depois flexão e abdução, e menos extensão; final duro.",
    ],
    contraindicacoes: ["Artroplastia planejada nas próximas ~6 semanas (alguns serviços pedem 3 meses) — maior risco de infecção."],
    material: ["Seringa de 5 mL", "Agulha espinhal 22G de 90 mm (mais longa em obesos)"],
    medicacao: ["Triamcinolona 40 mg + lidocaína 1% 4 mL (total 5 mL).", "Pacientes grandes: até 8–10 mL de volume (ex.: triamcinolona 10 mg/mL — 4 mL)."],
    posicao: ["Via lateral: decúbito lateral sobre o lado sadio, perna de baixo fletida e a de cima reta, apoiada em travesseiro na horizontal.", "Via anterior (com imagem): decúbito dorsal."],
    etapas: [
      { t: "Via lateral (palpação)", passos: [
        "Palpar o ápice do trocânter maior abduzindo passivamente a perna de cima.",
        "Entrar perpendicular cerca de um polegar acima do ápice palpável (o ápice real se projeta para dentro sobre o colo).",
        "Avançar até tocar o colo do fêmur e injetar em bolus — em geral não se sente a cápsula.",
      ] },
      { t: "Via anterior (fluoroscopia/US)", passos: [
        "Deitar a agulha sobre a pele alinhada ao centro do colo e confirmar na imagem; o ponto de entrada fica na prega inguinal, sobre a porção proximal do colo.",
        "Palpar o pulso femoral e garantir que o ponto não está sobre o feixe neurovascular.",
        "Inserir a 45°, para cima e para a linha média; aspirar; contraste opcional para confirmar.",
        "Anestésico na pele/fáscia pela via anterior pode dar dormência transitória no território femoral.",
      ] },
    ],
    posop: [
      "Atividade progressiva sem dor, alongamento domiciliar, limitar exercícios de impacto.",
      "Diário de dor até 6 semanas e retorno em 6–12 semanas para medir o efeito.",
    ],
    perolas: [
      "Repetir com intervalo ≥ 3 meses; radiografia anual para acompanhar a artrose.",
      "Alívio com o anestésico confirma origem intra-articular — útil antes de decidir artroplastia ou investigar coluna.",
      "Artrose inicial com dor local e bom final de movimento responde à fisioterapia.",
    ],
    fontes: ["SAUNDERS p. 100", "MSK p. 110–113"],
    tags: ["quadril", "coxartrose", "intra-articular", "diagnóstica"],
  },
  {
    id: "trocanterica", titulo: "Dor peritrocantérica (bursa trocantérica / glúteos)", secao: "quadril", guia: "palpacao",
    guiaNota: "US não mostrou melhorar a eficácia, mas ajuda nos casos refratários.",
    resumo: "Síndrome dolorosa do grande trocânter (bursite + tendinopatia dos glúteos médio/mínimo). Decúbito lateral, entrar perpendicular no centro do ponto doloroso até tocar o trocânter e injetar onde não houver resistência; 20–40 mg (há melhor resposta com doses maiores).",
    indicacoes: [
      "Dor lateral do quadril, pior ao deitar sobre o lado, com dor à palpação do trocânter; amplitude do quadril preservada.",
      "Bursite pós-queda (hemorrágica — aspirar o sangue antes) ou por deitar sobre colchão duro em idosos magros.",
    ],
    contraindicacoes: ["Prótese de quadril do mesmo lado (relativa — o trajeto cirúrgico pode comunicar com a articulação).", "Falha prévia (relativa — rever técnica/diagnóstico)."],
    material: ["Seringa de 2 mL (Saunders) ou maior para dispersão", "Agulha 23G de 30 mm; em obesos, agulha longa/espinhal"],
    medicacao: [
      "Saunders: triamcinolona 20 mg + lidocaína 2% 1,5 mL (2 mL).",
      "Outra escola usa 80 mg de triamcinolona/metilprednisolona em volume maior (seringa de 20 mL), com melhor resultado que 40 mg.",
    ],
    posicao: ["Decúbito lateral sobre o lado sadio, quadril e joelho de baixo fletidos, perna de cima estendida."],
    etapas: [
      { t: "Técnica", passos: [
        "Palpar e marcar o ponto de maior dor sobre o trocânter; pedir ao paciente que não mude de posição.",
        "Entrar perpendicular no centro e tocar o osso do trocânter.",
        "Aspirar e injetar em bolus onde houver falta de resistência.",
      ] },
      { t: "Bursas glúteas (quadrante súpero-lateral da nádega)", passos: [
        "Bursas variáveis entre os glúteos e sobre o ilíaco; agulha espinhal até tocar o osso do ilíaco.",
        "Injetar nas áreas sem resistência enquanto recua em espiral ('subindo uma escada caracol'). Saunders: 40 mg em 5 mL.",
        "Sem grandes vasos ou nervos na região; comparar com o lado sadio (a área é dolorosa em todos).",
      ] },
    ],
    posop: [
      "Evitar sobrecarga 1 semana; depois retorno gradual, alongamento da banda iliotibial e fortalecimento dos glúteos.",
      "Colchão duro: almofada de feltro sobre o trocânter e mudar a posição de dormir.",
    ],
    perolas: [
      "Funciona melhor com dor bem localizada; dor difusa, artrose concomitante, displasia ou dor sacroilíaca/lombar reduzem a resposta.",
      "Até 2/3 têm lombalgia ou artrose do quadril associadas — pedir radiografia da pelve.",
      "Alívio costuma ser temporário (meses); combinar com fisioterapia. Alternativas: ondas de choque, PRP, agulhamento.",
    ],
    fontes: ["SAUNDERS p. 102, 106", "MSK p. 103–110"],
    tags: ["trocantérica", "GTPS", "glúteo médio", "bursite"],
  },
  {
    id: "iliopsoas", titulo: "Bursa do iliopsoas", secao: "quadril", guia: "palpacao",
    guiaNota: "Prefira US: o feixe femoral está logo acima do trajeto.",
    resumo: "Dor inguinal em atletas que fletem o quadril repetidamente. Ponto: 3 dedos abaixo e 3 dedos lateral ao pulso femoral (alinhado com a EIAS); agulha espinhal a 45° cranial e 45° medial, passando sob o feixe até tocar o colo, recuar e injetar em bolus; 20 mg em 4,5 mL.",
    indicacoes: ["Bursite do iliopsoas (barreira, balé, dardo, futebol): dor na flexão/adução passivas, flexão resistida, 'scoop test' do quadril."],
    material: ["Seringa de 5 mL", "Agulha espinhal 22G de 90 mm"],
    medicacao: ["Triamcinolona 20 mg + lidocaína 1% 4 mL (total 4,5 mL)."],
    posicao: ["Decúbito dorsal."],
    etapas: [
      { t: "Técnica (palpação)", passos: [
        "Palpar o pulso femoral no meio do ligamento inguinal; marcar 3 dedos distal e 3 dedos lateral (entra pela borda medial do sartório).",
        "Apontar 45° cranial e 45° medial; a agulha passa obliquamente por baixo de veia, artéria e nervo femorais e atravessa o tendão.",
        "Tocar o osso na face anterior do colo, recuar um pouco e injetar em bolus profundo ao tendão.",
        "Formigamento/queimação = ramo do nervo femoral → reposicionar.",
      ] },
      { t: "Por US", passos: ["Ver o tendão em corte transversal e posicionar a ponta junto à bainha/bursa, com o feixe femoral sempre à vista."] },
    ],
    posop: ["Evitar totalmente a atividade causal por 1 semana; depois alongamento em extensão do quadril e equilíbrio muscular."],
    complicacoes: ["Fraqueza transitória do quadríceps por bloqueio femoral — avisar e não dirigir até passar."],
    perolas: [
      "Diferenciais: articulação do quadril, adutores, hérnia, parede abdominal, sínfise, testículo, fratura de estresse e dor referida lombar/sacroilíaca.",
      "Na dúvida diagnóstica, fazer primeiro só anestésico.",
    ],
    fontes: ["SAUNDERS p. 104–105", "MSK p. 168"],
    tags: ["iliopsoas", "bursa", "virilha", "ressalto"],
  },
  {
    id: "adutores", titulo: "Origem dos adutores (pubalgia)", secao: "quadril", guia: "palpacao",
    resumo: "Dor inguinal à adução resistida e abdução passiva. Peppering na junção tendão-osso no púbis (~2 dedos de largura); 20 mg em 2 mL.",
    indicacoes: ["Tendinopatia da origem dos adutores por sobrecarga ou trauma ('estiramento da virilha')."],
    material: ["Seringa de 2 mL", "Agulha 23G de 30 mm"],
    medicacao: ["Triamcinolona 20 mg + lidocaína 2% 1,5 mL (total 2 mL)."],
    posicao: ["Decúbito dorsal, perna levemente abduzida e em rotação lateral."],
    etapas: [
      { t: "Técnica", passos: [
        "Marcar a origem do tendão no púbis.",
        "Entrar no tendão, angular em direção ao púbis e tocar osso.",
        "Peppering na junção tendão-osso. Lesão no corpo do tendão: peppering no ponto doloroso (fricção e alongamento costumam ser melhores aí).",
      ] },
    ],
    posop: ["Repouso ≥ 1 semana; depois alongamento e fortalecimento graduais; fricção profunda pode ajudar a cicatriz."],
    perolas: ["Excluir outras causas de dor inguinal antes (ver bursa do iliopsoas)."],
    fontes: ["SAUNDERS p. 108"],
    tags: ["adutores", "pubalgia", "virilha"],
  },
  {
    id: "isquiotibiais-isquiatica", titulo: "Origem dos isquiotibiais e bursa isquiática", secao: "quadril", guia: "palpacao",
    guiaNota: "Nervo isquiático próximo — US recomendado sempre que possível.",
    resumo: "Dor na nádega ao sentar, à extensão resistida e no SLR, com tuberosidade isquiática muito dolorosa. Decúbito lateral; entrar no tendão logo distal à tuberosidade e angular até tocar osso: peppering no tendão ou bolus na bursa; 20 mg em 2 mL.",
    indicacoes: ["Tendinopatia proximal dos isquiotibiais (corrida, ciclismo, hipismo).", "Bursite isquiática (queda sentado, atrito; pode ser hemorrágica)."],
    material: ["Seringa de 2 mL", "Agulha 21G de 50 mm"],
    medicacao: ["Triamcinolona 20 mg + lidocaína 2% 1,5 mL (total 2 mL). Lesão dupla: volume maior para os dois alvos."],
    posicao: ["Decúbito lateral sobre o lado sadio, perna de baixo reta e a de cima fletida."],
    etapas: [
      { t: "Técnica", passos: [
        "Palpar a tuberosidade isquiática e marcar o tendão logo distal a ela (~3 dedos de largura).",
        "Entrar no meio do tendão e angular para cima até tocar a tuberosidade.",
        "Peppering na junção tendão-osso ou bolus na bursa (entre glúteo máximo e tuberosidade).",
        "Manter-se sobre a tuberosidade; parestesia na perna = perto do isquiático → reposicionar.",
      ] },
    ],
    posop: ["Evitar sentar em superfície dura e correr longas distâncias por ≥ 1 semana; depois alongamento e fortalecimento."],
    perolas: ["Queda e dor extrema à palpação sugerem bursite; hemática → aspirar antes."],
    fontes: ["SAUNDERS p. 110"],
    tags: ["isquiotibiais", "isquiática", "tuberosidade", "nádega"],
  },
  {
    id: "meralgia", titulo: "Meralgia parestésica (cutâneo femoral lateral)", secao: "quadril", guia: "palpacao",
    guiaNota: "US identifica o nervo e permite hidrodissecção.",
    resumo: "Área oval de dormência/ardor na face anterolateral da coxa. Injetar ao redor (não dentro) do nervo no ponto doloroso junto ao ligamento inguinal, medial e inferior à EIAS; 20 mg sem anestésico (0,5 mL).",
    indicacoes: ["Compressão do nervo cutâneo femoral lateral (obesidade, gestação, roupas apertadas, posição fletida prolongada) com sintomas persistentes."],
    material: ["Seringa de 1 mL", "Agulha 21G de 50 mm"],
    medicacao: ["Triamcinolona 20 mg sem anestésico (0,5 mL)."],
    posicao: ["Decúbito dorsal."],
    etapas: [
      { t: "Técnica", passos: [
        "O nervo cruza o ilíaco, passa sob/através do ligamento inguinal logo medial à EIAS e emerge na fáscia ~10 cm abaixo dela.",
        "Localizar o ponto doloroso no ligamento inguinal ou no ponto distal de emergência.",
        "Injetar em bolus ao redor do nervo. Aumento de formigamento ou queimação = mover a agulha antes de injetar.",
      ] },
    ],
    posop: ["Remover a causa: perder peso, evitar cintos e roupas apertadas, corrigir postura sentada."],
    perolas: [
      "Costuma regredir sozinha (inclusive após o parto) — tranquilizar pode bastar.",
      "Diferenciais: radiculopatia L2–L3, sacroilíaca, quadril, claudicação, herpes-zóster.",
    ],
    fontes: ["SAUNDERS p. 112"],
    tags: ["meralgia parestésica", "cutâneo femoral lateral", "neuropatia compressiva"],
  },
];
