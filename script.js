// 1. Inicializar animaciones de scroll
AOS.init({ duration: 1000, once: true });

// 2. EL MOTOR DE CONCURRENCIA AVANZADO (HYPER-ENGINE)
document.getElementById('runBtn').addEventListener('click', async function() {
    const code = document.getElementById('editor').value;
    const output = document.getElementById('output');
    
    // Limpieza inicial
    output.innerHTML = '<span style="color: #5382a1;">[JVM] Booting JavaVerse Concurrency Engine...</span><br>';
    output.style.color = "#00ff00";

    // --- VARIABLES DE ESTADO DEL SISTEMA ---
    const buffer = [];
    const CAPACIDAD = 5;
    let contadorTotal = 0;
    const META = 10;

    // Función de log estilizada
    const printLog = (msg, type = 'info') => {
        let color = "#cecece";
        if (type === 'prod') color = "#f89820"; // Naranja Productor
        if (type === 'cons') color = "#5382a1"; // Azul Consumidor
        if (type === 'sys') color = "#28a745";  // Verde Sistema
        output.innerHTML += `<span style="color: ${color}; font-family: monospace; font-size: 12px;">${msg}</span><br>`;
        output.scrollTop = output.scrollHeight;
    };

    // --- SIMULACIÓN DE TRABAJADORES (THREADS) ---
    const workerProductor = async (id) => {
        for (let i = 0; i < 2; i++) {
            // Simulación de buffer.put() bloqueante
            while (buffer.length >= CAPACIDAD) await new Promise(r => setTimeout(r, 100));
            
            const dato = `PAQUETE-${id}-${i}`;
            buffer.push(dato);
            printLog(`[Productor ${id}] -> Inyectado: ${dato} | Buffer: ${buffer.length}/${CAPACIDAD}`, 'prod');
            
            await new Promise(r => setTimeout(r, Math.random() * 1000 + 500));
        }
    };

    const workerConsumidor = async () => {
        while (contadorTotal < META) {
            // Simulación de buffer.take() bloqueante
            while (buffer.length === 0 && contadorTotal < META) await new Promise(r => setTimeout(r, 100));
            
            if (buffer.length > 0) {
                const dato = buffer.shift();
                contadorTotal++;
                printLog(`[Consumidor] <- Procesado: ${dato} (Total: ${contadorTotal})`, 'cons');
            }
            await new Promise(r => setTimeout(r, Math.random() * 1500 + 500));
        }
    };

    // --- ORQUESTADOR ---
    try {
        // Verificación básica de que es el código correcto
        if (!code.includes('SistemaDeMisionCritica')) {
            throw new Error("Estructura de clase no reconocida por el motor de concurrencia.");
        }

        printLog("=== INICIANDO MOTOR DE CONCURRENCIA AVANZADA ===", 'sys');
        
        // Ejecución en paralelo (Simulando ExecutorService)
        const threads = [
            workerConsumidor(),
            workerProductor(1),
            workerProductor(2),
            workerProductor(3),
            workerProductor(4),
            workerProductor(5)
        ];

        await Promise.all(threads);

        printLog("=== CIERRE DE SISTEMA LIMPIO (GRACEFUL SHUTDOWN) ===", 'sys');
        printLog("[SUCCESS] Process finished with exit code 0", 'sys');

    } catch (err) {
        output.innerHTML = `<span style="color: #ff6b6b;">[JVM CRASH] ${err.message}</span><br><span style="color: #94a3b8;">Asegúrate de incluir la clase 'SistemaDeMisionCritica'.</span>`;
    }
});

// Soporte para TAB
document.getElementById('editor').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        let start = this.selectionStart;
        let end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});
