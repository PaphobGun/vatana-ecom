export default {
  SET_ACCESS_TOKEN(state, _access_token) {
    state.access_token = _access_token;
  },
  SET_REFRESH_TOKEN(state, _refresh_token) {
    state.refresh_token = _refresh_token;
  },
  SET_EMAIL_INPUT(state, _emailInput) {
    state.emailInput = _emailInput;
  },
};
