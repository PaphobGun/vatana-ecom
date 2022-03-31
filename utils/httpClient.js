import axios from "axios";
import qs from "qs";

const baseUrl = process.env.BASE_URL;

class HttpClient {
  static async call({ url, data, method, params }) {
    let parsed_token = "";

    if (process.browser) {
      const vuexLocal = window.localStorage.getItem("vuex");
      if (vuexLocal) {
        const parsed_store = JSON.parse(vuexLocal);
        if (parsed_store && parsed_store.auth) {
          parsed_token = parsed_store.auth.access_token;
        }
      }
    }

    let res;
    try {
      res = await axios({
        baseURL: baseUrl,
        url,
        method,
        data,
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsed_token}`,
        },
      });

      res = res.data;
    } catch (err) {
      console.log(err);
    }

    return res;
  }
}

export default HttpClient;
