import React, { useState } from "react";
import "./AdminDashboard.css";

const PAGE_SIZE = 5;
const initialOrders = [
  { id: 101, user: "John Doe", status: "Pending", canCancel: true },
  { id: 102, user: "Jane Smith", status: "Completed", canCancel: false },
  { id: 103, user: "Alex Brown", status: "Pending", canCancel: true },
  { id: 104, user: "Emily Clark", status: "Cancelled", canCancel: false },
  { id: 105, user: "Sam Lee", status: "Pending", canCancel: true },
  { id: 106, user: "Maria Garcia", status: "Completed", canCancel: false },
];

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ open: false, order: null });

  let filtered = orders.filter(
    o =>
      (o.user.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toString().includes(search)) &&
      (!statusFilter || o.status === statusFilter)
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleMarkPickedUp = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: "Completed", canCancel: false } : o));
  };
  const handleCancel = (id) => {
    if (window.confirm("Cancel this order?")) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: "Cancelled", canCancel: false } : o));
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };
  const openEdit = (order) => setModal({ open: true, order });
  const closeModal = () => setModal({ open: false, order: null });
  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      ...modal.order,
      user: form.user.value,
      status: form.status.value,
    };
    setOrders(orders.map(o => o.id === updated.id ? updated : o));
    closeModal();
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          className="admin-search"
          type="text"
          placeholder="Search by user/order ID..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} style={{ padding: '0.5rem', borderRadius: 4 }}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th><th>User</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No orders found.</td></tr>
          )}
          {paginated.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "Pending" && <button onClick={() => handleMarkPickedUp(order.id)}>Mark as Picked Up</button>}
                {order.canCancel && <button onClick={() => handleCancel(order.id)}>Cancel</button>}
                <button onClick={() => openEdit(order)}>Edit</button>
                <button onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages || 1}</span>
        <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {/* Modal for Edit */}
      {modal.open && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form className="admin-form" style={{ minWidth: 320, position: 'relative' }} onSubmit={handleEdit}>
            <h3 style={{ marginBottom: 16 }}>Edit Order</h3>
            <label>User</label>
            <input name="user" defaultValue={modal.order?.user || ""} required />
            <label>Status</label>
            <select name="status" defaultValue={modal.order?.status || "Pending"} required>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" onClick={closeModal} style={{ background: '#aaa' }}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Orders; 