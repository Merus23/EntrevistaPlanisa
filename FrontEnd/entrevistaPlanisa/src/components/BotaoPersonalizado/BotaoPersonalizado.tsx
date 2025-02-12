export interface ButaoPersonalizadoInterface {
  nome: string;
  aoClicar: () => void;
  desabilitar: boolean;
}

export default function BotaoPersonalizado({
  nome,
  aoClicar,
  desabilitar,
}: ButaoPersonalizadoInterface) {
  return (
    <button
      disabled={desabilitar}
      className={`${
        desabilitar
          ? "bg-gray-800 border-gray-800 cursor-not-allowed"
          : "border-[#12123A] bg-[#12123A] hover:cursor-pointer hover:font-bold"
      } border-2  rounded-lg p-2 text-white  `}
      onClick={aoClicar}
      id={`id_${nome.replace(/\s+/g, "")}`}
    >
      {nome}
    </button>
  );
}
