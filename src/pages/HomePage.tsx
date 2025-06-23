import { useState } from "react";
import PhoneBook from "../components/PhoneBook/PhoneBook";
import TodoApp from "../components/Todo/TodoApp";
import TodoList from "../components/TodoList";
import Modal from "../components/Modal";
import "../styles/HomePage.css";
import LoginFormValidator from "../components/LoginFormValidator";
import TabsComponent from "../components/TabsComponent";
import AccordionComponent from "../components/AccordionComponent";
import ProgressBar from "../components/ProgressBar";
import QuizApp from "../components/QuizApp";
import SearchableList from "../components/SearchableList";
import AnalogClock from "../components/AnalogClock";
import WeatherApp from "../components/WeatherApp/WeatherApp";

interface ComponentEntry {
  name: string;
  Component: React.ComponentType;
}

const components: ComponentEntry[] = [
  { name: "Todo App (Props)", Component: TodoApp },
  { name: "Todo List", Component: TodoList },
  { name: "Phone Book", Component: PhoneBook },
  { name: "Login Form Validator", Component: LoginFormValidator },
  { name: "Tabs Component", Component: TabsComponent },
  { name: "Accordion Component", Component: AccordionComponent },
  { name: "Progress Bar", Component: ProgressBar },
  { name: "Quiz App", Component: QuizApp },
  { name: "Searchable List", Component: SearchableList },
  { name: "Analog Clock", Component: AnalogClock },
  { name: "Weather App", Component: WeatherApp },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentEntry | null>(null);

  const openModal = (componentEntry: ComponentEntry) => {
    setSelectedComponent(componentEntry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  return (
    <>
      <h4>React Interview Problems</h4>
      <div className="component-cards-container">
        {components.map((entry, index) => (
          <div
            key={index}
            className="component-card"
            onClick={() => openModal(entry)}
          >
            <h3>{entry.name}</h3>
          </div>
        ))}
      </div>

      {selectedComponent && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedComponent.name}
        >
          <selectedComponent.Component />
        </Modal>
      )}
    </>
  );
}
