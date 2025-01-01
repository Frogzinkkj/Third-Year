const musicList = [
    { name: 'Donatto, Lauana Prado - Confia Em Mim.', src: "Asstss/music/DONATTO, Lauana Prado - Confia Em Mim.mp3" },
    { name: "Giveon - if i ain't got you", src: "Asstss/music/giveon - if i ain't got you. .mp3" },
    { name: 'Gamadinho à Vontade - Instinto', src: "Asstss/music/Gamadinho à Vontade - Instinto.mp3" },
    { name: "Bon Jovi - Livin' On A Prayer", src: "Asstss/music/Bon Jovi - Livin' On A Prayer.mp3" },
    { name: 'ÀVUÀ - Comum _ A COLORS SHOW', src: "Asstss/music/ÀVUÀ - Comum _ A COLORS SHOW.mp3" },
    { name: 'Jaymes Young - Infinity', src: "Asstss/music/Jaymes Young - Infinity [Official Audio].mp3" },
    { name: 'Além do Tempo (Your Name) JRP ft. @amandaareia', src: "Asstss/music/Além do Tempo _ Taki e Mitsuha (Your Name) _ JRP ft. @amandaareia.mp3" },
];

let currentTrackIndex = 0;
const audio = new Audio(musicList[currentTrackIndex].src);
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const trackName = document.getElementById('track-name');

let isPlaying = true;

window.addEventListener('load', () => {
    audio.play();
    playPauseButton.innerHTML = '<img src="Asstss/stop_24dp_FFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Pause">';
    trackName.textContent = musicList[currentTrackIndex].name;
});

// Carregar a primeira música automaticamente
loadTrack(currentTrack);

// Adicionar evento de clique para iniciar a reprodução quando o usuário interagir com a página
document.addEventListener('click', () => {
  audio.play().catch(error => {
    console.log("Autoplay foi bloqueado pelo navegador.", error);
  });
}, { once: true });

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '<img src="Asstss/play_arrow_24dp_FFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Play">';
    } else {
        audio.play();
        playPauseButton.innerHTML = '<img src="Asstss/stop_24dp_FFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Pause">';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

    currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationSpan.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + musicList.length) % musicList.length;
    audio.src = musicList[currentTrackIndex].src;
    trackName.textContent = musicList[currentTrackIndex].name;
    if (isPlaying) {
        audio.play();
    }
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
    audio.src = musicList[currentTrackIndex].src;
    trackName.textContent = musicList[currentTrackIndex].name;
    if (isPlaying) {
        audio.play();
    }
});