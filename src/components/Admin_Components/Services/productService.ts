import api from "../../../auth/api";

// Obtener todos los productos
export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
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
