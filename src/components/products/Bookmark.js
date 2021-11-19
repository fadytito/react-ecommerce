import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUserContext } from "../../context/user-context";

const Bookmark = ({ productId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { myUser, toggleBookmark } = useUserContext();

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
  }, [myUser, productId]);

  return (
    <button className="bookmark-btn" onClick={toggleBookmarkHandler}>
      {isBookmarked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default Bookmark;
