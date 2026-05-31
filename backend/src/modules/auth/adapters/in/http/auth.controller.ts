import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../../core/use-cases/login.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() body: any) {
    return await this.loginUseCase.executar(body.email, body.senha);
  }
}