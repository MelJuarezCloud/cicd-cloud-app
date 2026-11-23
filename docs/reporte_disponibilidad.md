\# Reporte de Disponibilidad y Monitoreo - Fase 3



\*\*Responsable:\*\* Carlos Armando Martínez Chicas (`cam2023`)  

\*\*Proyecto:\*\* `cicd-cloud-app` (Vercel + GitHub Actions + UptimeRobot)  



\## 1. Resumen Ejecutivo

Durante la Fase 3 se validaron los flujos de despliegue continuo, se analizaron las restricciones de reversión en el entorno de alojamiento y se implementó monitoreo sintético externo para garantizar la disponibilidad operativa del servicio.



\## 2. Endpoint de Salud (`/health.json`)

\- \*\*Ruta en repositorio:\*\* `public/health.json`

\- \*\*URL verificada en producción:\*\* `https://cicd-cloud-app.vercel.app/health.json`

\- \*\*Función:\*\* Proveer una respuesta ligera de estado para sondeos automatizados sin comprometer el rendimiento de la aplicación.



\## 3. Validación de Despliegues en GitHub Actions

\- \*\*Escenario 4 (Fallo simulado - Run #82):\*\* Se verificó la interrupción controlada del pipeline ante fallos intencionales en la ejecución manual (`workflow\_dispatch`) sobre `dev`.

\- \*\*Escenario 5 (Despliegue exitoso - Run #83):\*\* Se validó la ejecución completa del workflow en estado verde sobre `dev`, superando las pruebas de humo (\*smoke tests\*).



\## 4. Análisis de Reversión (Rollback) en Vercel

\- \*\*Hallazgo:\*\* Tras auditar el panel del proyecto `cicd-cloud-app`, se comprobó que el plan gratuito (\*\*Hobby\*\*) deshabilita las opciones nativas de \*Instant Rollback\* y \*Promote to Production\* para entornos \*Preview\*.

\- \*\*Estrategia definida:\*\* Ante incidentes en despliegue, la recuperación se ejecuta mediante control de versiones aplicando `git revert` y generando un nuevo ciclo de integración.



\## 5. Monitoreo Externo y Status Page (UptimeRobot)

\- \*\*Monitor HTTP(s):\*\* Configurado con sondeos activos cada 5 minutos hacia `https://cicd-cloud-app.vercel.app/health.json`, manteniendo estado operativo (\*\*Up\*\*).

\- \*\*Página de Estado Pública:\*\* Habilitada para consulta en tiempo real en \[https://stats.uptimerobot.com/Q1qTSi88fy](https://stats.uptimerobot.com/Q1qTSi88fy).

