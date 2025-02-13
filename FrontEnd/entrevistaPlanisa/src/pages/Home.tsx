import { useState } from "react";
import BotaoPersonalizado from "../components/BotaoPersonalizado/BotaoPersonalizado";

import { PegaCovidDados } from "../utils/PegaCovidDados";
import Modal from "../components/Modal/Modal";
import Notificacao, {
  NotificacaoProps,
} from "../components/Notificacao/Notificacao";
import { SalvarBenchmark } from "../utils/SavarDadosNaAPI";
import Spinner from "../components/Spinner/Spinner";

type Props = {};

export default function Home({}: Props) {
  const [titulo, setTitulo] = useState("");
  const [pais1, setPais1] = useState("");
  const [pais2, setPais2] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [tipoComparacao, setTipoComparacao] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [notificacao, setNotificacao] = useState<NotificacaoProps>();
  const [dadosDosPaises, setDadosDosPaises] = useState<{
    pais1: number;
    pais2: number;
  }>();
  const [abrirModal, setAbrirModal] = useState<boolean>(false);

  async function aoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const inicio = new Date(dataInicio);
    const termino = new Date(dataTermino);

    if (!(inicio <= termino)) {
      setNotificacao({
        id: Math.floor(Math.random()),
        mensagem: "A data de início não pode ser maior que a data de término.",
        status: false,
      });
      return;
    }

    try {
      const { total: dadosPais1 } = await PegaCovidDados(
        pais1,
        tipoComparacao,
        dataTermino
      );
      const { total: dadosPais2 } = await PegaCovidDados(
        pais2,
        tipoComparacao,
        dataTermino
      );

      if (dadosPais1 && dadosPais2) {
        setDadosDosPaises({ pais1: dadosPais1, pais2: dadosPais2 });
        setAbrirModal(true);
        SalvarBenchmark({
          dataInicio: dataInicio,
          dataTermino: dataTermino,
          pais1: pais1,
          pais2: pais2,
          tipoComparacao: tipoComparacao,
          titulo: titulo,
        });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    setAbrirModal(true);
  }

  return (
    <>
      {notificacao && (
        <Notificacao
          id={notificacao.id}
          mensagem={notificacao.mensagem}
          status={notificacao.status}
        />
      )}
      <Spinner visivel={loading} />

      <div className="bg-[#FFFAFA] w-full h-dvh flex flex-col items-center justify-center">
        <main className="flex flex-col gap-4 ">
          <header>
            <h1 className="text-2xl">Benchmack</h1>
            <p className="text-sm">
              Comparação de casos de covid 2019 entre dois países
            </p>
          </header>

          <form className="flex flex-col gap-2" onSubmit={aoSubmeter}>
            <div className="flex flex-col w-full">
              <label htmlFor={`id_titulo`}>Título</label>
              <input
                type="text"
                id={`id_titulo`}
                className="border-2 rounded-lg p-2"
                placeholder={`Comparação entre Brasil e Argentina`}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor={`id_pais_1`}>País 1</label>
              <input
                type="text"
                id={`id_pais_1`}
                className="border-2 rounded-lg p-2"
                placeholder={`Brazil (em inglês)`}
                value={pais1}
                onChange={(e) => setPais1(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor={`id_pais_2`}>País 2</label>
              <input
                type="text"
                id={`id_pais_2`}
                className="border-2 rounded-lg p-2"
                placeholder={`Argentina (em inglês)`}
                value={pais2}
                onChange={(e) => setPais2(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor={`tipo`}>Tipo de comparação</label>
              <select
                id="tipo"
                className="border-2 rounded-lg p-2"
                value={tipoComparacao || ""}
                onChange={(e) => setTipoComparacao(e.target.value)}
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
                value={dataInicio}
                onChange={(e) => {
                  setDataInicio(e.target.value);
                }}
                className="border-2 p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="data_termino">Data de término</label>
              <input
                type="date"
                name=""
                id="data_termino"
                value={dataTermino}
                onChange={(e) => {
                  setDataTermino(e.target.value);
                }}
                className="border-2 p-2 rounded-lg"
              />
            </div>

            <BotaoPersonalizado
              desabilitar={loading}
              nome="Comparar"
              aoClicar={() => {}}
            />
          </form>
        </main>
      </div>

      {abrirModal && (
        <Modal
          aoFecharModal={() => {
            setAbrirModal(false);
            setDadosDosPaises({ pais1: 0, pais2: 0 });
          }}
          titulo={titulo}
        >
          <>
            <div className="">
              <p className="text-sm">
                Você também pode acessar o histórico de benchmacks clicando{" "}
                <a
                  className="text-blue-600 underline cursor-pointer"
                  href="/historico"
                >
                  aqui
                </a>
              </p>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md md:my-4 mb-4 md:mb-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comparação por
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Brasil
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Argentina
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tipoComparacao === "deaths" ? "Mortes" : "Casos"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dadosDosPaises?.pais1 === 0
                          ? "0"
                          : dadosDosPaises?.pais1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dadosDosPaises?.pais2 === 0
                          ? "0"
                          : dadosDosPaises?.pais2}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        </Modal>
      )}
    </>
  );
}
