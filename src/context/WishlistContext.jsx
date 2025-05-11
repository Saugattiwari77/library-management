import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (book) => {
    setWishlist((prevWishlist) => {
      // Check if book already exists in wishlist
      const exists = prevWishlist.some((item) => item.id === book.id);
      if (!exists) {
        // If book doesn't exist, add it to the wishlist
        return [...prevWishlist, book];
      }
      // If book exists, return the previous wishlist unchanged
      return prevWishlist;
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((prevWishlist) => 
      prevWishlist.filter((book) => book.id !== bookId)
    );
  };

  const isInWishlist = (bookId) => {
    return wishlist.some((book) => book.id === bookId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}; 