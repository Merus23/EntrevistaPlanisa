import { useEffect, useState } from "react";
import {
  pegaBenchmark,
  PegaTodosBenchmarks,
} from "../utils/PegaTodosBenchmarks";
import { FormataData } from "../utils/FormataData";
import Spinner from "../components/Spinner/Spinner";

type Props = {};

export default function Historico({}: Props) {
  const [benchmarks, setBenchmarks] = useState<pegaBenchmark[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBenchmarks() {
      setLoading(true);
      try {
        const benchmacks = await PegaTodosBenchmarks();
        if (benchmacks?.benchmacks) setBenchmarks(benchmacks.benchmacks);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    }

    fetchBenchmarks();
  }, []);

  return (
    <>
      <Spinner visivel={loading} />

      <div className="bg-[#FFFAFA] w-full h-dvh flex flex-col items-center justify-start">
        <main className="flex flex-col gap-4 pt-8">
          <header>
            <h1 className="text-2xl text-center">Histórico de Benchmack</h1>
          </header>

          <div className="w-screen overflow-auto">
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md md:my-4 mb-4 md:mb-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      País 1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      País 2
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo de Comparação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Início
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Término
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {benchmarks.map((benchmark, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50"
                      onClick={() => {}}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {benchmark.titulo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {benchmark.pais1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {benchmark.pais2}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {benchmark.tipoComparacao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {FormataData(benchmark.dataInicio)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {FormataData(benchmark.dataTermino)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
