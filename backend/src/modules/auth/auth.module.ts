import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './adapters/in/http/auth.controller';
import { LoginUseCase } from './core/use-cases/login.use-case';

@Module({
  imports: [
    JwtModule.register({
      secret: 'CHAVE_SUPER_SECRETA_DA_FARMACIA_2026', 
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase],
  exports: [JwtModule], // 👈 Adicionamos esta linha para partilhar o motor JWT!
})
export class AuthModule {}