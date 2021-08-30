window.onload = start;

function start() {
    let icons = document.querySelectorAll(".contenido div");

    /*
    Nivell 2
    Si l’usuari prem fora de la zona de les estrelles, s’han de desseleccionar totes.
    */
    document.addEventListener('mousedown', e => {
        if (e.target.matches("div.container") || e.target.matches("html")) {
            incializar();
        }
    })


    for (let i = 0; i < icons.length; i++) {
        /*
        2- Cambia el color del icono a ROJO si el mouse se pone encima de una de ellas,
        lo hago una sola vez para mostrar el efecto del punto 3
        */
        icons[i].addEventListener("mouseover", cambia_color, { once: true });
        icons[i].addEventListener("mouseout", color_original, false);

        /*
        3- Al mover el mouse sobre un elemento, que cambie los colores a VERDE 
        a todos sus anteriores.
         */
        icons[i].addEventListener("mousemove", cambia_rango_colores, false);
        icons[i].addEventListener("mouseleave", color_original, false);

        /*
        4- Al pulsar una estrella, se tienen que quedar los colores fijos a esta  en AZUL 
           y todas las anteriores. Si se pulsa a otra estrella, los colores deben actualizarse
            correctamente.
         */
        icons[i].addEventListener("mousedown", cambia_rango_mousedown, false);
    }


}

function incializar() {
    let icons = document.querySelectorAll(".contenido div");
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.remove('red');
        icons[i].classList.remove('green');
        icons[i].classList.remove('blue');
        icons[i].classList.add('rating');
    }

}

function posicion(elemento, hijos) {
    let position;
    for (let i in hijos) {
        if (elemento == hijos[i]) {
            position = i;
        }
    }
    return position;
}

function cambia_color() {
    let elemento = this;
    let hijos = this.parentNode.children;
    let pos = posicion(elemento, hijos);
    hijos[pos].classList.replace('rating', 'red');
}

function color_original(e) {
    let elemento = this;
    let hijos = this.parentNode.children;
    let pos = posicion(elemento, hijos);
    if (e.type == 'mouseleave') {
        hijos[pos].classList.replace('red', 'rating');
    } else {
        for (let i = 0; i <= pos; i++) {
            hijos[i].classList.replace('green', 'rating');
        }
    }
}

function cambia_rango_colores() {
    let elemento = this;
    let hijos = this.parentNode.children;
    let pos = posicion(elemento, hijos);
    for (let i = 0; i <= pos; i++) {
        hijos[i].classList.replace('rating', 'green');
    }
}

function cambia_rango_mousedown() {
    incializar();
    let elemento = this;
    let hijos = this.parentNode.children;
    let pos = posicion(elemento, hijos);
    for (let i = 0; i <= pos; i++) {
        hijos[i].classList.replace('rating', 'blue');
    }
}