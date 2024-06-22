import LinkStyle from "../../uiComponents/LinkStyle";

function EmptyCart() {
  return (
    <>
      <div className="px-4 py-5 mt-20 bg-yellow-200 bg-opacity-35">
        <LinkStyle to="/menu">&larr; Back to Menu </LinkStyle>
        <p className="mt-7 text-2xl font-bold text-slate-900 capitalize">
          Your Cart is Empty . Start Adding some delicious Pizzas 🌝
        </p>
      </div>
    </>
  );
}

export default EmptyCart;
