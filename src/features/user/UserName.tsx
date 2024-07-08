import { useAppSelector } from "../../store";
//import LoginPage from "./Authentication/LoginPage";

function UserName() {
  const username = useAppSelector((state) => state.user.username);
  // const state = useAppSelector((state) => state.user.statusLogin);
  // console.log(username);
  // console.log(state);
  if (!username) return null;
  return (
    <div className="hidden mt-4  tracking-widest text-stone-800 font-semibold md:block">
      {username}
    </div>
  );
}

export default UserName;
