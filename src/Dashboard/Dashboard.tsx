import CategoryChart from "./DashboardComponents/CategoryChart";
import SalesKPI from "./DashboardComponents/SalesKPI";
import "./Dashboard.css";
import LowStockList from "./DashboardComponents/LowStockList";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="widget">
        <SalesKPI />
      </div>
      <div className="widget large">
        <CategoryChart />
      </div>
      <div className="widget">
        <LowStockList />
      </div>
    </div>
  );
}
