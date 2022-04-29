import HttpClient from "../../utils/httpClient";

export default {
  async getFavourites({ commit }) {
    try {
      const favourites = await HttpClient.call({
        url: "/favorite",
        method: "GET",
      });

      commit("SET_FAVOURITES", favourites.data);

      return favourites.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async addFavourite(ctx, product_id) {
    try {
      await HttpClient.call({
        url: "/favorite",
        method: "POST",
        data: { product_id },
      });
    } catch (err) {
      console.error(err);
    }
  },
  async removeFavourite(ctx, product_id) {
    try {
      await HttpClient.call({
        url: `/favorite/${product_id}`,
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  },
};
