import LinkStyle from "../../uiComponents/LinkStyle";

function ThankYou() {
  return (
    <div className="flex flex-col items-center gap-3 bg-yellow-200 bg-opacity-30 text-stone-900 text-xl mt-5 p-4 font-semibold rounded-lg">
      <h1> ThankYou for Visiting Fast React Pizza 😊</h1>
      <LinkStyle to={"/"}>&larr; Home</LinkStyle>
    </div>
  );
}

export default ThankYou;
