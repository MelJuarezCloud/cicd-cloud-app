# Bitácora de Trabajo Individual - Fase 1 y Fase 2

**Estudiante:** Carlos Armando Martínez Chicas
**Rol:** Cloud Engineer Jr.
**Proyecto:** CI/CD Cloud Económico para Aplicaciones Web
**Rama de trabajo:** `dev`

---

## Registro de Actividades (Fase 1: Análisis y Diseño)

### Actividad 1: Análisis de Dependencias y Justificación de Herramientas

- **Descripción:** Investigación y documentación comparativa de las herramientas seleccionadas para el pipeline (Git/GitHub, GitHub Actions vs. Jenkins, Vercel vs. AWS EC2).
- **Entregable:** Sección de dependencias e infraestructura en `/docs/analisis_cicd.md`.
- **Estado:** Completado.

### Actividad 2: Análisis de Cuotas y Riesgos del Free Tier

- **Descripción:** Evaluación de restricciones técnicas en el plan gratuito. Se precisó que el límite de 2,000 minutos mensuales de GitHub Actions aplica únicamente a repositorios privados; al ser nuestro repositorio público, disponemos de ejecución ilimitada para flujos de trabajo en runners alojados por GitHub, optimizando la gestión de cuotas y ancho de banda en Vercel.
- **Entregable:** Sección de matriz de riesgos e infraestructura en `/docs/analisis_cicd.md`.
- **Estado:** Completado.

### Actividad 3: Limpieza y Normalización del Repositorio

- **Descripción:** Resolución de redundancias en la estructura de carpetas y corrección del archivo de entorno `.env.example`.
- **Entregable:** Repositorio estructurado y sincronizado en la rama `dev`.
- **Estado:** Completado.

---

## Registro de Actividades (Fase 2: Construcción, Automatización y Despliegue)

### Actividad 4: Configuración de la Infraestructura en Vercel

- **Descripción:** Vinculación inicial del repositorio `cicd-cloud-app` con la plataforma Vercel utilizando la cuenta de GitHub, permitiendo la detección automática del framework Node.js y ejecutando el despliegue base.
- **Entregable:** Proyecto registrado y vinculado en Vercel.
- **Estado:** Completado.

### Actividad 5: Gestión Segura de Credenciales y Secretos de Repositorio

- **Descripción:** Generación e integración cifrada de los secretos obligatorios (`VERCEL_TOKEN`, `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`) en *Settings > Secrets and variables > Actions* para autenticación segura en GitHub Actions.
- **Entregable:** Variables de entorno y credenciales configuradas en GitHub Secrets.
- **Estado:** Completado.

### Actividad 6: Construcción y Optimización del Workflow (`main.yml`)

- **Descripción:** Reestructuración y optimización del pipeline unificado de CI/CD en `.github/workflows/main.yml`. Tras integrar `package-lock.json` y `npm ci` (PR #2), se reincorporó la estrategia de caché (`cache: 'npm'`). El workflow evolucionó de la estructura básica original a una arquitectura modular de 5 jobs con reintentos: `lint`, `test` (con matriz de pruebas paralelas en Node.js 22 y 24), `build`, `deploy-dev` (entorno Preview) y `deploy-prod` (condicionado a la rama `main`).
- **Entregable:** Workflow unificado automatizado y funcional en `.github/workflows/main.yml`.
- **Estado:** Completado.

### Actividad 7: Validación de Despliegue Continuo en Entorno Preview

- **Descripción:** Ejecución limpia y validación exitosa del pipeline en GitHub Actions (run #50). Se confirmó la correcta ejecución secuencial de todas las etapas y el despliegue funcional en el entorno de previsualización (Preview). El despliegue definitivo a Producción (`cicd-cloud-app.vercel.app`) queda programado y pendiente hasta ejecutar el merge de `dev` hacia `main`.
- **Entregable:** Despliegue a Preview funcional (run #50) y evidencias de integración continua en GitHub Actions.
- **Estado:** Completado (Producción pendiente de merge).

### Actividad 8: Diagnóstico y Resolución de Bloqueos de Despliegue (`Deployment Blocked`)

- **Descripción:** Diagnóstico y resolución del estado "Blocked" en los despliegues de Vercel. Se identificó que la causa raíz era el conflicto entre la integración nativa de Vercel por webhooks y el pipeline de GitHub Actions: en el plan Hobby de Vercel, los commits realizados por colaboradores no pertenecientes al equipo oficial son bloqueados automáticamente por políticas de autor. Para solucionarlo, se probaron reglas de `Ignored Build Step` (`exit 0`), re-despliegues con commits vacíos, y finalmente la desconexión total del repositorio en Vercel (*Settings > Git > Disconnect*), dejando a GitHub Actions con `VERCEL_TOKEN` como el único canal autorizado de despliegue mediante CLI (`--prebuilt`).
- **Entregable:** Repositorio desacoplado de webhooks nativos y despliegues canalizados al 100% por GitHub Actions.
- **Estado:** Completado.

### Actividad 9: Desactivación de Vercel Authentication (Deployment Protection)

- **Descripción:** Desactivación de la protección de despliegue mediante autenticación obligatoria en Vercel (*Settings > Deployment Protection*). Esta configuración impedía la visualización pública de las vistas previas sin iniciar sesión, garantizando así la accesibilidad directa y sin bloqueos a las URLs de previsualización generadas por el pipeline.
- **Entregable:** Vistas previas accesibles públicamente sin barreras de autenticación.
- **Estado:** Completado.

---

## Cronología de Commits y Ejecuciones Clave

- `ec5b622`: Commit inicial de referencia para la infraestructura base del proyecto.
- `d1a8793`: Configuración del pipeline con flags `--prebuilt` para la CLI de Vercel.
- `fddfd23`: Commit de prueba para forzar despliegue limpio tras la regla de `Ignored Build Step`.
- `1aff45c`: Aplicación de ajuste de omisión de compilación nativa en la interfaz de Vercel.
- `107d2f7`: Commit final ejecutado en la rama `dev` que culminó con la ejecución exitosa de **GitHub Actions (Run #50)**.

---

## Referencias de Evidencias Fotografícas y Capturas


<img width="512" height="228" alt="unnamed" src="https://github.com/user-attachments/assets/3833534b-92ac-4fbf-8dc4-514d59f1abfb" />
<img width="512" height="175" alt="unnamed" src="https://github.com/user-attachments/assets/b1b89e18-080b-4ca4-a9f9-75ad136cfd12" />
<img width="512" height="159" alt="unnamed" src="https://github.com/user-attachments/assets/79158566-c8a4-48a2-b56a-66ad9bd94960" />
<img width="512" height="191" alt="unnamed" src="https://github.com/user-attachments/assets/5b1daa94-6468-449b-a715-ee95ff523c4e" />
<img width="512" height="260" alt="unnamed" src="https://github.com/user-attachments/assets/591a4a3f-c03f-4a09-af66-01b3a1f6f46c" />
<img width="1339" height="527" alt="1 5" src="https://github.com/user-attachments/assets/cf5baa3b-d28c-473e-b0c8-a99cb66494ed" />
<img width="1328" height="569" alt="1 4" src="https://github.com/user-attachments/assets/8ed29d96-1b77-492d-89ad-43eff848508a" />
<img width="1325" height="517" alt="1 3" src="https://github.com/user-attachments/assets/e1c0902b-7285-4fce-be53-d63cbc15e3f3" />
<img width="1361" height="712" alt="1 2" src="https://github.com/user-attachments/assets/1f373373-e742-4f8e-9b2c-b1f0141178cd" />

---

