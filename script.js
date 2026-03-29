// 1. Inicializar animaciones de scroll
AOS.init({ duration: 1000, once: true });

// 2. EL MOTOR DE CONCURRENCIA (JAVA VIRTUAL MACHINE SIMULATOR)
document.getElementById('runBtn').addEventListener('click', async function() {
    const code = document.getElementById('editor').value;
    const output = document.getElementById('output');
    
    output.innerHTML = '<span style="color: #5382a1;">[JVM] Booting Concurrency Engine v2.4...</span><br>';
    output.style.color = "#00ff00";

    // --- SIMULADOR DE LIBRERÍAS JAVA UTIL CONCURRENT ---
    const buffer = [];
    const CAPACIDAD = 5;
    let contadorMensajes = 0;
    let finalizado = 0;
    const TOTAL_TAREAS = 10;

    // Función auxiliar para imprimir con colores de log
    const printLog = (msg, type = 'info') => {
        let color = "#cecece";
        if (type === 'prod') color = "#f89820"; // Naranja Productor
        if (type === 'cons') color = "#5382a1"; // Azul Consumidor
        if (type === 'sys') color = "#28a745";  // Verde Éxito
        output.innerHTML += `<span style="color: ${color}; font-size: 13px;">${msg}</span><br>`;
        output.scrollTop = output.scrollHeight; // Auto-scroll
    };

    // --- MÁQUINA DE ESTADOS ASÍNCRONA ---
    // Simulamos hilos mediante funciones asíncronas paralelas
    const ejecutarProductor = async (id) => {
        for (let i = 0; i < 2; i++) {
            while (buffer.length >= CAPACIDAD) await new Promise(r => setTimeout(r, 100)); // Simula bloqueo put()
            
            const dato = `PAQUETE-${id}-${i}`;
            buffer.push(dato);
            printLog(`[Productor ${id}] -> Inyectado: ${dato} | Buffer: ${buffer.length}/${CAPACIDAD}`, 'prod');
            
            await new Promise(r => setTimeout(r, Math.random() * 800 + 200));
        }
    };

    const ejecutarConsumidor = async () => {
        while (contadorMensajes < TOTAL_TAREAS) {
            while (buffer.length === 0) await new Promise(r => setTimeout(r, 100)); // Simula bloqueo take()
            
            const dato = buffer.shift();
            contadorMensajes++;
            finalizado++;
            printLog(`[Consumidor] <- Procesado: ${dato} (Total: ${contadorMensajes})`, 'cons');
            
            await new Promise(r => setTimeout(r, Math.random() * 1200 + 400));
        }
    };

    // --- ORQUESTADOR (SIMULACIÓN DE EXECUTORSERVICE) ---
    try {
        if (!code.includes('SistemaDeMisionCritica') && !code.includes('concurrent')) {
            throw new Error("El motor requiere una estructura de Misión Crítica o Concurrencia válida.");
        }

        printLog("=== INICIANDO MOTOR DE CONCURRENCIA AVANZADA ===", 'sys');
        
        // Lanzamos el consumidor y los 5 productores en paralelo (Simulando Thread Pool)
        const promesas = [
            ejecutarConsumidor(),
            ejecutarProductor(1),
            ejecutarProductor(2),
            ejecutarProductor(3),
            ejecutarProductor(4),
            ejecutarProductor(5)
        ];

        // Esperamos a que todo termine (Simulando CountDownLatch / await)
        await Promise.all(promesas);

        printLog("=== CIERRE DE SISTEMA LIMPIO (GRACEFUL SHUTDOWN) ===", 'sys');
        printLog("[SUCCESS] Process finished with exit code 0", 'sys');

    } catch (err) {
        output.innerHTML += `<br><span style="color: #ff6b6b;">[JVM CRASH] ${err.message}</span>`;
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
