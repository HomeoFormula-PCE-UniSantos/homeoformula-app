import { Familiar } from '../../entities/familiar.entity';

export interface ListarFamiliaresUseCasePort {
  executar(clienteId: string): Promise<Familiar[]>;
}

export const LISTAR_FAMILIARES_USE_CASE = Symbol('LISTAR_FAMILIARES_USE_CASE');