
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

        document.addEventListener("DOMContentLoaded", () => {
            const slide5 = document.querySelector(".carousel-slide:nth-child(5)");
            if (!slide5) return;
        
            const acordeonTitulosSlide5 = slide5.querySelectorAll(".acordeon__titulo");
            const gridContainer = slide5.querySelector(".grid.dos-columnas");
        
            acordeonTitulosSlide5.forEach((titulo) => {
                titulo.addEventListener("click", () => {
                    const acordeon = titulo.parentElement;
                    const contenido = acordeon.querySelector(".acordeon__contenido");
        
                    // Asegurar que el grid dos-columnas siga visible
                    if (gridContainer && gridContainer.style.display === "none") {
                        gridContainer.style.display = "flex"; // Volver a mostrarlo si fue ocultado
                    }
        
                    // Si el acordeón ya está abierto, cerrarlo
                    if (contenido.classList.contains("show")) {
                        contenido.classList.remove("show");
                        contenido.style.maxHeight = "0px";
                    } else {
                        // Mantener siempre visible el grid dos-columnas
                        if (gridContainer) {
                            gridContainer.style.display = "flex";
                        }
        
                        // Ocultar otros contenidos antes de abrir el nuevo
                        slide5.querySelectorAll(".acordeon__contenido").forEach((el) => {
                            if (el !== contenido) {
                                el.classList.remove("show");
                                el.style.maxHeight = "0px";
                            }
                        });
        
                        // Mostrar el contenido seleccionado
                        contenido.classList.add("show");
                        contenido.style.maxHeight = contenido.scrollHeight + "px";
                    }
                });
            });
        });
        
///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//////////////////////BLOQUES HORARIOS///////////////////////////
/////////////////////////////////////////////////////////////////

// URL de la hoja de cálculo de Google Sheets
const sheetURL = 'https://docs.google.com/spreadsheets/d/1jCM9f0qXtOkmjVmbZHsgkvPAJcj2SylIVLpBqmyYkHo/edit#gid=0';

// Clave de API de Google Sheets
const apiKey = 'AIzaSyCkd6fKfFJoF9iRFG23Wmj-oMOCkDjUpFE';

// ID de la hoja de cálculo y rango de celdas inicial que quieres leer (puedes obtenerlos de la URL de la hoja de cálculo)
const sheetID = '1jCM9f0qXtOkmjVmbZHsgkvPAJcj2SylIVLpBqmyYkHo';
var range = 'A2:G4'; // Rango inicial

// Construir la URL de la API inicial con el rango de celdas inicial
var apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// Función para mostrar los datos en una tabla con CSS Grid MATUTINO
function displayDataInGrid(data, tableId) {
    const gridContainer = document.getElementById(tableId);
// Generar las celdas con los datos y agregarlas a la tabla
  // Obtener la cantidad máxima de columnas en todas las filas para asegurarnos de que todas las filas tengan la misma cantidad de columnas
  const maxColumns = Math.max(...data.values.map(row => row.length));

  // Rellenar las celdas faltantes con valores en blanco
  const filledData = data.values.map(row => [...row, ...Array(maxColumns - row.length).fill("")]);

  // Generar las celdas con los datos y agregarlas a la tabla
  filledData.forEach((row, rowIndex) => {
    row.forEach((cellData, columnIndex) => {
      const gridItem = document.createElement('span');

      // Dejar el contenido del span vacío si la celda está vacía
      gridItem.textContent = cellData;

      gridContainer.appendChild(gridItem);

      // Agregar estilos a todas las celdas, incluidas las celdas vacías
      gridItem.classList.add('grid-item');

      // Identificar los cabezales y laterales y agregarles los estilos
      if (rowIndex === 0 || columnIndex === 0) {
        gridItem.classList.add('table-head');
      }
    });
  });
  } 
//fin funcion displayDataInGrid
//////////////////////////////////////////////////
function displayDataInGrid2(data, tableId) {
  const gridContainer = document.getElementById(tableId);
// Generar las celdas con los datos y agregarlas a la tabla
// Obtener la cantidad máxima de columnas en todas las filas para asegurarnos de que todas las filas tengan la misma cantidad de columnas
const maxColumns = Math.max(...data.values.map(row => row.length));

// Rellenar las celdas faltantes con valores en blanco
const filledData = data.values.map(row => [...row, ...Array(maxColumns - row.length).fill("")]);

// Generar las celdas con los datos y agregarlas a la tabla
filledData.forEach((row, rowIndex) => {
  row.forEach((cellData, columnIndex) => {
    const gridItem = document.createElement('span');

    // Dejar el contenido del span vacío si la celda está vacía
    gridItem.textContent = cellData;

    gridContainer.appendChild(gridItem);

    // Agregar estilos a todas las celdas, incluidas las celdas vacías
    gridItem.classList.add('grid-item');

    // Identificar los cabezales y laterales y agregarles los estilos
    if (rowIndex === 0 || columnIndex === 0) {
      gridItem.classList.add('table-head-2');
    }
  });
});
} 
//NOCTURNO
function displayDataInGrid3(data, tableId) {
  const gridContainer = document.getElementById(tableId);
// Generar las celdas con los datos y agregarlas a la tabla
// Obtener la cantidad máxima de columnas en todas las filas para asegurarnos de que todas las filas tengan la misma cantidad de columnas
const maxColumns = Math.max(...data.values.map(row => row.length));

// Rellenar las celdas faltantes con valores en blanco
const filledData = data.values.map(row => [...row, ...Array(maxColumns - row.length).fill("")]);

// Generar las celdas con los datos y agregarlas a la tabla
filledData.forEach((row, rowIndex) => {
  row.forEach((cellData, columnIndex) => {
    const gridItem = document.createElement('span');

    // Dejar el contenido del span vacío si la celda está vacía
    gridItem.textContent = cellData;

    gridContainer.appendChild(gridItem);

    // Agregar estilos a todas las celdas, incluidas las celdas vacías
    gridItem.classList.add('grid-item');

    // Identificar los cabezales y laterales y agregarles los estilos
    if (rowIndex === 0 || columnIndex === 0) {
      gridItem.classList.add('table-head-3');
    }
  });
});
} 
//fin funcion displayDataInGrid
// Función para obtener los datos de la hoja de cálculo y mostrarlos en la tabla con CSS Grid
function fetchDataAndDisplay(tableId) {
    // Construir la URL de la API con el rango de celdas actual
    var apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;
  
    // Obtener los datos usando la apiUrl actualizada
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayDataInGrid(data, tableId))
        .catch(error => console.error('Error al obtener los datos:', error));
}
//VESPERTINO
// Función para obtener los datos de la hoja de cálculo y mostrarlos en la tabla con CSS Grid VESPERTINO
function fetchDataAndDisplay2(tableId) {
  // Construir la URL de la API con el rango de celdas actual
  var apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

  // Obtener los datos usando la apiUrl actualizada
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayDataInGrid2(data, tableId))
      .catch(error => console.error('Error al obtener los datos:', error));
}
//NOCTURNO
// Función para obtener los datos de la hoja de cálculo y mostrarlos en la tabla con CSS Grid VESPERTINO
function fetchDataAndDisplay3(tableId) {
  // Construir la URL de la API con el rango de celdas actual
  var apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

  // Obtener los datos usando la apiUrl actualizada
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayDataInGrid3(data, tableId))
      .catch(error => console.error('Error al obtener los datos:', error));
}


/////////////MATUTINO 1//////////////////////
const tableId1 = 'data-grid-1';
fetchDataAndDisplay(tableId1);
////////////////////////////////////////////////////////
/////////////MATUTINO 2//////////////////////
range = 'A9:G11'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId2 = 'data-grid-2';
fetchDataAndDisplay(tableId2); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 3//////////////////////
range = 'A16:G20'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId3 = 'data-grid-3';
fetchDataAndDisplay(tableId3); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 4//////////////////////
range = 'A23:F25'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId4 = 'data-grid-4';
fetchDataAndDisplay(tableId4); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 5//////////////////////
range = 'A30:F32'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId5 = 'data-grid-5';
fetchDataAndDisplay(tableId5); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 6//////////////////////
range = 'A37:F39'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId6 = 'data-grid-6';
fetchDataAndDisplay(tableId6); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 7//////////////////////
range = 'A44:F46'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId7 = 'data-grid-7';
fetchDataAndDisplay(tableId7); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 8//////////////////////
range = 'A51:F53'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId7_2 = 'data-grid-7-2';
fetchDataAndDisplay(tableId7_2); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 9//////////////////////
range = 'A58:F60'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId7_3 = 'data-grid-7-3';
fetchDataAndDisplay(tableId7_3); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
/////////////MATUTINO 10//////////////////////
range = 'A65:F68'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId7_4 = 'data-grid-7-4';
fetchDataAndDisplay(tableId7_4); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////


////////////////////VESPERTINO 1///////////////////////////////////////
range = 'A72:F74'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId8 = 'data-grid-8';
fetchDataAndDisplay2(tableId8); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
////////////////////VESPERTINO 2///////////////////////////////////////
range = 'A79:F81'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId8_1 = 'data-grid-8-1';
fetchDataAndDisplay2(tableId8_1); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////


////////////////////NOCTURNO 1///////////////////////////////////////
range = 'A86:F88'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId9 = 'data-grid-9';
fetchDataAndDisplay3(tableId9); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
////////////////////NOCTURNO 2///////////////////////////////////////
range = 'A93:F95'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId10 = 'data-grid-10';
fetchDataAndDisplay3(tableId10); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
////////////////////NOCTURNO 3///////////////////////////////////////
range = 'A100:F102'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId11 = 'data-grid-11';
fetchDataAndDisplay3(tableId11); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
////////////////////NOCTURNO 4///////////////////////////////////////
range = 'A107:F109'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId12 = 'data-grid-12';
fetchDataAndDisplay3(tableId12); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////
////////////////////NOCTURNO 5///////////////////////////////////////
range = 'A114:F116'; // Por ejemplo, para cambiar el rango a Hoja1!A10:F15
// Y luego actualizas la apiUrl con el nuevo rango antes de llamar a fetchDataAndDisplay() para cada tabla:
const tableId13 = 'data-grid-13';
fetchDataAndDisplay3(tableId13); // Muestra los datos en la tabla con ID data-grid-1
//////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", () => {
    const contenidoDinamico = document.querySelector(".carousel-slide:nth-child(5) .contenido-dinamico");
    const titulosHorarios = contenidoDinamico.querySelectorAll(".acordeon__titulo");

    titulosHorarios.forEach((titulo) => {
        titulo.addEventListener("click", () => {
            const targetId = titulo.getAttribute("data-horario");
            const contenido = document.getElementById(targetId);

            // Ocultar otros contenidos antes de mostrar el seleccionado
            contenidoDinamico.querySelectorAll(".acordeon__contenido").forEach((el) => {
                if (el !== contenido) {
                    el.classList.remove("show");
                    el.style.height = "0px";
                }
            });

            // Alternar la visibilidad del contenido seleccionado
            if (contenido.classList.contains("show")) {
                contenido.classList.remove("show");
                contenido.style.height = "0px";
            } else {
                contenido.classList.add("show");
                contenido.style.height = `${contenido.scrollHeight}px`;
            }
        });
    });
});
