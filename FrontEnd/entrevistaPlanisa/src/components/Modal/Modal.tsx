import React, { useEffect } from "react";

export type ModalProps = {
  classesModal?: string;
  children: React.ReactNode;
  titulo: string;
  aoFecharModal: () => void;
};

export default function Modal({
  children,
  titulo,
  aoFecharModal,
  classesModal = "h-/5 w-11/12",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") aoFecharModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aoFecharModal]);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#12123A]/15 bg-opacity-50 flex justify-center items-center z-50"
        onClick={aoFecharModal}
      >
        <div
          className={`${classesModal} bg-white p-3 rounded-lg shadow-lg overflow-hidden relative`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={aoFecharModal}
            className="hover:cursor-pointer absolute top-1 right-2 rounded-full text-red-600 border-red-600 border-2 hidden md:block "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
          <h1 className="w-full text-center md:w-auto md:text-left text-4xl">
            {titulo}
          </h1>
          {children}
          <button
            onClick={aoFecharModal}
            className="hover:cursor-pointer mx-auto bg-red-500 text-white w-full rounded-md font-bold block md:hidden"
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  );
}
