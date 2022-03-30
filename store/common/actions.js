const getDimension = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export default {
  async setDimension({ commit }, data) {
    commit("SET_DIMENSION", getDimension());
  },
  async setIsShowCart({ commit }, _isShowCart) {
    commit("SET_IS_SHOW_CART", _isShowCart);
  },
};
