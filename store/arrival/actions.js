import HttpClient from "../../utils/httpClient";

export default {
  async getArrival({ commit }) {
    const arrival = await HttpClient.call({
      url: "/arrival",
      method: "GET",
    });

    commit("SET_BANNER_IMG", arrival.image);
    commit("SET_PRODUCTS", arrival.data);
  },
};
