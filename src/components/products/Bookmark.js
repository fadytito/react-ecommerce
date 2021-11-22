import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../context/user-context";

const Bookmark = ({ productId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    location: { pathname },
  } = useHistory();

  const { myUser, toggleBookmark, error } = useUserContext();

  const { loginWithRedirect } = useAuth0();

  const toggleBookmarkHandler = () => {
    setIsBookmarked((b) => !b);
    toggleBookmark(productId);
  };

  useEffect(() => {
    if (!myUser) return;
    const bookmarked = myUser.bookmarks.find((b) => b === productId);
    if (bookmarked) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [myUser, productId, error]);

  return myUser ? (
    <button className="bookmark-btn" onClick={toggleBookmarkHandler}>
      {isBookmarked ? <FaHeart /> : <FaRegHeart />}
    </button>
  ) : (
    <button
      className="bookmark-btn"
      onClick={() => loginWithRedirect({ appState: { returnTo: pathname } })}
    >
      {isBookmarked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default Bookmark;
