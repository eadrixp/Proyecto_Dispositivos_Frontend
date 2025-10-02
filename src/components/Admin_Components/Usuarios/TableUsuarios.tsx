import React, { useEffect, useState } from "react";
import { getAllUsers } from "../Services/userService";
// ⬇️ Importamos los modales de actualizar y eliminar
import ActualizarUsuario from "./ActualizarUsuario";
import EliminarUsuario from "./EliminarUsuario";

const TableUsuarios: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // ⬇️ Guardamos el usuario seleccionado para actualizar o eliminar
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // ⬇️ Estados para abrir/cerrar los modales
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ⬇️ Función que carga la lista de usuarios (reutilizable después de actualizar o eliminar)
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err: any) {
      console.error("Error al obtener usuarios:", err);
      setError(err.message || "Error al cargar los usuarios");
    } finally {
      setLoading(false);
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

      {/* Estado de carga */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-gray-600">Cargando usuarios...</span>
        </div>
      )}

      {/* Estado de error */}
      {error && !loading && (
        <div className="mx-4 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">Error al cargar usuarios</h3>
              <div className="mt-2 text-sm">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={fetchUsers}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Intentar nuevamente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de usuarios */}
      {!loading && !error && (
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
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="border p-4 text-center text-gray-500">
                  No se encontraron usuarios
                </td>
              </tr>
            ) : (
              users.map((u) => (
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
              ))
            )}
          </tbody>
        </table>
      )}

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
