import { Bar, Pie } from "react-chartjs-2";
import Layout from "../components/Layout";
import Assistant from "../components/Assistant"; // Importa el componente Assistant
import { FaTachometerAlt } from "react-icons/fa"; // Importa un ícono
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const GeneralDashboard = () => {
  // Datos simulados para los gráficos
  const barData = {
    labels: ["Siniestros Atendidos", "Siniestros Pendientes"],
    datasets: [
      {
        label: "Cantidad",
        data: [120, 30],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: ["#388E3C", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Vehículos Reparados", "En Espera"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#03A9F4", "#FFC107"],
        borderColor: ["#0288D1", "#FFA000"],
        borderWidth: 1,
      },
    ],
  };

  // Los tres mensajes
  const messages = [
    "¡Hola! Bienvenido al Panel General.",
    "Estamos felices de que nos hayas escogido <3",
    "Recuerda que siempre estaremos para ti "
  ];

  // Los tiempos en milisegundos para cada mensaje
  const delays = [2000, 3000, 4000]; // 2, 3, y 4 segundos
  const finalDelay = 5000; // El mensaje desaparecerá después de 5 segundos

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-6">
        {/* Panel General con fondo negro y texto blanco */}
        <div className="bg-black p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-5xl font-bold text-center text-white mb-6">
            <FaTachometerAlt className="inline-block mr-2 text-yellow-400" />
            Panel General
          </h1>
          <p className="text-lg text-gray-300 text-center mb-8">
            Accede a información relevante y mantente actualizado con las funciones básicas del sistema.
          </p>
        </div>

        {/* Sección de gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
              Estado de Siniestros
            </h2>
            <Bar data={barData} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
              Estado de Vehículos
            </h2>
            <Pie data={pieData} />
          </div>
        </div>


        {/* Integración del Asistente con tres mensajes y tiempos personalizados */}
        <Assistant 
          messages={messages} 
          delays={delays} 
          finalDelay={finalDelay} 
        />
      </div>
    </Layout>
  );
};

export default GeneralDashboard;
