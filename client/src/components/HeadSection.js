import React from "react"
import background from "../img/background.png"
import varkala from "../img/Untitled.png"
import vagamon from "../img/VAGAMON.png"
import jatayu from "../img/JATAYU.png"
import Review from "./Review"
import hp1 from "../img/hp1.jpg"
import { useNavigate } from "react-router-dom"

const HeadSection = ()=>{
  const navigate = useNavigate();
  const goToExplore = ()=>{
    navigate('/view');
  }
    return(
        <div>
        <section className="ConnectingTravellers">
        <div className="head-section">
        <img src={hp1} className="head-image" alt="headImage"></img>
            <h1 className="travellog">Travellog</h1>
            <p className="conn-trav">CONNECTING TRAVELLERS</p>
            <button className="head-section-btn" onClick={goToExplore}>Explore now</button>
        </div>
        </section>
        <section className="top-picks" id="top-picks">
        <div className="top-picks-container">
        <h1>Top Picks</h1>
        <hr className="picks-hr"></hr>
          <div className="card-container">
              <div className="card">
                <img className="card-img" src={varkala}></img>
                <h3>Varkala</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div className="card">
                <img className="card-img" src={jatayu}></img>
                <h3>Jatayu</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div className="card">
                <img className="card-img" src={vagamon}></img>
                <h3>Vagamon</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
          </div>
        </div>
        </section>
        <section className="review-section">
        <Review />
        </section>
        </div>
        
    );
}

export default HeadSection;