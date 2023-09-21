/* importe o file system para trabalhar com arquivos */
const fs = require('fs')

const data = fs.readFileSync('dados.json','utf8');

const obj = JSON.parse(data);

console.log(obj.nome);
console.log(obj.empresa);
console.log(obj.lucy[3]);
console.log(obj.familia.namorada);
console.log(obj.funcoes.mais)



