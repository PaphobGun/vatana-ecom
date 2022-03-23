export default {
  SET_HOMEPAGE(state, _homepage) {
    state.banner = _homepage.banner;
    state.category = _homepage.category;
    state.featuredProduct = _homepage.featuredProduct;
    state.salesProduct = _homepage.salesProduct;
    state.lookbook = _homepage.lookbook;
  },
};
