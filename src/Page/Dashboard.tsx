import React, { useState, useEffect, useMemo } from "react";
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
import { portfolioData } from "../constant/data";

type Portfolio = {
  id: string;
  name: string;
  cardInfo: { number: string; amount: number; type: "visa" | "master" }[];
  balance: number;
  income: number;
  expense: number;
  expenseTrans: Array<{
    date: string;
    category: { title: string; color: string };
    description: string;
    account: string;
    amount: number;
  }>;
  incomeTrans: Array<{
    date: string;
    category: { title: string; color: string };
    description: string;
    account: string;
    amount: number;
  }>;
};

const Dashboard = () => {
  const [balanceView, setBalanceView] = useState<"year" | "month">("year");
  const [incomeView, setIncomeView] = useState<"year" | "month">("year");
  const [expenseView, setExpenseView] = useState<"year" | "month">("year");
  const [chartHeight, setChartHeight] = useState<number>(200);

  useEffect(() => {
    const calculateChartHeight = () => {
      const baseHeight = window.innerHeight;
      if (window.innerWidth < 768) {
        setChartHeight(Math.max(150, baseHeight * 0.2));
      } else if (window.innerWidth < 1024) {
        setChartHeight(Math.max(180, baseHeight * 0.25));
      } else {
        setChartHeight(200);
      }
    };

    calculateChartHeight();
    window.addEventListener("resize", calculateChartHeight);
    return () => window.removeEventListener("resize", calculateChartHeight);
  }, []);

  const data = portfolioData as Portfolio[];

  // Calculate totals
  const totals = useMemo(() => {
    const totalBalance = data.reduce((sum, p) => sum + p.balance, 0);
    const totalIncome = data.reduce((sum, p) => sum + p.income, 0);
    const totalExpense = data.reduce((sum, p) => sum + p.expense, 0);

    return { totalBalance, totalIncome, totalExpense };
  }, [data]);

  // Portfolio comparison data (balance, income, expense by portfolio)
  const portfolioComparisonData = useMemo(() => {
    return data.map((portfolio) => ({
      name: portfolio.name,
      balance: portfolio.balance,
      income: portfolio.income,
      expense: portfolio.expense,
    }));
  }, [data]);

  // Top 3 expense categories
  const top3Categories = useMemo(() => {
    const categoryMap = new Map<
      string,
      { title: string; color: string; amount: number }
    >();

    data.forEach((portfolio) => {
      portfolio.expenseTrans.forEach((trans) => {
        const key = trans.category.title;
        const existing = categoryMap.get(key) || {
          title: trans.category.title,
          color: trans.category.color,
          amount: 0,
        };
        existing.amount += trans.amount;
        categoryMap.set(key, existing);
      });
    });

    return Array.from(categoryMap.values())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3)
      .map((cat) => ({
        name: cat.title,
        value: cat.amount,
        fill: cat.color,
      }));
  }, [data]);

  const fmt = (v: number) =>
    `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const cardData = data[0]?.cardInfo || [];

  return (
    <div className="flex flex-col gap-6 overflow-hidden p-4 md:p-6 lg:px-[100px] w-full">
      {/* Cards Section */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-4 md:gap-6">
        <div className="w-full lg:w-auto flex items-center justify-center gap-2 md:gap-4">
          <div className="w-6 h-6 rounded-full shadow-md shadow-gray-300 flex justify-center items-center flex-shrink-0">
            <KeyboardArrowLeftRoundedIcon style={{ fill: "#161D26" }} />
          </div>
          <div className="flex overflow-x-auto gap-2 md:gap-4">
            {cardData.map((item) => (
              <div key={item.number} className="flex-shrink-0">
                <CredirCard
                  number={item.number}
                  amount={item.amount}
                  type={item.type}
                />
              </div>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full shadow-md shadow-gray-300 flex justify-center items-center flex-shrink-0">
            <KeyboardArrowRightRoundedIcon style={{ fill: "#161D26" }} />
          </div>
        </div>

        <div className="bg-secorndary rounded-3xl w-full lg:flex-1 p-4 md:p-6 h-auto md:h-[148px] flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 md:gap-4">
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[80px] md:min-h-[100px] h-full flex-1 gap-2 md:gap-4 justify-center">
            <p className="text-[11px] md:text-[12px] lg:text-[14px] font-normal text-primary">
              Total Balance
            </p>
            <p className="text-[20px] md:text-[22px] lg:text-[24px] text-primary font-medium text-center">
              {fmt(totals.totalBalance)}
            </p>
          </div>
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[80px] md:min-h-[100px] h-full flex-1 gap-2 md:gap-4 justify-center">
            <p className="text-[11px] md:text-[12px] lg:text-[14px] font-normal text-primary">
              Total Income
            </p>
            <p className="text-[20px] md:text-[22px] lg:text-[24px] text-medium-green font-medium text-center">
              {fmt(totals.totalIncome)}
            </p>
          </div>
          <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[80px] md:min-h-[100px] h-full flex-1 gap-2 md:gap-4 justify-center">
            <p className="text-[11px] md:text-[12px] lg:text-[14px] font-normal text-primary">
              Total Expense
            </p>
            <p className="text-[20px] md:text-[22px] lg:text-[24px] text-medium-red font-medium text-center">
              {fmt(totals.totalExpense)}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section 1 */}
      <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="w-full lg:w-2/3 flex flex-col bg-primary p-4 md:p-6 rounded-3xl gap-3 md:gap-4 min-h-[260px] md:min-h-[300px] lg:h-[279px]">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-off-white text-[20px] xl:text-[24px] font-medium">
              Portfolio Comparison
            </p>

            {/* <div className="flex items-center gap-2">
              <button
                className={`px-3 md:px-4 py-2 md:py-3 text-[11px] md:text-[12px] lg:text-[14px] rounded-full font-montserrat font-medium transition-all ${
                  balanceView === "year"
                    ? "bg-off-white text-primary"
                    : "bg-transparent text-off-white border border-off-white"
                }`}
                onClick={() => setBalanceView("year")}
              >
                Year
              </button>

              <div className="h-4 w-[1px] bg-off-white" />

              <button
                className={`px-3 md:px-4 py-2 md:py-3 text-[11px] md:text-[12px] lg:text-[14px] rounded-full font-montserrat font-medium transition-all ${
                  balanceView === "month"
                    ? "bg-off-white text-primary"
                    : "bg-transparent text-off-white border border-off-white"
                }`}
                onClick={() => setBalanceView("month")}
              >
                Month
              </button>
            </div> */}
          </div>

          <div
            className="w-full flex-1"
            style={{ minHeight: `${chartHeight}px` }}
          >
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
                data={portfolioComparisonData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#FFF9F2"
                />
                <YAxis width={40} tick={{ fontSize: 12 }} stroke="#FFF9F2" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="balance"
                  fill="#FFF9F2"
                  name="Balance"
                  barSize={32}
                />
                <Bar
                  dataKey="income"
                  fill="#82ca9d"
                  name="Income"
                  barSize={32}
                />
                <Bar
                  dataKey="expense"
                  fill="#ff7c7c"
                  name="Expense"
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-off-white p-4 md:p-6 rounded-3xl shadow-md shadow-gray-400 min-h-[260px] md:min-h-[300px] lg:h-[279px] flex flex-col">
          <p className="text-primary text-[20px] xl:text-[24px] font-medium mb-2 md:mb-4">
            Top 3 Categories
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
            <div className="w-full sm:flex-1 h-[200px] md:h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                  <Pie
                    data={top3Categories}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="90%"
                    innerRadius="60%"
                    isAnimationActive={false}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              {top3Categories.map((item) => (
                <div className="flex items-center gap-2" key={item.name}>
                  <CircleRoundedIcon
                    style={{ width: 8, height: 8, fill: item.fill }}
                  />
                  <div className="flex flex-col">
                    <p className="text-[10px] md:text-[12px] text-primary font-light">
                      {item.name}
                    </p>
                    <p className="text-[9px] md:text-[11px] text-primary font-semibold">
                      {fmt(item.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section 2 */}
      <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="w-full lg:flex-1 bg-off-white rounded-3xl shadow-md shadow-gray-400 p-4 md:p-6 min-h-[260px] md:min-h-[300px] lg:h-[279px] flex flex-col">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 md:mb-4">
            <p className="text-primary text-[20px] xl:text-[24px] font-medium">
              Income by Portfolio
            </p>

            {/* <div className="flex items-center gap-2">
              <button
                className={`px-3 md:px-4 py-2 md:py-3 text-[11px] md:text-[12px] lg:text-[14px] rounded-full font-montserrat font-medium transition-all ${
                  incomeView === "year"
                    ? "text-off-white bg-primary"
                    : "bg-transparent text-primary border border-primary"
                }`}
                onClick={() => setIncomeView("year")}
              >
                Year
              </button>

              <div className="h-4 w-[1px] bg-primary" />

              <button
                className={`px-3 md:px-4 py-2 md:py-3 text-[11px] md:text-[12px] lg:text-[14px] rounded-full font-montserrat font-medium transition-all ${
                  incomeView === "month"
                    ? "text-off-white bg-primary"
                    : "bg-transparent text-primary border border-primary"
                }`}
                onClick={() => setIncomeView("month")}
              >
                Month
              </button>
            </div> */}
          </div>
          <div
            className="flex-1 w-full"
            style={{ minHeight: `${chartHeight}px` }}
          >
            <ResponsiveContainer width="100%" height={chartHeight}>
              <AreaChart
                data={portfolioComparisonData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12, dx: -5 }} />
                <YAxis width={40} tick={{ fontSize: 12 }} />
                <Tooltip />
                {/* <Legend /> */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:flex-1 bg-off-white rounded-3xl shadow-md shadow-gray-400 p-4 md:p-6 min-h-[260px] md:min-h-[300px] lg:h-[279px] flex flex-col">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 md:mb-4">
            <p className="text-primary text-[20px] xl:text-[24px] font-medium">
              Expense by Portfolio
            </p>

            {/* <div className="flex items-center gap-2">
              <button
                className={`px-3 md:px-4 py-2 md:py-3 text-[11px] md:text-[12px] lg:text-[14px] rounded-full font-montserrat font-medium transition-all ${
                  expenseView === "year"
                    ? "text-off-white bg-primary"
                    : "bg-transparent text-primary border border-primary"
                }`}
                onClick={() => setExpenseView("year")}
              >
                Year
              </button>

              <div className="h-4 w-[1px] bg-primary" />

              <button
                className={`px-3 md:px-4 py-2 md:py-3 text-[11px] md:text-[12px] lg:text-[14px] rounded-full font-montserrat font-medium transition-all ${
                  expenseView === "month"
                    ? "text-off-white bg-primary"
                    : "bg-transparent text-primary border border-primary"
                }`}
                onClick={() => setExpenseView("month")}
              >
                Month
              </button>
            </div> */}
          </div>
          <div
            className="flex-1 w-full"
            style={{ minHeight: `${chartHeight}px` }}
          >
            <ResponsiveContainer width="100%" height={chartHeight}>
              <AreaChart
                data={portfolioComparisonData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12, dx: -5 }} />
                <YAxis width={40} tick={{ fontSize: 12 }} />
                <Tooltip />
                {/* <Legend /> */}
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#ff7c7c"
                  fill="#ff7c7c"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
