import { lazy, Suspense, useState } from "react";

const LoadingComponent = lazy(() => import("../Loader/Loader"));
const ProductList = lazy(() => import("./components/ProductList"));
const SearchDebounce = lazy(() => import("./components/SearchDebounce"));
const CartMain = lazy(() => import("./cart/CartMain"));
const ThemeMain = lazy(() => import("./theme/ThemeMain"));
const ContextMain = lazy(() => import("./context/ContextMain"));

import "./PracticeMain.css";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";

interface ItemInterface {
  id: number;
  title: string;
  component: React.ReactNode;
}

const items: ItemInterface[] = [
  { id: 1, title: "Loading Animation", component: <LoadingComponent /> },
  { id: 2, title: "Product List w/ fetch and sort", component: <ProductList /> },
  { id: 3, title: "Search Debounce", component: <SearchDebounce /> },
  { id: 4, title: "Cart - Context / Persist", component: <CartMain /> },
  { id: 5, title: "Theme - Context", component: <ThemeMain /> },
  { id: 6, title: "Context Consolidated", component: <ContextMain /> },
];

export default function PracticeMain() {
  const [activeTab, setActiveTab] = useState<number | null>(items[5].id);

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
