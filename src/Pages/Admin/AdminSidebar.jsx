import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminSidebar = () => (
  <aside className="admin-sidebar">
    <ul>
      <li>
        <Link to="/book">Books</Link>
      </li>
      <li>
        <Link to="/order">Orders</Link>
      </li>
      <li>
        <Link to="/discount">Discounts</Link>
      </li>
      <li>
        <Link to="/anouncement">Announcements</Link>
      </li>
    </ul>
  </aside>
);

export default AdminSidebar;
