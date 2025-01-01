const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Definir o canvas para cobrir toda a janela
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

// Função para criar partículas
function createParticle() {
    // As partículas terão cores mais vivas, combinando com a paleta de cores que você forneceu
    const colors = [
      "rgba(255, 69, 0, 1)",    // Vermelho-laranja
      "rgba(255, 140, 0, 1)",   // Laranja
      "rgba(255, 20, 147, 1)",  // Rosa-vibrante
      "rgba(138, 43, 226, 1)",  // Roxo
      "rgba(255, 215, 0, 1)"
    ];
    
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 2, // Aumentando o tamanho das partículas
        color: color,
        alpha: 0,
        speedX: (Math.random() - 0.5) * 0.5, // Velocidade mais lenta
        speedY: (Math.random() - 0.5) * 0.5, 
    };
}

// Atualizar partículas
function updateParticles() {
    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Aparição/desaparecimento gradual
        if (particle.alpha < 1) particle.alpha += 0.02;
        else if (Math.random() > 0.99) particle.alpha -= 0.03;

        // Remover partículas invisíveis
        if (particle.alpha <= 0) particles.splice(index, 1);

        // Recriar caso saia da tela
        if (
            particle.x < 0 ||
            particle.x > canvas.width ||
            particle.y < 0 ||
            particle.y > canvas.height
        ) {
            particles[index] = createParticle();
        }
    });

    // Criar novas partículas
    if (particles.length < 200) particles.push(createParticle());  // Aumentar o número de partículas
}

// Desenhar partículas com efeito de brilho forte
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/0\)/, `${particle.alpha})`);

        // Efeito de brilho intenso
        ctx.shadowBlur = 30;  // Aumentando o blur para maior efeito de brilho
        ctx.shadowColor = particle.color.replace(/0\)/, '0.3)');  // Brilho intenso com uma cor mais suave
        
        ctx.fill();
    });
}

// Loop de animação
function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

// Ajustar tamanho do canvas na redimensionar da janela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Inicializar animação
animate();