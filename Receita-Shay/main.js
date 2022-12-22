const form = document.querySelector('[data-adicionar]');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
const limpar = document.querySelector('[data-limpar]');
const precoVenda = document.querySelector('.venda');
const precoFabrica = document.querySelector('.fabrica');
const precos = []
var venda = 0 
var fabrica = 0
itens.forEach(element => {
    criarElemento(element);
});



form.addEventListener('submit', (evento)=>{
    evento.preventDefault();

    const ingrediente = evento.target.elements['ingrediente'];
    const qtdComprada = evento.target.elements['qtd-comprada'];
    const qtdUsada = evento.target.elements['qtd-usada'];
    const preco = evento.target.elements['preco']
    
    const itemAtual = {
        'ingrediente': ingrediente.value,
        'qtdComprada': qtdComprada.value,
        'qtdUsada': qtdUsada.value,
        'preco': preco.value
    }
    criarElemento(itemAtual)
    itens.push(itemAtual)
    localStorage.setItem('itens', JSON.stringify(itens));
    vendafabrica =calcularPreco(qtdUsada.value, qtdComprada.value, preco.value) 
    precos.push(vendafabrica);
    venda += vendafabrica[0]
    fabrica += vendafabrica[1]    
    precoVenda.textContent = "Preco de Venda: R$ " + venda
    precoFabrica.textContent = "Preco de Fábrica: R$ " + fabrica
    ingrediente.value = '';
    qtdComprada.value = '';
    qtdUsada.value = '';
    preco.value = '';
})

function criarElemento(item) {
    var tb = document.getElementById('tabela');
    var qtdLinhas = tb.rows.length;
    var linha = tb.insertRow(qtdLinhas);
    var cellIngrediente = linha.insertCell(0);
    var cellQtdUsado = linha.insertCell(1);
    var cellQtdComprado = linha.insertCell(2);
    var cellPreco = linha.insertCell(3);

    cellIngrediente.innerHTML = item.ingrediente;
    cellQtdUsado.innerHTML = item.qtdUsada;
    cellQtdComprado.innerHTML = item.qtdComprada;
    cellPreco.innerHTML = item.preco;

}

function limparConteudo() {
    localStorage.clear()
    location.reload()
    console.log('Dados apagados')
}

function calcularPreco(usado, comprado, preco){
    const precoFabrica = preco*usado/comprado;
    const precoVenda = 3*precoFabrica;
    return [precoVenda, precoFabrica];
    

}
