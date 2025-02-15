import { useEffect, useState } from "react";
import {
  pegaBenchmark,
  PegaTodosBenchmarks,
} from "../utils/Benchmark/PegaTodosBenchmarks";
import { FormataData } from "../utils/FormataData";
import Spinner from "../components/Spinner/Spinner";
import Modal from "../components/Modal/Modal";

import { PegaBenchmark } from "../utils/Benchmark/PegaBenchmark";
import { AtualizaBenchmark } from "../utils/Benchmark/AtualizaBenchmark";
import { DeletaBenchmark } from "../utils/Benchmark/DeletaBenchmark";

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

  const [termoPesquisa, setTermoPesquisa] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(10);
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensAtuais = benchmarks.slice(indicePrimeiroItem, indiceUltimoItem);

  const mudarPagina = (numeroPagina: number) => setPaginaAtual(numeroPagina);

  async function aoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (benchmacksModal) {
        const benchmarkAtualizado = await AtualizaBenchmark({
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

  async function aoDeletar(id: number) {
    try {
      await DeletaBenchmark(id);
    } catch (error: any) {
      alert("Erro ao deletar benchmark");
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
  async function fetchBenchmarks(pesquisa: boolean = false) {
    if (!pesquisa) setLoading(true);
    try {
      const benchmacks = await PegaTodosBenchmarks();
      if (benchmacks?.benchmacks) {
        setBenchmarks(benchmacks.benchmacks);
      }
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
  }, [benchmacksAtualizado, benchmacksModal]);

  useEffect(() => {
    if (termoPesquisa === "") {
      fetchBenchmarks(true);
    }

    const filteredBenchmarks = benchmarks.filter((benchmark) => {
      return (
        benchmark.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        benchmark.pais1.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        benchmark.pais2.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        benchmark.tipoComparacao
          .toLowerCase()
          .includes(termoPesquisa.toLowerCase())
      );
    });

    setBenchmarks(filteredBenchmarks);
  }, [termoPesquisa]);

  return (
    <>
      <Spinner visivel={loading} />
      {benchmacksModal && (
        <>
          <Modal
            titulo={`Edição do Benchmack`}
            aoFecharModal={() => setBenchmacksModal(undefined)}
            classesModal="h-11/13 md:w-4/12 sm:w-8/12 w-11/12"
          >
            <>
              <p className="text-sm pb-8">
                Dados como nomes de países, datas e quantidades de mortes/casos
                não podem ser modificadas.{" "}
              </p>
              <form className="flex flex-col gap-2 mb-2" onSubmit={aoSubmeter}>
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
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 font-bold text-white rounded-md w-12/12 text-center mx-auto cursor-pointer md:border-2 md:rounded-lg md:p-2 "
                  onClick={() => aoDeletar(benchmacksModal.id)}
                >
                  Deletar Benchmark
                </button>
                <button className="bg-[#12123A] hover:bg-gray-900 font-bold text-white rounded-md w-12/12 text-center mx-auto cursor-pointer md:border-2 md:rounded-lg md:p-2">
                  Atualizar
                </button>
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
          <input
            type="search"
            name=""
            id=""
            className="border-2 rounded-lg p-2 w-9/12 md:w-6/12 mx-auto"
            placeholder="Pesquise por título, país ou tipo de comparação"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />

          <div className="w-screen h-full overflow-auto">
            <div className="w-11/12 mx-auto overflow-x-auto rounded-lg border border-gray-200 shadow-md md:my-4 mb-4 md:mb-0">
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
                  {itensAtuais.map((benchmark, index) => (
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
            <div className="flex justify-center mt-4">
              <button
                onClick={() => mudarPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                className="cursor-pointer px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Anterior
              </button>
              {Array.from(
                { length: Math.ceil(benchmarks.length / itensPorPagina) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => mudarPagina(i + 1)}
                    className={`px-4 py-2 mx-1 text-sm font-medium ${
                      paginaAtual === i + 1
                        ? "text-white bg-[#12123A]"
                        : "text-gray-700 bg-white border border-gray-300"
                    } rounded-lg hover:bg-gray-600 cursor-pointer`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={() => mudarPagina(paginaAtual + 1)}
                disabled={
                  paginaAtual === Math.ceil(benchmarks.length / itensPorPagina)
                }
                className=" cursor-pointer px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
