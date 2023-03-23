import { useContext, useEffect, useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartContext, CartProvider } from "../context/CartContext";
export type StoreCardProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export function StoreCard({ id, name, price, imgUrl }: StoreCardProps) {
  const {
    getItemQuantity,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItemFromCart,
  } = useContext(CartContext);

  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      {/* Image */}
      <div
        className=" bg-center h-52 aspect-square bg-cover rounded-t-lg"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>

      {/* Infos */}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {formatCurrency(price)}
        </p>

        {/* Buttons */}
        <div className="flex justify-center text-gray-700 dark:text-white">
          {getItemQuantity(id) === 0 ? (
            <button
              type="button"
              onClick={() => incrementItemQuantity(id)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              + Add to cart
            </button>
          ) : (
            <div className="flex flex-col gap-2 items-center ">
              <div className="flex font-normal gap-2  items-center">
                <button
                  type="button"
                  onClick={() => decrementItemQuantity(id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  aspect-square h-8  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  -
                </button>
                <p>{getItemQuantity(id)} in cart</p>
                <button
                  type="button"
                  onClick={() => incrementItemQuantity(id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm aspect-square h-8  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItemFromCart(id)}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
