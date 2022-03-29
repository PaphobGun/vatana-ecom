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
        limit: params.limit || 12,
        category: params.criteria?.categories?.map((c) => c.id),
        collection: params.criteria?.collections?.map((c) => c.id),
        color: params.criteria?.colors?.map((c) => c.id),
        minPrice: params.criteria?.minPrice,
        maxPrice: params.criteria?.maxPrice,
        size: params.criteria?.size?.map((s) => s.id),
      },
    });

    commit("SET_PRODUCTS", products.data);
    commit("SET_PRODUCTS_COUNT", products.total);
  },
  async getPriceFilter({ commit }) {
    const prices = await HttpClient.call({
      url: "/product/price",
      method: "GET",
    });

    commit("SET_PRICE_FILTER", [prices.min_price, prices.max_price]);
  },
  async getColors({ commit }) {
    const colors = await HttpClient.call({
      url: "/color",
      method: "GET",
    });

    commit("SET_COLORS", colors.data);
  },
  async getSizes({ commit }) {
    const sizes = await HttpClient.call({
      url: "/size",
      method: "GET",
    });

    commit("SET_SIZES", sizes.data);
  },
};
