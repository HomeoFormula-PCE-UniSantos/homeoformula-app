export default function Dashboard() {
  // Dados fictícios para simular as métricas da farmácia
  const resumo = {
    totalProdutos: 145,
    estoqueBaixo: 12,
    vendasHoje: 38,
    faturamentoHoje: 'R$ 1.250,00'
  };

  // Produtos que estariam com o estoque no limite ou zerado
  const alertasEstoque = [
    { id: 3, nome: 'Amoxicilina 500mg', estoque: 5 },
    { id: 8, nome: 'Loratadina 10mg', estoque: 2 },
    { id: 12, nome: 'Soro Fisiológico 500ml', estoque: 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Grid de Cards Superiores */}
      {/* O grid se adapta: 1 coluna no celular, 2 em tablets e 4 no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Total de Produtos */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total de Produtos</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{resumo.totalProdutos}</p>
        </div>

        {/* Card 2: Alertas de Estoque */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Estoque Baixo</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{resumo.estoqueBaixo}</p>
        </div>

        {/* Card 3: Vendas do Dia */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Vendas Hoje</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{resumo.vendasHoje}</p>
        </div>

        {/* Card 4: Faturamento */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Faturamento (Hoje)</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{resumo.faturamentoHoje}</p>
        </div>

      </div>

      {/* Seção Inferior: Tabela de Alertas */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          ⚠️ Produtos Precisando de Reposição
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Produto</th>
                <th className="py-3 px-4 font-semibold">Estoque Atual</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {alertasEstoque.map(item => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-500">{item.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{item.nome}</td>
                  <td className="py-3 px-4 font-bold text-red-600">{item.estoque} un</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      item.estoque === 0 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.estoque === 0 ? 'Esgotado' : 'Crítico'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}