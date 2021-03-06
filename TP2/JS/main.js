"use strict";
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector("#jugar").addEventListener("click", configurar);
    document.querySelector("#atras").addEventListener("click", volverAConfigurar);
    document.querySelector("#NEnLinea").addEventListener("change", cambiarNEnLinea);
    cargarImagenes();
});

let config =  new Configuracion();
let tablero = new Tablero();
let posicionesIniciales = null;
let turnoJugador1 = true;
let juego = [];
let fichasJugador1 = [];
let fichasJugador2 = [];
let offsetXFicha = 0;
let offsetYFicha = 0;
let fichaAnterior = null;
let margenWidth = 150; //espacio para la ubicacion de fichas
let margenHeight = 100; //espacio arriba para depositar las fichas
let origenesDestinos = [null, null, null, null, null, null, null, null];
let canvas = document.querySelector("#canvas");
let ctx = this.canvas.getContext("2d");
let ficha = {
    color: "white",
    radio: 25
};
let imagenFichaRoja;
let imagenFichaAzul;
let imagenFichaVerde;
function cargarImagenes(){
    let imagenAzul = new Image();
    imagenAzul.src = "images/fichaAzulTransparente.png";
    imagenAzul.onload = function() {
        imagenAzul.width = 2 * ficha.radio;
        imagenAzul.height = 2 * ficha.radio;
        imagenFichaAzul = imagenAzul;
    };
    let imagenRoja = new Image();
    imagenRoja.src = "images/fichaRojaTransparente.png";
    imagenRoja.onload = function() {
        imagenRoja.width = 2 * ficha.radio;
        imagenRoja.height = 2 * ficha.radio;
        imagenFichaRoja = imagenRoja;
    };
    let imagenVerde = new Image();
    imagenVerde.src = "images/fichaVerdeTransparente.png";
    imagenVerde.onload = function() {
        imagenVerde.width = 2 * ficha.radio;
        imagenVerde.height = 2 * ficha.radio;
        imagenFichaVerde = imagenVerde;
    };
}

/*CONFIGURACION */
function configurar(event) {
    event.preventDefault();
    event.stopPropagation();
    config.setFilas(document.querySelector("#filasTablero").value);
    config.setColumnas(document.querySelector("#columnasTablero").value);
    config.setDisabled();
    crearJuego();
    crearFichas();
    document.querySelector("#canvas").addEventListener("mousedown", detectarYSeleccionar);
}

function cambiarNEnLinea(){
    config.setCantidadParaGanar(document.querySelector("#NEnLinea").value);
    config.cambiarNEnLinea();
}

function volverAConfigurar() {
    let elementos = document.querySelector("#botones");
    while (elementos.firstChild) {
        elementos.removeChild(elementos.lastChild);
    }
    config.setEnabled();
    document.querySelector("#atras").setAttribute("disabled", true);
    mostrarTurno("noMostrar");
    tablero.limpiarTablero();
}

function crearJuego() { //finaliza las configuraciones para poder jugar
    document.querySelector("#atras").removeAttribute("disabled");
    juego = [];
    fichasJugador1 = [];
    fichasJugador2 = [];
    turnoJugador1 = true;
    fichaAnterior = null;
    for (let i = 0; i < config.getFilas(); i++) {
        juego[i]= [];
        for (let j = 0; j < config.getColumnas(); j++) {
            juego[i][j] = 0;
        }   
    }
    posicionesIniciales = document.querySelector("#canvas").getBoundingClientRect();
    tablero.crearTablero(config.getFilas(), config.getColumnas());
    mostrarTurno();
}

function mostrarTurno(debeMostrar){
    let elementoTurno = document.querySelector("#turno");
    let aMostrar = "Turno de ";
    if (debeMostrar === "noMostrar") {
        aMostrar = "";
    }
    else {
        if (turnoJugador1) {
            aMostrar = aMostrar + document.querySelector("#jugador1").value;
        }
        else {
            aMostrar = aMostrar + document.querySelector("#jugador2").value;
        }
        for (let index = 0; index < config.getColumnas(); index++) {
            tablero.pintarJugada(-1, index, turnoJugador1); //dibuja fichas para orientar al usuario
        }
    }
    elementoTurno.innerHTML = aMostrar;
}

//EVENTOS Y DRAG & DROP
function detectarYSeleccionar(event) {
    let posicionXClickeada = event.clientX - posicionesIniciales.left;
    let posicionYClickeada = event.clientY - posicionesIniciales.top;
    
    let isTablero = tablero.tableroFueClickeado(posicionXClickeada, posicionYClickeada);
    if (!(isTablero)) {
        let fichaSeleccionada = null;
        if (turnoJugador1) {
            for (let index = 0; index < fichasJugador1.length; index++) {
                if (fichasJugador1[index].fichaFueClickeada(posicionXClickeada, posicionYClickeada)) {
                    fichaSeleccionada = fichasJugador1[index];
                }
            }
        }
        else {
            for (let index = 0; index < fichasJugador2.length; index++) {
                if (fichasJugador2[index].fichaFueClickeada(posicionXClickeada, posicionYClickeada)) {
                    fichaSeleccionada = fichasJugador2[index];
                }
            }
        }
        if (fichaSeleccionada !== null) {
            /*SET POSICION ANTERIOR PARA VOLVER*/
            if (fichaAnterior !== null) {
                if (fichaSeleccionada === fichaAnterior) {
                }
                else {
                    fichaAnterior.setSeleccionada(false);
                }  
            }
            fichaSeleccionada.setSeleccionada(true);
            fichaAnterior = fichaSeleccionada;
            document.querySelector("#canvas").addEventListener("mousemove", arrastrarFicha);
            document.querySelector("#canvas").addEventListener("mouseup", liberarEvento);
            offsetXFicha = posicionXClickeada - fichaSeleccionada.getPosX();
            offsetYFicha = posicionYClickeada - fichaSeleccionada.getPosY();
        }        
    } else {
        //console.log("click en el tablero");
    }
}

function arrastrarFicha(event) {
    let posicionXClickeada = event.clientX - posicionesIniciales.left;
    let posicionYClickeada = event.clientY - posicionesIniciales.top;
    fichaAnterior.setPosicion(posicionXClickeada - offsetXFicha, posicionYClickeada - offsetYFicha);
    
    if (!tablero.tableroExtendidoFueClickeado(posicionXClickeada, posicionYClickeada)) {
        pintarExterior();
        for (let index = 0; index < config.getColumnas(); index++) {
            tablero.pintarJugada(-1, index, turnoJugador1); //dibuja fichas para orientar al usuario
        }
    }
}

function liberarEvento(event) {
    let posicionXClickeada = event.clientX - posicionesIniciales.left;
    let posicionYClickeada = event.clientY - posicionesIniciales.top;
    document.querySelector("#canvas").removeEventListener("mousemove", arrastrarFicha);
    document.querySelector("#canvas").removeEventListener("mouseup", liberarEvento);
    offsetXFicha = 0;
    offsetYFicha = 0;
    if (fichaAnterior != null) {
        let columnaAJugar = tablero.getColumnaAJugar(posicionXClickeada, posicionYClickeada);
        if (columnaAJugar >= 0) {
            //fichaAnterior.setPosicion(posicionXClickeada, posicionYClickeada);
            //fichaAnterior.dibujar();
            jugar(fichaAnterior, columnaAJugar);
        }
    } else {
        alert("seleccione una ficha y vuelva a intentar");
    }
}

//LOGICA
function jugar(ficha, columna){
    let fila = calcularProximaFila(juego, columna);
    if (fila !== -1) {
        if (turnoJugador1) {
            juego[fila][columna] = 1;
        }
        else {
            juego[fila][columna] = 2;
        }
        tablero.pintarJugada(fila, columna, turnoJugador1, ficha);
        if (turnoJugador1) {
            let fichaAEliminar = fichasJugador1.indexOf(fichaAnterior);
            if (fichaAEliminar !== -1) {
                fichasJugador1.splice(fichaAEliminar, 1);
            }        
        }
        else {
            let fichaAEliminar = fichasJugador2.indexOf(fichaAnterior);
            if (fichaAEliminar !== -1) {
                fichasJugador2.splice(fichaAEliminar, 1);
            }
        }
        fichaAnterior = null;
        pintarExterior();
        if (revisarNEnLinea(juego, fila, columna, config.getCantidadParaGanar())) {
            let ganador;
            if (turnoJugador1) {
                ganador = document.querySelector("#jugador1").value;
            } else {
                ganador = document.querySelector("#jugador2").value;
            }
            setTimeout(function(){ 
                alert(`felicitaciones ${ganador}!!!`); 
            }, 3000);
            document.querySelector("#atras").innerHTML = "volver a jugar";
            let elementos = document.querySelector("#botones");
            while (elementos.firstChild) {
                elementos.removeChild(elementos.lastChild);
            }
        }
        else {
            turnoJugador1 = !turnoJugador1;
            mostrarTurno();
        }
    }
    else {
        alert("jugada invalida, vuelva a intentar");
    }
}

function pintarExterior() {
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, margenWidth, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(canvas.width - margenWidth, 0, margenWidth, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(margenWidth, 0, canvas.width - margenWidth, margenHeight);
    //borde
    ctx.beginPath();
    ctx.strokeStyle = "#555555";
    ctx.strokeRect(margenWidth - 2 * ficha.radio, 2 * ficha.radio, 500 + 4 * ficha.radio, 500 + 2 * ficha.radio);
    
    for (let index = 0; index < fichasJugador1.length; index++) {
        fichasJugador1[index].dibujar();
    }
    for (let index = 0; index < fichasJugador2.length; index++) {
        fichasJugador2[index].dibujar();
    }
    
}

function calcularProximaFila(mat, columna) {
    let resul = -1;
    for (let filas = 0; filas < config.getFilas(); filas++) {
        if (mat[filas][columna] === 0) {
            resul = filas;
        }
    }
    return resul;
}

function revisarNEnLinea(juego, fila, columna, cantidad) { //podria hacer una funcion recursiva, pero dada la cantidad de filas y columnas no lo veo necesario
    let resultado = false;
    origenesDestinos = [null, null, null, null, null, null, null, null];
    let cantidadEnVertical = revisarNEnLineaDireccion(juego, fila, columna, "vertical");
    let cantidadEnHorizontal = revisarNEnLineaDireccion(juego, fila, columna, "horizontal");
    let cantidadEnDiag1 = revisarNEnLineaDireccion(juego, fila, columna, "diagonal1");
    let cantidadEnDiag2 = revisarNEnLineaDireccion(juego, fila, columna, "diagonal2");
    if ((cantidadEnVertical >= cantidad) || (cantidadEnHorizontal >= cantidad) || (cantidadEnDiag1 >= cantidad) || (cantidadEnDiag2 >= cantidad)) {
        resultado = true;
        if (cantidadEnVertical >= cantidad) {
            tablero.mostrarJugadaGanadora(columna, origenesDestinos[0], columna, origenesDestinos[1]);
        }
        if (cantidadEnHorizontal >= cantidad) {
            tablero.mostrarJugadaGanadora(origenesDestinos[2], fila, origenesDestinos[3], fila);
        }
        if (cantidadEnDiag1 >= cantidad) {
            tablero.mostrarJugadaGanadora(origenesDestinos[4], fila + columna - origenesDestinos[4], origenesDestinos[5], fila + columna - origenesDestinos[5]);
        }
        if (cantidadEnDiag2 >= cantidad) {
            tablero.mostrarJugadaGanadora(origenesDestinos[6], fila + origenesDestinos[6] - columna, origenesDestinos[7], fila + origenesDestinos[7] - columna);
        }
      }
    return resultado;

}

function revisarNEnLineaDireccion(juego, fila, columna, direccion){ 
    let cantidad = 0;
    let origen = buscarOrigen(juego, fila, columna, direccion);
    let fin = buscarFin(juego, fila, columna, direccion);
    if (origen === -1) {
        origen = columna;
    } 
    if (fin === -1) {
        fin = columna;
    }
    cantidad = fin - origen + 1;
    return cantidad;
}

function buscarOrigen(juego, fila, columna, direccion) {
    let resultado = -1;
    let seguirBuscando = true;
    switch (direccion) {
        case "vertical":
            resultado = fila;
            origenesDestinos[0] = resultado;
            break;
        case "horizontal":
            for (let indiceColumna = columna; indiceColumna >= 0 ; indiceColumna--) {
                if (seguirBuscando && juego[fila][indiceColumna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceColumna + 1;
                }
            }
            if (seguirBuscando && juego[fila][0] === juego[fila][columna]) {
                resultado = 0;
            }
            origenesDestinos[2] = resultado;
            break;
        case "diagonal1": //abajo izq
            for (let indiceColumna = columna; indiceColumna >= 0 ; indiceColumna--) {
                if ((fila+columna-indiceColumna) < config.getFilas()) {
                    if (seguirBuscando && juego[fila+columna-indiceColumna][indiceColumna] !== juego[fila][columna]) {
                        seguirBuscando = false;
                        resultado = indiceColumna + 1;
                    }
                }
                else {
                    if (seguirBuscando) {
                        resultado = indiceColumna + 1;
                        seguirBuscando = false;
                    }
                }
            }
            //correccion
            if (seguirBuscando && (fila+columna) <= (config.getFilas() -1) && juego[fila+columna][0] === juego[fila][columna]) {
                resultado = 0;
            }
            origenesDestinos[4] = resultado;
            break;
        
        case "diagonal2": //arriba izq
                for (let indiceColumna = columna; indiceColumna >= 0 ; indiceColumna--) {
                    if ((fila+indiceColumna-columna) >= 0) {
                        if (seguirBuscando && juego[fila+indiceColumna-columna][indiceColumna] !== juego[fila][columna]) {
                            seguirBuscando = false;
                            resultado = indiceColumna + 1;
                        }
                    }
                    else {
                        if (seguirBuscando) {
                            resultado = indiceColumna + 1;
                            seguirBuscando = false;
                        }
                    }
                }
                //correccion
                if (seguirBuscando && (fila-columna) >= 0 && juego[fila-columna][0] === juego[fila][columna]) {
                    resultado = 0;
                }
                origenesDestinos[6] = resultado;
                break;

        default:
            break;
    }
    return resultado;
}

function buscarFin(juego, fila, columna, direccion) {
    let resultado = -1;
    let seguirBuscando = true;
    
    switch (direccion) {
        case "vertical":
            for (let indiceFila = fila; indiceFila < config.getFilas() ; indiceFila++) {
                if (seguirBuscando && juego[indiceFila][columna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceFila - 1;
                }
            }
            if (seguirBuscando && juego[(config.getFilas() - 1)][columna] === juego[fila][columna]) {
                resultado = (config.getFilas() - 1);
            }
            origenesDestinos[1] = resultado
            break;
        case "horizontal":
            for (let indiceColumna = columna; indiceColumna < config.getColumnas() ; indiceColumna++) {
                if (seguirBuscando && juego[fila][indiceColumna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceColumna - 1;
                }
            }
            if (seguirBuscando && juego[fila][config.getColumnas() -1] === juego[fila][columna]) {
                resultado = config.getColumnas() -1;
            }
            origenesDestinos[3] = resultado;
            break;
        case "diagonal1": //arriba derecha
            for (let indiceColumna = columna; indiceColumna < config.getColumnas() ; indiceColumna++) {
                if ((fila+columna-indiceColumna) >= 0) {
                    if (seguirBuscando && juego[fila+columna-indiceColumna][indiceColumna] !== juego[fila][columna]) {
                        seguirBuscando = false;
                        resultado = indiceColumna - 1;
                    }
                }
                else {
                    if (seguirBuscando) {
                        resultado = indiceColumna - 1;
                        seguirBuscando = false;
                    }
                }
            }
            //correccion
            if (seguirBuscando && (fila+columna - (config.getColumnas() - 1)) >= 0 && juego[fila+columna-(config.getColumnas() -1 )][config.getColumnas() - 1] === juego[fila][columna]) {
                resultado = config.getColumnas() -1;
            }
            origenesDestinos[5] = resultado;
            break;

        case "diagonal2": //arriba izq
            for (let indiceColumna = columna; indiceColumna < config.getColumnas() ; indiceColumna++) {
                if ((fila+indiceColumna-columna) < config.getFilas()) {
                    if (seguirBuscando && juego[fila+indiceColumna-columna][indiceColumna] !== juego[fila][columna]) {
                        seguirBuscando = false;
                        resultado = indiceColumna - 1;
                    }
                }
                else {
                    if (seguirBuscando) {
                        resultado = indiceColumna - 1;
                        seguirBuscando = false;
                    }
                }
            }
            //correccion
            if (seguirBuscando && (fila-columna + (config.getColumnas() -1) ) >= 0 && juego[fila-columna+ (config.getColumnas() -1)][(config.getColumnas() -1)] === juego[fila][columna]) {
                resultado = config.getColumnas() -1;
            }
            origenesDestinos[7] = resultado;
            break;

        default:
            break;
    }
    return resultado;
}

//CREACION DE FICHAS
function crearFichas(){
    let fichas = config.getFilas() * config.getColumnas() / 2;
    let objetoFicha;
    let posicionXEnCrearFicha;
    let posicionYEnCrearFicha
    for (let index = 0; index < fichas; index++) {
        posicionXEnCrearFicha = calcularRandomLimitado(0, margenWidth - 4 * ficha.radio); //entre 0 - 100
        posicionYEnCrearFicha = calcularRandomLimitado(margenHeight, canvas.height - 2 * ficha.radio);
        objetoFicha = new Ficha(posicionXEnCrearFicha, posicionYEnCrearFicha, ficha.radio, imagenFichaRoja, imagenFichaVerde, ctx);
        objetoFicha.dibujar();
        fichasJugador1.push(objetoFicha);
    }
    for (let index = 0; index < fichas; index++) {
        posicionXEnCrearFicha = calcularRandomLimitado(canvas.width - margenWidth + 2 * ficha.radio, canvas.width - 2 * ficha.radio);
        posicionYEnCrearFicha = calcularRandomLimitado(margenHeight, canvas.height - 2 * ficha.radio);
        objetoFicha = new Ficha(posicionXEnCrearFicha, posicionYEnCrearFicha, ficha.radio, imagenFichaAzul, imagenFichaVerde, ctx);
        objetoFicha.dibujar();
        fichasJugador2.push(objetoFicha);
    }
}

function calcularRandomLimitado(min, max){
    return min + Math.random() * (max - min);
}