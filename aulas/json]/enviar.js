let texto = "vazio";


function enviar(){
    var txt = document.getElementById('txt');
    window.texto = String(txt.value);
    console.log(texto);
}