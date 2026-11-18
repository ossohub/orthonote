import type { Nota, Topico } from "./types";

// Revisão diária da Medicina Esportiva (um capítulo por dia — ver docs/revisao-diaria).
// NOTAS_DIARIA: id do tópico → notas de comparação (concorda / diverge / acrescenta).
// NOVOS_DIARIA: tópicos que o capítulo traz e o site ainda não tinha.
// Sempre com palavras próprias; nunca copiar texto dos livros.
// Erros de conteúdo são corrigidos direto no arquivo da área (lesoes.ts etc.)
// e registrados no resumo da fila.

export const NOTAS_DIARIA: Record<string, Nota[]> = {
  "f-triagem": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "A avaliação pré-participação (estado físico e mental) deve ser feita antes de o atleta começar a competir — é também uma das principais áreas de responsabilidade legal da equipe. Não ter dados de base do atleta sem lesão está entre os erros mais comuns: sem eles, fica difícil provar e decidir quando ele voltou ao normal." },
  ],
  "r-principios": [
    { fonte: "SRIP", tipo: "acrescenta", texto: "Liberar para jogar com lesão ainda presente é um dilema ético frequente (pressão do clube, do técnico e do próprio atleta). A decisão de aptidão deve seguir a prática clínica atual, ser registrada e, na dúvida, o atleta deve ser afastado e encaminhado a um profissional mais experiente — continuar jogando e agravar a lesão gera responsabilidade para quem liberou." },
  ],
};

export const NOVOS_DIARIA: Topico[] = [
  {
    id: "r-equipe-campo", titulo: "Atendimento à beira do campo: equipe, emergência, sigilo e registro", area: "reabilitacao", grupo: "Geral",
    tags: ["beira do campo", "equipe multiprofissional", "plano de emergência", "rcp", "dea", "sigilo", "prontuário", "ética", "responsabilidade legal"],
    resumo: "Lesão no esporte é cuidada em equipe. Quem atende no campo precisa de preparo para emergência, plano escrito, sigilo sobre o atleta e registro completo.",
    secoes: [
      { t: "Equipe", itens: ["Médicos (clínico, ortopedista, radiologista, cardiologista, neurologista), fisioterapeuta/reabilitador, preparador físico, nutricionista, psicólogo do esporte, técnico e dirigentes.", "Nem todos estão presentes em todo nível; o essencial é saber quem decide o quê e para quem encaminhar.", "Atleta menor de idade: pais ou responsáveis fazem parte das decisões."] },
      { t: "Preparo mínimo de quem atende no campo", itens: ["Suporte básico de vida com DEA (RCP + desfibrilador) com certificação em dia e retreino periódico.", "Primeiros socorros, precauções com sangue e fluidos, bandagem e órteses.", "Avaliar a lesão logo no campo, de preferência antes do espasmo muscular e do edema mascararem o exame.", "Esportes com equipamento de proteção (capacete e ombreiras no futebol americano, hóquei no gelo, críquete): treinar o atendimento de emergência com o equipamento — inclusive quando e como retirá-lo."] },
      { t: "Plano de emergência", itens: ["Clube, escola ou evento deve ter plano escrito para cada local: quem atende, material, acesso da ambulância e hospital de referência.", "Situações que exigem resposta rápida e protocolo próprio: concussão, suspeita de lesão medular e hipertermia (insolação de esforço).", "Afastar da partida o atleta lesionado quando continuar pode agravar a lesão."] },
      { t: "Sigilo", itens: ["Examinar longe de colegas, adversários e imprensa sempre que possível; cuidado com comentários em voz alta.", "Informação de saúde do atleta só é passada ao técnico, clube ou imprensa com consentimento dele (ou quando a lei exigir).", "Combinar antes, com o atleta e o clube, como as informações serão compartilhadas."] },
      { t: "Registro (prontuário)", itens: ["Registrar a lesão, a avaliação, o tratamento, a evolução e as orientações dadas (inclusive explicação de cada recurso terapêutico).", "Nunca alterar ou 'corrigir' registros depois; manter os registros protegidos.", "Em lesão grave ou catastrófica, a documentação precisa ser bem mais detalhada do que se costuma imaginar."] },
      { t: "Onde mais surgem processos", itens: ["Avaliação pré-participação ausente ou mal feita.", "Liberação para jogar sem critério atual.", "Atendimento inadequado de lesão grave no campo.", "Quebra de sigilo.", "Também: piso/equipamento inseguro, falta de equipamento de proteção ou de ensino de técnica segura, demora em encaminhar."] },
    ],
    ver: ["f-triagem", "r-principios", "l-concussao", "r-agudo"],
    fontes: ["SRIP"],
  },
];
