import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NovoOrcamento() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [observacoes, setObservacoes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sucesso, setSucesso] = useState(false); // Novo estado para controlar a mensagem
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!arquivo) {
      alert('Por favor, anexe a foto ou PDF da sua receita médica.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('clienteId', '12345'); 
      formData.append('arquivo', arquivo);
      
      const response = await fetch('http://localhost:3000/orcamentos/receita', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Em vez de alert e navigate, ativamos a tela de sucesso!
        setSucesso(true);
      } else {
        const errorData = await response.json();
        console.error('Erro detalhado do backend:', errorData);
        alert('Tivemos um problema ao processar sua receita. Tente novamente.');
      }

    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Não foi possível conectar com o servidor. O backend está rodando?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Enviar Receita</h1>
        <p className="text-gray-600 mt-2">
          Anexe a sua receita médica para receber um orçamento sem compromisso.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        
        {/* Renderização Condicional: Se sucesso for true, mostra a mensagem. Se for false, mostra o form */}
        {sucesso ? (
          <div className="flex flex-col items-center justify-center text-center py-8 animate-fade-in">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">Receita enviada com sucesso!</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Nossa equipe de farmacêuticos já recebeu o seu arquivo. Você receberá o orçamento detalhado muito em breve.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md cursor-pointer"
            >
              Voltar para o Início
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Área de Upload de Arquivo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua Receita (Foto ou PDF)
              </label>
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="dropzone-file" 
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    arquivo ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    {arquivo ? (
                      <>
                        <div className="text-4xl mb-2">✅</div>
                        <p className="mb-2 text-sm text-green-700 font-semibold truncate max-w-xs">
                          {arquivo.name}
                        </p>
                        <p className="text-xs text-green-600">Clique para trocar o arquivo</p>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl mb-2 text-gray-400">📄</div>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Clique para fazer upload</span> ou arraste o arquivo até aqui
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG ou PDF (Máx. 10MB)</p>
                      </>
                    )}
                  </div>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </div>

            {/* Campo de Observações */}
            <div>
              <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
                Observações (Opcional)
              </label>
              <textarea
                id="observacoes"
                rows={4}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                disabled={isSubmitting}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none disabled:bg-gray-100"
                placeholder="Ex: Gostaria do medicamento em cápsulas vegetais, se possível."
              ></textarea>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 mt-2">
              <button
                type="button"
                onClick={() => navigate('/')}
                disabled={isSubmitting}
                className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}