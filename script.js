
const produtos = [
    {
        nome: "AMD Ryzen 7 7800X3D",
        preco: 499.67,
        imagem: "./Imagens/ryzen.jpg"
    },
    {
        nome: "SSD NVMe 2TB",
        preco: 67.00,
        imagem: "./Imagens/ssd.jpg"
    },
    {
        nome: "Placa de vídeo NVIDIA GeForce RTX 5090",
        preco: 670.00,
        imagem: "Imagens/rtx5090.jpg"
    },
    {
        nome: 'Monitor Gamer 27" 180Hz',
        preco: 99.90,
        imagem: "Imagens/monitor.jpg"
    },
    {
        nome: "Fonte 1000W 80 Plus",
        preco: 66.99,
        imagem: "Imagens/fonte.jpg"
    },
    {
        nome: "Memória RAM 32GB DDR5",
        preco: 267.90,
        imagem: "./Imagens/ram.jpg"
    }
];

const areaProdutos = document.getElementById("produtos");
const barraPesquisa = document.getElementById("barraPesquisa");

let produtoAtual = null;

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// MOSTRAR OS PRODUTOS

function mostrarProdutos(lista) {
    produtoAtual = null;
    areaProdutos.innerHTML = "";

    if (lista.length === 0) {
        areaProdutos.innerHTML =
            "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach((produto) => {
        const card = document.createElement("div");
        card.classList.add("produto");

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;

        const nome = document.createElement("h2");
        nome.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.classList.add("preco");
        preco.textContent = formatarPreco(produto.preco);

        const parcelamento = document.createElement("p");
        parcelamento.classList.add("parcelamento");
        parcelamento.textContent = "Em até 12x sem juros";

        card.append(imagem, nome, preco, parcelamento);

        // Usa o produto original, mesmo após pesquisar.
        card.addEventListener("click", () => {
            abrirProduto(produtos.indexOf(produto));
        });

        areaProdutos.appendChild(card);
    });
}

// PÁGINA DO PRODUTO

function abrirProduto(indice) {
    const produto = produtos[indice];

    if (!produto) return;

    produtoAtual = produto;

    areaProdutos.innerHTML = `
        <div class="pagina-produto">

            <button type="button" class="botao-voltar" id="voltar">
                ← Voltar para os produtos
            </button>

            <div class="detalhes-produto">

                <div class="imagem-produto">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>

                <div class="informacoes-produto">

                    <h1>${produto.nome}</h1>

                    <p class="preco-grande">
                        ${formatarPreco(produto.preco)}
                    </p>

                    <p class="parcelamento">
                        Em até 12x sem juros
                    </p>

                    <hr>

                    <label for="quantidade">Quantidade:</label>
                    <input type="number" id="quantidade"
                        value="1" min="1" max="10">

                    <h2>Endereço de entrega</h2>

                    <label for="destinatario">Nome do destinatário:</label>
                    <input type="text" id="destinatario"
                        placeholder="Nome completo">

                    <label for="cep">CEP:</label>
                    <input type="text" id="cep"
                        placeholder="00000-000" maxlength="9">

                    <label for="rua">Rua ou avenida:</label>
                    <input type="text" id="rua"
                        placeholder="Nome da rua">

                    <label for="numero">Número:</label>
                    <input type="text" id="numero"
                        placeholder="Número da residência">

                    <label for="complemento">Complemento (opcional):</label>
                    <input type="text" id="complemento"
                        placeholder="Casa, apartamento...">

                    <label for="bairro">Bairro:</label>
                    <input type="text" id="bairro"
                        placeholder="Bairro">

                    <label for="cidade">Cidade:</label>
                    <input type="text" id="cidade"
                        placeholder="Cidade">

                    <label for="estado">Estado:</label>
                    <input type="text" id="estado"
                        placeholder="UF" maxlength="2">

                    <label for="email">E-mail:</label>
                    <input type="email" id="email"
                        placeholder="voce@exemplo.com">

                    <h2>Forma de pagamento</h2>

                    <div class="pagamentos">

                        <label>
                            <input type="radio" name="pagamento"
                                value="Pix" checked>
                            Pix
                        </label>

                        <label>
                            <input type="radio" name="pagamento"
                                value="Cartão de crédito">
                            Cartão de crédito
                        </label>

                        <label>
                            <input type="radio" name="pagamento"
                                value="Cartão de débito">
                            Cartão de débito
                        </label>

                    </div>

                    <div id="detalhesPagamento"></div>

                    <div class="resumo">

                        <p>
                            Produto:
                            <span id="valorProduto">
                                ${formatarPreco(produto.preco)}
                            </span>
                        </p>

                        <p>
                            Frete:
                            <span>Grátis</span>
                        </p>

                        <h2>
                            Total:
                            <span id="valorTotal">
                                ${formatarPreco(produto.preco)}
                            </span>
                        </h2>

                    </div>

                    <button type="button"
                        class="botao-comprar" id="continuar">
                        Confirmar pedido fictício
                    </button>

                    <p style="font-size:12px; margin-top:12px;">
                        Projeto escolar: pagamento e pedido simulados.
                        Não informe dados bancários reais.
                    </p>

                </div>
            </div>
        </div>
    `;

    document.getElementById("voltar").addEventListener("click", () => {
        barraPesquisa.value = "";
        mostrarProdutos(produtos);
    });

    document.getElementById("quantidade").addEventListener("input", () => {
        atualizarTotal(produto.preco);
    });

    document.querySelectorAll('input[name="pagamento"]')
        .forEach((radio) => {
            radio.addEventListener("change", mostrarPagamento);
        });

    document.getElementById("continuar").addEventListener(
        "click", finalizarCompra
    );

    mostrarPagamento();
    atualizarTotal(produto.preco);
}

// ATUALIZAR O TOTAL

function atualizarTotal(preco) {
    const campoQuantidade = document.getElementById("quantidade");
    if (!campoQuantidade) return;

    let quantidade = Number(campoQuantidade.value);

    if (!Number.isFinite(quantidade) || quantidade < 1) {
        quantidade = 1;
    }

    quantidade = Math.min(10, Math.floor(quantidade));
    campoQuantidade.value = quantidade;

    const total = preco * quantidade;

    document.getElementById("valorProduto").textContent =
        formatarPreco(total);

    document.getElementById("valorTotal").textContent =
        formatarPreco(total);
}

// CAMPOS DINÂMICOS DE PAGAMENTO

function mostrarPagamento() {
    const area = document.getElementById("detalhesPagamento");
    if (!area) return;

    const selecionado = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!selecionado) return;

    const pagamento = selecionado.value;

    if (pagamento === "Pix") {
        area.innerHTML = `
            <div class="resumo">
                <h2>Pagamento via Pix</h2>
                <p>
                    Esta é uma demonstração escolar.
                    Nenhum pagamento será realizado.
                </p>
                <div style="
                    background:#f4f4f4;
                    padding:18px;
                    text-align:center;
                    border-radius:8px;
                    margin-top:12px;">
                    <strong>PIX DE DEMONSTRAÇÃO</strong>
                    <p style="margin-top:8px;">
                        Nenhum QR Code ou código de cobrança real.
                    </p>
                </div>
            </div>
        `;
    } else {
        area.innerHTML = `
            <div class="resumo">
                <h2>${pagamento}</h2>

                <p>
                    Preencha apenas os dados fictícios
                    para demonstrar a interface.
                </p>

                <label for="titularFicticio">
                    Nome fictício do titular:
                </label>
                <input type="text" id="titularFicticio"
                    placeholder="NOME DE DEMONSTRAÇÃO">

                <label for="cartaoFicticio">
                    Número de cartão fictício:
                </label>
                <input type="text" id="cartaoFicticio"
                    inputmode="numeric"
                    placeholder="0000 0000 0000 0000"
                    maxlength="19">

                <label for="validadeFicticia">
                    Validade fictícia:
                </label>
                <input type="text" id="validadeFicticia"
                    placeholder="MM/AA" maxlength="5">

                <p style="font-size:12px; margin-top:10px;">
                    Não use cartões verdadeiros.
                    Esses campos são apenas ilustrativos.
                </p>
            </div>
        `;

        // Formatação visual de dados exclusivamente fictícios.
        const cartao = document.getElementById("cartaoFicticio");

        cartao.addEventListener("input", () => {
            let numeros = cartao.value.replace(/\D/g, "").slice(0, 16);
            cartao.value = numeros.replace(/(\d{4})(?=\d)/g, "$1 ");
        });

        const validade = document.getElementById("validadeFicticia");

        validade.addEventListener("input", () => {
            let numeros = validade.value.replace(/\D/g, "").slice(0, 4);

            if (numeros.length > 2) {
                numeros = numeros.slice(0, 2) + "/" + numeros.slice(2);
            }

            validade.value = numeros;
        });
    }
}

// CONFIRMAR PEDIDO FICTÍCIO

function finalizarCompra() {
    const produto = produtoAtual;
    if (!produto) return;

    const obter = (id) =>
        document.getElementById(id).value.trim();

    const destinatario = obter("destinatario");
    const cep = obter("cep");
    const rua = obter("rua");
    const numero = obter("numero");
    const bairro = obter("bairro");
    const cidade = obter("cidade");
    const estado = obter("estado");
    const email = obter("email");
    const quantidade = Number(obter("quantidade"));

    const pagamento = document.querySelector(
        'input[name="pagamento"]:checked'
    ).value;

    const obrigatorios = [
        destinatario, cep, rua, numero,
        bairro, cidade, estado, email
    ];

    if (obrigatorios.some(campo => !campo)) {
        alert("Preencha os campos obrigatórios do endereço e do contato.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Digite um e-mail válido.");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 10) {
        alert("Escolha uma quantidade entre 1 e 10.");
        return;
    }

    if (pagamento !== "Pix") {
        const titular = obter("titularFicticio");
        const cartao = obter("cartaoFicticio").replace(/\s/g, "");
        const validade = obter("validadeFicticia");

        if (!titular || !cartao || !validade) {
            alert("Preencha os campos fictícios de demonstração.");
            return;
        }

        if (!/^\d{16}$/.test(cartao) || !/^\d{2}\/\d{2}$/.test(validade)) {
            alert("Use valores fictícios no formato indicado.");
            return;
        }
    }

    const total = produto.preco * quantidade;
    const numeroPedido = "DEMO-" +
        Math.floor(100000 + Math.random() * 900000);

    areaProdutos.innerHTML = `
        <div class="resumo" style="
            max-width:700px;
            margin:20px auto;
            padding:30px;
            background:white;">

            <h1 style="color:#00a650;">
                ✓ Pedido de demonstração confirmado!
            </h1>

            <p style="margin:15px 0;">
                Número do pedido: <strong>${numeroPedido}</strong>
            </p>

            <hr>

            <h2>Resumo do pedido</h2>

            <p>Produto: ${produto.nome}</p>
            <p>Quantidade: ${quantidade}</p>
            <p>Pagamento: ${pagamento}</p>
            <p>Frete: Grátis</p>

            <h2>Total: ${formatarPreco(total)}</h2>

            <hr>

            <h2>Entrega fictícia</h2>

            <p>${destinatario}</p>
            <p>${rua}, ${numero}</p>
            <p>${bairro} — ${cidade}/${estado.toUpperCase()}</p>
            <p>CEP: ${cep}</p>
            <p>E-mail: ${email}</p>

            <p style="margin-top:20px; font-size:13px;">
                Esta compra é uma simulação escolar.
                Nenhuma cobrança ou envio real foi realizado.
            </p>

            <button type="button" class="botao-comprar"
                id="voltarInicio">
                Voltar aos produtos
            </button>
        </div>
    `;

    document.getElementById("voltarInicio").addEventListener("click", () => {
        barraPesquisa.value = "";
        mostrarProdutos(produtos);
    });

    // Nenhum dado de cartão é enviado ou armazenado.
}

// BARRA DE PESQUISA

barraPesquisa.addEventListener("input", () => {
    const texto = barraPesquisa.value.trim().toLowerCase();

    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto)
    );

    mostrarProdutos(resultados);
});

mostrarProdutos(produtos);


const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value;

    if (!email || !senha) {
        alert("Preencha os campos para continuar.");
        return;
    }

    document.getElementById("telaLogin").style.display = "none";

    alert("Login de demonstração realizado com sucesso!");
});
