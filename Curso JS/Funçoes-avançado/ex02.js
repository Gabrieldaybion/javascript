/* function funcao(a , b ,c ){
    let total = 0;
    for (argumento of arguments){
        total += argumento
    }
    console.log(`A soma deu ${total}, e os valores informados foram ${a},${b},${c},`);
}
funcao(10,50,30); */

function conta(operador, acumulador, ...numeros){
    for(let numero of numeros){  
        if (operador=='+')acumulador += numero;
        if (operador=='-')acumulador -= numero;
        if (operador=='/')acumulador /= numero;
        if (operador=='x')acumulador *= numero;  

    }
    console.log(acumulador);
}
conta('x',1, 20,10     )