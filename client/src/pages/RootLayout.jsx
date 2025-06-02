import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import ResponsiveNav from "../components/Navbar/ResponsiveNav"

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <ResponsiveNav/>
            <Outlet/>
        </div>
    )
}

export default RootLayout