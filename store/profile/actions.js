import HttpClient from "../../utils/httpClient";

export default {
  async getAddress({ commit }) {
    const address = await HttpClient.call({
      url: "/address",
      method: "GET",
    });

    commit("SET_ADDRESS", address?.data);
  },
  async addAddress(
    _,
    {
      firstname,
      lastname,
      address_line,
      subdistrict,
      district,
      province,
      zipcode,
      phone,
    }
  ) {
    try {
      await HttpClient.call({
        url: "/address",
        method: "POST",
        data: {
          firstname,
          lastname,
          address_line,
          subdistrict,
          district,
          province,
          zipcode,
          phone,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  async editAddress(
    _,
    {
      firstname,
      lastname,
      address_line,
      subdistrict,
      district,
      province,
      zipcode,
      phone,
    }
  ) {
    try {
      await HttpClient.call({
        url: "/address",
        method: "PUT",
        data: {
          firstname,
          lastname,
          address_line,
          subdistrict,
          district,
          province,
          zipcode,
          phone,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
