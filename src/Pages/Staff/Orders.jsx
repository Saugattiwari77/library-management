import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 5;
const initialOrders = [
  { id: 1, user: "Sita Sharma", books: ["Muna Madan"], status: "Pending", claimCode: "ABC123" },
  { id: 2, user: "Ram Bahadur", books: ["Palpasa Cafe"], status: "Completed", claimCode: "XYZ789" },
  { id: 3, user: "Alex Brown", books: ["Karnali Blues"], status: "Pending", claimCode: "LMN456" },
];

function StaffOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const paginated = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const navigate = useNavigate();

  const handleMarkPickedUp = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: "Completed" } : o));
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24 }}>
      <button onClick={() => navigate('/staff')} style={{ marginBottom: 16, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontWeight: 500 }}>← Back to Dashboard</button>
      <h2>Orders to Process</h2>
      <table style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Order ID</th><th>User</th><th>Books</th><th>Status</th><th>Claim Code</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 && (
            <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>No orders found.</td></tr>
          )}
          {paginated.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user}</td>
              <td>{order.books.join(", ")}</td>
              <td>{order.status}</td>
              <td>{order.claimCode}</td>
              <td>
                {order.status === "Pending" && <button onClick={() => handleMarkPickedUp(order.id)}>Mark as Picked Up</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages || 1}</span>
        <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default StaffOrders; 