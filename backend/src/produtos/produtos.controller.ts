import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  // Quando o React mandar um POST para /produtos, ele cria
  @Post()
  create(@Body() dadosProduto: any) {
    return this.produtosService.create(dadosProduto);
  }

  // Quando o React mandar um GET para /produtos, ele lista tudo
  @Get()
  findAll() {
    return this.produtosService.findAll();
  }
}