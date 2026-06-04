import 'multer';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Inject,
  Param,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../../../auth/core/guards/jwt-auth.guard';
import { OrcamentoService } from '../../../orcamento.service';
import {
  ENVIAR_RECEITA_USE_CASE,
  EnviarReceitaUseCasePort,
} from '../../../core/ports/in/enviar-receita.use-case.port';

@Controller('orcamentos')
export class OrcamentoController {
  constructor(
    @Inject(ENVIAR_RECEITA_USE_CASE)
    private readonly enviarReceitaUseCase: EnviarReceitaUseCasePort,

    private readonly orcamentoService: OrcamentoService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async listarMeusPedidos(@Request() req: any) {
    return this.orcamentoService.listarPorUsuario(req.user.id);
  }

  @Post('receita')
  @UseInterceptors(FileInterceptor('arquivo'))
  async enviarReceita(
    @UploadedFile() arquivo: Express.Multer.File,
    @Body() body: { clienteId: string; observacoes?: string },
  ) {
    if (!arquivo) {
      throw new BadRequestException('O arquivo da receita é obrigatório.');
    }
    if (!body.clienteId) {
      throw new BadRequestException('A identificação do cliente é obrigatória.');
    }

    await this.enviarReceitaUseCase.executar({
      clienteId: body.clienteId,
      nomeArquivo: arquivo.originalname,
      buffer: arquivo.buffer,
      mimetype: arquivo.mimetype,
      observacoes: body.observacoes,
    });

    return {
      sucesso: true,
      mensagem: 'Receita enviada com sucesso! Nossa equipe analisará e você receberá o orçamento em breve.',
    };
  }

  @Post(':id/renovar')
  @UseGuards(JwtAuthGuard)
  async renovarPedido(@Param('id') id: string, @Request() req: any) {
    return this.orcamentoService.renovarPedido(id, req.user.id);
  }
}
