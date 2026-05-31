import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { RenovarReceitaUseCasePort, RenovarReceitaInputDto } from '../ports/in/renovar-receita.use-case.port';
import { ORCAMENTO_REPOSITORY, OrcamentoRepositoryPort } from '../ports/out/orcamento.repository.port';
import { Orcamento } from '../entities/orcamento.entity';
import { randomUUID } from 'crypto'; // <-- Importação do gerador nativo de IDs do Node.js

@Injectable()
export class RenovarReceitaUseCase implements RenovarReceitaUseCasePort {
  constructor(
    @Inject(ORCAMENTO_REPOSITORY)
    private readonly orcamentoRepository: OrcamentoRepositoryPort,
  ) {}

  async executar(input: RenovarReceitaInputDto): Promise<any> {
    // 1. Busca o pedido antigo
    const pedidoOriginal = await this.orcamentoRepository.buscarPorId(input.orcamentoId);

    if (!pedidoOriginal) {
      throw new NotFoundException('Pedido original não encontrado no sistema.');
    }

    // 2. Gera um ID novo e garantido para a renovação
    const novoId = randomUUID();

    // 3. Monta o novo pedido com o ID gerado
    const novoPedido = new Orcamento(
      novoId, // <-- Agora enviamos um ID real no lugar do undefined!
      pedidoOriginal.clienteId, 
      pedidoOriginal.arquivoReceitaUrl, 
      'PENDENTE',
      `[Renovação automática] Baseado no pedido original.`
    );

    // 4. Salva no banco de dados
    await this.orcamentoRepository.salvar(novoPedido);

    return { sucesso: true, mensagem: "Renovado!", novoId: novoId };
  }
}