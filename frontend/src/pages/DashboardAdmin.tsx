import { useNavigate } from 'react-router-dom';

export default function DashboardAdmin() {
  const navigate = useNavigate();

  // Dados fakes só para a casca não ficar vazia
  const estatisticas = [
    { nome: 'Pedidos Pendentes', valor: '12', cor: 'bg-orange-100 text-orange-600' },
    { nome: 'Aguardando Pagamento', valor: '05', cor: 'bg-blue-100 text-blue-600' },
    { nome: 'Finalizados (Hoje)', valor: '08', cor: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header do Admin */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💊</span>
          <h1 className="text-xl font-bold text-gray-800">HomeoFórmula | Admin</h1>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="text-sm font-medium text-red-600 hover:underline cursor-pointer"
        >
          Sair do Sistema
        </button>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo, Farmacêutico!</h2>
            <p className="text-gray-600">Confira as solicitações de orçamento do dia.</p>
          </div>
          <button 
            onClick={() => navigate('/admin/produtos')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm"
          >
            Gerenciar Catálogo
          </button>
        </div>

        {/* Grid de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {estatisticas.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-1">{item.nome}</p>
              <p className={`text-3xl font-bold ${item.cor.split(' ')[1]}`}>{item.valor}</p>
            </div>
          ))}
        </div>

        {/* Área de Trabalho Principal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-lg">Últimas Receitas Recebidas</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Ver todas</button>
          </div>
          
          <div className="p-8 text-center text-gray-500">
             {/* Aqui depois faremos o Map puxando as receitas do banco! */}
             <div className="text-4xl mb-4">📂</div>
             <p>Nenhuma receita pendente no momento.</p>
             <p className="text-sm">Novas solicitações aparecerão automaticamente aqui.</p>
          </div>
        </div>
      </main>
    </div>
  );
}