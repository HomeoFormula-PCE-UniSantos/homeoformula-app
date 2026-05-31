// Os dados que o Caso de Uso precisa para trabalhar
export interface EnviarReceitaCommand {
  clienteId: string;
  nomeArquivo: string;
  buffer: Buffer; // O conteúdo real do arquivo
  mimetype: string; // Ex: image/png, application/pdf
  observacoes?: string;
}

// O contrato que diz o que o Caso de Uso sabe fazer
export interface EnviarReceitaUseCasePort {
  executar(command: EnviarReceitaCommand): Promise<void>;
}

// O símbolo de injeção de dependência do NestJS
export const ENVIAR_RECEITA_USE_CASE = Symbol('ENVIAR_RECEITA_USE_CASE');