import HttpClient from "../../utils/httpClient";

export default {
  async getHomepage({ commit }, data) {
    const homepage = await HttpClient.call({
      url: "/homepage",
      method: "GET",
      data,
    });

    commit("SET_HOMEPAGE", homepage.data);

    return homepage.data;
  },
};
