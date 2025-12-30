// script.js

// --- CONFIGURACIÓN DE TIEMPO ---
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

// Bogotá es UTC-5
const BOGOTA_OFFSET_MS = -5 * MS_PER_HOUR;

// Fecha objetivo: 1 de abril de 2026, 00:00 en Bogotá
const targetDateUTC = Date.UTC(2026, 3, 1, 5, 0, 0);

// --- COLECCIÓN DE CANCIONES (¡AHORA CON MÁS VARIEDAD!) ---
// He añadido muchas canciones y corregido los formatos de URL.
// Para añadir más, solo necesitas el ID de la canción de Spotify.
const songs = [
  // --- 5 SECONDS OF SUMMER ---
  { title: "COMPLETE MESS – 5SOS", embedUrl: "https://open.spotify.com/embed/track/1Y8COP6Oqef3UxIONvzx6I" },
  { title: "Take My Hand – 5SOS", embedUrl: "https://open.spotify.com/embed/track/55OlGT0r7dPTNuBlZXOjeA" },
  { title: "Bad Omens – 5SOS", embedUrl: "https://open.spotify.com/embed/track/6QcOEPC0bX799hITIgj3vU" },
  { title: "Older (feat. Sierra Deaton) – 5SOS", embedUrl: "https://open.spotify.com/embed/track/3NnvYEb93CrTVBssPtSCt1" },
  { title: "Bleach – 5SOS", embedUrl: "https://open.spotify.com/embed/track/3ddDFIHXxdx1dWsqLaz5Ac" },
  { title: "Caramel – 5SOS", embedUrl: "https://open.spotify.com/embed/track/5y4m1YdwhfYJUrhf1tNycy" },
  { title: "Easy For You To Say – 5SOS", embedUrl: "https://open.spotify.com/embed/track/0Qc78jjiHk3vIQdHffFyIG" },
  { title: "Moodswings – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2Ti6E6vDh9KAfcgdpOj1Nv" },
  { title: "You Don't Go To Parties – 5SOS", embedUrl: "https://open.spotify.com/embed/track/69Wf3RZaI4tOJMAYbn9Mkl" },
  { title: "Me, Myself & I – 5SOS", embedUrl: "https://open.spotify.com/embed/track/0C9aH2f4LO8SPPqUWOrcbk" },
  { title: "BLENDER – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2LBnpm1lEMkzD45ZGLmrQd" },
  { title: "Red Line – 5SOS", embedUrl: "https://open.spotify.com/embed/track/4NrBK073YycbPaM5acV6Iu" },
  { title: "Best Friends – 5SOS", embedUrl: "https://open.spotify.com/embed/track/5oX2gkzLSBRWM1kevYi8FA" },
  { title: "Emotions – 5SOS", embedUrl: "https://open.spotify.com/embed/track/63bZ2OSAf1VapUNHRAEOO1" },
  { title: "Bloodhound – 5SOS", embedUrl: "https://open.spotify.com/embed/track/08oJEBfO4uaf1N1tIkOnIx" },

  { title: "Wildflower – 5SOS", embedUrl: "https://open.spotify.com/embed/track/6qlcjGJPTZEwR8nf2nSe9C" },
  { title: "Lover Of Mine – 5SOS", embedUrl: "https://open.spotify.com/embed/track/1hUPOCqOukEl03lOs16DtN" },
  { title: "High – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2aAZGfJGtdSzs9W2M8F3Tx" },
  { title: "Old Me – 5SOS", embedUrl: "https://open.spotify.com/embed/track/58qO4dGa5SgNdtvqvpewyz" },
  { title: "No Shame – 5SOS", embedUrl: "https://open.spotify.com/embed/track/4kLm0P01JM1xS94Z4JC3oE" },
  { title: "Red Desert – 5SOS", embedUrl: "https://open.spotify.com/embed/track/288li8gcr0oOAHDwAERZHS" },
  { title: "Thin White Lies – 5SOS", embedUrl: "https://open.spotify.com/embed/track/1R9HBoVsqm7ecCa7RT7A9A" },
  { title: "Lonely Heart – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2vjQh1kNfBnSeeObR1Tywm" },

  { title: "Talk Fast – 5SOS", embedUrl: "https://open.spotify.com/embed/track/061UERtmEJw7uX3VQAT756" },
  { title: "Babylon – 5SOS", embedUrl: "https://open.spotify.com/embed/track/6PUYqQtGWVAovZrLC9BIqt" },
  { title: "Better Man – 5SOS", embedUrl: "https://open.spotify.com/embed/track/40rMvmTT9RX4KB0JzMNYZO" },
  { title: "Meet You There – 5SOS", embedUrl: "https://open.spotify.com/embed/track/4YYmvuwndD3YNfi43M7EC5" },
  { title: "Moving Along – 5SOS", embedUrl: "https://open.spotify.com/embed/track/4UQajPk0EPvbwWTl0fYi4C" },
  { title: "More – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2sQg7VpzJFGoXoOCtoIH5C" },

  { title: "Beside You – 5SOS", embedUrl: "https://open.spotify.com/embed/track/04iBN2ttkQBfGLj6DYlhKF" },
];

// --- FRASES DE AMOR (Iguales al original, puedes agregar más al final) ---
const lovePhrases = [
  "Te extraño sin drama, pero con unas ganas enormes de verte de verdad.",
  "La distancia no me quita amor; me lo concentra.",
  "Cada noche sin ti es un recordatorio de lo bien que se siente soñarte.",
  "Mi plan favorito sigue siendo el mismo: tú, yo y el resto que se acomode.",
  "No hay ‘lejos’ cuando mi corazón aprendió el camino hacia ti.",
  "Si el amor tuviera dirección, el mío siempre llega a tu nombre.",
  "Te pienso tanto que a veces siento que ya estás aquí, caminando a mi lado.",
  "Mi paciencia tiene tu cara, porque esperar por ti vale todo.",
  "No estoy contando días; estoy juntando razones para abrazarte más fuerte.",
  "El amor que te tengo no se enfría con kilómetros; se enciende con esperanza.",
  "A distancia se aprende algo hermoso: amarte sin tenerte enfrente igual se siente real.",
  "Tu mensaje más simple me cambia el día completo.",
  "Mi corazón se emociona como si fuera la primera vez cada vez que apareces.",
  "No te extraño por costumbre, te extraño por amor.",
  "Donde tú estés, allá está mi parte favorita del mundo.",
  "Tengo el abrazo listo desde hace tiempo, solo falta tu llegada.",
  "Eres mi ‘por fin’ en construcción.",
  "A veces el futuro pesa, pero contigo se siente ligero.",
  "Te amo en presente, aunque te espere en futuro.",
  "La distancia es solo un capítulo, no el final de la historia.",
  "Te pienso y se me ordena el corazón.",
  "Cuando me faltes, no me rompo: te guardo y te espero.",
  "Nuestra conexión es tan fuerte que ni el silencio la apaga.",
  "Me gusta hablar contigo porque hasta los días normales se vuelven especiales.",
  "No necesito verte para saber que eres lo mejor que me pasó.",
  "Si pudiera acortar algo en mi vida, sería el camino entre tú y yo.",
  "Tú no eres un ‘ojalá’, tú eres un ‘vamos a hacerlo’.",
  "Te elijo incluso cuando la distancia intenta hacerse la importante.",
  "Mi lugar seguro tiene tu nombre.",
  "Voy a quererte bonito, incluso en los días difíciles.",
  "El amor también se demuestra esperando sin rendirse.",
  "Me hacen falta tus abrazos, pero me sobra fe en lo nuestro.",
  "Cada plan contigo me da tranquilidad, como si ya estuviera escrito.",
  "Eres mi mejor noticia, incluso en días comunes.",
  "No hay prisa que compita con el momento de verte llegar.",
  "Cuando por fin te vea, voy a sonreír como quien recupera algo sagrado.",
  "Lo más cerca que estoy de ti es cada pensamiento que te cuida.",
  "La distancia no me cansa; me entrena para amarte mejor.",
  "Tu existencia me mejora el ánimo sin pedir permiso.",
  "Si supieras cuánto te admiro, entenderías por qué te amo tanto.",
  "No te espero para amarte: te amo mientras te espero.",
  "Nuestro amor es de los que se sostienen, se cuidan y se cumplen.",
  "Me gusta imaginar tu risa en mi casa, como si ya perteneciera aquí.",
  "Te juro que cuando estés conmigo, el mundo va a sentirse más simple.",
  "Eres mi persona favorita en cualquier zona horaria.",
  "No necesito tenerte cerca para cuidarte; te cuido con lo que hago y con lo que siento.",
  "Me enamora tu manera de existir, incluso desde lejos.",
  "Mi corazón ya te hizo espacio; ahora solo falta que llegues tú.",
  "Lo nuestro no es perfecto, es verdadero, y por eso es hermoso.",
  "Tú y yo tenemos ese tipo de amor que no se rinde, se organiza y se alcanza.",
  "Cada día te amo distinto, pero siempre más.",
  "Si la vida me da mil caminos, igual termino eligiéndote.",
  "Cuando estés aquí, voy a darte tantos abrazos que te vas a olvidar del viaje.",
  "No sé cómo explicarlo, pero contigo hasta esperar se siente bonito.",
  "No es que te piense mucho… es que mi corazón te tiene de costumbre.",
  "La distancia no me separa de ti; me recuerda cuánto significas.",
  "Eres esa calma que yo no sabía que necesitaba.",
  "Te extraño con ganas, pero también con orgullo: lo nuestro es fuerte.",
  "Cuando hablas, mi mente se calla y mi corazón entiende.",
  "No quiero un final feliz; quiero una vida contigo.",
  "El mundo es grande, pero mi amor por ti lo cubre completo.",
  "No hay viaje más importante que el que nos lleve al mismo abrazo.",
  "A tu lado, hasta lo simple se siente como hogar.",
];

// Función para obtener índice cíclico
function mod(n, m) {
  return ((n % m) + m) % m;
}

// --- LÓGICA DE CUENTA REGRESIVA ---
function updateCountdown() {
  const now = new Date();
  const diff = targetDateUTC - now.getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";

    const title = document.querySelector(".title");
    const caption = document.querySelector(".caption");
    if (title) title.textContent = "¡Ya estás aquí!";
    if (caption) caption.innerHTML = "El viaje terminó, pero nuestra historia apenas empieza 💖";
    return;
  }

  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

// --- ACTUALIZACIÓN DE CONTENIDO DIARIO ---
function updateDailyContent() {
  const now = new Date();
  const utcMillis = now.getTime();
  const bogotaMillis = utcMillis + BOGOTA_OFFSET_MS;
  const bogotaDayIndex = Math.floor(bogotaMillis / MS_PER_DAY);

  const phraseIndex = mod(bogotaDayIndex, lovePhrases.length);
  const songIndex = mod(bogotaDayIndex, songs.length);

  const phraseEl = document.getElementById("love-phrase");
  const songTitleEl = document.getElementById("song-title");
  const spotifyIframe = document.getElementById("spotify-iframe");

  if (phraseEl) phraseEl.textContent = lovePhrases[phraseIndex];

  if (songTitleEl && spotifyIframe) {
    const song = songs[songIndex];
    songTitleEl.textContent = song.title;
    // Solo actualizamos si cambia para no recargar el iframe innecesariamente
    if (spotifyIframe.src !== song.embedUrl) {
      spotifyIframe.src = song.embedUrl;
    }
  }
}

// --- LÓGICA DE EVENTOS ESPECIALES ---
function checkSpecialEvents() {
  const now = new Date();
  // Ajustamos a hora de Colombia para que el evento salga en TU hora
  const bogotaTime = new Date(now.getTime() + BOGOTA_OFFSET_MS);

  // NOTA: getMonth() devuelve 0 para Enero, 11 para Diciembre
  const month = bogotaTime.getUTCMonth(); 
  const day = bogotaTime.getUTCDate();

  let eventTitle = "";
  let eventMessage = "";
  let eventEmoji = "";
  let effectsType = ""; // 'confetti', 'candles', 'snow', 'hearts'
  let isSpecialDay = false;

  // 1. DÍA DE LAS VELITAS (7 de Diciembre) -> Mes 11, Día 7
  if (month === 11 && day === 7) {
    isSpecialDay = true;
    eventTitle = "¡Día de las Velitas! 🕯️🇨🇴";
    eventMessage = "Hoy en Colombia encendemos velitas para pedir deseos. Bibi, hoy enciendo una luz especial por ti, para que iluminen tu camino hasta que llegues a mí. ¡Te extraño!";
    eventEmoji = "🕯️";
    effectsType = "candles";
  }
  // 2. NAVIDAD (24 y 25 de Diciembre)
  else if (month === 11 && (day === 24 || day === 25)) {
    isSpecialDay = true;
    eventTitle = "¡Feliz Navidad, mi bibiciosa bibilinda! 🎄";
    eventMessage = "Aunque estemos lejos esta Navidad, mi mejor regalo eres tú. Espero que el próximo año pueda abrazarte y celebrarlo juntos.";
    eventEmoji = "🎁";
    effectsType = "snow";
  }
  // 3. AÑO NUEVO (31 Dic y 1 Ene)
  else if ((month === 11 && day === 31) || (month === 0 && day === 1)) {
    isSpecialDay = true;
    eventTitle = "¡Feliz Año Nuevo! 🥂";
    eventMessage = "Un año más juntos, un año más para amarnos. Gracias por ser mi compañera de vida otro año más.";
    eventEmoji = "🎆";
    effectsType = "confetti";
  }
  // 4. TU CUMPLEAÑOS (14 de Febrero) -> Mes 1, Día 14
  else if (month === 1 && day === 14) {
    isSpecialDay = true;
    eventTitle = "¡Feliz Cumpleaños y San Valentín! 🎂💘";
    eventMessage = "Hoy celebra el mundo el amor, pero yo celebro que naciste tú. Eres mi regalo favorito de la vida. ¡Te amo infinito bibilinda!";
    eventEmoji = "💝";
    effectsType = "hearts";
  }
  // 5. BIBIMES (Día 25 de cada mes)
  // Nota: Esto va al final con un 'else if' para que si es Navidad (25 dic), gane el mensaje de Navidad.
  else if (day === 25) {
    isSpecialDay = true;
    eventTitle = "¡Feliz Bibimes! 🐼💕";
    eventMessage = "¡Otro mes más juntos, bibiciosa! Gracias por hacerme tan feliz cada día. Ya falta menos para celebrar estos días en persona.";
    eventEmoji = "📅";
    effectsType = "hearts";
  }

  // Si es un día especial, mostramos el modal y los efectos
  if (isSpecialDay) {
    showModal(eventTitle, eventMessage, eventEmoji);
    startEffects(effectsType);
  }
}

// Función para mostrar la ventana emergente
function showModal(title, message, emoji) {
  const modal = document.getElementById("event-modal");
  document.getElementById("event-title").textContent = title;
  document.getElementById("event-message").textContent = message;
  document.getElementById("event-emoji").textContent = emoji;
  
  // Mostramos el modal
  modal.classList.remove("hidden");

  // Botón de cerrar
  document.getElementById("close-modal").onclick = () => {
    modal.classList.add("hidden");
    // Opcional: Detener efectos al cerrar si quieres
    // document.getElementById("effects-container").innerHTML = '';
  };
}

// Función para generar lluvia de emojis
function startEffects(type) {
  const container = document.getElementById("effects-container");
  container.innerHTML = ""; // Limpiar anteriores

  let emojis = [];
  if (type === 'hearts') emojis = ['❤️', '💖', '💕', '🥰', '🌹'];
  if (type === 'candles') emojis = ['🕯️', '✨', '🔥', '🌟'];
  if (type === 'snow') emojis = ['❄️', '🌨️', '⛄', '🎄'];
  if (type === 'confetti') emojis = ['🎉', '🎊', '🥳', '🥂'];

  // Crear 30 elementos cayendo
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.classList.add("falling-emoji");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posición y velocidad aleatoria
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = (Math.random() * 3 + 2) + "s"; // Entre 2 y 5 seg
    el.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
    el.style.animationDelay = Math.random() * 2 + "s";
    
    container.appendChild(el);
  }
}

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);

  updateDailyContent();
  // Revisamos si hay evento especial hoy
  checkSpecialEvents();
  
  setInterval(updateDailyContent, MS_PER_HOUR);
});
