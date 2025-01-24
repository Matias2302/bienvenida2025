document.addEventListener("DOMContentLoaded", () => {
    const acordeones = document.querySelectorAll(".carousel-slide");

    const isDesktop = () => window.innerWidth >= 768;

    // Función para inicializar acordeones (incluye los anidados)
    const initAcordeones = (scope) => {
        const titulos = scope.querySelectorAll(".acordeon__titulo");
        const contenidos = scope.querySelectorAll(".acordeon__contenido");

        titulos.forEach((titulo, index) => {
            titulo.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevenir que el evento afecte a otros niveles

                const contenido = contenidos[index];
                const isActive = titulo.classList.contains("active");

                if (isActive) {
                    // Si está activo, cerrarlo
                    titulo.classList.remove("active");
                    contenido.style.height = "0px";
                } else {
                    // Cerrar otros acordeones al mismo nivel
                    const siblings = Array.from(scope.querySelectorAll(".acordeon__titulo"));
                    const siblingContents = Array.from(scope.querySelectorAll(".acordeon__contenido"));

                    siblings.forEach(s => s.classList.remove("active"));
                    siblingContents.forEach(c => (c.style.height = "0px"));

                    // Activar el acordeón actual
                    titulo.classList.add("active");
                    contenido.style.height = `${contenido.scrollHeight}px`;
                }
            });
        });
    };

    // Inicializar acordeones en cada slide
    acordeones.forEach((slide) => {
        const titulos = slide.querySelectorAll(".acordeon__titulo");
        const contenidos = slide.querySelectorAll(".acordeon__contenido");
        const contenidoDinamico = slide.querySelector(".contenido-dinamico");

        titulos.forEach((titulo, index) => {
            titulo.addEventListener("click", () => {
                if (isDesktop()) {
                    // En desktop, cargar el contenido en contenido-dinamico
                    titulos.forEach(t => t.classList.remove("active"));
                    titulo.classList.add("active");

                    const contenidoHtml = contenidos[index]?.innerHTML || "";
                    contenidoDinamico.innerHTML = contenidoHtml;

                    // Reaplicar funcionalidad a los acordeones internos
                    initAcordeones(contenidoDinamico);
                } else {
                    // En mobile, funcionamiento como acordeón normal
                    const contenido = contenidos[index];
                    const isActive = titulo.classList.contains("active");

                    if (isActive) {
                        titulo.classList.remove("active");
                        contenido.style.height = "0px";
                    } else {
                        titulos.forEach(t => t.classList.remove("active"));
                        contenidos.forEach(c => c.style.height = "0px");

                        titulo.classList.add("active");
                        contenido.style.height = `${contenido.scrollHeight}px`;

                        // Reaplicar funcionalidad para los anidados
                        initAcordeones(contenido);
                    }
                }
            });
        });
    });

    // Limpieza en desktop al cambiar tamaño de ventana
    window.addEventListener("resize", () => {
        if (isDesktop()) {
            acordeones.forEach((slide) => {
                const contenidoDinamico = slide.querySelector(".contenido-dinamico");
                contenidoDinamico.innerHTML = ""; // Limpiar contenido dinámico
            });
        }
    });
});


//carousel slider
const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
        const slideWidth = slides[0].offsetWidth;

        let currentIndex = 0;

        function updateSlidePosition() {
            const offset = -(slideWidth * currentIndex);
            track.style.transform = `translateX(${offset}px)`;
        }

        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlidePosition();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlidePosition();
            }
        });