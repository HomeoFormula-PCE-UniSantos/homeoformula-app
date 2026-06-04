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

  async executar(usuarioId: string): Promise<Familiar[]> {
    return this.familiarRepository.buscarPorUsuarioId(usuarioId);
  }
}
