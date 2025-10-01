import { useState } from "react";
import { createUser } from "../Services/userService";
import AlertMessage from "../../../pages/UiElements/AlertMessage";

interface CrearUsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CrearUsuario: React.FC<CrearUsuarioModalProps> = ({
  isOpen,
  onClose,
  onUserCreated,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    role_id: 3, 
  });

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    title: string;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);

      // alerta de éxito
      setAlert({
        type: "success",
        title: "Usuario creado",
        message: "El usuario ha sido creado exitosamente ",
      });

      // refresca tabla
      onUserCreated();

      // cerrar modal después de 1 segundo
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 1000);
    } catch (error: any) {
      console.error("Error al crear usuario:", error.response?.data || error);

      // alerta de error
      setAlert({
        type: "error",
        title: "Error",
        message:
          error.response?.data?.message ||
          "Verificar todos los campos ",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>

        {/* Alerta */}
        {alert && (
          <div className="mb-4">
            <AlertMessage
              type={alert.type}
              title={alert.title}
              message={alert.message}
            />
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="full_name"
            placeholder="Nombre completo"
            className="w-full p-2 border rounded"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          <select
            name="role_id"
            className="w-full p-2 border rounded"
            value={formData.role_id}
            onChange={handleChange}
          >
            <option value={1}>Admin</option>
            <option value={2}>Moderador</option>
            <option value={3}>Usuario</option>
          </select>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90"
          >
            Guardar
          </button>
        </form>

        {/* Botón Cancelar */}
        <button
          onClick={onClose}
          className="mt-3 w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CrearUsuario;
