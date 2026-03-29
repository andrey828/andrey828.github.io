AOS.init({ duration: 800 });

// Generar cuadricula de memoria
const heap = document.getElementById('heapMap');
for(let i = 0; i < 30; i++) {
    const node = document.createElement('div');
    node.className = 'mem-node';
    heap.appendChild(node);
}

document.getElementById('runBtn').addEventListener('click', async () => {
    const consoleOut = document.getElementById('console');
    consoleOut.innerHTML = "<span style='color:#5382a1'>[JS] Dispatching microservices...</span><br>";
    
    const processes = [
        { lang: "JAVA", task: "Spring Boot Context Started. Sandboxing code.", color: "#f89820" },
        { lang: "C++", task: "Native Vector Processing complete.", color: "#00599c" },
        { lang: "C", task: "Memory Pointers Checked. No leaks detected.", color: "#a8b9cc" },
        { lang: "C#", task: ".NET Core Business Rules Applied.", color: "#178600" },
        { lang: "PYTHON", task: "AI Complexity Analysis: O(N).", color: "#3776ab" }
    ];

    for (const p of processes) {
        // Simular uso de recursos
        document.getElementById('cpuBar').style.width = Math.floor(Math.random() * 85 + 10) + "%";
        document.getElementById('threadCount').innerText = Math.floor(Math.random() * 16 + 4) + " ACTIVE";
        document.querySelectorAll('.mem-node').forEach(n => {
            n.style.background = Math.random() > 0.4 ? p.color : '#222';
        });

        consoleOut.innerHTML += `<span style="color:${p.color}">[${p.lang}] ${p.task}</span><br>`;
        consoleOut.scrollTop = consoleOut.scrollHeight;
        await new Promise(r => setTimeout(r, 800));
    }

    // Limpiar al terminar
    consoleOut.innerHTML += "<br><span style='color:#0f6'>[SUCCESS] Ecosistema Políglota ejecutado sin errores.</span>";
    document.getElementById('cpuBar').style.width = "0%";
    document.getElementById('threadCount').innerText = "IDLE";
    document.querySelectorAll('.mem-node').forEach(n => n.style.background = '#222');
});
