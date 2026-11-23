import type { Condicao } from "./types";

// Pediatria — doses calculadas pelo peso informado no topo da tela.
// Concentrações usuais no Brasil; conferir sempre a apresentação disponível.
export const PEDIATRIA: Condicao[] = [
  {
    id: "p-febre", titulo: "Febre e dor (antitérmicos/analgésicos)", area: "pediatria", sistema: "Sintomáticos",
    tags: ["febre", "dipirona", "paracetamol", "ibuprofeno", "dor"],
    resumo: "Tratar o desconforto, não o número. Dose pelo peso, intervalo mínimo de 6 h (ibuprofeno 6–8 h).",
    manejo: [
      "Lactente < 3 meses com febre ≥ 38 °C: avaliação completa (risco de infecção bacteriana grave).",
      "Alternar antitérmicos não é necessário; preferir um só, na dose certa.",
      "Ibuprofeno a partir de 6 meses; evitar em desidratação, dengue e varicela.",
      "Dipirona a partir de 3 meses ou > 5 kg; paracetamol desde o nascimento.",
      "Não usar AAS para febre ou dor na criança (risco de síndrome de Reye).",
      "Sinais de alerta: prostração entre picos, petéquias, rigidez de nuca, desconforto respiratório.",
    ],
    rx: [
      { t: "Via oral", itens: [
        { m: "Dipirona gotas 500 mg/mL (20 gotas/mL)", p: "15–25 mg/kg/dose VO de 6/6 h (≈ 1 gota/kg; máx. 40 gotas = 1 g).", k: { d: [15, 25], max: 1000, c: 500, f: "gotas", gpm: 20 } },
        { m: "Dipirona solução oral 50 mg/mL", p: "15–25 mg/kg/dose VO 6/6 h.", k: { d: [15, 25], max: 1000, c: 50, f: "mL" } },
        { m: "Paracetamol gotas 200 mg/mL (≈ 15 gotas/mL)", p: "10–15 mg/kg/dose VO 6/6 h (≈ 1 gota/kg; máx. 75 mg/kg/dia).", k: { d: [10, 15], max: 750, c: 200, f: "gotas", gpm: 15 } },
        { m: "Ibuprofeno gotas 50 mg/mL (10 gotas/mL; 1 gota = 5 mg)", p: "5–10 mg/kg/dose VO 6/6–8/8 h (1–2 gotas/kg; máx. 40 mg/kg/dia).", k: { d: [5, 10], max: 400, c: 50, f: "gotas", gpm: 10 } },
        { m: "Ibuprofeno gotas 100 mg/mL (10 gotas/mL; 1 gota = 10 mg)", p: "5–10 mg/kg/dose VO 6/6–8/8 h (½–1 gota/kg).", k: { d: [5, 10], max: 400, c: 100, f: "gotas", gpm: 10 } },
      ]},
      { t: "Parenteral (PS)", itens: [
        { m: "Dipirona 500 mg/mL — ampola 2 mL", p: "15–25 mg/kg EV diluída em 10 mL SF/AD ou IM (máx. 1 g).", k: { d: [15, 25], max: 1000, c: 500, f: "mL" } },
      ]},
    ],
    fontes: ["GPP", "MPP", "PSZ"],
  },
  {
    id: "p-desidratacao", titulo: "Diarreia aguda e desidratação (Planos A, B e C)", area: "pediatria", sistema: "Gastrointestinal",
    tags: ["geca", "desidratação", "plano a", "plano b", "plano c", "sro", "zinco"],
    resumo: "Classificar a desidratação e escolher o plano; zinco por 10–14 dias; ondansetrona se vômitos.",
    manejo: [
      "Sem desidratação → Plano A (casa): mais líquido, SRO após cada evacuação, manter alimentação, zinco.",
      "Com desidratação (irritado, sede, olhos fundos, sinal da prega desaparece lentamente) → Plano B: SRO 50–100 mL/kg em 4–6 h na unidade.",
      "Desidratação grave (letárgico, não bebe, prega muito lenta, TEC > 3 s) → Plano C: fase rápida EV.",
      "Plano C (< 5 anos): SF 0,9% 20 mL/kg em 30 min, repetir até hidratar; depois manutenção + reposição.",
      "Antibiótico apenas em disenteria (sangue) com comprometimento do estado geral, ou cólera.",
      "Use a calculadora de hidratação (Holliday-Segar) na aba Calculadoras.",
    ],
    alarme: ["Vômitos incoercíveis, sangue nas fezes, distensão abdominal, letargia, < 3 meses → avaliação médica/observação."],
    rx: [
      { t: "Plano A — receita", itens: [
        { m: "Sais de reidratação oral", p: "Após cada evacuação: < 1 ano 50–100 mL; 1–10 anos 100–200 mL; > 10 anos à vontade." },
        { m: "Sulfato de zinco 4 mg/mL (10 mg/2,5 mL — usar a apresentação disponível)", p: "< 6 meses: 10 mg/dia; ≥ 6 meses: 20 mg/dia VO por 10–14 dias." },
        { m: "Ondansetrona 4 mg (ODT) / solução 4 mg/5 mL", p: "0,15 mg/kg/dose VO 8/8 h se vômitos (máx. 4 mg/dose em < 30 kg).", k: { d: 0.15, max: 4, c: 0.8, f: "mL" } },
      ]},
      { t: "Plano B (na unidade)", itens: [
        { m: "Soro de reidratação oral", p: "50–100 mL/kg em 4–6 h, em pequenas frações (colher/copinho).", k: { d: [50, 100], u: "mL" } },
      ]},
      { t: "Plano C (EV)", itens: [
        { m: "Soro fisiológico 0,9%", p: "20 mL/kg EV em 30 min; repetir até hidratado (máx. 3 bolus antes de reavaliar causas).", k: { d: 20, u: "mL" } },
        { m: "Ondansetrona 2 mg/mL", p: "0,15 mg/kg EV (máx. 4 mg).", k: { d: 0.15, max: 4, c: 2, f: "mL" } },
      ]},
      { t: "Disenteria com toxemia", itens: [
        { m: "Azitromicina 200 mg/5 mL", p: "10 mg/kg/dia VO 1x/dia por 3–5 dias.", k: { d: 10, max: 500, c: 40, f: "mL" } },
        { m: "Ceftriaxona 1 g", p: "50–100 mg/kg/dia EV/IM 1x/dia por 3–5 dias (internação).", k: { d: [50, 100], max: 2000 } },
      ]},
    ],
    fontes: ["GPP", "MPP"],
  },
  {
    id: "p-vomitos", titulo: "Vômitos", area: "pediatria", sistema: "Gastrointestinal",
    tags: ["vômito", "ondansetrona", "antiemético"],
    resumo: "Ondansetrona é a escolha (≥ 6 meses); evitar metoclopramida/bromoprida em menores (extrapiramidal).",
    manejo: [
      "Avaliar desidratação, abdome (invaginação, apendicite, estenose de piloro), sinais meníngeos e glicemia.",
      "Após antiemético: teste de tolerância oral com SRO em pequenas quantidades.",
    ],
    rx: [
      { t: "PS", itens: [
        { m: "Ondansetrona 2 mg/mL (ampola)", p: "0,15 mg/kg EV/IM (máx. 4 mg).", k: { d: 0.15, max: 4, c: 2, f: "mL" } },
        { m: "Ondansetrona solução 4 mg/5 mL", p: "0,15 mg/kg VO 8/8 h.", k: { d: 0.15, max: 4, c: 0.8, f: "mL" } },
        { m: "Bromoprida gotas 4 mg/mL (24 gotas/mL)", p: "0,5–1 mg/kg/dia ÷ 3 VO (> 1 ano).", k: { d: [0.5, 1], por: "dia", n: 3, max: 10, c: 4, f: "gotas", gpm: 24 }, o: "Risco de distonia." },
      ]},
    ],
    fontes: ["GPP", "MPP"],
  },
  {
    id: "p-oma", titulo: "Otite média aguda", area: "pediatria", sistema: "Otorrino",
    tags: ["otite", "amoxicilina", "ouvido"],
    resumo: "Amoxicilina em alta dose 10 dias (< 2 anos) ou 5–7 dias (≥ 2 anos); observação em casos leves selecionados.",
    manejo: [
      "Tratar sempre: < 6 meses, otorreia, bilateral < 2 anos, sintomas graves (febre ≥ 39 °C, otalgia intensa).",
      "≥ 2 anos leve e unilateral: pode observar 48–72 h com analgesia.",
      "Falha em 48–72 h ou ATB nos últimos 30 dias: amoxicilina-clavulanato.",
    ],
    rx: [
      { t: "Receita", itens: [
        { m: "Amoxicilina 400 mg/5 mL", p: "80–90 mg/kg/dia VO ÷ 2 (12/12 h).", k: { d: [80, 90], por: "dia", n: 2, max: 1500, c: 80, f: "mL" } },
        { m: "Amoxicilina + clavulanato 400/57 mg/5 mL", p: "80–90 mg/kg/dia (de amoxicilina) VO ÷ 2 por 10 dias.", k: { d: [80, 90], por: "dia", n: 2, max: 1750, c: 80, f: "mL" } },
        { m: "Cefuroxima 250 mg/5 mL", p: "30 mg/kg/dia VO ÷ 2.", k: { d: 30, por: "dia", n: 2, max: 500, c: 50, f: "mL" }, o: "Alergia não grave à penicilina." },
        { m: "Azitromicina 200 mg/5 mL", p: "10 mg/kg/dia VO 1x/dia por 5 dias (ou 10 mg/kg no D1 e 5 mg/kg D2–D5).", k: { d: 10, max: 500, c: 40, f: "mL" }, o: "Alergia grave." },
        { m: "Ceftriaxona 1 g", p: "50 mg/kg IM 1x/dia por 1–3 dias.", k: { d: 50, max: 1000 }, o: "Intolerância VO." },
      ]},
    ],
    fontes: ["GPP", "PSZ", "MPP"],
  },
  {
    id: "p-faringo", titulo: "Faringoamigdalite estreptocócica", area: "pediatria", sistema: "Otorrino",
    tags: ["amigdalite", "garganta", "benzetacil", "penicilina"],
    resumo: "Penicilina benzatina dose única ou amoxicilina 10 dias (prevenção de febre reumática).",
    manejo: [
      "< 3 anos raramente é estreptocócica; sintomas virais (coriza, tosse, conjuntivite) sugerem vírus.",
      "Teste rápido quando disponível.",
    ],
    rx: [
      { t: "Tratamento", itens: [
        { m: "Penicilina G benzatina", p: "< 27 kg: 600.000 UI IM; ≥ 27 kg: 1.200.000 UI IM dose única." },
        { m: "Amoxicilina 250 mg/5 mL", p: "50 mg/kg/dia VO ÷ 2–3 por 10 dias (máx. 1 g/dia).", k: { d: 50, por: "dia", n: 2, max: 500, c: 50, f: "mL" } },
        { m: "Azitromicina 200 mg/5 mL", p: "12 mg/kg/dia VO 1x/dia por 5 dias.", k: { d: 12, max: 500, c: 40, f: "mL" }, o: "Alérgicos." },
      ]},
    ],
    fontes: ["GPP", "MPP"],
  },
  {
    id: "p-sinusite", titulo: "Rinossinusite bacteriana", area: "pediatria", sistema: "Otorrino",
    tags: ["sinusite", "amoxicilina", "lavagem nasal"],
    resumo: "Sintomas > 10 dias, piora após melhora ou febre alta com secreção purulenta: amoxicilina.",
    manejo: ["Lavagem nasal com SF.", "Complicação orbitária (edema/hiperemia palpebral, dor à movimentação ocular) → internação."],
    rx: [
      { t: "Receita", itens: [
        { m: "Amoxicilina 400 mg/5 mL", p: "45–90 mg/kg/dia VO ÷ 2 por 10 dias.", k: { d: [45, 90], por: "dia", n: 2, max: 1500, c: 80, f: "mL" } },
        { m: "Amoxicilina + clavulanato 400/57 mg/5 mL", p: "90 mg/kg/dia VO ÷ 2 por 10 dias (risco de resistência).", k: { d: 90, por: "dia", n: 2, max: 1750, c: 80, f: "mL" } },
        { m: "Soro fisiológico 0,9% nasal", p: "Lavagem 3–5 mL em cada narina 4–6x/dia." },
      ]},
    ],
    fontes: ["GPP", "PSZ"],
  },
  {
    id: "p-pneumonia", titulo: "Pneumonia comunitária", area: "pediatria", sistema: "Respiratório",
    tags: ["pneumonia", "amoxicilina", "penicilina cristalina", "taquipneia"],
    resumo: "Taquipneia para a idade + febre/tosse: amoxicilina VO; grave (tiragem, SpO₂ < 92%): internação com penicilina/ampicilina EV.",
    manejo: [
      "FR elevada: < 2 meses ≥ 60; 2–11 meses ≥ 50; 1–4 anos ≥ 40; ≥ 5 anos ≥ 30.",
      "Sinais de gravidade: tiragem subcostal, SpO₂ < 92%, gemência, não aceita líquidos, convulsão, letargia, < 2 meses.",
      "Atípica (> 5 anos, quadro arrastado, sibilos): macrolídeo.",
      "Reavaliar em 48–72 h.",
    ],
    rx: [
      { t: "Ambulatorial", itens: [
        { m: "Amoxicilina 400 mg/5 mL", p: "50 mg/kg/dia VO ÷ 2–3 por 7 dias.", k: { d: 50, por: "dia", n: 2, max: 1000, c: 80, f: "mL" } },
        { m: "Azitromicina 200 mg/5 mL", p: "10 mg/kg/dia VO 1x/dia por 5 dias (atípica).", k: { d: 10, max: 500, c: 40, f: "mL" } },
      ]},
      { t: "Internação", itens: [
        { m: "Penicilina G cristalina", p: "150.000–200.000 UI/kg/dia EV ÷ 4 (6/6 h).", k: { d: [150000, 200000], u: "UI", por: "dia", n: 4, max: 4000000 } },
        { m: "Ampicilina 500 mg/1 g", p: "150–200 mg/kg/dia EV ÷ 4.", k: { d: [150, 200], por: "dia", n: 4, max: 2000 } },
        { m: "Ceftriaxona 1 g", p: "50–100 mg/kg/dia EV 1x/dia (grave/complicada).", k: { d: [50, 100], max: 2000 } },
        { m: "Oxacilina 500 mg", p: "150–200 mg/kg/dia EV ÷ 4 (suspeita de estafilococo/empiema).", k: { d: [150, 200], por: "dia", n: 4, max: 2000 } },
      ]},
    ],
    fontes: ["GPP", "PSZ"],
  },
  {
    id: "p-asma", titulo: "Crise de asma / sibilância", area: "pediatria", sistema: "Respiratório",
    tags: ["asma", "broncoespasmo", "salbutamol", "berotec", "prednisolona", "sibilância"],
    resumo: "Salbutamol com espaçador a cada 20 min na 1ª hora + ipratrópio nas moderadas/graves + corticoide oral.",
    manejo: [
      "Avaliar gravidade (fala, tiragem, SpO₂, FR). O₂ para SpO₂ ≥ 94%.",
      "Spray com espaçador é tão eficaz quanto nebulização e com menos taquicardia.",
      "Corticoide sistêmico na 1ª hora, VO se tolerar.",
      "Grave/refratária: sulfato de magnésio EV, considerar UTI.",
    ],
    alarme: ["Sonolência, cianose, tórax silencioso, incapaz de falar/mamar → emergência."],
    rx: [
      { t: "PS", itens: [
        { m: "Salbutamol spray 100 mcg/jato + espaçador", p: "< 20 kg: 4–6 jatos; ≥ 20 kg: 6–10 jatos a cada 20 min na 1ª hora." },
        { m: "Fenoterol gotas 5 mg/mL (Berotec®) — nebulização", p: "1 gota/3 kg (máx. 10 gotas) + 3–4 mL SF, a cada 20 min até 3x.", k: { d: 0.0833, max: 2.5, c: 5, f: "gotas", gpm: 20 }, o: "Equivale a 1 gota a cada 3 kg." },
        { m: "Ipratrópio 0,25 mg/mL (Atrovent®)", p: "< 1 ano 10 gotas; 1–6 anos 20 gotas; > 6 anos 40 gotas, na mesma nebulização, 20/20 min na 1ª hora." },
        { m: "Prednisolona 3 mg/mL", p: "1–2 mg/kg VO dose única (máx. 40 mg).", k: { d: [1, 2], max: 40, c: 3, f: "mL" } },
        { m: "Metilprednisolona 125 mg", p: "1–2 mg/kg EV (se não tolera VO).", k: { d: [1, 2], max: 60 } },
        { m: "Sulfato de magnésio 50%", p: "25–50 mg/kg EV em 20 min (máx. 2 g), diluído em SF.", k: { d: [25, 50], max: 2000, c: 500, f: "mL" } },
      ]},
      { t: "Alta — receita", itens: [
        { m: "Prednisolona 3 mg/mL", p: "1–2 mg/kg/dia VO 1x/dia por 3–5 dias (máx. 40 mg/dia).", k: { d: [1, 2], max: 40, c: 3, f: "mL" } },
        { m: "Salbutamol spray 100 mcg/jato + espaçador", p: "2–4 jatos de 4/4–6/6 h por 3–5 dias, depois se necessário." },
        { m: "Budesonida spray 200 mcg (ou beclometasona)", p: "Manter corticoide inalatório e encaminhar ao seguimento." },
      ]},
    ],
    fontes: ["GPP", "PSZ", "MPP"],
  },
  {
    id: "p-bronquiolite", titulo: "Bronquiolite viral aguda", area: "pediatria", sistema: "Respiratório",
    tags: ["bronquiolite", "vsr", "lactente", "sibilância"],
    resumo: "< 2 anos, 1º episódio de sibilância após pródromo viral: suporte (aspiração, hidratação, O₂). Sem broncodilatador/corticoide de rotina.",
    manejo: [
      "Lavagem e aspiração nasal antes das mamadas.",
      "O₂ se SpO₂ < 90–92%; cateter de alto fluxo nos moderados/graves.",
      "Internar: < 3 meses (ou prematuro < 6 meses), apneia, SpO₂ baixa, recusa alimentar, desconforto importante.",
      "Salina hipertônica 3% apenas em internados (não no PS).",
    ],
    rx: [
      { t: "Suporte", itens: [
        { m: "Soro fisiológico 0,9% nasal", p: "Lavagem 1–3 mL em cada narina antes das mamadas e aspiração." },
        { m: "Paracetamol gotas 200 mg/mL", p: "10–15 mg/kg/dose se febre.", k: { d: [10, 15], max: 750, c: 200, f: "gotas", gpm: 15 } },
      ]},
    ],
    fontes: ["GPP"],
  },
  {
    id: "p-crupe", titulo: "Laringite viral (crupe)", area: "pediatria", sistema: "Respiratório",
    tags: ["crupe", "laringite", "estridor", "dexametasona", "adrenalina inalatória"],
    resumo: "Tosse ladrante + estridor: dexametasona dose única para todos; adrenalina nebulizada se estridor em repouso.",
    manejo: [
      "Manter a criança calma no colo; evitar exames desnecessários.",
      "Estridor em repouso/desconforto: adrenalina inalatória e observar 2–4 h (rebote).",
      "Diferenciais: epiglotite (salivação, toxemia), corpo estranho, traqueíte bacteriana.",
    ],
    rx: [
      { t: "PS", itens: [
        { m: "Dexametasona 4 mg/mL (EV/IM) ou elixir 0,1 mg/mL", p: "0,15–0,6 mg/kg dose única (máx. 10 mg).", k: { d: [0.15, 0.6], max: 10, c: 4, f: "mL" } },
        { m: "Adrenalina 1 mg/mL (1:1.000) — nebulização", p: "0,5 mL/kg (máx. 5 mL) pura ou completada com SF, em nebulização com O₂.", k: { d: 0.5, u: "mL", max: 5 } },
      ]},
    ],
    fontes: ["GPP"],
  },
  {
    id: "p-convulsao", titulo: "Crise convulsiva / convulsão febril", area: "pediatria", sistema: "Neurologia",
    tags: ["convulsão", "diazepam", "midazolam", "fenitoína", "fenobarbital", "estado de mal"],
    resumo: "Crise > 5 min: benzodiazepínico (pode repetir 1x) → fenitoína ou fenobarbital. Glicemia sempre.",
    manejo: [
      "Decúbito lateral, aspirar, O₂, glicemia capilar (hipoglicemia: SG 10% 2–5 mL/kg).",
      "Sem acesso: midazolam IM/intranasal/bucal ou diazepam retal.",
      "Convulsão febril simples (6 m–5 anos, generalizada, < 15 min, 1 em 24 h): antitérmico e orientação; investigar se complexa ou sinais meníngeos.",
    ],
    rx: [
      { t: "1ª linha", itens: [
        { m: "Diazepam 5 mg/mL (ampola 2 mL)", p: "0,3 mg/kg EV lento (máx. 10 mg); retal 0,5 mg/kg (máx. 20 mg). Pode repetir 1x em 5 min.", k: { d: 0.3, max: 10, c: 5, f: "mL" } },
        { m: "Midazolam 5 mg/mL", p: "0,2 mg/kg IM/IN/bucal (máx. 10 mg) ou 0,1–0,2 mg/kg EV.", k: { d: 0.2, max: 10, c: 5, f: "mL" } },
      ]},
      { t: "2ª linha", itens: [
        { m: "Fenitoína 50 mg/mL", p: "20 mg/kg EV em SF 0,9% (1 mg/kg/min, máx. 50 mg/min; máx. 1 g).", k: { d: 20, max: 1000, c: 50, f: "mL" } },
        { m: "Fenobarbital 100 mg/mL", p: "15–20 mg/kg EV em 20 min (máx. 1 g) — 1ª escolha no neonato.", k: { d: [15, 20], max: 1000, c: 100, f: "mL" } },
      ]},
      { t: "Hipoglicemia", itens: [
        { m: "Soro glicosado 10%", p: "2–5 mL/kg EV em bolus.", k: { d: [2, 5], u: "mL" } },
      ]},
    ],
    fontes: ["GPP", "PSZ", "MPP"],
  },
  {
    id: "p-itu", titulo: "Infecção do trato urinário", area: "pediatria", sistema: "Genitourinário",
    tags: ["itu", "infecção urinária", "pielonefrite", "cefalexina"],
    resumo: "Urocultura por método adequado antes do ATB; febril → tratar como pielonefrite 7–14 dias.",
    manejo: [
      "Coleta por sondagem/punção em quem não tem controle esfincteriano (saco coletor só exclui se negativo).",
      "Internar: < 2–3 meses, toxemia, vômitos, desidratação, falha VO.",
      "USG de rins e vias urinárias após 1ª ITU febril.",
    ],
    rx: [
      { t: "Ambulatorial", itens: [
        { m: "Cefalexina 250 mg/5 mL", p: "50–100 mg/kg/dia VO ÷ 4 (6/6 h) por 7–10 dias.", k: { d: [50, 100], por: "dia", n: 4, max: 1000, c: 50, f: "mL" } },
        { m: "Amoxicilina + clavulanato 250/62,5 mg/5 mL", p: "40–50 mg/kg/dia VO ÷ 3 (8/8 h).", k: { d: [40, 50], por: "dia", n: 3, max: 875, c: 50, f: "mL" } },
        { m: "Cefuroxima 250 mg/5 mL", p: "30 mg/kg/dia VO ÷ 2.", k: { d: 30, por: "dia", n: 2, max: 500, c: 50, f: "mL" } },
      ]},
      { t: "Internação", itens: [
        { m: "Ceftriaxona 1 g", p: "50–75 mg/kg/dia EV 1x/dia.", k: { d: [50, 75], max: 2000 } },
        { m: "Gentamicina 40 mg/mL", p: "5–7,5 mg/kg/dia EV 1x/dia.", k: { d: [5, 7.5], max: 320, c: 40, f: "mL" } },
      ]},
    ],
    fontes: ["GPP", "MPP"],
  },
  {
    id: "p-anafilaxia", titulo: "Anafilaxia", area: "pediatria", sistema: "Alergia",
    tags: ["anafilaxia", "adrenalina", "alergia grave"],
    resumo: "Adrenalina IM 0,01 mg/kg (máx. 0,3 mg na criança / 0,5 mg adolescente) na coxa; repetir a cada 5–15 min.",
    manejo: [
      "Decúbito, O₂, acesso; SF 20 mL/kg se hipotensão.",
      "Adjuvantes depois da adrenalina: anti-histamínico, corticoide, beta-2.",
      "Observar 6–12 h; alta com plano de ação e encaminhamento ao alergista.",
    ],
    rx: [
      { t: "PS", itens: [
        { m: "Adrenalina 1 mg/mL (1:1.000)", p: "0,01 mg/kg IM = 0,01 mL/kg (máx. 0,3–0,5 mL).", k: { d: 0.01, max: 0.5, c: 1, f: "mL" } },
        { m: "Soro fisiológico 0,9%", p: "20 mL/kg EV em bolus se hipotensão.", k: { d: 20, u: "mL" } },
        { m: "Difenidramina 50 mg/mL", p: "1 mg/kg EV/IM (máx. 50 mg).", k: { d: 1, max: 50, c: 50, f: "mL" } },
        { m: "Metilprednisolona 125 mg", p: "1–2 mg/kg EV (máx. 125 mg).", k: { d: [1, 2], max: 125 } },
        { m: "Hidrocortisona 100 mg", p: "5–10 mg/kg EV (máx. 500 mg).", k: { d: [5, 10], max: 500 } },
      ]},
    ],
    fontes: ["GPP", "PSZ"],
  },
  {
    id: "p-alergia", titulo: "Urticária / reação alérgica leve", area: "pediatria", sistema: "Alergia",
    tags: ["urticária", "alergia", "anti-histamínico", "prurido", "estrófulo"],
    resumo: "Anti-histamínico; corticoide oral curto se extensa. Afastar anafilaxia.",
    manejo: ["Identificar desencadeante (alimento, medicamento, picada, infecção viral).", "Picadas de inseto (estrófulo): anti-histamínico e repelente."],
    rx: [
      { t: "Receita", itens: [
        { m: "Desloratadina 0,5 mg/mL", p: "6–11 meses 2 mL; 1–5 anos 2,5 mL; 6–11 anos 5 mL VO 1x/dia." },
        { m: "Loratadina 1 mg/mL", p: "< 30 kg: 5 mL; ≥ 30 kg: 10 mL VO 1x/dia (≥ 2 anos)." },
        { m: "Hidroxizina 2 mg/mL", p: "1–2 mg/kg/dia VO ÷ 3 (prurido intenso).", k: { d: [1, 2], por: "dia", n: 3, max: 25, c: 2, f: "mL" } },
        { m: "Prednisolona 3 mg/mL", p: "1 mg/kg/dia VO por 3–5 dias (máx. 40 mg).", k: { d: 1, max: 40, c: 3, f: "mL" } },
      ]},
      { t: "PS", itens: [
        { m: "Prometazina 25 mg/mL", p: "0,5–1 mg/kg IM (> 2 anos; máx. 25 mg).", k: { d: [0.5, 1], max: 25, c: 25, f: "mL" } },
      ]},
    ],
    fontes: ["GPP", "MPP"],
  },
  {
    id: "p-impetigo", titulo: "Impetigo e infecções de pele", area: "pediatria", sistema: "Pele",
    tags: ["impetigo", "mupirocina", "cefalexina", "celulite", "pele"],
    resumo: "Localizado: antibiótico tópico; extenso/bolhoso ou celulite: cefalexina VO.",
    manejo: ["Remover crostas com água e sabão.", "Unhas curtas; evitar coçar; afastamento escolar 24 h após início do ATB."],
    rx: [
      { t: "Receita", itens: [
        { m: "Mupirocina 2% pomada", p: "Aplicar 3x/dia por 5–7 dias (lesões localizadas)." },
        { m: "Cefalexina 250 mg/5 mL", p: "50 mg/kg/dia VO ÷ 4 por 7 dias.", k: { d: 50, por: "dia", n: 4, max: 500, c: 50, f: "mL" } },
        { m: "Cefadroxila 250 mg/5 mL", p: "30 mg/kg/dia VO ÷ 2 por 7 dias.", k: { d: 30, por: "dia", n: 2, max: 1000, c: 50, f: "mL" } },
      ]},
    ],
    fontes: ["GPP"],
  },
  {
    id: "p-escabiose", titulo: "Escabiose / pediculose", area: "pediatria", sistema: "Pele",
    tags: ["sarna", "escabiose", "piolho", "ivermectina", "permetrina"],
    resumo: "Permetrina tópica (≥ 2 meses) ou ivermectina (≥ 15 kg); tratar contactantes e lavar roupas.",
    manejo: ["Tratar toda a família ao mesmo tempo.", "Roupas e lençóis lavados em água quente ou isolados em saco por 3 dias."],
    rx: [
      { t: "Receita", itens: [
        { m: "Permetrina 5% loção", p: "Aplicar do pescoço aos pés à noite, lavar após 8–12 h; repetir em 7 dias." },
        { m: "Ivermectina 6 mg", p: "200 mcg/kg VO dose única, repetir em 7–14 dias (≥ 15 kg).", k: { d: 0.2, max: 12 }, o: "15–24 kg: ½ cp; 25–35 kg: 1 cp; 36–50: 1½; 51–65: 2." },
      ]},
    ],
    fontes: ["GPP"],
  },
  {
    id: "p-parasitose", titulo: "Parasitoses intestinais", area: "pediatria", sistema: "Gastrointestinal",
    tags: ["verme", "verminose", "albendazol", "giárdia", "metronidazol"],
    resumo: "Albendazol para helmintos (≥ 2 anos dose plena); metronidazol/secnidazol para giárdia e ameba.",
    manejo: ["Higiene de mãos e alimentos; tratar contactantes se oxiuríase."],
    rx: [
      { t: "Receita", itens: [
        { m: "Albendazol 400 mg (cp ou 40 mg/mL)", p: "1–2 anos: 200 mg; ≥ 2 anos: 400 mg VO dose única (repetir em 14 dias na oxiuríase; 3 dias na estrongiloidíase/teníase)." },
        { m: "Metronidazol — benzoilmetronidazol 40 mg/mL (= 25 mg/mL de metronidazol)", p: "Giárdia: 15 mg/kg/dia ÷ 3 por 5–7 dias. Ameba: 35–50 mg/kg/dia ÷ 3 por 7–10 dias (doses em mg de metronidazol).", k: { d: 15, por: "dia", n: 3, max: 250, c: 25, f: "mL" }, o: "A suspensão pediátrica (Flagyl® Pediátrico) é o sal benzoil: 40 mg do sal equivalem a 25 mg de metronidazol." },
        { m: "Secnidazol 450 mg/15 mL", p: "30 mg/kg VO dose única (giárdia; máx. 2 g).", k: { d: 30, max: 2000, c: 30, f: "mL" } },
      ]},
    ],
    fontes: ["GPP", "MPP"],
  },
  {
    id: "p-estomatite", titulo: "Estomatite / aftas / herpangina", area: "pediatria", sistema: "Otorrino",
    tags: ["aftas", "estomatite herpética", "mão-pé-boca", "aciclovir"],
    resumo: "Analgesia e hidratação (alimentos frios); aciclovir na gengivoestomatite herpética precoce.",
    manejo: ["Risco principal é desidratação por recusa alimentar.", "Aciclovir se < 72–96 h de início com lesões extensas."],
    rx: [
      { t: "Receita", itens: [
        { m: "Paracetamol gotas 200 mg/mL", p: "10–15 mg/kg/dose VO 6/6 h.", k: { d: [10, 15], max: 750, c: 200, f: "gotas", gpm: 15 } },
        { m: "Ibuprofeno gotas 50 mg/mL (1 gota = 5 mg)", p: "5–10 mg/kg/dose VO 8/8 h (1–2 gotas/kg).", k: { d: [5, 10], max: 400, c: 50, f: "gotas", gpm: 10 } },
        { m: "Aciclovir 200 mg/5 mL", p: "15 mg/kg/dose VO 5x/dia por 7 dias (máx. 200 mg/dose).", k: { d: 15, max: 200, c: 40, f: "mL" } },
      ]},
    ],
    fontes: ["GPP"],
  },
  {
    id: "p-conjuntivite", titulo: "Conjuntivite", area: "pediatria", sistema: "Otorrino",
    tags: ["olho", "colírio", "tobramicina"],
    resumo: "Viral: limpeza/compressas. Bacteriana (secreção purulenta, pálpebras coladas): colírio ATB 7 dias.",
    manejo: ["Neonato com conjuntivite purulenta: suspeitar gonococo/clamídia — avaliação e ATB sistêmico.", "Associada a OMA: tratar com ATB oral (amoxicilina-clavulanato)."],
    rx: [
      { t: "Receita", itens: [
        { m: "Tobramicina 0,3% colírio", p: "1 gota de 4/4 h por 7 dias." },
        { m: "Soro fisiológico 0,9%", p: "Limpeza ocular com gaze várias vezes ao dia." },
      ]},
    ],
    fontes: ["GPP"],
  },
  {
    id: "p-cad", titulo: "Cetoacidose diabética na criança", area: "pediatria", sistema: "Endócrino",
    tags: ["cad", "insulina", "edema cerebral", "diabetes tipo 1"],
    resumo: "Expansão cautelosa (10–20 mL/kg), reposição lenta em 48 h, insulina 0,05–0,1 U/kg/h após 1 h de fluido, sem bolus.",
    manejo: [
      "Expansão: SF 0,9% 10–20 mL/kg em 30–60 min (repetir só se choque).",
      "Déficit (5–10%) + manutenção reposto em 24–48 h com SF 0,9%/0,45%.",
      "Insulina regular 0,05–0,1 U/kg/h, iniciada 1 h após o início dos fluidos; nunca em bolus.",
      "Potássio 40 mEq/L no soro assim que K < 5,5 e diurese presente; K < 3 → adiar insulina.",
      "Glicemia < 250–300: acrescentar glicose (SG 5–10%) mantendo a insulina.",
      "Edema cerebral (cefaleia, bradicardia, HAS, rebaixamento): manitol 0,5–1 g/kg ou salina 3% 2,5–5 mL/kg.",
    ],
    alarme: ["Monitorização neurológica horária nas primeiras 12–24 h."],
    rx: [
      { t: "Fluidos", itens: [
        { m: "Soro fisiológico 0,9%", p: "10–20 mL/kg EV em 30–60 min.", k: { d: [10, 20], u: "mL" } },
      ]},
      { t: "Insulina", itens: [
        { m: "Insulina regular 100 UI/mL", p: "50 UI em 50 mL SF (1 UI/mL) a 0,05–0,1 UI/kg/h.", k: { d: [0.05, 0.1], u: "UI", c: 1, f: "mL" }, o: "Valor em mL = mL/h na bomba." },
      ]},
      { t: "Edema cerebral", itens: [
        { m: "Manitol 20%", p: "0,5–1 g/kg EV em 10–15 min (2,5–5 mL/kg).", k: { d: [0.5, 1], u: "g", c: 0.2, f: "mL" } },
        { m: "NaCl 3%", p: "2,5–5 mL/kg EV em 10–15 min.", k: { d: [2.5, 5], u: "mL" } },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "p-meningite", titulo: "Meningite bacteriana", area: "pediatria", sistema: "Neurologia",
    tags: ["meningite", "ceftriaxona", "dexametasona"],
    resumo: "Ceftriaxona 100 mg/kg/dia + dexametasona; não atrasar ATB pela punção.",
    manejo: [
      "< 1 mês: ampicilina + cefotaxima/gentamicina (não ceftriaxona em neonato com hiperbilirrubinemia).",
      "Dexametasona antes ou junto da 1ª dose (sobretudo Haemophilus).",
      "Notificar e fazer quimioprofilaxia de contactantes.",
    ],
    rx: [
      { t: "Tratamento", itens: [
        { m: "Ceftriaxona 1 g", p: "100 mg/kg/dia EV ÷ 1–2 (máx. 4 g/dia) por 7–14 dias.", k: { d: 100, por: "dia", n: 2, max: 2000 } },
        { m: "Dexametasona 4 mg/mL", p: "0,15 mg/kg EV 6/6 h por 2–4 dias.", k: { d: 0.15, max: 10, c: 4, f: "mL" } },
        { m: "Vancomicina 500 mg", p: "60 mg/kg/dia EV ÷ 4 (pneumococo resistente).", k: { d: 60, por: "dia", n: 4, max: 1000 } },
      ]},
      { t: "Quimioprofilaxia (meningococo)", itens: [
        { m: "Rifampicina 20 mg/mL", p: "< 1 mês: 5 mg/kg; ≥ 1 mês: 10 mg/kg VO 12/12 h por 2 dias (máx. 600 mg/dose).", k: { d: 10, max: 600, c: 20, f: "mL" } },
      ]},
    ],
    fontes: ["PSZ", "GPP", "MPP"],
  },
  {
    id: "p-tsv", titulo: "Taquicardia supraventricular", area: "pediatria", sistema: "Cardiovascular",
    tags: ["tsv", "adenosina", "arritmia"],
    resumo: "Estável: manobra vagal (gelo na face no lactente) e adenosina 0,1 mg/kg; instável: cardioversão 0,5–1 J/kg.",
    manejo: [
      "FC > 220 (lactente) ou > 180 (criança) com QRS estreito e sem variação.",
      "Adenosina em bolus rápido com flush, via acesso mais próximo do coração.",
    ],
    rx: [
      { t: "PS", itens: [
        { m: "Adenosina 3 mg/mL", p: "1ª dose 0,1 mg/kg (máx. 6 mg); 2ª dose 0,2 mg/kg (máx. 12 mg), em bolus + flush SF.", k: { d: 0.1, max: 6, c: 3, f: "mL" } },
      ]},
    ],
    fontes: ["PSZ"],
  },
  {
    id: "p-iot", titulo: "Intubação e reanimação — doses pediátricas", area: "pediatria", sistema: "Suporte avançado",
    tags: ["pcr", "reanimação", "adrenalina", "iot", "cetamina", "rocurônio", "amiodarona"],
    resumo: "Doses de PCR e sequência rápida pelo peso; tubo (sem cuff) = idade/4 + 4.",
    manejo: [
      "Tubo com cuff: idade/4 + 3,5; profundidade ≈ 3 × diâmetro do tubo.",
      "Desfibrilação: 2 J/kg, depois 4 J/kg (máx. 10 J/kg ou dose adulta).",
      "Cardioversão sincronizada: 0,5–1 J/kg, depois 2 J/kg.",
    ],
    rx: [
      { t: "PCR", itens: [
        { m: "Adrenalina 1 mg/mL diluída 1:10 (0,1 mg/mL)", p: "0,01 mg/kg = 0,1 mL/kg da solução diluída, EV/IO a cada 3–5 min (máx. 1 mg).", k: { d: 0.01, max: 1, c: 0.1, f: "mL" } },
        { m: "Adrenalina 1 mg/mL (pura) — via endotraqueal", p: "0,1 mg/kg = 0,1 mL/kg pelo tubo, só se não houver acesso EV/IO (máx. 2,5 mg); depois 3–5 mL de SF e ventilar.", k: { d: 0.1, max: 2.5, c: 1, f: "mL" } },
        { m: "Amiodarona 50 mg/mL", p: "5 mg/kg EV/IO em bolus (FV/TV sem pulso), até 3 doses (máx. 300 mg).", k: { d: 5, max: 300, c: 50, f: "mL" } },
        { m: "Atropina 0,5 mg/mL", p: "0,02 mg/kg (mín. 0,1 mg; máx. 0,5 mg) — bradicardia vagal.", k: { d: 0.02, max: 0.5, c: 0.5, f: "mL" } },
      ]},
      { t: "Sequência rápida", itens: [
        { m: "Cetamina 50 mg/mL", p: "1–2 mg/kg EV.", k: { d: [1, 2], c: 50, f: "mL" } },
        { m: "Midazolam 5 mg/mL", p: "0,1–0,3 mg/kg EV.", k: { d: [0.1, 0.3], max: 10, c: 5, f: "mL" } },
        { m: "Fentanil 50 mcg/mL", p: "1–2 mcg/kg EV.", k: { d: [1, 2], u: "mcg", c: 50, f: "mL" } },
        { m: "Rocurônio 10 mg/mL", p: "1 mg/kg EV.", k: { d: 1, c: 10, f: "mL" } },
        { m: "Succinilcolina 10 mg/mL (reconstituída)", p: "Lactente 2 mg/kg; criança 1–1,5 mg/kg EV.", k: { d: [1, 2], c: 10, f: "mL" } },
      ]},
    ],
    fontes: ["PSZ", "GPP", "MPP"],
  },
];
