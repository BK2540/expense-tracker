import React from "react";
import { svgs } from "../../constant/svg";

type CardType = {
  number: string;
  amount: number;
  type: "visa" | "master";
};

const CredirCard = ({ number, amount, type }: CardType) => {
  return (
    <div className="bg-primary rounded-3xl w-[250px] h-[148px] py-4 px-6 flex flex-col justify-between">
      <p className="text-off-white text-base font-montserrat">{number}</p>

      <div className="flex w-full items-center justify-between">
        <p className="text-off-white text-[24px] font-montserrat">${amount}</p>
        <img src={svgs.MasterCard} className="w-12 h-8" />
      </div>
    </div>
  );
};

export default CredirCard;
