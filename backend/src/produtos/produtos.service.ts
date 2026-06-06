import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface DadosProduto {
  nome: string;
  descricao?: string;
  preco: number;
  estoque?: number;
  imagemUrl?: string;
  ativo?: boolean;
}

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  criar(dados: DadosProduto) {
    return this.prisma.produto.create({ data: dados });
  }

  listarAdmin() {
    return this.prisma.produto.findMany({ orderBy: { nome: 'asc' } });
  }

  listarAtivos() {
    return this.prisma.produto.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    });
  }

  async buscarUm(id: string) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) throw new NotFoundException('Produto não encontrado.');
    return produto;
  }

  async atualizar(id: string, dados: Partial<DadosProduto>) {
    await this.buscarUm(id);
    return this.prisma.produto.update({ where: { id }, data: dados });
  }

  async inativar(id: string) {
    await this.buscarUm(id);
    return this.prisma.produto.update({ where: { id }, data: { ativo: false } });
  }
}
