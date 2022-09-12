import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.coingecko.com/api/v3/coins/";

const useFetch = (url: string) => {
  const [isLoading, setLoading] = useState(false),
    [isError, setError] = useState(false),
    [result, setResult] = useState(null);

  const fetch = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setResult(response.data);
      setError(false);
    } catch (err) {
      setError(true);
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
