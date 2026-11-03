Bitácora de Trabajo Individual – Fase 1

Estudiante: Tamara Abigail Martínez Lemus
 Rol: Desarrollador Web Jr.
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




Bitácora de Trabajo Individual – Fase 2

Actividad realizada

Durante esta fase trabajé en la implementación y validación de pruebas unitarias dentro del proyecto CI/CD Cloud Económico para Aplicaciones Web. Para ello utilicé una rama de trabajo derivada de dev, donde realicé modificaciones en el archivo src/sum.js con el objetivo de agregar validaciones que permitieran verificar el tipo de datos recibidos por la función y generar errores controlados cuando los parámetros fueran incorrectos.

Posteriormente desarrollé y ejecuté pruebas unitarias utilizando Jest. Mi contribución principal fue la creación de las 5 pruebas contenidas en tests/sum.test.js, las cuales incluyeron casos normales de operación y escenarios de error. Durante la revisión de los archivos de prueba también validé la estructura y sintaxis del archivo para asegurar su correcta ejecución dentro del entorno Jest, corrigiendo detalles de formato que podían afectar la interpretación del código. Además, verifiqué la correcta ejecución de todas las pruebas existentes del proyecto mediante el pipeline de integración continua y confirmé el funcionamiento adecuado de los archivos de prueba incluidos en el repositorio, entre ellos app.tests.js, utilizado como prueba de validación inicial del entorno de testing.

Una vez finalizados los cambios, generé el Pull Request correspondiente, validé la ejecución de los workflows automáticos y confirmé que todas las verificaciones finalizaran correctamente antes de realizar el merge hacia la rama dev.

Problemas encontrados

Al inicio tuve dificultades para localizar algunos archivos debido a una confusión entre las ramas del repositorio. Después de revisar la estructura del proyecto pude identificar correctamente los archivos necesarios para realizar la actividad.

Durante la revisión de los resultados del pipeline observé que el proyecto ejecutaba más pruebas de las que inicialmente había considerado. Aunque desarrollé 6 pruebas en sum.test.js, el proyecto contaba con un total de 13 pruebas distribuidas en 5 archivos de prueba.

Además, se identificó que el archivo main.yml había sido modificado directamente en la rama dev, lo que provocó la pérdida de la configuración relacionada con la cobertura de pruebas, validaciones de lint estrictas y parte del comportamiento esperado del workflow.

Soluciones aplicadas

Verifiqué la rama activa antes de realizar modificaciones y revisé la estructura completa del repositorio para localizar correctamente los archivos requeridos.

Para validar los resultados, revisé los logs generados por GitHub Actions y confirmé que el pipeline ejecutaba correctamente las 13 pruebas existentes del proyecto distribuidas en los siguientes archivos:

entradaVacia.test.js

integracion.test.js

sum.test.js

esPar.test.js

errores.test.js

<img width="1317" height="683" alt="Captura de pantalla 2026-11-03 114917" src="https://github.com/user-attachments/assets/b0678185-e687-48ea-9d93-d2d15cad0a7f" />


También revisé el historial de main.yml y observé que se realizaron cambios directamente en la rama dev. Como resultado, se perdió la configuración que ejecutaba la cobertura de pruebas, el lint estricto y parte de la configuración de reintentos del workflow. Posteriormente, esos elementos fueron restaurados por Melvin Juárez mediante el PR #7, recuperando el funcionamiento esperado del pipeline CI/CD.

Además, revisé el contenido de los archivos de prueba para verificar la compatibilidad con Jest y asegurar la correcta ejecución dentro del pipeline CI/CD. Durante esta validación corregí detalles de formato en el archivo de pruebas unitarias, evitando posibles errores de sintaxis y garantizando el funcionamiento esperado de las pruebas automatizadas.

Resultados obtenidos
Implementé validaciones de tipo en la función sum.
Desarrollé 6 pruebas unitarias en tests/sum.test.js.
Verifiqué la ejecución satisfactoria de un total de 13 pruebas distribuidas en 5 archivos de prueba.
Confirmé una cobertura del 100 % para el archivo sum.js.
Validé exitosamente la ejecución del pipeline CI/CD.
Obtuve la aprobación de los checks Build, Lint, Test (Node 22) y Test (Node 24).
Completé el proceso de integración mediante el Pull Request #6.
Realicé el merge del Pull Request #6 hacia la rama dev.
Verifiqué que el workflow posterior al merge finalizara exitosamente.
Revisé y validé la estructura de los archivos de prueba utilizados por Jest.
Confirmé el correcto funcionamiento de los archivos de prueba incluidos en el repositorio.
Verifiqué la ejecución exitosa de 5 suites de pruebas y 13 pruebas automatizadas.
Información del Pull Request

Número: PR #6
 Título: test: agrega pruebas unitarias de casos normales y de error
 Fecha de realización: 1 de noviembre de 2026
 Resultado: El Pull Request completó satisfactoriamente todas las validaciones automáticas del pipeline CI/CD y fue fusionado correctamente a la rama dev. Posteriormente realicé una revisión adicional de los archivos de prueba del proyecto, validé nuevamente la estructura y ejecución de sum.test.js y app.tests.js, y ejecuté una nueva corrida del pipeline mediante GitHub Actions. Como resultado, se confirmaron exitosamente las validaciones de Build, Lint, Test (Node 22) y Test (Node 24), con un total de 5 suites de prueba y 13 pruebas ejecutadas correctamente.

Evidencias adjuntas
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


