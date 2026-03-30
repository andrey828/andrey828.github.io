AOS.init();

const igniteBtn = document.getElementById('igniteBtn');
const gui = document.getElementById('guiWrapper');
const launcher = document.getElementById('launcherScreen');

igniteBtn.addEventListener('click', () => {
    launcher.style.opacity = '0';
    setTimeout(() => {
        launcher.style.display = 'none';
        gui.classList.remove('hidden');
    }, 800);
});

function closeGUI() {
    gui.classList.add('hidden');
    setTimeout(() => location.reload(), 500);
}

document.getElementById('syncBtn').addEventListener('click', async function() {
    this.disabled = true;
    const kernels = [
        { id: 'out-java', c: '#ed8b00', msg: ['Compiling Spring Beans...', 'JVM Heap Optimized'] },
        { id: 'out-cpp', c: '#00599c', msg: ['Mapping V-Table...', 'Memory Locked at 0x00FF'] },
        { id: 'out-py', c: '#3776ab', msg: ['Predicting Latency...', 'AI Weights Synced'] },
        { id: 'out-cs', c: '#178600', msg: ['CLR Virtualization ON', 'Business Rules Verified'] }
    ];

    for(let i=0; i<4; i++) {
        for(const k of kernels) {
            const el = document.getElementById(k.id);
            el.innerHTML += `<div style="color:${k.c}"># ${k.msg[Math.floor(Math.random()*k.msg.length)]}</div>`;
            el.scrollTop = el.scrollHeight;
            document.getElementById('globalCpu').innerText = `CPU: ${Math.floor(Math.random()*90 + 5)}%`;
            await new Promise(r => setTimeout(r, 200));
        }
    }
    this.disabled = false;
});
