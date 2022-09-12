import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import ApiStore from "stores/ApiStore";
import rootStore from "stores/RootStore";
import { GetCoinsListParams, ICoinsListStore, ListItem } from "./types";

type PrivateFields =
  | "_list"
  | "_page"
  | "_searchString"
  | "_currencies"
  | "_currency";

export default class CoinsListStore implements ICoinsListStore {
  private readonly _apiStore = new ApiStore();

  private _list: ListItem[] = [];
  private _page = rootStore.query.getParam("page")
    ? rootStore.query.getParam("page")
    : 1;
  private _searchString = rootStore.query.getParam("search");
  private _hasMore = true;
  private _currency = [{ key: "usd", value: "Market-USD" }];
  private _currencies = [
    { key: "usd", value: "Market-USD" },
    { key: "rub", value: "Market-RUB" },
    { key: "eur", value: "Market-EUR" },
  ];
  private _tab: string | undefined = "";

  /* Getters */
  get list(): ListItem[] {
    return this._list;
  }

  get searchString(): any {
    return this._searchString;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  get currency(): { key: string; value: string }[] {
    return this._currency;
  }

  get currencies(): { key: string; value: string }[] {
    return this._currencies;
  }

  constructor() {
    makeObservable<CoinsListStore, PrivateFields>(this, {
      _list: observable,
      _page: observable,
      _searchString: observable,
      _currency: observable,
      _currencies: observable,
      list: computed,
      GetCoinsList: action,
      setTab: action,
      setCurrency: action,
    });
  }

  dataNormalizer = (data: []) => {
    return data.map(
      (raw: {
        id: string;
        image: string;
        large: string;
        name: string;
        symbol: string;
        current_price: number;
        price_change_24h: number;
        price_change_percentage_24h: number;
      }) => ({
        id: raw.id,
        image: this._searchString ? raw.large : raw.image,
        title: raw.name,
        subtitle: raw.symbol,
        price: raw.current_price,
        priceChange: raw.price_change_24h,
        priceChangePercentage: raw.price_change_percentage_24h,
      })
    );
  };

  async GetCoinsList({ currency, page }: GetCoinsListParams): Promise<void> {
    //console.log("called getcoinslist", this._searchString, this._tab);
    const tab = this._tab;
    console.log(this._searchString && this._tab === "searchInput");
    const response =
      !this.searchString && tab !== "inputSearch"
        ? await this._apiStore.Request({
            currency: this._currency[0].key,
            page: page,
          })
        : await this._apiStore.Search({
            searchString: this._searchString,
          });

    if (this._searchString && this._tab === "searchInput")
      console.log(this.dataNormalizer(response));
    else console.log("wrong");

    if (response.length === 0) this._hasMore = false;

    runInAction(() => {
      this._list =
        this._searchString && this._tab === "searchInput"
          ? this.dataNormalizer(response)
          : this._list
              .concat(this.dataNormalizer(response))
              .reverse()
              /* Filtering duplicate ids, and removing all except new ones */
              .filter(
                (item, index, array) =>
                  array.findIndex((indexItem) => indexItem.id === item.id) ===
                  index
              )
              /* Reversing again to save initial order */
              .reverse()
              .filter((item) =>
                tab === "gainer"
                  ? item.priceChange > 0
                  : tab === "loser"
                  ? item.priceChange < 0
                  : item
              );
    });
  }

  /* Setters */
  setCurrency = (value: { key: string; value: string }[]) => {
    runInAction(() => {
      this._currency = value;
    });
    this.GetCoinsList({ currency: this._currency, page: this._page });
  };

  setClearList = () => {
    runInAction(() => {
      this._list = [];
    });
  };

  setTab = (tab: string | undefined) => {
    this._hasMore = true;
    this._tab = tab;
  };

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      this._searchString = search;
      this.GetCoinsList({ currency: this._currency, page: this._page });
    }
  );

  private readonly _qpReactionPage: IReactionDisposer = reaction(
    () => rootStore.query.getParam("page"),
    (page) => {
      this._page = page;
      this.GetCoinsList({ currency: this._currency, page: this._page });
    }
  );

  destroy(): void {
    this._qpReaction();
    this._qpReactionPage();
  }
}
