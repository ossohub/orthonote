import type { Infiltracao } from "./types";

// Tornozelo e pé. Doses em triamcinolona acetonida (40 mg/mL).

export const PE: Infiltracao[] = [
  {
    id: "tibiotalar", titulo: "Tornozelo (tibiotalar)", secao: "pe", guia: "palpacao",
    guiaNota: "Fluoroscopia ajuda em articulações muito degeneradas.",
    resumo: "Artrose pós-traumática ou crise de artropatia. Via anterior: anteromedial (medial ao tibial anterior) ou anterolateral (lateral ao extensor longo dos dedos), no 'ponto mole' da interlinha com o pé em leve flexão plantar; 30 mg em 2 mL.",
    indicacoes: [
      "Artrose pós-fratura/entorse grave (muitas vezes anos depois); crise de AR, gota ou soronegativas.",
      "Padrão capsular: perde mais flexão plantar que dorsiflexão.",
    ],
    material: ["Seringa de 2 mL", "Agulha 23G de 30 mm"],
    medicacao: ["Triamcinolona 30 mg + lidocaína 2% 1,25 mL (total 2 mL)."],
    posicao: ["Decúbito dorsal com o pé em leve flexão plantar (ou joelho a 90° com o pé apoiado)."],
    etapas: [
      { t: "Via anteromedial", passos: [
        "A partir do maléolo medial, 'caminhar' com o dedo lateralmente pela interlinha (confirmar com flexão/extensão) até o ponto mole, medial ao tendão tibial anterior.",
        "Dirigir a agulha levemente cranial e posterolateral até a perda súbita de resistência; injetar sem resistência.",
      ] },
      { t: "Via anterolateral", passos: [
        "A partir do maléolo lateral, caminhar medialmente pela interlinha; ficar lateral ao extensor longo dos dedos.",
        "Saunders descreve o pequeno triângulo palpável na junção tíbia–fíbula logo acima do tálus, angulando levemente medial e proximal.",
      ] },
    ],
    posop: ["Evitar carga excessiva ≥ 1 semana; evitar corridas longas, controlar peso e revisar calçado."],
    perolas: [
      "Costuma dar alívio duradouro; repetir com intervalo ≥ 3 meses e radiografia anual.",
      "Assepsia rigorosa — o tornozelo é propenso a infecção.",
      "Ácido hialurônico também é opção na artrose do tornozelo.",
    ],
    fontes: ["SAUNDERS p. 134", "SILVER p. 136", "MSK p. 147"],
    tags: ["tornozelo", "tibiotalar", "artrose"],
  },
  {
    id: "subtalar", titulo: "Subtalar", secao: "pe", guia: "palpacao",
    guiaNota: "Difícil por palpação — fluoroscopia/US recomendados.",
    resumo: "Dor profunda medial e lateral no calcanhar, dor à adução passiva do calcâneo (pós-fratura, obesos). Entrar logo acima e um pouco atrás do sustentáculo do tálus; metade no compartimento posterior e metade, angulando para frente, no anterior; 30 mg em 2 mL.",
    indicacoes: ["Capsulite/artrose subtalar pós-trauma ou por sobrecarga; AR (frequente na subtalar)."],
    material: ["Seringa de 2 mL", "Agulha 23G de 30 mm"],
    medicacao: ["Triamcinolona 30 mg + lidocaína 2% 1,25 mL (total 2 mL)."],
    posicao: ["Decúbito lateral com a face medial do calcanhar para cima."],
    etapas: [
      { t: "Técnica", passos: [
        "Palpar o sustentáculo do tálus, um polegar abaixo do maléolo medial.",
        "Entrar perpendicular logo acima e um pouco posterior a ele; depositar metade da solução.",
        "Recuar um pouco e angular para frente, atravessando o septo, até o compartimento anterior; depositar o restante.",
      ] },
    ],
    posop: ["Evitar carga excessiva ≥ 1 semana; palmilhas e controle de peso previnem recidiva."],
    fontes: ["SAUNDERS p. 136"],
    tags: ["subtalar", "talocalcânea", "artrose"],
  },
  {
    id: "seio-tarso", titulo: "Seio do tarso", secao: "pe", guia: "palpacao",
    guiaNota: "Radiografia pode confirmar a agulha no seio.",
    resumo: "Dor lateral do retropé após entorse em inversão, pior na carga e no varo, com sensação de instabilidade. Injeção lateral na depressão do seio do tarso, logo abaixo/à frente do maléolo lateral — o alívio com anestésico é critério diagnóstico.",
    indicacoes: ["Síndrome do seio do tarso (pós-entorse em inversão, deformidade do retropé, AR, gota)."],
    material: ["Seringa de 2 mL", "Agulha 23–25G de 25–30 mm"],
    medicacao: ["Corticoide (ex.: triamcinolona 20–40 mg) + anestésico local."],
    posicao: ["Decúbito lateral com o pé sintomático para cima."],
    etapas: [
      { t: "Técnica", passos: [
        "Localizar a depressão do seio do tarso logo abaixo e à frente do maléolo lateral.",
        "Entrar perpendicular à pele; não deve haver resistência óssea; na inflamação aguda pode refluir líquido.",
        "Reavaliar a dor após o anestésico (teste diagnóstico).",
      ] },
    ],
    perolas: [
      "Radiografia costuma ser normal e a RM se correlaciona mal — a resposta ao anestésico ajuda a fechar o diagnóstico.",
      "Infiltração + AINE resolveu ~63% e melhorou outros ~22% em uma série.",
    ],
    fontes: ["MSK p. 147–148"],
    tags: ["seio do tarso", "instabilidade subtalar", "entorse"],
  },
  {
    id: "ligamentos-tornozelo", titulo: "Ligamentos do tornozelo (LTFA e deltoide)", secao: "pe", guia: "palpacao",
    resumo: "Entorse aguda costuma ser tratada com repouso, gelo, compressão, elevação e fisioterapia. Injeção só se dor muito aguda ou falha no crônico: peppering na origem do ligamento no maléolo e na inserção; 10 mg em 1 mL.",
    indicacoes: [
      "LTFA (inversão): dor lateral à inversão passiva, quando o tratamento conservador falhou.",
      "Deltoide: dor abaixo do maléolo medial à eversão em flexão plantar (trauma, obesidade, hiperpronação) — responde pior à fricção, então a injeção vale a tentativa.",
    ],
    contraindicacoes: ["Instabilidade ou lesão osteocondral não investigada em dor refratária (encaminhar)."],
    material: ["Seringa de 1 mL", "Agulha 25G de 16 mm"],
    medicacao: ["Triamcinolona 10 mg + lidocaína 2% 0,75 mL (total 1 mL)."],
    etapas: [
      { t: "LTFA", passos: [
        "Marcar a borda anteroinferior do maléolo lateral (o LTFA tem a largura do dedo mínimo e corre paralelo à planta).",
        "Tocar o osso e fazer peppering com metade da solução na origem; virar a agulha e fazer o restante na inserção no tálus.",
      ] },
      { t: "Deltoide", passos: [
        "Marcar o meio da borda inferior do maléolo medial.",
        "Angular para cima até tocar osso e fazer peppering ao longo da inserção óssea.",
      ] },
    ],
    posop: [
      "LTFA: manter o tornozelo em movimento sem dor; gelo, elevação e bandagem em eversão nos primeiros dias; fortalecer fibulares e propriocepção.",
      "Deltoide: limitar atividade ≥ 1 semana; palmilha quase sempre necessária; controle de peso.",
    ],
    fontes: ["SAUNDERS p. 138, 140", "SILVER p. 132"],
    tags: ["entorse", "LTFA", "talofibular anterior", "deltoide"],
  },
  {
    id: "aquiles-peritendao", titulo: "Aquiles — peritendão e bursa retrocalcânea", secao: "pe", guia: "us",
    guiaNota: "Deve ser guiada por US; corticoide nunca dentro do tendão.",
    resumo: "Peritendinite: injetar ao longo das bordas medial e lateral do tendão (metade de cada lado), sem penetrá-lo; bursa retrocalcânea: via lateral, à frente do tendão, em bolus. 20 mg em 2 mL; no máximo uma vez por episódio. Degeneração intratendínea = contraindicação absoluta.",
    indicacoes: [
      "Peritendinite do Aquiles confirmada por imagem (sem tendinose intrassubstancial).",
      "Bursite retrocalcânea: dor à flexão plantar passiva completa (bursa espremida) e no fim da ponta dos pés; palpação muito sensível à frente do tendão.",
    ],
    contraindicacoes: [
      "Injeção no corpo do tendão; degeneração intratendínea no US.",
      "Repetições, doses/volumes altos e retorno precoce a exercício intenso (associados a ruptura).",
    ],
    material: ["Seringa de 2 mL", "Agulha 23G de 30 mm"],
    medicacao: ["Triamcinolona 20 mg + lidocaína 2% 1,5 mL (total 2 mL)."],
    posicao: ["Decúbito ventral com o pé em dorsiflexão para fora da maca (tendão tenso)."],
    etapas: [
      { t: "Peritendão", passos: [
        "Marcar a área dolorosa (em geral nas bordas).",
        "Entrar pelo lado medial, deitar a agulha paralela e deslizar ao longo do tendão sem entrar nele; injetar metade enquanto recua.",
        "Repetir pelo lado lateral com a outra metade. Não há paratendão à frente do Aquiles — a distensão aparece em três lados.",
      ] },
      { t: "Bursa retrocalcânea", passos: [
        "Via lateral (evita artéria e nervo tibiais posteriores): entrar no triângulo entre tendão, tíbia e calcâneo, à frente do tendão.",
        "Injetar em bolus. Qualquer resistência = recuar e reposicionar bem à frente do tendão.",
      ] },
    ],
    posop: [
      "Evitar totalmente sobrecarga por ~10 dias; depois alongamento e excêntricos, mantidos indefinidamente.",
      "Palmilhas e reeducação do gesto; bailarinas: evitar flexão plantar excessiva na ponta.",
    ],
    perolas: [
      "Atleta comprometido: preferir fricção, exercício excêntrico e alternativas (alto volume guiado, agulhamento, PRP, nitrato tópico, polidocanol).",
      "Quinolonas aumentam o risco de tendinopatia e ruptura — evitar nesses pacientes.",
    ],
    fontes: ["SAUNDERS p. 142, 144", "SILVER p. 130, 132", "MSK p. 131, 168–169"],
    tags: ["Aquiles", "peritendinite", "retrocalcânea", "bursite", "Haglund"],
  },
  {
    id: "fibulares", titulo: "Tendões fibulares (bainha comum)", secao: "pe", guia: "palpacao",
    guiaNota: "US confirma a distensão da bainha.",
    resumo: "Dor lateral à eversão resistida, atrás/abaixo do maléolo lateral. Entrar na bifurcação em 'V' dos tendões (pé em eversão forte) e deslizar sob a pele em direção ao maléolo, dentro da bainha comum; 10 mg em 1 mL — deve formar um 'salsichão'.",
    indicacoes: ["Tenossinovite/tendinopatia dos fibulares por sobrecarga.", "Tendinopatia insercional do fibular curto na base do 5º metatarso (peppering na êntese)."],
    material: ["Seringa de 1 mL", "Agulha 25G de 16 mm"],
    medicacao: ["Triamcinolona 10 mg + lidocaína 2% 0,75 mL (total 1 mL)."],
    posicao: ["Decúbito dorsal com o pé apoiado em alguma rotação medial."],
    etapas: [
      { t: "Técnica", passos: [
        "Paciente segura o pé em eversão forte; palpar o 'V' onde os tendões se separam e marcar.",
        "Entrar perpendicular, virar a agulha e deslizar horizontalmente sob a pele em direção ao maléolo.",
        "Injetar na bainha comum — resistência mínima e distensão em 'salsicha'.",
        "Insercional do curto: agulha paralela à pele até tocar a base do 5º metatarso e peppering.",
      ] },
    ],
    posop: ["Evitar sobrecarga ~1 semana; depois calçado, palmilha e fortalecimento dos eversores."],
    fontes: ["SAUNDERS p. 150"],
    tags: ["fibulares", "peroneais", "tenossinovite", "5º metatarso"],
  },
  {
    id: "tibial-posterior", titulo: "Tibial posterior (bainha)", secao: "pe", guia: "us",
    guiaNota: "Tendão de carga com risco de ruptura — injetar só na bainha e sob US.",
    resumo: "Tenossinovite com dor à inversão do pé em flexão plantar e crepitação atrás/abaixo do maléolo medial. Sob US, agulha fina na bainha, alinhada ao tendão abaixo do maléolo em direção proximal; triamcinolona 20–40 mg (0,5–1 mL) + 1 mL de lidocaína.",
    indicacoes: ["Tenossinovite do tibial posterior (esporte, AR, sobrecarga) sem rotura/disfunção avançada."],
    contraindicacoes: ["Tendinose avançada, rotura ou disfunção com pé plano progressivo (risco de ruptura)."],
    material: ["Seringa de 2 mL", "Agulha 25G de 16 mm"],
    medicacao: ["Triamcinolona 0,5–1 mL (20–40 mg) + lidocaína 1% 1 mL."],
    etapas: [
      { t: "Técnica", passos: [
        "Estabilizar o tendão com os dedos logo atrás do maléolo medial.",
        "Entrar alinhado ao tendão, abaixo do maléolo, em direção proximal.",
        "A solução deve entrar sem resistência e distender a bainha; resistência = dentro do tendão → recuar até perder a resistência.",
      ] },
    ],
    posop: ["Repouso do pé e tornozelo por alguns dias; palmilha com suporte do arco."],
    perolas: ["Não injetar às cegas; quinolonas aumentam o risco de rotura."],
    fontes: ["SILVER p. 136–138", "MSK p. 131, 168"],
    tags: ["tibial posterior", "tenossinovite", "pé plano"],
  },
  {
    id: "tunel-tarso", titulo: "Síndrome do túnel do tarso", secao: "pe", guia: "us",
    guiaNota: "US ajuda a evitar nervo, artéria e veias tibiais posteriores.",
    resumo: "Compressão do nervo tibial posterior sob o retináculo dos flexores: parestesia e dor na borda medial do pé, hálux e planta. Injeção como no túnel do carpo, posterior ao maléolo medial, entre ele e o calcâneo, ao lado (nunca dentro) do nervo.",
    indicacoes: ["Túnel do tarso sintomático sem lesão expansiva (cisto, varizes) que exija cirurgia."],
    material: ["Seringa de 1–2 mL", "Agulha 25G de 16–25 mm"],
    medicacao: ["Corticoide em pequeno volume (ex.: triamcinolona 20 mg), com pouco ou nenhum anestésico."],
    etapas: [
      { t: "Técnica", passos: [
        "Palpar o pulso tibial posterior atrás do maléolo medial; o nervo segue logo posterior à artéria.",
        "Entrar entre o maléolo medial e o calcâneo, sob o retináculo, angulando distalmente.",
        "Choque ou parestesia = recuar e reposicionar antes de injetar.",
      ] },
    ],
    perolas: ["Investigar causas estruturais (gânglio, varizes, coalizão) com US/RM se não responder."],
    fontes: ["SILVER p. 131, 134"],
    tags: ["túnel do tarso", "tibial posterior", "neuropatia compressiva"],
  },
  {
    id: "fascia-plantar", titulo: "Fascite plantar", secao: "pe", guia: "palpacao",
    guiaNota: "US confirma o espessamento e permite injeção peri-fascial (menos risco de ruptura).",
    resumo: "Dor no calcanhar ao primeiro passo da manhã, ponto doloroso na origem medial da fáscia. Via medial (menos dolorosa que pelo coxim): entrar na borda medial da sola logo distal ao coxim e avançar a 45° até tocar o calcâneo; peppering em duas fileiras; 20 mg em 2 mL.",
    indicacoes: ["Fascite plantar refratária a alongamento, palmilha e calçado (injeção não é primeira linha)."],
    contraindicacoes: ["Injeções repetidas na substância da fáscia (ruptura, atrofia do coxim)."],
    material: ["Seringa de 2 mL", "Agulha 21G de 40–50 mm"],
    medicacao: ["Triamcinolona 20 mg + lidocaína 2% 1,5 mL (total 2 mL).", "Bupivacaína no lugar da lidocaína prolonga a analgesia nesse procedimento doloroso."],
    posicao: ["Decúbito ventral, pé apoiado em dorsiflexão."],
    etapas: [
      { t: "Via medial (Saunders)", passos: [
        "Localizar o ponto doloroso na tuberosidade medial do calcâneo.",
        "Entrar perpendicular na borda medial da parte mole da sola, logo distal ao coxim do calcanhar.",
        "Avançar a 45° em direção ao calcâneo até tocar o osso; peppering em duas fileiras na origem da fáscia.",
      ] },
      { t: "Via plantar (Silver)", passos: [
        "Infiltrar anestésico da pele até o esporão pelo centro do coxim e, trocando a seringa, injetar corticoide no ponto de máxima dor, cobrindo toda a lesão.",
      ] },
    ],
    posop: [
      "Apoio de calcanhar (calcanheira) ≥ 1 semana; depois exercícios intrínsecos e alongamento da fáscia e panturrilha (1–2 semanas após).",
      "Rolar uma bolinha sob o pé, bandagem e palmilha.",
    ],
    perolas: ["O esporão no raio-X não define o diagnóstico.", "Suspeitar de espondiloartrite se esporão 'felpudo' ou erosões."],
    fontes: ["SAUNDERS p. 152", "SILVER p. 130–131, 134", "MSK p. 151"],
    tags: ["fascite plantar", "esporão", "calcanhar"],
  },
  {
    id: "neuroma-morton", titulo: "Neuroma de Morton", secao: "pe", guia: "palpacao",
    guiaNota: "US útil na dúvida; em diagnóstico claro, o resultado guiado e não guiado foi semelhante.",
    resumo: "Dor em queimação/dormência no 2º ou 3º espaço, teste de compressão positivo. Via dorsal entre os tendões extensores, ~2 cm proximal à comissura; sente-se um 'ceder' ao atravessar o ligamento intermetatarsal; os dedos se afastam ao injetar.",
    indicacoes: ["Neuroma interdigital (2º/3º espaços) — corticoide é superior a palmilha e a anestésico isolado."],
    contraindicacoes: ["Diagnóstico incerto (sinovite da 2ª MTF, Freiberg, lesão da placa plantar, edema ósseo) — investigar antes."],
    material: ["Seringa de 2 mL", "Agulha 23–25G de 25 mm"],
    medicacao: ["Corticoide ~40 mg (preferir os mais solúveis em partes moles, ex.: metilprednisolona) + anestésico local."],
    etapas: [
      { t: "Via dorsal", passos: [
        "Entrar entre os tendões extensores dos dedos vizinhos, ~2 cm proximal à comissura, sustentando o pé com a outra mão.",
        "Avançar sem resistência; um leve 'ceder' indica a passagem pelo ligamento intermetatarsal (o neuroma fica logo abaixo).",
        "Injetar e observar o afastamento dos dedos vizinhos.",
      ] },
    ],
    complicacoes: ["Hipopigmentação e atrofia dorsal — avisar."],
    perolas: [
      "Cerca de metade melhora por até 1 ano; melhor quando feita cedo; o tamanho do neuroma não prevê a resposta.",
      "A via plantar evita alterações de pele, mas é mais dolorosa e sem referências.",
    ],
    fontes: ["MSK p. 131–133"],
    tags: ["Morton", "neuroma interdigital", "metatarsalgia"],
  },
  {
    id: "mtf1-pequenas", titulo: "1ª MTF (hálux rígido) e mediotarso/TMT", secao: "pe", guia: "palpacao",
    guiaNota: "Mediopé e TMT: preferir fluoroscopia (articulações congruentes, perto de feixes).",
    resumo: "1ª MTF: tracionar o hálux, entrar dorsal perpendicular na interlinha evitando o extensor; 20 mg em 1,5 mL. Mediotarso/TMT: localizar a articulação dolorosa por deslizamento e palpação; parte em peppering na cápsula e o restante em bolus; 20 mg em 2 mL.",
    indicacoes: [
      "Hálux rígido/artrose ou capsulite da 1ª MTF (às vezes com hálux valgo); gota (após excluir infecção).",
      "Capsulite/artrose do mediopé e TMT (bailarinas, futebol, pós-Lisfranc) — bloqueio seletivo ajuda a achar a articulação culpada.",
    ],
    material: ["MTF1: seringa de 2 mL, agulha 25G de 16 mm", "Mediotarso: seringa de 2 mL, agulha 23G de 25 mm"],
    medicacao: ["MTF1: triamcinolona 20 mg + lidocaína 2% 1 mL (1,5 mL).", "Mediotarso/TMT: triamcinolona 20 mg + lidocaína 2% 1,5 mL (2 mL)."],
    etapas: [
      { t: "1ª MTF", passos: [
        "Palpar a fenda dorsal na base da falange enquanto flete/estende o hálux; tracionar o dedo.",
        "Entrar perpendicular evitando o extensor longo do hálux e injetar em bolus. Demais dedos: pela face medial/lateral sob tração.",
      ] },
      { t: "TMT", passos: [
        "1ª TMT: logo medial ao tibial anterior. 2ª TMT fica mais proximal (encaixada nas cunhas); 2ª e 3ª podem ser alcançadas numa só punção; 4ª e 5ª comunicam entre si.",
        "Achar a interlinha 'balançando' a cabeça do metatarso para cima e para baixo; agulha dorsal → plantar ao longo da interlinha.",
      ] },
    ],
    posop: ["Evitar carga excessiva ≥ 1 semana; bandagem e separador de dedos na MTF; calçado/palmilha adequados."],
    perolas: ["Como na rizartrose, a infiltração da 1ª MTF pode durar muito.", "Na artrose TMT, a 2ª costuma ser a mais dolorosa, mesmo que a 3ª/4ª pareçam piores no raio-X."],
    fontes: ["SAUNDERS p. 146, 148", "MSK p. 148–150"],
    tags: ["hálux rígido", "MTF", "Lisfranc", "TMT", "mediopé"],
  },
];
