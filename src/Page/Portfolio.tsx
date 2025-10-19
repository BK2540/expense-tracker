// src/pages/PortfolioDebug.tsx
import React, { useMemo, useState, useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CredirCard from "../components/card/CredirCard";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { portfolioData as rawPortfolioData } from "../constant/data";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";

// Types
type Categoty = {
  title: string;
  color: string;
};

type Transaction = {
  date: string; // "DD/MM/YYYY"
  category: Categoty;
  description: string;
  account: string;
  amount: number;
};

type CardInfo = { number: string; amount: number; type: "visa" | "master" };

type Portfolio = {
  id: string;
  name: string;
  cardInfo: CardInfo[];
  balance: number;
  income: number;
  expense: number;
  expenseTrans: Transaction[];
  incomeTrans: Transaction[];
};

type Row = Transaction & { kind: "Income" | "Expense" };

// Component
const PortfolioDebug: React.FC = () => {
  const portfolioData: Portfolio[] = Array.isArray(rawPortfolioData)
    ? (rawPortfolioData as Portfolio[])
    : [];

  const [activePortfolioId, setActivePortfolioId] = useState<string>(
    portfolioData?.[0]?.id ?? ""
  );

  const [view, setView] = useState<"all" | "income" | "expense">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "date_desc" | "date_asc" | "amount_desc" | "amount_asc"
  >("date_asc");

  useEffect(() => {
    if (!activePortfolioId && portfolioData?.[0]?.id) {
      setActivePortfolioId(portfolioData[0].id);
    }
  }, [portfolioData]);

  const selected = useMemo(() => {
    return (
      portfolioData.find((p) => p.id === activePortfolioId) ??
      portfolioData[0] ??
      null
    );
  }, [activePortfolioId, portfolioData]);

  const mergedTransactions: Row[] = useMemo(() => {
    if (!selected) return [];
    const incomes: Row[] = (selected.incomeTrans ?? []).map((t) => ({
      ...t,
      kind: "Income",
    }));
    const expenses: Row[] = (selected.expenseTrans ?? []).map((t) => ({
      ...t,
      kind: "Expense",
    }));
    return [...incomes, ...expenses];
  }, [selected]);

  const parseDate = (d: string) => {
    const [dd, mm, yyyy] = d.split("/").map(Number);
    return new Date(yyyy, (mm ?? 1) - 1, dd ?? 1).getTime();
  };

  const displayed = useMemo(() => {
    let rows = mergedTransactions.slice();

    if (view === "income") rows = rows.filter((r) => r.kind === "Income");
    if (view === "expense") rows = rows.filter((r) => r.kind === "Expense");

    if (categoryFilter !== "all")
      rows = rows.filter((r) => r.category.title === categoryFilter);

    rows.sort((a, b) => {
      switch (sortBy) {
        case "date_desc":
          return parseDate(b.date) - parseDate(a.date);
        case "date_asc":
          return parseDate(a.date) - parseDate(b.date);
        case "amount_desc":
          return b.amount - a.amount;
        case "amount_asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return rows;
  }, [mergedTransactions, view, categoryFilter, sortBy]);

  const fmt = (v: number) =>
    `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const toggleSort = (field: "date" | "amount") => {
    setSortBy((prev) => {
      if (field === "date") {
        // if already sorting by date, flip asc/desc, otherwise start with date_desc
        if (prev.startsWith("date"))
          return prev === "date_desc" ? "date_asc" : "date_desc";
        return "date_desc";
      } else {
        if (prev.startsWith("amount"))
          return prev === "amount_desc" ? "amount_asc" : "amount_desc";
        return "amount_desc";
      }
    });
  };

  if (!portfolioData.length) {
    return (
      <div className="p-6">
        No portfolio data found at import path. Check the import.
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden p-6">
      <div className="flex w-full justify-start mt-6">
        <div className="flex items-end">
          {portfolioData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePortfolioId(item.id)}
              type="button"
              className={
                "px-4 h-[48px] flex items-center justify-center rounded-tl-2xl rounded-tr-2xl shadow-md " +
                (item.id === activePortfolioId ? "bg-off-white" : "bg-primary")
              }
              aria-pressed={item.id === activePortfolioId}
            >
              <p
                className={
                  item.id === activePortfolioId
                    ? "text-primary font-semibold"
                    : "text-off-white"
                }
              >
                {item.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-off-white shadow-md rounded-bl-2xl rounded-br-2xl rounded-tr-2xl p-4 flex flex-col gap-6">
        {/* <div className="w-full flex justify-end items-center gap-4">
          <button className="bg-primary py-2 px-4 flex items-center justify-center gap-2 rounded-full h-[40px]">
            <EditRoundedIcon
              style={{ width: 20, height: 20, fill: "#FFF9F2" }}
            />
            <p className="text-off-white text-base">Edit Portfolio</p>
          </button>
        </div> */}

        <div className="w-full flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              {selected?.cardInfo?.map((c) => (
                <CredirCard
                  key={c.number}
                  number={c.number}
                  amount={c.amount}
                  type={c.type}
                />
              ))}
            </div>
          </div>

          <div className="w-full h-[148px] flex justify-between items-center gap-4">
            <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4 shadow-md justify-center">
              <p className="text-[12px] md:text-[14px] font-semibold text-primary">
                Total Balance
              </p>
              <p className="text-[24px] text-primary font-medium text-center">
                {selected ? fmt(selected.balance) : "-"}
              </p>
            </div>
            <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4 shadow-md justify-center">
              <p className="text-[12px] md:text-[14px] font-semibold text-primary">
                Total Income
              </p>
              <p className="text-[24px] text-medium-green font-medium text-center">
                {selected ? fmt(selected.income) : "-"}
              </p>
            </div>
            <div className="flex flex-col bg-off-white p-4 rounded-3xl min-h-[100px] h-full w-full gap-4 shadow-md justify-center">
              <p className="text-[12px] md:text-[14px] font-semibold text-primary">
                Total Expense
              </p>
              <p className="text-[24px] text-medium-red font-medium text-center">
                {selected ? fmt(selected.expense) : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-auto flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("all")}
              className={`px-3 py-1 rounded-full ${
                view === "all"
                  ? "bg-primary text-off-white"
                  : "bg-transparent border"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setView("income")}
              className={`px-3 py-1 rounded-full ${
                view === "income"
                  ? "bg-primary text-off-white"
                  : "bg-transparent border"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setView("expense")}
              className={`px-3 py-1 rounded-full ${
                view === "expense"
                  ? "bg-primary text-off-white"
                  : "bg-transparent border"
              }`}
            >
              Expense
            </button>
          </div>

          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b border-t border-secorndary">
                <th className="px-4 py-2 text-[12px] md:text-[14px] w-full flex justify-between">
                  Date
                  <button onClick={() => toggleSort("date")}>
                    <SwapVertRoundedIcon
                      style={{ width: 20, height: 20, fill: "#161D26" }}
                    />
                  </button>
                </th>
                <th className="px-4 py-2 text-[12px] md:text-[14px]">Type</th>
                <th className="px-4 py-2 text-[12px] md:text-[14px]">
                  Category
                </th>
                <th className="px-4 py-2 text-[12px] md:text-[14px]">
                  Description
                </th>
                <th className="px-4 py-2 text-[12px] md:text-[14px]">
                  Account
                </th>
                <th className="px-4 py-2 text-[12px] md:text-[14px] w-full flex justify-between gap-2">
                  Amount
                  <button onClick={() => toggleSort("amount")}>
                    <SwapVertRoundedIcon
                      style={{ width: 20, height: 20, fill: "#161D26" }}
                    />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-neutral-500"
                  >
                    No transactions
                  </td>
                </tr>
              ) : (
                displayed.map((t, i) => (
                  <tr key={`${t.account}-${i}`}>
                    <td className="px-4 py- text-[12px] md:text-[14px]">
                      {t.date}
                    </td>
                    <td className="px-4 py-2 text-[12px] md:text-[14px]">
                      <span
                        className={`px-2 py-1 rounded-full text-[12px] ${
                          t.kind === "Income"
                            ? "bg-green-100 text-medium-green"
                            : "bg-red-100 text-medium-red"
                        }`}
                      >
                        {t.kind}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-[12px] md:text-[14px] flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-xl`}
                        style={{ backgroundColor: t.category.color }}
                      />
                      {t.category.title}
                    </td>
                    <td className="px-4 py-2 text-[12px] md:text-[14px]">
                      {t.description}
                    </td>
                    <td className="px-4 py-2 text-[12px] md:text-[14px]">
                      {t.account}
                    </td>
                    <td className="px-4 py-2 text-right text-[12px] md:text-[14px]">
                      {fmt((t as any).amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDebug;
