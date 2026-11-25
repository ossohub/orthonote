import type { Infiltracao } from "./types";

// Princípios e segurança. Resumo com palavras próprias.

export const PRINCIPIOS: Infiltracao[] = [
  {
    id: "medicamentos-doses", titulo: "Corticoides e anestésicos: escolha, doses e volumes", secao: "principios", guia: "na",
    resumo: "Dose mínima eficaz: tendão/êntese ~10 mg em 1 mL; bursas e articulações médias 20–40 mg em 2–5 mL; grandes articulações 40 mg em 5–10 mL. Lidocaína sem vasoconstritor é o anestésico padrão; volume serve para banhar a sinóvia, não para distender tendões.",
    indicacoes: [
      "Escolher droga, dose e volume antes de qualquer infiltração musculoesquelética.",
      "Ajustar à estrutura: primeiro o volume (tamanho da estrutura), depois a dose mínima eficaz, depois seringa e agulha.",
    ],
    medicacao: [
      "Equivalência anti-inflamatória aproximada: triamcinolona acetonida 40 mg ≈ metilprednisolona (acetato) 40 mg ≈ betametasona 6 mg ≈ dexametasona 7,5 mg ≈ hidrocortisona 200 mg.",
      "Triamcinolona acetonida 40 mg/mL: pouco volume, boa para pequenas estruturas; ~3 semanas de ação local. Em menor concentração (10 mg/mL) quando se quer mais volume em bursas e grandes articulações.",
      "Triamcinolona hexacetonida: a menos solúvel e mais duradoura — reservar para intra-articular (mais atrofia se for para partes moles).",
      "Metilprednisolona acetato 40 mg/mL: eficaz, mas com mais dor pós-injeção em partes moles; evitar as apresentações já misturadas com lidocaína (dose fixa).",
      "Hidrocortisona (solúvel, curta): preferir em lesões superficiais de pacientes magros e de pele escura (menos atrofia e despigmentação).",
      "Receita média para tendões: 10 mg de corticoide em 1 mL total; estruturas maiores até 20 mg em 2 mL. Articulação grande (ombro, joelho, quadril): 40 mg; média (cotovelo, tornozelo, punho): 20–30 mg; pequenas (MCF, IF, AC): 5–10 mg.",
      "Lidocaína sem vasoconstritor (início em segundos, ~30 min de duração): 2% até 2 mL; 1% para 2–5 mL; acima de 5 mL diluir a 1% em soro ou usar corticoide menos concentrado. Doses máximas de referência: lidocaína 3–4,5 mg/kg (até ~300 mg); bupivacaína 2 mg/kg (até ~150 mg).",
      "Bupivacaína: início lento (~30 min) e longa duração — perde o efeito diagnóstico imediato; sem ganho comprovado a longo prazo. Muitos evitam intra-articular por toxicidade condral.",
      "Nunca injetar anestésico com vasoconstritor em articulações ou partes moles.",
    ],
    etapas: [
      { t: "Por que associar anestésico", passos: [
        "Analgesia imediata e mais conforto.",
        "Diagnóstico: alívio em minutos confirma a estrutura e a posição da agulha — reexaminar após 5 min.",
        "Diluição/volume: espalha o corticoide pela grande superfície sinovial de articulações e bursas.",
        "Distensão capsular pode ajudar na capsulite; em êntese e tendão, distensão é indesejável (dor, compressão vascular, ruptura de fibras).",
      ] },
      { t: "Seringas e agulhas", passos: [
        "Seringa de 1 mL (tuberculina) para tendões e ligamentos — a resistência exige pressão e seringas grandes podem soltar da agulha.",
        "Escolher a agulha mais fina que alcance a lesão; na dúvida, mais longa (obeso, quadril, iliopsoas: 9 cm ou mais).",
        "Agulha espinhal longa: manter o mandril durante a passagem pelos planos ajuda o controle.",
        "Aspiração articular: pelo menos 21G, idealmente 18–19G (líquido viscoso ou com debris).",
      ] },
    ],
    perolas: [
      "Menos é mais: a maioria dos efeitos adversos locais vem de dose alta, volume alto e repetição frequente.",
      "Frascos multidose de lidocaína contêm parabenos que podem precipitar o corticoide e aumentar o risco de contaminação — preferir ampolas de dose única.",
    ],
    fontes: ["SAUNDERS p. 17–20, 45–48", "SILVER p. 36–38", "MSK p. 41–56"],
    tags: ["triamcinolona", "metilprednisolona", "betametasona", "lidocaína", "bupivacaína", "dose", "volume"],
  },
  {
    id: "seguranca-complicacoes", titulo: "Contraindicações, complicações e emergências", secao: "principios", guia: "na",
    resumo: "Não infiltrar se houver infecção local ou sistêmica, prótese articular, fratura, instabilidade articular ou recusa. Complicações locais (flare, atrofia, despigmentação) são as mais comuns; artrite séptica é rara (1:17.000–77.000) mas grave. Ter adrenalina à mão e observar 30 minutos.",
    indicacoes: ["Checar antes de toda infiltração."],
    contraindicacoes: [
      "Absolutas: infecção local (pele) ou sistêmica; suspeita de artrite séptica; alergia ao medicamento; articulação protética (não infiltrar sem o cirurgião); fratura intra-articular; recusa do paciente; ausência de diagnóstico.",
      "Relativas: anticoagulação fora da faixa terapêutica; diabetes mal controlado; imunossupressão; gestação/amamentação (discutir e documentar); artropatia muito avançada/instável; 'medo' de agulha; infiltrações repetidas sem resposta; atletas em competição (regras antidoping).",
      "Tendões de carga (Aquiles, patelar): evitar corticoide intratendíneo — se cogitado, confirmar por imagem que é peritendinite sem tendinopatia.",
    ],
    complicacoes: [
      "Flare pós-injeção: dor 24–48 h, dura 1–2 dias (mais com metilprednisolona e em partes moles). Diferenciar de infecção.",
      "Atrofia subcutânea/despigmentação: aparece em 1–4 meses, regride em 6–24 meses (pode ser permanente). Mais em pele escura, lesões superficiais e epicôndilo/De Quervain.",
      "Hematoma (antiagregantes/anticoagulantes), calcificação de partes moles, ruptura/atrofia tendínea (dose alta, bolus na êntese, repetição).",
      "Artrite séptica/osteomielite: rara, mas pode ser fatal; sinais em 4 dias a 3 semanas (dor crescente, calor, febre). Internar, colher hemoculturas, VHS/PCR e aspirar.",
      "Sistêmicas: rubor facial, hiperglicemia por até ~1 semana em diabéticos, irregularidade menstrual (sangramento na pós-menopausa precisa ser investigado), supressão transitória do eixo HHA, queda de VHS/PCR por semanas.",
      "Raras: anafilaxia (AL ou estabilizantes), toxicidade de anestésico local (agitação, parestesia perioral, convulsão, colapso), síncope vasovagal, lesão nervosa, quebra de agulha, droga errada.",
    ],
    etapas: [
      { t: "Prevenção", passos: [
        "Perguntar sobre alergias (inclusive a anestesia dentária); na dúvida, usar corticoide com soro.",
        "Paciente deitado para a infiltração; aspirar antes de injetar; observar ~30 min após.",
        "Kit mínimo: adrenalina 1:1000 (ou autoinjetor), oxigênio, máscara/ambu, cânula orofaríngea; ideal também anti-histamínico, hidrocortisona, broncodilatador, acesso venoso e soro.",
      ] },
      { t: "Anafilaxia grave (hipotensão, edema de via aérea, broncoespasmo)", passos: [
        "Parar a injeção, deitar o paciente (se respirar bem), abrir via aérea e chamar ajuda.",
        "Adrenalina 0,5 mg IM (0,5 mL de 1:1000); repetir após 5 min se piorar. Oxigênio, RCP se necessário, anti-histamínico/corticoide como adjuvantes e remoção ao hospital.",
      ] },
      { t: "Síncope", passos: [
        "Tranquilizar, deitar em posição de recuperação; se perder a consciência, proteger via aérea e dar oxigênio.",
        "Pode haver abalos breves — não confundir com convulsão (recuperação em ~1 min, sem incontinência).",
      ] },
    ],
    perolas: [
      "A falha em reconhecer e tratar a infecção pós-infiltração é mais difícil de defender que a infecção em si.",
      "Se houver S. aureus em infecção pós-injeção, o profissional deve pesquisar colonização nasal e revisar a técnica asséptica.",
    ],
    fontes: ["SAUNDERS p. 21–35, 52", "SILVER p. 36–38, 49–54", "MSK p. 42–55"],
    tags: ["contraindicação", "complicação", "anafilaxia", "flare", "artrite séptica", "atrofia", "adrenalina"],
  },
  {
    id: "tecnica-geral", titulo: "Técnica geral, assepsia e pós-infiltração", secao: "principios", guia: "na",
    resumo: "Marcar, limpar e não tocar mais; agulha nova após aspirar a droga; 'bolus' em espaços (articulação, bursa, bainha) e 'peppering' em êntese/tendão. Sentir os tecidos pela agulha. Repouso relativo, reabilitação e intervalo mínimo de 3 meses na mesma articulação.",
    indicacoes: ["Rotina para infiltrações por palpação em consultório."],
    etapas: [
      { t: "Assepsia", passos: [
        "Tirar relógio e adornos; marcar o ponto com a ponta romba da capa da agulha.",
        "Antissepsia e esperar secar ~1 min; lavar e secar bem as mãos (mãos úmidas carregam mais germes). Luvas obrigatórias para aspiração ou suspeita de infecção.",
        "Material estéril, descartável e na validade; ampolas de dose única; trocar a agulha após aspirar o medicamento.",
        "Não tocar a pele depois de limpa nem guiar a agulha com o dedo; ao entrar na articulação, aspirar e olhar o líquido.",
      ] },
      { t: "Execução", passos: [
        "Pele bem esticada e entrada rápida e perpendicular; depois avançar devagar sentindo os planos: músculo esponjoso, tendão/ligamento fibroso, cápsula como 'pele de balão', cartilagem pegajosa, osso duro e doloroso.",
        "'Acariciar' o osso, nunca bater nele (dor e periostite pós).",
        "Bolus: espaços ocos — ausência de resistência indica que a ponta está no espaço. Bursa crônica pode estar loculada (sensação de 'esponja').",
        "Peppering: em êntese e tendão, encostar no osso e depositar gotículas em vários pontos do 'cubo' da lesão, com uma só punção.",
        "Bainha tendínea: deslizar a agulha ao longo do tendão e injetar entre tendão e bainha (a bainha distende visivelmente).",
        "Resistência inesperada ou dor intensa/choque: recuar e reposicionar (pode ser tendão ou nervo).",
      ] },
      { t: "Pós-infiltração", passos: [
        "Observar ~30 min; avisar sobre possível dor pós (analgésico simples, gelo) e sinais de infecção.",
        "Repouso relativo: tendões 1–2 semanas sem a atividade provocadora; depois alongamento e fortalecimento graduais — a infiltração não substitui a reabilitação.",
        "Diabéticos: monitorar glicemia por alguns dias.",
        "Repetição: em geral intervalo ≥ 3 meses na mesma grande articulação e até 3–4 por ano no mesmo local; se 2–3 injeções não deram o efeito esperado, rever o diagnóstico (considerar guiada por imagem).",
      ] },
      { t: "Atletas", passos: [
        "Anestésicos locais permitidos (exceto cocaína); corticoide em competição pode exigir AUT/TUE conforme a via e o regulamento vigente — confirmar com a federação.",
        "Fornecer carta com diagnóstico, drogas e doses; corticoides insolúveis podem ser detectados meses depois.",
      ] },
    ],
    perolas: [
      "Infiltrar é fácil; difícil é escolher o paciente certo — o exame clínico decide.",
      "Em capsulite e grandes articulações, um pouco de distensão parece ajudar; em tendões, use o menor volume possível.",
    ],
    fontes: ["SAUNDERS p. 30, 45–54", "SILVER p. 36–38", "EASY p. 6–12"],
    tags: ["assepsia", "bolus", "peppering", "intervalo", "pós-infiltração", "doping"],
  },
  {
    id: "aspiracao-liquido", titulo: "Aspiração articular e análise do líquido", secao: "principios", guia: "palpacao",
    resumo: "Aspirar derrame alivia, recupera a força do quadríceps e esclarece o diagnóstico. Agulha 18–21G, luvas, conector de 3 vias. Líquido turvo ou purulento: não injetar e mandar para celularidade, Gram, cultura e cristais.",
    indicacoes: ["Derrame articular (diagnóstico e alívio).", "Monoartrite aguda: excluir sepse e cristais.", "Hemartrose traumática (alívio e investigação).", "Antes de infiltrar uma articulação com derrame."],
    material: ["Agulha 19–21G (18G se líquido espesso)", "Seringa de 10–20 mL (às vezes 50 mL)", "Conector de 3 vias", "Luvas, campos para respingos", "Frascos para bioquímica/cristais e frascos de hemocultura para cultura"],
    etapas: [
      { t: "Técnica", passos: [
        "Mesma via de acesso da infiltração; se o fluxo parar, girar a agulha 90° ou movê-la alguns milímetros.",
        "Não desconectar a seringa deixando a agulha aberta (equaliza pressões e dificulta) — usar 3 vias ou ter outra seringa pronta.",
        "Para injetar após aspirar: desconectar com cuidado sem mover a agulha e conectar a seringa com a droga.",
      ] },
      { t: "O que o líquido sugere", passos: [
        "Claro, amarelo-palha, viscoso ('fio' de 2–5 cm): não inflamatório.",
        "Sangue em estrias: trauma da punção. Sangue franco: lesão traumática — radiografar; gordura sobrenadante sugere fratura intra-articular (no joelho, LCA em ~40%).",
        "Xantocrômico: sangramento antigo.",
        "Turvo, menos viscoso, forma gotas: inflamatório (gota, AR, sepse) — não injetar até o resultado.",
        "Pus franco: paciente grave — internação urgente.",
        "Branco-leitoso: cristais (urato, colesterol); viscosidade muito aumentada: corticoide recente ou hipotireoidismo.",
      ] },
      { t: "Laboratório", passos: [
        "Úteis: leucometria com % de polimorfonucleares, cristais (luz polarizada), Gram e cultura; para TB pedir Ziehl-Neelsen e cultura prolongada.",
        "Analisar em até 4 h (geladeira a 4 °C só retarda as alterações); inocular em frasco de hemocultura aumenta a sensibilidade.",
      ] },
      { t: "Cistos sinoviais (ganglions)", passos: [
        "Muitos regridem sozinhos; tratar se dor, parestesia ou incômodo estético.",
        "Aspiração com agulha grossa resolve cerca de 1/3; associar corticoide não melhora; recidiva após uma aspiração raramente responde a novas.",
        "Cisto mucoso de IFD (artrose): múltiplas punções com 25G e pequeno volume (<1 mL) de corticoide + anestésico.",
      ] },
    ],
    perolas: [
      "Na dúvida sobre o aspecto do líquido, não injete.",
      "Gota aguda: após excluir infecção, triamcinolona intra-articular (10 mg no joelho, ~8 mg em pequenas articulações) costuma resolver em 48 h.",
      "Punção arterial (ex.: punho): retirar e comprimir vários minutos.",
    ],
    fontes: ["SAUNDERS p. 38–43", "SILVER p. 125–127"],
    tags: ["artrocentese", "líquido sinovial", "cristais", "cultura", "hemartrose", "ganglion", "gota"],
  },
  {
    id: "guia-imagem", titulo: "Palpação, ultrassom ou fluoroscopia? e radioproteção", secao: "principios", guia: "na",
    resumo: "A maioria das articulações periféricas pode ser infiltrada por palpação; a imagem ajuda em obesos, articulações profundas (quadril, sacroilíaca), pequenas articulações, falhas prévias e coluna. Coluna: fluoroscopia com contraste é o padrão.",
    indicacoes: [
      "Palpação: ombro, cotovelo, joelho, punho, tendões superficiais e bursas.",
      "Ultrassom: quadril, iliopsoas, pequenas articulações da mão e pé, bainhas tendíneas, cistos, calcificações (barbotagem), hidrodistensão, quando houve falha por palpação.",
      "Fluoroscopia (com contraste): epidurais, facetárias, ramo medial, sacroilíaca, gânglio ímpar, discografia, bloqueios simpáticos.",
    ],
    etapas: [
      { t: "Precisão", passos: [
        "Mesmo com derrame aspirado, a injeção seguinte pode não ficar intra-articular; experiência do injetor não garante acurácia.",
        "Joelho seco: via lateral médio-patelar em extensão (patelofemoral) tem acerto >90%.",
        "Teste do ar (1–2 mL): 'chiado' ao mover o joelho confirma posição intra-articular; 'whoosh' ao estetoscópio confirma o caudal.",
        "Infiltração próxima ao alvo pode funcionar, mas em vários estudos a guiada por US melhora função no ombro (subacromial).",
      ] },
      { t: "Radioproteção (fluoroscopia)", passos: [
        "Tempo: pulsos curtos, última imagem salva, colimar.",
        "Distância: dose cai com o quadrado da distância — afastar-se do tubo, usar extensor.",
        "Blindagem: avental, protetor de tireoide e óculos plumbíferos; mãos fora do feixe; tubo embaixo da mesa (menos espalhamento para o operador).",
      ] },
      { t: "Contraste e alergia", passos: [
        "Contraste não iônico confirma o padrão (articular, epidural, vascular).",
        "Alergia a iodo/contraste: protocolo de pré-medicação (corticoide + anti-histamínico) ou contraste alternativo (gadolínio) conforme a instituição.",
      ] },
    ],
    perolas: [
      "Use imagem para quem não respondeu à infiltração por palpação, antes de concluir que o tratamento falhou.",
    ],
    fontes: ["SAUNDERS p. 41–42", "SILVER p. 45, 141–150", "MSK p. 157–178", "CARM p. 47–57", "POCKET p. 19–26, 37–43"],
    tags: ["ultrassom", "fluoroscopia", "radioproteção", "contraste", "precisão"],
  },
  {
    id: "situacoes-especiais", titulo: "Anticoagulados, diabéticos, gestantes e imunossuprimidos", secao: "principios", guia: "na",
    resumo: "Periféricas: em geral não suspender anticoagulante se INR terapêutico (≤ ~4,5) e o procedimento for superficial/compressível. Neuraxiais e coluna: seguir protocolo de suspensão (ex.: clopidogrel 7 dias, DOACs e varfarina ~5 dias com INR < 1,5) em conjunto com o médico que prescreveu.",
    indicacoes: ["Pacientes com risco aumentado de sangramento, descompensação ou infecção."],
    etapas: [
      { t: "Anticoagulantes e antiagregantes", passos: [
        "Articulações e partes moles: o risco de parar a anticoagulação costuma superar o de sangrar; manter se INR na faixa terapêutica; DOACs em geral também podem ser mantidos. Usar agulha fina e compressão prolongada.",
        "Coluna/epidural (exemplo de protocolo): ticlopidina 14 dias; AAS, clopidogrel, prasugrel, ticagrelor, cilostazol, dipiridamol 7 dias; dabigatrana, rivaroxabana, apixabana, varfarina e AINE 5 dias; INR < 1,5 no dia. Nunca suspender sem acordo com quem prescreveu (stent, prótese valvar, FA de alto risco).",
      ] },
      { t: "Diabetes", passos: [
        "Hiperglicemia transitória por até ~1 semana (raramente mais); informar a droga e a dose ao paciente e ajustar medicação se necessário.",
        "Preferir menor dose eficaz e, se possível, triamcinolona.",
      ] },
      { t: "Gestação e amamentação", passos: [
        "Sem evidência de dano, mas a situação é emocionalmente carregada — discutir benefícios e riscos e documentar (túnel do carpo e De Quervain são comuns nessa fase).",
      ] },
      { t: "Imunossupressão e artrite reumatoide", passos: [
        "Maior risco de sepse, inclusive tardia (até ~1 em 2.000 injeções em AR); manter alto índice de suspeição.",
        "Monoartrite aguda em idoso com artrose ou infecção em outro sítio (urina, pele, tórax): investigar antes de infiltrar.",
      ] },
    ],
    fontes: ["SILVER p. 36", "POCKET p. 41–44", "SAUNDERS p. 21–25"],
    tags: ["anticoagulante", "varfarina", "DOAC", "clopidogrel", "diabetes", "gestação", "imunossupressão"],
  },
  {
    id: "consentimento-legal", titulo: "Consentimento, registro e aspectos médico-legais", secao: "principios", guia: "na",
    resumo: "Consentimento é conversa, não formulário: explicar diagnóstico, alternativas, benefícios, riscos comuns e graves e dar tempo para perguntas. Registrar droga, dose, lote, via, lado, intercorrências e orientações. Uso 'off-label' é legítimo se justificado e informado.",
    indicacoes: ["Toda infiltração ou procedimento minimamente invasivo."],
    etapas: [
      { t: "O que explicar", passos: [
        "Diagnóstico e objetivo (diagnóstico, alívio, reabilitação facilitada); alternativas (fisioterapia, medicação, cirurgia, observar).",
        "Riscos comuns: dor pós, hematoma, atrofia/despigmentação (avisar especialmente pele escura e lesões superficiais), rubor, hiperglicemia, alteração menstrual.",
        "Riscos graves e raros: infecção, ruptura tendínea, lesão nervosa, anafilaxia; na coluna também cefaleia pós-punção, lesão neurológica e reações ao contraste.",
        "Chance de não funcionar e de precisar repetir; cuidados pós.",
      ] },
      { t: "Registro mínimo", passos: [
        "Indicação e exame, consentimento verbal/escrito, lado e local marcados (time-out na coluna).",
        "Droga, dose, volume, lote e validade, agulha, via, aspiração (aspecto), intercorrências e orientações dadas.",
        "Na coluna: imagens salvas (posição final da agulha e contraste), sedação e sinais vitais.",
      ] },
      { t: "Quando algo dá errado", passos: [
        "Reconhecer cedo, tratar e encaminhar; explicar com honestidade e registrar.",
        "Infecção pós-injeção não é, por si, negligência; a demora em reconhecer e tratar é que costuma ser indefensável.",
      ] },
    ],
    perolas: [
      "Gestantes e atletas: discutir e documentar com mais cuidado.",
      "Delegar a outro profissional exige garantir que ele seja treinado e habilitado.",
    ],
    fontes: ["SAUNDERS p. 36–37", "SILVER p. 49–54", "POCKET p. 41, 129–130", "LEGAL"],
    tags: ["consentimento", "médico-legal", "prontuário", "off-label", "time-out"],
  },
];
