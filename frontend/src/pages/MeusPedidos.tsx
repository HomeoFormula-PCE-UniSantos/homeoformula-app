import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Como a tabela do Prisma nos mostrou, temos uma url da receita
interface Pedido {
  id: string;
  data: string;
  status: string;
  arquivoUrl: string;
}

export default function MeusPedidos() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isRenovando, setIsRenovando] = useState<string | null>(null);

  // Aqui estamos simulando os pedidos que virão do seu banco de dados
  useEffect(() => {
    const pedidosFalsos: Pedido[] = [
      {
        id: '2932c8c6-4ddd-4420-885b-267db5ada2cb',
        data: '15/05/2026',
        status: 'FINALIZADO',
        arquivoUrl: 'receita-vitamina-c.pdf'
      },
      {
        id: '2932c8c6-4ddd-4420-885b-267db5ada2cb',
        data: '10/04/2026',
        status: 'FINALIZADO',
        arquivoUrl: 'receita-manipulado-pele.png'
      }
    ];
    setPedidos(pedidosFalsos);
  }, []);

  const handleRenovar = async (pedidoId: string) => {
    // Trava o botão para não clicar duas vezes
    setIsRenovando(pedidoId);

    try {
      // Fazendo a requisição real via POST para o nosso NestJS!
      // (Se o seu backend estiver rodando em uma porta diferente de 3000, é só ajustar aqui)
      const response = await fetch(`http://localhost:3000/orcamentos/renovar/${pedidoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao comunicar com o servidor. Status: ' + response.status);
      }

      const data = await response.json();
      console.log('Resposta do backend:', data);

      // Mostra o sucesso bonitão direto na tela
      alert('✅ Pedido de renovação enviado com sucesso! O farmacêutico já foi notificado.');
      
    } catch (error) {
      console.error('Erro ao renovar:', error);
      alert('Erro ao solicitar renovação. Verifique se o backend NestJS está rodando e se não há erro de CORS.');
    } finally {
      setIsRenovando(null);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Meus Pedidos</h1>
        <p className="text-gray-600 mt-2">
          Acompanhe seus orçamentos ou renove medicamentos de uso contínuo com um clique.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {pedidos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Você ainda não tem nenhum pedido com a gente.</p>
            <button 
              onClick={() => navigate('/novo-orcamento')}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Fazer meu primeiro orçamento
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors">
                
                {/* Informações do Pedido Antigo */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                    📄
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Pedido #{pedido.id.substring(0, 8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500">Enviado em: {pedido.data}</p>
                  </div>
                </div>

                {/* Status e Botão de Ação */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {pedido.status}
                  </span>
                  
                  <button
                    onClick={() => handleRenovar(pedido.id)}
                    disabled={isRenovando === pedido.id}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    {isRenovando === pedido.id ? (
                      'Enviando...'
                    ) : (
                      <>
                        <span>🔄</span> Renovar Receita
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}