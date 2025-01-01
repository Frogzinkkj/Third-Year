const emojis = ['💖', '🐸', '❓', '🥺','😎','🥳','💞','💘','3️⃣'];  // Emojis para cair
const fallingEmojisContainer = document.querySelector('.falling-emojis');

// Função para criar um emoji caindo
function createFallingEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('falling-emoji');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];  // Seleciona um emoji aleatório

    // Posição horizontal aleatória
    const startPosX = Math.random() * 100;  // Percentual da tela
    emoji.style.left = `${startPosX}%`;

    // Animação de queda
    const fallDuration = Math.random() * 3 + 2;  // Tempo de queda aleatório entre 2 a 5 segundos
    emoji.style.animationDuration = `${fallDuration}s`;

    // Adiciona o emoji ao contêiner
    fallingEmojisContainer.appendChild(emoji);

    // Remove o emoji depois que a animação terminar
    setTimeout(() => {
        emoji.remove();
    }, fallDuration * 1000);
}

// Cria emojis caindo a cada 100ms
setInterval(createFallingEmoji, 100);
