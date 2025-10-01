import { useState } from "react";
import { updateUser } from "../Services/userService";

interface ActualizarUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onUpdated: () => void;
}

const ActualizarUsuario: React.FC<ActualizarUsuarioProps> = ({
  isOpen,
  onClose,
  user,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    role_id: user.role_id || 3,
    is_active: user.is_active,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(user.id, formData);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">Actualizar Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="full_name"
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

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            Activo
          </label>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600"
          >
            Guardar cambios
          </button>
        </form>
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

export default ActualizarUsuario;
