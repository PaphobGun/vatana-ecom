import HttpClient from "@/utils/httpClient";

export default {
  async createOrder(_, slip_url) {
    await HttpClient.call({
      url: "/order",
      method: "POST",
      data: {
        payment_provider_id: 1,
        slip_url,
      },
    });
  },
  async getOrders({ commit }) {
    const orders = await HttpClient.call({
      url: "/order",
      method: "GET",
    });

    commit("SET_ORDERS", orders);
  },
};
