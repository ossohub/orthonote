import type { Condicao } from "./types";

// Adulto — Gastrointestinal, Endócrino e Genitourinário.
export const ADULTO_2: Condicao[] = [
  // ───────────── GASTROINTESTINAL ─────────────
  {
    id: "nausea", titulo: "Náuseas e vômitos", area: "adulto", sistema: "Gastrointestinal",
    tags: ["vômito", "ondansetrona", "antiemético"],
    resumo: "Hidratar, antiemético e investigar causa (abdome agudo, gestação, CAD, intoxicação).",
    manejo: [
      "Avaliar desidratação e eletrólitos; beta-HCG em mulheres em idade fértil.",
      "Ondansetrona é a opção com menos efeitos extrapiramidais; prolonga QT.",
      "Metoclopramida/bromoprida: risco de acatisia e distonia, sobretudo em jovens.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Soro fisiológico 0,9%", p: "500–1.000 mL EV aberto se desidratação." },
        { m: "Ondansetrona 4 mg/2 mL", p: "4–8 mg EV lento." },
        { m: "Bromoprida 10 mg/2 mL", p: "10 mg EV lento ou IM." },
        { m: "Metoclopramida 10 mg/2 mL", p: "10 mg EV lento, diluída." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Ondansetrona 8 mg (ODT)", p: "1 cp sublingual 8/8 h se náuseas, por até 3 dias." },
        { m: "Bromoprida 10 mg", p: "1 cp VO 8/8 h antes das refeições, por até 3 dias." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "diarreia", titulo: "Diarreia aguda / gastroenterite", area: "adulto", sistema: "Gastrointestinal",
    tags: ["geca", "diarreia", "desidratação", "soro de reidratação"],
    resumo: "Reidratação é o tratamento; antibiótico só na disenteria com febre ou toxemia.",
    manejo: [
      "Classificar desidratação; reidratação oral sempre que possível.",
      "Antibiótico se diarreia com sangue + febre, sepse, imunossupressão ou viajante grave.",
      "Antidiarreico (loperamida) só sem febre e sem sangue.",
      "Sinais de alarme: sangue, febre alta, idoso, desidratação grave, > 7 dias.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Soro fisiológico 0,9% ou Ringer lactato", p: "20–30 mL/kg EV em 1–2 h se desidratação; reavaliar." },
        { m: "Ondansetrona 4 mg/2 mL", p: "4–8 mg EV se vômitos." },
        { m: "Escopolamina + dipirona (Buscopan Composto®)", p: "1 ampola EV diluída se cólica." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Sais de reidratação oral", p: "1 envelope em 1 L de água filtrada; beber após cada evacuação (200–400 mL) e ao longo do dia." },
        { m: "Racecadotrila 100 mg", p: "1 cp VO 8/8 h até 2 evacuações normais (máx. 7 dias)." },
        { m: "Saccharomyces boulardii 200 mg", p: "1 cp VO 12/12 h por 5 dias." },
        { m: "Ciprofloxacino 500 mg", p: "1 cp VO 12/12 h por 3 dias.", o: "Só disenteria febril/toxemia. Alternativa: azitromicina 500 mg 1x/dia 3 dias." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "colica-abd", titulo: "Cólica abdominal inespecífica", area: "adulto", sistema: "Gastrointestinal",
    tags: ["dor abdominal", "buscopan", "antiespasmódico"],
    resumo: "Antiespasmódico + analgésico após excluir abdome agudo cirúrgico.",
    manejo: [
      "Exame abdominal seriado; sinais de peritonite, febre, vômitos persistentes ou idoso → investigar.",
      "Analgesia não mascara diagnóstico — pode e deve ser feita.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Escopolamina 20 mg + dipirona 2,5 g (Buscopan Composto®)", p: "1 ampola diluída em 100 mL SF EV." },
        { m: "Escopolamina 20 mg/mL", p: "20 mg EV lento (se alergia a dipirona)." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Escopolamina 10 mg + dipirona 250 mg (Buscopan Composto®)", p: "1–2 cp VO 6/6–8/8 h se cólica, por até 3 dias." },
        { m: "Simeticona 75 mg/mL", p: "40 gotas VO 8/8 h se distensão." },
      ]},
    ],
    fontes: ["PRV"],
  },
  {
    id: "dispepsia", titulo: "Dispepsia, DRGE e doença péptica", area: "adulto", sistema: "Gastrointestinal",
    tags: ["epigastralgia", "pirose", "omeprazol", "gastrite", "úlcera"],
    resumo: "IBP por 4–8 semanas; endoscopia se sinais de alarme ou > 60 anos.",
    manejo: [
      "Excluir causa cardíaca em dor epigástrica (ECG se fator de risco).",
      "Sinais de alarme: perda de peso, disfagia, anemia, sangramento, vômitos persistentes, massa.",
      "Pesquisar e tratar H. pylori; suspender AINE.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Omeprazol 40 mg", p: "40 mg EV em bolus." },
        { m: "Hidróxido de alumínio + magnésio (suspensão)", p: "10–20 mL VO." },
        { m: "Bromoprida 10 mg/2 mL", p: "10 mg EV se náuseas." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Omeprazol 20 mg", p: "1 cp VO em jejum, 30 min antes do café, por 4–8 semanas (40 mg se DRGE erosiva)." },
        { m: "Pantoprazol 40 mg", p: "1 cp VO em jejum por 4–8 semanas.", o: "Alternativa." },
        { m: "Hidróxido de alumínio + magnésio", p: "10 mL VO 1 h após as refeições se pirose." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "hda", titulo: "Hemorragia digestiva alta", area: "adulto", sistema: "Gastrointestinal",
    tags: ["hda", "hematêmese", "melena", "varizes", "omeprazol", "terlipressina"],
    resumo: "Ressuscitar, IBP em alta dose; varicosa: terlipressina + ceftriaxona; EDA em 12–24 h.",
    manejo: [
      "Dois acessos calibrosos, cristaloide criterioso, tipagem; transfundir se Hb < 7 (< 8 em coronariopata).",
      "Escore de Glasgow-Blatchford para estratificar.",
      "Não varicosa: IBP EV em alta dose.",
      "Suspeita de varizes (cirrose): terlipressina/octreotide + antibiótico profilático; EDA ≤ 12 h.",
      "Proteger via aérea se hematêmese volumosa ou rebaixamento.",
    ],
    rx: [
      { t: "Não varicosa", itens: [
        { m: "Omeprazol 40 mg", p: "80 mg EV em bolus; depois 40 mg EV 12/12 h (ou 8 mg/h em BIC)." },
      ]},
      { t: "Varicosa", itens: [
        { m: "Terlipressina 1 mg", p: "2 mg EV 4/4 h nas primeiras 48 h; depois 1 mg 4/4 h (até 5 dias).", o: "Peso < 50 kg: 1 mg; contraindicada em isquemia coronariana/periférica." },
        { m: "Octreotide 100 mcg/mL", p: "50 mcg EV em bolus + 50 mcg/h em BIC por 2–5 dias.", o: "Alternativa à terlipressina." },
        { m: "Ceftriaxona 1 g", p: "1 g EV 1x/dia por 7 dias (profilaxia de PBE)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "hdb", titulo: "Hemorragia digestiva baixa", area: "adulto", sistema: "Gastrointestinal",
    tags: ["hdb", "hematoquezia", "enterorragia"],
    resumo: "Estabilizar, excluir HDA (enterorragia volumosa com instabilidade), colonoscopia após preparo.",
    manejo: [
      "Ressuscitação volêmica e transfusão como na HDA.",
      "Enterorragia com instabilidade: até 15% são HDA — considerar EDA.",
      "Angio-TC se sangramento ativo e instável; colonoscopia em até 24 h após preparo.",
      "Suspender antiagregantes/anticoagulantes conforme risco.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Ringer lactato / SF 0,9%", p: "500–1.000 mL EV, reavaliando perfusão." },
        { m: "Concentrado de hemácias", p: "1 unidade por vez se Hb < 7 (< 8 coronariopata) ou instável." },
        { m: "Omeprazol 40 mg", p: "40 mg EV se dúvida de origem alta." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "encef-hep", titulo: "Encefalopatia hepática", area: "adulto", sistema: "Gastrointestinal",
    tags: ["cirrose", "lactulose", "rifaximina", "encefalopatia"],
    resumo: "Tratar o fator precipitante + lactulose até 2–3 evacuações pastosas/dia.",
    manejo: [
      "Buscar precipitante: infecção (PBE), HDA, constipação, distúrbio eletrolítico, sedativos, desidratação.",
      "Lactulose VO/SNG ou enema se incapaz de deglutir.",
      "Proteger via aérea se grau III–IV.",
    ],
    rx: [
      { t: "Tratamento", itens: [
        { m: "Lactulose 667 mg/mL", p: "20–30 mL VO 6/6–8/8 h, titular para 2–3 evacuações pastosas/dia.", o: "Enema: 300 mL lactulose + 700 mL água." },
        { m: "Rifaximina 550 mg", p: "1 cp VO 12/12 h (associar em recorrência).", o: "Alternativa: metronidazol 250 mg 8/8 h." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "pancreatite", titulo: "Pancreatite aguda", area: "adulto", sistema: "Gastrointestinal",
    tags: ["pancreatite", "lipase", "ringer"],
    resumo: "Hidratação com Ringer guiada por metas, analgesia e dieta precoce; sem ATB profilático.",
    manejo: [
      "Diagnóstico: 2 de 3 — dor típica, lipase/amilase ≥ 3x, imagem compatível.",
      "Ringer lactato 1,5 mL/kg/h (com bolus de 10 mL/kg se hipovolemia); reavaliar a cada 3–6 h — evitar hiper-hidratação.",
      "Analgesia multimodal; dieta oral assim que tolerar (em até 24–72 h).",
      "Estratificar gravidade (BISAP, falência orgânica). USG para causa biliar.",
      "Antibiótico só se necrose infectada ou colangite.",
    ],
    rx: [
      { t: "Internação", itens: [
        { m: "Ringer lactato", p: "1,5 mL/kg/h EV, ajustar por diurese (> 0,5 mL/kg/h) e hemodinâmica." },
        { m: "Dipirona 1 g/2 mL", p: "1 g EV 6/6 h." },
        { m: "Tramadol 100 mg/2 mL", p: "50–100 mg em 100 mL SF EV 6/6 h se dor." },
        { m: "Morfina 10 mg/mL", p: "2–4 mg EV 4/4 h se dor intensa." },
        { m: "Ondansetrona 4 mg/2 mL", p: "4–8 mg EV 8/8 h se náuseas." },
        { m: "Enoxaparina 40 mg", p: "40 mg SC 1x/dia (profilaxia de TEV)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "biliar", titulo: "Cólica biliar, colecistite e colangite", area: "adulto", sistema: "Gastrointestinal",
    tags: ["colelitíase", "colecistite", "colangite", "charcot", "vesícula"],
    resumo: "Cólica: analgesia e eletiva. Colecistite: ATB + colecistectomia precoce. Colangite: ATB + drenagem.",
    manejo: [
      "USG de abdome; Murphy, febre e leucocitose sugerem colecistite.",
      "Colangite (tríade de Charcot: febre, icterícia, dor) — pêntade de Reynolds é grave: CPRE urgente.",
      "Colecistite: colecistectomia em até 72 h (idealmente).",
    ],
    rx: [
      { t: "Cólica biliar (PS)", itens: [
        { m: "Escopolamina + dipirona (Buscopan Composto®)", p: "1 ampola em 100 mL SF EV." },
        { m: "Cetoprofeno 100 mg", p: "100 mg em 100 mL SF EV." },
      ]},
      { t: "Colecistite / colangite", itens: [
        { m: "Ceftriaxona 1 g", p: "2 g EV 1x/dia." },
        { m: "Metronidazol 500 mg/100 mL", p: "500 mg EV 8/8 h." },
        { m: "Piperacilina + tazobactam 4,5 g", p: "4,5 g EV 6/6 h.", o: "Grave, idoso frágil ou nosocomial." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "diverticulite", titulo: "Diverticulite aguda não complicada", area: "adulto", sistema: "Gastrointestinal",
    tags: ["diverticulite", "fossa ilíaca esquerda"],
    resumo: "TC confirma; não complicada em imunocompetente pode ser ambulatorial, ATB seletivo.",
    manejo: [
      "Dor em FIE + febre; TC de abdome com contraste (estadiamento de Hinchey).",
      "ATB indicado se comorbidade, imunossupressão, sinais sistêmicos ou PCR alta.",
      "Abscesso > 3–4 cm: drenagem percutânea; perfuração: cirurgia.",
    ],
    rx: [
      { t: "Ambulatorial", itens: [
        { m: "Amoxicilina + clavulanato 875/125 mg", p: "1 cp VO 12/12 h por 7–10 dias." },
        { m: "Ciprofloxacino 500 mg + metronidazol 500 mg", p: "Cipro 1 cp 12/12 h + metronidazol 1 cp 8/8 h por 7–10 dias.", o: "Alérgicos." },
        { m: "Paracetamol 750 mg", p: "1 cp VO 6/6 h se dor." },
      ]},
      { t: "Internação", itens: [
        { m: "Ceftriaxona 2 g + metronidazol 500 mg", p: "Ceftriaxona 2 g EV 1x/dia + metronidazol 500 mg EV 8/8 h." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "abd-agudo", titulo: "Abdome agudo — preparo pré-operatório", area: "adulto", sistema: "Gastrointestinal",
    tags: ["apendicite", "obstrução", "perfurativo", "isquemia mesentérica", "cirurgia"],
    resumo: "Jejum, hidratação, analgesia, ATB conforme causa e avaliação cirúrgica precoce.",
    manejo: [
      "Apendicite: ATB profilático/terapêutico e apendicectomia.",
      "Obstrutivo: jejum, SNG aberta, hidratação e correção eletrolítica.",
      "Perfurativo (pneumoperitônio): ATB amplo e cirurgia de urgência.",
      "Vascular (dor desproporcional ao exame, FA): angio-TC, heparina e cirurgia.",
      "Hemorrágico (gravidez ectópica, aneurisma roto): ressuscitação e cirurgia imediata.",
    ],
    rx: [
      { t: "Pré-operatório", itens: [
        { m: "Jejum absoluto + SNG aberta (se obstrução/vômitos)", p: "—" },
        { m: "Ringer lactato", p: "30 mL/kg/dia EV + reposição de perdas; bolus se hipotensão." },
        { m: "Ceftriaxona 2 g + metronidazol 500 mg", p: "Ceftriaxona 2 g EV 1x/dia + metronidazol 500 mg EV 8/8 h." },
        { m: "Dipirona 1 g/2 mL", p: "1 g EV 6/6 h." },
        { m: "Morfina 10 mg/mL", p: "2–4 mg EV se dor intensa." },
        { m: "Omeprazol 40 mg", p: "40 mg EV 1x/dia." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "hemorroida", titulo: "Doença hemorroidária / fissura", area: "adulto", sistema: "Gastrointestinal",
    tags: ["hemorroida", "trombose hemorroidária", "fissura anal"],
    resumo: "Fibras, água, banho de assento, analgesia; trombose < 72 h pode ser excisada.",
    manejo: [
      "Trombose hemorroidária externa com < 72 h e dor intensa: excisão do trombo sob anestesia local.",
      "Evitar esforço evacuatório; tratar constipação.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Psyllium 5 g", p: "1 envelope em 200 mL de água 1–2x/dia." },
        { m: "Banho de assento morno", p: "10–15 min, 3x/dia e após evacuar." },
        { m: "Pomada de lidocaína + hidrocortisona (ex.: Proctyl®/Ultraproct®)", p: "Aplicar 2–3x/dia por até 7 dias." },
        { m: "Diosmina + hesperidina 450/50 mg", p: "Crise: 3 cp 2x/dia por 4 dias, depois 2 cp 2x/dia por 3 dias." },
        { m: "Paracetamol 750 mg", p: "1 cp VO 6/6 h se dor." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "constipacao", titulo: "Constipação intestinal", area: "adulto", sistema: "Gastrointestinal",
    tags: ["constipação", "lactulose", "fecaloma", "enema"],
    resumo: "Excluir obstrução; laxativo osmótico e enema se fecaloma.",
    manejo: [
      "Toque retal: fecaloma → enema/desimpactação.",
      "Rever drogas constipantes (opioides, anticolinérgicos, ferro, BCC).",
      "Alarme: perda de peso, sangue, mudança recente de hábito > 50 anos.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Enema de fosfato de sódio (Fleet enema®) 130 mL", p: "1 frasco via retal." },
        { m: "Glicerina 12% (clister)", p: "250–500 mL via retal se fecaloma." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Lactulose 667 mg/mL", p: "15–30 mL VO 1–2x/dia." },
        { m: "Macrogol 3350 (PEG) 17 g", p: "1 envelope em 200 mL de água 1x/dia." },
        { m: "Bisacodil 5 mg", p: "1–2 cp VO à noite, uso curto." },
      ]},
    ],
    fontes: ["PRV"],
  },

  // ───────────── ENDÓCRINO ─────────────
  {
    id: "cad", titulo: "Cetoacidose diabética / estado hiperosmolar", area: "adulto", sistema: "Endócrino",
    tags: ["cad", "ehh", "insulina", "potássio", "hiperglicemia"],
    resumo: "Volume primeiro, potássio antes da insulina, insulina regular em BIC até fechar o ânion gap.",
    manejo: [
      "Diagnóstico CAD: glicemia > 250 (ou DM conhecido), pH < 7,3 / HCO₃ < 18, cetonemia/cetonúria. EHH: glicemia > 600, osm > 320, sem acidose.",
      "1ª hora: SF 0,9% 15–20 mL/kg (1–1,5 L).",
      "Depois: Na corrigido normal/alto → SF 0,45%; baixo → SF 0,9%, 250–500 mL/h.",
      "K < 3,3: NÃO iniciar insulina, repor KCl primeiro. K 3,3–5,2: 20–30 mEq em cada litro. K > 5,2: insulina sem K, dosar a cada 2 h.",
      "Insulina regular 0,1 U/kg/h (ou bolus 0,1 + 0,1/h). Queda esperada de glicemia 50–75 mg/dL/h.",
      "Glicemia ≤ 200 (CAD) ou ≤ 300 (EHH): SG 5% + reduzir insulina para 0,02–0,05 U/kg/h.",
      "Resolução: pH > 7,3, HCO₃ ≥ 15–18, AG ≤ 12. Sobrepor insulina SC 1–2 h antes de desligar a BIC.",
      "Bicarbonato só se pH < 6,9.",
    ],
    alarme: ["Glicemia capilar de 1/1 h; eletrólitos e gasometria venosa de 2/2–4/4 h.", "Evitar queda de osmolaridade > 3 mOsm/kg/h (edema cerebral)."],
    rx: [
      { t: "1ª hora", itens: [
        { m: "Soro fisiológico 0,9%", p: "15–20 mL/kg EV (≈ 1.000–1.500 mL) na 1ª hora.", k: { d: [15, 20], u: "mL" } },
      ]},
      { t: "Insulina e potássio", itens: [
        { m: "Insulina regular 100 UI/mL", p: "50 UI em 50 mL SF (1 UI/mL) em BIC a 0,1 UI/kg/h.", k: { d: 0.1, u: "UI", c: 1, f: "mL" }, o: "Valor = mL/h da bomba." },
        { m: "Cloreto de potássio 19,1% (2,5 mEq/mL)", p: "K 3,3–5,2: 20–30 mEq (8–12 mL) em cada 1 L de soro. K < 3,3: 20–40 mEq/h antes da insulina." },
      ]},
      { t: "Glicemia ≤ 200–250", itens: [
        { m: "Soro glicosado 5% + NaCl 0,45%", p: "150–250 mL/h EV." },
        { m: "Insulina regular em BIC", p: "Reduzir para 0,02–0,05 UI/kg/h, manter glicemia 150–200 até resolver a acidose." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "hiperglicemia", titulo: "Hiperglicemia sem cetoacidose", area: "adulto", sistema: "Endócrino",
    tags: ["hiperglicemia", "diabetes descompensado", "insulina"],
    resumo: "Sem acidose/cetose: hidratar, insulina regular SC conforme glicemia e ajustar tratamento ambulatorial.",
    manejo: [
      "Excluir CAD/EHH (gasometria, cetonas) e fator desencadeante (infecção, má adesão).",
      "Não buscar normalizar no PS: objetivo é sair dos sintomas e ajustar o esquema.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Soro fisiológico 0,9%", p: "500–1.000 mL EV se desidratado." },
        { m: "Insulina regular 100 UI/mL", p: "SC conforme glicemia: 250–300: 4 UI; 301–350: 6 UI; 351–400: 8 UI; > 400: 10 UI. Reavaliar em 2 h." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Metformina 850 mg", p: "1 cp VO após o almoço, subir para 2–3x/dia conforme tolerância.", o: "Evitar se TFG < 30." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "hipoglicemia", titulo: "Hipoglicemia", area: "adulto", sistema: "Endócrino",
    tags: ["glicose 50%", "glucagon", "hipoglicemia"],
    resumo: "Glicemia < 70 com sintomas: carboidrato VO se consciente; glicose 50% EV se não.",
    manejo: [
      "Regra 15/15: 15 g de carboidrato VO e reavaliar em 15 min.",
      "Rebaixado/sem deglutir: glicose 50% EV; sem acesso: glucagon IM.",
      "Etilista/desnutrido: tiamina antes ou junto da glicose.",
      "Hipoglicemia por sulfonilureia ou insulina de ação longa: observar ≥ 24 h com SG 10%.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Glicose 50%", p: "40–60 mL (20–30 g) EV em bolus; repetir se glicemia < 70 em 15 min." },
        { m: "Tiamina 100 mg/mL", p: "100 mg EV/IM antes da glicose (etilistas/desnutridos)." },
        { m: "Glucagon 1 mg", p: "1 mg IM/SC se sem acesso venoso." },
        { m: "Soro glicosado 10%", p: "100 mL/h EV de manutenção se risco de recorrência." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },

  // ───────────── GENITOURINÁRIO ─────────────
  {
    id: "cistite", titulo: "Cistite não complicada", area: "adulto", sistema: "Genitourinário",
    tags: ["itu", "infecção urinária", "disúria", "fosfomicina"],
    resumo: "Mulher não gestante com disúria e polaciúria sem febre: tratamento curto empírico.",
    manejo: [
      "Clínica basta; EAS/urocultura se recorrente, gestante, homem ou falha.",
      "Febre, dor lombar, náuseas → pielonefrite.",
      "Gestante: tratar também bacteriúria assintomática (cefalexina/amoxicilina/nitrofurantoína).",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Fosfomicina 3 g", p: "1 envelope em ½ copo de água à noite, dose única." },
        { m: "Nitrofurantoína 100 mg", p: "1 cp VO 6/6 h por 5 dias.", o: "Evitar se TFG < 30." },
        { m: "Cefalexina 500 mg", p: "1 cp VO 6/6 h por 5–7 dias.", o: "Opção na gestante." },
        { m: "Fenazopiridina 200 mg", p: "1 cp VO 8/8 h por 2 dias se disúria intensa.", o: "Urina fica alaranjada." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "pielo", titulo: "Pielonefrite aguda", area: "adulto", sistema: "Genitourinário",
    tags: ["itu", "pielonefrite", "giordano", "ceftriaxona"],
    resumo: "Febre + dor lombar: urocultura, ATB; ambulatorial se estável e tolerando VO.",
    manejo: [
      "Urocultura antes do ATB; imagem se obstrução, sepse ou sem melhora em 48–72 h.",
      "Internar se sepse, vômitos, gestante, obstrução, imunossupressão.",
    ],
    rx: [
      { t: "Ambulatorial", itens: [
        { m: "Ceftriaxona 1 g", p: "1 g IM/EV dose inicial no PS." },
        { m: "Ciprofloxacino 500 mg", p: "1 cp VO 12/12 h por 7 dias." },
        { m: "Amoxicilina + clavulanato 875/125 mg", p: "1 cp VO 12/12 h por 10–14 dias.", o: "Alternativa conforme cultura." },
      ]},
      { t: "Internação", itens: [
        { m: "Ceftriaxona 1 g", p: "1–2 g EV 1x/dia por 10–14 dias (trocar para VO conforme cultura)." },
        { m: "Piperacilina + tazobactam 4,5 g", p: "4,5 g EV 6/6 h.", o: "Sepse grave/risco de multirresistência." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "colica-renal", titulo: "Cólica nefrética (ureterolitíase)", area: "adulto", sistema: "Genitourinário",
    tags: ["cálculo renal", "litíase", "cólica renal", "tansulosina"],
    resumo: "AINE é a 1ª escolha; terapia expulsiva com tansulosina se cálculo distal 5–10 mm.",
    manejo: [
      "TC sem contraste (ou USG em gestante/jovem com quadro típico).",
      "Urgência urológica: febre/infecção com obstrução, rim único, anúria, dor refratária, LRA.",
      "Hidratação forçada não ajuda; hidratar só se desidratado.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Cetoprofeno 100 mg", p: "100 mg em 100 mL SF EV em 20 min." },
        { m: "Dipirona 1 g/2 mL", p: "1–2 g EV diluídos." },
        { m: "Escopolamina 20 mg/mL", p: "20 mg EV (associar se cólica)." },
        { m: "Tramadol 100 mg/2 mL", p: "50–100 mg em 100 mL SF EV se refratária." },
        { m: "Morfina 10 mg/mL", p: "2–4 mg EV se dor persistente." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Tansulosina 0,4 mg", p: "1 cp VO à noite por até 4 semanas (cálculo distal 5–10 mm)." },
        { m: "Cetoprofeno 150 mg (liberação prolongada)", p: "1 cp VO 1x/dia por 5 dias." },
        { m: "Dipirona 1 g", p: "1 cp VO 6/6 h se dor." },
        { m: "Escopolamina + dipirona (Buscopan Composto®)", p: "1 cp VO 8/8 h se cólica." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "candidiase", titulo: "Candidíase vulvovaginal", area: "adulto", sistema: "Genitourinário",
    tags: ["corrimento", "fluconazol", "vulvovaginite"],
    resumo: "Prurido + corrimento grumoso: fluconazol VO dose única ou azólico tópico.",
    manejo: ["Parceiro só trata se sintomático.", "Gestante: apenas tópico (7 dias)."],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Fluconazol 150 mg", p: "1 cp VO dose única." },
        { m: "Miconazol creme vaginal 2%", p: "1 aplicador à noite por 7 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "vaginose", titulo: "Vaginose bacteriana / tricomoníase", area: "adulto", sistema: "Genitourinário",
    tags: ["corrimento", "metronidazol", "odor"],
    resumo: "Corrimento com odor de peixe (vaginose) ou bolhoso/amarelo-esverdeado (tricomonas): metronidazol.",
    manejo: [
      "Vaginose: parceiro não precisa tratar.",
      "Tricomoníase: é IST — tratar parceiro e rastrear outras ISTs.",
      "Evitar álcool durante e até 24–72 h após metronidazol.",
    ],
    rx: [
      { t: "Vaginose", itens: [
        { m: "Metronidazol 250 mg", p: "2 cp (500 mg) VO 12/12 h por 7 dias." },
        { m: "Metronidazol gel vaginal 100 mg/g", p: "1 aplicador à noite por 5 dias.", o: "Alternativa / gestante." },
      ]},
      { t: "Tricomoníase", itens: [
        { m: "Metronidazol 400 mg", p: "2 g VO dose única (5 cp) ou 500 mg 12/12 h por 7 dias — paciente e parceiro." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "uretrite", titulo: "Uretrite / cervicite (gonococo e clamídia)", area: "adulto", sistema: "Genitourinário",
    tags: ["ist", "gonorreia", "clamídia", "corrimento uretral"],
    resumo: "Corrimento uretral: tratar gonococo + clamídia juntos; parceiros e sorologias.",
    manejo: [
      "Tratar ambos os agentes empiricamente.",
      "Rastrear HIV, sífilis e hepatites; preservativo e abstinência por 7 dias.",
      "Convocar e tratar parcerias dos últimos 60 dias.",
    ],
    rx: [
      { t: "No PS / receita", itens: [
        { m: "Ceftriaxona 500 mg", p: "500 mg IM dose única." },
        { m: "Azitromicina 500 mg", p: "1 g (2 cp) VO dose única.", o: "Ou doxiciclina 100 mg 12/12 h por 7 dias (clamídia isolada)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "herpes-genital", titulo: "Herpes genital", area: "adulto", sistema: "Genitourinário",
    tags: ["ist", "aciclovir", "úlcera genital"],
    resumo: "Primeiro episódio 7–10 dias; recorrência 5 dias, iniciar nos pródromos.",
    manejo: ["Higiene local, analgesia.", "Rastrear outras ISTs."],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Aciclovir 400 mg", p: "1º episódio: 1 cp VO 8/8 h por 7–10 dias. Recorrência: 1 cp 8/8 h por 5 dias." },
        { m: "Valaciclovir 500 mg", p: "1º episódio: 1 g 12/12 h por 7–10 dias. Recorrência: 500 mg 12/12 h por 3 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "orquiepididimite", titulo: "Orquiepididimite", area: "adulto", sistema: "Genitourinário",
    tags: ["escroto", "dor testicular", "torção"],
    resumo: "Sempre excluir torção (USG doppler). < 35 anos: cobrir IST; > 35: cobrir entéricos.",
    manejo: [
      "Torção: dor súbita, testículo alto/horizontalizado, reflexo cremastérico ausente → cirurgia imediata.",
      "Repouso, suspensório escrotal, gelo e AINE.",
    ],
    rx: [
      { t: "< 35 anos (IST)", itens: [
        { m: "Ceftriaxona 500 mg", p: "500 mg IM dose única." },
        { m: "Doxiciclina 100 mg", p: "1 cp VO 12/12 h por 10 dias." },
      ]},
      { t: "> 35 anos / entéricos", itens: [
        { m: "Levofloxacino 500 mg", p: "1 cp VO 1x/dia por 10 dias." },
      ]},
      { t: "Sintomáticos", itens: [
        { m: "Ibuprofeno 600 mg", p: "1 cp VO 8/8 h por 5 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "sua", titulo: "Sangramento uterino anormal agudo", area: "adulto", sistema: "Genitourinário",
    tags: ["menorragia", "ácido tranexâmico", "sangramento vaginal"],
    resumo: "Beta-HCG, estabilizar, ácido tranexâmico e/ou hormônio; curetagem se instável.",
    manejo: [
      "Excluir gravidez (beta-HCG); Hb e coagulação.",
      "Instável: ressuscitação, tamponamento com sonda de Foley/curetagem.",
      "Estável: antifibrinolítico e/ou progestagênio/ACO em dose alta por curto período.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Ácido tranexâmico 250 mg/5 mL", p: "1 g (20 mL) EV em 10 min; repetir 8/8 h se necessário." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Ácido tranexâmico 250 mg", p: "1,3 g (≈ 5 cp) VO 8/8 h por até 5 dias." },
        { m: "Medroxiprogesterona 10 mg", p: "2 cp VO 8/8 h por 7 dias.", o: "Ou ACO combinado 30 mcg: 1 cp 8/8 h por 7 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
];
