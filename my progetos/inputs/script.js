function calcularsoma(){
    var n1 = window.document.getElementById('isom');/* Pega os valores */
    var n2 = window.document.getElementById('isom2');
    var ptres = window.document.getElementById('ressomar')
    var nr = Number.parseInt(n1.value) /* Transforma em numero e diz que é um valor */
    var nr2 = Number.parseInt(n2.value)
    var r = nr + nr2
    ptres.innerHTML = ` ${nr} + ${nr2} =${r}`
    console.log(r)
}
function calcularsub(){
    var n1 = window.document.getElementById('isub')
    var rn1 = Number.parseInt(n1.value);
    var n2 = window.document.getElementById('isub2')
    var rn2 = Number.parseInt(n2.value);
    var res = rn1 - rn2;
    var prinsub = window.document.getElementById('ressub')
    prinsub.innerHTML = `${res}`
    if (res == NaN || rn1 == NaN || rn2 == NaN){
        prinsub.innerHTML = 'Desculpe campo vazio'
    }

}
function calcularmulti(){
    
}