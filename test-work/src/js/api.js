let moneyValue = {}

const ratesNow = async () => {
    const obj = await fetch(`https://open.er-api.com/v6/latest/USD`);
    const currentRates = await obj.json();
    const result = currentRates.rates;

    const USD = currencyRound(result.UAH);
    const resultEURfirst = result.UAH * result.EUR;
    const EUR = currencyRound(resultEURfirst);
    const resultUSD = returningMsg(USD, 'USD');
    const resultEUR = returningMsg(EUR, 'EUR');

    moneyValue['USD'] = USD;
    moneyValue['EUR'] = EUR;

    let ratesList = document.querySelectorAll(".header__rate");

    ratesList[0].innerHTML = resultEUR;
    ratesList[1].innerHTML = resultUSD;
    return moneyValue
}

function currencyRound(value) {
    let result = Math.round(value * 100) / 100;
    return result
}

function returningMsg(currencyVal, currency) {
    let msg = `${currency} worth now <span class="${currency}">${currencyVal}</span> Ukrainian Hrivnas`;
    return msg
}

export default ratesNow
