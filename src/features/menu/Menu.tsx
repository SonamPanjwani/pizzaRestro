import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { pizzaProp } from "../../utilities/Types";
import { useDispatch } from "react-redux";
import { setDisplay } from "../user/userSlice";

function Menu() {
  const dispatch = useDispatch();
  dispatch(setDisplay(true));
  const menu = useLoaderData() as pizzaProp[];
  console.log(menu);
  return (
    <>
      <ul
        className="divide-y w-[400px] sm:w-auto mx-auto divide-stone-400 px-3 mt-2 bg-yellow-200 bg-opacity-30
      "
      >
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
