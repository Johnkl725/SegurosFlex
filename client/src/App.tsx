import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistroSiniestro from "./components/RegistroSiniestro";

function App() {
  return (
    <Router>
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-siniestro" element={<RegistroSiniestro />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const goToRegistroSiniestro = () => {
    navigate("/registro-siniestro");
  };

  return (
    <div>
      {/* Cabecera con logotipos */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Botón para ir a registro de siniestros */}
      <div className="text-center mt-6">
        <button
          onClick={goToRegistroSiniestro}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold"
        >
          Ir a Registrar Siniestro
        </button>
      </div>
    </div>
  );
}

export default App;
