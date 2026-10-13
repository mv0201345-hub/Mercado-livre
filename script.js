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
        preco:  670.00,
        imagem: "Imagens/rtx5090.jpg"
    },
    {
        nome: "Monitor Gamer 27\" 180Hz",
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

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos(lista) {
    areaProdutos.innerHTML = "";

    lista.forEach((produto, indice) => {
        const card = document.createElement("div");

        card.classList.add("produto");

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <h2>${produto.nome}</h2>

            <p class="preco">
                ${formatarPreco(produto.preco)}
            </p>

            <p class="parcelamento">
                Em até 12x sem juros
            </p>
        `;

        card.addEventListener("click", () => {
            abrirProduto(indice);
        });

        areaProdutos.appendChild(card);
    });
}

function abrirProduto(indice) {
    const produto = produtos[indice];

    areaProdutos.innerHTML = `
        <div class="pagina-produto">

            <button class="botao-voltar" onclick="mostrarProdutos(produtos)">
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

                    <label for="quantidade">
                        Quantidade:
                    </label>

                    <input
                        type="number"
                        id="quantidade"
                        value="1"
                        min="1"
                        max="10"
                    >

                    <label for="cep">
                        CEP:
                    </label>

                    <input
                        type="text"
                        id="cep"
                        placeholder="Digite um CEP fictício"
                    >

                    <label for="email">
                        E-mail:
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="exemplo@email.com"
                    >

                    <h2>Forma de pagamento</h2>

                    <div class="pagamentos">

                        <label>
                            <input
                                type="radio"
                                name="pagamento"
                                value="Pix"
                                checked
                            >
                            Pix
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="pagamento"
                                value="Cartão de crédito"
                            >
                            Cartão de crédito
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="pagamento"
                                value="Cartão de débito"
                            >
                            Cartão de débito
                        </label>

                    </div>

                    <div class="resumo">

                        <p>
                            Produto:
                            <span id="valorProduto">
                                ${formatarPreco(produto.preco)}
                            </span>
                        </p>

                        <p>
                            Frete:
                            <span>R$ 0,00</span>
                        </p>

                        <h2>
                            Total:
                            <span id="valorTotal">
                                ${formatarPreco(produto.preco)}
                            </span>
                        </h2>

                    </div>

                    <button
                        class="botao-comprar"
                        onclick="finalizarCompra('${produto.nome}')"
                    >
                        Continuar
                    </button>

                </div>

            </div>

        </div>
    `;

    document
        .getElementById("quantidade")
        .addEventListener("input", () => {
            atualizarTotal(produto.preco);
        });
}

function atualizarTotal(preco) {
    const quantidade =
        Number(document.getElementById("quantidade").value) || 1;

    const total = preco * quantidade;

    document.getElementById("valorProduto").textContent =
        formatarPreco(total);

    document.getElementById("valorTotal").textContent =
        formatarPreco(total);
}

function finalizarCompra(nomeProduto) {
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;

    const pagamentoSelecionado =
        document.querySelector(
            'input[name="pagamento"]:checked'
        ).value;

    if (!email || !cep) {
        alert("Preencha o e-mail e o CEP para continuar.");
        return;
    }

    alert(
        "SIMULAÇÃO DE COMPRA\n\n" +
        "Produto: " + nomeProduto + "\n" +
        "Pagamento: " + pagamentoSelecionado + "\n\n" +
        "Compra fictícia realizada com sucesso!"
    );
}

mostrarProdutos(produtos);
const barraPesquisa = document.getElementById("barraPesquisa");

barraPesquisa.addEventListener("input", () => {
    const texto = barraPesquisa.value.toLowerCase();

    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto)
    );

    mostrarProdutos(resultados);
});
