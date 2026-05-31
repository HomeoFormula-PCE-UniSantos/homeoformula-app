import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('orcamentos') // Nome da tabela no PostgreSQL
export class OrcamentoOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'cliente_id' })
  clienteId: string;

  @Column({ name: 'arquivo_receita_url', type: 'text' })
  arquivoReceitaUrl: string;

  @Column({ length: 50 })
  status: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string;
}