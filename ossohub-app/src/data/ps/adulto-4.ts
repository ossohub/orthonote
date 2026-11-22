import type { Condicao } from "./types";

// Adulto — Infecções, Pele, Alergia, Toxicologia, Acidentes, Suporte.
export const ADULTO_4: Condicao[] = [
  // ───────────── INFECÇÕES ─────────────
  {
    id: "sepse", titulo: "Sepse e choque séptico", area: "adulto", sistema: "Infecções",
    tags: ["sepse", "choque", "noradrenalina", "lactato", "qsofa"],
    resumo: "Pacote da 1ª hora: lactato, culturas, ATB amplo, 30 mL/kg de cristaloide se hipotensão/lactato ≥ 4, vasopressor.",
    manejo: [
      "Suspeita: qSOFA ≥ 2 (FR ≥ 22, PAS ≤ 100, alteração mental) ou critérios de disfunção orgânica.",
      "Hemoculturas (2 pares) antes do ATB, sem atrasá-lo; ATB em até 1 h.",
      "Cristaloide balanceado 30 mL/kg em 3 h se hipotensão ou lactato ≥ 4; reavaliar fluido-responsividade.",
      "PAM < 65 apesar de volume: noradrenalina (pode iniciar em periférico calibroso).",
      "Choque refratário: vasopressina e hidrocortisona 200 mg/dia.",
      "Controle do foco (drenagem, retirada de cateter).",
    ],
    rx: [
      { t: "Volume e vasopressor", itens: [
        { m: "Ringer lactato", p: "30 mL/kg EV em até 3 h.", k: { d: 30, u: "mL" } },
        { m: "Noradrenalina 4 mg/4 mL", p: "4 ampolas (16 mg) em 234 mL de SG 5% (64 mcg/mL) em BIC: 0,05–1 mcg/kg/min, alvo PAM ≥ 65." },
        { m: "Vasopressina 20 UI/mL", p: "0,03 UI/min (1 ampola em 100 mL SF = 0,2 UI/mL → 9 mL/h).", o: "Se noradrenalina > 0,25 mcg/kg/min." },
        { m: "Hidrocortisona 100 mg", p: "50 mg EV 6/6 h (choque refratário)." },
      ]},
      { t: "ATB empírico (comunitário, foco indefinido)", itens: [
        { m: "Ceftriaxona 1 g", p: "2 g EV 1x/dia." },
        { m: "Piperacilina + tazobactam 4,5 g", p: "4,5 g EV 6/6 h.", o: "Risco de Pseudomonas, nosocomial ou neutropênico." },
        { m: "Meropenem 1 g", p: "1 g EV 8/8 h.", o: "Risco de ESBL/choque com uso recente de ATB." },
        { m: "Vancomicina 500 mg", p: "25 mg/kg EV ataque, depois 15–20 mg/kg 12/12 h.", o: "Suspeita de MRSA/cateter/pele grave." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "dengue", titulo: "Dengue — grupos A, B, C e D", area: "adulto", sistema: "Infecções",
    tags: ["dengue", "arbovirose", "hidratação", "prova do laço", "sinais de alarme"],
    resumo: "Classificar em A/B/C/D e hidratar conforme o grupo; nunca AINE/AAS; notificar.",
    manejo: [
      "Grupo A (sem alarme, sem risco): hidratação oral 60 mL/kg/dia (1/3 com SRO), alta com retorno.",
      "Grupo B (sangramento de pele/prova do laço +, ou condição de risco: gestante, < 2 ou > 65 anos, comorbidades): hemograma e hidratação oral supervisionada até resultado.",
      "Grupo C (sinais de alarme: dor abdominal intensa, vômitos persistentes, acúmulo de líquido, hipotensão postural, hepatomegalia > 2 cm, sangramento de mucosa, letargia, aumento do Ht): 10 mL/kg SF na 1ª hora, até 3x; internar.",
      "Grupo D (choque, sangramento grave, disfunção orgânica): 20 mL/kg em 20 min, até 3x; UTI.",
      "Reavaliar Ht, diurese e sinais vitais; febre só com dipirona/paracetamol.",
    ],
    alarme: ["Proibido AAS e AINE.", "Sinais de alarme surgem na defervescência (3º–7º dia)."],
    rx: [
      { t: "Grupo A/B — alta", itens: [
        { m: "Hidratação oral", p: "60 mL/kg/dia: 1/3 com soro de reidratação oral e 2/3 com água, sucos, chás.", k: { d: 60, u: "mL" } },
        { m: "Dipirona 1 g", p: "1 cp VO 6/6 h se febre/dor." },
        { m: "Paracetamol 750 mg", p: "1 cp VO 6/6 h (máx. 3 g/dia)." },
      ]},
      { t: "Grupo C", itens: [
        { m: "Soro fisiológico 0,9%", p: "10 mL/kg na 1ª hora; repetir até 3x conforme reavaliação; manutenção 25 mL/kg em 6–8 h.", k: { d: 10, u: "mL" } },
      ]},
      { t: "Grupo D", itens: [
        { m: "Soro fisiológico 0,9%", p: "20 mL/kg em 20 min, até 3x; se Ht em alta sem melhora, albumina/coloide; Ht em queda → investigar sangramento/transfundir.", k: { d: 20, u: "mL" } },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "leptospirose", titulo: "Leptospirose", area: "adulto", sistema: "Infecções",
    tags: ["leptospirose", "enchente", "mialgia panturrilha", "weil"],
    resumo: "Febre + mialgia em panturrilhas após exposição a enchente/rato: doxiciclina (leve) ou penicilina/ceftriaxona (grave).",
    manejo: [
      "Forma grave (Weil): icterícia rubínica, LRA com hipocalemia, hemorragia pulmonar → internação.",
      "Notificação compulsória.",
    ],
    rx: [
      { t: "Leve (ambulatorial)", itens: [
        { m: "Doxiciclina 100 mg", p: "1 cp VO 12/12 h por 5–7 dias.", o: "Ou amoxicilina 500 mg 8/8 h (gestantes)." },
      ]},
      { t: "Grave (internação)", itens: [
        { m: "Penicilina G cristalina", p: "1,5 milhão UI EV 6/6 h por 7 dias." },
        { m: "Ceftriaxona 1 g", p: "1–2 g EV 1x/dia por 7 dias (alternativa)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "sifilis", titulo: "Sífilis", area: "adulto", sistema: "Infecções",
    tags: ["sífilis", "benzetacil", "ist", "vdrl"],
    resumo: "Recente: benzatina 2,4 milhões UI dose única. Tardia/indeterminada: 3 doses semanais.",
    manejo: [
      "Notificar; tratar parcerias; VDRL trimestral para controle.",
      "Neurossífilis: penicilina cristalina EV por 14 dias.",
      "Gestante: só penicilina (dessensibilizar se alergia).",
    ],
    rx: [
      { t: "Tratamento", itens: [
        { m: "Penicilina G benzatina 1.200.000 UI", p: "Recente (< 1 ano): 2.400.000 UI IM dose única (1,2 milhão em cada glúteo). Tardia/indeterminada: 2.400.000 UI IM 1x/semana por 3 semanas." },
        { m: "Doxiciclina 100 mg", p: "1 cp VO 12/12 h por 15 dias (recente) ou 30 dias (tardia).", o: "Alérgicos não gestantes." },
        { m: "Penicilina G cristalina", p: "3–4 milhões UI EV 4/4 h por 14 dias.", o: "Neurossífilis." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "zoster", titulo: "Herpes zoster", area: "adulto", sistema: "Infecções",
    tags: ["zoster", "cobreiro", "valaciclovir", "herpes"],
    resumo: "Antiviral em até 72 h do início das lesões (ou após se lesões novas/imunossuprimido/oftálmico).",
    manejo: [
      "Zoster oftálmico (lesão na ponta do nariz — sinal de Hutchinson): avaliação oftalmológica.",
      "Disseminado ou imunossuprimido grave: aciclovir EV.",
      "Analgesia potente; considerar gabapentina para dor neuropática.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Valaciclovir 500 mg", p: "1 g (2 cp) VO 8/8 h por 7 dias." },
        { m: "Aciclovir 400 mg", p: "800 mg (2 cp) VO 5x/dia por 7 dias.", o: "Alternativa." },
        { m: "Dipirona 1 g + tramadol 50 mg", p: "Dipirona 6/6 h fixa; tramadol 8/8 h se dor forte." },
        { m: "Gabapentina 300 mg", p: "300 mg à noite, aumentar até 300 mg 8/8 h.", o: "Dor neuropática." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "conjuntivite", titulo: "Conjuntivite", area: "adulto", sistema: "Infecções",
    tags: ["olho vermelho", "colírio", "tobramicina"],
    resumo: "Viral (mais comum): compressas e lubrificante. Bacteriana (secreção purulenta): colírio antibiótico.",
    manejo: [
      "Sinais de alarme: dor intensa, baixa de acuidade, fotofobia, pupila irregular, usuário de lente de contato → oftalmologia.",
      "Não prescrever colírio com corticoide sem avaliação oftalmológica.",
      "Higiene das mãos; afastamento em viral.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Compressas frias + lubrificante (carmelose 0,5%)", p: "1 gota 4–6x/dia." },
        { m: "Tobramicina 0,3% colírio", p: "1 gota no olho afetado 4/4 h por 7 dias (bacteriana)." },
        { m: "Moxifloxacino 0,5% colírio", p: "1 gota 8/8 h por 7 dias (usuário de lente/grave)." },
        { m: "Olopatadina 0,1% colírio", p: "1 gota 12/12 h (alérgica)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "tetano", titulo: "Profilaxia do tétano em ferimentos", area: "adulto", sistema: "Infecções",
    tags: ["tétano", "vacina", "dt", "soro antitetânico", "ferimento", "imunoglobulina"],
    resumo: "Conduta depende do tipo de ferimento e da história vacinal (3 doses e tempo desde a última).",
    manejo: [
      "Limpeza e desbridamento do ferimento sempre.",
      "Vacinação incerta ou < 3 doses: vacina (dT) em qualquer ferimento; + SAT/IGHAT se ferimento de alto risco.",
      "≥ 3 doses, última < 5 anos: nada a fazer.",
      "≥ 3 doses, última 5–10 anos: reforço só em ferimento de alto risco.",
      "≥ 3 doses, última > 10 anos: reforço em qualquer ferimento (+ SAT/IGHAT no alto risco se imunodeprimido/idoso/desnutrido).",
      "Alto risco: profundo, sujo com terra/fezes, corpo estranho, queimadura, mordedura, fratura exposta, tecido desvitalizado.",
    ],
    rx: [
      { t: "Profilaxia", itens: [
        { m: "Vacina dupla adulto (dT)", p: "0,5 mL IM no deltoide." },
        { m: "Imunoglobulina humana antitetânica (IGHAT)", p: "250 UI IM (local diferente da vacina)." },
        { m: "Soro antitetânico (SAT)", p: "5.000 UI IM (alternativa à IGHAT; risco de reação)." },
      ]},
      { t: "Tétano instalado", itens: [
        { m: "IGHAT", p: "3.000–6.000 UI IM." },
        { m: "Metronidazol 500 mg/100 mL", p: "500 mg EV 8/8 h por 7–10 dias." },
        { m: "Diazepam / midazolam", p: "Controle de espasmos em UTI." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "pep", titulo: "Profilaxia pós-exposição ao HIV (PEP)", area: "adulto", sistema: "Infecções",
    tags: ["pep", "hiv", "acidente biológico", "violência sexual"],
    resumo: "Exposição de risco em até 72 h: TDF/3TC + dolutegravir por 28 dias.",
    manejo: [
      "Avaliar: tipo de material, tipo de exposição, tempo (≤ 72 h) e status da fonte (teste rápido se possível).",
      "Testes rápidos do exposto (HIV, sífilis, hepatites B e C) no atendimento.",
      "Acidente biológico: vacina/imunoglobulina para hepatite B conforme status vacinal.",
      "Violência sexual: associar profilaxia de ISTs e contracepção de emergência; notificação.",
    ],
    rx: [
      { t: "PEP (28 dias)", itens: [
        { m: "Tenofovir 300 mg + lamivudina 300 mg", p: "1 cp VO 1x/dia por 28 dias." },
        { m: "Dolutegravir 50 mg", p: "1 cp VO 1x/dia por 28 dias." },
      ]},
    ],
    fontes: ["PRV"],
  },

  // ───────────── PELE / PARTES MOLES ─────────────
  {
    id: "celulite", titulo: "Celulite / erisipela", area: "adulto", sistema: "Pele e partes moles",
    tags: ["celulite", "erisipela", "cefalexina", "pele"],
    resumo: "Placa eritematosa quente: cefalexina (ou penicilina na erisipela); EV se sinais sistêmicos.",
    manejo: [
      "Demarcar a borda com caneta para acompanhar evolução.",
      "Elevar o membro; tratar porta de entrada (tinea interdigital).",
      "Internar se sepse, imunossupressão, falha VO ou suspeita de fasciíte.",
      "Fasciíte necrosante: dor desproporcional, crepitação, bolhas hemorrágicas → cirurgia de urgência.",
    ],
    rx: [
      { t: "Ambulatorial", itens: [
        { m: "Cefalexina 500 mg", p: "1 g (2 cp) VO 6/6 h por 7–10 dias." },
        { m: "Amoxicilina 500 mg", p: "1 cp VO 8/8 h por 7–10 dias (erisipela)." },
        { m: "Clindamicina 300 mg", p: "2 cp (600 mg) VO 8/8 h por 7–10 dias.", o: "Alérgicos." },
        { m: "Penicilina G benzatina", p: "1.200.000 UI IM (erisipela) — opção dose única/semanal." },
      ]},
      { t: "Internação / hospital-dia", itens: [
        { m: "Cefazolina 1 g", p: "1–2 g EV 8/8 h." },
        { m: "Oxacilina 500 mg", p: "2 g EV 4/4 h.", o: "Alternativa." },
        { m: "Clindamicina 600 mg", p: "600–900 mg EV 8/8 h." },
        { m: "Ceftriaxona 1 g", p: "2 g EV/IM 1x/dia (hospital-dia)." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "abscesso", titulo: "Abscesso cutâneo / furúnculo", area: "adulto", sistema: "Pele e partes moles",
    tags: ["abscesso", "drenagem", "furúnculo", "sulfametoxazol"],
    resumo: "Drenagem é o tratamento; ATB se celulite extensa, sinais sistêmicos ou imunossupressão.",
    manejo: [
      "Incisão e drenagem com anestesia local; lavar e deixar aberto/curativo.",
      "ATB com cobertura para S. aureus (incluindo MRSA comunitário) quando indicado.",
    ],
    rx: [
      { t: "Alta — receita", itens: [
        { m: "Sulfametoxazol + trimetoprima 800/160 mg", p: "1–2 cp VO 12/12 h por 5–7 dias." },
        { m: "Cefalexina 500 mg", p: "1 g VO 6/6 h por 5–7 dias.", o: "Se baixo risco de MRSA." },
        { m: "Clindamicina 300 mg", p: "2 cp VO 8/8 h por 5–7 dias." },
        { m: "Ibuprofeno 600 mg", p: "1 cp VO 8/8 h por 3 dias." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "pe-diabetico", titulo: "Pé diabético infectado", area: "adulto", sistema: "Pele e partes moles",
    tags: ["pé diabético", "osteomielite", "ortopedia", "úlcera"],
    resumo: "Classificar gravidade (IWGDF/IDSA); leve VO, moderada/grave EV com cobertura ampla; RX/RM para osteomielite.",
    manejo: [
      "Probe-to-bone positivo ou RX alterado → osteomielite provável.",
      "Avaliar perfusão (pulsos, ITB) e necessidade de desbridamento cirúrgico.",
      "Cultura de tecido profundo (não de swab superficial).",
      "Controle glicêmico e descarga do membro.",
    ],
    rx: [
      { t: "Leve (ambulatorial)", itens: [
        { m: "Amoxicilina + clavulanato 875/125 mg", p: "1 cp VO 12/12 h por 1–2 semanas." },
        { m: "Cefalexina 500 mg", p: "1 g VO 6/6 h por 1–2 semanas." },
      ]},
      { t: "Moderada/grave (internação)", itens: [
        { m: "Ampicilina + sulbactam 3 g", p: "3 g EV 6/6 h." },
        { m: "Ceftriaxona 2 g + metronidazol 500 mg", p: "Ceftriaxona 2 g EV 1x/dia + metronidazol 500 mg EV 8/8 h." },
        { m: "Piperacilina + tazobactam 4,5 g", p: "4,5 g EV 6/6 h (grave / Pseudomonas) ± vancomicina se MRSA." },
      ]},
    ],
    fontes: ["PSZ"],
  },

  // ───────────── ALERGIA ─────────────
  {
    id: "anafilaxia", titulo: "Anafilaxia / choque anafilático", area: "adulto", sistema: "Alergia",
    tags: ["anafilaxia", "adrenalina", "choque", "edema de glote"],
    resumo: "Adrenalina IM na face anterolateral da coxa é a 1ª e principal droga; volume e adjuvantes depois.",
    manejo: [
      "Adrenalina IM 0,5 mg (0,5 mL de 1 mg/mL); repetir a cada 5–15 min.",
      "Decúbito com membros elevados (sentado se dispneia); O₂; 2 acessos; SF 1–2 L rápido se hipotensão.",
      "Refratária a 2 doses IM: adrenalina em BIC; glucagon se usa betabloqueador.",
      "Adjuvantes (não substituem a adrenalina): anti-histamínico, corticoide, beta-2 inalatório.",
      "Observar 6–12 h (bifásica); alta com prescrição de adrenalina autoinjetável e orientação.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Adrenalina 1 mg/mL", p: "0,5 mg (0,5 mL) IM na coxa; repetir a cada 5–15 min.", k: { d: 0.01, max: 0.5, c: 1, f: "mL" } },
        { m: "Soro fisiológico 0,9%", p: "1.000–2.000 mL EV rápido se hipotensão." },
        { m: "Adrenalina em BIC", p: "1 mg em 250 mL SF (4 mcg/mL): 1–10 mcg/min, titular." },
        { m: "Difenidramina 50 mg/mL", p: "50 mg EV lento.", o: "Ou prometazina 50 mg IM." },
        { m: "Ranitidina 50 mg/2 mL", p: "50 mg EV (bloqueio H2 adjuvante), se disponível." },
        { m: "Metilprednisolona 125 mg", p: "125 mg EV.", o: "Ou hidrocortisona 200 mg EV." },
        { m: "Salbutamol 100 mcg/jato", p: "4–8 jatos se broncoespasmo." },
        { m: "Glucagon 1 mg", p: "1–5 mg EV em 5 min se em uso de betabloqueador e refratário." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },
  {
    id: "alergia", titulo: "Urticária / reação alérgica leve a moderada", area: "adulto", sistema: "Alergia",
    tags: ["urticária", "alergia", "anti-histamínico", "prurido", "angioedema"],
    resumo: "Anti-histamínico de 2ª geração; corticoide curto se moderada; afastar anafilaxia.",
    manejo: [
      "Qualquer comprometimento respiratório, cardiovascular ou GI importante → tratar como anafilaxia.",
      "Identificar e suspender o gatilho.",
      "Angioedema sem urticária em uso de IECA: suspender IECA (bradicinina — resposta pobre a anti-histamínico).",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Prometazina 50 mg/2 mL", p: "25–50 mg IM." },
        { m: "Dexclorfeniramina 5 mg/mL", p: "5 mg IM/EV." },
        { m: "Hidrocortisona 100 mg", p: "200 mg EV (moderada)." },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Loratadina 10 mg", p: "1 cp VO 1x/dia por 7 dias (pode dobrar a dose)." },
        { m: "Fexofenadina 180 mg", p: "1 cp VO 1x/dia por 7 dias." },
        { m: "Prednisona 20 mg", p: "40 mg VO 1x/dia por 5 dias (moderada)." },
        { m: "Hidroxizina 25 mg", p: "1 cp VO à noite se prurido intenso." },
      ]},
    ],
    fontes: ["PSZ", "PRV"],
  },

  // ───────────── TOXICOLOGIA ─────────────
  {
    id: "descontaminacao", titulo: "Intoxicação exógena — abordagem e descontaminação", area: "adulto", sistema: "Toxicologia",
    tags: ["intoxicação", "carvão ativado", "ceatox", "toxíndrome"],
    resumo: "ABC, glicemia, identificar toxíndrome, carvão ativado em até 1 h se indicado; ligar para o CIATox.",
    manejo: [
      "CIATox/Disque-Intoxicação: 0800-722-6001.",
      "Toxíndromes: colinérgica, anticolinérgica, simpatomimética, opioide, sedativo-hipnótica.",
      "Carvão ativado 1 g/kg (até 50 g) em até 1 h, via aérea protegida; não usar para álcool, ferro, lítio, cáusticos, hidrocarbonetos.",
      "Lavagem gástrica: excepcional. ECG (QRS/QT), glicemia, eletrólitos, paracetamol e salicilato séricos.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Carvão ativado", p: "1 g/kg (máx. 50 g) VO/SNG diluído em 250 mL de água.", k: { d: 1, u: "g", max: 50 } },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "paracetamol-intox", titulo: "Intoxicação por paracetamol", area: "adulto", sistema: "Toxicologia",
    tags: ["paracetamol", "n-acetilcisteína", "nac", "hepatotoxicidade"],
    resumo: "Ingestão ≥ 150 mg/kg ou nível acima da linha do nomograma: N-acetilcisteína (melhor se < 8 h).",
    manejo: [
      "Nível sérico 4 h após ingestão aguda + nomograma de Rumack-Matthew.",
      "Ingestão desconhecida/tardia com TGO alta: iniciar NAC.",
      "Carvão ativado se < 1–2 h.",
    ],
    rx: [
      { t: "N-acetilcisteína EV (21 h)", itens: [
        { m: "Acetilcisteína 300 mg/3 mL", p: "150 mg/kg em 200 mL SG 5% em 1 h; depois 50 mg/kg em 500 mL em 4 h; depois 100 mg/kg em 1.000 mL em 16 h.", k: { d: 150, c: 100, f: "mL" } },
      ]},
      { t: "Via oral (72 h)", itens: [
        { m: "Acetilcisteína", p: "140 mg/kg VO de ataque; depois 70 mg/kg 4/4 h (17 doses)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "organofosforado", titulo: "Organofosforados / carbamatos (chumbinho)", area: "adulto", sistema: "Toxicologia",
    tags: ["chumbinho", "atropina", "colinérgica", "pralidoxima", "agrotóxico"],
    resumo: "Síndrome colinérgica: atropina em doses crescentes até secar as secreções pulmonares.",
    manejo: [
      "Descontaminação: retirar roupas, lavar pele (equipe com EPI).",
      "Atropinizar até secreção brônquica seca e FC > 80 (não pela pupila).",
      "Pralidoxima em organofosforados (não em carbamato isolado), se disponível.",
      "Evitar succinilcolina na IOT.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Atropina 0,5 mg/mL", p: "1–2 mg EV; dobrar a dose a cada 5 min até atropinização; manter 10–20% da dose total/h em BIC." },
        { m: "Pralidoxima", p: "30 mg/kg EV em 30 min; depois 8 mg/kg/h." },
        { m: "Diazepam 10 mg/2 mL", p: "10 mg EV se convulsão/agitação." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "opioide-bzd", titulo: "Intoxicação por opioides ou benzodiazepínicos", area: "adulto", sistema: "Toxicologia",
    tags: ["naloxona", "flumazenil", "overdose", "miose"],
    resumo: "Opioide: naloxona titulada pela respiração. BZD: suporte; flumazenil só em casos selecionados.",
    manejo: [
      "Ventilar com bolsa-válvula-máscara antes do antídoto se apneia.",
      "Naloxona tem meia-vida curta — observar recorrência (sobretudo metadona).",
      "Flumazenil contraindicado se uso crônico de BZD, epilepsia ou coingestão de tricíclico (convulsão).",
    ],
    rx: [
      { t: "Opioide", itens: [
        { m: "Naloxona 0,4 mg/mL", p: "0,04–0,4 mg EV, repetir a cada 2–3 min até FR ≥ 12 (máx. 10 mg). IM/IN se sem acesso." },
      ]},
      { t: "Benzodiazepínico", itens: [
        { m: "Flumazenil 0,1 mg/mL", p: "0,2 mg EV em 30 s; 0,3 mg após 1 min; depois 0,5 mg/min até 3 mg." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "cocaina", titulo: "Intoxicação por cocaína / simpatomiméticos", area: "adulto", sistema: "Toxicologia",
    tags: ["cocaína", "crack", "anfetamina", "benzodiazepínico"],
    resumo: "Benzodiazepínico é a base (agitação, HAS, taquicardia, hipertermia); evitar betabloqueador isolado.",
    manejo: [
      "Resfriar se hipertermia; hidratar (rabdomiólise).",
      "Dor torácica: AAS, BZD, nitrato; ECG e troponina.",
      "HAS persistente após BZD: nitroglicerina/fentolamina.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Diazepam 10 mg/2 mL", p: "5–10 mg EV a cada 5–10 min até controle." },
        { m: "Midazolam 15 mg/3 mL", p: "5–10 mg IM se sem acesso." },
        { m: "Soro fisiológico 0,9%", p: "1–2 L EV (rabdomiólise/hipertermia)." },
      ]},
    ],
    fontes: ["PSZ"],
  },

  // ───────────── ACIDENTES POR ANIMAIS ─────────────
  {
    id: "ofidico", titulo: "Acidente ofídico", area: "adulto", sistema: "Acidentes por animais",
    tags: ["cobra", "jararaca", "cascavel", "soro antiofídico", "botrópico", "crotálico"],
    resumo: "Identificar o gênero pelo quadro, classificar gravidade e aplicar o soro específico EV em ampolas.",
    manejo: [
      "Não garrotear, não cortar, não sugar. Membro elevado, hidratação, analgesia.",
      "Tempo de coagulação (TC) e função renal; CIATox orienta.",
      "Botrópico (jararaca): dor/edema local, sangramento, TC alterado. Leve 2–4 amp; moderado 4–8; grave 12 (SAB).",
      "Crotálico (cascavel): fácies miastênica, mialgia, urina escura, pouco local. Leve 5 amp; moderado 10; grave 20 (SAC).",
      "Laquético (surucucu): botrópico + vagal; elapídico (coral): ptose/paralisia — 10 amp de SAE.",
      "Pré-medicação não é obrigatória; ter adrenalina pronta (reação ao soro). Profilaxia antitetânica.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Soro antibotrópico (SAB) / anticrotálico (SAC) / antielapídico (SAE)", p: "Número de ampolas conforme gênero e gravidade, EV puro ou diluído em 100–250 mL SF em 20–60 min." },
        { m: "Soro fisiológico 0,9%", p: "Hidratação para diurese 1–2 mL/kg/h (crotálico: prevenir LRA)." },
        { m: "Dipirona 1 g/2 mL", p: "1 g EV 6/6 h." },
        { m: "Adrenalina 1 mg/mL", p: "0,5 mg IM se reação anafilática ao soro." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "escorpiao", titulo: "Escorpionismo / araneísmo", area: "adulto", sistema: "Acidentes por animais",
    tags: ["escorpião", "aranha", "armadeira", "marrom", "soro antiescorpiônico"],
    resumo: "Escorpião: dor local intensa → anestésico local; soro só nos moderados/graves (sobretudo crianças).",
    manejo: [
      "Escorpião leve: analgesia e infiltração com lidocaína; observar 4–6 h (crianças: risco de forma grave).",
      "Moderado (vômitos, sudorese, agitação): 2–3 amp SAEsc; grave (choque, EAP): 4–6 amp, UTI.",
      "Armadeira: dor intensa local → bloqueio anestésico; soro raramente.",
      "Aranha-marrom: lesão necrótica tardia, hemólise → soro antiaracnídico/antiloxoscélico + prednisona.",
    ],
    rx: [
      { t: "No PS", itens: [
        { m: "Lidocaína 2% sem vasoconstritor", p: "3–4 mL infiltrados no local da picada; repetir até 3x a cada 1 h." },
        { m: "Dipirona 1 g/2 mL", p: "1 g EV/IM." },
        { m: "Soro antiescorpiônico / antiaracnídico", p: "Ampolas EV conforme gravidade." },
        { m: "Prednisona 20 mg", p: "40 mg/dia VO por 5 dias (loxoscelismo cutâneo)." },
      ]},
    ],
    fontes: ["PSZ"],
  },

  // ───────────── SUPORTE / REFERÊNCIA ─────────────
  {
    id: "iot", titulo: "Intubação em sequência rápida", area: "adulto", sistema: "Suporte avançado",
    tags: ["iot", "intubação", "etomidato", "cetamina", "rocurônio", "succinilcolina", "sedação"],
    resumo: "Pré-oxigenar, otimizar hemodinâmica, indutor + bloqueador em sequência, confirmar com capnografia.",
    manejo: [
      "Pré-oxigenação 3–5 min (VNI/máscara com reservatório); posição olfativa.",
      "Hipotensão: volume/vasopressor antes; preferir cetamina ou etomidato.",
      "Succinilcolina contraindicada em hipercalemia, queimado/esmagamento > 24 h, doença neuromuscular.",
      "Use a calculadora de IOT na aba Calculadoras para doses e volumes pelo peso.",
      "Pós-IOT: sedoanalgesia contínua (fentanil + midazolam/propofol).",
    ],
    rx: [
      { t: "Indutores", itens: [
        { m: "Etomidato 2 mg/mL", p: "0,3 mg/kg EV.", k: { d: 0.3, c: 2, f: "mL" } },
        { m: "Cetamina 50 mg/mL", p: "1–2 mg/kg EV.", k: { d: [1, 2], c: 50, f: "mL" } },
        { m: "Propofol 10 mg/mL", p: "1–2 mg/kg EV (evitar se instável).", k: { d: [1, 2], c: 10, f: "mL" } },
        { m: "Midazolam 5 mg/mL", p: "0,1–0,3 mg/kg EV.", k: { d: [0.1, 0.3], c: 5, f: "mL" } },
        { m: "Fentanil 50 mcg/mL", p: "1–3 mcg/kg EV (pré-tratamento/analgesia).", k: { d: [1, 3], u: "mcg", c: 50, f: "mL" } },
      ]},
      { t: "Bloqueadores neuromusculares", itens: [
        { m: "Succinilcolina 100 mg", p: "1–1,5 mg/kg EV (reconstituir 100 mg em 10 mL = 10 mg/mL).", k: { d: [1, 1.5], c: 10, f: "mL" } },
        { m: "Rocurônio 10 mg/mL", p: "1–1,2 mg/kg EV.", k: { d: [1, 1.2], c: 10, f: "mL" } },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "vasoativas", titulo: "Drogas vasoativas — diluições padrão", area: "adulto", sistema: "Suporte avançado",
    tags: ["noradrenalina", "dobutamina", "dopamina", "vasopressina", "nipride", "bic"],
    resumo: "Diluições mais usadas e faixas de dose; use a calculadora para converter mcg/kg/min ↔ mL/h.",
    manejo: [
      "Noradrenalina: 1ª escolha no choque séptico e distributivo.",
      "Dobutamina: choque cardiogênico/baixo débito.",
      "Sempre em bomba de infusão, de preferência acesso central (noradrenalina pode iniciar em periférico calibroso por pouco tempo).",
    ],
    rx: [
      { t: "Diluições", itens: [
        { m: "Noradrenalina 4 mg/4 mL", p: "16 mg (4 amp) + 234 mL SG 5% = 64 mcg/mL → 0,05–1 mcg/kg/min." },
        { m: "Adrenalina 1 mg/mL", p: "4 mg + 246 mL SG 5% = 16 mcg/mL → 0,05–0,5 mcg/kg/min (ou 2–10 mcg/min)." },
        { m: "Dobutamina 250 mg/20 mL", p: "1.000 mg (4 amp) + 170 mL SF = 4 mg/mL → 2,5–20 mcg/kg/min." },
        { m: "Dopamina 50 mg/10 mL", p: "250 mg (5 amp) + 200 mL SG 5% = 1 mg/mL → 5–20 mcg/kg/min." },
        { m: "Vasopressina 20 UI/mL", p: "20 UI + 100 mL SF = 0,2 UI/mL → 0,03 UI/min (9 mL/h)." },
        { m: "Nitroprussiato 50 mg/2 mL", p: "50 mg + 248 mL SG 5% = 200 mcg/mL (protegido da luz) → 0,25–10 mcg/kg/min." },
        { m: "Nitroglicerina 50 mg/10 mL", p: "50 mg + 240 mL SF/SG = 200 mcg/mL → 5–200 mcg/min." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "hemocomponentes", titulo: "Hemocomponentes — indicações e doses", area: "adulto", sistema: "Suporte avançado",
    tags: ["transfusão", "concentrado de hemácias", "plaquetas", "plasma", "crioprecipitado"],
    resumo: "Hemácias se Hb < 7 (< 8 coronariopata); plaquetas, plasma e crio conforme sangramento/procedimento.",
    manejo: [
      "Concentrado de hemácias: 1 unidade eleva Hb ~1 g/dL; infundir em 1–2 h (máx. 4 h).",
      "Plaquetas: < 10.000 profilaxia; < 50.000 com sangramento/procedimento; < 100.000 neurocirurgia/SNC.",
      "Plasma fresco: sangramento com INR/TTPa > 1,5x; 10–20 mL/kg.",
      "Crioprecipitado: fibrinogênio < 150–200 mg/dL com sangramento; 1 U/10 kg.",
      "Hemorragia maciça: protocolo 1:1:1 e ácido tranexâmico em até 3 h.",
    ],
    rx: [
      { t: "Doses", itens: [
        { m: "Concentrado de hemácias", p: "1 unidade (≈ 300 mL) EV em 1–2 h; reavaliar Hb." },
        { m: "Concentrado de plaquetas", p: "1 U/10 kg (randômicas) ou 1 aférese." },
        { m: "Plasma fresco congelado", p: "10–20 mL/kg EV.", k: { d: [10, 20], u: "mL" } },
        { m: "Crioprecipitado", p: "1 unidade a cada 10 kg EV." },
        { m: "Ácido tranexâmico 250 mg/5 mL", p: "1 g EV em 10 min + 1 g em 8 h (trauma em até 3 h)." },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "gestante", titulo: "Gestantes — escolhas seguras no PS", area: "adulto", sistema: "Suporte avançado",
    tags: ["gestação", "gravidez", "medicamentos seguros", "eclâmpsia", "sulfato de magnésio"],
    resumo: "Preferir paracetamol, penicilinas/cefalosporinas, metoclopramida/ondansetrona (após 1º tri); evitar AINE no 3º trimestre.",
    manejo: [
      "Analgesia: paracetamol/dipirona; evitar AINE (sobretudo após 20 semanas) e codeína prolongada.",
      "Antibióticos seguros: penicilinas, cefalosporinas, azitromicina, nitrofurantoína (evitar no termo), fosfomicina.",
      "Evitar: quinolonas, tetraciclinas, IECA/BRA, varfarina, estatinas.",
      "Pré-eclâmpsia grave/eclâmpsia: sulfato de magnésio + anti-hipertensivo (hidralazina/nifedipino).",
    ],
    rx: [
      { t: "Pré-eclâmpsia grave / eclâmpsia (Zuspan)", itens: [
        { m: "Sulfato de magnésio 50% (10 mL = 5 g)", p: "Ataque 4 g EV em 20 min (8 mL de MgSO₄ 50% + 12 mL AD). Manutenção 1 g/h (10 mL 50% em 490 mL SF a 100 mL/h).", o: "Vigiar reflexo patelar, FR > 16, diurese > 25 mL/h. Antídoto: gluconato de cálcio 10% 10 mL EV." },
        { m: "Hidralazina 20 mg/mL", p: "1 amp + 19 mL AD (1 mg/mL): 5 mg EV a cada 20 min até PAS < 160 e PAD < 110 (máx. 30 mg)." },
        { m: "Nifedipino 10 mg", p: "10 mg VO a cada 20–30 min (máx. 30 mg).", o: "Alternativa." },
      ]},
    ],
    fontes: ["PSZ"],
  },
];
