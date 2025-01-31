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

        // Ocultar todas las opciones
        opciones.forEach(opcion => {
            opcion.style.display = "none";
        });

        // Mostrar solo la opción seleccionada
        if (opciones[indice]) {
            opciones[indice].style.display = "block";

            // Hacer scroll hacia el contenido dinámico
            opciones[indice].scrollIntoView({
                behavior: "smooth", // Desplazamiento suave
                block: "start",    // Alinear al inicio del contenedor
            });
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
