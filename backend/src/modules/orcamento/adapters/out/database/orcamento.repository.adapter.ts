import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { OrcamentoRepositoryPort } from '../../../core/ports/out/orcamento.repository.port';
import { Orcamento } from '../../../core/entities/orcamento.entity';

@Injectable()
export class OrcamentoRepositoryAdapter implements OrcamentoRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(orcamento: Orcamento): Promise<void> {
    await this.prisma.orcamento.upsert({
      where: { id: orcamento.id },
      update: {
        clienteId: orcamento.clienteId,
        familiarId: orcamento.familiarId ?? null,
        arquivoReceitaUrl: orcamento.arquivoReceitaUrl,
        status: orcamento.status,
        observacoes: orcamento.observacoes,
      },
      create: {
        id: orcamento.id,
        clienteId: orcamento.clienteId,
        familiarId: orcamento.familiarId ?? null,
        arquivoReceitaUrl: orcamento.arquivoReceitaUrl,
        status: orcamento.status,
        observacoes: orcamento.observacoes,
      },
    });
  }

  async buscarPorClienteId(clienteId: string): Promise<Orcamento[]> {
    const rows = await this.prisma.orcamento.findMany({ where: { clienteId } });
    return rows.map(
      (r) => new Orcamento(r.id, r.clienteId, r.arquivoReceitaUrl, r.status as 'PENDENTE' | 'RESPONDIDO', r.observacoes ?? undefined),
    );
  }

  async buscarPorId(id: string): Promise<Orcamento | null> {
    const r = await this.prisma.orcamento.findUnique({ where: { id } });
    if (!r) return null;
    return new Orcamento(r.id, r.clienteId, r.arquivoReceitaUrl, r.status as 'PENDENTE' | 'RESPONDIDO', r.observacoes ?? undefined);
  }
}
