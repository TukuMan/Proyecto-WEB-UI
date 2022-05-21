const miLista = document.getElementById('list-container')

const infomacion = {
    personajes: []
}

//Realiza la llamada a la API
const getDataFronApi = () =>{
    const URI = 'https://gateway.marvel.com/v1/public'
    const CREDENTIALS = 'ts=1&apikey=20363c5895a98fa9dab47b2021eaf3a7&hash=5ef447473deea3212e9c0b09ee5b2c4a'
    return fetch(URI + "/characters?" + CREDENTIALS)
}

//Nos permite realizar la busqueda por personaje
const getCharacter= (name) =>{
    const ParsedName = name.replaceAll(" ","20%")
    const URI = 'https://gateway.marvel.com/v1/public'
    const CREDENTIALS = '&ts=1&apikey=20363c5895a98fa9dab47b2021eaf3a7&hash=5ef447473deea3212e9c0b09ee5b2c4a'
    return fetch(URI + "/characters?"+"nameStartsWith="+ParsedName+ CREDENTIALS)
}
//Creacion del nodo donde se muestran los personajes que estamos buscando
const createListNodeElement = (personaje) => {
    const myLi = document.createElement('li')
    myLi.className = 'cards'
    myLi.innerHTML = createCard(personaje)
    return myLi
}
//Enseña la tarjeta que estamos buscando
const renderNodes = (ArrayOfNodes) =>{
    miLista.innerHTML = null
    ArrayOfNodes.forEach((Node)=>{
        miLista.appendChild(Node)
    })
}
//Funcionamiento del buscador
const search = document.getElementById("buscador");
 search.addEventListener("input",(event) => {
    getCharacter(event.target.value).then(data=>data.json()).then(({data:{results}})=>{
     const nombreDePersonajes = results.map((personaje) =>{
        return createListNodeElement(personaje)
        })
        renderNodes(nombreDePersonajes)
    })

 })
//Crea la tarjeta por medio de HTML integrado
const createCard = ({thumbnail: {path, extension}, name}) =>{
    return `
    <div class="image-container">
        <img class="card-image" src="${path}.${extension}" />
        </div>
        <div class="description-container">
            <h1>${name}</h1>
        </div>
        </div>
          `
}

const callbackFunction = () => {
    getDataFronApi()
    .then((data) => data.json())
    .then(({data: {results}}) => {
        const nombreDePersonajes = results.map((personaje) =>{
            return createListNodeElement(personaje)
        })
        renderNodes(nombreDePersonajes)
})

}
window.addEventListener('load',callbackFunction)