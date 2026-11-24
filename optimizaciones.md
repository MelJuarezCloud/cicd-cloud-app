# Optimizaciones del pipeline – Fase 3

Proyecto: CI/CD Cloud Económico para Aplicaciones Web (Grupo SN_#3, ESIT).
Responsable: Melvin Juárez. Fecha: 23/11/2026.

## 1. Objetivo
Reducir el trabajo innecesario del pipeline, mantener los tiempos bajo control y dejar evidencia verificable (artefactos, smoke test y health check) sin salir del plan gratuito.

## 2. Optimizaciones aplicadas

| # | Optimización | Dónde | Efecto |
|---|---|---|---|
| 1 | **Cache de dependencias npm** (`actions/setup-node` con `cache: npm`) | lint, test, build y, desde la Fase 3, deploy-dev y deploy-prod | Evita descargar de nuevo las dependencias en cada job. En los jobs de deploy el efecto es pequeño, porque la Vercel CLI se instala de forma global; se aplicó por consistencia. |
| 2 | **`paths-ignore` en `push`** (`docs/**` y `**.md`) | `on.push` de `main.yml` | Un push que solo cambia documentación ya no ejecuta los 6 jobs. Antecedente: la fusión del PR #18 (run #73), que solo agregó documentación, ejecutó el pipeline completo. |
| 3 | **Ejecución en paralelo** de lint y test (matriz Node 22/24); `build` espera a ambos con `needs` | `main.yml` | El tiempo de calidad depende del job más lento, no de la suma. Si algo falla, no se construye ni se despliega. |
| 4 | **`concurrency` con `cancel-in-progress`** | `main.yml` | Un push nuevo cancela el run anterior de la misma rama. |
| 5 | **`timeout-minutes`** (10 min en calidad y build, 15 en deploy) | todos los jobs | Un job colgado no consume minutos indefinidamente. |
| 6 | **Artefactos** (`dist` y `cobertura-node-22/24`, retención 14 días) | test y build | No reducen el tiempo; dan trazabilidad del build y del reporte de cobertura de cada run. |

Decisión de diseño: `paths-ignore` se aplica **solo a `push`**, no a `pull_request`. Los checks de Lint, Test y Build son obligatorios en la protección de ramas; si un PR no los ejecutara, nunca los reportaría y quedaría bloqueado.

## 3. Disparadores (triggers)

| Evento | Qué ejecuta |
|---|---|
| `pull_request` hacia `dev` o `main` | lint, test, build (validación, sin despliegue) |
| `push` a `dev` (excepto cambios solo en `docs/` o `*.md`) | lint, test, build, deploy-dev + smoke test |
| `push` a `main` (excepto cambios solo en `docs/` o `*.md`) | lint, test, build, deploy-prod + smoke test |
| `workflow_dispatch` en `dev` | pipeline completo; con `simular_error` falla a propósito el despliegue |
| `schedule` cada 30 min (`health.yml`) | health check de producción |
| `workflow_dispatch` (`health.yml`) | health check manual |

## 4. Comparación antes / después

Línea base de la Fase 2 (runs #65, #73 y #75, promedio) frente a ejecuciones de la Fase 3.

| Job | Antes (Fase 2) | Después (Fase 3) | Observación |
|---|---|---|---|
| Lint | 13 s | 8 s (dev), 9 s (PR #21), 13 s (main, run #81) | Varía con el runner |
| Test Node 22 / 24 | no registrado en la línea base | 12 s / 11 s (PR #21) | Ahora genera reporte de cobertura como artefacto |
| Build | 9.7 s | 8 s (dev), 13 s (PR #21), 16 s (main, run #81) | Ahora ejecuta un build real (`scripts/build.cjs`) y genera `dist/` |
| Deploy | 26.3 s | 38 s (Deploy Dev), 43 s (Deploy Producción, run #81) | Incluye el smoke test |
| Duración total | ≈ 64 s | 1 min 30 s (run #81, producción) | |

Lectura honesta de los resultados:
- Los tiempos de lint y build no mejoraron de forma consistente: varían entre ejecuciones por el runner de GitHub y por la carga de Vercel, y con una sola muestra por caso no se puede afirmar una mejora.
- El deploy tardó más (+12 a +17 s) porque ahora incluye el **smoke test** (consulta a la URL desplegada y a `/health.json`, con reintentos). Es un costo aceptado a cambio de comprobar que el sitio responde antes de dar el despliegue por bueno.
- La ganancia principal de la Fase 3 es de **calidad y trazabilidad**, no de velocidad: build real que puede fallar, smoke test, artefactos, cobertura y monitoreo.
- La ganancia en **minutos consumidos** viene de `paths-ignore` (los cambios solo de documentación ya no ejecutan el pipeline) y de `cancel-in-progress`.

## 5. Consumo del health check programado
`health.yml` está configurado para ejecutarse cada 30 minutos (hasta ≈ 48 veces al día). Cada ejecución dura entre 7 y 8 s en total, de modo que, en el mejor caso, suma alrededor de 6–7 minutos de runner por día. El repositorio es público, por lo que los minutos de Actions en runners estándar no tienen costo. Los workflows programados solo corren desde la rama por defecto (`main`).

Observación real: GitHub no garantiza la hora exacta de las ejecuciones programadas y puede retrasarlas u omitirlas en horas de alta carga. En las primeras 24 horas la pestaña Actions registró las ejecuciones programadas #3 (23/11/2026, 22:22) y #4 (24/11/2026, 09:04), ambas en verde (7 s y 8 s). La frecuencia efectiva fue, por tanto, menor que la configurada, y por eso el monitor externo de UptimeRobot (cada 5 minutos) es el que da la medición continua de disponibilidad.

## 6. Limitaciones y mejoras futuras
- El health check de GitHub Actions consulta la URL de un despliegue concreto (variable `SITE_URL`). Debe actualizarse al dominio estable de producción cuando esté confirmado en Vercel (Settings → Domains).
- Los avisos de GitHub sobre `actions/*@v4` ejecutándose en Node 24 y la migración de `ubuntu-latest` a Ubuntu 26 no afectan el resultado actual; conviene revisarlos al actualizar las versiones de las acciones.
- Con más muestras por job se podría calcular un promedio estable de tiempos, en lugar de comparar ejecuciones individuales.

## 7. Evidencia
Las capturas están en `docs/evidencias/fase3/`:
- `fase3_pr21_checks.png`: PR #21 con los 4 checks obligatorios en verde.
- `fase3_build_ok.png`: log del paso de build con `Build OK: dist/ generado con 2 archivo(s)`.
- `fase3_run_dev_artefactos.png`: run en `dev` con artefactos `dist` y `cobertura-node-22/24`.
- `fase3_run81_prod.png`: run #81 en `main`, Deploy Producción con `Smoke test correcto`.
- `fase3_health_check.png`: ejecución del Health Check con HTTP 200 y tiempo de respuesta.
