import dishes from '@/data/menuData';
import Image from "next/image";

export default function MenuPage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <Image src={dish.image}
             alt={dish.name}
              width={400}
              height={250}
              className="w-full h-40 object-cover"
              />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{dish.name}</h2>
              <p className="text-gray-600">{dish.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
