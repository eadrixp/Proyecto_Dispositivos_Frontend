import api from "../../../auth/api";

// Interfaz para parámetros de búsqueda
export interface ProductSearchParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Interfaz para la respuesta del backend
export interface ProductResponse {
  status: string;
  data: any[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Obtener todos los productos con paginación y búsqueda
export const getAllProducts = async (params?: ProductSearchParams): Promise<ProductResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  
  const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await api.get(url);
  return res.data;
};

// Obtener todos los productos sin paginación (útil para obtener todos)
export const getAllProductsNoPagination = async () => {
  const res = await api.get("/products?limit=1000"); // límite alto para obtener todos
  return res.data;
};

// Obtener producto por ID
export const getProductById = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};

// Obtener producto por Código
export const getProductByCode = async (code: string) => {
  const res = await api.get(`/products/code/${code}`);
  return res.data.data;
};

// Crear producto
export const createProduct = async (productData: any) => {
  const res = await api.post("/products", productData);
  return res.data.data;
};

// Actualizar producto
export const updateProduct = async (id: number, productData: any) => {
  const res = await api.put(`/products/${id}`, productData);
  return res.data.data;
};

// Eliminar (desactivar) producto
export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
