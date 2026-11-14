import type { Topico } from "./types";

export const FISIOTERAPIA: Topico[] = [
  {
    id: "f-principios", titulo: "Princípios do treinamento e do exercício terapêutico", area: "fisioterapia", grupo: "Fundamentos",
    tags: ["sobrecarga", "especificidade", "individualidade", "reversibilidade", "fitt"],
    resumo: "Sobrecarga progressiva, especificidade, individualidade, reversibilidade e recuperação — base de toda prescrição.",
    secoes: [
      { t: "Princípios", itens: ["Sobrecarga progressiva: aumentar carga, volume ou complexidade quando a dose atual fica fácil.", "Especificidade (SAID): o corpo se adapta ao estímulo específico — treine o que o esporte exige.", "Individualidade: idade, histórico, lesões e resposta pessoal mudam a dose.", "Reversibilidade: ganhos se perdem com a interrupção (força cai mais devagar que a resistência aeróbia).", "Recuperação: adaptação ocorre no descanso — sono, nutrição e intervalo entre sessões."] },
      { t: "Prescrição FITT-VP", itens: ["Frequência, Intensidade, Tempo, Tipo, Volume e Progressão.", "Registrar sempre para poder ajustar: o que não é medido não é progredido."] },
    ],
    fontes: ["HAFF", "GARD", "PRESTES"],
  },
  {
    id: "f-forca", titulo: "Prescrição de treino de força por objetivo", area: "fisioterapia", grupo: "Força e potência",
    tags: ["hipertrofia", "força máxima", "resistência muscular", "%1rm", "séries", "repetições", "descanso"],
    resumo: "Intensidade, repetições, séries e intervalo mudam conforme o objetivo — força, hipertrofia, potência ou resistência.",
    secoes: [
      { t: "Ordem e técnica", itens: ["Exercícios multiarticulares e de potência no início da sessão, monoarticulares depois.", "Técnica antes de carga; amplitude completa sempre que possível.", "Iniciantes: 2–3 sessões/semana corpo inteiro; avançados: divisões e maior volume."] },
      { t: "Progressão", itens: ["Regra prática: aumentar 2–10% quando conseguir 1–2 repetições além do alvo em 2 sessões seguidas.", "Use a calculadora de 1RM para converter cargas."] },
    ],
    tabela: {
      cab: ["Objetivo", "Intensidade", "Repetições", "Séries", "Descanso"],
      linhas: [
        ["Força máxima", "≥ 85% 1RM", "≤ 6", "2–6", "2–5 min"],
        ["Potência (1 esforço)", "80–90% 1RM", "1–2", "3–5", "2–5 min"],
        ["Potência (vários)", "75–85% 1RM", "3–5", "3–5", "2–5 min"],
        ["Hipertrofia", "67–85% 1RM", "6–12", "3–6", "30–90 s"],
        ["Resistência muscular", "≤ 67% 1RM", "≥ 12", "2–3", "≤ 30 s"],
      ],
    },
    fontes: ["HAFF", "PRESTES", "MORAN"],
  },
  {
    id: "f-periodizacao", titulo: "Periodização", area: "fisioterapia", grupo: "Força e potência",
    tags: ["periodização linear", "ondulatória", "blocos", "macrociclo", "mesociclo", "deload"],
    resumo: "Organizar o treino em ciclos para chegar ao pico no momento certo e evitar estagnação e sobretreinamento.",
    secoes: [
      { t: "Estrutura", itens: ["Macrociclo (temporada/ano) → mesociclos (3–6 semanas) → microciclos (semana).", "Fases: preparação geral → específica → competitiva → transição.", "Semana de descarga (deload) a cada 3–6 semanas: reduzir volume 40–60%."] },
      { t: "Modelos", itens: ["Linear: volume alto/intensidade baixa → volume baixo/intensidade alta.", "Ondulatória (diária/semanal): varia o estímulo dentro da semana — útil para quem compete com frequência.", "Blocos: acumulação → transmutação → realização, foco concentrado em poucas capacidades por bloco."] },
    ],
    fontes: ["HAFF", "PRESTES"],
  },
  {
    id: "f-pliometria", titulo: "Pliometria e potência", area: "fisioterapia", grupo: "Força e potência",
    tags: ["pliometria", "salto", "ciclo alongamento-encurtamento", "potência"],
    resumo: "Usa o ciclo alongamento-encurtamento; contar contatos com o solo e progredir de baixa para alta intensidade.",
    secoes: [
      { t: "Pré-requisitos e dose", itens: ["Base de força (ex.: agachar ~1,5x o peso corporal para pliometria intensa) e aterrissagem controlada.", "Volume por contatos: iniciante 80–100, intermediário 100–120, avançado 120–140 por sessão.", "1–3 sessões/semana com 48–72 h de intervalo; descanso de 5–10 s entre repetições e 2–3 min entre séries.", "Progressão: bipodal → unipodal; vertical → horizontal → lateral; baixa → alta altura de queda."] },
    ],
    fontes: ["HAFF", "SPBIO"],
  },
  {
    id: "f-tendao", titulo: "Treino para tendinopatias", area: "fisioterapia", grupo: "Tecidos",
    tags: ["tendinopatia", "isométrico", "hsr", "excêntrico", "mecanotransdução"],
    resumo: "Tendões respondem à carga lenta e pesada; adaptação lenta (semanas a meses); evitar repouso completo.",
    secoes: [
      { t: "Estratégias", itens: ["Isométrico (analgesia): 4–5 × 30–45 s a 70% da força máxima.", "Resistência pesada e lenta (HSR): 3 s concêntrico + 3 s excêntrico, 15 → 6 RM, 3x/semana.", "Excêntrico isolado (Alfredson): 3 × 15 duas vezes ao dia — alternativa clássica.", "Energia armazenada (pliometria) só depois de força adequada.", "Tendão precisa de ~48–72 h entre sessões pesadas."] },
    ],
    fontes: ["PTR", "REHAB"],
  },
  {
    id: "f-flexibilidade", titulo: "Flexibilidade e mobilidade", area: "fisioterapia", grupo: "Fundamentos",
    tags: ["alongamento", "estático", "dinâmico", "fnp", "mobilidade"],
    resumo: "Dinâmico no aquecimento; estático e FNP depois do treino ou em sessões separadas.",
    secoes: [
      { t: "Prescrição", itens: ["Estático: 15–30 s, 2–4 repetições, total ~60 s por músculo, ≥ 2–3x/semana.", "Estático prolongado (> 60 s) imediatamente antes de esforços máximos pode reduzir força/potência transitoriamente.", "FNP (contrai-relaxa): contração submáxima de 3–6 s seguida de alongamento de 10–30 s.", "Dinâmico: movimentos controlados progressivos na amplitude do esporte (aquecimento)."] },
    ],
    fontes: ["HAFF", "GARD"],
  },
  {
    id: "f-proprio", titulo: "Propriocepção e controle neuromuscular", area: "fisioterapia", grupo: "Prevenção",
    tags: ["equilíbrio", "propriocepção", "fifa 11+", "prevenção de lesões"],
    resumo: "Treino de equilíbrio, aterrissagem e mudança de direção reduz lesões de tornozelo e LCA.",
    secoes: [
      { t: "Progressão", itens: ["Estável → instável; bipodal → unipodal; olhos abertos → fechados; sem → com tarefa dupla/perturbação.", "Programas estruturados de aquecimento (ex.: FIFA 11+, 15–20 min, 2–3x/semana) reduzem lesões em ~30–50%.", "Ênfase em aterrissagem suave com joelhos alinhados sobre os pés."] },
    ],
    ver: ["b-aterrissagem"],
    fontes: ["SPBIO", "HAFF"],
  },
  {
    id: "f-aerobio", titulo: "Treino aeróbio e intervalado", area: "fisioterapia", grupo: "Condicionamento",
    tags: ["zonas", "frequência cardíaca", "hiit", "vo2max", "limiar"],
    resumo: "Distribuição polarizada (≈ 80% leve, 20% intenso) para resistência; HIIT eficiente em tempo.",
    secoes: [
      { t: "Prescrição", itens: ["Intensidade por FC (Karvonen), escala de esforço (RPE) ou ritmo/potência.", "HIIT: ex. 4 × 4 min a 85–95% FCmáx com 3 min de recuperação ativa.", "Sprint intervalado: 4–8 × 30 s máximo com 2–4 min de recuperação.", "Volume semanal aumentar ~10% por semana (regra prática), com semana de descarga."] },
    ],
    fontes: ["HAFF", "METAB"],
  },
  {
    id: "f-rpe", titulo: "Monitoramento de carga (RPE, RIR, ACWR)", area: "fisioterapia", grupo: "Condicionamento",
    tags: ["rpe", "rir", "srpe", "carga aguda crônica", "acwr", "monitoramento"],
    resumo: "Carga interna = RPE da sessão × minutos; compare carga aguda (7 dias) com crônica (28 dias).",
    secoes: [
      { t: "Ferramentas", itens: ["RPE (0–10) e RIR (repetições em reserva): RIR 2 ≈ parar com 2 repetições sobrando.", "sRPE: nota de esforço 30 min após a sessão × duração em minutos (unidades arbitrárias).", "ACWR entre ~0,8 e 1,3 é a faixa usualmente considerada segura; picos > 1,5 associam-se a mais lesão (usar como alerta, não como regra rígida).", "Bem-estar diário: sono, dor muscular, fadiga, humor."] },
    ],
    fontes: ["HAFF", "SPBIO"],
  },
  {
    id: "f-modalidades", titulo: "Recursos físicos (modalidades)", area: "fisioterapia", grupo: "Recursos",
    tags: ["crioterapia", "calor", "tens", "ultrassom", "ondas de choque", "laser", "bfr"],
    resumo: "Adjuntos para dor e conforto; o exercício é o tratamento principal.",
    secoes: [
      { t: "Evidência resumida", itens: ["Crioterapia: alívio de dor agudo (10–20 min); imersão fria logo após treino de força pode atenuar ganhos de hipertrofia.", "Calor: rigidez e dor muscular crônica, antes do alongamento.", "TENS: analgesia de curto prazo.", "Ultrassom terapêutico: evidência fraca para a maioria das lesões musculoesqueléticas.", "Ondas de choque: tendinopatias crônicas (calcárea do ombro, fascite plantar, epicondilalgia).", "Restrição de fluxo sanguíneo (BFR): 20–30% 1RM com manguito a 40–80% da pressão de oclusão — força e hipertrofia com carga baixa na reabilitação."] },
    ],
    fontes: ["PTR", "GARD"],
  },
  {
    id: "f-peso-corporal", titulo: "Força com peso corporal", area: "fisioterapia", grupo: "Força e potência",
    tags: ["calistenia", "peso corporal", "progressões", "glúteos"],
    resumo: "Progredir por alavanca, amplitude, unilateralidade e tempo sob tensão quando não há carga externa.",
    secoes: [
      { t: "Progressões", itens: ["Membros inferiores: agachamento → afundo → búlgaro → pistol; ponte → ponte unipodal → elevação de quadril com pés elevados.", "Empurrar: flexão inclinada → no solo → declinada → com pausa/unilateral.", "Puxar: remada invertida (mesa/argolas) com corpo cada vez mais horizontal → barra fixa.", "Core: prancha → prancha lateral → anti-rotação → roda abdominal."] },
    ],
    fontes: ["BODYW", "MORAN"],
  },
  {
    id: "f-adaptada", titulo: "Atividade física adaptada", area: "fisioterapia", grupo: "Populações especiais",
    tags: ["deficiência", "paralímpico", "inclusão", "adaptada"],
    resumo: "Adaptar equipamento, regras e ambiente para incluir pessoas com deficiência, mantendo os princípios do treino.",
    secoes: [
      { t: "Pontos práticos", itens: ["Lesão medular: atenção a disreflexia autonômica (lesões acima de T6) e termorregulação.", "Amputados: cuidado com pele do coto, assimetrias e sobrecarga do membro remanescente.", "Paralisia cerebral: espasticidade — combinar força, alongamento e controle motor.", "Deficiência intelectual: instruções curtas, demonstração e rotina previsível."] },
    ],
    fontes: ["WINNICK"],
  },
];
