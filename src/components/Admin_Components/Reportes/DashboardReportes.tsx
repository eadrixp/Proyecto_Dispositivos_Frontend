import React, { useEffect, useState } from "react";
import { getAllOrders } from "../Services/orderService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from 'axios';

interface Order {
  id: number;
  client_name: string;
  total: number;
  status: string;
  created_at: string;
}

const DashboardReportes: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterId, setFilterId] = useState<number | "">("");
  const [page, setPage] = useState(1); // Para la paginación (actualmente no se utiliza)

  // Cargar pedidos
  const loadOrders = async () => {
    try {
      setLoading(true);
      const filters = filterId ? { id: Number(filterId) } : {};
      const res = await getAllOrders(page, 10, filters);
      console.log('API Response:', res); // Log the full response
      if (res && Array.isArray(res)) {
        setOrders(res);
      } else if (res && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        console.warn('No data received from API or invalid format:', res);
        setOrders([]);
      }
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
      if (axios.isAxiosError(err)) {
        const axiosError = err;
        console.error('API Error Details:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          headers: axiosError.response?.headers
        });
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, filterId]);

  //  Exportar a PDF 
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Reporte de Pedidos", 14, 15);

    const rows = orders.map((order) => [
      order.id,
      order.client_name,
      `$${order.total}`,
      order.status,
      new Date(order.created_at).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [["ID", "Cliente", "Total", "Estado", "Fecha"]],
      body: rows,
      startY: 25,
    });

    doc.save("reporte_pedidos.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4"> Reportes de Pedidos</h2>

      {/* Filtro */}
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="number"
          placeholder="Filtrar por ID de pedido"
          className="border rounded px-3 py-2"
          value={filterId}
          onChange={(e) =>
            setFilterId(e.target.value ? Number(e.target.value) : "")
          }
        />
        <button
          onClick={loadOrders}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
        <button
          onClick={exportToPDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Exportar PDF
        </button>
      </div>

      {/* Tabla */}
      {loading ? (
        <p>Cargando pedidos...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Cliente</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.client_name}</td>
                  <td className="border border-gray-300 px-4 py-2">${order.total}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 border border-gray-300"
                >
                  No se encontraron pedidos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardReportes;
