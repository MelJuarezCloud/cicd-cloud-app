function esPar(num) {
  return num % 2 === 0;
}

test("detecta número par correctamente", () => {
  expect(esPar(4)).toBe(true);
});

test("detecta número impar correctamente", () => {
  expect(esPar(5)).toBe(false);
});
