const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');

const distDir = 'dist';

function minifyJavaScriptFiles(directory) {
  const options = {
    mangle: true,
    compress: {},
  };

  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      minifyJavaScriptFiles(filePath);
    } else if (stat.isFile() && file.endsWith('.js')) {
      const sourceCode = fs.readFileSync(filePath, 'utf8');
      const minifiedCode = uglify.minify(sourceCode, options).code;
      fs.writeFileSync(filePath, minifiedCode);
    }
  });
}

minifyJavaScriptFiles(distDir);
