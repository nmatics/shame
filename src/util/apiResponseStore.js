export default {
  set: (symbol, data) => {
    localStorage.setItem(symbol.toLowerCase(), JSON.stringify(data));
  },

  get: (symbol) => {
    return JSON.parse(localStorage.getItem(symbol.toLowerCase()));
  },

  has: (symbol) => {
    return !!localStorage.getItem(symbol.toLowerCase());
  },
};
