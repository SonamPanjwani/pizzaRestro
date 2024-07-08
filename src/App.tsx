import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./uiComponents/Home";
import Menu, { loader as menuloader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./uiComponents/AppLayout";
import Error from "./uiComponents/Error";
import ThankYou from "./features/order/ThankYou";
import LoginLanding from "./features/user/Authentication/LoginLanding";
import SignUp from "./features/user/SignUp";
//import ProtectedRoute from "./uiComponents/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuloader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <LoginLanding />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        //action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        //loader ka issue aara hai
        errorElement: <Error />,
      },
      {
        path: "/thankyou",
        element: <ThankYou />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
