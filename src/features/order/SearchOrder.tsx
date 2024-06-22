import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    //introducing form element so as to submit withe enter
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-4 py-2 text-sm text-stone-700 font-semibold bg-yellow-100
        placeholder:text-stone-500 w-28 sm:w-64 sm:focus:w-72 transition-all duration-100 focus:outline-none
        focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
