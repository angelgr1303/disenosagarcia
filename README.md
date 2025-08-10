# Diseños A.García - Aplicación Web Moderna

## 📋 Descripción

**Diseños A.García** es una aplicación web moderna para la gestión y venta de diseños personalizados. La aplicación ha sido completamente migrada desde PHP/HTML/CSS/JavaScript a una arquitectura moderna utilizando **Spring Boot** (backend) y **Angular** (frontend).

## 🏗️ Arquitectura

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.x
- **Arquitectura**: Domain-Driven Design (DDD)
- **Base de datos**: MySQL 8.0
- **Autenticación**: JWT (JSON Web Tokens)
- **API**: RESTful
- **Puerto**: 8080

### Frontend (Angular)
- **Framework**: Angular 17+
- **UI Framework**: Bootstrap 5
- **Iconos**: FontAwesome
- **Estado**: RxJS
- **Puerto**: 4200

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 17 o superior
- Node.js 18 o superior
- MySQL 8.0
- Maven 3.6+
- Angular CLI

### 1. Clonar el repositorio
```bash
git clone https://github.com/angelgr1303/disenosagarcia.git
cd disenosagarcia
```

### 2. Configurar la base de datos
```bash
# Ejecutar el script de configuración de la base de datos
.\setup-database.ps1
```

### 3. Configurar el backend
```bash
cd backend
# Configurar application.properties con tus credenciales de MySQL
# Ejecutar el backend
mvn spring-boot:run
```

### 4. Configurar el frontend
```bash
cd frontend
# Instalar dependencias
npm install
# Ejecutar el frontend
ng serve
```

### 5. Iniciar la aplicación completa
```bash
# Desde el directorio raíz
.\start-app.ps1
```

## 📁 Estructura del Proyecto

```
disenosagarcia/
├── assets/                    # Imágenes y recursos estáticos
├── backend/                   # Aplicación Spring Boot
│   ├── src/main/java/
│   │   └── com/disenosagarcia/
│   │       ├── domain/        # Entidades y repositorios
│   │       ├── application/   # Servicios y DTOs
│   │       └── infrastructure/# Controladores y configuración
│   └── src/main/resources/
│       └── application.properties
├── database/                  # Scripts de base de datos
├── frontend/                  # Aplicación Angular
│   ├── src/app/
│   │   ├── components/        # Componentes de la UI
│   │   ├── services/          # Servicios de comunicación
│   │   ├── models/           # Modelos de datos
│   │   └── interceptors/     # Interceptores HTTP
│   └── src/assets/           # Recursos del frontend
├── agarcia.sql               # Script de base de datos
├── setup-database.ps1        # Script de configuración
└── start-app.ps1             # Script de inicio
```

## 🔧 Configuración

### Base de Datos
- **Host**: localhost
- **Puerto**: 3306
- **Base de datos**: agarcia
- **Usuario**: root (configurable)
- **Contraseña**: (configurable)

### Backend
- **Puerto**: 8080
- **JWT Secret**: Configurado en application.properties
- **CORS**: Habilitado para desarrollo

### Frontend
- **Puerto**: 4200
- **API URL**: http://localhost:8080/api
- **Proxy**: Configurado para desarrollo

## 👤 Usuarios de Prueba

### Usuario Administrador
- **Usuario**: agarrumm
- **Contraseña**: (consultar documentación)

### Usuario de Prueba
- **Usuario**: aaa
- **Contraseña**: aaa

## 🎨 Características

### Funcionalidades Principales
- ✅ **Autenticación de usuarios** (login/registro)
- ✅ **Catálogo de productos** con filtros y búsqueda
- ✅ **Sistema de favoritos**
- ✅ **Carrito de compras**
- ✅ **Perfil de usuario**
- ✅ **Gestión de pedidos**
- ✅ **Diseño responsive**

### Características Técnicas
- ✅ **Arquitectura DDD** en el backend
- ✅ **Componentes reutilizables** en Angular
- ✅ **Autenticación JWT** segura
- ✅ **API RESTful** documentada
- ✅ **Interceptores HTTP** para manejo de tokens
- ✅ **Estado reactivo** con RxJS
- ✅ **Diseño pixel-perfect** respecto al original

## 🔒 Seguridad

- **Autenticación JWT** con tokens seguros
- **CORS** configurado para desarrollo y producción
- **Validación de datos** en frontend y backend
- **Sanitización de inputs**
- **Protección CSRF** (configurable)

## 🚀 Despliegue

### Desarrollo Local
```bash
# Iniciar backend
cd backend && mvn spring-boot:run

# Iniciar frontend
cd frontend && ng serve
```

### Producción
1. **Backend**: Compilar JAR y desplegar en servidor
2. **Frontend**: Compilar para producción (`ng build --prod`)
3. **Base de datos**: Configurar MySQL en servidor
4. **Proxy**: Configurar nginx/apache para servir la aplicación

## 📝 Documentación

- **Plan de Migración**: `PLAN_MIGRACION_COMPLETO.md`
- **API Documentation**: Disponible en `/api/docs` (cuando esté configurado Swagger)
- **Base de Datos**: `agarcia.sql`

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Ángel García** - [GitHub](https://github.com/angelgr1303)

## 🙏 Agradecimientos

- Spring Boot Team
- Angular Team
- Bootstrap Team
- FontAwesome Team
- Comunidad de desarrolladores

---

**Versión**: 2.0.0 (Migración Completa)  
**Última actualización**: Febrero 2025 