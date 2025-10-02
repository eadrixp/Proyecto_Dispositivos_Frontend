import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../Services/orderService';
import ActualizarPedido from './ActualizarPedido';
import EliminarPedido from './EliminarPedido';
import VerPedido from './VerPedido';

const TablePedidos: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<{
    id?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }>({});


  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(page, limit, filters);
      setOrders(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error('Error al obtener pedidos:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, filters]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-md p-4 dark:border-strokedark dark:bg-boxdark">
      <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
        Pedidos
      </h2>

      {/*  Filtros */}
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        {/* Buscar por ID */}
        <input
          type="number"
          placeholder="Buscar por ID"
          className="p-2 border rounded"
          onChange={(e) =>
            setFilters({ ...filters, id: Number(e.target.value) || undefined })
          }
        />

        {/* Estado */}
        <select
          className="p-2 border rounded"
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value || undefined,
            })
          }
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="processing">En proceso</option>
          <option value="delivered">Entregado</option>
          <option value="canceled">Cancelado</option>
        </select>

        {/* Fecha inicio */}
        <div>
          <label className="block text-sm mb-1">Fecha inicio</label>
          <input
            type="date"
            className="p-2 border rounded"
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value || undefined })
            }
          />
        </div>

        {/* Fecha fin */}
        <div>
          <label className="block text-sm mb-1">Fecha fin</label>
          <input
            type="date"
            className="p-2 border rounded"
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value || undefined })
            }
          />
        </div>

        {/* Límite por página */}
        <select
          className="p-2 border rounded"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>
      </div>

      {/*  Tabla */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Número Pedido</th>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Usuario</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Dirección</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o.id}>
                <td className="border p-2">{o.id}</td>
                <td className="border p-2">{o.order_number}</td>
                <td className="border p-2">{o.client_name}</td>
                <td className="border p-2">{o.user_name}</td>
                <td className="border p-2">{o.status}</td>
                <td className="border p-2">${o.total}</td>
                <td className="border p-2">
                  {new Date(o.created_at).toLocaleDateString()}
                </td>
                <td className="border p-2">{o.address}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-primary px-3 py-1 text-white rounded-md hover:bg-blue-600"
                    onClick={() => {
                      setSelectedOrderId(o.id);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    Actualizar
                  </button>
                  <button
                    className="bg-red-500 px-3 py-1 text-white rounded-md hover:bg-red-600"
                    onClick={() => {
                      setSelectedOrderId(o.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-green-600 px-3 py-1 text-white rounded-md"
                    onClick={() => {
                      setSelectedOrderId(o.id);
                      setIsViewModalOpen(true);
                    }}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="p-4 text-center text-gray-500">
                No se encontraron pedidos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 bg-primary rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-primary rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/*  Modales */}
      {isUpdateModalOpen && selectedOrderId && (
        <ActualizarPedido
          orderId={selectedOrderId}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdated={fetchOrders}
        />
      )}

      {isDeleteModalOpen && selectedOrderId && (
        <EliminarPedido
          orderId={selectedOrderId}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleted={fetchOrders}
        />
      )}

      <VerPedido
        orderId={selectedOrderId}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
};

export default TablePedidos;
