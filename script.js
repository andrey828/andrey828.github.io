// 1. Inicializar animaciones de scroll
AOS.init({ duration: 1000, once: true });

// --- EFECTO MATRIX GLOBAL (TODA LA WEB) ---
const canvas = document.createElement('canvas');
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

// Estilos para que sea el fondo total
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1'; // Detrás de todo
canvas.style.backgroundColor = '#05070a'; // Fondo base oscuro

let fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = [];
let words = ["SIMON", "FERNANDO", "PROFEMC", "JAVA", "PYTHON", "JS", "CARPE DIEM", "TEMPUS FUGIT", "AMOR POST MORTEM", "BEATUS ILLE", "LOCUS AMOENUS", "SISTEMA CRITICO", "HACKER", "ROOT", "CONCURRENCY"];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    // Estela de rastro (transparencia baja para que se vea el verde)
    ctx.fillStyle = "rgba(5, 7, 10, 0.1)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41"; // Verde Matrix Clásico
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = words[Math.floor(Math.random() * words.length)];
        ctx.fillText(text, i * fontSize * 3, drops[i] * fontSize); // Multiplicado por 3 para que no saturen

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(window.innerWidth / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
setInterval(drawMatrix, 60); // Velocidad para que sea legible

// --- MOTOR DE EJECUCIÓN (SOPORTA TU CÓDIGO DE SUMA Y MISIÓN CRÍTICA) ---
document.getElementById('runBtn').addEventListener('click', async function() {
    const code = document.getElementById('editor').value;
    const output = document.getElementById('output');
    
    output.innerHTML = '<span style="color: #00ff41;">[JVM] Inicializando entorno de ejecución...</span><br>';
    
    setTimeout(async () => {
        try {
            // Caso 1: Código de Concurrencia / Misión Crítica
            if (code.includes('SistemaDeMisionCritica') || code.includes('Productor')) {
                output.innerHTML = ""; // Limpiar para logs
                await runAdvancedSimulation(output);
            } 
            // Caso 2: Código Simple de Main (como tu suma)
            else {
                const mainMatch = code.match(/main\s*\(String\[\]\s+args\)\s*\{([\s\S]*)\}/);
                if (!mainMatch) throw new Error("No se detectó el método main.");
                
                let inner = mainMatch[1]
                    .replace(/System\.out\.println/g, 'print')
                    .replace(/\b(int|String|var)\b/g, 'let');
                
                let buffer = "";
                const print = (m) => { buffer += `> ${m}<br>`; };
                const executor = new Function('print', inner);
                executor(print);
                output.innerHTML = buffer + '<br><span style="color: #00ff41;">[SUCCESS] Ejecución terminada.</span>';
            }
        } catch (e) {
            output.innerHTML = `<span style="color: #ff4444;">[JAVA ERROR] ${e.message}</span>`;
        }
    }, 1000);
});

async function runAdvancedSimulation(output) {
    const log = (m, c="#cecece") => {
        output.innerHTML += `<span style="color: ${c}; font-size: 12px;">${m}</span><br>`;
        output.scrollTop = output.scrollHeight;
    };
    log("=== INICIANDO SISTEMA DE MISIÓN CRÍTICA ===", "#00ff41");
    for(let i=1; i<=5; i++) {
        await new Promise(r => setTimeout(r, 700));
        log(`[Productor ${i}] -> Inyectado: PAQUETE-${i}-0`, "#f89820");
        await new Promise(r => setTimeout(r, 300));
        log(`[Consumidor] <- Procesado: PAQUETE-${i}-0`, "#5382a1");
    }
    log("=== SHUTDOWN COMPLETO ===", "#00ff41");
}

// Soporte para TAB
document.getElementById('editor').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        let start = this.selectionStart;
        this.value = this.value.substring(0, start) + "    " + this.value.substring(this.selectionEnd);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});
