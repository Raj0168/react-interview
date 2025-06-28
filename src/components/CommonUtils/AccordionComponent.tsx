import { useState } from "react";

interface AccordionItem {
  id: number;
  question: string;
  answer: string;
}

const accordionItemArray: AccordionItem[] = [
  {
    id: 1,
    question: "What is React",
    answer:
      "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.",
  },
  {
    id: 2,
    question: "How do you manage state in React?",
    answer:
      " In React functional components, state is typically managed using the 'useState' hook for local component state. For more complex global state, hooks like `useContext` or state management libraries like Redux, Zustand, or Jotai can be used.",
  },
  {
    id: 3,
    question: "What are React Hooks?",
    answer:
      "React Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They allow you to use state and other React features without writing a class.",
  },
];

export default function AccordionComponent() {
  const [accordionItems, setAccordionItems] =
    useState<AccordionItem[]>(accordionItemArray);
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [newAccordionItem, setNewAccordionItem] = useState<AccordionItem>({
    id: Date.now(),
    question: "new question",
    answer: "new answer",
  });
  const [error, setError] = useState<string>("");

  const handleItemClick = (itemId: number) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  const addAccordionItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAccordionItem.answer.trim() || !newAccordionItem.question.trim()) {
      setError("Fill both questions and answers first");
      return;
    }

    setAccordionItems((prev) => [
      ...prev,
      { ...newAccordionItem, id: Date.now() },
    ]);
    setNewAccordionItem({
      id: Date.now(),
      question: "",
      answer: "",
    });
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccordionItem({
      ...newAccordionItem,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={addAccordionItem}>
        <label htmlFor={newAccordionItem.question}>Question</label>
        <input
          type="text"
          value={newAccordionItem.question}
          onChange={handleChange}
          name="question"
        />
        <label htmlFor={newAccordionItem.answer}>Answer</label>
        <input
          type="text"
          value={newAccordionItem.answer}
          onChange={(e) =>
            setNewAccordionItem({
              ...newAccordionItem,
              answer: e.target.value,
            })
          }
          name="answer"
        />
        <button type="submit">Add Accordion</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {accordionItems.map((item) => (
          <div key={item.id} style={{ borderBottom: "1px solid #eee" }}>
            <button
              onClick={() => handleItemClick(item?.id)}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                backgroundColor:
                  openItemId === item.id ? "#ddd" : "transparent",
                color: openItemId === item.id ? "#007bff" : "#fff",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: openItemId === item.id ? "bold" : "normal",
                transition: "background-color 0.3s, color 0.3s",
                outline: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{item.question}</span>
              <span>{openItemId === item.id ? "▲" : "▼"}</span>
            </button>

            {openItemId === item.id && (
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#333",
                  borderTop: "1px solid #eee",
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
