import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import HomeCliente from './pages/HomeCliente';
import NovoOrcamento from './pages/NovoOrcamento';
import MeusPedidos from './pages/MeusPedidos';
import GrupoFamilia from './pages/GrupoFamilia';

// 1. Importe a nova página do Admin aqui
import DashboardAdmin from './pages/DashboardAdmin';
import AdminProdutos from './pages/AdminProdutos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Independentes (Sem o menu do cliente) */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. Rota do Admin colocada fora do Layout do Cliente */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/admin/produtos" element={<AdminProdutos />} />

        {/* Rotas do Cliente (Com o menu padrão do Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeCliente />} />
          <Route path="novo-orcamento" element={<NovoOrcamento />} />
          <Route path="meus-pedidos" element={<MeusPedidos />} />
          <Route path="/familia" element={<GrupoFamilia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}