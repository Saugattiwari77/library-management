import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import "./index.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleQuantityChange = (id, action) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = action === "increase" 
        ? item.quantity + 1 
        : Math.max(1, item.quantity - 1);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any books to your cart yet.</p>
        <Link to="/" className="btn btn-primary">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="item-details">
              <h3>{item.title}</h3>
              <p className="item-price">Rs {item.price}</p>
            </div>
            <div className="item-quantity">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.id, "decrease")}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.id, "increase")}
              >
                +
              </button>
            </div>
            <div className="item-total">
              Rs {item.price * item.quantity}
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>Rs {totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>Rs {totalAmount.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
