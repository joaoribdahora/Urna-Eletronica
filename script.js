let seuVotoPara = document.querySelector('.d_1_1 span'); //Esse comando controla o título da urna
let cargo = document.querySelector('.d_1_2 span'); // Esse comando controla qual o cargo que você estará votando
let descricao = document.querySelector('.d_1_4'); // Esse comando controla a descrição do candidato
let aviso = document.querySelector('.d_2'); // Esse comando controla o aviso da urna
let lateral = document.querySelector('.d_1_right'); // Esse comando comtrola a parte das fotos dos candidatos
let numeros = document.querySelector('.d_1_3'); // Esse comando controla os numeros da urna

// Variáveis de controle de ambiente
let etapaAtual = 0;
let numero = ''; // essa variável vai salvar os numeros que são inseridos
let branco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml ='';
    numero = '';
    branco = false;

    for (let i=0; i<etapa.numeros; i++) {
        if( i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else{
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none'; // Tira o título da urna
    cargo.innerHTML = etapa.titulo; // Coloca o título do array de etapas do outro arquivo .js
    descricao.innerHTML = ''; // Remove toda a descrição
    aviso.style.display = 'none'; // tira todo o aviso
    lateral.innerHTML = ''; // remove a lateral
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];

        seuVotoPara.style.display = 'block'; 
        cargo.innerHTML = etapa.titulo; 
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`; 
        aviso.style.display = 'block';

        let fotosHtml = '';
        for( let i in candidato.fotos){
            fotosHtml += `<div class="d_1_image"> <img src="${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
        }
        lateral.innerHTML = fotosHtml; 
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso_grande pisca"> VOTO NULO </div>';
    }

    
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }
}
function votoBranco() {
    if(numero === ''){
        branco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso_grande pisca"> VOTO EM BRANCO </div>';
        lateral.innerHTML = '';
    } else{
        alert("Para votar em BRANCO você não pode ter digitado nenhum número antes.");
    }

}
function corrige() {
    comecarEtapa();

}
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (branco === true){
        votoConfirmado =  true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado){
        etapaAtual ++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso_enorme pisca"> FIM! </div>';
            console.log(votos);
        }
    }

}

comecarEtapa();