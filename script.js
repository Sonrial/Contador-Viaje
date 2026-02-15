document.addEventListener("DOMContentLoaded", () => {
    updateDailyContent();
});

// --- BASES DE DATOS DE CONTENIDO ---

const facts = [
    { text: "Las nutrias se dan la mano cuando duermen para no separarse flotando.", category: "Animales" },
    { text: "En Júpiter y Saturno llueven diamantes debido a la alta presión atmosférica.", category: "Espacio" },
    { text: "Los pulpos tienen tres corazones y sangre azul.", category: "Biología" },
    { text: "Cleopatra vivió más cerca de la invención del iPhone que de la construcción de las Pirámides.", category: "Historia" },
    { text: "El agua caliente se congela más rápido que el agua fría bajo ciertas condiciones (Efecto Mpemba).", category: "Física" },
    { text: "Las abejas pueden reconocer rostros humanos.", category: "Naturaleza" },
    { text: "Es físicamente imposible tararear mientras te aprietas la nariz.", category: "Cuerpo Humano" },
    { text: "El nombre completo de Barbie es Barbara Millicent Roberts.", category: "Curiosidades" },
    { text: "En 10 minutos, un huracán libera más energía que todas las armas nucleares del mundo combinadas.", category: "Clima" },
    { text: "Los flamencos nacen grises, su color rosa viene de su dieta de camarones.", category: "Animales" },
    // ¡Añade más aquí! Intenta tener al menos 31 para variedad mensual
];

const questions = [
    "Si pudieras cenar con cualquier personaje histórico, ¿quién sería?",
    "¿Cuál es esa película que podrías ver 100 veces sin cansarte?",
    "¿Qué es lo que más te gusta de tu personalidad?",
    "Si ganáramos la lotería hoy, ¿qué sería lo primero que compraríamos?",
    "¿Cuál fue tu travesura más grande de niño/a?",
    "¿Qué superpoder tendrías: volar o ser invisible?",
    "¿Cuál es el mejor consejo que te han dado?",
    "Describe nuestro futuro juntos en 3 palabras.",
    "¿Qué canción te recuerda automáticamente a mí?",
    "Si fueramos animales, ¿cuáles seríamos?",
];

const challenges = [
    "Mándame una foto de lo que estás comiendo ahora mismo.",
    "Graba un audio de 10 segundos contando un chiste malo.",
    "Busca una foto nuestra vieja y dime qué pensabas en ese momento.",
    "Escribe 3 cosas por las que estás agradecido/a hoy.",
    "Dibújame en una servilleta o papel y mándame la foto (no importa si queda mal).",
    "Dedícame una historia de Instagram (o un estado) hoy.",
    "Tómate 5 minutos para meditar o respirar profundo hoy.",
    "Envíame un sticker que defina tu estado de ánimo actual.",
];

// --- LÓGICA PARA SELECCIÓN DIARIA (MISMO DÍA = MISMO CONTENIDO) ---

function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function updateDailyContent() {
    const dayIndex = getDayOfYear();

    // Selección cíclica: usa el operador módulo (%) para rotar infinitamente
    // aunque pasen los días y se acabe la lista.
    const factIndex = dayIndex % facts.length;
    const questionIndex = dayIndex % questions.length;
    const challengeIndex = dayIndex % challenges.length;

    // Actualizar DOM
    const factObj = facts[factIndex];
    document.getElementById("daily-fact").textContent = factObj.text;
    
    // Actualizar la etiqueta de categoría si existe
    const tagElement = document.querySelector(".tag");
    if(tagElement) tagElement.textContent = factObj.category;

    document.getElementById("daily-question").textContent = questions[questionIndex];
    document.getElementById("daily-challenge").textContent = challenges[challengeIndex];
}