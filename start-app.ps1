# Script de inicio mejorado para Diseños A.García
Write-Host "🚀 Iniciando Diseños A.García..." -ForegroundColor Green

# Verificar Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version" | ForEach-Object { $_.ToString().Split('"')[1] }
    Write-Host "✅ Java $javaVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Java no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar Maven
try {
    $mavenVersion = mvn -version 2>&1 | Select-String "Apache Maven" | ForEach-Object { $_.ToString().Split(' ')[2] }
    Write-Host "✅ Maven $mavenVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Maven no está instalado. Ejecuta .\install-maven.ps1" -ForegroundColor Red
    exit 1
}

# Verificar Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar Angular CLI
try {
    $ngVersion = ng version 2>&1 | Select-String "Angular CLI" | ForEach-Object { $_.ToString().Split(' ')[2] }
    Write-Host "✅ Angular CLI $ngVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Angular CLI no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar MySQL
$mysqlProcess = Get-Process -Name "mysqld" -ErrorAction SilentlyContinue
if (!$mysqlProcess) {
    Write-Host "⚠️ MySQL no está ejecutándose. Asegúrate de iniciar XAMPP" -ForegroundColor Yellow
} else {
    Write-Host "✅ MySQL está ejecutándose" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔧 Iniciando backend..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "mvn" -ArgumentList "spring-boot:run" -WorkingDirectory "backend"

Write-Host "⏳ Esperando a que el backend esté listo..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host "🌐 Iniciando frontend..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "ng" -ArgumentList "serve" -WorkingDirectory "frontend"

Write-Host ""
Write-Host "✅ Aplicación iniciada" -ForegroundColor Green
Write-Host "   Backend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:4200" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow

# Mantener el script ejecutándose
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} catch {
    Write-Host "Deteniendo aplicaciones..." -ForegroundColor Yellow
    Get-Process | Where-Object { $_.ProcessName -like "*java*" -or $_.ProcessName -like "*node*" } | Stop-Process -Force
} 