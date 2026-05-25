"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-orange-700 mb-8">
        🍽️ Restaurant POS System
      </h1>

      <p className="text-lg text-gray-700 mb-10 text-center max-w-md">
        Manage orders, track kitchen progress, and handle billing with ease.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/order" className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">📝 Order</h2>
          <p className="text-gray-600">Place customer orders by table.</p>
        </Link>

        <Link href="/kitchen" className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">👨‍🍳 Kitchen</h2>
          <p className="text-gray-600">View and update cooking progress.</p>
        </Link>

        <Link href="/billing" className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">💳 Billing</h2>
          <p className="text-gray-600">Calculate totals and print receipts.</p>
        </Link>
      </div>
    </div>
  );
}
