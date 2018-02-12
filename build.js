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
// console.log(compiledCode);

if (compiledCode.errors && compiledCode.errors.length > 0) {
  console.error(compiledCode.errors);
  return;
}

fs.writeFile('./build/TravelTicket.json', JSON.stringify(compiledCode), function(err) {
  if (err) 
    throw err;
  console.log('Compilation complete');
});

// for (const id in compiledCode.contracts) {
//   console.log(id);
//   console.log(compiledCode.contracts[id].interface);
// }

const travelTicket = compiledCode.contracts['TravelTicket.sol:TravelTicket'];
// console.log(travelTicket);

const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const abi = JSON.parse(travelTicket.interface);
const bytecode = travelTicket.bytecode;
const travelTicketInstance = new web3.eth.Contract(abi, {
  data: '0x' + bytecode,
  gas: 90000 * 2
});

web3.eth.getAccounts().then(accounts => {
  return travelTicketInstance.deploy().send({from: accounts[0], gas: 4712388, gasPrice: '100000000000'});
}).then((receipt) => {
  console.log(`Contract deployed @ ${receipt.options.address}`);
});
