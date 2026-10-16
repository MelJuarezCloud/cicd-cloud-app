# Documento de Análisis y Diseño del Sistema CI/CD
**Proyecto:** CI/CD Cloud Económico para Aplicaciones Web  
**Grupo:** SN-3  
**Fase 1:** Análisis y Diseño  

---

## 1. Contexto y Requerimientos del Cliente (DNSDE)
(Responsable: Melvin Juárez)
**Problemática actual:** (Describir los retrasos por despliegues manuales, ausencia de pruebas automatizadas y falta de trazabilidad/rollback).
**Alcance funcional del pipeline:** (Automatización del build, test, deploy y health check).
**Tiempos y frecuencia:** (Expectativa de entrega continua y tiempos de respuesta).

---

## 2. Estrategia de Branching y Flujo de Trabajo
(Responsable: Melvin Juárez)
**main:** Rama de producción (despliegues estables y aprobados).
**dev:** Rama de integración y pruebas previas.
**feature/*:** Ramas temporales para desarrollo de nuevas funcionalidades o secciones.
**hotfix/*:** Correcciones rápidas de errores en producción.

---

## 3. Arquitectura y Mapa Lógico del Pipeline (Diagramas)
(Responsable: Carlos López)
**Flujo general:** Commit ➔ Build ➔ Lint/Test ➔ Deploy ➔ Health Check
(Insertar aquí enlace o imagen del diagrama elaborado en Draw.io / Figma)

---

## 4. Boceto de Configuración YAML (GitHub Actions)
(Responsable: Carlos López)
**Disparadores (Triggers):** (on: push a main/dev, on: pull_request a dev).
**Jobs preliminares:** (Estructura base del archivo .github/workflows/main.yml).

---

## 5. Análisis de Infraestructura Cloud y Cuotas (Vercel)
(Responsable: Carlos Martínez)
**Hosting seleccionado:** Vercel (Plan Free Tier).
**Gestión de secretos:** Uso de GitHub Secrets para tokens y variables de entorno.
**Mitigación de límites:** Estrategia de caché de dependencias para ahorrar minutos de GitHub Actions.

---

## 6. Estándares de Código, Linter y Pruebas Unitarias
(Responsable: Tamara Martínez)
**Linter:** Configuración y reglas base de ESLint para Node.js.
**Testing:** Definición del framework Jest (mínimo 5 pruebas unitarias previstas).
**Convenciones:** Uso de Conventional Commits y políticas estrictas para Pull Requests.

---

## 7. Matriz de Riesgos y Planes de Mitigación
(Responsable: Zuleima Medina)
| Riesgo Detectado | Impacto | Probabilidad | Estrategia de Mitigación / Rollback |
| :--- | :--- | :--- | :--- |
| Fallo en el Build por dependencias | Alto | Media | Uso de caché de Actions y validación previa con Linter local |
| Superar límite de minutos gratuitos | Medio | Baja | Optimización de triggers y exclusión de builds innecesarios |
