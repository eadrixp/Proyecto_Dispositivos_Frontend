import React from "react";
import Swal from "sweetalert2";
import { deleteOrder } from "../Services/orderService";

interface EliminarPedidoProps {
  orderId: number | null;
  isOpen: boolean; // 👈 agregado
  onClose: () => void; // 👈 agregado
  onDeleted: () => Promise<void> | void; // 👈 ahora soporta async o sync
}

const EliminarPedido: React.FC<EliminarPedidoProps> = ({
  orderId,
  isOpen,
  onClose,
  onDeleted,
}) => {
  if (!isOpen || !orderId) return null; // 👈 si no está abierto, no renderiza nada

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción desactivará el pedido (borrado lógico).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteOrder(orderId);
        await Swal.fire("✅ Eliminado", "El pedido fue desactivado", "success");
        await onDeleted();
        onClose();
      } catch (err) {
        Swal.fire("❌ Error", "No se pudo eliminar el pedido", "error");
      }
    } else {
      onClose(); // si cancela, también cerramos
    }
  };

  // ejecutamos la acción directamente
  handleDelete();

  return null;
};

export default EliminarPedido;
