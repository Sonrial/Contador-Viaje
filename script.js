document.addEventListener("DOMContentLoaded", () => {
    updateDate();
    updateDailyContent();
});

// 1. FUNCIÓN PARA FECHA ELEGANTE
function updateDate() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    // Capitalizar primera letra (ej: Lunes)
    let dateString = today.toLocaleDateString('es-ES', options);
    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    dateElement.textContent = dateString;
}

// 2. BASES DE DATOS (Contenido Profesional)

const facts = [
    { text: "El 'olor a lluvia' tiene nombre científico: Petricor, y es causado por bacterias del suelo.", category: "Ciencia" },
    { text: "Si pudieras doblar una hoja de papel 42 veces, su grosor llegaría hasta la Luna.", category: "Matemáticas" },
    { text: "Las vacas tienen mejores amigas y se estresan si las separan.", category: "Naturaleza" },
    { text: "La Universidad de Oxford es más antigua que el Imperio Azteca.", category: "Historia" },
    { text: "Los humanos compartimos el 50% de nuestro ADN con los plátanos.", category: "Genética" },
    { text: "Japón tiene una palabra, 'Tsundoku', para comprar libros y no leerlos.", category: "Cultura" },
    // Agrega más...
];

const questions = [
    "¿Qué habilidad te gustaría dominar instantáneamente?",
    "¿Cuál es el libro o película que cambió tu forma de pensar?",
    "Si el dinero no importara, ¿a qué te dedicarías?",
    "¿Qué consejo le darías a tu 'yo' de hace 5 años?",
    "¿Cuál es tu lugar favorito en el mundo (en el que hayas estado)?",
    "Define el éxito en una sola frase.",
    // Agrega más...
];

const quotes = [
    { text: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.", author: "John Lennon" },
    { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
    { text: "La simplicidad es la máxima sofisticación.", author: "Leonardo da Vinci" },
    { text: "Todo parece imposible hasta que se hace.", author: "Nelson Mandela" },
    { text: "Sé el cambio que quieres ver en el mundo.", author: "Mahatma Gandhi" },
    // Agrega más...
];

// 3. SELECCIÓN DIARIA SINCRONIZADA
function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function updateDailyContent() {
    const dayIndex = getDayOfYear();

    // Índices cíclicos
    const factIndex = dayIndex % facts.length;
    const questionIndex = dayIndex % questions.length;
    const quoteIndex = dayIndex % quotes.length;

    // Actualizar DOM - Curiosidad
    const factObj = facts[factIndex];
    document.getElementById("daily-fact").textContent = factObj.text;
    document.getElementById("fact-category").textContent = factObj.category;

    // Actualizar DOM - Pregunta
    document.getElementById("daily-question").textContent = questions[questionIndex];

    // Actualizar DOM - Cita
    const quoteObj = quotes[quoteIndex];
    document.getElementById("daily-quote").textContent = `"${quoteObj.text}"`;
    document.getElementById("quote-author").textContent = quoteObj.author;
}