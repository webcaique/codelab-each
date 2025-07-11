const listaAlunos = document.getElementById("listaAlunos");
const resetarAlunos = document.getElementById("resetarAlunos");
var alunos;
document.addEventListener('DOMContentLoaded', async() => {
    try{
        const response = await fetch('http://localhost:3000/alunos');

        if (!response.ok) throw new Error("Error ao buscar");

        alunos = await response.json();

        const listaNomes = alunos.map(aluno => aluno.nome);

        const listaMedias = alunos.map(aluno => {
            let media = (aluno.nota1 + aluno.nota2)/2;
            return media.toFixed(1);
        })

        let idCount = 0;

        let html = `<div id="lista">
        <ul>
            <li class="celulaCab" id="celulaCab1">Nome do Aluno
                <ul>
                `;

        listaNomes.forEach(nome => {
            html += `<li class="celula" id="celulaNome${alunos[idCount].id}}">${nome.toUpperCase()}</li>`;
            idCount += 1;
        });

        idCount = 0;

        html += `</ul>
            </li>
            <li class="celulaCab" id="celulaCab2">Média
                <ul>`;
        listaMedias.forEach(media => {
            if(media >= 7){
                html += `<li class="celula" id="celulaMedia${alunos[idCount].id}">${media}</li>`;
            } else {
                html += `<li class="celula" id="celulaMedia${alunos[idCount].id}" style="color: red; font-weight: 700;">${media}</li>`;
            }
            idCount += 1;
        });

        html += `</ul>
            </li>
            <li class="celulaCab" id="celulaCab3">Situação
                <ul>`;

        idCount = 0;

        listaMedias.forEach(media => {
            if(media >= 7){
                html += `<li class="celula" id="celulaSituacao${alunos[idCount].id}">${parseFloat(media) >= 7 ? "Aprovado" : "Reprovado"}</li>`;
            } else {
                html += `<li class="celula" id="celulaSituacao${alunos[idCount].id}" style="color: red; font-weight: 700;">${parseFloat(media) >= 7 ? "Aprovado" : "Reprovado"}</li>`;
            }
            idCount += 1;
        });

        html += `</ul>
            </li>
        </ul>
        </div>`;

        listaAlunos.innerHTML = html;


    } catch (error){
        console.error("Erro: ", error);
    }
});

resetarAlunos.addEventListener('click', async () => {
    let certeza = confirm("Tem certeza?");
    if (certeza) {
        certeza = prompt("Digite 'alunos' para confirmar:");
        if (certeza === "alunos") {
            try {
                for (const data of alunos) {
                    const res = await fetch(`http://localhost:3000/alunos/${data.id}`, {
                        method: 'DELETE'
                    });
                    if (!res.ok) {
                        console.error(`Erro ao deletar aluno com id ${data.id}`);
                    }
                }
                alert("TODOS OS DADOS FORAM DELETADOS!");
                location.reload(); // recarrega a página para atualizar a lista
            } catch (error) {
                console.error("Erro ao deletar alunos:", error);
                alert("Erro ao deletar os dados.");
            }
        }
    }
});

function alternarModoEscuro() {
    document.body.classList.toggle('dark-mode');
  }