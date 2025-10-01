import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import UsersDashboard from './components/Admin_Components/Usuarios/DashboardUsuarios';
import DashboardPedidos from './components/Admin_Components/Pedidos/DashboardPedidos';
import DashboardProductos from './components/Admin_Components/Productos/DashboardProductos';
import DashboardClientes from './components/Admin_Components/Clientes/DashboardClientes';
import DashboardReportes from './components/Admin_Components/Reportes/DashboardReportes';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/dashboard-usuarios"
          element={
            
            <>
              <PageTitle title="Dashboard Usuarios | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UsersDashboard />
              
            </>
            
          }
        />
         <Route
          path="/login-page"
          element={
            <>
              <PageTitle title="Dashboard Usuarios | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <LoginPage />
            </>
          }
        />
           <Route
          path="/dashboard-reportes"
          element={
            <>
              <PageTitle title="Dashboard Reportes | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <DashboardReportes />
            </>
          }
        />
         <Route
          path="/dashboard-clientes"
          element={
            <>
              <PageTitle title="Dashboard Clientes | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <DashboardClientes />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
         <Route
          path="/dashboard-productos"
          element={
            <>
              <PageTitle title="DashboardProductos | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <DashboardProductos />
            </>
          }
        />
        <Route
          path="/dashboard-pedidos"
          element={
            <>
              <PageTitle title="Dashboard Pedidos | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <DashboardPedidos />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
