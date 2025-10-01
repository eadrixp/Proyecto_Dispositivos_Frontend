import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableProductos from "./TableProductos";
import CrearProducto from "./CrearProducto";
import { useState } from "react";

const DashboardProductos: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [reload, setReload] = useState(false);

    const handleProductoCreated = () => {
        setReload(!reload); // esto forza refrescar la tabla
    };
    return (
        <>
        <Breadcrumb pageName="Gestion de Productos" />
        <div>
            <TableProductos />
        </div>

        <CrearProducto
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onProductCreated={handleProductoCreated}
        />
        <br></br>
        <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
            Crear Producto
        </button>
        </>
    );
};
export default DashboardProductos;