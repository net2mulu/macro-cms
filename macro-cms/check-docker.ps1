# Check Docker containers and logs
Write-Host "=== Checking Docker Containers ===" -ForegroundColor Cyan
docker ps -a

Write-Host "`n=== Strapi Container Logs (last 50 lines) ===" -ForegroundColor Cyan
docker compose logs strapi --tail 50

Write-Host "`n=== Postgres Container Logs (last 20 lines) ===" -ForegroundColor Cyan
docker compose logs strapiDB --tail 20

Write-Host "`n=== Container Status ===" -ForegroundColor Cyan
docker compose ps
