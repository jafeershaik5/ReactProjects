import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useCart();
  // console.log(cart);
  const deleteFromCart = (id) => {
    const itemToDelete = cart.find((item) => item.id === id);
    console.log(itemToDelete);
    setCart((prev) => {
      const filteredItems = prev.filter((item) => item.id !== itemToDelete.id);
      return filteredItems;
    });
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cart &&
            cart.map(({ id, title, thumbnail, price, rating }) => (
              <div
                key={id}
                className="flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-300 h-full"
              >
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h1 className="text-lg font-semibold mb-2 line-clamp-2">
                    {title}
                  </h1>
                  <div className="mt-auto">
                    <p className="text-gray-500 text-sm mb-2">⭐ {rating}</p>
                    <p className="text-xl font-bold text-green-600 mb-4">
                      ${price}
                    </p>
                    <button
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                      onClick={() => deleteFromCart(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
