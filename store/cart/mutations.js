export default {
  SET_CART_ITEMS(state, _cartItems) {
    state.cartItems = _cartItems;
  },
  SET_TOTAL_PRICE(state, _totalPrice) {
    state.totalPrice = _totalPrice;
  },
  SET_TOTAL_AMOUNT(state, _totalAmount) {
    state.totalAmount = _totalAmount;
  },
};
