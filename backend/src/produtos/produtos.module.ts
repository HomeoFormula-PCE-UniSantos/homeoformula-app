import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Produto } from './entities/produto.entity';

@Module({
  // ESSA LINHA É A QUE AVISA O BANCO:
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}