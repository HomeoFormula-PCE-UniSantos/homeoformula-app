export interface SalvarFamiliarInputDto {
  usuarioId: string;
  nome: string;
  parentesco: string;
  dataNascimento?: string;
}

export interface SalvarFamiliarUseCasePort {
  executar(input: SalvarFamiliarInputDto): Promise<{ sucesso: boolean; id: string }>;
}

export const SALVAR_FAMILIAR_USE_CASE = Symbol('SALVAR_FAMILIAR_USE_CASE');
