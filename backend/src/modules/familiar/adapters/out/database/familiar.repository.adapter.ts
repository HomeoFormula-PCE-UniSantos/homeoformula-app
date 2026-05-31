import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamiliarRepositoryPort } from '../../../core/ports/out/familiar.repository.port';
import { Familiar } from '../../../core/entities/familiar.entity';
import { FamiliarOrmEntity } from './familiar.orm-entity';

@Injectable()
export class FamiliarRepositoryAdapter implements FamiliarRepositoryPort {
  constructor(
    @InjectRepository(FamiliarOrmEntity)
    private readonly familiarRepo: Repository<FamiliarOrmEntity>,
  ) {}

  async salvar(familiar: Familiar): Promise<void> {
    // 1. Converte a entidade de domínio para a entidade do TypeORM
    const ormEntity = this.familiarRepo.create({
      id: familiar.id,
      clienteId: familiar.clienteId,
      nome: familiar.nome,
      parentesco: familiar.parentesco,
      dataNascimento: familiar.dataNascimento,
    });

    // 2. Salva no banco de dados
    await this.familiarRepo.save(ormEntity);
  }

  async buscarPorClienteId(clienteId: string): Promise<Familiar[]> {
    // 1. Busca todos os dependentes de um cliente específico
    const ormEntities = await this.familiarRepo.find({ 
      where: { clienteId } 
    });

    // 2. Converte de volta para a nossa entidade pura
    return ormEntities.map(
      (orm) => new Familiar(
        orm.id,
        orm.clienteId,
        orm.nome,
        orm.parentesco,
        orm.dataNascimento
      )
    );
  }
}