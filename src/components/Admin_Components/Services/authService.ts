import api from "../../../auth/api";

export const registerService = async (userData: any) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
};