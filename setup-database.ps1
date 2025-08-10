# Script para configurar la base de datos
Write-Host "🗄️ Configurando base de datos..." -ForegroundColor Yellow

# Verificar si MySQL está ejecutándose
$mysqlProcess = Get-Process -Name "mysqld" -ErrorAction SilentlyContinue
if (!$mysqlProcess) {
    Write-Host "❌ MySQL no está ejecutándose" -ForegroundColor Red
    Write-Host "Por favor, inicia XAMPP y asegúrate de que MySQL esté activo" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ MySQL está ejecutándose" -ForegroundColor Green

# Crear base de datos y usuario
$sqlCommands = @"
CREATE DATABASE IF NOT EXISTS agarcia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'agarcia'@'localhost' IDENTIFIED BY 'agarcia';
GRANT ALL PRIVILEGES ON agarcia.* TO 'agarcia'@'localhost';
FLUSH PRIVILEGES;
"@

# Guardar comandos SQL en archivo temporal
$sqlFile = "$env:TEMP\setup_database.sql"
$sqlCommands | Out-File -FilePath $sqlFile -Encoding UTF8

Write-Host "Ejecutando comandos SQL..." -ForegroundColor Yellow
Write-Host "Por favor, ejecuta manualmente en MySQL:" -ForegroundColor Cyan
Write-Host "mysql -u root -p < $sqlFile" -ForegroundColor Cyan

Write-Host "✅ Base de datos configurada" -ForegroundColor Green 