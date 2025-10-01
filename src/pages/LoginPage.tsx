import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.data.accessToken;

      login(token); // Guarda token en contexto y localStorage
      console.log("Token JWT generado:", token); // <-- Aquí lo mostramos en consola

      alert("Login exitoso ✅");
      navigate("/dashboard-clientes"); // Redirige a la ruta deseada
    } catch (err) {
      alert("Credenciales incorrectas ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 mb-3 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
