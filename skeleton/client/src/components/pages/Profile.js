import React, { Component } from "react";
import { get } from "../../utilities";

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

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
      </>
    );
  }
}

export default Profile;
