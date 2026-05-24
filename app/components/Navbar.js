import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 gap-6">
      <Link href="/" className="hover:text-orange-400">
        Home
      </Link>
      <Link href="/menu" className="hover:text-orange-400">
        Menu
      </Link>
      <Link href="/order" className="hover:text-orange-400">
        Order
      </Link>
      <Link href="/kitchen" className="hover:text-orange-400">
        Kitchen
      </Link>
      <Link href="/billing" className="hover:text-orange-400">
        Billings
      </Link>
    </nav>
  );
}
