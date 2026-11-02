describe("Pruebas básicas", () => {
  test("suma correctamente", () => {
    expect(2 + 2).toBe(4);
  });

  test("resta correctamente", () => {
    expect(5 - 2).toBe(3);
  });

  test("multiplica correctamente", () => {
    expect(3 * 2).toBe(6);
  });

  test("divide correctamente", () => {
    expect(6 / 2).toBe(3);
  });

  test("maneja errores", () => {
    expect(() => {
      throw new Error("Error de prueba");
    }).toThrow();
  });
});
