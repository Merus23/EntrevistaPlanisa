import axios from "axios";

export interface Benchmark {
  titulo: string;
  pais1: string;
  quantidadePessoasPais1: number;
  pais2: string;
  quantidadePessoasPais2: number;
  tipoComparacao: string;
  dataInicio: string;
  dataTermino: string;
}
/**
 * @description Salva um novo benchmark no banco de dados através da API.
 * @param benchmark Um objeto `Benchmark` contendo os dados a serem salvos.
 * @returns Uma Promise que resolve para o objeto `Benchmark` retornado pela API após o salvamento,
 *          ou `undefined` se ocorrer um erro durante o processo.
 * @throws Se a requisição à API falhar, um erro será lançado.  (Nota: atualmente, o erro é apenas logado no console, seria melhor relançá-lo para tratamento no componente)
 */
export async function SalvarBenchmark(benchmark: Benchmark) {
  const url = import.meta.env.VITE_URL_BASE;
  try {
    const response = await axios.post(`${url}benchmarks/`, benchmark, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao salvar benchmark:", error);
  }
}
