import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import HomeCliente from './pages/HomeCliente';
import NovoOrcamento from './pages/NovoOrcamento';
import MeusPedidos from './pages/MeusPedidos';
import GrupoFamilia from './pages/GrupoFamilia';
import DashboardAdmin from './pages/DashboardAdmin';
import AdminProdutos from './pages/AdminProdutos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas sem menu */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/admin/produtos" element={<AdminProdutos />} />

        {/* Rotas do cliente (com Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeCliente />} />
          <Route path="novo-orcamento" element={<NovoOrcamento />} />
          <Route path="meus-pedidos" element={<MeusPedidos />} />
          <Route path="grupo-familia" element={<GrupoFamilia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
