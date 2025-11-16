// script.js

// ... (constantes de tiempo no cambian) ...
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

// Bogotá es UTC-5 (sin cambios por horario de verano)
const BOGOTA_OFFSET_MS = -5 * MS_PER_HOUR;

// ... (fecha objetivo no cambia) ...
const targetDateUTC = Date.UTC(2026, 3, 1, 5, 0, 0);

// CAMBIO AQUÍ: Actualizada la lista con URLs de YouTube
const songs = [
  {
    title: "Eres Tú – Luis Fonsi",
    embedUrl: "https://www.youtube.com/embed/j-p9-v2-piM"
  },
  {
    title: "All of Me – John Legend",
    embedUrl: "https://www.youtube.com/embed/450p7goxZem"
  },
  {
    title: "Amarillo – Shakira",
    embedUrl: "https://www.youtube.com/embed/GUP-sA-sS2Q"
  },
  {
    title: "Fix You – Coldplay",
    embedUrl: "https://www.youtube.com/embed/k4V3Mo_OiMs"
  },
  {
    title: "Make You Feel My Love – Adele",
    embedUrl: "https://www.youtube.com/embed/0put0_a--Ng"
  },
  {
    title: "Something – The Beatles",
    embedUrl: "https://www.youtube.com/embed/UelDrZ1aFeY"
  },
  {
    title: "I'm Yours – Jason Mraz",
    embedUrl: "https://www.youtube.com/embed/EkHTsc9PU2A"
  },
  {
    title: "We Found Love – Rihanna",
    embedUrl: "https://www.youtube.com/embed/tg00YEETFzg"
  },
  {
    title: "Stand By Me – Ben E. King",
    embedUrl: "https://www.youtube.com/embed/hwZNL7QVJjE"
  },
  {
    title: "The Way You Look Tonight – Frank Sinatra",
    embedUrl: "https://www.youtube.com/embed/h9M8N-mQh3I"
  },
  {
    title: "Para Tu Amor – Juanes",
    embedUrl: "https://www.youtube.com/embed/sglv-sftG1I"
  },
  {
    title: "Stay With Me – Sam Smith",
    embedUrl: "https://www.youtube.com/embed/pB-5XG-DbAA"
  },
  {
    title: "If I Ain't Got You – Alicia Keys",
    embedUrl: "https://www.youtube.com/embed/Ju8Hr50ZN-k"
  },
  {
    title: "Can't Help Falling In Love – Elvis Presley",
    embedUrl: "https://www.youtube.com/embed/vYCh7aL7_E4"
  },
  {
    title: "Youngblood – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/watch?v=-RJSbO8UZVY"
  },
  {
    title: "She Looks So Perfect – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/X2q3uspE2M0"
  },
  {
    title: "Amnesia – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/N-MgRkSgGLE"
  },
  {
    title: "Teeth – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/R1nL-hF12tE"
  },
  {
    title: "Jet Black Heart – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/K0X5A6a_jQQ"
  },
  {
    title: "Want You Back – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/P-A-n5-GvXU"
  },
  {
    title: "Ghost of You – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/xNf-0p6ZJqU"
  },
  {
    title: "Easier – 5 Seconds of Summer",
    embedUrl: "https://www.youtube.com/embed/b1d5I2s_a_A"
  }
];

// ... (frases de amor no cambian) ...
// Frases de amor que cambian cada 24 horas (autoría original)
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

// ... (función mod no cambia) ...
function mod(n, m) {
  return ((n % m) + m) % m;
}

// ... (función updateCountdown no cambia) ...
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
  // CAMBIO AQUÍ: Se busca el nuevo ID
  const musicIframe = document.getElementById("music-iframe");

  if (phraseEl) {
    phraseEl.textContent = lovePhrases[phraseIndex];
  }

  // CAMBIO AQUÍ: Se comprueba y usa la nueva variable 'musicIframe'
  if (songTitleEl && musicIframe) {
    const song = songs[songIndex];
    songTitleEl.textContent = song.title;
    musicIframe.src = song.embedUrl;
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
