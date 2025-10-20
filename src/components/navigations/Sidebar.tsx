import React from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: DashboardRoundedIcon, path: "/" },
    {
      label: "Portfolio",
      icon: AccountBalanceWalletRoundedIcon,
      path: "/portfolio",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed min-h-screen w-[100px] xl:w-[248px] bg-primary top-0 left-0 flex flex-col py-[32px] px-6 items-center">
      <div className="w-[72px] h-[72px] rounded-full bg-gray-300" />

      <div className="mt-[72px] w-full flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.path}
              className={`flex justify-start items-center gap-4 px-4 py-2 rounded-[40px] cursor-pointer transition-all ${
                isActive(item.path)
                  ? "bg-white bg-opacity-20"
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon style={{ fill: "#FFF9F2" }} />

              <p
                className={`text-base font-normal text-off-white hidden xl:flex`}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
