import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: string; // O banco devolve como string por causa do decimal
}

export default function AdminProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assim que a tela abre, busca os produtos cadastrados
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await apiFetch('/produtos');
      if (response.ok) {
        const data = await response.json();
        setProdutos(data);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Converte o preço para número antes de mandar pro backend
      const precoNumero = parseFloat(preco.replace(',', '.'));

      const response = await apiFetch('/produtos', {
        method: 'POST',
        body: JSON.stringify({ nome, descricao, preco: precoNumero }),
      });

      if (response.ok) {
        // Limpa os campos do form
        setNome('');
        setDescricao('');
        setPreco('');
        // Atualiza a lista na tela
        carregarProdutos();
      } else {
        alert('Erro ao salvar o produto.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💊</span>
          <h1 className="text-xl font-bold text-gray-800">Gerenciar Produtos e Insumos</h1>
        </div>
        <button 
          onClick={() => navigate('/dashboard-admin')}
          className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
        >
          Voltar ao Painel
        </button>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna da Esquerda: Formulário de Cadastro */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Novo Insumo</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Vitamina C 500mg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço Base (R$)</label>
              <input
                type="text"
                required
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: 15.50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (Opcional)</label>
              <textarea
                rows={2}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Ex: Frasco com 30 cápsulas"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Cadastrar'}
            </button>
          </form>
        </div>

        {/* Coluna da Direita: Lista de Produtos */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Catálogo Registrado</h2>
          
          {produtos.length === 0 ? (
            <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <p>Nenhum produto cadastrado ainda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-semibold text-sm text-gray-600">Insumo / Produto</th>
                    <th className="py-3 px-4 font-semibold text-sm text-gray-600">Descrição</th>
                    <th className="py-3 px-4 font-semibold text-sm text-gray-600 text-right">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((produto) => (
                    <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{produto.nome}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{produto.descricao || '-'}</td>
                      <td className="py-3 px-4 font-medium text-green-600 text-right">
                        R$ {Number(produto.preco).toFixed(2).replace('.', ',')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}