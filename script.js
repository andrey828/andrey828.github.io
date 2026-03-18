// 1. GESTIÓN DEL CURSOR
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');

document.addEventListener('mousemove', (e) => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
});

// 2. MÓDULOS DEL ARSENAL
const mods = [
    { title: "KINETIC_SYNC", desc: "Aura avanzada con rotaciones silenciosas y bypass de anticheat." },
    { title: "AUTO_TOTEM", desc: "Equipación instantánea de totems detectando slots libres en 0ms." },
    { title: "VOID_FLY", desc: "Vuelo basado en desincronización de paquetes de posición." },
    { title: "PACKET_REACH", desc: "Extiende el alcance de ataque hasta 4.2 bloques mediante exploits." },
    { title: "CRYSTAL_OP", desc: "Optimizador de colocación de cristales para daño explosivo máximo." },
    { title: "VELOCITY_X", desc: "Anulación total de retroceso horizontal y reducción de vertical." }
];

const grid = document.getElementById('mod-grid');
mods.forEach(m => {
    grid.innerHTML += `
        <div class="mod-card">
            <h3>${m.title}</h3>
            <p>${m.desc}</p>
        </div>
    `;
});

// 3. ANIMACIÓN DE NÚMEROS (STATS)
const stats = document.querySelectorAll('.stat-n');
stats.forEach(s => {
    const target = +s.getAttribute('data-target');
    const suffix = s.getAttribute('data-suffix') || "";
    let count = 0;
    const speed = 2000 / target;

    const updateCount = () => {
        if(count < target) {
            count++;
            s.innerText = count + suffix;
            setTimeout(updateCount, speed);
        } else {
            s.innerText = target + suffix;
        }
    }
    updateCount();
});

// 4. FUNCIÓN DE DESCARGA
function triggerDownload() {
    alert("Iniciando descarga segura de xA_Addon_v2.0.4.jar...");
}
