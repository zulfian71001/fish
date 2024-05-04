"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Scale } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [40, 10, 30, 20],
      backgroundColor: [
        "rgba(22, 209, 234,1)",
        "rgba(22, 234, 174,1)",
        "rgba(255, 167, 2,1)",
        "rgba(239, 31, 254, 1)",
      ],
      borderColor: [
        "rgba(22, 209, 234,1)",
        "rgba(22, 234, 174,1)",
        "rgba(255, 167, 2,1)",
        "rgba(239, 31, 254, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const SellingProducts = () => {
  return (
    <div className="flex flex-col justify-center bg-slate-800 p-8 space-y-4 rounded-xl">
      <h1 className="text-xl font-semibold">Sales</h1>
      <div className="w-[500px] h-[500px]">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default SellingProducts;
