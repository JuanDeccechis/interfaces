"use strict";

document.querySelector("#cargarImagen").addEventListener("change", cargarArchivo);

function cargarArchivo() {
    let archivo = document.querySelector("#cargarImagen").files[0];
    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function() {
        let content = reader.result;
        let image = new Image();
        image.src = content;
        image.onload = function() {
            ctx.drawImage(this, 0, 0);
        }
    }
}