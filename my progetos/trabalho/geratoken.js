const ztoken = ""/* Criei uma variavel global do ztoken para receber o valor do 
token quando ele estiver dentro da função */
executeApi('getZoomToken').then(response => //Gera um novo token do Zoom para usar nas APIs
    {
        if (response.statusCode === 200) 
        {
            app.log('codigo 200');
            app.log('token zoom gerado com successo');
            const bodytoken = JSON.parse(response.body);
            app.log(bodytoken, 'respota da API geraTokenZoom = ');
            const ztoken = bodytoken.access_token;
            app.log(ztoken, 'token zoom = ');
            return resolve(ztoken);
        }
        else 
        {
            app.log(response, 'error | tokenZoom');
            return resolve();
        }
    });
    
/* Estou exportando o ztoken o tranformando em um objeto para o gerareuniaozoom*/
module.exports  = {zoomtoken:ztoken}
    