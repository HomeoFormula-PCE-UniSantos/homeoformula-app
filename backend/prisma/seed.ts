import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as bcrypt from 'bcryptjs';

async function main() {
  const pool = new pg.Pool({
    connectionString:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5433/homeoformula?schema=public',
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter } as any);

  const senhaAdmin = await bcrypt.hash('123456', 10);
  const senhaCliente = await bcrypt.hash('123456', 10);

  await prisma.usuario.upsert({
    where: { email: 'admin@teste.com' },
    update: { senha: senhaAdmin, role: 'ADMIN' },
    create: { email: 'admin@teste.com', senha: senhaAdmin, role: 'ADMIN' },
  });

  await prisma.usuario.upsert({
    where: { email: 'cliente@teste.com' },
    update: { senha: senhaCliente, role: 'CLIENTE' },
    create: { email: 'cliente@teste.com', senha: senhaCliente, role: 'CLIENTE' },
  });

  console.log('✅ Seed concluído: admin@teste.com (ADMIN) e cliente@teste.com (CLIENTE) — senha: 123456');

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
