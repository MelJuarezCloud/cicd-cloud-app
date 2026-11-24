# Reporte de disponibilidad y monitoreo – Fase 3

Proyecto: `cicd-cloud-app` (GitHub Actions + Vercel + UptimeRobot), Grupo SN_#3, ESIT.
Responsables: Carlos Martínez (UptimeRobot, escenarios 4 y 5, análisis de rollback) y Melvin Juárez (workflow de Health Check, documentación).
Fecha: 23/11/2026.

## 1. Resumen
Durante la Fase 3 se agregó un endpoint de salud, una verificación automática después de cada despliegue (smoke test), un workflow programado de Health Check y un monitor externo con página de estado pública.

## 2. Endpoint de salud
- Archivo: `public/health.json`.
- Contenido: `{ "status": "ok", "service": "cicd-cloud-app" }`.
- Se publica en `/health.json` junto con la página y sirve para sondeos automáticos ligeros.

## 3. Smoke test dentro del pipeline
Después de cada `vercel deploy`, el mismo job consulta la URL desplegada y su `/health.json` (con reintentos) y comprueba que la respuesta contenga `"status": "ok"`. Si falla, el job falla.
- Producción: run #81 en `main`, Deploy Producción en verde con `Smoke test correcto` (43 s).
- Desarrollo: run en `dev` posterior al PR #21, Deploy Dev en verde con `Smoke test correcto` (38 s).

## 4. Health Check programado (GitHub Actions)
- Workflow: `.github/workflows/health.yml`, configurado cada 30 minutos y también de forma manual.
- Consulta `$SITE_URL/health.json`, escribe el resumen del resultado y falla si el código HTTP no es 200 o la respuesta no contiene `"status": "ok"`.

Ejecución manual de verificación:

| Dato | Valor |
|---|---|
| Fecha (UTC) | 2026-11-23 19:30:15 |
| URL | `https://cicd-cloud-fkf7ydv5c-cicd-cloud-app.vercel.app/health.json` |
| Código HTTP | 200 |
| Tiempo de respuesta | 0.243 s |
| Duración del run | 8 s (job de verificación: 2 s) |
| Resultado | Success |

Ejecuciones programadas observadas: #3 (23/11/2026, 22:22, 7 s) y #4 (24/11/2026, 09:04, 8 s), ambas en verde. GitHub no garantiza la hora exacta de las ejecuciones programadas y puede retrasarlas u omitirlas en horas de alta carga, así que la frecuencia efectiva fue menor que los 30 minutos configurados. La medición continua la hace UptimeRobot (sección 5).

Nota técnica: el primer intento de publicar este workflow quedó en una carpeta anidada (`.github/workflows/.github/workflows/`) y GitHub no lo listaba en Actions. Se corrigió moviéndolo a `.github/workflows/health.yml` (PR #24, #25 y #26). Ver el informe de fallas.

## 5. Monitoreo externo (UptimeRobot)
- Monitor HTTP(s) con sondeo cada 5 minutos hacia `https://cicd-cloud-app.vercel.app/health.json`. Estado: **Up**.
- Página de estado pública: https://stats.uptimerobot.com/Q1qTSi88fy. Muestra "All systems Operational".
- Métricas observadas el 23/11/2026:
  - Últimas 24 horas: 84.206 % con **1 incidente de 54 s** de caída.
  - Página de estado: 91.463 %.
- Interpretación: el monitor lleva poco tiempo activo, así que un solo incidente de 54 s pesa mucho en el porcentaje. No es una tendencia de disponibilidad; se necesita más tiempo de observación para un valor representativo.

![Monitor en UptimeRobot](evidencias/fase3/fase3_uptimerobot.png)
![Página de estado pública](evidencias/fase3/fase3_statuspage.png)

## 6. Escenarios de despliegue validados
- Escenario 4 (fallo controlado), run #82: ejecución manual (`workflow_dispatch`) en `dev` con `simular_error` activado; el paso "Simular error de despliegue" falla a propósito y el despliegue se interrumpe. Deploy Producción no se ejecuta (ver `matriz_pruebas_cicd.md`).
- Escenario 5 (despliegue exitoso), run #83: misma ejecución manual con `simular_error` desactivado; todos los jobs en verde y smoke test correcto.

## 7. Rollback
En Vercel (plan Hobby), las acciones *Instant Rollback* y *Promote to Production* aparecen deshabilitadas en los despliegues de tipo *Preview*. Por eso la reversión se hace desde el repositorio: se crea un PR de reversión (`git revert`, botón **Revert** de GitHub) y el pipeline despliega de nuevo la versión anterior. La ejecución real de este procedimiento está en la matriz de pruebas (escenario 6).

## 8. Limitaciones
- El Health Check de GitHub consulta la URL de un despliegue concreto, no un dominio estable. Debe actualizarse (variable `SITE_URL`) cuando el dominio de producción esté confirmado en Vercel.
- Las ejecuciones programadas de GitHub pueden retrasarse unos minutos en horas de alta carga.
- No se configuraron alertas por correo; el estado se consulta en Actions y en la página de estado.
