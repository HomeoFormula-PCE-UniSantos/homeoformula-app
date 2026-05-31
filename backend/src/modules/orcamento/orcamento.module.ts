import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrcamentoController } from './adapters/in/http/orcamento.controller';
import { ENVIAR_RECEITA_USE_CASE } from './core/ports/in/enviar-receita.use-case.port';
// 1. Importação da nova porta de entrada para renovação
import { RENOVAR_RECEITA_USE_CASE } from './core/ports/in/renovar-receita.use-case.port';
import { EnviarReceitaUseCase } from './core/use-cases/enviar-receita.use-case';
import { RenovarReceitaUseCase } from './core/use-cases/renovar-receita.use-case';

import { ORCAMENTO_REPOSITORY } from './core/ports/out/orcamento.repository.port';
import { OrcamentoRepositoryAdapter } from './adapters/out/database/orcamento.repository.adapter';
import { OrcamentoOrmEntity } from './adapters/out/database/orcamento.orm-entity';

// Importe o novo adaptador real
import { STORAGE_PORT } from './core/ports/out/storage.port';
import { MinioStorageAdapter } from './adapters/out/storage/minio-storage.adapter'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([OrcamentoOrmEntity]),
  ],
  controllers: [
    OrcamentoController
  ],
  providers: [
    {
      provide: ENVIAR_RECEITA_USE_CASE,
      useClass: EnviarReceitaUseCase,
    },
    // 2. Nova injeção de dependência: Ligando a Porta ao Caso de Uso real
    {
      provide: RENOVAR_RECEITA_USE_CASE,
      useClass: RenovarReceitaUseCase,
    },
    {
      provide: ORCAMENTO_REPOSITORY,
      useClass: OrcamentoRepositoryAdapter,
    },
    // Substituímos o mock pelo adaptador verdadeiro:
    {
      provide: STORAGE_PORT,
      useClass: MinioStorageAdapter,
    },
  ],
})
export class OrcamentoModule {}