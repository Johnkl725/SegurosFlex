import React, { useState } from "react";
import axios from "axios";

const RegistroSiniestro = () => {
  const [form, setForm] = useState({
    tipoSiniestro: "",
    fechaSiniestro: "",
    departamento: "",
    distrito: "",
    provincia: "",
    ubicacion: "",
    descripcion: "",
    documentos: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/siniestros", form);
      alert("Siniestro registrado con éxito: " + response.data.siniestroId);
    } catch (error) {
      console.error("Error al registrar el siniestro:", error);
      alert("Ocurrió un error al registrar el siniestro");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-red-50 to-red-100 border-4 border-red-600 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-red-700 text-center mb-8 tracking-wide uppercase">
        Registrar Siniestro
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="tipoSiniestro"
            placeholder="Tipo de Siniestro"
            value={form.tipoSiniestro}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-red-400 rounded-lg focus:ring focus:ring-red-300 focus:outline-none shadow-sm transition duration-300"
            required
          />
          <input
            type="date"
            name="fechaSiniestro"
            value={form.fechaSiniestro}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-red-400 rounded-lg focus:ring focus:ring-red-300 focus:outline-none shadow-sm transition duration-300"
            required
          />
          <input
            type="text"
            name="departamento"
            placeholder="Departamento"
            value={form.departamento}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-red-400 rounded-lg focus:ring focus:ring-red-300 focus:outline-none shadow-sm transition duration-300"
            required
          />
          <input
            type="text"
            name="distrito"
            placeholder="Distrito"
            value={form.distrito}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-red-400 rounded-lg focus:ring focus:ring-red-300 focus:outline-none shadow-sm transition duration-300"
            required
          />
          <input
            type="text"
            name="provincia"
            placeholder="Provincia"
            value={form.provincia}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-red-400 rounded-lg focus:ring focus:ring-red-300 focus:outline-none shadow-sm transition duration-300"
            required
          />
          <input
            type="text"
            name="ubicacion"
            placeholder="Ubicación"
            value={form.ubicacion}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-red-400 rounded-lg focus:ring focus:ring-red-300 focus:outline-none shadow-sm transition duration-300"
            required
          />
        </div>
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-red-400 rounded-lg focus:ring focus:ring-red-300 focus:outline-none shadow-sm transition duration-300"
          required
        ></textarea>
      <button
  type="submit"
  className="w-full bg-red-500 text-red-700 font-bold px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white focus:ring focus:ring-red-300 shadow-md transition duration-300"
>
          Registrar Siniestro
        </button>
      </form>
    </div>
  );
};

export default RegistroSiniestro;
