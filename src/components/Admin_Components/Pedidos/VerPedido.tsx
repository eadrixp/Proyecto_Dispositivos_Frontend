import React, { useEffect, useState } from "react";
import { getOrderById } from "../Services/orderService";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

interface VerPedidoProps {
  orderId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize(); // 👈 recalcula después de abrir modal
    }, 200);
  }, [map]);
  return null;
};

const VerPedido: React.FC<VerPedidoProps> = ({ orderId, isOpen, onClose }) => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && orderId !== null) {
      setLoading(true);
      getOrderById(orderId)
        .then((res) => {
          setOrder(res.data);
        })
        .catch((err) => console.error("Error al obtener pedido:", err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg w-[90%] max-w-3xl p-6 relative">
        {/* Cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {loading ? (
          <p>Cargando pedido...</p>
        ) : order ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Pedido #{order.order_number}</h2>

            {/* Info general */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Cliente:</strong> {order.client_name} ({order.client_email})</p>
              <p><strong>Teléfono:</strong> {order.client_phone}</p>
              <p><strong>Usuario:</strong> {order.user_name}</p>
              <p><strong>Estado:</strong> {order.status_name}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Dirección:</strong> {order.address}</p>
              <p><strong>Notas:</strong> {order.notes || "N/A"}</p>
              <p><strong>Fecha:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </div>

            {/* Items */}
            <h3 className="font-semibold mt-4">Productos</h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Código</th>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Cantidad</th>
                  <th className="border p-2">Precio</th>
                  <th className="border p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="border p-2">{item.code}</td>
                    <td className="border p-2">{item.product_name}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">${item.unit_price}</td>
                    <td className="border p-2">${item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mapa */}
            {order.latitude && order.longitude && (
              <div className="mt-4">
                <h3 className="font-semibold">Ubicación</h3>
                <MapContainer
                  center={[order.latitude, order.longitude]}
                  zoom={15}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  />
                  <Marker
                    position={[order.latitude, order.longitude]}
                    icon={L.icon({
                      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })}
                  >
                    <Popup>
                      {order.client_name} <br /> {order.address}
                    </Popup>
                  </Marker>
                  <ResizeMap />
                </MapContainer>
              </div>
            )}
          </div>
        ) : (
          <p>No se encontró información del pedido.</p>
        )}
      </div>
    </div>
  );
};

export default VerPedido;
