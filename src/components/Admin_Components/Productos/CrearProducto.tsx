import { useState } from "react";
import { createProduct } from "../Services/productService";
import AlertMessage from "../../../pages/UiElements/AlertMessage";

interface CrearProductoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
}

const CrearProducto: React.FC<CrearProductoModalProps> = ({
  isOpen,
  onClose,
  onProductCreated,
}) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    title: string;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      setAlert({
        type: "success",
        title: "Producto creado",
        message: "El producto ha sido creado exitosamente.",
      });
      onProductCreated();
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 1000);
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Error",
        message: error.response?.data?.message || "Hubo un error al crear el producto.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Crear Producto</h2>

        {alert && (
          <div className="mb-4">
            <AlertMessage
              type={alert.type}
              title={alert.title}
              message={alert.message}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="code"
            placeholder="Código"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min={0}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={0}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90"
          >
            Guardar
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

export default CrearProducto;
