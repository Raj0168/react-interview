import { useEffect, useState } from "react";

const PAGE_SIZE = 10;
export default function ProductList() {
  const [data, setData] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.products);
        setData(json.products);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const startPage = PAGE_SIZE * page;
    const endPage = startPage + PAGE_SIZE;

    setProducts(data.slice(startPage, endPage));
  }, [page, data]);

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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {products &&
            products.map((product: any) => (
              <div
                key={product.id}
                style={{
                  border: "2px solid #999",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
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
