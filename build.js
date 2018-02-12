const solc = require('solc');
const fs = require('fs');

const inputs = {
  'TravelTicket.sol': fs.readFileSync('./src/TravelTicket.sol').toString()
}

// Assumes imported files are in the same folder/local path
function findImports(path) {
  path = path.charAt(0) === '.'
    ? path
    : './node_modules/' + path;

  return {'contents': fs.readFileSync(path).toString()}
}

const compiledCode = solc.compile({
  'sources': inputs
}, 1, findImports);
console.log(compiledCode);

if (compiledCode.errors && compiledCode.errors.length > 0) {
  console.error(compiledCode.errors);
}

for (const id in compiledCode.contracts) {
  console.log(id);
  console.log(compiledCode.contracts[id].interface);
}

const TravelTicketABI = compiledCode.contracts['TravelTicket.sol:TravelTicket'].interface;
console.log(TravelTicketABI);

// fs.writeFile('./build/TravelTicket.json', JSON.stringify(compiledCode), function(err) {
//     if (err) throw err;
//     console.log('Compilation complete');
// });