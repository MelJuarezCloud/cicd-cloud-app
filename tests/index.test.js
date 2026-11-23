const fs = require('fs');
const path = require('path');

const publico = path.join(__dirname, '..', 'public');

describe('pagina inicial', () => {
  const html = fs.readFileSync(path.join(publico, 'index.html'), 'utf8');

  test('contiene el titulo del proyecto', () => {
    expect(html).toContain('CI/CD Cloud');
  });

  test('indica que el estado es en linea', () => {
    expect(html).toContain('en línea');
  });
});

describe('health check', () => {
  test('health.json es valido y reporta estado ok', () => {
    const datos = JSON.parse(
      fs.readFileSync(path.join(publico, 'health.json'), 'utf8')
    );
    expect(datos.status).toBe('ok');
  });
});
