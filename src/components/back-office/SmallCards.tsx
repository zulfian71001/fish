import SmallCard from "./SmallCard";
import { DollarSign, ShoppingBasket, ShoppingCart, Timer } from "lucide-react";

const SmallCards = () => {
  const cardData = [
    {
      title: "Total Penjualan",
      icon: <DollarSign />,
      numberData: "Rp. 200.000",
      Color: "bg-green-400/20 text-green-400",
    },
    {
      title: "Produk",
      icon: <ShoppingBasket />,
      numberData: "Rp. 200.000",
      Color: "bg-cyan-400/20 text-cyan-400",
    },
    {
      title: "Total Order",
      icon: <ShoppingCart />,
      numberData: "Rp. 200.000",
      Color: "bg-orange-400/20 text-orange-400",
    },
    {
      title: "Order Tertunda",
      icon: <Timer />,
      numberData: "Rp. 200.000",
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
