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
  SET_PRODUCTS_COUNT(state, _totalItems) {
    state.totalItems = _totalItems;
  },
};
