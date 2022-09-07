export type GetCoinsListParams = {
  currency: Array<{ key: string; value: string }>;
  page: number;
  tab: string;
};

export type ListItem = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
};

export interface ICoinsListStore {
  GetCoinsList(params: GetCoinsListParams): Promise<void>;
}
