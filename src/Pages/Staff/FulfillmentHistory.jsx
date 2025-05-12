import React from "react";
const FulfillmentHistory = ({ history }) => (
  <div className="fulfillment-history" style={{ marginTop: 32 }}>
    <h3 style={{ marginBottom: 12 }}>Order Fulfillment History</h3>
    {history.length === 0 ? (
      <div style={{ color: '#888', fontStyle: 'italic', margin: '1rem 0' }}>No fulfilled orders yet.</div>
    ) : (
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }} aria-label="Order Fulfillment History">
        <thead>
          <tr style={{ background: "#f8f8f8" }}>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Date</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Member</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Book</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Code</th>
            <th style={{ padding: 8, border: "1px solid #eee" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fafafa' : '#fff' }}>
              <td style={{ padding: 8, border: "1px solid #eee" }}>{h.date}</td>
              <td style={{ padding: 8, border: "1px solid #eee" }}>{h.member}</td>
              <td style={{ padding: 8, border: "1px solid #eee" }}>{h.book}</td>
              <td style={{ padding: 8, border: "1px solid #eee" }}>{h.code}</td>
              <td style={{ padding: 8, border: "1px solid #eee" }}>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
export default FulfillmentHistory; 