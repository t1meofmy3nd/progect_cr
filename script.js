const midPrice = 27450;
const askBody = document.getElementById('asks');
const bidBody = document.getElementById('bids');
const midEl = document.getElementById('mid-price');

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function generateOrders() {
  const asks = [];
  const bids = [];
  for (let i = 0; i < 15; i++) {
    const askPrice = midPrice + randomBetween(1, 100);
    const bidPrice = midPrice - randomBetween(1, 100);
    asks.push({ price: askPrice, volume: randomBetween(0.01, 5) });
    bids.push({ price: bidPrice, volume: randomBetween(0.01, 5) });
  }
  asks.sort((a, b) => a.price - b.price);
  bids.sort((a, b) => b.price - a.price);
  return { asks, bids };
}

function flash(row, cls) {
  row.classList.add(cls);
  setTimeout(() => row.classList.remove(cls), 600);
}

function renderSide(data, tbody, flashClass) {
  for (let i = 0; i < data.length; i++) {
    const row = tbody.rows[i] || tbody.insertRow();
    const priceCell = row.cells[0] || row.insertCell();
    const volCell = row.cells[1] || row.insertCell();
    priceCell.textContent = data[i].price.toFixed(2);
    volCell.textContent = data[i].volume.toFixed(2);
    flash(row, flashClass);
  }
  while (tbody.rows.length > data.length) tbody.deleteRow(-1);
}

function updateBook() {
  const { asks, bids } = generateOrders();
  renderSide(asks, askBody, 'flash-ask');
  renderSide(bids, bidBody, 'flash-bid');
  midEl.textContent = midPrice.toFixed(2);
}

updateBook();
setInterval(updateBook, randomBetween(2000, 3000));