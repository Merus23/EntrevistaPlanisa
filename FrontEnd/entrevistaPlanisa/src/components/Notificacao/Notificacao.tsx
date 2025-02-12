import { useEffect, useState } from "react";

export type NotificacaoProps = {
  status: boolean;
  menssagem: string;
  id: number;
};

/**
 * @description Componente de notificacão
 * @param {boolean} status - Status da notificação (verdadeiro para sucesso, falso para error)
 * @param {string} message - Message to be displayed
 * @param {number} id - Popup id
 */
export default function Notificacao({
  status,
  menssagem,
  id,
}: NotificacaoProps) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if ((status || !status) && menssagem) {
      setVisivel(true);

      const timer = setTimeout(() => {
        setVisivel(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, menssagem, id]);

  if (!visivel) return null;

  return (
    <>
      <div
        className={`fixed top-2 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg text-white w-11/12 max-w-sm md:max-w-md z-50 ${
          status ? "bg-green-500" : "bg-red-500"
        }`}
        key={id}
        style={{ margin: "0 auto" }}
      >
        <button
          onClick={() => setVisivel(false)}
          className="absolute top-2 right-2 text-white"
        >
          &times;
        </button>
        <p>{menssagem}</p>
      </div>
    </>
  );
}
