const fs = require('fs');
const nome ='Gabriel Xavier';
const empresa = "DEGABIONTWESS";
const lucy = ["1.0","1.0.1","1.1","1.2","1.3","1.4"];
const familia = {mae:"Andreia",namorada:"Fabielly-Moranguinho"};
const funcoes = {mais:"(a,b)=>{return a + b}",menos:"(c,d)=>{return c-d}"}

// Crie um objeto JSON com a variável e converta-o para uma string JSON
const data = JSON.stringify({empresa,nome,lucy,familia,funcoes});
/* Cria o arquivo json */
fs.writeFileSync('dados.json',data);


