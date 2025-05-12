import React, { useState } from "react";
import "./AdminDashboard.css";

const PAGE_SIZE = 5;
const initialAnnouncements = [
  { id: 1, message: "Library will be closed on Friday.", schedule: "2025-04-18T10:00" },
  { id: 2, message: "New books have arrived!", schedule: "2025-04-20T09:00" },
];

function Announcements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ open: false, mode: "add", announcement: null });

  let filtered = announcements.filter(
    a =>
      a.message.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => setModal({ open: true, mode: "add", announcement: null });
  const openEdit = (announcement) => setModal({ open: true, mode: "edit", announcement });
  const closeModal = () => setModal({ open: false, mode: "add", announcement: null });

  const handleAddEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAnnouncement = {
      id: modal.mode === "edit" ? modal.announcement.id : Date.now(),
      message: form.message.value,
      schedule: form.schedule.value,
    };
    if (modal.mode === "add") {
      setAnnouncements([newAnnouncement, ...announcements]);
    } else {
      setAnnouncements(announcements.map(a => a.id === newAnnouncement.id ? newAnnouncement : a));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this announcement?")) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  return (
    <div>
      <h2>Manage Announcements</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={openAdd} style={{ background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, padding: '0.6rem 1.2rem', fontWeight: 500 }}>Add Announcement</button>
        <input
          className="admin-search"
          type="text"
          placeholder="Search announcements..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Message</th><th>Schedule</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 && (
            <tr><td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>No announcements found.</td></tr>
          )}
          {paginated.map(announcement => (
            <tr key={announcement.id}>
              <td>{announcement.message}</td>
              <td>{announcement.schedule.replace('T', ' ')}</td>
              <td>
                <button onClick={() => openEdit(announcement)}>Edit</button>
                <button onClick={() => handleDelete(announcement.id)}>Delete</button>
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
            <h3 style={{ marginBottom: 16 }}>{modal.mode === "add" ? "Add Announcement" : "Edit Announcement"}</h3>
            <label>Message</label>
            <textarea name="message" defaultValue={modal.announcement?.message || ""} rows={3} required />
            <label>Schedule Date/Time</label>
            <input name="schedule" type="datetime-local" defaultValue={modal.announcement?.schedule || ""} required />
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

export default Announcements; 