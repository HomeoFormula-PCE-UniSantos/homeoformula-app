import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProdutosModule } from './produtos/produtos.module';
import { OrcamentoModule } from './modules/orcamento/orcamento.module';
import { FamiliarModule } from './modules/familiar/familiar.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'homeoformula',
      
      // Essa linha mágica faz o NestJS procurar as tabelas sozinho!
      autoLoadEntities: true, 
      
      synchronize: true, // Garante que o TypeORM crie as tabelas automaticamente
    }),
    UsuariosModule,
    ProdutosModule,
    OrcamentoModule,
    FamiliarModule,
    AuthModule,
    // Removi a UsuarioOrmEntity daqui! O autoLoadEntities já cuida dela.
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}