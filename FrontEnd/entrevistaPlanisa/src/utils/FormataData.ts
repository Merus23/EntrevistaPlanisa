export function FormataData(data: string): string {
  const dataFormatada = new Date(data);
  return dataFormatada.toLocaleDateString();
}
