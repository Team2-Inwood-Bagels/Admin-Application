import {Link, NavLink} from "react-router-dom";
import "../style/style.css"
import {logout} from "../firebase";


function NavbarLogged() {
    return(
        <div className={"navbar"}>
            <NavLink to={"/menu"} activeClassName={"bordered-active"} className={"navbar-item"}>Menu</NavLink>
            <NavLink to={"/orders"} activeClassName={"bordered-active"} className={"navbar-item"}>Orders</NavLink>
            <NavLink to={"/inventory"} activeClassName={"bordered-active"} className={"navbar-item"}>Inventory</NavLink>
            <NavLink to={"/account"} activeClassName={"bordered-active"} className={"navbar-item"}>Account</NavLink>
            <button className="logoutButton" onClick={logout}><Link to={"/"}>Logout</Link></button>
        </div>
    )
}
export default NavbarLogged