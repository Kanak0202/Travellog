import React, { useEffect, useState } from "react";
import ap1 from "../img/ap1.jpg";
import ap2 from "../img/ap2.jpg";
import ap3 from "../img/ap3.jpg";
import ap4 from "../img/ap4.jpg";

const AddDestination = ()=>{
    
    // const [userId, setUserId] = useState("");
    const [name, setName]=useState("");
    const [state, setState]=useState("");
    const [city, setCity]=useState("");
    const [attractions, setAttractions]=useState("");
    const [description, setDescription]=useState("");
    const [review, setReview]=useState("");
    const [days, setDays]=useState("");
    const [budget, setBudget]=useState("");
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const username = JSON.parse(localStorage.getItem('user')).name;
    let date = new Date().toJSON();
    // console.log(date);
    const dateCreated = date.slice(0,10);
    // console.log(date);


    const addDestination = async ()=>{
        if(!name || !state || !city || !description || !attractions || !days || !budget){
            alert("Add the required details")
        }
        else{
            let result = await fetch("http://localhost:5000/add",{
            method:"post",
            body:JSON.stringify({name, state, city, description, attractions, days, budget, userId, username, dateCreated, review}),
            headers:{
                'Content-Type':"application/json"
            }
        });
        alert("Destination added!");
        result = await result.json();
        }
        
        // console.log(result);
    }
    
    return (
        <div className="add-dest-main-container">
            <div className="AddDestination-Container"> 
        <h1 className="add-title">Add Destination</h1>
        {/* <hr></hr> */}
        {/* <p>Marked fields are required</p> */}
        <div className="add-main-form-body">
        <label class="add-dest-label">Name<span className="required"> *</span></label><input type="text" className="inputBox" placeholder="Name of Place" onChange={(e)=>setName(e.target.value)} value={name}></input>
           <label class="add-dest-label">State<span className="required"> *</span></label><input type="text" className="inputBox" placeholder="State located in" onChange={(e)=>setState(e.target.value)} value={state}></input>
           <label class="add-dest-label">City/District/Town<span className="required"> *</span></label><input type="text" className="inputBox" placeholder="Name of city/district/town" onChange={(e)=>setCity(e.target.value)} value={city}></input>
           <label class="add-dest-label">Attractions<span className="required"> *</span></label><textarea className="add-textarea" placeholder="Best tourist attractions" rows={1} onChange={(e)=>setAttractions(e.target.value)} value={attractions}/>
           <label class="add-dest-label">Description<span className="required"> *</span></label><textarea className="add-textarea" placeholder="Brief description of the place" rows={2} onChange={(e)=>setDescription(e.target.value)} value={description}/>
           <label class="add-dest-label">Review</label><textarea className="add-textarea" placeholder="Detailed review" rows={5} onChange={(e)=>setReview(e.target.value)} value={review}/>
           <label class="add-dest-label">No. of days<span className="required"> *</span></label><input type="text" className="inputBox" placeholder="No. of days required" onChange={(e)=>setDays(e.target.value)} value={days}></input>
           <label class="add-dest-label">Budget<span className="required"> *</span></label><input type="text" className="inputBox" placeholder="Budget required" onChange={(e)=>setBudget(e.target.value)} value={budget}></input>
           <button type="submit" className="btn btn-add" onClick={addDestination}>Add</button>
        </div>
        </div>
        <div className="add-dest-right-container">
            <h1 className="Map-the"><span className="Map">Map</span><span className="the"> the</span></h1>
            <p className="world">world...</p>
            <img className="adp1 vert" src={ap1} alt="pic1"></img>
            <div className="horz-div"><img className="adp2 horz" src={ap2} alt="pic1"></img></div>
            <img className="adp3 vert" src={ap3} alt="pic1"></img>
            <div className="horz-div"><img className="adp4 horz" src={ap4} alt="pic1"></img></div>
            <h3 className="together">together!</h3>
            <div class="dot"></div>
        </div>
        </div>
    );
}

export default AddDestination;