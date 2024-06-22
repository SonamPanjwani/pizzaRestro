import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  //console.log(navigation);
  const isloading: boolean = navigation.state === "loading";
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {isloading && <Loader />}
      <Header />
      <div className="bg-pizzaRestro bg-cover overflow-auto">
        <main className="max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
