import type { Infiltracao } from "./types";

// Cotovelo. Doses em triamcinolona acetonida (40 mg/mL).

export const COTOVELO: Infiltracao[] = [
  {
    id: "cotovelo-articular", titulo: "Articulação do cotovelo (radiocapitelar)", secao: "cotovelo", guia: "palpacao",
    resumo: "Capsulite/artrose ou pós-fratura da cabeça do rádio. Via mais segura: fenda posterolateral acima da cabeça do rádio (entre cabeça do rádio e capítulo), com cotovelo a 45° e pronado; 20 mg em 2 mL.",
    indicacoes: [
      "Artropatia degenerativa, inflamatória ou pós-traumática (ex.: fratura da cabeça do rádio).",
      "Padrão capsular: perde mais flexão que extensão, com final duro.",
    ],
    material: ["Seringa de 2 mL", "Agulha 23G de 30 mm"],
    medicacao: ["Triamcinolona 20 mg + lidocaína 2% 1,5 mL (total 2 mL)."],
    posicao: ["Sentado, cotovelo apoiado em pronação e ~45° de flexão."],
    etapas: [
      { t: "Técnica", passos: [
        "Achar a fenda acima da cabeça do rádio, por trás, flexionando e estendendo o cotovelo passivamente.",
        "Entrar no ponto médio da interlinha, paralelo à superfície da cabeça do rádio, e atravessar a cápsula.",
        "Injetar em bolus (a cápsula contém as três articulações).",
        "Osteófitos dificultando: depositar um pouco na cápsula e 'caminhar' pela interlinha com menos dor.",
      ] },
      { t: "Alternativa", passos: ["Via posterior: entrar no topo do olécrano angulando obliquamente para distal."] },
    ],
    posop: ["Após 2 dias, ganhar amplitude com alongamento suave (sobretudo flexão); mobilização passiva com cuidado."],
    perolas: [
      "Corpos livres: preferir mobilização sob tração; adolescentes com corpo livre devem ir para cirurgia.",
    ],
    fontes: ["SAUNDERS p. 75"],
    tags: ["cotovelo", "radiocapitelar", "cabeça do rádio", "artrose"],
  },
  {
    id: "bursa-olecraniana", titulo: "Bursa olecraniana", secao: "cotovelo", guia: "palpacao",
    resumo: "Bursa subcutânea do tamanho de uma bola de golfe. Sempre aspirar antes; líquido suspeito → não injetar e mandar para análise. Corticoide 20 mg em 2 mL em bolus.",
    indicacoes: ["Bursite por apoio prolongado, trauma, AR ou gota.", "Bursite hemorrágica pós-trauma: aspirar todo o sangue antes."],
    contraindicacoes: ["Suspeita de bursite séptica (calor, eritema, celulite, líquido turvo)."],
    material: ["Seringa de 2 mL (outra maior para aspirar)", "Agulha 23G de 25 mm (mais grossa para aspirar)"],
    medicacao: ["Triamcinolona 20 mg + lidocaína 2% 1,5 mL (total 2 mL)."],
    posicao: ["Sentado, cotovelo apoiado a 90°."],
    etapas: [
      { t: "Técnica", passos: [
        "Localizar o centro da área dolorosa/flutuante.",
        "Aspirar primeiro; avaliar o aspecto do líquido.",
        "Se claro, injetar em bolus pela mesma agulha (trocando a seringa).",
      ] },
    ],
    posop: ["Repouso relativo 1 semana; evitar apoiar o cotovelo."],
    perolas: ["Na dúvida sobre infecção, aguardar Gram/cultura antes de qualquer corticoide."],
    fontes: ["SAUNDERS p. 77"],
    tags: ["olécrano", "bursite", "aspiração"],
  },
  {
    id: "epicondilite-lateral", titulo: "Epicondilite lateral (cotovelo de tenista)", secao: "cotovelo", guia: "palpacao",
    resumo: "Dor lateral ao pegar e girar; dor à extensão resistida do punho com cotovelo estendido. A lesão é na êntese da faceta anterior do epicôndilo lateral (do tamanho da unha do mínimo): tocar osso e fazer peppering; 10 mg em 1 mL.",
    indicacoes: ["Tendinopatia da origem dos extensores (ERCC) por sobrecarga, sem resposta a medidas iniciais."],
    material: ["Seringa de 1 mL", "Agulha 25G de 16 mm"],
    medicacao: ["Triamcinolona 10 mg + lidocaína 2% 0,75 mL (total 1 mL).", "Paciente preocupado com atrofia/despigmentação (magra, pele escura): usar hidrocortisona."],
    posicao: ["Sentado, cotovelo apoiado a 90°, antebraço supinado."],
    etapas: [
      { t: "Técnica", passos: [
        "Localizar a ponta lateral do epicôndilo e deslizar para a faceta anterior.",
        "Entrar alinhado com a prega do cotovelo, perpendicular à faceta, até tocar osso.",
        "Peppering na êntese; mirar exatamente o pequeno ponto da lesão, ignorando pontos-gatilho dolorosos no ventre (presentes em todos).",
      ] },
    ],
    posop: [
      "Repouso de 10 dias: levantar peso só com a palma para cima; evitar a atividade causal.",
      "Quando a extensão resistida não doer: 2–3 sessões de fricção profunda + manipulação de Mill; depois alongamento e fortalecimento progressivo.",
      "Revisar raquete (peso, empunhadura, encordoamento) e técnica.",
    ],
    complicacoes: ["Atrofia subcutânea e despigmentação, principalmente em mulheres magras de pele escura — avisar antes."],
    perolas: [
      "Uma injeção costuma bastar; recidiva → segunda injeção seguida do mesmo programa.",
      "A lesão também pode estar no corpo do tendão, no ventre muscular ou na origem do ERLC.",
      "Alternativas na refratária: PRP, esclerosante, agulhamento (tenotomia percutânea) ou cirurgia.",
    ],
    fontes: ["SAUNDERS p. 79"],
    tags: ["epicondilite lateral", "tennis elbow", "ERCC", "peppering"],
  },
  {
    id: "epicondilite-medial", titulo: "Epicondilite medial (cotovelo de golfista)", secao: "cotovelo", guia: "palpacao",
    resumo: "Dor medial ao pegar e levantar; dor à flexão resistida do punho. Peppering na faceta anterior do epicôndilo medial, tocando osso; 10 mg em 1 mL. Cuidado com o nervo ulnar, posterior ao epicôndilo.",
    indicacoes: ["Tendinopatia da origem dos flexores/pronadores."],
    material: ["Seringa de 1 mL", "Agulha 25G de 16 mm"],
    medicacao: ["Triamcinolona 10 mg + lidocaína 2% 0,75 mL (total 1 mL)."],
    posicao: ["Sentado, braço apoiado em extensão."],
    etapas: [
      { t: "Técnica", passos: [
        "Localizar a faceta anterior do epicôndilo medial (tamanho da unha do mínimo).",
        "Entrar perpendicular à faceta até tocar osso e fazer peppering no tendão.",
        "Manter-se anterior: o nervo ulnar passa no sulco atrás do epicôndilo — parestesia no 4º/5º dedos = reposicionar.",
      ] },
    ],
    posop: ["Repouso relativo 1 semana; depois alongamento e fortalecimento."],
    perolas: [
      "Lesão na junção musculotendínea (muito dolorosa) responde pior à infiltração; fricção profunda pode funcionar.",
      "Menos comum e recidiva menos que a lateral.",
    ],
    fontes: ["SAUNDERS p. 81"],
    tags: ["epicondilite medial", "golfista", "flexores", "nervo ulnar"],
  },
  {
    id: "biceps-distal", titulo: "Inserção distal do bíceps e bursa bicipitorradial", secao: "cotovelo", guia: "palpacao",
    guiaNota: "Região com estruturas neurovasculares anteriores — a via posterior (antebraço pronado) evita a fossa cubital.",
    resumo: "Dor anterior do cotovelo à flexão/supinação resistida. Com o paciente em decúbito ventral e antebraço totalmente pronado, a tuberosidade do rádio vira para trás: tocar osso dois dedos distal à cabeça do rádio. Tendão 10 mg/1 mL; bursa 20 mg/2 mL.",
    indicacoes: ["Tendinopatia da inserção do bíceps.", "Bursite bicipitorradial (mais dor à flexão/pronação passiva e palpação extremamente dolorosa)."],
    material: ["Tendão: seringa de 1 mL; bursa: 2 mL", "Agulha 23G de 25 mm"],
    medicacao: ["Tendão: triamcinolona 10 mg + lidocaína 2% 0,75 mL.", "Bursa: triamcinolona 20 mg + lidocaína 2% 1,5 mL."],
    posicao: ["Decúbito ventral, braço estendido com a palma na mesa; fixar o úmero e pronar totalmente o antebraço."],
    etapas: [
      { t: "Técnica", passos: [
        "Localizar a tuberosidade do rádio dois dedos distal à cabeça do rádio (agora voltada para trás).",
        "Entrar perpendicular até tocar osso.",
        "Peppering no tendão, bolus na bursa, ou ambos.",
      ] },
    ],
    posop: ["Repouso 1 semana; depois fortalecimento e alongamento graduais e correção da sobrecarga."],
    perolas: ["Lesão dupla suspeita: bursa primeiro, reavaliar em 1 semana e tratar o tendão se necessário."],
    fontes: ["SAUNDERS p. 83"],
    tags: ["bíceps distal", "tuberosidade do rádio", "bursa bicipitorradial"],
  },
];
