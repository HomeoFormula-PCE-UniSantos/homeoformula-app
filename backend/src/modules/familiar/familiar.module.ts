import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamiliarOrmEntity } from './adapters/out/database/familiar.orm-entity';
import { FamiliarController } from './adapters/in/http/familiar.controller';
import { SalvarFamiliarUseCase } from './core/use-cases/salvar-familiar.use-case';
import { ListarFamiliaresUseCase } from './core/use-cases/listar-familiares.use-case';
import { FamiliarRepositoryAdapter } from './adapters/out/database/familiar.repository.adapter';
import { SALVAR_FAMILIAR_USE_CASE } from './core/ports/in/salvar-familiar.use-case.port';
import { LISTAR_FAMILIARES_USE_CASE } from './core/ports/in/listar-familiares.use-case.port';
import { FAMILIAR_REPOSITORY } from './core/ports/out/familiar.repository.port';
import { AuthModule } from '../auth/auth.module';

@Module({
  // 👇 MÓDULOS entram sempre aqui no imports!
  imports: [
    TypeOrmModule.forFeature([FamiliarOrmEntity]),
    AuthModule, 
  ],
  controllers: [FamiliarController],
  // 👇 CASOS DE USO E REPOSITÓRIOS entram aqui no providers
  providers: [
    {
      provide: SALVAR_FAMILIAR_USE_CASE,
      useClass: SalvarFamiliarUseCase,
    },
    {
      provide: LISTAR_FAMILIARES_USE_CASE,
      useClass: ListarFamiliaresUseCase,
    },
    {
      provide: FAMILIAR_REPOSITORY,
      useClass: FamiliarRepositoryAdapter,
    },
    // (Note que eu tirei o AuthModule daqui de baixo)
  ],
})
export class FamiliarModule {}