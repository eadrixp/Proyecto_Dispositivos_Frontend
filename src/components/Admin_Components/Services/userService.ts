import api from "../../../auth/api";

export const getAllUsers = async () => {
    const res = await api.get("/users");
    return res.data.data;
};

export const getUserById = async (id: number) => {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
};

export const createUser = async (userData: any) => {
    const res = await api.post("/users", userData);
    return res.data.data;
};

export const updateUser = async (id: number, userData: any) => {
    const res = await api.put(`/users/${id}`, userData);
    return res.data.data;
};

export const deleteUser = async (id: number) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};