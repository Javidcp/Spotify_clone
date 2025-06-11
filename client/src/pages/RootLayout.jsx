import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ResponsiveNav from "../components/Navbar/ResponsiveNav";
import SideBar from "./SideBar";
import Footer from "./Footer";


const RootLayout = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar />
            <ResponsiveNav />

            <div className="flex flex-1 overflow-hidden">
                <SideBar />

                <main className="flex-1 overflow-y-auto overflow-hidden rounded-lg p-1">
                    <Outlet />
                    <Footer/>
                </main>
            </div>

        </div>
    );
};

export default RootLayout;
