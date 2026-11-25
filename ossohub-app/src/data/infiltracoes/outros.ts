import type { Infiltracao } from "./types";

// Outros sítios.

export const OUTROS: Infiltracao[] = [
  {
    id: "atm", titulo: "Articulação temporomandibular (ATM)", secao: "outros", guia: "palpacao",
    resumo: "Dor na ATM ao mastigar, cefaleia, estalido/bloqueio, abertura assimétrica. Com a boca bem aberta, palpar a fenda logo à frente do trago e entrar vertical no compartimento inferior (abaixo do disco); 10 mg em 1 mL.",
    indicacoes: ["Capsulite da ATM pós-trauma (acidente, lesão do disco), artrose, má oclusão, bruxismo."],
    material: ["Seringa de 1 mL", "Agulha 25G de 16 mm"],
    medicacao: ["Triamcinolona 10 mg + lidocaína 2% 0,75 mL (total 1 mL)."],
    posicao: ["Deitado sobre o lado sadio, cabeça apoiada, boca mantida aberta."],
    etapas: [
      { t: "Técnica", passos: [
        "Palpar o espaço articular à frente da orelha enquanto o paciente abre e fecha a boca; marcar com a boca aberta.",
        "Entrar vertical no compartimento inferior, abaixo do disco (manobrar a agulha para desviar dele).",
        "Injetar em bolus.",
      ] },
    ],
    posop: ["Evitar morder alimentos grandes/duros; exercícios ativos suaves e isométricos; placa para bruxismo e avaliação odontológica."],
    perolas: ["Disco deslocado: tentar redução manual ~1 semana após a infiltração, quando a inflamação ceder."],
    fontes: ["SAUNDERS p. 172"],
    tags: ["ATM", "temporomandibular", "bruxismo"],
  },
  {
    id: "occipital-maior", titulo: "Bloqueio dos nervos occipitais (maior e menor)", secao: "outros", guia: "palpacao",
    guiaNota: "US permite bloqueio proximal (sobre o oblíquo inferior da cabeça).",
    resumo: "Neuralgia occipital e cefaleias posteriores; também ajuda a diferenciar de cefaleia cervicogênica. Na linha nucal superior: occipital maior no terço medial entre a protuberância occipital externa e o mastoide (medial à artéria occipital); menor na junção do terço médio com o lateral. ~5 mL de anestésico ± corticoide, em leque.",
    indicacoes: ["Neuralgia occipital (dor em choque na região occipital, às vezes irradiada à face), pós-chicote; cefaleia com dor à palpação do nervo."],
    material: ["Seringa de 5 mL", "Agulha 25G de 25–40 mm"],
    medicacao: ["Anestésico local com corticoide, total ~5 mL."],
    posicao: ["Sentado de costas para o médico, pescoço fletido com a testa apoiada num travesseiro."],
    etapas: [
      { t: "Técnica", passos: [
        "Marcar a protuberância occipital externa e o processo mastoide e traçar a linha nucal superior entre eles.",
        "Occipital maior: terço medial, medial ao pulso da artéria occipital. Occipital menor: junção do terço médio com o lateral.",
        "Injetar no subcutâneo sobre o osso, distribuindo em leque; parestesia = contato com o nervo → reposicionar levemente. Aspirar (artéria).",
      ] },
    ],
    perolas: ["O occipital maior é ramo de C2 (o maior nervo puramente sensitivo); compressão pode ocorrer em qualquer ponto do trajeto, inclusive na inserção do trapézio."],
    fontes: ["EASY p. 116–117"],
    tags: ["occipital", "neuralgia occipital", "cefaleia", "C2"],
  },
  {
    id: "pontos-gatilho", titulo: "Pontos-gatilho miofasciais", secao: "outros", guia: "palpacao",
    resumo: "Nódulo hipersensível numa banda tensa, com dor referida e resposta de contração local. Fixar o ponto entre polegar e indicador, entrar 1–2 cm ao lado a ~30°, injetar 0,1–0,3 mL de lidocaína 1% (ou agulhamento seco) e redirecionar em leque. O efeito vem principalmente do agulhamento.",
    indicacoes: ["Dor miofascial regional (trapézio, elevador da escápula, glúteos, paravertebrais), cefaleia tensional, dor associada a disfunções crônicas."],
    contraindicacoes: ["Dor difusa/generalizada (resposta pobre).", "Cuidado sobre o tórax (pneumotórax) — agulha curta e ângulo tangencial."],
    material: ["Seringa de 5–10 mL", "Agulha 22–25G de comprimento adequado"],
    medicacao: ["Lidocaína 1% (ou procaína 0,5%) 0,1–0,3 mL por ponto; total 1–12 mL. Sem corticoide (miotoxicidade); soro se alergia a anestésico."],
    etapas: [
      { t: "Técnica", passos: [
        "Palpar a banda tensa e o nódulo; fixá-lo entre polegar e indicador.",
        "Entrar 1–2 cm ao lado e avançar a ~30° até o ponto (avisar sobre dor em pontada e contração).",
        "Injetar ~0,2 mL dentro do ponto; recuar até o subcutâneo e redirecionar para cima, baixo, lateral e medial, repetindo.",
      ] },
    ],
    posop: ["Alongamento e fisioterapia; corrigir postura e fatores perpetuantes (sono, sedentarismo)."],
    perolas: ["Repetir a cada poucos dias na fase aguda e espaçar ao melhorar; tratar 1–2 regiões por visita."],
    fontes: ["SAUNDERS p. 43", "EASY p. 161–164"],
    tags: ["ponto-gatilho", "miofascial", "agulhamento seco", "trigger point"],
  },
  {
    id: "esternocostal", titulo: "Articulações esternocostais / síndrome de Tietze", secao: "outros", guia: "palpacao",
    resumo: "Dor torácica anterior por disfunção esternocostal, Tietze ou após fratura de costela. Palpar a articulação lateral ao esterno (sente-se o movimento na inspiração profunda) e entrar vertical apenas ~0,5 cm; 0,5 mL de anestésico por articulação (± pequena dose de corticoide).",
    indicacoes: ["Síndrome de Tietze/costocondrite, disfunção esternocostal, dor pós-fratura de costela."],
    contraindicacoes: ["Dor torácica sem excluir causa cardíaca/pulmonar."],
    material: ["Seringa de 1–2 mL", "Agulha fina 27G de 20 mm"],
    medicacao: ["Anestésico local 0,5 mL por articulação (alguns associam corticoide em pequena dose)."],
    etapas: [
      { t: "Técnica", passos: [
        "Palpar o esterno e deslizar lateralmente até a articulação; confirmar sentindo o movimento na inspiração/expiração profundas.",
        "Entrar vertical ~0,5 cm, tocar osso e, se preciso, procurar a interlinha; injetar.",
        "Controlar a profundidade: pleura e pericárdio (à esquerda) estão próximos.",
      ] },
    ],
    posop: ["Mobilização manual e fricção dos intercostais; pode repetir 1–2 vezes por semana por até 4 semanas."],
    fontes: ["FISCHER p. 107–108"],
    tags: ["Tietze", "costocondrite", "esternocostal", "dor torácica"],
  },
];
