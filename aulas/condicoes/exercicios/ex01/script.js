function carregar(){
    var msg = window.document.getElementById('msg');
    var imk = window.document.getElementById('imagem');
    var data = new Date();
    var hora = data.getHours(); 
    /* var hora = 22 */
    msg.innerHTML = `Agora são ${hora} horas.`;
     
    if(hora >= 0 && hora < 12){
        /* Bom dia */
        imk.src = 'imagens/manha.jpg'
    }else if(hora >= 12 && hora < 18){
        /* Boa tarde */
        imk.src = 'imagens/tarde.jpg'
    }else{
        /* Boa noite */
        imk.src ='imagens/noite.jpg'
    }
};

