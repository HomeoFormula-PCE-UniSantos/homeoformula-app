import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Acesso negado. Token não encontrado.');
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'CHAVE_SUPER_SECRETA_DA_FARMACIA_2026',
      });
      
      // A magia acontece aqui: anexamos os dados do utilizador à requisição!
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}