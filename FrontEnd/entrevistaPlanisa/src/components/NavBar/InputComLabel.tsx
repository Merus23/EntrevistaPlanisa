export interface InputComLabelInterface {
  titulo: string;
  placeHolder: string;
}

export default function InputComLabel({
  titulo,
  placeHolder,
}: InputComLabelInterface) {
  return (
    <div
      key={`id_${titulo.replace(/\s+/g, "")}`}
      className="flex flex-col w-full"
    >
      <label htmlFor={`id_${titulo.replace(/\s+/g, "")}`}>{titulo}</label>
      <input
        type="text"
        id={`id_${titulo.replace(/\s+/g, "")}`}
        className="border-2 rounded-lg p-2"
        placeholder={placeHolder}
      />
    </div>
  );
}
