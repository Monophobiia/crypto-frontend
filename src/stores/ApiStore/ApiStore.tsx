import axios from "axios";

export default class ApiStore {
  baseClientUrl = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
  });

  async Request({ currency, page }) {
    const finalPage = page * 50;
    const result = await this.baseClientUrl.get(
      `coins/markets?vs_currency=${currency}&per_page=${finalPage}&page=${page}`
    );

    return result.data;
  }

  async Search({ searchString }) {
    const result = await this.baseClientUrl.get(`search?query=${searchString}`);

    return result.data.coins;
  }
}
