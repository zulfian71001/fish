import React from "react";

type Props = {
  Color?: string;
  icon: React.ReactElement;
  title: string;
  numberData: string;
  desc?: string;
};

const LargeCard = (props:Props) => {
    const { Color, icon, title, desc, numberData } = props;
    return (
      <div
        className={`flex flex-col justify-center items-center text-center p-6 rounded-xl gap-y-2 ${Color} shadow-md`}
      >
        <div>{icon}</div>
        <h3 className="text-xl font-light">{title}</h3>
        <p className="font-semibold my-2"> {numberData}</p>
        <p className="font-light">{desc}</p>
      </div>
    );
}

export default LargeCard
