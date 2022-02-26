const getDimension = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export default {
  async setDimension({ commit }, data) {
    commit('SET_DIMENSION', getDimension());
  },
};
