import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middlewares/auth.js';
const prisma = new PrismaClient();
const router = Router();

router.post('/', auth, async (req, res) => {
  const { toId, text, productId } = req.body;
  if (!toId || !text) return res.status(400).json({ error: 'missing' });
  const msg = await prisma.message.create({ data: {
    fromId: req.user.id, toId: parseInt(toId), text, productId: productId ? parseInt(productId) : null
  }});
  res.json(msg);
});

router.get('/with/:userId', auth, async (req, res) => {
  const other = parseInt(req.params.userId);
  const mine = req.user.id;
  const msgs = await prisma.message.findMany({ where: {
    OR: [ { AND: [{ fromId: mine }, { toId: other }] }, { AND: [{ fromId: other }, { toId: mine }] } ] 
  }, orderBy: { createdAt: 'asc' } });
  res.json(msgs);
});

router.get('/threads', auth, async (req, res) => {
  const mine = req.user.id;
  const msgs = await prisma.message.findMany({ where: { OR: [{ fromId: mine }, { toId: mine }] }, orderBy: { createdAt: 'desc' } });
  const ids = new Set();
  const threads = [];
  for (const m of msgs) {
    const other = m.fromId === mine ? m.toId : m.fromId;
    if (!ids.has(other)) { ids.add(other); threads.push({ userId: other, last: m }); }
  }
  res.json(threads);
});

export default router;
