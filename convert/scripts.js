// Cotação de moedas do dia.
const USD = 5.80;
const EUR = 6.31;
const GBP = 7.52;

// Obtendo os elementos dos formularios
const form = document.querySelector(`form`);
const amount = document.querySelector(`#amount`);
const currency = document.querySelector(`#currency`);
const footer = document.querySelector(`main footer`)
const description = document.querySelector(`#description`)
const result = document.querySelector(`#result`)

// Manipulando o input amount para receber somente números.
amount.addEventListener(`input`, () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, ``)
})

// Captadno o evento de submit do formúlario.
form.onsubmit = (event) => {
    event.preventDefault();

    switch (currency.value) {
        case `USD`:
            convertCurrency(amount.value, USD, `US$`);
        break;
        case `EUR`: 
            convertCurrency(amount.value, EUR, `€`);
        break;
        case `GBP`:
            convertCurrency(amount.value, GBP, `£`);
        break;
    }
}

// Função para converter moeda.
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total.
        let total = amount * price

        // Verifica se o resultado é um numero
        if(isNaN(total)) {
            return alert(`Por favor digite o valor corretamente para converter`)
        }

        // Formatar o valor total
        total = formatCurrencyBRL(total).replace(`R$`, ``)

        // Exibe o resultado da conversão.
        result.textContent = `${total} Reais`

        // Aplica a classe show-result que exibe o footer com o resultado da conversão
        footer.classList.add(`show-result`);
    } 
    catch (error) {
        // Remove a classe do footer removendo ele da tela.
        footer.classList.remove(`show-result`)
        console.log(error);
        alert(`Não foi possivel converter. Tente novamente mais tarde.`)
    }
}

// Formata a moeda em real brasileiro.
function formatCurrencyBRL(value) {
    // Converte para número para utilizar o toLocaleString para formatar no padrão BRL
    return Number(value).toLocaleString(`pt-BR`, {
        style: `currency`,
        currency: `BRL`
    })
}