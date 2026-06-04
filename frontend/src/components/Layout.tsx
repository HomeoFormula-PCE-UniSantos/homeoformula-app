import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleSair = () => {
    localStorage.removeItem('token_farmacia');
    localStorage.removeItem('usuario_farmacia');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight cursor-pointer">
            Homeofórmula
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition-colors font-medium">Início</Link>
            <Link to="/meus-pedidos" className="hover:text-blue-200 transition-colors font-medium">Meus Pedidos</Link>
            <button
              onClick={handleSair}
              className="text-blue-200 hover:text-white transition-colors text-sm border border-blue-700 px-3 py-1 rounded cursor-pointer"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
