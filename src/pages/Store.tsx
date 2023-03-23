import { StoreCard } from "../components/StoreCard";
import storeItems from "../data/storeItems.json";
export function Store() {
  return (
    <div className=" p-4 bg-white m-auto dark:bg-slate-700 w-full max-w-5xl flex gap-4 justify-evenly flex-wrap ">
      {storeItems.map((storeItem) => (
        <StoreCard
          id={storeItem.id}
          name={storeItem.name}
          price={storeItem.price}
          imgUrl={storeItem.image}
        />
      ))}
    </div>
  );
}
