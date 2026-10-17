module.exports = { sum };

test("suma dos números positivos", () => {
  expect(sum(2, 3)).toBe(5);
});

test("suma números negativos", () => {
  expect(sum(-1, -1)).toBe(-2);
});

test("suma cero con otro número", () => {
  expect(sum(0, 5)).toBe(5);
});

test("suma números grandes", () => {
  expect(sum(1000, 2000)).toBe(3000);
});

test("suma decimales", () => {
  expect(sum(1.5, 2.5)).toBe(4);
});
