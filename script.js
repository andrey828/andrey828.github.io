// Fondo de partículas tácticas
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vX = (Math.random() - 0.5) * 0.5;
        this.vY = (Math.random() - 0.5) * 0.5;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 255, 200, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.x += this.vX;
        this.y += this.vY;
        if(this.x < 0 || this.x > canvas.width) this.vX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.vY *= -1;
    }
}

for(let i=0; i<100; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// Cargar módulos
const modules = [
    { name: "KINETIC_SYNC", core: "C++", desc: "Packet manipulation core." },
    { name: "NEURAL_AURA", core: "Python", desc: "AI-driven entity tracking." },
    { name: "VOID_MOVE", core: "ASM", desc: "No-clip memory injection." }
];

const grid = document.getElementById('grid');
modules.forEach(m => {
    grid.innerHTML += `
        <div class="card">
            <h3 style="color:var(--c)">${m.name}</h3>
            <p style="font-size: 0.8rem; opacity: 0.5; margin: 10px 0;">CORE: ${m.core}</p>
            <p>${m.desc}</p>
        </div>
    `;
});

