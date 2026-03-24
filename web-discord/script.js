const discordID = "844575808701464617";

// Discord API (Lanyard)
fetch(`https://api.lanyard.rest/v1/users/${discordID}`)
.then(res => res.json())
.then(data => {
    const user = data.data.discord_user;
    const status = data.data.discord_status;
    const activity = data.data.activities[0];

    document.getElementById("username").innerText = user.username;

    document.getElementById("avatar").src =
    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

    const statusDiv = document.getElementById("status");
    statusDiv.innerText = status;
    statusDiv.className = "status " + status;

    if(activity){
        document.getElementById("activity").innerText =
        "Jugando a: " + activity.name;
    } else {
        document.getElementById("activity").innerText =
        "No jugando nada";
    }
});


// ===== MINI JUEGO =====
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {x:180, y:130, size:20};
let enemies = [];

document.addEventListener("keydown", e=>{
    if(e.key==="ArrowUp") player.y-=10;
    if(e.key==="ArrowDown") player.y+=10;
    if(e.key==="ArrowLeft") player.x-=10;
    if(e.key==="ArrowRight") player.x+=10;
});

function spawnEnemy(){
    enemies.push({
        x: Math.random()*380,
        y: 0,
        size: 20
    });
}

function update(){
    ctx.clearRect(0,0,400,300);

    // jugador
    ctx.fillStyle="lime";
    ctx.fillRect(player.x,player.y,player.size,player.size);

    // enemigos
    ctx.fillStyle="red";
    enemies.forEach(e=>{
        e.y+=2;
        ctx.fillRect(e.x,e.y,e.size,e.size);

        if(player.x<e.x+e.size &&
           player.x+player.size>e.x &&
           player.y<e.y+e.size &&
           player.y+player.size>e.y){
            alert("Perdiste");
            enemies=[];
        }
    });

    requestAnimationFrame(update);
}

setInterval(spawnEnemy,1000);
update();
