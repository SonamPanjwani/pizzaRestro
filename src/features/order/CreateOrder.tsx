import { Form, useNavigate } from "react-router-dom";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { supabase } from "../../services/client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDisplay } from "../user/userSlice";
import { priorityOrder } from "./orderSlice";
interface userDataType {
  UserName: string;
  ContactInfo: string;
  Address: string;
}
function CreateOrder() {
  const cart = useSelector((state: RootState) => state.cart.cart.flat());
  // console.log(cart);
  const dispatch = useDispatch();
  dispatch(setDisplay(true));
  const priority = useAppSelector((state) => state.order.priority);
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.user.statusLogin);
  const [dataSuccess, setDatasuccess] = useState<boolean>(false);

  const [userData, setUserData] = useState<userDataType>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    //console.log(userId);
    async function getUser() {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", userId)
        .single();

      console.log(data);
      if (data) {
        setDatasuccess(true);
        setUserData(data);
      }

      if (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  if (!cart.length) return <EmptyCart />;

  //console.log(userData);

  // const { UserName, ContactInfo, Address } = userData;

  async function handleclick() {
    // console.log("handle click");

    try {
      cart.forEach(async (item) => {
        const currCart = {
          pizzaId: item.pizzaID,
          name: item.name,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          totalPrice: item.unitPrice * item.quantity,
        };
        // console.log("Current Cart Item:", currCart);

        try {
          const { error } = await supabase.from("Cart").insert(currCart); // Inserting as an array

          if (error) {
            console.error("Error inserting ,needs update");

            if (error) {
              console.log("error updating");
            }
          }
        } catch (error) {
          console.error("Error inserting data", error);
        }
      });
    } catch (error) {
      console.log("error");
    } finally {
      navigate("/order");
    }
  }

  return (
    <>
      <div className="px-4 py-5 mt-20 bg-yellow-200 bg-opacity-35 ">
        <h2 className="text-[35px]  text-stone-900 font-semibold mb-8">
          Ready to Order? Let's Order then !!
        </h2>
        <Form>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
              First Name
            </label>
            <input
              className="input grow  text-stone-900 capitalize"
              type="text"
              name="Customer"
              defaultValue={
                dataSuccess && status && userData ? userData.UserName : ""
              }
              placeholder="Enter Your Name "
              required
            />
          </div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
              Contact No.
            </label>
            <div className="grow">
              <input
                className="input w-full  text-stone-900 capitalize"
                type="tel"
                name="Phone"
                defaultValue={
                  dataSuccess && status && userData ? userData.ContactInfo : ""
                }
                placeholder="Enter Contact Info "
                required
              />
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
              Address
            </label>
            <div className="grow ">
              <input
                className="input w-full  text-stone-900 capitalize"
                type="text"
                name="Address"
                defaultValue={
                  dataSuccess && status && userData ? userData.Address : ""
                }
                placeholder="Enter Your Address "
                required
              />
            </div>
          </div>
          <div className="mb-12  flex gap-5 items-center">
            {priority ? (
              <input
                className="h-6 w-6 accent-yellow-400 focus:outline-none
              focus:ring focus:ring-offset-2 focus:ring-yellow-400"
                type="checkbox"
                name="priority"
                defaultChecked
                id="priority"
                onChange={(e) => dispatch(priorityOrder(e.target.checked))}
              />
            ) : (
              <input
                className="h-6 w-6 accent-yellow-400 focus:outline-none
            focus:ring focus:ring-offset-2 focus:ring-yellow-400"
                type="checkbox"
                name="priority"
                id="priority"
                onChange={(e) => dispatch(priorityOrder(e.target.checked))}
              />
            )}

            <label
              htmlFor="priority"
              className="  text-stone-900 font-semibold text-lg"
            >
              Want to place your order as priority?*
              <p>* with additional charges of ₹ 5 only /-</p>
            </label>
          </div>
          <div>
            {/* <input type="hidden" name="cart" value={JSON.stringify(cart)} /> */}
            <ButtonStyle type="primary" onClick={handleclick}>
              Order Now!!
            </ButtonStyle>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CreateOrder;
