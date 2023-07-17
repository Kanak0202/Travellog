import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const MyUploads = ()=>{
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const getData = async(userId)=>{
        let result = await fetch(`http://localhost:5000/my-uploads/${userId}`);
        // console.log(params.userId);
        result = await result.json();
        if(result){
            // console.log(result);
            setData(result);
        }
        else{
            console.log("result not obtained");
        }
    }
    
    // console.log(data);

    useEffect(()=>{
        getData(userId);
    },[]);

    // console.log(data);

    const goToAdd = ()=>{
        navigate('/add');
    }

    async function goToUpdate(id){
        await navigate("/get-upload/"+id.target.id);
    }
    
    const deleteUpload = async (id)=>{
        let result = await fetch(`http://localhost:5000/get-upload/${id.target.id}`,{
            method:'delete'
        });
        if(result){
            getData(userId);
        }
    }

    // +id.target.id


    return (
        <div className="location-card-container">
            {data.length>0 ? 
                <div className="location-card-container">
                {data.map((dataItem, index)=>{
                return(
                    <div key={index} className="location-card">
                        <h1>{dataItem.name}</h1>
                        <p>by {dataItem.username}, {dataItem.dateCreated}</p>
                        <p><b>at:</b> {dataItem.city}, {dataItem.state}</p>
                        <p><b>Major attractions:</b> {dataItem.attractions}</p>
                        <p usd={dataItem.userId}><b>Brief Info.</b> {dataItem.description}</p>
                        <p><b>Days required:</b> {dataItem.days}</p>
                        <p><b>Budget required: </b>{dataItem.budget}</p>
                        <button className="btn btn-my-upload" id={dataItem._id} onClick={(id)=>goToUpdate(id)}>Update</button>
                        <button className="btn btn-my-upload btn-my-upload-delete" id={dataItem._id} onClick={(id)=>deleteUpload(id)}>Delete</button>
                    </div>
                );
            })}
                </div>
            : 
            <div>
                <h1>No uploads to show ☹️</h1>
                <button className="btn btn-my-upload" onClick={goToAdd}>Add now</button>
            </div>}
        </div>
    );
}

export default MyUploads;