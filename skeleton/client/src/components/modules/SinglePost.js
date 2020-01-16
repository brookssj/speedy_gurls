import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Post is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
class SinglePost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold">
              {this.props.creator_name}
            </Link>
            <div>
                {this.props.content}
            </div>
            <div>    
                {this.props.info}
            </div>
        </div> 
    );
  }
}

export default SinglePost;