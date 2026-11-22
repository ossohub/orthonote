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
  ],
  "sca-ssst": [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Prasugrel (60 mg de ataque → 10 mg/dia) só depois de conhecer a anatomia coronária; evitar se < 60 kg, AVC prévio ou > 75 anos. Betabloqueador oral pode ser carvedilol 3,125 mg 12/12 h; O₂ só se SpO₂ < 90%." },
  ],
  eap: [
    { fonte: "PSZ", tipo: "acrescenta", texto: "Separar dois cenários: SCAPE (crise simpática hiperaguda, líquido no lugar errado sem sobrecarga) → VNI + nitroglicerina em bolus; FOSPE (sobrecarga subaguda da IC descompensada) → diurético é a base. O POCUS (linhas B) muda antes do raio-X e ajuda no diagnóstico e no seguimento." },
    { fonte: "PSZ", tipo: "diverge", texto: "O guia propõe furosemida de ataque 1–1,5 mg/kg EV; o site usa 0,5–1 mg/kg no paciente virgem de diurético. Em usuário crônico, ambos usam dose EV ao menos igual à oral habitual." },
  ],
};

export const NOVOS_PS: Condicao[] = [];
