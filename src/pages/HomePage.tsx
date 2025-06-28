import React, { Suspense, useState } from "react";
import Modal from "../components/CommonUtils/Modal";
import "../styles/HomePage.css";
import Loader from "../components/Loader/Loader";

interface ComponentEntry {
  name: string;
  loader: () => Promise<{ default: React.ComponentType<any> }>;
}

const components: ComponentEntry[] = [
  {
    name: "Todo App (Props)",
    loader: () => import("../components/Todo/TodoApp"),
  },
  { name: "Todo List", loader: () => import("../components/Todo/TodoList") },
  {
    name: "Phone Book",
    loader: () => import("../components/PhoneBook/PhoneBook"),
  },
  {
    name: "Login Form Validator",
    loader: () => import("../components/CommonUtils/LoginFormValidator"),
  },
  {
    name: "Tabs Component",
    loader: () => import("../components/CommonUtils/TabsComponent"),
  },
  {
    name: "Accordion Component",
    loader: () => import("../components/CommonUtils/AccordionComponent"),
  },
  { name: "Stopwatch", loader: () => import("../components/ProgressBar/StopWatch") },
  { name: "Progress Bar", loader: () => import("../components/ProgressBar/ProgressBar") },
  {
    name: "Progress Bar - II",
    loader: () => import("../components/ProgressBar/ProgressBars-II"),
  },
  { name: "Quiz App", loader: () => import("../components/misc/QuizApp") },
  {
    name: "Searchable List",
    loader: () => import("../components/CommonUtils/SearchableList"),
  },
  { name: "Analog Clock", loader: () => import("../components/misc/AnalogClock") },
  {
    name: "Weather App",
    loader: () => import("../components/WeatherApp/WeatherApp"),
  },
  {
    name: "Image Carousel",
    loader: () => import("../components/ImageCarousel/Carousel"),
  },
  { name: "Job Board", loader: () => import("../components/CallAPIs/JobBoard") },
  {
    name: "Star Rating",
    loader: () => import("../components/StarRating/StarRating"),
  },
  { name: "Like Button", loader: () => import("../components/CallAPIs/LikeButton") },
  { name: "Traffic light", loader: () => import("../components/misc/TrafficLight") },
  {
    name: "Modal Dialog",
    loader: () => import("../components/ModalDialog/CallModal"),
  },
  {
    name: "Pagination Table",
    loader: () => import("../components/CommonUtils/PaginationTable"),
  },
  {
    name: "Transfer List",
    loader: () => import("../components/TransferList/TransferList"),
  },
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
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            {(() => {
              const LazyComponent = React.lazy(selectedComponent.loader);
              return <LazyComponent />;
            })()}
          </Suspense>
        </Modal>
      )}
    </>
  );
}
