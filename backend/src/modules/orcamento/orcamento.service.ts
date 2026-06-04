import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrcamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async listarPorUsuario(usuarioId: string) {
    return this.prisma.orcamento.findMany({
      where: { clienteId: usuarioId },
      orderBy: { criadoEm: 'desc' },
    });
  }

  async renovarPedido(pedidoAntigoId: string, usuarioId: string) {
    const pedidoOriginal = await this.prisma.orcamento.findFirst({
      where: { id: pedidoAntigoId, clienteId: usuarioId },
    });

    if (!pedidoOriginal) {
      throw new NotFoundException(
        'Pedido não encontrado ou não pertence ao usuário.',
      );
    }

    const novoPedido = await this.prisma.orcamento.create({
      data: {
        clienteId: pedidoOriginal.clienteId,
        arquivoReceitaUrl: pedidoOriginal.arquivoReceitaUrl,
        status: 'PENDENTE',
        observacoes: pedidoOriginal.observacoes
          ? `[Renovação] ${pedidoOriginal.observacoes}`
          : '[Renovação automática]',
      },
    });

    return { sucesso: true, novoId: novoPedido.id };
  }
}
