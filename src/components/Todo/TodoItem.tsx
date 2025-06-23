import type { ToDoItem } from "../../types/Interfaces";

interface TodoItemProps {
  todo: ToDoItem;
  onComplete: () => void;
  onRemove: () => void;
}

export default function TodoItem({
  todo,
  onComplete,
  onRemove,
}: TodoItemProps) {
  return (
    <div
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "green" : "#fff",
      }}
    >
      {todo.text}
      <span>
        <button className="button-border-0" onClick={onComplete}>
          {todo.completed ? "☑️" : "🔳"}
        </button>
        <button className="button-border-0" onClick={onRemove}>
          🗑️
        </button>
      </span>
    </div>
  );
}
