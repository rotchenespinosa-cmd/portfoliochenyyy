/* ===================================
   🌈 3D GRADIENT WAVE BACKGROUND
=================================== */
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("particles-js").appendChild(canvas);

let w, h, t = 0;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function drawGradientWaves() {
  t += 0.003;
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#ef31b6ff");
  g.addColorStop(0.5, "#e416b0ff");
  g.addColorStop(1, "#f2268fff");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const waves = 4; // number of wave layers
  for (let j = 0; j < waves; j++) {
    ctx.beginPath();
    for (let i = 0; i <= w; i += 10) {
      const amp = 30 + j * 15;
      const freq = 0.002 + j * 0.001;
      const y = Math.sin(i * freq + t * 2 + j) * amp + h / 2 + j * 30 * Math.sin(t + j);
      ctx.lineTo(i, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + j * 0.1})`;
    ctx.fill();
  }

  requestAnimationFrame(drawGradientWaves);
}
drawGradientWaves();

/* ===================================
   ⌨️ TYPING EFFECT
=================================== */
const texts = ["I'm a Student", "I Love Cats", "I Build Websites"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
const typingElement = document.getElementById("typing");

function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  typingElement.textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500);
  } else {
    setTimeout(type, 100);
  }
}
type();

/* ===================================
   🧭 ACTIVITY VIEW ALL BUTTON
=================================== */
function openActivity(fileName) {
  window.open(fileName, "_blank");
}

const viewAllBtn = document.getElementById('viewAllBtn');
const hiddenCards = document.querySelectorAll('.hidden-card');
let isExpanded = false;

viewAllBtn.addEventListener('click', () => {
  hiddenCards.forEach(card => {
    card.style.display = isExpanded ? 'none' : 'flex';
  });
  viewAllBtn.textContent = isExpanded ? 'View All' : 'Show Less';
  isExpanded = !isExpanded;
});

// Initially hide the extra cards
hiddenCards.forEach(card => card.style.display = 'none');

/* ===================================
    MENU TOGGLE (RESPONSIVE NAV)
=================================== */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Auto-close dropdown after clicking a link
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});


const canva = document.getElementById("neon-cursor");
const ct = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: 0, y: 0 };
let particles = [];

// Resize the canvas when the window resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Track mouse movement and create particles
document.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  createParticles(mouse.x, mouse.y);
});

// Create glowing particles
function createParticles(x, y) {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 3,
      speedY: (Math.random() - 0.5) * 3,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    });
  }
}

// Animate particles
function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.size *= 0.97; // slowly shrink
    if (p.size <= 0.5) {
      particles.splice(i, 1);
      i--;
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = p.color;
    ctx.fill();
  }
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
