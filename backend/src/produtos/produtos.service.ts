import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dados: { nome: string; descricao?: string; preco: number; ativo?: boolean }) {
    return this.prisma.produto.create({ data: dados });
  }

  findAll() {
    return this.prisma.produto.findMany();
  }
}
