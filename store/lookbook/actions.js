import HttpClient from "../../utils/httpClient";

export default {
  async getLookbooksPage({ commit }) {
    const lookbooksPage = await HttpClient.call({
      url: "/lookbook",
      method: "GET",
    });

    commit("SET_LOOKBOOK_PAGE", lookbooksPage?.data);
  },
  async getLookbooks({ commit }, id) {
    const lookbooks = await HttpClient.call({
      url: `/lookbook/${id}`,
      method: "GET",
    });

    commit("SET_LOOKBOOKS", lookbooks?.data);
  },
};
