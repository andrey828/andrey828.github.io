// 1. Inicializar animaciones de scroll (AOS)
AOS.init({ duration: 1000, once: true });

// 2. Lógica del Motor de Ejecución Real
document.getElementById('runBtn').addEventListener('click', function() {
    const code = document.getElementById('editor').value;
    const output = document.getElementById('output');
    
    output.innerHTML = '<span style="color: #5382a1;">[JVM] Cargando Bytecode...</span>';
    output.style.color = "#00ff00";

    setTimeout(() => {
        try {
            // --- EL TRUCO DE MAGIA ---
            // 1. Extraemos todo lo que esté dentro del método main { ... }
            const mainContentMatch = code.match(/public\s+static\s+void\s+main\s*\(String\[\]\s+args\)\s*\{([\s\S]*)\}\s*\}/);
            
            if (!mainContentMatch) {
                throw new Error("No se encontró el método 'public static void main(String[] args)'");
            }

            let javaCode = mainContentMatch[1];

            // 2. Traducimos sintaxis Java básica a JavaScript ejecutable
            // Convertimos System.out.println -> console.log temporalmente
            let jsExecutable = javaCode
                .replace(/System\.out\.println\s*\(/g, 'logOutput(')
                .replace(/int\s+/g, 'let ')
                .replace(/String\s+/g, 'let ')
                .replace(/double\s+/g, 'let ')
                .replace(/boolean\s+/g, 'let ');

            // 3. Creamos un buffer para capturar la salida
            let buffer = "";
            const logOutput = (msg) => { buffer += "> " + msg + "<br>"; };

            // 4. EJECUCIÓN REAL del código transformado
            // Usamos New Function para aislar la ejecución
            const runtime = new Function('logOutput', jsExecutable);
            runtime(logOutput);

            // 5. Mostrar el resultado real
            output.innerHTML = buffer + '<br><span style="color: #28a745;">[SUCCESS] Execution finished.</span>';

        } catch (err) {
            output.innerHTML = `<span style="color: #ff6b6b;">[JAVA ERROR] ${err.message}</span>`;
        }
    }, 1000);
});

// Permitir Tabulaciones
document.getElementById('editor').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});
