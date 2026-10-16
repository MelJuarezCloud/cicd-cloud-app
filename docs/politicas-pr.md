# Políticas de Pull Requests

Estas políticas aplican a todos los PR del repositorio.

## Reglas obligatorias
- El PR debe pasar ESLint sin errores.
- El PR debe pasar todas las pruebas unitarias (Jest).
- Los commits deben seguir Conventional Commits.
- Debe existir al menos 1 revisor.
- El pipeline de CI/CD debe ejecutarse correctamente.
- Si falla lint o tests, el PR queda bloqueado automáticamente.

## Objetivo
Garantizar calidad, consistencia y estabilidad del código.
