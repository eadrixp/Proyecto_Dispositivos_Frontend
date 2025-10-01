import React, { useState } from "react";
import Swal from "sweetalert2";
import { updateOrderStatus } from "../Services/orderService";

interface ActualizarPedidoProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number | null;
  onUpdated: () => void;
}

const ActualizarPedido: React.FC<ActualizarPedidoProps> = ({
  isOpen,
  onClose,
  orderId,
  onUpdated,
}) => {
  const [statusId, setStatusId] = useState<number>(0);

  if (!isOpen || !orderId) return null;

  const handleUpdate = async () => {
    try {
      await updateOrderStatus(orderId, statusId);
      Swal.fire("✅ Éxito", "El estado del pedido fue actualizado", "success");
      onUpdated();
      onClose();
    } catch (err) {
      Swal.fire("❌ Error", "No se pudo actualizar el pedido", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Actualizar Pedido</h2>

        <label className="block mb-2">Nuevo Estado:</label>
        <select
          className="border rounded-md w-full p-2 mb-4"
          value={statusId}
          onChange={(e) => setStatusId(Number(e.target.value))}
        >
          <option value={0}>Seleccionar estado</option>
          <option value={1}>Pendiente</option>
          <option value={2}>En proceso</option>
          <option value={3}>Entregado</option>
          <option value={4}>Cancelado</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-400 px-4 py-2 rounded-md text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 px-4 py-2 rounded-md text-white"
            onClick={handleUpdate}
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPedido;
