Bitácora de Trabajo Individual – Fase 1 
Estudiante: Tamara Abigail Martínez Lemus
Rol: Desarrollador Web Jr.
Proyecto: CI/CD Cloud Económico para Aplicaciones Web
Rama de trabajo: dev

Registro de Actividades (Fase 1: Análisis y Diseño)
Actividad 1: Selección y Configuración del Linter (ESLint)
Descripción:  
Investigación, selección y configuración de las reglas base de ESLint para estandarizar la calidad del código Node.js. Se definieron reglas obligatorias, estructura del archivo .eslintrc.js y lineamientos para evitar builds con errores de estilo.

Entregable:  
Sección “Reglas del Linter” documentada en /docs/convencion-commits.md.

Estado:  
Completado.

Actividad 2: Definición de la Convención de Commits (Conventional Commits)
Descripción:  
Estandarización del formato de mensajes de commit utilizando prefijos como feat:, fix:, docs:, test:, chore: y ci:. Se documentaron ejemplos y reglas para asegurar uniformidad en el historial del repositorio.

Entregable:  
Sección “Convención de Commits” en /docs/convencion-commits.md.

Estado:  
Completado.

Actividad 3: Políticas de Aprobación para Pull Requests
Descripción:  
Definición de criterios mínimos para aprobar PRs, incluyendo revisión de código, cumplimiento de ESLint, validación de commits y verificación de pruebas unitarias. Se estableció el flujo recomendado para merges hacia la rama dev.

Entregable:  
Políticas documentadas en /docs/convencion-commits.md.

Estado:  
Completado.

Registro de Actividades 
Actividad 4: Implementación de Pruebas Unitarias con Jest
Descripción:  
Creación de una suite de pruebas unitarias con al menos cinco escenarios, validando funciones críticas del proyecto. Se incluyeron pruebas de entradas vacías, validaciones y operaciones matemáticas.

Entregable:  
Carpeta /tests/ con los archivos de pruebas unitarias.

Estado:  
En progreso / Completado (según tu avance real).


Actividad 5: Normalización del Repositorio
Descripción:  
Corrección de archivos duplicados, eliminación de pruebas obsoletas y recuperación de archivos desde commits anteriores. Se garantizó que la rama main y dev mantuvieran coherencia estructural.

Entregable:  
Repositorio sincronizado y limpio en la rama dev.

Estado:  
Completado.

Resumen de Commits Realizados
docs: definir reglas del linter y convención de commits

test: agregar pruebas unitarias para validación de entradas

chore: eliminar archivos obsoletos en main

fix: recuperar archivos desde commit previo

ci: ajustar políticas de PR y validación de ESLint



Bitácora de Trabajo Individual – Fase 2

Actividad realizada

Se trabajó en la rama feature/pruebas-unitarias, creada a partir de la rama dev. Se modificó el archivo src/sum.js para validar que la función sum solo acepte números válidos y genere una excepción cuando los parámetros sean incorrectos. Posteriormente, se actualizó el archivo tests/sum.test.js incorporando una suite de 6 pruebas unitarias, compuesta por 4 casos normales y 2 escenarios de error. Finalmente, se creó un Pull Request hacia la rama dev, se verificó la ejecución del pipeline CI/CD y se realizó el merge de los cambios.

Problemas encontrados

Durante el proceso se presentó una confusión inicial al navegar entre las ramas del repositorio, lo que dificultó localizar el archivo src/sum.js. Además, al revisar el resultado de las pruebas se observó que el pipeline mostraba 13 pruebas aprobadas en lugar de las 6 indicadas en la guía.

Soluciones aplicadas

Se verificó la rama activa y la estructura del repositorio hasta confirmar que el trabajo se realizaba en feature/pruebas-unitarias. Respecto al resultado de las pruebas, se comprobó que el repositorio ya contenía pruebas adicionales, por lo que el pipeline ejecutó todas las pruebas existentes del proyecto. Se validó que el archivo tests/sum.test.js se ejecutó correctamente y que todas las pruebas finalizaron de forma satisfactoria.

Resultados obtenidos
Implementación de validación de tipos en la función sum.
Incorporación de 6 pruebas unitarias (4 casos normales y 2 casos de error).
Ejecución exitosa del pipeline CI/CD.
Aprobación de los checks Build, Lint, Test (Node 22) y Test (Node 24).
Pull Request fusionado correctamente a la rama dev.
Verificación del workflow posterior al merge en estado exitoso.
Evidencias adjuntas
Captura del Pull Request fusionado.
Captura de los checks en verde.
Captura del log de ejecución de pruebas.
Captura del workflow exitoso en Actions.
Captura de eliminación de la rama feature/pruebas-unitarias.
