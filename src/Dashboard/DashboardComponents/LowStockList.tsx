import { useEffect, useState } from "react";

interface ProductInterface {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface ProductsInterface {
  limit: number;
  skip: number;
  total: number;
  products: ProductInterface[];
}

export default function LowStockList() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data: ProductsInterface) => {
        const lowStock = data.products.filter((p) => p.stock < 10);
        setProducts(lowStock);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading low stock products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h3>Low Stock Alerts</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ color: p.stock <= 3 ? "tomato" : "#fff" }}>
            {p.title} — {p.stock} left
          </li>
        ))}
      </ul>
    </>
  );
}
