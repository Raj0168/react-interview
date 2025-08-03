import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function Practice() {
  const [value, setValue] = useState("");

  const {
    run: debouncedLog,
    cancel,
    flush,
  } = useDebounce((text: string) => {
    console.log("Debounced search for:", text);
  }, 500);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedLog(e.target.value);
        }}
        placeholder="Type to search..."
      />
      <button onClick={flush}>Flush</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
