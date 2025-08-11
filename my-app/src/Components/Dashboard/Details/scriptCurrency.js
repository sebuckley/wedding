const fs = require("fs");
const fetch = require("node-fetch");

async function generateCurrencyList() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  const currencyMap = new Map();

  countries.forEach((country) => {
    if (!country.currencies) return;

    Object.entries(country.currencies).forEach(([code, data]) => {
      if (!currencyMap.has(code)) {
        currencyMap.set(code, {
          code: code,
          name: data.name,
          symbol: data.symbol || "",
          icon: country.cca2.toLowerCase(),
        });
      }
    });
  });

  const currencyList = Array.from(currencyMap.values());

  fs.writeFileSync("currencies.json", JSON.stringify(currencyList, null, 2));
  console.log("✅ currencies.json has been generated with", currencyList.length, "entries.");
}

generateCurrencyList().catch(console.error);