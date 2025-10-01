import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  useAuth  from "../auth/useAuth";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 👇 Intentamos loguear
      await login(email, password);

      // ✅ Si es correcto, redirige a dashboard-clientes
      navigate("/dashboard-clientes");
    } catch (err) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Iniciar Sesión</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Ingresar
      </button>
    </form>
  );
};

export default LoginForm;
