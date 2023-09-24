function Search({ query, onSearch }) {
  //const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      name="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
export default Search;
