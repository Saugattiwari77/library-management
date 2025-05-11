import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import Bookcard from '../../Components/Card/Bookcard';
import './index.css';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/'}
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((book) => (
            <Bookcard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
