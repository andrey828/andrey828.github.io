AOS.init();

// Inicializar nodos de memoria
const heap = document.getElementById('heapMap');
for(let i=0; i<45; i++) {
    const node = document.createElement('div');
    node.className = 'm-node';
    heap.appendChild(node);
}

document.getElementById('runBtn').addEventListener('click', async () => {
    const term = document.getElementById('console');
    const runBtn = document.getElementById('runBtn');
    
    runBtn.disabled = true;
    term.innerHTML = "<span style='color:#5382a1'>[SYSTEM] Iniciando Orquestador Políglota...</span><br>";
    
    const stack = [
        { l: "JAVA", m: "Spring Boot Core: Desplegando API Rest...", c: "#f89820" },
        { l: "C++", m: "Native Engine: Optimizando punteros de memoria...", c: "#00599c" },
        { l: "C", m: "Kernel Module: Verificando integridad de hardware...", c: "#a8b9cc" },
        { l: "C#", m: ".NET Service: Cargando lógica empresarial...", c: "#178600" },
        { l: "PYTHON", m: "AI Agent: Analizando patrones de ejecución...", c: "#3776ab" }
    ];

    for (const step of stack) {
        // Animación de CPU y Memoria
        const load = Math.floor(Math.random() * 80 + 20);
        document.getElementById('cpuBar').style.width = load + "%";
        document.getElementById('cpuVal').innerText = load + "%";
        document.getElementById('threadStatus').innerText = Math.floor(Math.random()*24 + 8) + " HILOS";
        
        // Log en consola
        term.innerHTML += `<span style="color:${step.c}">[${step.l}] ${step.m}</span><br>`;
        term.scrollTop = term.scrollHeight;

        // Efecto visual en la rejilla de memoria
        document.querySelectorAll('.m-node').forEach(n => {
            if(Math.random() > 0.5) n.style.background = step.c;
        });

        await new Promise(r => setTimeout(r, 800));
    }

    term.innerHTML += "<br><span style='color:#0f6'>[SUCCESS] Todo el ecosistema políglota está ONLINE.</span>";
    runBtn.disabled = false;
    document.getElementById('cpuBar').style.width = "5%";
    document.getElementById('cpuVal').innerText = "5%";
});
