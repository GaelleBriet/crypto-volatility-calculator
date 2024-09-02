// cjs example
'use strict';
const ccxt = require ('ccxt');
const readline = require('readline');
const config = require('./config');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function calculateVolatility(prices) {
    // calculate the average price
    const average = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    // la suite du calcul n'a pas été fait par moi seule, j'ai utilisé une ia pour m'aider à le faire
    // calculate the variance
    // différence entre le cours de chaque jour et le prix moyen
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - average, 2), 0) / prices.length;
    // calculate the standard deviation
    // racine carrée de la variance
    const standardDeviation = Math.sqrt(variance);
    // calculate the volatility
    // volatilité = écart type / moyenne
    const volatility = standardDeviation / average;
    return volatility;
}

async function main() {
    try {
        console.log('Binance sera utilisé comme exchange.');

        rl.question(`Entrez la devise, ou appuyez sur Entrée pour la valeur par défaut [${config.FIAT_CURRENCY}]: `, (fiatCurrency) => {
            config.FIAT_CURRENCY = fiatCurrency || config.FIAT_CURRENCY;
            rl.question(`Entrez le nombre de jours pour le calcul, ou appuyez sur Entrée pour la valeur par défaut [${config.CALCULATION_DAYS}]: `, (calculationDays) => {
                config.CALCULATION_DAYS = calculationDays || config.CALCULATION_DAYS;
                rl.question(`Entrez la période de temps, ou appuyez sur Entrée pour la valeur par défaut [${config.TIMEFRAME}]: `, (timeframe) => {
                    config.TIMEFRAME = timeframe || config.TIMEFRAME;

                    console.log('Volatility calculation in progress...');
                });
            });
        });


        const exchange = new ccxt[config.EXCHANGE]();
        await exchange.loadMarkets ()

        const result = [];

        // filter symbols by fiat currency  ex: 'BTC/EUR'
        const symbols = exchange.symbols.filter(s => s.endsWith(config.FIAT_CURRENCY));

        for (const symbol of symbols) {

            // get daily prices for the last CALCULATION_DAYS
             const dailyPrices = await exchange.fetchOHLCV(symbol, config.TIMEFRAME, undefined,  config.CALCULATION_DAYS);

            // get all close prices
            const closePrices = dailyPrices.map(candle => candle[4]);

            // calculate volatility
            const volatility = calculateVolatility(closePrices);
            // get last price and volume
            const lastPrice = closePrices[closePrices.length - 1];
            const lastVolume = dailyPrices[dailyPrices.length - 1][5];

            result.push({
                symbol,
                volatility,
                lastPrice,
                lastVolume
            });

        }
        console.table(result);
        console.log('Volatility calculation done');
        rl.close();
    } catch (error) {
        console.error(`Une erreur est survenue : ${error.message}`);
    }

}

main();