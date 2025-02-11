import { BrowserRouter, Route, Routes } from "react-router";
import NavBar, { navItem } from "./components/NavBar/NavBar";

function App() {
  const logo =
    "https://planisa.com.br/site/wp-content/uploads/2021/10/LogoColors.svg";
  const navItems: navItem[] = [
    { label: "Home", href: "/" },
    { label: "Histórico", href: "/historico" },
  ];

  return (
    <BrowserRouter>
      <NavBar logo={logo} navItems={navItems} />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
