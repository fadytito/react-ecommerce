import { useCallback, useState } from "react";
import tempProducts from "../db/products.json";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchData = useCallback(async (url, config, callback) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const { data } = await axios(url, config);
  //     if (callback) {
  //       callback(data);
  //     } else {
  //       setData(data);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  const fetchData = useCallback(async (url, config, callback) => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        if (callback) {
          callback(tempProducts);
        } else {
          setData(tempProducts);
        }
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return { data, setData, isLoading, error, fetchData };
};

export default useFetch;
