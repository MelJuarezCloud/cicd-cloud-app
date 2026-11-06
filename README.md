# CI/CD Cloud Económico para Aplicaciones Web

Proyecto de Estancia Profesional (ESIT). Pipeline de integración y despliegue continuo con GitHub Actions y Vercel, usando solo planes gratuitos.

## Equipo
- Melvin Omar Juárez Rodríguez: Líder de Proyecto y Co-DevOps
- Carlos Armando Martínez Chicas: Ingeniero Cloud y Despliegue
- Tamara Abigail Martínez Lemus: QA / Testing & CI
- Zuleima Beatriz Medina Morales: Riesgos y Documentación Técnica

## Pipeline
El workflow está en `.github/workflows/main.yml` y tiene cinco jobs:


| Job | Función | Cuándo corre |
|---|---|---|
| lint | ESLint | push y PR |
| test | Jest con cobertura, matrix Node 22 y 24 | push y PR |
| build | Compilación | después de lint y test |
| deploy-dev | Preview en Vercel | push a `dev` |
| deploy-prod | Producción en Vercel | push a `main` |

## Flujo de ramas
- `main`: producción.
- `dev`: integración y pruebas.
- `feature/*`: trabajo de cada integrante; se une a `dev` con Pull Request.
- Commits con formato Conventional Commits (`feat:`, `fix:`, `docs:`, `ci:`, `test:`).

## Cómo correr las pruebas
```bash
npm ci
npm run lint
npm test -- --coverage
```

## Estructura
- `src/`: código de la aplicación
- `tests/`: pruebas automatizadas
- `ci/`: documentación del pipeline
- `docs/`: documentación y bitácoras
- `infra/`: configuración del hosting
- `public/`: página inicial

## URLs
- Producción: (completar cuando esté disponible)
- Preview (dev): (completar cuando esté disponible)

## Tecnologías
- Control de versiones: Git y GitHub (`main`, `dev`, `feature/*`)
- Automatización: GitHub Actions
- Calidad: ESLint y Jest
- Hosting: Vercel (plan gratuito)
