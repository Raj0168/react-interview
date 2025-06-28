import React, { Suspense, useState } from "react";
import Modal from "../components/CommonUtils/Modal";
import "../styles/HomePage.css";
import Loader from "../components/Loader/Loader";

import todoAppCode from "../components/Todo/TodoApp.tsx?raw";
import todoListCode from "../components/Todo/TodoList.tsx?raw";
import phoneBookCode from "../components/PhoneBook/PhoneBook.tsx?raw";
import loginFormValidatorCode from "../components/CommonUtils/LoginFormValidator.tsx?raw";
import tabsComponentCode from "../components/CommonUtils/TabsComponent.tsx?raw";
import accordionComponentCode from "../components/CommonUtils/AccordionComponent.tsx?raw";
import stopwatchCode from "../components/ProgressBar/StopWatch.tsx?raw";
import progressBarCode from "../components/ProgressBar/ProgressBar.tsx?raw";
import progressBarsIICode from "../components/ProgressBar/ProgressBars-II.tsx?raw";
import quizAppCode from "../components/misc/QuizApp.tsx?raw";
import searchableListCode from "../components/CommonUtils/SearchableList.tsx?raw";
import analogClockCode from "../components/misc/AnalogClock.tsx?raw";
import weatherAppCode from "../components/WeatherApp/WeatherApp.tsx?raw";
import imageCarouselCode from "../components/ImageCarousel/Carousel.tsx?raw";
import jobBoardCode from "../components/CallAPIs/JobBoard.tsx?raw";
import starRatingCode from "../components/StarRating/StarRating.tsx?raw";
import likeButtonCode from "../components/CallAPIs/LikeButton.tsx?raw";
import trafficLightCode from "../components/misc/TrafficLight.tsx?raw";
import modalDialogCode from "../components/ModalDialog/CallModal.tsx?raw";
import paginationTableCode from "../components/CommonUtils/PaginationTable.tsx?raw";
import transferListCode from "../components/TransferList/TransferList.tsx?raw";

interface ComponentEntry {
  name: string;
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  code: string;
}

const components: ComponentEntry[] = [
  {
    name: "Phone Book",
    loader: () => import("../components/PhoneBook/PhoneBook"),
    code: phoneBookCode,
  },
  {
    name: "Tabs Component",
    loader: () => import("../components/CommonUtils/TabsComponent"),
    code: tabsComponentCode,
  },
  {
    name: "Accordion Component",
    loader: () => import("../components/CommonUtils/AccordionComponent"),
    code: accordionComponentCode,
  },
  {
    name: "Stopwatch",
    loader: () => import("../components/ProgressBar/StopWatch"),
    code: stopwatchCode,
  },
  {
    name: "Progress Bar",
    loader: () => import("../components/ProgressBar/ProgressBar"),
    code: progressBarCode,
  },
  {
    name: "Progress Bar - II",
    loader: () => import("../components/ProgressBar/ProgressBars-II"),
    code: progressBarsIICode,
  },

  {
    name: "Analog Clock",
    loader: () => import("../components/misc/AnalogClock"),
    code: analogClockCode,
  },
  {
    name: "Weather App",
    loader: () => import("../components/WeatherApp/WeatherApp"),
    code: weatherAppCode,
  },
  {
    name: "Image Carousel",
    loader: () => import("../components/ImageCarousel/Carousel"),
    code: imageCarouselCode,
  },
  {
    name: "Job Board",
    loader: () => import("../components/CallAPIs/JobBoard"),
    code: jobBoardCode,
  },
  {
    name: "Star Rating",
    loader: () => import("../components/StarRating/StarRating"),
    code: starRatingCode,
  },
  {
    name: "Like Button",
    loader: () => import("../components/CallAPIs/LikeButton"),
    code: likeButtonCode,
  },
  {
    name: "Traffic light",
    loader: () => import("../components/misc/TrafficLight"),
    code: trafficLightCode,
  },
  {
    name: "Modal Dialog",
    loader: () => import("../components/ModalDialog/CallModal"),
    code: modalDialogCode,
  },
  {
    name: "Pagination Table",
    loader: () => import("../components/CommonUtils/PaginationTable"),
    code: paginationTableCode,
  },
  {
    name: "Transfer List",
    loader: () => import("../components/TransferList/TransferList"),
    code: transferListCode,
  },
  {
    name: "Todo App (Props)",
    loader: () => import("../components/Todo/TodoApp"),
    code: todoAppCode,
  },
  {
    name: "Todo List",
    loader: () => import("../components/Todo/TodoList"),
    code: todoListCode,
  },
  {
    name: "Login Form Validator",
    loader: () => import("../components/CommonUtils/LoginFormValidator"),
    code: loginFormValidatorCode,
  },
  {
    name: "Quiz App",
    loader: () => import("../components/misc/QuizApp"),
    code: quizAppCode,
  },
  {
    name: "Searchable List",
    loader: () => import("../components/CommonUtils/SearchableList"),
    code: searchableListCode,
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

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <>
      <h4>React Interview Problems</h4>
      <div className="component-cards-container">
        {components.map((entry, index) => (
          <div
            key={index}
            className="component-card"
            onClick={() => {
              openModal(entry);
              setActiveTab("preview");
            }}
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
          code={selectedComponent.code}
        >
          <>
            <nav
              className="modal-tabs"
              role="tablist"
              aria-label="Preview and code tabs"
            >
              <button
                role="tab"
                aria-selected={activeTab === "preview"}
                className={`modal-tab ${
                  activeTab === "preview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("preview")}
                id="tab-preview"
                aria-controls="tabpanel-preview"
                tabIndex={activeTab === "preview" ? 0 : -1}
              >
                Preview
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "code"}
                className={`modal-tab ${activeTab === "code" ? "active" : ""}`}
                onClick={() => setActiveTab("code")}
                id="tab-code"
                aria-controls="tabpanel-code"
                tabIndex={activeTab === "code" ? 0 : -1}
              >
                Code
              </button>
            </nav>

            <section
              id="tabpanel-preview"
              role="tabpanel"
              aria-labelledby="tab-preview"
              hidden={activeTab !== "preview"}
              className="modal-tabpanel"
            >
              <Suspense fallback={<Loader />}>
                {(() => {
                  const LazyComponent = React.lazy(selectedComponent.loader);
                  return <LazyComponent />;
                })()}
              </Suspense>
            </section>

            <section
              id="tabpanel-code"
              role="tabpanel"
              aria-labelledby="tab-code"
              hidden={activeTab !== "code"}
              className="modal-tabpanel code-tabpanel"
            >
              <pre>
                <code>{selectedComponent.code}</code>
              </pre>
            </section>
          </>
        </Modal>
      )}
    </>
  );
}
