// Переключение темы
const toggle = document.getElementById('themeToggle');
if (toggle) {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') document.body.classList.add('dark');
  toggle.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
}

// Симуляция стакана ордеров
const askBody = document.getElementById('asks');
const bidBody = document.getElementById('bids');
const midEl = document.getElementById('midPrice');

if (askBody && bidBody) {
  const mid = 27450;

  const rand = (min, max) => Math.random() * (max - min) + min;

  function gen() {
    const asks = [], bids = [];
    for (let i = 0; i < 15; i++) {
      asks.push({p: mid + rand(1, 100), v: rand(0.01, 5)});
      bids.push({p: mid - rand(1, 100), v: rand(0.01, 5)});
    }
    asks.sort((a,b) => a.p - b.p);
    bids.sort((a,b) => b.p - a.p);
    return {asks, bids};
  }

  function render(rows, tbody, cls) {
    rows.forEach((r, i) => {
      let row = tbody.rows[i] || tbody.insertRow();
      let price = row.cells[0] || row.insertCell();
      let vol = row.cells[1] || row.insertCell();
      if (price.textContent !== r.p.toFixed(2) || vol.textContent !== r.v.toFixed(2)) {
        row.classList.add(cls);
        setTimeout(() => row.classList.remove(cls), 500);
      }
      price.textContent = r.p.toFixed(2);
      vol.textContent = r.v.toFixed(2);
    });
    while (tbody.rows.length > rows.length) tbody.deleteRow(-1);
  }

  function update() {
    const {asks, bids} = gen();
    render(asks, askBody, 'flash-red');
    render(bids, bidBody, 'flash-green');
    midEl.textContent = mid.toFixed(2);
  }

  update();
  setInterval(update, 2000 + Math.random()*1000);
}
