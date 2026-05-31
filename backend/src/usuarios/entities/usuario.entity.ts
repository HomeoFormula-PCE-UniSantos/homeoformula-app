import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Aqui definimos os dois tipos de usuários possíveis
export enum RoleUsuario {
  CLIENTE = 'CLIENTE',
  ADMIN = 'ADMIN',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string; // Mais pra frente vamos criptografar isso!

  @Column({
    type: 'enum',
    enum: RoleUsuario,
    default: RoleUsuario.CLIENTE, // Todo mundo nasce como cliente por padrão
  })
  perfil: RoleUsuario;

  @CreateDateColumn()
  criadoEm: Date;
}