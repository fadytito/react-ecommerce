import axios from "axios";
import { useCallback, useState } from "react";

const useFetch = (initialValue = []) => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, config, callBack) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios(url, config);

      if (!callBack) {
        setData(data);
        return;
      }
      setData(callBack(data));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  //   const fetchData = useCallback(async (url, config, callBack) => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       setTimeout(() => {
  //         if (!callBack) {
  //           setData(tempProducts);
  //           return;
  //         }
  //         setData(callBack(tempProducts));
  //       }, 1000);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   }, []);

  return { data, setData, isLoading, error, fetchData };
};

export default useFetch;
