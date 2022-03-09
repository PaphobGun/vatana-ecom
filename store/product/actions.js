import HttpClient from "../../utils/httpClient";

export default {
  async getProduct({ commit }, data) {
    const products = await HttpClient.call({
      url: "/product",
      method: "POST",
      data,
    });

    commit("SET_PRODUCT", products.data);

    return products.data
  },
  async getRelatedProducts({ commit }, data) {
    const products = await HttpClient.call({
      url: "/relatedProducts",
      method: "POST",
      data: {
        id: data,
        perPage: '3'
      },
    });
    
    commit("SET_RELATED_PRODUCT", products.data);

    return products.data
  },
};
