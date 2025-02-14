import { useEffect, useState } from "react";
import {
  pegaBenchmark,
  PegaTodosBenchmarks,
} from "../utils/Benchmark/PegaTodosBenchmarks";
import { FormataData } from "../utils/FormataData";
import Spinner from "../components/Spinner/Spinner";
import Modal from "../components/Modal/Modal";
import BotaoPersonalizado from "../components/BotaoPersonalizado/BotaoPersonalizado";
import { PegaBenchmark } from "../utils/Benchmark/PegaBenchmark";
import { AtualizarBenchmark } from "../utils/Benchmark/AtualizarBenchmark";

type Props = {};

export default function Historico({}: Props) {
  const [titulo, setTitulo] = useState("");
  const [pais1, setPais1] = useState("");
  const [quantidadePessoasPais1, setQuantidadePessoasPais1] = useState(0);
  const [pais2, setPais2] = useState("");
  const [quantidadePessoasPais2, setQuantidadePessoasPais2] = useState(0);
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [tipoComparacao, setTipoComparacao] = useState("");

  const [benchmarks, setBenchmarks] = useState<pegaBenchmark[]>([]);
  const [benchmacksModal, setBenchmacksModal] = useState<pegaBenchmark>();
  const [benchmacksAtualizado, setBenchmacksAtualizado] =
    useState<pegaBenchmark>();
  const [loading, setLoading] = useState<boolean>(false);

  async function aoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (benchmacksModal) {
        const benchmarkAtualizado = await AtualizarBenchmark({
          ...benchmacksModal,
          titulo,
        });

        if (benchmarkAtualizado) {
          setBenchmacksAtualizado(benchmacksModal);
        }
      }
    } catch (error: any) {
    } finally {
      setBenchmacksModal(undefined);
    }
  }

  async function aoClicarNaLinha(benchmark: pegaBenchmark) {
    setBenchmacksModal(benchmark);
    const benchmackResposta = await PegaBenchmark(benchmark.id);

    setTitulo(benchmackResposta?.benchmark?.titulo || "");
    setPais1(benchmackResposta?.benchmark?.pais1 || "");
    setQuantidadePessoasPais1(
      benchmackResposta?.benchmark?.quantidadePessoasPais1 || 0
    );
    setPais2(benchmackResposta?.benchmark?.pais2 || "");
    setQuantidadePessoasPais2(
      benchmackResposta?.benchmark?.quantidadePessoasPais1 || 0
    );
    setTipoComparacao(benchmackResposta?.benchmark?.tipoComparacao || "");
    setDataInicio(benchmackResposta?.benchmark?.dataInicio || "");
    setDataTermino(benchmackResposta?.benchmark?.dataTermino || "");
  }
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

  useEffect(() => {
    fetchBenchmarks();
  }, []);

  useEffect(() => {
    fetchBenchmarks();
  }, [benchmacksAtualizado]);

  return (
    <>
      <Spinner visivel={loading} />
      {benchmacksModal && (
        <>
          <Modal
            titulo={`Edição do Benchmack`}
            aoFecharModal={() => setBenchmacksModal(undefined)}
            classesModal="h-4/5 md:w-4/12 sm:w-8/12 w-11/12"
          >
            <>
              <p className="text-sm pb-8">
                Dados como nomes de países, datas e quantidades de mortes/casos
                não podem ser modificadas.{" "}
              </p>
              <form className="flex flex-col gap-2" onSubmit={aoSubmeter}>
                <div className="flex flex-col w-full">
                  <label htmlFor={`id_titulo`}>Título</label>
                  <input
                    type="text"
                    id={`id_titulo`}
                    className="border-2 rounded-lg p-2"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor={`id_pais_1`}>País 1</label>
                  <input
                    type="text"
                    id={`id_pais_1`}
                    className="border-2 rounded-lg p-2 bg-gray-300/50 cursor-not-allowed"
                    value={pais1}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor={`qntPessoasPais1`}>
                    {benchmacksModal.tipoComparacao === "deaths"
                      ? "Mortes"
                      : "Casos"}
                  </label>
                  <input
                    type="text"
                    id={`qntPessoasPais1`}
                    className="border-2 rounded-lg p-2 bg-gray-300/50 cursor-not-allowed"
                    value={quantidadePessoasPais1.toString()}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor={`id_pais_2`}>País 2</label>
                  <input
                    type="text"
                    id={`id_pais_2`}
                    className="border-2 rounded-lg p-2 bg-gray-300/50 cursor-not-allowed"
                    value={pais2}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor={`qntPessoasPais2`}>
                    {benchmacksModal.tipoComparacao === "deaths"
                      ? "Mortes"
                      : "Casos"}
                  </label>
                  <input
                    type="text"
                    id={`qntPessoasPais2`}
                    className="border-2 rounded-lg p-2 bg-gray-300/50 cursor-not-allowed"
                    value={quantidadePessoasPais2.toString()}
                    disabled={true}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor={`tipo`}>Tipo de comparação</label>
                  <select
                    disabled={true}
                    id="tipo"
                    className="border-2 rounded-lg p-2 bg-gray-300/50 cursor-not-allowed"
                    value={tipoComparacao || ""}
                  >
                    <option value="" disabled>
                      Comparação por mortes ou por casos
                    </option>
                    <option value="deaths">Por mortes</option>
                    <option value="cases">Por casos</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="data_inicio">Data de início</label>
                  <input
                    type="date"
                    name=""
                    id="data_inicio"
                    disabled={true}
                    value={dataInicio}
                    className="border-2 p-2 rounded-lg  bg-gray-300/50 cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="data_termino">Data de término</label>
                  <input
                    type="date"
                    name=""
                    id="data_termino"
                    disabled={true}
                    value={dataTermino}
                    className="border-2 p-2 rounded-lg bg-gray-300/50 cursor-not-allowed"
                  />
                </div>

                <BotaoPersonalizado
                  desabilitar={loading}
                  nome="Atualizar"
                  aoClicar={() => {}}
                />
              </form>
            </>
          </Modal>
        </>
      )}
      <div className="bg-[#FFFAFA] w-full p-4 md:p-0 h-dvh flex flex-col items-center justify-start">
        <main className="flex flex-col gap-4 pt-8">
          <header>
            <h1 className="text-2xl text-center">Histórico de Benchmack</h1>
          </header>

          <div className="w-screen md:w-fit overflow-auto">
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
                      Mortes/casos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      País 2
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mortes/casos
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
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        aoClicarNaLinha(benchmark);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {benchmark.titulo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {benchmark.pais1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {benchmark.quantidadePessoasPais1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {benchmark.pais2}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {benchmark.quantidadePessoasPais2}
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
