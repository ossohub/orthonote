import type { Condicao, NotaPS } from "./types";

// Revisão diária do Pronto-Socorro (um capítulo por dia — ver docs/revisao-diaria).
// NOTAS_PS: id da condição → notas de comparação (concorda / diverge / acrescenta).
// NOVOS_PS: condições que as referências trazem e o site ainda não tinha.
// Sempre com palavras próprias; nunca copiar texto dos livros.
// Erros de dose ou conduta são corrigidos direto no arquivo da condição
// (adulto-1..4.ts ou pediatria.ts) e registrados no resumo da fila.

export const NOTAS_PS: Record<string, NotaPS[]> = {};

export const NOVOS_PS: Condicao[] = [];
