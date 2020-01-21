import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultTitleText is the placeholder text
 * @param {string} defaultDescription is the placeholder text
 * @param {string} themeId 
 * @param {({themeId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {themeId, value} as parameters
 */
class NewPostInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      image: "",
      description: ""
    };
  }

  // called whenever the user types in the new post input box
  ChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  ChangeImage = (event) => {
    this.setState({
      image: event.target.value,
    });
  };  

  ChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };  

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.title, this.state.image, this.state.description);
    this.setState({
        title: "",
        image: "",
        description: ""
    });
  };

  render() {
    return (
      <div className="u-flex">
          <form>
            <input
            type="text"
            placeholder={this.props.defaultTitleText}
            value={this.state.title}
            onChange={this.ChangeTitle}
            className="NewPostInput-input"
            /><br></br>
            {/* <input
            type="text"
            placeholder={this.props.defaultText} //change to defaultImage?
            value={this.state.image}
            onChange={this.ChangeImage}
            className="NewPostInput-input"
            />   */}
            <input
            type="text"
            placeholder={this.props.defaultDescription}
            value={this.state.description}
            onChange={this.ChangeDescription}
            className="NewPostInput-input"
            />
            <br></br>
            <input type="file" name="pic" accept="image/*"/>
            <br></br>
            <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
            >
            Submit
            </button>
        </form>
      </div>
    );
  }
}

/**
 * New Memory is a New Post component for memories
 *
 * Proptypes
 * @param {string} defaultTitleText is the placeholder text
 * @param {string} defaultDescription is the placeholder text
 * @param {string} themeId to add memory to
 */
class NewMemory extends Component {
  addMemory = (title, image, description) => {
    const body = {parent: this.props.themeId, 
        content: {
            title: title,
            image: image,
            description: description
    } };
    post("/api/memory", body).then((memory) => {
      // display this memory on the screen
      this.props.addNewMemory(memory);
      console.log("added new memory!")
    });
  };

  render() {
    return <NewPostInput defaultTitleText="New Title" defaultDescription="New Memory" onSubmit={this.addMemory} />;
  }
}

export {NewMemory};
