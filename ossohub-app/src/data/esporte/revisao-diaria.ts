import type { Nota, Topico } from "./types";

// Revisão diária da Medicina Esportiva (um capítulo por dia — ver docs/revisao-diaria).
// NOTAS_DIARIA: id do tópico → notas de comparação (concorda / diverge / acrescenta).
// NOVOS_DIARIA: tópicos que o capítulo traz e o site ainda não tinha.
// Sempre com palavras próprias; nunca copiar texto dos livros.
// Erros de conteúdo são corrigidos direto no arquivo da área (lesoes.ts etc.)
// e registrados no resumo da fila.

export const NOTAS_DIARIA: Record<string, Nota[]> = {};

export const NOVOS_DIARIA: Topico[] = [];
