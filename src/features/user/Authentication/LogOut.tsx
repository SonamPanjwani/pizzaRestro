import { useNavigate } from "react-router-dom";
import { logOff } from "../../../services/apiAuth";
import ButtonStyle from "../../../uiComponents/ButtonStyle";
import { useDispatch } from "react-redux";
import { updateName } from "../userSlice";

function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    logOff();
    dispatch(updateName(null));
    navigate("/thankyou");
  }

  return (
    <>
      <ButtonStyle type="small" onClick={handleClick}>
        Log Out
      </ButtonStyle>
    </>
  );
}

export default LogOut;
