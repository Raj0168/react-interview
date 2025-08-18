import { ChevronsDown, ChevronsUp, CircleStar } from "lucide-react";
import { useEffect, useState } from "react";
import type { SortOptions } from "../../../types/types";

type Order = "title" | "price" | "rating" | null;

const PAGE_SIZE = 10;
const initialSortOptions: SortOptions[] = [
  { label: "title", ascending: null },
  { label: "price", ascending: null },
  { label: "rating", ascending: null },
];

export default function ProductList() {
  const [data, setData] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [sortingOrder, setSortingOrder] =
    useState<SortOptions[]>(initialSortOptions);
  const [currentOrder, setCurrentOrder] = useState<Order>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json.products);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const startPage = PAGE_SIZE * page;
    const endPage = startPage + PAGE_SIZE;
    setProducts(data.slice(startPage, endPage));
  }, [page, data]);

  useEffect(() => {
    if (!currentOrder) return;

    const sortConfig = sortingOrder.find((s) => s.label === currentOrder);
    if (!sortConfig) return;

    let updatedList: any[] = [];
    if (currentOrder === "title") {
      updatedList = [...data].sort((a, b) =>
        sortConfig.ascending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    } else if (currentOrder === "price") {
      updatedList = [...data].sort((a, b) =>
        sortConfig.ascending ? a.price - b.price : b.price - a.price
      );
    } else if (currentOrder === "rating") {
      updatedList = [...data].sort((a, b) =>
        sortConfig.ascending ? a.rating - b.rating : b.rating - a.rating
      );
    }

    setProducts(updatedList);
  }, [currentOrder, sortingOrder]);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const setPrevious = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const setNext = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const goToPage = (page: number) => {
    setPage(page);
  };

  const handleSortingOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value as Order;

    if (!order) {
      setCurrentOrder(null);
      setSortingOrder(initialSortOptions);
      return;
    }

    setSortingOrder((prev) =>
      prev.map((sort) => {
        if (sort.label === order) {
          return {
            ...sort,
            ascending: sort.ascending === null ? true : !sort.ascending,
          };
        }
        return { ...sort, ascending: null };
      })
    );
    setCurrentOrder(order);

    event.target.value = "";
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="sort-control" style={{ marginBottom: "1rem" }}>
            <select
              id="sort-order"
              onChange={handleSortingOrder}
              defaultValue=""
            >
              <option value="">-- show options --</option>
              {sortingOrder.map((sort, index) => (
                <option key={index} value={sort.label}>
                  {sort.label.toUpperCase()}
                </option>
              ))}
            </select>

            <span style={{ marginLeft: "1rem" }}>
              {sortingOrder.map(
                (sort) =>
                  sort.ascending !== null && (
                    <span key={sort.label} style={{ marginRight: "1rem" }}>
                      {sort.label.toUpperCase()}{" "}
                      {sort.ascending ? <ChevronsUp /> : <ChevronsDown />}
                    </span>
                  )
              )}
            </span>
          </div>

          {products &&
            products.map((product: any) => (
              <div
                key={product.id}
                style={{
                  border: "2px solid #999",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <p>{product.title}</p>
                <img
                  height={160}
                  width={160}
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />
                <p>{product.description}</p>
                <p>$ {product.price}</p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <CircleStar /> {product.rating}
                </p>
              </div>
            ))}

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
              marginTop: "1rem",
            }}
          >
            <button onClick={setPrevious} className="pagination-button">
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className="pagination-button"
                style={{
                  background: page === index ? "tomato" : "",
                }}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={setNext} className="pagination-button">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
