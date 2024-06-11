import SmallCard from "./SmallCard";
import { DollarSign, ShoppingBasket, ShoppingCart, Timer } from "lucide-react";
import {NumberDataDashboardUser} from "@/utils/types"
const SmallCards = ({totalOrders=0,pendingOrder=0, cancelledOrder=0}: NumberDataDashboardUser) => {
  const cardData = [
    {
      title: "Total Order",
      icon: <ShoppingCart />,
      numberData: {totalOrders},
      Color: "bg-green-400/20 text-green-400",
    },
    {
      title: "Pending Order",
      icon: <ShoppingCart />,
      numberData: {pendingOrder},
      Color: "bg-cyan-400/20 text-cyan-400",
    },
    {
      title: "Order Batal",
      icon: <ShoppingCart />,
      numberData: {cancelledOrder},
      Color: "bg-red-400/20 text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
      {cardData.map((data, i) => (
        <SmallCard key={i} {...data} />
      ))}
    </div>
  );
};

export default SmallCards;
