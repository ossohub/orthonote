import type { Condicao, NotaPS } from "./types";

// Revisão diária do Pronto-Socorro (um capítulo por dia — ver docs/revisao-diaria).
// NOTAS_PS: id da condição → notas de comparação (concorda / diverge / acrescenta).
// NOVOS_PS: condições que as referências trazem e o site ainda não tinha.
// Sempre com palavras próprias; nunca copiar texto dos livros.
// Erros de dose ou conduta são corrigidos direto no arquivo da condição
// (adulto-1..4.ts ou pediatria.ts) e registrados no resumo da fila.

export const NOTAS_PS: Record<string, NotaPS[]> = {
  // PS-01-01 — PS Zerado, arritmias, SCA e início de ICAD/EAP
  tsv: [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Se a adenosina provocar BAV (de qualquer grau), não repetir a dose. Raramente pode levar a assistolia ou FV: desfibrilador pronto." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Evitar manobra vagal em paciente com doença pulmonar descompensada. Puncionar veia proximal: a adenosina age em segundos e se perde em acesso distal." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Criança: adenosina 0,05–0,1 mg/kg (máx. 6 mg na 1ª dose); sem reversão em 1–2 min, subir 0,05–0,1 mg/kg por vez até dose única máxima de 12 mg." },
  ],
  tv: [
    { fonte: "PSZ", tipo: "diverge", texto: "O guia descreve o ataque como 300 mg em 250 mL de SG 5% em 30 min. O site mantém 150 mg em 10 min (repetível), que é o esquema do ACLS para TV estável; os dois terminam na mesma manutenção de 900 mg/24 h." },
    // PS-04-01 (PSZ 1ª ed.)
    { fonte: "PSZ", tipo: "diverge", texto: "A 1ª edição do guia faz o ataque de 150 mg em 30 min e uma manutenção de só 450 mg em 24 h (16 mL/h por 6 h e 8 mL/h por 18 h). O site segue o ACLS: ataque em 10 min e 900 mg em 24 h (1 mg/min por 6 h, depois 0,5 mg/min)." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Se a amiodarona falhar, o guia usa lidocaína 1,5 mg/kg EV lenta, com reforço de 0,5 mg/kg. Teto usual: 3 mg/kg no total. Entrou na prescrição do site." },
  ],
  fa: [
    { fonte: "PSZ", tipo: "diverge", texto: "O guia usa 24 h como limite seguro para reverter sem anticoagulação prévia (alinhado à ESC 2024); o site falava em 48 h (critério americano antigo). O site passou a usar 24 h." },
    { fonte: "PSZ", tipo: "diverge", texto: "Apixabana: o guia reduz para 2,5 mg 12/12 h pelo ClCr 15–30 mL/min (critério europeu). O site usa a regra dos 2 de 3 (≥ 80 anos, ≤ 60 kg, Cr ≥ 1,5); vale considerar os dois. Rivaroxabana: o guia cita redução com ClCr 30–50; a bula reduz para 15 mg em 15–50." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Edoxabana: contraindicada com TFG < 15; em idoso > 80 anos com alto risco de sangramento, pode-se considerar 15 mg/dia. Interações que pedem 30 mg: dronedarona, ciclosporina, eritromicina, cetoconazol." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Após cardioversão com amiodarona EV, seguir com impregnação oral até cerca de 10 g (esquema 200 mg 8/8 h → 12/12 h → 1x/dia, 10 dias cada fase)." },
    // PS-04-01 (PSZ 1ª ed.)
    { fonte: "PSZ", tipo: "acrescenta", texto: "Para reverter FA, o guia calcula o ataque de amiodarona pelo peso: 5–7 mg/kg em SG 5% em 30–60 min (cerca de 350–500 mg em 70 kg). Os 300 mg do site ficam na faixa baixa; em paciente pesado, a dose por peso é mais adequada." },
    { fonte: "PSZ", tipo: "diverge", texto: "Metoprolol EV: o guia vai até 20 mg (4 doses de 5 mg a cada 5 min); o site para em 15 mg, como a maioria dos protocolos. Verapamil: o guia permite até 20 mg EV e mantém 80–160 mg VO 8/8 h; o site começa a manutenção com 40 mg 8/8 h e ajusta." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Para manter o ritmo após a cardioversão, o guia usa propafenona 300 mg 12/12 h em quem não tem doença cardíaca estrutural, e amiodarona em quem tem IC. A propafenona entrou na prescrição do site." },
  ],
  bradi: [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Bradicardia estável: monitorizar, observar e chamar o especialista; transferir se preciso. No BAV total, ir direto ao marcapasso sem insistir na atropina." },
  ],
  "iam-supra": [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Clopidogrel de ataque varia pela estratégia: 600 mg se angioplastia; 300 mg se trombólise (< 75 anos) ou supra visto tardiamente; 75 mg só no > 75 anos que vai trombolisar." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Ticagrelor: cuidado em quem já tem bradicardia. Nitrato: evitar se sildenafil/vardenafil < 24 h ou tadalafila < 48 h." },
    // PS-02-01 (PRV)
    { fonte: "PRV", tipo: "acrescenta", texto: "Analgesia: nitrato é a 1ª escolha (dinitrato 5 mg SL a cada 5 min, até 3 doses; depois nitroglicerina EV se dor ou PA alta). Morfina só se dor refratária ao nitrato, em 2 mg a cada 5 min (máx. 25 mg), e nunca no infarto de VD." },
    { fonte: "PRV", tipo: "diverge", texto: "O guia considera hipotensão para contraindicar nitrato com PAS < 110 mmHg; as diretrizes usuais usam PAS < 90 mmHg (ou queda ≥ 30 mmHg do basal). O site segue as diretrizes." },
    { fonte: "PRV", tipo: "acrescenta", texto: "IECA nas primeiras 24 h para quem tem DM, HAS ou IC com FE reduzida (BRA se intolerância). O guia usa enalapril 10 mg 12/12 h; as diretrizes preferem começar baixo (2,5–5 mg 12/12 h) e subir conforme PA e função renal." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Glicemia capilar 6/6 h com alvo 70–180 mg/dL; corrigir com insulina regular SC em escala (ex.: 181–200 → 2 UI, subindo 2 UI a cada faixa de 50 mg/dL até 12 UI se ≥ 400). Estatina alternativa: rosuvastatina 40 mg/dia." },
  ],
  "sca-ssst": [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Prasugrel (60 mg de ataque → 10 mg/dia) só depois de conhecer a anatomia coronária; evitar se < 60 kg, AVC prévio ou > 75 anos. Betabloqueador oral pode ser carvedilol 3,125 mg 12/12 h; O₂ só se SpO₂ < 90%." },
    // PS-02-01 (PRV)
    { fonte: "PRV", tipo: "acrescenta", texto: "Nitrato SL do PS é o dinitrato de isossorbida 5 mg (Isordil®); o mononitrato não existe em forma sublingual. O site foi corrigido." },
    // PS-04-01 (PSZ 1ª ed.)
    { fonte: "PSZ", tipo: "acrescenta", texto: "O Tridil® também existe em ampola de 25 mg/5 mL. Uma ampola em cerca de 245 mL dá 100 mcg/mL, metade da solução feita com a ampola de 50 mg: conferir a ampola antes de usar a velocidade (mL/h) da prescrição." },
    { fonte: "PSZ", tipo: "diverge", texto: "O guia escreve metoprolol 5 mg a cada 5 min (até 3 doses), que é o esquema EV. As diretrizes atuais não usam betabloqueador EV de rotina na SCA; o site prefere metoprolol VO 25–50 mg 12/12 h nas primeiras 24 h, se não houver IC, choque ou BAV." },
  ],
  eap: [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Separar dois cenários: SCAPE (crise simpática hiperaguda, líquido no lugar errado sem sobrecarga) → VNI + nitroglicerina em bolus; FOSPE (sobrecarga subaguda da IC descompensada) → diurético é a base. O POCUS (linhas B) muda antes do raio-X e ajuda no diagnóstico e no seguimento." },
    { fonte: "PSZ", tipo: "diverge", texto: "O guia propõe furosemida de ataque 1–1,5 mg/kg EV; o site usa 0,5–1 mg/kg no paciente virgem de diurético. Em usuário crônico, ambos usam dose EV ao menos igual à oral habitual." },
    // PS-02-01 (PRV)
    { fonte: "PRV", tipo: "diverge", texto: "O guia limita o nitroprussiato a 45 mL/h da solução de 200 mcg/mL (cerca de 150 mcg/min, ~2 mcg/kg/min em 70 kg), subindo 2 mL/h a cada 3–5 min, com alvo de PAS 110–130 mmHg. O site cita o teto da bula (10 mcg/kg/min), que no EAP raramente é necessário." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Furosemida: reavaliar em cerca de 20 min e repetir se ainda congesto. Usuário crônico recebe EV de 1 a 2 vezes a dose diária habitual (ex.: 80 mg/dia VO → 40–80 mg EV)." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Nitroprussiato diluído em SG 5% (como manda a bula e o guia), em equipo protegido da luz. O site dizia SF e foi corrigido aqui, na emergência hipertensiva e na tabela de drogas vasoativas." },
    { fonte: "PRV", tipo: "acrescenta", texto: "CPAP com 5–10 cmH₂O se SpO₂ < 90%; alvo de SpO₂ 90–94%. Volume corrente de 6–8 mL/kg quando ventilado." },
    // PS-04-01 (PSZ 1ª ed.)
    { fonte: "PSZ", tipo: "acrescenta", texto: "Dobutamina: com 4 ampolas em 170 mL (4 mg/mL), o valor em mL/h fica perto da dose em mcg/kg/min só para quem pesa cerca de 65–70 kg; com 2 ampolas em 210 mL (2 mg/mL), fica perto do dobro. Fora desse peso, calcular: mL/h = dose × peso × 60 ÷ concentração (mcg/mL)." },
  ],
  // PS-03-01 — Guia do Plantonista Pediatria (GPP): doses de bolso, antibióticos, anti-histamínicos, asma e convulsão
  "p-febre": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia libera o ibuprofeno a partir de 12 meses; o site usa 6 meses, como a bula. Abaixo de 1 ano, preferir paracetamol ou dipirona quando houver dúvida." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Dipirona IM dói e caiu em desuso: no PS, preferir VO ou EV. Cetoprofeno gotas 20 mg/mL (1 gota = 1 mg) é outra opção a partir de 1 ano: 1 gota/kg/dose de 6/6 a 8/8 h." },
    // PED-01-01 — Manual de Prescrição Pediátrica (MPP): analgésicos
    { fonte: "MPP", tipo: "diverge", texto: "Dipirona VO: o manual escalona pela idade (lactente 10, pré-escolar 15, escolar 25 mg/kg/dose 6/6 h; > 12 anos 500–1.000 mg) e lembra que a SBP prefere 10–12 mg/kg/dose. Como 1 gota da solução de 500 mg/mL tem 25 mg, a regra de 1 gota/kg já é a dose máxima. O site mantém 15–25 mg/kg (faixa da bula); no lactente pequeno, ficar na parte baixa." },
    { fonte: "MPP", tipo: "acrescenta", texto: "Dipirona: não usar em porfiria hepática, deficiência de G6PD e discrasias sanguíneas. Junto com clorpromazina pode causar hipotermia grave. Agranulocitose é rara, mas grave: febre com dor de garganta ou aftas durante o uso pede hemograma." },
    { fonte: "MPP", tipo: "acrescenta", texto: "Paracetamol pode ser dado a cada 4–6 h, sem passar de 5 doses em 24 h (o que dá o teto de 75 mg/kg/dia do site). Adolescente: até 4 g/dia." },
    { fonte: "MPP", tipo: "diverge", texto: "O manual escreve ibuprofeno 5–10 mg/kg por dia, dividido em 3–4 doses. A dose usual é 5–10 mg/kg por dose (máx. 40 mg/kg/dia), como no site; por dia, a criança recebe muito pouco. Adolescente: 200–400 mg por dose." },
    { fonte: "MPP", tipo: "diverge", texto: "O manual ainda lista AAS como analgésico infantil (10–15 mg/kg 4/4–6/6 h). Hoje se evita AAS para dor e febre em menores de 12–16 anos pelo risco de síndrome de Reye, e ele é proibido em dengue, gripe e varicela. Uso pediátrico fica para indicações específicas (ex.: Kawasaki)." },
    { fonte: "MPP", tipo: "acrescenta", texto: "Avaliar a dor antes e depois de medicar: escala de faces a partir de 3–4 anos; nos menores, observar choro, expressão facial, agitação, FC e FR. Dor intensa de crise falciforme ou neoplasia merece analgesia precoce e reavaliação." },
    // Guia do Plantonista 2013 (MedResumos) — conferência das doses pediátricas
    { fonte: "MDR", tipo: "concorda", texto: "Paracetamol 10–15 mg/kg/dose e dipirona 10–25 mg/kg/dose (a partir de 3 meses), como no site. Dipirona supositório 300 mg só a partir de 18 kg." },
    { fonte: "MDR", tipo: "acrescenta", texto: "Ibuprofeno em gotas tem 10 gotas/mL (bula do Alivium®): 1 gota = 5 mg na de 50 mg/mL e 10 mg na de 100 mg/mL. O cálculo de gotas do site usava 20 gotas/mL e dava o dobro de gotas; foi corrigido. A bula limita a 200 mg por dose abaixo de 12 anos." },
    { fonte: "MDR", tipo: "diverge", texto: "O guia escreve cetoprofeno gotas 50 mg/mL; a apresentação é 20 mg/mL (1 gota = 1 mg). A posologia por gota (1 gota/kg; 25 gotas de 7 a 11 anos) está certa." },
    { fonte: "MDR", tipo: "diverge", texto: "Diclofenaco gotas: o guia conta 1 gota = 0,75 mg e usa 2–3 mg/kg/dia. Pela bula do Cataflam®, 1 gota ≈ 0,5 mg, 1–4 gotas/kg/dia (0,5–2 mg/kg/dia) em 2–3 tomadas, a partir de 1 ano. Diclofenaco IM não é para criança." },
    // PED-02-01 — Guia Rápido de Medicamentos em Pediatria (MPP)
    { fonte: "MPP", tipo: "acrescenta", texto: "Ibuprofeno: além do teto de 40 mg/kg/dia, o guia limita a 1.200 mg/dia na criança acima de 30 kg (dose de venda livre). Doses maiores, só com indicação anti-inflamatória e acompanhamento." },
    { fonte: "MPP", tipo: "diverge", texto: "O guia lista tramadol para crianças (1–2 mg/kg/dose de 4/4–6/6 h, máx. 400 mg/dia). Hoje se evita tramadol abaixo de 12 anos e após amigdalectomia até 18 anos (metabolizadores rápidos podem ter depressão respiratória grave). O site não o inclui na pediatria." },
  ],
  "paracetamol-intox": [
    // PED-01-01 (MPP)
    { fonte: "MPP", tipo: "diverge", texto: "O manual pediátrico cita lavagem gástrica ou indução de vômito na intoxicação por paracetamol. As diretrizes atuais não usam vômito induzido e só raramente lavagem: o site usa carvão ativado (1 g/kg) até 1–2 h e NAC conforme o nível sérico. A NAC VO do manual (140 mg/kg → 70 mg/kg 4/4 h, 17 doses) é igual à do site e funciona melhor se começar até 8 h." },
  ],
  "p-vomitos": [
    { fonte: "GPP", tipo: "diverge", texto: "Para vômitos fora do contexto de quimioterapia, o guia usa ondansetrona EV 0,1 mg/kg; o site usa 0,15 mg/kg (máx. 4 mg). As duas faixas são aceitas." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Dimenidrinato gotas 25 mg/mL (Dramin®): 1 gota/kg/dose até 6/6 h. Dá sono; a bula brasileira libera a partir de 2 anos. Metoclopramida: evitar na criança (risco de distonia), como o site já orienta." },
    { fonte: "MDR", tipo: "diverge", texto: "O guia ainda lista metoclopramida, e o número de dose do resumo do PS está errado (30–40 mg/kg). Se usar, é 0,1–0,15 mg/kg por dose, acima de 1 ano e como 2ª linha; o site prefere ondansetrona." },
    { fonte: "MDR", tipo: "diverge", texto: "Dimenidrinato: o guia libera desde o nascimento e indica a solução 12,5 mg/mL a 0,5 mL/kg (cerca de 6 mg/kg, dose 5 vezes maior que a usual de 1–1,25 mg/kg). A bula do Dramin® B6 libera a partir de 2 anos." },
    { fonte: "MDR", tipo: "concorda", texto: "Bromoprida a partir de 1 ano: gotas 4 mg/mL, 3–5 gotas/kg/dia divididas (cerca de 0,5–0,8 mg/kg/dia), máx. 30 gotas por dose." },
  ],
  "p-oma": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia usa amoxicilina 50 mg/kg/dia (até 90). O site parte de 80–90 mg/kg/dia (dose alta, pela resistência do pneumococo). Em região de baixa resistência e sem fatores de risco, 50 mg/kg/dia é aceito." },
    { fonte: "GPP", tipo: "diverge", texto: "Para amoxicilina-clavulanato, o guia cita 25 mg/kg/dia ÷ 8/8 h (dose baixa da bula). Na otite, essa dose fica fraca: usar 45 mg/kg/dia ou mais (até 90 mg/kg/dia com a apresentação 400/57)." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Azitromicina pode ser feita em 3 dias: 10 mg/kg/dia 1x/dia (máx. 500 mg). Suspensão 200 mg/5 mL: peso ÷ 4 = mL por dia." },
  ],
  "p-faringo": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia troca a dose da penicilina benzatina em 20 kg (até 20 kg: 600.000 UI; acima: 1.200.000 UI), como muitos protocolos brasileiros. O site usa o corte de 27 kg (AHA). Entre 20 e 27 kg, os dois esquemas são aceitos." },
    // PED-02-01 — Guia Rápido de Medicamentos em Pediatria (MPP)
    { fonte: "MPP", tipo: "acrescenta", texto: "Penicilina benzatina na criança pequena: o guia calcula 50.000 UI/kg em dose única até 27 kg, sem passar de 600.000 UI; acima de 27 kg, 1.200.000 UI. Na prática dá o mesmo teto do site, com dose menor no lactente e pré-escolar de baixo peso." },
  ],
  "p-itu": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Cistite sem febre (criança maior): nitrofurantoína 5–7 mg/kg/dia ÷ 4 por 7–10 dias. Não serve para ITU febril nem pielonefrite (não atinge o rim)." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Sulfametoxazol-trimetoprima (≥ 6 semanas), se o germe for sensível: suspensão 200+40 mg/5 mL = 1 mL/kg/dia ÷ 2 (cerca de 8 mg/kg/dia de trimetoprima). A resistência da E. coli é alta: não usar às cegas." },
    { fonte: "GPP", tipo: "diverge", texto: "O guia ainda lista ácido nalidíxico. Ele está em desuso (pouca ação e resistência alta); o site não o inclui." },
    // PED-02-01 — Guia Rápido de Medicamentos em Pediatria (MPP)
    { fonte: "MPP", tipo: "diverge", texto: "Cefalexina acima de 20 kg: a tabela do guia traz 500 mg/kg/dia de 6/6 h, o que é erro de digitação. O correto é 500 mg por dose de 6/6 h (máx. 4 g/dia). Abaixo de 20 kg, 50–100 mg/kg/dia ÷ 4, como no site." },
  ],
  "p-meningite": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia escreve ceftriaxona 50–100 mg/kg por dose de 12/12 h (até 200 mg/kg/dia). O site mantém 100 mg/kg/dia (÷ 1–2; máx. 4 g/dia), que é a dose de meningite das diretrizes." },
    // PED-02-01 — Guia Rápido de Medicamentos em Pediatria (MPP)
    { fonte: "MPP", tipo: "acrescenta", texto: "Ampicilina na meningite (lactente e criança, ou para cobrir Listeria no < 3 meses): 200–400 mg/kg/dia EV ÷ 4 (6/6 h), máx. 12 g/dia. Fora da meningite, o guia usa 100–200 mg/kg/dia ÷ 4." },
  ],
  "p-pneumonia": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Alternativa à azitromicina na suspeita de atípica: claritromicina 15 mg/kg/dia ÷ 12/12 h (7,5 mg/kg/dose; máx. 500 mg/dose), a partir de 6 meses." },
  ],
  "p-asma": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia propõe adrenalina nebulizada na asma grave. As diretrizes de asma não a recomendam (ela é do crupe): na crise grave, manter beta-2 + ipratrópio, corticoide e sulfato de magnésio. Adrenalina/terbutalina SC 0,01 mg/kg só se não houver como inalar." },
    { fonte: "GPP", tipo: "diverge", texto: "O guia inclui salbutamol em xarope na alta. Beta-2 oral age menos e dá mais tremor e taquicardia; o site prefere o spray com espaçador." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Corticoide EV, se a criança não aceita VO: hidrocortisona (o guia faz ataque de 10 mg/kg e mantém 5 mg/kg 6/6–8/8 h) ou dexametasona 0,3–0,6 mg/kg. Na alta, o guia usa prednisolona 1 mg/kg/dia por 5 dias." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Montelucaste (se indicado pelo seguimento), à noite: 6 meses–5 anos 4 mg (sachê ou mastigável); 6–14 anos 5 mg." },
    { fonte: "MDR", tipo: "concorda", texto: "Nebulização com fenoterol 1 gota a cada 3 kg + ipratrópio (10 gotas < 1 ano; 20 gotas de 1 a 6 anos; 20–40 gotas > 6 anos), a cada 20 min, como no site." },
    { fonte: "MDR", tipo: "diverge", texto: "O guia divide a prednisolona em 12/12 h e aceita até 60 mg/dia. Na crise de asma, dose única diária com teto de 40 mg funciona igual e é o que o site usa." },
    // PED-02-01 — Guia Rápido de Medicamentos em Pediatria (MPP)
    { fonte: "MPP", tipo: "diverge", texto: "Ipratrópio: o guia calcula pelo peso (2 gotas a cada 3 kg, máx. 20 gotas = 0,25 mg). O site usa faixa de idade, chegando a 40 gotas (0,5 mg) acima de 6 anos, como as diretrizes de asma. As duas formas são seguras; acima de 6 anos o teto do site é o usual." },
  ],
  "p-convulsao": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia permite até 3 doses de diazepam com 15–30 min entre elas. O site segue as diretrizes de estado de mal: no máximo 2 doses de benzodiazepínico, com 5 min de intervalo, e depois a 2ª linha. Mais doses aumentam a depressão respiratória e atrasam o controle." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Fenobarbital injetável tem mais de uma apresentação no Brasil: 200 mg/mL (ampola de 1 mL) e 100 mg/mL (ampola de 200 mg/2 mL). Confirmar a ampola antes de converter mg em mL; o cálculo do site usa 100 mg/mL." },
    { fonte: "GPP", tipo: "diverge", texto: "Manutenção (se internar): o guia escreve fenitoína 5 mg/kg por dose de 8/8–12/12 h. O total usual é 5–8 mg/kg/dia ÷ 2–3, a partir de 12–24 h do ataque. Fenobarbital: 3–5 mg/kg/dia ÷ 2, 12 h após o ataque." },
    { fonte: "MDR", tipo: "diverge", texto: "A tabela de PS do guia traz fenitoína 5–8 mg/kg EV de 8/8 h (15–24 mg/kg/dia) e velocidade de 1 mg/kg/hora. O ataque é 20 mg/kg a até 1 mg/kg/min (máx. 50 mg/min); a manutenção é 5–8 mg/kg/dia, dividida." },
    { fonte: "MDR", tipo: "diverge", texto: "Diazepam retal: o guia dobra a dose EV (0,6 mg/kg). O site usa 0,5 mg/kg, máx. 20 mg." },
    // PED-02-01 — Guia Rápido de Medicamentos em Pediatria (MPP)
    { fonte: "MPP", tipo: "diverge", texto: "Fenitoína de ataque: o guia aceita até 1.500 mg (20 mg/kg, no máximo 1 mg/kg/min). O site limita a 1 g na criança; no adolescente pesado, o teto de 1.500 mg (o mesmo do adulto) também é usado." },
  ],
  "p-anafilaxia": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia associa a adrenalina IM à anafilaxia com cianose ou estridor. As diretrizes indicam adrenalina IM em toda anafilaxia, logo no início, sem esperar sinais graves: é o que mais reduz a mortalidade." },
  ],
  "p-alergia": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Dexclorfeniramina 0,4 mg/mL (≥ 2 anos): 0,15–0,2 mg/kg/dia ÷ 3 (máx. 3 mg/dia de 2 a 6 anos; 6 mg/dia de 6 a 12). Dá sono, como prometazina e hidroxizina." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Fexofenadina 6 mg/mL (≥ 6 meses), quase sem sedação: 6 meses–2 anos 2,5 mL 12/12 h; 2–11 anos 5 mL 12/12 h; > 11 anos 120 mg 1x/dia." },
    { fonte: "MDR", tipo: "concorda", texto: "Loratadina 5 mL/dia abaixo de 30 kg e 10 mL acima; dexclorfeniramina 0,2 mg/kg/dia de 8/8 h (≥ 2 anos); fexofenadina e desloratadina por faixa de idade; prometazina só IM e só a partir de 2 anos." },
    { fonte: "MDR", tipo: "diverge", texto: "O guia lista dexclorfeniramina com betametasona (Celestamine®) como anti-histamínico. Cada dose leva corticoide: evitar de rotina na urticária leve." },
  ],
  "p-impetigo": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Alternativa tópica à mupirocina: ácido fusídico 2% creme 2–3x/dia por 5–7 dias." },
    { fonte: "GPP", tipo: "diverge", texto: "O guia inclui neomicina + bacitracina (Nebacetim®) para impetigo. Essa associação tem eficácia menor e causa dermatite de contato; as diretrizes preferem mupirocina ou ácido fusídico." },
    { fonte: "MDR", tipo: "diverge", texto: "O guia sugere ácido fusídico com betametasona (Verutex® B). No impetigo, o corticoide não ajuda e pode piorar a infecção: usar só o antibiótico tópico." },
  ],
  "p-parasitose": [
    { fonte: "GPP", tipo: "acrescenta", texto: "A suspensão pediátrica de metronidazol é benzoilmetronidazol 40 mg/mL, que equivale a 25 mg/mL de metronidazol. O cálculo do site usava 40 mg/mL e dava volume menor que o devido; foi corrigido." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Nitazoxanida 20 mg/mL (≥ 1 ano): 7,5 mg/kg/dose VO 12/12 h por 3 dias (≈ 0,4 mL/kg/dose), após refeição. Cobre giárdia, criptosporídio e alguns helmintos; pode escurecer a urina." },
    { fonte: "MDR", tipo: "acrescenta", texto: "Mebendazol 100 mg (5 mL) de 12/12 h por 3 dias, a partir de 1 ano e sem depender do peso; repetir em 7–10 dias. Oxiúros: pamoato de pirvínio 10 mg/mL, 1 mL/kg em dose única, repetir em 2–3 semanas (tinge as fezes de vermelho)." },
    { fonte: "MDR", tipo: "concorda", texto: "Secnidazol 30 mg/kg (1 mL/kg da suspensão 30 mg/mL) em dose única, máx. 2 g." },
    // PED-02-01 — Guia Rápido de Medicamentos em Pediatria (MPP)
    { fonte: "MPP", tipo: "acrescenta", texto: "Albendazol (≥ 2 anos) por 3 dias, 400 mg/dia, também para Hymenolepis nana e larva migrans. Giardíase: 400 mg/dia por 5 dias é alternativa ao metronidazol. Opistorquíase: 800 mg/dia por 3 dias." },
    { fonte: "MPP", tipo: "acrescenta", texto: "Benzoilmetronidazol 40 mg/mL em esquema fixo para giárdia: 1–5 anos 5 mL 12/12 h; 5–10 anos 5 mL 8/8 h, por 5 dias. Amebíase: 0,5 mL/kg 6/6 h (cerca de 50 mg/kg/dia de metronidazol), 5–7 dias se intestinal e até 10 dias se abscesso hepático." },
  ],
  "p-estomatite": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Aftas: tópicos são só para alívio (ex.: pomada bucal com anestésico, 3x/dia por poucos dias). Benzidamina em bochecho só acima de 6 anos (precisa saber cuspir). O guia não indica triancinolona em orabase na criança." },
  ],
  "p-conjuntivite": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia lista colírios com corticoide (dexametasona com tobramicina, ciprofloxacino ou neomicina-polimixina). No PS pediátrico, evitar sem exame oftalmológico: o corticoide piora ceratite herpética e úlcera de córnea. O site usa colírio só de antibiótico." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Opção ao colírio de tobramicina: ciprofloxacino 0,3%, 1 gota de 4/4 h nos primeiros 2 dias e depois de 6/6 h até completar 7 dias." },
  ],
  "p-dermatite-fraldas": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia também usa mometasona creme na área da fralda. Na pele sob oclusão do lactente, preferir corticoide fraco (hidrocortisona 1%) por poucos dias; corticoide médio/potente ali absorve mais e afina a pele." },
  ],
  // PS-04-01 (PSZ 1ª ed.) — neurologia
  convulsao: [
    { fonte: "PSZ", tipo: "diverge", texto: "A 1ª edição do guia usa fenitoína 5–10 mg/kg e fenobarbital 10 mg/kg no estado de mal. São doses baixas: as diretrizes pedem fenitoína 20 mg/kg (até 1.500 mg) e fenobarbital 15–20 mg/kg, como o site. Diluir 2 ampolas de fenitoína em 40 mL (500 mg) não basta para a dose plena." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Tiopental no estado de mal refratário, já intubado: 2 frascos de 500 mg em 40 mL de SF (25 mg/mL), ataque de 100–250 mg EV e manutenção de 3–5 mg/kg/h. Entrou na prescrição do site." },
  ],
  vertigem: [
    { fonte: "PSZ", tipo: "diverge", texto: "O guia prescreve meclizina 50 mg 8/8 h (150 mg/dia). A bula vai até 100 mg/dia, divididos; o site mantém 25–50 mg/dia por poucos dias." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Benzodiazepínico em dose baixa também suprime o vestíbulo e pode ajudar na crise intensa, junto com antiemético. Usar só por 1–3 dias: atrasa a compensação e dá sono e queda em idoso." },
  ],
  // Guia do Plantonista 2013 (MedResumos) — pediatria
  "p-crupe": [
    { fonte: "MDR", tipo: "diverge", texto: "O guia cita dexametasona oral 2 mg/kg/dia. É erro de dose: no crupe, 0,15–0,6 mg/kg em dose única (máx. 10 mg), como no site. Elixir 0,1 mg/mL (0,5 mg/5 mL)." },
  ],
  "p-escabiose": [
    { fonte: "MDR", tipo: "diverge", texto: "Ivermectina: o guia dá ½ comprimido de 15 a 30 kg e 1 comprimido de 30 a 45 kg. A bula sobe para 1 comprimido a partir de 25 kg e 1½ a partir de 36 kg (cerca de 200 mcg/kg), como no site." },
  ],
  // PS-02-01 — Prescrevendo (Ficha Verde): analgesia
  analgesia: [
    { fonte: "PRV", tipo: "acrescenta", texto: "Dor moderada no PS: o guia monta dipirona 1 g EV + dexametasona 10 mg EV + diclofenaco 75 mg IM. O corticoide é só dose única no PS, nunca na receita de casa. Dipirona EV pode ser diluída até 20 mL de AD." },
    { fonte: "PRV", tipo: "diverge", texto: "Na receita de alta, o guia usa tramadol 50 mg de 6/6 h só se dor intensa que não cedeu ao esquema inicial; o site usa 8/8 h por até 3 dias. Os dois ficam abaixo de 400 mg/dia; usar pelo menor tempo possível." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Alta para dor leve a moderada: dipirona 500 mg 1–2 cp 6/6 h se dor, e, se preciso, diclofenaco 50 mg 8/8 h por no máximo 5 dias." },
  ],
  // PED-02-01 (MPP) — reanimação pediátrica
  "p-iot": [
    { fonte: "MPP", tipo: "acrescenta", texto: "Adrenalina por via endotraqueal (só se não houver acesso EV/IO): 0,1 mg/kg = 0,1 mL/kg da ampola 1 mg/mL, sem diluir na seringa, 10 vezes a dose EV. Depois, 3–5 mL de SF pelo tubo e 5 ventilações. Entrou na prescrição do site." },
    { fonte: "MPP", tipo: "concorda", texto: "Adrenalina EV/IO diluída (1 mL + 9 mL de SF, 0,1 mL/kg), amiodarona 5 mg/kg e atropina 0,02 mg/kg (mín. 0,1 mg; máx. 0,5 mg), como no site." },
  ],
};

export const NOVOS_PS: Condicao[] = [
  {
    id: "p-dermatite-fraldas", titulo: "Dermatite de fraldas", area: "pediatria", sistema: "Pele",
    tags: ["assadura", "fralda", "óxido de zinco", "candidíase", "hidrocortisona"],
    resumo: "Barreira (óxido de zinco) a cada troca é a base; corticoide fraco por poucos dias se inflamação; antifúngico se lesões satélites.",
    manejo: [
      "Trocas frequentes; limpar com água morna e algodão, secar bem as dobras; deixar um tempo sem fralda.",
      "Pasta/pomada de barreira em camada grossa a cada troca (não precisa remover tudo na troca seguinte).",
      "Placas vermelho-vivo nas dobras com pontos satélites → candidíase: antifúngico tópico.",
      "Inflamação intensa: hidrocortisona 1% por no máximo 5–7 dias, junto com a barreira.",
    ],
    alarme: ["Bolhas, crostas melicéricas (impetigo), febre, lesões fora da área da fralda ou que não melhoram em 1 semana → reavaliar."],
    rx: [
      { t: "Receita", itens: [
        { m: "Óxido de zinco pomada/creme (com ou sem dexpantenol)", p: "Aplicar camada grossa a cada troca de fralda." },
        { m: "Hidrocortisona 1% creme", p: "Fina camada 2x/dia por até 5–7 dias, se inflamação intensa." },
        { m: "Nistatina creme (ou miconazol 2% / clotrimazol 1%)", p: "Aplicar 2–3x/dia por 7–14 dias se candidíase (manter 2–3 dias após melhorar)." },
      ]},
    ],
    fontes: ["GPP"],
  },
];
