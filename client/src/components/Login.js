import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async()=>{
        if(!email || !password){
            alert("Enter correct details");
        }
        else{
            let result = await fetch("http://localhost:5000/login",{
                method:"post",
                body:JSON.stringify({email,password}),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            result = await result.json();
            if(result){
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
            }
            else{
                alert("Enter correct details");
            }
        }
    }

    return (
        <div className="LoginComponent">
        <h1>Login</h1>
        {/* <hr className="line-login"></hr> */}
            <div className="login-form">
            <label className="add-dest-label">Email</label><input type="email" className="inputBox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <label className="add-dest-label">Password</label><input type="password" className="inputBox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <button className="btn" type="submit" onClick={handleLogin}>Login</button>
            <p>New User?<a href="/signup">Sign Up</a></p>
            </div>

        </div>
    );
}

export default Login;