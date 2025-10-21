import React, { useEffect, useState } from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { svgs } from "../../constant/svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: DashboardRoundedIcon, path: "/" },
    {
      label: "Portfolio",
      icon: AccountBalanceWalletRoundedIcon,
      path: "/portfolio",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="fixed bottom-0 left-0 right-0 bg-primary flex justify-around items-center py-4 px-6 z-50">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.path}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  isActive(item.path) ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon style={{ fill: "#FFF9F2" }} />
                <p className="text-xs font-normal text-off-white">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="fixed min-h-screen w-[100px] xl:w-[248px] bg-primary top-0 left-0 flex flex-col py-[32px] px-6 items-center">
          <img
            src={svgs.Logo}
            alt="logo"
            className="w-[56px] h-[56px] xl:w-[72px] xl:h-[72px] saturate-50"
          />

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

                  <p className="text-base font-normal text-off-white hidden xl:flex">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
