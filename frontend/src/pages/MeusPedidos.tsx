import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

interface Pedido {
  id: string;
  criadoEm: string;
  status: string;
  arquivoReceitaUrl: string;
}

export default function MeusPedidos() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isRenovando, setIsRenovando] = useState<string | null>(null);
  const [isCarregando, setIsCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await apiFetch('/orcamentos');
        if (response.ok) {
          const data = await response.json();
          setPedidos(data);
        }
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setIsCarregando(false);
      }
    };
    carregar();
  }, []);

  const handleRenovar = async (pedidoId: string) => {
    setIsRenovando(pedidoId);
    try {
      const response = await apiFetch(`/orcamentos/${pedidoId}/renovar`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Falha ao comunicar com o servidor. Status: ' + response.status);
      }

      alert('✅ Pedido de renovação enviado com sucesso! O farmacêutico já foi notificado.');
    } catch (error) {
      console.error('Erro ao renovar:', error);
      alert('Erro ao solicitar renovação. Verifique se o backend está rodando.');
    } finally {
      setIsRenovando(null);
    }
  };

  const formatarData = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR');

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Meus Pedidos</h1>
        <p className="text-gray-600 mt-2">
          Acompanhe seus orçamentos ou renove medicamentos de uso contínuo com um clique.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isCarregando ? (
          <div className="p-8 text-center text-gray-500">Carregando...</div>
        ) : pedidos.length === 0 ? (
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
              <div
                key={pedido.id}
                className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">📄</div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Pedido #{pedido.id.substring(0, 8).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Enviado em: {formatarData(pedido.criadoEm)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {pedido.status}
                  </span>
                  <button
                    onClick={() => handleRenovar(pedido.id)}
                    disabled={isRenovando === pedido.id}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    {isRenovando === pedido.id ? 'Enviando...' : <><span>🔄</span> Renovar Receita</>}
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
