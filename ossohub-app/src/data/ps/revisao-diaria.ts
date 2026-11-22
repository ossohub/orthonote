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
  // PS-02-01 — Prescrevendo (Ficha Verde): analgesia
  analgesia: [
    { fonte: "PRV", tipo: "acrescenta", texto: "Dor moderada no PS: o guia monta dipirona 1 g EV + dexametasona 10 mg EV + diclofenaco 75 mg IM. O corticoide é só dose única no PS, nunca na receita de casa. Dipirona EV pode ser diluída até 20 mL de AD." },
    { fonte: "PRV", tipo: "diverge", texto: "Na receita de alta, o guia usa tramadol 50 mg de 6/6 h só se dor intensa que não cedeu ao esquema inicial; o site usa 8/8 h por até 3 dias. Os dois ficam abaixo de 400 mg/dia; usar pelo menor tempo possível." },
    { fonte: "PRV", tipo: "acrescenta", texto: "Alta para dor leve a moderada: dipirona 500 mg 1–2 cp 6/6 h se dor, e, se preciso, diclofenaco 50 mg 8/8 h por no máximo 5 dias." },
  ],
};

export const NOVOS_PS: Condicao[] = [];
