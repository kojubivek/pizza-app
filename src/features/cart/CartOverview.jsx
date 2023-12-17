import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuanitity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if(!totalCartQuanitity) return null;
  return (
    <div
      className=" px-4 py-4
    bg-stone-800 text-sm text-stone-20 uppercase sm:px-6 md:text-base flex justify-between items-center "
    >
      <p className="font-semibold space-x-4 text-stone-300 sm:space-x-6">
        <span>{totalCartQuanitity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link className="font-semibold text-stone-300" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
