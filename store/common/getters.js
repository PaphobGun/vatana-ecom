export default {
  isMobile(state) {
    return state.dimension.width > 600 ? false : true;
  },
  dimension(state) {
    return state.dimension;
  }
};
