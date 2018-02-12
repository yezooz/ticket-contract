const solc = require('solc');
const fs = require('fs');

const inputs = {
  './src/TravelTicket.sol': {
    'content': fs.readFileSync('./src/TravelTicket.sol').toString()
  }
};

// Assumes imported files are in the same folder/local path
function findImports(path) {
  path = path.charAt(0) === '.' ? path : './node_modules/' + path;
  
  return {
    'contents': fs.readFileSync(path).toString()
  }
}

const compiledCode = solc.compileStandardWrapper({sources: inputs}, findImports);
console.log(compiledCode);

if (compiledCode.errors && compiledCode.errors.length > 0) {
  console.error(compiledCode.errors);
}

for (const id in compiledCode.contracts) {
  console.log(id);
  console.log(compiledCode.contracts[id].interface);
}

// fs.writeFile('./build/TravelTicket.json', JSON.stringify(compiledCode), function(err) {
//     if (err) throw err;
//     console.log('Compilation complete');
// });
