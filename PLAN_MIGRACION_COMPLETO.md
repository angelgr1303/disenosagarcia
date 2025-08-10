# PLAN DE MIGRACIÓN COMPLETA: DISEÑOS A.GARCÍA
## De PHP/HTML a Spring Boot + Angular con Arquitectura DDD

---

## 📋 RESUMEN EJECUTIVO

**Objetivo:** Migrar completamente la aplicación web "Diseños A.García" desde una arquitectura PHP/HTML tradicional a una arquitectura moderna usando Spring Boot (backend) y Angular (frontend), manteniendo el diseño visual **idéntico** al original.

**Restricciones críticas:**
- ✅ **EL FRONTEND DEBE SER VISUALMENTE IDÉNTICO AL ORIGINAL**
- ✅ Toda la funcionalidad actual debe mantenerse
- ✅ Arquitectura DDD en el backend
- ✅ Zero downtime durante la migración

---

## 🔍 ANÁLISIS DE LA APLICACIÓN ORIGINAL

### 📁 Estructura Actual Analizada

#### **Frontend Original (HTML/CSS/JS)**
```
- index.html (Página principal con carrusel, productos destacados)
- login.html / registro.html (Autenticación)
- shop.html (Tienda principal con filtros y paginación)
- shop-single.html (Detalle de producto)
- carrito.html (Carrito de compras + favoritos)
- favoritos.html (Lista de favoritos)
- profile.html (Perfil de usuario con pestañas)
- about.html (Página informativa)
- forgot-password.html / reset-password.html (Recuperación)
- html [categorías]/ (Múltiples páginas por categoría)
```

#### **Backend Original (PHP)**
```
- conexionBD.php (Configuración BD)
- login.php / registro.php (Autenticación)
- session_check.php / DatosSesion.php (Gestión sesiones)
- productos.php (API productos)
- carrito.php / Añadir_a_carrito.php (Gestión carrito)
- favoritos.php / Añadir_a_favoritos.php (Gestión favoritos)
- buscarProductos.php (Búsqueda)
- perfil.php / actualizar_perfil.php (Gestión usuario)
- compras.php (Historial compras)
- masVendidos.php (Productos destacados)
- [categorías].php (APIs por categoría)
```

#### **Base de Datos (MySQL)**
```sql
- usuarios (id_usuario, nombre_completo, email, usuario, contrasena)
- categorias (id_categoria, nombre, subcategoria)
- productos (id_producto, nombre, precio, foto, fichero_corel, cantidad_vendidos, id_categoria)
- favoritos (id, id_usuario, id_producto, fecha_agregado)
- carrito (id, id_usuario, id_producto, fecha_agregado)
- compras (id, id_usuario, id_producto, precio_compra, fecha_compra)
```

### 🎨 Características Visuales Críticas
- **Navbar superior:** Contacto + redes sociales
- **Navbar principal:** Logo + navegación + iconos (búsqueda, favoritos, carrito, usuario)
- **Footer:** Links organizados en 3 columnas
- **Colores:**   --primary-color: #b38449; --primary-dark: #875d19;
- **Layout:** Bootstrap grid system
- **Componentes:** Modales, carruseles, tarjetas de producto
- **Funcionalidades JS:** Búsqueda modal, gestión estado botones, paginación

---

## 🏗️ ARQUITECTURA OBJETIVO

### **Backend: Spring Boot con DDD**
```
src/main/java/com/disenosagarcia/
├── domain/
│   ├── model/ (Entidades de dominio)
│   ├── repository/ (Interfaces de repositorio)
│   └── service/ (Servicios de dominio)
├── application/
│   ├── dto/ (Data Transfer Objects)
│   ├── command/ (Comandos CQRS)
│   ├── query/ (Consultas CQRS)
│   ├── handler/ (Handlers de comandos/consultas)
│   └── service/ (Servicios de aplicación)
├── infrastructure/
│   ├── controller/ (REST Controllers)
│   ├── repository/ (Implementaciones JPA)
│   ├── security/ (JWT, autenticación)
│   └── config/ (Configuraciones)
└── BackendApplication.java
```

### **Frontend: Angular con Componentes Reutilizables**
```
src/app/
├── core/ (Guards, interceptors, servicios globales)
├── shared/ (Componentes reutilizables)
│   ├── navbar/
│   ├── footer/
│   ├── search-modal/
│   ├── product-card/
│   └── pagination/
├── features/
│   ├── auth/ (login, registro, reset)
│   ├── home/ (página principal)
│   ├── shop/ (tienda principal)
│   ├── product-detail/
│   ├── cart/
│   ├── favorites/
│   ├── profile/
│   └── categories/ (páginas por categoría)
├── models/ (Interfaces TypeScript)
└── services/ (Servicios HTTP)
```

---

## 📝 PLAN DE EJECUCIÓN DETALLADO

### **FASE 1: CONFIGURACIÓN INICIAL Y ARQUITECTURA BASE** 
*Estimación: 3-4 días*

#### 1.1 Configuración del Backend
- [ ] **Configurar Spring Boot Security con JWT**
  - Implementar JwtAuthenticationFilter
  - Configurar SecurityConfig
  - Crear JwtService para generación/validación tokens

- [ ] **Completar modelos de dominio DDD**
  - Usuario, Producto, Categoria, Favorito, Carrito, Compra
  - Implementar relaciones JPA correctas
  - Agregar validaciones de dominio

- [ ] **Configurar repositorios JPA**
  - Interfaces extending JpaRepository
  - Consultas personalizadas con @Query
  - Configuración de transacciones

#### 1.2 Configuración del Frontend  
- [ ] **Estructura base de Angular**
  - Configurar routing principal
  - Instalar y configurar Bootstrap 5
  - Configurar interceptors HTTP
  - Implementar guards de autenticación

- [ ] **Servicios base**
  - AuthService (login, registro, JWT management)
  - HttpClient configurado con interceptors
  - Error handling global

### **FASE 2: MIGRACIÓN DE AUTENTICACIÓN**
*Estimación: 2-3 días*

#### 2.1 Backend de Autenticación
- [ ] **AuthController**
  ```java
  @PostMapping("/login") // login.php
  @PostMapping("/register") // registro.php
  @PostMapping("/logout") // logout.php
  @GetMapping("/session-check") // session_check.php
  @PostMapping("/forgot-password") // send-reset-link.php
  @PostMapping("/reset-password") // reset-password.php
  ```

- [ ] **AuthService y handlers**
  - LoginCommandHandler
  - RegisterCommandHandler
  - PasswordResetCommandHandler

#### 2.2 Frontend de Autenticación
- [ ] **Componentes de Auth**
  - LoginComponent (idéntico a login.html)
  - RegisterComponent (idéntico a registro.html)
  - ForgotPasswordComponent
  - ResetPasswordComponent

- [ ] **Mantener diseño exacto**
  - Mismos estilos CSS
  - Mismos modales de error/éxito
  - Misma validación y UX

### **FASE 3: MIGRACIÓN DE PRODUCTOS Y CATÁLOGO**
*Estimación: 4-5 días*

#### 3.1 Backend de Productos
- [ ] **ProductController**
  ```java
  @GetMapping("/products") // productos.php
  @GetMapping("/products/{id}") // shop-single
  @GetMapping("/products/featured") // masVendidos.php
  @GetMapping("/products/search") // buscarProductos.php
  @GetMapping("/products/category/{category}") // cruces.php, etc.
  ```

- [ ] **Servicios de Producto**
  - ProductQueryHandler
  - SearchProductsQueryHandler
  - GetFeaturedProductsQueryHandler

#### 3.2 Frontend de Productos
- [ ] **Componentes principales**
  - HomeComponent (index.html)
    - Carrusel de hero con productos
    - Sección de categorías destacadas
    - Productos más vendidos
  - ShopComponent (shop.html)
    - Sidebar de categorías desplegables
    - Grid de productos paginado
    - Filtros y ordenación
  - ProductDetailComponent (shop-single.html)
    - Imagen de producto
    - Información detallada
    - Productos relacionados en carrusel
    - Botones de carrito/favoritos

- [ ] **Componentes reutilizables**
  - ProductCardComponent
  - CategorySidebarComponent
  - PaginationComponent
  - SearchModalComponent

#### 3.3 Páginas de Categorías
- [ ] **Migrar todas las páginas de categoría**
  - html cruces/ → CategoryComponent con parámetro 'cruces'
  - html santos/ → CategoryComponent con parámetro 'santos'
  - html figuras/ → CategoryComponent con parámetro 'figuras'
  - html animales/ → CategoryComponent con parámetro 'animales'
  - html escudos/ → CategoryComponent con parámetro 'escudos'
  - html vehículos/ → CategoryComponent con parámetro 'vehiculos'
  - html adornos/ → CategoryComponent con parámetro 'adornos'
  - html motivos/ → CategoryComponent con parámetro 'motivos'
  - html flores/ → CategoryComponent con parámetro 'flores'

### **FASE 4: MIGRACIÓN DE CARRITO Y FAVORITOS**
*Estimación: 3-4 días*

#### 4.1 Backend de Carrito/Favoritos
- [ ] **CartController**
  ```java
  @GetMapping("/cart") // carrito.php
  @PostMapping("/cart/add") // Añadir_a_carrito.php
  @DeleteMapping("/cart/remove") // Eliminar_de_carrito.php
  @PostMapping("/cart/checkout") // Nueva funcionalidad
  ```

- [ ] **FavoritesController**
  ```java
  @GetMapping("/favorites") // favoritos.php
  @PostMapping("/favorites/add") // Añadir_a_favoritos.php
  @DeleteMapping("/favorites/remove") // Eliminar_de_favoritos.php
  ```

#### 4.2 Frontend de Carrito/Favoritos
- [ ] **CartComponent (carrito.html)**
  - Lista de productos en carrito
  - Resumen de precios
  - Carrusel de favoritos abajo
  - Funcionalidad de pago

- [ ] **FavoritesComponent (favoritos.html)**
  - Grid paginado de favoritos
  - Filtros y ordenación
  - Botones para agregar/quitar carrito

### **FASE 5: MIGRACIÓN DE PERFIL Y GESTIÓN USUARIO**
*Estimación: 2-3 días*

#### 5.1 Backend de Usuario
- [ ] **UserController**
  ```java
  @GetMapping("/profile") // perfil.php
  @PutMapping("/profile") // actualizar_perfil.php
  @GetMapping("/purchases") // compras.php
  @GetMapping("/session-data") // DatosSesion.php
  ```

#### 5.2 Frontend de Usuario
- [ ] **ProfileComponent (profile.html)**
  - Pestañas de "Datos Personales" y "Mis Compras"
  - Formulario de actualización
  - Lista de compras con descarga

### **FASE 6: COMPONENTES GLOBALES Y NAVEGACIÓN**
*Estimación: 3-4 días*

#### 6.1 Componentes Compartidos
- [ ] **NavbarComponent**
  - Top navbar (contacto + redes)
  - Main navbar (logo + menú + iconos)
  - Contador dinámico carrito/favoritos
  - Dropdown de usuario
  - Búsqueda modal

- [ ] **FooterComponent**
  - 3 columnas de links
  - Información de contacto
  - Redes sociales

- [ ] **SearchModalComponent**
  - Modal de búsqueda personalizado
  - Resultados en tiempo real
  - Navegación a productos

#### 6.2 AboutComponent
- [ ] **Migrar about.html**
  - Sección hero verde
  - Información de la empresa
  - Imágenes y contenido exacto

### **FASE 7: ESTILIZACIÓN Y DISEÑO VISUAL**
*Estimación: 4-5 días*

#### 7.1 CSS Global
- [ ] **Migrar todos los estilos**
  - cambios.css → styles.scss global
  - cambios index.css → home.component.scss
  - cambios shop.css → shop.component.scss
  - cambios favoritos.css → favorites.component.scss
  - templatemo.css → variables y mixins SCSS

#### 7.2 Componentes Específicos
- [ ] **Verificar pixel-perfect matching**
  - Colores exactos
  - Espaciados idénticos
  - Tipografías iguales
  - Efectos hover/focus
  - Responsividad

#### 7.3 Assets y Recursos
- [ ] **Migrar assets**
  - assets/img/ → src/assets/images/
  - assets/js/ → integrar funcionalidades en Angular
  - Verificar rutas de imágenes de productos

### **FASE 8: FUNCIONALIDADES AVANZADAS**
*Estimación: 3-4 días*

#### 8.1 Búsqueda y Filtros
- [ ] **Sistema de búsqueda**
  - Búsqueda por nombre, categoría, subcategoría
  - Filtros por precio, popularidad
  - Ordenación múltiple
  - Paginación eficiente

#### 8.2 Gestión de Estado
- [ ] **Estado global**
  - Contador carrito/favoritos en navbar
  - Persistencia de filtros
  - Gestión de autenticación
  - Loading states

#### 8.3 Optimizaciones
- [ ] **Performance**
  - Lazy loading de imágenes
  - Paginación virtual
  - Cache de productos
  - Optimización de consultas

### **FASE 9: TESTING Y VALIDACIÓN**
*Estimación: 2-3 días*

#### 9.1 Testing de Funcionalidad
- [ ] **Pruebas de integración**
  - Todos los flujos de usuario
  - Autenticación completa
  - CRUD de carrito/favoritos
  - Búsqueda y filtros

#### 9.2 Testing Visual
- [ ] **Comparación pixel-perfect**
  - Screenshots de todas las páginas
  - Validación responsive
  - Cross-browser testing
  - Verificación de UX

### **FASE 10: DEPLOYMENT Y MIGRACIÓN**
*Estimación: 2-3 días*

#### 10.1 Preparación Deployment
- [ ] **Configuración producción**
  - Docker containers
  - Configuración BD producción
  - Variables de entorno
  - Proxy reverso

#### 10.2 Migración de Datos
- [ ] **Script de migración**
  - Backup BD actual
  - Migración de usuarios
  - Migración de productos
  - Verificación integridad

---

## 🗂️ MAPEO DETALLADO DE FUNCIONALIDADES

### **Autenticación y Sesiones**
| Original PHP | Nuevo Spring Boot | Descripción |
|--------------|-------------------|-------------|
| `login.php` | `POST /api/auth/login` | Login con JWT |
| `registro.php` | `POST /api/auth/register` | Registro usuario |
| `session_check.php` | `GET /api/auth/session` | Verificar sesión |
| `DatosSesion.php` | `GET /api/user/session-data` | Datos de sesión |
| `logout.php` | `POST /api/auth/logout` | Cerrar sesión |

### **Productos y Catálogo**
| Original PHP | Nuevo Spring Boot | Descripción |
|--------------|-------------------|-------------|
| `productos.php` | `GET /api/products` | Lista productos |
| `productos.php?orden=X` | `GET /api/products?sort=X` | Productos ordenados |
| `masVendidos.php` | `GET /api/products/featured` | Más vendidos |
| `buscarProductos.php` | `GET /api/products/search` | Búsqueda |
| `cruces.php` | `GET /api/products/category/cruces` | Por categoría |

### **Carrito y Favoritos**
| Original PHP | Nuevo Spring Boot | Descripción |
|--------------|-------------------|-------------|
| `carrito.php` | `GET /api/cart` | Ver carrito |
| `Añadir_a_carrito.php` | `POST /api/cart/toggle` | Añadir/quitar |
| `favoritos.php` | `GET /api/favorites` | Ver favoritos |
| `Añadir_a_favoritos.php` | `POST /api/favorites/toggle` | Añadir/quitar |

### **Usuario y Perfil**
| Original PHP | Nuevo Spring Boot | Descripción |
|--------------|-------------------|-------------|
| `perfil.php` | `GET /api/user/profile` | Datos perfil |
| `actualizar_perfil.php` | `PUT /api/user/profile` | Actualizar perfil |
| `compras.php` | `GET /api/user/purchases` | Historial compras |

---

## 🎨 ESPECIFICACIONES DE DISEÑO

### **Colores Principales**
```scss
$primary: #28a745;    // Verde principal
$secondary: #6c757d;  // Gris secundario
$success: #28a745;    // Verde éxito
$danger: #dc3545;     // Rojo error
$warning: #ffc107;    // Amarillo warning
$info: #17a2b8;       // Azul info
$light: #f8f9fa;      // Gris claro
$dark: #343a40;       // Gris oscuro
```

### **Tipografía**
```scss
$font-family-base: 'Roboto', sans-serif;
$font-weight-light: 100;
$font-weight-normal: 400;
$font-weight-bold: 700;
$font-weight-black: 900;
```

### **Componentes Clave**
- **Navbar superior:** Altura 50px, bg-navbar personalizado
- **Navbar principal:** Logo 150x150px, iconos con badges
- **Product cards:** Border-radius 0, sombra sutil
- **Botones:** Border-radius personalizado, colores específicos
- **Modales:** Estilo custom para búsqueda

---

## ⚠️ CONSIDERACIONES CRÍTICAS

### **Restricciones de Diseño**
1. **ZERO cambios visuales** - La aplicación debe verse **idéntica**
2. **Misma UX** - Flujos de usuario exactos
3. **Mismos textos** - Contenido inalterado
4. **Mismas URLs** - Estructura de routing similar

### **Compatibilidad**
1. **Navegadores:** Chrome, Firefox, Safari, Edge
2. **Responsive:** Mobile, tablet, desktop
3. **Base de datos:** Mantener estructura actual
4. **Assets:** Todas las imágenes y archivos existentes

### **Rendimiento**
1. **Carga inicial:** < 3 segundos
2. **Navegación:** Transiciones fluidas
3. **Búsqueda:** Resultados < 1 segundo
4. **Imágenes:** Lazy loading obligatorio

---

## 📊 ESTIMACIÓN TEMPORAL TOTAL

| Fase | Duración | Dependencias |
|------|----------|--------------|
| Fase 1: Configuración | 3-4 días | - |
| Fase 2: Autenticación | 2-3 días | Fase 1 |
| Fase 3: Productos | 4-5 días | Fase 1 |
| Fase 4: Carrito/Favoritos | 3-4 días | Fase 2, 3 |
| Fase 5: Perfil Usuario | 2-3 días | Fase 2 |
| Fase 6: Navegación Global | 3-4 días | Fase 2, 3 |
| Fase 7: Estilización | 4-5 días | Todas anteriores |
| Fase 8: Funcionalidades | 3-4 días | Todas anteriores |
| Fase 9: Testing | 2-3 días | Todas anteriores |
| Fase 10: Deployment | 2-3 días | Todas anteriores |

**TOTAL ESTIMADO: 28-38 días laborables (5.6-7.6 semanas)**

---

## 🚀 CRITERIOS DE ÉXITO

### **Funcionales**
- [ ] Todas las funcionalidades originales operativas
- [ ] Autenticación JWT funcionando
- [ ] CRUD completo de carrito/favoritos
- [ ] Búsqueda y filtros operativos
- [ ] Gestión de usuario completa

### **Visuales**
- [ ] **100% identidad visual** con la aplicación original
- [ ] Responsive design perfecto
- [ ] Todos los efectos CSS replicados
- [ ] Assets y recursos migrados

### **Técnicos**
- [ ] Arquitectura DDD implementada
- [ ] APIs REST documentadas
- [ ] Frontend Angular con componentes reutilizables
- [ ] Performance optimizada
- [ ] Deployment automatizado

---

*Este plan garantiza una migración completa y exitosa manteniendo la identidad visual exacta de la aplicación original mientras moderniza completamente la arquitectura técnica.* 