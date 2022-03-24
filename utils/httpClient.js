import axios from "axios";
import qs from "qs";

const baseUrl = process.env.BASE_URL;

class HttpClient {
  static async call({ url, data, method, params }) {
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
      });

      res = res.data;
    } catch (err) {
      console.log(err);
    }

    return res;
  }
}

export default HttpClient;
