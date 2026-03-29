AOS.init();

// Visualizador de memoria
const heap = document.getElementById('heapMap');
for(let i=0; i<45; i++) {
    const node = document.createElement('div');
    node.className = 'm-node';
    heap.appendChild(node);
}

function handleAuth(type) {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('authMsg');

    if(user.length > 3 && pass.length > 5) {
        msg.style.color = "#0f6";
        msg.innerText = type === 'login' ? "Acceso Concedido..." : "Usuario Registrado con Éxito.";
        
        setTimeout(() => {
            document.getElementById('authOverlay').style.opacity = "0";
            setTimeout(() => {
                document.getElementById('authOverlay').style.display = "none";
                document.getElementById('mainApp').classList.remove('blur');
                document.getElementById('userTag').innerHTML = `<i class="fas fa-user-check"></i> ${user.toUpperCase()}`;
                document.getElementById('console').innerText = "> Sesión iniciada. Núcleo listo.";
            }, 600);
        }, 1000);
    } else {
        msg.style.color = "#ff4444";
        msg.innerText = "Error: Usuario > 3, Contraseña > 5";
    }
}

document.getElementById('runBtn').addEventListener('click', async () => {
    const term = document.getElementById('console');
    term.innerHTML = "<span style='color:#5382a1'>[JS] Iniciando Orquestador Políglota...</span><br>";
    
    const stack = [
        { l: "JAVA", m: "Cifrando sesión con BCrypt en Spring Security...", c: "#f89820" },
        { l: "C++", m: "Ejecutando algoritmos de optimización nativa...", c: "#00599c" },
        { l: "C#", m: "Validando reglas de negocio corporativas...", c: "#178600" },
        { l: "PYTHON", m: "Analizando patrones de seguridad con IA...", c: "#3776ab" }
    ];

    for (const step of stack) {
        document.getElementById('cpuBar').style.width = Math.random() * 90 + "%";
        document.getElementById('threadStatus').innerText = Math.floor(Math.random()*20) + " ACTIVE";
        term.innerHTML += `<span style="color:${step.c}">[${step.l}] ${step.m}</span><br>`;
        document.querySelectorAll('.m-node').forEach(n => n.style.background = Math.random() > 0.4 ? step.c : '#222');
        await new Promise(r => setTimeout(r, 700));
    }
    term.innerHTML += "<br><span style='color:#0f6'>[SUCCESS] Todo el stack respondió satisfactoriamente.</span>";
});
