'use client';
import dishes from '@/data/menuData';
import orders from '@/data/ordersData';
import { useState } from 'react';

export default function Orderpage() {
  const [table, setTable] = useState('')
  const [selectedDish, setSelectedDish] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tableOrder = orders.find(o => o.table === parseInt(table))
    if (tableOrder) {
      tableOrder.items.push({ dish: selectedDish, quantity, notes, status: "Pending"});
    } else {
          orders.push({
            table: parseInt(table),
            items: [{ dish: selectedDish, quantity, notes, status: "Pending"}]
          })
        }
        setSubmitted(true);
        setSelectedDish('');
        setQuantity(1);
        setNotes('');
  }

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
            <label className='block text-gray-700 font-medium mb-2'>Table Number</label>
            <input
            type='number'
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className='w-full border rounded-md p-2'
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

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Order
          </button>
        </form>
      )}
    </div>
  );
}
