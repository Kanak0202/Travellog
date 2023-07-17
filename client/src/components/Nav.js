import React from "react";
import {Link} from "react-router-dom";
import Travellog from "../img/trvellog.png";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    

const goToHome = ()=>{
        navigate("/");
}

    return (
        <div className="navContainer" id='nav'>
        <p className="TravellogLogo" onClick={goToHome}>Travellog</p>
        {auth ? 
            <ul className="nav-ul">
                {/* <img src={Travellog} className="Logo" alt="Travellog"></img> */}
                
                
                <li><Link className="navLink" to="/view"  >Explore</Link></li>
                <li><Link className="navLink" to="/add"  >Add destination</Link></li>
                <li><Link className="navLink" to="/blog"  >Blog</Link></li>
                <Dropdown />
            </ul>
        :
        
        <ul className="nav-ul">
        <li><Link className="navLink" to="/"  >Home</Link></li>
        <li><Link className="navLink" to="/view"  >View Destinations</Link></li>
                <li><Link className="navLink" to="/blog"  >Blog</Link></li>
                <li><Link className="navLink" to="/login"  >Login</Link></li>
                <li><Link className="navLink" to="/signup"  >Sign Up</Link></li>
                </ul>
         }
            
        </div>
    );
}

export default Nav;