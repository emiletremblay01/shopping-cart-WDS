import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactSwitch from "react-switch";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "./ShoppingCart";

type themeProps = "light" | "dark";
export function Navbar() {
  const [theme, setTheme] = useState<themeProps>("light");
  function toggleTheme() {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }
  useEffect(() => {
    localStorage.theme = theme;
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const { openCart, closeCart, getTotalItemsInCart, cartItems } =
    useContext(CartContext);

  return (
    <>
      <nav className="w-full bg-slate-200 dark:bg-slate-800 dark:text-white flex justify-between items-center px-8 py-4">
        <div className="mr-6">
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>

        <div className=" flex  gap-20">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/store">Store</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        <button
          onClick={openCart}
          className="relative bg-teal-500 rounded-full p-3 hover:bg-teal-900"
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 -2.55 20.095 20.095"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Path_13"
              data-name="Path 13"
              d="M437.249,829.36a1.874,1.874,0,0,0,1.72,1.633H447.1c.9,0,1.24-.72,1.626-1.633l1.93-4.382H440l-.136-.964h12.2l-2.262,5.346c-.678,1.556-1.213,2.66-2.709,2.66h-8.128a2.664,2.664,0,0,1-2.71-2.66l-.8-7.36h-3.484v-1h4.406Zm1.225,3.64a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,438.474,833Zm-.531,1.969h1V834h-1ZM446.474,833a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,446.474,833Zm-.531,1.969h1V834h-1Z"
              transform="translate(-431.973 -821)"
              fill="white"
            />
          </svg>
          {getTotalItemsInCart === 0 ? null : (
            <div className=" text-white absolute right-0 bg-red-500 px-2 rounded-full">
              {getTotalItemsInCart}
            </div>
          )}
        </button>
      </nav>
    </>
  );
}
