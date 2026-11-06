Bitácora de Trabajo Individual – Fase 1

Estudiante: Tamara Abigail Martínez Lemus
 Rol: QA / Testing & CI
 Proyecto: CI/CD Cloud Económico para Aplicaciones Web

Actividad 1: Selección y Configuración del Linter (ESLint)

Descripción:
 Durante esta actividad revisé los lineamientos de calidad de código utilizados en el proyecto. Analicé las reglas de ESLint para comprender cómo ayudan a mantener un código más ordenado y consistente, además de identificar los errores de estilo antes de integrar cambios al repositorio.

Entregable:
 Documentación relacionada con las reglas y lineamientos de ESLint.

Estado:
 Comprobado.

Actividad 2: Convención de Commits

Descripción:
 Revisé la convención de commits utilizada en el proyecto para comprender la estructura de los mensajes y la forma correcta de documentar los cambios realizados. También analicé el uso de prefijos como feat, fix, docs, test y ci.

Entregable:
 Documentación de la convención de commits utilizada en el repositorio.

Estado:
 Comprobado.

Actividad 3: Revisión del Flujo de Pull Requests

Descripción:
 Analicé el flujo de trabajo utilizado para la integración de cambios mediante Pull Requests. Revisé los criterios de validación requeridos antes de realizar un merge y la importancia de las pruebas automáticas dentro del proceso de integración continua.

Entregable:
 Comprensión del flujo de revisión y validación de cambios antes de ser integrados a la rama de desarrollo.

Estado:
 Comprobado.

Actividad 4: Implementación y Validación de Pruebas Unitarias

Descripción:
 Participé en la implementación y validación de pruebas unitarias con Jest. Revisé la estructura de las pruebas, el funcionamiento del pipeline de integración continua y la forma en que las pruebas permiten detectar errores antes de integrar nuevos cambios al proyecto.

Entregable:
 Pruebas unitarias verificadas mediante el pipeline CI/CD.

Estado:
 Comprobado.

Aprendizajes Obtenidos
Comprendí la importancia del uso de ESLint para mantener estándares de calidad en el código.
Aprendí a utilizar Conventional Commits para documentar cambios de forma ordenada.
Reforcé el uso de ramas y Pull Requests dentro de un entorno colaborativo.
Comprendí cómo GitHub Actions ejecuta validaciones automáticas antes de integrar cambios.
Identifiqué la importancia de las pruebas unitarias para garantizar el correcto funcionamiento del código.




**********Bitácora de Trabajo Individual – Fase 2**********

* Actividad realizada

Durante esta fase trabajé en la implementación y validación de pruebas unitarias dentro del proyecto CI/CD Cloud Económico para Aplicaciones Web. Para ello utilicé una rama de trabajo derivada de dev, donde realicé modificaciones en el archivo src/sum.js con el objetivo de agregar validaciones que permitieran verificar el tipo de datos recibidos por la función y generar errores controlados cuando los parámetros fueran incorrectos.

Posteriormente desarrollé y ejecuté pruebas unitarias utilizando Jest. Mi contribución principal fue la creación de las 6 pruebas contenidas en tests/sum.test.js, las cuales incluyeron casos normales de operación y escenarios de error. Durante la revisión de los archivos de prueba también validé la estructura y sintaxis del archivo para asegurar su correcta ejecución dentro del entorno Jest, corrigiendo detalles de formato que podían afectar la interpretación del código. Además, verifiqué la correcta ejecución de todas las pruebas existentes del proyecto mediante el pipeline de integración continua y confirmé el funcionamiento adecuado de los archivos de prueba incluidos en el repositorio.

Una vez finalizados los cambios, generé el Pull Request correspondiente, validé la ejecución de los workflows automáticos y confirmé que todas las verificaciones finalizaran correctamente antes de realizar el merge hacia la rama dev.

Eliminación de archivos temporales ( app.test.js)

* Problemas encontrados

Al inicio tuve dificultades para localizar algunos archivos debido a una confusión entre las ramas del repositorio. Después de revisar la estructura del proyecto pude identificar correctamente los archivos necesarios para realizar la actividad.

Durante la revisión de los resultados del pipeline observé que el proyecto ejecutaba más pruebas de las que inicialmente había considerado. Aunque desarrollé 6 pruebas en sum.test.js, el proyecto contaba con un total de 13 pruebas distribuidas en 5 archivos de prueba.

Además, se identificó que el archivo main.yml había sido modificado directamente en la rama dev, lo que provocó la pérdida de la configuración relacionada con la cobertura de pruebas, validaciones de lint estrictas y parte del comportamiento esperado del workflow.

* Soluciones aplicadas

Verifiqué la rama activa antes de realizar modificaciones y revisé la estructura completa del repositorio para localizar correctamente los archivos requeridos.

- Para validar los resultados, revisé los logs generados por GitHub Actions y confirmé que el pipeline ejecutaba correctamente las 13 pruebas existentes del proyecto distribuidas en los siguientes archivos:

entradaVacia.test.js

integracion.test.js

sum.test.js

esPar.test.js

errores.test.js

(Los archivos integracion.test.js, esPar.test.js, errores.test.js y entradaVacia.test.js fueron desarrollados e implementados por mí como parte de las actividades realizadas durante esta fase del proyecto. Por lo tanto, no corresponden a archivos encontrados, identificados o descubiertos en el repositorio, sino a artefactos creados específicamente para la validación y pruebas del código).
Adjunto capturas:
<img width="1186" height="380" alt="Captura de pantalla 2026-11-05 132156" src="https://github.com/user-attachments/assets/6b19e235-1706-464c-a570-31542d70aec6" />


<img width="1317" height="683" alt="Captura de pantalla 2026-11-03 114917" src="https://github.com/user-attachments/assets/b0678185-e687-48ea-9d93-d2d15cad0a7f" />


-También revisé el historial de main.yml y observé que se había realizado cambios directamente en la rama dev. Como resultado, se perdió la configuración relacionada con la cobertura de pruebas (--coverage), las validaciones de lint estricto y parte de la configuración de reintentos del workflow. Posteriormente, estos elementos fueron restaurados por Melvin Juárez mediante el PR #7, recuperando el funcionamiento esperado del pipeline CI/CD.

Como parte del proceso de aprendizaje y validación del entorno de pruebas, creé temporalmente app.test.js para comprobar el funcionamiento de las herramientas de testing. Posteriormente, el archivo fue eliminado, ya que su propósito era únicamente servir como prueba inicial y no como un componente definitivo del proyecto.


* Resultados obtenidos

* 18 de octubre de 2026 

- Creé los archivos sum.test.js, integracion.test.js, esPar.test.js, errores.test.js y entradaVacia.test.js.
- Ejecuté y validé las pruebas desarrolladas en el entorno del proyecto. (Adjunte capturas en la sección de "soluciones aplicadas" en esta bitácora).

* 2 de noviembre de 2026

- Implementé validaciones de tipo de datos en src/sum.js.
- Finalicé el desarrollo de las pruebas unitarias en tests/sum.test.js.
- Generé el Pull Request #6 y verifiqué la aprobación de las validaciones automáticas del pipeline.
- Realicé el merge del PR #6 hacia la rama dev.
Resultado: El Pull Request completó satisfactoriamente todas las validaciones automáticas del pipeline CI/CD y fue fusionado correctamente a la rama dev. Posteriormente realicé una revisión adicional de los archivos de prueba del proyecto, validé nuevamente la estructura y ejecución de sum.test.js, y ejecuté una nueva corrida del pipeline mediante GitHub Actions. Como resultado, se confirmaron exitosamente las validaciones de Build, Lint, Test (Node 22) y Test (Node 24), con un total de 5 suites de prueba y 13 pruebas ejecutadas correctamente.

* 3 de noviembre de 2026

- Revisé el historial de cambios del archivo main.yml.
- Identifiqué la eliminación de configuraciones relacionadas con cobertura de pruebas, validaciones de lint y reintentos del workflow.
- Revisé el Pull Request #7 para comprender la restauración de dichas configuraciones y el funcionamiento esperado del pipeline CI/CD.
- Documenté los hallazgos obtenidos durante el análisis del workflow.
- Se actualiza la bitácora y documentación a traves de otro raíz y se hace PR#9 (En el PR #9 salieron cinco 5 commits internos no usan prefijos docs: ni test:)


* 5 de noviembre de 2026
- Se crea PR #11 para ajustar, eliminar archivos (app.test.js) y corregir y agregar movimientos para la bitácora individual.
- Se deja comentario sobre los prefijos omitidos. 
<img width="1198" height="562" alt="image" src="https://github.com/user-attachments/assets/c517b741-5a91-4967-8720-d9a4ddb74acb" />


* Aprendizajes obtenidos

- Durante la revisión del PR #9 y la elaboración del PR #11 identifiqué la importancia de utilizar correctamente los prefijos establecidos para los commits (docs: y test:) y de agregar una descripción clara a cada Pull Request. Como aprendizaje, comprendí que estas prácticas facilitan la organización, la colaboración entre los integrantes del equipo y la trazabilidad de los cambios realizados en el proyecto. Aunque en ambos PR ya no era posible corregir los commits después del merge, procuraré aplicar correctamente estas convenciones en futuras contribuciones.

- Aprendí a utilizar de forma más práctica las ramas de trabajo, los Pull Requests y el proceso de revisión antes de integrar cambios a la rama de desarrollo.

- Fortalecí mis conocimientos sobre GitHub Actions y la forma en que las validaciones automáticas ayudan a mantener la calidad del proyecto.

- Aprendí a revisar el historial de cambios del repositorio para entender mejor las modificaciones realizadas por los distintos integrantes del equipo.

- Comprendí la importancia de documentar adecuadamente las actividades realizadas y de mantener una nomenclatura consistente en los commits para facilitar el seguimiento de los cambios.

* Evidencias adjuntas
Captura del Pull Request fusionado.
<img width="1047" height="161" alt="Captura de pantalla 2026-11-02 012547" src="https://github.com/user-attachments/assets/d9ac7146-8c9f-46b2-98f9-6c4f451214a6" />

Captura de los checks en verde.
<img width="1056" height="673" alt="Captura de pantalla 2026-11-02 002336" src="https://github.com/user-attachments/assets/04d5ef56-6ffa-4707-8926-b5a2bdbec97b" />

Captura del log de ejecución de pruebas.
<img width="1025" height="742" alt="Captura de pantalla 2026-11-02 004759" src="https://github.com/user-attachments/assets/39af7095-2002-42bd-a471-b567ace727e3" />

Captura del workflow exitoso en GitHub Actions.
<img width="1102" height="181" alt="Captura de pantalla 2026-11-02 013056" src="https://github.com/user-attachments/assets/9665ed6e-1d9a-4ef5-834f-2b41697d7cb1" />


Captura de la eliminación de la rama feature/pruebas-unitarias.
<img width="1006" height="303" alt="Captura de pantalla 2026-11-02 012730" src="https://github.com/user-attachments/assets/01330a1d-ac09-4775-b2c3-f48ddfddac26" />



