import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.coingecko.com/api/v3/coins/";

const useFetch = (url: string) => {
  const [isLoading, setLoading] = useState(false),
    [isError, setError] = useState(null),
    [result, setResult] = useState(null);

  const fetch = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(url);
  }, [url]);

  return { result, isError, isLoading };
};

export default useFetch;
