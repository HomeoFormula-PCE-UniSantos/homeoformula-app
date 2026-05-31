import 'multer';
import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile, 
  Body, 
  Inject, 
  BadRequestException,
  Param // Adicionado para capturar o ID na URL
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ENVIAR_RECEITA_USE_CASE, 
  EnviarReceitaUseCasePort 
} from '../../../core/ports/in/enviar-receita.use-case.port';
import { RenovarReceitaUseCasePort, RENOVAR_RECEITA_USE_CASE } from 'src/modules/orcamento/core/ports/in/renovar-receita.use-case.port';// Importação da nova porta de renovação que manterá o padrão arquitetural


@Controller('orcamentos')
export class OrcamentoController {
  constructor(
    @Inject(ENVIAR_RECEITA_USE_CASE)
    private readonly enviarReceitaUseCase: EnviarReceitaUseCasePort,

    // Injeção da nova interface do caso de uso de renovação
    @Inject(RENOVAR_RECEITA_USE_CASE)
    private readonly renovarReceitaUseCase: RenovarReceitaUseCasePort,
  ) {}

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

  // NOVA ROTA: Endpoint para renovação de pedido sem reenvio de arquivo
  @Post('renovar/:id')
  async renovarReceita(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('O ID do pedido original é obrigatório para realizar a renovação.');
    }

    // Encaminha a execução para a porta do domínio
    const resultado = await this.renovarReceitaUseCase.executar({
      orcamentoId: id,
    });

    // 👇 ADICIONE ESTA LINHA AQUI:
    console.log('✅ SUCESSO! O BANCO DEVOLVEU ISSO:', resultado);

    return {
      sucesso: true,
      mensagem: 'Pedido de renovação enviado com sucesso! O farmacêutico já foi notificado.',
      dados: resultado,
    };
  }
}