import { useEffect, useRef } from "react";

function Search({ query, onSearch }) {
  const inputEl = useRef(null);

  useEffect(() => {
    const enterFocus = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        onSearch("");
      }
    };
    document.addEventListener("keydown", enterFocus);
    return () => document.removeEventListener("keydown", enterFocus);
  }, [onSearch]);
  return (
    <input
      className="search"
      name="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      ref={inputEl}
    />
  );
}
export default Search;
