import AlertMessage from "../../../pages/UiElements/AlertMessage";

interface EliminarProductoModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const EliminarProducto: React.FC<EliminarProductoModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Eliminar Producto</h2>
        <p className="mb-4">
          ¿Estás seguro de que deseas desactivar el producto{" "}
          <strong>{product.name}</strong>?
        </p>

        <div className="flex gap-3">
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            onClick={onConfirmDelete}
          >
            Sí, eliminar
          </button>
          <button
            className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarProducto;
