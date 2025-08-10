# 🌐 Configuración de GitHub Pages (Alternativa Temporal)

## ⚠️ Importante

**GitHub Pages solo puede servir contenido estático**, por lo que solo podremos desplegar el frontend. El backend necesitará ser desplegado en un servidor separado.

## 🚀 Configuración Rápida

### 1. Compilar el Frontend para Producción

```bash
cd frontend
npm install
ng build --configuration production
```

### 2. Configurar GitHub Pages

1. Ve a tu repositorio: https://github.com/angelgr1303/disenosagarcia
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. En **Branch**, selecciona **main** y **/(root)**
5. Haz clic en **Save**

### 3. Crear Script de Despliegue Automático

```bash
# Crear archivo .github/workflows/deploy.yml
mkdir -p .github/workflows
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm install
        
    - name: Build
      run: |
        cd frontend
        npm run build -- --configuration production
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/dist/frontend/browser
```

### 4. Configurar Base Href

En `frontend/angular.json`, asegúrate de que el `baseHref` esté configurado:

```json
{
  "projects": {
    "frontend": {
      "architect": {
        "build": {
          "options": {
            "baseHref": "/disenosagarcia/"
          }
        }
      }
    }
  }
}
```

## 🔧 Configuración del Backend

Para que el frontend pueda comunicarse con el backend, necesitarás:

### Opción 1: Backend en Servidor Separado
- Desplegar el backend en un servidor (Heroku, Railway, etc.)
- Actualizar la URL de la API en el frontend

### Opción 2: Backend Local
- Ejecutar el backend localmente en `localhost:8080`
- Configurar CORS para permitir `https://angelgr1303.github.io`

## 📝 Pasos para el Despliegue Completo

### 1. Desplegar Backend en Railway (Gratis)

1. Ve a [Railway](https://railway.app/)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno:
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://tu-mysql-url
   SPRING_DATASOURCE_USERNAME=tu-usuario
   SPRING_DATASOURCE_PASSWORD=tu-password
   JWT_SECRET=tu-jwt-secret
   ```

### 2. Actualizar Frontend

En `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-url.railway.app/api'
};
```

### 3. Configurar Base de Datos

Usar un servicio como:
- **PlanetScale** (gratis)
- **Railway MySQL** (gratis)
- **Clever Cloud** (gratis)

## 🌐 URLs Finales

- **Frontend**: https://angelgr1303.github.io/disenosagarcia/
- **Backend**: https://tu-backend-url.railway.app/api

## ⚡ Alternativa Rápida: Netlify

### 1. Conectar Repositorio

1. Ve a [Netlify](https://netlify.com/)
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Build command**: `cd frontend && npm install && ng build --configuration production`
   - **Publish directory**: `frontend/dist/frontend/browser`

### 2. Configurar Variables de Entorno

En Netlify, configura:
```
API_URL=https://tu-backend-url.railway.app/api
```

## 🔒 Consideraciones de Seguridad

1. **CORS**: Configurar el backend para permitir tu dominio
2. **HTTPS**: Usar siempre HTTPS en producción
3. **Variables de Entorno**: No exponer credenciales en el código

## 📞 Soporte

Si necesitas ayuda con el despliegue:
- **GitHub Issues**: https://github.com/angelgr1303/disenosagarcia/issues
- **Documentación**: Revisa `deploy.md` para despliegue completo

---

**Nota**: Esta es una solución temporal. Para un despliegue profesional, sigue la guía completa en `deploy.md`.
