"use strict";

let heightNav = 0;
let seccionActual = 0;
let prevScroll = 0;
let fechaEstreno = new Date(2020, 11, 24);
let fechaActual = new Date();
let fechaDiferencia;
let fechaAMostrar = document.querySelector(".fechaEstreno");
setInterval(() => {
    fechaActual = new Date();
    fechaDiferencia = new Date(fechaEstreno - fechaActual);
    fechaAMostrar.innerHTML = fechaDiferencia.getMonth() + " meses, " + fechaDiferencia.getDate() + " dias, y " + fechaDiferencia.getHours() + ":" + fechaDiferencia.getMinutes() + ":" + fechaDiferencia.getSeconds();
}, 1000);

document.addEventListener("scroll", getScroll);
document.addEventListener("DOMContentLoaded", cargarInicio);
document.querySelector(".cambiaSeccion1").addEventListener("click", () => recargar(0));
document.querySelector(".cambiaSeccion2").addEventListener("click", () => recargar(1.5));
document.querySelector(".cambiaSeccion3").addEventListener("click", () => recargar(3));

function cargarInicio() {
    cargar();
    document.querySelector(".navbar-toggler").addEventListener("click", setheightNav);
}

function cargar() {
    setTimeout(() => {
        let componentesActivables = document.querySelectorAll(".oculto");
        for (let index = 0; index < componentesActivables.length; index++) {
            componentesActivables[index].classList.remove("oculto");
        }
        document.querySelector(".imagenCargando").classList.add("oculto");
        document.querySelector(".imagenCargando").classList.remove("cargando");
    }, 3000);
    
}

function recargar(param) {
    document.querySelector(".imagenCargando").classList.remove("oculto");
    document.querySelector(".imagenCargando").classList.add("cargando");
    cargar();
    setTimeout(() => {
        window.innerHeight * param + heightNav;
        window.scrollTo(0,  window.innerHeight * param + heightNav);
        console.log(window.innerHeight * param + heightNav);
    }, 3000);
}

function setheightNav() {
    setTimeout(() => {
        heightNav = document.querySelector("header").offsetHeight;
        console.log(heightNav);
    }, 350);
}

function getScroll(evt) {
    let y = getScrollY();
    let caso;
    if (y > prevScroll) {
        prevScroll = y;
        caso = getCasoDesc(y);
    }
    else {
        prevScroll = y;
        caso = getCasoAsc(y);
    }
    
    switch (caso) {
        case 1:
            console.log("baja seccion 1");
            document.querySelector(".pag1").classList.remove("animaEntrada1");
            document.querySelector(".pag2").classList.remove("animaEntrada2");
            seccionActual = 1;
            break;
        case 2:
            console.log("baja seccion 2");
            document.querySelector(".pag2").classList.remove("animaEntrada2");
            document.querySelector(".pag1").classList.add("animaEntrada1");
            seccionActual = 2;
            break;
        case 3:
            console.log("baja seccion 3");
            document.querySelector(".pag2").classList.add("animaEntrada2");
            document.querySelector(".pag1").classList.remove("animaEntrada1");
            break;

        case 11:
            console.log("sube seccion 1");
            document.querySelector(".pag1").classList.remove("animaEntrada1");
            document.querySelector(".pag2").classList.remove("animaEntrada2");
            break;
        case 12:
            console.log("sube seccion 2");
            document.querySelector(".pag2").classList.remove("animaEntrada2");
            document.querySelector(".pag1").classList.add("animaEntrada1");
            break;
        case 13:
            console.log("sube seccion 3");
            document.querySelector(".pag2").classList.remove("animaEntrada2");
            document.querySelector(".pag1").classList.remove("animaEntrada1");
            break;
        default:
            break;
    }
}

function getCasoDesc(altura) {
    if (altura >= window.innerHeight * 2.0 + heightNav) {
        if (seccionActual !== 3) {
            seccionActual = 3;
            return 3;
        }
        else {
            return 0;
        }
    }
    if (altura >= window.innerHeight * 0.5 + heightNav) {
        if (seccionActual !== 2) {
            seccionActual = 2;
            return 2;
        }
        else {
            return 0;
        }
    }
    if (altura < window.innerHeight * 0.5 + heightNav) {
        if (seccionActual !== 1) {
            seccionActual = 1;
            return 1;
        }
        else {
            return 0;
        }
    }
}

function getCasoAsc(altura) {
    if (altura >= window.innerHeight * 3.0 + heightNav) {
        if (seccionActual !== 3) {
            seccionActual = 3;
            return 13;
        }
        else {
            return 0;
        }
    }
    if (altura >= window.innerHeight * 1.5 + heightNav) {
        if (seccionActual !== 2) {
            seccionActual = 2;
            return 12;
        }
        else {
            return 0;
        }
    }
    if (altura < window.innerHeight * 0.5 + heightNav) {
        if (seccionActual !== 1) {
            seccionActual = 1;
            return 11;
        }
        else {
            return 0;
        }
    }
}

function getScrollY() {
    var  scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;

    } else if( document.body && document.body.scrollTop )  {
        //DOM compliant
        scrOfY = document.body.scrollTop;
    } 
    return scrOfY;
}

let cards = document.querySelectorAll(".card");
for (let index = 0; index < cards.length; index++) {
    cards[index].addEventListener("mousemove", (evento) => rotarCard(cards[index], evento));
    cards[index].addEventListener("mouseleave", function() {
        cards[index].style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
    })
}

function rotarCard(elemento, evento) {
    let posiciones = elemento.getBoundingClientRect();
    //roto 1/5 y 1/3 de la diferencia entre el centro del card y donde clickea adentro del card
    let xAxis = (posiciones.width / 2 - (evento.clientX - posiciones.x)) / 5;
    let yAxis = (posiciones.height / 2 - (evento.clientY - posiciones.y)) / 10;
    
    elemento.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
};