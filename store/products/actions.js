import HttpClient from "../../utils/httpClient";

export default {
  async getCollections({ commit }) {
    const collections = await HttpClient.call({
      url: "/collection",
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
  async getProducts({ commit }, params) {
    const products = await HttpClient.call({
      url: "/product",
      method: "GET",
      params: {
        page: params.page,
        sort: params.sort,
        category: params.criteria?.categories?.map((c) => c.id),
        collection: params.criteria?.collections?.map((c) => c.id),
        colors: params.criteria?.colors?.map((c) => c.uuid),
        minPrice: params.criteria?.minPrice,
        maxPrice: params.criteria?.maxPrice,
        size: params.criteria?.size?.map((s) => s.uuid),
      },
    });

    commit("SET_PRODUCTS", products.data);
    commit("SET_PRODUCTS_COUNT", products.total);
  },
};
