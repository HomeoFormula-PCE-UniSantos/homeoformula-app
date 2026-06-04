import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FamiliarService {
  constructor(private readonly prisma: PrismaService) {}

  async adicionar(
    usuarioId: string,
    dados: { nome: string; parentesco: string; dataNascimento?: string },
  ) {
    return this.prisma.familiar.create({
      data: {
        usuarioId,
        nome: dados.nome,
        parentesco: dados.parentesco,
        dataNascimento: dados.dataNascimento ? new Date(dados.dataNascimento) : null,
      },
    });
  }

  async listarPorUsuario(usuarioId: string) {
    return this.prisma.familiar.findMany({ where: { usuarioId } });
  }

  async remover(familiarId: string, usuarioId: string) {
    const familiar = await this.prisma.familiar.findFirst({
      where: { id: familiarId, usuarioId },
    });
    if (!familiar) {
      throw new NotFoundException('Familiar não encontrado ou não pertence ao usuário.');
    }
    await this.prisma.familiar.delete({ where: { id: familiarId } });
    return { sucesso: true };
  }
}
