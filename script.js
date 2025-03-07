<script>
// API URL for fetching cryptocurrency data
const API_URL = "https://api.coingecko.com/api/v3/global";
const TOP_10_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

// Fetch Global Crypto Stats
async function fetchGlobalStats() {
    const response = await fetch(API_URL);
    const data = await response.json();

    document.getElementById('total-cryptos').textContent = data.data.active_cryptocurrencies.toLocaleString();
    document.getElementById('total-exchanges').textContent = data.data.markets.toLocaleString();
    document.getElementById('market-cap').textContent = parseFloat(data.data.total_market_cap.usd).toLocaleString();
    document.getElementById('volume').textContent = parseFloat(data.data.total_volume.usd).toLocaleString();
}

// Fetch Top 10 Cryptocurrencies
async function fetchTopCryptos() {
    const response = await fetch(TOP_10_URL);
    const data = await response.json();

    const cryptoList = document.getElementById('crypto-list');
    
    data.forEach((crypto) => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.innerHTML = `
            <img src="${crypto.image}" alt="${crypto.name}">
            <h3>${crypto.name}</h3>
            <p>Price: $${crypto.current_price.toLocaleString()}</p>
            <p>Market Cap Rank: ${crypto.market_cap_rank}</p>
        `;
        cryptoList.appendChild(card);
    });
}

// Initialize Dashboard
fetchGlobalStats();
fetchTopCryptos();
</script>