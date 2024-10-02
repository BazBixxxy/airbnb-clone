import React, { useState, useEffect } from "react";

// Utility function to format currency
const formatCurrency = (amount, currencyCode, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

const CurrencyPage = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UGX");
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
      });
  }, []);

  const handleConvert = (e) => {
    e.preventDefault();
    if (rates[fromCurrency] && rates[toCurrency]) {
      // Calculate conversion
      const converted = (amount / rates[fromCurrency]) * rates[toCurrency];
      setConvertedAmount(formatCurrency(converted, toCurrency)); // Use the formatCurrency function here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Currency Converter</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <form className="space-y-4" onSubmit={handleConvert}>
          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Currency From */}
          <div>
            <label
              htmlFor="fromCurrency"
              className="block text-sm font-medium text-gray-700"
            >
              From Currency
            </label>
            <select
              id="fromCurrency"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
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

          {/* Currency To */}
          <div>
            <label
              htmlFor="toCurrency"
              className="block text-sm font-medium text-gray-700"
            >
              To Currency
            </label>
            <select
              id="toCurrency"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
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

          {/* Convert Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Convert
            </button>
          </div>
        </form>

        {/* Display Result */}
        {convertedAmount && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">
              {formatCurrency(amount, fromCurrency)} = {convertedAmount}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyPage;
