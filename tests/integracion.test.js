function sumar(a, b) {
  return a + b;
}

function multiplicar(a, b) {
  return a * b;
}

test("prueba de integración: sumar y luego multiplicar", () => {
  const resultadoSuma = sumar(2, 3); // 5
  const resultadoFinal = multiplicar(resultadoSuma, 2); // 10
  expect(resultadoFinal).toBe(10);
});
