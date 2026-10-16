function dividir(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Parámetros inválidos");
  }
  return a / b;
}

test("lanza error si los parámetros no son números", () => {
  expect(() => dividir("hola", 2)).toThrow("Parámetros inválidos");
});
