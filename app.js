let numerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  ResponsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function mensagemInicial() {
  exibirTexto("h1", "Jogo do número Secreto");
  exibirTexto("p", "Escolha um número entre 01 e 10");
}

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    exibirTexto("h1", "Acertou!");

    let palavraTentiva = tentativas > 1 ? "tentativas" : "tentiva";
    let mensagemTentivas = `Parabens, descobriu o numero secreto em ${tentativas} ${palavraTentiva}`;

    exibirTexto("p", mensagemTentivas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTexto("p", "O numero secreto é menor");
    } else {
      exibirTexto("p", "O numero secreto é maior");
    }
    limparCampo();
    tentativas++;
  }
}

function gerarNumero() {
  let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
  let quantidadeNaLista = numerosSorteados.length;

  if (quantidadeNaLista == numeroMaximo) {
    numerosSorteados = [];
  }
  if (numerosSorteados.includes(numeroEscolhido)) {
    return gerarNumero();
  } else {
    numerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumero();
  limparCampo();
  tentativas = 1;
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

mensagemInicial();
