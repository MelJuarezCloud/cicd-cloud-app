
---

# Bitácora de Trabajo Individual - Fase 1 y Fase 2

**Estudiante:** Carlos Armando Martínez Chicas

**Rol:** Cloud Engineer Jr.

**Proyecto:** CI/CD Cloud Económico para Aplicaciones Web

**Rama de trabajo:** `dev`

---

## Registro de Actividades (Fase 1: Análisis y Diseño)

### Actividad 1: Análisis de Dependencias y Justificación de Herramientas

* **Descripción:** Investigación y documentación comparativa de las herramientas seleccionadas para el pipeline (Git/GitHub, GitHub Actions vs. Jenkins, Vercel vs. AWS EC2).
* **Entregable:** Sección de dependencias e infraestructura en `/docs/analisis_cicd.md`.
* **Estado:** Completado.

### Actividad 2: Análisis de Cuotas y Riesgos del Free Tier

* **Descripción:** Evaluación de restricciones técnicas en el plan gratuito (2,000 minutos de GitHub Actions y límites de ancho de banda en Vercel) y formulación de estrategias de mitigación.
* **Entregable:** Sección de matriz de riesgos e infraestructura en `/docs/analisis_cicd.md`.
* **Estado:** Completado.

### Actividad 3: Limpieza y Normalización del Repositorio

* **Descripción:** Resolución de redundancias en la estructura de carpetas y corrección del archivo de entorno `.env.example`.
* **Entregable:** Repositorio estructurado y sincronizado en la rama `dev`.
* **Estado:** Completado.

---

## Registro de Actividades (Fase 2: Construcción, Automatización y Despliegue)

### Actividad 4: Configuración de la Infraestructura en Vercel

* **Descripción:** Vinculación inicial del repositorio `cicd-cloud-app` con la plataforma Vercel utilizando la cuenta de GitHub, permitiendo la detección automática del framework Node.js y ejecutando el despliegue base.


* **Entregable:** Proyecto registrado y vinculado en Vercel.
* **Estado:** Completado.

### Actividad 5: Gestión Segura de Credenciales y Secretos de Repositorio

* **Descripción:** Generación e integración cifrada de los secretos obligatorios (`VERCEL_TOKEN`, `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`) en *Settings > Secrets and variables > Actions* para autenticación segura en GitHub Actions.


* **Entregable:** Variables de entorno y credenciales configuradas en GitHub Secrets.


* **Estado:** Completado.



### Actividad 6: Construcción y Optimización del Workflow (`main.yml`)

* **Descripción:** Creación del pipeline unificado de CI/CD en `.github/workflows/main.yml` en la rama `dev`. Se depuró el error de dependencias de caché eliminando `cache: 'npm'` para evitar bloqueos por falta de `package-lock.json`, asegurando la ejecución de `npm install`, Linter (ESLint) y Jest.


* **Entregable:** Workflow unificado automatizado y funcional en `.github/workflows/main.yml`.


* **Estado:** Completado.



### Actividad 7: Validación de Despliegue Continuo y Evidencias Finales

* **Descripción:** Ejecución completa del pipeline en GitHub Actions obteniendo el check verde (*Success*) en `build-and-test` y `deploy-to-vercel`. Verificación de la aplicación en el panel de Vercel en estado *Ready* y validación de acceso mediante el dominio público `.vercel.app`.


* **Entregable:** Aplicación web activa en producción (`cicd-cloud-app.vercel.app`) y evidencias de ejecución limpia.


* **Estado:** Completado.

---

## Resumen de Commits Realizados

* `docs: redactar dependencias, herramientas y cuotas free tier de Cloud Eng Jr`
* `fix: remueve cache npm de setup-node para evitar error de lockfile`


* `ci/cd: actualiza main.yml con el pipeline completo de Vercel`


* Sincronización exitosa con el repositorio remoto `origin/dev`.

---
<img width="512" height="228" alt="unnamed" src="https://github.com/user-attachments/assets/3833534b-92ac-4fbf-8dc4-514d59f1abfb" />
<img width="512" height="175" alt="unnamed" src="https://github.com/user-attachments/assets/b1b89e18-080b-4ca4-a9f9-75ad136cfd12" />
<img width="512" height="159" alt="unnamed" src="https://github.com/user-attachments/assets/79158566-c8a4-48a2-b56a-66ad9bd94960" />
<img width="512" height="191" alt="unnamed" src="https://github.com/user-attachments/assets/5b1daa94-6468-449b-a715-ee95ff523c4e" />
<img width="512" height="260" alt="unnamed" src="https://github.com/user-attachments/assets/591a4a3f-c03f-4a09-af66-01b3a1f6f46c" />



