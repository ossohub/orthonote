// Imagens radiográficas com os traçados, do material do Dr. Roberto Farias (PDF "ângulos ortopedia").
// Arquivos em public/mensuracao/. Chave = id da medida em src/data/radiologia.
export interface ImagemRx { src: string; legenda: string; w: number; h: number }

export const IMAGENS_RX: Record<string, ImagemRx[]> = {
  "pe-meary": [
    { src: "/mensuracao/rx-01.webp", legenda: "Ângulo de Meary (talo–1º metatarso)", w: 1400, h: 929 },
  ],
  "pe-pitch": [
    { src: "/mensuracao/rx-02.webp", legenda: "Inclinação do calcâneo (pitch)", w: 1400, h: 929 },
  ],
  "pe-talocalcaneo": [
    { src: "/mensuracao/rx-03.webp", legenda: "Ângulo de Kite no perfil", w: 1400, h: 929 },
    { src: "/mensuracao/rx-04.webp", legenda: "Ângulo de Kite no AP", w: 932, h: 1600 },
  ],
  "pe-tibiocalcaneo": [
    { src: "/mensuracao/rx-05.webp", legenda: "Ângulo de Hibbs", w: 1400, h: 929 },
  ],
  "pe-bohler-gissane": [
    { src: "/mensuracao/rx-06.webp", legenda: "Ângulo de Gissane", w: 1400, h: 929 },
    { src: "/mensuracao/rx-07.webp", legenda: "Ângulo de Böhler", w: 1400, h: 929 },
  ],
  "pe-intermetatarsais": [
    { src: "/mensuracao/rx-08.webp", legenda: "Ângulo intermetatarsal (1º–2º)", w: 932, h: 1600 },
  ],
  "pe-halux-valgo": [
    { src: "/mensuracao/rx-09.webp", legenda: "Ângulo do hálux valgo", w: 932, h: 1600 },
    { src: "/mensuracao/rx-10.webp", legenda: "Ângulo interfalângico", w: 932, h: 1600 },
    { src: "/mensuracao/rx-11.webp", legenda: "Ângulo articular metatarsal distal (DMAA)", w: 932, h: 1600 },
    { src: "/mensuracao/rx-12.webp", legenda: "Congruência articular da MTF", w: 938, h: 1600 },
  ],
  "to-sindesmose": [
    { src: "/mensuracao/rx-13.webp", legenda: "Ângulo talocrural", w: 1400, h: 1443 },
    { src: "/mensuracao/rx-14.webp", legenda: "Espaço claro medial", w: 1007, h: 1596 },
    { src: "/mensuracao/rx-15.webp", legenda: "Espaço claro tibiofibular", w: 904, h: 1322 },
    { src: "/mensuracao/rx-16.webp", legenda: "Sobreposição tibiofibular", w: 904, h: 1322 },
  ],
  "qi-linhas": [
    { src: "/mensuracao/rx-17.webp", legenda: "Linha de Hilgenreiner", w: 1400, h: 959 },
    { src: "/mensuracao/rx-19.webp", legenda: "Linha de Perkins e quadrantes de Ombredanne", w: 1400, h: 959 },
    { src: "/mensuracao/rx-20.webp", legenda: "Arco de Shenton", w: 1400, h: 959 },
    { src: "/mensuracao/rx-22.webp", legenda: "Coordenada y", w: 1400, h: 959 },
  ],
  "qi-indice-acetabular": [
    { src: "/mensuracao/rx-18.webp", legenda: "Índice acetabular", w: 1400, h: 959 },
  ],
  "qi-gage-winter": [
    { src: "/mensuracao/rx-21.webp", legenda: "Estações de Gage e Winter", w: 1400, h: 959 },
  ],
  "pq-roof-arc": [
    { src: "/mensuracao/rx-25.webp", legenda: "Ângulos do arco do teto (Matta)", w: 1400, h: 1043 },
  ],
  "co-linhas-perfil": [
    { src: "/mensuracao/rx-26.webp", legenda: "Linha umeral anterior", w: 957, h: 1289 },
    { src: "/mensuracao/rx-27.webp", legenda: "Linha radiocapitelar", w: 957, h: 1289 },
    { src: "/mensuracao/rx-28.webp", legenda: "Linha do coronoide", w: 957, h: 1288 },
    { src: "/mensuracao/rx-29.webp", legenda: "Sinal da lágrima", w: 1102, h: 1288 },
    { src: "/mensuracao/rx-30.webp", legenda: "Ângulo diáfise-côndilo (umerocapitelar)", w: 957, h: 1289 },
  ],
  "co-baumann": [
    { src: "/mensuracao/rx-31.webp", legenda: "Ângulo de Baumann", w: 935, h: 1355 },
  ],
  "co-carregamento": [
    { src: "/mensuracao/rx-32.webp", legenda: "Ângulo de carregamento", w: 993, h: 1329 },
  ],
  "co-metafise-diafise": [
    { src: "/mensuracao/rx-33.webp", legenda: "Ângulo metáfise-diáfise", w: 993, h: 1329 },
  ],
  "ct-cobb": [
    { src: "/mensuracao/rx-34.webp", legenda: "Ângulo de Cobb e vértebras terminais", w: 1368, h: 1600 },
    { src: "/mensuracao/rx-35.webp", legenda: "Vértebra apical", w: 1368, h: 1600 },
  ],
  "ct-c7pl": [
    { src: "/mensuracao/rx-36.webp", legenda: "Linha sacral central vertical e vértebra estável", w: 1368, h: 1600 },
  ],
  "ct-rvad": [
    { src: "/mensuracao/rx-37.webp", legenda: "Ângulos costovertebrais de Mehta", w: 1400, h: 539 },
  ],
  "jo-insall": [
    { src: "/mensuracao/rx-38.webp", legenda: "Índice de Insall-Salvati", w: 1208, h: 1600 },
  ],
  "jo-caton": [
    { src: "/mensuracao/rx-39.webp", legenda: "Índice de Caton-Deschamps", w: 1207, h: 1600 },
  ],
  "jo-blackburne": [
    { src: "/mensuracao/rx-40.webp", legenda: "Índice de Blackburne-Peel", w: 1208, h: 1600 },
  ],
  "jo-sulco": [
    { src: "/mensuracao/rx-41.webp", legenda: "Ângulo do sulco", w: 1400, h: 768 },
  ],
  "jo-congruencia": [
    { src: "/mensuracao/rx-42.webp", legenda: "Ângulo de congruência", w: 1400, h: 768 },
  ],
  "jo-laurin": [
    { src: "/mensuracao/rx-43.webp", legenda: "Ângulo patelofemoral lateral (Laurin)", w: 1400, h: 768 },
  ],
  "jo-tagt": [
    { src: "/mensuracao/rx-44.webp", legenda: "Distância TA-GT", w: 1254, h: 1225 },
  ],
  "cc-powers": [
    { src: "/mensuracao/rx-45.webp", legenda: "Razão de Powers", w: 1195, h: 1600 },
  ],
  "cc-harris": [
    { src: "/mensuracao/rx-46.webp", legenda: "Regra dos 12 de Harris", w: 1195, h: 1600 },
    { src: "/mensuracao/rx-48.webp", legenda: "Método da linha X", w: 1195, h: 1600 },
  ],
  "cc-adi": [
    { src: "/mensuracao/rx-47.webp", legenda: "Intervalos atlanto-odontóide anterior e posterior", w: 1195, h: 1600 },
  ],
  "cc-sac": [
    { src: "/mensuracao/rx-47.webp", legenda: "Intervalos atlanto-odontóide anterior e posterior", w: 1195, h: 1600 },
  ],
  "cc-perfil": [
    { src: "/mensuracao/rx-49.webp", legenda: "Linhas de alinhamento cervical", w: 1195, h: 1600 },
  ],
  "cc-partes-moles": [
    { src: "/mensuracao/rx-49.webp", legenda: "Linhas de alinhamento cervical", w: 1195, h: 1600 },
  ],
  "cc-lordose": [
    { src: "/mensuracao/rx-49.webp", legenda: "Linhas de alinhamento cervical", w: 1195, h: 1600 },
  ],
  "cc-ladi": [
    { src: "/mensuracao/rx-50.webp", legenda: "Massas laterais do atlas", w: 1311, h: 1297 },
  ],
  "ct-espondilolistese": [
    { src: "/mensuracao/rx-51.webp", legenda: "Ângulo de escorregamento (Boxall)", w: 829, h: 1600 },
    { src: "/mensuracao/rx-52.webp", legenda: "Inclinação sacral", w: 829, h: 1600 },
  ],
  "ct-parametros-pelvicos": [
    { src: "/mensuracao/rx-53.webp", legenda: "Incidência pélvica", w: 730, h: 1486 },
  ],
  "pm-angulos-carpo": [
    { src: "/mensuracao/rx-55.webp", legenda: "Ângulo escafossemilunar", w: 1257, h: 1600 },
    { src: "/mensuracao/rx-56.webp", legenda: "Ângulo capitato-semilunar", w: 1210, h: 1600 },
  ],
  "pm-altura-carpo": [
    { src: "/mensuracao/rx-57.webp", legenda: "Altura do carpo", w: 1023, h: 1478 },
  ],
  "pm-gilula": [
    { src: "/mensuracao/rx-58.webp", legenda: "Arcos de Gilula", w: 1262, h: 1368 },
  ],
};
