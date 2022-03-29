export default {
  SET_COLLECTIONS(state, _collections) {
    state.collections = _collections;
  },
  SET_CATEGORIES(state, _categories) {
    state.categories = _categories;
  },
  SET_PRODUCTS(state, _products) {
    state.products = _products;
  },
  SET_SIZES(state, _sizes) {
    state.sizes = _sizes;
  },
  SET_COLORS(state, _colors) {
    state.colors = _colors;
  },
  SET_PRODUCTS_COUNT(state, _totalItems) {
    state.totalItems = _totalItems;
  },
  SET_PRICE_FILTER(state, _priceFilter) {
    state.priceFilter = _priceFilter;
  },
};
