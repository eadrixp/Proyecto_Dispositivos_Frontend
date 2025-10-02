import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
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
    <Routes>
      {/* Rutas públicas */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/login-page" element={<LoginPage />} />

      {/* Rutas protegidas con layout */}
      <Route element={<DefaultLayout />}>
        <Route
          index
          element={
            <>
              <Navigate to="/login-page" replace />
            </>
          }
        />
        <Route
          path="/dashboard-usuarios"
          element={
            <>
              <PageTitle title="Dashboard Usuarios" />
              <UsersDashboard />
            </>
          }
        />
        <Route
          path="/dashboard-ecommerce"
          element={
            <>
              <PageTitle title="Dashboard Usuarios" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/dashboard-reportes"
          element={
            <>
              <PageTitle title="Dashboard Reportes" />
              <DashboardReportes />
            </>
          }
        />
        <Route
          path="/dashboard-clientes"
          element={
            <>
              <PageTitle title="Dashboard Clientes" />
              <DashboardClientes />
            </>
          }
        />
        <Route
          path="/dashboard-productos"
          element={
            <>
              <PageTitle title="Dashboard Productos" />
              <DashboardProductos />
            </>
          }
        />
        <Route
          path="/dashboard-pedidos"
          element={
            <>
              <PageTitle title="Dashboard Pedidos" />
              <DashboardPedidos />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons" />
              <Buttons />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
