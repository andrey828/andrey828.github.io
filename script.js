const DISCORD_ID = "500693951759155201"; 

async function updateMihaiStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await response.json();

        // 1. Cargar tu foto de perfil de Discord
        const avatarImg = document.getElementById('discord-avatar');
        avatarImg.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=512`;

        // 2. Color del anillo de estado
        const statusColors = { online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d' };
        const color = statusColors[data.discord_status] || statusColors.offline;
        
        document.getElementById('status-dot').style.background = color;
        const border = document.getElementById('discord-status-border');
        border.style.borderColor = color;
        border.style.boxShadow = `0 0 20px ${color}`;

        // 3. Frase personalizada
        const customStatus = data.activities.find(a => a.type === 4);
        document.getElementById('discord-custom-status').innerText = customStatus ? `> ${customStatus.state}` : "> xA Developer";

        // 4. Mostrar qué estás jugando
        const game = data.activities.find(a => a.type === 0);
        const gamingCard = document.getElementById('gaming-card');

        if (game) {
            gamingCard.style.display = 'flex';
            document.getElementById('game-name').innerText = game.name;
            document.getElementById('game-details').innerText = game.details || "En partida";
            
            const iconBox = document.getElementById('game-icon-container');
            if (game.assets && game.assets.large_image) {
                const appId = game.application_id;
                let assetId = game.assets.large_image;
                let iconUrl = assetId.startsWith('mp:external') 
                    ? assetId.replace(/mp:external\/.*\/https\//, 'https://')
                    : `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`;
                iconBox.innerHTML = `<img src="${iconUrl}" style="width:60px; height:60px; border-radius:12px;">`;
            } else {
                iconBox.innerHTML = `<div style="width:60px; height:60px; background:var(--cyan); border-radius:12px; display:flex; align-items:center; justify-content:center;">🎮</div>`;
            }
        } else {
            gamingCard.style.display = 'none';
        }

    } catch (error) {
        console.error("Error cargando Discord:", error);
    }
}

updateMihaiStatus();
setInterval(updateMihaiStatus, 15000);
