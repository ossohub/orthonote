import type { Infiltracao } from "./types";

// Regenerativas e alternativas ao corticoide.
// No Brasil, PRP e terapias celulares têm regras próprias (CFM/ANVISA) — confirmar a norma vigente antes de oferecer.

export const REGENERATIVAS: Infiltracao[] = [
  {
    id: "prp", titulo: "Plasma rico em plaquetas (PRP)", secao: "regenerativas", guia: "us",
    guiaNota: "Em tendões, peppering intratendíneo guiado por US.",
    resumo: "Plasma autólogo com plaquetas 3–5× o basal (≥ 1.000.000/µL). Tendinopatias crônicas (> 3 meses, refratárias): PRP rico em leucócitos em peppering intralesional. Artrose de joelho: PRP pobre em leucócitos intra-articular supera placebo e, em várias metanálises, o ácido hialurônico. Suspender AINE; intervalo ≥ 12 semanas entre aplicações.",
    indicacoes: [
      "Epicondilite lateral (melhor que corticoide no médio/longo prazo, até 1 ano).",
      "Tendinopatia patelar, Aquiles não insercional, fascite plantar, manguito rotador (tendinopatia refratária).",
      "Artrose de joelho sintomática (alívio de dor e função até ~12 meses).",
      "Dor peritrocantérica (evidência ainda em construção).",
    ],
    contraindicacoes: [
      "Absolutas: sepse, infecção no local, instabilidade hemodinâmica, disfunção plaquetária, plaquetopenia crítica.",
      "Relativas: febre recente, câncer, anemia sintomática, plaquetas baixas, uso recente/frequente de AINE ou antiagregante.",
    ],
    material: ["Kit e centrífuga (sistema fechado reduz contaminação)", "Seringa de 10 mL e agulha 21G para anestésico; agulha 23G para o PRP"],
    medicacao: ["Lidocaína 2% 2–3 mL superficial ao tendão, ≥ 5 min antes (pode ser durante a centrifugação).", "PRP: alíquotas < 1 mL em ~15 pontos (peppering)."],
    etapas: [
      { t: "Preparo", passos: [
        "Coleta venosa com anticoagulante e centrifugação conforme o fabricante; assepsia rigorosa.",
        "Escolher o tipo: rico em leucócitos (L-PRP) para tendões; pobre em leucócitos (P-PRP) para articulação.",
        "Marcar a área dolorosa com o paciente na posição da injeção.",
      ] },
      { t: "Injeção em tendão", passos: [
        "Anestésico logo acima do tendão, sem infiltrar o tendão.",
        "Agulha 23G perpendicular no centro da área; injetar < 1 mL, sair só do tendão, reentrar em outro ponto — ~15 vezes.",
        "Se o PRP acabar antes, completar como agulhamento seco.",
        "Curativo e manter o membro na mesma posição ~15 min.",
      ] },
    ],
    posop: [
      "Dor, edema e rigidez por até 1 semana; analgésico simples — evitar AINE (e gelo) por ~6 semanas.",
      "Dias 0–3: proteção (órtese de punho no cotovelo; carga parcial com bota no Aquiles/fáscia; tipoia no ombro) e mobilidade ativa.",
      "Dias 4–14: carga progressiva; semanas 2–6: alongamento e isotônico; semanas 6–12: excêntrico e potência; > 12 semanas: retorno ao esporte.",
    ],
    perolas: [
      "Não há padrão de preparo: concentração, leucócitos, anticoagulante e ativação variam e explicam resultados discrepantes.",
      "Fatores do paciente alteram as plaquetas: hipertensão, estresse, dieta, álcool, tabagismo, ISRS, AINE, anti-histamínicos.",
      "Nova aplicação só após completar a reabilitação e com ≥ 12 semanas de intervalo.",
    ],
    fontes: ["MSK p. 181–198", "REGEN p. 85–86, 91"],
    tags: ["PRP", "plasma rico em plaquetas", "tendinopatia", "artrose", "epicondilite"],
  },
  {
    id: "acido-hialuronico", titulo: "Ácido hialurônico (viscossuplementação)", secao: "regenerativas", guia: "palpacao",
    guiaNota: "Quadril e tornozelo: com imagem.",
    resumo: "Artrose moderada (Kellgren-Lawrence 2–3), sobretudo tibiofemoral, sem derrame/crise inflamatória. Esquemas: alto peso molecular 1 dose única (ex.: hylan 48 mg/6 mL) ou 3 semanais (16 mg/2 mL); baixo peso molecular 3–5 semanais (20–25 mg). Reação local leve é comum; pseudossepse é rara.",
    indicacoes: [
      "Artrose de joelho grau 2–3 (resposta menor na femoropatelar, ~50%); grau 4 como ponte até a artroplastia.",
      "Ombro com manguito íntegro, tornozelo e quadril inicial sem derrame (evidência mais fraca).",
      "Idosos com comorbidades em que AINE é arriscado.",
    ],
    contraindicacoes: [
      "Crise inflamatória com derrame volumoso (aspirar/tratar antes).",
      "Dor mecânica intensa com edema ósseo, fissura ou necrose subcondral na RM (tratar com descarga).",
      "Alergia a proteínas de ave (produtos derivados de crista de galo).",
    ],
    medicacao: [
      "Hylan G-F 20: 16 mg/2 mL semanal × 3 ou 48 mg/6 mL dose única.",
      "Hialuronato de sódio (baixo PM): 20–25 mg/2–2,5 mL semanal × 3–5; produtos de PM intermediário em dose única (ex.: 40 mg/2 mL).",
    ],
    etapas: [
      { t: "Joelho", passos: [
        "Suprapatelar lateral: 1 cm acima do polo superior da patela, na linha da borda posterior da patela; agulha paralela ao chão, para medial.",
        "Ântero-medial/lateral: joelho fletido, ponto mole 1 cm ao lado do meio do tendão patelar, agulha a 45° para o centro da articulação.",
        "Aspirar derrame antes (dilui e degrada o HA).",
      ] },
      { t: "Outras articulações", passos: [
        "Ombro: via anterior lateral ao coracoide (braço em rotação interna) ou posterior 1–2 cm abaixo e medial ao ângulo posterior do acrômio, mirando o coracoide.",
        "Quadril: ponto mole entre EIAS e trocânter (junção do terço superior com os 2/3 inferiores) — sempre confirmar com fluoroscopia/US.",
        "Tornozelo: anterolateral (lateral ao extensor longo dos dedos, cuidado com o fibular superficial) ou anteromedial (medial ao tibial anterior).",
      ] },
    ],
    complicacoes: [
      "Reação local (dor/derrame) em 1–3 dias, mais com alto PM — autolimitada.",
      "Pseudossepse: inflamação intensa em 24–72 h, mais após várias aplicações; excluir sepse e cristais; tratar com AINE, artrocentese e corticoide.",
    ],
    perolas: [
      "Diretrizes divergem (NICE não recomenda; outras sociedades recomendam em > 60 anos com KL 2–3).",
      "Ciclo de 3 injeções pode ser repetido até 2 vezes ao ano; corticoide no mesmo joelho a cada ≥ 3 meses.",
      "Condrocalcinose radiográfica sem crise não contraindica.",
    ],
    fontes: ["MSK p. 203–213", "SILVER p. 125–126", "SAUNDERS p. 115"],
    tags: ["ácido hialurônico", "viscossuplementação", "artrose", "hylan"],
  },
  {
    id: "proloterapia", titulo: "Proloterapia com glicose hipertônica", secao: "regenerativas", guia: "palpacao",
    guiaNota: "US útil em lesões localizadas; a maioria por referências ósseas.",
    resumo: "Injeção de solução irritante (glicose hipertônica) nas ênteses de ligamentos/tendões frouxos ou lesados para provocar inflamação controlada e deposição de colágeno. Glicose 12,5–15% periarticular e 25% intra-articular; ≤ 0,3 mL por ponto sempre com contato ósseo; séries de 3–6 sessões.",
    indicacoes: [
      "Instabilidade ligamentar: tornozelo, AC, luxação recidivante do ombro, sacroilíaca, sínfise, ligamento iliolombar.",
      "Tendinopatias e enteses crônicas, fascite plantar, epicondilites refratárias.",
      "Artrose de joelho e dedos; dor lombar/cervical mecânica com frouxidão ligamentar.",
    ],
    contraindicacoes: ["Infecção local/sistêmica; indicação cirúrgica clara."],
    material: ["Seringa de 10 mL", "Agulha 25G de 25 mm (tornozelo, superficiais); 21G de 50 mm ou espinhal 22G de 90 mm (profundos)"],
    medicacao: [
      "Glicose 25% intra-articular: 5 mL de glicose 50% + 5 mL de lidocaína 1%.",
      "Glicose 15% periarticular: 3 mL de glicose 50% + 3 mL de lidocaína 1% + 4 mL de SF 0,9%.",
      "Glicose 12,5%: 2,5 mL de glicose 50% + 5 mL de lidocaína 1% + 2,5 mL de SF 0,9%.",
    ],
    etapas: [
      { t: "Técnica", passos: [
        "Suspender AINE ~4 dias antes; anestesiar a pele.",
        "Levar a agulha pela substância do ligamento até o periósteo da êntese; só injetar com contato ósseo.",
        "Gotas de ≤ 0,3 mL por ponto, continuando ao recuar ao longo do ligamento — tratar a estrutura toda, não só o ponto doloroso.",
        "Ombro instável: 10 mL de glicose 25% intra-articular semanal × 3 (checar apreensão antes e depois).",
      ] },
      { t: "Frequência", passos: [
        "Clássico: a cada 4–6 semanas, 5–6 sessões; na prática, de semanal a quinzenal, em geral 3 (até 6) sessões.",
        "Esperar ~50% de redução da frouxidão por sessão; sem melhora após a 2ª, reavaliar o diagnóstico.",
      ] },
    ],
    posop: [
      "Dor, edema e rigidez por ~2 dias ('piora antes de melhorar'); sensibilidade pode durar ~1 mês.",
      "Movimento e exercício imediatos, analgésico simples e calor — evitar AINE, gelo e imobilização.",
    ],
    complicacoes: ["Dor intensa por volume excessivo num ponto; neurite cutânea transitória (ex.: safeno na pata de ganso).", "Coluna: risco de punção dural/pleural — imagem e experiência."],
    perolas: ["Não mascara a dor como o corticoide, permitindo reabilitar com segurança.", "Evidência ainda limitada, porém favorável em tendinopatias, artrose de joelho/dedos e dor lombopélvica."],
    fontes: ["MSK p. 219–232", "REGEN p. 39–42"],
    tags: ["proloterapia", "glicose hipertônica", "dextrose", "instabilidade ligamentar"],
  },
  {
    id: "celulas-bmac-gordura", titulo: "Concentrado de medula óssea (BMAC) e tecido adiposo", secao: "regenerativas", guia: "fluoro",
    guiaNota: "Coleta da crista ilíaca sob fluoroscopia ou US.",
    resumo: "Fontes autólogas de células mesenquimais: medula (crista ilíaca posterior; ~60 mL aspirados → ~6 mL de concentrado) e gordura (lipoaspiração com solução tumescente). Na artrose de joelho, ambos melhoraram sem diferença entre si; combinar não acrescentou benefício.",
    indicacoes: ["Artrose de joelho, lesões condrais, tendões e ligamentos — em geral como opção avançada/experimental e conforme regulamentação local."],
    contraindicacoes: ["Infecção, coagulopatia, neoplasia; procedimentos com manipulação extensa de células podem ser vedados pela legislação."],
    material: ["BMAC: trocater de punção, seringas de 10–30 mL com heparina, centrífuga e contador de células", "Gordura: cânula de lipoaspiração, solução tumescente (soro + anestésico + adrenalina), seringa de 50 mL"],
    etapas: [
      { t: "BMAC (crista ilíaca posterior)", passos: [
        "Decúbito ventral (ou supino para EIAS); sedação consciente; anestesiar pele e periósteo.",
        "Sob fluoroscopia/US, trocater na EIPS — cuidado com nervos clúnios, vasos glúteos superiores, isquiático e não atravessar o sacro.",
        "Aspirar poucos mL por vez em vários pontos (mudando ângulo/profundidade) com seringa heparinizada até ~60 mL.",
        "Centrifugar, contar células e viabilidade e injetar o concentrado no alvo.",
      ] },
      { t: "Tecido adiposo", passos: [
        "Infiltrar solução tumescente no subcutâneo (abdome, flanco ou coxa — rendimento semelhante).",
        "Aspirar a gordura; processar por lavagem e centrifugação (fração vascular estromal) ou fragmentação mecânica.",
      ] },
    ],
    perolas: [
      "Medula tem poucas células-tronco (0,001–0,01%) e muitas outras células; a gordura rende mais — pode ser melhor em idosos.",
      "Mais células se associaram a menos dor pós-procedimento num estudo de artrose.",
      "Produtos de placenta/âmnio não têm células-tronco funcionais comprovadas.",
    ],
    fontes: ["REGEN p. 109–117"],
    tags: ["células-tronco", "BMAC", "medula óssea", "gordura", "SVF"],
  },
  {
    id: "ondas-de-choque", titulo: "Ondas de choque extracorpóreas (ESWT)", secao: "regenerativas", guia: "na",
    resumo: "Não invasiva: 3–4 sessões semanais de ~2000 impulsos (radial ou focal — sem superioridade; energia insuficiente reduz o efeito). Evidência forte: tendinite calcária do manguito, fascite plantar crônica, Aquiles. Moderada: epicondilite lateral, dor peritrocantérica, isquiotibiais proximais, tendão patelar, pseudartrose.",
    indicacoes: [
      "Forte: tendinopatia calcária do manguito (alta energia reabsorve mais o cálcio), fascite plantar crônica, tendinopatia do Aquiles.",
      "Moderada: epicondilite lateral > 3 meses, dor peritrocantérica, isquiotibiais proximais, tendinopatia patelar, pseudartrose.",
      "Limitada: epicondilite medial, tenossinovite do bíceps, osteonecrose da cabeça femoral, dor miofascial.",
    ],
    contraindicacoes: [
      "Tumor maligno no campo, infecção local, gestação, < 18 anos, coagulopatia, insuficiência neurovascular, marca-passo/desfibrilador.",
      "Relativas: cirurgia prévia no local, anticoagulante/antiagregante, neuropatia compressiva periférica.",
    ],
    etapas: [
      { t: "Protocolo", passos: [
        "Localizar o ponto doloroso/calcificação (US ajuda) e aplicar o transdutor com gel.",
        "3–4 sessões semanais, ~2000 impulsos por sessão, ajustando energia à tolerância.",
      ] },
    ],
    complicacoes: ["Dor durante a aplicação; eritema, hematoma, edema e hipoestesia transitórios (até 1 semana).", "Relatos de ruptura do Aquiles após ESWT em tendão degenerado — avisar."],
    perolas: [
      "Na tendinopatia do manguito NÃO calcária não há evidência a favor.",
      "Na dor peritrocantérica o corticoide alivia mais rápido, mas a ESWT tem efeito tardio e mais duradouro.",
    ],
    fontes: ["MSK p. 239–245"],
    tags: ["ondas de choque", "ESWT", "calcária", "fascite plantar", "epicondilite"],
  },
  {
    id: "radiofrequencia-articular", titulo: "Radiofrequência de nervos articulares (joelho, quadril e ombro)", secao: "regenerativas", guia: "fluoro",
    guiaNota: "Fluoroscopia (ou US) com estimulação sensitiva e motora antes da lesão.",
    resumo: "Para quem não pode/não quer artroplastia ou tem dor crônica após prótese. Joelho: geniculados súpero-lateral, súpero-medial e ínfero-medial na junção diáfise–epicôndilo (± ramo do vasto intermédio), 60 °C por 150 s. Quadril: ramos do obturatório e femoral, 80 °C por 60 s. Ombro: radiofrequência pulsada do supraescapular.",
    indicacoes: [
      "Gonartrose ou coxartrose dolorosa sem indicação/condição cirúrgica.",
      "Dor crônica após artroplastia de joelho ou quadril.",
      "Dor crônica do ombro e capsulite (radiofrequência pulsada do supraescapular).",
    ],
    contraindicacoes: ["Infecção, coagulopatia, marca-passo (avaliar), recusa."],
    etapas: [
      { t: "Joelho (geniculados)", passos: [
        "Supino, joelho levemente elevado; bloqueio diagnóstico prévio recomendado.",
        "Agulhas de RF até o osso: súpero-lateral (junção diáfise femoral–epicôndilo lateral), súpero-medial (diáfise femoral–epicôndilo medial) e ínfero-medial (diáfise tibial–epicôndilo medial); opcional na linha média acima da patela (vasto intermédio).",
        "Confirmar em AP e perfil; lesão de 60 °C por 150 s (rampa de 25 s).",
      ] },
      { t: "Quadril", passos: [
        "Ramo sensitivo do obturatório: abaixo da junção inferior ísquio–púbis; ramo do femoral: abaixo da EIAI, junto à margem anterolateral da articulação.",
        "Estimulação sensitiva (reproduz dor na virilha/coxa) e motora (sem contração) antes; anestésico local e lesão de 80 °C por 60 s.",
      ] },
    ],
    perolas: [
      "Joelho: melhora de dor e função de 4 semanas a 6 meses em estudos controlados.",
      "Quadril: redução de dor e melhora funcional aos 6 meses.",
    ],
    fontes: ["MSK p. 256–261"],
    tags: ["radiofrequência", "geniculado", "obturatório", "denervação", "artrose"],
  },
  {
    id: "alto-volume-agulhamento", titulo: "Alto volume guiado e agulhamento seco (tendinopatias)", secao: "regenerativas", guia: "us",
    resumo: "Para tendinopatias refratárias. Agulhamento: fenestrar o tecido tendinopático ~15 vezes em ~40 s sob US, poupando o tendão normal. Alto volume (Aquiles/patelar): grande volume de soro + anestésico (± corticoide) entre o tendão e a gordura de Kager para romper neovasos e cicatriz.",
    indicacoes: ["Tendinopatia crônica (Aquiles, patelar, epicondilite) sem resposta a exercício excêntrico e medidas conservadoras."],
    etapas: [
      { t: "Agulhamento seco", passos: [
        "Identificar no US a área tendinopática (hipoecoica/neovascular).",
        "Fenestrar ~15 vezes por ~40 s, sem lesar cartilagem ou estruturas vizinhas.",
        "Reabilitação: 2 dias de movimento sem carga, depois faixa elástica e exercícios a ~50% da intensidade até o 6º dia.",
      ] },
      { t: "Alto volume", passos: [
        "Agulha na face ventral do tendão (Aquiles: entre tendão e gordura de Kager), pela lateral, em plano com o transdutor.",
        "Injetar grande volume de soro com anestésico, distendendo o paratendão ao redor do tendão.",
        "Seguir com programa excêntrico.",
      ] },
    ],
    perolas: ["Neovascularização e espessura do tendão diminuíram em 3 meses após alto volume, com melhor adesão à fisioterapia."],
    fontes: ["MSK p. 167–169"],
    tags: ["agulhamento seco", "alto volume", "HVI", "neovascularização", "Aquiles"],
  },
];
