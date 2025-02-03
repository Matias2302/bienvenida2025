////////////PIQUES/////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".boton-pique");
    const opciones = document.querySelectorAll(".contenido-opciones > div");
    const contenedorOpciones = document.querySelector(".contenido-opciones");

    // Ocultar el contenedor dinámico al cargar la página
    contenedorOpciones.style.display = "none";

    const mostrarOpcion = (indice) => {
        // Mostrar el contenedor dinámico si está oculto
        contenedorOpciones.style.display = "block";
        
    
        // Ocultar todas las opciones con fade-out, excepto la seleccionada
        opciones.forEach((opcion, i) => {
            if (i !== indice) {
                opcion.classList.remove("active");
                setTimeout(() => {
                    opcion.style.display = "none";
                }, 500); // Espera el tiempo de la animación antes de ocultarlo
            }
        });
    
        // Quitar la clase activa de todos los botones
        botones.forEach(boton => boton.classList.remove("active"));
    
        // Mostrar solo la opción seleccionada con fade-in
        if (opciones[indice]) {
            opciones[indice].style.display = "block";
    
            setTimeout(() => {
                opciones[indice].classList.add("active");
            }, 10); // Retrasa la activación para que la animación funcione bien
    
            // Hacer scroll hacia el contenido dinámico
            opciones[indice].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
    
            // Agregar la clase activa al botón seleccionado
            botones[indice].classList.add("active");
    
            // Mover el div 'contenido-opciones' hacia arriba
            contenedorOpciones.classList.add("active");
        }
    };
    
    

    // Añadir evento de clic a cada botón
    botones.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            mostrarOpcion(index);
        });
    });
});
//boton subir
document.addEventListener("DOMContentLoaded", () => {
    const btnVolverArriba = document.getElementById("btn-volver-arriba"); // El botón flotante

    // Mostrar el botón al hacer scroll hacia abajo
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) { // Mostrar cuando el scroll sea mayor a 200px
            btnVolverArriba.style.display = "flex"; // Mostrar el botón
        } else {
            btnVolverArriba.style.display = "none"; // Ocultar el botón
        }
    });

    // Scroll suave hasta arriba al hacer clic
    btnVolverArriba.addEventListener("click", () => {
        window.scrollTo({
            top: 0, // Posición superior
            behavior: "smooth" // Desplazamiento suave
        });
    });
});
