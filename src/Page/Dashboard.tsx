import React, { useState } from "react";
import Sidebar from "../components/navigations/Sidebar";
import CredirCard from "../components/card/CredirCard";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  balanceSummarydata,
  categorySummaryData,
  expenseSummaryData,
  incomeSummaryData,
} from "../constant/data";

const Dashboard = () => {
  const [balanceView, setBalanceView] = useState<"year" | "month">("year");
  const [incomeView, setIncomeView] = useState<"year" | "month">("year");
  const [expenseView, setExpenseView] = useState<"year" | "month">("year");
  return (
    <div className="flex flex-col gap-6 overflow-hidden p-6">
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
            <p className="text-[12px] md:text-[14px] font-normal text-primary">
              Total Balance
            </p>
            <p className="text-[24px] text-primary font-medium text-center">
              $3,590
            </p>
          </div>
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4">
            <p className="text-[12px] md:text-[14px] font-normal text-primary">
              Total Income
            </p>
            <p className="text-[24px] text-medium-green font-medium text-center">
              $3,590
            </p>
          </div>
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4">
            <p className="text-[12px] md:text-[14px] font-normal text-primary">
              Total Expense
            </p>
            <p className="text-[24px] text-medium-red font-medium text-center">
              $3,590
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 items-center h-[279px]">
        <div className="flex flex-col bg-primary w-2/3 h-[260px] p-4 rounded-3xl gap-2">
          <div className="w-full flex justify-between items-center">
            <p className="text-off-white text-[24px] font-medium">
              Total Balance
            </p>

            <div className="flex items-center gap-2">
              <button
                className={`w-[72px] h-[40px] text-[12px] md:text-[14px] ${
                  balanceView === "year"
                    ? "bg-off-white text-primary rounded-full font-montserrat font-medium"
                    : "bg-transparent text-off-white"
                }`}
                onClick={() => setBalanceView("year")}
              >
                Year
              </button>

              <div className="h-4 w-[1px] bg-off-white" />

              <button
                className={`w-[72px] h-[40px] text-[12px] md:text-[14px] ${
                  balanceView === "month"
                    ? "bg-off-white text-primary rounded-full font-montserrat font-medium"
                    : "bg-transparent text-off-white"
                }`}
                onClick={() => setBalanceView("month")}
              >
                Month
              </button>
            </div>
          </div>

          <div className="w-full flex-1 ">
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart
                data={balanceSummarydata}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-1/3 bg-off-white h-[260px] p-4 rounded-3xl shadow-md shadow-gray-400">
          <p className="text-primary text-[24px] font-medium">
            Top Category Spent
          </p>
          <div className="flex items-center gap-2 h-full">
            <div className="flex-1 w-full h-[250px]">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart
                  responsive
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                  <Pie
                    data={categorySummaryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="90%"
                    innerRadius="60%"
                    isAnimationActive={false}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col items-start justify-start ">
              {categorySummaryData.map((item) => (
                <div className="flex items-center gap-2" key={item.name}>
                  <CircleRoundedIcon
                    style={{ width: 8, height: 8, fill: item.fill }}
                  />
                  <p className="text-[10px] md:text-[12px] text-primary font-light">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 items-center h-[279px]">
        <div className="flex-1 h-full bg-off-white rounded-3xl shadow-md shadow-gray-400 p-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-primary text-[24px] font-medium">Total Income</p>

            <div className="flex items-center gap-2">
              <button
                className={`w-[72px] h-[40px] text-[12px] md:text-[14px] ${
                  incomeView === "year"
                    ? "text-off-white bg-primary rounded-full font-montserrat font-medium"
                    : "bg-transparent text-primary"
                }`}
                onClick={() => setIncomeView("year")}
              >
                Year
              </button>

              <div className="h-4 w-[1px] bg-primary" />

              <button
                className={`w-[72px] h-[40px] text-[12px] md:text-[14px] ${
                  incomeView === "month"
                    ? "text-off-white bg-primary rounded-full font-montserrat font-medium"
                    : "bg-transparent text-primary"
                }`}
                onClick={() => setIncomeView("month")}
              >
                Month
              </button>
            </div>
          </div>
          <div className="flex-1 w-full h-[250px]">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart
                responsive
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                data={incomeSummaryData}
              >
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="pv"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="uv"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex-1 h-full bg-[#F0F7FF] rounded-3xl shadow-md shadow-gray-400 p-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-primary text-[24px] font-medium">
              Total Expense
            </p>

            <div className="flex items-center gap-2">
              <button
                className={`w-[72px] h-[40px] text-[12px] md:text-[14px] ${
                  expenseView === "year"
                    ? "text-off-white bg-primary rounded-full font-montserrat font-medium"
                    : "bg-transparent text-primary"
                }`}
                onClick={() => setExpenseView("year")}
              >
                Year
              </button>

              <div className="h-4 w-[1px] bg-primary" />

              <button
                className={`w-[72px] h-[40px] text-[12px] md:text-[14px] ${
                  expenseView === "month"
                    ? "text-off-white bg-primary rounded-full font-montserrat font-medium"
                    : "bg-transparent text-primary"
                }`}
                onClick={() => setExpenseView("month")}
              >
                Month
              </button>
            </div>
          </div>
          <div className="flex-1 w-full h-[250px]">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart
                responsive
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                data={expenseSummaryData}
              >
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="pv"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="uv"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
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
