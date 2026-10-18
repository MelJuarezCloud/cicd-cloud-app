# \# Documento de Análisis del Sistema CI/CD y Gestión de Riesgos (Fase 1)

# 

# \## 1. Dependencias del Proyecto y Herramientas Seleccionadas

# 

# \* \*\*Control de Versiones y Repositorio (`Git` y `GitHub`):\*\* Seleccionados por su robustez, compatibilidad multiplataforma y soporte nativo para flujos de trabajo colaborativos mediante el modelo GitFlow (`main` y `dev`)\[cite: 10, 11, 12, 16].

# \* \*\*Automatización de Pipelines (`GitHub Actions`):\*\* Seleccionado debido a su integración directa con el repositorio, ausencia de costos de infraestructura propia y un modelo basado en eventos nativos eficiente para proyectos de la DNSDE\[cite: 5, 6, 11, 16].

# \* \*\*Plataforma de Despliegue Cloud (`Vercel`):\*\* Seleccionada por su optimización para aplicaciones web ligeras, despliegues automáticos desacoplados por rama y su infraestructura optimizada para entornos gratuitos (\*Free Tier\*)\[cite: 11, 16].

# \* \*\*Justificación Operativa:\*\* Esta combinación tecnológica resuelve directamente los retrasos ocasionados por los despliegues manuales tradicionales de la DNSDE al automatizar la validación de código, pruebas y lanzamientos a producción tras cada confirmación (\*push\*)\[cite: 7, 8, 9, 11, 16].

# 

# \---

# 

# \## 2. Análisis de Cuotas del Free Tier (Documento de Riesgos)

# 

# \* \*\*GitHub Actions (Minutos de Cómputo):\*\* El plan gratuito ofrece 2,000 minutos mensuales para repositorios privados\[cite: 11, 16]. El riesgo identificado radica en la acumulación de ejecuciones innecesarias ante múltiples confirmaciones\[cite: 16].

# &#x20; \* \*\*Mitigación:\*\* Optimización de disparadores (\*triggers\*) en los archivos YAML y acotación de pruebas estrictamente necesarias\[cite: 11, 16].

# \* \*\*Vercel (Ancho de Banda y Despliegues):\*\* El límite del \*Free Tier\* contempla restricciones en transferencia de datos mensual y límites de compilación concurrente\[cite: 11, 16]. El riesgo comprende la saturación ante picos inesperados de tráfico\[cite: 16].

# &#x20; \* \*\*Mitigación:\*\* Implementación de políticas de caché eficientes, optimización de recursos estáticos y control estricto de dependencias en el directorio `/src`\[cite: 11, 14, 16].S

