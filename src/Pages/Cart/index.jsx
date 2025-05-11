import React, { useState } from "react";
import { Trash2, ImageOff } from "lucide-react";
import "./index.css";

const CartDisplay = () => {
  // Mock data to replace Redux store
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Product 1",
      category: "Electronics",
      selling_price: 199.99,
      quantity: 2,
      image: "https://example.com/product1.jpg",
    },
    {
      id: "2",
      title: "Product 2",
      category: "Clothing",
      selling_price: 49.99,
      quantity: 1,
      image: "https://example.com/product2.jpg",
    },
    {
      id: "3",
      title: "Product 3",
      category: "Home Goods",
      selling_price: 79.99,
      quantity: 3,
      image: null,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  const shippingCharge = 0;

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.selling_price * item.quantity,
    0
  );

  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity =
            action === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = () => {
    alert(`Coupon code ${couponCode} applied!`);
    setCouponCode("");
  };

  const calculateTotal = () => {
    return totalAmount + shippingCharge;
  };

  const handleImageError = (e) => {
    const target = e.target;
    const container = target.parentElement;

    if (container) {
      const placeholder = document.createElement("div");
      placeholder.className = "broken-image-placeholder";

      const icon = document.createElement("div");
      icon.className =
        "flex justify-center items-center w-full h-full bg-gray-100";
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><line x1="2" y1="2" x2="22" y2="22"></line><path d="M10.41 10.41a2 2 0 1 1 3.18 3.18"></path><path d="M13.5 6.5 19 12l-5.5 5.5"></path><path d="M10.5 6.5 5 12l5.5 5.5"></path></svg>`;

      placeholder.appendChild(icon);

      target.remove();
      container.appendChild(placeholder);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty</p>
        <button onClick={() => (window.location.href = "/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  // Main Cart Render
  return (
    <div className="shopping-cart-container">
      <h1>Your Shopping Cart</h1>

      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <div className="product-header">Product</div>
            <div className="price-header">Price</div>
            <div className="quantity-header">Quantity</div>
            <div className="total-header">Total</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="product-info">
                <div className="product-image">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImageError}
                    />
                  )}
                  {!item.image && (
                    <div className="broken-image-placeholder">
                      <div className="flex justify-center items-center w-full h-full bg-gray-100">
                        <ImageOff size={24} className="text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="product-details">
                  <h3>{item.title}</h3>
                  <p>{item.category || "Product"}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <span className="remove-icon">
                      <Trash2 size={16} />
                    </span>{" "}
                    Remove
                  </button>
                </div>
              </div>

              <div className="price">RS{item.selling_price?.toFixed(2)}</div>

              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                >
                  +
                </button>
              </div>

              <div className="item-total">
                RS{(item.selling_price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="cart-actions">
            <button className="clear-cart" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button
              className="continue-shopping"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>RS{totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>RS{shippingCharge.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>RS{calculateTotal().toFixed(2)}</span>
          </div>

          <div className="coupon-section">
            <h3>Coupon Code</h3>
            <div className="coupon-input">
              <input
                type="text"
                placeholder="Enter coupon"
                value={couponCode}
                onChange={handleCouponChange}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>
          </div>

          <button
            className="checkout-btn"
            onClick={() => (window.location.href = "/checkout")}
          >
            Proceed to Checkout →
          </button>
          {/* 
          <div className="additional-info">
            <p>Free shipping on all orders over RS200</p>
            <p>30-day money-back guarantee</p>
            <p>Secure payments</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
