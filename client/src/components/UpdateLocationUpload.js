import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateLocationUpload = ()=>{
    const params = useParams();
    const navigate = useNavigate();
    // console.log(params);
    const [name, setName]=useState("");
    const [state, setState]=useState("");
    const [city, setCity]=useState("");
    const [location, setLocation]=useState("");
    const [img, setImg]=useState("");
    const [attractions, setAttractions]=useState("");
    const [description, setDescription]=useState("");
    const [days, setDays]=useState("");
    const [budget, setBudget]=useState("");
    const [dateUpdated, setDateUpdated] = useState("");

    useEffect(()=>{
        getUpload();
    }, []);

    const getUpload = async ()=>{
        let result = await fetch(`http://localhost:5000/get-upload/${params.id}`)
        if(result){
            result = await result.json();
            setName(result.name);
            setCity(result.city);
            setState(result.state);
            setDescription(result.description);
            setBudget(result.budget);
            setDays(result.days);
            setAttractions(result.attractions);
        }
        else{
            console.log("Result not found");
        }
    }
    

    const updateLocation = async ()=>{
        let result = await fetch(`http://localhost:5000/get-upload/${params.id}`,{
            method:"put",
            body:JSON.stringify({name, state, city,location ,img, description, attractions, days, budget, dateUpdated}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(result){
            let date = new Date().toJSON();
    const dateUpdated = date.slice(0,10);
    setDateUpdated(dateUpdated);
    result = await result.json();
        navigate("/my-uploads");
        }
        
    }

    const goBack = ()=>{
        navigate("/my-uploads");
    }

    // console.log(dateUpdated);

    return (
        <div className="AddDestination-Container"> 
        <h1 className="add-title">Update Destination</h1>
        <div className="add-main-form-body">
        
            <input type="text" className="inputBox" placeholder="Name of Place" onChange={(e)=>setName(e.target.value)} value={name}></input>
            <input type="text" className="inputBox" placeholder="State located in" onChange={(e)=>setState(e.target.value)} value={state}></input>
            <input type="text" className="inputBox" placeholder="Name of city" onChange={(e)=>setCity(e.target.value)} value={city}></input>
            <textarea className="add-textarea" placeholder="Best tourist attractions" rows={1} onChange={(e)=>setAttractions(e.target.value)} value={attractions}/>
            <textarea className="add-textarea" placeholder="Brief description of the place" rows={2} onChange={(e)=>setDescription(e.target.value)} value={description}/>
            <input type="text" className="inputBox" placeholder="No. of days required" onChange={(e)=>setDays(e.target.value)} value={days}></input>
            <input type="text" className="inputBox" placeholder="Budget required" onChange={(e)=>setBudget(e.target.value)} value={budget}></input>
            <button type="submit" className="btn" onClick={updateLocation}>Update</button>
            <button type="submit" className="btn" onClick={goBack}>Go Back</button>
        </div>
        </div>
    );
}

export default UpdateLocationUpload;