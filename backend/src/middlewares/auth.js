import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'dev_secret';

export default function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'No token' });
  const token = h.split(' ')[1];
  try {
    const data = jwt.verify(token, SECRET);
    req.user = data;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid' });
  }
}
