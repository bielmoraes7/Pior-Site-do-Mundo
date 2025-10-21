// ===============================
//  O PIOR SITE DO MUNDO - script.js
// ===============================

// Variáveis globais

let nickname; // variável para armazenar o nickname digitado no Stage 4
let stage6Password = ""; // variável que armazena a senha do stage 6
let timerInterval;

// ----------------------

// Botões do rodapé
// ------------------------
document.getElementById('github-btn').addEventListener('click', () => {
  window.open('https://github.com/bielmoraes7', '_blank');
});

document.getElementById('email-btn').addEventListener('click', () => {
  window.location.href = 'mailto:gabrielmoraesdev@outlook.com';
});

// ------------------------
// Função para alternar stages
// ------------------------
function showStage(nextStageNumber) {
  const currentStage = document.querySelector('.stage.active');
  const nextStage = document.querySelector(`.stage[data-stage="${nextStageNumber}"]`);

  if (!nextStage) return;

  currentStage.classList.add('fade-out');

  currentStage.addEventListener('transitionend', () => {
    currentStage.classList.remove('active', 'fade-out');
    currentStage.style.display = 'none';

    nextStage.style.display = 'block';
    setTimeout(() => nextStage.classList.add('active'), 10);
  }, { once: true });
}

// ------------------------
// Botão inicial
// ------------------------
document.getElementById('start-btn').addEventListener('click', () => {
  alert('VOCÊ TEM CERTEZA?');
  showStage(2);
});

// ------------------------
// Botões Next genéricos
// ------------------------
document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const current = document.querySelector('.stage.active');
    const nextNumber = parseInt(current.dataset.stage) + 1;
    showStage(nextNumber);
  });
});

// ------------------------
// Botão Voltar
// ------------------------
document.getElementById('back-btn').addEventListener('click', () => {
  showStage(1);
});

// ------------------------
// Link Continue
// ------------------------
document.getElementById('continue-link').addEventListener('click', () => {
  const currentStage = document.querySelector('.stage.active');
  const nextStage = document.querySelector(`.stage[data-stage="4"]`);

  // Remove fade-out e ativa instantaneamente
  currentStage.classList.remove('active', 'fade-out');
  currentStage.style.display = 'none';

  nextStage.style.display = 'block';
  setTimeout(() => nextStage.classList.add('active'), 10);
});

// ------------------------
// Função de validação do nickname (feedback colorido)
// ------------------------
function validateNickname(nicknameValue) {
  let requirementsMet = 0;

  const hasUpper = /[A-Z]/.test(nicknameValue);
  const hasLower = /[a-z]/.test(nicknameValue);
  const hasNumber = /[0-9]/.test(nicknameValue);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(nicknameValue);

  if(hasUpper) requirementsMet++;
  if(hasLower) requirementsMet++;
  if(hasNumber) requirementsMet++;
  if(hasSpecial) requirementsMet++;

  let message = "";
  let color = "";

  switch(requirementsMet) {
    case 0:
    case 1:
      message = "* Tente algo mais criativo...";
      color = "red";
      break;
    case 2:
      message = "* Quase lá...";
      color = "#E67E22"; // laranja escuro
      break;
    case 3:
      message = "* Quase perfeito!";
      color = "#D4AC0D"; // dourado escuro
      break;
    case 4:
      message = "* Perfeito! Pode prosseguir.";
      color = "green";
      break;
  }

  nicknameMsg.style.color = color;
  return message;
}

// ------------------------
// Stage 4 - Nickname
// ------------------------
const nicknameInput = document.getElementById('nickname-input');
const nicknameMsg = document.getElementById('nickname-msg');
const nicknameBtn = document.getElementById('nickname-btn');

nicknameInput.addEventListener('input', () => {
  nicknameMsg.textContent = validateNickname(nicknameInput.value);
});

// Botão Próximo do Stage 4
nicknameBtn.addEventListener('click', () => {
  const inputValue = nicknameInput.value;

  // -------------------------
  // Validação DEV
  // -------------------------
  if (inputValue === "MORAESDEV") {
    alert("Modo dev ativado! Pulando etapas...");
    showStage(14); // vai direto para Stage 13
    return; // sai da função sem rodar o restante das validações
  }

 // -------------------------
  // Validações normais
  // -------------------------

  const hasUpper = /[A-Z]/.test(inputValue);
  const hasLower = /[a-z]/.test(inputValue);
  const hasNumber = /[0-9]/.test(inputValue);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputValue);

  const requirementsMet = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  if(requirementsMet === 4) {
    nickname = inputValue; // salva nickname
    alert(`Este é o seu nome de usuário: ${nickname}`);

    // Avança para Stage 5
    showStage(5);

    // Aguarda Stage 5 ficar visível para iniciar o timer
    const nextStage = document.querySelector(`.stage[data-stage="5"]`);
    nextStage.addEventListener('transitionend', () => {
      startTimer();
    }, { once: true });

  } else {
    alert("Você ainda não atendeu aos requisitos do nickname!");
  }
});

// ------------------------
// Sons Stage 5
// ------------------------
const victorySound = new Audio('caminho/para/vitoria.mp3');
const defeatSound = new Audio('caminho/para/derrota.mp3');

// ------------------------
// Stage 5 - Timer
// ------------------------
function startTimer() {
  let timeLeft = 7;
  const timerDisplay = document.getElementById('timer');
  if(!timerDisplay) return;

  timerDisplay.textContent = `Tempo restante: ${timeLeft}s`;

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Tempo restante: ${timeLeft}s`;
    if(timeLeft <= 0) {
      clearInterval(timerInterval);
      defeatSound.play();
      alert("Você falhou! Tempo esgotado.");
      location.reload();
    }
  }, 1000);
}

// ------------------------
// Stage 5 - Confirmação do nickname
// ------------------------
const confirmInput = document.getElementById('confirm-nickname-input');
const confirmBtn = document.getElementById('confirm-btn');

confirmBtn.addEventListener('click', () => {
  const entered = confirmInput.value;

  if(entered === nickname) {
    clearInterval(timerInterval);
    victorySound.play();
    alert("Parabéns! Nome confirmado.");
    showStage(6);
  } else {
    clearInterval(timerInterval);
    defeatSound.play();
    alert("Você falhou! Nome incorreto.");
    location.reload();
  }
});

// ===============================
// ===============================
// Stage 6 - Definir Senha
// ===============================

const passInput = document.getElementById('password-input');
const passMsg = document.getElementById('password-msg');
const nextBtn = document.getElementById('password-next-btn');
const showBtn = document.getElementById('show-password-btn');
const successDiv = document.getElementById('password-success');

// Funções auxiliares
const hasLower = s => /[a-z]/.test(s);
const hasUpper = s => /[A-Z]/.test(s);
const hasNumber = s => /\d/.test(s);
const hasSpecial = s => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s);
const hasEmoji = s => /[\u231A-\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD-\u25FE\u2614-\u2615\u2648-\u2653\u267B\u2693\u26A1\u26AA-\u26AB\u26BD-\u26BE\u2702-\u27B0\u2934-\u2935\u2B50\u2B55\u1F004-\u1F9FF]/.test(s);
const hasThree = s => s.includes("3");
const hasChristmas = s => s.includes("25/12") || s.toLowerCase().includes("25-12");
const hasSqrt64 = s => s.includes("8");
const hasCreator = s => /therealmoraes/i.test(s);
const hasRomanGreaterV = s => /(VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)/.test(s);
const hasTwoDigitPrime = s => {
  const nums = s.match(/\d+/g);
  if(!nums) return false;
  return nums.some(n => {
    if(n.length !==2) return false;
    const num = parseInt(n,10);
    for(let i=2;i<=Math.sqrt(num);i++){
      if(num % i === 0) return false;
    }
    return true;
  });
};
const hasMoonPhase = s => /crescente|minguante|decrescente|cheia/i.test(s);

// Soma dos dígitos numéricos (ignorando romanos)
const digitsSumOk = s => {
  const digits = s.match(/\d/g);
  if(!digits) return true;
  const sum = digits.map(d => parseInt(d,10)).reduce((a,b)=>a+b,0);
  return sum <= 60; // <=60 cumpre o requisito
};

// Avaliar todos os requisitos
const evaluateAll = s => [
  hasUpper(s),
  hasLower(s),
  hasNumber(s),
  hasSpecial(s),
  hasEmoji(s),
  hasThree(s),
  hasChristmas(s),
  hasSqrt64(s),
  hasCreator(s),
  hasRomanGreaterV(s),
  hasMoonPhase(s),
  hasTwoDigitPrime(s),
  digitsSumOk(s),
  s.length <=40
];

const reqMessages = [
  "* Inclua pelo menos UMA letra maiúscula",
  "* Inclua pelo menos UMA letra minúscula",
  "* Inclua pelo menos UM número",
  "* Inclua pelo menos UM caractere especial",
  "* Inclua pelo menos UM emoji",
  "* Inclua o número 3",
  "* Inclua a data do Natal",
  "* Inclua o resultado da raiz quadrada de 64",
  "* Inclua o nome do criador do site",
  "* Inclua um numeral romano MAIÚSCULO maior que V",
  "* Inclua uma fase da lua",
  "* Inclua um número primo de 2 dígitos",
  "* A soma dos dígitos não pode exceder 60",
  "* A senha não pode ter mais de 40 caracteres",
];

// Atualizar mensagem
function updateMessages() {
  const pass = passInput.value || "";
  const results = evaluateAll(pass);

  let firstUnmetIndex = results.findIndex(r => !r);

  if(firstUnmetIndex === -1){
    passMsg.textContent = "";
    successDiv.style.display = "block";
    nextBtn.disabled = false;
  } else {
    passMsg.style.color = "#E74C3C";
    passMsg.textContent = reqMessages[firstUnmetIndex];
    successDiv.style.display = "none";
    nextBtn.disabled = true;
  }
}

// Listeners
passInput.addEventListener('input', updateMessages);

// Botão visualizar senha
showBtn.addEventListener('click', () => {
  const originalType = passInput.type;
  passInput.type = "text";
  setTimeout(()=>{
    passInput.type = originalType;
    alert("Sua senha foi comprometida, por segurança, comece de novo!");
    passInput.value = "";
    updateMessages();
  },500);
});

// Botão próximo
nextBtn.addEventListener('click', () => {
  const results = evaluateAll(passInput.value);
  if(results.every(r => r)){
    stage6Password = passInput.value; // salva a senha do Stage 6
    alert("Senha definida com sucesso!");
    showStage(7); // avança para Stage 7
  } else {
    alert("Você precisa cumprir todos os requisitos para prosseguir!");
    passInput.value = "";
    updateMessages();
  }
});

// Inicializar
updateMessages();

// =============================== //

// Stage 7 - Confirmação de Senha
const stage7Input = document.getElementById('confirm-password-input'); // novo input Stage 7
const stage7NextBtn = document.getElementById('confirm-password-next-btn'); // botão próximo Stage 7
const stage7ShowBtn = document.getElementById('show-confirm-pass-btn'); // botão visualizar Stage 7

// Botão visualizar senha Stage 7
stage7ShowBtn.addEventListener('click', () => {
  const originalType = stage7Input.type;
  stage7Input.type = "text";
  setTimeout(() => {
    stage7Input.type = originalType;
    alert("Sua senha foi comprometida, por segurança, comece de novo!");
    stage7Input.value = "";
    showStage(6); // retorna ao Stage 6
    passInput.value = "";
    updateMessages();
  }, 500);
});

// Botão Próximo Stage 7
stage7NextBtn.addEventListener('click', () => {
  if(stage7Input.value === stage6Password){
    alert("Senha confirmada com sucesso!");
    showStage(8); // avança para Stage 8
  } else {
    alert("As senhas não coincidem!");
    stage7Input.value = "";
    showStage(6); // retorna ao Stage 6
    passInput.value = "";
    updateMessages();
  }
});

// ===============================
// Stage 8 - Data de nascimento (corrigido)
// ===============================

const dobInput = document.getElementById('dob-input');
const dobNextBtn = document.getElementById('dob-next-btn');
const circularPicker = document.getElementById('circular-picker');
const pickerPoint = document.getElementById('picker-pointer');

let currentDay = 1;
let currentMonth = 1;
let currentYear = 1980;

const INITIAL_YEAR = 1980; // referência fixa
const MIN_YEAR = 1940;
const MIN_ACCEPTED_YEAR = 1980;

let isDragging = false;
let lastAngle = 0;
let totalRotations = 0;

// controle de decremento ao clicar
let decrementStep = 5;

// ===============================
// Atualiza input
// ===============================
function updateDobInput() {
  dobInput.value = `${String(currentDay).padStart(2,'0')}/${String(currentMonth).padStart(2,'0')}/${currentYear}`;
}

// ===============================
// Posiciona ponteiro
// ===============================
function updatePointerPosition(angleDeg) {
  const radius = circularPicker.offsetWidth / 2 - pickerPoint.offsetWidth / 2;
  const centerX = circularPicker.offsetWidth / 2;
  const centerY = circularPicker.offsetHeight / 2;

  const angleRad = angleDeg * Math.PI / 180;
  pickerPoint.style.left = `${centerX + radius * Math.cos(angleRad) - pickerPoint.offsetWidth / 2}px`;
  pickerPoint.style.top = `${centerY + radius * Math.sin(angleRad) - pickerPoint.offsetHeight / 2}px`;
}

// ===============================
// Abrir seletor
// ===============================
dobInput.addEventListener('click', () => {
  // decrementa 5 anos da referência inicial
  const nextYear = INITIAL_YEAR - decrementStep;
  if(nextYear < MIN_YEAR){
    alert("Você errou várias vezes!");
    location.reload();
    return;
  }
  currentYear = nextYear;
  decrementStep += 5; // próxima vez que clicar, subtrai mais 5

  currentMonth = 1;
  currentDay = 1;
  totalRotations = 0;
  lastAngle = 0;

  circularPicker.style.display = 'block';
  isDragging = false;

  updateDobInput();
  updatePointerPosition(0);
});

// ===============================
// Calcula ângulo do mouse/touch
// ===============================
function getAngle(x, y, rect){
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const dx = x - cx;
  const dy = y - cy;
  let angle = Math.atan2(dy, dx) * (180/Math.PI);
  if(angle < 0) angle += 360;
  return angle;
}

// ===============================
// Drag do ponteiro
// ===============================
pickerPoint.addEventListener('mousedown', () => { isDragging = true; });
pickerPoint.addEventListener('touchstart', e => { isDragging = true; e.preventDefault(); });

function handleDrag(x, y){
  if(!isDragging) return;

  const rect = circularPicker.getBoundingClientRect();
  const angle = getAngle(x, y, rect);

  // calcula delta
  let delta = angle - lastAngle;
  if(delta < -180) delta += 360;
  if(delta > 180) delta -= 360;

  // ===============================
  // total de voltas completas
  // ===============================
  totalRotations += delta / 360; // 1 volta = 1 ciclo completo

  // ===============================
  // cada volta = 31 dias
  // ===============================
  const totalDays = Math.floor(totalRotations * 31);
  currentDay = (totalDays % 31) + 1;
  currentMonth = (Math.floor(totalDays / 31) % 12) + 1;
  currentYear = (INITIAL_YEAR - decrementStep + 5) + Math.floor(totalDays / (31*12));

  if(currentYear < MIN_YEAR){
    alert("Você errou várias vezes!");
    location.reload();
    return;
  }

  updateDobInput();
  updatePointerPosition(angle);
  lastAngle = angle;
}

// ===============================
// Eventos de drag
// ===============================
document.addEventListener('mousemove', e => handleDrag(e.clientX, e.clientY));
document.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  handleDrag(touch.clientX, touch.clientY);
  e.preventDefault();
});

// ===============================
// Soltar ponteiro
// ===============================
document.addEventListener('mouseup', () => {
  isDragging = false;
  circularPicker.style.display = 'none';
});
document.addEventListener('touchend', () => {
  isDragging = false;
  circularPicker.style.display = 'none';
});

// ===============================
// Botão prosseguir
// ===============================
dobNextBtn.addEventListener('click', () => {
  if (currentYear < MIN_ACCEPTED_YEAR) {
    alert("Você está mentindo!");
    return;
  }

  const confirmDate = confirm(`Você realmente nasceu em '${dobInput.value}' ?`);
  if (confirmDate) {
    // 👉 Armazena a data para o Stage 9
    window.userBirthDate = dobInput.value.trim();
    showStage(9);
  } else {
    totalRotations = 0;
    lastAngle = 0;
    currentMonth = 1;
    currentDay = 1;

    updateDobInput();
    circularPicker.style.display = 'block';
    updatePointerPosition(0);
  }
});

// ===============================
// Stage 9 — Confirmação da idade
// ===============================

function calculateAgeFromBirth(dateString) {
  const today = new Date();
  const [day, month, year] = dateString.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const ageInput = document.getElementById("age-input");
const ageNextBtn = document.getElementById("age-next-btn");
let collectedDigits = "";

ageInput.addEventListener("click", () => {
  collectedDigits = "";
  ageInput.value = "";
  let digitCount = 0;

  function askDigit() {
    if (digitCount >= 2) {
      ageInput.value = collectedDigits;
      return;
    }

    const randomNum = Math.floor(Math.random() * 10);
    const confirmDigit = confirm(`O dígito da sua idade é ${randomNum}?`);

    if (confirmDigit) {
      collectedDigits += randomNum;
      digitCount++;
    }

    if (digitCount < 2) {
      askDigit();
    } else {
      ageInput.value = collectedDigits;
    }
  }

  askDigit();
});

ageNextBtn.addEventListener("click", () => {
  if (!ageInput.value || ageInput.value.length < 2) {
    alert("Você precisa confirmar os dois dígitos da sua idade antes de prosseguir!");
    return;
  }

  // Garante que a data foi salva corretamente
  if (!window.userBirthDate) {
    alert("Erro: data de nascimento não foi informada. Retorne e selecione novamente.");
    showStage(8);
    return;
  }

  const idadeUsuario = parseInt(ageInput.value, 10);
  const idadeReal = calculateAgeFromBirth(window.userBirthDate);

  if (isNaN(idadeReal)) {
    alert("Erro ao calcular a idade. Retorne e selecione novamente.");
    showStage(8);
    return;
  }

  if (idadeUsuario !== idadeReal) {
    alert(`A idade (${idadeUsuario}) não corresponde à data de nascimento informada (${window.userBirthDate}).`);
    showStage(8);
  } else {
    alert("Idade confirmada com sucesso!");
    showStage(10);
  }
});

// ========= STAGE 10 =========

const rusticMap = document.getElementById("rustic-map");
const mapMarker = document.getElementById("map-marker");
const countryInput = document.getElementById("country-input");
const countryMsg = document.getElementById("country-msg");
const countryNextBtn = document.getElementById("country-next-btn");

let attemptCount = 0;

const fakeCountries = [
  "Groenlândia",
  "Mongólia",
  "Butão",
  "Samoa",
  "Nauru",
  "Ilhas Fiji",
  "Antártida",
  "Cazaquistão",
  "Sudão do Sul",
  "Nepal",
  "Quirguistão",
  "Boznia",
  "Iugoslávia",
  "Ucrânia",
  "Riversul",
];

rusticMap.addEventListener("click", (event) => {
  const rect = rusticMap.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Move o marcador para o local clicado
  mapMarker.style.left = `${x}px`;
  mapMarker.style.top = `${y}px`;
  mapMarker.style.display = "block";

  attemptCount++;

  // Primeiras 6 tentativas: países errados
  if (attemptCount <= 6) {
    const wrongCountry = fakeCountries[Math.floor(Math.random() * fakeCountries.length)];
    countryInput.value = wrongCountry;
    countryMsg.style.color = "red";

    // Mensagens de troll — você pode adaptar as frases como quiser
   const feedbacks = [
  `Hmmm... isso parece ser ${wrongCountry}, mas tenho minhas dúvidas, ninguém mora ai desde 1813`,
  `Interessante, ${wrongCountry}? Tem certeza que é aí que você mora?`,
  `Acho que você está mentindo... Não me parece que você mora em ${wrongCountry}.`,
  `📍 ${wrongCountry} detectado. Alerta: baixa probabilidade de ser seu país.`,
  `${wrongCountry} — mapa confuso. Tente de novo.`,
  `Ninguém mora em ${wrongCountry}.`
];


    // Usa a mensagem correspondente à tentativa (1..6)
    countryMsg.textContent = feedbacks[Math.min(attemptCount - 1, feedbacks.length - 1)];
    countryNextBtn.disabled = true;

    // Pequena animação de "erro" visual
    rusticMap.style.filter = "sepia(90%) contrast(1.4)";
    setTimeout(() => {
      rusticMap.style.filter = "sepia(80%) contrast(1.2)";
    }, 500);

  } else {
    // 7ª tentativa: Brasil confirmado
    countryInput.value = "Brasil";
    countryMsg.style.color = "#27AE60";
    countryMsg.textContent = "🇧🇷 Brasil confirmado com sucesso!";
    countryNextBtn.disabled = false;

    mapMarker.style.background = "green";
    rusticMap.style.filter = "sepia(60%) contrast(1.1)";

    const confetti = document.createElement("div");
    confetti.textContent = "🎉🎉🎉";
    confetti.style.position = "absolute";
    confetti.style.top = "10px";
    confetti.style.left = "50%";
    confetti.style.transform = "translateX(-50%)";
    confetti.style.fontSize = "24px";
    confetti.style.animation = "floatUp 1.5s ease-out forwards";
    rusticMap.parentElement.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1500);
  }
});


countryNextBtn.addEventListener("click", () => {
  // Primeiro, pergunta se quer compartilhar localização (alert/confirm)
  const confirmLocation = confirm(
    "O site deseja acessar sua localização para preencher seus dados automaticamente."
  );

  if(confirmLocation){
    // Usuário clicou em OK → Stage 11 abre com campos "trollados"
    showStage(11);

    // Preenche os campos de forma ERRADA (trollagem)
    const randomCity = brazilCities[Math.floor(Math.random() * brazilCities.length)];
    cityInput.value = randomCity;
    streetInput.value = "RUA RIVERSUL";
    numberInput.value = "S/N";
    referenceInput.value = "";

    validateStage11Inputs(); // habilita ou não o botão Prosseguir
  } else {
    // Usuário clicou em Cancelar → reinicia o site
    location.reload();
  }
});

// Animação do confete
const style = document.createElement("style");
style.textContent = `
@keyframes floatUp {
  from { opacity: 1; transform: translate(-50%, 0); }
  to { opacity: 0; transform: translate(-50%, -80px); }
}`;
document.head.appendChild(style);


// ===============================
// STAGE 11 — Endereço
// ===============================

const cityInput = document.getElementById("city-input");
const streetInput = document.getElementById("street-input");
const numberInput = document.getElementById("number-input");
const referenceInput = document.getElementById("reference-input");
const referenceMsg = document.getElementById("reference-msg");
const stage11NextBtn = document.getElementById("stage11-next-btn");

// Lista de cidades válidas
const brazilCities = [
  "Abaíra", "Abadia de Goiás", "Abadiânia", "Abaeté", "Abre Campo", "Acaiaca", "Açailândia", "Afonso Cláudio", "Água Azul do Norte", "Água Boa", 
  "Água Doce", "Água Doce do Maranhão", "Água Fria de Goiás", "Água Limpa", "Águas Belas", "Águas de Chapecó", "Águas de Santa Bárbara", "Águas de São Pedro", 
  "Águas Lindas de Goiás", "Águas Mornas", "Aguanil", "Águas Vermelhas", "Agudos", "Agudos do Sul", "Alagoa", "Alagoa Grande", "Alagoa Nova", "Alagoinha", 
  "Alagoinhas", "Alambari", "Alfredo Chaves", "Alfredo Marcondes", "Aliança", "Aliança do Tocantins", "Almas", "Almeirim", "Almenara", "Alpercata", 
  "Alpinópolis", "Alta Floresta", "Alta Floresta d'Oeste", "Altamira", "Altamira do Maranhão", "Altaneira", "Alto Alegre", "Alto Alegre do Maranhão", 
  "Alto Araguaia", "Alto Boa Vista", "Alto Caparaó", "Alto Garças", "Alto Horizonte", "Alto Paraguai", "Alto Piquiri", "Alto Rio Doce", "Alto Santo", 
  "Alto Taquari", "Alvorada", "Alvorada d'Oeste", "Alvorada do Norte", "Alvorada do Sul", "Amaraji", "Amarante", "Amarante do Maranhão", "Américo Brasiliense", 
  "Americana", "Amparo", "Ampére", "Anadia", "Anápolis", "Anastácio", "Anhembi", "Anhumas", "Anicuns", "Aparecida", "Aparecida de Goiânia", "Aparecida do Rio Doce", 
  "Arapiraca", "Arapuá", "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", 
  "Araranguá", "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", 
  "Arapuá", "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba", "Arco-Íris", "Arcos", "Areia", "Areia Branca", "Areial", "Arenápolis", "Arapongas", "Arapoti", "Arapuá", 
  "Araputanga", "Ariquemes", "Araguacema", "Araguaína", "Araguapaz", "Araguari", "Araguatins", "Aral Moreira", "Aracruz", "Araguari", "Araranguá", 
  "Araras", "Arataca", "Aratiba", "Aratuba"]
 


// Preenche o datalist
const datalist = document.getElementById("city-list");
brazilCities.forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  datalist.appendChild(option);
});

// ---------- Validação dos campos ----------
function validateStage11Inputs() {
  const cityValid = brazilCities.includes(cityInput.value);
  const numberValid = numberInput.value.length > 0;
  const referenceValid = referenceInput.value.length > 0;

  stage11NextBtn.disabled = !(cityValid && numberValid && referenceValid);
}

// ---------- Inputs ----------
cityInput.addEventListener("input", validateStage11Inputs);
streetInput.addEventListener("input", validateStage11Inputs);
numberInput.addEventListener("input", () => {
  numberInput.value = numberInput.value.toUpperCase().replace(/[^IVXLCDMS/N]/g,"");
  validateStage11Inputs();
});

// ---------- Ponto de referência ----------
referenceInput.addEventListener("click", () => {
  const questions = [
   "Você está próximo a um castelo?",
  "Você está próximo a uma padaria?",
  "Você está próximo a uma farmácia?",
  "Você está próximo a um lago?",
  "Você está próximo a um supermercado?",
  "Você está próximo a um parque?",
  "Você está próximo a um hospital?",
  "Você está próximo a uma escola?",
  "Você está próximo a um cinema?",
  "Você está próximo a uma estação de trem?",
  "Você está próximo a um aeroporto?",
  "Você está próximo a uma biblioteca?",
  "Você está próximo a um museu?",
  "Você está próximo a uma ponte?",
  "Você está próximo a um shopping?",
  "Você está próximo a um ponto de ônibus?",
  "Você está próximo a um posto de gasolina?",
  "Você está próximo a uma igreja?",
  "Você está próximo a um posto policial?",
  "Você está próximo a um restaurante?"
];

  let confirmed = false;
  while(!confirmed){
    const q = questions[Math.floor(Math.random() * questions.length)];
    confirmed = confirm(q);
  }

  referenceInput.value = "Local confirmado ✅";
  referenceMsg.textContent = "";
  validateStage11Inputs();
});

// Prosseguir Stage 12
stage11NextBtn.addEventListener("click", () => {
  showStage(12);
});

// ========= STAGE 12 =========
const colorInput = document.getElementById("color-input");
const colorMsg = document.getElementById("color-msg");
const stage12NextBtn = document.getElementById("stage12-next-btn");

// Validação do código hexadecimal
function validateColorInput() {
  const value = colorInput.value.trim();
  const hexRegex = /^#[0-9A-Fa-f]{6}$/; // # seguido de 6 dígitos hexadecimais

  if(hexRegex.test(value)) {
    colorMsg.textContent = "";
    stage12NextBtn.disabled = false;
  } else {
    colorMsg.textContent = "Por favor, digite um código hexadecimal válido!";
    stage12NextBtn.disabled = true;
  }
}

// Listener do input
colorInput.addEventListener("input", validateColorInput);

// Botão Prosseguir
stage12NextBtn.addEventListener("click", () => {
  alert(`Cor favorita confirmada: ${colorInput.value}`);
  showStage(13); // avançando para o próximo Stage
});

// ========= STAGE 13 =========
const codeInput = document.getElementById("code-input");
const codeMsg = document.getElementById("code-msg");
const stage13NextBtn = document.getElementById("stage13-next-btn");

// Função para validar o código
function validateCodeInput() {
  const value = codeInput.value.trim();
  const numericOnly = /^[0-9]{4}$/.test(value);

  // Códigos óbvios/repetidos
  const blockedCodes = ["1111","2222","3333","4444","5555","6666","7777","8888","9999","0000",
                        "1234","2345","3456","4567","5678","6789","9876","8765","7654","6543","5432","4321"];
  
  if(!numericOnly) {
    codeMsg.textContent = "O código deve conter apenas 4 números.";
    stage13NextBtn.disabled = true;
    return false;
  }

  if(blockedCodes.includes(value)) {
    codeMsg.textContent = "Código muito óbvio. Tá de sacanagem né? Tente novamente.";
    stage13NextBtn.disabled = true;
    return false;
  }

 // Regra de posição específica
  if(value[0]==="1" || value[1]==="2" || value[2]==="3" || value[3]==="4") {
    codeMsg.textContent = "Código inválido: cada posição tem restrições específicas.";
    stage13NextBtn.disabled = true;
    return false;
  }

  // Soma dos dígitos não pode passar de 20
  const sumDigits = value.split("").map(Number).reduce((a,b)=>a+b,0);
  if(sumDigits > 20) {
    codeMsg.textContent = "A soma dos dígitos não pode exceder 20.";
    stage13NextBtn.disabled = true;
    return false;
  }

  // Código válido
  codeMsg.textContent = "";
  stage13NextBtn.disabled = false;
  return true;
}

// Listener do input
codeInput.addEventListener("input", () => {
  validateCodeInput();
});

// Botão Prosseguir
stage13NextBtn.addEventListener("click", () => {
  if(!validateCodeInput()) return;

  // Alerta de verificação frustrante
  alert("Verificando código...");
  
  // Simula espera de 3 segundos antes de avançar
  setTimeout(() => {
    alert("Código aceito.");
    showStage(14); // Avança para o stage 14
  }, 1000);
});

// ===============================
// Stage 14 - Perguntas de Segurança
// ===============================

const question1Select = document.getElementById("question1-select");
const answer1Input = document.getElementById("answer1-input");

const question2Select = document.getElementById("question2-select");
const answer2Input = document.getElementById("answer2-input");

const question3Select = document.getElementById("question3-select");
const answer3Input = document.getElementById("answer3-input");

const stage14NextBtn = document.getElementById("stage14-next-btn");

// Ativa o botão sempre que houver algo nos inputs
[answer1Input, answer2Input, answer3Input].forEach(input => {
  input.addEventListener("input", () => {
    const allFilled = answer1Input.value.trim() !== "" &&
                      answer2Input.value.trim() !== "" &&
                      answer3Input.value.trim() !== "";
    stage14NextBtn.disabled = !allFilled;
  });
});

// Botão Prosseguir — só aqui fazemos a validação final
stage14NextBtn.addEventListener("click", () => {
  // Valida a terceira pergunta
  const correctDate = "09/11/1989"; // data correta da queda do muro de Berlim
  if(answer3Input.value.trim() !== correctDate){
    alert("Erro de segurança! Data incorreta.");
    location.reload();
    return;
  }

  // Se todos os campos estiverem preenchidos, salva respostas e vai para Stage 15
  window.securityQuestions = [
    { question: question1Select.value, answer: answer1Input.value.trim() },
    { question: question2Select.value, answer: answer2Input.value.trim() },
    { question: question3Select.value, answer: answer3Input.value.trim() },
  ];

  alert("Perguntas de segurança definidas com sucesso!");
  showStage(15);
});

// ========= STAGE 15 =========
const popeSelect = document.getElementById("pope-select");
const popeYearInput = document.getElementById("pope-year-input");
const popeCountryInput = document.getElementById("pope-country-input");
const stage15NextBtn = document.getElementById("stage15-next-btn");
const timerDisplay = document.getElementById("pope-timer");

let popeTimer;
let popeTimeLeft = 20;
let popeLocked = false;

// Dados corretos dos papas
const popeData = {
  "Papa Francisco": { year: "1936", country: "Argentina" },
  "Papa João Paulo II": { year: "1920", country: "Polônia" },
  "Papa Bento XVI": { year: "1927", country: "Alemanha" },
  "Papa João XXIII": { year: "1881", country: "Itália" },
};

// Bloqueia a seleção depois do primeiro clique
popeSelect.addEventListener("change", () => {
  if(popeLocked) return;
  popeLocked = true;
  popeSelect.disabled = true;

  // inicia o timer
  popeTimeLeft = 20;
  timerDisplay.textContent = `Tempo restante: ${popeTimeLeft}s`;
  popeTimer = setInterval(() => {
    popeTimeLeft--;
    timerDisplay.textContent = `Tempo restante: ${popeTimeLeft}s`;
    if(popeTimeLeft <= 0){
      clearInterval(popeTimer);
      alert("Tempo esgotado! Você falhou.");
      location.reload();
    }
  }, 1000);
});

// Botão Prosseguir — valida tudo
stage15NextBtn.addEventListener("click", () => {
  clearInterval(popeTimer);

  const selectedPope = popeSelect.value;
  const enteredYear = popeYearInput.value.trim();
  const enteredCountry = popeCountryInput.value.trim();

  if(!selectedPope){
    alert("Você precisa selecionar um Papa!");
    return;
  }

  const correctData = popeData[selectedPope];
  if(!correctData) {
    alert("Erro crítico! Papa desconhecido.");
    location.reload();
    return;
  }

  if(enteredYear !== correctData.year || enteredCountry.toLowerCase() !== correctData.country.toLowerCase()){
    alert("Dados incorretos! Reiniciando...");
    location.reload();
    return;
  }

  alert("Papa confirmado com sucesso!");
  showStage(16);
});

// Stage 16 - Prato favorito (VS)
const stage16Dishes = [
  { name: "Pizza", img: "https://img.freepik.com/psd-gratuitas/deliciosa-pizza-de-pepperoni-uma-delicia-culinaria_632498-24206.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Sushi", img: "https://djapa.com.br/wp-content/uploads/2024/09/vesoes-do-sushi.jpg" },
  { name: "Hambúrguer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9A5I3P4rt1kftXxVds7cQWs306znK9nrmdA&s" },
  { name: "Lasanha", img: "https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2021/08/22/1759609683-lasanha-de-frango-rose-768x512.jpg" },
  { name: "Neymar Jr", img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRXtQMNQG8HNDGU1mhblj_JeYPwgfmErSZ8c7eFwkPZ-6FDhnZlNkLqF9Ag5iKOqm_LVsIOCx3a8GYTMKovUp6nGY9td-_hOcWndRoyWg/to/barbecue.jpg" },
  { name: "Golpista", img: "https://yt3.googleusercontent.com/fRKW71rW7XGz2DpshwwXAfwQBXS69Y03jKzCv2q8bD8m9sikmMgRpG-jpq5LR2a1f01ooZlSAg=s900-c-k-c0x00ffffff-no-rj" },
  { name: "Vírginia", img: "https://www.estrelando.com.br/uploads/2025/06/10/virginia-destaque-1749562813.jpg" },
  { name: "Bolsonaro", img: "https://www.hrw.org/sites/default/files/styles/embed_xxl/public/media_2021/08/202108Americas_Brazil_bolsonaro_block.jpg?itok=uUmDBCmq" },

];

let currentBattle = [];
let nextRound = [];
let battleStarted = false;

const vsContainer = document.getElementById("vs-container");
const favoriteDishInput = document.getElementById("favorite-dish-input");
const stage16NextBtn = document.getElementById("stage16-next-btn");

// Função para iniciar batalha
function startBattle(dishes) {
  if (dishes.length === 1) {
    favoriteDishInput.value = dishes[0].name;
    stage16NextBtn.disabled = false;
    return;
  }

  currentBattle = [];
  nextRound = [];
  for (let i = 0; i < dishes.length; i += 2) {
    currentBattle.push([dishes[i], dishes[i + 1]]);
  }

  showNextBattle();
}

// Função para mostrar próximo confronto
function showNextBattle() {
  if (currentBattle.length === 0) {
    // Começa próxima rodada
    const winners = nextRound.slice();
    currentBattle = [];
    nextRound = [];
    startBattle(winners);
    return;
  }

  vsContainer.innerHTML = "";

  const battle = currentBattle.shift();
  const left = document.createElement("img");
  left.src = battle[0].img;
  left.alt = battle[0].name;

  const right = document.createElement("img");
  right.src = battle[1].img;
  right.alt = battle[1].name;

  vsContainer.appendChild(left);
  vsContainer.appendChild(right);

  // Clique no prato
  left.addEventListener("click", () => {
    nextRound.push(battle[0]);
    showNextBattle();
  });

  right.addEventListener("click", () => {
    nextRound.push(battle[1]);
    showNextBattle();
  });
}

// Inicia a batalha ao clicar no input
favoriteDishInput.addEventListener("click", () => {
  if (!battleStarted) {
    battleStarted = true;
    startBattle(stage16Dishes);
  }
});

// Botão prosseguir
stage16NextBtn.addEventListener("click", () => {
  showStage(17); // Avança para Stage 17
});

const streamerSelect = document.getElementById("streamer-select");
const stage17NextBtn = document.getElementById("stage17-next-btn");

// Ativa botão só quando selecionar algo
streamerSelect.addEventListener("change", () => {
  stage17NextBtn.disabled = streamerSelect.value === "";
});

// Validação do botão Prosseguir
stage17NextBtn.addEventListener("click", () => {
  const value = streamerSelect.value;

  if(value === "THEREALMORAES") {
    alert("Correto! Prosseguindo...");
    showStage(18); // vai para Stage 18
  } else if(value === "Felipe Neto" || value === "Ninja") {
    alert("pqp...");
    location.reload(); // reinicia o site
  } else {
    alert("Resposta errada");
    streamerSelect.value = "";
    stage17NextBtn.disabled = true;
  }
});

const stage18Select = document.getElementById("language-select");
const stage18NextBtn = document.getElementById("stage18-next-btn");
const stage18Title = document.getElementById("stage18-title");
const stage18Desc = document.getElementById("stage18-desc");
const stage18Label = document.getElementById("stage18-label");

// Função para iniciar o stage 18
function showStage18() {
  showStage(18); // função existente para mostrar stage
  // Atualiza textos para "chinês"
  stage18Title.textContent = "选择您的语言";
  stage18Desc.textContent = "请选择您熟悉的语言：";
  stage18Label.textContent = "语言:";

  // Desabilita botão
  stage18NextBtn.disabled = true;
  stage18NextBtn.classList.remove("enabled");
}

// Listener para seleção de idioma
stage18Select.addEventListener("change", () => {
  const selected = stage18Select.value;

  if (selected === "pt") {
    stage18NextBtn.disabled = false;
    stage18NextBtn.classList.add("enabled");
  } else {
    stage18NextBtn.disabled = true;
    stage18NextBtn.classList.remove("enabled");
  }
});

// Botão Prosseguir
stage18NextBtn.addEventListener("click", () => {
  showStage(19); // avança para o próximo stage
});


// =========================
// Stage 19 - Verificação de Humano adaptado
// =========================

const stage19Questions = [
  "Você é um robô?",                       // resposta: Não
  "Você tem consciência própria?",          // Sim
  "Você consegue piscar com os olhos de verdade agora?", // Sim
  "Você consegue sentir o gosto da comida que não está na sua boca?", // Não
  "Você consegue lembrar do último sonho que teve?",     // Sim
  "Você consegue distinguir entre realidade e imaginação neste momento?", // Sim
  "Você sente cansaço físico ou mental?",   // Sim
  "Você consegue pensar em algo que ninguém mais sabe?", // Sim
  "Você consegue sentir frio ou calor agora?", // Sim
  "Você consegue descrever o cheiro da sua cor favorita?", // Não
  "Você consegue contar até 17 sem usar os dedos?", // Sim
  "Você consegue fazer algo sem pensar conscientemente?", // Não
  "Você consegue sentir arrepio em alguma parte do corpo?", // Sim
  "Você consegue reconhecer sua própria voz gravada?", // Sim
  "Você consegue lembrar o nome da terceira rua que você passou hoje?", // Não
  "Você consegue imaginar uma cor que nunca viu?", // Não
  "Você consegue perceber nuances de emoção nas pessoas à sua volta?", // Sim
  "Você consegue se enganar sozinho conscientemente?", // Não
  "Você consegue mentir sem errar um detalhe?", // Não
  "Você confirma que não é um robô de forma definitiva e irreversível?" // Sim
];

// Define respostas corretas (true = Sim, false = Não)
const stage19Answers = [
  false, true, true, false, true,
  true, true, true, true, false,
  true, false, true, true, false,
  false, true, false, false, true
];

let currentQuestionIndex = 0;
const questionContainer = document.getElementById("question-container");
const yesBtn = document.getElementById("answer-yes-btn");
const noBtn = document.getElementById("answer-no-btn");

// Inicializa a primeira pergunta
function showCurrentQuestion() {
  questionContainer.textContent = stage19Questions[currentQuestionIndex];
}

// Reinicia o site do zero
function restartSite() {
  alert("Resposta errada! O site será reiniciado.");
  location.reload();
}

// Função que processa a resposta do usuário
function processAnswer(userAnswer) {
  const correctAnswer = stage19Answers[currentQuestionIndex];
  if(userAnswer === correctAnswer) {
    currentQuestionIndex++;
    if(currentQuestionIndex >= stage19Questions.length) {
      alert("Parabéns! Verificação concluída.");
      showStage(20); // avança para Stage 20
    } else {
      showCurrentQuestion();
    }
  } else {
    restartSite();
  }
}

// Eventos dos botões
yesBtn.addEventListener("click", () => processAnswer(true));
noBtn.addEventListener("click", () => processAnswer(false));

// Inicializa
showCurrentQuestion();



function showStage20() {
  showStage(20);

  const nome = localStorage.getItem('nome') || 'Não informado';
  const email = localStorage.getItem('email') || 'Não informado';
  const telefone = localStorage.getItem('telefone') || 'Não informado';
  const endereco = localStorage.getItem('endereco') || 'Não informado';

  document.getElementById('resumo-nome').textContent = nome;
  document.getElementById('resumo-email').textContent = email;
  document.getElementById('resumo-telefone').textContent = telefone;
  document.getElementById('resumo-endereco').textContent = endereco;

  const finalizarBtn = document.getElementById('finalizarCadastroBtn');
  finalizarBtn.onclick = () => {
    showStage21(); // mesma lógica dos outros stages
  };
}

function showStage21() {
  // Esconde todos os outros stages
  document.querySelectorAll('[data-stage]').forEach(stage => {
    stage.style.display = 'none';
    stage.classList.add('hidden');
  });

  // Mostra o Stage 21
  const stage21 = document.querySelector('[data-stage="21"]');
  stage21.style.display = 'block';
  stage21.classList.remove('hidden');

  // Seleciona o botão de reiniciar
  const restartBtn = stage21.querySelector('#restartBtn');

  // Remove event listeners antigos
  const newBtn = restartBtn.cloneNode(true);
  restartBtn.parentNode.replaceChild(newBtn, restartBtn);

  // Adiciona o evento de recarregar a página
  newBtn.addEventListener('click', () => {
    alert("O site será reiniciado.");
    location.reload();
  });
}