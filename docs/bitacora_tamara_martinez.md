Bitácora de Trabajo Individual – Fase 1

Estudiante: Tamara Abigail Martínez Lemus
 Rol: Desarrollador Web Jr.
 Proyecto: CI/CD Cloud Económico para Aplicaciones Web

Actividad 1: Selección y Configuración del Linter (ESLint)

Descripción:
 Se revisaron las reglas de calidad de código para proyectos Node.js y se documentaron los lineamientos base de ESLint para mantener consistencia en el desarrollo del proyecto. Se analizaron criterios de formato, buenas prácticas y validaciones necesarias para apoyar el proceso de integración continua.

Entregable:
 Documentación de reglas y lineamientos de ESLint incorporada al repositorio.

Estado:
 Completado.

Actividad 2: Definición de la Convención de Commits

Descripción:
 Se documentó el uso de Conventional Commits para estandarizar el formato de los mensajes de commit. Se revisaron prefijos como feat, fix, docs, test, chore y ci, con el objetivo de mejorar la organización y trazabilidad de cambios dentro del repositorio.

Entregable:
 Documento de convención de commits integrado al proyecto.

Estado:
 Completado.

Actividad 3: Definición de Criterios para Pull Requests

Descripción:
 Se revisaron los criterios necesarios para aprobar Pull Requests, incluyendo validación de pruebas, revisión de cambios, cumplimiento de estándares de calidad y seguimiento del flujo de integración hacia la rama de desarrollo.

Entregable:
 Lineamientos de revisión y validación documentados.

Estado:
 Completado.

Actividad 4: Implementación y Validación de Pruebas Unitarias

Descripción:
 Se participó en la revisión e implementación de pruebas unitarias utilizando Jest. Se analizaron escenarios de validación de entradas, ejecución de pruebas automatizadas y funcionamiento del pipeline de integración continua para garantizar la estabilidad del proyecto.

Entregable:
 Pruebas unitarias incorporadas y verificadas mediante la ejecución del pipeline CI/CD.

Estado:
 Completado.

Aprendizajes Obtenidos
Uso de ramas y Pull Requests como flujo de trabajo colaborativo.
Aplicación de ESLint para mejorar la calidad del código.
Implementación de Conventional Commits para mantener un historial organizado.
Comprensión del funcionamiento de GitHub Actions dentro de un pipeline CI/CD.
Importancia de las pruebas unitarias para la validación automática de funcionalidades.
Uso de procesos de revisión antes de integrar cambios a la rama de desarrollo.
Bitácora de Trabajo Individual – Fase 2
Actividad Realizada

Se trabajó en la rama feature/pruebas-unitarias, creada a partir de la rama dev. Se modificó el archivo src/sum.js para validar que la función sum únicamente acepte números válidos y genere una excepción cuando los parámetros sean incorrectos.

Posteriormente, se actualizó el archivo tests/sum.test.js, incorporando una suite de 6 pruebas unitarias compuesta por 4 casos normales y 2 escenarios de error. Una vez completadas las modificaciones, se creó un Pull Request hacia la rama dev, se verificó la ejecución del pipeline CI/CD y se realizó el merge de los cambios.

Problemas Encontrados

Durante el desarrollo se presentó una confusión inicial al navegar entre las ramas del repositorio, lo que dificultó localizar el archivo src/sum.js.

Asimismo, durante la revisión del pipeline se observó que se ejecutaban más pruebas de las esperadas. Esto ocurrió porque el proyecto ya contenía suites de pruebas adicionales además de las implementadas durante esta actividad.

Soluciones Aplicadas

Se verificó la rama activa y la estructura del repositorio hasta confirmar que el trabajo se realizaba en la rama feature/pruebas-unitarias.

Posteriormente se comprobó que las pruebas adicionales pertenecían al proyecto y que el pipeline ejecutaba todas las suites de pruebas disponibles. También se verificó que el archivo tests/sum.test.js se ejecutó correctamente y que las nuevas pruebas implementadas aprobaron satisfactoriamente.

Resultados Obtenidos
Implementación de validación de tipos en la función sum.
Incorporación de 6 pruebas unitarias (4 casos normales y 2 escenarios de error).
Ejecución satisfactoria del pipeline CI/CD.
Aprobación de los checks Build, Lint, Test (Node 22) y Test (Node 24).
Pull Request fusionado correctamente a la rama dev.
Verificación exitosa del workflow posterior al merge.
Eliminación de la rama de trabajo feature/pruebas-unitarias tras la integración de cambios.
Evidencias Adjuntas
Captura del Pull Request fusionado.
Captura de los checks en verde.
Captura del log de ejecución de pruebas.
Captura del workflow exitoso en GitHub Actions.
Captura de eliminación de la rama feature/pruebas-unitarias.

Esta versión elimina referencias a la corrección docs/docs y al trabajo atribuido a cam2023, deja todos los estados consistentes y coincide con la evidencia que realmente generaste.
