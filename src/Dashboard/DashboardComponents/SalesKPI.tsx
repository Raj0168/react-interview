import { useEffect, useState } from "react";

interface DataInterface {
  totalSales: number;
  orders: number;
}

export default function SalesKPI() {
  const [data, setData] = useState<DataInterface>({ totalSales: 0, orders: 0 });

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((json) => {
        const totalSales = json.carts.reduce(
          (sum: number, cart: any) => sum + cart.total,
          0
        );
        const orders = json.carts.length;
        setData({ totalSales, orders });
      });
  }, []);

  return (
    <>
      <h3>Sales KPI</h3>
      <p>
        <strong>Total Sales:</strong> ${data.totalSales}
      </p>
      <p>
        <strong>Total Orders:</strong> {data.orders}
      </p>
    </>
  );
}
