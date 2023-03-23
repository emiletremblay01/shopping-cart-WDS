import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import storeItems from "../data/storeItems.json";
import { ShoppingCartCard } from "./ShoppingCartCard";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
  isOpen: boolean;
};
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useContext(CartContext);
  let cartTotalPrice = 0;
  for (const cartItem of cartItems) {
    const item = storeItems.find((item) => item.id === cartItem.id);
    if (item) {
      cartTotalPrice += item.price * cartItem.quantity;
    }
  }
  return (
    <>
      {isOpen ? (
        <div className=" z-10 absolute bg-black bg-opacity-50 w-full h-full  ">
          <div className="absolute right-0 bg-white dark:bg-slate-500 dark:text-white h-full w-96">
            <button onClick={closeCart} className=" absolute right-0 p-6">
              <svg
                fill="#000000"
                height="12px"
                width="12px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 460.775 460.775"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>{" "}
                </g>
              </svg>
            </button>
            <div className="flex flex-col items-stretch py-14 px-4 gap-2">
              {cartItems.map((cartItem) => {
                return (
                  <ShoppingCartCard
                    id={cartItem.id}
                    quantity={cartItem.quantity}
                  />
                );
              })}
              <h5 className=" text-lg font-bold text-gray-900 dark:text-white text-right">
                Total : {formatCurrency(cartTotalPrice)}
              </h5>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
