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
    <div className="flex flex-col items-center bg-yellow-200 bg-opacity-30 text-stone-900 text-xl mt-5 p-4 font-semibold">
      <h1> Something went wrong!! 😥</h1>
      <p>
        {error.data}||{error.message}
      </p>
      <LinkStyle to="-1">&larr; Go Back</LinkStyle>
    </div>
  );
}

export default Error;
