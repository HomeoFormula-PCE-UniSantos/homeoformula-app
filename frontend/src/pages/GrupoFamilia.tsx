import { useState, useEffect } from 'react';

// Interface para definir como é um familiar no nosso sistema
interface Familiar {
  id: string;
  nome: string;
  parentesco: string;
  dataNascimento: string;
}

export default function GrupoFamilia() {
  const [familiares, setFamiliares] = useState<Familiar[]>([]);
  const [isAdicionando, setIsAdicionando] = useState(false);

  // Estados do formulário
  const [novoNome, setNovoNome] = useState('');
  const [novoParentesco, setNovoParentesco] = useState('');

  // Simulando a busca no banco de dados
  // Buscando os dependentes reais no banco de dados assim que a tela abre!
  useEffect(() => {
    const carregarFamiliares = async () => {
      try {
        const response = await fetch('http://localhost:3000/familiares', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token_farmacia')}`
          }
        });
        
        if (response.ok) {
          const dados = await response.json();
          setFamiliares(dados);
        } else {
          console.error('Falha ao buscar dados do servidor.');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      }
    };

    carregarFamiliares();
  }, []);

  const handleSalvarFamiliar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 1. Enviamos os dados do formulário para a nossa rota recém-criada no NestJS!
      const response = await fetch('http://localhost:3000/familiares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token_farmacia')}`
        },
        body: JSON.stringify({
          nome: novoNome,
          parentesco: novoParentesco,
          dataNascimento: '01/01/2000', // Por enquanto fixo, depois você pode adicionar um campo de data no form!
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao comunicar com o servidor');
      }

      // 2. Pegamos a resposta do backend (que inclui aquele ID seguro que o Node gerou)
      const data = await response.json();

      // 3. Montamos o familiar na tela usando o ID real que veio do backend
      const novoFamiliar: Familiar = {
        id: data.id, 
        nome: novoNome,
        parentesco: novoParentesco,
        dataNascimento: '01/01/2000'
      };

      // 4. Atualiza a tela limpando o formulário e adicionando o novo familiar na lista
      setFamiliares([...familiares, novoFamiliar]);
      setIsAdicionando(false);
      setNovoNome('');
      setNovoParentesco('');
      
      alert('✅ Dependente adicionado e salvo no banco de dados com sucesso!');
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao tentar salvar o familiar. Verifique se o servidor está rodando.');
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Grupo Família</h1>
          <p className="text-gray-600 mt-2">
            Gerencie os dependentes para pedir orçamentos e renovar receitas para eles.
          </p>
        </div>
        
        {/* Botão de Adicionar (Esconde se o form estiver aberto) */}
        {!isAdicionando && (
          <button 
            onClick={() => setIsAdicionando(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>➕</span> Novo Familiar
          </button>
        )}
      </div>

      {/* Formulário de Novo Familiar */}
      {isAdicionando && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Adicionar Dependente</h2>
          <form onSubmit={handleSalvarFamiliar} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
              <input 
                type="text" 
                required
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ex: Ana Souza"
              />
            </div>
            
            <div className="w-full md:w-48">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Parentesco</label>
              <select 
                required
                value={novoParentesco}
                onChange={(e) => setNovoParentesco(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Selecione...</option>
                <option value="Filho(a)">Filho(a)</option>
                <option value="Pai/Mãe">Pai/Mãe</option>
                <option value="Cônjuge">Cônjuge</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
              <button 
                type="button"
                onClick={() => setIsAdicionando(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Familiares */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {familiares.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Você ainda não tem dependentes cadastrados.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {familiares.map((familiar) => (
              <div key={familiar.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors">
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{familiar.nome}</p>
                    <p className="text-sm text-gray-500">Parentesco: {familiar.parentesco}</p>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto justify-end">
                  <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors">
                    Ver Receitas
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors">
                    Remover
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