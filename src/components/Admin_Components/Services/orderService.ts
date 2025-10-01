import api from '../../../auth/api';

export const getAllOrders = async (
    page:number,
    limit: number,
    filters: { id?: number, status?: string}

) => {
    const params: any = {page, limit};
    if (filters.id) params.id = filters.id;
    if (filters.status) params.status = filters.status;

    const res = await api.get("/orders", { params });
    return res.data;
}

export const getOrderById = async (id: number) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
};

export const updateOrderStatus = async (id: number, status_id: number) => {
    const res = await api.put(`/orders/${id}/status`, { status_id });
    return res.data;
    
};

export const deleteOrder = async (id: number) => {
    const res = await api.delete(`/orders/${id}`);
    return res.data;
};