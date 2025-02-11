import { useState } from "react";

export interface navItem {
  label: string;
  href: string;
}

type Props = {
  logo: string;
  navItems: navItem[];
};

export default function NavBar({ logo, navItems }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`bg-[#12123A]  ${
        isOpen
          ? " flex flex-col justify-between py-4 px-8 items-center gap-8  h-screen "
          : " flex justify-between py-4 px-8 items-center gap-8"
      }`}
    >
      <a href="/">
        <img
          src={logo}
          alt="logo"
          className={`${isOpen ? "w-24 hidden" : "w-40 block"}`}
        />
      </a>

      <ul
        className={` md:flex flex-row gap-10 ${
          isOpen
            ? "flex-col space-y-5 w-full justify-center items-center"
            : "hidden "
        }`}
      >
        {navItems.map((item, index) => (
          <li
            className={` ${
              isOpen ? "border-y-2 p-6 w-full flex justify-center" : ""
            }`}
            key={index}
          >
            <a
              href={item.href}
              className={`inline-block text-white hover:text-gray-200 transform scale-100 transition-transform duration-700 hover:scale-110 text-xl ${
                isOpen ? "" : ""
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={handleMenu}
        className={` ${isOpen ? "block w-full" : "md:hidden"}`}
      >
        {isOpen ? (
          <p className="bg-red-500 font-bold text-white rounded-md w-12/12 text-center mx-auto">
            Fechar
          </p>
        ) : (
          <div className="flex flex-col gap-1 w-8">
            <div key={1} className="w-full bg-black h-1.5 rounded-md"></div>
            <div key={2} className="w-full bg-black h-1.5 rounded-md"></div>
            <div key={3} className="w-full bg-black h-1.5 rounded-md"></div>
          </div>
        )}
      </button>
    </nav>
  );
}
