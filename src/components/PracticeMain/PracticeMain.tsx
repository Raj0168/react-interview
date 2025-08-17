import { lazy, Suspense, useState } from "react";

const LoadingComponent = lazy(() => import("../Loader/Loader"));
const ProductList = lazy(() => import("./components/ProductList"));
const SearchDebounce = lazy(() => import("./components/SearchDebounce"));

import "./PracticeMain.css";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";

interface ItemInterface {
  id: number;
  title: string;
  component: React.ReactNode;
}

const items: ItemInterface[] = [
  { id: 1, title: "Loader", component: <LoadingComponent /> },
  { id: 2, title: "Product List", component: <ProductList /> },
  { id: 3, title: "Search Debounce", component: <SearchDebounce /> },
];

export default function PracticeMain() {
  const [activeTab, setActiveTab] = useState<number | null>(items[1].id);

  const handleActiveTab = (tabId: number) => {
    setActiveTab((prev) => (prev === tabId ? null : tabId));
  };

  return (
    <div className="practice-container">
      {items.map((item) => (
        <div className="practice-section" key={item.id}>
          <button
            onClick={() => handleActiveTab(item.id)}
            className="tab-button"
          >
            {item.title}
            <span>
              {item.id === activeTab ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
          {item.id === activeTab && (
            <div className="tab-content">
              <Suspense fallback={<Loader />}>{item.component}</Suspense>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
