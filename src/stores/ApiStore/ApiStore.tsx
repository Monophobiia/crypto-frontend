import axios from "axios";

type RequestProps = {
  currency: string;
  page: number;
}

type SearchProps = {
  searchString: any;
}

export default class ApiStore {
  baseClientUrl = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
  });

  async Request({ currency, page }: RequestProps) {
    const finalPage = page * 50;
    const result = await this.baseClientUrl.get(
      `coins/markets?vs_currency=${currency}&per_page=${finalPage}&page=${page}`
    );

    return result.data;
  }

  async Search({ searchString }: SearchProps) {
    const result = await this.baseClientUrl.get(`search?query=${searchString}`);

    return result.data.coins;
  }
}
