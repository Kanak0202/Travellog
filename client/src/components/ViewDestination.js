import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import balloons1 from "../img/balloons1.jpg"

const ViewDestination = () => {
  const [names, setNames] = useState([]);
  const [imageArray, setImg] = useState([]);
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const getDestinationNames = async () => {
    try {
      const result = await fetch("http://localhost:5000/view");
      const data = await result.json();
      setNames(data);
    } catch (error) {
      console.error("Error fetching destination names:", error);
    }
  };

  const loadImages = async () => {
    const imageArr = [];
    for (const name of names) {
      try {
        const result = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=oUDKMpWw-r3RgxE_moAyCahz7EiCbx9s9lE5kP4e2Gk`
        );
        if (result.ok) {
          const data = await result.json();
          const img = data.results[0]?.urls.small;
          // console.log(img);
          if (img) {
            imageArr.push({ name, img });
          }
          else{
            // console.log(name);
            for (var i = names.length - 1; i >= 0; i--) {
              if (names[i] === name) {
               names.splice(i, 1);
              }
             }
             setNames(names);
          }
        } else {
          console.log("No image returned");
        }
      } catch (error) {
        console.error(`Error fetching image for ${name}:`, error);
      }
    }
    imageArr.sort((a, b) => a.name.localeCompare(b.name));
    setImg(imageArr);
  };

  useEffect(() => {
    getDestinationNames();
  }, []);

  useEffect(() => {
    if (names.length > 0) {
      loadImages();
    }
  }, [names]);

  const openLocation = async (id) => {
    try {
      await navigate(`/location/${id}`);
    } catch (error) {
      console.error("Error navigating to location:", error);
    }
  };

  const searchDestination = async (event)=>{
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`);
      
      result = await result.json();
      // console.log(result);
      if(result){
        const nameArr = []
        let uniqeNames = [];
        result.map((data)=>{
          nameArr.push(data.name);
          uniqeNames = [...new Set(nameArr)];
          uniqeNames.sort();
          setKey(key);
        })
        setNames(uniqeNames);
      }
    }
    else{
      getDestinationNames();
      setKey("");
    }
  }

  return (
    <div className="view-destination-body">
    <div className="view-dest-main-section">
    <div>
    <img className="view-dest-head-image" src={balloons1} alt="main"></img>
      <input type="text" className="view-dest-input search-box-container-main" placeholder="I want to go to ..."  onChange={searchDestination}/>
      <div className="search-box-container search-para">
      {(key) ? <p>Results for {key}...</p> : <></>}</div>
    </div>
      
    </div>
      
      {names.length>0 ?
        <div className="ViewDestination-Container">
        {names.map((name, index) => (
          <div key={index}>
            <div
              className="dest-frame"
              place={name}
              id={name}
              onClick={() => openLocation(name)}
            >
              <img
                src={
                  imageArray.length > 0 && imageArray[index] && imageArray[index].name===name
                    ? imageArray[index].img
                    : "https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
                }
                id={name}
                className="dest-image"
                alt="destination"
                onClick={() => openLocation(name)}
              />
              <h1 id={name} onClick={() => openLocation(name)}>
                {name}
              </h1>
            </div>
          </div>
        ))}
      </div>
       :
       <h1>Whoops...No results to display</h1>
        }
    </div>
  );
};

export default ViewDestination;