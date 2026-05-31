import { Injectable, Inject } from '@nestjs/common';
import { ListarFamiliaresUseCasePort } from '../ports/in/listar-familiares.use-case.port';
import { FAMILIAR_REPOSITORY, FamiliarRepositoryPort } from '../ports/out/familiar.repository.port';
import { Familiar } from '../entities/familiar.entity';

@Injectable()
export class ListarFamiliaresUseCase implements ListarFamiliaresUseCasePort {
  constructor(
    @Inject(FAMILIAR_REPOSITORY)
    private readonly familiarRepository: FamiliarRepositoryPort,
  ) {}

  async executar(clienteId: string): Promise<Familiar[]> {
    // Repassa a chamada para o nosso Adapter do banco de dados (que já criamos antes!)
    return this.familiarRepository.buscarPorClienteId(clienteId);
  }
}