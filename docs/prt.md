# 2. Plan de Recursos Tecnológicos (PRT)

## 2.1 Repositorio Central (GitHub)
- **URL del Repositorio:** https://github.com/MelJuarezCloud/cicd-cloud-app
- **Modelo de Ramas Iniciales (GitFlow reducido):**
  - `main`: Entorno de producción estable. Despliegue automático a producción.
  - `dev`: Rama de integración continua. Despliegue automático a staging/pruebas.
  - `feature/*`: Desarrollo de nuevas características.
  - `hotfix/*`: Correcciones urgentes de bugs.

- **Estructura Oficial del Repositorio:**
├── .github/workflows/
├── docs/
├── src/
├── tests/
├── infra/
├── .env.example
├── .gitignore
└── README.md

## 2.2 Hosting Seleccionado y Justificación
- **Plataforma seleccionada:** Vercel.
- **Justificación:** Se seleccionó Vercel por su integración nativa con GitHub, permitiendo automatizar el despliegue continuo de forma inmediata tras cada commit o Pull Request. Su infraestructura Edge gratuita elimina los tiempos de espera por inactividad (Cold Start) y ofrece 100 GB de ancho de banda y 6,000 minutos de build mensuales, garantizando disponibilidad constante y costo cero para el pipeline de la DNSDE.

## 2.3 Entorno de Pruebas (Local + Pipeline)
Para el desarrollo local cada integrante ejecutará el proyecto sobre Node.js utilizando Jest para pruebas unitarias y ESLint para la validación de código, mientras que el pipeline automatizado en GitHub Actions se disparará ante cada Push o Pull Request ejecutando secuencialmente las etapas de Checkout, Instalación de dependencias, Linter, Tests unitarios, Build y Deploy automático a Vercel únicamente si todas las validaciones anteriores resultan exitosas.

## 2.4 Gestión de Secretos y Restricciones Técnicas
La seguridad del proyecto se garantizará mediante el almacenamiento encriptado de credenciales y tokens (DEPLOY_TOKEN) dentro de Repository Secrets de GitHub, complementado con la inclusión obligatoria de `.env` en `.gitignore`. El equipo optimizará los workflows con caché para no exceder los 2,000 minutos mensuales de GitHub Actions.

## 2.5 Resumen de Recursos Tecnológicos
| Recurso | Herramienta / Plataforma | Responsable Directo | Tipo de Licencia | Uso Principal | Restricciones o Límites |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Repositorio** | GitHub | DevOps Jr. (Carlos López) | Free | Versionado + Actions | Minutos de Actions limitados |
| **Hosting** | Vercel | Ingeniero Cloud Jr. (Carlos Martínez) | Free | Deploy automático | Ancho de banda limitado |
| **Testing** | Jest / PyTest | Desarrollador Web Jr. (Tamara Martínez) | Free | Validación continua | Sin límites locales |
| **Documentación** | Google Docs | QA / Doc. Jr. (Zuleima Medina) | Free | Matriz de pruebas e informe | N/A |
| **Comunicación** | WhatsApp | Líder Jr. (Melvin Juárez) | Free | Coordinación asincrónica | Buenas prácticas requeridas |
