import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  EnviarReceitaUseCasePort,
  EnviarReceitaCommand
} from '../ports/in/enviar-receita.use-case.port';
import { ORCAMENTO_REPOSITORY } from '../ports/out/orcamento.repository.port';
import { STORAGE_PORT } from '../ports/out/storage.port';
import { Orcamento } from '../entities/orcamento.entity';

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
    const arquivoUrl = await this.storagePort.uploadArquivo(
      command.nomeArquivo,
      command.buffer,
      command.mimetype
    );

    // 2. Monta a entidade e salva no banco
    const novoOrcamento = new Orcamento(
      randomUUID(),
      command.clienteId,
      arquivoUrl,
      'PENDENTE',
      command.observacoes,
    );

    await this.orcamentoRepository.salvar(novoOrcamento);
  }
}