import axios from "axios";
import { pegaBenchmark } from "./PegaTodosBenchmarks";

export async function AtualizaBenchmark(benchmark: pegaBenchmark) {
  const url = import.meta.env.VITE_URL_BASE;
  console.dir(benchmark);

  try {
    const response = await axios.put(`${url}benchmarks/`, benchmark, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      return { benchmark: response.data as pegaBenchmark };
    }

    return { benchmarks: [] };
  } catch (error: any) {
    console.error("Erro ao salvar benchmark:", error);
  }
}
