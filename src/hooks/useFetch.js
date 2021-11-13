import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "./../firebase-config";

const useFetch = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (config, callback) => {
    setIsLoading(true);
    setError(null);
    try {
      if (config) {
        const productDocRef = doc(db, "products", config.id);
        const docSnap = await getDoc(productDocRef);
        const product = docSnap.data();
        if (callback) {
          callback(product);
        } else {
          setData(product);
        }
      } else {
        const productsCollectionRef = collection(db, "products");
        const docsSnap = await getDocs(productsCollectionRef);
        const products = docsSnap.docs.map((doc) => doc.data());
        if (callback) {
          callback(products);
        } else {
          setData(products);
        }
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  return { data, setData, isLoading, error, fetchData };
};

export default useFetch;
