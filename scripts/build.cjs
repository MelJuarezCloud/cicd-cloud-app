// Build del proyecto: valida la pagina publica y genera dist/.
// Falla (exit 1) si falta public/index.html o si no contiene el titulo esperado.
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const origen = path.join(raiz, 'public');
const destino = path.join(raiz, 'dist');
const indice = path.join(origen, 'index.html');

if (!fs.existsSync(indice)) {
  console.error('ERROR: falta public/index.html');
  process.exit(1);
}

const html = fs.readFileSync(indice, 'utf8');
if (!html.includes('CI/CD Cloud')) {
  console.error('ERROR: public/index.html no contiene el titulo del proyecto');
  process.exit(1);
}

fs.rmSync(destino, { recursive: true, force: true });
fs.cpSync(origen, destino, { recursive: true });
console.log('Build OK: dist/ generado con ' + fs.readdirSync(destino).length + ' archivo(s)');
