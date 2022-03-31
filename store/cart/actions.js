import HttpClient from "../../utils/httpClient";

export default {
  async getCartItems({ commit }) {
    const cart = await HttpClient.call({
      url: "/cart",
      method: "GET",
    });

    commit("SET_CART_ITEMS", cart?.data);
    commit("SET_TOTAL_PRICE", cart?.total_price);
    commit("SET_TOTAL_AMOUNT", cart?.total_amount);
  },
  async addCartItem(_, { amount, product_id, size_id, color_id }) {
    await HttpClient.call({
      url: "/cart",
      method: "POST",
      data: {
        amount,
        product_id,
        size_id,
        color_id,
      },
    });
  },
  async updateCartItem(_, { amount, product_id, size_id, color_id, id }) {
    await HttpClient.call({
      url: `/cart/${id}`,
      method: "PUT",
      data: {
        amount,
        product_id,
        size_id,
        color_id,
      },
    });
  },
  async deleteCartItem(_, id) {
    await HttpClient.call({
      url: `/cart/${id}`,
      method: "DELETE",
    });
  },
};
