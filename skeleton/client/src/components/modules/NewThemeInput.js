import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
class NewThemeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewTheme extends Component {
  addTheme = (value) => {
    const body = { content: value };
    post("/api/theme", body).then((story) => {
      // display this theme on the screen
      this.props.addNewTheme(story);
      console.log("posted new theme!")
    });
  };

  render() {
    return <NewThemeInput defaultText="New Theme" onSubmit={this.addTheme} />;
  }
}

export {NewTheme}