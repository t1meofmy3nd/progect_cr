# CryptoEx Design

Simple prototype of a crypto exchange interface with trading terminal, assets dashboard and theme switcher.

## Project Structure

```
crypto-exchange-design/
├── index.html
├── trading.html
├── assets.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── tradingview-init.js
├── components/
│   ├── header.html
│   └── footer.html
└── assets/
    └── icons/, images/
```

## Usage

Open any HTML file with a live server extension or simple HTTP server. For example:

```
# using Python 3
python3 -m http.server
```

Then navigate to `http://localhost:8000/index.html` in your browser.

TradingView widget requires Internet access to load its script.