"use client";
import { useState } from "react";
import orders from "@/data/ordersData";
import dishes from "@/data/menuData";

export default function BillingPage() {
  const [selectedTable, setSelectedTable] = useState("");
  const [total, setTotal] = useState(null);

  const calculateBill = () => {
    const tableOrder = orders.find(
      (o) => o.table === parseInt(selectedTable)
    );
    if (!tableOrder) {
      setTotal(0);
      return;
    }

    const sum = tableOrder.items.reduce((acc, item) => {
      const dish = dishes.find((d) => d.name === item.dish);
      const price = dish
        ? parseInt(dish.price.replace("NPR ", ""))
        : 0;
      return acc + price * item.quantity;
    }, 0);

    setTotal(sum);
  };

  const payNow = () => {
    // Clear orders for this table
    const index = orders.findIndex(
      (o) => o.table === parseInt(selectedTable)
    );
    if (index !== -1) {
      orders.splice(index, 1); // remove table from ordersData
    }
    setTotal(null);
    setSelectedTable("");
    alert(`Payment successful for Table ${selectedTable}!`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Billing Page 💳
      </h1>

      <div className="space-y-4">
        {/* Table Selector */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Table
          </label>
          <input
            type="number"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Enter table number"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateBill}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Calculate Bill
        </button>

        {/* Bill Display */}
        {total !== null && (
          <div className="bg-gray-100 p-4 rounded-md mt-4 space-y-2">
            {total === 0 ? (
              <p className="text-red-600">
                No orders found for this table.
              </p>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-800">
                  Total Bill: NPR {total}
                </p>
                <button
                  onClick={payNow}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Pay Now
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
