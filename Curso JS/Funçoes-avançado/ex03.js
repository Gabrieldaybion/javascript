function falaFrase(comeco){
    function falaResto(resto){
        return comeco + ' ' + resto
    }
    return falaResto;
}
const falaInicial = falaFrase('Olá');
const falaFinal = falaInicial('Moranguinho')
console.log(falaFinal);
/* ================================================= */
function duplica(n){
    return n * 2
}
function triplica(n){
    return n * 3
}

function quadriplica(n){
    return n * 4
}
/* Ou podemos fazer assim */
function multiplicador (multi){
    /* Multiplicador  */
    return function(n){
        return n * multi
    }
}
const contas = (num,multipli)<={
    
}
