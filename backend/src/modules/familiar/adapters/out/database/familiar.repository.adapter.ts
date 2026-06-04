import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { FamiliarRepositoryPort } from '../../../core/ports/out/familiar.repository.port';
import { Familiar } from '../../../core/entities/familiar.entity';

@Injectable()
export class FamiliarRepositoryAdapter implements FamiliarRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(familiar: Familiar): Promise<void> {
    await this.prisma.familiar.upsert({
      where: { id: familiar.id },
      update: {
        usuarioId: familiar.usuarioId,
        nome: familiar.nome,
        parentesco: familiar.parentesco,
        dataNascimento: familiar.dataNascimento ? new Date(familiar.dataNascimento) : null,
      },
      create: {
        id: familiar.id,
        usuarioId: familiar.usuarioId,
        nome: familiar.nome,
        parentesco: familiar.parentesco,
        dataNascimento: familiar.dataNascimento ? new Date(familiar.dataNascimento) : null,
      },
    });
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Familiar[]> {
    const rows = await this.prisma.familiar.findMany({ where: { usuarioId } });
    return rows.map(
      (r) => new Familiar(
        r.id,
        r.usuarioId,
        r.nome,
        r.parentesco,
        r.dataNascimento?.toISOString(),
      ),
    );
  }

  async remover(familiarId: string, usuarioId: string): Promise<void> {
    await this.prisma.familiar.deleteMany({ where: { id: familiarId, usuarioId } });
  }
}
