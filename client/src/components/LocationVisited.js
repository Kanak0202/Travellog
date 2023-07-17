import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";


const LocationVisited = ()=>{
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const getData = async()=>{
        let result = await fetch(`http://localhost:5000/location/${params.name}`);
        result = await result.json();
        if(result){
            setData(result);
        }
        else{
            console.log("result not obtained");
        }
    }

    const  readReview = async(id)=>{
        try {
            await navigate(`/read-review/${id.target.id}`);
          } catch (error) {
            console.error("Error navigating to location:", error);
          }
    }
    


    useEffect(()=>{
        getData();
    },[]);
    return(
        <div className="location-main">
        <h1 className="location-main-heading">Reviews for {params.name}</h1>
            <div className="location-card-container">
            {data.map((dataItem, index)=>{
                return(
                    <div key={index} id={dataItem._id} className="location-card">
                        <h1>{dataItem.name}</h1>
                        <p>by {dataItem.username}, {dataItem.dateCreated}</p>
                        <p> {dataItem.city}, {dataItem.state}</p>
                        <p><b>Major attractions:</b> {dataItem.attractions}</p>
                        <p><b>Brief Info.</b> {dataItem.description}</p>
                        <p><b>Days required:</b> {dataItem.days}</p>
                        <p><b>Budget required: </b>{dataItem.budget}</p>
                        <button className="btn btn-my-upload " id={dataItem._id} onClick={(id)=>readReview(id)}>Read more</button>
                    </div>
                );
            })}
        </div>
        </div>
    );
}

export default LocationVisited;