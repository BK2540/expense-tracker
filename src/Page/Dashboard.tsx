import React from "react";
import Sidebar from "../components/navigations/Sidebar";
import CredirCard from "../components/card/CredirCard";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const Dashboard = () => {
  return (
    <div>
      <div className="w-full flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full shadow-md shadow-gray-300 flex justify-center items-center">
            <KeyboardArrowLeftRoundedIcon style={{ fill: "#161D26" }} />
          </div>
          <div className="flex">
            {cardData.map((item) => (
              <CredirCard
                number={item.number}
                amount={item.amount}
                type={item.type}
              />
            ))}
          </div>
          <div className="w-6 h-6 rounded-full shadow-md shadow-gray-300 flex justify-center items-center">
            <KeyboardArrowRightRoundedIcon style={{ fill: "#161D26" }} />
          </div>
        </div>
        <div className="bg-secorndary rounded-3xl w-full p-4 h-[148px] flex justify-between items-center gap-4">
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4">
            <p>Total Balance</p>
            <p className="text-[24px] text-primary font-medium text-center">
              $3,590
            </p>
          </div>
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4">
            <p>Total Income</p>
            <p className="text-[24px] text-medium-green font-medium text-center">
              $3,590
            </p>
          </div>
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4">
            <p>Total Expense</p>
            <p className="text-[24px] text-medium-red font-medium text-center">
              $3,590
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const cardData: { number: string; amount: number; type: "visa" | "master" }[] =
  [
    {
      number: "1234 5678 9012 3456",
      amount: 12000,
      type: "visa",
    },
    // {
    //   number: "3456 6678 0909 0000",
    //   amount: 3450,
    //   type: "master",
    // },
  ];
