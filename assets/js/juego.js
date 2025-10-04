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
        for(let j = 0; j < NELEMENTSPMOVIE; j++) {
            elementDeck.push("0"+i+"C"+j)
        } 
    }
    //Barajamos
    elementDeck = _.shuffle(elementDeck)
    return elementDeck;
}

const getMovie = () => {
    const movie = `0${index + 1}M`
    index++

    if (index >= NMOVIES) {
        index = 0
    }

    return movie
};

let elementDeck = getElementsDeck()

const getElement = () => {
    if(elementDeck.length === 0)
        throw 'No hay más tarjetas'
    const tarjeta = elementDeck.pop()
    return tarjeta
}




const btNuevoJuego = document.getElementById('btNuevoJuego')
const contenedorImagen = document.getElementById('pelicula-caratula')
const btAdivina = document.getElementById('btAdivina')
const divElementos = document.querySelector("#elementos-pelicula")

btNuevoJuego.addEventListener('click', function (event) {
    let movie = getMovie();
    contenedorImagen.innerHTML = `<img class="elemento" src="assets/movies/${movie}.jpg" alt="Carátula">`
    divElementos.innerHTML = ""
    elementDeck = getElementsDeck()
    event.stopPropagation();
})




btAdivina.addEventListener('click', function (event) {
    const elemento = getElement()

    const div = document.createElement('div')
    div.classList.add('elemento')
    const img = document.createElement('img')
    img.src = `assets/characters/${elemento}.jpg`
    img.classList.add('recurso')

    div.appendChild(img)
    divElementos.appendChild(div)
})
