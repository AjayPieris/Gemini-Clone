import React from "react";
import "./Main.css";
import assets from "../../assets/assets";

function Main() {
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello, Dev.</span>
          </p>
          <p> How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Discover scenic routes for your next road trip adventure</p>
            <img src={assets.compass_icon} alt="Compass" />
          </div>
          <div className="card">
            <p>Learn creative tips to make your journey more enjoyable</p>
            <img src={assets.bulb_icon} alt="Bulb" />
          </div>
          <div className="card">
            <p>Get suggestions for interesting conversations along the way</p>
            <img src={assets.message_icon} alt="Message" />
          </div>
          <div className="card">
            <p>Explore useful coding and travel apps for road trips</p>
            <img src={assets.code_icon} alt="Code" />
          </div>
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input type="text" placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Explore, code, and travel smarter. Gemini is here to guide you on
            every step of your journey.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
