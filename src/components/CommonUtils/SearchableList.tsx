import { useState } from "react";

const initialItems: string[] = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Karl",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Paul",
  "Quinn",
  "Rachel",
  "Sam",
  "Tina",
];

export default function SearchableList() {
  const [items, setItems] = useState<string[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchTerm(input);
    const filteredItems = initialItems.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    setItems(filteredItems);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="Search names..."
        value={searchTerm}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px 15px",
          borderRadius: "5px",
          boxSizing: "border-box",
          outline: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#007bff")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
      />

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #eee",
          borderRadius: "5px",
          padding: "10px",
          color: "#fff",
          backgroundColor: "#333",
        }}
      >
        {items.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: "8px 0",
                  fontSize: "1em",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>
            No results found.
          </p>
        )}
      </div>
    </div>
  );
}
