import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

type buttonStyleProp = {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type?: "primary" | "small" | "secondary" | "notActive" | "round";
  onClick?: MouseEventHandler;
};

function ButtonStyle({
  children,
  disabled,
  to,
  type = "primary",
  onClick,
}: buttonStyleProp) {
  const baseStyle =
    " bg-yellow-400 text-sm uppercase font-bold text-stone-800  mt-3 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-color duration-300 focus:outline-non focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  const secondaryBaseStyle =
    "bg-stone-300 border-stone-300 text-sm border-2 uppercase font-semibold text-stone-600  mt-3 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-900 transition-color duration-300 focus:text-stone-400   focus:ring focus:outline-none focus:bg-stone-300 focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    primary: baseStyle + "px-4 py-3 sm:px-6 sm:py-4",
    small: baseStyle + "px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
    secondary: secondaryBaseStyle + "px-4 py-2.5 sm:px-6 sm:py-3.5",
    notActive: secondaryBaseStyle + "py-2 sm:px-5 sm:py-2.5 text-xs",
    round: baseStyle + " px-2.5 py-1 sm:px-3.5 sm:py-2 text-lg",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <div>
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default ButtonStyle;
