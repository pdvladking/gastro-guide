"use client";
import { useState } from "react";
import orders from "@/data/ordersData";
import dishes from "@/data/menuData";

export default function BillingPage() {
  const [selectedTable, setSelectedTable] = useState("");
  const [receipt, setReceipt] = useState(null);

  const calculateBill = () => {
    const tableOrder = orders.find(
      (o) => o.table === parseInt(selectedTable)
    );
    if (!tableOrder) {
      setReceipt(null);
      return;
    }

    const items = tableOrder.items.map((item) => {
      const dish = dishes.find((d) => d.name === item.dish);
      const price = dish ? parseInt(dish.price.replace("NPR ", "")) : 0;
      return {
        ...item,
        price,
        subtotal: price * item.quantity,
      };
    });

    const total = items.reduce((acc, i) => acc + i.subtotal, 0);

    setReceipt({ table: tableOrder.table, items, total });
  };

  const payNow = () => {
    const index = orders.findIndex(
      (o) => o.table === parseInt(selectedTable)
    );
    if (index !== -1) {
      orders.splice(index, 1);
    }
    setReceipt(null);
    setSelectedTable("");
    alert(`Payment successful for Table ${selectedTable}!`);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Billing Page 💳
      </h1>

      <div className="space-y-4">
        <input
          type="number"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder="Enter table number"
        />

        <button
          onClick={calculateBill}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Calculate Bill
        </button>

        {receipt && (
          <div className="bg-gray-100 p-4 rounded-md mt-4 space-y-3 print:block">
            <h2 className="text-xl font-semibold">
              Receipt for Table {receipt.table}
            </h2>
            <ul className="divide-y divide-gray-300">
              {receipt.items.map((item, i) => (
                <li key={i} className="flex justify-between py-2">
                  <span>
                    {item.dish} × {item.quantity}
                  </span>
                  <span>NPR {item.subtotal}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold text-gray-800 mt-2">
              Total: NPR {receipt.total}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={payNow}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Pay Now
              </button>
              <button
                onClick={printReceipt}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Print Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
