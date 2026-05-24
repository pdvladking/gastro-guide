'use client';
import { useState } from 'react';

export default function BillingPage() {
  const [orders] = useState([
    { id: 1, dish: 'Chicken Momo', quantity: 2, price: 250 },
    { id: 1, dish: 'Chicken Momo', quantity: 2, price: 250 },
    { id: 1, dish: 'Chicken Momo', quantity: 2, price: 250 },
  ]);

  const total = orders.reduce((sum, o) => sum + o.quantity * o.price, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Billing</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Dish</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="border p-2">{o.dish}</td>
              <td className="border p-2">{o.quantity}</td>
              <td className="border p-2">NPR{o.price}</td>
              <td className="border p-2">NPR{o.quantity * o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right font-bold text-xl">Total: NPR {total}</div>
    </div>
  );
}
