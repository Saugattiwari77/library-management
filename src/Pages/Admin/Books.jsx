import React, { useState } from "react";
import "./AdminDashboard.css";

const genres = ["Poetry", "Novel", "History", "Science", "Children", "Other"];
const PAGE_SIZE = 5;

const initialBooks = [
  { id: 1, title: "Muna Madan", author: "Laxmi Prasad Devkota", genre: "Poetry", stock: 10, bookmarked: false },
  { id: 2, title: "Palpasa Cafe", author: "Narayan Wagle", genre: "Novel", stock: 5, bookmarked: false },
  { id: 3, title: "Karnali Blues", author: "Buddhisagar", genre: "Novel", stock: 8, bookmarked: false },
  { id: 4, title: "Seto Dharti", author: "Amar Neupane", genre: "Novel", stock: 7, bookmarked: false },
  { id: 5, title: "History of Nepal", author: "Baburam Acharya", genre: "History", stock: 3, bookmarked: false },
  { id: 6, title: "Science for Kids", author: "S. Sharma", genre: "Science", stock: 12, bookmarked: false },
];

function Books() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ open: false, mode: "add", book: null });

  // --- Filtering, Sorting, Pagination ---
  let filtered = books.filter(
    b =>
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())) &&
      (!genreFilter || b.genre === genreFilter)
  );
  filtered = filtered.sort((a, b) => {
    let v1 = a[sortBy], v2 = b[sortBy];
    if (typeof v1 === "string") v1 = v1.toLowerCase();
    if (typeof v2 === "string") v2 = v2.toLowerCase();
    if (v1 < v2) return sortDir === "asc" ? -1 : 1;
    if (v1 > v2) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // --- Handlers ---
  const openAdd = () => setModal({ open: true, mode: "add", book: null });
  const openEdit = (book) => setModal({ open: true, mode: "edit", book });
  const closeModal = () => setModal({ open: false, mode: "add", book: null });

  const handleAddEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newBook = {
      id: modal.mode === "edit" ? modal.book.id : Date.now(),
      title: form.title.value,
      author: form.author.value,
      genre: form.genre.value,
      stock: Number(form.stock.value),
      bookmarked: modal.mode === "edit" ? modal.book.bookmarked : false,
    };
    if (modal.mode === "add") {
      setBooks([newBook, ...books]);
    } else {
      setBooks(books.map(b => b.id === newBook.id ? newBook : b));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this book?")) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const handleBookmark = (id) => {
    setBooks(books.map(b => b.id === id ? { ...b, bookmarked: !b.bookmarked } : b));
  };

  // --- Render ---
  return (
    <div>
      <h2>Manage Books</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={openAdd} style={{ background: '#1a237e', color: '#fff', border: 'none', borderRadius: 4, padding: '0.6rem 1.2rem', fontWeight: 500 }}>Add Book</button>
        <input
          className="admin-search"
          type="text"
          placeholder="Search by title/author..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={genreFilter} onChange={e => { setGenreFilter(e.target.value); setPage(1); }} style={{ padding: '0.5rem', borderRadius: 4 }}>
          <option value="">All Genres</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '0.5rem', borderRadius: 4 }}>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="genre">Sort by Genre</option>
          <option value="stock">Sort by Stock</option>
        </select>
        <select value={sortDir} onChange={e => setSortDir(e.target.value)} style={{ padding: '0.5rem', borderRadius: 4 }}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Genre</th><th>Stock</th><th>Bookmark</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 && (
            <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>No books found.</td></tr>
          )}
          {paginated.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.stock}</td>
              <td>
                <button onClick={() => handleBookmark(book.id)} style={{ background: 'none', color: book.bookmarked ? '#ffeb3b' : '#aaa', fontSize: 20, border: 'none', cursor: 'pointer' }} title="Bookmark">
                  {book.bookmarked ? '★' : '☆'}
                </button>
              </td>
              <td>
                <button onClick={() => openEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
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
            <h3 style={{ marginBottom: 16 }}>{modal.mode === "add" ? "Add Book" : "Edit Book"}</h3>
            <label>Title</label>
            <input name="title" defaultValue={modal.book?.title || ""} required />
            <label>Author</label>
            <input name="author" defaultValue={modal.book?.author || ""} required />
            <label>Genre</label>
            <select name="genre" defaultValue={modal.book?.genre || genres[0]} required>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <label>Stock</label>
            <input name="stock" type="number" min={0} defaultValue={modal.book?.stock || 0} required />
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

export default Books; 