let listaDOM = document.getElementById('lista')
let equipo1 = document.getElementById('equipo1')
let equipo2 = document.getElementById('equipo2')


if(listaDOM){
    listaDOM.innerHTML += `
    <div class="jugador">
    <div class="numero"></div>
    <div class="nombre">
    Jugador
    </div>
    <div class="posicion">
    Posicion
    </div>
    <div class="calidad">
    Calidad
    </div>`
    for( i = 0 ; i < 22 ; i++){
        listaDOM.innerHTML += `
        <div class="jugador">
        <div class="numero">${i+1}</div>
        <div class="nombre">
        <input type="text" id="jugador${i+1}">
        </div>
        <div class="posicion">
        <select name="posicion${i+1}" id="posicion${i+1}">
        <option value="gk">Arquero</option>
        <option value="df">Defensor</option>
        <option value="mf">Medio</option>
        <option value="fw">Delantero</option>
        </select>
        </div>
        <div class="calidad">
        <input type="number" id="nivel${i+1}" min="1" max="10" value="1">
        </div>`
    }
    listaDOM.innerHTML += `
    <button id="armarEquipos">Armar Equipos</div>`
}

let armarEquipos = document.getElementById('armarEquipos')
class datosJugadores{
    constructor(nombre, posicion, calidad, variabilidad){
        this.nombre = nombre,
        this.posicion = posicion,
        this.calidad = calidad,
        this.variabilidad = variabilidad
    }
}
let jugadores = []
let listaDeNombres = []
let nombre1 = ''

let armar = () => {
    listaDeNombres = ['Rasin Gente','Botines Colgados','Sinar Kero','Viejitos Cachondos','Masturbanda','Impresentables','11 Conos','Fecha Libre','Sin Futbol Club']
    listaDeAditivos = ['United','City','Wanderers','Athletic','Juniors','FC','de Banfield','de Lomas','Central','Real','C.A.','Sportivo','Deportivo','Atletico']
    listarJugadores()
    posicionar('gk')
    posicionar('df')
    posicionar('mf')
    posicionar('fw')
    escribirJugadores(equipoA,equipo1)
    escribirJugadores(equipoB,equipo2)
}

let listarJugadores = () => {
    jugadores = []
    for(i = 1 ; i < 23 ; i++){
        let pos = document.getElementById(`posicion${i}`)
        let nombreJugador = document.getElementById(`jugador${i}`).value
        if(nombreJugador != ''){
            let calidadJugador = document.getElementById(`nivel${i}`).value
            calidadJugador > 10 && (calidadJugador = 10)
            calidadJugador < 1 && (calidadJugador = 1)
            let posValor = pos.options[pos.selectedIndex].value
            let variabilidadJugador = parseInt(calidadJugador) + Math.random()
            jugadores.push(new datosJugadores(nombreJugador,posValor,calidadJugador,variabilidadJugador))
        }
    }
}
let equipoA = []
let equipoB = []
let posicionar = (pos) => {
    let xPosicion = []
    xPosicion = jugadores.filter(a => a.posicion == pos)
    xPosicion.sort((a,b) => b.variabilidad - a.variabilidad)
    
    if(pos == 'gk'){
        equipoA = [];
        equipoB = [];
    }

    for(j of xPosicion){
        if(equipoA.length == equipoB.length){
            equipoA.push(j.nombre)
        }else{
            equipoB.push(j.nombre)
        }
    }
}
let escribirJugadores = (equipo,DOM) => {
    nombreDeEquipo = Math.random() * listaDeNombres.length
    nombre1 == nombreDeEquipo && (nombreDeEquipo = Math.random() * listaDeNombres.length)
    let asociacion = ''
    let aditivoLength = parseInt(Math.random() * listaDeAditivos.length)
    if(listaDeNombres[parseInt(nombreDeEquipo)] != 'Sin Futbol Club'){
        asociacion = listaDeAditivos[aditivoLength]
    }
    if(aditivoLength < 8){
        DOM.innerHTML = `<h2>Equipo: ${listaDeNombres[parseInt(nombreDeEquipo)]} ${asociacion}</h2>`
    }else{
        DOM.innerHTML = `<h2>Equipo: ${asociacion} ${listaDeNombres[parseInt(nombreDeEquipo)]}</h2>`
    }
    listaDeNombres.shift(listaDeNombres[parseInt(nombreDeEquipo)])
    for(j of equipo){
        DOM.innerHTML+= `
        <div class="jug">${j}</div>`
    }
}

armarEquipos.addEventListener('click', () => armar())