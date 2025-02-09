import React from "react";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

function Navbar() {
  const { cart } = useCart();
  console.log("From navbar", cart);
  return (
    <>
      <div className="flex justify-around p-4 bg-lime-300">
        <div>LOGO</div>
        <div>
          <ul className="flex justify-around gap-8">
            <li className="">
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Products
              </NavLink>
            </li>
            <li className="relative">
              <NavLink to="/cart" className="relative flex items-center">
                <FiShoppingCart className="text-2xl text-gray-700 hover:text-gray-900 transition" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
