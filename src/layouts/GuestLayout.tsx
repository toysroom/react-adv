import { Outlet } from "react-router-dom"

function GuestLayout() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
                <div style={{ width: '500px'}}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default GuestLayout