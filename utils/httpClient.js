import axios from "axios";

const baseUrl = process.env.BASE_URL;

class HttpClient {
  static async call({ url, data, method }) {
    let res;
    try {
      res = await axios({
        baseURL: baseUrl,
        url,
        method,
        data,
      });

      res = res.data;
    } catch (err) {
      console.log(err);
    }

    return res;
  }
}

export default HttpClient;
