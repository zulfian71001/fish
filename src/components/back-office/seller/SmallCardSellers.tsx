import SmallCard from "../SmallCard";
import { DollarSign, ShoppingBasket, ShoppingCart, Timer } from "lucide-react";

const SmallCards = () => {
  const cardData = [
    {
      title: "Total Sales",
      icon: <DollarSign />,
      numberData: "Rp. 200.000",
      Color: "bg-green-400/20 text-green-400",
    },
    {
      title: "Product",
      icon: <ShoppingBasket />,
      numberData: "20",
      Color: "bg-cyan-400/20 text-cyan-400",
    },
    {
      title: "Orders",
      icon: <ShoppingCart />,
      numberData: "100",
      Color: "bg-orange-400/20 text-orange-400",
    },
    {
      title: "Pending Orders",
      icon: <Timer />,
      numberData: "12",
      Color: "bg-indigo-400/20 text-indigo-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {cardData.map((data, i) => (
        <SmallCard key={i} {...data} />
      ))}
    </div>
  );
};

export default SmallCards;
