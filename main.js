console.log("JavaScript connected!");

async function loadCryptoPrices() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
        );

        console.log("Fetch status:", response.status); // DEBUG

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data:", data); // DEBUG

        const btc = data.bitcoin?.usd;
        const eth = data.ethereum?.usd;
        const usdt = data.tether?.usd;

        if (btc == null || eth == null || usdt == null) {
            throw new Error("Unexpected data format");
        }

        const tickerText = `Bitcoin: $${btc}   |   Ethereum: $${eth}   |   USDT: $${usdt}`;
        document.getElementById("ticker-content").textContent = tickerText;

    } catch (error) {
        document.getElementById("ticker-content").textContent =
            "Unable to load crypto prices";
        console.error("Error loading crypto prices:", error);
    }
}

loadCryptoPrices();
