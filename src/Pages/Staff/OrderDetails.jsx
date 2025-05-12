import React from "react";
const OrderDetails = ({ order, onFulfill }) => (
  <div className="order-details" style={{ marginBottom: 32, padding: 16, border: "1px solid #eee", borderRadius: 8, background: "#f9f9f9" }}>
    <h3 style={{ marginBottom: 12 }}>Order Details</h3>
    <p><b>Order ID:</b> {order.id}</p>
    <p><b>Claim Code:</b> {order.code}</p>
    <p><b>Member Name:</b> {order.member}</p>
    <p><b>Membership ID:</b> {order.memberId}</p>
    <p><b>Books:</b> {order.books.join(", ")}</p>
    <p><b>Order Date:</b> {order.date}</p>
    <p><b>Status:</b> {order.status === "Pending" ? <span style={{ color: '#b00' }}>🔴 Pending</span> : <span style={{ color: '#28a745' }}>🟢 Fulfilled</span>}</p>
    {order.status === "Pending" ? (
      <button onClick={onFulfill} style={{ marginTop: 12, padding: "8px 16px", background: "#28a745", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>✔ Fulfill Order</button>
    ) : (
      <div className="confirmation" style={{ color: "#28a745", marginTop: 12 }}>Order is already fulfilled for member {order.member}.</div>
    )}
  </div>
);
export default OrderDetails; 