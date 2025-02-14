import axios from "axios";
import { Benchmark } from "./SavarDadosNaAPI";

export interface pegaBenchmark extends Benchmark {
  id: number;
}

export async function PegaBenchmark(id: number) {
  const url = import.meta.env.VITE_URL_BASE;
  try {
    const response = await axios.get(`${url}benchmarks/${id}`, {
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
