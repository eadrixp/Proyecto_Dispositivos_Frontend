import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TablePedidos from "./TablePedidos";


const PedidosDashboard = () => {
    return (
        <>
        <Breadcrumb pageName="Gestion de Pedidos" />
        <div className="flex flex-col gap-10">
            <TablePedidos />
            </div>
        </>
    );
};

export default PedidosDashboard;