import { useState } from "react";

const items = ["walk the dog", "water the plants", "wash the dishes"];
const completed = ["pack stuff", "book tickets"];

export default function TodoList() {
  const [listItems, setListItems] = useState<string[]>(items);
  const [newItem, setNewItem] = useState<string>("");
  const [completedItems, setCompletedItems] = useState<string[]>(completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setListItems([...listItems, newItem]);
    setNewItem("");
  };

  const sortItems = () => {
    const updatedListItems = [...listItems].sort((a, b) => a.localeCompare(b));
    setListItems(updatedListItems);
  };
  const sortCompletedItems = () => {
    const updatedListItems = [...completedItems].sort((a, b) =>
      a.localeCompare(b)
    );
    setCompletedItems(updatedListItems);
  };

  const handleRemove = (indexToRemove: number) => {
    const filteredList = listItems.filter(
      (_, index) => index !== indexToRemove
    );
    setListItems(filteredList);
  };

  const handleRemoveCompleted = (indexToRemove: number) => {
    const filteredItems = completedItems.filter((_, index) => {
      return index !== indexToRemove;
    });
    setCompletedItems(filteredItems);
  };

  const markAsComplete = (indexToMove: number) => {
    const itemToMove = listItems[indexToMove];
    setCompletedItems((prev) => [...prev, itemToMove]);

    const filteredList = listItems.filter((_, index) => {
      return index !== indexToMove;
    });
    setListItems(filteredList);
  };

  const markAsIncomplete = (indexToMove: number) => {
    const itemToMove = completedItems[indexToMove];
    setListItems((prev) => [...prev, itemToMove]);

    const filteredList = completedItems.filter((_, index) => {
      return index !== indexToMove;
    });
    setCompletedItems(filteredList);
  };

  return (
    <>
      <h4>Todo List</h4>
      <form
        style={{ width: "fit-content", margin: "auto" }}
        onSubmit={handleSubmit}
      >
        <label>New task</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            style={{ width: "200px", borderRadius: "10px" }}
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="add new task!"
          />
          <button type="submit">Add Task</button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: "0.5rem",
        }}
      >
        <button onClick={sortItems}>Sort Items</button>
        <button onClick={sortCompletedItems}>Sort Completed</button>
      </div>
      <section
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h4>To-do Items</h4>
          <ul>
            {listItems.map((item, index) => (
              <span key={index} style={{ display: "flex" }}>
                <li>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                <button
                  onClick={() => markAsComplete(index)}
                  className="button-border-0"
                >
                  🔳
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="button-border-0"
                >
                  🗑️
                </button>
              </span>
            ))}
          </ul>
        </div>
        <div>
          <h4>Completed Items</h4>
          <ul>
            {completedItems.map((item, index) => (
              <span key={index} style={{ display: "flex" }}>
                <li>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                <button
                  onClick={() => markAsIncomplete(index)}
                  className="button-border-0"
                >
                  ☑️
                </button>
                <button
                  onClick={() => handleRemoveCompleted(index)}
                  className="button-border-0"
                >
                  🗑️
                </button>
              </span>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
