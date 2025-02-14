import axios from "axios";

export async function DeletaBenchmark(id: number) {
  const url = import.meta.env.VITE_URL_BASE;
  try {
    const response = await axios.delete(`${url}benchmarks/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      console.log("response", response);
      return { deletado: true };
    }

    return { deletado: false };
  } catch (error: any) {
    console.error("Erro ao salvar benchmark:", error);
  }
}
