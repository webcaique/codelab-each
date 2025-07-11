const form = document.getElementById('formCadAluno');

async function coletar_info_json() {
    return fetch('http://localhost:3000/alunos')
            .then(response => {
                if (!response.ok) throw new Error("Erro ao buscar alunos");
                return response.json();
            })
            .catch(error => {
                console.error('Erro:', error);
            });   
}

async function armazenar_info_json(id, nome, n1, n2){
    fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, nome: nome, nota1: n1, nota2: n2})
      })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar");
        return response.json();
      })
      .then(data => {
        alert(`CADASTRADO: NOME: ${data.nome}, NOTA 1:${data.nota1}, NOTA 2 ${data.nota2}`);
        form.reset();
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar a pessoa.');
      });
}

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.toLowerCase(); 
    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;

    let alunos = await coletar_info_json();
    let nomeVerif = true;
    let novoId = 0;
    for(i = 0; i < alunos.length; i++){
        if(alunos[i].nome == nome){
            nomeVerif = false;
        } else {
            if(i > alunos[i].id && i < alunos[i].id){
                novoId = i;
            } else novoId++;
        }
    }
    if(nomeVerif){
        await armazenar_info_json(novoId, nome, nota1, nota2);
    } else {
        alert("NOME JÁ CADASTRADO!");
    }
});