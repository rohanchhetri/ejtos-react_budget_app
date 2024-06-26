// currencyUtils.js;
export const currencySymbols = {
  Dollar: "$",
  Pound: "£",
  Euro: "€",
  Rupees: "₹",
};

export const getCurrencySymbol = (currency) => {
  return currencySymbols[currency] || "";
};

// currencyUtils.js

// export const currencySymbols = {
//   USD: { symbol: "$", text: "Dollar" },
//   GBP: { symbol: "£", text: "Pound" },
//   EUR: { symbol: "€", text: "Euro" },
//   NPR: { symbol: "₹", text: "Rupees" },
//   // Add more currencies as needed
// };

// export const getCurrencySymbol = (currency) => {
//   return currencySymbols[currency] || { symbol: "", text: "" };
// };
