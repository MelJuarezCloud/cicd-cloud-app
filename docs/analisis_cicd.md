# Entregable de Infraestructura Cloud y Análisis de Riesgos
**Autor:** Carlos Armando Martínez Chicas (Ingeniero Cloud Jr.)  
**Rol:** Cloud Engineer Jr.  

---

## 1. Dependencias del Proyecto y Herramientas Seleccionadas

### A. Dependencias de Infraestructura y Desarrollo
* **Entorno de Ejecución:** Node.js (v18+) para la ejecución de la aplicación web y gestión de scripts.
* **Gestor de Paquetes:** `npm` para la administración de dependencias de producción y desarrollo.
* **Framework de Pruebas Automatizadas:** `Jest` para la suite de pruebas unitarias ejecutadas durante la fase de CI.
* **Analizador Estático (Linter):** `ESLint` para asegurar la calidad de código antes de autorizar el build.

### B. Justificación Comparativa de Herramientas
* **Control de Versiones (`Git` y `GitHub`):**
  * *Selección:* Git / GitHub.
  * *Comparativa:* Seleccionado frente a GitLab o Bitbucket debido a su integración nativa con GitHub Actions y su ecosistema de autenticación segura por tokens. Facilita la implementación de la estrategia GitFlow (`main`, `dev`, `feature/*`, `hotfix/*`).
* **Motor CI/CD (`GitHub Actions`):**
  * *Selección:* GitHub Actions.
  * *Comparativa:* Seleccionado frente a Jenkins. Jenkins requiere un servidor local o instancia EC2 encendida 24/7 (lo que genera costos de cómputo y mantenimiento). GitHub Actions no requiere gestión de servidores y ejecuta los pipelines bajo demanda en entornos aislados (*runners*).
* **Plataforma de Hosting Cloud (`Vercel`):**
  * *Selección:* Vercel.
  * *Comparativa:* Seleccionado frente a AWS EC2 o Heroku. AWS EC2 exige configuración manual de servidores web (Nginx/Apache) y certificados SSL; Vercel ofrece despliegues automáticos desacoplados por rama, certificado SSL gestionado y URLs de vista previa (*Preview Deployments*) sin costo.

---

## 2. Análisis de Cuotas del Free Tier (Documento de Riesgos)

### A. GitHub Actions (Runner Hosting)
* **Límite del Free Tier:** 2,000 minutos de ejecución mensual para repositorios privados.
* **Riesgo Identificado:** Agotamiento de la cuota mensual de minutos de cómputo por ejecuciones continuas y redundantes ante pequeños cambios en confirmaciones (*commits*) consecutivos.
* **Estrategia de Mitigación:**
  * Implementación de filtros de ruta (`paths-ignore`) en el archivo `.github/workflows/ci.yml` para evitar disparar el pipeline cuando solo se modifique documentación (`.md`).
  * Cancelación de trabajos en progreso obsoletos utilizando la propiedad `concurrency` en GitHub Actions.
  * Reutilización de dependencias `npm` mediante el almacenamiento en caché nativo (`actions/setup-node` con `cache: 'npm'`).

### B. Vercel (Hosting y Ancho de Banda)
* **Límite del Free Tier:** 100 GB de ancho de banda mensual (bandwidth) y límites de tiempo de compilación por proyecto.
* **Riesgo Identificado:** Bloqueo temporal del servicio de hosting o fallas de despliegue si se supera la transferencia de datos por picos inusuales de tráfico o builds pesados.
* **Estrategia de Mitigación:**
  * Optimización de archivos estáticos y dependencias ligeras en el directorio `/src`.
  * Exclusión de archivos innecesarios para la producción a través del archivo `.vercelignore`.
  * Monitoreo activo del consumo de métricas desde el Dashboard de Vercel y uso de políticas de caché en el borde (*Edge Caching*).