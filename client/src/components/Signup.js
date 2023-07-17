import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const register = async ()=>{
        if(!name || !email || !password || !confirmPassword || !country || !city || !state){
            alert("Please enter all the details");
        }
        else{
            if(password === confirmPassword){
                let result = await fetch("http://localhost:5000/signup",{
                method:"post",
                body:JSON.stringify({name, email, country, state, city, password}),
                headers:{
                    'Content-type': 'application/json',
                }
            });
            result = await result.json();
            if(result){
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
            }
            console.log(result);
            }
            else{
                alert("Enter correct password");
            }
        }
    };

    return (
        <div className="SignupComponent">
        <h1>Sign Up</h1>
        <input type="text" className="inputBox" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}></input>
        <input type="email" className="inputBox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
        <input type="text" className="inputBox" placeholder="Enter Country" onChange={(e)=>setCountry(e.target.value)} value={country}></input>
        <input type="text" className="inputBox" placeholder="Enter State" onChange={(e)=>setState(e.target.value)} value={state}></input>
        <input type="text" className="inputBox" placeholder="Enter City" onChange={(e)=>setCity(e.target.value)} value={city}></input>
        <input type="password" className="inputBox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password}></input>
        <input type="password" className="inputBox" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}></input>
        <button type="submit" className="btn" onClick={register}>Sign Up</button>

    </div>
    );
}

export default Signup;