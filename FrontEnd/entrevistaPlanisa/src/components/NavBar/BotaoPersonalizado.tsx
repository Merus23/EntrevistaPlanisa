export interface ButaoPersonalizadoInterface {
  nome: string;
  aoClicar: () => void;
}

export default function BotaoPersonalizado({
  nome,
  aoClicar,
}: ButaoPersonalizadoInterface) {
  return (
    <button
      className="border-2 rounded-lg p-2 bg-[#12123A] text-white hover:font-bold hover:cursor-pointer"
      onClick={aoClicar}
      id={`id_${nome.replace(/\s+/g, "")}`}
    >
      {nome}
    </button>
  );
}
