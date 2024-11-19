import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar bg-light">
            <h4>Sidebar</h4>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="/">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/prodotti">Prodotti</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;