import React, { Component } from "react";
import SingleTheme from "./SingleTheme.js";
import { get, post } from "../../utilities";
import { Link, navigate } from "@reach/router";

import "./Card.css";

/**
 * Card is a component for displaying themes
 *
 * Proptypes
 * @param {string} _id of the theme
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the theme
 */
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
        memories: [],
    };
  }

  componentDidMount() {
    get("/api/memory", { parent: this.props._id }).then((memories) => {
      this.setState({
        memories: memories,
      });
    });
  }

  render() {
    return (
      <div className="Card-container">
        <Link to={`/theme/${this.props._id}`} onClick={() => this.props.handleTheme(this.props._id)}>
              {this.props.content}
        </Link>

        {/* <button
            type="button"
            value="theme"
            onClick={() => this.props.handleTheme(this.props._id)}
            >
            {this.props.content}
        </button> */}

        {/* if then statement? */}
        <SingleTheme
          _id={this.props._id}
          creator_name={this.props.creator_name}
          creator_id={this.props.creator_id}
          content={this.props.content}
        />
        {/* <CommentsBlock
          story={this.props}
          comments={this.state.comments}
          addNewComment={this.addNewComment}
          userId={this.props.userId}
        /> */}
      </div>
    );
  }
}

export default Card;
