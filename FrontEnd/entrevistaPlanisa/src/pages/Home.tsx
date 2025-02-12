import { useState } from "react";
import BotaoPersonalizado from "../components/BotaoPersonalizado/BotaoPersonalizado";
import InputComLabel, {
  InputComLabelInterface,
} from "../components/InputComLabel/InputComLabel";

type Props = {};

export default function Home({}: Props) {
  const inputs: InputComLabelInterface[] = [
    { titulo: "Título", placeHolder: "Comparação entre Brasil e Argentina" },
    { titulo: "País 1", placeHolder: "Brasil" },
    { titulo: "País 2", placeHolder: "Argentina" },
  ];

  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [_, setError] = useState("");

  const validateDates = () => {
    if (dataInicio && dataTermino) {
      const inicio = new Date(dataInicio);
      const termino = new Date(dataTermino);

      if (inicio > termino) {
        setError("A data de início não pode ser maior que a data de término.");
      } else {
        setError("");
      }
    }
  };

  return (
    <div className="bg-[#FFFAFA] w-full h-dvh flex flex-col items-center justify-center">
      <main className="flex flex-col gap-4 ">
        <header>
          <h1 className="text-2xl">Benchmack</h1>
          <p className="text-sm">
            Comparação de casos de covid 2019 entre dois países
          </p>
        </header>
        <form className="flex flex-col gap-2">
          {inputs.map((input, index) => {
            return (
              <InputComLabel
                key={index}
                titulo={input.titulo}
                placeHolder={input.placeHolder}
              />
            );
          })}

          <div className="flex flex-col">
            <label htmlFor="data_inicio">Data de início</label>
            <input
              type="date"
              name=""
              id="data_inicio"
              value={dataInicio}
              onChange={(e) => {
                setDataInicio(e.target.value);
                validateDates();
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
                validateDates();
              }}
              className="border-2 p-2 rounded-lg"
            />
          </div>

          <BotaoPersonalizado nome="Pesquisar" aoClicar={() => {}} />
        </form>
      </main>
    </div>
  );
}
