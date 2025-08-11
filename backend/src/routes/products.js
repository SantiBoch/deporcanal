import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import auth from '../middlewares/auth.js';

const prisma = new PrismaClient();
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});
const upload = multer({ storage });

router.post('/', auth, upload.array('images', 6), async (req, res) => {
  const { title, description, price, condition, category } = req.body;
  const images = (req.files || []).map(f => `/uploads/${f.filename}`);
  const p = await prisma.product.create({ data: {
    title, description, price: parseFloat(price || 0), condition, category,
    images, ownerId: req.user.id
  }});
  res.json(p);
});

router.get('/', async (req, res) => {
  const q = req.query.q || undefined;
  const where = q ? { OR: [{ title: { contains: q } }, { description: { contains: q } }] } : {};
  const products = await prisma.product.findMany({ where, include: { owner: true }, orderBy: { createdAt: 'desc' } });
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const p = await prisma.product.findUnique({ where: { id }, include: { owner: true } });
  res.json(p);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return res.status(404).json({ error: 'no' });
  // owner check should be done with auth; omitted here for demo simplicity
  await prisma.product.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
