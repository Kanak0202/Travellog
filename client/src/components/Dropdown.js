import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dropdown = ()=>{
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const show = ()=>{
        if(showDropdown===false){
            setShowDropdown(true);
        }
        else{
            setShowDropdown(false)
        }
    }

    const logout = ()=>{
        localStorage.clear();
        alert("Logged out successfully");
        navigate("/"); 
    }
    return (
        <div className="dropdown-container">
  <button type="button" className="dropdown-button" onClick={show}>
    <div className="lines">☰</div>
  </button>
  {showDropdown ? <div className="dropdown">
    <ul id="profile">
    <li><Link to="/profile/:id" className="navLink dropdown-item" >Profile</Link></li>
    <hr></hr>
                <li><Link to="/my-uploads" className="navLink dropdown-item" >My Uploads</Link></li>
                <hr></hr>
                <li><Link to="/" className="navLink dropdown-item" onClick={logout}>Logout</Link></li>
    </ul>
  </div> 
  : 
  <></>}
</div>
    );
}

export default Dropdown;