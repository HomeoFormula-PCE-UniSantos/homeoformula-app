import { Familiar } from '../../entities/familiar.entity';

export interface FamiliarRepositoryPort {
  salvar(familiar: Familiar): Promise<void>;
  buscarPorUsuarioId(usuarioId: string): Promise<Familiar[]>;
  remover(familiarId: string, usuarioId: string): Promise<void>;
}

export const FAMILIAR_REPOSITORY = Symbol('FAMILIAR_REPOSITORY');
