import React, { Component } from "react";
import Card from "../modules/Card.js";
//import { NewPosts } from "../modules/NewPostInput.js";

import { get } from "../../utilities";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Feed";
    get("/api/posts").then((postObjs) => {
      let reversedPostObjs = postObjs.reverse();
      reversedPostObjs.map((postObj) => {
        this.setState({ posts: this.state.posts.concat([postObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewPost = (postObj) => {
    this.setState({
      posts: [postObj].concat(this.state.posts),
    });
  };

  render() {
    let postsList = null;
    const hasposts = this.state.posts.length !== 0;
    if (hasposts) {
      postsList = this.state.posts.map((postsObj) => (
        <Card
          key={`Card_${postsObj._id}`}
          _id={postsObj._id}
          creator_name={postsObj.creator_name}
          creator_id={postsObj.creator_id}
          content={postsObj.content}
          userId={this.props.userId}
        />
      ));
    } else {
      postsList = <div>No posts!</div>;
    }
    return (
      <>
        {this.props.userId && <NewPosts addNewPosts={this.addNewPosts} />}
        {postsList}
      </>
    );
  }
}

export default Feed;
