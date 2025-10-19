export const balanceSummarydata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const categorySummaryData = [
  { name: "Bill", value: 400, fill: "#0088FE" },
  { name: "Food", value: 300, fill: "#00C49F" },
  { name: "Salary", value: 300, fill: "#FFBB28" },
];

export const incomeSummaryData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const expenseSummaryData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const cardData: {
  number: string;
  amount: number;
  type: "visa" | "master";
}[] = [
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

export interface Categoty {
  title: string;
  color: string;
}

export interface Transaction {
  date: string;
  category: Categoty;
  description: string;
  account: string;
  amount: number;
}

export interface CardInfo {
  number: string;
  amount: number;
  type: "visa" | "master";
}

export interface Portfolio {
  id: string;
  name: string;
  cardInfo: CardInfo[];
  balance: number;
  income: number;
  expense: number;
  expenseTrans: Transaction[];
  incomeTrans: Transaction[];
}

export const portfolioData: Portfolio[] = [
  {
    id: "01",
    name: "Main",
    cardInfo: [
      {
        number: "1234 5678 9012 3456",
        amount: 12000,
        type: "visa",
      },
    ],
    balance: 3590,
    income: 2300,
    expense: 1900,
    expenseTrans: [
      {
        date: "10/09/2025",
        category: {
          title: "Bills",
          color: "#ae2012",
        },

        description: "Electricity",
        account: "1234 5678 9012 3456",
        amount: 80,
      },
      {
        date: "15/09/2025",
        category: {
          title: "Subscriptions",
          color: "#ee9b00",
        },
        description: "Netflix",
        account: "1234 5678 9012 3456",
        amount: 15,
      },
      {
        date: "02/10/2025",
        category: {
          title: "Food",
          color: "#ca6702",
        },
        description: "Moo Kra Ta",
        account: "1234 5678 9012 3456",
        amount: 8.5,
      },
      {
        date: "08/10/2025",
        category: {
          title: "Transport",
          color: "#e9d8a6",
        },
        description: "Grab ride",
        account: "1234 5678 9012 3456",
        amount: 6.2,
      },
    ],
    incomeTrans: [
      {
        date: "05/09/2025",
        category: {
          title: "Salary",
          color: "#94d2bd",
        },
        description: "September Salary",
        account: "1234 5678 9012 3456",
        amount: 2500,
      },
      {
        date: "19/09/2025",
        category: {
          title: "Bonus",
          color: "#a2d2ff",
        },
        description: "Performance bonus",
        account: "1234 5678 9012 3456",
        amount: 300,
      },
    ],
  },
  {
    id: "02",
    name: "Savings",
    cardInfo: [
      {
        number: "2345 6789 0123 4567",
        amount: 8000,
        type: "master",
      },
    ],
    balance: 8200,
    income: 500,
    expense: 300,
    expenseTrans: [
      {
        date: "12/09/2025",
        category: {
          title: "Investment",
          color: "#34a0a4",
        },
        description: "Mutual Fund Purchase",
        account: "2345 6789 0123 4567",
        amount: 200,
      },
      {
        date: "01/10/2025",
        category: {
          title: "Fees",
          color: "#da627d",
        },
        description: "Account Maintenance",
        account: "2345 6789 0123 4567",
        amount: 10,
      },
    ],
    incomeTrans: [
      {
        date: "10/09/2025",
        category: {
          title: "Interest",
          color: "#005f73",
        },
        description: "Monthly Interest",
        account: "2345 6789 0123 4567",
        amount: 100,
      },
      {
        date: "10/10/2025",
        category: {
          title: "Interest",
          color: "#005f73",
        },
        description: "Monthly Interest",
        account: "2345 6789 0123 4567",
        amount: 100,
      },
      {
        date: "15/10/2025",
        category: {
          title: "Transfer",
          color: "#bde0fe",
        },
        description: "Transfer from Main",
        account: "2345 6789 0123 4567",
        amount: 300,
      },
    ],
  },
  {
    id: "03",
    name: "Travel Fund",
    cardInfo: [
      {
        number: "3456 7890 1234 5678",
        amount: 2500,
        type: "master",
      },
    ],
    balance: 2000,
    income: 1200,
    expense: 700,
    expenseTrans: [
      {
        date: "05/09/2025",
        category: {
          title: "Transfer",
          color: "#bb3e03",
        },
        description: "Flight to Japan",
        account: "3456 7890 1234 5678",
        amount: 600,
      },
      {
        date: "07/10/2025",
        category: {
          title: "Food",
          color: "#ca6702",
        },
        description: "Airport coffee",
        account: "3456 7890 1234 5678",
        amount: 5.5,
      },
    ],
    incomeTrans: [
      {
        date: "01/09/2025",
        category: {
          title: "Deposit",
          color: "#184e77",
        },
        description: "Travel savings",
        account: "3456 7890 1234 5678",
        amount: 1000,
      },
      {
        date: "10/10/2025",
        category: {
          title: "Refund",
          color: "#168aad",
        },
        description: "Hotel refund",
        account: "3456 7890 1234 5678",
        amount: 200,
      },
    ],
  },
];
