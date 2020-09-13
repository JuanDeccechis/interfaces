document.querySelector("#rectangulo").addEventListener("click", crearRectangulo);
let ctx = document.querySelector("#canvas").getContext("2d");
let figura = "";
let widthInicial = 0;
let heightInicial = 0;
let posicionesIniciales = document.querySelector("#canvas").getBoundingClientRect();

function crearRectangulo() {
    console.log("empieza");
    document.querySelector("#canvas").addEventListener("mousedown", empiezaDibujar);
    figura = "rectangulo";
}

function empiezaDibujar(event) {
    widthInicial = event.clientX - posicionesIniciales.left;
    heightInicial = event.clientY - posicionesIniciales.top;
    
    document.querySelector("#canvas").removeEventListener("mousedown", empiezaDibujar);
    document.querySelector("#canvas").addEventListener("mouseup", terminaDibujar);
}

function terminaDibujar(event) {
    let widthFinal = event.clientX  - posicionesIniciales.left;
    let heightFinal = event.clientY - posicionesIniciales.top;
    document.querySelector("#canvas").removeEventListener("mouseup", terminaDibujar);
    switch (figura) {
        case "rectangulo":
            ctx.fillRect(widthInicial, heightInicial, widthFinal - widthInicial, heightFinal - heightInicial);
            break;    
        default:
            break;
    }
}
