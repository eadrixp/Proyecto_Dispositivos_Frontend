import api from "../../../auth/api";

export const getAllUsers = async () => {
    try {
        const res = await api.get("/users");
        return res.data.data;
    } catch (error: any) {
        console.error("Error al obtener usuarios:", error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para acceder a esta información. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status >= 500) {
            throw new Error("Error del servidor. Por favor, intenta más tarde.");
        } else {
            throw new Error("Error al obtener los usuarios. Por favor, intenta nuevamente.");
        }
    }
};

export const getUserById = async (id: number) => {
    try {
        const res = await api.get(`/users/${id}`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error al obtener usuario ${id}:`, error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para acceder a esta información.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 404) {
            throw new Error("Usuario no encontrado.");
        } else {
            throw new Error("Error al obtener el usuario.");
        }
    }
};

export const createUser = async (userData: any) => {
    try {
        const res = await api.post("/users", userData);
        return res.data.data;
    } catch (error: any) {
        console.error("Error al crear usuario:", error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para crear usuarios.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 400) {
            throw new Error("Datos de usuario inválidos. Verifica la información.");
        } else {
            throw new Error("Error al crear el usuario.");
        }
    }
};

export const updateUser = async (id: number, userData: any) => {
    try {
        const res = await api.put(`/users/${id}`, userData);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error al actualizar usuario ${id}:`, error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para actualizar usuarios.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 404) {
            throw new Error("Usuario no encontrado.");
        } else if (error.response?.status === 400) {
            throw new Error("Datos de usuario inválidos. Verifica la información.");
        } else {
            throw new Error("Error al actualizar el usuario.");
        }
    }
};

export const deleteUser = async (id: number) => {
    try {
        const res = await api.delete(`/users/${id}`);
        return res.data;
    } catch (error: any) {
        console.error(`Error al eliminar usuario ${id}:`, error);
        if (error.response?.status === 403) {
            throw new Error("No tienes permisos para eliminar usuarios.");
        } else if (error.response?.status === 401) {
            throw new Error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.response?.status === 404) {
            throw new Error("Usuario no encontrado.");
        } else {
            throw new Error("Error al eliminar el usuario.");
        }
    }
};