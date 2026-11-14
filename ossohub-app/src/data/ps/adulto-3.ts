import type { Condicao } from "./types";

// Adulto — Analgesia, Osteomuscular, Psiquiatria, Eletrólitos.
export const ADULTO_3: Condicao[] = [
  // ───────────── ANALGESIA ─────────────
  {
    id: "analgesia", titulo: "Analgesia escalonada (dor aguda)", area: "adulto", sistema: "Analgesia",
    tags: ["dor", "opioide", "tramadol", "morfina", "escala da dor", "eva"],
    resumo: "Escolher pela intensidade (EVA): leve = simples ± AINE; moderada = + opioide fraco; forte = opioide forte.",
    manejo: [
      "Medir a dor (EVA 0–10) na chegada e após cada intervenção.",
      "Leve (1–3): analgésico simples ± AINE. Moderada (4–6): + opioide fraco. Forte (7–10): opioide forte EV titulado.",
      "AINE: evitar em DRC, úlcera/HDA, IC descompensada, anticoagulados, gestação no 3º trimestre.",
      "Opioides: antiemético associado; cuidado em idosos, DPOC e com benzodiazepínicos.",
      "Corticoide em dose anti-inflamatória: reservar ao PS (dose única).",
    ],
    rx: [
      { t: "Dor leve", itens: [
        { m: "Dipirona 500 mg/mL — ampola 2 mL", p: "1 g EV diluído em 10 mL AD, até 6/6 h." },
        { m: "Paracetamol 750 mg", p: "1 cp VO até 6/6 h (máx. 4 g/dia; 2–3 g em hepatopatas/etilistas)." },
      ]},
      { t: "Dor moderada", itens: [
        { m: "Cetoprofeno 100 mg", p: "100 mg em 100 mL SF EV em 20 min, até 12/12 h." },
        { m: "Cetorolaco 30 mg/mL", p: "10–30 mg EV/IM, até 8/8 h (máx. 5 dias).", o: "≥ 65 anos ou < 50 kg: 15 mg." },
        { m: "Tramadol 100 mg/2 mL", p: "50–100 mg em 100 mL SF EV em 30 min, até 6/6 h (máx. 400 mg/dia).", o: "Associar antiemético. Evitar com ISRS (síndrome serotoninérgica)." },
      ]},
      { t: "Dor forte", itens: [
        { m: "Morfina 10 mg/mL", p: "1 ampola + 9 mL AD (1 mg/mL): 2–4 mg EV a cada 5–10 min até controle (0,05–0,1 mg/kg).", k: { d: [0.05, 0.1], max: 10, c: 1, f: "mL" } },
        { m: "Fentanil 50 mcg/mL", p: "0,5–1 mcg/kg EV lento; repetir conforme dor.", k: { d: [0.5, 1], u: "mcg", max: 100, c: 50, f: "mL" } },
        { m: "Naloxona 0,4 mg/mL", p: "Ter à mão: 0,04–0,4 mg EV se depressão respiratória." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Dipirona 1 g", p: "1 cp VO 6/6 h se dor, por até 5 dias." },
        { m: "Ibuprofeno 600 mg", p: "1 cp VO 8/8 h após refeição, por 3–5 dias." },
        { m: "Paracetamol 500 mg + codeína 30 mg", p: "1 cp VO 6/6 h se dor forte, por até 3 dias." },
        { m: "Tramadol 50 mg", p: "1 cp VO 8/8 h se dor forte, por até 3 dias.", o: "Receita de controle especial (branca em 2 vias)." },
      ]},
    ],
    fontes: ["PRV", "PSZ"],
  },

  // ───────────── OSTEOMUSCULAR ─────────────
  {
    id: "lombalgia", titulo: "Lombalgia mecânica aguda / torcicolo", area: "adulto", sistema: "Osteomuscular",
    tags: ["dor lombar", "ciatalgia", "relaxante muscular", "coluna", "cervicalgia"],
    resumo: "Excluir bandeiras vermelhas; AINE + relaxante muscular curto + manter-se ativo.",
    manejo: [
      "Bandeiras vermelhas: déficit neurológico progressivo, síndrome da cauda equina (retenção urinária, anestesia em sela), febre, trauma importante, câncer, perda de peso, > 50 anos com dor nova, imunossupressão.",
      "Sem bandeiras: não pedir imagem; orientar retorno às atividades, calor local.",
      "Ciatalgia sem déficit: mesmo tratamento; reavaliar em 4–6 semanas.",
    ],
    alarme: ["Retenção urinária, incontinência ou anestesia em sela → RM e avaliação cirúrgica de urgência."],
    rx: [
      { t: "No PS", itens: [
        { m: "Cetoprofeno 100 mg", p: "100 mg em 100 mL SF EV em 20 min (ou 100 mg IM)." },
        { m: "Dipirona 1 g/2 mL", p: "1 g EV diluída." },
        { m: "Orfenadrina 60 mg/2 mL (Dorflex® inj.)", p: "60 mg IM/EV lento.", o: "Relaxante; evitar em glaucoma/HPB." },
        { m: "Dexametasona 4 mg/mL", p: "10 mg IM/EV dose única (radiculopatia)." },
        { m: "Tramadol 100 mg/2 mL", p: "50–100 mg em 100 mL SF EV se dor forte." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Ibuprofeno 600 mg", p: "1 cp VO 8/8 h após refeição por 5–7 dias." },
        { m: "Ciclobenzaprina 5 mg", p: "1 cp VO à noite por 5–7 dias.", o: "Causa sonolência; evitar idosos." },
        { m: "Dipirona 300 mg + orfenadrina 35 mg + cafeína 50 mg (Dorflex®)", p: "1–2 cp VO 6/6 h se dor por até 5 dias." },
        { m: "Paracetamol 750 mg", p: "1 cp VO 6/6 h se dor." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "gota", titulo: "Crise de gota (artrite gotosa aguda)", area: "adulto", sistema: "Osteomuscular",
    tags: ["gota", "colchicina", "ácido úrico", "podagra"],
    resumo: "Tratar nas primeiras 24 h com AINE, colchicina ou corticoide; não iniciar/suspender alopurinol na crise.",
    manejo: [
      "Excluir artrite séptica (febre, monoartrite grave): artrocentese se dúvida.",
      "Escolha conforme comorbidades: DRC/anticoagulado → corticoide.",
      "Manter alopurinol se já usa; iniciar só após a crise, com profilaxia de colchicina.",
      "Repouso articular, gelo.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Colchicina 0,5 mg", p: "2 cp (1 mg) VO, depois 1 cp (0,5 mg) após 1 h; seguir 0,5 mg 12/12 h até resolver.", o: "Reduzir na DRC; interação com claritromicina/azóis." },
        { m: "Naproxeno 500 mg", p: "1 cp VO 12/12 h por 5–7 dias." },
        { m: "Prednisona 20 mg", p: "30–40 mg VO 1x/dia por 5 dias.", o: "Opção para DRC/contraindicação a AINE." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "fratura-exposta", titulo: "Fratura exposta", area: "adulto", sistema: "Osteomuscular",
    tags: ["ortopedia", "gustilo", "cefazolina", "trauma", "profilaxia tétano"],
    resumo: "ATB nas primeiras 3 h (idealmente < 1 h), profilaxia antitetânica, alinhamento, curativo estéril e cirurgia.",
    manejo: [
      "ATLS: tratar ameaças à vida primeiro; hemostasia por compressão.",
      "Curativo estéril úmido, fotografar a ferida e não reexplorar no PS; alinhar e imobilizar.",
      "Classificação de Gustilo-Anderson (I: < 1 cm; II: 1–10 cm; III: > 10 cm, alta energia/contaminação).",
      "Cefazolina para todos; acrescentar gentamicina em Gustilo III; penicilina/metronidazol se contaminação fecal/rural.",
      "Desbridamento e lavagem cirúrgica precoces; checar pulsos e neurológico antes e depois da imobilização.",
      "Profilaxia antitetânica conforme vacinação (ver Tétano).",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Cefazolina 1 g", p: "2 g EV (3 g se ≥ 120 kg), depois 1–2 g EV 8/8 h por 24–72 h." },
        { m: "Gentamicina 80 mg/2 mL", p: "5 mg/kg EV 1x/dia (Gustilo III).", k: { d: 5, max: 480, c: 40, f: "mL" } },
        { m: "Clindamicina 600 mg/4 mL", p: "900 mg EV 8/8 h.", o: "Alergia grave a betalactâmico." },
        { m: "Penicilina G cristalina 5.000.000 UI", p: "4–5 milhões UI EV 4/4 h.", o: "Contaminação com terra/fezes (anaeróbios/clostrídio)." },
        { m: "Vacina dT / soro ou imunoglobulina antitetânica", p: "Conforme história vacinal (ferimento de alto risco)." },
        { m: "Morfina 10 mg/mL", p: "2–4 mg EV para analgesia (diluída 1 mg/mL)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "contusao", titulo: "Entorse / contusão / trauma de partes moles", area: "adulto", sistema: "Osteomuscular",
    tags: ["entorse", "tornozelo", "ottawa", "ortopedia", "trauma leve"],
    resumo: "Regras de Ottawa para RX; proteção, gelo, compressão, elevação e analgesia.",
    manejo: [
      "Tornozelo/pé: RX se dor em maléolo posterior/ponta, base do 5º metatarso, navicular ou incapaz de dar 4 passos.",
      "Joelho: regra de Ottawa (≥ 55 anos, dor isolada na patela, cabeça da fíbula, flexão < 90°, incapaz de apoiar).",
      "Gelo 15–20 min 3–4x/dia nas primeiras 48–72 h; carga conforme tolerância.",
      "Imobilização curta (órtese/tala) se dor importante; retorno precoce ao movimento.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Ibuprofeno 600 mg", p: "1 cp VO 8/8 h após refeição por 5 dias." },
        { m: "Dipirona 1 g", p: "1 cp VO 6/6 h se dor." },
        { m: "Diclofenaco dietilamônio gel 1%", p: "Aplicar no local 3–4x/dia por 7 dias." },
      ]},
    ],
    fontes: ["PRV"],
  },

  // ───────────── PSIQUIATRIA ─────────────
  {
    id: "agitacao", titulo: "Agitação psicomotora / agressividade", area: "adulto", sistema: "Psiquiatria",
    tags: ["contenção", "haloperidol", "midazolam", "sedação", "surto"],
    resumo: "Abordagem verbal primeiro; tranquilização rápida IM; contenção mecânica como último recurso.",
    manejo: [
      "Segurança da equipe; desescalada verbal; oferecer medicação VO se cooperativo.",
      "Excluir causas orgânicas: hipoglicemia, hipóxia, intoxicação/abstinência, delirium, TCE.",
      "Tranquilização IM: haloperidol + prometazina ou midazolam isolado.",
      "Contenção mecânica com prescrição, monitorização e reavaliação a cada 15–30 min.",
    ],
    rx: [
      { t: "Via oral (cooperativo)", itens: [
        { m: "Risperidona 2 mg", p: "1 cp VO; pode repetir em 1 h." },
        { m: "Haloperidol 5 mg", p: "1 cp VO + lorazepam 2 mg VO." },
      ]},
      { t: "Intramuscular", itens: [
        { m: "Haloperidol 5 mg/mL + prometazina 50 mg/2 mL", p: "Haloperidol 5 mg IM + prometazina 50 mg IM; repetir em 30–60 min se necessário." },
        { m: "Midazolam 15 mg/3 mL", p: "7,5–15 mg IM; repetir em 30 min.", o: "Preferir na intoxicação por estimulante/abstinência." },
        { m: "Olanzapina 10 mg (IM)", p: "10 mg IM.", o: "Não associar com benzodiazepínico parenteral." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "psicose", titulo: "Síndrome psicótica aguda", area: "adulto", sistema: "Psiquiatria",
    tags: ["psicose", "alucinação", "delírio", "antipsicótico"],
    resumo: "Excluir causa orgânica, sedação se agitado e iniciar antipsicótico com encaminhamento.",
    manejo: [
      "1º episódio: exames (glicemia, eletrólitos, função renal/hepática, TSH, toxicológico, sífilis/HIV, TC se sinais focais).",
      "Avaliar risco de suicídio/heteroagressividade; internação se risco.",
    ],
    rx: [
      { t: "Início do tratamento", itens: [
        { m: "Risperidona 1 mg", p: "1 mg VO 12/12 h, aumentar até 2–4 mg/dia." },
        { m: "Haloperidol 5 mg", p: "2,5–5 mg VO 12/12 h." },
        { m: "Biperideno 2 mg", p: "1 cp VO até 12/12 h se sintomas extrapiramidais." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "ansiedade", titulo: "Crise de ansiedade / ataque de pânico", area: "adulto", sistema: "Psiquiatria",
    tags: ["ansiedade", "pânico", "benzodiazepínico"],
    resumo: "Excluir causa orgânica (SCA, TEP, arritmia, hipoglicemia, tireotoxicose); acolher; BZD dose única se necessário.",
    manejo: [
      "Ambiente calmo, técnicas de respiração.",
      "Benzodiazepínico em dose única; evitar prescrição prolongada.",
      "Encaminhar para acompanhamento (ISRS/psicoterapia).",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Clonazepam 0,5 mg", p: "0,5–1 mg sublingual/VO dose única." },
        { m: "Diazepam 10 mg", p: "5–10 mg VO dose única." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "acatisia", titulo: "Acatisia / distonia aguda por medicamento", area: "adulto", sistema: "Psiquiatria",
    tags: ["extrapiramidal", "metoclopramida", "haloperidol", "biperideno", "distonia"],
    resumo: "Após metoclopramida/antipsicótico: anticolinérgico ou anti-histamínico; BZD/propranolol na acatisia.",
    manejo: [
      "Distonia (torcicolo, crise oculógira, trismo): biperideno ou prometazina/difenidramina.",
      "Acatisia (inquietação motora): suspender a droga; BZD ou propranolol.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Biperideno 5 mg/mL (Akineton®)", p: "2,5–5 mg IM/EV lento; pode repetir em 30 min." },
        { m: "Prometazina 50 mg/2 mL", p: "25–50 mg IM." },
        { m: "Diazepam 10 mg/2 mL", p: "5–10 mg EV lento (acatisia)." },
        { m: "Propranolol 40 mg", p: "10–20 mg VO 8/8 h (acatisia persistente)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "abstinencia", titulo: "Síndrome de abstinência alcoólica", area: "adulto", sistema: "Psiquiatria",
    tags: ["álcool", "delirium tremens", "tiamina", "diazepam", "ciwa"],
    resumo: "Tiamina antes da glicose; diazepam guiado por sintomas (CIWA-Ar); DT é emergência.",
    manejo: [
      "Sintomas 6–24 h após última dose; convulsões 12–48 h; delirium tremens 48–96 h.",
      "Escala CIWA-Ar: ≥ 10 trata com BZD; ≥ 20 grave.",
      "Hepatopatia grave/idoso: lorazepam (não depende do fígado).",
      "Hidratação, eletrólitos (Mg, K, P), complexo B.",
    ],
    rx: [
      { t: "No PS / internação", itens: [
        { m: "Tiamina 100 mg/mL", p: "100–300 mg EV/IM 1x/dia por 3–5 dias (antes da glicose); Wernicke: 500 mg EV 8/8 h." },
        { m: "Diazepam 10 mg", p: "10–20 mg VO de 1/1 h se CIWA ≥ 10 (máx. ~60 mg/6 h) — ou 10 mg EV lento a cada 5–10 min no DT." },
        { m: "Lorazepam 2 mg", p: "1–2 mg VO de 1/1–2/2 h se CIWA ≥ 10.", o: "Hepatopatas/idosos." },
        { m: "Soro glicosado 5% + polivitamínico", p: "1.000 mL EV 8/8–12/12 h após tiamina." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "intox-alcool", titulo: "Intoxicação alcoólica aguda", area: "adulto", sistema: "Toxicologia",
    tags: ["álcool", "embriaguez", "glicose", "tiamina"],
    resumo: "Suporte, proteção de via aérea, glicemia e tiamina; observar até recuperar consciência.",
    manejo: [
      "Glicemia capilar; procurar TCE e outras intoxicações.",
      "Decúbito lateral; não há antídoto.",
      "Agitado: haloperidol (evitar BZD que somam depressão respiratória).",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Tiamina 100 mg/mL", p: "100 mg EV/IM." },
        { m: "Soro fisiológico 0,9%", p: "500–1.000 mL EV se desidratação/hipotensão." },
        { m: "Glicose 50%", p: "40–60 mL EV se glicemia < 70 (após tiamina)." },
        { m: "Ondansetrona 4 mg/2 mL", p: "4–8 mg EV se vômitos." },
      ]},
    ],
    fontes: ["PSZ"],
  },

  // ───────────── ELETRÓLITOS ─────────────
  {
    id: "hipercalemia", titulo: "Hipercalemia", area: "adulto", sistema: "Eletrólitos",
    tags: ["potássio", "gluconato de cálcio", "insulina", "polarizante"],
    resumo: "ECG alterado ou K ≥ 6,5: cálcio (estabiliza membrana), insulina + glicose e beta-2 (shift), depois eliminar K.",
    manejo: [
      "ECG imediato (T apiculada, QRS largo, perda de P, sinusoidal).",
      "1) Estabilizar: gluconato de cálcio. 2) Deslocar para a célula: insulina + glicose, beta-2, bicarbonato se acidose. 3) Eliminar: furosemida, resina/patiromer, diálise.",
      "Dosar glicemia de 1/1 h por 4–6 h após a insulina.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Gluconato de cálcio 10% (10 mL)", p: "10–30 mL EV em 5–10 min; repetir se ECG persistir alterado.", o: "Em digitalizados, infundir em 20–30 min." },
        { m: "Insulina regular + glicose 50%", p: "10 UI de insulina regular + 100 mL de glicose 50% EV em 15–30 min (omitir glicose se glicemia > 250)." },
        { m: "Fenoterol 5 mg/mL (Berotec®)", p: "10–20 gotas em 5 mL SF por nebulização." },
        { m: "Bicarbonato de sódio 8,4%", p: "50–100 mEq EV se acidose metabólica." },
        { m: "Furosemida 20 mg/2 mL", p: "40–80 mg EV se diurese e volemia preservadas." },
        { m: "Poliestirenossulfonato de cálcio (Sorcal®) 30 g", p: "30 g VO em 100 mL de água 8/8 h." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "hipocalemia", titulo: "Hipocalemia", area: "adulto", sistema: "Eletrólitos",
    tags: ["potássio", "kcl", "reposição"],
    resumo: "K < 3,5: VO se leve; EV se < 2,5, sintomas ou ECG alterado. Repor magnésio junto.",
    manejo: [
      "EV periférico: máx. 10 mEq/h e concentração ≤ 40 mEq/L (central até 20 mEq/h com monitor).",
      "Cada 10 mEq repostos elevam ~0,1 mEq/L (estimativa grosseira).",
      "Hipomagnesemia impede a correção — repor Mg.",
    ],
    rx: [
      { t: "Endovenosa", itens: [
        { m: "Cloreto de potássio 19,1% (2,5 mEq/mL)", p: "12 mL (30 mEq) em 1.000 mL de SF 0,9% EV a 250–330 mL/h (≈ 10 mEq/h)." },
        { m: "Sulfato de magnésio 10%", p: "2 g EV em 1 h se Mg baixo." },
      ]},
      { t: "Oral", itens: [
        { m: "Cloreto de potássio xarope 6% (12 mL = 10 mEq)", p: "15 mL VO 8/8 h diluídos em água/suco após refeição." },
        { m: "Cloreto de potássio 600 mg (8 mEq)", p: "1–2 cp VO 8/8 h após refeição." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "hiponatremia", titulo: "Hiponatremia", area: "adulto", sistema: "Eletrólitos",
    tags: ["sódio", "salina 3%", "mielinólise"],
    resumo: "Sintomas graves (convulsão, coma): salina 3% em bolus. Corrigir no máximo 8–10 mEq/L em 24 h.",
    manejo: [
      "Classificar: tonicidade, volemia, osmolaridade urinária e Na urinário.",
      "Graves: NaCl 3% 100–150 mL em 10–20 min, até 3x, alvo +4–6 mEq/L.",
      "Moderada/crônica: tratar causa (restrição hídrica no SIADH, SF na hipovolemia).",
      "Limite: ≤ 8 mEq/L/24 h em alto risco de desmielinização (etilismo, desnutrição, hipocalemia).",
      "Use a calculadora de sódio (Adrogué-Madias) na aba Calculadoras.",
    ],
    rx: [
      { t: "Sintomática grave", itens: [
        { m: "NaCl 3% (preparo: 890 mL SF 0,9% + 110 mL NaCl 20%)", p: "100–150 mL EV em 10–20 min; repetir até 3x, dosando Na a cada bolus." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "hipernatremia", titulo: "Hipernatremia", area: "adulto", sistema: "Eletrólitos",
    tags: ["sódio", "déficit de água livre", "desidratação"],
    resumo: "Repor água livre calculada; reduzir no máximo 10–12 mEq/L em 24 h.",
    manejo: [
      "Instabilidade: primeiro SF 0,9% até estabilizar.",
      "Déficit de água livre = ACT × (Na/140 − 1) — ver calculadora.",
      "Preferir VO/SNG água livre; EV com SG 5% ou NaCl 0,45%.",
    ],
    rx: [
      { t: "Reposição", itens: [
        { m: "Soro glicosado 5%", p: "Volume = déficit de água livre + perdas, infundido em 48 h." },
        { m: "Água livre via oral/SNG", p: "200 mL 4/4 h (ajustar pelo déficit)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "calcio-mg", titulo: "Hipocalcemia, hipercalcemia e magnésio", area: "adulto", sistema: "Eletrólitos",
    tags: ["cálcio", "magnésio", "pamidronato", "zoledronato"],
    resumo: "Hipocalcemia sintomática: gluconato EV. Hipercalcemia: hidratação + bisfosfonato. Mg: sulfato EV.",
    manejo: [
      "Corrigir cálcio pela albumina: Ca + 0,8 × (4 − albumina).",
      "Hipocalcemia: sempre checar Mg.",
      "Hipercalcemia grave (> 14 ou sintomas): SF vigoroso, calcitonina e bisfosfonato; furosemida só após volemia.",
      "Hipermagnesemia sintomática: gluconato de cálcio, suspender Mg, diurético/diálise.",
    ],
    rx: [
      { t: "Hipocalcemia", itens: [
        { m: "Gluconato de cálcio 10%", p: "10–20 mL em 100 mL SG 5% EV em 10–20 min; manter 0,5–1,5 mg/kg/h de cálcio elementar." },
        { m: "Carbonato de cálcio 1.250 mg (500 mg Ca)", p: "1–2 cp VO 8/8 h (leve)." },
      ]},
      { t: "Hipercalcemia", itens: [
        { m: "Soro fisiológico 0,9%", p: "200–300 mL/h EV, alvo diurese 100–150 mL/h." },
        { m: "Ácido zoledrônico 4 mg", p: "4 mg EV em 100 mL SF em 15 min.", o: "Ou pamidronato 60–90 mg EV em 2–4 h." },
        { m: "Calcitonina 100 UI", p: "4 UI/kg SC/IM 12/12 h por 48 h." },
      ]},
      { t: "Hipomagnesemia", itens: [
        { m: "Sulfato de magnésio 10% (1 g/10 mL)", p: "1–2 g EV em 1 h (grave/arritmia: 2 g em 10–15 min)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
];
