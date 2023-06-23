var canvas, context,
    barraWidth, barraHeigth,
    jogadorPosX, jogadorPosY,
    teclaCimaPressionada, teclaBaixoPressionada,
    oponentePosX, oponentePosY,
    oponenteParaCima,
    bolaRaio,
    bolaPosX, bolaPosY,
    bolaParaDireita,
    bolaAngulo,
    bolaTempo,
    velocidadeJogador, velocidadeOponente,
    velocidadeBola,
    pontosJogador, pontosOponente;

function iniciarJogo() {

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    barraWidth = 30;
    barraHeigth = 90;
    jogadorPosX = 0;
    jogadorPosY = (canvas.height - barraHeigth) / 2;
    teclaBaixoPressionada = false;
    teclaCimaPressionada = false;

    oponentePosX = canvas.width - barraWidth;
    oponentePosY = 0;
    oponenteParaCima = false;

    bolaRaio = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = canvas.height / 2;

    bolaParaDireita = false;
    bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
    bolaTempo = 0;
    velocidadeJogador = 15;
    velocidadeOponente = 30;
    velocidadeBola = 10;
    pontosJogador = 0;
    pontosOponente = 0;

    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);

    setInterval(loopGame, 30);
}

function keyUp(e) {
    if (e.keyCode == 38) {
        teclaCimaPressionada = false;
    } else if (e.keyCode == 40) {
        teclaBaixoPressionada = false;
    }
}

function keyDown(e) {
    if (e.keyCode == 38) {
        teclaCimaPressionada = true;
    } else if (e.keyCode == 40) {
        teclaBaixoPressionada = true;
    }
}


function loopGame() {


    //  JOGADOR ********************************************************************

    if (teclaCimaPressionada != teclaBaixoPressionada) { // se o usuário precionar para sima
        if (teclaCimaPressionada) { // se for para cima pressionado
            if (jogadorPosY > 0) { // se a bola nçao sair da tela
                jogadorPosY -= velocidadeJogador; // muda posição do jogador
            }
        }
        else { // se for para baixo 
            if (jogadorPosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
                jogadorPosY += velocidadeJogador; // muda posição
            }
        }
    }

    // OPONENTE ********************************************************************************

    if (oponenteParaCima) { // caso o oponente estivcer inddo para cima
        oponentePosY -= velocidadeOponente;
        if (oponentePosY <= 0) // se a bola estiver saindo da tela
        {
            oponenteParaCima = false;
        }
    }
    else { // se o oponente estiver se movendo para cima
        oponentePosY += velocidadeOponente;
        if (oponentePosY >= canvas.height - barraHeigth) { // caso a bola estiver saindo da tela

            oponenteParaCima = true;
        }
    }

    // BOLA **************************************************************************

    if (bolaTempo <= 0) // caso a bola estiver em jogo, o tempo  e zerado apos marcar ponto, abola ficará invisivel por um tempo
    {
        if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) { // caso o jogador encoste na bola no eixo X
            if ((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeigth)) { // caso o jogador encoste na bola no eixo Y
                bolaParaDireita = true;
                if (teclaBaixoPressionada) { // se o usuário estiver indo para baixo e tocar na bola
                    bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                }
                else {
                    bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                }
            }
        }
        else {
            if ((bolaPosX + bolaRaio) >= oponentePosX) { // se o oponente encostar na bola no eixo X
                if ((bolaPosY + bolaRaio) > oponentePosY && (bolaPosY - bolaRaio < oponentePosY + barraHeigth)) { // se o oponente encostar na bola no eixo Y

                    bolaParaDireita = false;
                    if (oponenteParaCima) { // caso oponetne estiver indo para cima ao tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                    }
                    else { // caso o oponetne estiover info para baico quando tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                    }
                }
            }
        }

        if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) { // se a boal estiver indo para cima ou para baixo na tela
            bolaAngulo = bolaAngulo * -1; // multiplicamos por - 1 para inverter a direção da bola no eixo y
        }
        bolaPosY += bolaAngulo; // move bola para cima ou para baixo de acordo com o cauculo acima

        if (bolaParaDireita) {
            bolaPosX += velocidadeBola; // move vbola para direita
        }
        else {
            bolaPosX -= velocidadeBola; // move vbola para esquerda
        }
    }

    if ((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)) { // se a bola saiu da tela
        if (bolaTempo >= 50) { // se o tempo de deixar a bola invisuivel passou 
            if (bolaPosX <= - bolaRaio) { // se bola saiu na esquerda 
                pontosOponente++;
            }
            else { // se bola saiu na direita 
                pontosJogador++;
            }

            bolaPosX = canvas.width / 2; // coloca bola no centro da tela
            bolaPosY = canvas.height / 2; // coloca bola no centro da tela

            bolaParaDireita = false;
            bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
            bolaTempo = 0; // zera  ortempo de deixar a bola invisivel e coloca novamente em jogo
        }
        else { // caso o tempo de deixar a bola invisivel não acabou 
            bolaTempo++;
        }
    }

    //  DESENHA TODA A TELA ****************************************************************************
    context.clearRect(0, 0, canvas.width, canvas.height); // limpar a tela antes de desenhar

    //  JOGADOR E OPONENTE *************************************************************************
    context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeigth); /// desenha jogador
    context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeigth); /// desenha ioponente


    // BOLA ************************************************************************************************
    context.beginPath(); // modo desenho 
    context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o circulo com coordenadas no centro
    context.closePath(); // finaliza o caminho/ não obrigatorio
    context.fill();

    // PLACAR ************************************************************************************************

    var pontosA = pontosJogador; // variaveis temporarias para alterar pontiação
    var pontosB = pontosOponente;

    if (pontosA < 10) { // voloca zero a esquerda se for menor que 10 a pontiação 
        pontosA = "0" + pontosA;
    }

    if (pontosB < 10) { // voloca zero a esquerda se for menor que 10 a pontiação 
        pontosB = "0" + pontosB;
    }


    context.font = "38pt Arial"; // tamanho e fonte
    context.fillStyle = "#000000";
    context.fillText(pontosA + "  " + pontosB, (canvas.width / 2) - 70, 50); // escrevendo texto no centro da tela no top


    //  LINHA DIVISÓRIA
    context.beginPath();
    context.moveTo(canvas.width / 2, 0); // arrumar lapis para fazere a escrita da linha
    context.lineTo(canvas.width / 2, canvas.height);// faz risco na tela no centro
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();
  
}





$(function () {
    iniciarJogo();
});