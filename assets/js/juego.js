/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3
let index = 1

const getElementsDeck = () => {
    let elementDeck = []
    for(let i = 1; i <= NMOVIES; i++) {
        for(let j = 1; j <= NELEMENTSPMOVIE; j++) {
            elementDeck.push("0"+i+"C"+j)
        } 
    }
    //Barajamos
    elementDeck = _.shuffle(elementDeck)
    return elementDeck;
}

const getMovie = () => {
    const movie = `0${index + 1}M`;
    index++;

    if (index >= NMOVIES) {
        index = 0;
    }

    return movie;
};




let btNuevoJuego = document.getElementById('btNuevoJuego');
let contenedorImagen = document.getElementById('pelicula-caratula');


btNuevoJuego.addEventListener('click', function (event) {
    let movie = getMovie();
    contenedorImagen.innerHTML = `<img class="elemento" src="assets/movies/${movie}.jpg" alt="Carátula">`;
    event.stopPropagation();
});