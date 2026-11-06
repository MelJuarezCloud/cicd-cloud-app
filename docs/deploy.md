# Despliegue automático en Vercel


## Resumen
Plataforma: Vercel (plan Hobby, gratuito)
Proyecto: cicd-cloud-app
Despliegue controlado únicamente por GitHub Actions (.github/workflows/main.yml). La integración nativa de Vercel con GitHub está desconectada. [Confirmar con Carlos]
## Flujo de despliegue
| Evento | Jobs que corren | Resultado |
|---|---|---|
| Pull Request hacia dev o main | lint, test (Node 22 y 24), build | Solo validación; no despliega |
| Push a dev | lint, test, build, deploy-dev | Despliegue Preview |
| Push a main | lint, test, build, deploy-prod | Despliegue a producción |


El deploy solo se ejecuta si lint, test y build terminaron en verde.


## Pasos que ejecuta el workflow
1. vercel pull --yes --environment=preview|production
2. vercel build (con --prod en producción)
3. vercel deploy --prebuilt (con --prod en producción), con hasta 3 reintentos y 10 segundos de espera entre intentos
4. La URL resultante se registra en el resumen del job (GITHUB_STEP_SUMMARY)


## Secretos
Configurados en GitHub (Settings > Secrets and variables > Actions). Solo se documentan los nombres:
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
## Primer despliegue funcional
Fecha: 3 de noviembre de 2026
Run: #50, commit 107d2f7
Resultado: Lint, Test (Node 22 y 24), Build y Deploy Dev en verde (Deploy Dev: 24 s)
URL de Preview: https://cicd-cloud-mwogemt8n-cicd-cloud-app.vercel.app
Protección: Vercel Authentication desactivada para que la URL sea pública
Evidencia: [PENDIENTE: capturas del run #50, del dashboard y de la página abierta en incógnito]
## Problemas durante el despliegue y soluciones
| Problema | Causa | Solución |
|---|---|---|
| La URL respondía 404 | La app no tenía ninguna página | Se agregó public/index.html (PR #5) |
| La URL de Preview pedía inicio de sesión | Deployment Protection de Vercel activa por defecto | Se desactivó Vercel Authentication |
| Deploy Dev colgado en Building… más de 12 minutos | [PENDIENTE: causa confirmada por Carlos] | Se desconectó la integración de Vercel con GitHub y el despliegue quedó solo en Actions (run #50) |
| Despliegues de Vercel con estado Blocked | [PENDIENTE: motivo confirmado por Carlos] | Dejaron de generarse al desconectar la integración |


## Producción
URL de producción: [PENDIENTE]
Condición: se publica al hacer merge de dev a main (job deploy-prod). Falta resolver los conflictos entre ramas y ejecutar el primer despliegue.
## Evidencias
Run #50 de GitHub Actions con todos los jobs en verde
Captura de Settings > Deployment Protection
Captura del dashboard de Vercel (Deployments)
Captura de la página abierta en una ventana de incógnito
