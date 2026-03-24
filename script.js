const GITHUB_USER = "indrey828"; 
const GITHUB_REPO = "indrey828.github.io";
const DISCORD_ID = "500693951759155201";

const editBtn = document.getElementById('edit-btn');
const tokenInput = document.getElementById('gh-token');
const editableIds = ['edit-name', 'edit-role', 'edit-bio', 'edit-info1', 'edit-info2', 'edit-info3'];

// 1. Lógica del Editor
editBtn.addEventListener('click', async () => {
    const isEditing = editBtn.innerText === "MODO EDITOR";
    
    if (isEditing) {
        editableIds.forEach(id => {
            const el = document.getElementById(id);
            el.contentEditable = true;
            el.style.border = "1px dashed #00f2fe";
        });
        editBtn.innerText = "SUBIR A GITHUB";
        editBtn.style.background = "#2ea44f";
    } else {
        const token = tokenInput.value;
        if (!token.startsWith("ghp_")) return alert("Primero pega tu Token de GitHub en el cuadro de la izquierda.");
        
        editBtn.innerText = "SUBIENDO...";
        editBtn.disabled = true;
        await pushUpdate(token);
    }
});

async function pushUpdate(token) {
    try {
        const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/index.html`;
        
        // Obtener el archivo actual para el SHA
        const res = await fetch(url, { headers: { "Authorization": `token ${token}` } });
        const fileData = await res.json();

        // Limpiar el HTML antes de subirlo
        editableIds.forEach(id => {
            const el = document.getElementById(id);
            el.contentEditable = false;
            el.style.border = "none";
        });

        const updatedContent = document.documentElement.outerHTML;

        const updateRes = await fetch(url, {
            method: "PUT",
            headers: { "Authorization": `token ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                message: "Actualización de perfil (Mihai Web Editor)",
                content: btoa(unescape(encodeURIComponent(updatedContent))),
                sha: fileData.sha
            })
        });

        if (updateRes.ok) {
            alert("✅ ¡Publicado! GitHub tardará unos 30-60 segundos en mostrar los cambios.");
            location.reload();
        } else {
            alert("❌ Error de Token o Permisos. Verifica que tenga permiso 'repo'.");
            editBtn.disabled = false;
            editBtn.innerText = "SUBIR A GITHUB";
        }
    } catch (e) {
        alert("Error de conexión con GitHub.");
        editBtn.disabled = false;
    }
}

// 2. Lógica de Discord (Lanyard)
async function updateStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await response.json();
        
        // Foto
        document.getElementById('discord-avatar').src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=512`;
        
        // Color de estado
        const colors = { online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d' };
        const color = colors[data.discord_status] || '#747f8d';
        document.getElementById('status-dot').style.background = color;
        document.getElementById('discord-status-border').style.borderColor = color;

        // Actividad
        const game = data.activities.find(a => a.type === 0);
        const card = document.getElementById('gaming-card');
        if (game) {
            card.style.display = 'flex';
            document.getElementById('game-name').innerText = game.name;
        } else {
            card.style.display = 'none';
        }
    } catch (e) {}
}
setInterval(updateStatus, 15000);
updateStatus();
