import type { Condicao } from "./types";

// Adulto — Cardiovascular, Neurologia, Respiratório e Otorrino.
export const ADULTO_1: Condicao[] = [
  // ───────────── CARDIOVASCULAR ─────────────
  {
    id: "tsv", titulo: "Taquicardia supraventricular (TRN/TAV)", area: "adulto", sistema: "Cardiovascular",
    tags: ["arritmia", "adenosina", "tsv"],
    resumo: "Taquicardia regular de QRS estreito. Instável → cardioversão; estável → vagal e adenosina.",
    manejo: [
      "Monitor, acesso venoso calibroso (de preferência antecubital), ECG de 12 derivações.",
      "Instabilidade (hipotensão, dor torácica, rebaixamento, congestão): cardioversão elétrica sincronizada 50–100 J com sedação.",
      "Estável: manobra vagal modificada (Valsalva com elevação das pernas) antes de qualquer droga.",
      "Adenosina em bolus rápido, seguida de flush de 20 mL de SF e elevação do braço.",
      "Sem resposta: betabloqueador ou bloqueador de canal de cálcio EV; pensar em flutter/FA se o ritmo aparecer após a adenosina.",
    ],
    alarme: ["Asma grave e pré-excitação com FA (Wolff-Parkinson-White): evitar adenosina/BCC.", "Avisar o paciente da sensação transitória de mal-estar com a adenosina."],
    rx: [
      { t: "No PS", itens: [
        { m: "Adenosina 6 mg/2 mL", p: "6 mg EV em bolus rápido + flush 20 mL SF. Sem reversão em 1–2 min: 12 mg EV; pode repetir 12 mg uma vez." },
        { m: "Metoprolol 5 mg/5 mL", p: "5 mg EV lento em 2–5 min; repetir a cada 5 min até 15 mg.", o: "Alternativa se adenosina falhar." },
        { m: "Verapamil 5 mg/2 mL", p: "5 mg EV em 2–5 min; se necessário, 10 mg após 15–30 min.", o: "Evitar em IC com FE reduzida e hipotensão." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "tv", titulo: "Taquicardia ventricular com pulso", area: "adulto", sistema: "Cardiovascular",
    tags: ["arritmia", "amiodarona", "qrs largo"],
    resumo: "QRS largo e regular: tratar como TV até prova em contrário.",
    manejo: [
      "Instável: cardioversão sincronizada (100 J monofásico/bifásico, escalonar).",
      "Sem pulso: protocolo de PCR (desfibrilação).",
      "Estável: amiodarona EV em ataque e manutenção; corrigir K e Mg.",
      "Procurar isquemia e distúrbio eletrolítico; ECG pós-reversão.",
    ],
    rx: [
      { t: "No PS — ataque", itens: [
        { m: "Amiodarona 150 mg/3 mL", p: "150 mg (1 ampola) diluída em 100 mL de SG 5% EV em 10 min; pode repetir uma vez.", o: "Diluir sempre em SG 5%." },
      ]},
      { t: "Manutenção (24 h)", itens: [
        { m: "Amiodarona 150 mg/3 mL — 6 ampolas (900 mg)", p: "6 ampolas em 500 mL de SG 5% em BIC: 1 mg/min (≈ 33 mL/h) por 6 h, depois 0,5 mg/min (≈ 17 mL/h) por 18 h." },
        { m: "Sulfato de magnésio 10% (1 g/10 mL)", p: "2 g EV em 10–20 min se hipomagnesemia ou torsades de pointes." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "fa", titulo: "Fibrilação atrial / flutter com alta resposta", area: "adulto", sistema: "Cardiovascular",
    tags: ["arritmia", "anticoagulação", "cha2ds2-vasc", "controle de frequência"],
    resumo: "Controlar frequência, decidir ritmo (tempo < 48 h) e anticoagular conforme CHA₂DS₂-VASc.",
    manejo: [
      "Instável: cardioversão elétrica sincronizada (FA 120–200 J; flutter 50–100 J).",
      "Estável: controle de frequência com betabloqueador, BCC (sem IC) ou digital/amiodarona (com IC).",
      "Cardioversão química/elétrica eletiva só se início < 48 h ou após ECO transesofágico/3 semanas de anticoagulação.",
      "Calcular CHA₂DS₂-VASc (≥ 2 homens / ≥ 3 mulheres → anticoagular) e HAS-BLED.",
      "Investigar gatilhos: infecção, tireoide, álcool, isquemia, distúrbio eletrolítico.",
    ],
    rx: [
      { t: "Controle de frequência (PS)", itens: [
        { m: "Metoprolol 5 mg/5 mL", p: "5 mg EV em 2–5 min; repetir a cada 5 min até 15 mg." },
        { m: "Deslanosídeo 0,4 mg/2 mL", p: "0,4 mg EV em bolus; pode repetir até 1,6 mg/24 h.", o: "Preferir na IC com FE reduzida/hipotensão limítrofe." },
        { m: "Amiodarona 150 mg/3 mL", p: "300 mg em 250 mL de SG 5% EV em 1 h, seguida de 900 mg/24 h em BIC.", o: "Controle de ritmo/frequência em cardiopatas." },
      ]},
      { t: "Anticoagulação oral (alta)", itens: [
        { m: "Rivaroxabana 20 mg", p: "1 cp VO 1x/dia com refeição.", o: "ClCr 15–50 mL/min: 15 mg/dia." },
        { m: "Apixabana 5 mg", p: "1 cp VO 12/12 h.", o: "2,5 mg 12/12 h se 2 de: ≥ 80 anos, ≤ 60 kg, Cr ≥ 1,5." },
        { m: "Dabigatrana 150 mg", p: "1 cp VO 12/12 h.", o: "110 mg 12/12 h se ≥ 80 anos ou alto risco de sangramento; evitar ClCr < 30." },
        { m: "Edoxabana 60 mg", p: "1 cp VO 1x/dia.", o: "30 mg se ClCr 15–50, peso ≤ 60 kg ou inibidor de P-gp." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "bradi", titulo: "Bradiarritmia sintomática", area: "adulto", sistema: "Cardiovascular",
    tags: ["bav", "atropina", "marcapasso", "bradicardia"],
    resumo: "FC < 50 com sinais de má perfusão: atropina e, se falhar, droga cronotrópica ou marcapasso.",
    manejo: [
      "Monitor, O₂ se SpO₂ < 94%, acesso venoso, ECG de 12 derivações.",
      "Atropina é a 1ª linha (pouco eficaz em BAV de 2º grau Mobitz II e BAV total).",
      "Sem resposta: dopamina ou adrenalina em BIC e/ou marcapasso transcutâneo, ponte para transvenoso.",
      "Rever drogas (betabloqueador, BCC, digital), hipercalemia e isquemia inferior.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Atropina 0,5 mg/mL (ampola 1 mL)", p: "1 mg EV em bolus; repetir a cada 3–5 min até 3 mg." },
        { m: "Dopamina 50 mg/10 mL", p: "5 ampolas (250 mg) em 200 mL de SG 5% (1 mg/mL) em BIC: 5–20 mcg/kg/min." },
        { m: "Adrenalina 1 mg/mL", p: "4 ampolas em 246 mL de SG 5% (16 mcg/mL) em BIC: 2–10 mcg/min." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "iam-supra", titulo: "IAM com supradesnivelamento de ST", area: "adulto", sistema: "Cardiovascular",
    tags: ["sca", "iamcsst", "trombólise", "angioplastia", "dor torácica"],
    resumo: "Reperfusão é a prioridade: angioplastia em até 120 min ou trombólise em até 30 min da chegada.",
    manejo: [
      "ECG em até 10 min da chegada; monitor, acesso, troponina (não atrasar reperfusão).",
      "Dupla antiagregação + anticoagulação + estatina de alta potência.",
      "Angioplastia primária se disponível em < 120 min; senão trombolítico (sem contraindicações) e transferência.",
      "O₂ apenas se SpO₂ < 90%. Nitrato só sem hipotensão, IAM de VD ou uso de inibidor de PDE-5.",
      "Morfina com parcimônia, só para dor refratária.",
    ],
    alarme: ["IAM de parede inferior: pesquisar VD (V3R/V4R) — evitar nitrato e diurético.", "Contraindicações absolutas à trombólise: AVCh prévio, AVCi < 3 meses, neoplasia intracraniana, sangramento ativo, dissecção de aorta."],
    rx: [
      { t: "Angioplastia primária", itens: [
        { m: "AAS 100 mg", p: "300 mg (3 cp) VO mastigados, dose única; depois 100 mg/dia." },
        { m: "Ticagrelor 90 mg", p: "180 mg (2 cp) VO de ataque; depois 90 mg 12/12 h.", o: "Alternativa: prasugrel 60 mg (evitar se AVC prévio, ≥ 75 anos, < 60 kg) ou clopidogrel 600 mg." },
        { m: "Heparina não fracionada 5.000 UI/mL", p: "70–100 UI/kg EV em bolus na sala de hemodinâmica." },
        { m: "Atorvastatina 40/80 mg", p: "80 mg VO 1x/dia." },
      ]},
      { t: "Trombólise", itens: [
        { m: "AAS 100 mg", p: "300 mg VO mastigados." },
        { m: "Clopidogrel 75 mg", p: "300 mg (4 cp) VO; se > 75 anos, apenas 75 mg." },
        { m: "Enoxaparina", p: "< 75 anos: 30 mg EV em bolus + 1 mg/kg SC 12/12 h (1ª dose 15 min após). ≥ 75 anos: sem bolus, 0,75 mg/kg SC 12/12 h.", o: "ClCr < 30: 1 mg/kg 1x/dia." },
        { m: "Alteplase 50 mg (1 mg/mL)", p: "15 mg EV em bolus; 0,75 mg/kg em 30 min (máx. 50 mg); 0,5 mg/kg em 60 min (máx. 35 mg). Máximo total 100 mg.", o: "Alternativa: tenecteplase dose única por peso." },
        { m: "Atorvastatina 80 mg", p: "1 cp VO 1x/dia." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "sca-ssst", titulo: "SCA sem supra de ST (IAMSSST / angina instável)", area: "adulto", sistema: "Cardiovascular",
    tags: ["sca", "dor torácica", "heart", "troponina"],
    resumo: "Estratificar risco (HEART/GRACE), antiagregar, anticoagular e definir estratégia invasiva.",
    manejo: [
      "ECG seriado e troponina (0/1–3 h conforme o ensaio).",
      "AAS + 2º antiagregante, anticoagulante (enoxaparina), estatina, nitrato se dor e betabloqueador sem sinais de IC.",
      "Muito alto risco (instabilidade, arritmia, dor refratária): cateterismo < 2 h; alto risco: < 24 h.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "AAS 100 mg", p: "300 mg VO mastigados; manter 100 mg/dia." },
        { m: "Clopidogrel 75 mg", p: "300–600 mg VO de ataque; manter 75 mg/dia.", o: "Ou ticagrelor 180 mg → 90 mg 12/12 h." },
        { m: "Enoxaparina 60 mg/0,6 mL", p: "1 mg/kg SC 12/12 h.", o: "≥ 75 anos: 0,75 mg/kg; ClCr < 30: 1 mg/kg 1x/dia." },
        { m: "Mononitrato de isossorbida 5 mg (Isordil®)", p: "5 mg sublingual se dor; repetir até 3x com intervalo de 5 min.", o: "Contraindicado se PAS < 90, IAM de VD ou PDE-5 < 24–48 h." },
        { m: "Nitroglicerina 50 mg/10 mL (Tridil®)", p: "50 mg em 240 mL de SF (200 mcg/mL) em BIC: iniciar 5 mL/h e titular pela dor e PA." },
        { m: "Atorvastatina 80 mg", p: "1 cp VO 1x/dia." },
        { m: "Metoprolol (oral)", p: "25–50 mg VO 12/12 h nas primeiras 24 h se sem IC/choque/BAV." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "eap", titulo: "Edema agudo de pulmão / IC descompensada", area: "adulto", sistema: "Cardiovascular",
    tags: ["icad", "congestão", "perfil b", "furosemida", "vni"],
    resumo: "Perfil quente-úmido (B): vasodilatador + diurético + VNI. Frio-úmido (C): inotrópico.",
    manejo: [
      "Cabeceira elevada, O₂/VNI (CPAP/BiPAP) precoce se desconforto ou SpO₂ < 90%.",
      "Hipertenso: nitrato SL e nitroglicerina/nitroprussiato EV — é o principal tratamento do EAP hipertensivo.",
      "Furosemida EV: virgem de diurético 0,5–1 mg/kg; usuário crônico, dose EV ≥ dose oral diária (40 mg VO ≈ 20 mg EV).",
      "Perfil C (hipoperfusão): dobutamina; se PAS < 90, associar noradrenalina.",
      "Buscar fator de descompensação: isquemia, arritmia, infecção, má adesão, sal.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Mononitrato de isossorbida 5 mg", p: "5 mg SL; repetir a cada 5 min até 3 doses se PAS > 100." },
        { m: "Furosemida 20 mg/2 mL", p: "40–80 mg EV (0,5–1 mg/kg) em bolus; reavaliar diurese em 2 h e dobrar se < 100–150 mL/h.", k: { d: [0.5, 1], max: 80, c: 10, f: "mL" } },
        { m: "Nitroglicerina 50 mg/10 mL (Tridil®)", p: "50 mg em 240 mL de SF (200 mcg/mL) em BIC: iniciar 3–5 mL/h, subir 3–6 mL/h a cada 5–10 min conforme PA." },
        { m: "Nitroprussiato 50 mg/2 mL (Nipride®)", p: "50 mg em 248 mL de SF (200 mcg/mL), protegido da luz, em BIC: 0,25–0,5 mcg/kg/min até máx. 10 mcg/kg/min.", o: "Opção para EAP hipertensivo grave." },
      ]},
      { t: "Hipoperfusão (perfil C)", itens: [
        { m: "Dobutamina 250 mg/20 mL", p: "4 ampolas (1.000 mg) em 170 mL de SF (4 mg/mL) em BIC: 2,5–20 mcg/kg/min." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "has-emerg", titulo: "Emergência hipertensiva", area: "adulto", sistema: "Cardiovascular",
    tags: ["crise hipertensiva", "nipride", "lesão de órgão-alvo"],
    resumo: "PA elevada com lesão aguda de órgão-alvo: anti-hipertensivo EV titulável em UTI/sala vermelha.",
    manejo: [
      "Confirmar lesão de órgão-alvo: encefalopatia, AVC, SCA, EAP, dissecção, eclâmpsia, LRA.",
      "Reduzir no máximo 20–25% da PAM na 1ª hora, depois até 160/100 em 2–6 h (exceto dissecção e AVC).",
      "Droga de escolha geral: nitroprussiato; SCA/EAP: nitroglicerina; dissecção: betabloqueador primeiro.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Nitroprussiato 50 mg/2 mL (Nipride®)", p: "50 mg em 248 mL de SF (200 mcg/mL) em BIC protegido da luz: iniciar 0,25–0,5 mcg/kg/min; máx. 10 mcg/kg/min." },
        { m: "Nitroglicerina 50 mg/10 mL", p: "50 mg em 240 mL SG 5% em BIC: 5–20 mcg/min, aumentar até 200–400 mcg/min." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "has-urg", titulo: "Urgência hipertensiva / PA elevada sem lesão", area: "adulto", sistema: "Cardiovascular",
    tags: ["crise hipertensiva", "pseudocrise", "captopril"],
    resumo: "Sem lesão de órgão-alvo: reduzir PA em 24–48 h por via oral; tratar dor e ansiedade (pseudocrise).",
    manejo: [
      "Repouso em ambiente calmo e reaferição após 30 min.",
      "Tratar causas de pseudocrise: dor, ansiedade, retenção urinária.",
      "Reiniciar/ajustar medicação de uso contínuo; não usar nifedipino sublingual.",
      "Encaminhar para ajuste ambulatorial em até 7 dias.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Captopril 25 mg", p: "25 mg VO; pode repetir em 1 h (máx. 50–100 mg).", o: "Evitar se estenose bilateral de renal, gestação, hipercalemia." },
        { m: "Clonidina 0,1/0,15 mg", p: "0,1–0,2 mg VO; pode repetir 0,1 mg/h (máx. 0,6 mg)." },
        { m: "Anlodipino 5 mg", p: "5 mg VO 1x/dia (início do tratamento contínuo)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "dissec", titulo: "Dissecção aguda de aorta", area: "adulto", sistema: "Cardiovascular",
    tags: ["aorta", "esmolol", "dor torácica"],
    resumo: "Dor torácica lancinante: FC < 60 e PAS 100–120 em 20 min; betabloqueador antes do vasodilatador.",
    manejo: [
      "Angio-TC de aorta; tipo A (ascendente) é cirúrgica de urgência.",
      "Analgesia com opioide.",
      "Betabloqueador EV primeiro (evita taquicardia reflexa); depois nitroprussiato se PA ainda alta.",
      "Nunca trombolisar/anticoagular na suspeita.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Metoprolol 5 mg/5 mL", p: "5 mg EV em 5 min; repetir a cada 5 min até 15 mg; manter 5 mg a cada 4–6 h." },
        { m: "Esmolol 2.500 mg/250 mL", p: "Ataque 500 mcg/kg em 1 min; manutenção 50–200 mcg/kg/min.", o: "Se disponível — meia-vida curta." },
        { m: "Morfina 10 mg/mL", p: "1 ampola + 9 mL AD (1 mg/mL): 2–4 mL EV; repetir conforme dor." },
        { m: "Nitroprussiato 50 mg/2 mL", p: "Após betabloqueio: 0,25–10 mcg/kg/min em BIC." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "tep-tvp", titulo: "TVP / Tromboembolismo pulmonar", area: "adulto", sistema: "Cardiovascular",
    tags: ["tep", "tvp", "wells", "anticoagulação", "trombólise"],
    resumo: "Wells + D-dímero/imagem; anticoagular; trombolisar TEP com choque.",
    manejo: [
      "Probabilidade clínica (Wells/Genebra); D-dímero se baixa probabilidade; angio-TC ou doppler.",
      "Alta suspeita: iniciar anticoagulação antes da confirmação se sem contraindicação.",
      "TEP com instabilidade (PAS < 90 por 15 min): trombólise sistêmica.",
      "HNF se candidato a trombólise/procedimento ou ClCr < 30.",
    ],
    rx: [
      { t: "Anticoagulação", itens: [
        { m: "Enoxaparina 40 mg/0,4 mL", p: "1 mg/kg SC 12/12 h.", o: "ClCr < 30: 1 mg/kg 1x/dia ou trocar por HNF." },
        { m: "Heparina não fracionada 25.000 UI/5 mL", p: "25.000 UI em 245 mL de SF (100 UI/mL): ataque 80 UI/kg EV; manutenção 18 UI/kg/h em BIC, ajustar pelo TTPa." },
        { m: "Rivaroxabana 15 mg", p: "15 mg VO 12/12 h por 21 dias; depois 20 mg 1x/dia por ≥ 3 meses.", o: "Opção oral para TVP/TEP estável." },
      ]},
      { t: "TEP maciço — trombólise", itens: [
        { m: "Alteplase 50 mg/50 mL", p: "100 mg EV em 2 h (suspender HNF durante a infusão)." },
        { m: "Estreptoquinase 250.000 UI", p: "250.000 UI EV em 30 min, depois 100.000 UI/h por 24 h — ou 1.500.000 UI em 2 h." },
      ]},
    ],
    fontes: ["PSZ"],
  },

  // ───────────── NEUROLOGIA ─────────────
  {
    id: "cefaleia-tensional", titulo: "Cefaleia tipo tensional", area: "adulto", sistema: "Neurologia",
    tags: ["cefaleia", "dor de cabeça"],
    resumo: "Dor em aperto, bilateral, leve a moderada, sem náuseas importantes: analgésico simples ou AINE.",
    manejo: [
      "Excluir sinais de alarme (SNOOP): início súbito, febre, déficit, > 50 anos com cefaleia nova, papiledema, imunossupressão.",
      "Analgésico simples ou AINE; evitar opioide.",
      "Orientar uso limitado de analgésicos (< 10 dias/mês) para não gerar cefaleia por abuso.",
    ],
    alarme: ["Pior cefaleia da vida / thunderclap → TC de crânio (HSA).", "Febre + rigidez de nuca → meningite."],
    rx: [
      { t: "No PS", itens: [
        { m: "Dipirona 500 mg/mL — ampola 2 mL", p: "1 g EV diluída em 10 mL de AD, lento." },
        { m: "Cetoprofeno 100 mg (Profenid®)", p: "100 mg em 100 mL de SF EV em 20 min." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Dipirona 1 g", p: "1 cp VO de 6/6 h se dor, por até 3 dias." },
        { m: "Ibuprofeno 400 mg", p: "1 cp VO de 8/8 h após refeição, por até 3 dias." },
        { m: "Paracetamol 750 mg", p: "1 cp VO de 6/6 h se dor (máx. 4 g/dia)." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "enxaqueca", titulo: "Enxaqueca (migrânea) — crise", area: "adulto", sistema: "Neurologia",
    tags: ["cefaleia", "migranea", "triptano", "clorpromazina"],
    resumo: "Analgesia escalonada + antiemético; refratária: clorpromazina; prevenir recorrência com dexametasona.",
    manejo: [
      "Ambiente escuro e silencioso, hidratação.",
      "1ª linha: dipirona/AINE EV + metoclopramida (efeito antimigranoso próprio).",
      "Sem uso de triptano nas últimas 24 h: sumatriptano SC (evitar em coronariopatia e HAS não controlada).",
      "Refratária: clorpromazina EV lenta com hidratação (risco de hipotensão) ou IM.",
      "Dexametasona EV reduz recorrência em 72 h.",
    ],
    rx: [
      { t: "No PS — 1ª linha", itens: [
        { m: "Dipirona 500 mg/mL — ampola 2 mL", p: "1–2 g EV diluídos em 10 mL AD." },
        { m: "Cetoprofeno 100 mg", p: "100 mg em 100 mL SF EV em 20 min." },
        { m: "Metoclopramida 10 mg/2 mL", p: "10 mg EV lento.", o: "Risco de acatisia/distonia — ver Acatisia." },
      ]},
      { t: "Refratária", itens: [
        { m: "Clorpromazina 25 mg/5 mL", p: "0,1 mg/kg EV em 3 min após 500 mL de SF; repetir a cada 15 min até 3 doses. Ou 25 mg IM.", k: { d: 0.1, max: 25, c: 5, f: "mL" } },
        { m: "Sumatriptano 6 mg/0,5 mL", p: "6 mg SC; pode repetir após 1–2 h (máx. 12 mg/dia)." },
        { m: "Dexametasona 4 mg/mL", p: "10 mg (2,5 mL) EV — reduz recorrência." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Naproxeno 500 mg", p: "1 cp VO de 12/12 h por 3–5 dias." },
        { m: "Sumatriptano + naproxeno 50/500 mg (Sumaxpro®)", p: "1 cp VO no início da crise; repetir após 2 h se necessário (máx. 2 cp/dia)." },
        { m: "Rizatriptano 10 mg", p: "1 cp VO na crise; repetir após 2 h (máx. 20 mg/dia)." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "vertigem", titulo: "Vertigem periférica (VPPB / neurite vestibular)", area: "adulto", sistema: "Neurologia",
    tags: ["tontura", "labirintite", "dramin", "hints"],
    resumo: "Diferenciar periférica de central (HINTS); sintomático por curto período; manobra de Epley na VPPB.",
    manejo: [
      "Exame neurológico e HINTS (head impulse, nistagmo, skew). Qualquer achado central → imagem.",
      "VPPB: Dix-Hallpike e manobra de reposicionamento (Epley); medicação só para náusea.",
      "Neurite vestibular: sintomáticos por até 3 dias; corticoide pode ajudar se < 72 h.",
      "Evitar uso prolongado de supressores vestibulares (atrasa compensação).",
    ],
    alarme: ["Cefaleia occipital, ataxia de tronco, diplopia, disartria ou fatores de risco vascular → AVC de fossa posterior."],
    rx: [
      { t: "No PS", itens: [
        { m: "Dimenidrato + piridoxina (Dramin B6®) 50 mg/10 mL", p: "1 ampola diluída em 100 mL SF EV; até 6/6 h." },
        { m: "Metoclopramida 10 mg/2 mL", p: "10 mg EV se náuseas." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Dimenidrato + piridoxina 50/10 mg", p: "1 cp VO de 6/6 h se tontura, por até 3 dias (máx. 400 mg/dia)." },
        { m: "Meclizina 25/50 mg", p: "25–50 mg VO 1x/dia por até 5 dias." },
        { m: "Cinarizina 25 mg", p: "1 cp VO de 8/8 h por curto período.", o: "Evitar em idosos (parkinsonismo)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "avc", titulo: "AVC isquêmico — trombólise", area: "adulto", sistema: "Neurologia",
    tags: ["avc", "alteplase", "nihss", "trombólise"],
    resumo: "Déficit focal súbito: TC sem contraste e trombólise até 4,5 h se sem contraindicações.",
    manejo: [
      "Hora do último momento visto bem; glicemia capilar imediata; NIHSS.",
      "TC de crânio sem contraste (excluir hemorragia); angio-TC se candidato a trombectomia (até 24 h).",
      "PA < 185/110 para trombolisar; manter < 180/105 por 24 h após.",
      "Sem trombólise: AAS em 24–48 h e permitir PA até 220/120.",
      "Sem antiagregante/anticoagulante nas 24 h pós-trombólise.",
    ],
    alarme: ["Piora neurológica, cefaleia intensa ou vômitos durante a infusão: parar o trombolítico e repetir TC."],
    rx: [
      { t: "Trombólise", itens: [
        { m: "Alteplase 50 mg/50 mL", p: "0,9 mg/kg (máx. 90 mg): 10% em bolus EV em 1 min, restante em 60 min.", k: { d: 0.9, max: 90, c: 1, f: "mL" } },
      ]},
      { t: "Sem trombólise", itens: [
        { m: "AAS 100 mg", p: "300 mg VO na 1ª dose (após excluir hemorragia); depois 100 mg/dia." },
        { m: "Atorvastatina 40/80 mg", p: "40–80 mg VO 1x/dia." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "convulsao", titulo: "Crise convulsiva / estado de mal epiléptico", area: "adulto", sistema: "Neurologia",
    tags: ["epilepsia", "diazepam", "fenitoína", "status"],
    resumo: "Crise > 5 min ou crises sem recuperação: benzodiazepínico → fenitoína/fenobarbital → anestésico em UTI.",
    manejo: [
      "0–5 min: ABC, decúbito lateral, O₂, glicemia capilar (se < 70: tiamina 100 mg + glicose 50%).",
      "5–20 min: benzodiazepínico (diazepam EV ou midazolam IM se sem acesso); pode repetir 1x.",
      "20–40 min: fenitoína 20 mg/kg (ou fenobarbital 15–20 mg/kg).",
      "> 40 min (refratário): IOT e midazolam/propofol/tiopental em BIC, com EEG.",
      "Investigar causa: abstinência, metabólica, infecção, lesão estrutural, intoxicação.",
    ],
    rx: [
      { t: "1ª linha", itens: [
        { m: "Diazepam 10 mg/2 mL", p: "10 mg EV lento, sem diluir (0,15–0,2 mg/kg); repetir 1x em 5 min.", k: { d: 0.2, max: 10, c: 5, f: "mL" } },
        { m: "Midazolam 15 mg/3 mL", p: "10 mg IM (se > 40 kg) quando não houver acesso venoso." },
      ]},
      { t: "2ª linha", itens: [
        { m: "Fenitoína 250 mg/5 mL", p: "20 mg/kg em SF 0,9% (nunca SG), velocidade ≤ 50 mg/min; manutenção 100 mg EV 8/8 h.", k: { d: 20, max: 1500, c: 50, f: "mL" }, o: "Monitorar ECG e PA (arritmia/hipotensão)." },
        { m: "Fenobarbital 200 mg/2 mL", p: "15–20 mg/kg EV a ≤ 100 mg/min (diluir 5 ampolas em 90 mL SF = 10 mg/mL).", k: { d: [15, 20], c: 10, f: "mL" } },
      ]},
      { t: "Refratário (UTI)", itens: [
        { m: "Midazolam 50 mg/10 mL", p: "Ataque 0,2 mg/kg EV; manutenção 0,1–0,4 mg/kg/h em BIC." },
        { m: "Propofol 10 mg/mL", p: "Ataque 1–2 mg/kg EV; manutenção 2–10 mg/kg/h." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "meningite", titulo: "Meningite bacteriana", area: "adulto", sistema: "Neurologia",
    tags: ["meningite", "ceftriaxona", "líquor", "dexametasona", "quimioprofilaxia"],
    resumo: "Febre + cefaleia + rigidez de nuca: antibiótico na 1ª hora, não atrasar por exames.",
    manejo: [
      "Hemoculturas e punção lombar (TC antes só se déficit focal, papiledema, crise, imunossuprimido ou rebaixamento).",
      "Dexametasona antes ou junto com a 1ª dose do antibiótico.",
      "Ceftriaxona; associar ampicilina se > 50 anos, gestante ou imunossuprimido (Listeria); vancomicina se pneumococo resistente.",
      "Notificação compulsória e quimioprofilaxia de contactantes íntimos (meningococo/Haemophilus).",
    ],
    rx: [
      { t: "Tratamento", itens: [
        { m: "Dexametasona 4 mg/mL", p: "10 mg EV de 6/6 h por 4 dias (iniciar antes/junto do ATB)." },
        { m: "Ceftriaxona 1 g", p: "2 g EV de 12/12 h por 7–14 dias." },
        { m: "Ampicilina 1 g", p: "2 g EV de 4/4 h (cobertura de Listeria).", o: "> 50 anos, gestantes, imunossuprimidos." },
        { m: "Vancomicina 500 mg", p: "15–20 mg/kg EV de 8/8–12/12 h.", o: "Se suspeita de pneumococo resistente." },
        { m: "Aciclovir 250 mg", p: "10 mg/kg EV de 8/8 h se suspeita de encefalite herpética." },
      ]},
      { t: "Quimioprofilaxia de contactantes", itens: [
        { m: "Rifampicina 300 mg", p: "Adulto: 600 mg VO 12/12 h por 2 dias (meningococo).", o: "Gestante: ceftriaxona 250 mg IM dose única. Alternativa: ciprofloxacino 500 mg VO dose única." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "bell", titulo: "Paralisia facial periférica (Bell)", area: "adulto", sistema: "Neurologia",
    tags: ["paralisia facial", "prednisona", "aciclovir"],
    resumo: "Paralisia de toda a hemiface (inclui testa): corticoide em até 72 h e proteção ocular.",
    manejo: [
      "Diferenciar de central (central poupa a testa). Pesquisar vesículas (Ramsay Hunt), otite, trauma.",
      "Prednisona em até 72 h do início; antiviral associado em casos graves ou Ramsay Hunt.",
      "Proteção ocular: lágrima artificial de dia, pomada e oclusão à noite.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Prednisona 20 mg", p: "1 mg/kg/dia VO (máx. 60 mg) por 7 dias (ou 60 mg/dia 5 dias e reduzir em 5 dias)." },
        { m: "Valaciclovir 500 mg", p: "1 g VO 8/8 h por 7 dias (casos graves).", o: "Alternativa: aciclovir 400 mg 5x/dia por 7 dias." },
        { m: "Lágrima artificial (carmelose 0,5%)", p: "1 gota no olho afetado de 2/2 h acordado; pomada + oclusão à noite." },
      ]},
    ],
    fontes: ["PSZ"],
  },

  // ───────────── RESPIRATÓRIO ─────────────
  {
    id: "asma", titulo: "Crise de asma", area: "adulto", sistema: "Respiratório",
    tags: ["asma", "broncoespasmo", "salbutamol", "berotec", "sulfato de magnésio"],
    resumo: "Beta-2 de curta ação repetido na 1ª hora + ipratrópio + corticoide sistêmico precoce.",
    manejo: [
      "Avaliar gravidade: fala, uso de musculatura, SpO₂, PFE. O₂ para SpO₂ 93–95%.",
      "Salbutamol spray com espaçador (preferível) ou nebulização a cada 20 min na 1ª hora.",
      "Ipratrópio associado nas crises moderadas/graves.",
      "Corticoide sistêmico na 1ª hora (VO tão eficaz quanto EV).",
      "Grave/refratária: sulfato de magnésio EV; considerar UTI.",
      "Alta com corticoide oral 5–7 dias e corticoide inalatório.",
    ],
    alarme: ["Tórax silencioso, confusão, bradicardia, cianose, PaCO₂ normal/alta → iminência de parada."],
    rx: [
      { t: "No PS", itens: [
        { m: "Salbutamol 100 mcg/jato (Aerolin®)", p: "4–10 jatos com espaçador a cada 20 min na 1ª hora; depois conforme resposta." },
        { m: "Fenoterol 5 mg/mL (Berotec®) — nebulização", p: "10 gotas (2,5 mg) + 3–5 mL SF, a cada 20 min por até 3 doses (O₂ 6–8 L/min).", o: "Alternativa ao spray." },
        { m: "Ipratrópio 0,25 mg/mL (Atrovent®)", p: "40 gotas (500 mcg) na mesma nebulização a cada 20 min na 1ª hora." },
        { m: "Prednisona 20 mg", p: "40–60 mg VO dose única.", o: "Ou metilprednisolona 40–125 mg EV / hidrocortisona 200–300 mg EV." },
        { m: "Sulfato de magnésio 50% (1 g/2 mL)", p: "2 g em 100 mL de SF EV em 20 min.", o: "Crise grave/refratária." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Prednisona 20 mg", p: "40–50 mg VO 1x/dia (manhã) por 5–7 dias." },
        { m: "Budesonida + formoterol 200/6 mcg", p: "1–2 inalações de 12/12 h e conforme necessidade (máx. 12/dia)." },
        { m: "Salbutamol 100 mcg/jato", p: "2–4 jatos com espaçador de 4/4–6/6 h se falta de ar." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "dpoc", titulo: "DPOC exacerbada", area: "adulto", sistema: "Respiratório",
    tags: ["dpoc", "exacerbação", "vni", "antibiótico"],
    resumo: "Broncodilatador + corticoide 5 dias + antibiótico se escarro purulento; O₂ alvo 88–92%.",
    manejo: [
      "O₂ controlado (SpO₂ 88–92%); gasometria se grave.",
      "VNI se acidose respiratória (pH < 7,35 e PaCO₂ > 45).",
      "Antibiótico se aumento de purulência do escarro + dispneia ou volume, ou necessidade de ventilação.",
      "Corticoide sistêmico por 5 dias.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Salbutamol 100 mcg/jato", p: "4–8 jatos com espaçador de 20/20 min na 1ª hora." },
        { m: "Ipratrópio 0,25 mg/mL", p: "40 gotas (500 mcg) em 3–5 mL SF por nebulização de 4/4–6/6 h." },
        { m: "Prednisona 20 mg", p: "40 mg VO 1x/dia por 5 dias.", o: "Ou metilprednisolona 40 mg EV/dia." },
      ]},
      { t: "Antibiótico (ambulatorial)", itens: [
        { m: "Amoxicilina + clavulanato 875/125 mg", p: "1 cp VO 12/12 h por 5–7 dias." },
        { m: "Azitromicina 500 mg", p: "1 cp VO 1x/dia por 3–5 dias.", o: "Alérgicos a betalactâmico." },
        { m: "Levofloxacino 750 mg", p: "1 cp VO 1x/dia por 5 dias.", o: "Risco de Pseudomonas/falha prévia." },
      ]},
      { t: "Antibiótico (internação)", itens: [
        { m: "Ceftriaxona 1 g", p: "1–2 g EV 1x/dia." },
        { m: "Piperacilina + tazobactam 4,5 g", p: "4,5 g EV 6/6 h.", o: "Risco de Pseudomonas." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "pac", titulo: "Pneumonia adquirida na comunidade", area: "adulto", sistema: "Respiratório",
    tags: ["pneumonia", "curb-65", "pac", "antibiótico"],
    resumo: "CURB-65 define local de tratamento; ATB em até 1 h na sepse.",
    manejo: [
      "Radiografia de tórax; CURB-65: 0–1 ambulatorial, 2 internação, ≥ 3 considerar UTI.",
      "Ambulatorial sem comorbidade: amoxicilina ou macrolídeo; com comorbidade: amoxicilina-clavulanato + macrolídeo ou quinolona respiratória.",
      "Internação: betalactâmico EV + macrolídeo (ou quinolona isolada).",
      "Reavaliar em 48–72 h; duração habitual 5–7 dias.",
    ],
    rx: [
      { t: "Ambulatorial", itens: [
        { m: "Amoxicilina 500 mg", p: "1 g VO 8/8 h por 5–7 dias (sem comorbidades)." },
        { m: "Amoxicilina + clavulanato 875/125 mg", p: "1 cp VO 12/12 h por 7 dias." },
        { m: "Azitromicina 500 mg", p: "1 cp VO 1x/dia por 3–5 dias." },
        { m: "Claritromicina 500 mg", p: "1 cp VO 12/12 h por 7 dias.", o: "Alternativa ao azitro." },
        { m: "Levofloxacino 750 mg", p: "1 cp VO 1x/dia por 5 dias.", o: "Alérgicos/comorbidades." },
      ]},
      { t: "Internação", itens: [
        { m: "Ceftriaxona 1 g", p: "1–2 g EV 1x/dia." },
        { m: "Azitromicina 500 mg", p: "500 mg EV/VO 1x/dia." },
      ]},
      { t: "Sintomáticos", itens: [
        { m: "Dipirona 1 g", p: "1 cp VO 6/6 h se febre ou dor." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "influenza", titulo: "Síndrome gripal / influenza", area: "adulto", sistema: "Respiratório",
    tags: ["gripe", "oseltamivir", "srag", "ivas"],
    resumo: "Sintomáticos; oseltamivir para grupos de risco ou SRAG, idealmente em até 48 h.",
    manejo: [
      "Grupos de risco: ≥ 60 anos, gestantes/puérperas, imunossuprimidos, doenças crônicas, obesidade grave, < 5 anos.",
      "SRAG (dispneia, SpO₂ < 95%, desconforto): internar, oseltamivir e notificar.",
      "Hidratação, repouso, retorno se dispneia.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Oseltamivir 75 mg", p: "1 cp VO 12/12 h por 5 dias.", o: "ClCr 30–60: 30 mg 12/12 h." },
        { m: "Dipirona 1 g", p: "1 cp VO 6/6 h se febre/dor." },
        { m: "Soro fisiológico nasal", p: "Lavagem nasal 3–4x/dia." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "pneumotorax", titulo: "Pneumotórax / hemotórax — drenagem", area: "adulto", sistema: "Respiratório",
    tags: ["dreno de tórax", "pneumotórax", "trauma"],
    resumo: "Hipertensivo: descompressão imediata; drenagem com analgesia/sedação e profilaxia no trauma.",
    manejo: [
      "Hipertensivo (hipotensão + desvio de traqueia): descompressão com agulha no 4º/5º EIC linha axilar média e dreno.",
      "Pequeno e estável (primário): observação/O₂ ou aspiração.",
      "Drenagem em selo d'água no 5º EIC entre linhas axilares anterior e média, com anestesia local e analgesia.",
      "Hemotórax maciço (> 1.500 mL ou > 200 mL/h): toracotomia.",
    ],
    rx: [
      { t: "Procedimento", itens: [
        { m: "Lidocaína 2% sem vasoconstritor", p: "Infiltração local até 4,5 mg/kg (≈ 15–20 mL no adulto)." },
        { m: "Midazolam 5 mg/mL", p: "1–2 mg EV; repetir conforme resposta (sedação leve)." },
        { m: "Cetamina 50 mg/mL", p: "0,25–0,5 mg/kg EV para analgesia procedural." },
        { m: "Cefazolina 1 g", p: "2 g EV dose única antes da drenagem no trauma." },
      ]},
      { t: "Analgesia", itens: [
        { m: "Dipirona 1 g/2 mL", p: "1 g EV 6/6 h." },
        { m: "Cetoprofeno 100 mg", p: "100 mg em 100 mL SF EV 12/12 h." },
        { m: "Tramadol 100 mg/2 mL", p: "50–100 mg em 100 mL SF EV em 30 min, até 6/6 h." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "faringo", titulo: "Faringoamigdalite bacteriana", area: "adulto", sistema: "Otorrino",
    tags: ["amigdalite", "garganta", "centor", "penicilina benzatina"],
    resumo: "Centor/McIsaac ≥ 3 ou teste rápido positivo: penicilina benzatina ou amoxicilina 10 dias.",
    manejo: [
      "Sem tosse + febre + exsudato + adenomegalia cervical anterior sugerem estreptococo.",
      "Tratamento previne febre reumática — completar 10 dias se oral.",
      "Abscesso periamigdaliano (trismo, voz abafada, desvio da úvula): drenagem e ATB EV.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Penicilina G benzatina 1.200.000 UI", p: "1.200.000 UI IM dose única (adulto e > 27 kg)." },
        { m: "Dexametasona 4 mg/mL", p: "10 mg IM/EV dose única para dor/odinofagia intensa." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Amoxicilina 500 mg", p: "1 cp VO 8/8 h por 10 dias." },
        { m: "Azitromicina 500 mg", p: "1 cp VO 1x/dia por 5 dias.", o: "Alérgicos à penicilina." },
        { m: "Ibuprofeno 600 mg", p: "1 cp VO 8/8 h por 3–5 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "sinusite", titulo: "Rinossinusite aguda", area: "adulto", sistema: "Otorrino",
    tags: ["sinusite", "rinossinusite", "lavagem nasal"],
    resumo: "Maioria viral: lavagem e corticoide nasal. ATB se > 10 dias, piora após melhora ou sintomas graves.",
    manejo: [
      "Bacteriana provável: sintomas > 10 dias sem melhora, febre ≥ 39 °C + secreção purulenta ≥ 3 dias, ou 'dupla piora'.",
      "Complicações orbitárias/intracranianas (edema periorbital, diplopia, cefaleia intensa): TC e internação.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Soro fisiológico 0,9% nasal", p: "Lavagem com 10–20 mL em cada narina 3–4x/dia." },
        { m: "Budesonida spray nasal 64 mcg", p: "2 jatos em cada narina 1x/dia por 2–4 semanas." },
        { m: "Amoxicilina + clavulanato 875/125 mg", p: "1 cp VO 12/12 h por 7 dias (se bacteriana)." },
        { m: "Doxiciclina 100 mg", p: "1 cp VO 12/12 h por 7 dias.", o: "Alérgicos a penicilina." },
        { m: "Levofloxacino 750 mg", p: "1 cp VO 1x/dia por 5 dias.", o: "Falha terapêutica." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "oma-adulto", titulo: "Otite média aguda (adulto)", area: "adulto", sistema: "Otorrino",
    tags: ["otite", "ouvido", "otalgia"],
    resumo: "Membrana timpânica abaulada + otalgia: amoxicilina-clavulanato; analgesia sempre.",
    manejo: [
      "Otoscopia: abaulamento é o achado mais específico.",
      "Mastoidite (dor/edema retroauricular, deslocamento do pavilhão): internação e ATB EV.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Amoxicilina + clavulanato 875/125 mg", p: "1 cp VO 12/12 h por 7–10 dias." },
        { m: "Cefuroxima 500 mg", p: "1 cp VO 12/12 h por 7–10 dias.", o: "Alergia não grave a penicilina." },
        { m: "Azitromicina 500 mg", p: "1 cp VO 1x/dia por 3–5 dias.", o: "Alergia grave a penicilina." },
        { m: "Ibuprofeno 600 mg", p: "1 cp VO 8/8 h por 3–5 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "epistaxe", titulo: "Epistaxe", area: "adulto", sistema: "Otorrino",
    tags: ["sangramento nasal", "tamponamento"],
    resumo: "Compressão digital 10–15 min com cabeça para frente; vasoconstritor tópico; tampão se persistir.",
    manejo: [
      "Sentado, cabeça inclinada para frente, compressão da asa nasal por 10–15 min sem soltar.",
      "Algodão com vasoconstritor/anestésico; cauterização de ponto visível (área de Kiesselbach).",
      "Persistente: tamponamento anterior; posterior se sangramento por trás (internação).",
      "Controlar PA, rever anticoagulantes e coagulopatias.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Oximetazolina 0,05% (Afrin®)", p: "2–3 jatos na narina sangrante ou algodão embebido por 10 min." },
        { m: "Ácido tranexâmico 250 mg/5 mL", p: "Algodão embebido em 1 ampola, tópico na narina por 10–15 min." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Soro fisiológico nasal / vaselina", p: "Umidificar a mucosa 3x/dia por 7 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
];
