const form = document.getElementById('formCadAluno');
const listaAlunos = document.getElementById("listaAlunos");
let alunos;
let regressao;
function criar_regressão(alunosCalc){
    let n1xn2 = 0;
    let somatoriaNota1 = 0;
    let somatoriaNota2 = 0;
    let somatoriaNota1AoQuadrado = 0;
    let somatoriaAoQuadratoN1 = 0;
    // REGRESSÃO LINEAR: y = ax+b
    let a = 0;
    let b = 0;

    alunosCalc.forEach(aluno => {
        n1xn2 += aluno.nota1*aluno.nota2;
        somatoriaNota1 += aluno.nota1;
        somatoriaNota2 += aluno.nota2;
        somatoriaNota1AoQuadrado += (aluno.nota1) * (aluno.nota1);
    })

    somatoriaAoQuadratoN1 += (somatoriaNota1)*(somatoriaNota1);

    a = ((alunosCalc.length * n1xn2) - (somatoriaNota1*somatoriaNota2))/((alunosCalc.length * somatoriaNota1AoQuadrado) - somatoriaAoQuadratoN1);

    b = (somatoriaNota2 - a *(somatoriaNota1))/ alunosCalc.length;
    return {"a": a, "b": b};
}


document.addEventListener('DOMContentLoaded', async() => {
    try{
        const response = await fetch('http://localhost:3000/alunos');

        if (!response.ok) throw new Error("Error ao buscar");

        alunos = await response.json();

        regressao = criar_regressão(alunos);

    } catch (error){
        console.error("Erro: ", error);
    }
});

function estimar_nota2(n1){
    return ((regressao.a)*n1)+(regressao.b)
}

async function armazenar_info_json(id, nome, n1, n2){
    fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, nome: nome, nota1: parseFloat(n1), nota2: parseFloat(n2)})
      })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar");
        return response.json();
      })
      .then(data => {
        alert(`CADASTRADO: NOME: ${data.nome}, NOTA 1: ${data.nota1}, NOTA 2: ${data.nota2}`);
        form.reset();
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar a pessoa.');
      });
}

let nota1 = document.getElementById('nota1');
let nota2 = document.getElementById('nota2');
let tmp;
nota1.addEventListener('blur', ()=>{
    nota1 = nota1.value;
    if(alunos.length >= 5 & nota2.value == null){
        tmp = estimar_nota2(nota1).toFixed(1);
        nota2.placeholder = `${tmp}`;
    }
});

nota2.addEventListener('dblclick', () => {
    nota2.value = tmp==NaN? "":tmp;
});


form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.toLowerCase(); 
    nota2 = nota2.value;

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

function alternarModoEscuro() {
    document.body.classList.toggle('dark-mode');
  }