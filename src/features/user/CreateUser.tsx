import { FormEvent, useState } from "react";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [userName, setuserName] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userName) return;

    dispatch(updateName(userName));

    navigate("/login");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className="mb-4  font-semibold text-2xl text-stone-100 md:text-base">
          Hie👋, Welcome!! Please share your name:
        </p>
        <input
          className="input mb-8 w-72 text-stone-900"
          placeholder="Your Full Name"
          type="text"
          value={userName}
          onChange={(e) => {
            setuserName(e.target.value);
          }}
        />
        {userName !== "" && (
          <div>
            <ButtonStyle type="primary">Start Ordering</ButtonStyle>
          </div>
        )}
      </form>
    </>
  );
}

export default CreateUser;
