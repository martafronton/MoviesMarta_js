/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3
let index = 1
let peliPortada="01M";
const intentos=document.getElementById("intentos")
const vidas=5
const resultado=document.getElementById("resultado")
let contador=vidas
let aciertos=0
intentos.innerHTML=`Vidas: ${vidas}`

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
    peliPortada=movie
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
const imagen = document.getElementById('pelicula')
const btAdivina = document.getElementById('btAdivina')
const divElementos = document.querySelector("#elementos-pelicula")

btNuevoJuego.addEventListener('click', function (event) {
    aciertos=0
    resultado.innerHTML=``
    contador=vidas
    intentos.innerHTML=`Vidas: ${contador}`
    let movie = getMovie();
    imagen.src = `assets/movies/${movie}.jpg`
    divElementos.innerHTML = ""
    elementDeck = getElementsDeck()
    contenedorDrop.forEach(drop => {
        drop.innerHTML = ""
    })
    event.stopPropagation();
})



const pertenecePelicula = (recurso, pelicula) => {
    return recurso.substring(0, 2) === pelicula.substring(0, 2)
}


const contenedorDrop = document.querySelectorAll('.drop')
let elementoArrastrado = null

btAdivina.addEventListener('click', function () {
    const elemento = getElement()

    const div = document.createElement('div')
    div.classList.add('elemento', 'draggable')
    div.draggable = true
    const img = document.createElement('img')
    img.src = `assets/characters/${elemento}.jpg`
    img.classList.add('recurso')

    div.appendChild(img)
    if (pertenecePelicula(elemento, peliPortada)) {
        div.classList.add('pertenece')
    }
    divElementos.appendChild(div)

   
    const draggables = document.querySelectorAll('.draggable')
    draggables.forEach(tarjeta => {
        tarjeta.addEventListener('dragstart', (e) => {
            tarjeta.classList.add('dragging')
            elementoArrastrado = tarjeta
            e.dataTransfer.effectAllowed = "move"
        })
        tarjeta.addEventListener('dragend', () => {
            tarjeta.classList.remove('dragging')
            elementoArrastrado = null
        })
    })
})


contenedorDrop.forEach(contenedorDrop => {
    contenedorDrop.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    contenedorDrop.addEventListener('drop', (e) => {
        e.preventDefault()
        if (contenedorDrop.children.length > 0) {
            return
        }

        if(contador == 0){
            alert("No tienes más vidas, prueba con otra película")
            
        }else{
        if (elementoArrastrado.classList.contains('pertenece')) {
            aciertos++
            contenedorDrop.appendChild(elementoArrastrado)
            elementoArrastrado.classList.add("correcto")
            elementoArrastrado.classList.remove('draggable')
        } else if(contador==1 && !elementoArrastrado.classList.contains('pertenece')){
            resultado.innerHTML=`Has perdido`
            contador--
            intentos.innerHTML=`Vidas: ${contador}`
        }
        else {
            elementoArrastrado.classList.add("incorrecto")
            contador--
            intentos.innerHTML=`Vidas: ${contador}`
        }
    }if(aciertos==3){
        resultado.innerHTML=`Has ganado!!`
    }
    })
})
