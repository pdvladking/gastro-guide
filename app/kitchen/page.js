"use client";
import { useState } from "react";

export default function KitchenPage() {
  // Mock orders (later replace with API call)
  const [orders, setOrders] = useState([
    { id: 1, dish: "Chicken Momo", quantity: 2, notes: "Extra spicy", status: "Pending" },
    { id: 2, dish: "Margherita Pizza", quantity: 1, notes: "No cheese", status: "Pending" },
    { id: 3, dish: "Buff Sukuti", quantity: 3, notes: "Well done", status: "Pending" },
  ]);

  const markAsDone = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Kitchen Dashboard 👨‍🍳</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No pending orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{order.dish}</h2>
                <p className="text-gray-600">Qty: {order.quantity}</p>
                <p className="text-gray-500 italic">Notes: {order.notes}</p>
                <p
                  className={`mt-1 font-medium ${
                    order.status === "Completed" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.status}
                </p>
              </div>
              {order.status === "Pending" && (
                <button
                  onClick={() => markAsDone(order.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                >
                  Mark Done
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
