import HttpClient from "../../utils/httpClient";

export default {
  async getCollections({ commit }) {
    const collections = await HttpClient.call({
      url: "/collections",
      method: "GET",
    });

    commit("SET_COLLECTIONS", collections.data);
  },
  async getCategories({ commit }) {
    const categories = await HttpClient.call({
      url: "/category",
      method: "GET",
    });

    commit("SET_CATEGORIES", categories.data);
  },
  async getProducts({ commit }, data) {
    const products = await HttpClient.call({
      url: "/products",
      method: "POST",
      data,
    });

    commit("SET_PRODUCTS", products.data);
    commit("SET_PRODUCTS_COUNT", products.total_items);
  },
};
