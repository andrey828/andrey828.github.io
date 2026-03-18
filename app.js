const modules = [
    { title: "KINETIC_SYNC", lang: "C++" },
    { title: "NEURAL_AURA", lang: "Python" }
];

const container = document.getElementById('moduleContainer');

modules.forEach(m => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `<h3>${m.title}</h3><small>${m.lang}</small>`;
    container.appendChild(card);
});

// Lógica de cursor premium
document.addEventListener('mousemove', e => {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

