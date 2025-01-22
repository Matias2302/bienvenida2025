///acordeón
document.addEventListener("DOMContentLoaded", () => {
    const acordeones = document.querySelectorAll(".acordeon");

    acordeones.forEach((acordeon) => {
        const titulo = acordeon.querySelector(".acordeon__titulo");
        const contenido = acordeon.querySelector(".acordeon__contenido");

        if (titulo && contenido) {
            titulo.addEventListener("click", (event) => {
                event.stopPropagation(); // Evita que el evento se propague a acordeones externos

                const isActive = acordeon.classList.contains("acordeon--activo");

                // Cierra todos los acordeones al mismo nivel
                const siblings = Array.from(acordeon.parentElement.children).filter(
                    child => child !== acordeon && child.classList.contains("acordeon")
                );

                siblings.forEach(sibling => {
                    sibling.classList.remove("acordeon--activo");
                    const siblingContent = sibling.querySelector(".acordeon__contenido");
                    if (siblingContent) siblingContent.style.height = "0px";
                });

                // Abre o cierra el acordeón actual
                if (!isActive) {
                    acordeon.classList.add("acordeon--activo");

                    // Asegurar altura correcta
                    contenido.style.height = `${contenido.scrollHeight}px`;

                    // Recalcular alturas de los padres
                    adjustParentHeight(acordeon);
                } else {
                    acordeon.classList.remove("acordeon--activo");
                    contenido.style.height = "0px";

                    // Recalcular alturas de los padres
                    adjustParentHeight(acordeon);
                }
            });
        } else {
            console.warn("Un acordeón no tiene título o contenido válido:", acordeon);
        }
    });

    // Función para ajustar dinámicamente las alturas de los padres
    const adjustParentHeight = (acordeon) => {
        let parent = acordeon.parentElement.closest(".acordeon__contenido");
        while (parent) {
            const allVisibleContents = Array.from(parent.children).filter(child => {
                const innerContent = child.querySelector(".acordeon__contenido");
                return innerContent && (child.classList.contains("acordeon--activo") || innerContent.scrollHeight > 0);
            });

            const totalHeight = allVisibleContents.reduce((sum, child) => {
                const innerContent = child.querySelector(".acordeon__contenido");
                return sum + (innerContent ? innerContent.scrollHeight : 0);
            }, 0);

            parent.style.height = `${totalHeight}px`;
            parent = parent.parentElement.closest(".acordeon__contenido");
        }
    };

    // Recalcular todas las alturas dinámicamente en redimensionamiento
    const recalculateAllHeights = () => {
        acordeones.forEach((acordeon) => {
            const contenido = acordeon.querySelector(".acordeon__contenido");
            if (contenido && acordeon.classList.contains("acordeon--activo")) {
                contenido.style.height = `${contenido.scrollHeight}px`;
            } else if (contenido) {
                contenido.style.height = "0px";
            }
        });
    };

    window.addEventListener("resize", recalculateAllHeights);
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