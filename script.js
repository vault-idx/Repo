const startBtn = document.getElementById('startBtn');
const typewriter = document.getElementById('typewriter');
const subtext = document.getElementById('subtext');
const trollNote = document.getElementById('trollNote');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const flash = document.getElementById('emergencyFlash');
const canvas = document.getElementById('mistCanvas');
const secret = document.getElementById('secret');

const bgMusic = document.getElementById('bgMusic');
const typeSound = document.getElementById('typeSound');
const siren = document.getElementById('sirenSound');

let attempts = 0;

// Start
startBtn.onclick = () => {
    startBtn.style.opacity = 0;
    setTimeout(() => startBtn.remove(), 1000);
    bgMusic.volume = 0.7;
    bgMusic.play().catch(()=>{});
    typeWriter("Why are you here? Do you want to know what lies behind the darkness?", typewriter, 110, () => {
        typeWriter("If yes then press red. If not then go for green.", subtext, 90, () => {
            document.getElementById('buttons').style.opacity = 1;
        });
    });
};

// Green button troll
noBtn.onmouseenter = noBtn.onclick = () => {
    attempts++;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * (innerWidth - 200) + 'px';
    noBtn.style.top = Math.random() * (innerHeight - 150) + 'px';
    noBtn.style.animation = 'vibrate 0.6s';
    yesBtn.classList.add('glow');
    setTimeout(() => yesBtn.classList.remove('glow'), 1000);
    if (attempts >= 6) {
        trollNote.innerHTML = '';
        typeWriter("Maybe the button doesn't want to let you touch it. Try the other one.", trollNote, 100);
    }
};

// Red button → Emergency
yesBtn.onclick = () => {
    document.getElementById('buttons').style.opacity = 0;
    typewriter.style.opacity = subtext.style.opacity = trollNote.style.opacity = 0;
    flash.style.opacity = 1;
    siren.volume = 0.9;
    siren.play();

    setTimeout(() => {
        flash.style.opacity = 0;
        startMist();
    }, 6000);
};

// Mist + Scratch
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const smoke = new Image();
smoke.src = 'smokeimage.jpeg';

smoke.onload = () => {
    function startMist() {
        canvas.style.opacity = 1;
        canvas.style.pointerEvents = 'auto';
        let y = canvas.height;
        const move = setInterval(() => {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            y -= 5;
            ctx.drawImage(smoke, 0, y, canvas.width, smoke.height * 2.5);
            if (y <= -smoke.height) {
                clearInterval(move);
                secret.style.opacity = 1;
                secret.style.pointerEvents = 'auto';
            }
        }, 50);
    }
    window.startMist = startMist;
};

// Scratch reveal
canvas.onmousemove = canvas.ontouchmove = e => {
    if (!canvas.style.opacity) return;
    const x = (e.clientX || e.touches[0].clientX);
    const y = (e.clientY || e.touches[0].clientY);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, Math.PI*2);
    ctx.fill();
};

// Typewriter
function typeWriter(text, el, speed, cb) {
    el.style.opacity = 1;
    el.innerHTML = '';
    let i = 0;
    const int = setInterval(() => {
        if (i < text.length) {
            el.innerHTML += text[i];
            typeSound.currentTime = 0;
            typeSound.play().catch(()=>{});
            i++;
        } else {
            clearInterval(int);
            if (cb) cb();
        }
    }, speed);
}

// Copy password
document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText('20.11.2001');
    document.getElementById('copyBtn').textContent = 'Copied!';
    setTimeout(() => document.getElementById('copyBtn').textContent = 'Copy', 2000);
};

window.onresize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};
