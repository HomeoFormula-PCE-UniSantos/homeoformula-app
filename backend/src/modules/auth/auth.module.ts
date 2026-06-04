import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './adapters/in/http/auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './core/guards/jwt.strategy';
import { UsuariosModule } from '../../usuarios/usuarios.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'CHAVE_SUPER_SECRETA_DA_FARMACIA_2026',
      signOptions: { expiresIn: '1d' },
    }),
    UsuariosModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService, JwtStrategy],
})
export class AuthModule {}
