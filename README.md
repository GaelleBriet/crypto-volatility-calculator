1- initialiser le projet Node.js 
```
npm init -y
```

2- installer les dépendances 
(ccxt: echanges crypto)

```
npm install ccxt 
```


# Notes

Daily Volatility Formula is represented as,
Daily Volatility formula = √Variance
Further, the annualized volatility formula is calculated by multiplying the daily volatility by
a square root of 252.
Annualized Volatility Formula is  represented as,
Annualized Volatility Formula = √252 * √Variance

Calculer la moyenne des prix
Calculer différence entre le cours de chaque jour et le prix moyen
calculer la racine carrée de la variance
calculer la volatilité journalière ecart type / moyenne

___________________________

### fetchOHLCV

fetchOHLCV (symbol, timeframe = '1m', since = undefined, limit = undefined, params = {})

symbol : 'BTC/EUR'
timeframe : '1m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '12h', '1d', '1w', '1M'
 -> intervalle de temps pour chaque candle 
since : timestamp en millisecondes (undefined = dernière candle)
limit : nombre de candles à récupérer (nb de jours)

#### OHLCV Structure
```
[
[
1504541580000, // UTC timestamp in milliseconds, integer
4235.4,        // (O)pen price, float
4240.6,        // (H)ighest price, float
4230.0,        // (L)owest price, float
4230.7,        // (C)losing price, float
37.72941911    // (V)olume float (usually in terms of the base currency, the exchanges docstring may list whether quote or base units are used)
],
...

```
___________________________


