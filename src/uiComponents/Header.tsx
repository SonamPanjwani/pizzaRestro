import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 sm:px-6 uppercase px-4 py-3 border-b-2 border-stone-400 ">
      <Link to="/" className="tracking-widest text-stone-800 font-semibold">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
