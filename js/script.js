// load header and footer
function loadComponents() {
  ['header', 'footer'].forEach(id => {
    fetch(`components/${id}.html`).then(r => r.text()).then(html => {
      document.getElementById(id).innerHTML = html;
      if(id === 'header') initThemeToggle();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
  startTicker();
  setTimeout(initHomePrices, 1000);
  setTimeout(initNews, 1000);
  initOrderBook();
  initWalletActions();
});

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
  });
}

// ticker update
function startTicker() {
  const span = document.querySelector('#ticker span');
  if(!span) return;
  setInterval(() => {
    const btc = (30000 + Math.random()*1000).toFixed(2);
    const eth = (1800 + Math.random()*50).toFixed(2);
    span.textContent = `BTC/USDT ${btc} | ETH/USDT ${eth}`;
  }, 2000);
}

// home page prices
function initHomePrices() {
  const container = document.getElementById('price-cards');
  if(!container) return;
  const symbols = ['BTC', 'ETH', 'BNB', 'SOL'];
  container.innerHTML = '';
  symbols.forEach(sym => {
    const price = (100 + Math.random()*30000).toFixed(2);
    container.innerHTML += `<div class="col-6 col-md-3"><div class="card bg-dark text-light"><div class="card-body text-center"><h5 class="card-title">${sym}/USDT</h5><p class="card-text">${price}</p></div></div></div>`;
  });
}

function initNews() {
  const news = document.getElementById('news');
  if(!news) return;
  news.innerHTML = `<div class="col-12"><div class="alert alert-secondary text-center" role="alert">Новые возможности торговать на CryptoEx скоро!</div></div>`;
}

// order book logic
function initOrderBook() {
  const asks = document.getElementById('book-asks');
  const bids = document.getElementById('book-bids');
  if(!asks || !bids) return;
  function update() {
    asks.innerHTML = '';
    bids.innerHTML = '';
    for(let i=0;i<15;i++) {
      const askPrice = (30000 + Math.random()*200).toFixed(2);
      const askVol = (Math.random()*5).toFixed(4);
      const bidPrice = (30000 - Math.random()*200).toFixed(2);
      const bidVol = (Math.random()*5).toFixed(4);
      asks.innerHTML += `<div><span>${askPrice}</span><span>${askVol}</span></div>`;
      bids.innerHTML += `<div><span>${bidPrice}</span><span>${bidVol}</span></div>`;
    }
  }
  update();
  setInterval(update, 2000);
}

// assets wallet actions
function initWalletActions() {
  const body = document.getElementById('assets-body');
  const form = document.getElementById('wallet-form');
  const msg = document.getElementById('wallet-msg');
  if(!body) return;
  body.addEventListener('click', e => {
    if(e.target.classList.contains('deposit-btn') || e.target.classList.contains('withdraw-btn')) {
      form.hidden = false;
      const type = e.target.classList.contains('deposit-btn') ? 'Deposit' : 'Withdraw';
      form.dataset.type = type;
      document.getElementById('wallet-action').textContent = `${type} ${e.target.closest('tr').dataset.symbol}`;
    }
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.hidden = true;
    msg.textContent = `${form.dataset.type} successful`;
    msg.hidden = false;
    setTimeout(() => msg.hidden = true, 2000);
  });
}