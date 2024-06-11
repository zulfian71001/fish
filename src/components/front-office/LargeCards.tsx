import LargeCard from "./LargeCard";
import { Layers } from "lucide-react";

const LargeCards = () => {
  const cardData = [
    {
      title: "Today Orders",
      icon: <Layers />,
      numberData: "Rp. 200.000",
      desc: "Total sales of the day",
      Color: "bg-green-600",
    },
    {
      title: "Today Orders",
      icon: <Layers />,
      numberData: "Rp. 200.000",
      desc: "Total sales of the day",
      Color: "bg-orange-600",
    },
    {
      title: "Today Orders",
      icon: <Layers />,
      numberData: "Rp. 200.000",
      desc: "Total sales of the day",
      Color: "bg-blue-600",
    },
    {
      title: "Today Orders",
      icon: <Layers />,
      numberData: "Rp. 200.000",
      desc: "Total sales of the day",
      Color: "bg-emerald-600",
    },
  ];

  return (
    <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {cardData.map((data, i) => (
        <LargeCard key={i} {...data} />
      ))}
    </div>
  );
};

export default LargeCards;
