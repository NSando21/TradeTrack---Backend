# Backend PI - API con NestJS

Backend API construido con NestJS, TypeScript y PostgreSQL.

## 🚀 Tecnologías

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **PostgreSQL** - Base de datos
- **TypeORM** - ORM para TypeScript
- **JWT** - Autenticación (próximamente)

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- PostgreSQL
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Backend-PI
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env basado en .env.example
   cp .env.example .env
   ```
   
   Editar el archivo `.env` con tus configuraciones:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=tu_password
   DB_NAME=backend_pi
   ```

4. **Configurar la base de datos**
   - Crear una base de datos PostgreSQL llamada `backend_pi`
   - Las tablas se crearán automáticamente al ejecutar la aplicación

## 🏃‍♂️ Ejecutar la aplicación

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## 📚 Endpoints disponibles

### Base
- `GET /api` - Mensaje de bienvenida
- `GET /api/health` - Estado de la aplicación

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PATCH /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## 🏗️ Estructura del proyecto

```
src/
├── config/           # Configuraciones
│   └── database.config.ts
├── modules/          # Módulos de la aplicación
│   └── users/        # Módulo de usuarios
│       ├── user.entity.ts
│       ├── users.controller.ts
│       ├── users.service.ts
│       └── users.module.ts
├── common/           # Código compartido
├── database/         # Configuración de base de datos
├── app.controller.ts # Controlador principal
├── app.service.ts    # Servicio principal
├── app.module.ts     # Módulo principal
└── main.ts          # Punto de entrada
```

## 🔧 Scripts disponibles

- `npm run start` - Iniciar en modo producción
- `npm run start:dev` - Iniciar en modo desarrollo con hot reload
- `npm run build` - Compilar el proyecto
- `npm run test` - Ejecutar tests
- `npm run lint` - Ejecutar linter

## 📝 Próximas características

- [ ] Autenticación JWT
- [ ] Validación de datos con class-validator
- [ ] Documentación con Swagger
- [ ] Tests unitarios y e2e
- [ ] Logging con Winston
- [ ] Rate limiting
- [ ] Caché con Redis

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. 