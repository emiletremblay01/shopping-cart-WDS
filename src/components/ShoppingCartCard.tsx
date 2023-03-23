import { StoreCardProps } from "./StoreCard";
import storeItems from "../data/storeItems.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
type ShoppingCartCardProps = {
  id: number;
  quantity: number;
};
export function ShoppingCartCard({ id, quantity }: ShoppingCartCardProps) {
  const item = storeItems.find((item) => item.id === id);
  const { removeItemFromCart } = useContext(CartContext);
  return (
    <>
      {item != undefined ? (
        <div className="w-full grid grid-flow-col auto-cols-auto bg-slate-50 border-slate-200 border dark:bg-slate-700 dark:border-slate-400 p-2 rounded-md shadow-sm">
          <div className="flex items-center justify-start gap-2">
            {/* Image */}
            <div
              className=" bg-center h-24 aspect-square bg-cover rounded-md"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            {/* Infos */}
            <div className="">
              <h5 className=" text-lg font-bold text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {formatCurrency(item.price)}
              </p>
              <p>x {quantity}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            {/* Total */}
            <div>{formatCurrency(item.price * quantity)}</div>
            {/* Remove button */}

            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => removeItemFromCart(id)}
            >
              <svg
                fill="white"
                height="10px"
                width="10px"
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
          </div>
        </div>
      ) : null}
    </>
  );
}
