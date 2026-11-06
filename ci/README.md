# CI/CD

Los workflows ejecutables están en `.github/workflows/main.yml`
(GitHub solo ejecuta workflows desde esa ruta).

## Jobs
| Job | Qué hace | Cuándo corre |
|---|---|---|
| lint | ESLint | push y PR |
| test | Jest, matrix Node 22/24, cobertura | push y PR |
| build | Compilación | después de lint y test |
| deploy-dev | Preview en Vercel | push a dev |
| deploy-prod | Producción en Vercel | push a main |
