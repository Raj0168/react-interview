import { useState } from "react";

const items = ["walk the dog", "water the plants", "wash the dishes"];

export default function TodoList() {
  const [listItems, setListItems] = useState<string[]>(items);
  const [newItem, setNewItem] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setListItems([...listItems, newItem]);
    setNewItem("");
  };

  const handleRemove = (indexToRemove: number) => {
    const filteredList = listItems.filter(
      (_, index) => index !== indexToRemove
    );
    setListItems(filteredList);
  };

  return (
    <>
      <h4>Todo List</h4>
      <form onSubmit={handleSubmit}>
        <label>New task</label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="add new task!"
          />
          <button type="submit">Add Task</button>
        </div>
      </form>
      <div>
        <h4>To-do Items</h4>
        <ul>
          {listItems.map((item, index) => (
            <span style={{ display: "flex" }}>
              <li key={index}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
              <button className="button-border-0">✅</button>
              <button
                onClick={() => handleRemove(index)}
                className="button-border-0"
              >
                ❌
              </button>
            </span>
          ))}
        </ul>
      </div>
    </>
  );
}
