# Configuración inicial de GitHub Actions

## Archivo del workflow
`.github/workflows/main.yml` (GitHub solo ejecuta workflows desde esa ruta).

## Triggers
- `push` a `main` y `dev`
- `pull_request` hacia `dev`

## Jobs
| Job | Función | Cuándo corre |
|---|---|---|
| lint | ESLint | push y PR |
| test | Jest, matrix Node 22 y 24, con cobertura | push y PR |
| build | Compilación | después de lint y test |
| deploy-dev | Despliegue Preview en Vercel | push a `dev` |
| deploy-prod | Despliegue a producción en Vercel | push a `main` |

## Optimizaciones
- Caché de npm con `cache: npm` en `actions/setup-node`.
- Instalación reproducible con `npm ci` y `package-lock.json`.
- Reintentos (3 intentos) en los pasos de deploy.
- `concurrency` para cancelar ejecuciones duplicadas.

## Secretos y permisos
| Secreto | Para qué sirve | Alcance | Dónde se usa |
|---|---|---|---|
| `VERCEL_TOKEN` | Autenticar el CLI de Vercel | Token de cuenta con acceso al equipo del proyecto | deploy-dev y deploy-prod |
| `VERCEL_ORG_ID` | Identifica la organización en Vercel | Identificador, no da acceso por sí solo | deploy-dev y deploy-prod |
| `VERCEL_PROJECT_ID` | Identifica el proyecto en Vercel | Identificador | deploy-dev y deploy-prod |

- El workflow declara `permissions: contents: read` (mínimo privilegio).
- Los secretos se leen desde `secrets` y nunca se escriben en el código ni se imprimen en logs.
- Evidencia: captura de Settings → Secrets and variables → Actions (solo se ven los nombres).

## Evidencias
- PR #2: checks en verde (Lint, Test Node 22, Test Node 24, Build).
- Run #14 en `dev`: Deploy Dev exitoso.
