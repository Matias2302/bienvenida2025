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
        if (window.innerWidth >= 320) { // Solo en desktop
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
    function seleccionarCarrera(botones, contenidos, contenedor) {
        botones.forEach((boton, index) => {
            boton.addEventListener("click", () => {
                const contenidoActivo = contenedor.querySelector(".show");
                const nuevoContenido = contenidos[index];
    
                if (contenidoActivo === nuevoContenido) return; // Evita repetir la misma selección
    
                // Guardar altura del contenido activo antes de ocultarlo
                const alturaActual = contenidoActivo ? contenidoActivo.offsetHeight : 0;
                contenedor.style.height = `${alturaActual}px`;
    
                // Fade-out del contenido actual
                if (contenidoActivo) {
                    contenidoActivo.classList.remove("show");
                    setTimeout(() => {
                        contenidoActivo.style.position = "absolute"; // Oculta completamente
                        contenidoActivo.style.visibility = "hidden";
                        contenidoActivo.style.opacity = "0";
    
                        // Mostrar el nuevo contenido
                        nuevoContenido.style.position = "relative";
                        nuevoContenido.style.visibility = "visible";
                        nuevoContenido.style.opacity = "1";
                        nuevoContenido.classList.add("show");
    
                        // Ajustar la altura al nuevo contenido
                        const nuevaAltura = nuevoContenido.scrollHeight;
                        contenedor.style.height = `${nuevaAltura}px`;
    
                        // Volver a altura automática después de la animación
                        setTimeout(() => {
                            contenedor.style.height = "auto";
                        }, 500);
                    }, 500);
                } else {
                    // Si no había contenido activo, mostrar directamente
                    nuevoContenido.style.position = "relative";
                    nuevoContenido.style.visibility = "visible";
                    nuevoContenido.style.opacity = "1";
                    nuevoContenido.classList.add("show");
                    setTimeout(() => {
                        contenedor.style.height = "auto";
                    }, 500);
                }
            });
        });
    }
    
    // Aplica la función para Montevideo y Regionales
    seleccionarCarrera(
        document.querySelectorAll(".carreras-montevideo .botones-opciones div"),
        document.querySelectorAll(".carreras-montevideo-content > div"),
        document.querySelector(".carreras-montevideo-content")
    );
    
    seleccionarCarrera(
        document.querySelectorAll(".carreras-interior .botones-opciones div"),
        document.querySelectorAll(".carreras-interior-content > div"),
        document.querySelector(".carreras-interior-content")
    );
    
    
    
    seleccionarCarrera(botonesOpcionesMvd, carrerasContenidoMvd);
    seleccionarCarrera(botonesOpcionesInt, carrerasContenidoInt);
});

