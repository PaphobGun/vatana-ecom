export default {
  isLoggedIn(state) {
    return !!state.access_token;
  },
  emailInput(state) {
    return state.emailInput;
  },
};
