import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TableClientes from "./TableClientes";

const DashboardClientes = () => {
    return (
        <>
        <Breadcrumb pageName="Gestion de Clientes" />

        <div className="flex flex-col gap-10">
        <TableClientes />
        </div>
        </>
    );
};
export default DashboardClientes;