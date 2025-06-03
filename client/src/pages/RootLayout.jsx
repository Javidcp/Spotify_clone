import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ResponsiveNav from "../components/Navbar/ResponsiveNav";
import SideBar from "./SideBar";

const RootLayout = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Top Navbar */}
            <Navbar />
            <ResponsiveNav />

            {/* Content Below Navbar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <SideBar />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto  p-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default RootLayout;
