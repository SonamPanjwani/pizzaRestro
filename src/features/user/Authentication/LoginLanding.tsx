import ButtonStyle from "../../../uiComponents/ButtonStyle";
import LinkStyle from "../../../uiComponents/LinkStyle";
import { FormEvent, useEffect, useState } from "react";
import { login } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDisplay, setStatusLogin, setUserId } from "../userSlice";
import { useAppSelector } from "../../../store";
import { supabase } from "../../../services/client";

//import UserName from "../UserName";
useSelector;
function LoginLanding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string | null>("");
  const [success, setSuccess] = useState<boolean>();
  const status = useAppSelector((state) => state.user.statusLogin);
  dispatch(setDisplay(true));
  useEffect(() => {
    console.log(status);
  }, [status]);

  async function handlefetchUserID() {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    if (error) throw error;
    const { userId } = data.user.user_metadata;
    console.log(userId);
    dispatch(setUserId(userId));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    //console.log("handlefunction");
    if (!email || !password) return;

    const response = await login({ email, password });
    // console.log(response);
    if (response.success) {
      setSuccess(true);
      dispatch(setStatusLogin(true));
      navigate("/menu");
      handlefetchUserID();
      console.log(success);
    } else {
      setSuccess(false);
      setErr(response.message || "Invalid Email or Password");
    }
  }

  return (
    <>
      <div className="px-4 py-5 mt-20 bg-yellow-200 bg-opacity-35 rounded-lg text-center text-stone-800 font-bold">
        <div className="p-4">
          <p className="tracking-wide   text-center  text-2xl">
            Already a Customer ??? <br></br> Log in to your Account to get
            special offers
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-1 mt-5">
              <label className="sm:basis-40  text-stone-900 font-semibold text-lg ">
                Email Id
              </label>

              <input
                type="email"
                className="input grow  text-stone-900 "
                value={email}
                placeholder="Enter your EmailID"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-1  mt-5">
              <label className="sm:basis-40  text-stone-900 font-semibold text-lg ">
                Password
              </label>

              <input
                type="password"
                className="input grow  text-stone-900  mb-4"
                value={password}
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {err && (
              <p className="text-red-900 bg-yellow-200 bg-opacity-30">{err}</p>
            )}
            <ButtonStyle type="small"> Log In </ButtonStyle>

            <p className=" flex flex-col gap-2 text-base mt-3 mb-2">
              New to Fast React ?
              <p>
                <LinkStyle to="/signup">Click here to Register</LinkStyle>
              </p>
            </p>
            <p className=" flex flex-col gap-2 text-base mt-3 mb-2">
              {"OR"}
              <LinkStyle to="/menu"> Continue Without SignUp </LinkStyle>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginLanding;
