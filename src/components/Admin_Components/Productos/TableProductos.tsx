import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../Services/productService";
import ActualizarProductoModal from "../Productos/ActualizarProducto";
import EliminarProductoModal from "../Productos/EliminarProducto";
import AlertMessage from "../../../pages/UiElements/AlertMessage";

const TableProductos: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    title: string;
    message: string;
  } | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setAlert({
        type: "error",
        title: "Error",
        message: "No se pudieron cargar los productos.",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setAlert({
        type: "success",
        title: "Producto eliminado",
        message: "El producto ha sido desactivado correctamente.",
      });
      fetchProducts();
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      setAlert({
        type: "error",
        title: "Error",
        message:
          err.response?.data?.message || "Hubo un error al eliminar el producto.",
      });
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {alert && (
        <div className="p-4">
          <AlertMessage
            type={alert.type}
            title={alert.title}
            message={alert.message}
          />
        </div>
      )}

      <div className="py-6 px-4">
        <h4 className="text-xl font-semibold text-black">Productos</h4>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Código</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.code}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => {
                    setSelectedProduct(p);
                    setIsUpdateModalOpen(true);
                  }}
                >
                  Actualizar
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    setSelectedProduct(p);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modales */}
      {isUpdateModalOpen && selectedProduct && (
        <ActualizarProductoModal
          product={selectedProduct}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onProductUpdated={fetchProducts}
        />
      )}

      {isDeleteModalOpen && selectedProduct && (
        <EliminarProductoModal
          product={selectedProduct}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={() => handleDelete(selectedProduct.id)}
        />
      )}
        
    </div>
  );
};

export default TableProductos;
