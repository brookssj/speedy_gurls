import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} postId optional prop, used for comments
 * @param {({postId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {postId, value} as parameters
 */
class NewPostInput extends Component {
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
          Save
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
 * @param {string} postId to add comment to
 */
class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  addComment = (value) => {
    const body = { parent: this.props.postId, content: value };
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
 * New Post is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewPost extends Component {
  addPost = (value) => {
    const body = { content: value };
    post("/api/post", body).then((post) => {
      // display this post on the screen
      this.props.addNewPost(post);
    });
  };

  render() {
    return <NewPostInput defaultText="New Post" onSubmit={this.addPost} />;
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

export { NewComment, NewPost, NewMessage };
