document.addEventListener("DOMContentLoaded", () => {
    const montevideo = document.querySelector(".montevideo");
    const regionales = document.querySelector(".regionales");
    const carrerasMontevideo = document.querySelector(".carreras-montevideo");
    const carrerasInterior = document.querySelector(".carreras-interior");
    const botonesOpcionesMvd = document.querySelectorAll(".carreras-montevideo .botones-opciones div");
    const botonesOpcionesInt = document.querySelectorAll(".carreras-interior .botones-opciones div");
    const carrerasContenidoMvd = document.querySelectorAll(".carreras-montevideo-content > div");
    const carrerasContenidoInt = document.querySelectorAll(".carreras-interior-content > div");

    function cambiarSeccion(contenidoMostrar, contenidoOcultar) {
        if (window.innerWidth >= 1024) { // Solo en desktop
            // Asignar la clase reducido a ambos elementos
            montevideo.classList.add("reducido");
            regionales.classList.add("reducido");

            // Mostrar la sección seleccionada y ocultar la otra con una transición suave
            contenidoOcultar.classList.remove("show");
            setTimeout(() => {
                contenidoOcultar.style.display = "none";
                contenidoMostrar.style.display = "block";
                setTimeout(() => contenidoMostrar.classList.add("show"), 50);
            }, 500);
        }
    }

    function restaurarSecciones() {
        // Restaurar el tamaño normal de ambas secciones
        montevideo.classList.remove("reducido");
        regionales.classList.remove("reducido");
        carrerasMontevideo.classList.remove("show");
        carrerasInterior.classList.remove("show");
    }

    montevideo.addEventListener("click", () => {
        if (!carrerasMontevideo.classList.contains("show")) {
            cambiarSeccion(carrerasMontevideo, carrerasInterior);
        } else {
            restaurarSecciones();
        }
    });

    regionales.addEventListener("click", () => {
        if (!carrerasInterior.classList.contains("show")) {
            cambiarSeccion(carrerasInterior, carrerasMontevideo);
        } else {
            restaurarSecciones();
        }
    });

    // --- FUNCIÓN PARA QUE LAS OPCIONES DE CARRERA SE SELECCIONEN Y MUESTREN ---
    function seleccionarCarrera(botones, contenidos) {
        botones.forEach((boton, index) => {
            boton.addEventListener("click", () => {
                // Remover la clase selected de todas las opciones antes de aplicar a la nueva
                botones.forEach(opt => opt.classList.remove("selected"));
                contenidos.forEach(contenido => contenido.classList.remove("show"));

                // Agregar la clase selected a la opción seleccionada
                boton.classList.add("selected");

                // Mostrar la opción seleccionada
                if (contenidos[index]) {
                    contenidos[index].classList.add("show");
                }
            });
        });
    }

    seleccionarCarrera(botonesOpcionesMvd, carrerasContenidoMvd);
    seleccionarCarrera(botonesOpcionesInt, carrerasContenidoInt);
});

