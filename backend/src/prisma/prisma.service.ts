import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Configura o pool de conexão exigido pelo Prisma 7
    const pool = new pg.Pool({ 
      connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres?schema=public" 
    });
    const adapter = new PrismaPg(pool);

    // Inicializa o construtor injetando o adaptador oficial
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
