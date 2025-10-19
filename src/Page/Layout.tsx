import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigations/Sidebar";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-off-white gap-6">
      {/* <Navbar /> */}
      <div className="w-full flex justify-end mt-6">
        <div className="justify-start flex items-center gap-4 rounded-full shadow-md shadow-gray-300 px-4 py-2 w-[156px]">
          <PermIdentityRoundedIcon style={{ fill: "#161D26" }} />
          <p>Hi, John</p>
        </div>
      </div>

      <div className="flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto ml-[248px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
