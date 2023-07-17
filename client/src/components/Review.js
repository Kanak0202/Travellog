import React from "react";
import p1 from "../img/p1.jpg"
import p2 from "../img/p2.jpg"
import p3 from "../img/p3.jpg"

const Review = ()=>{
    return(
        <section className="review-section">
          <div className="">
        <h1 className="review-heading">Travellers' Reviews</h1>
        <hr className="picks-hr"></hr>
            <div id="carouselExampleIndicators" className="review-carousel carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      {/* <h1>VARKALA</h1> */}
      <p className="review-content">Travellog helped me make new friends.</p>
      <div className="reviwer-info">
      <img className="reviewer-image" src={p1} alt="reviewer"></img><span className="reviwer-name">Kate, Denver</span>
      </div>
      </div>
    <div className="carousel-item">
    {/* <h1>VARKALA</h1> */}
    <p className="review-content">Travellog helped me find my inner wanderer.</p>
      <div className="reviwer-info">
      <img className="reviewer-image" src={p2} alt="reviewer"></img><span className="reviwer-name">James, Copenhagen</span>
      {/* <p className="reviwer-name">James, Copenhagen</p> */}
      </div>
    </div>
    <div className="carousel-item">
    {/* <h1>VARKALA</h1> */}
    <p className="review-content">Travellog helped me become a creator.</p>
      <div className="reviwer-info">
      <img className="reviewer-image" src={p3} alt="reviewer"></img><span className="reviwer-name">Radhika, Mumbai</span>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
        </section>
    );
}

export default Review;