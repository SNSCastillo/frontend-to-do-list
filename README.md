# To Do List - Frontend

Aplicación de gestión de tareas en tiempo real construida con **Next.js** y **React**.

## 🚀 Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## 📋 Variables de entorno

Crea un archivo `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

## 🏗️ Estructura del proyecto

```
src/
├── app/              # Rutas y páginas
├── components/       # Componentes React
├── context/          # React Context (Auth)
├── hooks/            # Hooks personalizados
├── services/         # Servicios API
├── constants/        # Constantes
└── types/            # Tipos TypeScript
```

## ✨ Características

- ✅ Autenticación con JWT
- ✅ CRUD de tareas
- ✅ Actualizaciones en tiempo real (WebSocket)
- ✅ Componentes modulares y reutilizables
- ✅ TypeScript
- ✅ Tailwind CSS

## 📦 Dependencias principales

- **Next.js 15** - Framework React
- **React 19** - Librería UI
- **Axios** - Cliente HTTP
- **Socket.io** - WebSocket
- **Tailwind CSS** - Estilos

## 🔗 Conexión con Backend

El frontend se conecta a un backend Nest.js

Endpoints principales:
- `POST /auth/login` - Autenticación
- `GET /tareas` - Listar tareas
- `POST /tareas` - Crear tarea
- `PATCH /tareas/:id` - Actualizar tarea
- `DELETE /tareas/:id` - Eliminar tarea
