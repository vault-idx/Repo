const startBtn = document.getElementById('startBtn');
const typewriter = document.getElementById('typewriter');
const subtext = document.getElementById('subtext');
const buttons = document.getElementById('buttons');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const emergency = document.getElementById('emergency');
const canvas = document.getElementById('mistCanvas');
const secret = document.getElementById('secret');
const copyBtn = document.getElementById('copyBtn');
const password = document.getElementById('password');

const bgMusic = document.getElementById('bgMusic');
const typeSound = document.getElementById('typeSound');
const emergencySound = document.getElementById('emergencySound');

let noClickCount = 0;
let mistStarted = false;

// Start
startBtn.addEventListener('click', () => {
    startBtn.style.opacity = 0;
    setTimeout(() => startBtn.remove(), 1000);
    bgMusic.play();
    typeWriter("Why are you here? Do you want to know what lies behind the darkness?", typewriter, () => {
        typeWriter("If yes then press red. If not then go for green.", subtext, () => {
            buttons.style.opacity = 1;
        });
    });
});

// Green button troll
noBtn.addEventListener('mouseenter', trollNo);
noBtn.addEventListener('click', () => {
    noClickCount++;
    trollNo();
    if (noClickCount >= 6) {
        typeWriter("Maybe the button doesn't want to let you touch it. Try the other one.", document.createElement('div'), (el) => {
            el.style.position = 'absolute';
            el.style.top = '75%';
            el.style.left = '50%';
            el.style.transform = 'translateX(-50%)';
            document.body.appendChild(el);
        });
    }
});
function trollNo() {
    noBtn.style.position = 'absolute';
    noBtn.style.left = Math.random() * 70 + 10 + '%';
    noBtn.style.top = Math.random() * 60 + 20 + '%';
    noBtn.style.animation = 'vibrate 0.3s';
    yesBtn.classList.add('glow');
    setTimeout(() => yesBtn.classList.remove('glow'), 500);
}

// Red button – real path
yesBtn.addEventListener('click', () => {
    buttons.style.opacity = 0;
    typewriter.style.opacity = 0;
    subtext.style.opacity = 0;
    emergency.style.opacity = 1;
    emergencySound.play();

    setTimeout(() => {
        emergency.style.opacity = 0;
        document.querySelectorAll('div, button').forEach(el => el.style.opacity = 0);
        startMist();
    }, 6000);
});

// Mist effect
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const img = new Image();
img.src = 'smokeimage.jpeg';

img.onload = () => {
    function startMist() {
        mistStarted = true;
        canvas.style.opacity = 1;
        canvas.style.pointerEvents = 'auto';
        let opacity = 0;
        const interval = setInterval(() => {
            opacity += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = opacity;
            ctx.drawImage(img, 0, canvas.height - img.height - (opacity * 300), canvas.width, img.height * 3);
            if (opacity >= 1) {
                clearInterval(interval);
                setTimeout(() => secret.style.opacity = 1, 1000);
                secret.style.pointerEvents = 'auto';
            }
        }, 80);
    }
};

// Scratch reveal
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('touchmove', e => { e.preventDefault(); scratch(e.touches[0]); });
function scratch(e) {
    if (!mistStarted) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
}

// Copy password
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(password.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 2000);
});

// Typewriter function
function typeWriter(text, element, callback) {
    element.style.opacity = 1;
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            typeSound.currentTime = 0;
            typeSound.play();
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback(element);
        }
    }, 80);
}

setTimeout(() => {
    const style = document.createElement('style');
    style.innerHTML = '@keyframes vibrate { 0%,100% {transform:translate(0)} 10%,30%,50%,70%,90% {transform:translate(-10px,0)} 20%,40%,60%,80% {transform:translate(10px,0)} }';
    document.head.appendChild(style);
}, 100);
