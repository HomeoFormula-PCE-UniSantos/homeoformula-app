import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async login(email: string, senha: string) {
    // 1. Procura o usuário pelo email digitado
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    // 2. Se não achar o email ou a senha for diferente, dá erro 401 (Não autorizado)
    if (!usuario || usuario.senha !== senha) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // 3. Se deu tudo certo, separamos a senha (para não devolver pro Frontend) e retornamos o resto
    const { senha: _, ...dadosSeguros } = usuario;
    return dadosSeguros;
  }
}