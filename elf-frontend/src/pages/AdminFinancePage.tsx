import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminFinancePage() {
  const [payments, setPayments] = useState([]);

  const handleRetry = async (id: string) => {
    await axios.post(`http://localhost:3000/payments/retry/${id}`);
    alert("Retry initiated!");
    // Refresh list...
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Financial Oversight</h1>
      
      {/* Table of transactions */}
      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th>Ref</th>
            <th>Status</th>
            <th>Attempts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p: any) => (
            <tr key={p.id}>
              <td>{p.reference}</td>
              <td>{p.status}</td>
              <td>{p.attempts}/3</td>
              <td>
                {p.status === 'FAILED' && (
                  <button onClick={() => handleRetry(p.id)} className="bg-orange-500 text-white p-1">
                    Retry MTN/Airtel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}