import React, { Component } from "react";

import "../../utilities.css";
import "./Home.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <div className= "LandingPage-bigdiv">
          <div className= "LandingPage-titlediv">
            <p className= "LandingPage-title">memory palace</p>
          </div>
          <div className= "LandingPage-getstarted"> 
          <p style = {{marginTop:10}}>get started</p>
          </div>
        </div>


        <p className="LandingPage-p LandingPage-store">store your</p> 
        <div className= "LandingPage-middlebox">
          <div className ="LandingPage-small"> items</div>
          <div className ="LandingPage-small"> dreams</div>
          <div className ="LandingPage-small"> letters</div>
          <div className ="LandingPage-small"> artwork</div>
          <div className ="LandingPage-small"> thoughts</div>
          <div className ="LandingPage-small"> food</div>
          <div className ="LandingPage-small"> music</div>
        </div>

        <p className="LandingPage-p">why we did this...</p> 
        <p className="LandingPage-bottom">hard to remember to keep track of memories physically</p>
        <p className="LandingPage-bottom">those who have challenges remembering can remember why specific items are signficant</p>
        <p className="LandingPage-bottom"> people can share memories to remind each other of good times/keep being connected </p>
      </>
    );
  }
}

export default Home;
