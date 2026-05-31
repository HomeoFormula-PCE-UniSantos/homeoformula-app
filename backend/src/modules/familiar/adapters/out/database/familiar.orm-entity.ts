import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('familiares')
export class FamiliarOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  // Essa é a coluna crucial que liga o dependente ao titular da conta
  @Column({ name: 'cliente_id' })
  clienteId: string; 

  @Column()
  nome: string;

  @Column()
  parentesco: string;

  @Column({ name: 'data_nascimento', nullable: true })
  dataNascimento: string;
}