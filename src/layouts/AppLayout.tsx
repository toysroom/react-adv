import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function AppLayout() {
    return (
        <>
            <Navbar />
            <div className="wrapper">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AppLayout