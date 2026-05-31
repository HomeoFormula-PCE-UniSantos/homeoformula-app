import { Injectable, Inject } from '@nestjs/common';
import { 
  EnviarReceitaUseCasePort, 
  EnviarReceitaCommand 
} from '../ports/in/enviar-receita.use-case.port';
import { ORCAMENTO_REPOSITORY } from '../ports/out/orcamento.repository.port';
import { STORAGE_PORT } from '../ports/out/storage.port';

@Injectable()
export class EnviarReceitaUseCase implements EnviarReceitaUseCasePort {
  constructor(
    @Inject(ORCAMENTO_REPOSITORY)
    private readonly orcamentoRepository: any, 
    
    @Inject(STORAGE_PORT)
    private readonly storagePort: any,
  ) {}

  // Ajustado para receber o EnviarReceitaCommand e retornar Promise<void>
  async executar(command: EnviarReceitaCommand): Promise<void> {
    // 1. Faz o upload da imagem/PDF para o MinIO
    const arquivoUrl = await this.storagePort.upload(
      command.nomeArquivo,
      command.buffer,
      command.mimetype
    );

    // 2. Monta o objeto com os dados para salvar no banco
    const novoOrcamento = {
      clienteId: command.clienteId,
      arquivo_receita_url: arquivoUrl,
      observacoes: command.observacoes,
    };

    // 3. Salva no banco de dados via PostgreSQL
    await this.orcamentoRepository.save(novoOrcamento);
    
    // O 'return { sucesso: true }' foi removido para respeitar o Promise<void> da interface
  }
}