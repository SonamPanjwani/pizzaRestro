import { Link, useNavigate } from "react-router-dom";

type linkStyleProp = {
  children: React.ReactNode;
  to: string;
};
function LinkStyle({ children, to }: linkStyleProp) {
  const navigate = useNavigate();

  const className =
    "text-xl font-semibold text-stone-800 hover:text-stone-900 hover:underline bg-yellow-200 px-3 py-1 bg-opacity-35 ";

  if (to === "-1") {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }

  return (
    <div>
      <Link to={to} className={className}>
        {children}
      </Link>
      ;
    </div>
  );
}

export default LinkStyle;
