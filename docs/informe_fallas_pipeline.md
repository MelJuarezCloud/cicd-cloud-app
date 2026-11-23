# Informe de fallas del pipeline – Fase 3

Proyecto: CI/CD Cloud Económico para Aplicaciones Web (Grupo SN_#3, ESIT).
Responsable: Melvin Juárez. Fecha: 23/11/2026.

Este informe reúne las fallas observadas durante la Fase 3: cuatro provocadas a propósito para validar el pipeline (F1 a F3 y F6) y dos incidentes reales (F4 y F5). Cada una incluye causa, efecto, corrección y evidencia. La matriz de pruebas (`matriz_pruebas_cicd.md`) tiene el detalle de los escenarios.

## 1. Resumen

| ID | Falla | Tipo | Detectada por | Estado |
|---|---|---|---|---|
| F1 | Build fallido por título ausente en `index.html` | Provocada (E2) | Job Build | Corregida |
| F2 | Test fallido por `sum` que resta | Provocada (E3) | Job Test | Corregida |
| F3 | Deploy fallido con error simulado | Provocada (E4) | Job Deploy Dev | Corregida (E5) |
| F4 | `health.yml` guardado en una carpeta anidada | Real | Ausencia en la pestaña Actions | Corregida |
| F5 | URL de monitoreo devolvía 404 | Real | Prueba manual en el navegador | Mitigada |
| F6 | Cambio desplegado que se revierte | Provocada (E6) | Procedimiento de rollback | Resuelta con `git revert` |

## 2. Detalle

### F1. Build fallido (E2, run #90)
- **Síntoma:** Build en rojo; Deploy Dev y Deploy Producción omitidos; botón de merge deshabilitado en el PR #27.
- **Causa:** `public/index.html` ya no contenía `CI/CD Cloud`, y `scripts/build.cjs` lo exige.
- **Efecto:** el build termina con código 1 (`ERROR: public/index.html no contiene el titulo del proyecto`) y los jobs que dependen de Build no se ejecutan.
- **Corrección:** restaurar el título (commit `fix: restaura el titulo del proyecto`).
- **Prevención:** el build real valida la página antes de generar `dist/`; las pruebas nuevas de `tests/index.test.js` también verifican el título y el estado en línea.
- **Evidencia:** `evidencias/fase3/fase3_esc2_build_fallido_pr.png`, `fase3_esc2_build_fallido_log.png`.

### F2. Test fallido (E3, run #92)
- **Síntoma:** Test (Node 22) y Test (Node 24) en rojo; Build y deploys omitidos.
- **Causa:** `src/sum.js` restaba (`a - b`) en lugar de sumar.
- **Efecto:** `Tests: 4 failed, 9 passed, 13 total`; por ejemplo, `sum(0.1, 0.2)` devolvió `-0.1` en lugar de `0.3`. El defecto no llegó a ningún entorno.
- **Corrección:** restaurar `return a + b;`. El run #93 terminó en verde.
- **Prevención:** las pruebas unitarias y las reglas de protección de ramas (checks obligatorios, sin push directo) impiden fusionar código con pruebas rojas.
- **Evidencia:** `fase3_esc3_test_fallido_pr.png`, `fase3_esc3_test_fallido_log.png`, `fase3_esc3_corregido_pr.png`.

### F3. Deploy con error simulado (E4, run #82)
- **Síntoma:** Deploy Dev en rojo en una ejecución manual en `dev`.
- **Causa:** el input `simular_error` estaba activado y el paso "Simular error de despliegue" termina con `exit 1`.
- **Efecto:** el despliegue se interrumpe antes de `vercel deploy`; no cambia nada en Vercel.
- **Corrección:** ejecutar de nuevo con `simular_error` desactivado (run #83, en verde con smoke test).
- **Evidencia:** `fase3_esc4_deploy_fallido.png`, `fase3_esc5_deploy_exitoso.png`.

### F4. `health.yml` en una carpeta anidada (real)
- **Síntoma:** el workflow "Health Check (disponibilidad)" no aparecía en la barra izquierda de Actions, por lo que no se podía ejecutar a mano.
- **Causa:** al crearlo con **Add file**, se escribió la ruta completa `.github/workflows/health.yml` estando ya dentro de `.github/workflows/`. El archivo quedó en `.github/workflows/.github/workflows/health.yml`.
- **Efecto:** GitHub solo lee workflows ubicados directamente en `.github/workflows/`; el health check programado no corría.
- **Corrección:** se creó el archivo en la ruta correcta y se eliminó la carpeta anidada, todo por PR (#24 y #25 hacia `dev`, y #26 de `dev` hacia `main`). Después de eso, la ejecución manual terminó en Success con HTTP 200 en 0.24 s.
- **Prevención:** al crear archivos en carpetas profundas, escribir solo el nombre y comprobar la ruta que muestra GitHub antes del commit; revisar que el workflow aparezca en Actions después del merge.

### F5. URL de monitoreo con 404 (real)
- **Síntoma:** el 18/11 se probaron dos URLs para la variable `SITE_URL` y ambas devolvieron 404 en `/health.json`: una URL de despliegue antigua y `cicd-cloud-app.vercel.app`.
- **Causa:** la URL de despliegue era de una versión anterior a la existencia de `health.json` (los despliegues de Vercel son inmutables). El otro dominio no estaba asignado al proyecto en ese momento.
- **Efecto:** el health check no podía ejecutarse con esas URLs.
- **Corrección:** se tomó la URL de producción impresa en el resumen del run #81 de `main`, que ya había pasado el smoke test, y se configuró como `SITE_URL`.
- **Pendiente:** la URL elegida corresponde a un despliegue concreto. Debe sustituirse por el dominio estable de producción cuando se confirme en Vercel (Settings → Domains). El monitor de UptimeRobot configurado por Carlos apunta a `cicd-cloud-app.vercel.app`.

### F6. Cambio a revertir (E6)
- **Síntoma:** un cambio ya desplegado en `dev` (PR #28, run #95) debía deshacerse.
- **Causa:** simulación de una versión defectuosa.
- **Efecto:** en Vercel (plan Hobby) las opciones *Instant Rollback* y *Promote to Production* aparecen deshabilitadas en despliegues *Preview*.
- **Corrección:** botón **Revert** del PR #28, que creó el PR #29; tras los checks y el merge, el pipeline volvió a desplegar la versión anterior (commit `d312008`, run #97 en verde con smoke test).
- **Prevención:** mantener PR pequeños para que cada reversión sea sencilla.
- **Evidencia:** `fase3_esc6_*` y `fase3_rollback_vercel_hobby.png`.

## 3. Lecciones aprendidas
1. Un build real que puede fallar protege más que un paso que siempre pasa.
2. El orden `needs` (lint y test antes de build; build antes de deploy) evita que el código con defectos llegue a un entorno.
3. El smoke test y el health check detectan problemas que los jobs de CI no ven (URL rota, archivo faltante en el despliegue).
4. Las reglas de protección de ramas obligan a que incluso las correcciones y las reversiones pasen por checks.
5. Conviene verificar que cada workflow aparezca en Actions tras su primer merge.
