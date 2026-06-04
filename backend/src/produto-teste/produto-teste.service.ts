import { Injectable } from '@nestjs/common';
import { CreateProdutoTesteDto } from './dto/create-produto-teste.dto';
import { UpdateProdutoTesteDto } from './dto/update-produto-teste.dto';

@Injectable()
export class ProdutoTesteService {
  create(createProdutoTesteDto: CreateProdutoTesteDto) {
    return createProdutoTesteDto;
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} produtoTeste`;
  }

  update(id: number, updateProdutoTesteDto: UpdateProdutoTesteDto) {
    return updateProdutoTesteDto;
  }

  remove(id: number) {
    return `This action removes a #${id} produtoTeste`;
  }
}
