---
Introduction
---

This is a simple script that provides a formula to retrieve the price of a crypto and a menu with a button to update all the formulas at once.

To avoid hitting the CoinMarketCap free plan limits, adding each individual formula does not make a request, but instead displays a dummy text in the formula value.

When you have finished adding all the formulas, click the update button on the menu and a single request is made to retrieve all the prices and update the formulas.

---
Usage
---

Use this formula where you want to retrieve the price of a crypto.

```
=CMCPRICE("KUMA")
```

By default it displays a text before fetching the price from the API, if you are using it within a more complex formula and you don't want to trigger an error, you can add a temporary value, it will be updated later.

```
=CMCPRICE("KUMA", 1)
```

After placing all the formulas, just go to the menú and click on "CoinMarketCap" > "Update".

---
Installation
---

1. At the menu, navigate to "Extensions" > "Apps Script".
2. Set a name for the project, optionally you can also rename the script file.
3. Copy all the content of `Code.gs` and paste it on the script editor.
    1. If you already have other scripts with the `onOpen ()` function, copy the contents of the one of this script, remove the function, and paste it into the other one.
4. Put your CoinMarketCap API KEY in the `API_KEY` variable, if you don't have one, [get yours on their website](https://coinmarketcap.com/api/).
5. Save the project with the save button or with `CTRL + S` / `CMD + S`.
6. Come back to the sheet and refresh the page.
7. Place all the formulas you want.
8. Go to the menu and click on "CoinMarketCap" > "Update".
9. A pop-up appears asking for permission to run the script.
    1. Click on "Continue", then choose the Google account that created the sheet.
    2. Click on "Advance" at the bottom, then on "Go to PROJECT NAME (unsafe)" and finally on "Allow".
10. Go to the menu again and click on "CoinMarketCap" > "Update".
