import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} memoryId optional prop, used for comments
 * @param {({memoryId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {memoryId, value} as parameters
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
          value={this.state.title}
          onChange={this.ChangeTitle}
          className="NewPostInput-input"
        />  
        <input
          type="text"
          placeholder={this.props.defaultText} //change to defaultImage?
          value={this.state.image}
          onChange={this.ChangeImage}
          className="NewPostInput-input"
        />  
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.description}
          onChange={this.ChangeDescription}
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
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} memoryId to add comment to
 */
class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  addComment = (value) => {
    const body = { parent: this.props.memoryId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      this.props.addNewComment(comment);
    });
  };

  render() {
    return <NewPostInput defaultText="New Comment" onSubmit={this.addComment} />;
  }
}

/**
 * New Memory is a New Post component for memories
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewMemory extends Component {
  addMemory = (value) => {
    const body = { 
        content: {
            title: 
            image:
            description:
    } };
    post("/api/memory", body).then((memory) => {
      // display this memory on the screen
      this.props.addNewMemory(memory);
    });
  };

  render() {
    return <NewPostInput defaultText="New Memory" onSubmit={this.addMemory} />;
  }
}

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */
class NewMessage extends Component {
  sendMessage = (value) => {
    const body = { recipient: this.props.recipient, content: value };
    post("/api/message", body);
  };

  render() {
    return <NewPostInput defaultText="New Message" onSubmit={this.sendMessage} />;
  }
}

export { NewComment, NewMemory, NewMessage };
