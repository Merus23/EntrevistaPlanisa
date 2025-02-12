import axios from "axios";

/**
 * @description Função para buscar dados da COVID-19 para um país específico
 * @param {string} country - Nome do país (em inglês)
 * @param {string} type - Tipo do dado (deaths ou cases)
 * @param {string} data - Data em formato de string (e.x.: 2025-02-04)
 * @returns {Promise<{ total: number; error: any }>} - Retorna o tatol de caso ou de mortes, em caso de erro, returno o erro
 */
export async function pegaCovidDados(
  country: string,
  type: string,
  data: string
) {
  const urlBase = import.meta.env.VITE_DADOS_COVID_URL_API;
  const chave = import.meta.env.VITE_CHAVE_DADOS_COVID_API;

  try {
    const url = `${urlBase}?&country=${country}&type=${type} `;

    const response = await axios.get(url, {
      headers: {
        "x-api-key": chave,
      },
    });

    let totalMortesOuCasos = 0;

    if (type === "cases") {
      totalMortesOuCasos = response.data[0].cases[data].total;
    }

    if (type === "deaths") {
      totalMortesOuCasos = response.data[0].deaths[data].total;
    }

    console.log("Total de mortes", totalMortesOuCasos);

    return { total: totalMortesOuCasos, error: null };
  } catch (err: any) {
    return { dados: null, error: err };
  }
}
