import api from '../../../auth/api';

export const getAllOrders = async (
    page: number,
    limit: number,
    filters: { id?: number, status?: string }
) => {
    try {
        const params: any = { page, limit };
        if (filters.id) params.id = filters.id;
        if (filters.status) params.status = filters.status;

        const res = await api.get("/orders", { params });
        return res.data;
    } catch (error: any) {
        console.error("Error al obtener órdenes:", error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para acceder a las órdenes. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status >= 500) {
            throw new Error("Error del servidor. Por favor, intenta más tarde.");
        } else {
            throw new Error("Error al obtener las órdenes. Por favor, intenta nuevamente.");
        }
    }
};

export const getOrderById = async (id: number) => {
    try {
        const res = await api.get(`/orders/${id}`);
        return res.data;
    } catch (error: any) {
        console.error(`Error al obtener orden ${id}:`, error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para acceder a esta orden.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 404) {
            throw new Error("Orden no encontrada.");
        } else {
            throw new Error("Error al obtener la orden.");
        }
    }
};

export const updateOrderStatus = async (id: number, status_id: number) => {
    try {
        const res = await api.put(`/orders/${id}/status`, { status_id });
        return res.data;
    } catch (error: any) {
        console.error(`Error al actualizar estado de orden ${id}:`, error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para actualizar órdenes.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 404) {
            throw new Error("Orden no encontrada.");
        } else if (error.response?.status === 400) {
            throw new Error("Estado de orden inválido. Verifica la información.");
        } else {
            throw new Error("Error al actualizar el estado de la orden.");
        }
    }
};

export const deleteOrder = async (id: number) => {
    try {
        const res = await api.delete(`/orders/${id}`);
        return res.data;
    } catch (error: any) {
        console.error(`Error al eliminar orden ${id}:`, error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para eliminar órdenes.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 404) {
            throw new Error("Orden no encontrada.");
        } else {
            throw new Error("Error al eliminar la orden.");
        }
    }
};