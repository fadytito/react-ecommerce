import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const { user } = useAuth0();

  const { myUser, getMyUser, updateMyUser, isLoading, error } = useUser();

  const [orders, setOrders] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user) return;
    getMyUser(user);
  }, [user, getMyUser]);

  useEffect(() => {
    if (!myUser) return;
    const { orders, bookmarks } = myUser;
    setOrders(orders);
    setBookmarks(bookmarks);
  }, [myUser]);

  const addOrder = useCallback(
    (items) => {
      updateMyUser({
        name: "orders",
        value: [
          {
            id: new Date().valueOf(),
            items,
            date: new Date().toLocaleDateString(),
          },
          ...orders,
        ],
      });
    },
    [updateMyUser, orders]
  );

  const toggleBookmark = useCallback(
    (item) => {
      const bookmarked = bookmarks.find((b) => b === item);
      let updatedBookmarks;
      if (bookmarked) {
        updatedBookmarks = bookmarks.filter((b) => b !== bookmarked);
      } else {
        updatedBookmarks = [item, ...bookmarks];
      }
      updateMyUser({
        name: "bookmarks",
        value: updatedBookmarks,
      });
    },
    [updateMyUser, bookmarks]
  );

  return (
    <UserContext.Provider
      value={{
        myUser,
        orders,
        bookmarks,
        addOrder,
        toggleBookmark,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };

