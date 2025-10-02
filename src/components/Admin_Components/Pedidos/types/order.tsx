// Representa un producto dentro del pedido
export interface OrderItem {
  product_id: number;
  code: string;
  product_name: string;
  description: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

// Representa un pedido completo
export interface Order {
  id: number;
  order_number: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  user_name: string;
  status_name: string;
  status_description: string;
  total: number;
  address: string;
  notes?: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  items: OrderItem[];
}

// Respuesta para listado de pedidos
export interface OrdersResponse {
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalRecords: number;
  };
}

// Respuesta para un pedido individual
export interface OrderResponse {
  data: Order;
}
