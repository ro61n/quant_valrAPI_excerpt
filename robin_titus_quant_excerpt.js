/*
The code below is an excerpt from an algorithm I wrote that connects to a user's exchange acount to enter and exit long and short positions. 
These decisions are based off calculations made with candlestick data obtained from Binance's API.

As shown below, the algorithm then checks if the selected coin (for a long or short position) is also available on VALR's exchange.
Since on Binance's exchange, it profits in USDT, I wrote the code below to calculate a ZAR price for the coin. 
It first checks if there is a direct ZAR quote (e.g. BTC/ZAR) and if not then it creates a ZAR quote by multiplying the quoted coin with another coin that is quoted in ZAR (e.g. XLM/BTC * BTC/ZAR = XLM/ZAR).
The logic is that the same USDT profits made on Binance can be made on VALR in ZAR assuming that the arbitrage will stay constant.

In the future, I plan on using VALR's candlestick data when it becomes available.

*/

	const controllerAA = new AbortController();
	setTimeout(() => controllerAA.abort(), 20000);
	//controllerAA.abort();
	let responseAA = await fetch('https://api.valr.com/v1/public/pairs', {signal: controllerAA.signal,} ).catch((error)=>console.log(error));
	let responseST_AA=[];
	if (responseAA){
		responseST_AA = await responseAA.json();
		console.log('responseST_AA below');
		//console.log(responseST_AA);
		console.log(responseST_AA.length);
	}

						var isVALR_Coin=0;
							for (var d=0; d<responseST_AA.length; d++){
								if ((responseST_AA[d].baseCurrency+'USDT'==klines30mArr[s][0].symbol) && (responseST_AA[d].active==true) ){
									isVALR_Coin=1;
								}
							}
							
							var isPriceMissing=0;
							if (isVALR_Coin==1){
								var foundBaseCurrency='';
								
								for (var d=0; d<responseST_AA.length; d++){
									if ((responseST_AA[d].baseCurrency+'USDT'==klines30mArr[s][0].symbol) && (responseST_AA[d].quoteCurrency=='ZAR')) {
										foundBaseCurrency = responseST_AA[d].baseCurrency;
										//...
										klines30mArr[s][0].v_baseCurrency = responseST_AA[d].baseCurrency;
										klines30mArr[s][0].v_quoteCurrency = responseST_AA[d].quoteCurrency;
									}
								}
								
								var d=0;
								while ((d<responseST_AA.length) && (foundBaseCurrency=='')) {
									if (responseST_AA[d].baseCurrency+'USDT'==klines30mArr[s][0].symbol){
										foundBaseCurrency = responseST_AA[d].baseCurrency;
										//...
										klines30mArr[s][0].v_baseCurrency = responseST_AA[d].baseCurrency;
										klines30mArr[s][0].v_quoteCurrency = responseST_AA[d].quoteCurrency;
									}
									d++
								}
								
								if (klines30mArr[s][0].v_quoteCurrency!=null){
									if (klines30mArr[s][0].v_quoteCurrency!='ZAR'){
										for (var i=0; i<responseST_AB.length; i++){
											if (responseST_AB[i].currencyPair == klines30mArr[s][0].v_baseCurrency+klines30mArr[s][0].v_quoteCurrency){ //.. get price of XLM/BTC etc.
												var approxPrice = responseST_AB[i].askPrice;
												klines30mArr[s][0].v_basePrice = approxPrice;
											}
											if (responseST_AB[i].currencyPair == klines30mArr[s][0].v_quoteCurrency+'ZAR'){ //.. get price of BTC/ZAR or ETH/ZAR
												//var approxPrice = (parseFloat(responseST_AB[i].askPrice)+parseFloat(responseST_AB[i].bidPrice))/2;
												var approxPrice = responseST_AB[i].askPrice;
												klines30mArr[s][0].v_quotePrice = approxPrice;
											}
										}
									}
									else {
										klines30mArr[s][0].v_quotePrice = 1;//no base price therefore =1 one bacause you just multiply it.
										for (var i=0; i<responseST_AB.length; i++){
											if (responseST_AB[i].currencyPair == klines30mArr[s][0].v_baseCurrency+klines30mArr[s][0].v_quoteCurrency){ //.. get price of e.g. BTC/ZAR
												var approxPrice = responseST_AB[i].askPrice;
												klines30mArr[s][0].v_basePrice = approxPrice;
											}
										}
									}
								}
								
								var randPrice = parseFloat(klines30mArr[s][0].v_basePrice)*parseFloat(klines30mArr[s][0].v_quotePrice);
								klines30mArr[s][0].v_randPrice = randPrice;
								console.log('............')
								console.log(klines30mArr[s][0].symbol+' rand price:'+klines30mArr[s][0].v_randPrice)
								
								
								
								if ((!klines30mArr[s][0].v_basePrice) || (!klines30mArr[s][0].v_quotePrice)) {
									isPriceMissing=1;
									
									//console.log('............')
									console.log('MISSING PRICE - not considering this coin');
									
									console.log('base currency:'+klines30mArr[s][0].v_baseCurrency);
									console.log('base price:'+klines30mArr[s][0].v_basePrice);
									console.log('quote currency:'+klines30mArr[s][0].v_quoteCurrency);
									console.log('quote price:'+klines30mArr[s][0].v_quotePrice);
									//console.log('............')
									
								}
								
							}