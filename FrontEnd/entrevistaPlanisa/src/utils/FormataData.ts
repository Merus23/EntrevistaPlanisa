/**
 * @description Função que formata a data no formato dd/mm/aaaa
 * @param {string} data - Data a ser formatada
 * @returns {string} - Data formatada
 */
export function FormataData(data: string): string {
  const dataFormatada = new Date(data);
  return dataFormatada.toLocaleDateString();
}
