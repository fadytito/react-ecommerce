import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "./../firebase-config";

const useUser = () => {
  const [myUser, setMyUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setUser = useCallback(async ({ sub, nickname, picture }) => {
    setIsLoading(true);
    setError(null);
    try {
      const userInfo = {
        id: sub,
        name: nickname,
        picture,
        orders: [],
        bookmarks: [],
      };
      const userDocRef = doc(db, "users", sub);
      await setDoc(userDocRef, userInfo);
      const docSnap = await getDoc(userDocRef);
      const user = docSnap.data();
      setMyUser(user);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  const getMyUser = useCallback(
    async (userInfo) => {
      setIsLoading(true);
      setError(null);
      try {
        const userDocRef = doc(db, "users", userInfo.sub);
        await getDoc(userDocRef);
        const docSnap = await getDoc(userDocRef);
        const user = docSnap.data();
        setMyUser(user);
        setIsLoading(false);
        if (user) return;
        setUser(userInfo);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    },
    [setUser]
  );

  const updateMyUser = useCallback(
    async (prop) => {
      setIsLoading(true);
      setError(null);
      try {
        const userDocRef = doc(db, "users", myUser.id);
        await getDoc(userDocRef);
        await updateDoc(userDocRef, { [prop.name]: prop.value });
        const docSnap = await getDoc(userDocRef);
        const user = docSnap.data();
        setMyUser(user);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    },
    [myUser]
  );

  return { myUser, getMyUser, setUser, updateMyUser, isLoading, error };
};

export default useUser;
