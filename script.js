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
    { text: "Un día en Venus es más largo que un año en Venus.", category: "Espacio" },
    { text: "Las abejas pueden reconocer rostros humanos individuales.", category: "Naturaleza" },
    { text: "Nintendo fue fundada cuando todavía existía el Imperio Otomano (1889).", category: "Historia" },
    { text: "Las nubes cumulus promedio pesan alrededor de 500.000 kilos (como 100 elefantes).", category: "Clima" },
    { text: "Es imposible tararear mientras te aprietas la nariz (inténtalo).", category: "Cuerpo Humano" },
    { text: "Los tiburones existieron antes que los árboles.", category: "Evolución" },
    { text: "El animal nacional de Escocia es el Unicornio.", category: "Cultura" },
    { text: "La miel es el único alimento que nunca se estropea; se ha encontrado miel comestible en tumbas egipcias.", category: "Ciencia" },
    { text: "Tu nariz y tus orejas nunca dejan de crecer.", category: "Biología" },
    { text: "En promedio, pasas 6 meses de tu vida esperando en semáforos en rojo.", category: "Sociedad" },
    { text: "Los koalas tienen huellas dactilares casi idénticas a las humanas.", category: "Animales" },
    { text: "Cleopatra vivió más cerca de la invención del iPhone que de la construcción de las Pirámides.", category: "Historia" },
    { text: "Llover diamantes es posible en Neptuno y Urano.", category: "Espacio" },
    { text: "Los pulpos tienen tres corazones y nueve cerebros.", category: "Biología" },
    { text: "El 'hashtag' (#) se llama en realidad 'octothorpe'.", category: "Lenguaje" },
    { text: "Los plátanos son bayas, pero las fresas no.", category: "Botánica" },
    { text: "La Torre Eiffel puede crecer 15 cm en verano debido a la expansión térmica.", category: "Física" },
    { text: "Hay más estrellas en el universo que granos de arena en todas las playas de la Tierra.", category: "Espacio" },
    { text: "Las nutrias se dan la mano mientras duermen para no separarse flotando.", category: "Animales" },
    { text: "El corazón de una ballena azul es tan grande que un humano podría nadar por sus arterias.", category: "Naturaleza" },
];

const questions = [
    "¿Qué habilidad te gustaría dominar instantáneamente?",
    "¿Cuál es el libro o película que cambió tu forma de pensar?",
    "Si el dinero no importara, ¿a qué te dedicarías?",
    "¿Qué consejo le darías a tu 'yo' de hace 5 años?",
    "¿Cuál es tu lugar favorito en el mundo (en el que hayas estado)?",
    "Define el éxito en una sola frase.",
    "¿Cuál es el recuerdo de tu infancia que te hace sonreír siempre?",
    "Si pudieras tener una cena con cualquier personaje histórico, ¿a quién elegirías?",
    "¿Qué canción te recuerda inmediatamente a mí?",
    "Si el dinero no fuera un problema, ¿a dónde viajaríamos mañana mismo?",
    "¿Cuál consideras que es tu mayor talento inútil?",
    "¿Qué es lo que más valoras de nuestra relación?",
    "Si pudieras ver una estadística de tu vida, ¿cuál te gustaría ver?",
    "¿Qué película podrías ver 10 veces seguidas sin aburrirte?",
    "¿Cuál fue el mejor consejo que te han dado y quién te lo dio?",
    "Si escribieras un libro sobre tu vida, ¿cómo se llamaría el capítulo actual?",
    "¿Qué pequeño detalle te alegra el día instantáneamente?",
    "Si fueras un animal, ¿cuál serías y por qué?",
    "¿Qué superpoder elegirías: volar o ser invisible?",
    "Describe tu día perfecto de principio a fin.",
    "¿Qué es lo que más te gusta de ti mismo/a?",
    "Si pudieras aprender un idioma instantáneamente, ¿cuál sería?",
    "¿Cuál es tu miedo más irracional?",
    "¿Qué harías si hubiera un apocalipsis zombie ahora mismo?",
    "¿Cuál es tu forma favorita de recibir cariño?",
    "Si pudieras cambiar algo del mundo con un chasquido, ¿qué sería?",
];

const quotes = [
    { text: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.", author: "John Lennon" },
    { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
    { text: "La simplicidad es la máxima sofisticación.", author: "Leonardo da Vinci" },
    { text: "Todo parece imposible hasta que se hace.", author: "Nelson Mandela" },
    { text: "Sé el cambio que quieres ver en el mundo.", author: "Mahatma Gandhi" },
    { text: "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.", author: "Antoine de Saint-Exupéry" },
    { text: "No tenemos poco tiempo, sino que perdemos mucho.", author: "Séneca" },
    { text: "La felicidad depende de nosotros mismos.", author: "Aristóteles" },
    { text: "Lo que no te mata, te hace más fuerte.", author: "Friedrich Nietzsche" },
    { text: "El único modo de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs" },
    { text: "Donde hay amor hay vida.", author: "Mahatma Gandhi" },
    { text: "La medida del amor es amar sin medida.", author: "San Agustín" },
    { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
    { text: "La simplicidad es la máxima sofisticación.", author: "Leonardo da Vinci" },
    { text: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt" },
    { text: "Sé el cambio que quieres ver en el mundo.", author: "Mahatma Gandhi" },
    { text: "Amar es encontrar en la felicidad de otro tu propia felicidad.", author: "Gottfried Leibniz" },
    { text: "La vida es 10% lo que te ocurre y 90% cómo reaccionas a ello.", author: "Charles R. Swindoll" },
    { text: "Cree que puedes y ya estarás a medio camino.", author: "Theodore Roosevelt" },
    { text: "El amor es la única fuerza capaz de transformar un enemigo en amigo.", author: "Martin Luther King Jr." },
    { text: "La paciencia es amarga, pero su fruto es dulce.", author: "Jean-Jacques Rousseau" },
    { text: "La mejor manera de predecir el futuro es creándolo.", author: "Peter Drucker" },
    { text: "A veces, el corazón ve lo que es invisible para el ojo.", author: "H. Jackson Brown Jr." },
    { text: "Eres el dueño de tu destino. Eres el capitán de tu alma.", author: "William Ernest Henley" },
    { text: "Todo lo que puedes imaginar es real.", author: "Pablo Picasso" },
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