import React, { useState, useEffect } from "react";

// Utility function to format currency
const formatCurrency = (amount, currencyCode, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

const NewCurrencyPage = () => {
  // Predefined price and currency
  const price = 8000;
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetching exchange rates from the API (using USD as base currency)
    fetch(
      "https://v6.exchangerate-api.com/v6/0fc071439035f114eabed8ca/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => {
        setRates(data.conversion_rates);
        setConvertedAmount(formatCurrency(price, "USD"));
      });
  }, []);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);

    if (rates["USD"] && rates[newCurrency]) {
      const converted = (price / rates["USD"]) * rates[newCurrency];
      setConvertedAmount(formatCurrency(converted, newCurrency));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Currency Converter</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="space-y-4">
          {/* Display original price */}
          <div>
            <h2 className="text-lg font-bold">
              Price: {formatCurrency(price, "USD")}
            </h2>
          </div>

          {/* Currency To */}
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Select Currency
            </label>
            <select
              id="currency"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={currency}
              onChange={handleCurrencyChange}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="UGX">UGX - Ugandan Shilling</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="RWF">RWF - Rwandan Franc</option>
              <option value="TZS">TZS - Tanzanian Shilling</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>

          {/* Display Result */}
          {convertedAmount && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">
                Converted: {convertedAmount}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCurrencyPage;
