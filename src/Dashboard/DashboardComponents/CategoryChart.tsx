import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartData } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {
  const [chartData, setChartData] = useState<
    ChartData<"pie", number[], string>
  >({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const rawCategories = await res.json();
        const categoryList: string[] = Array.isArray(rawCategories)
          ? rawCategories.map((cat: any) =>
              typeof cat === "string" ? cat : cat.name
            )
          : [];

        const counts = await Promise.all(
          categoryList.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
            );
            const data = await res.json();
            return data.products.length;
          })
        );

        const colors = [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#B37FFF",
          "#FF5E78",
          "#28C76F",
          "#F67019",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
          "#00A896",
          "#E63946",
          "#F1FAEE",
          "#A8DADC",
          "#457B9D",
          "#1D3557",
        ];

        setChartData({
          labels: categoryList.map(
            (c) => c.charAt(0).toUpperCase() + c.slice(1)
          ),
          datasets: [
            {
              label: "Products per Category",
              data: counts,
              backgroundColor: colors.slice(0, categoryList.length),
            },
          ],
        });
      } catch (error) {
        console.error("Failed to load chart data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h3>Product Categories</h3>
      {chartData.labels?.length ? <Pie data={chartData} /> : <p>Loading...</p>}
    </>
  );
}
