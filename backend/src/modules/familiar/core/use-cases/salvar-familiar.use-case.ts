import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SalvarFamiliarUseCasePort, SalvarFamiliarInputDto } from '../ports/in/salvar-familiar.use-case.port';
import { FAMILIAR_REPOSITORY, FamiliarRepositoryPort } from '../ports/out/familiar.repository.port';
import { Familiar } from '../entities/familiar.entity';

@Injectable()
export class SalvarFamiliarUseCase implements SalvarFamiliarUseCasePort {
  constructor(
    @Inject(FAMILIAR_REPOSITORY)
    private readonly familiarRepository: FamiliarRepositoryPort,
  ) {}

  async executar(input: SalvarFamiliarInputDto): Promise<{ sucesso: boolean; id: string }> {
    const novoId = randomUUID();
    const novoFamiliar = new Familiar(
      novoId,
      input.usuarioId,
      input.nome,
      input.parentesco,
      input.dataNascimento,
    );
    await this.familiarRepository.salvar(novoFamiliar);
    return { sucesso: true, id: novoId };
  }
}
