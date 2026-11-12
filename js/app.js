
const preguntas = [
    {
        pregunta: "¿Qué lenguaje se utiliza para dar lógica a una página web?",
        opciones: ["HTML", "CSS", "JavaScript", "Python"],
        correcta: 2
    },
    {
        pregunta: "¿Qué etiqueta se utiliza para crear un título en HTML?",
        opciones: ["<p>", "<h1>", "<img>", "<div>"],
        correcta: 1
    },
    {
        pregunta: "¿Qué propiedad de CSS cambia el color del texto?",
        opciones: ["background", "margin", "color", "padding"],
        correcta: 2
    },
    {
        pregunta: "¿Qué palabra permite declarar una variable en JavaScript?",
        opciones: ["let", "style", "html", "body"],
        correcta: 0
    },
    {
        pregunta: "¿Qué estructura permite repetir instrucciones?",
        opciones: ["if", "for", "return", "const"],
        correcta: 1
    }
];

// VARIABLES DEL JUEGO

let preguntaActual = 0;
let puntos = 0;
let respondida = false;

// ELEMENTOS HTML

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const btnComenzar = document.getElementById("btnComenzar");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");

const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");

const numeroPregunta = document.getElementById("numeroPregunta");
const puntaje = document.getElementById("puntaje");
const resultado = document.getElementById("resultado");

const puntajeFinal = document.getElementById("puntajeFinal");

// INICIAR JUEGO

function iniciarJuego() {

    preguntaActual = 0;
    puntos = 0;

    inicio.classList.add("oculto");
    final.classList.add("oculto");
    juego.classList.remove("oculto");

    mostrarPregunta();
}

// MOSTRAR PREGUNTA

function mostrarPregunta() {

    respondida = false;

    resultado.textContent = "";
    btnSiguiente.classList.add("oculto");

    let preguntaDatos = preguntas[preguntaActual];

    pregunta.textContent = preguntaDatos.pregunta;

    numeroPregunta.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    puntaje.textContent = `Puntos: ${puntos}`;

    opciones.innerHTML = "";

    preguntaDatos.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.textContent = opcion;
        boton.classList.add("opcion");

        boton.addEventListener("click", function() {
            comprobarRespuesta(indice);
        });

        opciones.appendChild(boton);

    });
}

// COMPROBAR RESPUESTA

function comprobarRespuesta(indiceSeleccionado) {

    if (respondida) {
        return;
    }

    respondida = true;

    const correcta = preguntas[preguntaActual].correcta;
    const botones = document.querySelectorAll(".opcion");

    botones.forEach((boton, indice) => {

        boton.disabled = true;

        if (indice === correcta) {
            boton.classList.add("correcta");
        }

        if (indice === indiceSeleccionado && indice !== correcta) {
            boton.classList.add("incorrecta");
        }

    });

    if (indiceSeleccionado === correcta) {

        puntos += 10;
        resultado.textContent = "¡Respuesta correcta! +10 puntos";

    } else {

        resultado.textContent = "Respuesta incorrecta. ¡Seguí intentando!";

    }

    puntaje.textContent = `Puntos: ${puntos}`;

    btnSiguiente.classList.remove("oculto");
}

// SIGUIENTE PREGUNTA

function siguientePregunta() {

    preguntaActual++;

    if (preguntaActual < preguntas.length) {

        mostrarPregunta();

    } else {

        terminarJuego();

    }
}

// TERMINAR JUEGO

function terminarJuego() {

    juego.classList.add("oculto");
    final.classList.remove("oculto");

    puntajeFinal.textContent =
        `Conseguiste ${puntos} de ${preguntas.length * 10} puntos.`;

}

// REINICIAR JUEGO

function reiniciarJuego() {

    iniciarJuego();

}

// EVENTOS DE LOS BOTONES

btnComenzar.addEventListener("click", iniciarJuego);

btnSiguiente.addEventListener("click", siguientePregunta);

btnReiniciar.addEventListener("click", reiniciarJuego);
