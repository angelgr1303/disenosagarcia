# Script de inicio rápido para Diseños A.García
Write-Host "🚀 Iniciando Diseños A.García..." -ForegroundColor Green

# Verificar si MySQL está ejecutándose
Write-Host "📊 Verificando MySQL..." -ForegroundColor Yellow
$mysqlProcess = Get-Process -Name "mysqld" -ErrorAction SilentlyContinue
if (-not $mysqlProcess) {
    Write-Host "❌ MySQL no está ejecutándose. Iniciando XAMPP..." -ForegroundColor Red
    Start-Process "C:\xampp\xampp-control.exe"
    Write-Host "⏳ Esperando 10 segundos para que MySQL se inicie..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
} else {
    Write-Host "✅ MySQL está ejecutándose" -ForegroundColor Green
}

# Iniciar Backend
Write-Host "🔧 Iniciando Backend (Spring Boot)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\mvnw.cmd spring-boot:run" -WindowStyle Normal

# Esperar un momento para que el backend se inicie
Write-Host "⏳ Esperando 15 segundos para que el backend se inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Iniciar Frontend
Write-Host "🎨 Iniciando Frontend (Angular)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; ng serve" -WindowStyle Normal

# Esperar un momento
Start-Sleep -Seconds 5

Write-Host "✅ Aplicación iniciada!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de acceso:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:4200" -ForegroundColor White
Write-Host "  Backend API: http://localhost:8080/api" -ForegroundColor White
Write-Host ""
Write-Host "👤 Usuarios de prueba:" -ForegroundColor Cyan
Write-Host "  Usuario: aaa" -ForegroundColor White
Write-Host "  Contraseña: aaa" -ForegroundColor White
Write-Host ""
Write-Host "📝 Nota: La aplicación puede tardar unos minutos en estar completamente disponible." -ForegroundColor Yellow
