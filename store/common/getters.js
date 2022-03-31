export default {
  isMobile(state) {
    return state.dimension.width > 600 ? false : true;
  },
  isTablet(state) {
    return state.dimension.width > 481 && state.dimension.width < 768
      ? true
      : false;
  },
  dimension(state) {
    return state.dimension;
  },
  isShowCart(state) {
    return state.isShowCart;
  },
};
