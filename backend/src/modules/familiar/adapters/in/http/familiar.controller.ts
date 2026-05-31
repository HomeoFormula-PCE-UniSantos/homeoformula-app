import { Controller, Post, Get, Body, Inject, UseGuards, Request } from '@nestjs/common';
import { SALVAR_FAMILIAR_USE_CASE, SalvarFamiliarUseCasePort } from '../../../core/ports/in/salvar-familiar.use-case.port';
import { LISTAR_FAMILIARES_USE_CASE, ListarFamiliaresUseCasePort } from '../../../core/ports/in/listar-familiares.use-case.port';
import { JwtAuthGuard } from '../../../../auth/core/guards/jwt-auth.guard'; // Importa o nosso segurança

@Controller('familiares')
@UseGuards(JwtAuthGuard) // 👈 Tranca todas as rotas desta classe!
export class FamiliarController {
  constructor(
    @Inject(SALVAR_FAMILIAR_USE_CASE)
    private readonly salvarFamiliarUseCase: SalvarFamiliarUseCasePort,
    
    @Inject(LISTAR_FAMILIARES_USE_CASE)
    private readonly listarFamiliaresUseCase: ListarFamiliaresUseCasePort,
  ) {}

  @Post()
  async salvarFamiliar(@Body() body: any, @Request() req: any) {
    // Agora pegamos o ID dinamicamente do Token de quem está logado!
    const clienteId = req.user.sub; 

    return await this.salvarFamiliarUseCase.executar({
      clienteId: clienteId,
      nome: body.nome,
      parentesco: body.parentesco,
      dataNascimento: body.dataNascimento,
    });
  }

  @Get()
  async listarFamiliares(@Request() req: any) {
    // Identificamos o utilizador sem precisar que ele mande o ID na URL
    const clienteId = req.user.sub;
    return await this.listarFamiliaresUseCase.executar(clienteId);
  }
}