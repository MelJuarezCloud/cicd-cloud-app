## 1. Contexto y Requerimientos del Cliente (DNSDE)

### 1.1 Identificación del Cliente
* **Entidad Receptora:** Dirección Nacional de Servicios Digitales Educativos (DNSDE).
* **Rol Operativo:** Unidad responsable del diseño, publicación, mantenimiento y operación de las plataformas web, portales académicos, trámites en línea y APIs institucionales.

### 1.2 Problemática Actual Detectada
Actualmente, la DNSDE opera bajo un esquema de despliegue manual no estandarizado (copia directa de archivos, comandos ejecutados manualmente en servidores y configuraciones en vivo). Esto genera:
1. **Retrasos significativos:** Tiempos de espera prolongados entre la finalización de un desarrollo y su publicación en entornos de producción.
2. **Errores en producción:** Ausencia de canalizaciones automáticas de validación (linters y pruebas unitarias), lo que provoca fallas de UI/UX, incompatibilidad de librerías y bugs de lógica visibles para el usuario final.
3. **Falta de trazabilidad y rollback:** Imposibilidad de auditar quién, cuándo y qué se desplegó, sumado a la falta de un mecanismo automatizado para revertir cambios ante incidentes graves.

### 1.3 Alcance Funcional del Pipeline CI/CD
El sistema CI/CD a implementar automatizará el ciclo de vida del software desde el control de versiones hasta la publicación continua en un entorno Cloud de costo accesible:
* **Integración Continua (CI):** Ejecución automática de linters (ESLint) y suite de pruebas unitarias (Jest) ante cada evento de *Push* o *Pull Request*.
* **Despliegue Continuo (CD):** Publicación automática en la plataforma Cloud (Vercel) al realizar integraciones en las ramas principales.
* **Verificación de Salud:** Monitoreo básico mediante *Health Check* tras la publicación del sitio web.

### 1.4 Objetivos Específicos del Pipeline
* **Build Automatizado:** Validar la sintaxis y empaquetamiento del proyecto en un tiempo menor a 3 minutos por ejecución.
* **Testing Obligatorio:** Detener el flujo de despliegue inmediatamente si alguna prueba unitaria o regla de calidad (Linter) falla.
* **Deploy Automático:** Publicar en un entorno de pruebas (*Staging*) para la rama `dev` y en producción para la rama `main`.
* **Rollback Rápido:** Permitir la restauración a la última versión estable mediante el historial de commits y despliegues del hosting.

## 2. Estrategia de Versionado y Branching Model

Para garantizar la consistencia en el desarrollo colaborativo y evitar publicaciones accidentales en entornos de producción, el equipo adoptará un modelo **GitFlow Reducido**.

### 2.1 Definición de Ramas
* **`main` (Producción):** Contiene exclusivamente código estable, probado y listo para producción. Cada commit o merge en esta rama dispara el despliegue hacia el entorno final.
* **`dev` (Integración / Staging):** Rama principal de desarrollo donde se integran los cambios de los integrantes. Permite validar los flujos de CI/CD en un entorno de pruebas previo.
* **`feature/*` (Nuevas Funcionalidades):** Ramas temporales creadas a partir de `dev` para el desarrollo de características o tareas específicas (ej. `feature/analisis-requerimientos`). Se integran a `dev` mediante Pull Requests.
* **`hotfix/*` (Correcciones Uregentes):** Ramas temporales creadas a partir de `main` para solventar errores críticos detectados directamente en producción.

### 2.2 Reglas de Protección de Ramas (Branch Protection Rules)
Para preservar la estabilidad del código base en GitHub, se aplicarán las siguientes políticas de protección:
1. **Restricción de Commits Directos:** Queda estrictamente prohibido realizar `git push` directo a la rama `main`. Toda modificación debe ingresar mediante Pull Request (PR).
2. **Revisión de Código Requerida:** Todo Pull Request hacia `dev` o `main` debe contar con la aprobación del Líder de Proyecto Jr. o del QA/Documentador Técnico Jr.
3. **Validación de Status Checks:** Ningún Pull Request podrá ser fusionado (*merged*) si las pruebas automatizadas (Testing) o el análisis estático (Linter) en GitHub Actions finalizan con estado fallido.
4. **Fusión Limpia:** Se requerirá el uso de *Squash and Merge* o *Rebase* para mantener un historial de commits limpio y trazable.

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