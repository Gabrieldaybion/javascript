var agora = new Date() /* Pega a hora atual do pc */
var hora = agora.getHours(); /* Põe dentro de uma variavel o horario */
console.log(`Agora são exatamente ${hora} horas.`)
if(hora < 12){
    console.log('Bom dia')

}else if( hora <= 18){
    console.log('Boa tarde')
}else{
    console.log('Boa noite')
}