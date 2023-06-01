var idade = 7;
console.log(`Você tem ${idade} anos`)
if (idade < 16){
    console.log('Você não vota')

}
else if ( idade < 18 || idade > 67){
    
        console.log('Voto opicional')

} else if (idade > 18) {
    console.log('Voto obrigatorio')
}