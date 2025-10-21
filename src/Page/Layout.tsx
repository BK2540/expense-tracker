import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigations/Sidebar";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import { svgs } from "../constant/svg";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-off-white gap-6 items-center w-screen overflow-x-hidden">
      {/* <Navbar /> */}
      <div className="w-full flex justify-between items-center xl:justify-end mt-6 px-6">
        <img
          src={svgs.Logo}
          alt="logo"
          className="w-[48px] h-[48px] xl:w-[72px] xl:h-[72px] bg-primary object-contain rounded-xl xl:hidden"
        />

        <div className="justify-start flex items-center gap-4 rounded-full shadow-md shadow-gray-300 px-4 py-2 w-[156px]">
          <PermIdentityRoundedIcon style={{ fill: "#161D26" }} />
          <p className="text-[14px] md:text-[16px] text-primary">Hi, John</p>
        </div>
      </div>

      <div className="w-full overflow-x-hidden">
        <Sidebar />
        <main className="overflow-x-hidden mb-[84px] sm:mb-0 sm:ml-[100px] xl:ml-[248px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
