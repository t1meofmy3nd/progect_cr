window.addEventListener('DOMContentLoaded', () => {
  if(!document.getElementById('tv-chart')) return;
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/tv.js';
  script.onload = () => {
    new TradingView.widget({
      symbol: 'BTCUSDT',
      interval: '15',
      container_id: 'tv-chart',
      width: '100%',
      height: '100%',
      theme: document.body.classList.contains('light') ? 'Light' : 'Dark',
    });
  };
  document.body.appendChild(script);
});