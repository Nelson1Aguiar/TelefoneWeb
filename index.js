var numero = "";
const num0 = document.getElementById("0");
const num1 = document.getElementById("1");
const num2 = document.getElementById("2");
const num3 = document.getElementById("3");
const num4 = document.getElementById("4");
const num5 = document.getElementById("5");
const num6 = document.getElementById("6");
const num7 = document.getElementById("7");
const num8 = document.getElementById("8");
const num9 = document.getElementById("9");
const numAsterisco = document.getElementById("numAsterisco");
const numHash = document.getElementById("numHash");
const ligar = document.getElementById("ligar");
const apagar = document.getElementById("apagar");
const textoNum = document.getElementById("numero");
const menu = document.getElementById("Menu");
const addCtt = document.getElementById("addCtt");
const ListarCtt = document.getElementById("ListarCtt");
const apagarCtt = document.getElementById("apagarCtt");
const attCtt = document.getElementById("attCtt");
const screenWidth = window.innerWidth;
const teclado = document.getElementById("Teclado");

class Contato {
    constructor(nome, numero, email, id) {
        this.nomeContato = nome;
        this.numeroContato = numero;
        this.emailContato = email;
        this.id = id;
    }

    get nome() {
        return this.nomeContato;
    }

    set nome(Nome) {
        this.nomeContato = Nome;
    }
    get numero() {
        return this.numeroContato;
    }

    set numero(Numero) {
        this.numeroContato = Numero;
    }

    get email() {
        return this.emailContato;
    }

    set email(Email) {
        this.emailContato = Email;
    }
}

var listaContatos = [];

addCtt.addEventListener("click", function () {
    menu.style.display = "none";

    var AdicionarContatos = document.createElement("div");
    AdicionarContatos.classList.add("NovoMenu");

    var divContainerInput = document.createElement("div");
    divContainerInput.style.display = "flex";
    divContainerInput.style.flexDirection = "column";
    divContainerInput.style.width = "100%";
    divContainerInput.style.alignItems = "center";
    divContainerInput.style.justifyContent = "center";

    var ContainerCampos = document.createElement("div");
    ContainerCampos.classList.add("ElementosCriarCtt");

    var iconePessoa = document.createElement("img");
    iconePessoa.src = "image\\iconesMenu\\perfil.png";

    if (screenWidth <= 768) {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "30%");
        iconePessoa.style.width = "20%";
    }
    else {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "60%");
        iconePessoa.style.width = "30%";
    }

    var criarNome = document.createElement("input");
    criarNome.type = "text";
    criarNome.placeholder = "Digite o nome";

    var criarNumero = document.createElement("input");
    criarNumero.type = "number";
    criarNumero.placeholder = "Digite o número";

    var criarEmail = document.createElement("input");
    criarEmail.type = "text";
    criarEmail.placeholder = "Digite o e-mail (opcional)";

    var salvarNovoContato = document.createElement("button");
    salvarNovoContato.textContent = "Salvar";

    salvarNovoContato.addEventListener("click", function () {
        var nome = criarNome.value;
        var numero = criarNumero.value;
        var email = criarEmail.value;
        var mensagemSucesso = document.createElement("p");
        mensagemSucesso.style.opacity = "1";
        mensagemSucesso.textContent = "Contato salvo!"
        var imagemSucesso = document.createElement("img");
        imagemSucesso.style.opacity = "1";
        imagemSucesso.src = "image\\iconesMenu\\marca-de-verificacao.png";
        if (screenWidth <= 768) {
            imagemSucesso.style.width = "20%";
        }
        else {
            imagemSucesso.style.width = "40%";
        }

        var novoContato = new Contato(nome, numero, email);

        if (nome.length > 0 && numero.length > 0) {
            if (verificaContatos(numero)) {
                listaContatos.push(novoContato);
                ContainerCampos.appendChild(mensagemSucesso);
                ContainerCampos.appendChild(imagemSucesso);
                setTimeout(function () {
                    mensagemSucesso.style.transition = "opacity 2s";
                    mensagemSucesso.style.opacity = "0";
                    imagemSucesso.style.transition = "opacity 2s"; // Corrigido o nome da variável
                    imagemSucesso.style.opacity = "0"; // Corrigido o nome da variável
                }, 1000);
                setTimeout(function () {
                    mensagemSucesso.remove();
                    imagemSucesso.remove();
                }, 3000);
            }
            else {
                alert("Número já cadastrado na lista!");
            }
        }
        else {
            alert("Nome e número são obrigatórios!");
        }
    });

    var elementoPai = document.querySelector(".container");

    elementoPai.appendChild(AdicionarContatos);
    divContainerInput.appendChild(criarNome);
    divContainerInput.appendChild(criarNumero);
    divContainerInput.appendChild(criarEmail);
    AdicionarContatos.appendChild(voltar);
    AdicionarContatos.appendChild(ContainerCampos);
    ContainerCampos.appendChild(iconePessoa);
    ContainerCampos.appendChild(divContainerInput);
    ContainerCampos.appendChild(salvarNovoContato);

    voltar.addEventListener("click", function () {
        AdicionarContatos.remove();
        menu.style.display = "flex";
    });
})

attCtt.addEventListener("click", function () {
    menu.style.display = "none";

    var Lista = document.createElement("div");
    Lista.classList.add("NovoMenu");
    Lista.style.overflow = "auto";

    var ContainerPesquisa = document.createElement("div");
    ContainerPesquisa.style.display="flex";
    ContainerPesquisa.style.justifyContent="center";
    var pesquisar = document.createElement("input");
    pesquisar.id = "search";
    pesquisar.placeholder = "Digite o nome, número ou e-mail";
    ContainerPesquisa.appendChild(pesquisar);

    var ContainerContatos = document.createElement("div");

    if (screenWidth <= 768) {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "30%");
    }
    else {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "60%");
    }

    var elementoPai = document.querySelector(".container");
    elementoPai.appendChild(Lista);
    Lista.appendChild(voltar);
    Lista.appendChild(ContainerPesquisa);
    Lista.appendChild(ContainerContatos);

    const Busca = () => {
        var termoPesquisa = pesquisar.value.trim().toLowerCase();
        ContainerContatos.innerHTML = '';

        listaContatos.forEach(function (contato) {
            var nome = contato.nome.toLowerCase();
            var numero = contato.numero.toString().toLowerCase();
            var email = contato.email.toLowerCase();

            if (nome.includes(termoPesquisa) || numero.includes(termoPesquisa) || email.includes(termoPesquisa)) {

                var botaoAtualizar = addBotao("image\\iconesMenu\\contatos.png", "60%");

                var contatoCriado = exibirContato(contato);
                contatoCriado.appendChild(botaoAtualizar);
                ContainerContatos.appendChild(contatoCriado);

                botaoAtualizar.addEventListener("click", function () {
                    var indice = listaContatos.indexOf(contato);
                    Lista.style.display = "none";
                    var AdicionarContatos = document.createElement("div");
                    AdicionarContatos.classList.add("NovoMenu");

                    var ContainerCampos = document.createElement("div");
                    ContainerCampos.classList.add("ElementosCriarCtt");

                    var iconePessoa = document.createElement("img");
                    iconePessoa.src = "image\\iconesMenu\\perfil.png";
                    if (screenWidth <= 768) {
                        var voltar = addBotao("image\\iconesMenu\\volte.png", "30%");
                        iconePessoa.style.width = "20%";
                    }
                    else {
                        var voltar = addBotao("image\\iconesMenu\\volte.png", "60%");
                        iconePessoa.style.width = "30%";
                    }


                    var criarNome = document.createElement("input");
                    criarNome.type = "text";
                    criarNome.placeholder = "Digite o nome";
                    criarNome.value = contato.nome;

                    var criarNumero = document.createElement("input");
                    criarNumero.type = "number";
                    criarNumero.placeholder = "Digite o número";
                    criarNumero.value = contato.numero;

                    var criarEmail = document.createElement("input");
                    criarEmail.type = "text";
                    criarEmail.placeholder = "Digite o e-mail (opcional)";
                    criarEmail.value = contato.email;

                    var salvarNovoContato = document.createElement("button");
                    salvarNovoContato.textContent = "Salvar";

                    salvarNovoContato.addEventListener("click", function () {
                        var nomeNovo = criarNome.value;
                        var numeroNovo = criarNumero.value;
                        var emailNovo = criarEmail.value;
                        var mensagemSucesso = document.createElement("p");
                        mensagemSucesso.textContent = "Contato atualizado!"
                        var imagemSucesso = document.createElement("img");
                        imagemSucesso.src = "image\\iconesMenu\\marca-de-verificacao.png";
                        if (screenWidth <= 768) {
                            imagemSucesso.style.width = "20%";
                        }
                        else {
                            imagemSucesso.style.width = "40%";
                        }
                        if (nomeNovo.length > 0 && numeroNovo.length > 0) {
                            listaContatos[indice].nome = nomeNovo;
                            listaContatos[indice].numero = numeroNovo;
                            listaContatos[indice].email = emailNovo;
                            ContainerCampos.appendChild(mensagemSucesso);
                            ContainerCampos.appendChild(imagemSucesso);
                            setTimeout(function () {
                                mensagemSucesso.style.transition = "opacity 2s";
                                mensagemSucesso.style.opacity = "0";
                                imagemSucesso.style.transition = "opacity 2s";
                                imagemSucesso.style.opacity = "0";
                            }, 1000);
                            setTimeout(function () {
                                mensagemSucesso.remove();
                                imagemSucesso.remove();
                            }, 3000);
                        }
                        else {
                            alert("Nome e número são obrigatórios!");
                        }
                    });
                    var elementoPai = document.querySelector(".container");

                    elementoPai.appendChild(AdicionarContatos);
                    AdicionarContatos.appendChild(voltar);
                    AdicionarContatos.appendChild(ContainerCampos);
                    ContainerCampos.appendChild(iconePessoa);
                    ContainerCampos.appendChild(criarNome);
                    ContainerCampos.appendChild(criarNumero);
                    ContainerCampos.appendChild(criarEmail);
                    ContainerCampos.appendChild(salvarNovoContato);

                    voltar.addEventListener("click", function () {
                        AdicionarContatos.remove();
                        menu.style.display = "flex";
                    });
                });
            }
        });
    }
    voltar.addEventListener("click", function () {
        Lista.remove();
        menu.style.display = "flex";
    });
    Busca();
    pesquisar.addEventListener("input", Busca);
})

ListarCtt.addEventListener("click", function () {
    menu.style.display = "none";

    var Lista = document.createElement("div");
    Lista.classList.add("NovoMenu");
    Lista.style.overflow = "auto";

    var ContainerContatos = document.createElement("div");
    ContainerContatos.style.display = "flex";
    ContainerContatos.style.flexDirection = "column";
    ContainerContatos.style.justifyContent = "center";
    ContainerContatos.style.alignItems = "center";
    if (listaContatos.length === 0) {
        var mensagem = document.createElement("p");
        mensagem.style.fontSize = "20px";
        mensagem.textContent = "Nenhum contato salvo";
        ContainerContatos.appendChild(mensagem);
    }

    if (screenWidth <= 768) {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "30%");
    }
    else {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "60%");
    }


    var elementoPai = document.querySelector(".container");
    elementoPai.appendChild(Lista);
    Lista.appendChild(voltar);
    Lista.appendChild(ContainerContatos);

    listaContatos.forEach(function (contato) {
        var botaoDigitar = addBotao("image\\iconesMenu\\teclado.png", "60%");

        botaoDigitar.addEventListener("click", function () {
            numero = contato.numero;
            textoNum.textContent = numero;
            Lista.style.display = "none";
            menu.style.display = "flex";
        });

        var contatoCriado = exibirContato(contato);
        contatoCriado.appendChild(botaoDigitar);
        ContainerContatos.appendChild(contatoCriado);
    });

    voltar.addEventListener("click", function () {
        Lista.remove();
        menu.style.display = "flex";
    });
});

apagarCtt.addEventListener("click", function () {
    menu.style.display = "none";

    var Lista = document.createElement("div");
    Lista.classList.add("NovoMenu");
    Lista.style.overflow = "auto";

    var ContainerPesquisa = document.createElement("div");
    ContainerPesquisa.style.display="flex";
    ContainerPesquisa.style.justifyContent="center";
    var pesquisar = document.createElement("input");
    pesquisar.id = "search";
    pesquisar.placeholder = "Digite o nome, número ou e-mail";
    ContainerPesquisa.appendChild(pesquisar);

    var ContainerContatos = document.createElement("div");

    if (screenWidth <= 768) {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "30%");
    }
    else {
        var voltar = addBotao("image\\iconesMenu\\volte.png", "60%");
    }

    var elementoPai = document.querySelector(".container");
    elementoPai.appendChild(Lista);
    Lista.appendChild(voltar);
    Lista.appendChild(ContainerPesquisa);
    Lista.appendChild(ContainerContatos);


    listaContatos.forEach(function (contato) {
        var contatoCriado = exibirContato(contato);
        var botaoApagar = addBotao("image\\iconesMenu\\apagar.png", "60%");

        botaoApagar.addEventListener("click", function () {
            var indice = listaContatos.indexOf(contato);
            listaContatos.splice(indice, 1);
            contatoCriado.remove();
        });
        contatoCriado.appendChild(botaoApagar);
        ContainerContatos.appendChild(contatoCriado);
    });

    const Busca = () => {
        var termoPesquisa = pesquisar.value.trim().toLowerCase();
        ContainerContatos.innerHTML = '';

        listaContatos.forEach(function (contato) {
            var nome = contato.nome.toLowerCase();
            var numero = contato.numero.toString().toLowerCase();
            var email = contato.email.toLowerCase();

            if (nome.includes(termoPesquisa) || numero.includes(termoPesquisa) || email.includes(termoPesquisa)) {

                var contatoCriado = exibirContato(contato);
                var botaoApagar = addBotao("image\\iconesMenu\\apagar.png", "60%");

                botaoApagar.addEventListener("click", function () {
                    var indice = listaContatos.indexOf(contato);
                    listaContatos.splice(indice, 1);
                    contatoCriado.remove();
                });

                contatoCriado.appendChild(botaoApagar);

                ContainerContatos.appendChild(contatoCriado);
            }
        });
    }
    voltar.addEventListener("click", function () {
        Lista.remove();
        menu.style.display = "flex";
    });
    Busca();
    pesquisar.addEventListener("input", Busca);
});

const exibirContato = (contato) => {
    var contatoDiv = document.createElement("div");
    contatoDiv.classList.add("Contatos");

    var nomePessoa = document.createElement("p");
    nomePessoa.textContent = "Nome: " + contato.nome;
    contatoDiv.appendChild(nomePessoa);

    var numeroPessoa = document.createElement("p");
    numeroPessoa.textContent = "Número: " + contato.numero;
    contatoDiv.appendChild(numeroPessoa);

    if (contato.email.length > 0) {
        var emailPessoa = document.createElement("p");
        emailPessoa.textContent = "Email: " + contato.email;
        contatoDiv.appendChild(emailPessoa);
    }

    return contatoDiv;
}

const verificaContatos = (num) => {
    for (let i = 0; i < listaContatos.length; i++) {
        if (listaContatos[i].numero === num) {
            return false;
        }
    }
    return true;
}

const addBotao = (url, width) => {

    var ContainerVoltar = document.createElement("div");
    ContainerVoltar.style.marginTop = "20px";
    var botao = document.createElement("button");
    botao.style.background = "none";

    var icone = document.createElement("img");
    icone.src = url;
    icone.style.width = width;
    botao.appendChild(icone);
    ContainerVoltar.appendChild(botao);

    return ContainerVoltar;
}

const digitacao = (digito) => {
    numero = numero.concat(digito);
    textoNum.textContent = numero;
}

num0.addEventListener("click", () => digitacao("0"));
num1.addEventListener("click", () => digitacao("1"));
num2.addEventListener("click", () => digitacao("2"));
num3.addEventListener("click", () => digitacao("3"));
num4.addEventListener("click", () => digitacao("4"));
num5.addEventListener("click", () => digitacao("5"));
num6.addEventListener("click", () => digitacao("6"));
num7.addEventListener("click", () => digitacao("7"));
num8.addEventListener("click", () => digitacao("8"));
num9.addEventListener("click", () => digitacao("9"));
numAsterisco.addEventListener("click", () => digitacao("*"));
numHash.addEventListener("click", () => digitacao("#"));

apagar.addEventListener("click", function () {
    numero = numero.slice(0, -1);
    textoNum.textContent = numero;
})
ligar.addEventListener("click", function () {
    if (numero.length === 0) {
        alert("Número não digitado!");
        return;
    }
    var wpp = "https://wa.me/55".concat(numero);
    window.location.href = wpp;
})

