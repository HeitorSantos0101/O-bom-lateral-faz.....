// Seleção de Elementos do DOM
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const restBtn = document.getElementById('rest-btn');
const timerStatus = document.getElementById('timer-status');

// Variáveis do Cronômetro
let countdown;
let timeInSeconds = 0;
let isRunning = false;
let isResting = false;
const DEFAULT_WORK_TIME = 45; 
const REST_TIME = 30; 

// ------------------------------------
// LÓGICA DO CRONÔMETRO
// ------------------------------------

function timer() {
    timeInSeconds--;
    if (timeInSeconds < 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "00:00";
        // Altera o status
        timerStatus.textContent = isResting ? "💪 HORA DE VOLTAR AO TREINO!" : "✅ SÉRIE CONCLUÍDA! (Pegue o peso/bola)";
        isRunning = false;
        startBtn.innerHTML = '<i class="fas fa-play"></i> INICIAR (45s)';
        
        // Alerta sonoro visual (substitua por um áudio.play() se tiver um arquivo de som)
        alert(timerStatus.textContent); 
        return;
    }
    displayTime(timeInSeconds);
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function startTimer() {
    if (isRunning) {
        clearInterval(countdown);
        startBtn.innerHTML = '<i class="fas fa-play"></i> CONTINUAR';
        timerStatus.textContent = '⏸️ PAUSADO';
        isRunning = false;
        return;
    }

    if (timeInSeconds <= 0) {
        timeInSeconds = DEFAULT_WORK_TIME; 
        isResting = false;
        timerStatus.textContent = `▶️ TREINO: ${DEFAULT_WORK_TIME}s (FOCO!)`;
    } else {
        // Se estiver continuando, apenas atualiza o status
        timerStatus.textContent = isResting ? `DESCANSO: ${timeInSeconds}s restantes` : `TREINO: ${timeInSeconds}s restantes`;
    }

    startBtn.innerHTML = '<i class="fas fa-pause"></i> PAUSAR';
    isRunning = true;
    countdown = setInterval(timer, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    isResting = false;
    timeInSeconds = 0;
    timerDisplay.textContent = "00:00";
    startBtn.innerHTML = '<i class="fas fa-play"></i> INICIAR (45s)';
    timerStatus.textContent = 'Pronto para começar!';
}

function startRest() {
    // Se já estiver correndo, pausa antes de iniciar o descanso
    if(isRunning) clearInterval(countdown);
    
    timeInSeconds = REST_TIME;
    isResting = true;
    isRunning = true;
    startBtn.innerHTML = '<i class="fas fa-pause"></i> PAUSAR';
    timerStatus.textContent = `⏳ DESCANSO RÁPIDO (${REST_TIME}s)`;
    countdown = setInterval(timer, 1000);
}

// Event Listeners do Cronômetro
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
restBtn.addEventListener('click', startRest);

// ------------------------------------
// LÓGICA DAS ABAS (TABS)
// ------------------------------------

function showWeek(weekId, clickedButton) {
    // Esconde todos os conteúdos
    document.querySelectorAll('.week-content').forEach(section => {
        section.classList.add('hidden');
    });

    // Remove a classe 'active' de todos os botões
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Exibe o conteúdo da semana clicada
    document.getElementById(weekId).classList.remove('hidden');

    // Adiciona a classe 'active' ao botão clicado
    clickedButton.classList.add('active');
}

// Inicialização: Exibe a Semana 1 ao carregar
document.addEventListener('DOMContentLoaded', () => {
    // Garante que a Semana 1 esteja visível
    document.getElementById('week1').classList.remove('hidden');
});