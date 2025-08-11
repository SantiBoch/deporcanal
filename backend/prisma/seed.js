import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('depor123', 10);
  const alice = await prisma.user.upsert({
    where: { email: 'alice@deporcanal.com' },
    update: {},
    create: { username: 'alice', email: 'alice@deporcanal.com', password }
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@deporcanal.com' },
    update: {},
    create: { username: 'bob', email: 'bob@deporcanal.com', password }
  });

  const prods = [
    { title: 'Bicicleta de carretera', description: 'Cuadro aluminio, talla M', price: 450, condition: 'Usado - Bueno', images: [], category: 'Ciclismo', ownerId: alice.id },
    { title: 'Tabla de snowboard', description: '156 cm, temporada pasada', price: 180, condition: 'Usado - Bueno', images: [], category: 'Snowboard', ownerId: bob.id },
    { title: 'Guantes de boxeo', description: '16oz casi nuevos', price: 35, condition: 'Usado - Muy bueno', images: [], category: 'Boxeo', ownerId: alice.id }
  ];
  for (const p of prods) await prisma.product.create({ data: p });

  await prisma.message.create({ data: { fromId: alice.id, toId: bob.id, text: 'Hola, ¿sigue disponible la tabla?' } });
  await prisma.message.create({ data: { fromId: bob.id, toId: alice.id, text: 'Sí, ¿de dónde eres?', } });

  console.log('Seed OK');
}

main().catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
