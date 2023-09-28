console.log('Renan Reis');
const Dado =  function (){
    console.log('Sou um dado')
}
 
function exe (funçao){
    funçao();
} 
exe(Dado);

/* Arrow function */
const farrow = () =>{
    console.log('Sou uma arrow function')
}
farrow()

const obj = {
    falar:()=>{
        console.log('olá meu amigo eu etou falando')
    }
}
obj.falar()