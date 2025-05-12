import React, { useState } from "react";
import OrderSearch from "./OrderSearch";
import OrderDetails from "./OrderDetails";
import FulfillmentHistory from "./FulfillmentHistory";
import { useNavigate } from "react-router-dom";

const STAFF_CREDENTIALS = { username: "staff001", password: "password123" };

const StaffDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([
    { date: "10 May", member: "Ram Karki", book: "HTML Basics", code: "XYZ123", status: "Fulfilled" },
    { date: "9 May", member: "Sita Sharma", book: "React Basics", code: "ABC999", status: "Fulfilled" },
  ]);

  const navigate = useNavigate();

  // Mock order data for demo
  const ORDERS = [
    {
      id: "#1001",
      code: "XYZ123",
      member: "Sita Sharma",
      memberId: "M1234",
      books: ["React Basics"],
      date: "11 May 2025",
      status: "Pending",
    },
    {
      id: "#1002",
      code: "ABC999",
      member: "Ram Karki",
      memberId: "M5678",
      books: ["HTML Basics"],
      date: "10 May 2025",
      status: "Fulfilled",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginForm.username === STAFF_CREDENTIALS.username &&
      loginForm.password === STAFF_CREDENTIALS.password
    ) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid staff username or password");
    }
  };

  const handleSearch = (query) => {
    setOrder(null);
    setError("");
    const found = ORDERS.find(
      o => o.code.toLowerCase() === query.toLowerCase() || o.memberId.toLowerCase() === query.toLowerCase()
    );
    if (found && found.status === "Pending") {
      setOrder(found);
    } else if (found && found.status !== "Pending") {
      setError("Order already fulfilled for this claim code/member ID.");
    } else {
      setError("Invalid claim code or member ID");
    }
  };

  const handleFulfill = () => {
    if (!order) return;
    setOrder({ ...order, status: "Fulfilled" });
    setHistory([
      { date: order.date, member: order.member, book: order.books.join(", "), code: order.code, status: "Fulfilled" },
      ...history,
    ]);
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 350, margin: "4rem auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
        <h2 style={{ marginBottom: 20 }}>Staff Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="staff-username">Username</label><br />
            <input id="staff-username" type="text" value={loginForm.username} onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))} style={{ width: "100%", padding: 8, marginTop: 4 }} required />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="staff-password">Password</label><br />
            <input id="staff-password" type="password" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} style={{ width: "100%", padding: 8, marginTop: 4 }} required />
          </div>
          {loginError && <div style={{ color: "#b00", marginBottom: 12 }}>{loginError}</div>}
          <button type="submit" style={{ width: "100%", padding: "10px 0", background: "#007bff", color: "#fff", border: "none", borderRadius: 4, fontWeight: 600 }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="staff-dashboard" style={{ maxWidth: 700, margin: "2rem auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 22 }}>Staff Dashboard</span>
        <span style={{ color: '#555' }}>Staff ID: {STAFF_CREDENTIALS.username}</span>
      </header>
      <OrderSearch onSearch={handleSearch} />
      <button onClick={() => navigate('/staff/orders')} style={{ marginBottom: 16, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontWeight: 500 }}>View All Orders</button>
      {error && <div style={{ color: "#b00", margin: "1rem 0" }}>{error}</div>}
      {order && <OrderDetails order={order} onFulfill={handleFulfill} />}
      <FulfillmentHistory history={history} />
    </div>
  );
};

export default StaffDashboard; 