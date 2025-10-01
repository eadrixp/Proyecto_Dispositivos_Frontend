import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import TableUsuarios from './TableUsuarios';
import CrearUsuario from './CrearUsuario';
import { useState } from 'react';

const UsersDashboard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const handleUserCreated = () => {
    setReload(!reload); // esto forza refrescar la tabla
  };
  return (
    <>
      <Breadcrumb pageName="Gestion de usuarios" />

      <div className="flex flex-col gap-10">
        <TableUsuarios />
      </div>

      <CrearUsuario
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
      <br></br>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Crear Usuario
      </button>
    </>
  );
};

export default UsersDashboard;
