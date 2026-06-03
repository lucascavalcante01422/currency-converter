const buttonConvert = document.querySelector(".button-to-convert");
const coinSelect = document.querySelector("#select-convert-to")
const startCoin = document.querySelector("#select-convert-from")

async function convertValue() {
    const inputValueToConvert = document.querySelector("#value-to-convert").value;
    const valueToCovert = document.querySelector("#p-start-value")
    const valueCoverted = document.querySelector("#p-final-value")

    /*Caso o usuario não digite um valor*/
    if (isNaN(inputValueToConvert)) {
        alert("Por favor, digite um valor válido.");
        return;
    }
    /*                                            */
    let dolarToday = 5.2;
    let euroToday = 6.2;

    /*     Pegando Valores ao Vivo    */
    try {
        
        const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
        const data = await response.json();

        
        dolarToday = parseFloat(data.USDBRL.bid);
        euroToday = parseFloat(data.EURBRL.bid);
        
        console.log(`Taxas atualizadas com sucesso! Dólar: ${dolarToday} | Euro: ${euroToday}`);
    } catch (error) {
        
        // Mensagem de erro caso o usuaria esteja sem internet.
        console.log("Erro ao buscar moedas ao vivo, usando valores padrão.", error);
    }
    /*  -------------------------------------------------------  */

    let valueInReal = 0;

    if (startCoin.value == "real-start") {
        valueInReal = inputValueToConvert;
    }
    else if (startCoin.value == "dolar-start") {
        valueInReal = inputValueToConvert * dolarToday;
    }
    else if (startCoin.value == "euro-start") {
        valueInReal = inputValueToConvert * euroToday;
    }

    let finalValue = 0;

    if (coinSelect.value == "real") {
        finalValue = valueInReal;
    }
    else if (coinSelect.value == "dolar") {
        finalValue = valueInReal / dolarToday;
    }
    else if (coinSelect.value == "euro") {
        finalValue = valueInReal / euroToday;
    }

    if (startCoin.value == "real-start") {
        valueToCovert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputValueToConvert);
    }
    else if (startCoin.value == "dolar-start") {
        const formattedStartDolar = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(inputValueToConvert);
        
        valueToCovert.innerHTML = `US$ ${formattedStartDolar}`;
    }
    else if (startCoin.value == "euro-start") {
        valueToCovert.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputValueToConvert);
    }

    if (coinSelect.value == "real") {
        valueCoverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(finalValue);
    }
    else if (coinSelect.value == "dolar") {
        const formattedDolar = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(finalValue);
        
        valueCoverted.innerHTML = `US$ ${formattedDolar}`;
    }
    else if (coinSelect.value == "euro") {
        valueCoverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(finalValue);
    }
}

function changeStartCoin() {
    const startSymbol = document.querySelector("#p-coin-start")
    const startValue = document.querySelector("#p-start-value")
    const startImgCoin = document.querySelector(".brasil")
    const convertValue = document.querySelector(".value-to-convert")

    if (startCoin.value == "real-start") {
        startSymbol.innerHTML = "Real Brasileiro"
        startValue.innerHTML = "R$ 0,00"
        startImgCoin.src = "./assets/img/Brasil-img.png"
    }

    if (startCoin.value == "dolar-start") {
        startSymbol.innerHTML = "Dólar"
        startValue.innerHTML = "US$ 0,00"
        startImgCoin.src = "./assets/img/USA-img.png"
    }

    if (startCoin.value == "euro-start") {
        startSymbol.innerHTML = "Euro"
        startValue.innerHTML = "€ 0,00"
        startImgCoin.src = "./assets/img/euro-img.png"
    }
    convertValue();

}

function changeCoin() {
    const coinName = document.querySelector("#p-coin-final");
    const coinImg = document.querySelector(".usa");
    const coinSymbol = document.querySelector("#p-final-value");

    if (coinSelect.value == "dolar") {
        coinName.innerHTML = "Dólar"
        coinImg.src = "./assets/img/USA-img.png"
        coinSymbol.innerHTML = "US$ 0,00"
    };

    if (coinSelect.value == "euro") {
        coinName.innerHTML = "Euro"
        coinImg.src = "./assets/img/euro-img.png"
        coinSymbol.innerHTML = "0,00 €"
    };

    if (coinSelect.value == "real") {
        coinName.innerHTML = "Real Brasileiro"
        coinImg.src = "./assets/img/Brasil-img.png"
        coinSymbol.innerHTML = "R$ 0,00"
    }
    convertValue();
}
startCoin.addEventListener("change", changeStartCoin)

coinSelect.addEventListener("change", changeCoin)

buttonConvert.addEventListener("click", convertValue)