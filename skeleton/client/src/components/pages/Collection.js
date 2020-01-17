import React, { Component } from "react";
import SingleTheme from "../modules/SingleTheme";
import { NewTheme } from "../modules/NewThemeInput.js";

import { get } from "../../utilities";
 
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: [],
    };
  }

  // called when the "Collection" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Collection";
    get("/api/themes").then((themeObjs) => {
      let reversedThemeObjs = themeObjs.reverse();
      reversedThemeObjs.map((themeObj) => {
        this.setState({ themes: this.state.themes.concat([themeObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewTheme = (themeObj) => {
    this.setState({
      themes: [themeObj].concat(this.state.themes),
    });
  };

  render() {
    let themesList = null;
    const hasThemes = this.state.themes.length !== 0;
    if (hasThemes) {
      themesList = this.state.themes.map((themeObj) => (
        <SingleTheme
          _id={themeObj._id}
          creator_name={themeObj.creator_name}
          creator_id={themeObj.creator_id}
          content={themeObj.content}
          userId={this.props.userId}
        />
      ));
    } else {
      themesList = <div>No themes!</div>;
    }
    return (
      <>
        {this.props.userId && <NewTheme addNewTheme={this.addNewTheme} />}
        {themesList}
      </>
    );
  }
}

export default Feed;
