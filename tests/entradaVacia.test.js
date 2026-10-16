function validarEntrada(texto) {
  if (!texto || texto.trim() === "") {
    return "Entrada inválida";
  }
  return "OK";
}

test("detecta string vacío", () => {
  expect(validarEntrada("")).toBe("Entrada inválida");
});

test("detecta espacios vacíos", () => {
  expect(validarEntrada("   ")).toBe("Entrada inválida");
});

test("acepta texto válido", () => {
  expect(validarEntrada("hola")).toBe("OK");
});

