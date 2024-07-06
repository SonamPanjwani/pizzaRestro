import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { RootState } from "../store";
import ButtonStyle from "./ButtonStyle";

function Home() {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div className="my-20 text-center sm:my-16">
      <h1 className="text-2xl font-semibold text-center mt-8 mb-8 md:text-3xl">
        The Best Pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the Oven, Straight to you.
        </span>
      </h1>
      {username === " " ? (
        <CreateUser />
      ) : (
        <ButtonStyle to="/login" type="primary">
          Continue Ordering , {username} ! 😊
        </ButtonStyle>
      )}
    </div>
  );
}

export default Home;
