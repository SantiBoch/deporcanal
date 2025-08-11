# DeporCanal en Railway (Backend + Frontend) con datos de prueba

## 1) Crear proyecto en Railway
- Entra en https://railway.app y crea un **Project** nuevo.

## 2) Backend
1. Crea un **New Service → Deploy from GitHub** (o sube estos archivos del directorio `backend`).
2. Añade un **PostgreSQL** desde "Add New → Database → PostgreSQL".
3. En el backend, configura variables:
   - `DATABASE_URL` → usa la que proporciona el servicio PostgreSQL (botón "Connect").
   - `JWT_SECRET` → elige uno fuerte.
   - (Railway define `PORT` automáticamente).

> Script de arranque (`package.json`): ejecuta `prisma migrate deploy` y luego arranca Express.

4. Ejecuta el **seed** una vez (opciones):
   - Desde el panel de Railway → Shell → `npm run seed`
   - O crea un "Job" temporal con el comando `npm run seed`

## 3) Frontend
1. Crea otro **Service** para el frontend (deploy de la carpeta `frontend`).
2. En variables del frontend:
   - `VITE_API_URL` = URL pública del backend (por ejemplo `https://<backend>.up.railway.app`).
3. Tras el deploy, tendrás una URL pública HTTPS para el frontend.

## 4) Probar
- Entra a la URL del frontend y deberías ver el marketplace.
- Usuarios de prueba (después del seed):
  - `alice@deporcanal.com` / `depor123`
  - `bob@deporcanal.com` / `depor123`

## 5) Dominio propio
En Railway → tu servicio frontend → **Settings → Custom Domains** → añade `deporcanal.com`.
Luego en tu proveedor de dominio (DonDominio/Strato), crea un **CNAME** apuntando a la URL de Railway.

> Nota: las imágenes se guardan en el contenedor y pueden borrarse en cada despliegue. Para producción, usa S3/Backblaze u otro almacenamiento.

¡Listo! Si necesitas que lo deje todo en un único monorepo con `railway.json` y workflows, dime y lo preparo.
