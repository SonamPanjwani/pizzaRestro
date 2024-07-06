import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
//import UserName from "../features/user/UserName";
import LogOut from "../features/user/Authentication/LogOut";

//import { useState } from "react";
//import { login } from "../services/apiAuth";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 sm:px-6 uppercase px-4 py-3 border-b-2 border-stone-400 ">
      <div className="flex w-1/2 justify-between">
        <Link to="/" className="tracking-widest text-stone-800 font-semibold">
          Fast React Pizza Co.
        </Link>

        <SearchOrder />
      </div>
      <div className="flex  justify-end gap-6 ">
        <LogOut />
      </div>
    </header>
  );
}

export default Header;
