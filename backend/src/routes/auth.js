import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = Router();
const SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'missing' });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { username, email, password: hashed } });
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (e) { res.status(400).json({ error: 'user exists' }); }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: 'invalid' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: 'invalid' });
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET);
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

export default router;
