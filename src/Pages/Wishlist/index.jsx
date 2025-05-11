import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Bookcard from "../../Components/Card/Bookcard";
import "./index.css";

function Wishlist() {
  const wishlistItems = useSelector(state => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-wishlist">
        <h2>Your wishlist is empty</h2>
        <p>Looks like you haven't added any books to your wishlist yet.</p>
        <Link to="/" className="btn btn-primary">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlistItems.map((book) => (
          <Bookcard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
