# quant_valrAPI_excerpt
An excerpt of my quantitative algorithm working with data from VALR's API.

The code below is an excerpt that connects to a user's exchange acount to enter and exit long and short positions. 
These decisions are based off calculations made with candlestick data obtained from Binance's API.

As shown below, the algorithm then checks if the selected coin (for a long or short position) is also available on VALR's exchange.
Since on Binance's exchange, it profits in USDT, I wrote the code below to calculate a ZAR price for the coin. 
It first checks if there is a direct ZAR quote (e.g. BTC/ZAR) and if not then it creates a ZAR quote by multiplying the quoted coin with another coin that is quoted in ZAR (e.g. XLM/BTC * BTC/ZAR = XLM/ZAR).
The logic is that the same USDT profits made on Binance can be made on VALR in ZAR assuming that the arbitrage will stay constant.

In the future, I plan on using VALR's candlestick data when it becomes available.
