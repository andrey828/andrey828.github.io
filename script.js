AOS.init();

document.getElementById('runBtn').addEventListener('click', async () => {
    const code = document.getElementById('editor').value;
    const output = document.getElementById('output');
    
    output.innerHTML = "> Compilando via API Java... <i class='fas fa-spinner fa-spin'></i>";

    // Simulación de fetch al backend (Aquí conectarás con tu Java Spring Boot)
    setTimeout(() => {
        output.innerHTML = `> Iniciando JVM...<br>> Ejecutando bytecode...<br>> 30<br>> [SUCCESS] Process finished with exit code 0`;
    }, 1500);
});
