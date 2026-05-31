import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  // Salva um produto novo no banco
  create(dadosProduto: Partial<Produto>) {
    const novoProduto = this.produtoRepository.create(dadosProduto);
    return this.produtoRepository.save(novoProduto);
  }

  // Puxa todos os produtos cadastrados
  findAll() {
    return this.produtoRepository.find();
  }
}