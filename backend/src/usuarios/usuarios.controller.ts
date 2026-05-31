import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('login')
  async login(@Body() body: any) {
    // Pega o email e a senha do corpo da requisição e joga para o Service avaliar
    return this.usuariosService.login(body.email, body.senha);
  }
}