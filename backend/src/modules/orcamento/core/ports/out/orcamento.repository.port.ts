import { Orcamento } from '../../entities/orcamento.entity';

export interface OrcamentoRepositoryPort {
  salvar(orcamento: Orcamento): Promise<void>;
  buscarPorClienteId(clienteId: string): Promise<Orcamento[]>;
  buscarPorId(id: string): Promise<Orcamento | null>; // 👇 Adicionamos essa linha!
}

export const ORCAMENTO_REPOSITORY = Symbol('ORCAMENTO_REPOSITORY');