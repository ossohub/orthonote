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
  ],
  fa: [
    { fonte: "PSZ", tipo: "diverge", texto: "O guia usa 24 h como limite seguro para reverter sem anticoagulação prévia (alinhado à ESC 2024); o site falava em 48 h (critério americano antigo). O site passou a usar 24 h." },
    { fonte: "PSZ", tipo: "diverge", texto: "Apixabana: o guia reduz para 2,5 mg 12/12 h pelo ClCr 15–30 mL/min (critério europeu). O site usa a regra dos 2 de 3 (≥ 80 anos, ≤ 60 kg, Cr ≥ 1,5); vale considerar os dois. Rivaroxabana: o guia cita redução com ClCr 30–50; a bula reduz para 15 mg em 15–50." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Edoxabana: contraindicada com TFG < 15; em idoso > 80 anos com alto risco de sangramento, pode-se considerar 15 mg/dia. Interações que pedem 30 mg: dronedarona, ciclosporina, eritromicina, cetoconazol." },
    { fonte: "PSZ", tipo: "acrescenta", texto: "Após cardioversão com amiodarona EV, seguir com impregnação oral até cerca de 10 g (esquema 200 mg 8/8 h → 12/12 h → 1x/dia, 10 dias cada fase)." },
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
  ],
  eap: [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Separar dois cenários: SCAPE (crise simpática hiperaguda, líquido no lugar errado sem sobrecarga) → VNI + nitroglicerina em bolus; FOSPE (sobrecarga subaguda da IC descompensada) → diurético é a base. O POCUS (linhas B) muda antes do raio-X e ajuda no diagnóstico e no seguimento." },
    { fonte: "PSZ", tipo: "diverge", texto: "O guia propõe furosemida de ataque 1–1,5 mg/kg EV; o site usa 0,5–1 mg/kg no paciente virgem de diurético. Em usuário crônico, ambos usam dose EV ao menos igual à oral habitual." },
    // PS-02-01 (PRV)
    { fonte: "PRV", tipo: "diverge", texto: "O guia limita o nitroprussiato a 45 mL/h da solução de 200 mcg/mL (cerca de 150 mcg/min, ~2 mcg/kg/min em 70 kg), subindo 2 mL/h a cada 3–5 min, com alvo de PAS 110–130 mmHg. O site cita o teto da bula (10 mcg/kg/min), que no EAP raramente é necessário." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Furosemida: reavaliar em cerca de 20 min e repetir se ainda congesto. Usuário crônico recebe EV de 1 a 2 vezes a dose diária habitual (ex.: 80 mg/dia VO → 40–80 mg EV)." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Nitroprussiato diluído em SG 5% (como manda a bula e o guia), em equipo protegido da luz. O site dizia SF e foi corrigido aqui, na emergência hipertensiva e na tabela de drogas vasoativas." },
    { fonte: "PRV", tipo: "acrescenta", texto: "CPAP com 5–10 cmH₂O se SpO₂ < 90%; alvo de SpO₂ 90–94%. Volume corrente de 6–8 mL/kg quando ventilado." },
  ],
  // PS-03-01 — Guia do Plantonista Pediatria (GPP): doses de bolso, antibióticos, anti-histamínicos, asma e convulsão
  "p-febre": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia libera o ibuprofeno a partir de 12 meses; o site usa 6 meses, como a bula. Abaixo de 1 ano, preferir paracetamol ou dipirona quando houver dúvida." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Dipirona IM dói e caiu em desuso: no PS, preferir VO ou EV. Cetoprofeno gotas 50 mg/mL é outra opção a partir de 1 ano (1 gota/kg/dose de 6/6 a 8/8 h)." },
  ],
  "p-vomitos": [
    { fonte: "GPP", tipo: "diverge", texto: "Para vômitos fora do contexto de quimioterapia, o guia usa ondansetrona EV 0,1 mg/kg; o site usa 0,15 mg/kg (máx. 4 mg). As duas faixas são aceitas." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Dimenidrinato gotas 25 mg/mL (Dramin®): 1 gota/kg/dose até 6/6 h. Dá sono; a bula brasileira libera a partir de 2 anos. Metoclopramida: evitar na criança (risco de distonia), como o site já orienta." },
  ],
  "p-oma": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia usa amoxicilina 50 mg/kg/dia (até 90). O site parte de 80–90 mg/kg/dia (dose alta, pela resistência do pneumococo). Em região de baixa resistência e sem fatores de risco, 50 mg/kg/dia é aceito." },
    { fonte: "GPP", tipo: "diverge", texto: "Para amoxicilina-clavulanato, o guia cita 25 mg/kg/dia ÷ 8/8 h (dose baixa da bula). Na otite, essa dose fica fraca: usar 45 mg/kg/dia ou mais (até 90 mg/kg/dia com a apresentação 400/57)." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Azitromicina pode ser feita em 3 dias: 10 mg/kg/dia 1x/dia (máx. 500 mg). Suspensão 200 mg/5 mL: peso ÷ 4 = mL por dia." },
  ],
  "p-faringo": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia troca a dose da penicilina benzatina em 20 kg (até 20 kg: 600.000 UI; acima: 1.200.000 UI), como muitos protocolos brasileiros. O site usa o corte de 27 kg (AHA). Entre 20 e 27 kg, os dois esquemas são aceitos." },
  ],
  "p-itu": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Cistite sem febre (criança maior): nitrofurantoína 5–7 mg/kg/dia ÷ 4 por 7–10 dias. Não serve para ITU febril nem pielonefrite (não atinge o rim)." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Sulfametoxazol-trimetoprima (≥ 6 semanas), se o germe for sensível: suspensão 200+40 mg/5 mL = 1 mL/kg/dia ÷ 2 (cerca de 8 mg/kg/dia de trimetoprima). A resistência da E. coli é alta: não usar às cegas." },
    { fonte: "GPP", tipo: "diverge", texto: "O guia ainda lista ácido nalidíxico. Ele está em desuso (pouca ação e resistência alta); o site não o inclui." },
  ],
  "p-meningite": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia escreve ceftriaxona 50–100 mg/kg por dose de 12/12 h (até 200 mg/kg/dia). O site mantém 100 mg/kg/dia (÷ 1–2; máx. 4 g/dia), que é a dose de meningite das diretrizes." },
  ],
  "p-pneumonia": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Alternativa à azitromicina na suspeita de atípica: claritromicina 15 mg/kg/dia ÷ 12/12 h (7,5 mg/kg/dose; máx. 500 mg/dose), a partir de 6 meses." },
  ],
  "p-asma": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia propõe adrenalina nebulizada na asma grave. As diretrizes de asma não a recomendam (ela é do crupe): na crise grave, manter beta-2 + ipratrópio, corticoide e sulfato de magnésio. Adrenalina/terbutalina SC 0,01 mg/kg só se não houver como inalar." },
    { fonte: "GPP", tipo: "diverge", texto: "O guia inclui salbutamol em xarope na alta. Beta-2 oral age menos e dá mais tremor e taquicardia; o site prefere o spray com espaçador." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Corticoide EV, se a criança não aceita VO: hidrocortisona (o guia faz ataque de 10 mg/kg e mantém 5 mg/kg 6/6–8/8 h) ou dexametasona 0,3–0,6 mg/kg. Na alta, o guia usa prednisolona 1 mg/kg/dia por 5 dias." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Montelucaste (se indicado pelo seguimento), à noite: 6 meses–5 anos 4 mg (sachê ou mastigável); 6–14 anos 5 mg." },
  ],
  "p-convulsao": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia permite até 3 doses de diazepam com 15–30 min entre elas. O site segue as diretrizes de estado de mal: no máximo 2 doses de benzodiazepínico, com 5 min de intervalo, e depois a 2ª linha. Mais doses aumentam a depressão respiratória e atrasam o controle." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Fenobarbital injetável tem mais de uma apresentação no Brasil: 200 mg/mL (ampola de 1 mL) e 100 mg/mL (ampola de 200 mg/2 mL). Confirmar a ampola antes de converter mg em mL; o cálculo do site usa 100 mg/mL." },
    { fonte: "GPP", tipo: "diverge", texto: "Manutenção (se internar): o guia escreve fenitoína 5 mg/kg por dose de 8/8–12/12 h. O total usual é 5–8 mg/kg/dia ÷ 2–3, a partir de 12–24 h do ataque. Fenobarbital: 3–5 mg/kg/dia ÷ 2, 12 h após o ataque." },
  ],
  "p-anafilaxia": [
    { fonte: "GPP", tipo: "diverge", texto: "O guia associa a adrenalina IM à anafilaxia com cianose ou estridor. As diretrizes indicam adrenalina IM em toda anafilaxia, logo no início, sem esperar sinais graves: é o que mais reduz a mortalidade." },
  ],
  "p-alergia": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Dexclorfeniramina 0,4 mg/mL (≥ 2 anos): 0,15–0,2 mg/kg/dia ÷ 3 (máx. 3 mg/dia de 2 a 6 anos; 6 mg/dia de 6 a 12). Dá sono, como prometazina e hidroxizina." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Fexofenadina 6 mg/mL (≥ 6 meses), quase sem sedação: 6 meses–2 anos 2,5 mL 12/12 h; 2–11 anos 5 mL 12/12 h; > 11 anos 120 mg 1x/dia." },
  ],
  "p-impetigo": [
    { fonte: "GPP", tipo: "acrescenta", texto: "Alternativa tópica à mupirocina: ácido fusídico 2% creme 2–3x/dia por 5–7 dias." },
    { fonte: "GPP", tipo: "diverge", texto: "O guia inclui neomicina + bacitracina (Nebacetim®) para impetigo. Essa associação tem eficácia menor e causa dermatite de contato; as diretrizes preferem mupirocina ou ácido fusídico." },
  ],
  "p-parasitose": [
    { fonte: "GPP", tipo: "acrescenta", texto: "A suspensão pediátrica de metronidazol é benzoilmetronidazol 40 mg/mL, que equivale a 25 mg/mL de metronidazol. O cálculo do site usava 40 mg/mL e dava volume menor que o devido; foi corrigido." },
    { fonte: "GPP", tipo: "acrescenta", texto: "Nitazoxanida 20 mg/mL (≥ 1 ano): 7,5 mg/kg/dose VO 12/12 h por 3 dias (≈ 0,4 mL/kg/dose), após refeição. Cobre giárdia, criptosporídio e alguns helmintos; pode escurecer a urina." },
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
  // PS-02-01 — Prescrevendo (Ficha Verde): analgesia
  analgesia: [
    { fonte: "PRV", tipo: "acrescenta", texto: "Dor moderada no PS: o guia monta dipirona 1 g EV + dexametasona 10 mg EV + diclofenaco 75 mg IM. O corticoide é só dose única no PS, nunca na receita de casa. Dipirona EV pode ser diluída até 20 mL de AD." },
    { fonte: "PRV", tipo: "diverge", texto: "Na receita de alta, o guia usa tramadol 50 mg de 6/6 h só se dor intensa que não cedeu ao esquema inicial; o site usa 8/8 h por até 3 dias. Os dois ficam abaixo de 400 mg/dia; usar pelo menor tempo possível." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Alta para dor leve a moderada: dipirona 500 mg 1–2 cp 6/6 h se dor, e, se preciso, diclofenaco 50 mg 8/8 h por no máximo 5 dias." },
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
