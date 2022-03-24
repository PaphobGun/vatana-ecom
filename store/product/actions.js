import HttpClient from "../../utils/httpClient";

export default {
  async getProduct({ commit }, productId) {
    const product = await HttpClient.call({
      url: `/product/${productId}`,
      method: "GET",
    });

    commit("SET_PRODUCT", product.data);

    return product.data;
  },
  async getRelatedProducts({ commit }) {
    const products = await HttpClient.call({
      url: "/product/relates",
      method: "GET",
    });

    commit("SET_RELATED_PRODUCT", products.data);

    return products.data;
  },
};
