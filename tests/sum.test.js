const { sum } = require('../src/sum');

describe('sum - casos normales', () => {
  test('1. suma dos numeros positivos', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('2. suma numeros negativos', () => {
    expect(sum(-4, -6)).toBe(-10);
  });

  test('3. suma con cero', () => {
    expect(sum(0, 7)).toBe(7);
  });

  test('4. suma numeros decimales', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe('sum - escenarios de error', () => {
  test('5. lanza error si recibe un texto', () => {
    expect(() => sum('2', 3)).toThrow(TypeError);
  });

  test('6. lanza error si falta un argumento', () => {
    expect(() => sum(5)).toThrow('sum requiere dos numeros validos');
  });
});
