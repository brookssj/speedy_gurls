import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Memory is a component that renders creator and content of a memory
 *
 * Proptypes
 * @param {string} _id of the memory
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the memory
 */
class SingleMemory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-memory">
        <h1>
            {this.props.content.title}
        </h1>
        <img src={this.props.content.image}></img>
        <p className="Card-memoryContent">{this.props.content.description}</p>
      </div>
    );
  }
}

export default SingleMemory;
