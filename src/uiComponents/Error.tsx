import { useRouteError } from "react-router-dom";
import LinkStyle from "./LinkStyle";

type errorProp = {
  data?: string;
  message?: string;
};

function Error() {
  const error = useRouteError() as errorProp;
  console.log(error);
  return (
    <div>
      <h1> Something went wrong!!</h1>
      <p>
        {error.data}||{error.message}
      </p>
      <LinkStyle to="-1">&larr; Go Back</LinkStyle>
    </div>
  );
}

export default Error;
