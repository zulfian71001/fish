import React from "react";

type Props = {
  Color?: string;
  icon: React.ReactElement;
  title: string;
  numberData: string;
};
const SmallCard = (props: Props) => {
  const { Color, icon, title, numberData } = props;
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
        <h3 className="text-xs font-light">{title}</h3>
        <p className="font-semibold"> {numberData}</p>
      </div>
    </div>
  );
};

export default SmallCard;
