import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { RootState, useAppSelector } from "../store";
import ButtonStyle from "./ButtonStyle";

function Home() {
  const username = useSelector((state: RootState) => state.user.username);
  const status = useAppSelector((state) => state.user.statusLogin);
  return (
    <div className="my-40 text-center sm:my-16">
      <h1 className="text-2xl font-semibold text-center mt-18 mb-8 md:text-3xl">
        The Best Pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the Oven, Straight to you.
        </span>
      </h1>

      {status ? (
        <ButtonStyle to="/menu" type="primary">
          Continue Ordering , {username} ! 😊
        </ButtonStyle>
      ) : (
        <CreateUser />
      )}
      {/* {username === " " ? (
        <CreateUser />
      ) : (
       
      )} */}
    </div>
  );
}

export default Home;
