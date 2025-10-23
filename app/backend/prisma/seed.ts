import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.org.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: { id: '00000000-0000-0000-0000-000000000001', name: 'Disagua' }
  });

  const hash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email_orgId: { email: 'admin@disagua.local', orgId: org.id } },
    update: {},
    create: {
      email: 'admin@disagua.local',
      orgId: org.id,
      passwordHash: hash,
      role: Role.admin
    }
  });

  console.log({ org, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
