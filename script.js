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
  { title: "Youngblood – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2iUXsYOEPhVqEBwsqP70rE" },
  { title: "Amnesia – 5SOS", embedUrl: "https://open.spotify.com/embed/track/1JCCdiru7fhstOIF4N7WJC" },
  { title: "She Looks So Perfect – 5SOS", embedUrl: "https://open.spotify.com/embed/track/1gugDOSMREb34Xo0c1PlxM" },
  { title: "Ghost of You – 5SOS", embedUrl: "https://open.spotify.com/embed/track/1MhXdlCQPnO56T57MfmaRm" },
  { title: "Teeth – 5SOS", embedUrl: "https://open.spotify.com/embed/track/26wLOs3ZuHJa2Ihhx6QIE6" },
  { title: "Jet Black Heart – 5SOS", embedUrl: "https://open.spotify.com/embed/track/1KAkTstWzEOT24VqCDkKdl" },
  { title: "Easier – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2bjUEg4jBtKBlPdNrTAppI" },
  { title: "Want You Back – 5SOS", embedUrl: "https://open.spotify.com/embed/track/2vHfabj6nFebekTYODqntl" },
  { title: "Lie To Me – 5SOS", embedUrl: "https://open.spotify.com/embed/track/5c5sF91Cfk7bU45r055H81" },
  
  // --- ROMÁNTICAS EN ESPAÑOL ---
  { title: "Eres Tú – Luis Fonsi", embedUrl: "https://open.spotify.com/embed/track/5v3J7CimKjVznZn2Pj1ng5" },
  { title: "Perfecta – Reik", embedUrl: "https://open.spotify.com/embed/track/6VOb0Kkrd45Bp5RHYSla2J" },
  { title: "Amarillo – Shakira", embedUrl: "https://open.spotify.com/embed/track/4VJVV1Jyy3bZVZobSsdxF0" },
  { title: "Para Tu Amor – Juanes", embedUrl: "https://open.spotify.com/embed/track/4pucfRsz3Yk9TxmScc7Vq9" },
  { title: "Favorito – Camilo", embedUrl: "https://open.spotify.com/embed/track/0jT8Nl0shPS8115is0wD2Q" },
  { title: "Vida de Rico – Camilo", embedUrl: "https://open.spotify.com/embed/track/0jT8Nl0shPS8115is0wD2Q" },
  { title: "Índigo – Camilo & Evaluna", embedUrl: "https://open.spotify.com/embed/track/2B7c5m27XU3d3u5Xm1I3fI" },
  { title: "Beso – Rosalía & Rauw", embedUrl: "https://open.spotify.com/embed/track/609E1JCInJncFRrbMYkF80" },
  { title: "Mi Persona Favorita – Alejandro Sanz", embedUrl: "https://open.spotify.com/embed/track/0t3X8W9f8y5WJ9l5m8p6q6" },
  
  // --- ROMÁNTICAS EN INGLÉS ---
  { title: "All of Me – John Legend", embedUrl: "https://open.spotify.com/embed/track/1UBj9KDqlu2qYg2kzWwrzY" },
  { title: "Perfect – Ed Sheeran", embedUrl: "https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v" },
  { title: "Fix You – Coldplay", embedUrl: "https://open.spotify.com/embed/track/3f95I6Wk7BZB3s29m7MIpH" },
  { title: "Make You Feel My Love – Adele", embedUrl: "https://open.spotify.com/embed/track/1I4vqOq0LlYkJTTI3hIpmR" },
  { title: "Something – The Beatles", embedUrl: "https://open.spotify.com/embed/track/1ZcLrgsz6zXMpw6uyvF9m2" },
  { title: "I'm Yours – Jason Mraz", embedUrl: "https://open.spotify.com/embed/track/0i6oGpaBlG7M25pzA2jHoD" },
  { title: "Stand By Me – Ben E. King", embedUrl: "https://open.spotify.com/embed/track/4F1K9tbT59WwFyZfgYbEX9" },
  { title: "Just The Way You Are – Bruno Mars", embedUrl: "https://open.spotify.com/embed/track/7BqBn9nXd41cnCjQuB3d4N" },
  { title: "Lover – Taylor Swift", embedUrl: "https://open.spotify.com/embed/track/1dGr1c2nMS50KsZ53zkRIx" }
];

// --- FRASES DE AMOR (Iguales al original, puedes agregar más al final) ---
const lovePhrases = [
  "Cada día que pasa faltan menos latidos para coincidir con los tuyos.",
  "La distancia cuenta kilómetros, pero mi corazón cuenta besos pendientes.",
  "Tu ausencia es solo el espacio donde se prepara el abrazo más largo de nuestra historia.",
  "En el calendario marco días; en mi corazón marco momentos contigo.",
  "Cuando llegues, hasta el tiempo va a detenerse para mirarnos abrazados.",
  "El cielo de Colombia ya está guardando atardeceres para mostrártelos conmigo.",
  "No importa cuántos días falten, mi amor por ti siempre va un paso adelante.",
  "Cada segundo sin ti es una semilla del recuerdo perfecto que vamos a sembrar juntos.",
  "Nuestro viaje no empieza en el aeropuerto, empieza en cada sueño donde ya te abrazo.",
  "Tu risa será la banda sonora de todos mis días cuando estés aquí.",
  "Prometo que cuando llegues, voy a mirar tus ojos como quien por fin encuentra su casa.",
  "La cuenta regresiva termina; pero nuestro siempre apenas comienza.",
  "Tu nombre es la forma más bonita que tiene el futuro de llamarme.",
  "Si el tiempo se mide en amor, contigo todo se vuelve infinito.",
  "Cada amanecer sin ti es un ensayo general para el primero que veamos juntos.",
  "Aunque estés lejos, eres mi lugar favorito del mundo.",
  "El universo se hizo pequeño desde que decidí que mi mundo eres tú.",
  "Tus pasos hacia mí ya se escuchan en mi corazón.",
  "Te espero no con paciencia, sino con ilusión, que es mucho más bonita.",
  "Cuando por fin te abrace, todos estos días van a tener sentido.",
  "Te amé desde que mis ojos te vieron, y te seguiré amando hasta que mis ojos dejen de ver.",
  "No hay distancia que impida que mi amor por ti crezca más.",
  "Si pudiera regalarte algo, te regalaría la capacidad de verte a través de mis ojos.",
  "El amor no se mide por el tiempo que compartimos, sino por la intensidad con que vivimos cada momento juntos.",
  "Cada segundo que paso sin ti, me encuentro soñando con el siguiente segundo en que te veré.",
  "Eres el sueño que nunca quiero despertar, la melodía que mi corazón siempre quiere escuchar.",
  "Mi amor por ti es más grande que todos los mares, más profundo que todos los cielos.",
  "No necesito un cielo para saber que soy afortunado. Solo necesito tus ojos.",
  "No tengo palabras para describir lo que siento, solo mi corazón puede hablar.",
  "Cada vez que te miro, encuentro un nuevo motivo para amarte más.",
  "En cada abrazo tuyo se encuentra la paz que mi alma necesita.",
  "Si cada estrella del cielo representara un motivo para amarte, no habría suficientes estrellas.",
  "Nuestro amor es como un río, fluye suave, pero con fuerza.",
  "Me perdí en ti, y ahora que estoy en ti, sé que no quiero encontrar el camino de regreso.",
  "Eres mi todo, la razón por la que sonrío sin razón."
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
