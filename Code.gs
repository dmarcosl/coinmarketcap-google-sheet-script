/**
 * Displays the price of the symbol. At first it does not show anything, to show all the prices on the sheet please use the option in the menu, this is how it is done to make a single request.
 *
 * @param (string) Symbol
 * @param Please let this param empty
 * return Price of the symbol
**/
function CMCPRICE(symbol, price) {
  
  if (!price) {
    price = "Please use the menu option to retrieve the price.";
  }
  
  return price;
}

/**
 * Retrieve the prices of the given symbols
 * 
 * @param (list) List of symbols
 * @return Json with the symbol as key and the price as value
 */
function _call_coin_market_call_prices(symbols) {
  const API_KEY = 'You Api-Key goes here';
  const CURRENCY = "USD";
  
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=" + CURRENCY + "&symbol=" + symbols.toString();
  let options = {
    "method": "GET",
    "contentType": "application/json",
    "headers": {
      "Accept": "application/json",
      "X-CMC_PRO_API_KEY": API_KEY
    },
    "muteHttpExceptions": true,
    "validateHttpsCertificates": true
  };
  const response = UrlFetchApp.fetch(url, options);
  const response_json = JSON.parse(response.getContentText());
  
  let prices = {};
  
  for (const symbol of symbols) {
    prices[symbol] = response_json.data[symbol].quote[CURRENCY].price;
  }
  return prices;
}

/**
 * Collect all the formulas in the current sheet, retrieve the prices and update the formulas
 */
function update_coin_market_call_prices() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const range = sheet.getDataRange();
  const formulas = range.getFormulas();
  const num_cols = range.getNumColumns();
  const num_rows = range.getNumRows();
  
  let symbol_positions = {};
  let symbols = [];
  
  for (let row = 0; row < num_rows ; row++) {
    for (let col = 0; col < num_cols; col++) {
      
      var formula = formulas[row][col];
      if (formula && formula.indexOf("CMCPRICE") > -1) {
        let value = formula.slice(formula.indexOf("CMCPRICE"));
        value = value.slice(value.indexOf("(") + 2, value.indexOf(")") - 1);
        
        if (!symbol_positions[value]) {
          symbol_positions[value] = []
        }
        symbol_positions[value].push([row, col]);
        
        if (symbols.indexOf(value) == -1) {
          symbols.push(value);
        }
      }
    }
  }
  
  const prices = _call_coin_market_call_prices(symbols);
  
  Object.keys(symbol_positions).forEach(function(symbol) {
    var position_list = symbol_positions[symbol];
    for (let i = 0; i < position_list.length; i++) {
      const row = position_list[i][0];
      const col = position_list[i][1];
      var cell = range.getCell(row + 1, col + 1);
      cell.setFormula("=CMCPRICE(\"" + symbol + "\", " + prices[symbol] + ")");
    }
  });
}

function onOpen(){
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("CoinMarketCap")
  .addItem("Update", "update_coin_market_call_prices")
  .addToUi();
}