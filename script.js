// --- Floating hearts background ---
function createFloatingHearts() {
    const container = document.getElementById('hearts-bg');
    const hearts = ['\u2764', '\u2665', '\u2661', '\uD83D\uDC95', '\uD83D\uDC96'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (12 + Math.random() * 20) + 'px';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(heart);
    }
}
createFloatingHearts();

// --- No button dodge logic ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const noWrapper = document.getElementById('no-btn-wrapper');
const angryPopup = document.getElementById('angry-popup');
const mainImg = document.querySelector('.main-image-container img');
let yesScale = 1;
let imgScale = 1;
let dodgeCount = 0;

const desperateMessages = [
    'Yes!',
    'Please?',
    'Pretty please?',
    'I beg you!!',
    'PLEASE SAY YES',
    'I NEED YOU',
    'DONT DO THIS TO ME',
    'IM ON MY KNEES',
    'I WILL CRY',
    'SAY YES ALREADY!!',
];

function getRandomPosition() {
    const padding = 20;
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - padding;
    const maxY = window.innerHeight - btnRect.height - padding;
    const x = padding + Math.random() * (maxX - padding);
    const y = padding + Math.random() * (maxY - padding);
    return { x, y };
}

function dodgeNoButton() {
    dodgeCount++;

    // Make Yes button bigger and more desperate
    yesScale += 0.15;
    btnYes.style.transform = `scale(${yesScale})`;
    btnYes.style.zIndex = '20';
    const msgIndex = Math.min(dodgeCount, desperateMessages.length) - 1;
    btnYes.textContent = desperateMessages[msgIndex];

    // Zoom into the character's face (center of image)
    imgScale += 0.2;
    mainImg.style.transition = 'transform 0.3s ease';
    mainImg.style.transform = `scale(${imgScale})`;

    // Move No button to a random position
    const pos = getRandomPosition();

    // Make No button fixed position for dodging
    if (noWrapper.style.position !== 'fixed') {
        const rect = noWrapper.getBoundingClientRect();
        noWrapper.style.position = 'fixed';
        noWrapper.style.left = rect.left + 'px';
        noWrapper.style.top = rect.top + 'px';
    }

    noWrapper.style.left = pos.x + 'px';
    noWrapper.style.top = pos.y + 'px';
    noWrapper.style.transition = 'left 0.15s ease, top 0.15s ease';

    // Show angry character
    showAngryPopup();

    // Make the no button smaller after many dodges
    if (dodgeCount > 5) {
        const shrink = Math.max(0.5, 1 - (dodgeCount - 5) * 0.08);
        btnNo.style.transform = `scale(${shrink})`;
    }
}

function showAngryPopup() {
    angryPopup.classList.remove('show');
    // Force reflow to restart animation
    void angryPopup.offsetWidth;
    angryPopup.classList.add('show');

    // Remove class after animation ends
    setTimeout(() => {
        angryPopup.classList.remove('show');
    }, 1000);
}

// Listen for mouse entering the No button area
btnNo.addEventListener('mouseenter', (e) => {
    dodgeNoButton();
});

// Also handle click in case they manage to click it
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    dodgeNoButton();
});

// Touch support for mobile
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeNoButton();
});

// --- Yes button logic ---
function sayYes() {
    document.getElementById('question-screen').style.display = 'none';
    noWrapper.style.display = 'none';
    const yesScreen = document.getElementById('yes-screen');
    yesScreen.style.display = 'flex';

    // Burst hearts
    createHeartBurst();
    // Confetti
    createConfetti();
}

function createHeartBurst() {
    const hearts = ['\u2764\uFE0F', '\uD83D\uDC96', '\uD83D\uDC95', '\uD83D\uDC97', '\uD83D\uDC9E', '\u2763\uFE0F'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'heart-burst';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (20 + Math.random() * 60) + '%';
            heart.style.top = (20 + Math.random() * 60) + '%';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1500);
        }, i * 80);
    }
}

function createConfetti() {
    const colors = ['#ff6b8a', '#ee3a6d', '#ffb6c1', '#ff69b4', '#ff1493', '#ffd700', '#ff4500'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}
