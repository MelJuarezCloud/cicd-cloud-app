function sum(a, b) {
  if (
    typeof a !== 'number' ||
    typeof b !== 'number' ||
    Number.isNaN(a) ||
    Number.isNaN(b)
  ) {
    throw new TypeError('sum requiere dos numeros validos');
  }
  return a + b;
}

module.exports = { sum };
