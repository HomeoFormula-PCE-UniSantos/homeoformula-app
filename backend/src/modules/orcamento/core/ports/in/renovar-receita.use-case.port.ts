export const RENOVAR_RECEITA_USE_CASE = Symbol('RENOVAR_RECEITA_USE_CASE');

export interface RenovarReceitaInputDto {
  orcamentoId: string;
}

export interface RenovarReceitaUseCasePort {
  executar(input: RenovarReceitaInputDto): Promise<any>;
}