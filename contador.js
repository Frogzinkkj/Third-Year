// contador.js

function updateCounter() {
    const now = new Date();
    const startDate = new Date('2022-01-01T00:00:00');

    const diffInMilliseconds = now - startDate;

    // Calcular anos completos
    const years = now.getFullYear() - startDate.getFullYear();
    const months = now.getMonth() - startDate.getMonth();
    const days = now.getDate() - startDate.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Ajustar a contagem de meses e anos, se necessário
    let adjustedMonths = months;
    let adjustedDays = days;

    if (adjustedMonths < 0) {
        adjustedMonths += 12;
    }

    if (adjustedDays < 0) {
        adjustedDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Ajusta para o número correto de dias no mês anterior
    }

    // Exibir os valores no HTML
    document.getElementById('anos').textContent = years;
    document.getElementById('meses').textContent = adjustedMonths;
    document.getElementById('dias').textContent = adjustedDays;
    document.getElementById('horas').textContent = hours;
    document.getElementById('minutos').textContent = minutes;
    document.getElementById('segundos').textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();
