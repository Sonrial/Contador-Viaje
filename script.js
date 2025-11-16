// script.js

// Constantes de tiempo
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

// Bogotá es UTC-5 (sin cambios por horario de verano)
const BOGOTA_OFFSET_MS = -5 * MS_PER_HOUR;

// Fecha objetivo: 1 de abril de 2026, 00:00 en Bogotá (equivale a 05:00 UTC)
const targetDateUTC = Date.UTC(2026, 3, 1, 5, 0, 0);

// Canciones de 5 Seconds of Summer para ir rotando cada día
const songs = [
  {
    title: "Youngblood – 5 Seconds of Summer",
    embedUrl: "https://open.spotify.com/embed/track/2iUXsYOEPhVqEBwsqP70rE"
  },
  {
    title: "She Looks So Perfect – 5 Seconds of Summer",
    embedUrl: "https://open.spotify.com/embed/track/1gugDOSMREb34Xo0c1PlxM"
  },
  {
    title: "Amnesia – 5 Seconds of Summer",
    embedUrl: "https://open.spotify.com/embed/track/1JCCdiru7fhstOIF4N7WJC"
  },
  {
    title: "Teeth – 5 Seconds of Summer",
    embedUrl:
      "https://open.spotify.com/embed/track/26wLOs3ZuHJa2Ihhx6QIE6?utm_source=generator"
  },
  {
    title: "Jet Black Heart – 5 Seconds of Summer",
    embedUrl: "https://open.spotify.com/embed/track/1KAkTstWzEOT24VqCDkKdl"
  },
  {
    title: "Want You Back – 5 Seconds of Summer",
    embedUrl: "https://open.spotify.com/embed/track/2vHfabj6nFebekTYODqntl"
  },
  {
    title: "Ghost of You – 5 Seconds of Summer",
    embedUrl: "https://open.spotify.com/embed/track/1MhXdlCQPnO56T57MfmaRm"
  },
  {
    title: "Easier – 5 Seconds of Summer",
    embedUrl: "https://open.spotify.com/embed/track/2bjUEg4jBtKBlPdNrTAppI"
  }
];

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
  "Cuando por fin te abrace, todos estos días van a tener sentido."
];

// Función módulo segura para índices (maneja números negativos)
function mod(n, m) {
  return ((n % m) + m) % m;
}

// Actualiza la cuenta regresiva
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
  const spotifyIframe = document.getElementById("spotify-iframe");

  if (phraseEl) {
    phraseEl.textContent = lovePhrases[phraseIndex];
  }

  if (songTitleEl && spotifyIframe) {
    const song = songs[songIndex];
    songTitleEl.textContent = song.title;
    spotifyIframe.src = song.embedUrl;
  }
}

// Inicializa todo cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  // Actualizar la cuenta regresiva cada segundo
  setInterval(updateCountdown, 1000);

  updateDailyContent();
  // Refrescar frase y canción cada hora por si la página queda abierta
  setInterval(updateDailyContent, MS_PER_HOUR);
});
