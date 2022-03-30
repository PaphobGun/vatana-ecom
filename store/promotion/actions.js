import HttpClient from "../../utils/httpClient";

export default {
  async getPromotion({ commit }) {
    const promotion = await HttpClient.call({
      url: "/promotion",
      method: "GET",
    });

    commit("SET_BANNER_IMG", promotion.image);
    commit("SET_PRODUCTS", promotion.data);
  },
};
