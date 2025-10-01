import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface VerPedidoProps {
  order: {
    id: number;
    client_name: string;
    address: string;
    latitude: number;
    longitude: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const VerPedido: React.FC<VerPedidoProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  // ✅ Forzar tipado correcto para center
  const position: LatLngExpression = [order.latitude, order.longitude];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">Detalles del Pedido</h2>

        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Cliente:</strong> {order.client_name}</p>
        <p><strong>Dirección:</strong> {order.address}</p>

        <div className="mt-4 h-[300px] w-full">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={position}>
              <Popup> Pedido #{order.id}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerPedido;
