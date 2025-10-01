import React, { useEffect, useState } from "react";
import { getAllUsers } from "../Services/userService";
// ⬇️ Importamos los modales de actualizar y eliminar
import ActualizarUsuario from "./ActualizarUsuario";
import EliminarUsuario from "./EliminarUsuario";

const TableUsuarios: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  
  // ⬇️ Guardamos el usuario seleccionado para actualizar o eliminar
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // ⬇️ Estados para abrir/cerrar los modales
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ⬇️ Función que carga la lista de usuarios (reutilizable después de actualizar o eliminar)
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsers(); // ⬅️ Llamamos la función al montar el componente
  }, []);

  // ⬇️ Abre el modal de actualizar con el usuario seleccionado
  const handleUpdate = (user: any) => {
    setSelectedUser(user);
    setIsUpdateOpen(true);
  };

  // ⬇️ Abre el modal de eliminar con el usuario seleccionado
  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Usuarios
        </h4>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="font-medium p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Activo</th>
            {/* ⬇️ Nueva columna para los botones de acción */}
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.full_name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">{u.is_active ? "Sí" : "No"}</td>
              {/* ⬇️ Nueva celda con botones para actualizar y eliminar */}
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleUpdate(u)} // ⬅️ Abre modal de actualizar
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => handleDelete(u)} // ⬅️ Abre modal de eliminar
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ⬇️ Renderizamos modal de actualización solo si está abierto */}
      {isUpdateOpen && selectedUser && (
        <ActualizarUsuario
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)} // ⬅️ Cierra modal
          user={selectedUser} // ⬅️ Pasamos el usuario seleccionado
          onUpdated={fetchUsers} // ⬅️ Recarga la tabla después de actualizar
        />
      )}

      {/* ⬇️ Renderizamos modal de eliminación solo si está abierto */}
      {isDeleteOpen && selectedUser && (
        <EliminarUsuario
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)} // ⬅️ Cierra modal
          user={selectedUser} // ⬅️ Pasamos el usuario seleccionado
          onDeleted={fetchUsers} // ⬅️ Recarga la tabla después de eliminar
        />
      )}
    </div>
  );
};

export default TableUsuarios;
