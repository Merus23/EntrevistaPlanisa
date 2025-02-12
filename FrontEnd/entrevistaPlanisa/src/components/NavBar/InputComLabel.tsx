export interface InputComLabelInterface {
  titulo: string;
  placeHolder: string;
}

export default function InputComLabel({
  titulo,
  placeHolder,
}: InputComLabelInterface) {
  return (
    <div key={`id_${titulo}`} className="flex flex-col">
      <label htmlFor="aaa">{titulo}</label>
      <input
        type="text"
        id={`id_${titulo}`}
        className="border-2 rounded-lg p-2"
        placeholder={placeHolder}
      />
    </div>
  );
}
