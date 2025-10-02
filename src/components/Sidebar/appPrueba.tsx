import Loader from "../../common/Loader";
import DefaultLayout from "../../layout/DefaultLayout";

return loading ? (
    <Loader />
) : (
    <Routes>

    

    <Route element = {<DefaultLayout />} >
    
    </Route>
    </Routes>
);