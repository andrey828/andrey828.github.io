AOS.init();

// Inicializar Hilos
const grid = document.getElementById('threadGrid');
for(let i=0; i<32; i++) {
    const node = document.createElement('div');
    node.className = 't-node';
    grid.appendChild(node);
}

document.getElementById('deployBtn').addEventListener('click', async function() {
    const btn = this;
    const term = document.getElementById('hyperConsole');
    const gauge = document.getElementById('gaugeFill');
    
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.innerText = "IGNITING...";

    const steps = [
        { l: "JVM", m: "Initializing Java 21 Virtual Machine...", c: "#f89820", id: "s-java" },
        { l: "NATIVE", m: "C++ Memory Buffers Allocated at 0x7FFF...", c: "#00d2ff", id: "s-cpp" },
        { l: "AI", m: "Python Tensor Engines Loading...", c: "#00ff88", id: "s-py" }
    ];

    for (const step of steps) {
        // Animación Gauge y LEDS
        gauge.style.strokeDashoffset = Math.random() * 100;
        document.getElementById('vValue').innerText = (Math.random() + 1).toFixed(2) + "V";
        
        // Log con efecto máquina de escribir
        term.innerHTML += `<br><span style="color:${step.c}">[${step.l}] ${step.m}</span>`;
        document.getElementById(step.id).querySelector('span').innerText = "SYNCED";
        document.getElementById(step.id).style.color = step.c;

        // Animar hilos
        document.querySelectorAll('.t-node').forEach(n => {
            n.style.background = Math.random() > 0.3 ? step.c : '#111';
            n.style.boxShadow = `0 0 8px ${step.c}`;
        });

        term.scrollTop = term.scrollHeight;
        await new Promise(r => setTimeout(r, 900));
    }

    term.innerHTML += "<br><br><span style='color:white; background: #178600; padding: 2px 10px;'>STACK HEALTH: 100% - OPTIMAL PERFORMANCE</span>";
    btn.innerText = "STACK ACTIVE";
});
