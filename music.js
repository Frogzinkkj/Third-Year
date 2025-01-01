// script.js
const audio = document.getElementById("audio-player");
const prevBtn = document.getElementById("prev-btn");
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const playlist = document.querySelectorAll("#playlist li");
const currentSong = document.getElementById("current-song");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
let currentTrack = 0;

function loadTrack(index) {
  const track = playlist[index];
  if (track) {
    audio.src = track.getAttribute("data-src");
    currentSong.textContent = track.textContent;
    audio.load();
    audio.play();
    pauseBtn.textContent = "Pause"; // Atualiza o texto do botão para "Pause"
  }
}

function updateProgress() {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener("timeupdate", updateProgress);

progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
  currentTime.textContent = formatTime(audio.currentTime); // Atualiza o tempo atual imediatamente
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
});

pauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    pauseBtn.textContent = "Pause"; // Atualiza o texto do botão para "Pause"
  } else {
    audio.pause();
    pauseBtn.textContent = "Play"; // Atualiza o texto do botão para "Play"
  }
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});

// Carregar a primeira música automaticamente
loadTrack(currentTrack);

// Adicionar evento de clique para iniciar a reprodução quando o usuário interagir com a página
document.addEventListener('click', () => {
  audio.play().catch(error => {
    console.log("Autoplay foi bloqueado pelo navegador.", error);
  });
}, { once: true });
