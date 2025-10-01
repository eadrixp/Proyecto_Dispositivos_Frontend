import { useState } from "react";
import { deleteUser } from "../Services/userService";
import AlertMessage from "../../../pages/UiElements/AlertMessage";

interface EliminarUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onDeleted: () => void;
}

const EliminarUsuario: React.FC<EliminarUsuarioProps> = ({ isOpen, onClose, user, onDeleted }) => {
  const [alert, setAlert] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      setAlert({
        type: "success",
        title: "Usuario desactivado",
        message: `El usuario ${user.full_name} fue desactivado exitosamente.`,
      });
      onDeleted();
      setTimeout(() => {
        onClose();
        setAlert(null);
      }, 2000);
    } catch (err: any) {
      setAlert({
        type: "error",
        title: "Error al desactivar",
        message: err.response?.data?.message || "Hubo un error al desactivar el usuario.",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        {alert && <AlertMessage type={alert.type} title={alert.title} message={alert.message} />}
        <h2 className="text-lg font-bold mb-4">Desactivar Usuario</h2>
        <p>¿Seguro que deseas desactivar a <b>{user.full_name}</b>?</p>
        <div className="flex gap-3 mt-4">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Sí, desactivar
          </button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarUsuario;
