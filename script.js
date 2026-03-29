AOS.init();

// Inicializar Mapa de Memoria
const heap = document.getElementById('heapMap');
for(let i=0; i<40; i++) {
    const b = document.createElement('div');
    b.className = 'm-block';
    heap.appendChild(b);
}

document.getElementById('runBtn').addEventListener('click', async () => {
    const term = document.getElementById('console');
    term.innerHTML = "<span style='color:#5382a1'>[JS] Orquestando Microservicios...</span><br>";
    
    // Simulación de ejecución políglota
    const steps = [
        { l: "JAVA", m: "Levantando Spring Boot Core...", c: "#f89820" },
        { l: "C++", m: "Optimizando cálculos de precisión...", c: "#00599c" },
        { l: "C#", m: "Validando integridad en .NET...", c: "#178600" },
        { l: "C", m: "Acceso directo a registros de memoria...", c: "#a8b9cc" },
        { l: "PYTHON", m: "Análisis predictivo de salida (IA)...", c: "#3776ab" }
    ];

    for (const s of steps) {
        document.getElementById('cpuBar').style.width = Math.random() * 90 + "%";
        term.innerHTML += `<span style="color:${s.c}">[${s.l}] ${s.m}</span><br>`;
        document.querySelectorAll('.m-block').forEach(b => b.style.background = Math.random() > 0.5 ? s.c : '#222');
        await new Promise(r => setTimeout(r, 700));
    }

    term.innerHTML += "<br><span style='color:#28a745'>[SUCCESS] Todo el stack respondió al 100%.</span>";
    document.getElementById('cpuBar').style.width = "0%";
});
