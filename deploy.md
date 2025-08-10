# 🚀 Guía de Despliegue - Diseños A.García

## 📋 Requisitos del Servidor

### Software Necesario
- **Java 17** o superior
- **Node.js 18** o superior
- **MySQL 8.0** o superior
- **Nginx** o **Apache** (servidor web)
- **Git**

### Recursos Mínimos
- **CPU**: 2 cores
- **RAM**: 4GB
- **Almacenamiento**: 20GB SSD
- **Ancho de banda**: 100Mbps

## 🔧 Configuración del Servidor

### 1. Instalar Dependencias

#### Ubuntu/Debian
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Java
sudo apt install openjdk-17-jdk -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar MySQL
sudo apt install mysql-server -y

# Instalar Nginx
sudo apt install nginx -y

# Instalar Git
sudo apt install git -y
```

#### CentOS/RHEL
```bash
# Instalar Java
sudo yum install java-17-openjdk-devel -y

# Instalar Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Instalar MySQL
sudo yum install mysql-server -y

# Instalar Nginx
sudo yum install nginx -y

# Instalar Git
sudo yum install git -y
```

### 2. Configurar MySQL

```bash
# Iniciar MySQL
sudo systemctl start mysqld
sudo systemctl enable mysqld

# Configurar seguridad
sudo mysql_secure_installation

# Crear base de datos
sudo mysql -u root -p
```

```sql
CREATE DATABASE agarcia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'agarcia'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON agarcia.* TO 'agarcia'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Clonar el Repositorio

```bash
cd /var/www
sudo git clone https://github.com/angelgr1303/disenosagarcia.git
sudo chown -R $USER:$USER disenosagarcia
cd disenosagarcia
```

## 🏗️ Configuración del Backend

### 1. Configurar application.properties

```bash
cd backend/src/main/resources
nano application.properties
```

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/agarcia?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8&characterSetResults=UTF-8
spring.datasource.username=agarcia
spring.datasource.password=tu_password_seguro

# JPA Configuration
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# JWT Configuration
jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
jwt.expiration=86400000

# CORS Configuration
spring.web.cors.allowed-origins=https://tudominio.com
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*

# Logging
logging.level.com.disenosagarcia=INFO
logging.file.name=logs/backend.log
```

### 2. Compilar y Ejecutar Backend

```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### 3. Crear Servicio Systemd

```bash
sudo nano /etc/systemd/system/disenosagarcia-backend.service
```

```ini
[Unit]
Description=Diseños A.García Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/disenosagarcia/backend
ExecStart=/usr/bin/java -jar target/backend-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable disenosagarcia-backend
sudo systemctl start disenosagarcia-backend
```

## 🎨 Configuración del Frontend

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Configurar Environment

```bash
nano src/environments/environment.prod.ts
```

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tudominio.com/api'
};
```

### 3. Compilar para Producción

```bash
ng build --configuration production
```

### 4. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/disenosagarcia
```

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tudominio.com www.tudominio.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Frontend
    location / {
        root /var/www/disenosagarcia/frontend/dist/frontend/browser;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/disenosagarcia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Configuración SSL

### 1. Instalar Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtener Certificado SSL

```bash
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

### 3. Configurar Renovación Automática

```bash
sudo crontab -e
```

Agregar esta línea:
```
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoreo y Logs

### 1. Configurar Logs

```bash
sudo mkdir -p /var/log/disenosagarcia
sudo chown www-data:www-data /var/log/disenosagarcia
```

### 2. Monitoreo con PM2 (Opcional)

```bash
npm install -g pm2
cd frontend
pm2 start "ng serve --host 0.0.0.0 --port 4200" --name "disenosagarcia-frontend"
pm2 startup
pm2 save
```

## 🔄 Scripts de Despliegue

### 1. Script de Despliegue Automático

```bash
nano deploy.sh
```

```bash
#!/bin/bash

echo "🚀 Iniciando despliegue de Diseños A.García..."

# Actualizar código
git pull origin main

# Backend
echo "📦 Compilando backend..."
cd backend
./mvnw clean package -DskipTests
sudo systemctl restart disenosagarcia-backend

# Frontend
echo "🎨 Compilando frontend..."
cd ../frontend
npm install
ng build --configuration production

# Reiniciar servicios
echo "🔄 Reiniciando servicios..."
sudo systemctl reload nginx

echo "✅ Despliegue completado!"
```

```bash
chmod +x deploy.sh
```

### 2. Script de Backup

```bash
nano backup.sh
```

```bash
#!/bin/bash

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/disenosagarcia"

mkdir -p $BACKUP_DIR

# Backup de la base de datos
mysqldump -u agarcia -p agarcia > $BACKUP_DIR/database_$DATE.sql

# Backup de archivos
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/disenosagarcia

# Limpiar backups antiguos (mantener últimos 7 días)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup completado: $DATE"
```

## 🚨 Troubleshooting

### Problemas Comunes

1. **Backend no inicia**
   ```bash
   sudo systemctl status disenosagarcia-backend
   sudo journalctl -u disenosagarcia-backend -f
   ```

2. **Frontend no carga**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Base de datos no conecta**
   ```bash
   sudo systemctl status mysqld
   mysql -u agarcia -p -e "SHOW DATABASES;"
   ```

4. **SSL no funciona**
   ```bash
   sudo certbot certificates
   sudo certbot renew --dry-run
   ```

## 📞 Soporte

Para soporte técnico:
- **Email**: soporte@disenosagarcia.com
- **Documentación**: [GitHub Wiki](https://github.com/angelgr1303/disenosagarcia/wiki)
- **Issues**: [GitHub Issues](https://github.com/angelgr1303/disenosagarcia/issues)

---

**Versión**: 2.0.0  
**Última actualización**: Febrero 2025
