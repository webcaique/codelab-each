let namePlayer = document.getElementById("namePlayer")
let id_player;
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let namePlayerInit = `player${numeroAleatorio(1, 1000)}`;

fetch('http://localhost:3000/players')
  .then(response => {
    if (!response.ok) throw new Error("Erro ao buscar dados");
    return response.json();
  })
  .then(players => {
    const existe = players.some(p => p.name === namePlayerInit);
    id_player = players.length? players[players.length -1].id + 1 : 0
    if (!existe) {
      fetch('http://localhost:3000/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id_player, name: namePlayerInit })
      })
      .then(response => response.json())
      .then(playerCriado => {
        console.log("Player criado:", playerCriado);
        namePlayer.value = namePlayerInit
      })
      .catch(error => {
        console.error("Erro ao inserir o player:", error);
      });
    } else {
      console.log("Nome já existe:", namePlayerInit);
    }
  })
  .catch(error => {
    console.error("Erro:", error);
  });

namePlayer.addEventListener('keypress', (event)=>{
  if(event.key == "Enter"){
    
  }
})