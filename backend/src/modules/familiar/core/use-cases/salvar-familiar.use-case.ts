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
    // 1. Gera um ID único e seguro para o novo dependente
    const novoId = randomUUID();

    // 2. Monta a nossa entidade pura
    const novoFamiliar = new Familiar(
      novoId,
      input.clienteId,
      input.nome,
      input.parentesco,
      input.dataNascimento
    );

    // 3. Manda o banco de dados salvar
    await this.familiarRepository.salvar(novoFamiliar);

    return { sucesso: true, id: novoId };
  }
}