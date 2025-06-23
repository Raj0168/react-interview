import { useState } from "react";
import type { ToDoItem } from "../../types/Interfaces";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoApp() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);

  const addTodos = (text: string) => {
    if (!text.trim()) return;

    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodos);
  };

  return (
    <>
      <TodoForm onAddTodo={addTodos} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={() => toggleComplete(todo.id)}
          onRemove={() => removeTodo(todo.id)}
        />
      ))}
    </>
  );
}
