import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async executar(email: string, senhaPlana: string) {
    // 1. Simulação do Banco de Dados:
    // Na vida real, aqui faríamos "usuarioRepo.buscarPorEmail(email)".
    // A senha real é "123456", mas no banco ela estaria salva como esse hash bagunçado:
    const hashSalvoNoBanco = await bcrypt.hash('123456', 10);

    // 2. Verifica o E-mail
    // 1. Simulação do Banco de Dados:
    if (email !== 'admin@teste.com' && email !== 'cliente@teste.com') {
      throw new UnauthorizedException('E-mail não encontrado no sistema.');
    }

    // 3. A Mágica do Bcrypt: Ele compara a senha que o usuário digitou com o hash do banco
    const senhaValida = await bcrypt.compare(senhaPlana, hashSalvoNoBanco);
    
    if (!senhaValida) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    // 4. Se passou, geramos o Crachá (Token JWT)!
    // O "sub" é o Subject (ID do usuário). Usamos o 12345 pra manter compatibilidade com seus testes anteriores!
    const payload = { sub: '12345', email: email, role: 'TITULAR' };
    const token = this.jwtService.sign(payload);

    return {
      sucesso: true,
      mensagem: 'Login realizado com sucesso!',
      token: token,
      usuario: { id: '12345', email: email }
    };
  }
}