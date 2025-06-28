import { useState } from "react";
import "./TransferList.css";

const initTodo: string[] = [
  "practice dsa",
  "apply for jobs",
  "keep doing react",
];
const initCompleted: string[] = ["prepare resume", "resign current job"];

export default function TransferList() {
  const [todoItems, setTodoItems] = useState<string[]>(initTodo);
  const [completedItems, setCompletedItems] = useState<string[]>(initCompleted);
  const [selectedTodo, setSelectedTodo] = useState<string[]>([]);
  const [selectedCompleted, setSelectedCompleted] = useState<string[]>([]);

  const toggleTodo = (item: string) => {
    setSelectedTodo((prev) => {
      if (prev.includes(item)) {
        return prev.filter((it) => it !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const toggleCompleted = (item: string) => {
    setSelectedCompleted((prev) => {
      if (prev.includes(item)) {
        return prev.filter((it) => it !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSelectedTodo = () => {
    setCompletedItems((prev) =>
      prev.filter((item) => !selectedCompleted.includes(item))
    );
    setTodoItems((prev) => [...prev, ...selectedCompleted]);
    setSelectedCompleted([]);
  };

  const handleSelectedCompleted = () => {
    setTodoItems((prev) => prev.filter((item) => !selectedTodo.includes(item)));
    setCompletedItems((prev) => [...prev, ...selectedTodo]);
    setSelectedTodo([]);
  };

  const handleAllComplete = () => {
    setCompletedItems((prev) => [...prev, ...todoItems]);
    setTodoItems([]);
  };

  const handleAllTodo = () => {
    setTodoItems((prev) => [...prev, ...completedItems]);
    setCompletedItems([]);
  };

  return (
    <div className="transfer-list-container">
      <div className="items">
        <label>Todo Items</label>
        {todoItems.length > 0 ? (
          todoItems.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`todo-${index}`}
                checked={selectedTodo.includes(item)}
                onChange={() => toggleTodo(item)}
              />
              <label htmlFor={`todo-${index}`}>{item}</label>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
      <div className="controls">
        <button
          disabled={completedItems.length < 1}
          onClick={handleAllTodo}
        >{`<<`}</button>
        <button
          disabled={selectedCompleted.length < 1}
          onClick={handleSelectedTodo}
        >{`<`}</button>
        <button
          disabled={selectedTodo.length < 1}
          onClick={handleSelectedCompleted}
        >{`>`}</button>
        <button
          disabled={todoItems.length < 1}
          onClick={handleAllComplete}
        >{`>>`}</button>
      </div>
      <div className="items">
        <label>Completed Items</label>
        {completedItems.length > 0 ? (
          completedItems.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`completed-${index}`}
                onChange={() => toggleCompleted(item)}
                checked={selectedCompleted.includes(item)}
              />
              <label htmlFor={`completed-${index}`}>{item}</label>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}
