import React, { Component } from "react";
import { NewTheme } from "../modules/NewThemeInput.js";
import Card from "../modules/Card.js"

import { get } from "../../utilities";
 
class Collection extends Component {
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
        <Card
          key={`Card_${themeObj._id}`}
          _id={themeObj._id}
          creator_name={themeObj.creator_name}
          creator_id={themeObj.creator_id}
          content={themeObj.content}
          userId={this.props.userId}
          handleTheme = {this.props.handleTheme}
        />
      ));
    } else {
      themesList = <div>No themes!</div>;
    }
    return (
      <>
        {this.props.userId && <NewTheme addNewTheme={this.addNewTheme} />}
        {this.props.userId && themesList}
      </>
    );
  }
}

export default Collection;
