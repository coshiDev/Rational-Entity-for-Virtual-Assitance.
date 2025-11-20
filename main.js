console.log("JavaScript connected!");

async function loadCryptoPrices() {
    try {
        const responses = await Promise.all([
            fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
            fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"),
            fetch("https://api.binance.com/api/v3/ticker/price?symbol=USDTUSDT")
        ]);

        const data = await Promise.all(responses.map(r => r.json()));

        const btc = parseFloat(data[0].price).toFixed(2);
        const eth = parseFloat(data[1].price).toFixed(2);
        const usdt = "1.00"; // USDT stays $1

        const tickerText = `Bitcoin: $${btc}   |   Ethereum: $${eth}   |   USDT: $${usdt}`;

        document.getElementById("ticker-content").textContent = tickerText;

    } catch (error) {
        document.getElementById("ticker-content").textContent =
            "Unable to load crypto prices";
        console.error("Error loading prices:", error);
    }
}

// Load prices immediately + refresh every 20 seconds
loadCryptoPrices();
setInterval(loadCryptoPrices, 20000);
