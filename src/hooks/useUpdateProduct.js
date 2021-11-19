import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase-config";

const useUpdateProduct = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = useCallback(async (id, updates, callback) => {
    setIsLoading(true);
    setError(null);
    try {
      const productDocRef = doc(db, "products", id);
      await updateDoc(productDocRef, { ...updates });
      const docSnap = await getDoc(productDocRef);
      const product = docSnap.data();
      if (callback) {
        callback(product);
      } else {
        setData(product);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading, error, updateData, setData };
};

export default useUpdateProduct;
