'use client';
import orders from '@/data/ordersData';
import { useState } from 'react';

export default function KitchenPage() {
  const [tableOrders, setTableOrders] = useState([...orders]);

  const markAsDone = (tableNumber, index) => {
    setTableOrders((prev) =>
      prev.map((tableOrder) =>
        tableOrder.table === tableNumber
          ? {
              ...tableOrder,
              items: tableOrder.items.map((item, i) =>
                i === index ? { ...item, status: 'Completed' } : item
              ),
            }
          : tableOrder
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Kitchen Dashboard</h1>

      {tableOrders.length === 0 ? (
        <p className="text-gray-500">No pending orders.</p>
      ) : (
        <div className="space-y-6">
          {tableOrders.map((tableOrder) => (
            <div key={tableOrder.table} className="border rounded-md p-4 shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-2">Table {tableOrder.table}</h2>
              <ul className="space-y-2">
                {tableOrder.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                  >
                    <div>
                      <span className="font-medium">{item.dish}</span> x {item.quantity}
                      {item.notes && <span className="text-sm text-gray-500"> ({item.notes})</span>}
                      <p
                        className={`text-sm font-medium ${
                          item.status === 'Completed' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {item.status}
                      </p>
                    </div>
                    {item.status === 'Pending' && (
                      <button
                        onClick={() => markAsDone(tableOrder.table, index)}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      >
                        Mark Done
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
