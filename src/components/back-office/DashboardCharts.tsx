import Sales from "./Sales";
import ListChat from "./ListChat";


const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Sales />
      <ListChat />
    </div>
  );
};

export default DashboardCharts;
