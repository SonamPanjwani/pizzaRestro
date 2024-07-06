import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <Link
        to="/login"
        className="tracking-widest text-stone-800 font-semibold"
      >
        Log In
      </Link>
    </>
  );
}

export default LoginPage;
