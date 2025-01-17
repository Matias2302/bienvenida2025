///acordeón
let acordeones = Array.from(document.querySelectorAll(".acordeon"));

acordeones.map(function (acordeon) {
    const titulo = acordeon.querySelector(".acordeon__titulo");
    const contenido = acordeon.querySelector(".acordeon__contenido");
    titulo.addEventListener("click", function () {
    acordeon.className =
        acordeon.className === "acordeon"
        ? "acordeon acordeon--activo"
        : "acordeon";
    if (acordeon.className === "acordeon acordeon--activo") {
        contenido.style.height = contenido.scrollHeight + "px";
    } else {
        requestAnimationFrame(function(){
            contenido.style.height = "0px";
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