import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrcamentoRepositoryPort } from '../../../core/ports/out/orcamento.repository.port';
import { Orcamento } from '../../../core/entities/orcamento.entity';
import { OrcamentoOrmEntity } from './orcamento.orm-entity';

@Injectable()
export class OrcamentoRepositoryAdapter implements OrcamentoRepositoryPort {
  
  constructor(
    @InjectRepository(OrcamentoOrmEntity)
    private readonly orcamentoRepo: Repository<OrcamentoOrmEntity>,
  ) {}

  async salvar(orcamento: Orcamento): Promise<void> {
    // 1. Mapeia a Entidade de Domínio Pura para a Entidade do TypeORM
    const ormEntity = this.orcamentoRepo.create({
      id: orcamento.id,
      clienteId: orcamento.clienteId,
      arquivoReceitaUrl: orcamento.arquivoReceitaUrl, // Atenção ao camelCase aqui
      status: orcamento.status,
      observacoes: orcamento.observacoes,
    });

    // 2. Salva no PostgreSQL
    await this.orcamentoRepo.save(ormEntity);
  }

  async buscarPorClienteId(clienteId: string): Promise<Orcamento[]> {
    // 1. Busca no PostgreSQL
    const ormEntities = await this.orcamentoRepo.find({ 
      where: { clienteId } 
    });

    // 2. Mapeia de volta para a Entidade de Domínio Pura antes de devolver pro Caso de Uso
    return ormEntities.map(
      (orm) => new Orcamento(
        orm.id, 
        orm.clienteId, 
        orm.arquivoReceitaUrl, 
        orm.status as 'PENDENTE' | 'RESPONDIDO', 
        orm.observacoes
      )
    );
  }

  // 👇 NOVA FUNÇÃO ADICIONADA: Busca um pedido específico pelo ID
  async buscarPorId(id: string): Promise<Orcamento | null> {
    const ormEntity = await this.orcamentoRepo.findOne({
      where: { id }
    });

    if (!ormEntity) {
      return null;
    }

    // Mapeia o resultado do banco para a sua entidade pura do domínio
    return new Orcamento(
      ormEntity.id,
      ormEntity.clienteId,
      ormEntity.arquivoReceitaUrl,
      ormEntity.status as 'PENDENTE' | 'RESPONDIDO',
      ormEntity.observacoes
    );
  }
}