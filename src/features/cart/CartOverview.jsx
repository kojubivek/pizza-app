import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div
      className=" px-4 py-4
    bg-stone-800 text-sm text-stone-20 uppercase sm:px-6 md:text-base flex justify-between items-center "
    >
      <p className="font-semibold space-x-4 text-stone-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link className="font-semibold text-stone-300" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
