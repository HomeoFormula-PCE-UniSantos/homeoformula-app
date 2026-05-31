import { Familiar } from '../../entities/familiar.entity';

export interface FamiliarRepositoryPort {
  salvar(familiar: Familiar): Promise<void>;
  buscarPorClienteId(clienteId: string): Promise<Familiar[]>;
}

export const FAMILIAR_REPOSITORY = Symbol('FAMILIAR_REPOSITORY');