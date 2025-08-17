import { Loader } from "lucide-react";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useFetch from "../../hooks/useFetch";

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
  const debouncedSearch = useDebounce(searchInput, 500);

  const {
    data: searchResults,
    loading,
    error,
  } = useFetch(`${SEARCH_API}q=${debouncedSearch}`);

  const handleSearchInput = (e: any) => {
    const input: string = e.target.value;
    setSearchInput(input);
  };

  return (
    <div>
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
      {loading ? (
        <Loader />
      ) : searchResults ? (
        searchResults.posts.map((result: any) => (
          <div key={result.id}>
            <p>{result.title}</p>
            <p>{result.body}</p>
          </div>
        ))
      ) : (
        <p>error ? {error} : "No results"</p>
      )}
    </div>
  );
}
