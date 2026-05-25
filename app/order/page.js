'use client';
import dishes from '@/data/menuData';
import orders from '@/data/ordersData';
import { useState } from 'react';
import Button from '../components/Button';

export default function Orderpage() {
  const [table, setTable] = useState('');
  const [selectedDish, setSelectedDish] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [currentItems, setCurrentItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const addItem = (e) => {
    e.preventDefault();
    if (!selectedDish) return;

    setCurrentItems([...currentItems, { dish: selectedDish, quantity, notes, status: 'Pending' }]);

    setSelectedDish('');
    setQuantity(1);
    setNotes('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!table || currentItems.length === 0) return;

    const tableOrder = orders.find((o) => o.table === parseInt(table));
    if (tableOrder) {
      tableOrder.items.push(...currentItems);
    } else {
      orders.push({
        table: parseInt(table),
        items: currentItems,
      });
    }

    setSubmitted(true);
    setTable('');
    setCurrentItems([]);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Place Your Order</h1>

      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-md">
          Order submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Table Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Table Number</label>
            <input
              type="number"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          {/* Dish Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Dish</label>
            <select
              value={selectedDish}
              onChange={(e) => setSelectedDish(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">-- Choose a dish --</option>
              {dishes.map((dish) => (
                <option key={dish.id} value={dish.name}>
                  {dish.name} ({dish.price})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Special Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-md p-2"
              rows="3"
              placeholder="Extra spicy, no onions, etc."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button onClick={addItem} variant="primary">
              Add Item
            </Button>
            <Button onClick={handleSubmit} variant="success" type="submit">
              Submit Order
            </Button>
          </div>
        </form>
      )}

      {/* Current Items Preview */}
      {currentItems.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-md mt-6">
          <h2 className="text-xl font-semibold mb-2">Current Order</h2>
          <ul className="divide-y divide-gray-300">
            {currentItems.map((item, i) => (
              <li key={i} className="flex justify-between py-2">
                <span>
                  {item.dish} x {item.quantity}
                </span>
                <span className="text-gray-500">{item.notes}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
