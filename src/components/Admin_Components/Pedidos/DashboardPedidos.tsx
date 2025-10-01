import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
import TablePedidos from "./TablePedidos";


const PedidosDashboard = () => {
    return (
        <>
        <Breadcrumb pageName="PedidosDashboard" />
        <div className="flex flex-col gap-10">
            <TablePedidos />
            </div>
        </>
    );
};

export default PedidosDashboard;