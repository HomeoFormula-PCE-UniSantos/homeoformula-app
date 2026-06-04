import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../auth/core/guards/jwt-auth.guard';
import { FamiliarService } from '../../../familiar.service';

@Controller('familiares')
@UseGuards(JwtAuthGuard)
export class FamiliarController {
  constructor(private readonly familiarService: FamiliarService) {}

  @Post()
  async adicionar(
    @Body() body: { nome: string; parentesco: string; dataNascimento?: string },
    @Request() req: any,
  ) {
    return this.familiarService.adicionar(req.user.id, body);
  }

  @Get()
  async listar(@Request() req: any) {
    return this.familiarService.listarPorUsuario(req.user.id);
  }

  @Delete(':id')
  async remover(@Param('id') id: string, @Request() req: any) {
    return this.familiarService.remover(id, req.user.id);
  }
}
