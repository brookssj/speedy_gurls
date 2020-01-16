import React, { Component } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import "../../utilities.css";
import "./Profile.css";





class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: undefined,
      
      }
  }
  
  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

   handleSubmit = (event) => {
     event.preventDefault();
     this.props.onSubmit && this.props.onSubmit(this.state.value);
     this.setState({
       name: this.state.information.name,
       email:this.state.information.email,
       location:this.state.information.location,
     });
     post("api/information")
   };
  
  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        <p className= "Profile-p Profile-subTitle">Information</p>
        <form method="post" action="/information">
        <ul className="Profile-list">name<input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>{this.props.information.name}</ul>
        <ul className="Profile-list">email<input type="text" name="email" value={this.state.value} onChange={this.handleChange}/>{this.props.information.email}</ul>
        <ul className="Profile-list">location<input type="text" name="location" value={this.state.value} onChange={this.handleChange}/>{this.props.information.location}</ul>
        <button type="submit" className="Profile-button" onSubmit={this.handleSubmit}>submit</button>
        </form>
      </>
    );
  }
}

export default Profile;
