import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './usuario.orm-entity';
// ... outros imports que você já tenha aí (Controllers, UseCases, etc)

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioOrmEntity]) // 👇 Linha fundamental aqui!
  ],
  // controllers: [...],
  // providers: [...],
  exports: [TypeOrmModule], // Exportamos para o AuthModule poder procurar usuários depois
})
export class UsuariosModule {}