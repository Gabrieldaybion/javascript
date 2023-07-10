function parimpar(n){
    if(n%2 == 0){
        return 'par'
    }else{
        return 'impar'
    }
}
console.log(parimpar(13))                                                                                                               
let res= parimpar(12)
console.log(res)

function somar(n1=0,n2=0)/* Se n1 não receber parametro receba 0. */{
    return n1 + n2
}
console.log(somar(3,5))