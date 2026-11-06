# Infraestructura de hosting

- Plataforma: Vercel (plan gratuito)
- Proyecto: cicd-cloud-app
- Rama de producción: main
- Rama de pruebas: dev (despliegue Preview)

## Variables de entorno
Nombres únicamente, nunca valores:
- VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID (secretos de GitHub)

## Limitaciones del plan gratuito
- Ancho de banda limitado
- Posible cold start en funciones serverless
- Despliegues de Preview protegidos por defecto (Deployment Protection)
