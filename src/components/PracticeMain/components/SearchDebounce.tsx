import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

type Reaction = {
  likes: number;
  dislikes: number;
};

type SearchResponse = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
};

const SEARCH_API = "https://dummyjson.com/posts/search?";
export default function SearchDebounce() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResponse[]>([]);

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setLoading(true);
    fetch(`${SEARCH_API}q=${debouncedSearch}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setSearchResults(json.posts);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [debouncedSearch]);

  const handleSearchInput = (e: any) => {
    const input: string = e.target.value.trim();
    setSearchInput(input);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="enter input here"
          className="search-input"
          onChange={(e) => handleSearchInput(e)}
          value={searchInput}
          style={{
            width: "auto",
            height: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "1rem",
          }}
        />
      </form>
      {loading ? (
        <Loader />
      ) : searchResults ? (
        searchResults.map((result: SearchResponse) => (
          <div key={result.id}>
            <p>{result.title}</p>
            <p>{result.body}</p>
          </div>
        ))
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}
