
document.querySelector("#barraProgreso").addEventListener("click", move);

function move(event) {
    let valor = document.querySelector("#valorBarra");
    let barraProgreso = document.querySelector("#barraProgreso");
    let posicion = barraProgreso.getBoundingClientRect();
    let width = event.clientX;
    let porcentaje = 100 * (width - posicion.left) / (posicion.right - posicion.left);
    valor.style.width = porcentaje + "%";
    document.querySelector("#valorFactorResultante").value = porcentaje * 0.03;
    document.querySelector("#valorFactorResultante").innerHTML = parseFloat(porcentaje * 0.03).toFixed(2);
}