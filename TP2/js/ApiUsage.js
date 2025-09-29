"Use strict"
document.addEventListener("DOMContentLoaded", iniciarpagina);// Una vez que el Contenido del DOM este cargado inicia js.

function iniciarpagina(){
    
    const url = "https://vj.interfaces.jima.com.ar/api/v2";
    const cards = document.getElementsByClassName("card-carrusel");


    async function obtainsJson(){
        let savejson = await fetch(url);
        let cardsdate = await savejson.json();
        presentInformation(cardsdate);
    }


    function presentInfomarmartion(cardsdate){
        for(let card of cardsdate){
            
        }
    }
}
