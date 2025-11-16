// script.js

// ... (constantes de tiempo no cambian) ...
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

// Bogotá es UTC-5 (sin cambios por horario de verano)
const BOGOTA_OFFSET_MS = -5 * MS_PER_HOUR;

// ... (fecha objetivo no cambia) ...
// ... (constantes de tiempo y fecha objetivo no cambian) ...

// ... (la lista de 'songs' no cambia) ...
const songs = [
  {
    title: "Eres Tú – Luis Fonsi",
    embedUrl: "https://www.youtube.com/embed/11-e1I-FmB4" // Versión Audio
  },
  {
    title: "All of Me – John Legend",
    embedUrl: "https://www.youtube.com/embed/f-tTQF4_GrY" // Versión Topic
  },
  {
    title: "Amarillo – Shakira",
    embedUrl: "https://www.youtube.com/embed/pD4s2-N6tK4" // Versión Topic
  },
  {
    title: "Fix You – Coldplay",
    embedUrl: "https://www.youtube.com/embed/sxj-l2aCgX0" // Versión Topic
  },
  {
    title: "Make You Feel My Love – Adele",
    embedUrl: "https://www.youtube.com/embed/Y-l-g_y_n-I" // Versión Topic
  },
  {
    title: "Something – The Beatles",
    embedUrl: "https://www.youtube.com/embed/Z0y-i-v1S-s" // Versión Topic
  },
  {
    title: "I'm Yours – Jason Mraz",
    embedUrl: "https://www.youtube.com/embed/t2s-s0QpQdE" // Versión Topic
  },
  {
    title: "We Found Love – Rihanna",
    embedUrl: "https://www.youtube.com/embed/U33t-flzS7E" // Versión Topic
  },
  {
    title: "Stand By Me – Ben E. King",
    embedUrl: "https://www.youtube.com/embed/IGrU1j1m-fU" // Versión Topic
  },
  {
    title: "The Way You Look Tonight – Frank Sinatra",
    embedUrl: "https://www.youtube.com/embed/h9M8N-mQh3I" // Video (este sí funciona)
  },
  {
    title: "Para Tu Amor – Juanes",
    embedUrl: "https://www.youtube.com/embed/JmB6hOOh-pE" // Versión Topic
  },
  {
    title: "Stay With Me – Sam Smith",
    embedUrl: "https://www.youtube.com/embed/aIuBfhw-S-M" // Versión Topic
  },
  {
    title: "If I Ain't Got You – Alicia Keys",
    embedUrl: "https://www.youtube.com/embed/g0k2v2tqKTE" // Versión Topic
  },
  {
    title: "Can't Help Falling In Love – Elvis Presley",
    embedUrl: "https://www.youtube.com/embed/qvt_i-v-s1s" // Versión Topic
  },
  {
    title: "Youngblood – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/eDYm-0O-rFk" // Versión Topic
  },
  {
    title: "She Looks So Perfect – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/q3y-s-d-P9M" // Versión Topic
  },
  {
    title: "Amnesia – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/L1ZGED1o3oE" // Versión Topic
  },
  {
    title: "Teeth – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/eYUKQ-yAIsY" // Versión Topic
  },
  {
    title: "Jet Black Heart – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/A1Uj-PISW_M" // Versión Topic
  },
  {
    title: "Want You Back – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/vD0qFSAWlQY" // Versión Topic
  },
  {
    title: "Ghost of You – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/Y-M9hPhNf6w" // Versión Topic
  },
  {
    title: "Easier – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/H37Hn-aVl-k" // Versión Topic
  }
];

// ... (la lista de 'lovePhrases' no cambia) ...
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
  // ----- ¡¡ERROR CORREGIDO!! -----
  // La siguiente línea no tenía una coma al final, lo que rompía todo el script.
  "Cuando por fin te abrace, todos estos días van a tener sentido.",
  // -------------------------------
  "Te amé desde que mis ojos te vieron, y te seguiré amando hasta que mis ojos dejen de ver.",
  "No hay distancia que impida que mi amor por ti crezca más, porque cada pensamiento mío llega hasta ti en cada latido.",
  "Si pudiera regalarte algo, te regalaría la capacidad de verte a través de mis ojos. Entonces, verías cuánto te amo.",
  "El amor no se mide por el tiempo que compartimos, sino por la intensidad con que vivimos cada momento juntos.",
  "Cada segundo que paso sin ti, me encuentro soñando con el siguiente segundo en que te veré.",
  "Eres el sueño que nunca quiero despertar, la melodía que mi corazón siempre quiere escuchar.",
  "Mi amor por ti es más grande que todos los mares, más profundo que todos los cielos, y eterno como las estrellas.",
  "No necesito un cielo para saber que soy afortunado. Solo necesito tus ojos para ver mi vida llena de paz.",
  "No tengo palabras para describir lo que siento, solo mi corazón puede hablar y su latido te dice todo.",
  "Cada vez que te miro, encuentro un nuevo motivo para amarte más. No hay final en el amor que te tengo.",
  "En cada abrazo tuyo se encuentra la paz que mi alma necesita. En cada beso tuyo, la eternidad de mi amor por ti.",
  "Si cada estrella del cielo representara un motivo para amarte, no habría suficientes estrellas para mostrar lo que siento por ti.",
  "Nuestro amor es como un río, fluye suave, pero con la fuerza de un torrente que no conoce barreras.",
  "Me perdí en ti, y ahora que estoy en ti, sé que no quiero encontrar el camino de regreso.",
  "Eres mi todo, la razón por la que sonrío sin razón, la luz que ilumina incluso mis días más oscuros."
];

// ... (función 'mod' no cambia) ...
function mod(n, m) {
  return ((n % m) + m) % m;
}

// ... (función 'updateCountdown' no cambia) ...
function updateCountdown() {
  const now = new Date();
  // Usamos getTime() que siempre es UTC, así la resta contra targetDateUTC es correcta
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
    if (title) {
      title.textContent = "¡Ya estás aquí!";
    }
    if (caption) {
      caption.innerHTML =
        "El viaje terminó, pero nuestra historia apenas empieza 💖";
    }

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

// Actualiza la frase y la canción del día usando la fecha de Bogotá
function updateDailyContent() {
  const now = new Date();
  const utcMillis = now.getTime();

  // Ajustamos a la zona horaria de Bogotá (UTC-5)
  const bogotaMillis = utcMillis + BOGOTA_OFFSET_MS;
  const bogotaDayIndex = Math.floor(bogotaMillis / MS_PER_DAY);

  const phraseIndex = mod(bogotaDayIndex, lovePhrases.length);
  const songIndex = mod(bogotaDayIndex, songs.length);

  const phraseEl = document.getElementById("love-phrase");
  const songTitleEl = document.getElementById("song-title");
  
  // CAMBIO AQUÍ: Buscamos la etiqueta de imagen, no el iframe
  const songCoverEl = document.getElementById("song-cover-img");

  if (phraseEl) {
    phraseEl.textContent = lovePhrases[phraseIndex];
  }

  // CAMBIO AQUÍ: Actualizamos la lógica para la imagen
  if (songTitleEl && songCoverEl) {
    const song = songs[songIndex];
    songTitleEl.textContent = song.title;

    // 1. Extraemos el ID del video del enlace 'embedUrl'
    // p.ej. "https://www.youtube.com/embed/H37Hn-aVl-k" -> "H37Hn-aVl-k"
    const videoId = song.embedUrl.split('/').pop();

    // 2. Construimos la URL de la miniatura en alta calidad
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // 3. Asignamos la URL al 'src' de la imagen y el 'alt'
    songCoverEl.src = thumbnailUrl;
    songCoverEl.alt = song.title;
  }
}

// ... (el 'DOMContentLoaded' no cambia) ...
document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  // Actualizar la cuenta regresiva cada segundo
  setInterval(updateCountdown, 1000);

  updateDailyContent();
  // Refrescar frase y canción cada hora por si la página queda abierta
  setInterval(updateDailyContent, MS_PER_HOUR);
});
