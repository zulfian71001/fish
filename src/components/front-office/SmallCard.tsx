import { NumberDataDashboardUser } from "@/utils/types";
import React from "react";

type Props = {
  Color?: string;
  icon: React.ReactElement;
  title: string;
  numberData: NumberDataDashboardUser;
};
const SmallCard = (props: Props) => {
const { Color, icon, title, numberData } = props;
const values = Object.values(numberData);
  return (
    <div
      className={`flex items-center text-center p-6 rounded-xl gap-4 bg-white text-cyan-500 shadow-md`}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${Color}`}
      >
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <h3 className="text-sm font-light">{title}</h3>
        {values.map((value, index) => (
          <p className="font-semibold text-lg" key={index}>{value}</p>
        ))}
      </div>
    </div>
  );
};

export default SmallCard;
