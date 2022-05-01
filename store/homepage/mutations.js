export default {
  SET_HOMEPAGE(state, _homepage) {
    console.log(_homepage);
    state.banner = _homepage.collections;
    state.category = _homepage.categories;
    state.featuredProduct = _homepage.features;
    state.salesProduct = _homepage.sales;
    state.lookbook = _homepage.lookbooks;
  },
};
