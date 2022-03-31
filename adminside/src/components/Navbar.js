import React, {useState} from "react";
import logo from '../images/Large inwood bagels logo.jpeg'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from '../firebase'
import NavbarLogged from "./NavbarLogged";
import NavbarLoggedOut from "./NavbarLoggedOut";
import "../style/style.css"


function Navbar() {
    const [isActive, setActive] = useState(false)
    const [admin, loading, error] = useAuthState(auth)
    const handleToggle = () => {
        setActive(!isActive)
    }
    return(
       <nav className={"navbar"}>
           <div className={"navbar-brand"}>
               <a className="navbar-item" href="https://bulma.io">
                   <img className={"logo"} src={logo} alt={"Inwood Bagels Logo"}/>
               </a>

               <a role={"button"}
                  className={`navbar-burger ${isActive ? "is-active" : ""}`}
                  onClick={handleToggle}
                  aria-label={"menu"}
                  aria-expanded={"false"}
                  data-target={"navbar-menu"}>
                   <span aria-hidden={"true"}/>
                   <span aria-hidden={"true"}/>
                   <span aria-hidden={"true"}/>
               </a>
           </div>
           <div className={`navbar-menu ${isActive ? "is-active" : ""}`} id="navbar-menu">
               {(!admin) ? <NavbarLoggedOut /> : <NavbarLogged/>}
           </div>
       </nav>
    )
}

export default Navbar