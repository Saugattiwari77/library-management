import React, { useState } from "react";
import "./AdminDashboard.css";

const PAGE_SIZE = 5;
const initialDiscounts = [
  { id: 1, name: "5% for 5+ Books", percent: 5, onSale: true },
  { id: 2, name: "10% after 10 Orders", percent: 10, onSale: false },
];

function Discounts() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ open: false, mode: "add", discount: null });

  let filtered = discounts.filter(
    d =>
      d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => setModal({ open: true, mode: "add", discount: null });
  const openEdit = (discount) => setModal({ open: true, mode: "edit", discount });
  const closeModal = () => setModal({ open: false, mode: "add", discount: null });

  const handleAddEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newDiscount = {
      id: modal.mode === "edit" ? modal.discount.id : Date.now(),
      name: form.name.value,
      percent: Number(form.percent.value),
      onSale: form.onSale.checked,
    };
    if (modal.mode === "add") {
      setDiscounts([newDiscount, ...discounts]);
    } else {
      setDiscounts(discounts.map(d => d.id === newDiscount.id ? newDiscount : d));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this discount?")) {
      setDiscounts(discounts.filter(d => d.id !== id));
    }
  };
  const handleToggleSale = (id) => {
    setDiscounts(discounts.map(d => d.id === id ? { ...d, onSale: !d.onSale } : d));
  };

  return (
    <div>
      <h2>Manage Discounts</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={openAdd} style={{ background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, padding: '0.6rem 1.2rem', fontWeight: 500 }}>Add Discount</button>
        <input
          className="admin-search"
          type="text"
          placeholder="Search discounts..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th><th>Percent</th><th>On Sale</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No discounts found.</td></tr>
          )}
          {paginated.map(discount => (
            <tr key={discount.id}>
              <td>{discount.name}</td>
              <td>{discount.percent}%</td>
              <td>
                <button onClick={() => handleToggleSale(discount.id)} style={{ background: 'none', color: discount.onSale ? '#4caf50' : '#aaa', fontSize: 20, border: 'none', cursor: 'pointer' }} title="Toggle On Sale">
                  {discount.onSale ? '✔️' : '❌'}
                </button>
              </td>
              <td>
                <button onClick={() => openEdit(discount)}>Edit</button>
                <button onClick={() => handleDelete(discount.id)}>Delete</button>
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
      {/* Modal for Add/Edit */}
      {modal.open && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form className="admin-form" style={{ minWidth: 320, position: 'relative' }} onSubmit={handleAddEdit}>
            <h3 style={{ marginBottom: 16 }}>{modal.mode === "add" ? "Add Discount" : "Edit Discount"}</h3>
            <label>Name</label>
            <input name="name" defaultValue={modal.discount?.name || ""} required />
            <label>Percent</label>
            <input name="percent" type="number" min={0} max={100} defaultValue={modal.discount?.percent || 0} required />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input name="onSale" type="checkbox" defaultChecked={modal.discount?.onSale || false} />
              On Sale
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" onClick={closeModal} style={{ background: '#aaa' }}>Cancel</button>
              <button type="submit">{modal.mode === "add" ? "Add" : "Save"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Discounts; 