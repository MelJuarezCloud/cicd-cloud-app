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
* **`hotfix/*` (Correcciones Urgentes):** Ramas temporales creadas a partir de `main` para solventar errores críticos detectados directamente en producción.

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
 
 ## 4. Boceto de Configuración YAML (GitHub Actions)

### 4.1 Disparadores (Triggers)
El flujo de integración continua para el entorno de Node.js se activará mediante los siguientes eventos en el control de versiones:
* **`push`**: Activado ante cualquier confirmación de cambios en las ramas principales (`main` y `dev`).
* **`pull_request`**: Activado al intentar fusionar código hacia la rama `dev`.

### 4.2 Estructura Preliminar de la Pipeline (Jobs)
```yaml
name: CI/CD Pipeline - Node.js Web App

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ dev ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout del repositorio
        uses: actions/checkout@v4

      - name: Configurar entorno Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Instalar dependencias de Node.js
        run: npm ci

      - name: Ejecutar linter (ESLint)
        run: npm run lint

      - name: Ejecutar pruebas unitarias (Jest)
        run: npm test
```
## 5. Análisis de Infraestructura Cloud y Cuotas (Vercel)

### 5.1 Selección de Hosting y Stack Tecnológico
* **Lenguaje y Entorno:** Node.js.
* **Plataforma de Hosting:** Vercel (Plan Free Tier).
* **Justificación:** Vercel ofrece una compatibilidad nativa óptima para aplicaciones basadas en Node.js, integración automatizada con GitHub, despliegues instantáneos y certificados SSL gratuitos ideales para entornos educativos.

### 5.2 Gestión de Secretos y Seguridad
* **GitHub Secrets:** Las credenciales sensibles, tokens de despliegue y variables de conexión se almacenarán de forma cifrada en la sección de secretos de GitHub Actions.
* **Variables de Entorno:** Se utilizará un archivo plantilla (`.env.example`) para documentar las variables requeridas en Node.js.

### 5.3 Análisis de Limitaciones y Mitigación (Free Tier)
* **Minutos de GitHub Actions:** Límite mensual de 2,000 minutos gratuitos. *Estrategia de mitigación:* Implementación de caché de dependencias de `npm` en los workflows para agilizar los tiempos de compilación.   
* **Ancho de banda en Vercel:** Restricciones de tráfico en el plan gratuito. *Estrategia de mitigación:* Optimización del código y control de dependencias innecesarias en Node.js.

## 6. Estándares de Calidad, Linter y Pruebas Unitarias

### 6.1 Análisis Estático (Linter)
* **Herramienta:** ESLint configurado específicamente para el ecosistema de Node.js.
* **Propósito:** Detectar errores de sintaxis, malas prácticas y mantener un formato de código homogéneo en JavaScript antes de permitir cualquier empaquetamiento o despliegue.

### 6.2 Estrategia de Testing
* **Framework:** Jest.
* **Alcance:** Creación de un conjunto de pruebas unitarias automatizadas orientadas a validar funciones críticas de la aplicación en Node.js.

### 6.3 Políticas de Pull Requests y Convención de Commits
* **Pull Requests (PR):** Todo cambio en el código debe pasar por una revisión obligatoria y cumplir con los reportes limpios del linter y los tests.
* **Conventional Commits:** Los mensajes de confirmación seguirán una estructura estandarizada:
  * `feat:` para nuevas funcionalidades.
  * `fix:` para corrección de errores.
  * `docs:` para cambios exclusivos en documentación.
  * `ci:` para modificaciones en los workflows de GitHub Actions.

### 7. Matriz de Riesgos y Planes de Mitigación

| Riesgo Identificado | Impacto | Probabilidad | Estrategia de Mitigación y Recuperación (Rollback) |
| :--- | :--- | :--- | :--- |
| **Falla en el Build o dependencias de Node.js rotas** | Alto | Media | Validación estricta local previa y uso de caché en Actions. Si falla, el pipeline detiene el despliegue automáticamente. |
| **Superar el límite de minutos en GitHub Actions** | Medio | Baja | Monitoreo del consumo mensual y optimización de disparadores. |
| **Error crítico detectado en producción tras un merge a main** | Alto | Baja | Ejecución de Rollback rápido utilizando el historial de versiones estables directamente desde el panel de Vercel o la reversión de commits. |
| **Variables de entorno de Node.js mal configuradas** | Alto 
| Media | Verificación cruzada utilizando el archivo `.env.example` y los secretos seguros configurados en el repositorio. |


