import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigations/Sidebar";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-off-white gap-6 items-center w-screen overflow-x-hidden">
      {/* <Navbar /> */}
      <div className="w-full flex justify-end mt-6 px-6">
        <div className="justify-start flex items-center gap-4 rounded-full shadow-md shadow-gray-300 px-4 py-2 w-[156px]">
          <PermIdentityRoundedIcon style={{ fill: "#161D26" }} />
          <p>Hi, John</p>
        </div>
      </div>

      <div className="w-full overflow-x-hidden">
        <Sidebar />
        <main className="overflow-x-hidden ml-[100px] xl:ml-[248px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
