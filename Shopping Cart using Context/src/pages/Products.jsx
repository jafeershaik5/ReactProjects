import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};
export default function Products() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(STATUS.LOADING);
  const { cart, setCart, addToCart } = useCart();

  console.log(cart);
  useEffect(() => {
    async function getData() {
      try {
        setStatus("LOADING");
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw Error("Response is Not OK!");
        }
        const result = await response.json();
        setStatus("SUCCESS");
        setProducts(result.products);
      } catch (error) {
        setStatus("ERROR");
      }
    }
    getData();
  }, []);

  const handleAddToCart = (productList, id) => {
    addToCart(productList, id);
  };
  return (
    <>
      {status === "LOADING" && <div>Loading...</div>}
      {status === "ERROR" && <div>Error</div>}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products &&
            products.map(
              ({ id, title, thumbnail, price, rating }, _, products) => (
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
                        onClick={() => handleAddToCart(products, id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}
