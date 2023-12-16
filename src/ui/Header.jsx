import React from "react";
import { Link } from "react-router-dom";
import UserName from "../features/user/UserName";
import SearchOrder from "../features/order/SearchOrder";

export default function Header() {
  return (
    <header className=" flex items-center justify-between bg-yellow-500 px-4 py-3 uppercase border-b border-stone-200 sm:px-6 ">
      <Link to="/" className="tracking-widest">
        {" "}
        Pizza App
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
