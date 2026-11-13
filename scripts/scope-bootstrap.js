const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const prefixwrap = require('postcss-prefixwrap');

const inputPath = path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css');
const outputDir = path.join(__dirname, '../styles');
const outputPath = path.join(outputDir, 'bootstrap-scoped.css');

const css = fs.readFileSync(inputPath, 'utf8');

postcss([prefixwrap('.bootstrap-scope')])
  .process(css, { from: inputPath, to: outputPath })
  .then((result) => {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, result.css);
    console.log('Scoped bootstrap CSS written to', outputPath);
  })
  .catch((err) => {
    console.error('Failed to scope bootstrap CSS:', err);
    process.exit(1);
  });