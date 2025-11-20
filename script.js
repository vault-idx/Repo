const startBtn = document.getElementById('startBtn');
const typewriter = document.getElementById('typewriter');
const subtext = document.getElementById('subtext');
const trollNote = document.getElementById('trollNote');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const lights = document.getElementById('emergencyLights');
const white = document.getElementById('whiteOverlay');
const canvas = document.getElementById('scratchCanvas');
const secret = document.getElementById('secret');

const bgMusic = document.getElementById('bgMusic');
const typeSound = document.getElementById('typeSound');
const siren = document.getElementById('siren');

let attempts = 0;

startBtn.onclick = () => {
    startBtn.remove();
    bgMusic.play();
    typeWriter("Why are you here? Do you want to know what lies behind the darkness?", typewriter, 110, () => {
        typeWriter("If yes then press red. If not then go for green.", subtext, 90, () => {
            document.getElementById('buttons').style.opacity = 1;
        });
    });
};

noBtn.onmouseenter = noBtn.onclick = () => {
    attempts++;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * (innerWidth - 250) + 'px';
    noBtn.style.top = Math.random() * (innerHeight - 180) + 'px';
    noBtn.style.animation = 'vibrate 0.7s';
    yesBtn.classList.add('glow');
    setTimeout(() => yesBtn.classList.remove('glow'), 1200);
    if (attempts >= 6) typeWriter("Maybe the button doesn't want to let you touch it. Try the other one.", trollNote, 100);
};

yesBtn.onclick = () => {
    document.getElementById('buttons').style.opacity = 0;
    typewriter.style.opacity = subtext.style.opacity = trollNote.style.opacity = 0;
    lights.style.opacity = 1;
    siren.play();

    setTimeout(() => {
        lights.style.opacity = 0;
        siren.pause(); siren.currentTime = 0;
        white.style.opacity = 1;
        setTimeout(() => {
            canvas.style.opacity = 1;
            canvas.style.pointerEvents = 'auto';
            secret.style.opacity = 1;
            secret.style.pointerEvents = 'auto';
        }, 8500);
    }, 6000);
};

// Scratch
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.globalCompositeOperation = 'destination-out';

canvas.onmousemove = canvas.ontouchmove = e => {
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, Math.PI*2);
    ctx.fill();
};

// Typewriter with auto-stop sound
function typeWriter(text, el, speed, cb) {
    el.style.opacity = 1;
    el.innerHTML = '';
    let i = 0;
    typeSound.play();
    const int = setInterval(() => {
        if (i < text.length) {
            el.innerHTML += text[i];
            i++;
        } else {
            clearInterval(int);
            typeSound.pause();
            typeSound.currentTime = 0;
            if (cb) cb();
        }
    }, speed);
}

// Copy
document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText('20.11.2001');
    document.getElementById('copyBtn').textContent = 'Copied!';
    setTimeout(() => document.getElementById('copyBtn').textContent = 'Copy', 2000);
};

window.onresize = () => location.reload();
